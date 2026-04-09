import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicated, setDuplicated] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const currentOffset = useRef(0);
  const animationPaused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const pauseAnimation = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const transform = getComputedStyle(scroller).transform;
    if (transform && transform !== "none") {
      const matrix = new DOMMatrix(transform);
      currentOffset.current = matrix.m41;
    }
    scroller.style.animation = "none";
    scroller.style.transform = `translateX(${currentOffset.current}px)`;
    animationPaused.current = true;
  }, []);

  const resumeAnimation = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !duplicated) return;
    const halfWidth = scroller.scrollWidth / 2;
    // Normalize offset to stay within -halfWidth..0 range
    let offset = currentOffset.current % halfWidth;
    if (offset > 0) offset -= halfWidth;
    currentOffset.current = offset;
    // Calculate where we are as a fraction of the animation
    const progress = Math.abs(offset) / halfWidth;
    scroller.style.transform = "";
    scroller.style.animation = `infinite-scroll ${duration}s linear infinite`;
    scroller.style.animationDirection = reverse ? "reverse" : "normal";
    scroller.style.animationDelay = `-${progress * duration}s`;
    animationPaused.current = false;
  }, [duration, reverse, duplicated]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    dragOffset.current = 0;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    pauseAnimation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pauseAnimation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const delta = e.clientX - startX.current;
    dragOffset.current = delta;
    scroller.style.transform = `translateX(${currentOffset.current + delta}px)`;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    currentOffset.current += dragOffset.current;
    dragOffset.current = 0;
    // Resume auto-scroll after a short delay
    resumeTimer.current = setTimeout(() => {
      resumeAnimation();
    }, 800);
  }, [resumeAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={{ touchAction: "pan-y", cursor: "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        ref={scrollerRef}
        className="flex w-max select-none"
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
