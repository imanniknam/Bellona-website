import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { Rich } from "@/components/Rich";
import { en } from "@/content/en";
import { fa } from "@/content/fa";
import { estedad, jakarta, jetbrains } from "./fonts";
import "./globals.css";

// Unmatched URLs (both languages share one 404 because EN and FA are separate root layouts).
export const metadata: Metadata = {
  title: `${en.meta.notFound.title} · Bellona`,
  description: en.meta.notFound.description,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} ${estedad.variable}`}>
      <body>
        <main className="wrap flex min-h-dvh flex-col items-center justify-center gap-8 py-20 text-center">
          <Link href="/" className="hx rounded-3xl" aria-label={en.common.homeLabel}>
            <LogoMark variant="light" size={140} />
          </Link>
          <p className="t-eyebrow text-orange-text">404</p>
          <h1 className="t-h1">
            <Rich text={en.pages.notFound.title} />
          </h1>
          <p className="t-lead text-body">{en.pages.notFound.text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              {en.pages.notFound.cta}
            </Link>
            <Link href="/fa" lang="fa" dir="rtl" className="btn btn-outline font-fa-body">
              {fa.pages.notFound.cta}
            </Link>
          </div>
          <p lang="fa" dir="rtl" className="font-fa-body text-lg text-muted">
            {fa.meta.notFound.title}. {fa.pages.notFound.text}
          </p>
        </main>
      </body>
    </html>
  );
}
