# Prompt for Claude Code — Bellona SEO + GEO + AEO implementation

> **How to use:** put this whole research folder in the website repository at `docs/seo/` (all `.md` files and `seo_keyword_database.csv`), open Claude Code in the repo, and paste everything below the line.

---

You are a senior technical SEO engineer and content-systems developer working in the repository of **Bellona** (بلونا), a small team offering website design, full-stack/product development, AI agents & automation, marketing & growth, and business development. The site is **Next.js (App Router)**, bilingual: English at `/`, Persian (RTL) at `/fa`. The new build is currently deployed at `https://bellona-web.onrender.com`; the canonical production domain is `https://bellonaagency.com`.

Your job: implement the SEO, GEO (generative-engine / AI-search) and AEO (answer-engine) improvements defined in the research pack in `docs/seo/`, safely and in small verified batches.

## 0. Source of truth — read first, completely

Read every file before changing code:

1. `docs/seo/SEO_MASTER_RESEARCH_REPORT.md` — context, findings, the "Instructions for the Claude Code Implementation Agent" section (binding).
2. `docs/seo/SEO_IMPLEMENTATION_BACKLOG.md` — task IDs P0-*, P1-*, P2-*, P3-*, G-* with acceptance criteria.
3. `docs/seo/SEO_TECHNICAL_AUDIT.md` — TA-01…TA-23.
4. `docs/seo/SEO_GEO_AEO_AUDIT.md` — AI-search crawler policy, entity, answer-first content.
5. `docs/seo/SEO_SITE_ARCHITECTURE.md` — URLs, titles/H1s, internal links, cannibalisation rules, redirect map.
6. `docs/seo/SEO_CONTENT_ROADMAP.md` — page assessments and content briefs.
7. `docs/seo/SEO_KEYWORD_DATABASE.md` and `docs/seo/seo_keyword_database.csv` — clusters and target pages.

If a file is missing, stop and tell me which one.

## 1. Non-negotiable rules

1. **Never invent business facts** — prices, timelines, client results, statistics, founding year, address, phone, tech stack, ownership terms, supported tools, testimonials. If a task needs a fact you don't have, add it to `docs/seo/QUESTIONS_FOR_TEAM.md` and skip or stub the task **without shipping placeholder text**.
2. **No visible placeholders ever.** Any `[...]`-style template token in rendered copy, metadata, OG tags or JSON-LD is a release blocker. If a Q&A has no real answer, remove it from both locales and from schema.
3. **Do not deploy, push to a remote, change DNS/hosting, or submit anything to Search Console/Bing** without my explicit written approval. Work on a branch; commit locally.
4. Don't rebuild the site or change design system, animations, layout, colours, fonts (except the font-weight trimming task when approved), form logic, or unrelated features.
5. Preserve: RTL correctness on `/fa`, accessibility, responsiveness, existing URL structure, existing hreflang pairing (every new page exists in both locales unless I decide otherwise).
6. Don't create thin or duplicate-intent pages. Follow the cannibalisation rules in `SEO_SITE_ARCHITECTURE.md`.
7. Persian copy must be natural, correct Persian with proper half-spaces (نیم‌فاصله) and Persian digits where the site already uses them. Don't machine-translate English copy line by line.
8. Never claim rankings, indexing, AI citations, traffic or leads improved without post-deployment evidence.
9. Where research recommendations conflict with what you find in code, re-verify, prefer the stronger evidence, and log the decision in `docs/seo/IMPLEMENTATION_NOTES.md`.

## 2. Key findings you are acting on (summary — details in the pack)

