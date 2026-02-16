"use client";

interface LogoCarouselProps {
  logos: readonly string[] | string[];
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  // Static partner display for professional appearance
  return (
    <div className="overflow-hidden rounded-md border border-border bg-background p-4">
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        aria-label="Partner logos"
      >
        {logos.map((logo, i) => (
          <div
            key={`${logo}-${i}`}
            className="flex h-10 items-center justify-center rounded-sm border border-border px-4 text-sm font-medium text-muted-foreground"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
