import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { Rich } from "@/components/Rich";
import { en } from "@/content/en";
import { fa } from "@/content/fa";
import { jakarta, jetbrains, lahzeh } from "./fonts";
import "./globals.css";

// Unmatched URLs (both languages share one 404 because EN and FA are separate root layouts).
export const metadata: Metadata = {
  title: `${en.meta.notFound.title} · Bellona`,
  description: en.meta.notFound.description,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} ${lahzeh.variable}`}>
      <body>
        <main className="wrap flex min-h-dvh flex-col items-center justify-center gap-8 py-20 text-center">
          <Link href="/en" className="hx rounded-3xl" aria-label={en.common.homeLabel}>
            <LogoMark variant="light" size={140} />
          </Link>
          <p className="t-eyebrow text-orange-text">404</p>
          <h1 className="t-h1">
            <Rich text={en.pages.notFound.title} />
          </h1>
          <p className="t-lead text-body">{en.pages.notFound.text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/en" className="btn btn-primary">
              {en.pages.notFound.cta}
            </Link>
            <Link href="/" lang="fa" dir="rtl" className="btn btn-outline font-fa-body">
              {fa.pages.notFound.cta}
            </Link>
          </div>
          {/* Useful ways out of a dead end (SEO-GUIDELINE A6): home, services and work, in both languages. */}
          <nav aria-label="Popular pages" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
            <Link href="/en" className="underline underline-offset-4 hover:text-orange-text">
              {en.common.wordmark}
            </Link>
            <Link href="/en/services" className="underline underline-offset-4 hover:text-orange-text">
              {en.meta.services.title}
            </Link>
            <Link href="/en/work" className="underline underline-offset-4 hover:text-orange-text">
              {en.meta.work.title}
            </Link>
            <Link href="/" lang="fa" className="font-fa-body underline underline-offset-4 hover:text-orange-text">
              {fa.meta.siteName}
            </Link>
            <Link href="/services" lang="fa" className="font-fa-body underline underline-offset-4 hover:text-orange-text">
              {fa.meta.services.title}
            </Link>
            <Link href="/work" lang="fa" className="font-fa-body underline underline-offset-4 hover:text-orange-text">
              {fa.meta.work.title}
            </Link>
          </nav>
          <p lang="fa" dir="rtl" className="font-fa-body text-lg text-muted">
            {fa.meta.notFound.title}. {fa.pages.notFound.text}
          </p>
        </main>
      </body>
    </html>
  );
}
