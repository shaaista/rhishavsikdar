import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import cardsImg from "@/assets/cards.png";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin } from "lucide-react";

const DARK = "#0f172a";
const ACCENT_DOT = "rgba(20, 55, 150, 0.95)";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      {/* Animated iridescent background — preserved */}
      <div className="fixed inset-0 z-0">
        <Iridescence mouseReact amplitude={0.1} speed={1} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center z-50 pointer-events-none">
        <div
          className="text-[9px] md:text-[10px] tracking-[0.45em] font-bold text-black uppercase pointer-events-auto"
          style={{ fontFamily: "Nestborn, sans-serif" }}
        >
          Rhishav Sikdar
        </div>
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
      <main className="relative z-[10] min-h-screen w-full flex items-center px-6 md:px-16 lg:px-24 pt-24 md:pt-0 pb-12 md:pb-0">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-8">
          {/* Left — text content */}
          <div className="flex-1 flex flex-col gap-6 md:gap-7 items-start w-full">
            {/* Title */}
            <div className="flex flex-col leading-none">
              <motion.h1
                {...fadeUp(0.2)}
                className="uppercase font-black text-[16vw] md:text-[8.2vw] leading-[0.95]"
                style={{
                  fontFamily: "'AquireLight', sans-serif",
                  color: DARK,
                  letterSpacing: "-0.02em",
                }}
              >
                Rhishav
              </motion.h1>
              <motion.h1
                {...fadeUp(0.35)}
                className="uppercase font-black text-[16vw] md:text-[8.2vw] leading-[0.95]"
                style={{
                  fontFamily: "'AquireLight', sans-serif",
                  color: "transparent",
                  WebkitTextStroke: `1px ${DARK}`,
                  letterSpacing: "-0.02em",
                }}
              >
                Sikdar
              </motion.h1>
            </div>

            {/* Subtitle pill row */}
            <motion.div
              {...fadeUp(0.55)}
              className="flex items-center gap-2 md:gap-3 text-[0.65rem] md:text-[0.78rem] tracking-[0.32em] uppercase"
              style={{ fontFamily: "Nestborn, sans-serif", color: DARK }}
            >
              <span>Magician</span>
              <span style={{ color: ACCENT_DOT }}>•</span>
              <span>Mentalist</span>
              <span style={{ color: ACCENT_DOT }}>•</span>
              <span>Illusionist</span>
            </motion.div>

            {/* CTA button */}
            <motion.button
              {...fadeUp(0.7)}
              onClick={() => navigate("/illusionist")}
              className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full uppercase text-[0.7rem] md:text-[0.8rem] tracking-[0.3em] cursor-pointer"
              style={{
                fontFamily: "Nestborn, sans-serif",
                border: `1px solid ${DARK}`,
                color: DARK,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              whileHover={{
                scale: 1.04,
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span>Enter the Experience</span>
              <motion.span
                style={{ color: ACCENT_DOT, fontSize: "0.9rem" }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.span>
            </motion.button>
          </div>

          {/* Right — cards image with floating animation */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end w-full"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={cardsImg}
              alt="Rhishav Sikdar — illusionist with cards"
              className="w-full max-w-[420px] md:max-w-[640px] h-auto block pointer-events-none select-none"
              style={{
                filter: "drop-shadow(0 25px 60px rgba(10, 40, 130, 0.18))",
              }}
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Index;
