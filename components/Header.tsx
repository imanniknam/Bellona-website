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
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-3 px-4 pt-5 sm:px-6 sm:pt-7">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label={common.menuOpen}
            onClick={() => setOpen(true)}
            className="flex size-14 items-center justify-center rounded-full bg-ink text-paper transition-[background-color,color,transform] duration-300 hover:scale-105 hover:bg-orange hover:text-ink sm:size-[72px]"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="fill-none stroke-current" strokeWidth={2} strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <Link
            href={localePath(locale, "/")}
            aria-label={common.homeLabel}
            className="hx group flex items-center gap-2 rounded-full sm:gap-3"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-105 sm:size-[72px]">
              <LogoMark variant="dark" size={38} className="sm:size-[52px]" />
            </span>
            <span className="fa-display text-[22px] font-extrabold tracking-[-0.03em] sm:text-[26px]">
              {common.wordmark}
            </span>
          </Link>
        </div>

        <nav aria-label={common.primaryNav} className="hidden xl:block">
          <ul className="flex items-center gap-1 rounded-full bg-surface p-1.5">
            {/* Contact lives in the CTA and the menu, so the pill stays on one line at 1280px. */}
            {common.nav.filter((item) => item.key !== "contact").map((item) => (
              <li key={item.key}>
                <Link
                  href={localePath(locale, item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block whitespace-nowrap rounded-full px-4 py-3.5 text-base font-medium 2xl:px-5 2xl:text-[17px] transition-colors hover:bg-paper aria-[current=page]:bg-ink aria-[current=page]:text-paper"
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
                className="block whitespace-nowrap rounded-full px-4 py-3.5 text-base font-medium transition-colors hover:bg-paper 2xl:px-5 2xl:text-[17px]"
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
            className="flex min-h-14 items-center rounded-full bg-surface px-5 text-base font-semibold xl:hidden"
            data-track="cta"
            data-track-label="lang_switch"
          >
            {common.langSwitch.label}
          </Link>
          <a
            {...bookProps}
            className="hidden min-h-[64px] items-center gap-3 rounded-full bg-ink py-2 text-paper transition-[background-color,color,transform] duration-300 ps-2 pe-7 hover:-translate-y-0.5 hover:bg-orange hover:text-ink md:flex"
            data-track="cta"
            data-track-label="header_book"
          >
            <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-orange text-xl font-extrabold text-ink">
              {common.bookInitial}
            </span>
            <span className="whitespace-nowrap text-base font-semibold 2xl:text-[17px]"><RollText>{common.bookCall}</RollText></span>
            {book.external && <span className="sr-only"> {common.opensNewTab}</span>}
          </a>
        </div>
      </div>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-lenis-prevent=""
          className="on-dark fixed inset-0 z-50 overflow-y-auto bg-ink text-paper"
        >
          <div className="mx-auto flex min-h-full max-w-[1360px] flex-col gap-10 px-4 pb-10 pt-5 sm:px-6 sm:pt-7">
            <div className="flex items-center justify-between gap-4">
              <h2 id={titleId} className="t-eyebrow text-orange-on-dark">
                {common.menuTitle}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label={common.menuClose}
                className="flex size-14 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 hover:rotate-90 sm:size-[72px]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="fill-none stroke-current" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label={common.primaryNav} className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <ul className="flex flex-col">
                {common.nav.map((item) => (
                  <li key={item.key} className="border-b border-line-dark">
                    <Link
                      href={localePath(locale, item.href)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="block py-4 text-[clamp(32px,6vw,56px)] font-light leading-tight tracking-[-0.04em] transition-colors hover:text-orange aria-[current=page]:text-orange rtl:tracking-normal"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-6">
                <p className="t-eyebrow text-orange-on-dark">{servicesLabel}</p>
                <ul className="flex flex-col gap-1">
                  {pillars.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={localePath(locale, `/services/${p.slug}`)}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-2 text-xl font-semibold transition-colors hover:text-orange"
                      >
                        <span className="font-mono text-sm text-muted-dark">{p.num}</span>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4">
                  <a {...bookProps} className="btn btn-primary self-start" data-track="cta" data-track-label="menu_book">
                    <RollText>{common.bookCall}</RollText>
                  </a>
                  {common.footer.social.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted-dark hover:text-paper">
                      {s.label}
                      <span className="sr-only"> {common.opensNewTab}</span>
                    </a>
                  ))}
                  <a href={`mailto:${common.email}`} className="text-muted-dark underline-offset-4 hover:text-paper hover:underline">
                    {common.email}
                  </a>
                  <Link href={langHref} hrefLang={otherLocale} lang={otherLocale} className="text-muted-dark hover:text-paper">
                    {common.langSwitch.label}
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
