import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import portraitImg from "@/assets/shirt.png";
import Iridescence from "@/components/Iridescence";
import SplitName from "@/components/SplitName";
import GlassBlobs from "@/components/GlassBlobs";
import PageTransition from "@/components/PageTransition";
import { Instagram, Youtube, Linkedin } from "lucide-react";

// Name uses ~13 chars × 0.07s stagger + 0.55s tail ≈ 1.46s, then trigger reveal.
const NAME_TOTAL_DURATION_MS = 1500;

const Index = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), NAME_TOTAL_DURATION_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <PageTransition>
      <div className="relative h-screen overflow-hidden flex flex-col bg-black">
        {/* Fixed iridescent background */}
        <div className="fixed inset-0 z-0">
          <Iridescence mouseReact amplitude={0.1} speed={1} />
        </div>

        {/* Light overlay for readability */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsla(0,0%,100%,0.1) 0%, hsla(0,0%,100%,0.15) 40%, hsla(0,0%,100%,0.25) 100%)",
          }}
        />

        {/* SVG Filter */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves={4} seed={5} result="noise">
                <animate attributeName="baseFrequency" values="0.012 0.018;0.016 0.014;0.012 0.018" dur="8s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Content Layout (Name top, Photo below) */}
        <div className="fixed inset-0 z-[3] flex flex-col items-center pointer-events-none">

          {/* Name — letter-by-letter pop-in */}
          <div className="relative pt-[12vh] md:pt-[4vh] flex justify-center w-full shrink-0 z-[4]">
            <SplitName startDelay={0.15} />
          </div>

          {/* Photo — pops up from middle, scales to final bottom-anchored size */}
          <div className="relative flex-1 w-full flex justify-center items-end z-[3] pb-0 mt-[8vh] md:mt-0">
            <motion.img
              src={portraitImg}
              alt="Rhishav Sikdar"
              className="relative z-[2] w-auto h-full max-h-[75vh] md:max-h-[140vh] object-contain object-bottom drop-shadow-2xl"
              style={{
                filter: "brightness(1) contrast(1.15) saturate(1.1)",
                transformOrigin: "center bottom",
              }}
              initial={{ opacity: 0, scale: 0, y: "-12vh" }}
              animate={
                revealed
                  ? { opacity: 1, scale: 1.35, y: "8vh" }
                  : { opacity: 0, scale: 0, y: "-12vh" }
              }
              transition={
                revealed
                  ? {
                      scale: { type: "spring", stiffness: 38, damping: 18, mass: 1.4, delay: 0.15 },
                      y: { type: "spring", stiffness: 38, damping: 18, mass: 1.4, delay: 0.15 },
                      opacity: { duration: 0.8, delay: 0.15 },
                    }
                  : { duration: 0.3 }
              }
            />
          </div>

        </div>

        {/* Glass blobs (Illusion + InnerWork) — pop from middle, slight delay after image starts */}
        <GlassBlobs revealed={revealed} delay={0.15} />

        {/* Social Icons Bottom Right — fade in last */}
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
