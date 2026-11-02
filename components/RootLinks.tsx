import type { Locale } from "@/content/types";
import { siteUrl } from "@/lib/site";

/**
 * canonical, hreflang and og:url of the two home pages. The Metadata API would strip the root's trailing slash,
 * and the sitemap and structured data use "https://bellonaagency.com/", so these tags are written out here and
 * React moves them into <head>. The Persian home is the root and also the x-default (SEO-GUIDELINE 7-2).
 */
export function RootLinks({ locale }: { locale: Locale }) {
  const fa = `${siteUrl}/`;
  const en = `${siteUrl}/en`;
  return (
    <>
      <link rel="canonical" href={locale === "fa" ? fa : en} />
      <link rel="alternate" hrefLang="en" href={en} />
      <link rel="alternate" hrefLang="fa" href={fa} />
      <link rel="alternate" hrefLang="x-default" href={fa} />
      <meta property="og:url" content={locale === "fa" ? fa : en} />
    </>
  );
}
