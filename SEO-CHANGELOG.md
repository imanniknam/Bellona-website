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


---

# Round 2: SEO-GUIDELINE version 2 (2026-11-02)

Everything below was checked on the live site after the last deploy (commit `51f6415`).
`npm run seo:check` (section 12): **every group PASS**. `schema:check`, `keyword:check`, `seo:dupes` and `seo:links` also pass.
Sitemap: **100 URLs** (50 Persian, 50 English), all 200. Pages with JSON-LD: **100 of 100**
(Organization 100, WebSite 100, BreadcrumbList 98, FAQPage 68, Service 30, CreativeWork 30, Article 14, Person 8, ItemList 2, AboutPage 2, ContactPage 2).

## 1. Changes by section and commit

| Section | Commit | What changed |
| --- | --- | --- |
| 12 acceptance tests | `c921de7` | `scripts/seo-check.mjs` rewritten from section 12: 15 groups (sitemap, lastmod, canonical, hreflang, title, description, h1, jsonld, og, redirect, 404, icon, links, leak, content), each printing PASS or FAIL. Run it before and after every change: `npm run build && npm run seo:check` (or `SEO_CHECK_BASE=https://bellonaagency.com npm run seo:check`). |
| 2 structured data, 3 brand name | `a8a9a01` | These two share files (`content/{fa,en}.ts`, `components/JsonLd.tsx`), so they are one commit. One `FAQPage` per page: the sections that render questions no longer emit their own JSON-LD; the page emits one merged block and repeated questions are dropped (`components/JsonLd.tsx`, `ServicePages.tsx`, `OtherPages.tsx`). No question text is repeated on two pages: every question that appeared on more than one page was reworded or removed (`content/fa.ts`, `en.ts`, `more/pillars.ts`, `spokes-services.ts`, `spokes-guides-b.ts`), `/offers` got its own package questions. Organization entity (type `Organization`, because there is no street address; `ProfessionalService` would need one) named `آژانس بلونا` / `Bellona Agency`, `alternateName` list per the guideline, PNG logo `public/brand/bellona-logo-512.png` (512x512, built by `scripts/make-icons.mjs`), `url` with the slash, Person `@id`s (`/about#iman-niknam`, ...) that match the card anchors on `/about`. Article: author is a Person reference, image is the guide's own OG image (`/api/og?title=<English title of the guide>`, the same URL as `og:image`). CreativeWork gained `keywords` (project kind) and `dateCreated` when a year exists. Brand: `siteName`, `og:site_name`, `application-name`, the title suffix, the 404 title and the logo label are `آژانس بلونا` / `Bellona Agency`; the home page carries the sentence "آژانس بلونا تیم طراحی سایت و اتوماسیون هوش مصنوعی از مهندسان دانشگاه صنعتی شریف است". 20 titles that passed 65 characters with the longer suffix were shortened before the suffix, not in it. Icons: `favicon.ico` (16/32/48), `icon.png`, `apple-icon.png`, `app/manifest.ts`. |
| 4 meta lengths, H1 | `7914f7b` | Every description is 100 to 160 characters and ends with an invitation where it fits (every description that was outside the range was rewritten, about 40 pages, more than the 30 the guideline listed). Case-study titles by project kind (`caseStudyTitle` in `lib/metadata.ts`), case-study descriptions built from the summary plus an invitation (`caseStudyDescription`; `workMeta` overrides). `/contact` H1: «تماس با آژانس بلونا و رزرو مشاوره‌ی رایگان» / "Contact Bellona Agency and book a free audit"; the old line stays as the subtitle. |
| 6 images, 7 sitemap and URL form, 8 test domains | `bf09196` | `fetchPriority="high"` on the cover image of every case study and on the first project cards. `canonical`, `hreflang` and `og:url` of the two home pages keep the root slash (`components/RootLinks.tsx`, because the Metadata API strips it). Sitemap `lastmod` comes from `content-dates.json` (last commit date per content file, written by `scripts/content-dates.mjs`, committed, because the deploy host clones shallowly and every file there looks like it changed in the newest commit). `/fa/` redirects to `/` in one hop (`skipTrailingSlashRedirect` plus an explicit `/:path+/` rule). The two `*.vercel.app` addresses are no longer linked. |
| 5-1 case studies | `826ac0d` | All 15 case studies have 500+ words in `main` in both languages (table below), from a visitor's tour, the decisions behind the project, the problem it answers and what took the most care (`content/more/projects-extra.ts`, `projects-care.ts`). Only facts already in the project data and screenshots; no figure, result or quote added. Elm-Kala's placeholder stack ("Production web app", "Railway") is no longer shown. |
| 5-2 to 5-4, 10 | `d00f7b8` | Hub and industry pages (`content/more/hubs-extra.ts`): `/industries` 4 paragraphs (482 and 489 words), `/services` 5 service paragraphs with links to every sub-page (701 and 668), `/guides` intro, topic groups, summary, author, date and an `ItemList` (582 and 550), real estate, media and e-commerce 483 to 534 words, `/contact` two new answers. `/partner`: see section 4. One sentence is never repeated word for word on two pages (`npm run seo:dupes`; link cards and shared sections marked `data-shared` are the same component, not repeated text). US spelling in the English copy (89 replacements). Contact channels (Telegram, WhatsApp, phone) are prepared in code (`common.channels`) and render nowhere until the owner fills them in. |
| 5-2 follow-up | `51f6415` | Unused constants removed (lint clean), `content-dates.json` refreshed. |
| 9 performance, 11 Search Console | no code | Pages are still prerendered (`x-nextjs-prerender: 1`); GSAP is not a dependency, Three.js is imported nowhere, and Lenis loads only on mouse devices. Lighthouse figures from round 1 (`SEO-CHANGELOG.md` above) still apply. PageSpeed Insights and the test from Iran need the owner (section 7 below). |

