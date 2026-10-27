import Link from "next/link";
import type { Dict } from "@/content/types";
import { guidesHub } from "@/content/spokes";
import { publishedSpokes, spokePath } from "@/lib/drafts";
import { localePath } from "@/lib/i18n";
import { legalPagesPublished } from "@/lib/site";
import { LogoMark } from "./LogoMark";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="fill-none stroke-current" strokeWidth={2} strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" className="fill-current" />
    </svg>
  );
}

export function Footer({ d }: { d: Dict }) {
  const { common, locale } = d;
  const spokeLinks = [...publishedSpokes("service"), ...publishedSpokes("guide")].map((s) => ({
    href: spokePath(s),
    label: s[locale].h1.replace(/\*\*/g, ""),
  }));
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="wrap flex flex-col gap-10 pb-6 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-line-dark pt-10">
          <Link href={localePath(locale, "/")} className="hx flex items-center gap-4 rounded-2xl">
            <LogoMark variant="dark" size={72} />
            <span className="flex flex-col gap-2">
              <span className="fa-display text-[30px] font-extrabold leading-none tracking-[-0.035em]">
                {common.wordmark} <span className="font-normal text-orange">{common.agency}</span>
              </span>
              <span className="tagline text-[11px] font-semibold tracking-[0.36em] text-muted-dark rtl:text-sm">
                {common.tagline}
              </span>
            </span>
          </Link>
          <nav aria-label={common.footer.nav}>
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
              {common.nav.map((item) => (
                <li key={item.key}>
                  <Link href={localePath(locale, item.href)} className="text-soft-dark hover:text-orange">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Sitewide crawl path to every service page, with descriptive anchors (docs/seo P1-07). */}
        <nav aria-labelledby="footer-services" className="flex flex-wrap items-baseline gap-x-7 gap-y-3 border-t border-line-dark pt-8">
          <p id="footer-services" className="t-eyebrow text-orange-on-dark">
            {d.meta.services.title}
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
            {d.pillars.items.map((p) => (
              <li key={p.id}>
                <Link href={localePath(locale, `/services/${p.slug}`)} className="text-soft-dark hover:text-orange">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Sitewide crawl path to the published sub-pages and guides (e.g. «طراحی سایت فروشگاهی»). */}
        {spokeLinks.length > 0 && (
          <nav aria-labelledby="footer-deeper" className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
            <p id="footer-deeper" className="t-eyebrow text-orange-on-dark">
              {guidesHub[locale].deeper}
            </p>
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
              {spokeLinks.map((s) => (
                <li key={s.href}>
                  <Link href={localePath(locale, s.href)} className="text-soft-dark hover:text-orange">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-dark">
          <p>{common.footer.rights}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a href={`mailto:${common.email}`} className="hover:text-paper">
                <span className="sr-only">{common.footer.emailLabel}: </span>
                <span dir="ltr">{common.email}</span>
              </a>
            </li>
            {common.footer.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-paper" data-track="cta" data-track-label="footer_instagram">
                  <InstagramIcon />
                  {s.label}
                  <span className="sr-only"> {common.opensNewTab}</span>
                </a>
              </li>
            ))}
            {legalPagesPublished && (
              <>
                <li>
                  <Link href={localePath(locale, "/privacy")} className="hover:text-paper">
                    {common.footer.legal.privacy}
                  </Link>
                </li>
                <li>
                  <Link href={localePath(locale, "/terms")} className="hover:text-paper">
                    {common.footer.legal.terms}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Decorative giant wordmark, drawn as SVG so it isn't treated as body text. */}
        {/* EN is stretched to the full width; the Persian (Lalezar) wordmark keeps its natural proportions,
            so it is set larger in a taller frame, deep enough for the dot under ب. */}
        <svg
          viewBox={locale === "en" ? "0 0 1000 230" : "0 0 1000 372"}
          aria-hidden="true"
          focusable="false"
          className="w-full select-none fill-graphite"
        >
          <text
            x="500"
            y={locale === "en" ? 196 : 236}
            textAnchor="middle"
            {...(locale === "en" ? { textLength: 990, lengthAdjust: "spacingAndGlyphs" } : {})}
            className={`fa-display font-extrabold ${locale === "en" ? "text-[250px]" : "text-[360px]"}`}
          >
            {common.wordmark}
          </text>
        </svg>
      </div>
    </footer>
  );
}
