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

const TOTAL = VERT.length + HORIZ.length; // 12

const suitGradient =
  "linear-gradient(135deg, #f8a8d8 0%, #c1a0e4 50%, #88b8e8 100%)";

const suitStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  opacity: 0,
  background: suitGradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  fontSize: "1em",
  lineHeight: 1,
  fontWeight: 700,
  pointerEvents: "none",
  willChange: "transform, opacity",
};

const cellStyle: React.CSSProperties = {
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
  color: DARK,
  lineHeight: 1,
};

const glassBtn: React.CSSProperties = {
  position: "absolute",
  padding: "1rem 2.2rem",
  background:
    "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
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

    const styleEl = document.createElement("style");
    styleEl.id = "index-hide-scrollbar";
    styleEl.textContent =
      "body::-webkit-scrollbar{display:none}body{scrollbar-width:none}";
    document.head.appendChild(styleEl);

    // Approximate the suit's natural (untransformed) position so we can compute
    // GSAP transform offsets to reach absolute viewport targets.
    const lShapeOrigin = (i: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // matches the L-shape font: clamp(2.2rem, 5.5vw, 4.2rem)
      const fontPx = Math.min(Math.max(35.2, 0.055 * vw), 67.2);
      const cell = fontPx;
      const lx = 0.1 * vw;
      const ly = 0.22 * vh;
      if (i < VERT.length) {
        return { x: lx + cell / 2, y: ly + i * cell + cell / 2 };
      }
      const hi = i - VERT.length;
      return {
        x: lx + (hi + 1) * cell + cell / 2,
        y: ly + 3.3 * cell + cell / 2,
      };
    };

    const circleTarget = (i: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const angle = (i / TOTAL) * Math.PI * 2;
      const radius = Math.min(180, vw * 0.16);
      return {
        x: vw / 2 + Math.cos(angle) * radius,
        y: vh * 0.42 + Math.sin(angle) * radius,
      };
    };

    const topTarget = (i: number) => {
      const vw = window.innerWidth;
      const spacing = Math.min(48, vw * 0.045);
      return {
        x: vw / 2 + (i - (TOTAL - 1) / 2) * spacing,
        y: 110,
      };
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // ── Phase 1: Letters TURN INTO suits (in place at L-shape positions)
      tl.to(".char-letter", {
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
      });
      tl.to(
        ".suit",
        { opacity: 1, duration: 0.4, stagger: 0.04 },
        "<",
      );

      // ── Phase 2: Suits fly from L-shape into a CIRCLE around viewport center
      tl.to(
        ".suit",
        {
          x: (i) => circleTarget(i).x - lShapeOrigin(i).x,
          y: (i) => circleTarget(i).y - lShapeOrigin(i).y,
          rotation: 360,
          scale: 1.1,
          duration: 1.4,
          ease: "power2.inOut",
        },
        "+=0.3",
      );

      // ── Phase 3: BUFFER — circle continues to spin in place
      // Each suit orbits one extra lap as scroll progresses
      tl.to(".suit", {
        rotation: "+=720",
        duration: 2.5,
        ease: "none",
      });

      // ── Phase 4: At end of scroll — suits fly UP to top, arranged horizontally
      tl.to(".suit", {
        x: (i) => topTarget(i).x - lShapeOrigin(i).x,
        y: (i) => topTarget(i).y - lShapeOrigin(i).y,
        rotation: "+=180",
        scale: 0.6,
        duration: 1.1,
        stagger: 0.04,
        ease: "power2.in",
      });

      // ── Phase 5: Letters reveal one by one at the top — suits fade away
      tl.to("#lShapeName", { opacity: 0, duration: 0.4 }, "+=0.1");
      tl.to("#endName", { opacity: 1, duration: 0.4 }, "<");
      tl.to(".suit", { opacity: 0, duration: 0.5 }, "<");
      tl.from(
        ".end-char",
        {
          opacity: 0,
          y: 40,
          scale: 0.4,
          duration: 0.35,
          stagger: 0.06,
          ease: "back.out(2)",
        },
        "<0.05",
      );

      // ── Phase 6: Portrait slides to center, buttons fly in
      tl.to(
        "#person",
        {
          right: "50%",
          xPercent: 50,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "<0.2",
      );

      tl.to(
        ".glass-btn",
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        "<0.3",
      );

      // Continuous floating idle animation for buttons
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
      {/* Iridescent background */}
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
        {/* L-shape name (initial — letters visible, suits hidden) */}
        <div
          id="lShapeName"
          className="absolute z-[10]"
          style={{
            left: "10%",
            top: "22%",
            fontFamily: "'AquireLight', sans-serif",
            fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
            color: DARK,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 440,
          }}
        >
          {/* Vertical column: RHISHAV */}
          <div className="flex flex-col">
            {VERT.map((l, i) => (
              <div key={`v-${i}`} style={cellStyle}>
                <span className="char-letter" style={letterStyle}>
                  {l.ch}
                </span>
                <span className="suit" style={suitStyle}>
                  {l.suit}
                </span>
              </div>
            ))}
          </div>

          {/* Horizontal arm: IKDAR (offset by one S-cell) */}
          <div className="absolute flex" style={{ top: "3.3em", left: 0 }}>
            <div style={{ width: "1em" }} aria-hidden="true" />
            {HORIZ.map((l, i) => (
              <div key={`h-${i}`} style={cellStyle}>
                <span className="char-letter" style={letterStyle}>
                  {l.ch}
                </span>
                <span className="suit" style={suitStyle}>
                  {l.suit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final stacked name — hidden, revealed letter-by-letter at end */}
        <div
          id="endName"
          className="absolute left-1/2 -translate-x-1/2 text-center z-[20]"
          style={{
            top: "5%",
            opacity: 0,
            fontFamily: "'AquireLight', sans-serif",
          }}
        >
          <h1
            className="uppercase tracking-[0.2em] leading-none text-[14vw] md:text-[9vw] font-[770] md:font-[440]"
            style={{ color: DARK }}
          >
            {"RHISHAV".split("").map((c, i) => (
              <span
                key={`er-${i}`}
                className="end-char"
                style={{ display: "inline-block" }}
              >
                {c}
              </span>
            ))}
          </h1>
          <h1
            className="uppercase tracking-[0.2em] leading-none text-[14vw] md:text-[9vw] font-[770] md:font-[440]"
            style={{ color: DARK }}
          >
            {"SIKDAR".split("").map((c, i) => (
              <span
                key={`es-${i}`}
                className="end-char"
                style={{ display: "inline-block" }}
              >
                {c}
              </span>
            ))}
          </h1>
        </div>

        {/* Portrait — always bottom-anchored, slides from right to center */}
        <div
          id="person"
          className="absolute z-[15] pointer-events-none w-[60vw] md:w-[28vw] md:max-w-[360px]"
          style={{ right: "5%", bottom: 0 }}
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

        {/* Glass buttons — fly in at the end */}
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
