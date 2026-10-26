import Link from "next/link";
import type { ReactNode } from "react";
import type { Dict, Locale } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { bookingUrl } from "@/lib/site";
import { Icon } from "./Icon";
import { MiniCube } from "./voxel/Voxel";
import { Rich } from "./Rich";
import { RollText } from "./RollText";

/** Section eyebrow (mono, uppercase in EN; Estedad bold in FA). */
export function Eyebrow({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={`t-eyebrow inline-flex items-center gap-2.5 ${dark ? "text-orange-on-dark" : "text-orange-text"} ${className}`}>
      <MiniCube className="size-3.5 shrink-0" />
      {children}
    </p>
  );
}

/** Eyebrow + h2 block used at the top of most sections. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  dark = false,
  center = false,
  size = "t-h2",
  id,
  action,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
  size?: "t-h2" | "t-h2-sm";
  id?: string;
  action?: ReactNode;
}) {
  return (
    <div
      data-reveal=""
      className={`flex flex-wrap gap-6 ${center ? "flex-col items-center text-center" : "items-end justify-between"}`}
    >
      <div className={`flex max-w-3xl flex-col gap-4 ${center ? "items-center" : ""}`}>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 id={id} className={size}>
          <Rich text={title} />
        </h2>
      </div>
      {sub && (
        <p className={`max-w-md text-lg leading-relaxed ${dark ? "text-muted-dark" : "text-muted"} ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
      {action}
    </div>
  );
}

/** Internal link that respects the locale prefix. */
export function LLink({
  locale,
  href,
  children,
  className,
  track,
  ...rest
}: {
  locale: Locale;
  href: string;
  children: ReactNode;
  className?: string;
  track?: string;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}) {
  return (
    <Link href={localePath(locale, href)} className={className} data-track={track ? "cta" : undefined} data-track-label={track} {...rest}>
      {children}
    </Link>
  );
}

/** "Book a 30-min free call": external booking link when BOOKING_URL is set, else /contact. */
export function BookLink({
  d,
  className,
  children,
  track,
}: {
  d: Dict;
  className?: string;
  children?: ReactNode;
  track: string;
}) {
  const content = <RollText>{children ?? d.common.bookCall}</RollText>;
  if (bookingUrl) {
    return (
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-track="cta"
        data-track-label={track}
      >
        {content}
        <span className="sr-only"> {d.common.opensNewTab}</span>
      </a>
    );
  }
  return (
    <Link href={localePath(d.locale, "/contact")} className={className} data-track="cta" data-track-label={track}>
      {content}
    </Link>
  );
}

export function ArrowIcon({ size = 18 }: { size?: number }) {
  return <Icon name="arrow" size={size} strokeWidth={2.4} flipRtl />;
}

/** Chip row used on cards. */
export function Chips({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" | "onOrange" | "paper" }) {
  const cls = {
    light: "bg-surface text-ink",
    paper: "bg-paper text-ink",
    dark: "border border-line-input text-soft-dark",
    onOrange: "bg-ink text-paper",
  }[tone];
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((c, i) => (
        <li key={`${c}-${i}`} className={`chip ${cls}`}>
          {c}
        </li>
      ))}
    </ul>
  );
}

/**
 * Two-column section: the heading column stays put (sticky) while the content column scrolls past,
 * until the section ends. Stacks on small screens.
 */
export function StickySplit({ head, children, wide = false }: { head: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`wrap grid gap-12 ${wide ? "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"}`}>
      <div className="flex flex-col gap-6 lg:sticky lg:top-10 lg:self-start">{head}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/**
 * Small page hero for inner pages. `title` is the H1 (keyword-bearing on service and industry pages);
 * `tagline` keeps the brand slogan as a large line under it, without being a heading.
 */
export function PageHero({
  eyebrow,
  title,
  tagline,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  tagline?: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="wrap pb-16 pt-16 sm:pt-24" aria-labelledby="page-title">
      <div className="hero-in flex max-w-5xl flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 id="page-title" className="t-h1">
          <Rich text={title} />
        </h1>
        {tagline && (
          <p className="t-h3 max-w-4xl text-body">
            <Rich text={tagline} />
          </p>
        )}
        {sub && <p className="t-lead max-w-3xl text-body">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