## 2. The section-12 tests, before and after

| Group | Before (live, before this round) | After (live) |
| --- | --- | --- |
| sitemap | PASS | PASS |
| lastmod | FAIL (86 of 100 at the deploy time) | PASS (100 differ from the deploy time) |
| canonical | FAIL (root without slash) | PASS |
| hreflang | FAIL (root without slash) | PASS |
| title | FAIL (98: old suffix) | PASS |
| description | FAIL (37 out of range) | PASS |
| h1 | PASS | PASS |
| jsonld | FAIL (327: name, logo, double FAQPage, repeated questions) | PASS |
| og | FAIL (100: site name) | PASS |
| redirect | FAIL (`/fa/` took two hops) | PASS |
| 404 | PASS | PASS |
| icon | FAIL (3 files returned 404) | PASS |
| links | FAIL (4 links to `*.vercel.app`) | PASS |
| leak | PASS | PASS |
| content | FAIL (30: 200 to 452 words) | PASS (507 to 586 words) |

The complete output of both runs is kept in `docs/seo/check-before-v2.txt` (630 lines) and `docs/seo/check-after-v2.txt`.
Quick commands from section 12 on the live site: sitemap 100; `/fa`, `/fa/`, `/industries/realEstate`, `/industries/healthcare`, `/fa/industries/consulting` each one 308 hop to the right page; `og:site_name` = `آژانس بلونا`; one `FAQPage` on `/services/website-design`; `favicon.ico`, `apple-icon.png`, `manifest.webmanifest` all 200; `fetchPriority="high"` on `/work/codechee`.

## 3. Titles before and after (sections 3 and 4)

98 of 100 titles changed (the other two are the home pages, which keep their titles). None is longer than 65 characters. The complete table (title before and after with lengths, description length before and after, for all 100 URLs) is `docs/seo/TITLES-BEFORE-AFTER.md`. Examples:

| Page | Before | After |
| --- | --- | --- |
| `/services` | خدمات طراحی سایت، توسعه محصول و اتوماسیون هوش مصنوعی · بلونا | خدمات طراحی سایت، محصول و اتوماسیون هوش مصنوعی · آژانس بلونا |
| `/en/services/website-design` | Custom website design: corporate, e-commerce, bilingual · Bellona | Custom website design: corporate and e-commerce · Bellona Agency |
| `/en/work/codechee` | Codechee: Education, Programming & AI · Bellona | Codechee platform design & development · Bellona Agency |
| `/work/sabzino` | طراحی سایت فروشگاه اجتماعی سبزینو؛ کسب‌وکار اجتماعی · بلونا | طراحی سایت فروشگاه اجتماعی سبزینو؛ کسب‌وکار اجتماعی · آژانس بلونا |
| `/en/guides/migrate-wordpress-to-nextjs` | Migrate from WordPress to Next.js without losing SEO · Bellona | Migrate from WordPress to Next.js, keep your SEO · Bellona Agency |

## 4. Decision for `/partner` (section 5-3)

