import { INDUSTRY_KEYS } from "@/lib/constants";

export type IndustryKey = (typeof INDUSTRY_KEYS)[number];

/** Portfolio item IDs grouped by industry — add IDs here when new work is ready. */
export const PORTFOLIO_BY_INDUSTRY: Record<IndustryKey, string[]> = {
  realEstate: [],
  finance: [],
  healthcare: [],
  ecommerce: [],
  consulting: [],
  education: [],
};

export function isIndustryKey(slug: string): slug is IndustryKey {
  return (INDUSTRY_KEYS as readonly string[]).includes(slug);
}
