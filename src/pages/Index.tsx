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

const VERT = [
  { ch: "R", suit: "♠" },
  { ch: "H", suit: "♥" },
  { ch: "I", suit: "♣" },
  { ch: "S", suit: "♦" },
  { ch: "H", suit: "♠" },
  { ch: "A", suit: "♥" },
  { ch: "V", suit: "♣" },
];

const HORIZ = [
  { ch: "I", suit: "♦" },
  { ch: "K", suit: "♠" },
  { ch: "D", suit: "♥" },
  { ch: "A", suit: "♣" },
  { ch: "R", suit: "♦" },
];

// 12 deterministic scattered starting positions for the suits
// (loose ellipse around the L-shape's center, with rotation)
const SCATTER = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2 + i * 0.31;
  const radius = 220 + ((i * 27) % 120);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.55,
    rot: ((i * 67) % 360) - 180,
  };
});

// Pink → blue gradient for the card suits
const suitGradient =
  "linear-gradient(135deg, #f8a8d8 0%, #c1a0e4 50%, #88b8e8 100%)";

const suitStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  background: suitGradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  fontSize: "1.1em",
  lineHeight: 1,
  fontWeight: 700,
  pointerEvents: "none",
};

const letterCellStyle: React.CSSProperties = {
  position: "relative",
  width: "1em",
  height: "1em",
  textAlign: "center",
  lineHeight: 1,
  overflow: "visible",
};

const letterStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  opacity: 0,
  color: DARK,
  lineHeight: 1,
};

const glassBtn: React.CSSProperties = {
  position: "absolute",
  padding: "1rem 2.2rem",
  background: "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(20, 55, 150, 0.6)",
  borderRadius: "20px",
  fontWeight: 700,
  letterSpacing: "0.2em",
  opacity: 0,
  boxShadow:
    "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
  zIndex: 25,
  textDecoration: "none",
  color: DARK,
  fontFamily: "'Nestborn', sans-serif",
  textTransform: "uppercase",
  fontSize: "0.85rem",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevHeight = document.body.style.height;
    const prevOverflow = document.body.style.overflowX;
    document.body.style.height = "500vh";
    document.body.style.overflowX = "hidden";

    const style = document.createElement("style");
    style.id = "index-hide-scrollbar";
    style.textContent =
      "body::-webkit-scrollbar{display:none}body{scrollbar-width:none}";
    document.head.appendChild(style);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Phase 1: Suits fly from scattered positions into their L-shape letter positions
      tl.to(".suit", {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
      });

      // Phase 2: Suits fade out, letters fade in (the suits transform INTO the letters)
      tl.to(".suit", { opacity: 0, duration: 0.35, stagger: 0.03 }, "+=0.2");
      tl.to(".char-letter", { opacity: 1, duration: 0.35, stagger: 0.03 }, "<");

      // Phase 3: L-shape name fades, big stacked name reveals at top
      tl.to("#lShapeName", { opacity: 0, duration: 0.5 }, "+=0.4");
      tl.to("#endName", { opacity: 1, top: "8%", duration: 0.7 }, "<");

      // Phase 4: Portrait slides from right to center (still bottom-anchored)
      tl.to(
        "#person",
        {
          right: "50%",
          xPercent: 50,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "<0.1",
      );

      // Phase 5: Glass buttons fly in
      tl.to(
        ".glass-btn",
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "+=0.3",
      );

      // Floating idle animation for buttons (continuous)
      gsap.to(".glass-btn", {
        y: "-=10",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => {
      document.body.style.height = prevHeight;
      document.body.style.overflowX = prevOverflow;
      document.getElementById("index-hide-scrollbar")?.remove();
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
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[5]"
      >
        {/* L-shape name (initial state — visible) */}
        <div
          id="lShapeName"
          className="absolute left-[8%] md:left-[10%] z-[10]"
          style={{
            top: "22%",
            fontFamily: "'AquireLight', sans-serif",
            fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
            color: DARK,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 440,
          }}
        >
          {/* Vertical column — RHISHAV */}
          <div className="flex flex-col">
            {VERT.map((l, i) => {
              const scatter = SCATTER[i];
              return (
                <div key={`v-${i}`} style={letterCellStyle}>
                  <span className="char-letter" style={letterStyle}>
                    {l.ch}
                  </span>
                  <span
                    className="suit"
                    style={{
                      ...suitStyle,
                      transform: `translate(${scatter.x}px, ${scatter.y}px) rotate(${scatter.rot}deg)`,
                    }}
                  >
                    {l.suit}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Horizontal row — IKDAR, sitting at the "S" row, shifted right past the column */}
          <div className="absolute flex" style={{ top: "3.3em", left: 0 }}>
            <div style={{ width: "1em" }} aria-hidden="true" />
            {HORIZ.map((l, i) => {
              const scatter = SCATTER[VERT.length + i];
              return (
                <div key={`h-${i}`} style={letterCellStyle}>
                  <span className="char-letter" style={letterStyle}>
                    {l.ch}
                  </span>
                  <span
                    className="suit"
                    style={{
                      ...suitStyle,
                      transform: `translate(${scatter.x}px, ${scatter.y}px) rotate(${scatter.rot}deg)`,
                    }}
                  >
                    {l.suit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final stacked name — AquireLight (initially hidden, fades in at top) */}
        <div
          id="endName"
          className="absolute left-1/2 -translate-x-1/2 text-center z-[20]"
          style={{ top: "5%", opacity: 0 }}
        >
          <h1
            className="uppercase tracking-[0.2em] leading-none text-[14vw] md:text-[9vw] font-[770] md:font-[440]"
            style={{ fontFamily: "'AquireLight', sans-serif", color: DARK }}
          >
            RHISHAV
          </h1>
          <h1
            className="uppercase tracking-[0.2em] leading-none text-[14vw] md:text-[9vw] font-[770] md:font-[440]"
            style={{ fontFamily: "'AquireLight', sans-serif", color: DARK }}
          >
            SIKDAR
          </h1>
        </div>

        {/* Portrait — ALWAYS bottom-anchored, never floats. Starts right, slides to center */}
        <div
          id="person"
          className="absolute z-[15] pointer-events-none w-[60vw] md:w-[28vw] md:max-w-[360px]"
          style={{
            right: "5%",
            bottom: 0,
          }}
        >
          <img
            src={portraitImg}
            alt="Rhishav Sikdar"
            className="w-full h-auto block"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(10, 40, 130, 0.18))",
            }}
          />
        </div>

        {/* Glass buttons */}
        <a
          id="btn-illusion"
          className="glass-btn"
          style={{
            ...glassBtn,
            left: "10%",
            top: "78%",
            transform: "translateX(-120px)",
          }}
          onClick={() => navigate("/illusionist")}
        >
          Illusion
        </a>
        <a
          id="btn-innerwork"
          className="glass-btn"
          style={{
            ...glassBtn,
            right: "10%",
            top: "78%",
            transform: "translateX(120px)",
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
