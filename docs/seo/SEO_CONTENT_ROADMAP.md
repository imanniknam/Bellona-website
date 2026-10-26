# Bellona — Content Roadmap

Research date: **2026-10-21**
Back to: [Master report](SEO_MASTER_RESEARCH_REPORT.md) · Pages & URLs: [Site architecture](SEO_SITE_ARCHITECTURE.md)

> **Rule for all content:** every claim, number, price and timeline must come from the Bellona team. Claude Code may draft structure and copy, but must leave clearly marked TODOs for facts and must **not** ship unreplaced placeholders (the current site already has this problem — see Technical audit TA-04). Do not mass-produce generic AI articles.

## 1. Existing-page assessment

| Page | Answers main query? | Proof / expertise | Main gaps | Action | Pri. |
|---|---|---|---|---|---|
| `/fa` homepage | Brand yes; services broad | Team (all students at Sharif — strong local credibility), 3 case cards | No outcomes; claims unsubstantiated; "[24 h]" placeholder | Update | P1 |
| `/fa/services/website-design` (~350 words) | Partly | None linked | Keyword H1; no case study; no price range; CMS FAQ placeholder; no process detail per step; bilingual/RTL and Next.js only as bullets | **Expand** to ~1,200–1,500 words | P1 |
| `/fa/services/full-stack-development` (~400) | Partly | None | 3 FAQ placeholders (tech stack, code ownership, take-over) — these are exactly the buyer objections | Expand + fill | P1 |
| `/fa/services/ai-automation` (~1,100) | Yes, broadly | Claims "100+ automations, 80%, 3x" with no case | Keyword H1; no case study; no price anchors; no explanation of AI access/hosting in Iran; tool list lacks local tools (Telegram/Bale, Iranian CRMs) | Update + add proof | P1 |
| `/fa/services/marketing-growth` (~300) | Thin | None | 2 placeholders; no SEO/marketing case | Fill placeholders; keep modest | P2 |
| `/fa/services/business-development` (~350) | Thin | None | 1 placeholder | Fill placeholder | P2 |
| `/fa/partner` (~600) | Yes | — | Engagement models named but not described | Describe project / monthly / dedicated-team | P2 |
| `/fa/industries` (~350) | Generic | None | Industries are claims without proof | Link Education to new page; label others honestly | P2 |
| `/fa/work/*` (~300 each) | Describe projects | Screens | **No outcomes, no testimonial, no stack, no timeline** | Add results block | P1 |
| `/fa/about` (~400) | Partly | Team + Sharif | Origin-story placeholder; no founding year/location | Fill | **P0** (placeholder) |
| `/fa/contact` | Yes | — | "[24 h]"; no scheduler; Gmail; no phone | Fix | **P0** (placeholder) |

## 2. Content gap matrix

| Missing topic | Cluster | Competitors covering it | Bellona coverage | User need | Format | Unique value Bellona can add | Business value | Pri. | Internal links |
|---|---|---|---|---|---|---|---|---|---|
| Next.js website design | C1a | lidoma.agency, payamava.net, hooshgraph.com, kiantc.com | One bullet | "Will a modern stack make my site faster and rank better?" | Service page | Bellona's own site as live proof (LCP ≈1.7 s lab), bilingual RTL Next.js builds | High | P1 | ← website-design, nextjs-vs-wordpress guide; → contact `?need=web` |
| Website cost 1405 | C2 | dadevarzan, palette, webkaj, rayanitco, vistaapp, hamyarsite, wizon, avinapardaz | None (only budget brackets in form) | "What should I budget?" | Guide with ranges table | Real ranges tied to Bellona's own brackets (زیر ۵۰ / ۵۰–۱۰۰ / ۱۰۰–۲۰۰ / ۲۰۰+ میلیون تومان) and what each buys | High | P1 | → website-design, nextjs, contact |
| AI agent cost in Iran | C7 | ivira.ai, emait.ir, sitedesignmashhad.ir, halitech.ir, ayratech shop; biziloc from-prices | None | "How much will an agent cost, incl. API/hosting?" | Guide | First-hand breakdown: build fee vs monthly model/API cost vs hosting; Iran-specific access costs | High | P1 | → ai-agents, n8n, ai-automation |
| AI agents service | C6 | ayratech, mihanai, utta, gapgpt (DIY) | Section of AI page | "Can you build an agent that does X for me?" | Service page | Concrete agent examples per industry; demo; what "done" means; human hand-off | High | P1 | ↔ ai-automation hub, ai-agent-cost |
| n8n implementation | C8 | karlancer (freelancers), n8nir, iranserver (hosting), courses | Tool named only | "Hire someone to build/maintain our n8n" | Service page | Self-hosted n8n set-up, monitoring, maintenance SLA; Persian docs; integrations with Iranian tools | High | P1 | ↔ hub; → self-hosted guide, comparison guide |
| Education platforms | C14 | (none observed with gamified focus) | 3 case studies, no page | "Who can build a learning platform for teens?" | Industry page | Konjed, Codechee, Microshamim with outcomes | High | P1 | ↔ 3 case studies, website-design, full-stack |
| Case-study outcomes | proof | rahweb (clients), mihanai (testimonials) | None | "Have they done it before, and did it work?" | Add to 4 case pages | Metrics, testimonial, stack, timeline | High | P1 | ↔ services |
| Custom chatbot | C9 | ila.chat, gapify, raychat (SaaS) | Bullet ("smart support") | "Bot that knows my products and talks to my CRM" | Service page | Position against SaaS: custom data, integrations, ownership | Med | P2 | ↔ hub |
| Instagram DM automation | C10 | virgool posts, how-tos | None | Iranian SMBs sell via Instagram | Service page | Lead capture from DMs into CRM | Med–High | P2 | ↔ hub, marketing |
| n8n vs Make vs Zapier | C17 | Few Persian comparisons observed | None | Tool choice incl. payment/access limits in Iran | Guide | Practitioner view (Bellona uses all three) | Med | P2 | → n8n page |
| Next.js vs WordPress | C17 | kiantc (pros/cons), rahweb (custom vs template) | None | Choose stack | Guide | Real trade-offs incl. editing for non-devs (CMS answer currently a placeholder) | Med | P2 | → nextjs page |
| Self-hosted n8n in Iran | C8/C18 | iranserver, hamravesh (hosting vendors) | None | Reliability under filtering/sanctions | Guide | Implementation checklist from real deployments | Med | P2 | → n8n page |
| AI API access & data security for Iranian businesses | C18 | hoosha (security section) | None | Major objection | Guide or FAQ block | Honest explanation of options (international APIs vs local/self-hosted models) — must be legally reviewed | Med | P2 | → AI pages |

