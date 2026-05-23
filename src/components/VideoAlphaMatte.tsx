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
  /** Max dimension (px) the offscreen canvas downsamples to — CPU cost
   *  is O(w*h) per frame. CSS scales the canvas back up. */
  maxCanvasDim?: number;
  onPlay?: () => void;
}

export const VideoAlphaMatte = forwardRef<HTMLVideoElement, Props>(
  ({ src, className, style, maxCanvasDim = 540, onPlay }, forwardedRef) => {
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
      const configureSize = () => {
        if (configured) return;
        const vw = video.videoWidth;
        const vhFull = video.videoHeight;
        if (!vw || !vhFull) return;
        const halfH = vhFull / 2;
        const scale = Math.min(1, maxCanvasDim / Math.max(vw, halfH));
        const cw = Math.max(2, Math.round(vw * scale));
        const ch = Math.max(2, Math.round(halfH * scale));
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

      let rafId = 0;
      const render = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(render);
        configureSize();
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
        video.removeEventListener("loadedmetadata", configureSize);
        video.removeEventListener("loadeddata", tryPlay);
        video.removeEventListener("canplay", tryPlay);
        window.removeEventListener("touchstart", gesture);
        window.removeEventListener("touchend", gesture);
        window.removeEventListener("click", gesture);
      };
    }, [src, maxCanvasDim, onPlay]);

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
            height: 360, // matches the 16:9 color half stacked over its 16:9 matte
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
        <canvas ref={canvasRef} className={className} style={style} aria-hidden="true" />
      </>
    );
  }
);

VideoAlphaMatte.displayName = "VideoAlphaMatte";
