# Bellona — SEO Executive Summary

Research date: **2026-10-21** · Full report: [SEO_MASTER_RESEARCH_REPORT.md](SEO_MASTER_RESEARCH_REPORT.md)

## Business context

Bellona (بلونا) is a small, four-person team of Sharif University of Technology students offering five services from one team: website design, full-stack/product development, AI agents & automation, marketing & growth, and business development. The new site (Next.js, English + Persian) is live at `bellona-web.onrender.com`; the canonical domain `bellonaagency.com` still serves an older site. Budgets in the contact form are in **toman** (under 50M to over 200M), which indicates Iranian clients are the primary market. Primary objective (inferred): **qualified leads** via a free 30-minute strategy call.

## Most important findings

1. **The new site cannot rank yet.** Every canonical, hreflang and sitemap URL points to `bellonaagency.com`, which still serves the old site. Google currently indexes the old homepage and thin "projects coming soon" industry pages.
2. **Visible template placeholders** ("[24 h]", "[FOUNDING YEAR, LOCATION AND ORIGIN STORY]", six unanswered FAQ answers) appear in live copy and metadata. Fix before launch.
3. **The technical foundation is good:** server-rendered, correct `lang`/`dir`, reciprocal hreflang, clean URLs, proper 404s, breadcrumb/FAQ/service schema, desktop lab LCP ≈ 1.7 s and CLS 0.
4. **Pages are thin and proof is missing.** Service pages carry ~300–400 words (AI page ~1,100) versus 1,000–3,300 on ranking competitor pages; case studies have no results; headline statistics are unsupported.
5. **Demand is lopsided.** In Iran over the past 12 months, Google Trends shows "طراحی سایت" far above "n8n", and "ایجنت هوش مصنوعی" near zero by comparison. Web design is the large pool; AI automation is a smaller, emerging niche.
6. **AI-automation SERPs are winnable; web-design SERPs are not (yet).** A ~280-word page and an H1-less homepage rank on page one for AI-agency queries; web-design head terms are held by mature agencies with long pages, listicles and sponsored PR.
7. **Brand ambiguity.** "بلونا" returns furniture, clothing and the Roman goddess; "Bellona" returns an environmental NGO. Bellona needs a consistent disambiguated brand phrase and entity signals.

## Biggest risks

- Launching the new site without redirecting old URLs or neutralising the Render host.
- Shipping placeholders into structured data and snippets.
- Chasing "طراحی سایت" head terms against entrenched competitors instead of niches.
- Unverifiable performance claims undermining trust with cautious B2B buyers.
- Hosting latency/reachability for Iranian users (unverified).

## Highest-value opportunities

| Opportunity | Why |
|---|---|
| AI automation hub + **AI agents** and **n8n implementation** pages | Soft commercial SERPs; hiring intent visible for n8n |
| **Cost guides** (website 1405, AI agent) using Bellona's real budget brackets | #1-ranking format in both markets; Bellona already has brackets |
| **Next.js website design** page | Bellona's own site is live proof |
| **Education platforms** industry page | 3 of 4 case studies are education |
| Case-study **outcomes** + internal links from services | Converts existing work into proof and relevance |

## Strategic recommendations

1. **Launch correctly first (M0):** fix placeholders → deploy to bellonaagency.com → 301 old URLs → noindex/redirect Render → Search Console.
2. **Persian-first niche strategy:** win AI automation, n8n and AI-agent queries, and web-design niches (Next.js, bilingual RTL, education) before head terms.
3. **Proof over claims:** publish real outcomes, testimonials, prices ranges and team expertise.
4. **Earn authority legitimately:** client credit links, Sharif ecosystem, directories and useful guides; label any paid placements `rel="sponsored"`.
5. **Measure from day one:** baseline before cutover; track leads by landing page and cluster.

Implementation order and acceptance criteria: [SEO_IMPLEMENTATION_BACKLOG.md](SEO_IMPLEMENTATION_BACKLOG.md).
