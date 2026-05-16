import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, User, Users, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GetInTouchButton from "@/components/GetInTouchButton";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";
import portraitImg from "@/assets/innerworkwithbg.png";
import { useState } from "react";

const GlassCallButton = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const radius = "7vh";
  const variantClass = "glass-button-wrap--transparent";

  return (
    <div
      className={`glass-button-wrap ${variantClass} w-full max-w-[320px] h-[60px] md:h-[70px] pointer-events-auto cursor-pointer mx-auto mt-12`}
      style={{ borderRadius: radius }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="glass-border-ring" style={{ borderRadius: "inherit" }} />
      <div
        className="glass-button relative isolate w-full h-full flex items-center justify-center"
        style={{ borderRadius: "inherit" }}
      >
        <span
          className="glass-button-text relative z-10 block select-none tracking-[0.1em] md:tracking-[0.15em] font-bold px-1 md:px-2 text-center text-[1rem] md:text-[1.2rem]"
          style={{ color: "black", fontFamily: "'Nestborn', sans-serif" }}
        >
          {label}
        </span>
      </div>
      <div className="glass-button-shadow" style={{ borderRadius: "inherit" }} />
    </div>
  );
};

const credentials = [
  { label: "Certified", value: "Jacquin Hypnosis Academy" },
  { label: "Reiki Master", value: "Level 3 Healer" },
  { label: "EFT", value: "Emotional Freedom Technique" },
  { label: "Experience", value: "16+ years in practice" },
];

const stats = [
  { value: "16+", label: "Years of Practice" },
  { value: "3", label: "Certifications" },
  { value: "1000+", label: "Sessions Held" },
];

type Offering = {
  eyebrow: string;
  label: string;
  description: string;
  bullets: string[];
  duration: string;
  format: string;
  formatIcon: "user" | "users";
  cta: string;
};

const offerings: Offering[] = [
  {
    eyebrow: "For Individuals",
    label: "Personal Reset",
    description:
      "Deep, one-on-one work focused on resolving challenges at the root — shifting the underlying patterns of the subconscious for change that feels natural and lasting.",
    bullets: [
      "Addictions, habits & compulsions",
      "Stress, anxiety & panic attacks",
      "Trauma & emotional patterns",
      "Phobias, physical pain & mind-linked chronic issues",
    ],
    duration: "90 minutes",
    format: "One-on-one · Online or In person",
    formatIcon: "user",
    cta: "Enquire about Personal Reset",
  },
  {
    eyebrow: "For Organisations",
    label: "Corporate Reset",
    description:
      "A 60-minute guided hypnotherapy session to release stress, reset the mind, and enhance focus — creating a calmer, more resilient workforce.",
    bullets: [
      "Tailored to the specific needs of the organisation",
      "Ideal for groups of 50 – 100 people",
      "Available online or in person",
      "Measurable shift in team clarity and calm",
    ],
    duration: "60 minutes",
    format: "Online · In person",
    formatIcon: "users",
    cta: "Enquire about Corporate Reset",
  },
];

