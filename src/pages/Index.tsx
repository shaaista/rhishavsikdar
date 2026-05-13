import { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import portraitImg from "@/assets/shirt.png";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin } from "lucide-react";

// Matches glassCardStyle from InnerWork/Illusionist — blue-glow glass
// (padding applied via className so it can be responsive)
const glassCard: React.CSSProperties = {
  background: "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(20, 55, 150, 0.6)",
  borderRadius: "24px",
  boxShadow: "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
  color: "#1a1a1a",
};

// 3D glass blue button — matches GetInTouchButton "blue" variant
const btnFancy: React.CSSProperties = {
  marginTop: "2rem",
  padding: "0.9rem 2.5rem",
  position: "relative",
  color: "#fff",
  borderRadius: "4rem",
  fontSize: "0.85rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: "'Nestborn', sans-serif",
  fontWeight: "bold",
  border: "1px solid rgba(10, 40, 130, 0.8)",
  background:
    "radial-gradient(ellipse 60% 30% at 20% 10%, rgba(255, 255, 255, 0.5) 0%, transparent 60%), " +
    "radial-gradient(ellipse 40% 20% at 80% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 60%), " +
    "linear-gradient(135deg, rgba(120, 180, 255, 0.7) 0%, rgba(100, 160, 255, 0.8) 50%, rgba(80, 140, 255, 0.9) 100%)",
  boxShadow:
    "inset 4px 4px 10px rgba(255, 255, 255, 0.6), " +
    "inset -4px -4px 10px rgba(255, 255, 255, 0.3), " +
    "0 15px 30px rgba(80, 140, 255, 0.5), " +
    "0 8px 15px rgba(80, 140, 255, 0.3)",
  backdropFilter: "blur(12px) saturate(1.2)",
  WebkitBackdropFilter: "blur(12px) saturate(1.2)",
  cursor: "pointer",
  display: "inline-block",
  whiteSpace: "nowrap",
};

const btnFancyHover = {
  scale: 1.02,
  y: -2,
  boxShadow:
    "inset 5px 5px 12px rgba(255, 255, 255, 0.7), " +
    "inset -5px -5px 12px rgba(255, 255, 255, 0.4), " +
    "0 20px 40px rgba(80, 140, 255, 0.6), " +
    "0 10px 20px rgba(80, 140, 255, 0.4)",
};

