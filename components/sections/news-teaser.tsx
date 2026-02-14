"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NEWS_ITEMS } from "@/lib/data";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function NewsTeaser() {
  return (
    <section className="border-b border-border bg-background py-20 lg:py-28" id="news">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeUp>
          <div className="mb-12 flex items-end justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Stay updated
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                News
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden md:inline-flex"
            >
              <Link href="#news">
                All news
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </FadeUp>

        <StaggerContainer className="grid gap-6 md:grid-cols-3" staggerDelay={0.06}>
          {NEWS_ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <Link
                href="#news"
                className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:bg-muted/50"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {item.isNew && (
                    <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                      New
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-base font-semibold leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.teaser}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 flex justify-center md:hidden">
          <Button variant="outline" size="sm" asChild>
            <Link href="#news">
              All news
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
