import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

type InfiniteSliderProps = {
  children: ReactNode[];
  gap?: number;
  speed?: number;
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 40,
  speed = 30,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [duplicated, setDuplicated] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || duplicated) return;

    const items = Array.from(scroller.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scroller.appendChild(clone);
    });
    setDuplicated(true);
  }, [duplicated]);

  const duration = duplicated && scrollerRef.current
    ? (scrollerRef.current.scrollWidth / 2 / speed)
    : 30;

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        ref={scrollerRef}
        className="flex w-max"
        style={{
          gap: `${gap}px`,
          animation: `infinite-scroll ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
