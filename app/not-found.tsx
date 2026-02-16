"use client";

import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/motion-wrapper";
import { NotFoundGlobe } from "@/components/hero/not-found-globe";
import { Button } from "@/components/ui/button";

const PROOF_POINTS = [
  { icon: SearchX, text: "Page not available" },
  { icon: Home, text: "Return to homepage" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="relative h-[calc(100dvh-4rem)] min-h-[calc(100svh-4rem)] border-b border-border bg-background overflow-hidden">
          <div className="mx-auto flex h-full w-full max-w-[94rem] items-center px-4 py-4 lg:px-8 lg:py-4 xl:px-10 xl:py-6">
            <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20 mb-10">
              <div className="flex h-full max-w-[42rem] flex-col justify-center">
                <FadeIn>
                  <h1 className="text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-tight tracking-tight text-foreground">
                    Page not found. <br className="hidden lg:block" />
                    <span className="text-muted-foreground">The link may be outdated.</span> <br className="hidden lg:block" />
                    <span className="text-primary">Let’s get you back on track.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <p className="mt-6 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-muted-foreground">
                    The page you requested could not be found. Please return to the homepage or contact us directly if you need support.
                  </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/">
                        Back to Homepage
                        <ArrowLeft className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/#contact">Contact Us</Link>
                    </Button>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
                    {PROOF_POINTS.map((point) => (
                      <div key={point.text} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <point.icon className="h-5 w-5 text-primary" />
                        <span>{point.text}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <div className="relative hidden h-full lg:flex lg:items-start lg:justify-center lg:pt-6 xl:pt-22">
                <FadeIn delay={0.2} className="w-full">
                  <NotFoundGlobe />
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
