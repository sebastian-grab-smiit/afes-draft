"use client";

import { useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeUp, FadeIn } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-foreground py-20 text-background lg:py-28" id="contact">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div>
            <FadeUp>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-background/50">
                Get started
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Start with a pilot
              </h2>
              <p className="mt-3 text-base text-background/70">
                Fast, clear, measurable. No long-term commitment required.
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <ol className="mt-8 flex flex-col gap-3">
                {[
                  "Share a test case (or a small portfolio segment).",
                  "We define scope, reporting outputs and SLAs.",
                  "First feedback within days — with transparent next steps.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-background/20 text-xs font-semibold text-background/70">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-background/80">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </FadeUp>

            <FadeUp delay={0.14}>
              <div className="mt-8 rounded-md border border-background/10 bg-background/5 p-5">
                <p className="mb-2 text-sm font-semibold text-background">
                  Data handling
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    "What we need: claim context, documents, target reporting format.",
                    "GDPR-aware, minimal data, documented access.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-background/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href="tel:+496912345678"
                  className="flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                >
                  <Phone className="h-4 w-4" />
                  +49 69 123 456 78
                </a>
                <a
                  href="mailto:info@afes.eu"
                  className="flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                >
                  <Mail className="h-4 w-4" />
                  info@afes.eu
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right: Form */}
          <FadeIn delay={0.1}>
            <div className="rounded-lg border border-background/10 bg-background/5 p-6 lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-semibold">Thank you</h3>
                  <p className="text-sm text-background/70">
                    {"We'll be in touch within 24 hours."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold">Book initial call</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name" className="text-sm text-background/70">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className={cn(
                          "rounded-md border-background/20 bg-background/5 text-background",
                          "placeholder:text-background/30",
                          "focus:border-primary focus:ring-primary"
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="company" className="text-sm text-background/70">
                        Company
                      </Label>
                      <Input
                        id="company"
                        placeholder="Company name"
                        required
                        className={cn(
                          "rounded-md border-background/20 bg-background/5 text-background",
                          "placeholder:text-background/30",
                          "focus:border-primary focus:ring-primary"
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-sm text-background/70">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className={cn(
                        "rounded-md border-background/20 bg-background/5 text-background",
                        "placeholder:text-background/30",
                        "focus:border-primary focus:ring-primary"
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="country" className="text-sm text-background/70">
                      Country
                    </Label>
                    <Input
                      id="country"
                      placeholder="Country of operation"
                      className={cn(
                        "rounded-md border-background/20 bg-background/5 text-background",
                        "placeholder:text-background/30",
                        "focus:border-primary focus:ring-primary"
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-sm text-background/70">
                      Message
                    </Label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Tell us about your needs..."
                      className={cn(
                        "flex w-full rounded-md border px-3 py-2 text-sm",
                        "border-background/20 bg-background/5 text-background",
                        "placeholder:text-background/30",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        "resize-none"
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Book initial call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
