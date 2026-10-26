# Project notes for Claude Code

- Read `BRIEF.md` first, then `assets/motion/MOTION.md`.
- The `reference/*.dc.html` files are design mockups from a design canvas. Use them for layout, copy, spacing and colours only.
  - Do not ship that markup.
  - Ignore `support.js`, `<x-dc>`, `{{holes}}`, `<dc-import>` and `class Component extends DCLogic`. Those belong to the design tool. The one exception is `LogoMotion.dc.html`: its Component class contains the shuffle-scheduler logic to port.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS. Routes `/` (fa, rtl, default) and `/en`.
  - Self-host fonts: Plus Jakarta Sans via `next/font/google`, Persian: Lalezar (display) + Estedad (everything else) from `app/fonts/` via `next/font/local`, loaded only in the Persian layout.
- **Brand colours:** use the tokens from BRIEF.md as Tailwind theme colours. No ad-hoc hex values in components.
- **Logo:** use the SVGs in `assets/logo` as-is. Never redraw or "improve" the geometry.
- **Hero animation:** copy `motion.css` verbatim and keep its keyframes linear (they are pre-sampled). The `HeroMark` component inlines `hero-mark.svg` and runs the scheduler with timers in a `useEffect`, cleaned up on unmount.
- **Placeholders:** wrap them as `[LIKE THIS]` so they are easy to find. Never invent clients, quotes, prices or stats.
- Before saying a section is done, run `npm run lint && npm run build`.
