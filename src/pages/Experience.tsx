import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";
import glitterCardImg from "@/assets/glitter-card.png";
import calmImg from "@/assets/calm.png";

// Blue accent palette (matches the rest of the site)
const DARK = "#000000";
const ACCENT = "rgba(20, 55, 150, 0.95)";
const ACCENT_SOFT = "rgba(20, 55, 150, 0.55)";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.8,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

// ─── Twinkle: 4-point star, animated, varying size/delay ──────────────────────
interface TwinkleProps {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  size?: number;
  delay?: number;
  duration?: number;
  bright?: boolean;
}
const Twinkle = ({
  top,
  left,
  right,
  bottom,
  size = 6,
  delay = 0,
  duration = 2.4,
  bright = false,
}: TwinkleProps) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top, left, right, bottom, width: size, height: size }}
    animate={{
      opacity: [0, 1, 0.5, 0],
      scale: [0.2, 1.3, 1, 0.2],
      rotate: [0, 90],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 24 24" width={size} height={size} fill={bright ? ACCENT : ACCENT_SOFT}>
      <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" />
    </svg>
  </motion.div>
);

// Tiny glowing dot
const Glint = ({
  top,
  left,
  right,
  bottom,
  delay = 0,
}: Omit<TwinkleProps, "size" | "duration" | "bright">) => (
  <motion.span
    className="absolute pointer-events-none rounded-full"
    style={{
      top,
      left,
      right,
      bottom,
      width: 3,
      height: 3,
      background: ACCENT,
      boxShadow: `0 0 8px ${ACCENT}, 0 0 14px ${ACCENT_SOFT}`,
    }}
    animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
    transition={{ duration: 1.8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const SparkleDivider = () => (
  <div className="flex items-center gap-3" style={{ color: ACCENT }}>
    <span className="block w-10 h-px" style={{ background: ACCENT, opacity: 0.55 }} />
    <span style={{ fontSize: "0.7rem" }}>✦</span>
    <span className="block w-10 h-px" style={{ background: ACCENT, opacity: 0.55 }} />
  </div>
);

// ─── Ace of Spades — real photo with mix-blend-mode to drop the black bg ──────
const SpadeCard = () => (
  <motion.div
    className="relative w-[230px] h-[140px] mx-auto flex items-center justify-center pointer-events-none"
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <img
      src={glitterCardImg}
      alt="Ace of spades with golden glitter"
      className="absolute inset-0 w-full h-full object-contain select-none"
      style={{
        // Black background of the source image disappears with screen blend,
        // leaving only the gold swirls / sparkles / white card visible
        mixBlendMode: "screen",
        filter: "brightness(1.05) contrast(1.05)",
      }}
    />
  </motion.div>
);

// ─── Calm image — real photo with mix-blend-mode to drop the dark bg ──────────
const MeditationFigure = () => (
  <motion.div
    className="relative w-[230px] h-[140px] mx-auto flex items-center justify-center pointer-events-none"
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 5, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
  >
    <img
      src={calmImg}
      alt="Meditation aura — inner work"
      className="absolute inset-0 w-full h-full object-contain select-none"
      style={{
        // calm.png is a transparent PNG, so it composites cleanly over the
        // card backdrop without needing blend-mode tricks.
        filter: "contrast(1.05) saturate(1.05)",
      }}
    />
  </motion.div>
);

interface ExperienceCardProps {
  visual: React.ReactNode;
  title: string;
  tags: string[];
  description: string;
  onClick: () => void;
  delay: number;
  cardBg?: string;
}

const DEFAULT_CARD_BG =
  "linear-gradient(160deg, rgba(255,253,248,0.7) 0%, rgba(255,250,240,0.35) 60%, rgba(255,253,248,0.55) 100%)";

const ExperienceCard = ({
  visual,
  title,
  tags,
  description,
  onClick,
  delay,
  cardBg,
}: ExperienceCardProps) => (
  <motion.div
    {...fadeUp(delay)}
    onClick={onClick}
    className="rounded-[1.5rem] px-6 py-4 md:px-8 md:py-5 flex flex-col items-center text-center cursor-pointer relative overflow-visible group"
    style={{
      background: cardBg ?? DEFAULT_CARD_BG,
      backdropFilter: "blur(34px) saturate(1.15)",
      WebkitBackdropFilter: "blur(34px) saturate(1.15)",
      border: "1px solid rgba(255,255,255,0.65)",
      boxShadow:
        "0 28px 56px rgba(20, 35, 75, 0.12), 0 0 0 1px rgba(20, 55, 150, 0.14), 0 0 60px rgba(20, 55, 150, 0.12)",
    }}
    whileHover={{
      y: -6,
      boxShadow:
        "0 34px 70px rgba(20, 35, 75, 0.18), 0 0 0 1px rgba(20, 55, 150, 0.32), 0 0 80px rgba(20, 55, 150, 0.22)",
      transition: { duration: 0.4 },
    }}
  >
    {/* Visual on top */}
    <div className="mb-1 md:mb-1.5 flex items-center justify-center">{visual}</div>

    <h2
      className="uppercase"
      style={{
        fontFamily: "'Libre Baskerville', 'Baskerville', serif",
        fontSize: "clamp(1.45rem, 2.2vw, 2rem)",
        letterSpacing: "0.06em",
        color: DARK,
        lineHeight: 1,
      }}
    >
      {title}
    </h2>

    {/* tags row */}
    <div
      className="flex items-center justify-center flex-nowrap gap-2 mt-2 mb-3 text-[0.46rem] md:text-[0.55rem] uppercase whitespace-nowrap"
      style={{
        color: ACCENT,
        letterSpacing: "0.3em",
        fontFamily: "'Nestborn', sans-serif",
        fontWeight: 600,
      }}
    >
      {tags.map((t, i) => (
        <span key={t} className="flex items-center gap-2">
          <span>{t}</span>
          {i < tags.length - 1 && <span style={{ opacity: 0.55 }}>•</span>}
        </span>
      ))}
    </div>

    <p
      className="text-[0.72rem] md:text-[0.8rem] mb-2.5 leading-snug max-w-[280px]"
      style={{
        color: DARK,
        opacity: 0.78,
        fontFamily: "'Libre Baskerville', serif",
      }}
    >
      {description}
    </p>

    <motion.span
      className="flex items-center gap-2 text-[0.66rem] md:text-[0.72rem] uppercase font-bold"
      style={{
        color: ACCENT,
        letterSpacing: "0.4em",
        fontFamily: "'Nestborn', sans-serif",
      }}
    >
      Enter
      <motion.span
        className="inline-block"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </motion.span>
    </motion.span>
  </motion.div>
);

const Experience = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      {/* Iridescent background */}
      <div className="fixed inset-0 z-0">
        <Iridescence mouseReact amplitude={0.1} speed={1} />
      </div>

      {/* Pearly white veil so the cards read against a soft silk-like backdrop */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at center, rgba(255,253,248,0.55) 0%, rgba(255,250,240,0.3) 45%, rgba(255,250,240,0.1) 80%, transparent 100%)",
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-10 py-5 md:py-6 flex justify-between items-center z-50 pointer-events-none">
        <button
          onClick={() => navigate("/")}
          className="text-[9px] md:text-[10px] tracking-[0.45em] font-bold uppercase pointer-events-auto cursor-pointer bg-transparent border-none hover:opacity-60 transition-opacity"
          style={{ color: DARK, fontFamily: "Nestborn, sans-serif" }}
          aria-label="Back to home"
        >
          Rhishav Sikdar
        </button>
        <div className="flex gap-4 md:gap-5 pointer-events-auto">
          <a
            href="https://www.instagram.com/rhishavsikdar?igsh=MWVqbGl3c2NjYzczag=="
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: `${DARK}aa` }}
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </a>
          <a
            href="https://youtube.com/@rhishavsikdar?si=iRdfGgLjCsur0Fvy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: `${DARK}aa` }}
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/rhishavsikdar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: `${DARK}aa` }}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </a>
        </div>
      </nav>

      {/* Hero — viewport-fitted */}
      <main className="relative z-[10] min-h-screen md:h-screen w-full flex flex-col items-center justify-start px-6 md:px-10 overflow-y-auto md:overflow-hidden pt-20 md:pt-24 pb-10 md:pb-0">
        <motion.div
          {...fadeUp(0.1)}
          className="text-[0.6rem] md:text-[0.68rem] tracking-[0.4em] uppercase mb-2"
          style={{
            color: ACCENT,
            fontFamily: "'Nestborn', sans-serif",
            fontWeight: 600,
          }}
        >
          Choose your experience
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mb-3">
          <SparkleDivider />
        </motion.div>

        <motion.h1
          {...fadeUp(0.3)}
          className="text-center uppercase mb-2 flex items-center gap-3"
          style={{
            fontFamily: "'Libre Baskerville', 'Baskerville', serif",
            fontSize: "clamp(1.6rem, 3.8vw, 3.2rem)",
            color: DARK,
            letterSpacing: "0.02em",
            lineHeight: 1.05,
          }}
        >
          Two Worlds. One Mind
          <span style={{ color: ACCENT, fontSize: "0.55em" }}>✦</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.4)}
          className="text-center text-xs md:text-sm mb-5 md:mb-7 max-w-md"
          style={{
            color: DARK,
            opacity: 0.7,
            fontFamily: "'Libre Baskerville', serif",
          }}
        >
          Choose the side of Rhishav you want to explore.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-[920px]">
          <ExperienceCard
            visual={<SpadeCard />}
            title="Illusion"
            tags={["Shows", "Mentalism", "Corporate Events"]}
            description="Performance, wonder, and unforgettable live experiences."
            onClick={() => navigate("/illusionist")}
            delay={0.5}
          />
          <ExperienceCard
            visual={<MeditationFigure />}
            title="Inner Work"
            tags={["Hypnotherapy", "Transformation", "Private Sessions"]}
            description="Mindset, healing, and inner transformation."
            onClick={() => navigate("/innerwork")}
            delay={0.65}
            cardBg="linear-gradient(160deg, rgba(232,240,252,0.72) 0%, rgba(225,235,250,0.4) 60%, rgba(232,240,252,0.58) 100%)"
          />
        </div>
      </main>
    </PageTransition>
  );
};

export default Experience;
