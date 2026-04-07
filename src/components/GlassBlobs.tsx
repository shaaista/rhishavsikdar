import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GlassPanel = ({ side, label, onClick }: { side: "left" | "right"; label: string; onClick?: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const radius = "7vh";

  return (
    <div
      className="glass-button-wrap glass-button-wrap--3d w-[42%] md:w-[22%] h-full pointer-events-auto cursor-pointer"
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
          className="glass-button-text relative z-10 block select-none uppercase tracking-[0.15em] md:tracking-[0.3em] font-bold px-1 md:px-2 text-center text-[1.15rem] md:text-[1.4rem]"
          style={{ color: "black", fontFamily: "'Eastham', sans-serif" }}
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
    <div className="fixed top-[32vh] md:top-auto bottom-auto md:bottom-[30vh] left-0 w-screen h-[7vh] md:h-[14vh] z-[5] pointer-events-none flex flex-row justify-center md:justify-between items-center gap-4 md:gap-0 px-4 md:px-12">
      <GlassPanel side="left" label="Illusionist" onClick={() => navigate("/illusionist")} />
      <GlassPanel side="right" label="InnerWork" onClick={() => navigate("/innerwork")} />
    </div>
  );
};

export default GlassBlobs;
