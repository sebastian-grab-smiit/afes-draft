"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, FadeIn } from "@/components/motion-wrapper";

const PROOF_POINTS = [
  "50+ years experience",
  "30+ countries",
  "In-house legal & quality",
];

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <FadeUp>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Cross-border claims handling — local execution, centrally steered
            </h1>
          </FadeUp>

          <FadeUp delay={0.08}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Faster cycle times, full transparency, consistent reporting
              across countries and partners.
            </p>
          </FadeUp>

          <FadeUp delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="#contact">
                  Request now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-we-work">How we work</Link>
              </Button>
            </div>
          </FadeUp>

          <FadeIn delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {PROOF_POINTS.map((point) => (
                <li
                  key={point}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.25}>
            <blockquote className="mt-8 border-l-2 border-border pl-4">
              <p className="text-sm text-muted-foreground">
                {'"Outcome, transparency and consistency — across borders."'}
              </p>
              <cite className="mt-1 block text-xs text-muted-foreground/70 not-italic">
                Managing Director, AFES
              </cite>
            </blockquote>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
