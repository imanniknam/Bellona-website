# Measurement (SEO-GUIDELINE H)

## Conversion events in the code

GA4 loads only when `NEXT_PUBLIC_ANALYTICS_ID` is set (`components/Analytics.tsx`). Mark these as key events in GA4:

| Event | Fired when | Parameters |
| --- | --- | --- |
| `form_submit` | the free-audit form is submitted | `locale` |
| `form_success` / `form_stored` | the server accepted the lead | `locale`, `need`, `offer` |
| `form_invalid` / `form_error` | validation or delivery failed | `locale`, `need`, `offer` |
| `email_click` | any `mailto:` link is clicked | `locale`, `page` |
| `chat_click` | any t.me / wa.me link is clicked | `channel`, `locale`, `page` |
| `cta_click` | any element with `data-track="cta"` | `label`, `locale`, `page` |

`need` is the selected service ids (system, web, product, ai, growth, bizdev, unsure) and `offer` the package id
(audit, launch, automate, system) the visitor arrived with (`/contact?offer=audit`).

The site has no separate thank-you page; the form shows its confirmation in place, so `form_success` is the conversion.

## Owner tasks (need the owner's accounts)

- TODO(owner): set `NEXT_PUBLIC_ANALYTICS_ID` in Vercel and mark `form_success`, `email_click`, `chat_click` as key events in GA4.
- TODO(owner): Search Console. Add the domain property `bellonaagency.com` (DNS TXT; the HTML tag for the URL-prefix property is already in `lib/metadata.ts`), then submit `https://bellonaagency.com/sitemap.xml`.
- TODO(owner): Bing Webmaster Tools. Import the site from Search Console and submit the same sitemap.
- TODO(owner): add a Telegram/WhatsApp link when a business account exists; `chat_click` then works without code changes.

## Bi-weekly report (about 20 minutes)

1. Search Console, Performance, last 28 days vs the previous period: clicks, impressions, average position for the queries in `docs/seo/KEYWORD_MAP.md`, split by `/` and `/en`.
2. Pages report: indexed vs not indexed; every "Page with redirect" or "Not found" row should be an old URL only.
3. Core Web Vitals report (field data, mobile): LCP under 2.5 s, INP under 200 ms, CLS under 0.1.
4. GA4: `form_success` count by landing page and by `need`/`offer`.
5. Run `npm run seo:check`, `npm run seo:schema`, `npm run seo:keywords`, `npm run seo:links` against production and note any change.
