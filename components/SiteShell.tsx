import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { getDict, localePath } from "@/lib/i18n";
import { analyticsId, bookingUrl } from "@/lib/site";
import { Analytics } from "./Analytics";
import { Cursor } from "./Cursor";
import { Motion } from "./Motion";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WebSiteLd } from "./JsonLd";

/**
 * The <html> document shared by the EN and FA root layouts. Each layout passes its own font
 * variables, so the English pages never load (or preload) the Persian font files.
 */
export function SiteShell({ locale, fontVars, children }: { locale: Locale; fontVars: string; children: ReactNode }) {
  const d = getDict(locale);
  return (
    <html lang={locale} dir={d.dir} className={fontVars}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {d.common.skip}
        </a>
        <Header
          locale={locale}
          common={d.common}
          servicesLabel={d.meta.services.title}
          pillars={d.pillars.items.map((p) => ({ slug: p.slug, title: p.title, num: p.num }))}
          book={bookingUrl ? { href: bookingUrl, external: true } : { href: localePath(locale, "/contact"), external: false }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer d={d} />
        <WebSiteLd d={d} />
        <Motion />
        <Cursor />
        <Analytics id={analyticsId} locale={locale} />
      </body>
    </html>
  );
}
