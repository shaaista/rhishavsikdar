import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface GetInTouchButtonProps {
  className?: string;
  variant?: "frost" | "blue";
}

const styles = {
  frost: {
    default: {
      border: "2.5px solid rgba(100, 160, 255, 0.3)",
      boxShadow: "0 0 10px rgba(80, 140, 255, 0.2), 0 0 20px rgba(80, 140, 255, 0.1), 0 0 30px rgba(80, 140, 255, 0.05)",
      backdropFilter: "blur(20px)",
      background: "linear-gradient(135deg, hsla(0,0%,100%,0.04) 0%, hsla(0,0%,100%,0.01) 100%)",
    },
    hover: {
      scale: 1.06,
      boxShadow: "0 0 18px rgba(80, 140, 255, 0.35), 0 0 36px rgba(80, 140, 255, 0.18), 0 0 54px rgba(80, 140, 255, 0.08)",
    },
  },
  blue: {
    default: {
      border: "1px solid rgba(255, 255, 255, 0.4)",
      background: "linear-gradient(135deg, rgba(120, 180, 255, 0.7) 0%, rgba(100, 160, 255, 0.8) 50%, rgba(80, 140, 255, 0.9) 100%)",
      boxShadow: "inset 4px 4px 10px rgba(255, 255, 255, 0.6), inset -4px -4px 10px rgba(255, 255, 255, 0.3), 0 15px 30px rgba(80, 140, 255, 0.5), 0 8px 15px rgba(80, 140, 255, 0.3)",
      backdropFilter: "blur(12px) saturate(1.2)",
    },
    hover: {
      scale: 1.02,
      y: -2,
      background: "linear-gradient(135deg, rgba(140, 200, 255, 0.8) 0%, rgba(120, 180, 255, 0.9) 50%, rgba(100, 160, 255, 1) 100%)",
      boxShadow: "inset 5px 5px 12px rgba(255, 255, 255, 0.7), inset -5px -5px 12px rgba(255, 255, 255, 0.4), 0 20px 40px rgba(80, 140, 255, 0.6), 0 10px 20px rgba(80, 140, 255, 0.4)",
    },
  },
};

const GetInTouchButton = ({ className = "", variant = "frost" }: GetInTouchButtonProps) => {
  const navigate = useNavigate();
  const s = styles[variant];

  return (
    <div className={className}>
      <motion.div
        className="rounded-[4rem] overflow-hidden cursor-pointer"
        style={s.default}
        whileHover={s.hover}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => navigate("/contact")}
      >
        <div className="px-8 py-3 flex items-center justify-center">
          <span
            className="uppercase tracking-[0.15em] md:tracking-[0.3em] text-xs md:text-sm font-bold whitespace-nowrap"
            style={{
              color: "hsl(0, 0%, 0%)",
              fontFamily: "'Nestborn', sans-serif",
            }}
          >
            Get in Touch
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default GetInTouchButton;
