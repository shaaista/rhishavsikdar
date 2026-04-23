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
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const momentumRaf = useRef<number | null>(null);
  const dragRaf = useRef<number | null>(null);
  const targetX = useRef(0);
  const smoothX = useRef(0);
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
    smoothX.current = currentOffset.current;
    targetX.current = currentOffset.current;
    scroller.style.animation = "none";
    scroller.style.transform = `translateX(${currentOffset.current}px)`;
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
  }, [duration, reverse, duplicated]);

  // Keep offsets inside (-halfWidth, 0] so the cloned content always tiles the viewport
  const normalizeOffsets = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const halfWidth = scroller.scrollWidth / 2;
    if (!halfWidth) return;
    while (smoothX.current > 0) {
      smoothX.current -= halfWidth;
      targetX.current -= halfWidth;
      currentOffset.current -= halfWidth;
    }
    while (smoothX.current < -halfWidth) {
      smoothX.current += halfWidth;
      targetX.current += halfWidth;
      currentOffset.current += halfWidth;
    }
  }, []);

  // Smooth drag loop — lerps toward target position at 60fps
  const startDragLoop = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const loop = () => {
      if (!isDragging.current) return;
      // Lerp: smoothly interpolate toward the target
      smoothX.current += (targetX.current - smoothX.current) * 0.35;
      normalizeOffsets();
      scroller.style.transform = `translateX(${smoothX.current}px)`;
      dragRaf.current = requestAnimationFrame(loop);
    };
    dragRaf.current = requestAnimationFrame(loop);
  }, [normalizeOffsets]);

  const stopDragLoop = useCallback(() => {
    if (dragRaf.current) {
      cancelAnimationFrame(dragRaf.current);
      dragRaf.current = null;
    }
  }, []);

  const startMomentum = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const friction = 0.96;
    smoothX.current = currentOffset.current;
    const animate = () => {
      velocity.current *= friction;
      if (Math.abs(velocity.current) < 0.3) {
        resumeTimer.current = setTimeout(() => {
          resumeAnimation();
        }, 600);
        return;
      }
      currentOffset.current += velocity.current;
      // Smooth lerp for momentum too
      smoothX.current += (currentOffset.current - smoothX.current) * 0.4;
      normalizeOffsets();
      scroller.style.transform = `translateX(${smoothX.current}px)`;
      momentumRaf.current = requestAnimationFrame(animate);
    };
    momentumRaf.current = requestAnimationFrame(animate);
  }, [resumeAnimation, normalizeOffsets]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    isTouch.current = e.pointerType === "touch";
    startX.current = e.clientX;
    dragOffset.current = 0;
    velocity.current = 0;
    lastMoveX.current = e.clientX;
    lastMoveTime.current = performance.now();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    pauseAnimation();
    startDragLoop();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pauseAnimation, startDragLoop]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const rawDelta = e.clientX - startX.current;
    const multiplier = isTouch.current ? 1.75 : 1;
    const delta = rawDelta * multiplier;
    dragOffset.current = delta;
    // Set the target — the drag loop will smoothly interpolate to it
    targetX.current = currentOffset.current + delta;
    // Track velocity with smoothing
    const dt = now - lastMoveTime.current;
    if (dt > 0) {
      const instantVel = (e.clientX - lastMoveX.current) * multiplier / dt * 16;
      velocity.current = velocity.current * 0.6 + instantVel * 0.4;
    }
    lastMoveX.current = e.clientX;
    lastMoveTime.current = now;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    stopDragLoop();
    currentOffset.current += dragOffset.current;
    dragOffset.current = 0;
    if (Math.abs(velocity.current) > 1) {
      startMomentum();
    } else {
      resumeTimer.current = setTimeout(() => {
        resumeAnimation();
      }, 800);
    }
  }, [resumeAnimation, startMomentum, stopDragLoop]);

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
          willChange: "transform",
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
