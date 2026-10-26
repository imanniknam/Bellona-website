# Bellona website (v2)

Bilingual marketing site for **Bellona**: Persian (RTL) at `/` (default), English at `/en`. Old `/fa/...` links 308-redirect to the root.
Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Fonts and brand assets are self-hosted.

**Type:** English uses Plus Jakarta Sans. Persian (Persian pages only, `app/fonts/`, OFL) uses Lalezar for display (h1/h2, display classes, big numbers, `.fa-display`; one weight, never synthesised, emphasis by colour only; Rooyin is kept in `app/fonts/rooyin` to switch back) and Estedad for everything else (body 500, UI 700, captions 500). The rules live at the end of `app/globals.css` ("Persian type").

```
app/                 routes: (fa)/… and (en)/en/… are two root layouts (different <html lang/dir>)
  actions/contact.ts contact form server action (zod + honeypot → webhook → Resend fallback)
  api/og/route.tsx   Open Graph images
  sitemap.ts robots.ts global-not-found.tsx
components/
  sections/          home + shared page sections
  pages/             page compositions used by both languages
  hero/              HeroMark (animated logo, motion.css verbatim) + IsoGrid floor
  factory/           AgenticFactory3D (three.js Lead → Revenue machine) + lazy FactoryEmbed
  voxel/             VoxelArt renderer + cube models (house, bank, robot …)
content/
  en.ts fa.ts        ALL site copy (typed by content/types.ts)
  work.ts            case studies (ranked; featured ones show on the home page)
  proof.ts           client logos + testimonials (empty → those sections stay hidden)
  factory.ts         Persian copy for the 3D machine
  AUDIT.md COPY.md SITEMAP.md INSPIRATION.md TODO-OWNER.md   planning docs
public/work/<slug>/  project screenshots (cover.jpg, shot-N.jpg, mobile.jpg)
assets/              brand source files (logo SVGs, motion spec)
```

## Run it

Requires Node 20.9+ (tested on Node 24).

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open http://localhost:3000 (Persian) and http://localhost:3000/en (English).

Before shipping:

```bash
npm run lint && npm run build
```

## Edit content

- **All text** lives in `content/en.ts` and `content/fa.ts`. Both implement the same `Dict` type, so TypeScript tells you if a key is missing in one language.
- **Mini-markup in strings:** `**accent**` (orange), `==highlight==` (black pill), `\n` (line break).
- **Placeholders** are wrapped in `[LIKE THIS]`. Search for `[` to find what is still open; the owner checklist is `content/TODO-OWNER.md`.
- **Persian:** use Persian digits (۱۰۰+، ۲۴/۷) and never letter-space Persian text.
- **Team** (`team.members`): name → role → skills → education. Add `photo: "/team/name.jpg"` (square, at least 400px) to replace the initials, and `linkedin` for a profile link.
- **Client logos / testimonials:** add real entries to `content/proof.ts`. The sections appear automatically once there is at least one entry. Never add invented clients or quotes.
- **Social links:** `common.footer.social` in both language files (shown in the footer and the menu, and listed as schema.org `sameAs`).

## Add a case study

1. Put images in `public/work/<slug>/`:
   - `cover.jpg`: 1440×900 desktop screenshot (16:10)
   - `shot-1.jpg …`: extra 1440×900 screens
   - `mobile.jpg`: 390×844 at 2× (780×1688)
2. Add an entry to `projects` in `content/work.ts` (copy an existing one). Set:
   - `status: "published"`, a unique `slug`, `pillars`, `url`, `cover`, `gallery`.
   - `featured: true` to show it on the home page (the home shows featured projects in list order).
   - Copy in **both** `en` and `fa`: title, client, sector, summary, challenge, built.
   - `results` only with sourced numbers. Leave it empty otherwise.
   - Optional:
     - `industries`: industry ids such as `"education"`. The project is then listed on that sector page (`/industries/<id>`) and linked from its card on `/industries` and the "By industry" links on `/work`.
     - `model`: a voxel shape (`components/voxel/models.ts`) shown in place of screenshots, for private work or sites that are down.
     - `partner` (per language): shown as "In collaboration with".
