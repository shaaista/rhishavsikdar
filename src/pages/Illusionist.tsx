import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import portraitImg from "@/assets/rsbw.png";
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
import nethradhamaLogo from "@/assets/logos/nethradhama.png";

const topLogos = [
  { src: googleLogo, alt: "Google" },
  { src: sonyLogo, alt: "Sony" },
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
  { src: nethradhamaLogo, alt: "Nethradhama" },
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
    title: "Energy Healing",
    description:
      "Channeling universal life force to restore balance, dissolve energetic blockages, and awaken the body's innate ability to heal itself. Each session is intuitively guided and deeply transformative.",
  },
  {
    number: "02",
    title: "Aura Cleansing",
    description:
      "A purification ritual that clears stagnant and negative energy from your auric field, leaving you feeling lighter, clearer, and reconnected to your highest vibration.",
  },
  {
    number: "03",
    title: "Manifestation Work",
    description:
      "Aligning intention with action through sacred practice. Together we craft powerful rituals and visualizations that bridge the gap between where you are and where you're meant to be.",
  },
  {
    number: "04",
    title: "Intuitive Guidance",
    description:
      "Deep readings that tap into the unseen — past lives, karmic patterns, and soul contracts — to illuminate your path forward with clarity and purpose.",
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
                  className="relative rounded-[2rem] overflow-hidden aspect-square flex items-center justify-center"
                  style={{
                    border: "2.5px solid rgba(100, 160, 255, 0.6)",
                    boxShadow:
                      "0 0 20px rgba(80, 140, 255, 0.4), 0 0 40px rgba(80, 140, 255, 0.2), 0 0 60px rgba(80, 140, 255, 0.1), 0 20px 60px hsla(0,0%,0%,0.5)",
                  }}
                >
                  <img
                    src={portraitImg}
                    alt="Rhishav Sikdar"
                    className="w-full h-full object-contain object-bottom scale-90 origin-bottom"
                    style={{
                      filter: "brightness(0.95) contrast(1.1) saturate(1.1)",
                    }}
                  />
                  {/* Subtle overlay on image */}
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
                  Illusionist
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
                  Where intention meets energy. Rhishav works at the intersection
                  of ancient wisdom and modern consciousness — guiding
                  transformative experiences that transcend the ordinary and
                  unlock what lies beyond the visible.
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

          {/* Services section */}
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
                What I Offer
              </motion.h2>

              <div className="flex flex-col gap-6 items-center">
                {services.map((service, i) => (
                  <motion.div
                    key={service.number}
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
                        fontFamily: "'Eastham', sans-serif",
                        color: "hsl(0, 0%, 0%)",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed font-light"
                      style={{
                        fontFamily: "'Helica', sans-serif",
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
                className="text-center text-xs uppercase tracking-[0.35em] mb-10 font-light"
                style={{
                  fontFamily: "'Helica', sans-serif",
                  color: "hsla(0, 0%, 0%, 0.85)",
                }}
              >
                Featured In & Trusted By
              </p>
              <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <InfiniteSlider gap={40} speed={45}>
                  {topLogos.map((logo) => {
                    const needsLarger = ["Puravankara", "JW Marriott", "Nethradhama"].includes(logo.alt);
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
                          className={`w-auto h-auto object-contain select-none pointer-events-none ${needsLarger ? "max-w-[95%] max-h-[95%] scale-125" : "max-w-[90%] max-h-[90%]"}`}
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
