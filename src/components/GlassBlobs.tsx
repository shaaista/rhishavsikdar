import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GlassPanel = ({ side, label, onClick }: { side: "left" | "right"; label: string; onClick?: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const radius = "7vh";

  return (
    <div
      className={`glass-button-wrap ${side === "left" ? "glass-button-wrap--magic" : ""} w-[22%] h-full pointer-events-auto cursor-pointer`}
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
          className="glass-button-text relative z-10 block select-none uppercase tracking-[0.3em] text-base font-light"
          style={{ color: "hsl(0, 0%, 100%)", fontFamily: "'Eastham', sans-serif", fontSize: "1.4rem" }}
        >
          {label}
        </span>
      </div>
      <div className="glass-button-shadow" style={{ borderRadius: "inherit" }} />
    </div>
  );
};

const GlassBlobs = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-[30vh] left-0 w-screen h-[14vh] z-[5] pointer-events-none flex justify-between px-4">
      <GlassPanel side="left" label="Magic" onClick={() => navigate("/magic")} />
      <GlassPanel side="right" label="Therapy" onClick={() => navigate("/therapy")} />
    </div>
  );
};

export default GlassBlobs;
