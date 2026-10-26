// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/OtherPages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
const d = getDict(locale);

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/terms",
  title: d.meta.terms.title,
  description: d.meta.terms.description,
  noindex: true,
});

export default function Page() {
  return <LegalPage locale={locale} kind="terms" />;
}
