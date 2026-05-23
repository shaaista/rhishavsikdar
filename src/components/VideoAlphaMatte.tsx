import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Renders a transparent-background video on iOS Safari, Mac Safari, and
// Android Chrome by reading a packed color+matte MP4 and using the matte's
// luminance as the alpha channel.
//
// Why: iOS Safari's hardware-accelerated video decoder paints directly to
// a GPU surface that CSS filters, mix-blend-mode, and SVG feColorMatrix
// cannot reach (a long-standing WebKit/iOS limitation — it's the reason
// Apple shipped HEVC-with-alpha as the "official" iOS-transparent-video
// path). We can't easily encode HEVC-with-alpha on Windows, so we use the
// next-best approach: pack the color frames and the alpha matte into one
// MP4 stacked vertically (color top, matte bottom), then composite them
// in a <canvas> at runtime. The matte is the artist's real authored
// alpha extracted from the source WebM via FFmpeg's alphaextract filter,
// so dark features (hair, eyes, eyebrows, dark fabric) keep full
// opacity — unlike a brightness-threshold chroma key, which punches
// holes through anything dark.
//
// Canvas sizing: we use ResizeObserver + devicePixelRatio so the canvas
// pixel buffer exactly matches the physical screen pixels (Retina / HiDPI).
// Without this, a 900px buffer displayed at 746 CSS × 3 DPR = 2238 physical
// pixels would cause a visible 2.5× upscale blur on iPhone.
//
// The off-screen <video> must NOT be display:none / opacity:0 / size:0 /
// clip-path:inset(100%) — iOS's autoplay heuristic refuses each of those
// as "not visible to the user." A real 320×180 box positioned at
// left: -10000px keeps it laid out and "visible" while staying out of
// the user's viewport.

interface Props {
  /** Path to the color+matte stacked MP4. Top half is RGB color (any bg
   *  color is fine — only the matte determines visibility), bottom half
   *  is grayscale alpha (white = opaque, black = transparent). */
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onPlay?: () => void;
}

export const VideoAlphaMatte = forwardRef<HTMLVideoElement, Props>(
  ({ src, className, style, onPlay }, forwardedRef) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const colorBufRef = useRef<HTMLCanvasElement | null>(null);
    const matteBufRef = useRef<HTMLCanvasElement | null>(null);

    useImperativeHandle(forwardedRef, () => videoRef.current as HTMLVideoElement, []);

    useEffect(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.loop = false;

      // Two offscreen buffers — one for the color half, one for the matte
      // half. We sample both halves of the stacked video into these, then
      // merge into the visible canvas using the matte's R channel as the
      // alpha of the color. Avoids touching the visible canvas with the
      // matte image at any point, so the user never sees the matte flash.
      const colorBuf = document.createElement("canvas");
      const matteBuf = document.createElement("canvas");
      colorBufRef.current = colorBuf;
      matteBufRef.current = matteBuf;

      let disposed = false;
      let configured = false;

      // Resize canvas pixel buffer to match the actual physical pixels on screen.
      // Called both on video metadata load (to establish initial dimensions) and
      // by ResizeObserver whenever the CSS layout changes. Capping at the source
      // video resolution avoids wasting CPU on a buffer larger than the source.
      const configureSize = () => {
        const vw = video.videoWidth;
        const vhFull = video.videoHeight;
        if (!vw || !vhFull) return;

        const halfH = vhFull / 2;
        const dpr = (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1;
        const rect = canvas.getBoundingClientRect();

        let cw: number, ch: number;
        if (rect.width > 0 && rect.height > 0) {
          // Match physical pixels exactly — prevents Retina blur. Cap at source
          // resolution: the source is 1920 px wide so we can't gain sharpness beyond that.
          cw = Math.min(Math.round(rect.width * dpr), vw);
          ch = Math.round(cw * halfH / vw); // maintain source aspect ratio
        } else {
          // Canvas not laid out yet — use full source resolution as a safe fallback.
          // ResizeObserver will fire a correction as soon as layout settles.
          cw = vw;
          ch = halfH;
        }

        cw = Math.max(2, cw);
        ch = Math.max(2, ch);

        if (cw === canvas.width && ch === canvas.height) return; // nothing changed

        canvas.width = cw;
        canvas.height = ch;
        colorBuf.width = cw;
        colorBuf.height = ch;
        matteBuf.width = cw;
        matteBuf.height = ch;
        configured = true;
      };

      const colorCtx = colorBuf.getContext("2d", { willReadFrequently: true })!;
      const matteCtx = matteBuf.getContext("2d", { willReadFrequently: true })!;

      // ResizeObserver fires whenever the canvas CSS dimensions change (orientation
      // change, font-size change, window resize). This keeps the buffer always
      // matched to the actual rendered size × DPR.
      const ro = new ResizeObserver(() => configureSize());
      ro.observe(canvas);

      let rafId = 0;
      const render = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(render);
        if (!configured) return;
        if (video.readyState < 2) return;

        const vw = video.videoWidth;
        const halfH = video.videoHeight / 2;
        const cw = canvas.width;
        const ch = canvas.height;

        try {
          // Top half of source = color frame
          colorCtx.drawImage(video, 0, 0, vw, halfH, 0, 0, cw, ch);
          // Bottom half of source = grayscale alpha matte
          matteCtx.drawImage(video, 0, halfH, vw, halfH, 0, 0, cw, ch);

          const colorImg = colorCtx.getImageData(0, 0, cw, ch);
          const matteImg = matteCtx.getImageData(0, 0, cw, ch);
          const cd = colorImg.data;
          const md = matteImg.data;

          // matte is grayscale (R=G=B); reading the R channel as the
          // alpha is faster than computing luminance and produces the
          // same result for a clean grayscale source.
          for (let i = 0; i < cd.length; i += 4) {
            cd[i + 3] = md[i];
          }

          ctx.putImageData(colorImg, 0, 0);
        } catch {
          // Defensive: cross-origin tainted frames or transient decode
          // errors. Stop attempting on this frame; rAF will try again.
        }
      };

      const tryPlay = () => {
        if (disposed) return;
        const p = video.play();
        if (p && typeof p.then === "function") {
          p.then(() => { if (!disposed) onPlay?.(); }).catch(() => {});
        }
      };

      tryPlay();
      video.addEventListener("loadedmetadata", configureSize);
      video.addEventListener("loadeddata", tryPlay);
      video.addEventListener("canplay", tryPlay);
      rafId = requestAnimationFrame(render);

      const gesture = () => tryPlay();
      window.addEventListener("touchstart", gesture, { passive: true });
      window.addEventListener("touchend", gesture, { passive: true });
      window.addEventListener("click", gesture, { passive: true });

      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        ro.disconnect();
        video.removeEventListener("loadedmetadata", configureSize);
        video.removeEventListener("loadeddata", tryPlay);
        video.removeEventListener("canplay", tryPlay);
        window.removeEventListener("touchstart", gesture);
        window.removeEventListener("touchend", gesture);
        window.removeEventListener("click", gesture);
      };
    }, [src, onPlay]);

    return (
      <>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          playsInline
          loop={false}
          preload="auto"
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: -10000,
            width: 320,
            height: 360,
            pointerEvents: "none",
            zIndex: 0, // must NOT be negative — iOS refuses muted-autoplay for elements behind the root stacking context
          }}
        />
        <canvas ref={canvasRef} className={className} style={style} aria-hidden="true" />
      </>
    );
  }
);

VideoAlphaMatte.displayName = "VideoAlphaMatte";
