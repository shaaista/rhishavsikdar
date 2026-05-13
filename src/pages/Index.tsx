import { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import portraitImg from "@/assets/shirt.png";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin } from "lucide-react";

// Matches scroll.html .glass-card exactly
const glassCard: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(40px)",
  WebkitBackdropFilter: "blur(40px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  padding: "4rem",
  borderRadius: "24px",
  boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
  color: "#1a1a1a",
};

// Matches scroll.html .btn-fancy exactly
const btnFancy: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1.2rem 3.5rem",
  background: "#000",
  color: "#fff",
  borderRadius: "100px",
  fontSize: "11px",
  letterSpacing: "4px",
  textTransform: "uppercase",
  fontFamily: "Nestborn, sans-serif",
  border: "none",
  cursor: "pointer",
  display: "inline-block",
  whiteSpace: "nowrap",
  transition: "transform 0.4s, background 0.4s",
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
  const portraitX = useTransform(scrollYProgress, [0, 0.67, 1], ["0px", "25vw", "-25vw"]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.67, 1], [1, 0.8, 1.1]);

  // ── Title scroll-driven transforms ─────────────────────────────────────────
  // Matches GSAP: .to("#main-title", { opacity: 0, y: -150, duration: 1 }, 0)
  //   timeline 0→1 / scroll 0→33%
  const titleOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.33], [0, -150]);

  // ── Illusion card ──────────────────────────────────────────────────────────
  // Matches GSAP:
  //   .to("#card-illusion", { opacity:1, y:-50, duration:1 }, 0.5)  → 0.167–0.5
  //   .to("#card-illusion", { opacity:0, y:-150, duration:1 }, 1.5) → 0.5–0.833
  const illusionOpacity = useTransform(scrollYProgress, [0.167, 0.5, 0.833], [0, 1, 0]);
  const illusionY = useTransform(scrollYProgress, [0.167, 0.5, 0.833], [0, -50, -150]);

  // ── InnerWork card ─────────────────────────────────────────────────────────
  // Matches GSAP:
  //   .to("#card-innerwork", { opacity:1, y:-50, duration:1 }, 2) → 0.667–1.0
  const inwOpacity = useTransform(scrollYProgress, [0.667, 1.0], [0, 1]);
  const inwY = useTransform(scrollYProgress, [0.667, 1.0], [0, -50]);

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
          style={{
            x: portraitX,
            scale: portraitScale,
            width: "32vw",
            minWidth: "340px",
            height: "auto",
            objectFit: "contain",
            objectPosition: "bottom",
            filter: "brightness(1) contrast(1.12) saturate(1.1)",
            maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
          }}
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── Scroll content — 3 × 100vh sections ── */}
      <main className="relative z-[5]">

        {/* Section 01 — Hero: centered name */}
        <section
          style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
          <motion.div style={{ opacity: titleOpacity, y: titleY, textAlign: "center" }}>
            {/* Line 1: filled */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                style={{
                  display: "block",
                  fontFamily: "'Syncopate', sans-serif",
                  fontSize: "8.5vw",
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
                style={{
                  display: "block",
                  fontFamily: "'Syncopate', sans-serif",
                  fontSize: "8.5vw",
                  lineHeight: 0.9,
                  textTransform: "uppercase",
                  color: "transparent",
                  WebkitTextStroke: "1.5px black",
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
        <section
          style={{ height: "100vh", display: "flex", alignItems: "center", padding: "0 8vw" }}
        >
          <motion.div
            style={{
              width: "35%",
              maxWidth: "480px",
              minWidth: "280px",
              opacity: illusionOpacity,
              y: illusionY,
              cursor: "pointer",
            }}
            onClick={() => navigate("/illusionist")}
          >
            <div style={glassCard}>
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
              <button style={btnFancy}>View Work</button>
            </div>
          </motion.div>
        </section>

        {/* Section 03 — InnerWork: card on RIGHT, person on LEFT */}
        <section
          style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 8vw" }}
        >
          <motion.div
            style={{
              width: "35%",
              maxWidth: "480px",
              minWidth: "280px",
              opacity: inwOpacity,
              y: inwY,
              cursor: "pointer",
            }}
            onClick={() => navigate("/innerwork")}
          >
            <div style={glassCard}>
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
              <button style={btnFancy}>Explore Depth</button>
            </div>
          </motion.div>
        </section>

      </main>
    </PageTransition>
  );
};

export default Index;
