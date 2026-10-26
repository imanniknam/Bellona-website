// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { IndustriesPage } from "@/components/pages/OtherPages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "en";
const d = getDict(locale);

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/industries",
  title: d.meta.industries.title,
  description: d.meta.industries.description,
});

export default function Page() {
  return <IndustriesPage locale={locale} />;
}
