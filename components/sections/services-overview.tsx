"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";
import { ScrollReveal } from "@/components/motion-wrapper";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ServicesOverviewProps {
  title?: string;
  filter?: (service: typeof SERVICES[number]) => boolean;
}

export function ServicesOverview({ 
  title = "Service Portfolio", 
  filter 
}: ServicesOverviewProps) {
  const filteredServices = filter ? SERVICES.filter(filter) : SERVICES;

  return (
    <section className="bg-muted/30 py-24 lg:py-32" id="services">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tailored solutions for every claim situation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">When?</p>
                    <p className="text-sm text-foreground">{service.when}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">For Whom?</p>
                    <p className="text-sm text-foreground">{service.forWhom}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Output</p>
                    <ul className="mt-1 space-y-1">
                      {service.outputs.map((output) => (
                        <li key={output} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-start p-0 hover:bg-transparent hover:text-primary" asChild>
                    <Link href="#services">
                      Explore Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
