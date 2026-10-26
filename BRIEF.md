# Bellona: website build brief

## What we're building
A bilingual (English + Persian/RTL) marketing site for **Bellona**, an agency that does website design, full-stack development, AI agents and automation, and marketing and business development. The first deliverable is the **home page** at production quality, with the animated cube logo in the hero.

## Positioning
- **Name:** bellona (wordmark lowercase) / بلونا
- **Descriptor / tagline:** `BUILD · AUTOMATE · GROW` / `بساز · خودکار کن · رشد کن`
- **Hero headline:** "AI systems that work **while you sleep.**" / «سیستم‌هایی که کار می‌کنند **وقتی تو خوابی.**»
- **Approved facts (from bellonaagency.com):** 100+ automations built · 24/7 AI operations · 80% time saved · 3X operational efficiency · free strategy audit.
- **Not yet supplied:** client logos, project images and names, testimonials, pricing model, founders, email and social links. Keep these as clearly marked placeholders. Never invent them.

## Visual system (black · white · orange)
| Token | Hex | Use |
|---|---|---|
| ink | `#0D0D0D` | text, dark sections, shadow face |
| paper | `#FFFFFF` | page background |
| surface | `#F4F4F2` | light section background, pills |
| line | `#E5E5E5` / dark `#262626` | borders |
| orange | `#FF5500` | primary accent, CTAs |
| orange-light | `#F97316` | lit cube face |
| orange-text | `#C2410C` | small orange text on white (contrast) |
| muted | `#525252` on light / `#A3A3A3` on dark | secondary text |

Rules:
- Large radii: 20–40 px. Pill buttons, at least 44 px tall.
- No gradients, no glows, no emoji icons. Use line icons only.
- Orange text is allowed only at 24 px or larger. Below that, use `#C2410C`.

## Typography
- **Latin:** Plus Jakarta Sans (Google Fonts). Headlines pair weight 300/400 with weight 600/800 in the same line, with tight tracking (−0.04 to −0.055em).
- **Persian:** Estedad (OFL, files in `assets/fonts`). Use weight 300 + 800 for the same contrast.
  - Never letter-space Persian. For the tagline, use `word-spacing: .4em` instead.
  - Body line-height 1.9. Use Persian digits (۱۰۰+، ۲۴/۷).
- **Mono labels:** JetBrains Mono, uppercase, tracked 0.14–0.18em. English only.

## Home page structure (see `reference/HomeBWO.dc.html` for exact copy and layout)
1. **Header:** round black menu button, round logo button, "bellona" wordmark, pill nav (Work, Services, Process, Contact, فارسی), and a black pill CTA "Book a 30-min free call" with an orange avatar circle.
2. **Hero:** tagline pill, giant headline, sub-copy, "Start a project" (orange) and "See our work" (outline) buttons, stats pill. Below them, the **animated cube mark on the isometric grid floor**: 30° lines in `#E8E8E5` with orange nodes.
3. **Client logos strip:** placeholders.
4. **Who we are:** large statement with highlighted words, and a "Read our story" button.
5. **Services (dark, rounded top):** "Build. Automate. **Grow.**" with 4 cards:
   - 01 Website design
   - 02 Full-stack products
   - 03 AI agents & automation (the orange card)
   - 04 Marketing & growth

   Under the cards, a stats row: 100+ / 24/7 / 80% / 3X.
6. **Recent projects:** "We built these. Yes, really." 2×2 cards with tag chips.
7. **How it works:** "Simple by design." 3 steps; the 3rd card is black.
8. **Why Bellona:** "Stop hiring more people. Build better systems." Numbered list 01–05, with the modular cube mark.
9. **Testimonials:** "Several clients are typing…" chat-bubble cards (placeholders).
10. **Contact (dark):** "Ready when you are." Form with service chips, name, email and send. Then the footer lockup and a giant faint "bellona" wordmark.

## Persian version
`/fa` route, `dir="rtl"`, same layout mirrored. Copy is in `reference/PersianType.dc.html`. Mirror arrows and directional icons.

## Motion
See `assets/motion/MOTION.md`. Intro, then a random shuffle of 9 moves, using the pre-sampled CSS keyframes in `motion.css`. Support reduced motion, and pause when the hero is off-screen.

Hover on the header and footer logo uses the "exploded view": the pieces pull apart, then snap back. See the `.hx` rules in `reference/LogoMotion.dc.html`.

Optional later upgrade: a real-3D version with React Three Fiber. Keep the SVG version as the default and as the fallback.

## Done means
- Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO, on mobile and desktop.
- Fully responsive from 360 px. Everything is keyboard-accessible, with visible focus.
- EN and FA routes both work. Fonts are self-hosted with `font-display: swap`.
- The hero shows its final static state with JS off and with reduced motion.
