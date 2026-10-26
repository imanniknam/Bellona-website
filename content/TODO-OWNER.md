# Open items for the owner

Everything here is your call or needs your input. Nothing on this list has been guessed in the copy. Each item shows up as `[PLACEHOLDER]` or **[CONFIRM]** in COPY.md.

## Update (2026-10-23): positioning and offers redesign

See `content/STRATEGY.md` for the full reasoning.

**Done**
- **New positioning:** "Websites that sell. AI that follows up." Core offer: the Growth System (Build → Automate → Grow).
- **Offers:**
  - New `/offers` page (EN + FA) and a home section with 4 offers: Free Growth Audit, Launch, AI Sprint, Growth System.
  - Each offer button pre-fills the contact form (new need id `system`).
- **Home page:** cut from 14 sections to 11. The client marquee is built from `work.ts`, and the core-offer section shows only sourced stats.
- **Unbacked claims removed:** 100+ automations, 24/7 ops, 80%, 3X, 200+ platforms, 90-day ROI.
- **Industries:** cut to real ones (education, e-commerce, real estate, media). Finance, healthcare and consulting now 301 to `/industries`.
- **Nav:** Work · Offers · Services · About · Contact. The Partner and Industries pages still exist and are listed in the sitemap, but they are no longer in the nav.

**Confirm before launch**
- [ ] The five promises in `offers.promises`: fixed quote, weekly demo, you own everything, direct access to engineers, support after launch.
- [ ] FAQ answers that depend on them: "Who owns the code" and "Do you work with clients outside Iran" (this one names kharazie.at).
- [ ] Offer details: website lead forms to Telegram; AI Sprint channels (email, chat, messengers).
- [ ] Whether to show "from" prices on the offer cards (currently "Fixed quote" / "Monthly partnership").

## Decisions applied (2026-10-21)

**Owner decisions**
- **Q5 Work:** the section stays on the home page and in the sitemap. It ships with designed placeholder slots and is fed from `content/work.ts`.
- **Q4 Service order:** kept the original order.
  - Pillars: Website design → Full-stack → AI agents & automation → Marketing & growth → Business development (BRIEF / HomeBWO order).
  - The six AI capabilities keep the live-site order: AI agents → Workflow automation → Lead generation → AI support → CRM automation → Custom integrations.
- **Q6–Q7 Team:** four slots. Iman Niknam and Sina Razi use their live-site roles and bios. Two slots stay `[NAME]` / `[ROLE]` / `[BIO]` until you supply them.
- **Positioning:** a technology partner for web design, full-stack development, **digital product development and launch**, AI agents, workflow automation and integrations. Pillar 02 is now "Full-stack & product development", with MVP & launch added.

**My judgment calls** (each one is a one-line change in `content/en.ts` / `fa.ts`)
- **Q1:** the home hero uses **B**, "Built, automated, and growing while you sleep." It widens beyond AI but keeps the brand line. **A** is now the H1 of the AI pillar page.
- **Q2:** the 40% / 65% figures are dropped. The FA wording is used in both languages.
- **Q3:** "senior" is dropped.
- **Q8, Q9:** softened as proposed.
- **Q10:** the three engagement models are used as named.
- **Q11:** the who-we-are statement is used.
- **Client logos + testimonials:** the components are built but render only once real entries exist in `content/proof.ts`. This keeps unfilled `[CLIENT QUOTE]` and `[CLIENT LOGO]` boxes off the live site.

## Update (2026-10-21, after build feedback)

**Done**
- **Pricing:** the engagement / pricing cards are removed from every page for now. The budget question was later removed from the contact form too (owner request, 2026-10-22). The `Engage` component and its copy are kept in the code for later.
- **Projects:** four real projects, ranked strongest first: Konjed, Nira Perfume, Microshamim, Codechee.
  - Screenshots are in `public/work/`. The home page shows the top three as small cards; `/work` and each case study show the full detail.
  - Copy describes only what is visible on each live site. No results or quotes.
