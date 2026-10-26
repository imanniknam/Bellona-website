// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { IndustryPage } from "@/components/pages/OtherPages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "en";
type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getDict(locale).industries.items.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ind = getDict(locale).industries.items.find((i) => i.id === id);
  if (!ind) return {};
  return pageMetadata({ locale, path: `/industries/${id}`, title: ind.title, description: ind.text });
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <IndustryPage locale={locale} id={id} />;
}
