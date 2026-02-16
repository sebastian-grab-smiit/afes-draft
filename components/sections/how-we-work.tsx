"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROCESS_STEPS } from "@/lib/data";
import { ScrollReveal } from "@/components/motion-wrapper";

export function HowWeWork() {
  return (
    <section className="border-t border-border bg-background py-24 lg:py-32" id="how-we-work">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The AFES System
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Demonstrating competence and safety through a structured, auditable workflow.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Desktop Connector Line */}
          <div className="absolute left-0 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-border lg:block" aria-hidden="true" />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="relative flex flex-col gap-6 bg-background pt-8 lg:pt-16">
                  {/* Step Indicator */}
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center bg-background pr-4 lg:left-1/2 lg:-translate-x-1/2 lg:p-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 px-4 text-left lg:items-center lg:text-center">
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    
                    <div className="mt-4 flex w-full flex-col gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Input</span>
                        <span className="text-foreground">{step.input}</span>
                      </div>
                      <div className="h-px w-full bg-border" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Output</span>
                        <span className="font-medium text-foreground">{step.output}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-16 flex justify-center">
            <Button asChild size="lg">
              <Link href="/how-we-work">
                Deep dive into our process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
