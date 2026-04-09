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
  const momentumRaf = useRef<number | null>(null);
  const lastMoveX = useRef(0);
  const lastMoveTime = useRef(0);
  const velocity = useRef(0);
  const isTouch = useRef(false);

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
    if (momentumRaf.current) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
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
    let offset = currentOffset.current % halfWidth;
    if (offset > 0) offset -= halfWidth;
    currentOffset.current = offset;
    const progress = Math.abs(offset) / halfWidth;
    scroller.style.transform = "";
    scroller.style.animation = `infinite-scroll ${duration}s linear infinite`;
    scroller.style.animationDirection = reverse ? "reverse" : "normal";
    scroller.style.animationDelay = `-${progress * duration}s`;
    animationPaused.current = false;
  }, [duration, reverse, duplicated]);

  const startMomentum = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const friction = 0.95;
    const animate = () => {
      velocity.current *= friction;
      if (Math.abs(velocity.current) < 0.5) {
        resumeTimer.current = setTimeout(() => {
          resumeAnimation();
        }, 600);
        return;
      }
      currentOffset.current += velocity.current;
      scroller.style.transform = `translateX(${currentOffset.current}px)`;
      momentumRaf.current = requestAnimationFrame(animate);
    };
    momentumRaf.current = requestAnimationFrame(animate);
  }, [resumeAnimation]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    isTouch.current = e.pointerType === "touch";
    startX.current = e.clientX;
    dragOffset.current = 0;
    velocity.current = 0;
    lastMoveX.current = e.clientX;
    lastMoveTime.current = Date.now();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    pauseAnimation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pauseAnimation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const now = Date.now();
    const rawDelta = e.clientX - startX.current;
    // On touch, multiply movement for faster feel with less finger travel
    const multiplier = isTouch.current ? 2.5 : 1;
    const delta = rawDelta * multiplier;
    dragOffset.current = delta;
    // Track velocity for momentum
    const dt = now - lastMoveTime.current;
    if (dt > 0) {
      velocity.current = (e.clientX - lastMoveX.current) * multiplier / dt * 16;
    }
    lastMoveX.current = e.clientX;
    lastMoveTime.current = now;
    scroller.style.transform = `translateX(${currentOffset.current + delta}px)`;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    currentOffset.current += dragOffset.current;
    dragOffset.current = 0;
    // If there's enough velocity, glide with momentum then resume
    if (Math.abs(velocity.current) > 1) {
      startMomentum();
    } else {
      resumeTimer.current = setTimeout(() => {
        resumeAnimation();
      }, 800);
    }
  }, [resumeAnimation, startMomentum]);

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
