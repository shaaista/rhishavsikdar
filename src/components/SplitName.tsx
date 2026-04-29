const SplitName = () => {
  const glowStyle: React.CSSProperties = {
    fontFamily: "'AquireLight', sans-serif",
    color: "black",
  };

  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-1 md:gap-8 pointer-events-none px-4 md:px-6">
      <h1
        className="text-center text-[14vw] md:text-[9vw] uppercase tracking-[0.2em] leading-none font-[770] md:font-[440]"
        style={glowStyle}
      >
        Rhishav
      </h1>
      <h1
        className="text-center text-[14vw] md:text-[9vw] uppercase tracking-[0.2em] leading-none font-[770] md:font-[440]"
        style={glowStyle}
      >
        Sikdar
      </h1>
    </div>
  );
};

export default SplitName;
