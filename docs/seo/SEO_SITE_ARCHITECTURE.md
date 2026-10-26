# Bellona — Site Architecture & Keyword-to-Page Mapping

Research date: **2026-10-21**
Back to: [Master report](SEO_MASTER_RESEARCH_REPORT.md) · Keywords: [Keyword database](SEO_KEYWORD_DATABASE.md) · Content: [Content roadmap](SEO_CONTENT_ROADMAP.md)

## Principles

1. **Persian first.** The contact form prices in toman and the commercial SERPs Bellona can win are Persian. English pages stay complete and accurate, but new pages are built in Persian first and mirrored to English only where an English query exists (mainly the bilingual/RTL niche).
2. **One intent, one URL.** Sub-service pages are created only where the SERP shows a distinct intent (e.g. n8n hiring vs. general AI automation).
3. **No page without proof or substance.** Industry pages only where Bellona has case studies (Education now). The old "coming soon" industry pages are not recreated.
4. **Keep existing URL patterns.** The current `/services/{slug}` and `/fa/services/{slug}` structure is clean; new pages nest under it.

## Current inventory (new site, 16 indexable URLs per locale)

`/` · `/services` · `/services/website-design` · `/services/full-stack-development` · `/services/ai-automation` · `/services/marketing-growth` · `/services/business-development` · `/partner` · `/industries` · `/work` · `/work/{konjed,nira-perfume,microshamim,codechee}` · `/about` · `/contact` — each with a `/fa` twin. `/privacy`, `/terms` are noindex.

## Proposed hierarchy

```
/fa (homepage — brand + "آژانس بلونا" entity, links to all services)
├── /fa/services (hub)
│   ├── /fa/services/website-design                 [C1]  existing — expand
│   │   └── /fa/services/website-design/nextjs      [C1a] NEW  P1
│   │   └── (later) /fa/services/website-design/bilingual   [C1b] P2 — only if section earns impressions
│   ├── /fa/services/full-stack-development         [C4]  existing — expand
│   ├── /fa/services/ai-automation                  [C5]  existing — expand (hub for AI)
│   │   ├── /fa/services/ai-automation/ai-agents    [C6]  NEW  P1
│   │   ├── /fa/services/ai-automation/n8n          [C8]  NEW  P1
│   │   ├── /fa/services/ai-automation/ai-chatbot   [C9]  NEW  P2
│   │   └── /fa/services/ai-automation/instagram-automation [C10] NEW P2
│   ├── /fa/services/marketing-growth               [C12] existing — fix placeholders
│   └── /fa/services/business-development           [C13] existing — fix placeholders
├── /fa/industries (hub)  existing
│   └── /fa/industries/education                    [C14] NEW  P1
├── /fa/work (hub) + 4 case studies                 existing — add outcomes
├── /fa/guides (hub)                                 NEW  P1
│   ├── /fa/guides/website-design-cost              [C2]  NEW  P1
│   ├── /fa/guides/ai-agent-cost                    [C7]  NEW  P1
│   ├── /fa/guides/n8n-vs-make-vs-zapier            [C17] NEW  P2
│   ├── /fa/guides/nextjs-vs-wordpress              [C17] NEW  P2
│   └── /fa/guides/self-hosted-n8n-iran             [C8/C18] NEW P2
├── /fa/partner · /fa/about · /fa/contact            existing
```

