# Bellona — Technical SEO Audit

Research date: **2026-10-21** · Auditor: Claude (research only; no changes made)
Back to: [Master report](SEO_MASTER_RESEARCH_REPORT.md) · [Backlog](SEO_IMPLEMENTATION_BACKLOG.md)

## Scope and method

| Item | Detail |
|---|---|
| Hosts inspected | `https://bellona-web.onrender.com` (new site, Next.js) and `https://bellonaagency.com` (current production domain) |
| Methods | Page fetches; rendered-DOM inspection and same-origin `fetch()` of 29 routes in a real Chrome session; Performance API (LCP/CLS/TTFB) in Chrome on desktop; Google `site:` query |
| Not available | Search Console, Analytics, server logs, a full crawler (Screaming Frog/Sitebulb), PageSpeed Insights / CrUX field data, mobile device testing, backlink tools |
| Caveat | The new site was **redeployed during the research session** (the `/fa` H1 and `robots.txt` changed between fetches ~20 minutes apart). Findings reflect the latest state observed unless stated. |

Severity scale: **Critical** (blocks indexing or ranking of the new site) · **High** · **Medium** · **Low**.

---

## 1. Headline finding: the new site is not yet the site Google sees

| Observation | Evidence |
|---|---|
| `bellonaagency.com` serves an **older, different site**: title "Bellona — AI Systems That Work While You Sleep", H1 "It's Not Just You Anymore", AI-only positioning; stat counters are server-rendered as "0+", "0%", "0X". (An earlier fetch reported an empty meta description; the raw HTML checked in Chrome on 2026-10-22 does contain one.) | WebFetch and Chrome inspection of `https://bellonaagency.com/` (2026-10-21/22) |
| The old sitemap lists only the homepage and 12 thin industry pages (6 EN + 6 FA, camelCase slugs such as `/industries/realEstate`), lastmod 2026-06-07. | `https://bellonaagency.com/sitemap.xml` |
| Those industry pages are ~80 words and say projects are "coming soon". | WebFetch `https://bellonaagency.com/industries/realEstate` |
| Google has indexed the old homepage, `/fa`, and several of the thin industry pages (healthcare, ecommerce, fa/consulting). | Google `site:bellonaagency.com`, 2026-10-21 |
| The new site on Render declares **every** canonical, hreflang and sitemap URL on `bellonaagency.com`. | Rendered `<head>` and `/sitemap.xml` on the Render host |

**Consequence:** until the new build is deployed to `bellonaagency.com`, the new site's canonicals point at URLs that currently serve different (or no) content, and none of the new pages can rank. This is the single highest-impact SEO action.

---

## 2. Findings table

