// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicePages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
const d = getDict(locale);

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/services",
  title: d.meta.services.title,
  description: d.meta.services.description,
});

export default function Page() {
  return <ServicesPage locale={locale} />;
}
