import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GetInTouchButton from "@/components/GetInTouchButton";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import illusionVideo from "@/assets/illusiongif.mp4";
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


const glassCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
  border: "1px solid rgba(20, 55, 150, 0.6)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const events = [
  {
    number: "01",
    category: "Weddings",
    title: "A conjured moment you will never forget",
    description:
      "From the cocktail hour to the reception, I weave invisibly through your guests — creating spontaneous, personal moments of wonder. I incorporate your names, dates, thoughts and personal belongings into the magic itself, leaving you with souvenirs you'll always cherish.",
    tags: ["Cocktail Hour", "Reception", "Table Magic", "Ceremonies"],
  },
  {
    number: "02",
    category: "Private Celebrations",
    title: "Birthdays, anniversaries & milestones",
    description:
      "No two celebrations are alike. I tailor every performance to your guest list — finding the funny, the sentimental, and the spectacular in equal measure. I turn a birthday dinner into a night of stories.",
    tags: ["Birthdays", "Anniversaries", "Retirements"],
  },
];

const experiences = [
  {
    format: "Interactive · Large Audiences",
    title: "Stage",
    description:
      "A highly interactive stage performance that delves into the workings of the human mind – featuring raw, unfiltered mentalism. Thoughts are revealed, predictions unfold, and the entire audience is brought together in shared moments of wonder.",
    bullets: [
      "Corporate keynotes & brand activations",
      "Theatres, festivals & ticketed shows",
      "Custom routines built around your theme",
    ],
    enquireLabel: "Enquire about Stage",
  },
  {
    format: "Intimate · Walk-Around",
    title: "Close-up",
    description:
      "Intimate mind-reading, sleight of hand, and full-length mentalism sets built for private rooms, keynotes and brand experiences. Using only borrowed items from the audience, the magic happens up close — bending reality in the most direct and astonishing way.",
    bullets: [
      "Private parties & dinners",
      "Brand experiences & VIP receptions",
      "Walk-around at cocktail hours & launches",
    ],
    enquireLabel: "Enquire about Close-up",
  },
  {
    format: "Stage + Close-Up · Full Event",
    title: "Complete",
    description:
      "The best of both worlds – a full-scale experience that combines the impact of stage with the depth of close-up. It begins with an immersive stage performance and seamlessly flows into close-up, engaging the audience at every level and leaving them with memories for a lifetime.",
    bullets: [
      "Stage opener flowing into walk-around",
      "Built for galas, weddings & flagship events",
      "Hosted Q&A and shared finale moments",
    ],
    enquireLabel: "Enquire about Complete",
  },
];

