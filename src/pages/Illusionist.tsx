import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import GetInTouchButton from "@/components/GetInTouchButton";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import portraitImg from "@/assets/diceimg.png";
import googleLogo from "@/assets/logos/google.png";
import sonyLogo from "@/assets/logos/sony.png";
import bmwLogo from "@/assets/logos/bmw.png";
import vistaraLogo from "@/assets/logos/vistara.png";
import olaLogo from "@/assets/logos/ola.png";
import shellLogo from "@/assets/logos/shell.png";
import exonLogo from "@/assets/logos/exon.png";
import bpLogo from "@/assets/logos/bharatpetrolium.png";
import brigadeLogo from "@/assets/logos/brigade.png";
import puravankaraLogo from "@/assets/logos/puravankara.png";
import nexusLogo from "@/assets/logos/nexus.png";
import jwMarriottLogo from "@/assets/logos/jwmarriott.png";
import radissonLogo from "@/assets/logos/radisson.png";
import razorpayLogo from "@/assets/logos/razorpay.png";
import morganStanleyLogo from "@/assets/logos/morganstanley.png";
import jpMorganLogo from "@/assets/logos/jpmorgan.png";
import withumLogo from "@/assets/logos/withum.png";
import metaLogo from "@/assets/logos/meta.png";
import bentleyLogo from "@/assets/logos/bentley.png";
import corenetLogo from "@/assets/logos/corenet.png";
import nipponPaintsLogo from "@/assets/logos/nipponpaints.png";
import netcoreLogo from "@/assets/logos/netcore.png";
import thoughtFocusLogo from "@/assets/logos/thoughtfocus.png";
import stonehillLogo from "@/assets/logos/stonehill.png";
import harmanLogo from "@/assets/logos/harman.png";
import adityaBirlaLogo from "@/assets/logos/adityabirla.png";
import ibmLogo from "@/assets/logos/ibm.png";
import dhruvaSpaceLogo from "@/assets/logos/dhruvaspace.png";
import arcesiumLogo from "@/assets/logos/arcesium.png";
import visionetLogo from "@/assets/logos/visionet.png";
import ofiLogo from "@/assets/logos/ofi.png";

const topLogos = [
  { src: googleLogo, alt: "Google" },
  { src: sonyLogo, alt: "Sony" },
  { src: metaLogo, alt: "Meta" },
  { src: bentleyLogo, alt: "Bentley" },
  { src: bmwLogo, alt: "BMW" },
  { src: vistaraLogo, alt: "Vistara" },
  { src: olaLogo, alt: "Ola" },
  { src: shellLogo, alt: "Shell" },
  { src: exonLogo, alt: "ExxonMobil" },
  { src: bpLogo, alt: "Bharat Petroleum" },
  { src: brigadeLogo, alt: "Brigade" },
  { src: puravankaraLogo, alt: "Puravankara" },
  { src: nexusLogo, alt: "Nexus" },
  { src: jwMarriottLogo, alt: "JW Marriott" },
  { src: radissonLogo, alt: "Radisson" },
  { src: razorpayLogo, alt: "Razorpay" },
  { src: morganStanleyLogo, alt: "Morgan Stanley" },
  { src: jpMorganLogo, alt: "JP Morgan" },
  { src: withumLogo, alt: "Withum" },
  { src: corenetLogo, alt: "Corenet" },
  { src: nipponPaintsLogo, alt: "Nippon Paints" },
  { src: netcoreLogo, alt: "Netcore Cloud" },
  { src: thoughtFocusLogo, alt: "Thought Focus" },
  { src: stonehillLogo, alt: "Stonehill International School" },
  { src: harmanLogo, alt: "Harman" },
  { src: adityaBirlaLogo, alt: "Aditya Birla" },
  { src: ibmLogo, alt: "IBM" },
  { src: dhruvaSpaceLogo, alt: "Dhruva Space" },
  { src: arcesiumLogo, alt: "Arcesium" },
  { src: visionetLogo, alt: "Visionet" },
  { src: ofiLogo, alt: "OFI" },
];


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const services = [
  {
    number: "01",
    title: "Stage",
    description:
      "A highly interactive stage performance that delves into the workings of the human mind, featuring raw, unfiltered mentalism. Thoughts are revealed, predictions unfold, and the entire audience is brought together in a shared experience of wonder.",
    fontFamily: "'Libre Baskerville', 'Baskerville', serif",
  },
  {
    number: "02",
    title: "Close-up",
    description:
      "An intimate, walk-around experience tailored for individuals and smaller groups within a larger setting. Using only borrowed items from the audience, the magic happens up close – bending reality in the most direct and astonishing way.",
    fontFamily: "'Libre Baskerville', 'Baskerville', serif",
  },
  {
    number: "03",
    title: "Complete",
    description:
      "The best of both worlds – a full-scale experience that combines the impact of stage with the depth of close-up. It begins with an immersive stage performance and seamlessly flows into close-up, engaging the audience at every level and creating memories for a lifetime.",
    fontFamily: "'Libre Baskerville', 'Baskerville', serif",
  },
];

