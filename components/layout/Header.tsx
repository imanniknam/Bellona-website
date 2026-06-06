"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { BellonaButton } from "@/components/bellona";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 border-b border-transparent safe-top",
        scrolled || open ? "header-glass" : "bg-transparent shadow-none"
      )}
    >
      <div className="container-bellona px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-[4.25rem] gap-3">
          <Link
            href="/"
            aria-label="Bellona home"
            className="shrink-0 flex items-center transition-opacity duration-300 hover:opacity-85 min-w-0"
          >
            <Logo variant="header" />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2"
            aria-label="Main"
          >
            {NAV_ITEMS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-bellona-muted hover:text-bellona-white transition-colors duration-300"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <BellonaButton size="sm" href="#cta">
              {tBrand("ctaPrimary")}
            </BellonaButton>
          </div>

          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-bellona-white hover:bg-white/[0.06] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top))] sm:top-[calc(4rem+env(safe-area-inset-top))] z-50 header-glass border-t border-white/[0.06] max-h-[calc(100dvh-3.5rem-env(safe-area-inset-top))] sm:max-h-[calc(100dvh-4rem-env(safe-area-inset-top))] overflow-y-auto safe-bottom"
              aria-label="Mobile"
            >
              <div className="container-bellona px-4 sm:px-6 py-5 flex flex-col gap-1">
                {NAV_ITEMS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-bellona-white hover:text-bellona-cyan py-3.5 text-base font-medium border-b border-white/[0.06] last:border-0"
                  >
                    {t(l.key)}
                  </a>
                ))}
                <div className="pt-5 mt-2">
                  <BellonaButton
                    className="w-full !h-12"
                    href="#cta"
                    onClick={() => setOpen(false)}
                  >
                    {tBrand("ctaPrimary")}
                  </BellonaButton>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
