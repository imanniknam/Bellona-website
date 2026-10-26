# Bellona — GEO & AEO Audit (AI search and answer engines)

Research date: **2026-10-22**
Back to: [Master report](SEO_MASTER_RESEARCH_REPORT.md) · Tasks: [Backlog § GEO/AEO](SEO_IMPLEMENTATION_BACKLOG.md#geo--aeo-tasks)

**Definitions used here**
- **GEO (Generative Engine Optimization):** being found, correctly described and *cited* by AI systems that generate answers — Google AI Overviews / AI Mode, ChatGPT search, Claude, Perplexity, Gemini, and Persian AI tools.
- **AEO (Answer Engine Optimization):** structuring pages so a specific question gets a clear, extractable answer (featured snippets, AI answers, voice).

GEO/AEO is **built on top of SEO**, not instead of it. Every P0/P1 SEO task in the backlog is also a GEO task: an AI system cannot cite a page that is not indexed, not on the canonical domain, or full of placeholders.

---

## 1. Verified facts about how AI search works today

| Fact | Source (accessed 2026-10-22) | Implication for Bellona |
|---|---|---|
| Google says there are **no additional requirements** to appear in AI Overviews or AI Mode. A page must be indexed and eligible for a snippet. No special schema, AI text files or markup are needed. Structured data must match visible text. | [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) | Standard SEO (the existing backlog) is the AI Overview strategy. |
| Traffic from AI Overviews / AI Mode is counted in Search Console's Performance report under "Web". | Same | No separate report — measure AI referrals elsewhere (§6). |
| Snippet controls (`nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`) govern what can be shown. `Google-Extended` controls use in Google's *other* AI systems (training/grounding), not Search. | Same | Do **not** add `nosnippet`/`max-snippet` to service pages. Blocking Google-Extended does not remove AI Overview eligibility. |
| AI Overviews support **Persian (Farsi)** as a language, but **Iran is not on the list of countries**. | [Google Help — AI Overviews](https://support.google.com/websearch/answer/14901683?hl=en) | Persian speakers **outside** Iran (diaspora, Persian-language queries from other countries) may see AI Overviews; users inside Iran likely do not. |
| In the browser session available for this research, **no AI Overview and no AI Mode tab appeared** for 3 test queries (2 Persian, 1 English, incl. «ایجنت هوش مصنوعی چیست» and "what is n8n used for"). | Live Google check, 2026-10-22 | AI Overview presence in Bellona's SERPs could not be observed. Re-test from target locations (§6). |
| **OpenAI:** `OAI-SearchBot` decides whether a site can be shown in ChatGPT search answers; `GPTBot` is for model training and blocking it does not remove search visibility; `ChatGPT-User` fetches pages on user request. | [OpenAI crawlers overview](https://developers.openai.com/api/docs/bots) | Allow `OAI-SearchBot`. `GPTBot` is a business choice. |
| **Anthropic:** `Claude-SearchBot` indexes for search quality (blocking reduces search visibility); `Claude-User` fetches on user request; `ClaudeBot` collects training data. | [Anthropic crawlers](https://support.claude.com/en/articles/8896518-anthropic-crawlers) | Allow `Claude-SearchBot` and `Claude-User`. |
| **Perplexity:** `PerplexityBot` indexes for Perplexity search (not training); `Perplexity-User` fetches on user request. | [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md) | Allow `PerplexityBot`. |
| Google has said `llms.txt` neither helps nor harms rankings and isn't needed for AI search visibility (reported June 2026 and May 2026; Lighthouse now reports whether one exists). | [Search Engine Land llms.txt coverage](https://searchengineland.com/topic/llms-txt/) | Optional, low priority. |

## 2. Market reality for Bellona (analysis)

- **Inside Iran**, Google AI Overviews are not officially available, so Persian buyers' "AI answers" come mostly from **assistants used directly** — ChatGPT, Gemini, Claude, Perplexity (often over VPN) and **Persian AI products** (e.g. gapgpt.app and hoosha.com appeared in Bellona's SERPs). *Usage shares for Iran were not available; treat as hypothesis.*
- These assistants answer "which company…" questions largely from **web search indexes and third-party lists**. Bellona's Persian SERPs for "best company" queries are dominated by listicles (behtarino.com, namayeshgahha.ir, honartabligh.com, dadevarzan.com) — being listed there is a GEO lever as well as an SEO one.
- **Brand ambiguity is a GEO risk.** "Bellona" in AI answers is likely to be associated with the Bellona Foundation (environmental NGO), Bellona furniture, or the Roman goddess (all observed in search results). Without a clear, consistent entity description, an assistant may confuse or omit the agency.
- **Persian-speaking clients abroad** (diaspora, companies entering the Iranian market) *can* see Google AI Overviews in Persian — relevant to the English/bilingual niche.

## 3. Current state of the new site (bellona-web.onrender.com)

| Check | Result | Status |
|---|---|---|
| Content in initial HTML (no JS needed) | Yes — server-rendered Next.js; full copy, headings and FAQs in HTML | ✅ Good (many AI fetchers don't execute JS) |
| `robots.txt` | `User-Agent: * / Allow: / / Disallow: /api/` — all AI bots allowed by default | ✅ OK (make explicit — G-02) |
| `llms.txt` / `llms-full.txt` | 404 | ⚪ Optional |
| FAQ structured data | `FAQPage` on AI page (5 Qs) and website-design (1 Q); questions with placeholder answers **are already excluded from JSON-LD** | ✅ Good |
| Placeholders in **visible** text (what AI fetchers read) | Yes, on 9 of 10 pages checked: "[24 h]"/«[۲۴ ساعت]» on home and about; about origin story; full-stack (3, both locales); website-design CMS and «[بازه‌ی معمول]»; marketing (2); biz-dev (1); contact meta descriptions | ❌ **Critical for GEO** — an assistant may quote "we reply within [24 h]" |
| Answer-first structure | Headings are slogans; FAQ answers are short and good; no question-shaped H2s on service pages | ⚠️ Improve |
| Extractable facts (prices, timelines, counts) | Timelines exist on AI page; prices absent; statistics unsupported | ⚠️ Improve |
| Dates (`datePublished`/`dateModified`, visible "last updated") | None on any page | ⚠️ Add on guides and pricing content |
| Author / expertise signals | Team listed (Sharif University); no author attribution on content; no Person schema | ⚠️ Improve |
| Entity data | `ProfessionalService` with `alternateName: "بلونا"`, Gmail email, no `sameAs`, no founders, no `areaServed` | ⚠️ Improve |
| Old live site (bellonaagency.com) | Positions Bellona as AI-only; minimal Organization schema with empty `sameAs` | ❌ Replace at cutover |

## 4. Recommendations

### 4.1 Technical access (GEO)

1. **Make AI search crawlers explicit in `robots.txt`** (they are already allowed; explicit lines guard against future blanket rules):
   ```
   User-agent: *
   Allow: /
   Disallow: /api/

   User-agent: OAI-SearchBot
   User-agent: ChatGPT-User
   User-agent: Claude-SearchBot
   User-agent: Claude-User
   User-agent: PerplexityBot
   User-agent: Perplexity-User
   Allow: /
   Disallow: /api/

   Sitemap: https://bellonaagency.com/sitemap.xml
   ```
   **Training crawlers** (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`): business decision for the Bellona team. Allowing them may help models "know" the brand over time; blocking them protects content from training. Default recommendation for a small agency seeking awareness: **allow**. Do not block them without an explicit decision.
2. **Keep content server-rendered.** Never move service copy, FAQs or prices into client-only components or behind tabs/accordions that only render on click.
3. **No `nosnippet` / `max-snippet:0`** on any indexable page.
4. **Optional `llms.txt`** (P3): a short Markdown index (who Bellona is, services with URLs, case studies, contact). Low cost; Google says it has no ranking effect. Must contain only facts present on the site.

### 4.2 Entity clarity (GEO)

5. One canonical **entity statement** used identically on home, about, footer, schema, Instagram bio and directory listings, e.g. (to be confirmed by the team):
   - FA: «بلونا (آژانس بلونا) یک تیم طراحی سایت، توسعه‌ی محصول و اتوماسیون هوش مصنوعی است که …»
   - EN: "Bellona (Bellona Agency) is a web design, product development and AI automation team that …"
   Include what it is **not**-confusable with by being specific (agency, services, city/country) — do not mention other brands.
6. **Organization / ProfessionalService schema** on the homepage (others reference by `@id`): `name`, `alternateName` ["بلونا", "آژانس بلونا", "Bellona Agency"], `url`, `logo`, `description` (= entity statement), `founder` (Person entries with `name`, `jobTitle`, `alumniOf`/`affiliation` Sharif University only if accurate), `foundingDate`, `areaServed`, `knowsAbout` (services), `email` (domain address), `sameAs` (Instagram, LinkedIn and directory profiles that exist). Address/phone only if real.
7. **Same name and description off-site:** Instagram bio, LinkedIn company page (create if absent), directory listings (behtarino.com and similar), freelance-marketplace profiles, client "built by" credits.

### 4.3 Answer-ready content (AEO)

8. **Question-shaped sections** on service pages and guides, phrased the way people ask (Persian first). Under each question: a **direct 1–3 sentence answer (≈40–60 words)**, then detail. Examples:
   - «ساخت ایجنت هوش مصنوعی چقدر هزینه دارد؟»
   - «پیاده‌سازی n8n چقدر طول می‌کشد؟»
   - «طراحی سایت با Next.js چه فرقی با وردپرس دارد؟»
   - «مالکیت کد سایت با چه کسی است؟»
   - «آیا ایجنت هوش مصنوعی در ایران قابل استفاده است؟» (answer must be accurate and current; needs team/legal input)
9. **Extractable facts**: price ranges in a table, timelines per project type, what's included, numbered process steps (`<ol>`), comparison tables (`<table>` with header row). Use the **same numbers everywhere** (service page, guide, FAQ, schema) so assistants don't see contradictions.
10. **Definitions up front** on spoke pages ("An AI agent is…", "n8n is…") — one paragraph, then move to Bellona's offer.
11. **Freshness**: visible «آخرین به‌روزرسانی» date + `dateModified` on guides and pricing content; update each Nowruz (1405 → 1406).
12. **Expertise**: byline with a team member on guides; short bio with role; `Article` + `author` (Person) schema. Case studies should name the problem, approach and **result** — assistants cite concrete outcomes.
13. **FAQ schema**: keep `FAQPage` where FAQs are visible (it helps machines parse Q&A). Note that Google has restricted FAQ rich results to a narrow set of authoritative government/health sites since 2023, so **don't expect FAQ rich snippets**; the value is clarity for parsers. *(Based on prior knowledge of Google's August 2023 change — verify against current Search Central docs before relying on it.)*
14. **Remove/replace unsupported statistics** (100+, 80%, 3x) — assistants repeat numbers; unverifiable ones become liabilities.

### 4.4 Off-site citations (GEO)

15. **Get listed where AI answers look**: Persian "best company" listicles and directories that rank for «شرکت طراحی سایت» / «شرکت هوش مصنوعی» (behtarino.com, namayeshgahha.ir, honartabligh.com, dadevarzan.com lists), marketplaces (Ponisha, Karlancer), LinkedIn. Follow each site's editorial rules; paid placements must be labelled and use `rel="sponsored"`.
16. **Publish first-hand data** others can cite (cost ranges from real projects, a small survey of Iranian SMB automation). Original numbers are what assistants quote.
17. **Persian community surfaces**: Virgool articles and Aparat videos summarising guides (both appear in Persian SERPs) with links back.

## 5. GEO/AEO prompt set to monitor

Run monthly in ChatGPT (with search), Gemini, Perplexity, Claude and one Persian AI tool; record whether Bellona is **mentioned**, **cited (linked)**, and **described correctly**. Save answers with date.

| # | Prompt (as a buyer would ask) | Cluster |
|---|---|---|
| 1 | بهترین شرکت ساخت ایجنت هوش مصنوعی برای کسب‌وکار در ایران کدام است؟ | C5/C6 |
| 2 | چه شرکتی n8n را برای کسب‌وکارها پیاده‌سازی و پشتیبانی می‌کند؟ | C8 |
| 3 | هزینه ساخت ایجنت هوش مصنوعی برای یک فروشگاه اینترنتی در ۱۴۰۵ چقدر است؟ | C7 |
| 4 | یک تیم برای طراحی سایت دوزبانه فارسی و انگلیسی با Next.js معرفی کن | C1a/C1b |
| 5 | چه شرکتی پلتفرم آموزشی گیمیفای‌شده طراحی می‌کند؟ | C14 |
| 6 | قیمت طراحی سایت اختصاصی در سال ۱۴۰۵ چقدر است؟ | C2 |
| 7 | بلونا چه خدماتی ارائه می‌دهد؟ / What does Bellona Agency do? | C15 (entity accuracy) |
| 8 | Recommend an agency for a bilingual Persian–English website | C16 |
| 9 | n8n یا Make یا Zapier برای یک کسب‌وکار ایرانی؟ | C17 |
| 10 | آیا ایجنت هوش مصنوعی را می‌شود به CRM و اینستاگرام وصل کرد؟ چه شرکتی این کار را انجام می‌دهد؟ | C10/C11 |

**Baseline expectation:** before cutover Bellona is very unlikely to appear for prompts 1–6, 8–10. Prompt 7 tests whether assistants confuse the brand.

## 6. Measuring AI visibility

| Signal | How |
|---|---|
| AI referral visits | Analytics referrers / UTM: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, `copilot.microsoft.com` (ChatGPT often appends `utm_source=chatgpt.com`). Requires an analytics tool — choose one compatible with Iranian visitors and privacy policy. |
| AI crawler activity | Server/edge logs filtered by user agents in §4.1 (requires host log access). |
| Prompt-set results | Monthly table from §5. |
| Google AI Overviews | Included in GSC "Web" totals (no separate filter). Manually check priority queries from a supported country when relevant to the diaspora/English niche. |
| Lead attribution | Add "How did you hear about us?" with an "AI assistant (ChatGPT, …)" option to the contact form. |

## 7. Priorities

| ID | Task | Pri. | Effort |
|---|---|---|---|
| G-01 | Remove visible placeholders (same as P0-01) — highest GEO impact | P0 | S |
| G-02 | Explicit AI-search crawler rules in `robots.ts`; decide on training bots | P1 | S |
| G-03 | Entity statement + Organization/Person schema + consistent off-site profiles | P1 | S–M |
| G-04 | Answer-first Q&A sections on service pages and new pages | P1 | M |
| G-05 | Visible "last updated" + `dateModified` on guides/pricing; author bylines | P1 | S |
| G-06 | Consistent facts (prices, timelines) across pages and schema; remove unsupported stats | P1 | S |
| G-07 | "How did you hear about us?" field with AI option; AI referrer tracking | P2 | S |
| G-08 | Monthly prompt-set monitoring (§5) | P2 | S (ongoing) |
| G-09 | Directory/listicle presence and LinkedIn page | P2 | M |
| G-10 | Optional `llms.txt` | P3 | S |
