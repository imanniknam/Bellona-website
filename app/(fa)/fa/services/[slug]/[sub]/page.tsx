// Generated route wrapper: page content lives in components/pages, copy in content/spokes.ts.
import type { Metadata } from "next";
import { findSpoke, ServiceSpokePage } from "@/components/pages/SpokePages";
import { spokePath, visibleSpokes } from "@/lib/drafts";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
type Props = { params: Promise<{ slug: string; sub: string }> };

export const dynamicParams = false;

// Only published spokes (plus drafts in SHOW_DRAFTS=1 preview builds) get a page.
export function generateStaticParams() {
  return visibleSpokes("service").map((s) => ({ slug: s.parent!, sub: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, sub } = await params;
  const s = findSpoke("service", sub, slug);
  if (!s) return {};
  const c = s[locale];
  return pageMetadata({ locale, path: spokePath(s), title: c.metaTitle, description: c.metaDescription, noindex: s.status !== "published" });
}

export default async function Page({ params }: Props) {
  const { slug, sub } = await params;
  return <ServiceSpokePage locale={locale} parent={slug} slug={sub} />;
}
