"use client";

import { useState } from "react";
import Link from "next/link";
import { Newspaper, ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { NEWS_ITEMS } from "@/lib/data";

export function NewsDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Open news"
      >
        <Newspaper className="h-4 w-4" />
        <span className="hidden sm:inline">News</span>
        {NEWS_ITEMS.some((item) => item.isNew) && (
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
        )}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle>Latest News</SheetTitle>
            <SheetDescription>
              Stay up to date with AFES developments
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-3">
            {NEWS_ITEMS.map((item) => (
              <Link
                key={item.title}
                href="#news"
                onClick={() => setOpen(false)}
                className="group flex flex-col gap-2 rounded-md border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {item.isNew && (
                    <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                      New
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold leading-tight text-foreground">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.teaser}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <Link href="#news">
                All news
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
