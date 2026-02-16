"use client";

import { ScrollReveal } from "@/components/motion-wrapper";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export function FinalCTA() {
  return (
    <section className="relative border-t border-border bg-muted/30 py-24 lg:py-32" id="contact">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Value Prop & Steps */}
          <ScrollReveal>
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Ready to optimize your claims process?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Start with a pilot project to see the difference. We integrate seamlessly with your existing workflows.
              </p>

              <div className="mt-12 space-y-8">
                <div className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:h-full before:w-[2px] before:bg-border last:before:hidden">
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary">
                    1
                  </div>
                  <h3 className="font-semibold text-foreground">Briefing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We align on scope, SLAs, and reporting requirements.
                  </p>
                </div>
                <div className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:h-full before:w-[2px] before:bg-border last:before:hidden">
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary">
                    2
                  </div>
                  <h3 className="font-semibold text-foreground">Pilot Setup</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Data exchange setup and process definition within days.
                  </p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary">
                    3
                  </div>
                  <h3 className="font-semibold text-foreground">Go Live</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Immediate handling of assigned cases with full transparency.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <a 
                  href="mailto:contact@afes-group.com" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Prefer to email? contact@afes-group.com
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Contact Form */}
          <ScrollReveal delay={0.2}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

