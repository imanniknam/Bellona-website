import type { Locale } from "@/content/types";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Converts ASCII digits to Persian digits for the FA locale. */
export function digits(value: string | number, locale: Locale): string {
  const s = String(value);
  return locale === "fa" ? s.replace(/[0-9]/g, (c) => FA_DIGITS[Number(c)]) : s;
}

/** 1 → "01" (or "۰۱"). */
export function stepNum(index: number, locale: Locale): string {
  return digits(String(index + 1).padStart(2, "0"), locale);
}
