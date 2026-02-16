export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Branches", href: "#branches" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
] as const;

export const TARGET_GROUPS = [
  {
    title: "Insurers",
    pain: "Fragmented cross-border handling creates delays and inconsistent reserves.",
    outcome:
      "Standardized execution with centralized steering and auditable reporting.",
    href: "/for-insurers",
  },
  {
    title: "Fleet & Mobility",
    pain: "High case volume needs speed and predictable communication.",
    outcome: "Fast triage, clear SLAs, and structured status reporting.",
    href: "/for-fleet-mobility",
  },
  {
    title: "Leasing & Car Rental",
    pain: "Complex liability and recovery flows across jurisdictions.",
    outcome:
      "Clear responsibility model + recovery potential surfaced early.",
    href: "/for-leasing-rental",
  },
  {
    title: "Social Security Carriers",
    pain: "Cross-border recourse is slow and documentation-heavy.",
    outcome:
      "Process-driven recovery with legal support and documentation quality.",
    href: "/for-social-security",
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Intake & Triage",
    input: "Claim notification",
    output: "Structured file, assigned handler",
  },
  {
    title: "Local Execution",
    input: "Investigation",
    output: "Verified facts, reserve estimation",
  },
  {
    title: "Quality & Legal Control",
    input: "Draft report",
    output: "Compliance check, strategy alignment",
  },
  {
    title: "Centralized Reporting",
    input: "Final data",
    output: "Unified dashboard, settlement recommendation",
  },
] as const;

export const SERVICES = [
  {
    title: "Green Card / Motor",
    when: "For cross-border traffic accidents.",
    forWhom: "Insurers, Bureaus",
    outputs: ["Settlement within Green Card Bureau rules"],
    typicalCases: ["International accidents", "Vehicle inspection coordination"],
  },
  {
    title: "General Liability",
    when: "For complex property/injury claims.",
    forWhom: "Insurers, Corporates",
    outputs: ["Liability assessment & defense"],
    typicalCases: ["General liability, product/service contexts"],
  },
  {
    title: "Recourse / Recovery",
    when: "For subrogation potential.",
    forWhom: "Insurers, Fleets",
    outputs: ["Recovered funds"],
    typicalCases: ["Transport, travel, legal protection, debt collection"],
  },
  {
    title: "Audits",
    when: "For portfolio health checks.",
    forWhom: "Insurers, Risk Managers",
    outputs: ["Audit report & reserve correction"],
    typicalCases: ["Claims handling audits, reserve reviews"],
  },
] as const;

export const KPIS = [
  { label: "Years of experience", value: "50+" },
  { label: "Countries covered", value: "30+" },
  { label: "In-house legal & quality", value: "Yes" },
  { label: "Active partners", value: "200+" },
] as const;

export const PARTNER_LOGOS = [
  "Allianz",
  "AXA",
  "Zurich",
  "Generali",
  "Munich Re",
  "Swiss Re",
  "HDI",
  "ERGO",
  "Mapfre",
  "Groupama",
] as const;

export const EUROPE_COUNTRIES = [
  { name: "Germany", code: "DE", x: 290, y: 180 },
  { name: "France", code: "FR", x: 230, y: 230 },
  { name: "Spain", code: "ES", x: 180, y: 310 },
  { name: "Italy", code: "IT", x: 310, y: 270 },
  { name: "Netherlands", code: "NL", x: 268, y: 165 },
  { name: "Belgium", code: "BE", x: 255, y: 185 },
  { name: "Austria", code: "AT", x: 325, y: 210 },
  { name: "Switzerland", code: "CH", x: 280, y: 225 },
  { name: "Poland", code: "PL", x: 355, y: 170 },
  { name: "Czech Republic", code: "CZ", x: 330, y: 190 },
  { name: "Portugal", code: "PT", x: 150, y: 305 },
  { name: "Hungary", code: "HU", x: 365, y: 215 },
  { name: "Romania", code: "RO", x: 400, y: 230 },
  { name: "Bulgaria", code: "BG", x: 410, y: 260 },
  { name: "Greece", code: "GR", x: 395, y: 305 },
  { name: "Croatia", code: "HR", x: 345, y: 240 },
  { name: "Sweden", code: "SE", x: 325, y: 100 },
  { name: "Denmark", code: "DK", x: 295, y: 135 },
  { name: "Morocco", code: "MA", x: 185, y: 365 },
  { name: "Tunisia", code: "TN", x: 300, y: 350 },
] as const;

export const NEWS_ITEMS = [
  {
    title: "AFES expands network in Southeast Europe",
    date: "2026-02-10",
    teaser:
      "New partnerships in Romania and Bulgaria strengthen cross-border handling capabilities in the region.",
    isNew: true,
  },
  {
    title: "Digital reporting platform update v3.2",
    date: "2026-01-28",
    teaser:
      "Enhanced dashboards with real-time reserve tracking and SLA monitoring for all partner insurers.",
    isNew: true,
  },
  {
    title: "AFES at Insurance Europe Conference 2026",
    date: "2026-01-15",
    teaser:
      "Join us in Brussels for our presentation on standardized cross-border claims management.",
    isNew: false,
  },
] as const;

export const CASE_STUDIES = [
  {
    slug: "pan-european-fleet-consolidation",
    title: "Pan-European Fleet Consolidation",
    category: "Fleet & Mobility",
    challenge:
      "A major logistics provider with 5,000+ vehicles faced fragmented claims handling across 12 countries, leading to inconsistent data and slow recovery times.",
    solution:
      "AFES implemented a centralized intake portal with local execution. We standardized reporting formats and established a single point of contact for the fleet manager.",
    result:
      "Reduced average claims lifecycle by 30% and increased recovery rates by 15% within the first year.",
    stats: [
      { label: "Countries", value: "12" },
      { label: "Vehicles", value: "5,000+" },
      { label: "Lifecycle Reduction", value: "30%" },
    ],
    services: [
      "Centralized Reporting",
      "Green Card / Motor",
      "Recourse / Recovery",
    ],
  },
  {
    slug: "complex-coach-liability-defense",
    title: "Complex Coach Liability Defense",
    category: "Liability",
    challenge:
      "A severe coach accident in France involving multiple nationalities and complex liability issues. The insurer needed local legal expertise and rapid fact-finding.",
    solution:
      "Deployed a specialized team to the scene within 24 hours. Coordinated with local authorities and medical experts to secure evidence and manage initial claimant communications.",
    result:
      "Successfully defended against inflated claims, saving the insurer an estimated €2.5M in potential payouts.",
    stats: [
      { label: "Response Time", value: "< 24h" },
      { label: "Savings", value: "€2.5M" },
      { label: "Claimants", value: "40+" },
    ],
    services: [
      "General Liability",
      "Local Execution",
      "Quality & Legal Control",
    ],
  },
  {
    slug: "cross-border-social-security-recovery",
    title: "Cross-Border Social Security Recovery",
    category: "Social Security",
    challenge:
      "A national social security carrier struggled with recovering costs for medical treatment provided to tourists injured abroad. The process was manual and often time-barred.",
    solution:
      "Automated the identification of liable foreign insurers and streamlined the document exchange process through our partner network.",
    result:
      "Doubled the volume of successful recoveries and significantly reduced administrative overhead.",
    stats: [
      { label: "Recovery Increase", value: "100%" },
      { label: "Admin Reduction", value: "40%" },
      { label: "Success Rate", value: "High" },
    ],
    services: ["Recourse / Recovery", "Audits", "Centralized Reporting"],
  },
] as const;