## 3. Content briefs (P1)

### 3.1 `/fa/services/website-design` (expand)
- **Primary:** طراحی سایت اختصاصی · **Secondary:** خدمات طراحی سایت، سفارش طراحی سایت، طراحی سایت دوزبانه، طراحی لندینگ پیج
- **Outline:** H1 with keyword → who it's for → what's included (existing 6 items, each 2–3 sentences) → bilingual/RTL section → landing pages section → process (6 steps with deliverables & typical duration) → **price range box** linking to cost guide → case studies (Microshamim, Nira, Konjed) → tech & CMS (answer the placeholder) → support & ownership → FAQ (redesign, CMS, timeline, ownership, support, SEO basics) → CTA.
- **Must not:** claim "best/biggest"; invent timelines.

### 3.2 `/fa/services/website-design/nextjs` (new)
- **Primary:** طراحی سایت next.js · **Secondary:** طراحی سایت با next js
- **Outline:** what Next.js means for a business owner (speed, SEO, bilingual routing) → when it is / isn't the right choice → Bellona's stack & CMS options → proof (this site + case studies; include measured numbers only if Bellona re-measures them) → process & price → FAQ → CTA.

### 3.3 `/fa/services/ai-automation` (update hub)
- **Primary:** شرکت اتوماسیون هوش مصنوعی / اتوماسیون کسب و کار با هوش مصنوعی
- **Changes:** keyword H1; spoke cards to agents / n8n / chatbot / Instagram; replace unsupported stats with a case or ranges; add "how it works in Iran" (hosting, models, data); price-anchor box → AI cost guide; local integrations list (confirm which Bellona actually supports).

### 3.4 `/fa/services/ai-automation/ai-agents` (new)
- **Primary:** ساخت ایجنت هوش مصنوعی · **Secondary:** ایجنت هوش مصنوعی برای کسب و کار، خرید ایجنت هوش مصنوعی
- **Outline:** what an agent does in plain Persian → 5–6 concrete agent types (lead qualification, support, sales follow-up, reporting, internal knowledge) with input → action → output → build process → human-in-the-loop & safety → cost & running costs (link guide) → FAQ → CTA.

### 3.5 `/fa/services/ai-automation/n8n` (new)
- **Primary:** پیاده سازی n8n · **Secondary:** متخصص n8n، اتوماسیون n8n، ایجنت n8n
- **Outline:** who needs an n8n partner → services (setup self-hosted/cloud, workflow build, AI-agent nodes, monitoring, maintenance) → sample workflows → n8n vs Make/Zapier summary (link guide) → engagement models (project / monthly retainer) → FAQ → CTA.

### 3.6 `/fa/industries/education` (new)
- **Primary:** طراحی سایت آموزشی · **Secondary:** پلتفرم آموزش آنلاین، گیمیفیکیشن آموزشی
- **Outline:** challenges of education products (engagement, Persian UX, mobile) → what Bellona builds → 3 case studies with outcomes → automation for enrolment/support → CTA.

### 3.7 `/fa/guides/website-design-cost` and `/fa/guides/ai-agent-cost` (new)
- Ranges table using Bellona's real brackets; cost drivers; what's included at each level; hidden/running costs; how to get a quote. Mark the year; set an update reminder each Nowruz. Add `Article` JSON-LD with `dateModified` and an author (`Person`) from the team.

### 3.8 Case-study template (update 4 pages)
Client & context → problem → constraints (Persian, RTL, mobile) → what we built → stack → timeline → **results** (only real metrics or qualitative client quote with permission) → services used (links) → next project CTA.

## 4. Publication sequence

| Wave | Content | Depends on |
|---|---|---|
| 0 (before/at cutover) | Fill all placeholders; fix typo; about story; contact reply time | Team answers |
| 1 | Expand website-design, full-stack, AI hub; case-study outcomes | Facts, metrics, permissions |
| 2 | AI agents, n8n, Next.js pages; Education industry page | Wave 1 |
| 3 | Two cost guides + `/fa/guides` hub | Pricing approval |
| 4 | Chatbot, Instagram automation pages; comparison & self-hosted guides | Demand check after GSC data |
| 5 | English mirrors for new service pages; EN bilingual/RTL positioning | Market decision |

Estimated effort per wave is in the [Implementation backlog](SEO_IMPLEMENTATION_BACKLOG.md); calendar duration depends on how quickly the team supplies facts.
