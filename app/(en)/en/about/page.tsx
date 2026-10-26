// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/OtherPages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "en";
const d = getDict(locale);

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/about",
  title: d.meta.about.title,
  description: d.meta.about.description,
});

export default function Page() {
  return <AboutPage locale={locale} />;
}
