import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";
import portraitImg from "@/assets/portrait.png";

const approaches = [
  {
    label: "Somatic Awareness",
    text: "Reconnecting mind and body through guided presence — feeling what words cannot reach, releasing what the body holds in silence.",
    fontFamily: "'Helica', sans-serif",
  },
  {
    label: "Shadow Integration",
    text: "Gently illuminating the hidden parts of self. Not to fix, but to understand — transforming shame into wholeness, fear into freedom.",
    fontFamily: "'Helica', sans-serif",
  },
  {
    label: "Breathwork & Regulation",
    text: "Using the breath as an anchor to calm the nervous system, dissolve anxiety, and return to a state of deep inner stillness.",
    fontFamily: "'Helica', sans-serif",
  },
  {
    label: "Relational Healing",
    text: "Exploring the patterns we carry from past bonds — learning to trust, to set boundaries, and to love without losing ourselves.",
    fontFamily: "'Helica', sans-serif",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const InnerWork = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative w-screen min-h-screen bg-black">
        {/* Fixed iridescent background */}
        <div className="fixed inset-0 z-0">
          <Iridescence
            color={[0.4, 0.8, 0.9]}
            mouseReact
            amplitude={0.1}
            speed={0.2}
          />
        </div>

        {/* Light overlay for readability */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsla(0,0%,100%,0.1) 0%, hsla(0,0%,100%,0.15) 40%, hsla(0,0%,100%,0.25) 100%)",
          }}
        />

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-50 p-2 rounded-full backdrop-blur-md bg-black/5 text-black/60 hover:text-black hover:bg-black/10 transition-all duration-300 cursor-pointer"
          style={{
            border: "2px solid rgba(100, 160, 255, 0.6)",
            boxShadow:
              "0 0 10px rgba(80, 140, 255, 0.4), 0 0 20px rgba(80, 140, 255, 0.2), 0 0 30px rgba(80, 140, 255, 0.1)",
          }}
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Fixed Contact Us button */}
        <div
          className="fixed top-6 right-6 z-50 rounded-[4rem] overflow-hidden cursor-pointer"
          style={{
            border: "2.5px solid rgba(100, 160, 255, 0.6)",
            boxShadow:
              "0 0 20px rgba(80, 140, 255, 0.4), 0 0 40px rgba(80, 140, 255, 0.2), 0 0 60px rgba(80, 140, 255, 0.1)",
            backdropFilter: "blur(20px)",
            background:
              "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
          }}
        >
          <div className="px-8 py-3 flex items-center justify-center">
            <span
              className="uppercase tracking-[0.3em] text-sm font-bold"
              style={{
                color: "hsl(0, 0%, 0%)",
                fontFamily: "'Eastham', sans-serif",
              }}
            >
              Get in Touch
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="relative z-[2]">
          {/* Hero section — image left, text right */}
          <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full max-w-6xl mx-auto">
              {/* Portrait */}
              <motion.div
                className="w-full md:w-[45%] flex-shrink-0"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div
                  className="relative rounded-[2rem] overflow-hidden"
                  style={{
                    border: "2.5px solid rgba(100, 160, 255, 0.6)",
                    boxShadow:
                      "0 0 20px rgba(80, 140, 255, 0.4), 0 0 40px rgba(80, 140, 255, 0.2), 0 0 60px rgba(80, 140, 255, 0.1), 0 20px 60px hsla(0,0%,0%,0.5)",
                  }}
                >
                  <img
                    src={portraitImg}
                    alt="Rhishav Sikdar"
                    className="w-full h-auto object-cover"
                    style={{
                      filter: "brightness(0.95) contrast(1.1) saturate(1.1)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, hsla(0,0%,0%,0.4) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Text content */}
              <motion.div
                className="w-full md:w-[55%] flex flex-col gap-6"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <h1
                  className="text-[12vw] md:text-[6vw] uppercase leading-[0.9] tracking-[0.15em]"
                  style={{
                    fontFamily: "'Eastham', sans-serif",
                    color: "hsl(0, 0%, 0%)",
                  }}
                >
                  InnerWork
                </h1>
                <div
                  className="w-16 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(to right, hsla(0, 0%, 0%, 0.6), transparent)",
                  }}
                />
                <p
                  className="text-base md:text-lg leading-relaxed max-w-lg font-light"
                  style={{
                    fontFamily: "'Helica', sans-serif",
                    color: "hsla(0, 0%, 0%, 0.85)",
                  }}
                >
                  A safe, sacred space to unravel, to feel, to become. InnerWork is
                  not about fixing — it's about returning to the truth of who you
                  already are.
                </p>
                <p
                  className="text-sm leading-relaxed max-w-lg font-light"
                  style={{
                    fontFamily: "'Helica', sans-serif",
                    color: "hsla(0, 0%, 0%, 0.85)",
                  }}
                >
                  Every session is a journey inward — a sacred space where healing,
                  clarity, and deep transformation unfold naturally.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Approaches section */}
          <section className="px-6 md:px-16 lg:px-24 pb-32">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                className="text-[8vw] md:text-[3vw] uppercase tracking-[0.2em] mb-16 text-center"
                style={{
                  fontFamily: "'Eastham', sans-serif",
                  color: "hsl(0, 0%, 0%)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                The Approach
              </motion.h2>

              <div className="flex flex-col gap-6 items-center">
                {approaches.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="relative w-full max-w-4xl px-6 md:px-16 py-6 md:py-8 rounded-2xl text-center overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
                      border: "2.5px solid rgba(100, 160, 255, 0.6)",
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 0 20px rgba(80, 140, 255, 0.4), 0 0 40px rgba(80, 140, 255, 0.2), 0 0 60px rgba(80, 140, 255, 0.1)",
                    }}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                  >
                    <h3
                      className="text-2xl md:text-3xl uppercase tracking-[0.1em] mb-3"
                      style={{
                        fontFamily: "'Eastham', sans-serif",
                        color: "hsl(0, 0%, 0%)",
                      }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed font-light"
                      style={{
                        fontFamily: item.fontFamily,
                        color: "hsla(0, 0%, 0%, 0.85)",
                      }}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Quote section */}
          <section className="px-6 md:px-16 lg:px-24 py-24">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="text-[6vw] md:text-[2.5vw] leading-[1.3] italic"
                style={{
                  fontFamily: "'Eastham', sans-serif",
                  color: "hsl(0, 0%, 0%)",
                }}
              >
                "Healing doesn't ask you to be strong.
                <br />
                It asks you to be honest."
              </div>
              <div
                className="mt-8 w-8 h-[1px] mx-auto"
                style={{
                  background:
                    "linear-gradient(to right, transparent, hsla(0, 0%, 0%, 0.4), transparent)",
                }}
              />
            </motion.div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default InnerWork;