3. The list is ranked: put stronger projects first.
   - These update automatically: `/work` (with `?service=<pillar>` filtering), the sitemap, the case-study pages (`/work/<slug>`, `/en/work/<slug>`) and the "Projects in this service" block on each service page (top six).

`/work/example` is a noindex template preview (`status: "preview"`).

## Contact form and booking

- The form posts to a server action (`app/actions/contact.ts`). It validates with zod, drops bots (honeypot field + minimum fill time), then:
  1. POSTs JSON to `LEAD_WEBHOOK_URL` (your n8n / Make flow), with the optional `x-bellona-secret` header.
  2. Falls back to an email via Resend (`RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL`) if the webhook is missing or fails.
  3. If both fail (e.g. international internet is cut) and `LEAD_STORE_DIR` is set, it appends the lead to `<dir>/leads-YYYY-MM.jsonl` on this server and tells the visitor it was saved but the reply may be slower. Without a store the visitor sees an error: the form never reports success for a lead it did not keep. The directory must be persistent disk, and `/data/` is git-ignored.
  4. In development without any transport, it logs the lead to the server console instead.
- Each external call times out after 6 s, so a hanging international route delays the visitor by at most ~12 s.
- **Webhook payload:**
  ```json
  {
    "name": "", "email": "", "company": "", "message": "",
    "needs": ["web", "ai"], "model": "project",
    "industry": "finance", "locale": "en", "page": "/contact",
    "source": "bellonaagency.com", "receivedAt": "ISO date"
  }
  ```
- **Prefilling:** `/contact?need=ai`, `?industry=finance` (used by the pillar and industry CTAs).
- **Booking:** set `BOOKING_URL` (Cal.com / Calendly). Every "Book a 30-min free call" button links there; without it they go to `/contact`.

## International cut-off (offline readiness)

If international connectivity from Iran is lost but this server and the local network stay up, the site keeps working: every page, image, font (Plus Jakarta Sans, JetBrains Mono, Lalezar, Estedad), script, animation and the 3D section is served from this server. Nothing loads from a CDN at runtime, and `next build` needs no font downloads (all fonts are files in `app/fonts/`).

What still depends on international access:

| Dependency | When it matters | What happens during a cut-off |
|---|---|---|
| `LEAD_WEBHOOK_URL` if hosted abroad (n8n cloud, Make) | every form submit | Times out; Resend is tried next. Point it at a self-hosted n8n on the local network to avoid this. |
| Resend (`api.resend.com`) | form fallback | Fails; the lead is saved locally if `LEAD_STORE_DIR` is set, otherwise the visitor sees an error. |
| Lead emails to Gmail (`LEAD_TO_EMAIL`) | reading leads | Even when sent, Gmail may be unreachable from Iran. Read `LEAD_STORE_DIR` files or the local n8n instead. |
| `BOOKING_URL` (Cal.com / Calendly) | only if set | "Book a call" buttons open a site that won't load. Leave it empty to keep them on `/contact`. |
| Google Analytics (`NEXT_PUBLIC_ANALYTICS_ID`) | only if set | Stops recording; one console error; the page is unaffected. |
| Outbound links: Instagram, the Gmail `mailto` address, project sites hosted abroad (konjed.top, niraperfume.com, the *.vercel.app sites, kharazie.at, prowem.com) | visitor clicks | Those external pages won't open; .ir project sites depend on where they are hosted. The site itself is unaffected. |
| `npm ci` (registry.npmjs.org) | building / deploying | A fresh install needs the npm registry or an Iranian mirror. Running an existing build does not. |

