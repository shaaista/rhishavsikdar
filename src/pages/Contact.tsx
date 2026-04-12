import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Iridescence from "@/components/Iridescence";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "linear-gradient(135deg, hsla(0,0%,100%,0.06) 0%, hsla(0,0%,100%,0.02) 100%)",
  border: "1.5px solid rgba(100, 160, 255, 0.25)",
  backdropFilter: "blur(16px)",
  borderRadius: "1rem",
  padding: "0.9rem 1.25rem",
  outline: "none",
  fontFamily: "'Helica', sans-serif",
  fontSize: "0.95rem",
  color: "hsl(0,0%,0%)",
  transition: "border-color 0.25s, box-shadow 0.25s",
};

const Contact = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const focusStyle = (field: string): React.CSSProperties =>
    focused === field
      ? {
          borderColor: "rgba(20, 55, 150, 0.6)",
          boxShadow: "0 0 6px rgba(10, 40, 130, 0.2), 0 0 12px rgba(10, 40, 130, 0.08)",
        }
      : {};

  return (
    <PageTransition>
      <div className="relative w-screen min-h-screen bg-black">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <Iridescence color={[0.5, 0.9, 1]} mouseReact amplitude={0.1} speed={0.2} />
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
            border: "1px solid rgba(20, 55, 150, 0.3)",
            boxShadow: "0 0 5px rgba(10, 40, 130, 0.2), 0 0 10px rgba(10, 40, 130, 0.1)",
          }}
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="relative z-[2] flex flex-col items-center justify-center min-h-screen px-6 py-28">

          {/* Heading */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1
              className="text-[13vw] md:text-[6vw] uppercase leading-[0.9] tracking-[0.12em]"
              style={{ fontFamily: "'Nestborn', sans-serif", color: "hsl(0,0%,0%)" }}
            >
              Let's Connect
            </h1>
            <p
              className="mt-4 text-sm md:text-base font-light max-w-sm mx-auto"
              style={{ fontFamily: "'Helica', sans-serif", color: "hsla(0,0%,0%,0.6)" }}
            >
              Share a little about yourself and what you're seeking.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            className="w-full max-w-lg rounded-3xl p-8 flex flex-col gap-5"
            style={{
              background: "linear-gradient(135deg, hsla(0,0%,100%,0.07) 0%, hsla(0,0%,100%,0.02) 100%)",
              border: "1px solid rgba(20, 55, 150, 0.25)",
              backdropFilter: "blur(28px)",
              boxShadow: "0 0 20px rgba(10, 40, 130, 0.08), 0 20px 60px rgba(0,0,0,0.06)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[0.7rem] uppercase tracking-[0.3em] font-light"
                style={{ fontFamily: "'Nestborn', sans-serif", color: "hsla(0,0%,0%,0.45)" }}
              >
                Your Name
              </label>
              <input
                type="text"
                placeholder="Rhishav Sikdar"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle, ...focusStyle("name") }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[0.7rem] uppercase tracking-[0.3em] font-light"
                style={{ fontFamily: "'Nestborn', sans-serif", color: "hsla(0,0%,0%,0.45)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle, ...focusStyle("email") }}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[0.7rem] uppercase tracking-[0.3em] font-light"
                style={{ fontFamily: "'Nestborn', sans-serif", color: "hsla(0,0%,0%,0.45)" }}
              >
                Your Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell me what you're looking for..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle, ...focusStyle("message"), resize: "none" }}
              />
            </div>

            {/* Submit */}
            <motion.button
              className="mt-1 w-full py-3.5 rounded-2xl flex items-center justify-center gap-3 cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.4)",
                background: "linear-gradient(135deg, rgba(120,180,255,0.7) 0%, rgba(100,160,255,0.8) 50%, rgba(80,140,255,0.9) 100%)",
                boxShadow: "inset 4px 4px 10px rgba(255,255,255,0.5), inset -4px -4px 10px rgba(255,255,255,0.2), 0 10px 24px rgba(80,140,255,0.35)",
                fontFamily: "'Nestborn', sans-serif",
                color: "hsl(0,0%,0%)",
                fontSize: "0.8rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: "inset 5px 5px 12px rgba(255,255,255,0.6), inset -5px -5px 12px rgba(255,255,255,0.3), 0 16px 32px rgba(80,140,255,0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Send className="w-3.5 h-3.5" />
              Send Message
            </motion.button>
          </motion.div>

          {/* Contact info — small, below */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { label: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX" },
              { label: "@rhishav", href: "https://instagram.com/rhishav" },
              { label: "rhishav@email.com", href: "mailto:rhishav@email.com" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.72rem] tracking-wide no-underline transition-opacity duration-200 hover:opacity-70"
                style={{ fontFamily: "'Helica', sans-serif", color: "hsla(0,0%,0%,0.4)" }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
