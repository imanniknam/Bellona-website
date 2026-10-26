// Generated route wrapper: page content lives in components/pages, copy in content/spokes.ts.
import type { Metadata } from "next";
import { findSpoke, GuidePage } from "@/components/pages/SpokePages";
import { spokePath, visibleSpokes } from "@/lib/drafts";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Only published guides (plus drafts in SHOW_DRAFTS=1 preview builds) get a page.
export function generateStaticParams() {
  return visibleSpokes("guide").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = findSpoke("guide", slug);
  if (!s) return {};
  const c = s[locale];
  return pageMetadata({ locale, path: spokePath(s), title: c.metaTitle, description: c.metaDescription, noindex: s.status !== "published" });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <GuidePage locale={locale} slug={slug} />;
}
