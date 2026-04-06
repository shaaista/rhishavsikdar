const CircularText = ({ text = "RHISHAV SIKDAR" }: { text?: string }) => {
  const displayText = `${text} • ${text} •\u00A0`;

  return (
    <div className="fixed inset-0 z-[2] flex items-center justify-center pointer-events-none">
      <svg className="w-[85vmin] h-[85vmin] animate-rotate-slow" viewBox="0 0 300 300">
        <defs>
          <path
            id="circlePath"
            d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
            fill="none"
          />
        </defs>
        <text
          className="fill-foreground/90 uppercase"
          style={{
            fontSize: "42px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <textPath href="#circlePath" startOffset="0%">
            {displayText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CircularText;
