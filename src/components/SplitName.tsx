const SplitName = () => {
  const glowStyle: React.CSSProperties = {
    fontFamily: "'Helica', sans-serif",
    color: "white",
    textShadow:
      "0 0 10px rgba(80, 140, 255, 0.5), 0 0 20px rgba(80, 140, 255, 0.3), 0 0 40px rgba(80, 140, 255, 0.15), 0 0 60px rgba(100, 160, 255, 0.2)",
  };

  return (
    <div className="flex flex-col md:flex-row w-full items-center md:items-start justify-center gap-1 md:gap-8 pointer-events-none px-4 md:px-6">
      <h1
        className="text-[12vw] md:text-[7.5vw] uppercase tracking-[0.2em] leading-none"
        style={glowStyle}
      >
        Rhishav
      </h1>
      <h1
        className="text-[12vw] md:text-[7.5vw] uppercase tracking-[0.2em] leading-none"
        style={glowStyle}
      >
        Sikdar
      </h1>
    </div>
  );
};

export default SplitName;
