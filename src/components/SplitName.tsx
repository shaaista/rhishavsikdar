const SplitName = () => {
  const glowStyle: React.CSSProperties = {
    fontFamily: "'Zina', sans-serif",
    color: "hsl(0, 0%, 100%)",
    textShadow:
      "0 0 10px rgba(80, 140, 255, 0.5), 0 0 20px rgba(80, 140, 255, 0.3), 0 0 40px rgba(80, 140, 255, 0.15)",
  };

  return (
    <div className="fixed inset-0 z-[2] flex items-start justify-between pointer-events-none px-4 md:px-6 pt-[8vh] md:pt-[4vh] overflow-hidden">
      <h1
        className="text-[10vw] md:text-[7.5vw] uppercase tracking-[0.2em] leading-none"
        style={glowStyle}
      >
        Rhishav
      </h1>
      <h1
        className="text-[10vw] md:text-[7.5vw] uppercase tracking-[0.2em] leading-none"
        style={glowStyle}
      >
        Sikdar
      </h1>
    </div>
  );
};

export default SplitName;
