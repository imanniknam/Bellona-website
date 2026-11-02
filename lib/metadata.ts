import type { Metadata } from "next";
import type { Locale, ProjectType } from "@/content/types";
import { workMeta } from "@/content/work-alt";
import { getDict, localePath } from "./i18n";
import { siteUrl } from "./site";

/**
 * Per-page metadata with canonical + hreflang (en, fa, x-default) and a generated OG image.
 * `path` is the locale-less path, e.g. "/services/ai-automation". A matching entry in the locale's `seo`
 * map (content/{en,fa}.ts) overrides the title/description, so on-page labels can stay short.
 */
/** The generated social image for a page: /api/og shows Latin titles only (it cannot shape Persian script). */
export const ogImagePath = (locale: Locale, title: string) => `/api/og?locale=${locale}&title=${encodeURIComponent(title)}`;

export function pageMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
  absoluteTitle = false,
  article,
  ogTitle: ogImageTitle,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
  /** Guides are articles: og:type "article" with published/modified time and author (SEO-GUIDELINE B4). */
  article?: { publishedTime?: string; modifiedTime?: string; author?: string };
  /** Latin title for the social image, when the page title is Persian (guides: their own English title). */
  ogTitle?: string;
}): Metadata {
  const d = getDict(locale);
  title = d.seo[path]?.title ?? title;
  description = d.seo[path]?.description ?? description;
  const url = localePath(locale, path);
  const ogTitle = absoluteTitle ? title : `${title} · ${d.meta.siteName}`;
  // The home page (absolute title) gets the brand as its default OG title, never an empty one.
  const og = ogImagePath(locale, ogImageTitle ?? (absoluteTitle ? "Bellona Agency" : title));
  // The Metadata API drops the trailing slash of the site root, but the root is "https://bellonaagency.com/"
  // everywhere else (sitemap, schema). So the two home pages render canonical, hreflang and og:url themselves
  // (components/RootLinks.tsx); every other page uses the API as usual (SEO-GUIDELINE 7-2).
  const isRoot = path === "/";
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(isRoot
      ? {}
      : {
          alternates: {
            canonical: url,
            languages: {
              en: localePath("en", path),
              fa: localePath("fa", path),
              "x-default": localePath("fa", path),
            },
          },
        }),
    openGraph: {
      ...(article
        ? {
            type: "article" as const,
            ...(article.publishedTime ? { publishedTime: article.publishedTime } : {}),
            ...(article.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
            ...(article.author ? { authors: [article.author] } : {}),
          }
        : { type: "website" as const }),
      ...(isRoot ? {} : { url }),
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
 * Case-study <title> by project kind (SEO-GUIDELINE 4-2), without the brand suffix. The suffix is added later
 * (" · آژانس بلونا" / " · Bellona Agency") and the whole title stays within 65 characters, so the domain part is
 * the first thing dropped when the name is long.
 *   website     «طراحی سایت <نام>؛ <حوزه>»              <Name> website design: <domain>
 *   product     «طراحی و توسعه‌ی پلتفرم <نام>؛ <حوزه>»    <Name> platform design & development
 *   automation  «<نام>؛ اتوماسیون هوش مصنوعی و n8n»       <Name>: AI & n8n automation case study
 *   mobile-app  «توسعه‌ی اپلیکیشن <نام>؛ <حوزه>»          <Name> mobile app development
 */
export function caseStudyTitle(locale: Locale, name: string, sector: string, type: ProjectType = "website"): string {
  const limit = 65 - (locale === "fa" ? 14 : 16);
  const parts = sector.split(" · ");
  const full = parts.join(locale === "fa" ? "، " : ", ");
  const last = parts[parts.length - 1];
  const platform = /^(پلتفرم|سامانه|پایگاه)/.test(name) ? name : `پلتفرم ${name}`;
  const candidates: string[] =
    locale === "fa"
      ? type === "website"
        ? [`طراحی سایت ${name}؛ ${full}`, `طراحی سایت ${name}؛ ${last}`, `طراحی سایت ${name}`]
        : type === "product"
          ? [`طراحی و توسعه‌ی ${platform}؛ ${full}`, `طراحی و توسعه‌ی ${platform}؛ ${last}`, `طراحی و توسعه‌ی ${platform}`]
          : type === "automation"
            ? [`${name}؛ اتوماسیون هوش مصنوعی و n8n`, `${name}؛ اتوماسیون هوش مصنوعی`, name]
            : [`توسعه‌ی اپلیکیشن ${name}؛ ${full}`, `توسعه‌ی اپلیکیشن ${name}؛ ${last}`, `توسعه‌ی اپلیکیشن ${name}`]
      : type === "website"
        ? [`${name} website design: ${full}`, `${name} website design: ${last}`, `${name} website design`]
        : type === "product"
          ? [`${name} platform design & development`, `${name} platform development`, name]
          : type === "automation"
            ? [`${name}: AI & n8n automation case study`, `${name}: AI automation case study`, `${name}: AI automation`, name]
            : [`${name} mobile app development`, `${name} mobile app`, name];
  return candidates.find((c) => c.length <= limit) ?? candidates[candidates.length - 1];
}

/**
 * Case-study meta description (4-1): the project summary plus an invitation, 100–160 characters.
 * A hand-written `workMeta` override (content/work-alt.ts) wins for summaries that do not fit.
 */
export function caseStudyDescription(locale: Locale, slug: string, summary: string): string {
  const override = workMeta[slug]?.[locale];
  if (override) return override;
  const base = summary.replace(/[.؛۔\s]+$/, "");
  const tails =
    locale === "fa"
      ? ["؛ نمونه‌کار آژانس بلونا. پروژه‌ی مشابه دارید؟ بررسی رایگان.", "؛ نمونه‌کار آژانس بلونا. بررسی رایگان.", "."]
      : [". A Bellona Agency case study. Want something similar? Free audit.", ". A Bellona Agency case study. Free audit.", "."];
  const options = tails.map((t) => base + t);
  return options.find((o) => o.length >= 120 && o.length <= 160) ?? options.find((o) => o.length >= 100 && o.length <= 160) ?? summary;
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
