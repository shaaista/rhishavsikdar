import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import portraitImg from "@/assets/shirt.png";
import Iridescence from "@/components/Iridescence";
import SplitName from "@/components/SplitName";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin, ArrowUpRight } from "lucide-react";

const NAME_TOTAL_DURATION_MS = 1500;

const glassCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, hsla(0,0%,100%,0.12) 0%, hsla(0,0%,100%,0.05) 100%)",
  border: "1px solid rgba(20, 55, 150, 0.6)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow:
    "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1), 0 20px 60px hsla(0,0%,0%,0.2)",
  borderRadius: "1.5rem",
};

const Index = () => {
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Track window scroll — works with natural body scroll
  const { scrollYProgress } = useScroll();

  // Portrait horizontal movement — desktop only
  const portraitXDesktop = useTransform(
    scrollYProgress,
    [0, 0.28, 0.45, 0.70, 0.85, 1],
    ["0vw", "0vw", "22vw", "22vw", "-22vw", "-22vw"]
  );
  const portraitXMobile = useTransform(scrollYProgress, [0, 1], ["0vw", "0vw"]);
  const portraitScrollScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.88, 1.02]);

  // Hero name — fades + lifts on scroll
  const nameOpacity = useTransform(scrollYProgress, [0, 0.15, 0.28], [1, 1, 0]);
  const nameY = useTransform(scrollYProgress, [0.15, 0.3], ["0px", "-36px"]);

  // Illusion card
  const illusionOpacity = useTransform(scrollYProgress, [0.22, 0.35, 0.60, 0.70], [0, 1, 1, 0]);
  const illusionY = useTransform(scrollYProgress, [0.22, 0.35], ["18px", "0px"]);

  // InnerWork card
  const inwOpacity = useTransform(scrollYProgress, [0.66, 0.80], [0, 1]);
  const inwY = useTransform(scrollYProgress, [0.66, 0.80], ["18px", "0px"]);

  // Scroll hint
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05, 0.14], [1, 1, 0]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide scrollbar for this page only
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "index-hide-scrollbar";
    style.textContent = "body::-webkit-scrollbar{display:none}body{scrollbar-width:none}";
    document.head.appendChild(style);
    return () => document.getElementById("index-hide-scrollbar")?.remove();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), NAME_TOTAL_DURATION_MS);
    return () => window.clearTimeout(t);
  }, []);

  const CardContent = ({ title, eyebrow, description }: { title: string; eyebrow: string; description: string }) => (
    <div style={glassCardStyle} className="p-7 md:p-9 flex flex-col gap-4">
      <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase text-black/55">
        <span className="inline-block w-7 h-[1px]" style={{ background: "rgba(0,0,0,0.35)" }} aria-hidden="true" />
        <span style={{ fontFamily: "Nestborn, sans-serif" }}>{eyebrow}</span>
      </div>
      <h2
        className="text-[2.6rem] leading-tight text-black"
        style={{ fontFamily: "'Libre Baskerville', serif" }}
      >
        {title}
      </h2>
      <p
        className="text-base leading-relaxed font-light text-black/70"
        style={{ fontFamily: "'Libre Baskerville', serif" }}
      >
        {description}
      </p>
      <div
        className="flex items-center gap-2 text-black/50 text-sm pt-1"
        style={{ fontFamily: "Nestborn, sans-serif" }}
      >
        <span>Explore</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="relative">
        {/* Scroll height — 3 screens to drive the animation */}
        <div style={{ height: "300vh" }} aria-hidden="true" />

        {/* Iridescent background */}
        <div className="fixed inset-0 z-0">
          <Iridescence mouseReact amplitude={0.1} speed={1} />
        </div>

        {/* Light overlay */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsla(0,0%,100%,0.1) 0%, hsla(0,0%,100%,0.15) 40%, hsla(0,0%,100%,0.25) 100%)",
          }}
        />

        {/* SVG liquid filter */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.018"
                numOctaves={4}
                seed={5}
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.012 0.018;0.016 0.014;0.012 0.018"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Portrait — scroll-driven horizontal position */}
        <motion.div
          className="fixed bottom-0 w-screen flex justify-center z-[3] pointer-events-none"
          style={{
            x: isMobile ? portraitXMobile : portraitXDesktop,
            scale: portraitScrollScale,
          }}
        >
          <motion.img
            src={portraitImg}
            alt="Rhishav Sikdar"
            className="w-auto h-full max-h-[76vh] md:max-h-[90vh] object-contain object-bottom drop-shadow-2xl"
            style={{
              filter: "brightness(1) contrast(1.15) saturate(1.1)",
              translateY: isMobile ? "-2vh" : "-8vh",
              maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={
              revealed
                ? {
                    scale: { type: "spring", stiffness: 38, damping: 18, mass: 1.4, delay: 0.15 },
                    opacity: { duration: 0.8, delay: 0.15 },
                  }
                : { duration: 0.3 }
            }
          />
        </motion.div>

        {/* Name — fades out on scroll */}
        <motion.div
          className="fixed top-0 w-screen z-[4] pointer-events-none flex flex-col items-center pt-[12vh] md:pt-[4vh]"
          style={{ opacity: nameOpacity, y: nameY }}
        >
          <SplitName startDelay={0.15} />
        </motion.div>

        {/* ── Illusion card ── */}
        {/* Desktop: fixed left-center */}
        <motion.div
          className="fixed left-[5vw] top-1/2 z-[5] w-[36vw] max-w-[400px] pointer-events-auto cursor-pointer hidden md:block"
          style={{ opacity: illusionOpacity, y: illusionY, translateY: "-50%" }}
          onClick={() => navigate("/illusionist")}
        >
          <CardContent
            title="Illusion"
            eyebrow="Mentalism & Magic"
            description="Immersive stage performances and close-up magic crafted for corporate events, weddings & private celebrations."
          />
        </motion.div>

        {/* Mobile: fixed bottom-center */}
        <motion.div
          className="fixed bottom-6 left-4 right-4 z-[5] pointer-events-auto cursor-pointer block md:hidden"
          style={{ opacity: illusionOpacity, y: illusionY }}
          onClick={() => navigate("/illusionist")}
        >
          <CardContent
            title="Illusion"
            eyebrow="Mentalism & Magic"
            description="Immersive performances for corporate events, weddings & private celebrations."
          />
        </motion.div>

        {/* ── InnerWork card ── */}
        {/* Desktop: fixed right-center */}
        <motion.div
          className="fixed right-[5vw] top-1/2 z-[5] w-[36vw] max-w-[400px] pointer-events-auto cursor-pointer hidden md:block"
          style={{ opacity: inwOpacity, y: inwY, translateY: "-50%" }}
          onClick={() => navigate("/innerwork")}
        >
          <CardContent
            title="InnerWork"
            eyebrow="Hypnotherapy & Healing"
            description="A deeply personal journey into hypnotherapy and the subconscious — transformative sessions that create lasting change."
          />
        </motion.div>

        {/* Mobile: fixed bottom-center */}
        <motion.div
          className="fixed bottom-6 left-4 right-4 z-[5] pointer-events-auto cursor-pointer block md:hidden"
          style={{ opacity: inwOpacity, y: inwY }}
          onClick={() => navigate("/innerwork")}
        >
          <CardContent
            title="InnerWork"
            eyebrow="Hypnotherapy & Healing"
            description="A deeply personal journey into hypnotherapy and the subconscious — transformative sessions that create lasting change."
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="fixed bottom-8 left-1/2 z-[10] pointer-events-none"
          style={{ opacity: scrollHintOpacity, translateX: "-50%" }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[0.6rem] tracking-[0.35em] uppercase text-black/35"
              style={{ fontFamily: "Nestborn, sans-serif" }}
            >
              Scroll
            </span>
            <div className="w-px h-6 bg-black/20" />
          </div>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="fixed bottom-6 right-6 z-[10] hidden md:flex gap-4 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: revealed ? 0.9 : 0 }}
        >
          <a
            href="https://www.instagram.com/rhishavsikdar?igsh=MWVqbGl3c2NjYzczag=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://youtube.com/@rhishavsikdar?si=iRdfGgLjCsur0Fvy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/rhishavsikdar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Index;
