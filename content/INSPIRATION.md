# Inspiration: dmazing.studio (structure only)

I studied the home page on 2026-10-21 for **layout and interaction patterns only**. Nothing below copies their copy, brand, illustrations, images or code. Every adaptation uses Bellona's tokens (ink / paper / surface / orange), Plus Jakarta Sans + Estedad, and our own cube mark.

## ⚠ First: the HomeBWO mockup borrows a few of their lines almost word for word

| HomeBWO mockup | dmazing.studio | Fix (see COPY.md) |
|---|---|---|
| "WHO WE ARE?" + "Engineers and marketers **fueled by coffee, turning** manual work into systems…" | "Who We Are?" + "Designers fueled by coffee, turning visions into visuals…" | New statement with no coffee and no "turning X into Y" frame |
| "We built these. **Yes, really.**" | "We made these. Yes, really." | "Built, shipped, **running.**" |
| "No full plan yet? Fine. Tell us where it hurts and we'll shape it together." | "No complete idea yet? No worries just chat with us and we'll shape it together." | "Bring the problem, not the plan…" |
| "Several clients **are typing…**" | "Serveral People Are Typing" | "Straight from **the inbox.**" (keeps the chat idea) |
| "Book a 30-min free call" | "Book a 30 Min Free Call" | **Keep.** It's a generic industry phrase, and BRIEF specifies it. |

The layout ideas stay. The wording changes so the site reads as ours.

---

## Patterns we'll adapt

| # | Pattern on dmazing | Bellona adaptation | Where |
|---|---|---|---|
| 1 | **Huge, light-weight headline.** Big 400-weight type, tight tracking. | Centred hero: Jakarta **300/400 + 600** in one line (orange on the second line), −0.055em tracking, `clamp(52px, 8.4vw, 124px)`. FA: Estedad 300 + 800, no tracking, line-height 1.3. Matches HomeBWO. | `/` hero; shorter version on every page hero |
| 2 | **Round icon buttons + "book a call" pill with an avatar.** | 64 px black round **menu** button + round **cube-mark** button + lowercase "bellona" wordmark. Black CTA pill with an **orange circle holding the cube mark** (not a person photo; we don't have one). The logo gets the size the current site lacks. Header logo uses the exploded-view hover (`.hx`). | Global header |
| 3 | **Rating/proof pill under the hero.** | We have no rating, so **no stars and no score**. Use a grey stats pill instead: **100+ automations built · 24/7 AI operations · Free strategy audit**. All sourced. | `/` hero |
| 4 | **3D object on a tiled floor.** | Our **animated `HeroMark` cube stack on the isometric 30° grid** (`#E8E8E5` lines, orange nodes). SVG + CSS, no WebGL, no image. Intro → random shuffle per MOTION.md. | `/` hero; static small mark on `/partner` and the 404 page |
| 5 | **Playful "who we are" statement** with highlighted words. | Big statement with one orange-weighted phrase and one **black-pill-highlighted word** ("systems"), plus a "Read our story" outline pill. New copy, no coffee. | `/` after the client strip; `/about` opening |
| 6 | **Project grid with tag chips.** | 2×2 cards (ink / orange / paper / dark variants from HomeBWO), each with **pillar chips** (Website, Full-stack, AI automation, Marketing, Biz dev). Clicking a card opens the case-study template. Placeholders until real projects exist (we hide the section if there are none at launch, see TODO Q5). | `/` work section, `/work` index (filter by pillar chip) |
| 7 | **Dead-simple 3-step process.** | "Getting started is simple": 01 Book a free call · 02 Get a clear plan (the **free strategy audit**) · 03 We build, you grow. The 3rd card is black. This is the *how to start* story; the 6-step journey is the *what we cover* story. | `/` and `/contact` |
| 8 | **Numbered benefits 01–05.** | "Why Bellona": mono 01–05 numerals in `orange-text`, hairline rows, with the modular cube mark beside them. Headline from the real site: "Stop hiring more people. **Build better systems.**" | `/` |
| 9 | **Team row** (overlapping avatars + "+5"). | **Founders only**: Iman Niknam, Sina Razi (from the live site). No "+N" bubble and no invented team members. A row of two large cards with photo [PHOTO], role and bio. | `/` founders strip, `/about` |
| 10 | **Services list with one-liners.** | The **five pillars** as cards (dark section, rounded top), each with a mono label (`01 · BUILD`…), a one-liner and chips. AI is the orange card. Each card links to its pillar page. | `/` services, `/services` |
| 11 | **Chat-style testimonials** with a "typing" header. | Chat-bubble cards (one corner squared off, `28 28 28 6`) and a small animated three-dot typing indicator (reduced-motion safe). Headline "Straight from the inbox." **Every quote stays `[CLIENT QUOTE]`** and the section stays hidden in production until at least 3 real quotes exist. | `/` (hidden until real), `/work/[slug]` (one quote per case study) |
| 12 | **Plan cards.** | **Engagement models**: Project · Monthly growth partnership · Dedicated / fractional team. Middle card in ink. Prices are `[PRICE]` placeholders. A "Not sure which fits? Book a call" link under the cards. No "Subscribe" buttons; every card CTA goes to `/contact?model=…`. | `/` and `/partner` |
| 13 | **FAQ.** | Two columns: left is the headline + "Book a 30-min free call" pill + email; right is a native `<details>` accordion (answers in the HTML, so crawlers can read them, plus `FAQPage` JSON-LD). | `/`, each pillar page (pillar-specific Qs) |
| 14 | **Contact form with "what do you need" and budget chips.** | Dark contact section. Chip groups: **What do you need?** (5 pillars + "Not sure yet") and **Budget** (`[RANGE]` placeholders + "Not sure yet"). Then name, email, company (optional) and message. Server action, zod, honeypot. Next to it: "Book a 30-min free call" → `BOOKING_URL`. | `/` and `/contact` |
| 15 | **Giant faint wordmark in the footer.** | Already in HomeBWO: a giant `#1F1F1F` "bellona" under the footer. Kept. | Global footer |

## Patterns we'll skip

| Pattern | Why not |
|---|---|
| "4.9 rating" pill and "#1 ranked" badge | We have no rating source. Never invent one. |
| Floating bottom-dock nav on desktop | Our pill nav sits in the header (HomeBWO). A sticky compact header is enough. |
| Prices shown in cards ("$X / month, cancel anytime") | Pricing is your call. Placeholders only. |
| "Hire us on Dribbble" / "Download proposal" | No such profiles or assets yet. |
| A wall of 24 projects | We'll launch with at most 4 cards, real or hidden. |
| Glass, blue 3D renders, gradients | Against the brand rules (no gradients, no glows). |

## Interaction notes we'll carry over

- Buttons swap fill on hover (outline → ink) with a short 150 ms colour transition. No movement on reduced motion.
- Chips toggle with a real `<input type="checkbox">` underneath, for keyboard and screen readers.
- Section headings come in with a subtle 12 px rise **only after hydration and only when motion is allowed**. Content is visible in the HTML by default. This is the opposite of the current site's `opacity:0` problem.
