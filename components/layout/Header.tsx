"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BellonaButton } from "@/components/bellona";
import { Logo } from "@/components/ui/Logo";
import { BRAND, NAV_LINKS, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 border-b border-transparent",
        scrolled || !isHome ? "header-glass" : "bg-transparent shadow-none"
      )}
    >
      <div className="container-bellona px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem] md:h-[5rem]">
          <Link
            href={ROUTES.home}
            aria-label="Bellona home"
            className="shrink-0 flex items-center transition-opacity duration-300 hover:opacity-85 -translate-y-2 md:-translate-y-2.5"
          >
            <Logo variant="header" />
          </Link>

          {isHome && (
            <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2" aria-label="Main">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-bellona-muted hover:text-bellona-white transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          )}

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link
              href={ROUTES.login}
              className="text-sm text-bellona-muted hover:text-bellona-white transition-colors duration-300 font-medium"
            >
              {BRAND.cta.login}
            </Link>
            <BellonaButton size="sm" href={ROUTES.getStarted}>
              {BRAND.cta.primary}
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
              {isHome &&
                NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-bellona-muted hover:text-bellona-white py-3 text-sm"
                  >
                    {l.label}
                  </a>
                ))}
              <div className={cn("flex flex-col gap-3", isHome && "pt-5 mt-3 border-t border-white/[0.08]")}>
                <Link
                  href={ROUTES.login}
                  onClick={() => setOpen(false)}
                  className="text-sm text-bellona-muted hover:text-bellona-white py-2 font-medium"
                >
                  {BRAND.cta.login}
                </Link>
                <BellonaButton className="w-full" href={ROUTES.getStarted}>
                  {BRAND.cta.primary}
                </BellonaButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
