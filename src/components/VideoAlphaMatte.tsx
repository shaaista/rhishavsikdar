import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

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
// iOS autoplay — three stacked root causes that all must be fixed:
//
//   1. "visible on-screen": WebKit only autoplays a video when it is in the
//      viewport and not hidden (opacity>0, not display:none, not scrolled
//      off). left:-10000px puts it off-screen → blocked.
//
//   2. PageTransition opacity:0: the page wrapper starts at opacity:0 and
//      fades in over 0.5 s. Any child video inherits effective opacity=0
//      for that window → iOS sees it as hidden → blocked.
//
//   3. position:fixed inside a CSS-transformed ancestor: the mobile canvas
//      parent has transform:translateX(-50%). CSS spec says position:fixed
//      inside a transformed ancestor is positioned relative to that ancestor,
//      not the viewport — the video ends up off-screen regardless of left/top.
//
// Fix for all three: createPortal(video, document.body) places the <video>
// as a direct child of <body>. <body> has no transforms and is not inside
// PageTransition, so position:fixed = true viewport and opacity is the
// element's own value. The video starts at opacity:1 (genuinely visible,
// passes WebKit's check) with a 2×2 px footprint — two pixels are
// imperceptible to users. Once play() resolves, we drop it to opacity:0.001.

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

      const configureSize = () => {
        const vw = video.videoWidth;
        const vhFull = video.videoHeight;
        if (!vw || !vhFull) return;

        const halfH = vhFull / 2;
        const dpr = (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1;
        const rect = canvas.getBoundingClientRect();

        let cw: number, ch: number;
        if (rect.width > 0 && rect.height > 0) {
          cw = Math.min(Math.round(rect.width * dpr), vw);
          ch = Math.round(cw * halfH / vw);
        } else {
          cw = vw;
          ch = halfH;
        }

        cw = Math.max(2, cw);
        ch = Math.max(2, ch);

        if (cw === canvas.width && ch === canvas.height) return;

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

      const ro = new ResizeObserver(() => configureSize());
      ro.observe(canvas);

      let rafId = 0;
      const render = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(render);
        if (!configured) return;
        if (video.readyState < 2) return;

        // Collapse the 2×2 thumbnail once it has served its autoplay-unlock
        // purpose — video is playing, canvas takes over.
        if (video.currentTime > 0 && video.style.opacity !== "0.001") {
          video.style.opacity = "0.001";
        }

        const vw = video.videoWidth;
        const halfH = video.videoHeight / 2;
        const cw = canvas.width;
        const ch = canvas.height;

        try {
          colorCtx.drawImage(video, 0, 0, vw, halfH, 0, 0, cw, ch);
          matteCtx.drawImage(video, 0, halfH, vw, halfH, 0, 0, cw, ch);

          const colorImg = colorCtx.getImageData(0, 0, cw, ch);
          const matteImg = matteCtx.getImageData(0, 0, cw, ch);
          const cd = colorImg.data;
          const md = matteImg.data;

          for (let i = 0; i < cd.length; i += 4) {
            cd[i + 3] = md[i];
          }

          ctx.putImageData(colorImg, 0, 0);
        } catch {
          // cross-origin tainted frames or transient decode errors — rAF retries
        }
      };

      const tryPlay = () => {
        if (disposed) return;
        const p = video.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            if (!disposed) {
              onPlay?.();
              video.style.opacity = "0.001";
            }
          }).catch(() => {});
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

    // 2×2 px at opacity:1, portaled to <body> — imperceptible to users but
    // genuinely on-screen so iOS grants muted-autoplay. Opacity drops to
    // 0.001 the moment the video starts playing.
    const videoEl = (
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
          bottom: 0,
          right: 0,
          width: 2,
          height: 2,
          opacity: 1,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    );

    return (
      <>
        {typeof document !== "undefined"
          ? createPortal(videoEl, document.body)
          : videoEl}
        <canvas ref={canvasRef} className={className} style={style} aria-hidden="true" />
      </>
    );
  }
);

VideoAlphaMatte.displayName = "VideoAlphaMatte";