**Route 1: keep the page and make it distinct.** Reason: `/partner` is the only page that argues for one team instead of several contractors (the comparison table and the journey are on no other page), and the home page and `/about` do not answer "what is the difference between an all-in-one agency and a few freelancers". It now targets the term «آژانس دیجیتال همه‌کاره» / "all-in-one digital agency" in its title, description and H1 («آژانس دیجیتال همه‌کاره برای کسب‌وکار شما» / "An all-in-one digital agency for your business"), has three own questions (the difference from several contractors, the monthly growth partnership, which businesses gain most) and a single FAQ that no other page repeats. Inbound links went from 1 to 5: `/about`, `/offers`, `/services`, the footer and the journey section. Route 2 (merging into `/about` with a 301) would have removed the only page for that term.

## 5. Word count per case study (section 5-1)

Main content only (no header, footer or closing contact block). "Before" is the live site at the start of this round.

| Case study | Persian before → after | English before → after |
| --- | --- | --- |
| ai-real-estate-os | 452 → 565 | 440 → 560 |
| codechee | 222 → 558 | 224 → 566 |
| yasin | 306 → 541 | 325 → 576 |
| konjed | 253 → 522 | 280 → 541 |
| microshamim | 261 → 575 | 260 → 586 |
| sabzino | 304 → 546 | 329 → 575 |
| dane-news | 407 → 521 | 423 → 545 |
| nira-perfume | 211 → 518 | 230 → 547 |
| contemo | 288 → 573 | 286 → 574 |
| shamim-house | 265 → 537 | 283 → 572 |
| asa-study | 273 → 564 | 264 → 553 |
| prowem | 250 → 547 | 272 → 570 |
| mojasame-saidi | 272 → 538 | 282 → 563 |
| elm-kala | 200 → 507 | 200 → 511 |
| school-builders | 233 → 546 | 255 → 559 |

## 6. Every `TODO(owner)` item (section 14, point 6)

None of these appears in published HTML (the `leak` group of `seo:check` confirms it): they are comments in code or data, and the section they would fill is simply not rendered until the owner supplies the value.

| File | What the owner provides | What stays hidden until then |
| --- | --- | --- |
| `content/work.ts` (26 projects), `content/more/projects.ts`, `content/more/projects-extra.ts` | For each case study: a measurable result and a client quote (and, for Dane, organic traffic before and after the migration). | The "Results" block and the quote block of the case study (both render only when data exists). |
| `content/work.ts` (Microshamim, ASA-Study) | The final domain of each client site. | The "visit the site" button. The Vercel test addresses are kept only in a comment. |
| `content/work.ts` (Elm-Kala) | The real technology stack. | The "Technology" block of that case study. |
| `content/fa.ts`, `content/en.ts` (`common.channels`) | A Telegram or WhatsApp link and a phone number, as `channels: [{ label, href }]`. | Footer entries, the line on `/contact`, `telephone` in the ContactPoint schema. Clicks on t.me / wa.me links are already tracked (`chat_click`). |
| `content/fa.ts`, `content/en.ts` (`common.email`) | A domain email such as hello@bellonaagency.com instead of the Gmail address. | Nothing is hidden: the Gmail address is used everywhere (pages and every schema node) until it changes. |
| `content/fa.ts`, `content/en.ts` (`team.sub`) | The city, if you want it in the sentence "آژانس بلونا تیم ... دانشگاه صنعتی شریف است". | Nothing is hidden; the city is simply not written. |
| `content/fa.ts`, `content/en.ts`, `content/proof.ts` | Real client quotes (name, role, company, with permission), at least three. | The whole "Client reviews" section (it renders only with real quotes). |
| `components/JsonLd.tsx` | A street address (then the type becomes `["Organization","ProfessionalService"]` with `address`, `telephone`, `areaServed`); LinkedIn, GitHub, Clutch or GoodFirms profiles for `sameAs` (today only Instagram); the year of each project (`dateCreated`); personal profile links for team members; whether "Bellona AI" is still a name in use. | Those schema properties are absent. |
| `content/more/pages.ts`, `content/more/hubs-extra.ts` | The real payment terms (the question «پرداخت چند مرحله‌ای است؟»); a promised reply time for `/contact`; the founding year and a fuller story for `/about`. | Those questions are not written, so they are not rendered. |
| `content/more/pillars.ts`, `content/more/spokes.ts`, `content/spokes-services.ts` | Published price ranges for website design and the chatbot, a typical timeline, CMS choice. | The cost guide stays without numbers. |
| `content/spokes-guides-a.ts`, `content/spokes-guides-b.ts` | Confirm each guide's author with the named person. | Nothing is hidden; the bylines are shown as listed. |
| `lib/metadata.ts` | Add the Search Console DNS TXT record for `bellonaagency.com` (a Domain property); the HTML tag and the HTML file are already in place. | Nothing is hidden. |

