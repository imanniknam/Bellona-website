# Bellona — SEO Implementation Backlog

Research date: **2026-10-21** · Effort: **S** ≤ ½ day, **M** 1–3 days, **L** > 3 days of implementation work (estimates, not measured; excludes waiting for the team's facts or approvals).
Back to: [Master report](SEO_MASTER_RESEARCH_REPORT.md) · Evidence: [Technical audit](SEO_TECHNICAL_AUDIT.md), [Architecture](SEO_SITE_ARCHITECTURE.md), [Content roadmap](SEO_CONTENT_ROADMAP.md)

Legend — **Code** = Claude Code can implement in the repo · **Team** = needs facts/approval/credentials from Bellona · **Ops** = hosting/DNS/GSC access.

## Milestones

| Milestone | Contains | Exit criterion |
|---|---|---|
| M0 — Launch-ready | P0-01 … P0-06 | New site live on bellonaagency.com, no placeholders, old URLs redirected, GSC verified |
| M1 — Money pages | P1-01 … P1-08 | Core service pages expanded, metadata rewritten, proof linked |
| M2 — New commercial pages | P1-09 … P1-13 | AI agents, n8n, Next.js, Education, 2 cost guides live |
| M3 — Growth | P2-* | Chatbot/Instagram pages, guides, schema & performance refinements, authority work |
| M4 — Experiments | P3-* | English niche, further industries, marketing/SEO service proof |

---

## P0 — Critical blockers

### P0-01 Remove all template placeholders and typos
- **Why:** Placeholders appear in meta descriptions, OG tags, visible copy and likely in `FAQPage` JSON-LD; they damage trust and snippets.
- **Evidence:** TA-04, TA-05 (`/contact` "[24 h]", `/about` origin placeholder, 6 FAQ placeholders across FA service pages, «برزرو»).
- **URLs/templates:** shared contact block, `/about`, `/{fa/}services/*` FAQ data, header CTA.
- **Owner:** Team (answers) + Code. **Effort:** S. **Depends on:** Master §19 answers.
- **Guidance:** Find all `[`…`]` tokens in i18n/content files. Replace with supplied answers; if no answer, remove that Q&A from both locales and from JSON-LD.
- **Acceptance:** zero matches for `\[[^\]]{2,}\]` in rendered HTML of every sitemap URL (excluding markdown links); typo fixed.
- **Validation:** script that fetches each sitemap URL and greps; Rich Results Test on 2 FAQ pages.
- **Clusters:** all.

### P0-02 Deploy the new site to bellonaagency.com
- **Why:** All canonicals/hreflang/sitemap point there; it currently serves the old site. TA-01.
- **Owner:** Ops. **Effort:** M. **Depends on:** P0-01 (don't launch placeholders).
- **Guidance:** Attach custom domain to the new deployment; ensure HTTPS, `www`→apex (or reverse) 301; keep the old project available for rollback.
- **Acceptance:** `https://bellonaagency.com/fa/services/ai-automation` returns 200 with the new H1; `/robots.txt` is `Allow: /` with sitemap.
- **Validation:** `curl -sI`, view source, GSC URL Inspection (live test).

### P0-03 Redirect old URLs (301/308)
- **Why:** Indexed old industry pages must consolidate, not 404. TA-02.
- **Owner:** Code. **Effort:** S. **Depends on:** P0-02 timing; P1-12 decides Education target.
- **Guidance:** Implement in `next.config` `redirects()` (permanent: true) or middleware for EN and FA, camelCase and kebab-case. See map in [Architecture](SEO_SITE_ARCHITECTURE.md#redirect-map-for-cutover). Confirm the existing `/industries/realEstate` redirect is permanent (status code unverified).
- **Acceptance:** every old sitemap URL → single-hop 301/308 → 200.
- **Validation:** `curl -sIL` loop over the 14 old URLs.

### P0-04 Neutralise the Render host after cutover
- **Why:** Prevent a duplicate host; resolve inconsistent robots behaviour. TA-03.
- **Owner:** Code + Ops. **Effort:** S.
- **Guidance:** Host-aware middleware: if `host !== 'bellonaagency.com'` → 301 to same path on production (or `X-Robots-Tag: noindex`). Review `app/robots.ts` for user-agent/host logic and make production unconditional `Allow`.
- **Acceptance:** Render URLs 301 to production; `curl -A "Googlebot"` on production robots shows `Allow: /`.

### P0-05 Search Console & Bing Webmaster setup; baseline
- **Why:** No measurement exists. Needed for indexing requests, sitemaps, and baseline.
- **Owner:** Ops/Team. **Effort:** S.
- **Guidance:** Domain property for bellonaagency.com; submit `/sitemap.xml`; export current (old-site) performance before cutover as baseline.
- **Acceptance:** Property verified; sitemap "Success"; baseline CSV stored.

### P0-06 Replace unsupported claims or attach evidence
- **Why:** "100+ automations", "80% time savings", "3x productivity", "lower costs within 90 days" lack proof. TA-18.
- **Owner:** Team + Code. **Effort:** S.
- **Acceptance:** each figure either removed, reworded as qualified estimate, or links to a case study containing it.

---

## P1 — Highest-value opportunities

| ID | Task | Why / evidence | URLs | Effort | Depends | Acceptance | Validation | Clusters |
|---|---|---|---|---|---|---|---|---|
| P1-01 | Rewrite titles & meta descriptions (FA+EN) | Generic titles (TA-08) | All indexable | S | P0-01 | Titles per [Architecture table](SEO_SITE_ARCHITECTURE.md#keyword-to-page-mapping-and-recommended-metadata); unique; ≤ ~60 chars | View source; crawl for duplicates | all |
| P1-02 | Keyword-bearing H1s on FA service pages | Slogan H1s (TA-07) | `/fa/services/*`, `/fa/industries/*` | S | Copy approval | H1 contains primary keyword; slogan retained as non-heading text | DOM check: exactly one H1 | C1,C4,C5 |
| P1-03 | Expand `/fa/services/website-design` | ~350 words vs 1.3k–3.3k competitors (TA-09) | + EN mirror | M | Team facts | Brief 3.1 sections all present; no placeholders | Word count; checklist | C1,C1b,C3 |
| P1-04 | Expand `/fa/services/full-stack-development` + answer tech/ownership/take-over FAQs | Thin + placeholders | + EN | M | Team facts | Brief items; FAQs answered | Rich Results Test | C4,C18 |
| P1-05 | Update AI hub `/fa/services/ai-automation` | Soft SERP; needs proof & spokes | + EN | M | P0-06 | Brief 3.3; links to 4 spokes | Link audit | C5 |
| P1-06 | Case-study outcomes block on 4 projects | No results/testimonials | `/work/*` both locales | M | Client permission | Template 3.8 filled with real data | Visual + content review | proof |
| P1-07 | Service ↔ case-study ↔ industry internal links; service links in footer | TA-10, TA-11 | all templates | S | P1-06 | Each service links ≥1 case; each case links its services | Crawl internal links | all |
| P1-08 | Brand entity & schema: `alternateName`, `sameAs`, founders, `areaServed`; trim sitewide OfferCatalog; domain email | Brand collision; TA-15/16/17 | layout JSON-LD | S | Team facts | Valid schema; no errors | Schema validator | C15 |
| P1-09 | New page `/fa/services/ai-automation/ai-agents` (+EN) | C6 | new | M | P1-05 | Brief 3.4; in sitemap with hreflang | Fetch 200; sitemap | C6 |
| P1-10 | New page `/fa/services/ai-automation/n8n` (+EN) | C8 hiring intent | new | M | P1-05 | Brief 3.5 | same | C8 |
| P1-11 | New page `/fa/services/website-design/nextjs` (+EN) | C1a | new | M | P1-03 | Brief 3.2 | same | C1a |
| P1-12 | New page `/fa/industries/education` (+EN) | 3 education cases | new | M | P1-06 | Brief 3.6; old `/industries/education` redirects here | same + redirect check | C14 |
| P1-13 | `/fa/guides` hub + 2 cost guides (website, AI agent) | C2, C7 — #1 formats in SERP | new | L | Pricing approval | Briefs 3.7; `Article` schema with `dateModified` | same | C2,C7 |

## P2 — Growth & expansion

| ID | Task | Why | Effort | Depends | Acceptance |
|---|---|---|---|---|---|
| P2-01 | `/fa/services/ai-automation/ai-chatbot` | C9 SaaS-dominated; differentiate on custom/integrated | M | P1-05 | Page live, linked from hub |
| P2-02 | `/fa/services/ai-automation/instagram-automation` | C10; Iranian SMBs sell via Instagram; check platform-policy compliance | M | P1-05 | Page live |
| P2-03 | Guides: n8n vs Make vs Zapier; Next.js vs WordPress; self-hosted n8n in Iran; AI API access & data security | C17, C18 | L | P1-13 | 4 guides live, each linking one service page |
| P2-04 | Fill Marketing & Biz-dev pages; describe Partner engagement models | Thin pages | S | Team | No placeholders; models described |
| P2-05 | Performance: reduce home/fa HTML (~508 KB), trim font weights, real `lastmod`, remove `Host:` | TA-13,14,19,20 | M | — | Home HTML < ~150 KB; Lighthouse mobile ≥ baseline |
| P2-06 | Descriptive alt text on case-study and card images | TA-12 | S | — | No content image with empty/generic alt |
| P2-07 | Real booking flow or relabel CTA; add phone/messaging contact if staffed | TA-06, TA-17 | S | Team | CTA does what it says |
| P2-08 | Authority programme (see Master §14): client credit links, Sharif ecosystem, directories, Persian publications | No authority data | L (ongoing) | Case studies | Tracked list of earned links |
| P2-09 | Hosting check from Iran; move to always-on/CDN if needed | TA-21 | M | Ops | Iranian TTFB measured and documented |

## P3 — Advanced / experimental

| ID | Task | Note |
|---|---|---|
| P3-01 | English bilingual/RTL positioning page | Only after market decision (Master §19) |
| P3-02 | Further industry pages (real estate, e-commerce…) | Only when a case study exists |
| P3-03 | Marketing/SEO service proof (use Bellona's own SEO results as a case once measurable) | — |
| P3-04 | Original research: survey of Iranian SMBs on automation adoption | Linkable asset |
| P3-05 | `x-default` → `/fa` decision | After market decision |
| P3-06 | Video walkthroughs on Aparat/YouTube (video results appear in several SERPs) | Embed on relevant pages |

## GEO & AEO tasks

Details and evidence: [SEO_GEO_AEO_AUDIT.md](SEO_GEO_AEO_AUDIT.md).

| ID | Task | Pri. | Effort | Depends | Acceptance |
|---|---|---|---|---|---|
| G-01 | Remove visible placeholders | P0 | S | = P0-01 | No `[…]` tokens in rendered text of any sitemap URL |
| G-02 | Explicit AI-search crawler rules in `robots.ts` (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User → Allow); training bots per team decision | P1 | S | Team decision on training bots | `robots.txt` matches audit §4.1; production only |
| G-03 | Entity statement (FA/EN) reused on home/about/footer/schema; Organization + founder Person schema; `sameAs` | P1 | S–M | Team facts | Schema validates; identical description across surfaces |
| G-04 | Answer-first question sections (H2 question + 40–60-word answer) on service pages and new pages | P1 | M | P1-03…P1-13 | Each P1 page has ≥4 question sections with direct answers |
| G-05 | Visible "last updated" + `dateModified`; author byline + Person schema on guides | P1 | S | P1-13 | Present on every guide |
| G-06 | One source of truth for prices/timelines/counts used by pages and schema; unsupported stats removed | P1 | S | P0-06 | Values come from a single data module |
| G-07 | Contact form "How did you hear about us?" incl. AI assistants; AI referrer tracking | P2 | S | Analytics decision | Field stored with lead |
| G-08 | Monthly AI prompt-set monitoring | P2 | S | Launch | Dated results table maintained |
| G-09 | Directory/listicle profiles, LinkedIn page with identical entity text | P2 | M | G-03 | Profiles live |
| G-10 | Optional `/llms.txt` | P3 | S | Launch | Facts match site |

## Suggested order for Claude Code

P0-01 → P0-03 → P0-04 (code) → hand off P0-02/P0-05 to Ops → P1-01, P1-02, P1-07, P1-08 (quick wins) → P1-03…P1-06 as facts arrive → P1-09…P1-13 → P2.
