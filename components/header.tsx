"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, TARGET_GROUPS } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [targetGroupsOpen, setTargetGroupsOpen] = useState(false);

  function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setMobileOpen(false);

    if (window.location.pathname !== "/") {
      router.push("/");
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 40);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/70 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2" aria-label="AFES Home">
          <Image
            src="/logo.svg"
            alt="AFES"
            width={120}
            height={30}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {/* Services Dropdown */}
          <div
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-normal text-foreground/80 transition-colors hover:text-foreground focus:outline-none">
                Services <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {SERVICES.map((service) => (
                  <DropdownMenuItem key={service.title} asChild>
                    <Link href="/services" className="w-full cursor-pointer">
                      {service.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* For Whom Dropdown */}
          <div
            onMouseEnter={() => setTargetGroupsOpen(true)}
            onMouseLeave={() => setTargetGroupsOpen(false)}
          >
            <DropdownMenu open={targetGroupsOpen} onOpenChange={setTargetGroupsOpen}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-normal text-foreground/80 transition-colors hover:text-foreground focus:outline-none">
                For Whom <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {TARGET_GROUPS.map((group) => (
                  <DropdownMenuItem key={group.title} asChild>
                    <Link href={group.href} className="w-full cursor-pointer">
                      {group.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href="/how-we-work"
            className="text-sm font-normal text-foreground/80 transition-colors hover:text-foreground"
          >
            How We Work
          </Link>

          <Link
            href="/case-studies"
            className="text-sm font-normal text-foreground/80 transition-colors hover:text-foreground"
          >
            Case Studies
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/report">Report a claim</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Services</div>
              <div className="ml-4 flex flex-col space-y-2 border-l border-border pl-4">
                {SERVICES.map((service) => (
                  <Link
                    key={service.title}
                    href="#services"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-normal text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">For Whom</div>
              <div className="ml-4 flex flex-col space-y-2 border-l border-border pl-4">
                {TARGET_GROUPS.map((group) => (
                  <Link
                    key={group.title}
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-normal text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {group.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/how-we-work"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-normal text-foreground transition-colors hover:text-foreground"
            >
              How We Work
            </Link>

            <Link
              href="/case-studies"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-normal text-foreground transition-colors hover:text-foreground"
            >
              Case Studies
            </Link>

            <div className="pt-4">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/report" onClick={() => setMobileOpen(false)}>
                  Report a claim
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
