export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://bellonaagency.com").replace(/\/$/, "");

/** External booking link, or null when not configured (CTAs then fall back to /contact). */
export const bookingUrl = process.env.BOOKING_URL?.trim() || null;

/**
 * Privacy policy and terms are linked (footer, contact form) only once their real texts exist in
 * content/{en,fa}.ts (pages.legal). Until then the pages stay reachable but noindex and unlinked.
 */
export const legalPagesPublished = false;

export const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim() || null;
