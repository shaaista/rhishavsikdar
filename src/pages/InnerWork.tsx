import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";
import portraitImg from "@/assets/innerworkwithbg.png";
import GetInTouchButton from "@/components/GetInTouchButton";

const approaches = [
  {
    label: "Corporate Reset",
    text: "For organisations that care about their people and want them to function at their best, this is a 60-minute guided hypnotherapy session to release stress, reset the mind, and enhance focus – creating a calmer, more resilient workforce.\n\nEach session is tailored to the specific needs of the organisation.\n\nAvailable online or in person.\nIdeal for groups of 50–100.",
    fontFamily: "'Libre Baskerville', 'Baskerville', serif",
  },
  {
    label: "Personal Reset",
    text: "Deep, one-on-one work focused on resolving challenges at the root.\n\nFrom addictions and habits to stress, anxiety, trauma, panic attacks, physical pain, phobias, emotional patterns, and chronic issues linked to the mind – this work focuses on shifting the underlying patterns of the subconscious mind, leading to changes that feel natural, effortless, and lasting.",
    fontFamily: "'Libre Baskerville', 'Baskerville', serif",
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
            color={[0.5, 0.6, 0.8]}
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
            border: "1px solid rgba(20, 55, 150, 0.6)",
            boxShadow:
              "0 0 5px rgba(10, 40, 130, 0.4), 0 0 10px rgba(10, 40, 130, 0.2), 0 0 15px rgba(10, 40, 130, 0.1)",
          }}
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Fixed Contact Us button */}
        <GetInTouchButton className="fixed top-6 right-6 z-50" variant="transparent" />

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
                  className="relative rounded-[2rem] overflow-hidden aspect-square flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(20, 55, 150, 0.6)",
                    boxShadow:
                      "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1), 0 20px 60px hsla(0,0%,0%,0.5)",
                  }}
                >
                  <img
                    src={portraitImg}
                    alt="Rhishav Sikdar"
                    className="w-full h-full object-cover"
                    style={{
                      filter: "brightness(0.95) contrast(1.05) saturate(0.9)",
                    }}
                  />
                  {/* Edge blend overlays */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 50%, hsla(0,0%,0%,0.3) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, hsla(0,0%,0%,0.35) 0%, transparent 30%), linear-gradient(to bottom, hsla(0,0%,0%,0.15) 0%, transparent 20%)",
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
                    fontFamily: "'Nestborn', sans-serif",
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
                <div
                  className="relative w-full p-6 md:p-8 rounded-2xl flex flex-col gap-4"
                  style={{
                    background: "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
                    border: "1px solid rgba(20, 55, 150, 0.6)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
                  }}
                >
                  <p
                    className="text-lg leading-relaxed max-w-lg font-light"
                    style={{
                      fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                      color: "#000000",
                    }}
                  >
                    Beyond the stage, my work goes inward.
                  </p>
                  <p
                    className="text-lg leading-relaxed max-w-lg font-light"
                    style={{
                      fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                      color: "#000000",
                    }}
                  >
                    I’m a certified professional hypnotherapist trained with the Jacquin Hypnosis Academy, a Level-3 Reiki Master Healer, and a certified EFT (Emotional Freedom Technique) therapist, with over 16 years of experience in healing and therapeutic work.
                  </p>
                  <p
                    className="text-lg leading-relaxed max-w-lg font-light"
                    style={{
                      fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                      color: "#000000",
                    }}
                  >
                    My approach is direct, intuitive, and results-driven – working at the level of the subconscious mind to create real, lasting change.
                  </p>
                  <p
                    className="text-lg leading-relaxed max-w-lg font-light"
                    style={{
                      fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                      color: "#000000",
                    }}
                  >
                    With a background in IT, specialising in project management and employee welfare, I bring a practical understanding of workplace challenges into this work.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Approaches section */}
          <section className="px-6 md:px-16 lg:px-24 pb-32">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                className="text-[8vw] md:text-[3vw] uppercase tracking-[0.2em] mb-16 text-center"
                style={{
                  fontFamily: "'Nestborn', sans-serif",
                  color: "hsl(0, 0%, 0%)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                My Offerings
              </motion.h2>

              <div className="flex flex-col gap-6 items-center">
                {approaches.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="relative w-full max-w-4xl px-6 md:px-16 py-6 md:py-8 rounded-2xl text-center overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
                      border: "1px solid rgba(20, 55, 150, 0.6)",
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
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
                        fontFamily: "'Nestborn', sans-serif",
                        color: "hsl(0, 0%, 0%)",
                      }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="text-base leading-relaxed font-light whitespace-pre-line"
                      style={{
                        fontFamily: item.fontFamily,
                        color: "#000000",
                      }}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>


        </div>
      </div>
    </PageTransition>
  );
};

export default InnerWork;
