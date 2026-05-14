import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portraitImg from "@/assets/shirt.png";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DARK = "#0f172a";
const ACCENT = "rgba(20, 55, 150, 1)";

const VERT = [
  { ch: "R", suit: "♤" },
  { ch: "H", suit: "♡" },
  { ch: "I", suit: "◇" },
  { ch: "S", suit: "♧", accent: true },
  { ch: "H", suit: "♤" },
  { ch: "A", suit: "♡" },
  { ch: "V", suit: "◇" },
];

const HORIZ = [
  { ch: "I", suit: "♧" },
  { ch: "K", suit: "♤" },
  { ch: "D", suit: "♡" },
  { ch: "A", suit: "◇" },
  { ch: "R", suit: "♧" },
];

const suitGradient =
  "linear-gradient(135deg, #f8a8d8 0%, #c1a0e4 50%, #88b8e8 100%)";

const cellStyle: React.CSSProperties = {
  display: "inline-block",
  position: "relative",
  width: "1.1em",
  height: "1.1em",
  textAlign: "center",
  lineHeight: 1.1,
};

const letterStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  left: 0,
  top: 0,
  textAlign: "center",
  color: DARK,
  lineHeight: 1.1,
  zIndex: 2,
};

const suitStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  left: 0,
  top: 0,
  textAlign: "center",
  opacity: 0,
  transform: "scale(0)",
  background: suitGradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  fontSize: "1.1em",
  lineHeight: 1.1,
  fontWeight: 700,
  zIndex: 1,
  pointerEvents: "none",
};