English mirrors: create `/services/website-design/nextjs` and `/services/ai-automation/{ai-agents,n8n}` alongside the Persian versions so hreflang pairs stay complete (the site's i18n already enforces pairs). English guides only where an English query exists (P3).

> Slug note: "guides" is suggested over "blog" because these are evergreen decision guides. If the team prefers `/blog`, use it consistently — just don't create both.

## Keyword-to-page mapping and recommended metadata

Titles ≈ 50–60 characters; brand last. Persian H1 must contain the primary keyword; the existing slogan can stay as a visual tagline (paragraph or eyebrow).

| URL | Primary keyword | Secondary | Proposed `<title>` | Proposed H1 | Intent | Pri. |
|---|---|---|---|---|---|---|
| `/fa` | آژانس بلونا | طراحی سایت، اتوماسیون هوش مصنوعی، ایجنت | بلونا؛ طراحی سایت، ایجنت و اتوماسیون هوش مصنوعی | Keep brand H1; add «آژانس بلونا» in first paragraph | Navigational + commercial | P1 |
| `/fa/services/website-design` | طراحی سایت اختصاصی | خدمات/سفارش طراحی سایت، شرکتی، دوزبانه، لندینگ | طراحی سایت اختصاصی، دوزبانه و سریع · بلونا | طراحی سایت اختصاصی که بازدیدکننده را مشتری می‌کند | Commercial | P1 |
| `/fa/services/website-design/nextjs` | طراحی سایت next.js | طراحی سایت با next js، سایت سریع و سئو | طراحی سایت با Next.js؛ سریع، دوزبانه، سئو‌محور · بلونا | طراحی سایت با Next.js | Commercial | P1 |
| `/fa/services/full-stack-development` | ساخت وب اپلیکیشن | طراحی وب اپلیکیشن، ساخت MVP، داشبورد مدیریتی | ساخت وب اپلیکیشن، MVP و داشبورد اختصاصی · بلونا | ساخت وب اپلیکیشن و محصول دیجیتال | Commercial | P1 |
| `/fa/services/ai-automation` | شرکت اتوماسیون هوش مصنوعی | اتوماسیون کسب و کار با هوش مصنوعی، آژانس هوش مصنوعی | اتوماسیون کسب‌وکار با هوش مصنوعی و ایجنت · بلونا | اتوماسیون کسب‌وکار با هوش مصنوعی | Commercial | P1 |
| `/fa/services/ai-automation/ai-agents` | ساخت ایجنت هوش مصنوعی | ایجنت برای کسب و کار، خرید ایجنت، کارمند دیجیتال | ساخت ایجنت هوش مصنوعی برای کسب‌وکار · بلونا | ساخت ایجنت هوش مصنوعی برای کسب‌وکار شما | Commercial | P1 |
| `/fa/services/ai-automation/n8n` | پیاده سازی n8n | متخصص n8n، اتوماسیون n8n، ایجنت n8n | پیاده‌سازی و اتوماسیون n8n برای کسب‌وکار · بلونا | پیاده‌سازی n8n و اتوماسیون فرایند | Commercial/transactional | P1 |
| `/fa/services/ai-automation/ai-chatbot` | چت بات هوشمند برای سایت | چت بات سازمانی، چت بات پشتیبانی | چت‌بات هوشمند اختصاصی برای سایت و CRM · بلونا | چت‌بات هوش مصنوعی اختصاصی، وصل به داده‌های شما | Commercial | P2 |
| `/fa/services/ai-automation/instagram-automation` | ربات دایرکت اینستاگرام | پاسخگویی خودکار دایرکت، ربات تلگرام فروش | اتوماسیون دایرکت اینستاگرام با هوش مصنوعی · بلونا | پاسخ‌گویی و فروش خودکار در دایرکت اینستاگرام | Commercial | P2 |
| `/fa/services/marketing-growth` | سیستم جذب لید | مارکتینگ و رشد، کمپین | سیستم جذب لید و مارکتینگ رشد · بلونا | سیستم جذب لید و رشد فروش | Commercial | P2 |
| `/fa/services/business-development` | مشاوره توسعه کسب و کار | پیاده سازی CRM، تحقیق بازار، GTM | توسعه کسب‌وکار، راه‌اندازی CRM و ورود به بازار · بلونا | توسعه کسب‌وکار، از برنامه تا CRM | Commercial | P3 |
| `/fa/industries/education` | طراحی سایت آموزشی | پلتفرم آموزش آنلاین، گیمیفیکیشن آموزشی | طراحی سایت و پلتفرم آموزشی گیمیفای‌شده · بلونا | طراحی سایت و پلتفرم آموزشی | Commercial | P1 |
| `/fa/guides/website-design-cost` | قیمت طراحی سایت ۱۴۰۵ | هزینه/تعرفه طراحی سایت | قیمت طراحی سایت ۱۴۰۵؛ بازه‌های واقعی و عوامل هزینه · بلونا | قیمت طراحی سایت در ۱۴۰۵ | Commercial investigation | P1 |
| `/fa/guides/ai-agent-cost` | هزینه ساخت ایجنت هوش مصنوعی | قیمت ایجنت، هزینه اتوماسیون | هزینه ساخت ایجنت هوش مصنوعی در ایران (۱۴۰۵) · بلونا | هزینه ساخت ایجنت هوش مصنوعی چقدر است؟ | Commercial investigation | P1 |
| `/fa/work/konjed` etc. | brand + project type | e.g. طراحی پلتفرم آموزشی گیمیفای | کنجد؛ طراحی پلتفرم آموزش مهارت با بازی · بلونا | keep project name; add descriptor subheading | Proof | P2 |

English titles follow the same pattern (e.g. `Bilingual Persian–English website design · Bellona`).

> Year in titles: `۱۴۰۵` (Persian solar year 1405 ≈ March 2026–March 2027) is the market norm on pricing pages. If used, it must be updated each Nowruz — add to the measurement calendar.

## Internal linking strategy

| From | To | Anchor (example) | Why |
|---|---|---|---|
| Every service page | 1–2 relevant case studies | «نمونه: پلتفرم آموزشی کنجد» | Proof at decision point (currently missing) |
| Each case study | Services used + industry page | «طراحی سایت»، «توسعه محصول»، «پلتفرم‌های آموزشی» | Relevance flows back to money pages |
| `/fa/services/ai-automation` (hub) | All 4 AI sub-pages | Descriptive anchors, not "بیشتر" | Hub → spoke |
| AI sub-pages | Hub + cost guide + contact (`?need=ai`) | «هزینه ساخت ایجنت» | Spoke → hub → conversion |
| Website design page | Next.js page, cost guide, education industry | «طراحی سایت با Next.js» | Niche spokes |
| Guides | Matching service page (one primary CTA link) | Service name | Informational → commercial |
| Homepage | Services hub, top 4 service pages, `/fa/guides`, `/fa/work` | Service names | Distribute authority |
| Footer | Add service links (currently footer only lists nav pages) | Service names | Sitewide crawl paths |

Use descriptive Persian anchors; avoid «اینجا»/«بیشتر بخوانید». Keep related-services blocks (already present) but add the case-study and guide blocks.

## Cannibalisation assessment

No existing cannibalisation was verified (no Search Console data). **Risks to manage when adding pages:**

| Risk | Pages | Mitigation |
|---|---|---|
| AI hub vs AI agents sub-page | `/fa/services/ai-automation` vs `/…/ai-agents` | Hub targets "اتوماسیون/شرکت اتوماسیون هوش مصنوعی"; sub-page owns "ساخت ایجنت". Hub summarises agents in ≤1 section and links down. |
| Website design vs Next.js page | `/website-design` vs `/website-design/nextjs` | Main page owns "طراحی سایت اختصاصی"; Next.js page owns technology queries only. |
| Cost guides vs service pages | `/fa/guides/*-cost` vs services | Service pages show a short price-range box and link to the guide; the guide owns "قیمت/هزینه" queries. |
| Homepage vs services hub | `/fa` vs `/fa/services` | Homepage = brand; services hub = "خدمات" listing. Both fine with distinct titles. |
| Old domain industry URLs | `/industries/realEstate` etc. | 301 at cutover (see [Technical audit](SEO_TECHNICAL_AUDIT.md) TA-02). |

## Redirect map for cutover

| Old URL (bellonaagency.com) | New target | Code |
|---|---|---|
| `/industries/education` | `/industries/education` once created; else `/industries` | 301/308 |
| `/fa/industries/education` | `/fa/industries/education` once created; else `/fa/industries` | 301/308 |
| `/industries/{realEstate,finance,healthcare,ecommerce,consulting}` | `/industries` | 301/308 |
| `/fa/industries/{realEstate,finance,healthcare,ecommerce,consulting}` | `/fa/industries` | 301/308 |
| `/`, `/fa` | same | — |

Claude Code must also check whether the old site had any other routes (e.g. old blog/contact paths) by reviewing the old project or Search Console's indexed pages before cutover.
