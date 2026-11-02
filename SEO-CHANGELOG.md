# SEO changelog (SEO-GUIDELINE.md, phases A–H)

Live site checked on 2026-11-02 after the last deploy (commit `cd47c8a`).

## Changes by phase and commit

| Phase | Commit | What changed |
| --- | --- | --- |
| A indexing | `2d0c7cd` | Search Console HTML tag; www→apex 301; single-hop redirects for old `/industries/*` and `/fa/*`; sitemap with `x-default`, real `lastmod`, no `priority`/`changefreq`; robots allows `/api/og`; 404 page with links; dead icons removed. |
| B on-page | `ad86681` | Home H1/intro/titles/descriptions per the guideline; project `type` and descriptive alt text (FA+EN); visible breadcrumbs on all inner pages; related-links blocks; footer sub-page and guide links; article OG tags; Latin-only OG image titles. |
| C structured data | `d0dac3e` | `ProfessionalService` on every page, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork` (case studies), `AboutPage`+`Person`, `ContactPage`, `Article` with image. `npm run seo:schema` validates required props, `@id` links, breadcrumb = visible trail. |
| D expand pages | `79ac0c6` | Answer-first sections (FA+EN) for 5 pillars, 7 spokes, 15 case studies, 4 industries, 6 core pages; FAQ derived from them; table of contents. |
| E new pages | `37542db` | Service pages `seo`, `landing-page`, `crm`, `chatbot`; guides `migrate-wordpress-to-nextjs`, `custom-vs-store-builder`, `bilingual-website-hreflang-rtl`, `nextjs-seo-checklist`, `ai-search-readiness`, `lead-follow-up-automation-n8n`. |
| F keywords | `80f8cba` | `docs/seo/keyword-map.json` + `KEYWORD_MAP.md` (28 pages × fa/en); `npm run seo:keywords` checks title, H1, first 100 words, an H2 and the meta description; titles/descriptions/headings reworded. |
| G performance | `60e171c` | Lahzeh limited to weights 400/700/900 (preloaded); unused Persian fonts no longer bundled; zod removed from the browser bundle; Lenis loaded on demand and only for mouse devices; header links no longer prefetch; `npm run seo:links` crawler. |
| H measurement | `eba8bb6`, `cd47c8a` | `email_click`, `chat_click`, `form_success` with `need`/`offer`; `docs/seo/MEASUREMENT.md` (events, owner tasks, bi-weekly report). |

Totals: **100 sitemap URLs** (was 78), **100 of 100 pages carry JSON-LD**: ProfessionalService 100, WebSite 100, BreadcrumbList 98 (home pages have none by design), FAQPage 76, Service 30, CreativeWork 30, Article 14, Person 8, AboutPage/ContactPage 2 each.

## Section 15 commands, before and after

| Check | Before (2026-11-02, old site) | After (live) |
| --- | --- | --- |
| Sitemap URLs | 78 | 100 |
| `/fa` | 308 → `/` | 308 → `/` |
| `/industries/realEstate` | 308 → `/industries/real-estate` | same |
| `/fa/industries/realEstate` | 308 → `/industries/realEstate` (two hops) | 1 hop → `/industries/real-estate` |
| `www` host | no redirect | 301 → apex |
| Search Console tag | missing | present |
| Typo grep | 0 | 0 |
| hreflang / canonical (`/`, `/en`) | fa, en, x-default; self canonicals | unchanged, correct |
| JSON-LD blocks on `/services/website-design` | 8 | 12 |
| H1 count | 1 | 1 on every sampled page |
| Unknown URL | 404 | 404 |
| `seo:check` / `seo:schema` live | – | no errors |
| Broken-link crawl | – | 137 URLs, none broken |

Lighthouse, mobile, local production build:

| Page | Before perf / LCP / transfer | After perf / LCP / transfer |
| --- | --- | --- |
| `/` | 66 / 5.45 s / 636 KB | 82 / 3.83 s / 411 KB |
| `/services/website-design` | 74 / 5.25 s / 734 KB | 80 / 4.65 s / 551 KB |
| `/work/codechee` | 75 / 5.42 s / 697 KB | 90 / 3.54 s / 524 KB |
| `/guides/nextjs-seo-checklist` | 67 / 5.39 s / 616 KB | 91 / 3.36 s / 432 KB |

CLS 0.000 everywhere; SEO 100, best practices 100, accessibility 100 (96 on the service page, unchanged from before).

## Not implemented, and why

- **LCP under 2.5 s in the Lighthouse lab test**: not reached (3.4–4.7 s under simulated slow-4G throttling). The remaining weight is the three preloaded Persian font files and the framework JS. Field data from Search Console decides whether this matters.
- **Rich Results Test and Schema Validator**: need the online tools; replaced by `npm run seo:schema` (structure only).
- **Search Console, Bing Webmaster, GA4 key events, DNS TXT record**: need the owner's accounts (see `docs/seo/MEASUREMENT.md`).
- **`areaServed`, telephone, address**: none exist, so none were invented.
- **Price ranges**: pricing is deliberately absent from the site.
- **`/en/fa` pages**: not needed, the site has one Persian and one English tree.
- **Thank-you page**: the form confirms in place, so `form_success` is the conversion event.
- **INP**: no field data offline; no long tasks seen in the lab trace.

## TODO(owner) items

- `lib/metadata.ts`: DNS TXT verification for the domain property.
- `content/work.ts` (26) and `content/more/projects.ts` (31): real project results, quotes and client approvals.
- `content/en.ts`, `content/fa.ts` (3 each): chat channel, phone/address, client quotes.
- `components/JsonLd.tsx` (2): `areaServed`, telephone, address.
- `content/spokes-guides-a.ts`, `content/spokes-guides-b.ts`, `content/spokes-services.ts`, `content/more/{spokes,pillars,pages}.ts`: confirm guide authors and any figures to add.
- `components/Analytics.tsx`, `docs/seo/MEASUREMENT.md`: GA4 id, key events, Search Console and Bing setup, Telegram/WhatsApp link.
