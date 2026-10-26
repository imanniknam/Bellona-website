// Generated route wrapper: page content lives in components/pages, copy in content/spokes.ts.
import type { Metadata } from "next";
import { GuidesHubPage } from "@/components/pages/SpokePages";
import { guidesHub } from "@/content/spokes";
import { publishedSpokes } from "@/lib/drafts";
import { pageMetadata } from "@/lib/metadata";

const locale = "en";
const h = guidesHub[locale];

// Indexable only once a guide is published; until then the hub is a draft preview (or 404 in production).
export const metadata: Metadata = pageMetadata({
  locale,
  path: "/guides",
  title: h.metaTitle,
  description: h.metaDescription,
  noindex: publishedSpokes("guide").length === 0,
});

export default function Page() {
  return <GuidesHubPage locale={locale} />;
}