const glassBtn: React.CSSProperties = {
  position: "absolute",
  padding: "1.2rem 2.5rem",
  background:
    "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
  backdropFilter: "blur(25px)",
  WebkitBackdropFilter: "blur(25px)",
  border: "1px solid rgba(20, 55, 150, 0.6)",
  borderRadius: "20px",
  fontWeight: 800,
  letterSpacing: "0.2em",
  fontSize: "0.8rem",
  opacity: 0,
  boxShadow:
    "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
  zIndex: 100,
  textDecoration: "none",
  color: DARK,
  fontFamily: "'Nestborn', sans-serif",
  textTransform: "uppercase",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const Index = () => {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prevHeight = document.body.style.height;
    const prevOverflow = document.body.style.overflowX;
    document.body.style.height = "1200vh";
    document.body.style.overflowX = "hidden";

    const styleEl = document.createElement("style");
    styleEl.id = "index-hide-scrollbar";
    styleEl.textContent =
      "body::-webkit-scrollbar{display:none}body{scrollbar-width:none}";
    document.head.appendChild(styleEl);

    let mouseHandler: ((e: MouseEvent) => void) | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // ── 1. MORPH (Left Side) — letters scale to 0, icons scale up + fade in
      tl.to(
        ".letter",
        { scale: 0, opacity: 0, stagger: 0.05, duration: 0.5 },
        0,
      ).to(
        ".icon-suit",
        { scale: 1.2, opacity: 1, stagger: 0.05, duration: 0.5 },
        0.2,
      );

      // ── 2. FORM TIGHT CIRCLE IN MIDDLE
      const totalIcons = 13;
      const radius = 65;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      tl.to(
        ".icon-suit",
        {
          x: (i, target) => {
            const rect = (target as HTMLElement).getBoundingClientRect();
            const angle = (i / totalIcons) * Math.PI * 2;
            const targetX = centerX + Math.cos(angle) * radius;
            return targetX - rect.left - rect.width / 2;
          },
          y: (i, target) => {
            const rect = (target as HTMLElement).getBoundingClientRect();
            const angle = (i / totalIcons) * Math.PI * 2;
            const targetY = centerY + Math.sin(angle) * radius;
            return targetY - rect.top - rect.height / 2;
          },
          duration: 1.5,
          ease: "power3.inOut",
        },
        1,
      );

      // ── 3. BUFFER (spinning tightly)
      tl.to(
        ".icon-suit",
        { rotation: 720, duration: 2.5, ease: "none" },
        2,
      );

      // ── 4. REVEAL HERO & GLASS
      // Hero: slide horizontally to center, keep BOTTOM-anchored (no top change)
      tl.to(
        "#hero",
        { right: "50%", xPercent: 50, duration: 1.5 },
        2,
      ).to(
        ".glass-btn",
        { opacity: 1, x: 0, stagger: 0.3, duration: 1 },
        2.5,
      );

      // ── 5. ICON DISCLOSE — fly to top
      tl.to(
        ".icon-suit",
        {
          y: "-=500",
          opacity: 0,
          scale: 0.2,
          duration: 1,
          ease: "back.in(1.7)",
        },
        4.5,
      );

      // ── 6. FINAL NAME REVEAL
      tl.to(
        ".char-reveal",
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(2)",
        },
        5,
      );

      // Mouse parallax on hero image
      mouseHandler = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        if (heroImgRef.current) {
          gsap.to(heroImgRef.current, { x, y, duration: 1.5 });
        }
      };
      window.addEventListener("mousemove", mouseHandler);

      // Continuous floating idle for buttons
      gsap.to(".glass-btn", {
        y: "-=15",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, stageRef);

    return () => {
      document.body.style.height = prevHeight;
      document.body.style.overflowX = prevOverflow;
      document.getElementById("index-hide-scrollbar")?.remove();
      if (mouseHandler) window.removeEventListener("mousemove", mouseHandler);
      ctx.revert();
    };
  }, []);

  return (
    <PageTransition>
      {/* Iridescent background — preserved */}
      <div className="fixed inset-0 z-0">
        <Iridescence mouseReact amplitude={0.1} speed={1} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center z-50 pointer-events-none">
        <div
          className="text-[9px] tracking-[1.2em] font-bold text-black uppercase pointer-events-auto"
          style={{ fontFamily: "Nestborn, sans-serif" }}
        >
          Rhishav Sikdar
        </div>
        <div className="hidden md:flex gap-4 pointer-events-auto">
          <a
            href="https://www.instagram.com/rhishavsikdar?igsh=MWVqbGl3c2NjYzczag=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/50 hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/@rhishavsikdar?si=iRdfGgLjCsur0Fvy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/50 hover:text-black transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rhishavsikdar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/50 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Pinned animation stage */}
      <div
        ref={stageRef}
        className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-[10]"
      >
        {/* Initial L-shape (cross) name */}
        <div
          id="startName"
          className="absolute"
          style={{
            left: "10%",
            top: "22%",
            fontFamily: "'AquireLight', sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: DARK,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 440,
          }}
        >
          <div className="flex flex-col">
            {VERT.map((l, i) => (
              <div key={`v-${i}`} style={cellStyle}>
                <span
                  className="letter"
                  style={{
                    ...letterStyle,
                    color: l.accent ? ACCENT : DARK,
                  }}
                >
                  {l.ch}
                </span>
                <span className="icon-suit" style={suitStyle}>
                  {l.suit}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute flex" style={{ top: "3.3em", left: 0 }}>
            <div style={{ ...cellStyle, visibility: "hidden" }}>S</div>
            {HORIZ.map((l, i) => (
              <div key={`h-${i}`} style={cellStyle}>
                <span className="letter" style={letterStyle}>
                  {l.ch}
                </span>
                <span className="icon-suit" style={suitStyle}>
                  {l.suit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final name reveal — at top, AquireLight font preserved */}
        <div
          className="absolute z-[20]"
          style={{
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            fontFamily: "'AquireLight', sans-serif",
          }}
        >
          <div
            className="flex justify-center mb-1"
            style={{ gap: "12px" }}
          >
            {"RHISHAV".split("").map((c, i) => (
              <span
                key={`r-${i}`}
                className="char-reveal"
                style={{
                  display: "inline-block",
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  opacity: 0,
                  transform: "translateY(20px)",
                  color: DARK,
                  fontFamily: "'AquireLight', sans-serif",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="flex justify-center" style={{ gap: "12px" }}>
            {"SIKDAR".split("").map((c, i) => (
              <span
                key={`s-${i}`}
                className="char-reveal"
                style={{
                  display: "inline-block",
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  opacity: 0,
                  transform: "translateY(20px)",
                  color: DARK,
                  fontFamily: "'AquireLight', sans-serif",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Portrait — ALWAYS bottom-anchored, slides right -> center */}
        <div
          id="hero"
          className="absolute pointer-events-none w-[60vw] md:w-[28vw] md:max-w-[450px]"
          style={{
            right: "5%",
            bottom: 0,
            zIndex: 5,
          }}
        >
          <img
            ref={heroImgRef}
            src={portraitImg}
            alt="Rhishav Sikdar"
            className="w-full h-auto block"
            style={{
              filter: "drop-shadow(0 20px 50px rgba(10, 40, 130, 0.18))",
            }}
          />
        </div>

        {/* Glass buttons */}
        <a
          id="btn-l"
          className="glass-btn"
          style={{
            ...glassBtn,
            left: "15%",
            top: "55%",
            transform: "translateX(-150px)",
          }}
          onClick={() => navigate("/illusionist")}
        >
          Illusion
        </a>
        <a
          id="btn-r"
          className="glass-btn"
          style={{
            ...glassBtn,
            right: "15%",
            top: "55%",
            transform: "translateX(150px)",
          }}
          onClick={() => navigate("/innerwork")}
        >
          InnerWork
        </a>
      </div>
    </PageTransition>
  );
};

export default Index;
