import Link from "next/link";

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Branches", href: "#branches" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Legal Notice", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const BRANCHES = ["Germany", "France", "Spain", "Italy", "Netherlands", "Austria"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-lg font-bold tracking-tight">AFES</span>
            <p className="text-sm leading-relaxed text-background/70">
              International Insurance Services. Cross-border claims handling
              with local execution and centralized steering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Branches
            </h3>
            <ul className="flex flex-col gap-2.5">
              {BRANCHES.map((branch) => (
                <li key={branch}>
                  <Link
                    href="#branches"
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {branch}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Contact
            </h3>
            <address className="flex flex-col gap-2.5 not-italic">
              <p className="text-sm text-background/70">AFES Headquarters</p>
              <p className="text-sm text-background/70">
                Musterstrasse 12
                <br />
                60329 Frankfurt am Main
                <br />
                Germany
              </p>
              <a
                href="mailto:info@afes.eu"
                className="text-sm text-primary transition-colors hover:text-primary/80"
              >
                info@afes.eu
              </a>
              <a
                href="tel:+496912345678"
                className="text-sm text-background/70 transition-colors hover:text-background"
              >
                +49 69 123 456 78
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
          <p className="text-xs text-background/50">
            {"© 2026 AFES International Insurance Services. All rights reserved."}
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-background/50 transition-colors hover:text-background/70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