| ID | Finding | Affected URL / template | Evidence | Severity | SEO / business impact | Recommended fix | Complexity | Dependencies | Validation |
|---|---|---|---|---|---|---|---|---|---|
| TA-01 | New site not deployed on the canonical domain | All | §1 above | **Critical** | New pages cannot be indexed under their canonical URLs | Deploy the new build to `bellonaagency.com` (DNS / custom domain on host) | M | Hosting/DNS access | `curl -I https://bellonaagency.com/services/website-design` → 200 with new H1; GSC URL Inspection "URL is on Google" over following weeks |
| TA-02 | Old URLs need permanent redirects at cutover | `/industries/{realEstate,finance,healthcare,ecommerce,consulting,education}` and `/fa/industries/*` | Old sitemap; new site redirects `/industries/realEstate` → `/industries` (observed as a redirect in Chrome; **status code not verified** — opaque redirect) | High | Preserves the few indexed URLs; avoids soft 404s | Map each old URL with **301/308**: to the new industry page if one is created (see architecture), otherwise to `/industries` (and `/fa/industries`). Cover both camelCase and kebab-case variants | S | TA-01 | `curl -sI` each old URL → `301`/`308` and single hop to 200 |
| TA-03 | Render host must not compete with production after cutover | `bellona-web.onrender.com/*` | robots.txt returned `Disallow: /` to one fetcher and `Allow: /` + sitemap to Chrome ~20 min later (redeploy or user-agent/host-dependent logic — **not resolved**) | High | Duplicate host could be indexed; or production could inherit a Disallow if logic is host-based and misconfigured | After cutover, 301 the Render host to `bellonaagency.com`, or serve `X-Robots-Tag: noindex` on the Render host only. Confirm `robots.ts` logic is keyed on host/env, never applied to production | S | TA-01 | `curl -A Googlebot https://bellonaagency.com/robots.txt` shows `Allow: /`; Render host returns 301 or noindex header |
| TA-04 | Unfilled template placeholders in live copy and metadata | `/contact` meta description + OG/Twitter descriptions ("[24 h]"); "We reply within [24 h]" on every page's contact block; `/about` "[FOUNDING YEAR, LOCATION AND ORIGIN STORY]"; FAQ answers on `/fa/services/full-stack-development` (3 placeholders), `/fa/services/marketing-growth` (2), `/fa/services/business-development` (1), `/fa/services/website-design` (CMS answer, "[بازه‌ی معمول]") | Page fetches 2026-10-21 | **Critical (content)** | Visible to users, Google snippets and AI assistants that read page text. (Re-check 2026-10-22: FAQ JSON-LD already **excludes** placeholder Q&As — good; visible copy still contains them on 9 of 10 pages checked, both locales.) | Fill every placeholder with real answers or remove the Q&A until answered. Add a build-time check that fails on `\[[^\]]+\]` patterns in copy files | S | Business answers (see Master §19) | `grep -rnE '\[[^]]{2,}\]'` over content/i18n files returns nothing; Rich Results Test on FAQ pages |
| TA-05 | Typo in Persian header CTA | Header on `/fa/*` ("برزرو تماس رایگان…") | Fetch of `/fa/services/*` | Medium | Quality signal on every Persian page | Correct to «رزرو تماس رایگان ۳۰ دقیقه‌ای» | S | — | Visual check |
| TA-06 | "Book a call" CTA links to the contact page itself; no scheduler | All CTAs → `/contact` | `/contact` fetch | Medium (conversion) | Promise of "pick a time" not fulfilled | Embed or link a real booking tool, or relabel to "Request a call" | S | Tool choice | Click-through test |
| TA-07 | Persian H1s are slogans with no service keyword | `/fa/services/*`, `/fa` | e.g. AI page H1 «سیستم‌هایی که کار می‌کنند وقتی تو خوابی.»; website-design H1 «سایت‌هایی که بازدیدکننده را به مشتری تبدیل می‌کنند.» | High | Weak topical relevance for primary queries | Keep slogan as visual tagline; make the H1 (or an eyebrow rendered *inside* the H1) state the service, e.g. «طراحی سایت اختصاصی و دوزبانه» | S | Copy approval | View source: H1 contains target phrase |
| TA-08 | Titles are generic | e.g. `طراحی سایت · بلونا`, `Website design · Bellona` | Route fetch | High | Low CTR and relevance | Rewrite per [Site architecture](SEO_SITE_ARCHITECTURE.md) title table (≈50–60 chars, keyword first, brand last) | S | — | View source |
| TA-09 | Thin service pages vs ranking competitors | All 5 service pages (~300–400 visible words, AI page ~1,000) | Fetch word counts; competitor pages 960–3,300 words | High | Hard to rank for commercial head terms | Expand per [Content roadmap](SEO_CONTENT_ROADMAP.md) briefs | M | Real facts from team | Word count / section checklist |
| TA-10 | Case studies not linked from service pages | `/services/*` link only to `/work` | Fetch of FA service pages | Medium | Lost internal relevance and proof at decision point | Add "Related work" blocks mapping services ↔ case studies | S | — | Internal link audit |
| TA-11 | Codechee case study not linked from homepage "Recent work" | `/` | Homepage link list (3 of 4 case studies) | Low | Minor discoverability | Include, or rotate | S | — | Link present |
| TA-12 | Case-study and card images lack descriptive alt | `/` (3 card images `alt=""`); case study images alt "Konjed 2", "Konjed 3" | DOM inspection | Medium | Image search + accessibility | Descriptive alt in page language (e.g. «صفحه بازی‌های مهارتی پلتفرم کنجد روی موبایل») | S | — | axe / DOM check |
| TA-13 | Sitemap `lastmod` equals generation time for every URL | `/sitemap.xml` (all 32 URLs show request-time timestamp) | Sitemap body | Low | Google ignores unreliable lastmod | Emit real content-modified dates (from content files / git) or omit lastmod | S | — | Two fetches minutes apart return identical lastmod |
| TA-14 | Non-standard `Host:` line in robots.txt | `/robots.txt` | Body | Low | Ignored by Google; harmless clutter | Remove `Host:` | S | — | — |
| TA-15 | Sitewide `ProfessionalService` + full `OfferCatalog` repeated on every page, incl. privacy/terms | All templates | JSON-LD types observed on every route | Low | Bloat; not an error | Keep full Organization/ProfessionalService on home; elsewhere reference it by `@id`. Add `Service` JSON-LD only on its own service page | S | — | Rich Results Test / Schema validator |
| TA-16 | Organization entity under-specified | JSON-LD | `email` is Gmail; no `sameAs`, `address`, `telephone`, `foundingDate` | Medium | Weak entity signals; brand name collides with Bellona Foundation, furniture and clothing brands | Add `sameAs` (Instagram, LinkedIn if any), `alternateName` ["بلونا","Bellona Agency","آژانس بلونا"], `areaServed`, `founder` Person entries; add address/phone only if real | S | Business facts | Schema validator |
| TA-17 | Contact identity uses a Gmail address; no phone, address or messaging channel | Footer, `/contact`, schema | Fetch | Medium (trust/conversion) | Iranian B2B buyers commonly expect phone/WhatsApp/Telegram; Gmail looks informal | Use `@bellonaagency.com` email; add a phone or messaging link if the team can staff it | S | Business decision | — |
| TA-18 | Unsupported performance claims | Home + AI page: "100+ automations", "80% time savings", "3x productivity" | Fetch | Medium (trust / consumer-protection risk) | Claims without case evidence undercut E-E-A-T | Substantiate with a case study or reword as ranges with context | S | Data from team | Each figure links to evidence |
| TA-19 | Heavy HTML documents | `/` and `/fa` ≈ 508 KB HTML each (74 inline SVGs); AI page ≈ 216 KB | Same-origin fetch sizes | Medium | Slower TTFB/parse on mobile and slow Iranian connections | Move repeated inline SVG icons to a sprite or components rendered once; check RSC payload duplication | M | — | HTML size < ~150 KB for home; Lighthouse mobile |
| TA-20 | Five Persian font weights loaded | `/fa/*` (Estedad 400–800) | Resource timing | Low | Extra bytes before text paint | Trim to 2–3 weights, `font-display: swap`, subset | S | Design sign-off | Network panel |
| TA-21 | Hosting latency / availability for Iranian visitors (hypothesis) | Host | TTFB 0.86–1.04 s from tester location (not Iran); repeated WebFetch server errors on several routes | Medium (unverified) | If the primary market is Iran, origin location, filtering and cold starts matter | Measure from inside Iran; if on a sleeping/free plan, move to an always-on plan; consider a CDN that is reachable from Iran | M | Host access | Real-user TTFB from Iran |
| TA-22 | No content hub / blog route | `/blog`, `/fa/blog` → 404 (noindex) | Route fetch | Medium (strategic) | No home for cost guides, comparisons, how-tos | Add `/fa/guides/*` (and `/fa/blog` if desired) per architecture | M | Content | Route 200, in sitemap |
| TA-23 | Industry pages exist only as one combined page; industry CTAs use `/contact?industry=…` parameters | `/industries` | Fetch | Low | Parameter URLs are canonicalised to `/contact` (OK) | Keep. Create dedicated industry pages only where proof exists (Education first) | — | — | — |

