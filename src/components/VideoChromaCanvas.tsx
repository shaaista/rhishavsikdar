import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Renders a transparent-background video on iOS Safari, Mac Safari, and
// Android Chrome by drawing each video frame to a <canvas> and zeroing
// the alpha of near-black pixels in JavaScript.
//
// Why this exists: iOS Safari's hardware-accelerated video decoder paints
// directly to a GPU surface that CSS `filter`, `mix-blend-mode`, and
// `mask-mode: luminance` do NOT propagate into. SVG `feColorMatrix` chroma
// keys work in Playwright's desktop WebKit and in Android Chrome, but they
// silently do nothing on real iOS Safari — the user sees a solid black
// rectangle. A canvas, by contrast, is just an ordinary CSS-paintable
// element with a normal alpha channel, so transparency renders correctly.
//
// The off-screen <video> is the frame source: iOS will autoplay it as long
// as it is muted+playsinline AND not display:none. We keep it rendered at
// its normal size, just clipped to a 1×1 sliver via `clip-path: inset`, so
// the autoplay heuristic still treats it as "visible to the user."

interface Props {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Sum of R+G+B (0–765). Pixels at or below this become fully transparent. */
  blackThreshold?: number;
  /** Soft ramp above the threshold for anti-aliased edges. */
  rampWidth?: number;
  /** Max dimension (px) the offscreen canvas downsamples to — CPU cost
   *  is O(w*h) per frame, so smaller is faster. CSS scales the canvas
   *  back up via its className/style; the chroma-key boundary is
   *  smoothed by the ramp so the resolution loss is invisible. */
  maxCanvasDim?: number;
  onPlay?: () => void;
}

export const VideoChromaCanvas = forwardRef<HTMLVideoElement, Props>(
  (
    {
      src,
      className,
      style,
      blackThreshold = 60,
      rampWidth = 90,
      maxCanvasDim = 540,
      onPlay,
    },
    forwardedRef
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(forwardedRef, () => videoRef.current as HTMLVideoElement, []);

    useEffect(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Force the autoplay attributes both as IDL props (for the autoplay
      // promise) AND HTML attributes (which iOS keys off of).
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.loop = false;

      let disposed = false;
      let configured = false;
      const configureCanvas = () => {
        if (configured) return;
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        if (!vw || !vh) return;
        const scale = Math.min(1, maxCanvasDim / Math.max(vw, vh));
        canvas.width = Math.max(2, Math.round(vw * scale));
        canvas.height = Math.max(2, Math.round(vh * scale));
        configured = true;
      };

      let rafId = 0;
      const render = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(render);
        configureCanvas();
        if (!configured) return;
        if (video.readyState < 2) return; // no usable frame yet
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = img.data;
          const t = blackThreshold;
          const r = rampWidth;
          for (let i = 0; i < d.length; i += 4) {
            const sum = d[i] + d[i + 1] + d[i + 2];
            if (sum <= t) {
              d[i + 3] = 0;
            } else if (sum < t + r) {
              d[i + 3] = ((sum - t) * 255) / r;
            }
          }
          ctx.putImageData(img, 0, 0);
        } catch {
          // CORS-tainted canvas or similar: stop trying.
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
      video.addEventListener("loadedmetadata", configureCanvas);
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
        video.removeEventListener("loadedmetadata", configureCanvas);
        video.removeEventListener("loadeddata", tryPlay);
        video.removeEventListener("canplay", tryPlay);
        window.removeEventListener("touchstart", gesture);
        window.removeEventListener("touchend", gesture);
        window.removeEventListener("click", gesture);
      };
    }, [src, blackThreshold, rampWidth, maxCanvasDim, onPlay]);

    return (
      <>
        {/* Off-screen frame source. NOT display:none, NOT opacity:0 and NOT
            a 0-sized clip — iOS Safari's autoplay heuristic refuses each
            of those because it treats them as "not visible to the user."
            Instead we keep a real 16×9 box at its natural pixel size and
            push it off the viewport with `left: -10000px`. iOS sees it as
            a fully laid-out, fully visible video element and grants the
            muted-autoplay; the user never sees it because it is just
            outside the page. */}
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
            height: 180,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
        <canvas ref={canvasRef} className={className} style={style} aria-hidden="true" />
      </>
    );
  }
);

VideoChromaCanvas.displayName = "VideoChromaCanvas";
