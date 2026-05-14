import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Check, Instagram, Youtube, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(20, 55, 150, 0.35)",
  borderRadius: 0,
  padding: "0.6rem 0",
  outline: "none",
  fontFamily: "'Libre Baskerville', 'Baskerville', serif",
  fontSize: "1rem",
  color: "hsla(0,0%,0%,0.9)",
  transition: "border-color 0.25s, box-shadow 0.25s",
};

const intents = [
  { id: "illusion", title: "Illusion", subtitle: "Private Show" },
  { id: "innerwork", title: "Inner Work", subtitle: "Sessions" },
  { id: "both", title: "Both", subtitle: "I'm Curious" },
] as const;

type IntentId = typeof intents[number]["id"];

const glassCardStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
  border: "1px solid rgba(20, 55, 150, 0.6)",
  backdropFilter: "blur(20px)",
  boxShadow:
    "0 0 10px rgba(10, 40, 130, 0.4), 0 0 20px rgba(10, 40, 130, 0.2), 0 0 30px rgba(10, 40, 130, 0.1)",
};

const Contact = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState<string | null>(null);
  const [intent, setIntent] = useState<IntentId>("both");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const focusStyle = (field: string): React.CSSProperties =>
    focused === field
      ? {
          borderBottomColor: "rgba(20, 55, 150, 0.9)",
          boxShadow: "0 1px 0 0 rgba(10, 40, 130, 0.25)",
        }
      : {};

  return (
    <PageTransition>
      <div className="relative w-screen min-h-screen bg-black">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <Iridescence mouseReact amplitude={0.1} speed={1} />
        </div>
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsla(0,0%,100%,0.1) 0%, hsla(0,0%,100%,0.15) 40%, hsla(0,0%,100%,0.25) 100%)",
          }}
        />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
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

        {/* Content */}
        <div className="relative z-[2] flex flex-col items-center min-h-screen px-6 py-28">
          <div className="w-full max-w-2xl">
            {/* Heading */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1
                className="text-[12vw] md:text-[5vw] leading-[1.05] text-black"
                style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
              >
                Write to me.{" "}
                <span
                  className="italic"
                  style={{ fontFamily: "\'Libre Baskerville\', \'Baskerville\', serif", color: "rgba(20, 55, 150, 0.95)" }}
                >
                  I'll write back.
                </span>
              </h1>
              <p
                className="mt-5 text-base md:text-lg font-light leading-relaxed max-w-xl"
                style={{
                  fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                  color: "hsla(0,0%,0%,0.8)",
                }}
              >
                Whether you're booking a private performance, considering
                therapy, or simply curious where the two meet — start here. Your
                note lands directly in my inbox.
              </p>
            </motion.div>

            {/* Response indicator */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full"
                style={{
                  border: "1px solid rgba(20, 55, 150, 0.6)",
                  background: "rgba(255,255,255,0.15)",
                }}
                aria-hidden="true"
              >
                <Check className="w-3 h-3 text-black/80" />
              </span>
              <span
                className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70"
                style={{ fontFamily: "'Nestborn', sans-serif" }}
              >
                Response
              </span>
              <span
                className="text-sm font-light"
                style={{
                  fontFamily: "'Libre Baskerville', 'Baskerville', serif",
                  color: "hsla(0,0%,0%,0.85)",
                }}
              >
                Within 48 hours, personally
              </span>
            </motion.div>

            {/* Form card */}
            <motion.form
              className="w-full rounded-3xl p-6 md:p-10 flex flex-col gap-7"
              style={glassCardStyle}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70"
                  style={{ fontFamily: "'Nestborn', sans-serif" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="How would you like to be addressed?"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, ...focusStyle("name") }}
                  className="placeholder:text-black/40 placeholder:italic"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70"
                  style={{ fontFamily: "'Nestborn', sans-serif" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@somewhere.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, ...focusStyle("email") }}
                  className="placeholder:text-black/40 placeholder:italic"
                />
              </div>

              {/* What brings you here */}
              <div className="flex flex-col gap-3">
                <label
                  className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70"
                  style={{ fontFamily: "'Nestborn', sans-serif" }}
                >
                  What brings you here
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {intents.map((opt) => {
                    const selected = intent === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        type="button"
                        onClick={() => setIntent(opt.id)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative rounded-xl px-3 py-4 md:px-4 md:py-5 flex flex-col items-center justify-center gap-1 text-center"
                        style={{
                          background: selected
                            ? "linear-gradient(135deg, hsla(0,0%,100%,0.18) 0%, hsla(0,0%,100%,0.06) 100%)"
                            : "linear-gradient(135deg, hsla(0,0%,100%,0.06) 0%, hsla(0,0%,100%,0.02) 100%)",
                          border: selected
                            ? "1px solid rgba(20, 55, 150, 0.85)"
                            : "1px solid rgba(20, 55, 150, 0.3)",
                          backdropFilter: "blur(16px)",
                          boxShadow: selected
                            ? "0 0 8px rgba(10, 40, 130, 0.4), 0 0 16px rgba(10, 40, 130, 0.2)"
                            : "none",
                        }}
                        aria-pressed={selected}
                      >
                        <span
                          className="absolute top-2 right-2 w-2 h-2 rounded-full transition-opacity"
                          style={{
                            background: "rgba(20, 55, 150, 0.85)",
                            opacity: selected ? 1 : 0,
                          }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-base md:text-lg leading-tight text-black"
                          style={{ fontFamily: "'Libre Baskerville', 'Baskerville', serif" }}
                        >
                          {opt.title}
                        </span>
                        <span
                          className="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-black/60"
                          style={{ fontFamily: "'Nestborn', sans-serif" }}
                        >
                          {opt.subtitle}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase text-black/70"
                  style={{ fontFamily: "'Nestborn', sans-serif" }}
                >
                  Your Note
                </label>
                <textarea
                  rows={4}
                  placeholder="A few sentences about what you're looking for..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, ...focusStyle("message"), resize: "none" }}
                  className="placeholder:text-black/40 placeholder:italic"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="mt-2 w-full py-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer"
                style={{
                  ...glassCardStyle,
                  fontFamily: "'Nestborn', sans-serif",
                  color: "hsl(0,0%,0%)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Send your note
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </motion.form>

            {/* Social links */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href="https://www.instagram.com/rhishavsikdar?igsh=MWVqbGl3c2NjYzczag=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-black transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-7 h-7" />
              </a>
              <a
                href="https://youtube.com/@rhishavsikdar?si=iRdfGgLjCsur0Fvy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-black transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-7 h-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/rhishavsikdar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-black transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-7 h-7" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
