"use client";

import { useEffect, useRef, useState } from "react";

interface LogoCarouselProps {
  logos: readonly string[] | string[];
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>(0);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const speed = 0.4;

    function animate() {
      if (!isPaused && el) {
        scrollPosRef.current += speed;
        if (scrollPosRef.current >= el.scrollWidth / 2) {
          scrollPosRef.current = 0;
        }
        el.scrollLeft = scrollPosRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  const displayLogos = [...logos, ...logos];

  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-background p-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden"
        aria-label="Partner logos"
      >
        {displayLogos.map((logo, i) => (
          <div
            key={`${logo}-${i}`}
            className="flex h-10 shrink-0 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-muted-foreground"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
