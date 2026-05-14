import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portraitImg from "@/assets/shirt.png";
import Iridescence from "@/components/Iridescence";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "rgba(20, 55, 150, 1)";

const VERT = [
  { ch: "R", suit: "♠" },
  { ch: "H", suit: "♥" },
  { ch: "I", suit: "♣" },
  { ch: "S", suit: "♦", accent: true },
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

const glassBtn: React.CSSProperties = {
  position: "absolute",
  padding: "1.1rem 2.4rem",
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
  zIndex: 15,
  textDecoration: "none",
  color: "#0f172a",
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
    // 500vh scroll height for the scroll-driven animation
    const prevHeight = document.body.style.height;
    const prevOverflow = document.body.style.overflowX;
    document.body.style.height = "500vh";
    document.body.style.overflowX = "hidden";

    // Hide scrollbar
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

      // 1. Letters fade out, suits appear
      tl.to(".char-letter", {
        color: "transparent",
        duration: 0.3,
        stagger: 0.05,
      }).to(".suit", { opacity: 1, duration: 0.3, stagger: 0.05 }, 0);

      // 2. Suits move into a spinning ring in center
      tl.to(
        ".suit",
        {
          x: (i: number) => Math.cos(i) * 60 + (window.innerWidth / 2 - 220),
          y: (i: number) => Math.sin(i) * 60,
          rotation: 360,
          duration: 1,
          ease: "power2.inOut",
        },
        0.5,
      );

      // 3. Suits disappear up, end name reveals, start name fades out
      tl.to(".suit", { top: "-100px", opacity: 0, scale: 0, duration: 0.8 }, 1.5)
        .to("#endName", { opacity: 1, top: "8%", duration: 0.8 }, 1.5)
        .to("#startName", { opacity: 0, duration: 0.4 }, 1.5);

      // 4. Image moves to center
      tl.to(
        "#person",
        {
          right: "50%",
          xPercent: 50,
          top: "55%",
          width: window.innerWidth < 768 ? "70vw" : "380px",
          duration: 1.2,
        },
        1.2,
      );

      // 5. Glass buttons reveal
      tl.to(
        ".glass-btn",
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 1,
          ease: "back.out(1.7)",
        },
        2,
      );

      // Floating idle animation for buttons
      gsap.to(".glass-btn", {
        y: "-=12",
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

      {/* Fixed animation stage — pinned full viewport */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[5]"
      >
        {/* Start name — L-shape, Space Mono for proper alignment */}
        <div
          id="startName"
          className="absolute left-[8%] md:left-[10%] top-1/2 -translate-y-1/2 z-[10]"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(1.4rem, 4vw, 3rem)",
            textTransform: "uppercase",
            color: "#0f172a",
            fontWeight: 700,
          }}
        >
          {/* Vertical RHISHAV */}
          <div
            className="flex flex-col"
            style={{ lineHeight: 1.1 }}
          >
            {VERT.map((l, i) => (
              <span key={`v-${i}`} className="inline-block relative">
                <span
                  className="char-letter"
                  style={l.accent ? { color: ACCENT } : undefined}
                >
                  {l.ch}
                </span>
                <span
                  className="suit absolute top-0 left-0 opacity-0"
                  style={{ color: ACCENT, fontSize: "1.2em" }}
                >
                  {l.suit}
                </span>
              </span>
            ))}
          </div>

          {/* Horizontal IKDAR — starts at row "S" with a hidden placeholder */}
          <div
            className="absolute flex"
            style={{ top: "3.3em", left: 0 }}
          >
            <span
              className="inline-block relative"
              style={{ visibility: "hidden" }}
            >
              <span className="char-letter">S</span>
            </span>
            {HORIZ.map((l, i) => (
              <span key={`h-${i}`} className="inline-block relative">
                <span className="char-letter">{l.ch}</span>
                <span
                  className="suit absolute top-0 left-0 opacity-0"
                  style={{ color: ACCENT, fontSize: "1.2em" }}
                >
                  {l.suit}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* End name — stacked, AquireLight (the original brand font) */}
        <div
          id="endName"
          className="absolute left-1/2 -translate-x-1/2 text-center z-[20]"
          style={{ top: "5%", opacity: 0 }}
        >
          <h1
            className="uppercase tracking-[0.2em] leading-none text-[14vw] md:text-[9vw] font-[770] md:font-[440]"
            style={{ fontFamily: "'AquireLight', sans-serif", color: "#0f172a" }}
          >
            RHISHAV
          </h1>
          <h1
            className="uppercase tracking-[0.2em] leading-none text-[14vw] md:text-[9vw] font-[770] md:font-[440]"
            style={{ fontFamily: "'AquireLight', sans-serif", color: "#0f172a" }}
          >
            SIKDAR
          </h1>
        </div>

        {/* Portrait — starts right, moves to center */}
        <div
          id="person"
          className="absolute z-[5] pointer-events-none"
          style={{
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "min(360px, 38vw)",
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
            left: "15%",
            top: "72%",
            transform: "translateX(-100px)",
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
            right: "15%",
            top: "72%",
            transform: "translateX(100px)",
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
