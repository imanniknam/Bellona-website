import { en } from "@/content/en";
import { fa } from "@/content/fa";
import type { Dict, Locale } from "@/content/types";

export const locales: Locale[] = ["en", "fa"];

export function getDict(locale: Locale): Dict {
  return locale === "fa" ? fa : en;
}

/** Persian is the default language. "/services" → "/services" (fa) or "/en/services" (en). Keeps hashes and queries. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "fa") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

/** Strips the /en prefix so a path can be re-prefixed for the other language. */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}
