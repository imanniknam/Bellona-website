import type { Metadata } from "next";
import type { Locale, ProjectType } from "@/content/types";
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
  article,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
  /** Guides are articles: og:type "article" with published/modified time and author (SEO-GUIDELINE B4). */
  article?: { publishedTime?: string; modifiedTime?: string; author?: string };
}): Metadata {
  const d = getDict(locale);
  title = d.seo[path]?.title ?? title;
  description = d.seo[path]?.description ?? description;
  const url = localePath(locale, path);
  const ogTitle = absoluteTitle ? title : `${title} · ${d.meta.siteName}`;
  // The home page (absolute title) gets the brand as its default OG title, never an empty one.
  const og = `/api/og?locale=${locale}&title=${encodeURIComponent(absoluteTitle ? "Bellona Agency" : title)}`;
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
      ...(article
        ? {
            type: "article" as const,
            ...(article.publishedTime ? { publishedTime: article.publishedTime } : {}),
            ...(article.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
            ...(article.author ? { authors: [article.author] } : {}),
          }
        : { type: "website" as const }),
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
export function caseStudyTitle(locale: Locale, title: string, sector: string, type: ProjectType = "website"): string {
  const parts = sector.split(" · ");
  // Persian titles lead with the project's kind (SEO-GUIDELINE B6): websites with «طراحی سایت» (the main search
  // term), platforms with «پلتفرم»; automation systems and apps keep their own name.
  const name =
    locale !== "fa"
      ? title
      : type === "website"
        ? `طراحی سایت ${title}`
        : type === "product" && !/^(پلتفرم|سامانه|پایگاه)/.test(title)
          ? `پلتفرم ${title}`
          : title;
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
    // Google Search Console ownership (SEO-GUIDELINE A1). Also verify by DNS TXT so this doesn't depend on code:
    // TODO(owner): add the Search Console DNS TXT record for bellonaagency.com.
    verification: { google: "kzZWDDXuIy9VRDZVRxQt3uwsfuN4KH1LfQrhsADUo2M" },
    formatDetection: { telephone: false, email: false, address: false },
  };
};
