"use client";

import {
  Building2,
  Landmark,
  ShoppingCart,
  HeartPulse,
  Briefcase,
  GraduationCap,
  ArrowLeft,
  FolderOpen,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaButton } from "@/components/bellona";
import { Link } from "@/i18n/navigation";
import { BRAND, INDUSTRY_ICONS } from "@/lib/constants";
import { PORTFOLIO_BY_INDUSTRY, type IndustryKey } from "@/lib/portfolio";

const ICONS = {
  building: Building2,
  landmark: Landmark,
  "shopping-cart": ShoppingCart,
  "heart-pulse": HeartPulse,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
} as const;

interface IndustryPortfolioPageProps {
  industryKey: IndustryKey;
}

export function IndustryPortfolioPage({ industryKey }: IndustryPortfolioPageProps) {
  const t = useTranslations("industries");
  const tPortfolio = useTranslations("portfolio");
  const Icon = ICONS[INDUSTRY_ICONS[industryKey]];
  const itemIds = PORTFOLIO_BY_INDUSTRY[industryKey];

  return (
    <div className="section-padding !pt-28 sm:!pt-32">
      <div className="container-bellona max-w-4xl">
        <Link
          href="/#industries"
          className="inline-flex items-center gap-2 text-sm text-bellona-muted hover:text-bellona-cyan transition-colors mb-8"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {tPortfolio("back")}
        </Link>

        <div className="flex items-start gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-bellona-cyan/[0.08] flex items-center justify-center shrink-0">
            <Icon size={24} className="text-bellona-cyan" />
          </div>
          <div>
            <p className="text-subline-cyan text-sm mb-2">{t("eyebrow")}</p>
            <h1 className="heading-section text-2xl sm:text-4xl text-bellona-white mb-3">
              {t(`items.${industryKey}.name`)}
            </h1>
            <p className="text-prose text-sm sm:text-base max-w-2xl">
              {t(`items.${industryKey}.description`)}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-xl font-semibold text-bellona-white mb-6">
            {tPortfolio("title")}
          </h2>

          {itemIds.length === 0 ? (
            <div className="card-elevated p-10 sm:p-14 text-center">
              <div className="w-14 h-14 rounded-2xl bg-bellona-cyan/[0.08] flex items-center justify-center mx-auto mb-5">
                <FolderOpen size={28} className="text-bellona-cyan" />
              </div>
              <h3 className="font-display text-lg font-semibold text-bellona-white mb-2">
                {tPortfolio("emptyTitle")}
              </h3>
              <p className="text-prose text-sm max-w-md mx-auto">
                {tPortfolio("emptyDescription")}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {itemIds.map((id) => (
                <article key={id} className="card-elevated card-hover-glow p-6">
                  <h3 className="font-semibold text-bellona-white mb-2">
                    {tPortfolio(`items.${id}.title`)}
                  </h3>
                  <p className="text-sm text-bellona-muted leading-relaxed">
                    {tPortfolio(`items.${id}.description`)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="text-center pt-4">
          <BellonaButton size="lg" href={`mailto:${BRAND.email}`}>
            {tPortfolio("cta")}
          </BellonaButton>
        </div>
      </div>
    </div>
  );
}
