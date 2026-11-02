// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { getPillar, PillarPage } from "@/components/pages/ServicePages";
import { findSpoke, ServiceSpokePage } from "@/components/pages/SpokePages";
import { spokePath, visibleSpokes } from "@/lib/drafts";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // The pillar pages, plus standalone service pages such as /services/seo.
  return [...getDict(locale).pillars.items.map((p) => ({ slug: p.slug })), ...visibleSpokes("service").filter((s) => !s.parent).map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPillar(getDict(locale), slug);
  if (!p) {
    const s = findSpoke("service", slug);
    if (!s) return {};
    return pageMetadata({ locale, path: spokePath(s), title: s[locale].metaTitle, description: s[locale].metaDescription, noindex: s.status !== "published" });
  }
  return pageMetadata({ locale, path: `/services/${slug}`, title: p.page.metaTitle, description: p.page.metaDescription });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getPillar(getDict(locale), slug)) return <ServiceSpokePage locale={locale} slug={slug} />;
  return <PillarPage locale={locale} slug={slug} />;
}