const Illusionist = () => {
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

        {/* Fixed light overlay for readability */}
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
                    className="w-full h-full object-cover object-top"
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
                  Illusion
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
                      color: "hsla(0, 0%, 0%, 0.85)",
                    }}
                  >
                    For over 18 years, I’ve studied and performed the art of magic and mentalism – blending psychology, intuition, and illusion to create extraordinary experiences.
                  </p>
                  <p
                    className="text-lg leading-relaxed max-w-lg font-light"
                    style={{
                      fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                      color: "hsla(0, 0%, 0%, 0.85)",
                    }}
                  >
                    With 8+ years as a professional, I’ve performed over 600 shows for 100+ corporate organizations.
                  </p>
                  <p
                    className="text-lg leading-relaxed max-w-lg font-light"
                    style={{
                      fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                      color: "hsla(0, 0%, 0%, 0.85)",
                    }}
                  >
                    This isn’t just a show – it’s an experience that brings you in touch with what your mind is truly capable of.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Services section */}
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
                Experiences
              </motion.h2>

              <div className="flex flex-col gap-6 items-center">
                {services.map((service, i) => (
                  <motion.div
                    key={service.number}
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
                    {/* Corner accent */}
                    <div
                      className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                      style={{
                        borderTop: "1px solid hsla(200, 60%, 70%, 0.2)",
                        borderLeft: "1px solid hsla(200, 60%, 70%, 0.2)",
                        borderTopLeftRadius: "1rem",
                      }}
                    />

                    <h3
                      className="text-2xl md:text-3xl uppercase tracking-[0.1em] mb-3"
                      style={{
                        fontFamily: "'Nestborn', sans-serif",
                        color: "hsl(0, 0%, 0%)",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed font-light"
                      style={{
                        fontFamily: service.fontFamily,
                        color: "hsla(0, 0%, 0%, 0.85)",
                      }}
                    >
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Videos section */}
          <section className="px-6 md:px-16 lg:px-24 pb-32">
            <div className="max-w-6xl mx-auto">
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
                Moments of Magic
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  "ejoAXoEA6-E",
                  "kNELGcY56_0",
                  "wZHUZ8wF4bo",
                  "8jDlJWRpTM8",
                ].map((videoId, i) => (
                  <motion.div
                    key={videoId}
                    className="relative rounded-2xl overflow-hidden aspect-[9/16]"
                    style={{
                      border: "2.5px solid rgba(20, 55, 150, 0.8)",
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 0 14px rgba(10, 40, 130, 0.5), 0 0 28px rgba(10, 40, 130, 0.3), 0 0 42px rgba(10, 40, 130, 0.15)",
                      background:
                        "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
                    }}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      title={`Performance ${i + 1}`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; encrypted-media"
                      loading="lazy"
                      style={{ border: "none" }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Clients section */}
          <section className="px-6 md:px-16 lg:px-24 pb-24">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-center text-2xl md:text-4xl uppercase tracking-[0.35em] mb-10 font-bold"
                style={{
                  fontFamily: "'Nestborn', sans-serif",
                  color: "hsla(0, 0%, 0%, 0.95)",
                }}
              >
                Featured In & Trusted By
              </p>
              <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <InfiniteSlider gap={40} speed={180}>
                  {topLogos.map((logo) => {
                    const needsExtraLarge = ["Puravankara", "JW Marriott"].includes(logo.alt);
                    const needsLarger = ["Thought Focus", "Arcesium"].includes(logo.alt);
                    return (
                      <div
                        key={`glass-${logo.alt}`}
                        className="w-44 h-20 md:w-52 md:h-24 rounded-xl flex items-center justify-center px-6 py-3 flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, hsla(0,0%,100%,0.08) 0%, hsla(0,0%,100%,0.02) 100%)",
                          border: "1.5px solid rgba(100, 160, 255, 0.35)",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={`w-auto h-auto object-contain select-none pointer-events-none ${needsExtraLarge ? "max-w-[100%] max-h-[100%] scale-150" : needsLarger ? "max-w-[95%] max-h-[95%] scale-125" : "max-w-[90%] max-h-[90%]"}`}
                        />
                      </div>
                    );
                  })}
                </InfiniteSlider>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

export default Illusionist;
