export const ROUTES = {
  home: "/",
  login: "/login",
  getStarted: "/get-started",
} as const;

export const BRAND = {
  name: "Bellona",
  tagline: "AI Systems That Work While You Sleep",
  email: "hello@bellona.ai",
  phone: "+1 (555) 012-3456",
  cta: {
    primary: "Get Started",
    secondary: "Watch Demo",
    login: "Login",
  },
} as const;

export const AUTH_BENEFITS = [
  "Free AI strategy audit — no commitment",
  "Custom automation roadmap in 48 hours",
  "Dedicated engineer assigned to your project",
  "30-day satisfaction guarantee",
] as const;

export const COMPANY_SIZES = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
] as const;

export const AUTOMATION_GOALS = [
  "Lead generation & sales automation",
  "Customer support AI agents",
  "Internal workflow automation",
  "CRM & data integrations",
  "Full AI workforce build",
  "Not sure — need guidance",
] as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#team" },
] as const;

export const FOUNDERS = [
  {
    name: "Iman Niknam",
    role: "Co-Founder",
    title: "Automation Engineer",
    bio: "Architects end-to-end automation systems — from workflow design to production deployment across complex business stacks.",
  },
  {
    name: "Sina Razi",
    role: "Co-Founder",
    title: "AI Specialist",
    bio: "Builds intelligent AI agents and machine learning pipelines that power Bellona's autonomous business systems.",
  },
] as const;

export const HERO_LINES = [
  "Your agents get deployed. Your workflows run.",
  "Your leads get qualified. Your ops scale.",
  "You just... move on with your day.",
] as const;

export const HERO_TESTIMONIAL = {
  quote:
    "Bellona replaced three full-time roles with AI systems in under a month. We finally operate like a real tech company — not a team drowning in manual work.",
  author: "Sarah Chen",
  role: "Founder",
  location: "US",
} as const;

export const HERO_TRUST_BAR = [
  "100+ automations built",
  "24/7 AI operations",
  "Free strategy audit",
] as const;

export const WEEKLY_STATUS = [
  { icon: "🤖", label: "AI Agents", status: "12 active & learning" },
  { icon: "⚡", label: "Workflows", status: "47 running smoothly" },
  { icon: "📊", label: "Leads", status: "2,847 processed this week" },
  { icon: "💰", label: "Revenue", status: "$847K attributed" },
  { icon: "🔗", label: "CRM Sync", status: "Live & syncing" },
] as const;

export const PAIN_POINTS = [
  {
    title: "Manual Operations",
    quote:
      "You know what needs automating. But between client work and daily fires, your workflows stay half-built and your team stays overwhelmed.",
    problems: ["Tasks repeated every single day", "Bottlenecks killing your growth", "No time to build what you planned"],
  },
  {
    title: "Lead & Sales Chaos",
    quote:
      "Leads come in. Follow-ups slip. Your CRM is a graveyard of missed opportunities because nobody has time to nurture properly.",
    problems: ["Leads going cold within hours", "Follow-ups always 'tomorrow'", "Pipeline data you can't trust"],
  },
  {
    title: "Broken Automations",
    quote:
      "You didn't start a business to spend weekends fixing Zapier flows or wondering why your integrations broke again.",
    problems: ["Integrations that silently fail", "Tools that don't talk to each other", "Weekends lost to tech debt"],
  },
] as const;

export const TRUST_STATS = [
  { value: 100, suffix: "+", label: "Automations Built", icon: "layers" },
  { value: 24, suffix: "/7", label: "AI Operations", icon: "clock" },
  { value: 80, suffix: "%", label: "Time Saved", icon: "timer" },
  { value: 3, suffix: "X", label: "Operational Efficiency", icon: "zap" },
] as const;

export const SERVICES = [
  {
    title: "AI Agents",
    description: "Autonomous digital workers that handle repetitive tasks, outreach, and decision-making around the clock.",
    icon: "bot",
  },
  {
    title: "Workflow Automation",
    description: "End-to-end process automation connecting your tools, teams, and data flows without manual handoffs.",
    icon: "workflow",
  },
  {
    title: "Lead Generation Systems",
    description: "Automated prospecting, enrichment, and qualification pipelines that deliver sales-ready leads daily.",
    icon: "target",
  },
  {
    title: "AI Customer Support",
    description: "Intelligent chat and voice systems that resolve inquiries instantly and escalate only when needed.",
    icon: "headphones",
  },
  {
    title: "CRM Automation",
    description: "Sales pipelines, follow-ups, and deal tracking automated so your team focuses on closing.",
    icon: "database",
  },
  {
    title: "Custom Integrations",
    description: "Bespoke API bridges and middleware that unify your entire business stack into one intelligent system.",
    icon: "plug",
  },
] as const;

