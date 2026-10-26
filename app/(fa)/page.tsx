// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
const d = getDict(locale);

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/",
  title: d.meta.home.title,
  description: d.meta.home.description,
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale={locale} />;
}