- **Team:** four members, shown as name → role → skills → education. Iman and Sina are co-founders; Amirhossein Bazdar is CTO and Hafez Modirrousta is CMO. All four are Sharif students.
- **Instagram:** https://www.instagram.com/bellona.ai appears in the footer and menu, and in schema.org `sameAs`.
- **3D Lead → Revenue machine** (`agentic-factory-3d`): in the "From lead to revenue" section, in brand colours, lazy-loaded.

**Still open**
- [ ] **Codechee, logged-in screens:** gameplay, learning, escape room and quiz need a signed-in session. Claude can't sign in with your number. Sign in yourself (or send screenshots) and add them to `public/work/codechee/`.
- [ ] **Project results and quotes:** add only sourced numbers and approved quotes to `content/work.ts`.
- [ ] **Project years and stack** (optional fields in `content/work.ts`).
- [ ] **Team photos and LinkedIn URLs** (`photo`, `linkedin` in `team.members`).
- [ ] The reply-time promise `[24 h]` in the contact section.
- [ ] **Lighthouse performance** on simulated mobile is about 82–87 (desktop 100; accessibility, best practices and SEO 100 everywhere).
  - Plus Jakarta Sans now uses `display: "optional"` (owner decision). That gained only ~1 point, so the font was not the bottleneck.
  - What remains is hydration and rendering work on a long, animated page (hero animation, voxel art, 3D section) under 4× CPU throttling.
  - Reaching 95 on mobile would mean trimming home-page sections or animations. Your call.

## Update (2026-10-21, team portfolio PDF)

**Done**
- **Portfolio:** all 12 projects from `Bellona_AI_Team_Bilingual_Portfolio.pdf` are added to `content/work.ts`, next to the four earlier ones (16 in total).
  - Copy, stack and numbers come only from the PDF. The 278 migrated posts, 12 n8n workflows and 7 CRM tables are shown as results because the PDF states them.
  - "In collaboration with Shamim startup" is shown on the case studies the PDF marks that way.
- **Links to services and industries:**
  - Each service page lists its projects, strongest first, with up to six cards. Its "All projects" link opens `/work` filtered to that service.
  - Each industry card on `/industries` links to its case studies.
- **Home page:** shows the three strongest projects (see `featured` in `content/work.ts`).

**Still open**
- [ ] **AI Real Estate OS (kharazie.at):** the PDF calls it a private delivery, so its card shows a cube house, not a screenshot of the client's site. Send approved screenshots of the system (workflows, CRM) if you want them shown.
- [ ] **Prowem:** prowem.com shows only "Coming soon", so the card uses a cube illustration. Send app screenshots (iOS/Android) to replace it.
- [x] **Bellona AI Agency (old site):** removed from the projects (owner request, 2026-10-22). Project order now starts Kharazie, Codechee, Yasin, Konjed, Microshamim; the home page shows the first three.
- [ ] **School-Builders and Elm-Kala:** both Railway addresses in the PDF (`jkh-production…` and `app-production-7816…`) return 404 "Not Found". Their cards use cube illustrations and have no "visit" link. Send their live addresses (or screenshots) and add `url` / `cover` / `gallery` back.
- [ ] **Mojasame Saidi:** mojasamesaidi.ir timed out from our network, so there are no screenshots yet (a cube illustration for now). The link is kept. Send screenshots, or let Claude retry once it loads.

## A. Decisions (these block the build)