- **TA-01 / P0-02:** All canonicals, hreflang and the sitemap point to `bellonaagency.com`, which still serves an old site. Cutover is an ops task (needs my approval) — you prepare everything so the build is launch-ready.
- **TA-04 / P0-01 / G-01:** Visible placeholders on 9 of 10 pages checked, both locales: "[24 h]" / «[۲۴ ساعت]» in the shared contact block and the `/contact` meta/OG/Twitter descriptions; About origin-story placeholder (EN + FA); full-stack FAQ (stack, code ownership, take-over — EN + FA); website-design FAQ (CMS) and «[بازه‌ی معمول]»; marketing FAQ (2); business-development FAQ (1). JSON-LD already excludes placeholder Q&As — keep that behaviour.
- **TA-05:** Persian header CTA typo «برزرو» → «رزرو».
- **TA-02 / P0-03:** Old production URLs to redirect permanently: `/industries/{realEstate,finance,healthcare,ecommerce,consulting,education}` and `/fa/industries/...` (camelCase and kebab-case) → `/industries` / `/fa/industries`, or to `/industries/education` once that page exists. The current `/industries/realEstate` redirect's status code is unverified — make it 308/301.
- **TA-03 / P0-04:** Render host must 301 to production (or send `X-Robots-Tag: noindex`) once production is live; robots behaviour was inconsistent between fetches — inspect `app/robots.ts` for host/user-agent logic.
- **TA-07/08 / P1-01/02:** Slogan H1s and generic titles. Target titles and H1s are in `SEO_SITE_ARCHITECTURE.md`.
- **TA-09:** Service pages ~300–400 words (AI ~1,100) vs competitors 1,000–3,300.
- **TA-10/11/12:** Case studies not linked from service pages; Codechee missing from home "Recent work"; weak image alt text.
- **TA-13/14/15/16/17/19/20:** sitemap `lastmod` = request time; non-standard `Host:` line in robots; sitewide OfferCatalog on every page; weak entity schema (Gmail, no `sameAs`, no founders); ~508 KB HTML on `/` and `/fa` (74 inline SVGs); five Estedad font weights.
- **GEO/AEO:** site is server-rendered (good) and allows all crawlers (good). Gaps: no explicit AI-search crawler rules, brand ambiguity ("Bellona"/«بلونا» collide with an NGO, furniture and clothing brands), no question-shaped answer sections, no extractable price/timeline facts, no dates or author bylines, unsupported statistics (100+ automations, 80% time saved, 3x productivity).

## 3. Work plan — execute in this order

### Phase A — Discovery (no edits)
- Map the repo: Next.js version, `app/` route tree, i18n mechanism and where EN/FA copy lives, `generateMetadata`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD components, `next.config.*` redirects, `middleware.*`, image components, fonts, scripts in `package.json`, tests/CI.
- Map every backlog task (P0, P1, G) to concrete files.
- Write `docs/seo/IMPLEMENTATION_NOTES.md` (repo map + task→file mapping + discrepancies with the research).
- Write `docs/seo/QUESTIONS_FOR_TEAM.md` with every missing fact, grouped by task ID, in **Persian and English** (start from Master report §19).
- Show me both files and **wait for my go-ahead** before Phase B.

### Phase B — Launch blockers (P0, G-01)
1. Placeholder guard: a script `scripts/seo-check.(ts|mjs)` that builds/starts the app (or reads build output), fetches every sitemap URL, and fails if rendered text, `<meta>` content or JSON-LD contains `\[[^\]]{2,}\]` (ignore Markdown links/code). Wire it into `npm run seo:check` and CI if CI exists.
2. Replace placeholders with answers from `QUESTIONS_FOR_TEAM.md` once I've filled them; otherwise remove the affected Q&A/sentence in both locales. Contact reply time: remove the bracketed value until confirmed.
3. Fix «برزرو».
4. Redirects (P0-03) in `next.config` `redirects()` with `permanent: true`, both locales, both slug casings.
5. Host handling (P0-04): host-aware middleware or config — production host: normal; any other host: 301 to `https://bellonaagency.com` + same path (behind an env flag so I can enable it at cutover). Ensure production `robots.txt` is unconditional `Allow`.
6. Unsupported claims (P0-06): replace with team-supplied evidence or neutral wording; list each change.

### Phase C — On-page SEO quick wins (P1-01, P1-02, P1-07, P1-08, G-02, G-03)
- Titles/meta descriptions per `SEO_SITE_ARCHITECTURE.md` (EN + FA), unique, ≈50–60 chars, brand last.
- One keyword-bearing H1 per page; keep slogans as non-heading text.
- Internal links: services ↔ case studies ↔ industry page; service links in footer; Codechee on home; descriptive anchors (no «اینجا»/"click here").
- `robots.ts`: explicit Allow groups for `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`; remove `Host:` line; training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) per the team's answer in `QUESTIONS_FOR_TEAM.md` (default: leave allowed; never block without approval).
- Entity: one entity statement (EN/FA) stored once and reused in home intro, about, footer, Organization schema `description`. Organization/ProfessionalService on the homepage with `@id`, `alternateName` ["بلونا","آژانس بلونا","Bellona Agency"], `founder` Persons, `areaServed`, `knowsAbout`, `sameAs` — only verified values. Other pages reference the `@id`; `Service` schema only on its own service page; remove the full OfferCatalog from privacy/terms and non-service pages.
- `sitemap.ts`: real `lastModified` per page (content file mtime or git date) or omit.

