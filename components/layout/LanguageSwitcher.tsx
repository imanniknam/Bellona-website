"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  const targetLocale = routing.locales.find((loc) => loc !== locale);
  if (!targetLocale) return null;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: targetLocale })}
      className={cn(
        "px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-bellona-muted hover:text-bellona-white hover:border-bellona-cyan/20 transition-colors duration-300",
        targetLocale === "en" && "font-latin"
      )}
      aria-label={t("switchTo", { language: t(targetLocale) })}
    >
      {t(targetLocale)}
    </button>
  );
}
