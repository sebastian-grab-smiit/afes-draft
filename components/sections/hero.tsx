"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Scale } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";
import { GlobeStory } from "@/components/hero/globe-story";
import { ProblemPain } from "@/components/sections/problem-pain";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

const PROOF_POINTS = [
  { icon: ShieldCheck, text: "50+ years experience" },
  { icon: Globe, text: "Europe-wide network" },
  { icon: Scale, text: "In-house quality & legal" },
];

interface HeroProps {
  headline?: React.ReactNode;
  subline?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export function Hero({
  headline = (
    <>
      Cross-border claims handling. <br className="hidden lg:block" />
      <span className="text-muted-foreground">Local execution.</span> <br className="hidden lg:block" />
      <span className="text-primary">Centralized steering.</span>
    </>
  ),
  subline = "Accelerate cycle times, ensure full transparency, and maintain consistent reporting across all jurisdictions.",
  primaryCta = { text: "Request Consultation", href: "#contact" },
  secondaryCta = { text: "Report a Claim", href: "https://portal.afes-iis.com" },
  backgroundImage,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const progressTargetRef = useRef(0);
  const progressRafRef = useRef<number | null>(null);
  const progressCommittedRef = useRef(0);

  const exitStart = 0.76;
  const exitEnd = 0.94;
  const exitTransition = clamp01((storyProgress - exitStart) / (exitEnd - exitStart));

  const revealStart = 0.8;
  const revealEnd = 0.98;
  const revealTransition = clamp01((storyProgress - revealStart) / (revealEnd - revealStart));

  const leftExitTranslateX = -220 * exitTransition;
  const rightExitTranslateX = 220 * exitTransition;
  const heroColumnsOpacity = 1 - exitTransition;
  const shellOpacity = 1 - revealTransition;
  const problemLayerOpacity = revealTransition;
  const problemLayerTranslateY = 42 * (1 - revealTransition);
  const problemLayerScale = 0.97 + 0.03 * revealTransition;

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStoryProgress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top+=64",
      end: () => (window.innerWidth >= 1024 ? "+=320%" : "+=260%"),
      pin: true,
      scrub: 1.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        progressTargetRef.current = self.progress;

        if (progressRafRef.current !== null) return;

        progressRafRef.current = requestAnimationFrame(() => {
          progressRafRef.current = null;

          // Quantize to reduce React re-render pressure while preserving smoothness.
          const quantized = Math.round(progressTargetRef.current * 240) / 240;
          if (quantized === progressCommittedRef.current) return;

          progressCommittedRef.current = quantized;
          setStoryProgress(quantized);
        });
      },
    });

    return () => {
      if (progressRafRef.current !== null) {
        cancelAnimationFrame(progressRafRef.current);
      }
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[calc(100dvh-4rem)] min-h-[calc(100svh-4rem)] border-b border-border bg-background overflow-hidden">
      <div
        className="absolute inset-0 z-0 flex items-center justify-center px-4 lg:px-8 xl:px-10"
        style={{
          opacity: problemLayerOpacity,
          transform: `translateY(${problemLayerTranslateY}px) scale(${problemLayerScale})`,
          pointerEvents: problemLayerOpacity > 0.55 ? "auto" : "none",
          transition: "opacity 320ms ease-out, transform 380ms ease-out",
        }}
      >
        <div className="h-full w-full max-w-[94rem]">
          <ProblemPain embedded />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background"
        style={{ opacity: shellOpacity }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[94rem] items-center px-4 py-4 lg:px-8 lg:py-4 xl:px-10 xl:py-6">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20 mb-10">
          {/* Left Column: Content */}
          <div
            className="flex h-full max-w-[42rem] flex-col justify-center"
            style={{
              opacity: heroColumnsOpacity,
              transform: `translateX(${leftExitTranslateX}px)`,
              pointerEvents: heroColumnsOpacity > 0.02 ? "auto" : "none",
              transition: "opacity 260ms ease-out, transform 340ms ease-out",
            }}
          >
            <div className="grid min-h-[23rem] lg:min-h-[25rem]">
              <div
                className="col-start-1 row-start-1"
                style={{
                  opacity: heroColumnsOpacity,
                  transform: `translateX(${Math.max(0, leftExitTranslateX * 0.3)}px)`,
                  pointerEvents: heroColumnsOpacity > 0.01 ? "auto" : "none",
                  transition: "opacity 220ms ease-out, transform 300ms ease-out",
                }}
              >
                <h1 className="text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-tight tracking-tight text-foreground">
                  {headline}
                </h1>

                <p className="mt-6 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-muted-foreground">
                  {subline}
                </p>
              </div>
            </div>

            <FadeIn delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {secondaryCta && (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={secondaryCta.href} target={secondaryCta.href.startsWith("http") ? "_blank" : undefined} rel={secondaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {secondaryCta.text}
                    </Link>
                  </Button>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
                {PROOF_POINTS.map((point) => (
                  <div key={point.text} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <point.icon className="h-5 w-5 text-primary" />
                    <span>{point.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Globe Story */}
          <div
            className="relative hidden h-full lg:flex lg:items-start lg:justify-center lg:pt-6 xl:pt-22"
            style={{
              opacity: heroColumnsOpacity,
              transform: `translateX(${rightExitTranslateX}px)`,
              pointerEvents: heroColumnsOpacity > 0.02 ? "auto" : "none",
              transition: "opacity 260ms ease-out, transform 360ms ease-out",
            }}
          >
            <FadeIn delay={0.2} className="w-full">
              <GlobeStory progress={storyProgress} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
