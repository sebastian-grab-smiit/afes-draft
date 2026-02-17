"use client";

import { useEffect, useState } from "react";
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
  const [headerOffset, setHeaderOffset] = useState(64);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeaderOffset = () => {
      const next = Math.round(header.getBoundingClientRect().height);
      setHeaderOffset(next > 0 ? next : 64);
    };

    updateHeaderOffset();

    const observer = new ResizeObserver(updateHeaderOffset);
    observer.observe(header);
    window.addEventListener("resize", updateHeaderOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderOffset);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <section
          className="relative border-b border-border bg-background overflow-hidden"
          style={{
            height: `calc(100dvh - ${headerOffset}px)`,
            minHeight: `calc(100svh - ${headerOffset}px)`,
          }}
        >
          <div className="mx-auto flex h-full w-full max-w-[94rem] items-center px-4 py-4 lg:px-8 lg:py-4 xl:px-10 xl:py-6 [@media(max-height:860px)]:py-2">
            <div className="grid h-full min-h-0 w-full items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20 [@media(max-height:860px)]:gap-4 [@media(max-height:720px)]:gap-2">
              <div className="flex h-full max-w-[42rem] flex-col justify-center">
                <FadeIn>
                  <h1 className="text-balance text-[clamp(1.65rem,min(4.7vw,7.3vh),3.85rem)] font-bold leading-[1.06] tracking-tight text-foreground [@media(max-height:860px)]:text-[clamp(1.4rem,min(4vw,6.2vh),3rem)] [@media(max-height:720px)]:text-[clamp(1.2rem,min(3.2vw,5.2vh),2.2rem)]">
                    Page not found. <br className="hidden lg:block" />
                    <span className="text-muted-foreground">The link may be outdated.</span> <br className="hidden lg:block" />
                    <span className="text-primary">Let’s get you back on track.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <p className="mt-6 max-w-xl text-[clamp(0.95rem,min(1.45vw,2.6vh),1.2rem)] leading-relaxed text-muted-foreground [@media(max-height:860px)]:mt-4 [@media(max-height:860px)]:text-[0.95rem] [@media(max-height:720px)]:mt-3 [@media(max-height:720px)]:text-[0.86rem] [@media(max-height:720px)]:leading-snug">
                    The page you requested could not be found. Please return to the homepage or contact us directly if you need support.
                  </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="mt-10 flex flex-wrap gap-4 [@media(max-height:860px)]:mt-6 [@media(max-height:720px)]:mt-4 [@media(max-height:720px)]:gap-2">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 [@media(max-height:860px)]:h-10 [@media(max-height:860px)]:px-5 [@media(max-height:860px)]:text-sm [@media(max-height:720px)]:h-9 [@media(max-height:720px)]:px-4 [@media(max-height:720px)]:text-xs"
                      asChild
                    >
                      <Link href="/">
                        Back to Homepage
                        <ArrowLeft className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="[@media(max-height:860px)]:h-10 [@media(max-height:860px)]:px-5 [@media(max-height:860px)]:text-sm [@media(max-height:720px)]:h-9 [@media(max-height:720px)]:px-4 [@media(max-height:720px)]:text-xs"
                      asChild
                    >
                      <Link href="/#contact">Contact Us</Link>
                    </Button>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 [@media(max-height:860px)]:mt-6 [@media(max-height:860px)]:gap-x-6 [@media(max-height:720px)]:mt-4 [@media(max-height:720px)]:gap-x-4 [@media(max-height:720px)]:gap-y-2 [@media(max-height:660px)]:hidden">
                    {PROOF_POINTS.map((point) => (
                      <div key={point.text} className="flex items-center gap-2 text-sm font-medium text-muted-foreground [@media(max-height:720px)]:text-xs">
                        <point.icon className="h-5 w-5 text-primary [@media(max-height:720px)]:h-4 [@media(max-height:720px)]:w-4" />
                        <span>{point.text}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <div className="relative hidden h-full lg:flex lg:items-center lg:justify-center lg:pt-0">
                <FadeIn delay={0.2} className="flex h-full w-full items-center justify-center [@media(max-height:860px)]:scale-[0.9] [@media(max-height:720px)]:scale-[0.78] [@media(max-height:660px)]:scale-[0.68]">
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