Outside the code (owner only): footer line "طراحی و توسعه: آژانس بلونا" with a link on delivered client sites (danenews.ir, codechee.ir, sabzinow.ir, yasinow.ir, contemo.ir, konjed.top, niraperfume.com, mojasamesaidi.ir, shamimhouse.ir, prowem.com, kharazie.at ...), with the client's consent; `noindex` or a password on the client test sites on Vercel; a LinkedIn company page, GitHub and Clutch or GoodFirms profiles; one or two articles on Virgool or LinkedIn linking to the full guide (for example the Dane migration summary).

## 7. What was not done, and why

- **Rich Results Test and validator.schema.org** (section 2-6): both are online tools that need a browser session with the live URL; they were not run. `npm run seo:schema` checks required properties, `@id` references, breadcrumb equals the visible breadcrumb and the expected types on all 100 URLs, with no errors. Please run the two online tools once on one page of each type.
- **PageSpeed Insights and the test from Iran** (section 9): need the owner's network and the public PageSpeed service. Round 1 Lighthouse figures (mobile, local production build) were performance 80 to 91, CLS 0, LCP 3.4 to 4.7 s under simulated slow 4G; the LCP target of 2.5 s is not met in that lab test.
- **`ProfessionalService` type** (section 2-3): not used, on purpose: it is a `LocalBusiness` and needs a real street address, which does not exist yet.
- **`lastmod` spread**: the dates are real (last change of the content files) but only 3 to 4 distinct values, because most pages share `content/fa.ts` / `content/en.ts`; this is what the guideline asks for, not a stamp of the deploy time. Run `npm run dates` and commit `content-dates.json` after content changes (the `prebuild` hook does it on every local build).
- **Section 8 backlinks, section 10 external profiles and reviews, section 11 Search Console and Bing steps**: need the owner's accounts and consent (list above and below).
- **Guideline vs the real code**: (1) the guideline says `/fa/` was a single hop; on the live site it took two (`/fa/` to `/fa` to `/`), now one. (2) FAQ question repeats were wider than listed: also `marketing-growth` and `seo`, `ai-automation` and `crm`, and two guides; all fixed. (3) More meta descriptions were out of range than listed. (4) The 86 identical `lastmod` values were the newest commit of the shallow deploy clone, not the build time; the fix is the committed `content-dates.json`. (5) The unused `three` package is still in `package.json` but is imported nowhere (no weight in any page).

## 8. Search Console checklist for the owner (section 11-2), with final URLs

1. **Sitemaps**: submit `https://bellonaagency.com/sitemap.xml` again; it should say "Success" with 100 discovered URLs.
2. **URL Inspection, Request indexing**, spread over several days (there is a daily limit):
   - Day 1: `/`, `/en`, `/services/website-design`, `/services/website-design/nextjs`, `/services/website-design/ecommerce`, `/guides/website-design-cost`, `/work`, `/about`
   - Day 2: `/services/website-design/corporate`, `/services/website-design/bilingual`, `/services/website-design/redesign`, `/services/website-design/landing-page`, `/services/seo`, `/services/ai-automation`, `/services/ai-automation/n8n`, `/industries/education`
   - Day 3: the 6 new guides (`/guides/migrate-wordpress-to-nextjs`, `/guides/custom-vs-store-builder`, `/guides/bilingual-website-hreflang-rtl`, `/guides/nextjs-seo-checklist`, `/guides/ai-search-readiness`, `/guides/lead-follow-up-automation-n8n`) and `/guides`
   - Day 4 onwards: the case studies, starting with `/work/dane-news`, `/work/ai-real-estate-os` and `/work/sabzino`
3. **Pages, "Discovered - currently not indexed"**: press "Validate fix".
4. Do not remove any URL with the Removals tool; the redirects are enough.
5. Add a **Domain** property (`bellonaagency.com`, DNS TXT verification) next to the URL-prefix one that already works (HTML file and tag are live).
6. **Bing Webmaster Tools**: "Import from Google Search Console" and submit the same sitemap.
7. Export the Pages, Performance and Enhancements reports again after 2, 4 and 8 weeks.

What to expect (signs, not promises): after 2 weeks the sitemap says "Success", old URLs move to "Page with redirect" and the main service pages become "Indexed"; after 4 weeks `/services/*`, `/work/*` and `/guides/*` get impressions and the first non-brand queries appear; after 8 weeks "آژانس بلونا" and "بلونا" rank 1 to 3, Iran's share of impressions rises and Breadcrumb appears under Search appearance.
