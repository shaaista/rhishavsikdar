import { useState } from "react";

interface MinimalBlockProps {
  title: string;
  description: string;
}

const MinimalBlock = ({ title, description }: MinimalBlockProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative pt-3 pl-3 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner bracket */}
      <div
        className="absolute top-0 left-0 w-2.5 h-2.5"
        style={{
          borderTop: "1.5px solid var(--corner-bracket)",
          borderLeft: "1.5px solid var(--corner-bracket)",
        }}
      />

      <h3 className="text-lg font-medium mb-2 tracking-wide text-foreground">{title}</h3>

      <div className="relative h-[60px] overflow-hidden">
        <p
          className="text-sm leading-relaxed font-light max-w-[95%] transition-all duration-400"
          style={{
            color: "hsl(var(--block-desc))",
            opacity: hovered ? 0 : 1,
            transform: hovered ? "translateY(-20px)" : "translateY(0)",
          }}
        >
          {description}
        </p>
        <div
          className="absolute top-0 left-0 w-full text-base font-normal text-foreground flex items-center gap-2 transition-all duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Explore
          <span
            className="text-foreground transition-transform duration-300"
            style={{ transform: hovered ? "translateX(5px)" : "translateX(0)" }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
};

export default MinimalBlock;
