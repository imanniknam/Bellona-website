# Bellona — SEO Master Research Report

| | |
|---|---|
| Site | New: `https://bellona-web.onrender.com` · Canonical/production: `https://bellonaagency.com` |
| Research date | **2026-10-21** (all observations dated this day unless noted) |
| Markets | Iran (Persian) primary — *inferred, needs confirmation*; English secondary |
| Status | Research and strategy only. **No changes were made to the website or code.** |

### Report files

| File | Contents |
|---|---|
| [SEO_EXECUTIVE_SUMMARY.md](SEO_EXECUTIVE_SUMMARY.md) | One-page summary |
| [SEO_TECHNICAL_AUDIT.md](SEO_TECHNICAL_AUDIT.md) | 23 technical findings with fixes and validation |
| [SEO_COMPETITOR_ANALYSIS.md](SEO_COMPETITOR_ANALYSIS.md) | 65 commercial competitor domains + publishers/directories, 10 pages inspected |
| [SEO_KEYWORD_DATABASE.md](SEO_KEYWORD_DATABASE.md) · [seo_keyword_database.csv](seo_keyword_database.csv) | 18 clusters, 103 keywords, intent, target pages |
| [SEO_SITE_ARCHITECTURE.md](SEO_SITE_ARCHITECTURE.md) | Hierarchy, URLs, titles/H1s, internal links, cannibalisation, redirect map |
| [SEO_CONTENT_ROADMAP.md](SEO_CONTENT_ROADMAP.md) | Page assessments, gap matrix, briefs, publication waves |
| [SEO_IMPLEMENTATION_BACKLOG.md](SEO_IMPLEMENTATION_BACKLOG.md) | Ordered P0–P3 tasks with acceptance criteria, plus GEO/AEO tasks G-01…G-10 |
| [SEO_GEO_AEO_AUDIT.md](SEO_GEO_AEO_AUDIT.md) | AI search (AI Overviews, ChatGPT, Claude, Perplexity) and answer-engine audit, crawler policy, prompt monitoring |
| [CLAUDE_CODE_PROMPT.md](CLAUDE_CODE_PROMPT.md) | The prompt to give Claude Code to implement everything |

## Table of contents

