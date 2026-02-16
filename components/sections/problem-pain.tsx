"use client";

import { FadeIn } from "@/components/motion-wrapper";
import { AlertTriangle, FileWarning, TrendingDown, LucideIcon, HelpCircle } from "lucide-react";

const DEFAULT_HURDLES = [
  {
    title: "Fragmented Communication",
    description: "Multiple touchpoints across different countries lead to information silos and lost context.",
    icon: AlertTriangle,
  },
  {
    title: "Unpredictable Reserves",
    description: "Inconsistent reserve setting practices vary by jurisdiction, making financial planning difficult.",
    icon: TrendingDown,
  },
  {
    title: "Compliance Risks",
    description: "Navigating varying local regulations without centralized oversight increases legal exposure.",
    icon: FileWarning,
  },
];

const DEFAULT_CONSEQUENCES = [
  { label: "Settlement Delays", value: "Increased Cycle Time" },
  { label: "Audit Failures", value: "Compliance Gaps" },
  { label: "Admin Overhead", value: "Resource Drain" },
];

interface Hurdle {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface Consequence {
  label: string;
  value: string;
}

interface ProblemPainProps {
  hurdles?: Hurdle[];
  consequences?: Consequence[];
  embedded?: boolean;
}

export function ProblemPain({ 
  hurdles = DEFAULT_HURDLES, 
  consequences = DEFAULT_CONSEQUENCES,
  embedded = false,
}: ProblemPainProps) {
  return (
    <section
      className={embedded ? "h-full overflow-y-auto bg-muted/30 py-14 lg:py-16" : "bg-muted/30 py-24 lg:py-32"}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The cost of decentralized claims management
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Managing cross-border claims without a unified strategy often leads to operational inefficiencies and financial leakage.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {hurdles.map((hurdle, index) => {
            const Icon = hurdle.icon || HelpCircle;
            return (
              <FadeIn key={hurdle.title} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-lg border border-border bg-background p-8 transition-all hover:shadow-md">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {hurdle.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {hurdle.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-16 rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {consequences.map((item) => (
                <div key={item.label} className="text-center py-4 md:py-0">
                  <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-bold text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
