# SEO implementation notes

Phase A (discovery). Started 2026-10-23. Nothing in the site code has changed yet.

- **Branch:** `seo/implementation`. It starts from `font/rooyin` @ `c81018d`: Sina's redesign plus the Rooyin font with the Regular-weight fix.
- **Live site:** Render serves `de8ee74` (the same work, but with Rooyin Bold), deployed from `amirhosseinbazdar/Bellona` `main`.
- **Remote:** `origin` is now `bazdaramir/Bellona`.

## 1. How the findings were verified

The research pack (dated 2026-10-21/22) audited an **older build**. Every finding below was re-checked against the current code and against a local production build (`next build && next start`, port 3100).

The read-only scripts (in the agent's scratchpad, not the repo) did the following:
- fetched all 64 sitemap URLs;
- read status, `<title>`, meta description, canonical, hreflang, robots meta, H1s, JSON-LD types, `[...]` tokens in visible text, meta and JSON-LD string values, `<img>` alt, HTML size and inline-SVG count;
- requested the 12 old industry URLs plus kebab-case variants.

## 2. Repository map

| Area | Where | Notes |
|---|---|---|
| Framework | Next.js **16.4.2** (App Router, Turbopack), React 19.3, TypeScript 6, Tailwind 4 | `package.json` scripts: `dev`, `build`, `start`, `lint`. **No test runner, no type-check script, no CI** (`.github/` does not exist). Type-check = `npx tsc --noEmit`. |
| Routing / i18n | `app/(en)/…` and `app/(fa)/fa/…` (two root layouts); `lib/i18n.ts` (`getDict`, `localePath`) | EN at `/`, FA at `/fa`. Every route has a thin wrapper in both groups ("generated route wrapper") that calls a page component. |
| Page components | `components/pages/HomePage.tsx`, `OtherPages.tsx` (partner, industries, industry, work, case study, about, contact, legal, offers), `ServicePages.tsx` (services hub, pillar page) | |
| Sections | `components/sections/*` | Includes Sina's new `Offers.tsx`, `System.tsx` and `Who.tsx` (ClientMarquee). |
| Copy | `content/en.ts`, `content/fa.ts` (typed by `content/types.ts`); projects `content/work.ts`; owner TODOs `content/TODO-OWNER.md`; positioning `content/STRATEGY.md` | Placeholders are written `[LIKE THIS]` by design. |
| Metadata | `lib/metadata.ts` → `pageMetadata()` (canonical, hreflang en/fa/x-default=en, OG via `/api/og`, Twitter, robots) and `baseMetadata()` (title template `%s · Bellona/بلونا`) | Called from each route's `generateMetadata`. |
| JSON-LD | `components/JsonLd.tsx`: `ProfessionalServiceLd` (rendered **on every page** by `components/SiteShell.tsx:38`, with the full `OfferCatalog`), `FaqLd` (already skips answers containing `[`), `BreadcrumbLd` | |
| Sitemap | `app/sitemap.ts` | `lastModified: new Date()`, i.e. request time (TA-13 confirmed). 64 URLs, alternates included. |
| Robots | `app/robots.ts` | `User-Agent: * Allow: / Disallow: /api/` + **`Host:` line** (TA-14 confirmed). **No user-agent or host logic**, so the `Disallow: /` the research saw once was not produced by this code. It was probably an older deploy or the Render cold-start page. |
| Redirects | `next.config.ts` `redirects()` | Already permanent (308). See §4. |
| Middleware | none | In Next 16, middleware is called **`proxy.ts`** (root, `export function proxy`). P0-04 will use that. |
| Fonts | `app/fonts.ts` → files in `app/fonts/` | EN: Jakarta (variable), JetBrains Mono. FA: **Rooyin Regular** (display) + **Estedad 400/500/600/700/800/900** (six weights, not five as the research says). |
| Images | `next/image`; covers in `public/work/<slug>/` | |
| Contact form | `components/ContactForm.tsx`, `app/actions/contact.ts`, `lib/lead.ts` | Webhook → Resend → local store (`LEAD_STORE_DIR`). |
| OG images | `app/api/og/route.tsx` | |

## 3. Backlog task → file mapping (current code)

| Task | Status in current code | Files to change |
|---|---|---|
| **P0-01 / G-01** placeholders | **Open.** `[24 h]` / «[۲۴ ساعت]» in the shared contact block (`contact.sub`) on 62/64 sitemap pages, in the form success message, and in `meta.contact.description` (meta/OG/Twitter on `/contact`). About origin story (EN+FA). FAQs: website-design (CMS, `[TYPICAL RANGE]`), full-stack (stack, ownership, take-over), marketing (2), biz-dev (1). **Also, not in the research:** `/privacy` and `/terms` body text (`[OWNER TO SUPPLY…]`), linked from the footer on every page; `Engage` price placeholders (`[PRICE]`…, data only, not rendered); `placeholderImage` (only shown for a project without cover or model; none today). | `content/en.ts`, `content/fa.ts` (and possibly `content/types.ts` if a FAQ is removed) |
| P0-01 typo «برزرو» | **Already fixed.** The string no longer exists; the header reads «رزرو بررسی رایگان». | none |
| P0-02 deploy to bellonaagency.com | Ops | none |
| **P0-03** old URLs | **Mostly done.** `/industries/{finance,healthcare,consulting}` and `/fa/…` → 308 → `/industries` (single hop). `realEstate` → 308 → `/industries/real-estate`. `ecommerce` and `education` now return **200**, because real industry pages exist at those exact paths. | `next.config.ts` (only if you want a different target); add the checks to `seo:check` |
| **P0-04** non-production host | Open | new `proxy.ts` behind an env flag (e.g. `CANONICAL_HOST_REDIRECT=1`); `app/robots.ts` (drop `host`) |
| P0-05 GSC/Bing | Ops/Team | none |
| **P0-06** unsupported claims | **Mostly done** in Sina's redesign (100+, 80%, 3X, 200+, 90 days are gone). Left: "run operations **24/7**" (`content/en.ts:356` + FA twin) and the compare row "24/7 for automated operations" (`en.ts:674`, used by `Compare` on `/partner`). | `content/en.ts`, `content/fa.ts` |
| P1-01 titles/meta | Open. Titles are short and generic (e.g. `Services · Bellona`, `طراحی سایت · بلونا`); no duplicates. | `content/{en,fa}.ts` `meta.*` and per-pillar meta |
| P1-02 keyword H1s | Open. Service-page H1s are slogans (e.g. «سیستم‌هایی که کار می‌کنند وقتی تو خوابی.»). Industry H1s are just the sector name. | `content/{en,fa}.ts` `pillars.items[].page.h1`, industries; `components/ui.tsx` `PageHero` if the slogan moves to a sub-line |
| P1-03…05 expand service pages | Open (EN 391–977 words, FA 419–1,009 words incl. shared blocks) | `content/{en,fa}.ts`, `content/types.ts`, `components/pages/ServicePages.tsx` |
| P1-06 case-study outcomes | Partly. 15 case studies; results only where sourced (Dane, AI-RE OS). | `content/work.ts`, `components/pages/OtherPages.tsx` `CaseStudyPage` |
| **P1-07** internal links | **Mostly done**: each service page has "Projects in this service" (`ServicePages.tsx` `PillarWork`); case studies link their services + industry; industry pages list their case studies; Codechee is on the home page. **Missing:** service links in the footer. | `components/Footer.tsx` |
| P1-08 / G-03 entity schema | Open. `ProfessionalServiceLd` already has `@id`, `alternateName` (one value), `founder`/`employee` Persons, `sameAs` (Instagram), but a Gmail address, no `areaServed`, and the full `OfferCatalog` on every page, including legal pages. | `components/JsonLd.tsx`, `components/SiteShell.tsx`, home/service page components |
| P1-09…11 new spoke pages | Open | new `app/(en)/services/[slug]/[sub]/page.tsx` + FA twin, content, `app/sitemap.ts` |
| P1-12 education page | **Exists** (`/industries/education`, ~470 words, 6 case studies) → expand rather than create | `components/pages/OtherPages.tsx` `IndustryPage`, content |
| P1-13 guides | Open | new `app/(…)/guides/…`, content module, `Article` JSON-LD |
| G-02 AI crawler rules | Open | `app/robots.ts` |
| G-04 answer-first sections | Open | content + a small Q&A section component |
| G-05 dates and bylines | Open (guides only) | guides components |
| G-06 facts module | Open | new `content/facts.ts` |
| G-07 "how did you hear" | Open (needs approval) | `ContactForm.tsx`, `lib/lead.ts`, `app/actions/contact.ts` |
| P2-05 HTML weight | Open. `/` 433 KB / `/fa` 451 KB HTML with **112** inline `<svg>` (voxel art, icons); service pages 150–250 KB. | `components/voxel/Voxel.tsx`, `components/Icon.tsx`, sections |
| P2-05 sitemap lastmod | Open | `app/sitemap.ts` |
| P2-06 alt text | Open. Card images (`ProjectCard`) use `alt=""` (32 of 34 images on `/work`); gallery alts are "‹title› 2/3". | `components/sections/Work.tsx`, `components/pages/OtherPages.tsx`, `content/work.ts` |
| P2-07 booking CTA | `BOOKING_URL` unset, so "رزرو بررسی رایگان" goes to `/contact` | needs a decision |

## 4. Discrepancies between the research and the current code

| # | Research says | Current code / build | Decision |
|---|---|---|---|
| D1 | 32 indexable URLs; 4 case studies | **64** sitemap URLs: adds `/offers`, 4 industry pages (real-estate, education, ecommerce, media), 15 case studies (Bellona v1 removed) | Plan against the current inventory |
| D2 | «برزرو» typo | Fixed | Close TA-05 |
| D3 | Unsupported stats 100+, 80%, 3X, 200+, 90 days | Removed (redesign); "24/7" remains | P0-06 shrinks to the 24/7 wording |
| D4 | Budget brackets <50M…>200M in the form | **Removed** from the form on owner request (2026-10-22) | Cost-guide briefs that say "use Bellona's own brackets" need **fresh** price ranges from the team |
| D5 | Old `/industries/education` and `/ecommerce` → redirect | They are now real pages (200), so no redirect is needed | Keep; old URLs land on the right page in zero hops |
| D6 | Codechee missing from home; services not linked to case studies | Both done | Close TA-10/TA-11 except footer links |
| D7 | `robots.txt` sometimes `Disallow: /` | Code is unconditional `Allow`; no host/UA logic | Treat as a past deploy; keep the check in `seo:check` |
| D8 | 74 inline SVGs, ~508 KB | 112 SVGs, 433–451 KB | Still worth P2-05 |
| D9 | 5 Estedad weights | 6 Estedad weights + Rooyin + Jakarta + JetBrains | Font trimming needs your sign-off (rule 4) |
| D10 | Placeholders on 9 of 10 pages | Confirmed, plus **privacy/terms body** (not in sitemap, linked from the footer) | `seo:check` must also crawl footer-linked pages, not only the sitemap |
| D11 | — | `/offers` (new) has a promises block and offer details flagged in `TODO-OWNER.md` as "confirm before launch" | Added to the questions |
| D12 | Next.js "middleware" | Next 16 uses `proxy.ts` | Use `proxy.ts` |

## 5. Implementable now, without new facts (once you approve Phase B)

- `seo:check` script (the placeholder guard plus all §4 validations), crawling the sitemap **and** footer-linked pages.
- P0-04 `proxy.ts` behind an env flag (off by default); drop the `Host:` line.
- G-02 explicit AI-search crawler groups (training bots left as they are until you decide).
- Sitemap `lastModified` from git commit dates of the source files (or omit it).
- Footer service links.
- Schema hygiene: full entity on the home page only; other pages reference `@id`; no `OfferCatalog` on legal pages; `Service` only on its own service page.
- Descriptive alt text from existing project titles and sectors (no new claims).
- **Placeholder removal when there is no answer yet:** delete the affected Q&A or sentence in both locales. Proposed defaults, for your confirmation:
  - drop "We reply within [24 h]";
  - drop the about origin-story paragraph;
  - drop the six unanswered FAQs;
  - legal pages: keep `noindex`, but they still need real text. Until then, remove the footer links and do not ship the bracketed body.

---

## 6. Phase B log (2026-10-23)

| Commit | Task | What changed | Validation |
|---|---|---|---|
| `5de5bac` | P0-01 / G-01 tooling | `scripts/seo-check.mjs` + `npm run seo:check`. It starts `next start` on the production build, or uses `SEO_CHECK_BASE`. Errors: status, one H1, unique title and description, self-canonical, reciprocal hreflang, lang/dir, noindex in the sitemap, JSON-LD parses, placeholders in text/meta/JSON-LD (sitemap, every linked page and the legal pages), internal 404s, old URLs single-hop 301/308, robots sanity. Warnings: empty content-image alt, links to redirects. | Baseline on the pre-change build: **81 errors** (80 placeholders, Host line) and 64 warnings (alt) |
| `78c6c1d` | P0-01 | Placeholders removed in EN+FA: the reply time (contact block, form success, `/contact` meta), the about origin story, unanswered FAQs (website CMS; full-stack ×3; marketing ×2; biz-dev markets), the `[TYPICAL RANGE]` token. Pillar pages with no FAQs left hide the FAQ block (and its JSON-LD). Legal pages get interim text without placeholders; their footer and form links are hidden behind `legalPagesPublished` in `lib/site.ts`. | Build ✓ · lint ✓ · tsc ✓ · seo:check 1 error (Host) · the legal pages' visible text checked directly: no tokens |
| `288a9b3` | P0-04 | `proxy.ts`, off unless `CANONICAL_HOST_MODE=redirect\|noindex`. The robots `Host:` line is removed. `.env.example` documented. | Off, `redirect` and `noindex` each tested against Render, canonical, `www` and localhost hosts, plus `X-Forwarded-Host` · seo:check **0 errors** |
| — | P0-03 | No change needed: finance/healthcare/consulting → 308 → `/industries`; `realEstate` → 308 → `/industries/real-estate`; `ecommerce`/`education` are live pages (200), both locales. | seo:check checks all 12 old URLs on every run |
| — | P0-06 | No change. Remaining "24/7" / "around the clock" / «۲۴ ساعته» wording (`en.ts` 351, 356, 358, 363, 662, 971 and the FA twins) describes automations running continuously, not a performance statistic. Unsupported numbers were already removed by the redesign. | Waiting for the team's answer to question 12 |

### Decisions

- **Legal pages:** kept reachable and `noindex`, with an honest interim note and the contact email. They are **unlinked** until the real texts exist. To publish: put the texts in `content/{en,fa}.ts` `pages.legal`, then set `legalPagesPublished = true` in `lib/site.ts`.
- **Form success copy:** "Got it. Thanks, we'll be in touch." / «دریافت شد. ممنون؛ با شما تماس می‌گیریم.» This promises no specific time until question 1 is answered.
- **Render health check at cutover:** Render health-checks `/`. In `redirect` mode the Render host returns a 301. Whether Render counts a 3xx as healthy was **not verified here**; check the service dashboard right after you enable the flag; if the check fails, use `noindex` mode instead.
- **Not in scope yet:** `Engage` price placeholders (`[PRICE]`…) are data only, not rendered (pricing removed). `placeholderImage` only renders for a project without a cover or model (none today). seo:check would catch either if it appeared.

### Still open after Phase B

- Image alt text: 64 warnings, all from `alt=""` on project images (Phase E, P2-06).
- Every answer in `QUESTIONS_FOR_TEAM.md` (removed content returns once answered).
- Ops: P0-02 cutover, P0-05 GSC/Bing, and turning on `CANONICAL_HOST_MODE` at cutover.

---

## 7. Phase C log (2026-10-23)

| Commit | Task | What changed | Validation |
|---|---|---|---|
| `d2a0bf2` | P1-01, P1-02 | **Titles:** a per-locale `seo` map in `content/{en,fa}.ts`, keyed by path, overrides `<title>`/description in `pageMetadata()`, so the short `meta.*` labels (breadcrumbs, nav, aria) stay as they are. Service-page `metaTitle`s rewritten. Industry pages get titles and descriptions built from their real work. Case studies use "Project: sector" (above ~50 characters only the specific sector part). Home title rewritten. About and contact avoid repeating the brand. **H1s:** service pages get keyword H1s, and the former slogan stays as a non-heading `tagline` under it (`PageHero`). Industry pages get keyword H1s, with the sector name in the eyebrow. Home keeps its brand H1 and names «آژانس بلونا» / "Bellona Agency" in the first paragraph. | Every title is 31–65 characters, all unique · 1 H1 per page · screenshots EN/FA at 1280 and 360 |
| `73b3156` | P1-07 | Footer "Services" row linking all 5 service pages (both locales). | Every page links every service page (seo:check) |
| `ce26e8a` | G-02 | robots.txt: explicit `Allow: /` group for OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User. Training bots not named, so they stay allowed under `*`. | robots.txt output checked |
| `c79e35d` | P1-08, G-03 | `ProfessionalService` entity (with `OfferCatalog`) on the home pages only; `alternateName` [بلونا, آژانس بلونا, Bellona Agency]; founders/employees as `Person`, with `affiliation` Sharif University only where the visible bio says so. `WebSite` node on every page (`publisher` → entity `@id`). `Service` node on each service page only (`provider` → `@id`). | JSON-LD parses on all pages · placement rules in seo:check |
| `b1c4a0b` | TA-13 | Sitemap `lastmod` = last git commit touching the page's sources; omitted if git is unavailable. | Stable across fetches · no future dates |
| `d470cf4` | tooling | seo:check enforces all of the above, plus a warning for titles outside ~30–65 characters. | Old build: flagged (no WebSite, entity on 62 pages, missing links, etc.) · Phase C build: **0 errors**, 64 alt warnings |

Commands run for the batch: `npm run build` ✓ · `npm run lint` ✓ · `npx tsc --noEmit` ✓ · `npm run seo:check` ✓ (0 errors).

### Decisions (Phase C)

- **Website-design H1:** the architecture proposes «طراحی سایت اختصاصی که بازدیدکننده را مشتری می‌کند». With the slogan kept as the sub-line («سایت‌هایی که بازدیدکننده را به مشتری تبدیل می‌کنند»), that would say the same thing twice. So the H1 is the keyword phrase «طراحی سایت اختصاصی و دوزبانه», which keeps the primary keyword. The other service H1s follow the architecture table.
- **Hub pages** (services, offers, partner, industries hub, work, about, contact) keep their slogan H1s; only their titles became keyword-bearing. P1-02 covers service and industry pages, and changing hub H1s is a copy decision for the team.
- **Home:** brand H1 kept (architecture recommendation). The «آژانس بلونا» mention in the first paragraph is reversible if the answer to question 16 says otherwise.
- **OfferCatalog** stays on the home entity, as the organisation's own service list, and is gone everywhere else (legal pages included). The `WebSite` node is how every page references the entity.
- **Entity description** is still the existing home meta description until the team approves an entity statement (question 23). Founder affiliation follows the visible team bios (question 28).
- **lastmod granularity:** every page depends on its language's copy file, so any copy edit moves the date of every page in that language. Render's build clone depth is unknown: if it is shallow, all dates equal the deployed commit's date. That is still honest; if git is unavailable, lastmod is omitted.

### Still open after Phase C

- Alt text (64 warnings): Phase E, P2-06.
- Entity statement, areaServed, contact details, founders' LinkedIn: questions 23–28.
- Content depth, answer-first sections, the facts module and new pages: Phase D (most items need facts).

---

## 8. Phase D log (2026-10-24)

| Commit | Task | What changed | Validation |
|---|---|---|---|
| `13c2dd5` | G-06 | `content/facts.ts`: every stated figure in one module, with its evidence. Timelines are the automation sprint (2–4 weeks) and complex agent systems (4–6 weeks). Counts are team and languages. Project figures are the real-estate system (12 workflows, 7 CRM tables) and Dane (278 posts, 105 topics…). Prices, reply time, website timelines and support period are `null`. The copy and case studies read these through locale formatters; the "projects shipped" stat is computed from `work.ts`. | The rendered text on the affected pages was compared and matches the previous build |
| `36c3ecf` | G-04 | `components/sections/Answers.tsx`: a question H2, a direct answer (`data-answer`), then steps (`<ol>`, Persian numbering in RTL), a table or links. Unconfirmed answers are hidden on published pages and shown as a "needs answer to question N" note in drafts. | Draft build screenshots |
| `7df6547` | P1-09…11, P1-13, G-05 | `content/spokes.ts` holds answer-first drafts (EN+FA) for the AI-agents, n8n and Next.js spokes, the guides hub and the two cost guides. `lib/drafts.ts`: routes exist only in `SHOW_DRAFTS=1` builds (noindex + banner). Guides get a byline, a visible "last updated" date and `Article` JSON-LD once `author` and `updated` are set. | Production: all 12 draft URLs **404**, none in the sitemap. Draft build: 12 pages 200, noindex, one H1, answers 35–58 words, 0 placeholders |
| `b7498ff` | P1-07 | Published spokes go into the sitemap and are linked from their pillar ("Go deeper"); the guides hub joins once a guide is published. | Nothing changes today (all drafts) |
| `0dcc1af` | tooling | seo:check warns when a direct answer is outside ~25–90 words. | Production seo:check: **0 errors** |

Commands: `npm run build` (production and `SHOW_DRAFTS=1`) ✓ · `npm run lint` ✓ · `npx tsc --noEmit` ✓ · `npm run seo:check` ✓.

### How to publish a draft page

1. Answer the questions listed in its banner (`needs` and each `a: null` in `content/spokes.ts`). Put numbers in `content/facts.ts` and the wording in the answer, in both languages.
2. Guides only: set `updated` (ISO date) and `author` (a team member's name).
3. Change `status` to `"published"`. It then gets a route in production, joins the sitemap and is linked from its pillar page (guides: from `/guides`).
4. Run `npm run build && npm run seo:check`.

To preview drafts, build with `SHOW_DRAFTS=1` (for example in a separate Render preview service). Never set it on production.

### Still open after Phase D

- Every `a: null` answer: questions 3, 4, 19, 20, 30, 31, 32, 33.
- Expanding the existing service pages (P1-03…05) and case-study outcomes (P1-06): they need the same facts.
- The education page (P1-12) exists; answer-first sections can be added once outcomes are supplied.
- Phase E (alt text, HTML weight, fonts) and Phase F (form field) are not started.
