# Bellona — Keyword Database

Research date: **2026-10-21** · Full inventory: [`seo_keyword_database.csv`](seo_keyword_database.csv) (103 rows)
Back to: [Master report](SEO_MASTER_RESEARCH_REPORT.md) · Mapping: [Site architecture](SEO_SITE_ARCHITECTURE.md)

## Methodology

| Source | Used for | Accessed? |
|---|---|---|
| Live Google SERPs (`hl=fa&gl=ir`) in Chrome | Intent, ranking page types, competitors, related searches | **Yes** — 15 queries, 2026-10-21 |
| Google "related searches" | Long-tail and modifier discovery | Yes (from the same SERPs) |
| Google Trends (Iran, past 12 months) | Relative demand between 4 seed terms | Yes — one comparison, read from chart |
| Supplementary US web search | Extra competitor and topic discovery | Yes, lower confidence for Persian intent |
| Bellona's own copy (service names, FAQs, form options) | Seed terms and customer language | Yes |
| Google Keyword Planner, Ahrefs, Semrush, Search Console | Volumes, KD, CPC, current rankings | **No — not accessed.** |

**No search volumes, keyword-difficulty scores or CPCs in this database are measured.** Every `volume`/`cpc` cell is `n/a`. "Difficulty" is a **qualitative** judgement from the observed SERP (who ranks, how deep their pages are), prefixed `qual:`.

### Google Trends reading (Iran, 12 months, 2026-10-21)

Approximate average relative interest read from the chart (0–100 scale, relative to each other only):

| Term | ≈ Avg | Read |
|---|---|---|
| اتوماسیون | 45 | Highest, but ambiguous — mostly office-automation software |
| طراحی سایت | 27 | Large, stable demand |
| n8n | 6 | Small but visible and rising since mid-year |
| ایجنت هوش مصنوعی | ~0–1 | Near zero relative to the others |

The chart also showed a period where all terms dropped to zero simultaneously, consistent with a nationwide data gap (likely an internet disruption) — treat short-term trends with caution.

**Implication:** website design is Bellona's largest demand pool; "AI agent" is an emerging, low-volume but high-intent niche. Strategy must serve both: win AI-automation niches early (soft SERPs), and approach web design through specific niches.

## Prioritisation framework

| Priority | Definition used here |
|---|---|
| **P0** | Blocks crawling, indexing or trust of the whole site (technical / content blockers). No keywords are P0. |
| **P1** | High business relevance **and** commercial/transactional intent **and** a SERP Bellona can realistically compete in within 3–6 months, **and** Bellona has proof or a natural page for it. |
| **P2** | Relevant and valuable but either harder SERP, weaker proof, or supporting/informational role. |
| **P3** | Low proof, very competitive head terms, ambiguous intent, or market unconfirmed (most English). |

Confidence: **High** = intent verified on live SERP; **Medium** = from related searches or competitor targeting; **Low** = hypothesis needing validation with a keyword tool.

## Clusters (summary)

