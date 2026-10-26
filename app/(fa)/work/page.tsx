// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { WorkPage } from "@/components/pages/OtherPages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
const d = getDict(locale);

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/work",
  title: d.meta.work.title,
  description: d.meta.work.description,
});

export default function Page() {
  return <WorkPage locale={locale} />;
}
