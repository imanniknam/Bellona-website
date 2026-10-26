# Bellona: positioning, offers and site structure (2026-10-23)

This is the reasoning behind the copy in `content/en.ts` and `content/fa.ts`. Change the copy there, not here.

## 1. The one-line message

| | EN | FA |
|---|---|---|
| Headline | Websites that sell. **AI that follows up.** | سایتی که مشتری می‌آورد؛ **سیستمی که از دستش نمی‌دهد.** |
| What we sell | A custom-coded website or platform, connected to AI automation that answers and follows up every lead, plus the growth work that feeds it. | |
| Who sells it | One engineering team from Sharif University. You talk to the builders. | |
| Tagline (kept) | BUILD · AUTOMATE · GROW | بساز · خودکار کن · رشد کن |

A visitor should get three answers in five seconds: **what** (a website that sells, plus AI follow-up), **proof** (15 shipped projects, Sharif engineers, EN/FA), and **next step** (a free growth audit).

## 2. Why this positioning (market read)

- **Iran, websites:** most agencies sell WordPress templates (roughly 15–25M toman). Custom-coded sites are priced far higher and sold on looks. Few talk about leads or follow-up.
- **Iran, automation:** n8n shops sell single workflows (from about 3M toman) or hosting. None of them build the website the leads come from.
- **International:** AI agencies sell productized "speed-to-lead" and "website + CRM automation" bundles with a setup fee plus a monthly retainer.
- **Bellona's real evidence** (`content/work.ts`): 13 of 15 projects are custom websites or platforms (education, e-commerce, media), plus one deep AI sales system (12 n8n workflows, a 7-table CRM).
- **The gap we own:** a custom-coded site *and* the automation behind it, from one team, in Persian and English. That is the core offer. Everything else is either a way into it or a standalone piece of it.

## 3. Owner feedback, and the fix for each point

| Problem | Fix |
|---|---|
| 1. The main message is unclear | The hero says exactly what we sell: a website that sells, plus AI that follows up. The sub-copy explains how. |
| 2. Five equal services | One core offer, **the Growth System** (Build → Automate → Grow). The five services are listed beneath it as "also available on their own". |
| 3. The page is too busy | The home page went from 14 sections to 11, ordered as one story: pain → core offer → offers → proof → process → promises → team → FAQ → contact. Journey, the 3D flow, Industries and Why moved to their own pages. |
| 4. Claims need backing | Removed: 100+ automations, 24/7 AI operations, 80%, 3X, 200+ platforms and "results within 90 days". Stats now come from `work.ts` (15 projects, 12 workflows, 278 migrated posts, 2 languages). Finance, healthcare and consulting are removed, with 301 redirects; Media was added because of Dane. |
| 5. Corporate brand vs student team | The two are merged into one message: "Engineers, not account managers". A small Sharif team is a strength, because you work directly with the people who build it. |
| 6. Accept the current phase | We say what we have proven: custom web and platforms, plus AI sales automation. Business development stays as a page but is no longer pushed. |

## 4. Personas

1. **Iranian SME owner (primary).** Has a shop, school, clinic or service business, often with an old template site and Instagram DMs as the "CRM". Wants more customers and less chasing. Fears paying and getting a pretty site that sells nothing, or an agency that disappears after launch.
   - Hook: the free audit, a fixed quote and "you own everything".
2. **Startup or edtech founder.** Needs a product or MVP, not just a site. Cares about engineering quality and speed.
   - Hook: "Building a product?", Codechee, Konjed and Prowem, and Sharif engineers.
3. **International or diaspora business** (EU, Gulf, Persian-speaking owners abroad). Wants good engineering at a sensible cost, and often needs both English and Persian.
   - Hook: the AI real-estate system for kharazie.at, EN/FA, remote work.

## 5. Customer journey on the site

`Hero (what + proof + CTA)` → `Shipped for (marquee of real clients)` → `Visitors come. Customers don't. (pain)` → `One system, three layers (core offer + real stats)` → `Offers: Audit / Launch / Automate / Growth System` → `Work` → `From first call to first sale` → `Promises` → `Engineers, not account managers` → `FAQ (price, time, existing site, ownership, abroad)` → `Contact (pre-filled with the offer clicked)`.

Every offer button opens `/contact?need=<offer>`, so the form arrives pre-selected and the lead email says which offer was clicked.

## 6. The offers

| # | Offer | For | Promise | Timeline | Price on site |
|---|---|---|---|---|---|
| 1 | Free Growth Audit | "Something leaks, I don't know where" | 30-min call with an engineer, the 3 best fixes, a fixed quote if wanted | 30 min | Free |
| 2 | Launch: Sales Website | Needs a site that brings customers | Custom design, hand-coded, SEO-ready, EN/FA, forms wired to CRM/Telegram | In the quote | Fixed quote |
| 3 | Automate: AI Sprint | Repetitive work, slow follow-ups | One process automated end to end, with docs and training | 2–4 weeks | Fixed quote |
| 4 | **The Growth System** (core) | Wants one team to own growth | Launch + an automation sprint + monthly SEO, content and campaigns + a monthly report | Launch, then monthly | Monthly partnership |
| + | Custom product / MVP | Founders | Web apps, platforms, stores, mobile | Project | (via the service page) |

**Pricing advice (not on the site):** show "from" prices once you are comfortable. Rough anchors from the market scan:
- Launch: well above template agencies, below the 100M+ "custom" tier.
- AI Sprint: a fixed setup fee per process.
- Growth System: a setup fee plus a monthly retainer, for example 3- or 6-month terms.

## 7. Promises (risk reversal): confirm each before launch

- [ ] **Fixed quote first:** scope, price and timeline in writing before any work.
- [ ] **Weekly progress:** a preview link and a short demo every week.
- [ ] **You own everything:** code, domain, hosting accounts and data, from day one.
- [ ] **Talk to the builders:** no account managers.
- [ ] **We stay after launch:** monitoring, fixes and improvements. Consider stating a concrete free-support period, such as 30 days.

If any of these is not true for every client, edit or remove it in `offers.promises` (en/fa) and in the matching FAQ answers.
