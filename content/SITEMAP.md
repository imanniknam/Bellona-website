# Sitemap (proposed)

Every EN route has a Persian twin under `/fa` (`dir="rtl"`, Estedad, Persian digits). Slugs stay Latin in both languages so URLs remain stable and shareable.

```
/                                   Home
├── /services                       Overview of the five pillars
│   ├── /services/website-design
│   ├── /services/full-stack-development
│   ├── /services/ai-automation          ← current core; reuses most of today's site
│   ├── /services/marketing-growth
│   └── /services/business-development
├── /partner                        "Your complete partner": journey + engagement models
├── /industries                     6 sectors on one page (anchors: #real-estate, #finance, …)
├── /work                           Case-study index (filter by pillar chip)
│   └── /work/[slug]                Case-study template (MDX/TS content file per project)
├── /about                          Story + founders
├── /contact                        Form + booking
├── /privacy                        [OWNER TO SUPPLY TEXT]
└── /terms                          [OWNER TO SUPPLY TEXT]

/fa/…                               Same tree, RTL
```

## Navigation

- **Header (pill nav):** Work · Services ▾ (5 pillars) · Partner · Industries · About · Contact · فارسی
  - FA: نمونه‌کارها · خدمات ▾ · همراهی کامل · صنایع · درباره ما · تماس · EN
  - The mobile menu opens from the round black menu button. The language link always points to the *same page* in the other language.
- **Header CTA:** Book a 30-min free call → `BOOKING_URL` (falls back to `/contact`)
- **Footer:** Work · Services · Partner · Industries · About · Contact · Privacy · Terms · bellona.ai.team@gmail.com · [SOCIAL LINKS]

## Page outlines

### `/` Home
Follows HomeBWO, with the extra sections woven in:
1. Header
2. Hero: tagline pill, headline, sub, CTAs, stats pill, **animated HeroMark on the iso grid**
3. Client logos strip: **hidden until real logos exist**
4. Who we are: statement + "Read our story" → `/about`
5. **Five pillars** (dark, rounded top) + stats row 100+ / 24/7 / 80% / 3X
6. **Your complete partner**: 6-step journey track (horizontal on desktop, vertical on mobile) → `/partner`
7. Recent work: 2×2 with pillar chips → `/work` (hidden until real projects exist, see TODO Q5)
8. **From lead to revenue**: 6-node flow tagged by pillar
9. Getting started: 3 steps
10. **Industries**: 6 compact cards → `/industries`
11. **Why Bellona**: 01–05 list + **Traditional team vs Bellona** table
12. **Engagement models**: 3 cards
13. **Founders**: 2 cards → `/about`
14. Testimonials: chat bubbles, **hidden until 3 real quotes exist**
15. **FAQ**: 8 items
16. Contact (dark): form + booking, then footer + giant wordmark

### `/services`
Hero → 5 pillar cards (bigger, with "what's included") → Lead→Revenue flow → engagement models teaser → CTA

### `/services/[pillar]` (one shared template, five content files)
1. Hero: eyebrow (`01 · BUILD`), H1, sub, CTA
2. What's included: 4–6 items with line icons
3. How we deliver: pillar-specific steps
4. "Connects with": the other pillars this one plugs into
5. Pillar-specific content (AI page: pain cards, Monday before/after, 5-step process)
6. FAQ (3–5 items, with FAQPage JSON-LD)
7. CTA: contact form with this pillar's chip preselected

### `/partner`
Hero → the "five agencies" problem → 6-step journey (full version, with deliverables per step) → engagement models (full) → Traditional vs Bellona → FAQ → CTA

### `/industries`
Hero → 6 sector blocks. Each has the real one-liner, plus "What we'd build" chips across pillars and a "Talk about your [sector] project" CTA (prefills the form). No per-industry pages until case studies exist.

### `/work` and `/work/[slug]`
- **Index:** pillar filter chips + project grid. Empty state: "Case studies are on the way. Ask us for references on a call." [CONFIRM wording]
- **Template:** Client, sector, pillars, year · Challenge · What we built · Result (**only sourced numbers**) · Stack chips · Gallery · Optional client quote · Next project · CTA

### `/about`
Who we are (long form) → Story [OWNER TO SUPPLY: founding year, origin] → Founders → How we work (values = Why Bellona 01–05) → CTA

### `/contact`
Headline + sub + 3-step "what happens next" → form → booking embed or link → email

## Redirects (301) from the current site

| Old | New |
|---|---|
| `/industries/realEstate` | `/industries#real-estate` |
| `/industries/finance` | `/industries#finance` |
| `/industries/healthcare` | `/industries#healthcare` |
| `/industries/ecommerce` | `/industries#ecommerce` |
| `/industries/consulting` | `/industries#consulting` |
| `/industries/education` | `/industries#education` |
| `/fa/industries/*` | `/fa/industries#*` (same mapping) |

## SEO notes
- `hreflang` en / fa / x-default (→ en) on every page. No cookie-based auto-redirect.
- `sitemap.xml` lists only real pages: 13 routes × 2 languages + case studies.
- JSON-LD:
  - `ProfessionalService` on every page (name, url, email, areaServed [CONFIRM], `knowsAbout` = pillars)
  - `FAQPage` on pages with an FAQ
  - `BreadcrumbList` on sub-pages
- OG image per page, generated with `next/og` in brand colours (cube mark + headline).
