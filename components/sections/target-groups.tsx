"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TARGET_GROUPS } from "@/lib/data";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function TargetGroups() {
  return (
    <section className="bg-muted py-20 lg:py-28" id="target-groups">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeUp>
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Who we work for
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Tailored outcomes for every partner
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.06}
        >
          {TARGET_GROUPS.map((group) => (
            <StaggerItem key={group.title}>
              <Link
                href={group.href}
                className="group flex h-full flex-col bg-background p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {group.pain}
                </p>
                <div className="mt-auto pt-4">
                  <p className="text-sm font-medium text-foreground">
                    {group.outcome}
                  </p>
                </div>
                <span className="mt-3 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
