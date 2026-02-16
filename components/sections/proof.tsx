"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPIS as DEFAULT_KPIS } from "@/lib/data";
import { ScrollReveal } from "@/components/motion-wrapper";
import { FileText, BarChart3, PieChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DEFAULT_CASES = [
  {
    title: "Complex Coach Accident",
    situation: "Severe multi-passenger accident in France involving a German coach. Multiple injuries and fatalities.",
    approach: "Immediate on-site investigation, coordination with local authorities, and centralized communication with 40+ claimants.",
    outcome: "Settled 20% below initial reserve with 100% compliance to local regulations.",
  },
  // {
  //   title: "Fleet Liability Program",
  //   situation: "Pan-European logistics fleet facing rising claims costs and fragmented handling across 12 countries.",
  //   approach: "Implemented centralized triage, uniform SLAs, and a single digital reporting dashboard.",
  //   outcome: "40% reduction in cycle time and 15% decrease in overall claims spend within 12 months.",
  // },
  // {
  //   title: "Cross-Border Recourse",
  //   situation: "Major insurer struggling with low recovery rates on accidents caused by foreign vehicles.",
  //   approach: "Direct legal action in 5 jurisdictions using specialized local partner network.",
  //   outcome: "Full recovery of €1.2M in stalled claims and established a scalable recovery workflow.",
  // },
];

interface CaseStudy {
  title: string;
  situation: string;
  approach: string;
  outcome: string;
}

interface KPI {
  label: string;
  value: string;
}

interface ProofProps {
  caseStudies?: CaseStudy[];
  kpis?: KPI[];
}

export function Proof({ 
  caseStudies = DEFAULT_CASES, 
  kpis = DEFAULT_KPIS as unknown as KPI[] 
}: ProofProps) {
  return (
    <section className="border-b border-border bg-muted/30 py-20 lg:py-28" id="proof">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Cases */}
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Track Record
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Proven Results
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  We deliver measurable impact through technical expertise and disciplined execution.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {caseStudies.map((item, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="bg-background">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 text-md sm:grid-cols-3">
                      <div>
                        <span className="block font-medium text-muted-foreground">Situation</span>
                        <span className="text-sm mt-1 block text-foreground">{item.situation}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-muted-foreground">Approach</span>
                        <span className="text-sm mt-1 block text-foreground">{item.approach}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-primary">Outcome</span>
                        <span className="text-sm mt-1 block font-medium text-foreground">{item.outcome}</span>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/case-studies">
                  View All Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Reporting & KPIs */}
          <div className="flex flex-col justify-between gap-10">
            <ScrollReveal delay={200}>
              <div className="rounded-lg border border-border bg-background p-6 shadow-sm lg:p-8">
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Standardized Reporting</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">LIVE DASHBOARD</span>
                </div>
                
                {/* Abstract Dashboard Visual */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="h-24 w-1/3 rounded bg-muted/50 p-3">
                      <div className="mb-2 h-2 w-12 rounded-full bg-muted-foreground/20"></div>
                      <div className="text-2xl font-bold text-foreground">98.5%</div>
                      <div className="text-xs text-muted-foreground">SLA Compliance</div>
                    </div>
                    <div className="h-24 w-1/3 rounded bg-muted/50 p-3">
                      <div className="mb-2 h-2 w-12 rounded-full bg-muted-foreground/20"></div>
                      <div className="text-2xl font-bold text-foreground">€4.2M</div>
                      <div className="text-xs text-muted-foreground">Reserve Accuracy</div>
                    </div>
                    <div className="h-24 w-1/3 rounded bg-muted/50 p-3">
                      <div className="mb-2 h-2 w-12 rounded-full bg-muted-foreground/20"></div>
                      <div className="text-2xl font-bold text-foreground">-12%</div>
                      <div className="text-xs text-muted-foreground">Avg. Cost</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 rounded bg-muted/30 p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <div className="h-2 w-20 rounded-full bg-muted-foreground/20"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-end gap-1">
                          <div className="h-8 w-full rounded-t bg-primary/20"></div>
                          <div className="h-12 w-full rounded-t bg-primary/40"></div>
                          <div className="h-16 w-full rounded-t bg-primary/60"></div>
                          <div className="h-10 w-full rounded-t bg-primary/30"></div>
                          <div className="h-14 w-full rounded-t bg-primary/50"></div>
                        </div>
                        <div className="h-px w-full bg-border"></div>
                      </div>
                    </div>
                    <div className="h-32 rounded bg-muted/30 p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                        <div className="h-2 w-20 rounded-full bg-muted-foreground/20"></div>
                      </div>
                      <div className="flex h-full items-center justify-center">
                        <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Real-time transparency across all jurisdictions.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {kpis.map((kpi, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
