"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROCESS_STEPS } from "@/lib/data";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function HowWeWork() {
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28" id="how-we-work">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeUp>
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Our process
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How AFES works
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Every claim follows a structured process with clear inputs and
              measurable outputs at each stage.
            </p>
          </div>
        </FadeUp>

        {/* Desktop horizontal stepper */}
        <StaggerContainer className="hidden lg:block" staggerDelay={0.08}>
          <div className="relative grid grid-cols-4 gap-0">
            {/* Connector line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-border" aria-hidden="true" />

            {PROCESS_STEPS.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-sm font-semibold text-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>

                  <div className="mt-3 w-full max-w-[220px]">
                    <div className="rounded-md bg-muted p-3 text-left">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Input
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-foreground">
                        {step.input}
                      </p>
                    </div>
                    <div className="mt-1.5 rounded-md border border-primary/20 bg-background p-3 text-left">
                      <p className="text-xs font-medium uppercase tracking-wider text-primary">
                        Output
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-foreground">
                        {step.output}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Mobile vertical stepper */}
        <StaggerContainer className="flex flex-col gap-0 lg:hidden" staggerDelay={0.06}>
          {PROCESS_STEPS.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-sm font-semibold text-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>

                <div className="pb-8">
                  <h3 className="text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Input
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground">
                        {step.input}
                      </p>
                    </div>
                    <div className="rounded-md border border-primary/20 bg-background p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-primary">
                        Output
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground">
                        {step.output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="#how-we-work">
                See process & reporting sample
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
