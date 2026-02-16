"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KPIS, PARTNER_LOGOS } from "@/lib/data";
import { ScrollReveal } from "@/components/motion-wrapper";
import { LogoCarousel } from "@/components/logo-carousel";

export function Reputation() {
  return (
    <section className="border-b border-border bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Track record
            </p>
            {/* Factual partner description */}
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Partner Network
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={50}>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <LogoCarousel logos={[...PARTNER_LOGOS]} />

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
              {KPIS.map((kpi) => (
                <div key={kpi.label} className="flex flex-col bg-background p-5">
                  <span className="tabular-nums text-3xl font-bold text-foreground">
                    {kpi.value}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {kpi.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="#how-we-work">
                References & cases
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
