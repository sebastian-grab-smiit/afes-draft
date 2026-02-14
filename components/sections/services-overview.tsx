"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function ServicesOverview() {
  return (
    <section className="bg-muted py-20 lg:py-28" id="services">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeUp>
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              What we deliver
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Services with measurable outputs
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid gap-6 md:grid-cols-2" staggerDelay={0.06}>
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-background p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">When: </span>
                  {service.when}
                </p>

                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Key outputs
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {service.outputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Typical cases: </span>
                    {service.typicalCases.join(", ")}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Button size="sm" asChild>
              <Link href="#services">
                Explore all services
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