const Index = () => {
  const navigate = useNavigate();

  // Raw scroll + spring smoothing — replicates GSAP scrub:1.2
  const { scrollYProgress: rawProgress } = useScroll();
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Hide scrollbar on this page
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "index-hide-scrollbar";
    style.textContent = "body::-webkit-scrollbar{display:none}body{scrollbar-width:none}";
    document.head.appendChild(style);
    return () => document.getElementById("index-hide-scrollbar")?.remove();
  }, []);

  // ── Portrait scroll-driven transforms ──────────────────────────────────────
  // Matches GSAP:
  //   Phase 1 (timeline 0→2 / scroll 0→67%): x 0→+25vw, scale 1→0.8
  //   Phase 2 (timeline 1.5→3.5 / scroll 50→100%+): x →-25vw, scale →1.1
  const portraitX = useTransform(scrollYProgress, [0, 0.571, 1], ["0px", "25vw", "-25vw"]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.571, 1], [1, 0.8, 1.1]);

  // ── Title scroll-driven transforms ─────────────────────────────────────────
  // Matches GSAP: .to("#main-title", { opacity: 0, y: -150, duration: 1 }, 0)
  //   timeline 0→1 / scroll 0→33%
  const titleOpacity = useTransform(scrollYProgress, [0, 0.286], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.286], [0, -150]);

  // ── Illusion card ──────────────────────────────────────────────────────────
  // Matches GSAP:
  //   .to("#card-illusion", { opacity:1, y:-50, duration:1 }, 0.5)  → 0.167–0.5
  //   .to("#card-illusion", { opacity:0, y:-150, duration:1 }, 1.5) → 0.5–0.833
  const illusionOpacity = useTransform(scrollYProgress, [0.143, 0.429, 0.714], [0, 1, 0]);
  const illusionY = useTransform(scrollYProgress, [0.143, 0.429, 0.714], [0, -50, -150]);

  // ── InnerWork card ─────────────────────────────────────────────────────────
  // Matches GSAP:
  //   .to("#card-innerwork", { opacity:1, y:-50, duration:1 }, 2) → 0.667–1.0
  const inwOpacity = useTransform(scrollYProgress, [0.571, 0.857], [0, 1]);
  const inwY = useTransform(scrollYProgress, [0.571, 0.857], [0, -50]);

  return (
    <PageTransition>
      {/* ── Iridescent background (preserved) ── */}
      <div className="fixed inset-0 z-0">
        <Iridescence mouseReact amplitude={0.1} speed={1} />
      </div>

      {/* ── Nav — matches scroll.html nav ── */}
      <nav className="fixed top-0 w-full px-10 py-8 flex justify-between items-center z-50 pointer-events-none">
        <div
          className="text-[9px] tracking-[1.2em] font-bold text-black uppercase pointer-events-auto"
          style={{ fontFamily: "Nestborn, sans-serif" }}
        >
          Rhishav Sikdar
        </div>
        <div className="hidden md:flex gap-4 pointer-events-auto">
          <a href="https://www.instagram.com/rhishavsikdar?igsh=MWVqbGl3c2NjYzczag==" target="_blank" rel="noopener noreferrer" className="text-black/50 hover:text-black transition-colors" aria-label="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://youtube.com/@rhishavsikdar?si=iRdfGgLjCsur0Fvy" target="_blank" rel="noopener noreferrer" className="text-black/50 hover:text-black transition-colors" aria-label="YouTube">
            <Youtube className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/rhishavsikdar?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-black/50 hover:text-black transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* ── Portrait — fixed, scroll-driven (preserved image) ── */}
      <div
        className="fixed bottom-0 w-screen flex justify-center z-[10] pointer-events-none"
      >
        <motion.img
          src={portraitImg}
          alt="Rhishav Sikdar"
          className="w-[109vw] md:w-[32vw] md:min-w-[450px] max-h-screen"
          style={{
            x: portraitX,
            scale: portraitScale,
            height: "auto",
            transformOrigin: "bottom center",
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── Scroll content — 3 × 100vh sections (responsive) ── */}
      <main className="relative z-[5]">

        {/* Section 01 — Hero: title (mobile: bigger + higher; desktop: centered) */}
        <section className="h-screen flex flex-col items-center justify-start pt-[18vh] md:justify-center md:pt-0">
          <motion.div style={{ opacity: titleOpacity, y: titleY, textAlign: "center" }}>
            {/* Line 1: filled */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                className="text-[16vw] md:text-[8.5vw]"
                style={{
                  display: "block",
                  fontFamily: "'Syncopate', sans-serif",
                  lineHeight: 0.9,
                  textTransform: "uppercase",
                  color: "#000",
                  letterSpacing: "-0.01em",
                }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Rhishav
              </motion.span>
            </div>
            {/* Line 2: outline only */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                className="text-[16vw] md:text-[8.5vw]"
                style={{
                  display: "block",
                  fontFamily: "'Syncopate', sans-serif",
                  lineHeight: 0.9,
                  textTransform: "uppercase",
                  color: "transparent",
                  WebkitTextStroke: "1px black",
                  letterSpacing: "-0.01em",
                }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                Sikdar
              </motion.span>
            </div>
          </motion.div>
        </section>

        {/* Section 02 — Illusion: card on LEFT, person on RIGHT */}
        <section className="h-screen flex items-center justify-start px-4 md:px-[100px]">
          <motion.div
            className="w-[85%] md:w-[35%] max-w-[480px]"
            style={{
              opacity: illusionOpacity,
              y: illusionY,
              cursor: "pointer",
            }}
            onClick={() => navigate("/illusionist")}
          >
            <div style={glassCard} className="p-6 md:p-16">
              <h2
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                  fontFamily: "Nestborn, sans-serif",
                  color: "#1a1a1a",
                }}
              >
                ILLUSION
              </h2>
              <p
                style={{
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: 1.7,
                  fontSize: "0.875rem",
                  fontFamily: "'Libre Baskerville', serif",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Stage performances and close-up magic designed to leave your guests speechless. Eighteen years. Hundreds of stages. One purpose — to make the impossible feel personal.
              </p>
              <motion.button
                style={btnFancy}
                whileHover={btnFancyHover}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                View Work
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Section 03 — InnerWork: card on RIGHT, person on LEFT */}
        <section className="h-screen flex items-center justify-end px-4 md:px-[100px]">
          <motion.div
            className="w-[85%] md:w-[35%] max-w-[480px]"
            style={{
              opacity: inwOpacity,
              y: inwY,
              cursor: "pointer",
            }}
            onClick={() => navigate("/innerwork")}
          >
            <div style={glassCard} className="p-6 md:p-16">
              <h2
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                  fontFamily: "Nestborn, sans-serif",
                  color: "#1a1a1a",
                }}
              >
                INNERWORK
              </h2>
              <p
                style={{
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: 1.7,
                  fontSize: "0.875rem",
                  fontFamily: "'Libre Baskerville', serif",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Hypnotherapy and inner transformation sessions that go beyond the surface. Science-backed techniques for the subconscious mind — because lasting change begins from within.
              </p>
              <motion.button
                style={btnFancy}
                whileHover={btnFancyHover}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Explore Depth
              </motion.button>
            </div>
          </motion.div>
        </section>

      </main>
    </PageTransition>
  );
};

export default Index;