| # | Question | Options / default |
|---|---|---|
| Q1 | **Hero headline**: the BRIEF line is AI-only. Keep it or widen it? | **A** "AI systems that work while you sleep." (default) · B "Built, automated, and growing while you sleep." · C "One partner, from idea to growth." |
| Q2 | **ROI figures**: the EN FAQ says "40% cost reduction and 65% improvement in key metrics within 90 days"; FA has no numbers. | Default: drop the numbers in both languages (FA wording). Keep them only if you can source them. |
| Q3 | **"Senior team"** (HomeBWO hero sub). True for every pillar? | Default: removed |
| Q4 | **Pillar order and which one leads.** Which card is orange and which pillar is featured first? | Default: journey order (Web → Full-stack → **AI (orange)** → Marketing → Biz dev) |
| Q5 | **Work section at launch.** No real projects yet. | Default: hide the home section, `/work` shows an empty state, hero 2nd CTA = "See how we work". |
| Q6 | **Team composition.** Are design, marketing and biz-dev delivered in-house, by a partner network, or both? This changes "one team, one room" and the dedicated-team card. | Need an answer |
| Q7 | **Founders**: OK to use Iman Niknam and Sina Razi with their current bios? (BRIEF says "not yet supplied", but they're on the live site.) Any role updates for the new positioning? | Default: use as on the live site |
| Q8 | **Comparison table**: OK to soften "Infinite, instant scale", "100% process accuracy" and "Deployed in days"? | Default: softened (see COPY.md) |
| Q9 | **"That's what Bellona clients wake up to."** Keep as a client claim, or soften? | Default: softened |
| Q10 | **Engagement models**: confirm the three (Project · Monthly growth partnership · Dedicated / fractional team) and their names | Default: as listed |
| Q11 | **Who-we-are statement** ("We started by automating the work nobody wanted to do…"). Does it match your story? | Default: use it |

## B. Claims to verify

| Claim | Where it's used | Source |
|---|---|---|
| 80% time saved: what is it measured on? | Stats row | Live site counter |
| 3X operational efficiency: measured how? | Stats row | Live site counter |
| "200+ platforms" | FAQ 5 | Live site FAQ |
| "Most systems live in 2–4 weeks" | Comparison, FAQ 3 | Live site FAQ |
| Typical **website** and **app** timelines | FAQ 3, pillar pages | **Not on site** |
| "Followed up by AI agents in minutes" | Marketing page | **NEW**, needs confirming |
| "Most clients start with Strategy" | `/partner` | **NEW**, needs confirming |
| Can you offer references on a call? | `/work` empty state | **NEW** |
| Do you sell bilingual / RTL sites as a service? | Website page | **NEW** |
| Do you take over or redesign existing sites and apps? | Website + Full-stack FAQs | **NEW** |

## C. Content to supply

- [ ] **Prices** for the 3 engagement models (or "from" prices, or "on request")
- [ ] **Pricing model** line for Why Bellona #05
- [x] ~~Budget ranges for the contact form~~: the budget question is removed (2026-10-22).
- [ ] **Reply time** promise ("within [24 h]")
- [ ] **Client logos** (only with permission), or confirm we hide the strip
- [ ] **Case studies**: for each, client, sector, pillars, challenge, what we built, **sourced** result, images, optional quote
- [ ] **Testimonials**: at least 3 real quotes with name, role, company and permission
- [ ] **Founder photos** (square, at least 800 px) and LinkedIn URLs
- [ ] **About story**: founding year, location, origin, why you expanded beyond AI
- [ ] **Per-pillar specifics**:
  - CMS choice
  - Tech stack
  - Code ownership terms
  - Marketing channels you run
- [ ] **Areas served** (countries/regions) for JSON-LD and copy
- [ ] **Social links** (LinkedIn, Instagram, X, …)
- [ ] **Privacy policy** and **Terms** text (currently `#` on the live site)
- [ ] **Domain email**: keep `bellona.ai.team@gmail.com`, or switch to `hello@bellonaagency.com`?

## D. Accounts and keys (needed in Step 4)

| Env var | What it is | Status |
|---|---|---|
| `BOOKING_URL` | Cal.com / Calendly link for the 30-min call | [NEEDED] |
| `LEAD_WEBHOOK_URL` | Your n8n / Make webhook for form leads | [NEEDED] |
| `RESEND_API_KEY` + `LEAD_FROM_EMAIL` + `LEAD_TO_EMAIL` | Email fallback (needs a verified sending domain) | [NEEDED] |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional analytics (which provider? Plausible / GA4 / Umami) | [OPTIONAL] |
| `NEXT_PUBLIC_SITE_URL` | `https://bellonaagency.com` | Known |

## E. Launch housekeeping

- [ ] Set up 301 redirects for the 12 old industry URLs (listed in SITEMAP.md)
- [ ] Re-submit the sitemap in Google Search Console (a verification tag already exists on the live site)
- [ ] Decide where the current Next.js site's repo or hosting goes after the switch
