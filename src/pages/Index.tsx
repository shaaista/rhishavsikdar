import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideoWebm from "@/assets/test-alpha.webm";
import heroVideoMp4 from "@/assets/test-alpha.mp4";
import cardsImg from "@/assets/cards.png";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
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

const Index = () => {
  const navigate = useNavigate();
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  const [useImageFallback, setUseImageFallback] = useState(true);
  const [isMobileVideoPlaying, setIsMobileVideoPlaying] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // On mobile, try rendering the video for both Android and iOS
      // mixBlendMode: "lighten" will blend away the black background on iOS
      setUseImageFallback(false);
    } else {
      // On desktop, only render the video if it is not Safari (since desktop doesn't use blend mode)
      if (!isSafari) {
        setUseImageFallback(false);
      } else {
        setUseImageFallback(true);
      }
    }
  }, []);

  useEffect(() => {
    let cleanupListeners: (() => void) | null = null;

    if (isMounted && !useImageFallback) {
      const playVideo = async (video: HTMLVideoElement | null) => {
        if (!video) return;

        // Force core autoplay attributes directly on the DOM element
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.loop = false;
        video.removeAttribute("loop");

        // If the browser already started playing it natively, sync state immediately
        if (video === mobileVideoRef.current && !video.paused) {
          setIsMobileVideoPlaying(true);
          return;
        }

        try {
          await video.play();
          if (video === mobileVideoRef.current) {
            setIsMobileVideoPlaying(true);
          }
        } catch (error) {
          console.warn("Autoplay blocked. Registering interaction listeners.", error);
          
          // Fallback: Attempt playing on first user gesture
          const playOnGesture = async () => {
            try {
              await video.play();
              if (video === mobileVideoRef.current) {
                setIsMobileVideoPlaying(true);
              }
              cleanup();
            } catch (err) {
              console.error("Playback failed even on user gesture:", err);
            }
          };

          const cleanup = () => {
            window.removeEventListener("touchstart", playOnGesture);
            window.removeEventListener("click", playOnGesture);
            window.removeEventListener("scroll", playOnGesture);
          };

          cleanupListeners = cleanup;
          window.addEventListener("touchstart", playOnGesture, { passive: true });
          window.addEventListener("click", playOnGesture, { passive: true });
          window.addEventListener("scroll", playOnGesture, { passive: true });
        }
      };

      // Play synchronously without setTimeout to bypass Safari autoplay restrictions
      playVideo(desktopVideoRef.current);
      playVideo(mobileVideoRef.current);
    }

    return () => {
      if (cleanupListeners) {
        cleanupListeners();
      }
    };
  }, [isMounted, useImageFallback]);

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
        {/* Cards image — taller than viewport, anchored to bottom so the float
            never reveals a gap. Left edge fades into the iridescent bg. */}
        <motion.div
          className="hidden md:flex absolute right-0 items-end justify-end pointer-events-none overflow-visible"
          style={{ width: "37%", top: "0", height: "100vh" }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Removed delay and shortened duration for instant load
        >
          {!isMounted || useImageFallback ? (
            <motion.img
              src={cardsImg}
              alt="Rhishav Sikdar — illusionist with cards"
              className="h-[89vh] w-auto max-w-none block select-none"
              style={{
                transform: "translateX(6%)", // Match desktop translation
                clipPath: "inset(0 10% 0 10%)",
                WebkitClipPath: "inset(0 10% 0 10%)",
                maskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
              }}
            />
          ) : (
            <motion.video
              ref={desktopVideoRef}
              autoPlay
              muted
              playsInline
              loop={false}
              preload="auto"
              aria-label="Rhishav Sikdar — illusionist with cards"
              className="h-[89vh] w-auto max-w-none block select-none"
              style={{
                transform: "translateX(6%)", // Shifted further right on desktop
                clipPath: "inset(0 10% 0 10%)",
                WebkitClipPath: "inset(0 10% 0 10%)",
                maskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
              }}
              onEnded={(e) => {
                e.currentTarget.loop = false;
                e.currentTarget.pause();
              }}
              onError={() => {
                console.log("Desktop video decode/playback error, falling back to image");
                setUseImageFallback(true);
              }}
            >
              <source 
                src={heroVideoWebm} 
                type="video/webm" 
                onError={() => {
                  console.log("Desktop video source error, falling back to image");
                  setUseImageFallback(true);
                }}
              />
            </motion.video>
          )}
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
            The source PNG has substantial empty space on the left, so the
            wrapper translates by image-width percentage to keep the subject
            centered over the stacked name without affecting desktop. */}
        <div
          className="md:hidden fixed top-[6vh] left-1/2 z-[1] w-fit pointer-events-none"
          style={{
            transform: "translateX(-50%) translateZ(0)",
            mixBlendMode: isMobileVideoPlaying ? "lighten" : "normal",
            willChange: "transform, mix-blend-mode",
          }} // Center aligned on mobile
        >
          {/* Static Image Layer */}
          <motion.img
            src={cardsImg}
            alt="Rhishav Sikdar — illusionist with cards"
            className="relative z-[1] w-[190vw] max-w-none h-auto block select-none"
            style={{
              maxHeight: "72vh",
              clipPath: "inset(0 10% 0 10%)",
              WebkitClipPath: "inset(0 10% 0 10%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: isMobileVideoPlaying ? 0 : 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Video Layer */}
          <motion.video
            ref={mobileVideoRef}
            autoPlay
            muted
            playsInline
            loop={false}
            preload="auto"
            aria-label="Rhishav Sikdar — illusionist with cards"
            className="absolute top-0 left-0 z-[2] w-full h-full block select-none"
            style={{
              clipPath: "inset(0 10% 0 10%)",
              WebkitClipPath: "inset(0 10% 0 10%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.62) 91%, transparent 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobileVideoPlaying ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            onPlay={() => {
              setIsMobileVideoPlaying(true);
            }}
            onEnded={(e) => {
              e.currentTarget.loop = false;
              e.currentTarget.pause();
            }}
            onError={() => {
              console.log("Mobile video decode/playback error");
              setIsMobileVideoPlaying(false);
            }}
          >
            <source 
              src={heroVideoMp4} 
              type="video/mp4" 
            />
          </motion.video>
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