const faqs = [
  {
    question: "Do I need to believe in hypnosis for it to work?",
    answer:
      "No. Hypnosis is a natural, focused state you already enter several times a day. Belief is not required — willingness is enough.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Most personal issues resolve within 1 to 4 sessions. After the first session you will have a clear sense of the arc of the work.",
  },
  {
    question: "Is this suitable for my organisation?",
    answer:
      "If your people are carrying chronic stress, attention fatigue, or low-grade burnout — yes. Corporate Reset is tailored to your team's context.",
  },
  {
    question: "Do you offer online sessions?",
    answer:
      "Yes. Both Personal and Corporate Reset are available online, globally, in addition to in-person sessions.",
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

const glassCardStyle = {
  background:
    "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
  border: "1px solid rgba(20, 55, 150, 0.6)",
  backdropFilter: "blur(20px)",
  boxShadow:
    "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
} as const;

const InnerWork = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="relative w-screen min-h-screen bg-black">
        {/* Fixed iridescent background */}
        <div className="fixed inset-0 z-0">
          <Iridescence
            mouseReact
            amplitude={0.1}
            speed={1}
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

        {/* Back button — routes back to the experience selection */}
        <button
          onClick={() => navigate("/experience")}
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

        {/* Connect button top right */}
        <GetInTouchButton className="fixed top-6 right-6 z-50" variant="transparent" />

        {/* Scrollable content */}
        <div className="relative z-[2]">
          {/* Hero section — portrait left, text right */}
          <section className="pt-32 pb-12 md:pt-40 md:pb-16 flex items-center px-6 md:px-16 lg:px-24">
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
                </div>
              </motion.div>

              {/* Text content */}
              <motion.div
                className="w-full md:w-[55%] flex flex-col gap-6 items-center md:items-start text-center md:text-left"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Eyebrow tags */}
                <div className="flex items-center gap-3 text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-[rgba(20,55,150,0.95)]">
                  <span
                    className="hidden md:inline-block w-10 h-[1px]"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                    aria-hidden="true"
                  />
                  <span style={{ fontFamily: "'Nestborn', sans-serif" }}>
                    Hypnotherapy · Reiki · EFT
                  </span>
                </div>

                {/* Heading */}
                <h1
                  className="text-[10vw] md:text-[4.2vw] leading-[1.05] tracking-[-0.01em] text-black"
                  style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                >
                  Beyond the stage,{" "}
                  <span
                    className="italic"
                    style={{ fontFamily: "\'Libre Baskerville\', \'Baskerville\', serif", color: "rgba(20, 55, 150, 0.95)" }}
                  >
                    my work
                  </span>
                  <br className="hidden md:block" /> goes inward.
                </h1>

                {/* Paragraph */}
                <p
                  className="text-base md:text-lg leading-relaxed font-light max-w-xl"
                  style={{
                    fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                    color: "#000000",
                  }}
                >
                  A certified professional hypnotherapist, Reiki Master Healer
                  and EFT therapist — I guide people back to clarity, calm, and
                  lasting change through the language of the subconscious mind.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Credentials grid */}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-10">
                {credentials.map((c) => (
                  <div key={c.label} className="flex flex-col gap-2">
                    <span
                      className="text-[0.7rem] md:text-[0.75rem] tracking-[0.2em] uppercase text-[rgba(20,55,150,0.95)]"
                      style={{ fontFamily: "'Nestborn', sans-serif" }}
                    >
                      {c.label}
                    </span>
                    <span
                      className="text-base md:text-lg leading-snug text-black"
                      style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                    >
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Work that moves beneath the surface */}
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
                Work that moves beneath the surface.
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
                <p
                  className="text-base md:text-lg leading-relaxed font-light text-black"
                  style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                >
                  My approach is direct, intuitive, and results-driven — working
                  at the level of your subconscious mind so{" "}
                  <span
                    className="italic"
                    style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                  >
                    you
                  </span>{" "}
                  can create real, lasting change.
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed font-light text-black"
                  style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                >
                  With a background in IT, specialising in project management
                  and employee welfare, I bring a grounded, practical
                  understanding of workplace challenges into this work.
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="rounded-2xl p-6 md:p-10"
                style={glassCardStyle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
              >
                <div className="grid grid-cols-3 gap-4 md:gap-8">
                  {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-2 items-center text-center">
                      <span
                        className="text-3xl md:text-5xl text-black leading-none"
                        style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                      >
                        {s.value}
                      </span>
                      <span
                        className="text-[0.65rem] md:text-[0.75rem] tracking-[0.18em] uppercase text-[rgba(20,55,150,0.95)] leading-tight"
                        style={{ fontFamily: "'Nestborn', sans-serif" }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Offerings section */}
          <section className="px-6 md:px-16 lg:px-24 pb-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="flex items-center justify-center gap-3 text-[0.75rem] md:text-[0.85rem] tracking-[0.3em] uppercase text-[rgba(20,55,150,0.95)] mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="inline-block w-10 h-[1px]"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                  aria-hidden="true"
                />
                <span style={{ fontFamily: "'Nestborn', sans-serif" }}>The Offerings</span>
                <span
                  className="inline-block w-10 h-[1px]"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                  aria-hidden="true"
                />
              </motion.div>

              <motion.h2
                className="text-[9vw] md:text-[3.8vw] leading-[1.05] mb-8 md:mb-10 text-center text-black"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Two paths.{" "}
                <span
                  className="italic"
                  style={{ fontFamily: "\'Libre Baskerville\', \'Baskerville\', serif", color: "rgba(20, 55, 150, 0.95)" }}
                >
                  One intention
                </span>{" "}
                — real, lasting change.
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offerings.map((item, i) => {
                  const FormatIcon = item.formatIcon === "user" ? User : Users;
                  return (
                    <motion.div
                      key={item.label}
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
                        <span
                          className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-[rgba(20,55,150,0.95)]"
                          style={{ fontFamily: "'Nestborn', sans-serif" }}
                        >
                          {item.eyebrow}
                        </span>
                        <h3
                          className="text-3xl md:text-4xl leading-tight text-black"
                          style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                        >
                          {item.label}
                        </h3>
                      </div>

                      <p
                        className="text-base leading-relaxed font-light text-black"
                        style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                      >
                        {item.description}
                      </p>

                      <div
                        className="h-[1px] w-full"
                        style={{ background: "rgba(20, 55, 150, 0.3)" }}
                      />

                      <ul className="flex flex-col gap-3">
                        {item.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-base leading-snug font-light text-black"
                            style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                          >
                            <span
                              className="inline-block mt-[0.6rem] w-3 h-[1.5px] flex-shrink-0"
                              style={{ background: "rgba(20, 55, 150, 0.7)" }}
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div
                        className="h-[1px] w-full"
                        style={{ background: "rgba(20, 55, 150, 0.3)" }}
                      />

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/80"
                        style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <FormatIcon className="w-4 h-4" aria-hidden="true" />
                          {item.format}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate("/contact")}
                        className="mt-auto self-start flex items-center gap-2 text-base text-black border-b border-black/40 pb-1 hover:border-black transition-colors"
                        style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                      >
                        {item.cta}
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section className="px-6 md:px-16 lg:px-24 pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
              <motion.h2
                className="text-[9vw] md:text-[3.4vw] leading-[1.05] text-center md:text-left text-black"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                Before we begin.
              </motion.h2>

              <motion.div
                className="rounded-2xl overflow-hidden"
                style={glassCardStyle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={faq.question}
                      className={i !== 0 ? "border-t border-black/10" : ""}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 md:px-8 py-5 md:py-6 text-left hover:bg-white/5 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="text-base md:text-xl text-black leading-snug"
                          style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                        >
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 text-black/70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                          >
                            <p
                              className="px-5 md:px-8 pb-5 md:pb-6 text-base leading-relaxed font-light text-black/80"
                              style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                            >
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Connect CTA section */}
          <section className="px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
            <motion.div
              className="max-w-4xl mx-auto rounded-2xl p-8 md:p-14 flex flex-col gap-6 items-center md:items-start text-center md:text-left"
              style={glassCardStyle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <div className="flex items-center gap-3 text-[0.7rem] md:text-[0.75rem] tracking-[0.3em] uppercase text-[rgba(20,55,150,0.95)]">
                <span
                  className="inline-block w-10 h-[1px]"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                  aria-hidden="true"
                />
                <span style={{ fontFamily: "'Nestborn', sans-serif" }}>Connect</span>
              </div>

              <h2
                className="text-[10vw] md:text-[4vw] leading-[1.05] text-black"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
              >
                Begin with{" "}
                <span
                  className="italic"
                  style={{ fontFamily: "\'Libre Baskerville\', \'Baskerville\', serif", color: "rgba(20, 55, 150, 0.95)" }}
                >
                  a quiet note.
                </span>
              </h2>

              <p
                className="text-base md:text-lg leading-relaxed font-light text-black max-w-xl"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
              >
                Whether for yourself or your organisation — share a little about
                what you're carrying, and I will respond personally within
                48 hours.
              </p>

              <GlassCallButton label="Connect" onClick={() => navigate("/contact")} />
            </motion.div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

export default InnerWork;