| # | Cluster | Primary keyword | Key secondaries | Dominant intent (observed) | Target page | Priority |
|---|---|---|---|---|---|---|
| C1 | Website design | طراحی سایت اختصاصی | خدمات/سفارش طراحی سایت، طراحی سایت شرکتی، طراحی سایت حرفه ای | Commercial; head term mixed with builders & courses | `/fa/services/website-design` | P1 (long-tail) / P2 (head) |
| C1a | Next.js website design | طراحی سایت next.js | طراحی سایت با next js | Commercial (agency pages) | `/fa/services/website-design/nextjs` *(new)* | P1 |
| C1b | Bilingual / RTL design | طراحی سایت دو زبانه | چند زبانه، persian website design (EN) | Commercial (hypothesis) | Section → sub-page later | P1/P2 |
| C2 | Website pricing | قیمت طراحی سایت ۱۴۰۵ | هزینه/تعرفه طراحی سایت، قیمت طراحی سایت اختصاصی | Commercial investigation | `/fa/guides/website-design-cost` *(new)* | P1 |
| C3 | Landing pages | طراحی لندینگ پیج | قیمت لندینگ پیج | Commercial (unverified) | Section in website design | P2 |
| C4 | Web apps & product | ساخت وب اپلیکیشن | طراحی وب اپلیکیشن، ساخت mvp، داشبورد مدیریتی | Mixed commercial/DIY | `/fa/services/full-stack-development` | P1 |
| C5 | AI automation | شرکت اتوماسیون هوش مصنوعی | اتوماسیون هوش مصنوعی، اتوماسیون کسب و کار با هوش مصنوعی، آژانس هوش مصنوعی | Mixed; commercial SERP is soft | `/fa/services/ai-automation` | P1 |
| C6 | AI agents | ساخت ایجنت هوش مصنوعی | ایجنت هوش مصنوعی برای کسب و کار، خرید ایجنت هوش مصنوعی | Mostly courses/tutorials + some providers | `/fa/services/ai-automation/ai-agents` *(new)* | P1 |
| C7 | AI cost | هزینه ساخت ایجنت هوش مصنوعی | قیمت ایجنت، هزینه اتوماسیون هوش مصنوعی | Commercial investigation (guides rank) | `/fa/guides/ai-agent-cost` *(new)* | P1 |
| C8 | n8n | پیاده سازی n8n / متخصص n8n | اتوماسیون n8n، ایجنت n8n، نصب n8n روی سرور | Informational + hiring | `/fa/services/ai-automation/n8n` *(new)* | P1 |
| C9 | Chatbots | چت بات هوشمند برای سایت | چت بات سازمانی، ساخت چت بات هوش مصنوعی | SaaS-dominated commercial | `/fa/services/ai-automation/ai-chatbot` *(new)* | P2 |
| C10 | Messaging automation | ربات دایرکت اینستاگرام | پاسخگویی خودکار دایرکت، ربات تلگرام فروش | Mixed | `/fa/services/ai-automation/instagram-automation` *(new)* | P2 |
| C11 | CRM & sales automation | اتصال crm به سایت | اتوماسیون فروش، پیاده سازی crm | Vendor-dominated | Sections in AI + biz-dev pages | P2 |
| C12 | Marketing & growth | سیستم جذب لید | خدمات سئو، دیجیتال مارکتینگ | Very competitive | `/fa/services/marketing-growth` | P3 (P2 for lead-gen systems) |
| C13 | Business development | مشاوره توسعه کسب و کار | تحقیق بازار، استراتژی ورود به بازار | Unverified | `/fa/services/business-development` | P3 |
| C14 | Industries | طراحی سایت آموزشی | پلتفرم آموزش آنلاین، گیمیفیکیشن؛ (real estate held) | Commercial (unverified) | `/fa/industries/education` *(new)* | P1 (education) / P3 (others) |
| C15 | Brand | آژانس بلونا | بلونا، bellona agency | Navigational, **ambiguous** | `/fa`, `/` | P1 |
| C16 | English | persian website design | bilingual english persian website, ai automation agency | Global, saturated except RTL niche | EN pages | P2 (RTL niche) / P3 |
| C17 | Comparisons | n8n یا make یا zapier | طراحی اختصاصی یا وردپرس، next.js یا وردپرس | Commercial investigation | `/fa/guides/*` | P2 |
| C18 | Objections | مالکیت کد سایت | دسترسی به API هوش مصنوعی در ایران، امنیت داده | Informational | FAQs + guides | P1 (FAQs) / P2 (guides) |

## Keywords deliberately **not** targeted

| Keyword | Reason |
|---|---|
| اتوماسیون اداری / اتوماسیون | SERP is office-automation software (Faragostar, Chargoon, SystemGroup) — wrong product |
| آموزش n8n / دوره ایجنت هوش مصنوعی | Course intent; Bellona doesn't sell courses |
| n8n چیست / وب اپلیکیشن چیست | Publisher territory; low conversion; only link out or cover inside a deeper guide |
| شرکت طراحی سایت تهران | Requires a verifiable Tehran address; avoid until confirmed |
| خدمات سئو (head) | No SEO case study yet; extremely competitive |

## Research limitations

- No measured volumes: validate P1 clusters in **Google Keyword Planner** (free with a Google Ads account) and, if available, Semrush/Ahrefs with database "IR". Expected outcome: confirm relative ranking of C1/C2/C5/C8 and discover long-tails missed here.
- SERPs captured from outside Iran on one date; re-check from an Iranian connection.
- Bellona has no Search Console data in this research — after cutover, existing impressions should re-seed this database.
