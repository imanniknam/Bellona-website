"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-0.5"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-300",
            locale === "en" && "font-latin",
            locale === loc
              ? "text-bellona-cyan bg-bellona-cyan/10"
              : "text-bellona-muted hover:text-bellona-white"
          )}
          aria-current={locale === loc ? "true" : undefined}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