export const HOW_IT_WORKS = [
  { step: 1, title: "Audit", description: "We map your operations, identify bottlenecks, and pinpoint the highest-ROI automation opportunities." },
  { step: 2, title: "Design", description: "Our architects blueprint custom AI workflows, agent behaviors, and integration paths for your stack." },
  { step: 3, title: "Build", description: "We engineer your automation systems with rigorous testing and zero disruption to daily operations." },
  { step: 4, title: "Deploy", description: "Systems go live integrated with your existing tools — fully operational from day one." },
  { step: 5, title: "Optimize", description: "Continuous monitoring, performance tuning, and scaling as your business evolves." },
] as const;

export const SYSTEM_FLOW = [
  { id: "lead", label: "Lead Source", icon: "users" },
  { id: "agent", label: "AI Agent", icon: "bot" },
  { id: "crm", label: "CRM", icon: "database" },
  { id: "engine", label: "Automation Engine", icon: "workflow" },
  { id: "analytics", label: "Analytics", icon: "chart" },
  { id: "revenue", label: "Revenue", icon: "dollar" },
] as const;

export const INDUSTRIES = [
  { name: "Real Estate", description: "Lead nurturing, property matching, and client follow-ups on autopilot.", icon: "building" },
  { name: "Finance", description: "Compliance workflows, reporting, and client onboarding at scale.", icon: "landmark" },
  { name: "Healthcare", description: "Appointment scheduling, patient intake, and admin automation.", icon: "heart-pulse" },
  { name: "E-Commerce", description: "Inventory sync, order processing, and support automation.", icon: "shopping-cart" },
  { name: "Consulting", description: "Proposal generation, client reporting, and project workflows.", icon: "briefcase" },
  { name: "Education", description: "Enrollment, student support, and content delivery systems.", icon: "graduation-cap" },
] as const;

export const CASE_STUDIES = [
  {
    company: "Meridian Capital",
    industry: "Finance",
    hoursSaved: 120,
    revenueIncrease: 34,
    costReduction: 40,
    description: "Automated loan processing and compliance checks, freeing analysts for high-value client work.",
  },
  {
    company: "NovaCommerce",
    industry: "E-Commerce",
    hoursSaved: 85,
    revenueIncrease: 52,
    costReduction: 35,
    description: "Deployed AI agents for cart recovery, outreach, and multi-channel customer support.",
  },
  {
    company: "Apex Realty Group",
    industry: "Real Estate",
    hoursSaved: 95,
    revenueIncrease: 48,
    costReduction: 42,
    description: "End-to-end lead qualification and CRM automation accelerating deal velocity by 2.5x.",
  },
] as const;

export const COMPARISON = {
  features: [
    { name: "Availability", traditional: "Business hours only", bellona: "24/7/365 autonomous" },
    { name: "Scalability", traditional: "Hire more people", bellona: "Infinite, instant scale" },
    { name: "Cost", traditional: "Salaries + overhead", bellona: "One-time build, ongoing ROI" },
    { name: "Speed", traditional: "Weeks to onboard", bellona: "Deployed in days" },
    { name: "Consistency", traditional: "Human error prone", bellona: "100% process accuracy" },
    { name: "Intelligence", traditional: "Manual decisions", bellona: "AI-driven automation" },
  ],
} as const;

export const TESTIMONIALS = [
  {
    quote: "Bellona replaced three full-time roles with AI agents in under a month. The ROI was immediate and the systems still improve every week.",
    name: "Sarah Chen",
    role: "Founder & CEO",
    company: "Meridian Capital",
  },
  {
    quote: "We went from drowning in manual workflows to having an intelligent system that runs our operations while we sleep.",
    name: "Marcus Rivera",
    role: "COO",
    company: "NovaCommerce",
  },
  {
    quote: "The lead generation system Bellona built delivers 3x more qualified prospects than our previous setup — at a fraction of the cost.",
    name: "Elena Vasquez",
    role: "Marketing Director",
    company: "Apex Realty Group",
  },
] as const;

export const FAQ_ITEMS = [
  { question: "What types of businesses does Bellona work with?", answer: "Growth-stage companies across finance, e-commerce, real estate, healthcare, consulting, and education. If your business has repeatable processes, we can automate them." },
  { question: "How long does deployment take?", answer: "Most systems go live within 2–4 weeks. Simple automations deploy in days; complex multi-agent systems take 4–6 weeks." },
  { question: "Do I need technical knowledge?", answer: "No. We build intuitive dashboards and provide full training. Your team uses simple interfaces while AI handles the complexity." },
  { question: "What platforms do you integrate with?", answer: "200+ platforms including Salesforce, HubSpot, Slack, n8n, Make, Zapier, and any tool with an API or webhook." },
  { question: "How is Bellona different from hiring?", answer: "Traditional hiring adds headcount and overhead. Bellona builds self-running AI systems that scale infinitely without additional payroll." },
  { question: "What ROI can I expect?", answer: "Clients typically see 40% cost reduction and 65% improvement in key metrics within 90 days. We project ROI during the audit phase." },
  { question: "Do you offer ongoing support?", answer: "Yes. Every engagement includes monitoring, optimization, and scaling support. Your systems evolve with your business." },
  { question: "How do I get started?", answer: "Book a free audit. We assess your operations and show exactly where AI delivers the highest impact." },
] as const;

export const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#cta" },
] as const;
