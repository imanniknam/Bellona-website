"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
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
        "min-h-10 min-w-10 px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs sm:text-sm font-medium text-bellona-muted hover:text-bellona-white hover:border-bellona-cyan/20 transition-colors duration-300 inline-flex items-center justify-center",
        targetLocale === "en" && "font-latin",
        className
      )}
      aria-label={t("switchTo", { language: t(targetLocale) })}
    >
      {t(targetLocale)}
    </button>
  );
}
