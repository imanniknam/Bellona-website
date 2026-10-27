import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getDict, localePath } from "./i18n";
import { siteUrl } from "./site";

/**
 * Per-page metadata with canonical + hreflang (en, fa, x-default) and a generated OG image.
 * `path` is the locale-less path, e.g. "/services/ai-automation". A matching entry in the locale's `seo`
 * map (content/{en,fa}.ts) overrides the title/description, so on-page labels can stay short.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const d = getDict(locale);
  title = d.seo[path]?.title ?? title;
  description = d.seo[path]?.description ?? description;
  const url = localePath(locale, path);
  const ogTitle = absoluteTitle ? title : `${title} · ${d.meta.siteName}`;
  const og = `/api/og?locale=${locale}&title=${encodeURIComponent(absoluteTitle ? "" : title)}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localePath("en", path),
        fa: localePath("fa", path),
        "x-default": localePath("fa", path),
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: d.meta.siteName,
      title: ogTitle,
      description,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
      images: [{ url: og, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [og] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/**
 * Case-study <title>: "Konjed: Education, Gamified learning" / «کنجد؛ آموزش، یادگیری گیمیفای‌شده».
 * Long ones keep only the most specific sector part, so the full title stays around 60 characters.
 */
export function caseStudyTitle(locale: Locale, title: string, sector: string, website = false): string {
  const parts = sector.split(" · ");
  // Persian website projects lead with «طراحی سایت» (the main search term, docs/seo keyword C1).
  const name = locale === "fa" && website ? `طراحی سایت ${title}` : title;
  const join = (s: string) => (locale === "fa" ? `${name}؛ ${s}` : `${name}: ${s}`);
  const full = join(parts.join(locale === "fa" ? "، " : ", "));
  if (full.length <= 50) return full;
  const short = join(parts[parts.length - 1]);
  return short.length <= 56 ? short : name;
}

export const baseMetadata = (locale: Locale): Metadata => {
  const d = getDict(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: d.meta.home.title, template: `%s · ${d.meta.siteName}` },
    description: d.meta.home.description,
    applicationName: d.meta.siteName,
    formatDetection: { telephone: false, email: false, address: false },
  };
};
