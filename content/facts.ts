import type { Locale } from "./types";

/**
 * One source of truth for every number the site states (docs/seo backlog G-06): pages, FAQs, case studies
 * and structured data read these, so the same figure can never appear twice with two values.
 *
 * Rules
 * - Each value names its evidence. Only owner-supplied or project-sourced facts belong here.
 * - `null` = not confirmed by the team yet (see docs/seo/QUESTIONS_FOR_TEAM.md, number in the comment).
 *   Anything that needs a null value must not render; it is never replaced by a placeholder.
 * - This file imports nothing from content/, so any content file can import it without a cycle.
 */

export type Range = { min: number; max: number };
/** Toman, whole numbers. */
export type PriceRange = Range & { unit: "toman" };

export const facts = {
  timelines: {
    /** Owner copy: offers page and AI FAQ ("an automation sprint goes live in 2–4 weeks"). */
    automationSprintWeeks: { min: 2, max: 4 } satisfies Range,
    /** Owner copy: AI FAQ ("complex multi-agent systems take 4–6 weeks"). */
    complexAgentWeeks: { min: 4, max: 6 } satisfies Range,
    /** Q4: typical website timelines per type. */
    websiteWeeks: null as Range | null,
  },
  /** Q1: honest reply time for form messages. */
  replyTimeHours: null as number | null,
  /** Q13 / Q18: free support period after launch. */
  supportDaysAfterLaunch: null as number | null,
  /** Q30 / Q31 / Q32: published price ranges. None are confirmed. */
  prices: {
    website: null as PriceRange | null,
    aiAgentBuild: null as PriceRange | null,
    aiAgentMonthlyRunning: null as PriceRange | null,
    n8nRetainerMonthly: null as PriceRange | null,
  },
  counts: {
    /** Team section: four members. */
    teamMembers: 4,
    /** The site is built in English and Persian. */
    languages: 2,
  },
  /** Project-sourced figures (from the PDF portfolio the owner supplied; shown on the case studies). */
  projects: {
    realEstate: { n8nWorkflows: 12, crmTables: 7 },
    dane: { migratedPosts: 278, categoriesBefore: 15, tags: 1057, authors: 6, categoriesAfter: 8, topics: 105, redirects: 278 },
  },
} as const;

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Locale-aware formatting for the values above. */
export const fmt = {
  /** 1057 → "1,057" / «۱٬۰۵۷». */
  n(value: number, locale: Locale): string {
    const s = value.toLocaleString("en-US");
    return locale === "fa" ? s.replace(/,/g, "٬").replace(/[0-9]/g, (c) => FA_DIGITS[Number(c)]) : s;
  },
  /** {2,4} → "2–4" / «۲ تا ۴» (for "2–4 week sprint", «اسپرینت ۲ تا ۴ هفته‌ای»). */
  span(r: Range, locale: Locale): string {
    return locale === "fa" ? `${fmt.n(r.min, "fa")} تا ${fmt.n(r.max, "fa")}` : `${r.min}–${r.max}`;
  },
  /** {2,4} → "2–4 weeks" / «۲ تا ۴ هفته». */
  weeks(r: Range, locale: Locale): string {
    return `${fmt.span(r, locale)} ${locale === "fa" ? "هفته" : "weeks"}`;
  },
};
