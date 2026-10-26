import { en } from "@/content/en";
import { fa } from "@/content/fa";
import type { Dict, Locale } from "@/content/types";

export const locales: Locale[] = ["en", "fa"];

export function getDict(locale: Locale): Dict {
  return locale === "fa" ? fa : en;
}

/** "/services" → "/services" (en) or "/fa/services" (fa). Keeps hashes and queries. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/fa";
  return `/fa${path}`;
}

/** Strips the /fa prefix so a path can be re-prefixed for the other language. */
export function stripLocale(pathname: string): string {
  if (pathname === "/fa") return "/";
  if (pathname.startsWith("/fa/")) return pathname.slice(3);
  return pathname;
}
