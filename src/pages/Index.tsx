import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideoWebm from "@/assets/test-alpha.webm";
import heroVideoMp4 from "@/assets/test-alpha.mp4";
import cardsImg from "@/assets/cards.png";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
import { VideoChromaCanvas } from "@/components/VideoChromaCanvas";
import { Instagram, Youtube, Linkedin } from "lucide-react";

const DARK = "#0f172a";
const GOLD = "#c4a373"; // warm gold accent — bullets, sparkle, button border

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.9,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

// Detect at module load time so the very first React render already knows
// whether to emit <video src={mp4}> directly (Safari/iOS/Android) or a
// <video> with <source> children (Chrome/Firefox/Edge, where the WebM with
// native VP9 alpha is preferable). Doing this synchronously is critical —
// the previous useEffect-based UA detection meant Safari saw two <source>
// children on first paint, spent its autoplay budget negotiating between
// them, and missed the muted-autoplay window before any of our code ran.
const detectNeedsMp4Path = (): boolean => {
  if (typeof navigator === "undefined") return false;
  try {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
           /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  } catch {
    return true;
  }
};

const Index = () => {
  const navigate = useNavigate();
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Lazy initializer so the value is stable across renders AND available
  // immediately, not after one useEffect tick. needsMp4Path stays true for
  // every Safari/iOS/Android user-agent so they always receive the pinned
  // MP4 src (and the chroma-key filter on the wrapping <div>).
  const [needsMp4Path] = useState<boolean>(() => detectNeedsMp4Path());
  const [isMobileVideoPlaying, setIsMobileVideoPlaying] = useState(false);
  const [isDesktopVideoPlaying, setIsDesktopVideoPlaying] = useState(false);

  // On the Chrome/Firefox/Edge path the native <video autoplay muted ...>
  // is sufficient (and its onPlay handler sets isDesktopVideoPlaying).
  // On the Safari/iOS/Android path the VideoChromaCanvas component owns
  // its own muted-attribute + retry-on-loadeddata + gesture-fallback
  // setup — see VideoChromaCanvas.tsx. No top-level useEffect needed.

  return (
    <PageTransition>
      {/* Animated iridescent background — preserved */}
      <div className="fixed inset-0 z-0">
        <Iridescence mouseReact amplitude={0.1} speed={1} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-10 py-6 md:py-8 flex justify-end items-center z-50 pointer-events-none">
        <div className="flex gap-4 md:gap-5 pointer-events-auto">
          <a
            href="https://www.instagram.com/rhishavsikdar?igsh=MWVqbGl3c2NjYzczag=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </a>
          <a
            href="https://youtube.com/@rhishavsikdar?si=iRdfGgLjCsur0Fvy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/rhishavsikdar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main
        className="relative z-[10] w-full overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {/* Desktop hero: image stays on top (z-2) so the user never sees the
            video's first paused frame; video sits behind (z-1) and is always
            opacity 1 — invisible to the user thanks to the image overlay,
            but visible to iOS Safari's autoplay heuristic so the muted-
            autoplay grant isn't withheld. The image fades out once playback
            starts, revealing the playing video underneath. */}
        <motion.div
          className="hidden md:flex absolute right-0 items-end justify-end pointer-events-none overflow-visible"
          style={{
            width: "37%",
            top: "0",
            height: "100vh",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Video layer — z-1, behind the image overlay. On Chrome/Firefox/
              Edge we render the real <video> with the WebM (native VP9 alpha
              has no need for any chroma-key hackery). On Safari/iOS/Android
              we instead render a canvas that JS-chroma-keys each frame from
              an off-screen <video> — iOS Safari's HW video pipeline ignores
              CSS filters, so canvas is the only reliable way to remove the
              MP4's black background on those devices. */}
          {needsMp4Path ? (
            <VideoChromaCanvas
              ref={desktopVideoRef}
              src={heroVideoMp4}
              onPlay={() => setIsDesktopVideoPlaying(true)}
              className="absolute bottom-0 right-0 z-[1] h-[89vh] w-auto max-w-none block select-none"
              style={{
                transform: "translateX(6%)",
                clipPath: "inset(0 10% 0 10%)",
                WebkitClipPath: "inset(0 10% 0 10%)",
                maskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
              }}
            />
          ) : (
            <video
              ref={desktopVideoRef}
              autoPlay
              muted
              playsInline
              loop={false}
              preload="auto"
              aria-label="Rhishav Sikdar — illusionist with cards"
              className="absolute bottom-0 right-0 z-[1] h-[89vh] w-auto max-w-none block select-none"
              style={{
                transform: "translateX(6%)",
                clipPath: "inset(0 10% 0 10%)",
                WebkitClipPath: "inset(0 10% 0 10%)",
                maskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
              }}
              onPlay={() => setIsDesktopVideoPlaying(true)}
              onPlaying={() => setIsDesktopVideoPlaying(true)}
              onEnded={(e) => {
                e.currentTarget.loop = false;
                e.currentTarget.pause();
              }}
            >
              <source src={heroVideoWebm} type="video/webm" />
              <source src={heroVideoMp4} type="video/mp4" />
            </video>
          )}

          {/* Image overlay — z-2, on top. Hides the video's still/first frame
              from the user until playback actually begins, then fades out. */}
          <motion.img
            src={cardsImg}
            alt="Rhishav Sikdar — illusionist with cards"
            className="absolute bottom-0 right-0 z-[2] h-[89vh] w-auto max-w-none block select-none"
            style={{
              transform: "translateX(6%)",
              clipPath: "inset(0 10% 0 10%)",
              WebkitClipPath: "inset(0 10% 0 10%)",
              maskImage:
                "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: isDesktopVideoPlaying ? 0 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Text content overlay
            Mobile: items-end pushes the name + button block to the BOTTOM
                    of the viewport (image lives above it).
            Desktop: items-center vertically centres on the left half (image
                     is absolute-positioned to the right). */}
        <div className="relative z-[2] h-full w-full flex items-end md:items-center px-6 md:pl-16 lg:pl-24 pt-4 md:pt-0 pb-10 md:pb-0">
          <div className="w-full md:w-[50%] flex flex-col gap-4 md:gap-7 items-center md:items-start">
            {/* Title — AquireLight (brand font, restored) */}
            <div className="flex flex-col leading-none text-center md:text-left">
              <motion.h1
                {...fadeUp(0.2)}
                className="uppercase text-[16vw] md:text-[8.2vw] leading-[0.95]"
                style={{
                  fontFamily: "'AquireLight', sans-serif",
                  fontWeight: 400,
                  color: DARK,
                  letterSpacing: "-0.02em",
                }}
              >
                Rhishav
              </motion.h1>
              <motion.h1
                {...fadeUp(0.35)}
                className="uppercase text-[16vw] md:text-[8.2vw] leading-[0.95]"
                style={{
                  fontFamily: "'AquireLight', sans-serif",
                  fontWeight: 400,
                  color: DARK,
                  letterSpacing: "-0.02em",
                }}
              >
                Sikdar
              </motion.h1>
            </div>

            {/* Subtitle pill row with gold bullets */}
            <motion.div
              {...fadeUp(0.55)}
              className="flex items-center gap-2 md:gap-4 text-[0.52rem] md:text-[0.78rem] tracking-[0.2em] md:tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                color: DARK,
              }}
            >
              <span>Magician</span>
              <span style={{ color: "rgba(20, 55, 150, 0.95)", fontSize: "0.9em" }}>●</span>
              <span>Mentalist</span>
              <span style={{ color: "rgba(20, 55, 150, 0.95)", fontSize: "0.9em" }}>●</span>
              <span>Hypnotherapist</span>
            </motion.div>

            {/* CTA button — matches Connect button on other pages (Nestborn font) */}
            <motion.button
              {...fadeUp(0.7)}
              onClick={() => navigate("/experience")}
              className="group flex items-center gap-3 px-7 md:px-9 py-3.5 md:py-4 rounded-full uppercase text-[0.75rem] md:text-base tracking-[0.15em] md:tracking-[0.3em] cursor-pointer font-bold whitespace-nowrap"
              style={{
                fontFamily: "'Nestborn', sans-serif",
                border: "1px solid rgba(20, 55, 150, 0.6)",
                color: DARK,
                background:
                  "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow:
                  "0 0 14px rgba(10, 40, 130, 0.55), 0 0 28px rgba(10, 40, 130, 0.3), 0 0 42px rgba(10, 40, 130, 0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span>Enter the Experience</span>
              <motion.span
                style={{
                  color: "rgba(20, 55, 150, 0.95)",
                  fontSize: "0.95rem",
                  display: "inline-block",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.span>
            </motion.button>

          </div>
        </div>

        {/* Mobile-only portrait.
            Same image-on-top / video-behind layering as the desktop block so
            iOS Safari sees an opacity-1 muted video element with a single
            src attribute (mirrors the Illusionist page's autoplay setup).
            The chroma-key filter lives on the video's wrapper, not the
            <video> itself, to avoid interfering with iOS autoplay. */}
        <div
          className="md:hidden fixed top-[6vh] left-1/2 z-[1] w-fit pointer-events-none"
          style={{
            transform: "translateX(-50%) translateZ(0)",
          }}
        >
          {/* Video layer — canvas-chroma-key render so the black background
              is truly transparent on iOS Safari and Android Chrome (CSS
              filter on a <video> doesn't reach iOS's hardware video
              compositing pipeline). */}
          <VideoChromaCanvas
            ref={mobileVideoRef}
            src={heroVideoMp4}
            onPlay={() => setIsMobileVideoPlaying(true)}
            className="absolute top-0 left-0 z-[1] w-full h-full block select-none"
            style={{
              clipPath: "inset(0 10% 0 10%)",
              WebkitClipPath: "inset(0 10% 0 10%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
            }}
          />

          {/* Image overlay — front, fades out when the video starts. */}
          <motion.img
            src={cardsImg}
            alt="Rhishav Sikdar — illusionist with cards"
            className="relative z-[2] w-[190vw] max-w-none h-auto block select-none"
            style={{
              maxHeight: "72vh",
              clipPath: "inset(0 10% 0 10%)",
              WebkitClipPath: "inset(0 10% 0 10%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
            }}
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: isMobileVideoPlaying ? 0 : 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 bottom-[-7vh] z-[2] h-[30vh] w-[124vw] -translate-x-1/2 rounded-full"
            style={{
              background: `
                radial-gradient(ellipse 60% 48% at 50% 16%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.52) 56%, transparent 100%),
                radial-gradient(ellipse 50% 36% at 22% 56%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.18) 60%, transparent 100%),
                radial-gradient(ellipse 50% 36% at 78% 56%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.16) 60%, transparent 100%)
              `,
              filter: "blur(30px)",
              opacity: 0.98,
              mixBlendMode: "screen",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 bottom-[0vh] z-[2] h-[12vh] w-[94vw] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.24) 42%, transparent 100%)",
              filter: "blur(18px)",
              opacity: 0.82,
              mixBlendMode: "screen",
            }}
          />
        </div>
      </main>
    </PageTransition>
  );
};

export default Index;
