import { type Spoke, spokes } from "@/content/spokes";

/**
 * Draft pages (content/spokes.ts) exist only in builds made with SHOW_DRAFTS=1, a preview for the team.
 * Production builds don't set it, so drafts 404, stay out of the sitemap and nothing links to them.
 */
export const showDrafts = process.env.SHOW_DRAFTS === "1";

/** Pages that get a route in this build. */
export const visibleSpokes = (kind: Spoke["kind"]) => spokes.filter((s) => s.kind === kind && (s.status === "published" || showDrafts));

/** Pages that are live: sitemap, internal links, structured data. */
export const publishedSpokes = (kind: Spoke["kind"]) => spokes.filter((s) => s.kind === kind && s.status === "published");

export const spokePath = (s: Spoke) => (s.kind === "service" ? `/services/${s.parent}/${s.slug}` : `/guides/${s.slug}`);
