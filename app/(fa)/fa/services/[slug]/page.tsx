// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { getPillar, PillarPage } from "@/components/pages/ServicePages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getDict(locale).pillars.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPillar(getDict(locale), slug);
  if (!p) return {};
  return pageMetadata({ locale, path: `/services/${slug}`, title: p.page.metaTitle, description: p.page.metaDescription });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PillarPage locale={locale} slug={slug} />;
}