const Illusionist = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.setAttribute("muted", "");
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <PageTransition>
      <div className="relative w-screen min-h-screen bg-black">
        <div className="fixed inset-0 z-0">
          <Iridescence mouseReact amplitude={0.1} speed={1} />
        </div>
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, hsla(0,0%,100%,0.1) 0%, hsla(0,0%,100%,0.15) 40%, hsla(0,0%,100%,0.25) 100%)" }}
        />

        <button
          onClick={() => navigate("/")}
          className="fixed top-6 left-6 z-50 p-2 rounded-full backdrop-blur-md bg-black/5 text-black/60 hover:text-black hover:bg-black/10 transition-all duration-300 cursor-pointer"
          style={{ border: "1px solid rgba(20, 55, 150, 0.6)", boxShadow: "0 0 5px rgba(10, 40, 130, 0.4), 0 0 10px rgba(10, 40, 130, 0.2), 0 0 15px rgba(10, 40, 130, 0.1)" }}
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <GetInTouchButton className="fixed top-6 right-6 z-50" variant="transparent" />

        <div className="relative z-[2]">

          {/* ── Hero ── */}
          <section className="pt-32 pb-12 md:pt-40 md:pb-16 flex items-center px-6 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full max-w-6xl mx-auto">

              {/* Video — left */}
              <motion.div
                className="w-full md:w-[45%] flex-shrink-0"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div
                  className="relative rounded-[2rem] overflow-hidden aspect-square flex items-center justify-center"
                  style={{ border: "1px solid rgba(20, 55, 150, 0.6)", boxShadow: "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1), 0 20px 60px hsla(0,0%,0%,0.5)" }}
                >
                  <video
                    ref={videoRef}
                    src={illusionVideo}
                    className="w-full h-full object-cover object-top scale-125"
                    autoPlay loop muted playsInline preload="auto"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsla(0,0%,0%,0.3) 100%)" }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, hsla(0,0%,0%,0.35) 0%, transparent 30%), linear-gradient(to bottom, hsla(0,0%,0%,0.15) 0%, transparent 20%)" }} />
                </div>
              </motion.div>

              {/* Text — right */}
              <motion.div
                className="w-full md:w-[55%] flex flex-col gap-6 items-center md:items-start text-center md:text-left"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex items-center gap-3 text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70">
                  <span className="hidden md:inline-block w-10 h-[1px]" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
                  <span style={{ fontFamily: "Nestborn, sans-serif" }}>Mentalist&nbsp;&nbsp;·&nbsp;&nbsp;Magician&nbsp;&nbsp;·&nbsp;&nbsp;Hypnotist</span>
                </div>
                <h1
                  className="text-[10vw] md:text-[4.2vw] leading-[1.05] tracking-[-0.01em] text-black"
                  style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                >
                  Anything is{" "}
                  <span className="italic" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>possible</span>.
                </h1>
                <p
                  className="text-base md:text-lg leading-relaxed font-light max-w-xl"
                  style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif", color: "#000000" }}
                >
                  I'm Rhishav Sikdar — a mentalist blending psychology, intuition, and illusion into experiences that don't just entertain, they linger.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Stats ── */}
          <section className="px-6 md:px-16 lg:px-24 pb-12 md:pb-16">
            <motion.div
              className="max-w-6xl mx-auto p-6 md:p-10 rounded-2xl"
              style={glassCardStyle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <div className="grid grid-cols-3 gap-x-6 gap-y-8 md:gap-x-10">
                {[
                  { value: "18+", label: "Years of Craft" },
                  { value: "600+", label: "Shows Performed" },
                  { value: "100+", label: "Corporate Stages" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-2 items-center text-center">
                    <span className="text-3xl md:text-5xl text-black leading-none" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                      {s.value}
                    </span>
                    <span className="text-[0.65rem] md:text-[0.75rem] tracking-[0.18em] uppercase text-black/70 leading-tight" style={{ fontFamily: "Nestborn, sans-serif" }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── About ── */}
          <section className="px-6 md:px-16 lg:px-24 pb-12 md:pb-16">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
              <motion.h2
                className="text-[8vw] md:text-[3.4vw] leading-[1.05] text-center md:text-left text-black"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Not a show. An <span className="italic" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>experience</span>.
              </motion.h2>
              <motion.div
                className="rounded-2xl p-6 md:p-10 flex flex-col gap-5"
                style={glassCardStyle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
              >
                <p className="text-base md:text-lg leading-relaxed font-light text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                  For over eighteen years, I've studied and performed the art of magic and mentalism — blending psychology, intuition, and illusion to craft moments that people remember long after the room empties.
                </p>
                <p className="text-base md:text-lg leading-relaxed font-light text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                  With more than eight years as a professional, I've shared these experiences across 600+ stages and with 100+ corporate organisations. Every performance is designed to bring you closer to what your own mind is truly capable of — a reminder that wonder is not something that happens to you, but something you create.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Gallery ── */}
          <section className="px-6 md:px-16 lg:px-24 pb-10">
            <div className="max-w-6xl mx-auto">
              <motion.p
                className="text-center text-2xl md:text-4xl uppercase tracking-[0.35em] mb-6 font-bold"
                style={{ fontFamily: "Nestborn, sans-serif", color: "hsla(0, 0%, 0%, 0.95)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Gallery
              </motion.p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {["ejoAXoEA6-E", "kNELGcY56_0", "wZHUZ8wF4bo", "8jDlJWRpTM8"].map((videoId, i) => (
                  <motion.div
                    key={videoId}
                    className="relative rounded-2xl overflow-hidden aspect-[9/16]"
                    style={{ border: "2.5px solid rgba(20, 55, 150, 0.8)", backdropFilter: "blur(20px)", boxShadow: "0 0 14px rgba(10, 40, 130, 0.5), 0 0 28px rgba(10, 40, 130, 0.3), 0 0 42px rgba(10, 40, 130, 0.15)", background: "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)" }}
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

          {/* ── Perfect For ── */}
          <section className="px-6 md:px-16 lg:px-24 pb-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="flex items-center justify-center gap-3 text-[0.7rem] md:text-[0.75rem] tracking-[0.3em] uppercase text-black/70 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block w-10 h-[1px]" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
                <span style={{ fontFamily: "Nestborn, sans-serif" }}>Perfect For</span>
                <span className="inline-block w-10 h-[1px]" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
              </motion.div>
              <motion.h2
                className="text-[9vw] md:text-[3.8vw] leading-[1.05] mb-8 md:mb-10 text-center text-black"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Every celebration deserves{" "}
                <span className="italic" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>a little magic</span>.
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event, i) => (
                  <motion.div
                    key={event.number}
                    className="relative w-full rounded-2xl p-6 md:p-8 flex flex-col gap-5 overflow-hidden"
                    style={glassCardStyle}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70" style={{ fontFamily: "Nestborn, sans-serif" }}>
                        {event.category}
                      </span>
                      <h3 className="text-3xl md:text-4xl leading-tight text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed font-light text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                      {event.description}
                    </p>
                    <div className="h-[1px] w-full" style={{ background: "rgba(20, 55, 150, 0.3)" }} />
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] uppercase text-black/65"
                          style={{ fontFamily: "Nestborn, sans-serif", border: "1px solid rgba(20, 55, 150, 0.3)", background: "hsla(0,0%,100%,0.05)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── The Experiences ── */}
          <section className="px-6 md:px-16 lg:px-24 pb-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="flex items-center justify-center gap-3 text-[0.7rem] md:text-[0.75rem] tracking-[0.3em] uppercase text-black/70 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block w-10 h-[1px]" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
                <span style={{ fontFamily: "Nestborn, sans-serif" }}>The Experiences</span>
                <span className="inline-block w-10 h-[1px]" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
              </motion.div>
              <motion.h2
                className="text-[9vw] md:text-[3.8vw] leading-[1.05] mb-8 md:mb-10 text-center text-black"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Three formats.{" "}
                <span className="italic" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>One unforgettable</span>{" "}
                evening.
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.title}
                    className="relative w-full rounded-2xl p-6 md:p-8 flex flex-col gap-5 overflow-hidden"
                    style={glassCardStyle}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70" style={{ fontFamily: "Nestborn, sans-serif" }}>
                        {exp.format}
                      </span>
                      <h3 className="text-3xl md:text-4xl leading-tight text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed font-light text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                      {exp.description}
                    </p>
                    <div className="h-[1px] w-full" style={{ background: "rgba(20, 55, 150, 0.3)" }} />
                    <ul className="flex flex-col gap-3">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-base leading-snug font-light text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                          <span className="inline-block mt-[0.6rem] w-3 h-[1.5px] flex-shrink-0" style={{ background: "rgba(20, 55, 150, 0.7)" }} aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="h-[1px] w-full" style={{ background: "rgba(20, 55, 150, 0.3)" }} />
                    <button
                      onClick={() => navigate("/contact")}
                      className="mt-auto self-start flex items-center gap-2 text-base text-black border-b border-black/40 pb-1 hover:border-black transition-colors cursor-pointer"
                      style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                    >
                      {exp.enquireLabel}
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Connect CTA ── */}
          <section className="px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
            <motion.div
              className="max-w-4xl mx-auto rounded-2xl p-8 md:p-14 flex flex-col gap-6 items-center text-center"
              style={glassCardStyle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <div className="flex items-center gap-3 text-[0.7rem] md:text-[0.75rem] tracking-[0.3em] uppercase text-black/70">
                <span className="inline-block w-10 h-[1px]" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
                <span style={{ fontFamily: "Nestborn, sans-serif" }}>Book an Experience</span>
              </div>
              <h2 className="text-[10vw] md:text-[3.8vw] leading-[1.05] text-black" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                Let's craft something{" "}
                <span className="italic" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>unforgettable</span>.
              </h2>
              <p className="text-base md:text-lg leading-relaxed font-light text-black max-w-xl" style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}>
                Share a few details about your event and I'll personally reply with availability, format recommendations, and next steps.
              </p>
              <GetInTouchButton variant="transparent" className="mt-2" />
            </motion.div>
          </section>

          {/* ── Trusted By ── */}
          <section className="px-6 md:px-16 lg:px-24 pb-12">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-center text-2xl md:text-4xl uppercase tracking-[0.35em] mb-6 font-bold" style={{ fontFamily: "Nestborn, sans-serif", color: "hsla(0, 0%, 0%, 0.95)" }}>
                Trusted By
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
                        style={{ background: "linear-gradient(135deg, hsla(0,0%,100%,0.08) 0%, hsla(0,0%,100%,0.02) 100%)", border: "1.5px solid rgba(100, 160, 255, 0.35)", backdropFilter: "blur(20px)" }}
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
