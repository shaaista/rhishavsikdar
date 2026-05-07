import { motion } from "framer-motion";

const NAME_PARTS = ["Rhishav", "Sikdar"] as const;

const SplitName = ({ startDelay = 0 }: { startDelay?: number }) => {
  const glowStyle: React.CSSProperties = {
    fontFamily: "'AquireLight', sans-serif",
    color: "black",
  };

  let runningIndex = 0;

  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-1 md:gap-8 pointer-events-none px-4 md:px-6">
      {NAME_PARTS.map((part, partIdx) => (
        <h1
          key={partIdx}
          className="text-center text-[14vw] md:text-[9vw] uppercase tracking-[0.2em] leading-none font-[770] md:font-[440] flex justify-center"
          style={glowStyle}
        >
          {part.split("").map((ch, i) => {
            const idx = runningIndex++;
            return (
              <motion.span
                key={`${partIdx}-${i}`}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: "0.6em", scale: 0.4, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: startDelay + idx * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {ch}
              </motion.span>
            );
          })}
        </h1>
      ))}
    </div>
  );
};

export default SplitName;
