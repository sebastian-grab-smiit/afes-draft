"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EUROPE_COUNTRIES } from "@/lib/data";
import { FadeUp, FadeIn } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

export function BranchesMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [showAllCountries, setShowAllCountries] = useState(false);

  return (
    <section className="bg-muted py-20 lg:py-28" id="branches">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeUp>
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Our network
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Local presence. Central control.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Active in over 20 countries across Europe and North Africa with
              local partners and branch offices.
            </p>
          </div>
        </FadeUp>

        <FadeIn delay={0.1}>
          <div className="overflow-hidden rounded-lg border border-border bg-background p-6 lg:p-10">
            <svg
              viewBox="100 50 400 370"
              className="mx-auto h-auto w-full max-w-2xl"
              aria-label="Map of AFES branches across Europe"
              role="img"
            >
              <path
                d="M160,100 L200,85 L250,80 L300,75 L340,80 L380,90 L420,100 L450,120 L460,150 L455,180 L440,210 L430,240 L435,270 L420,300 L400,320 L380,340 L350,350 L320,360 L290,370 L260,365 L230,350 L200,340 L180,320 L165,300 L155,270 L150,240 L145,210 L148,180 L152,150 L155,120 Z"
                fill="hsl(210, 20%, 97%)"
                stroke="hsl(220, 13%, 91%)"
                strokeWidth="1.5"
              />

              {EUROPE_COUNTRIES.map((country) => (
                <g
                  key={country.code}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={country.x}
                    cy={country.y}
                    r={hoveredCountry === country.code ? 7 : 4}
                    fill="hsl(170, 44%, 50%)"
                    fillOpacity={hoveredCountry === country.code ? 1 : 0.5}
                    className="transition-all duration-150"
                  />
                  {hoveredCountry === country.code && (
                    <>
                      <rect
                        x={country.x - 40}
                        y={country.y - 26}
                        width="80"
                        height="18"
                        rx="3"
                        fill="hsl(222, 47%, 11%)"
                        fillOpacity="0.9"
                      />
                      <text
                        x={country.x}
                        y={country.y - 14}
                        textAnchor="middle"
                        fill="white"
                        fontSize="9"
                        fontWeight="500"
                      >
                        {country.name}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </FadeIn>

        <FadeUp delay={0.15}>
          <div className="mt-6">
            <button
              onClick={() => setShowAllCountries(!showAllCountries)}
              className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <MapPin className="h-3.5 w-3.5" />
              {showAllCountries ? "Hide country list" : "Show all countries"}
            </button>

            {showAllCountries && (
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {EUROPE_COUNTRIES.map((country) => (
                  <div
                    key={country.code}
                    className={cn(
                      "flex items-center gap-2 bg-background px-3 py-2",
                      "text-sm text-foreground"
                    )}
                  >
                    <span className="text-xs font-semibold text-muted-foreground">
                      {country.code}
                    </span>
                    {country.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="#branches">
                View all branches
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
