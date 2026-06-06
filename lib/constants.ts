export const BRAND = {
  name: "Bellona",
  email: "hello@bellona.ai",
  phone: "+1 (555) 012-3456",
} as const;

export const FOUNDERS = [
  { key: "iman" as const, name: "Iman Niknam" },
  { key: "sina" as const, name: "Sina Razi" },
] as const;

export const TRUST_STATS = [
  { value: 100, suffix: "+", labelKey: "automations", icon: "layers" },
  { value: 24, suffix: "/7", labelKey: "operations", icon: "clock" },
  { value: 80, suffix: "%", labelKey: "timeSaved", icon: "timer" },
  { value: 3, suffix: "X", labelKey: "efficiency", icon: "zap" },
] as const;

export const SERVICE_KEYS = ["agents", "workflow", "leads", "support", "crm", "integrations"] as const;

export const SERVICE_ICONS = {
  agents: "bot",
  workflow: "workflow",
  leads: "target",
  support: "headphones",
  crm: "database",
  integrations: "plug",
} as const;

export const HOW_IT_WORKS_STEPS = [1, 2, 3, 4, 5] as const;

export const SYSTEM_FLOW = [
  { id: "lead", labelKey: "lead", icon: "users" },
  { id: "agent", labelKey: "agent", icon: "bot" },
  { id: "crm", labelKey: "crm", icon: "database" },
  { id: "engine", labelKey: "engine", icon: "workflow" },
  { id: "analytics", labelKey: "analytics", icon: "chart" },
  { id: "revenue", labelKey: "revenue", icon: "dollar" },
] as const;

export const INDUSTRY_KEYS = ["realEstate", "finance", "healthcare", "ecommerce", "consulting", "education"] as const;

export const INDUSTRY_ICONS = {
  realEstate: "building",
  finance: "landmark",
  healthcare: "heart-pulse",
  ecommerce: "shopping-cart",
  consulting: "briefcase",
  education: "graduation-cap",
} as const;

export const CASE_STUDY_KEYS = ["meridian", "nova", "apex"] as const;

export const CASE_STUDY_STATS = {
  meridian: { hoursSaved: 120, revenueIncrease: 34, costReduction: 40 },
  nova: { hoursSaved: 85, revenueIncrease: 52, costReduction: 35 },
  apex: { hoursSaved: 95, revenueIncrease: 48, costReduction: 42 },
} as const;

export const COMPARISON_KEYS = ["availability", "scalability", "cost", "speed", "consistency", "intelligence"] as const;

export const WEEKLY_KEYS = ["agents", "workflows", "leads", "revenue", "crm"] as const;

export const WEEKLY_ICONS = {
  agents: "🤖",
  workflows: "⚡",
  leads: "📊",
  revenue: "💰",
  crm: "🔗",
} as const;

export const NAV_ITEMS = [
  { key: "howItWorks", href: "#process" },
  { key: "services", href: "#services" },
  { key: "results", href: "#results" },
  { key: "about", href: "#team" },
] as const;

export const FOOTER_ITEMS = [
  { key: "services", href: "#services" },
  { key: "process", href: "#process" },
  { key: "team", href: "#team" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#cta" },
] as const;

export const PAIN_POINT_KEYS = ["manual", "leads", "broken"] as const;