How it was verified: production build and server run with every non-local connection blocked (a test-only Node preload), every page loaded in headless Chrome with all non-local requests aborted, and the contact form submitted against an unreachable, a hanging, and a local-network webhook.

## Analytics

Optional. Set `NEXT_PUBLIC_ANALYTICS_ID` to a GA4 measurement ID. It loads lazily and tracks:
- `cta_click` (any element with `data-track="cta"` and `data-track-label`)
- `form_submit`, `form_success`, `form_invalid`, `form_error`

Leave it empty to load nothing.

## SEO

- Per-page metadata with canonical + `hreflang` (en, fa, x-default) in `lib/metadata.ts`.
- `sitemap.xml` and `robots.txt` are generated (`app/sitemap.ts`, `app/robots.ts`).
- JSON-LD: `ProfessionalService` on every page, plus `FAQPage` and `BreadcrumbList` where relevant.
- OG images come from `/api/og?locale=en&title=…`. The OG renderer can't shape Persian reliably, so Persian cards show the Latin lockup; the Persian title still goes in `og:title`.
- Each industry has its own page, `/industries/<id>` (description, what we'd build, its case studies). The old site's `/industries/realEstate` 301-redirects to `/industries/real-estate` (`next.config.ts`); the other old URLs now match the new pages.

## Motion

- **Hero logo:** `components/hero/HeroMark.tsx` + `motion.css` (verbatim from `assets/motion`), per `assets/motion/MOTION.md`:
  - intro, then a random shuffle
  - smaller move pool under 768px
  - pauses off-screen and in hidden tabs
  - static with reduced motion
- **Site-wide** (`components/Motion.tsx`): smooth wheel scrolling (Lenis, mouse/trackpad only), scroll reveal for `[data-reveal]`, voxel drop-in, counting stats.
  - The hero floor's ambient loops start once the page is idle.
  - Everything is visible without JS and switches off with `prefers-reduced-motion`.
- **Cursor accent** (`components/Cursor.tsx`): a 64px circle over headlines and big statements only.
  - Brand orange (multiply) behind black text; a dark tint over orange text; screen blend on dark sections.
  - Add `data-cursor` to opt other elements in.

## Deploy to Railway

`railway.json` sets the build (`npm run build`), the start command (`npm run start`; `next start` reads Railway's `PORT`) and a health check on `/`. Node ≥ 20.9 is pinned in `package.json`.

1. Log in (opens the browser):
   ```bash
   npx @railway/cli login
   ```
2. From this folder, create the project once:
   ```bash
   npx @railway/cli init
   ```
3. Deploy (uploads this folder; `.gitignore` keeps `node_modules` and `.next` out):
   ```bash
   npx @railway/cli up
   ```
4. Give it a public URL:
   ```bash
   npx @railway/cli domain
   ```
5. In the Railway dashboard → Variables, add the keys from `.env.example`. Then point `bellonaagency.com` at the service under Settings → Networking → Custom Domain.

## Deploy to Vercel

1. Push this folder to a Git repository (it is the project root).
2. In Vercel: **Add New → Project → Import** the repository. Framework preset: Next.js (auto-detected). No build overrides needed.
3. Under **Settings → Environment Variables**, add the keys from `.env.example` (at least `NEXT_PUBLIC_SITE_URL`; add `LEAD_WEBHOOK_URL` and/or the Resend keys before going live).
4. Deploy, then under **Settings → Domains** add `bellonaagency.com` and follow the DNS instructions.
5. After the switch, re-submit `https://bellonaagency.com/sitemap.xml` in Google Search Console.

## Quality checklist

- `npm run lint && npm run build` must be clean.
- Check `/`, `/en`, a pillar page, `/work`, a case study and `/contact` at 360 / 768 / 1280 / 1440 px.
- Keyboard: Tab from the top. You should reach the skip link, then the menu button. The menu traps focus and Escape closes it.
- Lighthouse (mobile) on the production build: `npm run build`, then `npx next start`.