1. [Executive summary](#1-executive-summary)
2. [Business and audience](#2-business-and-audience)
3. [Methodology and limitations](#3-methodology-and-limitations)
4. [Competitor landscape](#4-competitor-landscape)
5. [Detailed competitor comparisons](#5-detailed-competitor-comparisons)
6. [Keyword research methodology](#6-keyword-research-methodology)
7. [Keyword cluster inventory](#7-keyword-cluster-inventory)
8. [Search-intent analysis](#8-search-intent-analysis)
9. [SERP and ranking-opportunity analysis](#9-serp-and-ranking-opportunity-analysis)
10. [Keyword-to-page mapping](#10-keyword-to-page-mapping)
11. [Recommended architecture](#11-recommended-architecture)
12. [Technical SEO audit](#12-technical-seo-audit)
13. [Content quality and gaps](#13-content-quality-and-gaps)
14. [Backlinks and authority](#14-backlinks-and-authority)
15. [Conversion opportunities](#15-conversion-opportunities)
16. [Prioritised roadmap](#16-prioritised-roadmap)
17. [Measurement and validation](#17-measurement-and-validation)
18. [Sources and evidence](#18-sources-and-evidence)
19. [Unanswered questions and required access](#19-unanswered-questions-and-required-access)
20. [Instructions for the Claude Code Implementation Agent](#instructions-for-the-claude-code-implementation-agent)

---

## 1. Executive summary

- **P0 blocker:** the new site's canonicals, hreflang and sitemap all point to `bellonaagency.com`, which still serves the **old** site (different title and copy, AI-only positioning, thin "coming soon" industry pages that Google has indexed). Nothing on the new site can rank until it is deployed there with redirects.
- **P0 content blocker:** live template placeholders ("[24 h]", "[FOUNDING YEAR, LOCATION AND ORIGIN STORY]", six unanswered FAQ answers) in copy, meta and likely FAQ schema.
- **Foundation is solid:** SSR Next.js, correct Persian `lang/dir`, reciprocal hreflang, clean URLs, real 404s, schema, good desktop lab speed.
- **Strategy:** Persian-first, niche-first. Win AI-automation, AI-agent and n8n queries (soft SERPs) and web-design niches (Next.js, bilingual/RTL, education platforms) with deep, proof-backed pages and honest price guides. Defer head terms like «طراحی سایت».
- **Proof is the main content gap:** no case-study outcomes, no testimonials, unsupported statistics.

See [SEO_EXECUTIVE_SUMMARY.md](SEO_EXECUTIVE_SUMMARY.md).

## 2. Business and audience

### 2.1 Business overview (verified from site, 2026-10-21)

| Aspect | Finding | Type |
|---|---|---|
| Offer | One team for website design, full-stack/product, AI agents & automation, marketing & growth, business development | Verified |
| Positioning | "Build · Automate · Grow"; "one team instead of five agencies"; systems over hours; stays after launch | Verified |
| Team | 4 people — 2 co-founders, CTO, CMO; all listed as current students at Sharif University of Technology | Verified |
| Pricing | Not published; form budget brackets in toman: <50M, 50–100M, 100–200M, >200M | Verified |
| Timelines stated | Automations 2–4 weeks (simple: days; complex multi-agent 4–6 weeks); web/product "after audit" | Verified |
| Portfolio | 4 case studies — Konjed (gamified life-skills learning), Codechee (programming/AI learning through play), Microshamim (innovation micro-factory for young women), Nira Perfume (fragrance retail) | Verified |
| Tools named | n8n, Make, Zapier, HubSpot, Salesforce, Slack; "200+ platforms" | Verified |
| Claims | 100+ automations, 24/7, 80% time savings, 3x productivity, savings in 90 days | Verified as *claims*; **unsubstantiated** |
| Contact | Gmail address, Instagram @bellona.ai; no phone/address; form + "book a call" link to the same page | Verified |
| Geography | Not stated. Toman pricing → Iran. Location of the team unknown. | Inference |
| Acquisition channels | Instagram linked; no blog; no other socials | Observation |

### 2.2 Personas (hypotheses — no CRM, interviews or analytics available)

| Persona | Needs / pains | Triggers | Objections | Evaluation criteria | Likely searches |
|---|---|---|---|---|---|
| **P1 — Iranian SMB owner/manager** (services, retail, clinics, real estate) | Too much manual follow-up; leads lost in Instagram DMs/phone; site that doesn't sell | Hiring cost, lost leads, competitor launches site/bot | Price; "will AI work in Iran / with sanctions?"; data safety; support after launch | Price range, examples in their industry, Persian support, speed | اتوماسیون کسب و کار با هوش مصنوعی · ربات دایرکت اینستاگرام · چت بات هوشمند برای سایت · قیمت طراحی سایت ۱۴۰۵ |
| **P2 — Startup/edtech founder** | Needs MVP or platform built fast, bilingual, mobile-first | Funding, competition, deadline | Code ownership, stack choice, team being students | Portfolio of similar products, speed, ownership terms | ساخت وب اپلیکیشن · ساخت mvp · طراحی سایت آموزشی · طراحی سایت next.js |
| **P3 — Ops / marketing lead in a mid-size firm** | Wants specific automation (CRM sync, reporting, n8n workflows) | Tool sprawl, reporting pain | Integration with existing Iranian CRM/office systems; reliability; maintenance | Technical depth, SLAs, references | پیاده سازی n8n · متخصص n8n · اتصال crm به سایت · ساخت ایجنت هوش مصنوعی |
| **P4 — International/diaspora company needing Persian presence** (English) | Bilingual RTL site done right | Market entry, Persian audience | Communication, payment logistics | Bilingual portfolio | bilingual english persian website · persian website design |

### 2.3 Customer journey

| Stage | Questions | Content that serves it | Current site |
|---|---|---|---|
| Awareness | What is an AI agent? Can automation help me? | Selective guides (only with first-hand angle) | None |
| Consideration | What does it cost? n8n or Make? Custom site or WordPress? | Cost guides, comparisons | None |
| Decision | Have they done it? For whom? What do I get, when, who owns it? | Service pages with process, proof, FAQs, ranges | Partial (thin, placeholders, no outcomes) |
| Action | How do I start? | Contact/booking, fast reply | Form exists; booking link circular |
| Retention | Support, improvement | Partner/retainer page | Partner page names models without detail |

### 2.4 Assumptions to validate

1. Iran is the primary market; English is credibility/secondary. 2. The team serves clients remotely across Iran (or is Tehran-based?). 3. Bellona can share client results and logos. 4. Bellona is willing to publish price ranges. 5. Which integrations/tools are actually supported for Iranian clients (local CRMs, Telegram/Bale, local LLM hosting).

## 3. Methodology and limitations

**Done:** fetched and inspected all main EN/FA pages; rendered-DOM and same-origin checks of 29 routes in Chrome (status, title, meta, canonical, hreflang, robots, JSON-LD, H1); sitemap and robots on both hosts; Google `site:` query; 15 live Google SERPs (`hl=fa&gl=ir`) incl. related searches; ~15 supplementary searches; Google Trends (Iran, 12 months, 4 terms); 10 competitor pages inspected (outline, words, pricing, schema); desktop lab LCP/CLS/TTFB on one page.

**Not available / not done:**

| Gap | Impact | How to close |
|---|---|---|
| No keyword tool (Keyword Planner, Semrush, Ahrefs) | No volumes, KD or CPC — qualitative only | Keyword Planner (free with Ads account) or Semrush "IR" DB |
| No Search Console / Analytics | No existing queries, CTR, indexing data | Verify domain property (P0-05) |
| No backlink tool | No referring-domain data for Bellona or competitors | Ahrefs/Semrush trial; or GSC Links after launch |
| SERPs from a non-Iranian IP, one date | Positions may differ for Iranian users | Re-check from Iran |
| No mobile device or field CWV | Performance verdict is lab/desktop only | PageSpeed Insights mobile; CrUX after traffic |
| No repo access | Code-level causes (e.g. robots logic) unverified | Claude Code step 1 |
| Site redeployed during research | Some fetches reflect an earlier build (e.g. robots `Disallow: /` seen once) | Re-verify at implementation |

Evidence classes used throughout: **Verified fact**, **Third-party estimate** (Trends relative index only), **Qualitative observation**, **Strategic hypothesis**, **Needs validation**.

## 4. Competitor landscape

Discovered through live SERPs (details and full inventory: [SEO_COMPETITOR_ANALYSIS.md](SEO_COMPETITOR_ANALYSIS.md)).

| Type | Count | Representative domains |
|---|---|---|
| Direct — AI automation/agent agencies | 22 | ayratech.org, biziloc.com, mihanai.com, kadosgroup.ir, amina-group.com, utta.ir, avana.agency, azhvan.agency, n8nir.com |
| Direct — web design/dev agencies | 21 | rahweb.com, websima.com, kaspid.com, lidoma.agency, dadevarzan.com, tehransite.com, webone.co, kiantc.com, vistaapp.ir |
| Substitutes — SaaS | 22 | ila.chat, gapify.ai, raychat.io, gapgpt.app, ivira.ai, faragostar.net, asanito.com, chargoon.com |
| Publishers/education | ~18 | zoomit.ir, faradars.org, maktabkhooneh.org, parspack.com, aparat.com, jdsl.jdsharif.ac.ir |
| Marketplaces/directories | ~6 | ponisha.ir, karlancer.com, behtarino.com, webzi.ir |

Closest like-for-like rival: **ayratech.org** (agents + automation + web design + productised agent shop + guides).

## 5. Detailed competitor comparisons

| Dimension | Bellona (new site) | Typical ranking competitor | Gap / opportunity |
|---|---|---|---|
| Service page depth | 300–400 words (AI ~1,100) | 960 (biziloc) – 3,270 (rahweb) | Expand with substance, not filler |
| Keyword in H1 | No (slogans) | Yes on most | Quick win |
| Pricing | Brackets in form only | From-prices (biziloc), 1405 price pages (dadevarzan +6 others), cost guides (ivira) | Publish honest ranges |
| Proof | 4 case studies, no outcomes | Portfolios, client logos, testimonials (mihanai) | Add outcomes/testimonials |
| Schema | Org/Service/FAQ/Breadcrumb | Similar; some LocalBusiness with address | Strengthen entity, fix FAQ text |
| Technology story | Next.js, bilingual — not explained | lidoma/payamava sell Next.js explicitly | Next.js page with own site as proof |
| Integrated offer | Unique "lead → agent → CRM → analytics" story | Mostly single-service | Keep; back with a case |
| Content hub | None | Most have blogs | Small, high-intent guides hub |

Page-level table: [Competitor analysis § Page-level comparison](SEO_COMPETITOR_ANALYSIS.md#page-level-comparison-inspected-pages).

## 6. Keyword research methodology

Seeds from Bellona's own service names, FAQs and form → expanded via live SERP related searches → competitor titles/H1s → intent read from SERP composition → clustered by shared SERP/intent → mapped to existing or proposed pages. Full detail and the prioritisation framework: [SEO_KEYWORD_DATABASE.md](SEO_KEYWORD_DATABASE.md#prioritisation-framework). **No volumes or difficulty scores are fabricated; all are `n/a` or qualitative.**

## 7. Keyword cluster inventory

18 clusters, 103 keywords (CSV). Summary of P1 clusters:

| Cluster | Primary keyword | Target |
|---|---|---|
| C1 Website design | طراحی سایت اختصاصی | `/fa/services/website-design` |
| C1a Next.js design | طراحی سایت next.js | new `/fa/services/website-design/nextjs` |
| C2 Website pricing | قیمت طراحی سایت ۱۴۰۵ | new `/fa/guides/website-design-cost` |
| C4 Web apps | ساخت وب اپلیکیشن | `/fa/services/full-stack-development` |
| C5 AI automation | شرکت اتوماسیون هوش مصنوعی | `/fa/services/ai-automation` |
| C6 AI agents | ساخت ایجنت هوش مصنوعی | new `/fa/services/ai-automation/ai-agents` |
| C7 AI cost | هزینه ساخت ایجنت هوش مصنوعی | new `/fa/guides/ai-agent-cost` |
| C8 n8n | پیاده سازی n8n | new `/fa/services/ai-automation/n8n` |
| C14 Education | طراحی سایت آموزشی | new `/fa/industries/education` |
| C15 Brand | آژانس بلونا | `/fa` |

## 8. Search-intent analysis

Observed on live SERPs, not assumed from the keyword.

| Query | What Google showed (2026-10-21) | Dominant intent | Implication |
|---|---|---|---|
| اتوماسیون هوش مصنوعی | Explainers (ivira), office-automation vendors (faragostar, chargoon, systemgroup), a course, 2 service pages | Mixed, informational-leaning | Target the more commercial variants ("شرکت…", "…کسب و کار") |
| شرکت اتوماسیون هوش مصنوعی | Agencies (biziloc, kados, ayratech, mihanai, amina), 3 listicles | Commercial investigation | **P1, winnable** |
| آژانس هوش مصنوعی | 8 agency pages | Commercial | Use phrase in homepage/AI hub |
| ساخت ایجنت هوش مصنوعی | Courses, tutorials, a no-code builder | Informational/DIY | Service page must address DIY alternative |
| هزینه ساخت ایجنت هوش مصنوعی | Cost guides (ivira #1), a shop, Ponisha | Commercial investigation | Cost guide |
| اتوماسیون n8n | Explainers, courses, managed hosting, **Karlancer "hire n8n expert"** | Informational + hiring | Service page aimed at hiring intent |
| چت بات هوشمند برای سایت | 6+ SaaS products | Commercial (product) | Differentiate as custom/integrated; P2 |
| طراحی سایت | Site builder, freelance marketplace, big agencies, a course | Mixed | Long-term head term only |
| شرکت طراحی سایت | Listicles + Tehran agencies | Commercial investigation | Directory listings + niches |
| ساخت وب اپلیکیشن | Agencies, explainers, DIY videos | Mixed | Full-stack page |
| اتوماسیون فروش و crm | 9 CRM vendors | Product | Integrator angle only |
| بلونا | Wikipedia, furniture, clothing | Navigational (other brands) | Disambiguate brand |

## 9. SERP and ranking-opportunity analysis

| Cluster | Barrier | Feasibility (qualitative) | Recommended format |
|---|---|---|---|
| C5 AI automation (commercial variants) | Low–medium: weak pages rank (Kados ~280 words; MihanAI no H1) | **Good** once on canonical domain with depth + proof | Service hub with spokes, proof, price anchors, FAQ |
| C6 AI agents | DIY/course results dominate head; few strong service pages | Moderate | Service page + cost guide |
| C7 AI cost | One strong guide (ivira ~2,900 words) | Moderate | Practitioner cost guide with real ranges |
| C8 n8n | Publishers own "what is"; service intent under-served | **Good** for "پیاده سازی/متخصص n8n" | Service page |
| C1a Next.js | Agency pages of 2,000+ words | Moderate | Service page with live proof |
| C2 Website cost | Many 1405 price pages incl. a 10k-word page | Hard–moderate | Concise, honest guide; win long-tail (دوزبانه، اختصاصی) |
| C1 head «طراحی سایت» | Builders, marketplaces, mature agencies, sponsored PR | **Hard** | Don't target directly in year one |
| C9 Chatbot | SaaS products | Hard for head; OK for "اختصاصی/سازمانی" | Service page (P2) |

**SERP features observed:** related searches on every SERP; video (Aparat/YouTube) results on several; no local pack on the queries checked; no ads detected in captured results; People Also Ask not detected by the extractor (may still appear for some users). No rankings or timelines are promised.

## 10. Keyword-to-page mapping

Full table with proposed titles and H1s: [SEO_SITE_ARCHITECTURE.md § mapping](SEO_SITE_ARCHITECTURE.md#keyword-to-page-mapping-and-recommended-metadata).

## 11. Recommended architecture

Keep the existing `/services/{slug}` + `/fa/…` structure. Add: 4 AI sub-pages, a Next.js sub-page, `/fa/industries/education`, and a `/fa/guides` hub with two cost guides first. Do **not** recreate old "coming soon" industry pages. Redirect map and cannibalisation rules: [SEO_SITE_ARCHITECTURE.md](SEO_SITE_ARCHITECTURE.md).

## 12. Technical SEO audit

Top findings (full table of 23 in [SEO_TECHNICAL_AUDIT.md](SEO_TECHNICAL_AUDIT.md)):

| ID | Finding | Severity |
|---|---|---|
| TA-01 | New site not on canonical domain | Critical |
| TA-04 | Placeholders in copy/meta/FAQ | Critical (content) |
| TA-02 | Old URLs need 301s | High |
| TA-03 | Render host duplicate; robots behaviour inconsistent between fetches | High |
| TA-07/08 | Slogan H1s, generic titles | High |
| TA-09 | Thin service pages | High |
| TA-16/17 | Weak entity data; Gmail; no phone | Medium |
| TA-19 | ~508 KB HTML on home/fa | Medium |
| TA-21 | Hosting latency from Iran unverified | Medium (unverified) |

Working well: SSR, single H1, `lang/dir`, canonical + hreflang + sitemap alternates, 404 noindex, privacy/terms noindex, breadcrumbs, desktop lab LCP ≈1.74 s / CLS 0.

## 13. Content quality and gaps

Per-page assessments, gap matrix and briefs: [SEO_CONTENT_ROADMAP.md](SEO_CONTENT_ROADMAP.md). Headlines:

- Service pages explain *what* but not *how much, how long, for whom, with what result*.
- Case studies show screens but no outcomes, testimonial, stack or timeline.
- Biggest gaps: Next.js page, AI-agent and n8n pages, education page, two cost guides, case outcomes.
- E-E-A-T asset underused: Sharif University team — make founders visible as authors on guides (Person schema, short bios, LinkedIn if available).

## 14. Backlinks and authority

**No backlink data was measured** (no tool access). Observations and a plan:

| Observation | Evidence |
|---|---|
| Google indexes 5 old-site URLs; authority level unknown | `site:` query |
| Iranian "best agency" SERPs include sponsored reportage (zoomit.ir/pr, digiato.com/promoted, gadgetnews) | WebSearch results |
| Directories rank: behtarino.com, namayeshgahha.ir, honartabligh.com lists; Ponisha/Karlancer marketplaces | Live SERPs |
| Sharif-affiliated jdsl.jdsharif.ac.ir runs an n8n/AI-agent course that ranks | Live SERPs |

**Legitimate authority plan (no paid followed links, no PBNs, no automated link building):**

1. **Client credit links** — "Design & development: Bellona" in footers of Konjed, Codechee, Microshamim, Nira (with client consent); links to the relevant case study.
2. **Sharif ecosystem** — alumni/startup programmes, guest workshops (e.g. n8n/agents), student-team features; profiles on university or incubator pages if eligible.
3. **Directories & marketplaces** — complete profiles on behtarino, relevant company lists, Ponisha/Karlancer (also lead sources), LinkedIn company page, Instagram bio link.
4. **Useful assets** — cost guides with real data; a self-hosted-n8n-in-Iran checklist; later an SMB automation survey (P3-04) for journalists.
5. **Persian community content** — Virgool articles and Aparat videos summarising guides (both appear in SERPs), linking to the full guide.
6. **Sponsored placements**, if bought, must use `rel="sponsored"` and be treated as advertising, not link building.

Research plan once a tool is available: export referring domains for Bellona, ayratech.org, biziloc.com, mihanai.com, lidoma.agency; list domains linking to ≥2 competitors but not Bellona; qualify by relevance.

## 15. Conversion opportunities

| Issue | Type | Recommendation |
|---|---|---|
| "Book a 30-min call" leads to the same contact form | Verified | Real scheduler or relabel |
| "[24 h]" reply promise placeholder | Verified | State real response time |
| Gmail address; no phone/messaging | Verified | Domain email; phone or messaging channel if staffed (hypothesis: Iranian buyers expect it) |
| No price anchors on service pages | Verified | Short range box linking to cost guide |
| No outcomes/testimonials | Verified | Case outcomes, 1–2 quotes |
| Industry CTAs pre-fill `?industry=` | Verified (good) | Keep; also pre-fill from new pages (`?need=ai&topic=n8n`) |
| Objections unanswered (ownership, stack, support) | Verified (placeholders) | Answer in FAQs |
| Mobile conversion | Not tested | Test form on mobile in Persian |

No conversion data exists; all are improvements to test, not measured problems.

## 16. Prioritised roadmap

| Milestone | Tasks | Notes |
|---|---|---|
| **M0 Launch-ready (P0)** | Placeholders, deploy to canonical domain, 301s, Render host, GSC, claims | Must precede everything |
| **M1 Money pages (P1)** | Titles/H1s, expand 3 service pages, case outcomes, internal links, entity schema | Quick wins + depth |
| **M2 New commercial pages (P1)** | AI agents, n8n, Next.js, Education, 2 cost guides | Highest growth leverage |
| **M3 Growth (P2)** | Chatbot, Instagram automation, 4 guides, performance, alt text, booking, authority, hosting check | |
| **M4 Experiments (P3)** | English RTL niche, more industries, SEO-service proof, survey, x-default, video | |

Full task cards with evidence, effort, dependencies, acceptance and validation: [SEO_IMPLEMENTATION_BACKLOG.md](SEO_IMPLEMENTATION_BACKLOG.md).

### 16a. GEO and AEO (AI search)

Added 2026-10-22 — full audit: [SEO_GEO_AEO_AUDIT.md](SEO_GEO_AEO_AUDIT.md). Key points: Google states AI Overviews/AI Mode have no extra requirements beyond indexing and snippet eligibility; AI Overviews support Persian but Iran is not a listed country, so Iranian buyers mostly meet AI answers through ChatGPT, Gemini, Claude, Perplexity and Persian AI tools. The new site is server-rendered and allows all crawlers (good); the main GEO risks are visible placeholders, brand ambiguity, slogan-style headings and no extractable prices/dates/authors. Tasks G-01…G-10 are in the backlog.

## 17. Measurement and validation

**Baseline (before cutover):** export GSC data for the old site if a property exists; record indexed URLs (`site:` count is only a rough signal); record current lead volume per month from the form/email.

| Metric | Source | Cadence | Notes |
|---|---|---|---|
| Indexed vs intended URLs (expect 32 + new pages) | GSC Pages report | Weekly for 8 weeks after cutover, then monthly | Investigate "Duplicate, Google chose different canonical" (Render host) |
| Impressions, clicks, CTR by page & query | GSC | Weekly glance, monthly review | Segment FA vs EN by `/fa` prefix |
| Branded vs non-branded | GSC regex: `بلونا|bellona` | Monthly | Brand ambiguity: also track "آژانس بلونا" |
| Cluster performance | GSC queries mapped to CSV clusters | Monthly | Use CSV `topic_cluster` |
| Average position | GSC | Monthly, cautiously | Volatile at low impressions |
| Qualified leads by landing page | Form submissions with page/`need` params; analytics event if added (with consent) | Monthly | The business KPI |
| Country & device | GSC | Monthly | Confirms the Iran-first assumption |
| Core Web Vitals | PSI / GSC CWV once data exists | Monthly + after releases | Lab before field data accrues |
| Technical regressions | Script: sitemap URLs → status, canonical, hreflang, H1 count, placeholder grep | Every deploy (CI) | Prevents TA-04 recurring |
| Content decay | GSC page trend, year in titles | Quarterly; **each Nowruz** for ۱۴۰۵→۱۴۰۶ | |

**Reading changes:** with low traffic, week-to-week swings are noise. Compare 28-day periods, look for sustained moves over ≥2 periods, annotate deploys, and check Iranian internet disruptions (visible as simultaneous drops across all terms in Trends) before attributing changes. Rankings changing do not by themselves prove lead changes.

## 18. Sources and evidence

All accessed 2026-10-21.

**Bellona (target):** bellona-web.onrender.com — `/`, `/fa`, `/services`, `/services/website-design`, `/services/full-stack-development`, `/services/ai-automation`, `/services/marketing-growth`, `/services/business-development`, `/partner`, `/industries`, `/work`, `/work/{konjed,nira-perfume,microshamim,codechee}`, `/about`, `/contact`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, FA equivalents · bellonaagency.com — `/`, `/robots.txt`, `/sitemap.xml`, `/industries/realEstate`.

**Live Google SERPs (`hl=fa&gl=ir`):** the 15 queries listed in [Competitor analysis](SEO_COMPETITOR_ANALYSIS.md#how-competitors-were-found); `site:bellonaagency.com`.

**Google Trends:** Iran, past 12 months — طراحی سایت, n8n, ایجنت هوش مصنوعی, اتوماسیون.

**Competitor pages inspected:** biziloc.com/ai-automation · mihanai.com · ayratech.org · kadosgroup.ir/services/ai-automation · lidoma.agency/next-js-webdesign/ · rahweb.com/web-site-design · websima.com/website-design/ · ivira.ai/blog/ai-agent-cost/ · dadevarzan.com/web-design/cost-tariff-prices/ · faragostar.net/ai/

**Supplementary search results referenced:** zoomit.ir (n8n agent tutorial; sponsored /pr pages), digiato.com/promoted, gadgetnews.net, palette.agency, webkaj.com, rayanitco.com, vistaapp.ir, hamyarsite.com, wizonagency.com, avinapardaz.com, yektanet.com, parspack.com, hamravesh.com, iranserver.com, karlancer.com, ponisha.ir, behtarino.com, en.wikipedia.org/wiki/Bellona_Foundation.

## 19. Unanswered questions and required access

**Business (needed for P0-01 and briefs):**

1. Is Iran the primary market? Is English for diaspora/international clients or credibility only?
2. Where is the team based (city), and is there an address/phone you are willing to publish?
3. Founding year and origin story (About placeholder).
4. Real reply time (replace "[24 h]").
5. CMS options used (Webflow/WordPress/headless?), tech stack, code-ownership terms, take-over policy.
6. Marketing channels you actually run; languages you write content in; markets/regions you know best.
7. Evidence for "100+ automations", "80% time saved", "3x productivity".
8. Can case studies include results, testimonials, client links? Any client logos permitted?
9. Willing to publish price ranges? Which ranges per service?
10. Which integrations are supported for Iranian clients (local CRMs, Telegram/Bale/Rubika, Instagram, local LLM/self-hosting)?
11. Is the Gmail address temporary? Will an `@bellonaagency.com` mailbox be used?

**Access that would materially improve the analysis:**
- Google Search Console (old domain) and, after launch, the new property.
- Google Keyword Planner or Semrush/Ahrefs (IR database).
- Git repository of the new site (and the old site, for any other legacy URLs).
- Hosting/DNS access for cutover.
- A tester inside Iran for SERP and speed checks.

---

## Instructions for the Claude Code Implementation Agent

You are implementing the SEO plan in this research folder for the Bellona website (Next.js, English + Persian). Work safely, in small verifiable batches, and never invent business facts.

### Before changing anything

1. **Inspect the repository**: framework/version, App Router structure, i18n/locale routing (`/` vs `/fa`), where copy lives (i18n JSON/TS/MDX), `generateMetadata` usage, `app/robots.ts`, `app/sitemap.ts`, JSON-LD components, `next.config` redirects, middleware, CI/build scripts. Record findings in an `IMPLEMENTATION_NOTES.md`.
2. **Read every file in this folder** — this report, the six supporting `.md` files and `seo_keyword_database.csv`.
3. **Map each backlog task** ([SEO_IMPLEMENTATION_BACKLOG.md](SEO_IMPLEMENTATION_BACKLOG.md)) to concrete files, routes and components. Note tasks whose assumptions don't match the code (e.g. robots logic) and re-verify the finding first.
4. **Split tasks** into: (a) implementable now; (b) needing business facts (Master §19); (c) needing credentials/hosting/DNS/GSC; (d) needing content approval. Ask targeted questions for (b)–(d); do not guess.

### While implementing

5. Do **not** rebuild the site or change unrelated functionality, design system, animations, or form behaviour.
6. Do **not** create pages that duplicate an existing intent or ship thin content. New pages must follow the briefs in [SEO_CONTENT_ROADMAP.md](SEO_CONTENT_ROADMAP.md) and the cannibalisation rules in [SEO_SITE_ARCHITECTURE.md](SEO_SITE_ARCHITECTURE.md). Where facts are missing, stop and ask — **never ship a `[placeholder]`**; add a CI check that fails on bracketed placeholders in rendered copy.
7. Preserve brand identity, accessibility (alt text, contrast, focus), RTL correctness on `/fa`, responsiveness, and existing hreflang pairing (every new page needs both locales or a deliberate decision).
8. Order: P0 code tasks (P0-01 placeholders, P0-03 redirects, P0-04 host handling) → P1 quick wins (titles, H1s, internal links, schema) → P1 content pages as facts arrive → P2.
9. One logical change per batch/commit; describe the SEO reason in the commit message.

### Validate every batch

10. Run the project's build, lint, type-check and tests.
11. For changed routes, verify in built output or a local server: HTTP status; `<title>`; meta description; exactly one `<h1>`; `lang`/`dir`; self-canonical on `https://bellonaagency.com`; reciprocal hreflang en/fa/x-default; robots meta; JSON-LD validity (no placeholder text inside); presence in `sitemap.xml` with alternates; redirects are permanent and single-hop; internal links resolve (no 404s); images have meaningful alt.
12. Keep the regression script from Master §17 (sitemap → status/canonical/hreflang/H1/placeholder checks) in the repo.

### Boundaries

13. **Never deploy, publish, push, change DNS or submit to Search Console without explicit authorisation** from the Bellona team.
14. Never claim rankings, indexing, traffic or leads improved without post-deployment evidence from Search Console/analytics.
15. If recommendations here conflict, prefer the one backed by stronger evidence (verified > observed > hypothesis) and record the decision in `IMPLEMENTATION_NOTES.md`.

### Finish with an implementation report

List: completed tasks (IDs), files changed, commands/tests run and results, validation evidence per route, tasks blocked and what is needed, open questions, and recommended monitoring (GSC checks in weeks 1, 2, 4, 8 after cutover).