### Verified as working well (do not regress)

- Server-side rendering (Next.js App Router): full content present in initial HTML.
- One `<h1>` per page; `<html lang="fa" dir="rtl">` on Persian routes and `lang="en"` on English.
- Self-referencing canonicals per locale; reciprocal `hreflang` en / fa / x-default on every indexable page; sitemap includes `xhtml:link` alternates for all 32 URLs.
- 404 page returns **HTTP 404** with `noindex`; `/privacy` and `/terms` are `noindex, follow`.
- Trailing-slash variants redirect (`/services/` → `/services`).
- `BreadcrumbList` on inner pages; `FAQPage` on pages with FAQs (content must be fixed — TA-04).
- Desktop lab measurement on `/fa/services/ai-automation`: **LCP ≈ 1.74 s** (element: H1), **CLS 0**, TTFB ≈ 0.86 s. *Lab, single run, desktop, non-Iranian location — not field data.*

### International SEO notes

- `x-default` points to English. Acceptable, but if the business is Iran-first, `x-default` → `/fa` is defensible; it only affects users whose language matches neither. Low priority — decide with the market question in Master §19.
- Persian and English pages are full translations (not duplicated content). Keep separate keyword targeting per language; do **not** translate Persian keyword pages literally into English.

### Not verified (needs access)

Search Console coverage/indexing, real Core Web Vitals (CrUX), mobile rendering on device, orphan pages via crawl, server log crawl stats, redirect status codes on production, form submission handling.
