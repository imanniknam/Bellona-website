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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 border-b border-transparent",
        scrolled ? "header-glass" : "bg-transparent shadow-none"
      )}
    >
      <div className="container-bellona px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.25rem]">
          <Link
            href="/"
            aria-label="Bellona home"
            className="shrink-0 flex items-center transition-opacity duration-300 hover:opacity-85"
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

          <button
            className="lg:hidden p-2 text-bellona-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden header-glass overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-1">
              {NAV_ITEMS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-bellona-muted hover:text-bellona-white py-3 text-sm"
                >
                  {t(l.key)}
                </a>
              ))}
              <div className="pt-5 mt-3 border-t border-white/[0.08] flex flex-col gap-4">
                <LanguageSwitcher />
                <BellonaButton className="w-full" href="#cta">
                  {tBrand("ctaPrimary")}
                </BellonaButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
