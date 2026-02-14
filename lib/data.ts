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
    href: "#services",
  },
  {
    title: "Fleet & Mobility",
    pain: "High case volume needs speed and predictable communication.",
    outcome: "Fast triage, clear SLAs, and structured status reporting.",
    href: "#services",
  },
  {
    title: "Leasing & Car Rental",
    pain: "Complex liability and recovery flows across jurisdictions.",
    outcome:
      "Clear responsibility model + recovery potential surfaced early.",
    href: "#services",
  },
  {
    title: "Social Security Carriers",
    pain: "Cross-border recourse is slow and documentation-heavy.",
    outcome:
      "Process-driven recovery with legal support and documentation quality.",
    href: "#services",
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Intake & triage",
    input: "Claim notification, documents, coverage context",
    output: "Initial assessment, next actions, expected timelines",
  },
  {
    title: "Local handling",
    input: "Local facts, site/vehicle checks, stakeholders",
    output: "Case progression, negotiation, documented decisions",
  },
  {
    title: "Quality & legal",
    input: "Complex liability, disputes, recovery opportunities",
    output: "Quality checks, legal guidance, recovery potential flagged",
  },
  {
    title: "Reporting & closure",
    input: "Case data, costs, outcomes",
    output: "Status report, reserve recommendation, closure summary",
  },
] as const;

export const SERVICES = [
  {
    title: "Motor (TPL / Comprehensive)",
    when: "Cross-border motor claims, high volume, strict SLAs",
    outputs: [
      "Consistent status reporting",
      "Reserve recommendation",
      "Closure documentation",
    ],
    typicalCases: [
      "International accidents",
      "Vehicle inspection coordination",
    ],
  },
  {
    title: "Liability",
    when: "Complex liability chains and multi-party claims",
    outputs: [
      "Decision rationale",
      "Negotiation trail",
      "Quality-checked documentation",
    ],
    typicalCases: ["General liability, product/service contexts"],
  },
  {
    title: "Recovery / Regress",
    when: "Recourse potential must be identified early",
    outputs: ["Recovery strategy", "Evidence pack", "Pursuit tracking"],
    typicalCases: [
      "Transport, travel, legal protection, debt collection",
    ],
  },
  {
    title: "Audits & Consulting",
    when: "Improve quality, reserves, and operational effectiveness",
    outputs: ["Audit findings", "Action plan", "Process recommendations"],
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
