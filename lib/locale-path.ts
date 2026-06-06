import { BRAND } from "@/lib/constants";
import { routing } from "@/i18n/routing";

export function localePath(locale: string, path = ""): string {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  if (locale === routing.defaultLocale) {
    return suffix || "/";
  }
  return `/${locale}${suffix}`;
}

export function absoluteUrl(locale: string, path = ""): string {
  return `${BRAND.url}${localePath(locale, path)}`;
}
