import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src={cardsImg}
            alt="Rhishav Sikdar — illusionist with cards"
            className="h-[89vh] w-auto max-w-none block select-none"
            style={{
              filter: "drop-shadow(0 25px 60px rgba(10, 40, 130, 0.18))",
              transform: "translateX(-2%)",
              maskImage:
                "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 95% at 65% 50%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 82%, transparent 100%)",
              mixBlendMode: "lighten",
            }}
          />
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
          className="md:hidden fixed top-[1.25vh] left-1/2 z-[1] w-fit pointer-events-none"
          style={{ transform: "translateX(-60%)" }}
        >
          <motion.img
            src={cardsImg}
            alt="Rhishav Sikdar — illusionist with cards"
            className="w-[200vw] max-w-none h-auto block select-none"
            style={{
              // Pull the portrait upward and reduce its scale so the fade
              // lands around the first name line on phones.
              maxHeight: "78vh",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 78%, rgba(0,0,0,0.82) 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 78%, rgba(0,0,0,0.82) 92%, transparent 100%)",
              filter: "drop-shadow(0 25px 60px rgba(10, 40, 130, 0.18))",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </main>
    </PageTransition>
  );
};

export default Index;
