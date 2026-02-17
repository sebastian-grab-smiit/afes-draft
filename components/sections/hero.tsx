"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Scale } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";
import { GlobeStory } from "@/components/hero/globe-story";
import { HowWeWork } from "@/components/sections/how-we-work";

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
  secondaryCta = { text: "Why AFES", href: "#hero-how-we-work" },
  backgroundImage,
}: HeroProps) {
  const [headerOffset, setHeaderOffset] = useState(64);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionTriggerRef = useRef<ScrollTrigger | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const progressTargetRef = useRef(0);
  const progressRafRef = useRef<number | null>(null);
  const progressCommittedRef = useRef(0);
  // Reveal-/Globe-Strecke bewusst konstant halten, obwohl der nachgelagerte Hold verlängert wird.
  const revealDistanceDesktopVh = 135;
  const revealDistanceMobileVh = 126;
  const totalPinnedDistanceDesktopVh = 190;
  const totalPinnedDistanceMobileVh = 180;

  const sectionSnapThreshold = 0.95;
  const sectionState = storyProgress >= sectionSnapThreshold ? 1 : 0;

  // Zwei feste Zustände (Hero / HowWeWork) mit weicher CSS-Transition dazwischen.
  // Die Globe-interne Progress-Logik bleibt unverändert, da storyProgress weiter
  // direkt an GlobeStory übergeben wird.
  const exitTransition = sectionState;
  const revealTransition = sectionState;

  const leftExitTranslateX = -220 * exitTransition;
  const rightExitTranslateX = 220 * exitTransition;
  const heroColumnsOpacity = 1 - exitTransition;
  const shellOpacity = 1 - revealTransition;
  const problemLayerOpacity = revealTransition;
  const problemLayerTranslateY = 42 * (1 - revealTransition);
  const problemLayerScale = 0.97 + 0.03 * revealTransition;

  function handleWhyAfesClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (secondaryCta?.href !== "#hero-how-we-work") return;

    event.preventDefault();

    const trigger = sectionTriggerRef.current;
    if (!trigger) return;

    const revealProgressLimit =
      window.innerWidth >= 1024
        ? revealDistanceDesktopVh / totalPinnedDistanceDesktopVh
        : revealDistanceMobileVh / totalPinnedDistanceMobileVh;

    // Direkter Zielpunkt auf der Trigger-Timeline statt fixem Pixel-Delta:
    // so landet der Klick reproduzierbar im HowWeWork-Snap-Zustand.
    const targetTriggerProgress = Math.min(1, sectionSnapThreshold * revealProgressLimit + 0.01);
    const targetScrollY = trigger.start + (trigger.end - trigger.start) * targetTriggerProgress;

    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }

  function handlePrimaryCtaClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (primaryCta.href !== "#contact") return;

    event.preventDefault();

    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeaderOffset = () => {
      const next = Math.round(header.getBoundingClientRect().height);
      setHeaderOffset(next > 0 ? next : 64);
    };

    updateHeaderOffset();

    const observer = new ResizeObserver(updateHeaderOffset);
    observer.observe(header);
    window.addEventListener("resize", updateHeaderOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderOffset);
    };
  }, []);

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
      start: () => `top top+=${headerOffset}`,
      end: () => (window.innerWidth >= 1024 ? `+=${totalPinnedDistanceDesktopVh}%` : `+=${totalPinnedDistanceMobileVh}%`),
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Nach dem vollständigen Reveal (HowWeWork sichtbar) bleibt der Progress
        // kurz auf 1 stehen. Dadurch entsteht der gewünschte Blocker zwischen
        // HowWeWork und dem nächsten Section-Übergang.
        const revealProgressLimit =
          window.innerWidth >= 1024
            ? revealDistanceDesktopVh / totalPinnedDistanceDesktopVh
            : revealDistanceMobileVh / totalPinnedDistanceMobileVh;
        const normalizedProgress = self.progress <= revealProgressLimit ? self.progress / revealProgressLimit : 1;
        progressTargetRef.current = normalizedProgress;

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

    sectionTriggerRef.current = trigger;

    return () => {
      if (progressRafRef.current !== null) {
        cancelAnimationFrame(progressRafRef.current);
      }
      sectionTriggerRef.current = null;
      trigger.kill();
    };
  }, [headerOffset]);

  return (
    <section
      id="hero-how-we-work"
      ref={sectionRef}
      className="relative border-b border-border bg-background overflow-hidden"
      style={{
        height: `calc(100dvh - ${headerOffset}px)`,
        minHeight: `calc(100svh - ${headerOffset}px)`,
      }}
    >
      <div
        className="absolute inset-0 z-0 flex items-center justify-center px-4 lg:px-8 xl:px-10"
        style={{
          opacity: problemLayerOpacity,
          transform: `translateY(${problemLayerTranslateY}px) scale(${problemLayerScale})`,
          pointerEvents: problemLayerOpacity > 0.55 ? "auto" : "none",
          transition: "opacity 1820ms cubic-bezier(0.22, 1, 0.36, 1), transform 1980ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="h-full w-full max-w-[94rem]">
          <HowWeWork embedded />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background"
        style={{ opacity: shellOpacity }}
      />

      <div
        className="relative z-10 mx-auto flex h-full w-full max-w-[94rem] items-center px-4 py-4 lg:px-8 lg:py-4 xl:px-10 xl:py-6"
        style={{ pointerEvents: heroColumnsOpacity > 0.02 ? "auto" : "none" }}
      >
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-18 mb-10 [@media(max-height:860px)]:mb-2">
          {/* Left Column: Content */}
          <div
            className="flex h-full max-w-[42rem] flex-col justify-center"
            style={{
              opacity: heroColumnsOpacity,
              transform: `translateX(${leftExitTranslateX}px)`,
              pointerEvents: heroColumnsOpacity > 0.02 ? "auto" : "none",
              transition: "opacity 1760ms cubic-bezier(0.22, 1, 0.36, 1), transform 1980ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="grid min-h-[23rem] lg:min-h-[25rem] [@media(max-height:860px)]:min-h-[16rem] [@media(max-height:720px)]:min-h-[12rem]">
              <div
                className="col-start-1 row-start-1"
                style={{
                  opacity: heroColumnsOpacity,
                  transform: `translateX(${Math.max(0, leftExitTranslateX * 0.3)}px)`,
                  pointerEvents: heroColumnsOpacity > 0.01 ? "auto" : "none",
                  transition: "opacity 1700ms cubic-bezier(0.22, 1, 0.36, 1), transform 1920ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <h1 className="text-balance text-[clamp(2rem,5vw,4rem)] font-bold leading-tight tracking-tight text-foreground">
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
                  <Link href={primaryCta.href} onClick={handlePrimaryCtaClick}>
                    {primaryCta.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {secondaryCta && (
                  <Button size="lg" variant="outline" asChild>
                    <Link
                      href={secondaryCta.href}
                      onClick={handleWhyAfesClick}
                      target={secondaryCta.href.startsWith("http") ? "_blank" : undefined}
                      rel={secondaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {secondaryCta.text}
                    </Link>
                  </Button>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 [@media(max-height:860px)]:mt-8 [@media(max-height:720px)]:mt-5">
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
            className="relative hidden h-full lg:flex lg:items-start lg:justify-center lg:pt-6 xl:pt-22 [@media(max-height:860px)]:pt-0"
            style={{
              opacity: heroColumnsOpacity,
              transform: `translateX(${rightExitTranslateX}px)`,
              pointerEvents: heroColumnsOpacity > 0.02 ? "auto" : "none",
              transition: "opacity 1760ms cubic-bezier(0.22, 1, 0.36, 1), transform 1920ms cubic-bezier(0.22, 1, 0.36, 1)",
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
