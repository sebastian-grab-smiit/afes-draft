import Link from "next/link";
import Image from "next/image";

const SERVICES_LINKS = [
  { label: "Green Card / Motor", href: "#services" },
  { label: "General Liability", href: "#services" },
  { label: "Recourse / Recovery", href: "#services" },
  { label: "Audits", href: "#services" },
];

const INDUSTRIES_LINKS = [
  { label: "Insurers", href: "/for-insurers" },
  { label: "Fleet & Mobility", href: "/for-fleet-mobility" },
  { label: "Leasing & Car Rental", href: "/for-leasing-rental" },
  { label: "Social Security Carriers", href: "/for-social-security" },
];

const COMPANY_LINKS = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Imprint", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="AFES"
                width={120}
                height={30}
                className="h-8 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed max-w-sm">
              International Insurance Services. We handle cross-border claims with local expertise and centralized steering, ensuring compliance and efficiency across Europe.
            </p>
            <div className="text-sm not-italic">
              <p className="font-semibold text-slate-200 mb-1">AFES Headquarters</p>
              <p>Musterstrasse 12</p>
              <p>60329 Frankfurt am Main</p>
              <p>Germany</p>
              <a href="mailto:info@afes.eu" className="block mt-4 text-teal-500 hover:text-teal-400 transition-colors">
                info@afes.eu
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              For Whom
            </h3>
            <ul className="space-y-3">
              {INDUSTRIES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} AFES Group. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
