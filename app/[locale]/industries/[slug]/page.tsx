import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IndustryPortfolioPage } from "@/components/pages/IndustryPortfolioPage";
import { INDUSTRY_KEYS } from "@/lib/constants";
import { isIndustryKey } from "@/lib/portfolio";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    INDUSTRY_KEYS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isIndustryKey(slug)) return {};

  const t = await getTranslations({ locale, namespace: "industries" });
  const tPortfolio = await getTranslations({ locale, namespace: "portfolio" });

  return {
    title: `${t(`items.${slug}.name`)} — ${tPortfolio("title")}`,
    description: t(`items.${slug}.description`),
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isIndustryKey(slug)) {
    notFound();
  }

  return <IndustryPortfolioPage industryKey={slug} />;
}
