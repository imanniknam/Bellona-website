// Generated route wrapper: page content lives in components/pages, copy in content/{en,fa}.ts.
import type { Metadata } from "next";
import { PartnerPage } from "@/components/pages/OtherPages";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const locale = "en";
const d = getDict(locale);

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/partner",
  title: d.meta.partner.title,
  description: d.meta.partner.description,
});

export default function Page() {
  return <PartnerPage locale={locale} />;
}
