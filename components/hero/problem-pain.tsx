"use client";

import { FadeIn } from "@/components/motion-wrapper";
import { 
  AlertTriangle, 
  FileWarning, 
  TrendingDown, 
  LucideIcon, 
  HelpCircle, 
  Unlink, 
  XCircle,
  ShieldAlert
} from "lucide-react";

const DEFAULT_HURDLES = [
  {
    title: "Fragmented Communication",
    description: "Multiple touchpoints across different countries lead to information silos and lost context.",
    icon: Unlink,
  },
  {
    title: "Unpredictable Reserves",
    description: "Inconsistent reserve setting practices vary by jurisdiction, making financial planning difficult.",
    icon: TrendingDown,
  },
  {
    title: "Compliance Risks",
    description: "Navigating varying local regulations without centralized oversight increases legal exposure.",
    icon: ShieldAlert,
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

function FragmentedNetworkVisual() {
  return (
    <div className="relative h-[300px] w-full max-w-[400px] mx-auto lg:h-[400px] lg:max-w-none flex items-center justify-center">
      {/* Abstract Network SVG */}
      <svg className="w-full h-full max-h-[400px]" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle (optional, for depth) */}
        <circle cx="200" cy="200" r="150" className="fill-muted/5 stroke-muted-foreground/10" strokeDasharray="8 8" strokeWidth="1" />

        {/* Central Node (Broken) */}
        <circle cx="200" cy="200" r="40" className="fill-background stroke-foreground shadow-sm" strokeWidth="2" />
        
        {/* Outer Nodes */}
        <circle cx="100" cy="100" r="12" className="fill-background stroke-destructive animate-pulse" strokeWidth="3" />
        <circle cx="300" cy="100" r="12" className="fill-background stroke-destructive animate-pulse" strokeWidth="3" style={{ animationDelay: "0.5s" }} />
        <circle cx="100" cy="300" r="12" className="fill-background stroke-destructive animate-pulse" strokeWidth="3" style={{ animationDelay: "1s" }} />
        <circle cx="300" cy="300" r="12" className="fill-background stroke-destructive animate-pulse" strokeWidth="3" style={{ animationDelay: "1.5s" }} />

        {/* Broken Connections */}
        {/* Top Left to Center - Broken */}
        <path d="M110 110 L160 160" className="stroke-destructive" strokeWidth="3" strokeDasharray="6 4" />
        <circle cx="135" cy="135" r="4" className="fill-destructive" />

        {/* Top Right to Center - Broken */}
        <path d="M290 110 L240 160" className="stroke-destructive" strokeWidth="3" strokeDasharray="6 4" />
        <circle cx="265" cy="135" r="4" className="fill-destructive" />

        {/* Bottom Left to Center - Broken */}
        <path d="M110 290 L160 240" className="stroke-destructive" strokeWidth="3" strokeDasharray="6 4" />
        <circle cx="135" cy="265" r="4" className="fill-destructive" />

        {/* Bottom Right to Center - Broken */}
        <path d="M290 290 L240 240" className="stroke-destructive" strokeWidth="3" strokeDasharray="6 4" />
        <circle cx="265" cy="265" r="4" className="fill-destructive" />

        {/* Central "Void" or "Missing Link" */}
        <path d="M180 180 L220 220" className="stroke-muted-foreground/40" strokeWidth="2" />
        <path d="M220 180 L180 220" className="stroke-muted-foreground/40" strokeWidth="2" />
        
        {/* Floating "Error" Icons (SVG based) */}
        <g transform="translate(190, 190)">
           <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/60" />
        </g>
      </svg>
      
      {/* Overlay Text/Labels */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-[10px] font-mono text-destructive font-bold bg-background/95 px-2 py-1 rounded border border-destructive/20 shadow-sm whitespace-nowrap">
          CONNECTION LOST
        </span>
      </div>
    </div>
  );
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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column: Content & Hurdles */}
          <div>
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                The cost of <span className="text-destructive">decentralized</span> claims management
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Managing cross-border claims without a unified strategy often leads to operational inefficiencies and financial leakage.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {hurdles.map((hurdle, index) => {
                const Icon = hurdle.icon || HelpCircle;
                return (
                  <FadeIn key={hurdle.title} delay={index * 0.1 + 0.2}>
                    <div className="flex gap-4 items-start group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive group-hover:bg-destructive/20 transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {hurdle.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {hurdle.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative mt-12 lg:mt-0">
             <FadeIn delay={0.4}>
                <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 shadow-md flex justify-center">
                  <FragmentedNetworkVisual />
                </div>
             </FadeIn>
          </div>
        </div>

        {/* Bottom: Consequences */}
        <FadeIn delay={0.6}>
          <div className="mt-16 pt-8 border-t border-border">
            <div className="grid gap-8 md:grid-cols-3">
              {consequences.map((item) => (
                <div key={item.label} className="text-center">
                  <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {item.label}
                  </dt>
                  <dd className="text-xl font-bold text-foreground">
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