### Phase D — Content upgrades and new pages (P1-03…P1-06, P1-09…P1-13, G-04, G-05, G-06)
- Build a single **facts module** (e.g. `content/facts.ts`) for prices, timelines, counts, reply time — consumed by pages, FAQs and schema (G-06).
- Expand existing service pages and create new pages exactly per the briefs in `SEO_CONTENT_ROADMAP.md`: `/fa/services/ai-automation/ai-agents`, `/fa/services/ai-automation/n8n`, `/fa/services/website-design/nextjs`, `/fa/industries/education`, `/fa/guides` + `website-design-cost` + `ai-agent-cost` (and EN mirrors). Add them to the sitemap with hreflang pairs and to navigation/hub pages.
- **AEO pattern (G-04)** on every P1 page: ≥4 question-shaped H2/H3s using real search phrasing from the keyword CSV; under each, a direct answer of ~40–60 words in the first paragraph, then details; use `<ol>` for processes and `<table>` with header rows for prices/comparisons; short definition paragraph at the top of spoke pages.
- Guides: visible «آخرین به‌روزرسانی» / "Last updated" date, `Article` schema with `datePublished`/`dateModified`, author byline (team member) with `Person` schema (G-05).
- Case-study pages: outcomes block (problem → approach → stack → timeline → result → services used) — results only from the team.
- Where copy facts are missing: draft structure + non-factual copy, put every missing fact in `QUESTIONS_FOR_TEAM.md`, **do not publish the page** (keep it unlinked and out of the sitemap, or behind a draft flag) until facts are supplied.

### Phase E — Technical refinements (P2-05, P2-06, P2-07)
- Reduce HTML weight of `/` and `/fa` (shared SVG sprite/components, check duplicated RSC payload), trim Persian font weights to what the design actually uses (show me the diff before changing fonts), descriptive alt text in each locale, fix the "Book a call" CTA per my decision.

### Phase F — Measurement hooks (G-07)
- Add an optional "How did you hear about us?" field (incl. "Google", "Instagram", "AI assistant (ChatGPT, Gemini…)", "Referral", "Other") to the contact form in both locales, stored with the lead — only after I approve the form change.

## 4. Validation after every batch

Run and report results:
- `install`, `build`, `lint`, type-check, tests (whatever the repo defines).
- `npm run seo:check` (create it) covering, for every sitemap URL in both locales: HTTP 200; exactly one `<h1>`; non-empty unique `<title>` and meta description; self-canonical on `https://bellonaagency.com`; reciprocal hreflang `en`/`fa`/`x-default`; `lang`/`dir` correct; no placeholder tokens; JSON-LD parses and has no placeholder text; no internal links to 404s; images have non-empty alt unless decorative (`alt=""` + `aria-hidden`); redirects for the old URLs return 301/308 in a single hop.
- Spot-check rendered HTML (view-source equivalent) to confirm content is server-rendered (no client-only copy).
- Validate JSON-LD with a schema validator library or the logic in `seo:check`.

## 5. Commits and reporting

- Small commits, one logical change each, message prefixed with the task ID (e.g. `P0-01: remove contact reply-time placeholder`).
- Maintain `docs/seo/IMPLEMENTATION_NOTES.md` as you go.
- At the end of each phase, give me: tasks done (IDs), files changed, commands run + results, open questions, anything blocked.
- Final deliverable `docs/seo/IMPLEMENTATION_REPORT.md`: completed tasks, files changed, tests run, validation evidence, remaining tasks (with owner: code / team / ops), and the post-launch monitoring checklist (GSC weeks 1/2/4/8, Bing Webmaster, monthly AI prompt-set from `SEO_GEO_AEO_AUDIT.md` §5).

## 6. Things that need me (stop and ask)

- Any business fact (see rule 1).
- Decision on AI **training** crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`).
- Publishing price ranges.
- Font, form, or CTA behaviour changes.
- Deployment, domain cutover, enabling the Render→production redirect flag, Search Console / Bing submissions.

Start with **Phase A** now.
