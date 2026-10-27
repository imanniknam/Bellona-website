"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Dict, Locale } from "@/content/types";
import { localePath, stripLocale } from "@/lib/i18n";
import { LogoMark } from "./LogoMark";
import { RollText } from "./RollText";

export interface HeaderProps {
  locale: Locale;
  common: Dict["common"];
  pillars: { slug: string; title: string; num: string }[];
  servicesLabel: string;
  book: { href: string; external: boolean };
}

export function Header({ locale, common, pillars, servicesLabel, book }: HeaderProps) {
  const pathname = usePathname() || "/";
  const basePath = stripLocale(pathname);
  const otherLocale = common.langSwitch.hrefLang;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close the menu whenever the route changes ("adjust state during render" pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusables = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  const isActive = (href: string) => basePath === href || basePath.startsWith(`${href}/`);
  const langHref = localePath(otherLocale, basePath);

  const bookProps = book.external
    ? { href: book.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: book.href };

  return (
    <header className="relative z-20">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20">
        <Link href={localePath(locale, "/")} aria-label={common.homeLabel} className="hx group flex items-center gap-2.5 rounded-full">
          <span className="flex size-10 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-105 lg:size-11">
            <LogoMark variant="dark" size={26} className="lg:size-[30px]" />
          </span>
          <span className="fa-display text-lg font-extrabold tracking-[-0.03em] lg:text-xl">{common.wordmark}</span>
        </Link>

        <nav aria-label={common.primaryNav} className="hidden xl:block">
          <ul className="flex items-center gap-0.5 rounded-full bg-surface p-1">
            {/* Contact lives in the CTA and the menu, so the pill stays on one line at 1280px. */}
            {common.nav.filter((item) => item.key !== "contact").map((item) => (
              <li key={item.key}>
                <Link
                  href={localePath(locale, item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-medium transition-colors hover:bg-paper aria-[current=page]:bg-ink aria-[current=page]:text-paper"
                >
                  <RollText>{item.label}</RollText>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={langHref}
                hrefLang={otherLocale}
                lang={otherLocale}
                aria-label={common.langSwitch.ariaLabel}
                className="block whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-medium transition-colors hover:bg-paper"
                data-track="cta"
                data-track-label="lang_switch"
              >
                {common.langSwitch.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={langHref}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={common.langSwitch.ariaLabel}
            className="flex h-10 items-center rounded-full bg-surface px-3.5 text-sm font-semibold xl:hidden"
            data-track="cta"
            data-track-label="lang_switch"
          >
            {common.langSwitch.label}
          </Link>
          <a
            {...bookProps}
            className="hidden h-11 items-center gap-2.5 rounded-full bg-ink text-paper transition-[background-color,color,transform] duration-300 ps-1.5 pe-5 hover:-translate-y-0.5 hover:bg-orange hover:text-ink md:flex"
            data-track="cta"
            data-track-label="header_book"
          >
            <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-orange text-base font-extrabold text-ink">
              {common.bookInitial}
            </span>
            <span className="whitespace-nowrap text-[15px] font-semibold"><RollText>{common.bookCall}</RollText></span>
            {book.external && <span className="sr-only"> {common.opensNewTab}</span>}
          </a>
          {/* The menu is for narrower screens; at xl the nav pill above covers it. */}
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label={common.menuOpen}
            onClick={() => setOpen(true)}
            className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-colors duration-300 hover:bg-orange hover:text-ink xl:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="fill-none stroke-current" strokeWidth={2} strokeLinecap="round">
              <path d="M5 9h14M5 15h14" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div aria-hidden="true" onClick={close} className="menu-backdrop absolute inset-0 bg-ink/50" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-lenis-prevent=""
            className="menu-panel on-dark absolute inset-y-0 end-0 flex w-full max-w-[360px] flex-col overflow-y-auto bg-ink text-paper"
          >
            <div className="flex h-16 shrink-0 items-center justify-between gap-4 px-5">
              <h2 id={titleId} className="t-eyebrow text-orange-on-dark">
                {common.menuTitle}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label={common.menuClose}
                className="flex size-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="fill-none stroke-current" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label={common.primaryNav} className="flex flex-1 flex-col gap-8 px-5 pb-8">
              <ul className="flex flex-col">
                {common.nav.map((item) => (
                  <li key={item.key} className="border-b border-line-dark">
                    <Link
                      href={localePath(locale, item.href)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="block py-3.5 text-lg font-semibold transition-colors hover:text-orange aria-[current=page]:text-orange"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <p className="t-eyebrow text-orange-on-dark">{servicesLabel}</p>
                <ul className="flex flex-col">
                  {pillars.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={localePath(locale, `/services/${p.slug}`)}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-3 py-1.5 text-[15px] font-medium transition-colors hover:text-orange"
                      >
                        <span className="font-mono text-xs text-muted-dark">{p.num}</span>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-col gap-3 text-sm">
                <a {...bookProps} className="btn btn-primary justify-center" data-track="cta" data-track-label="menu_book">
                  <RollText>{common.bookCall}</RollText>
                </a>
                <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
                  {common.footer.social.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted-dark hover:text-paper">
                      {s.label}
                      <span className="sr-only"> {common.opensNewTab}</span>
                    </a>
                  ))}
                </div>
                <a href={`mailto:${common.email}`} className="text-muted-dark underline-offset-4 hover:text-paper hover:underline">
                  {common.email}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
