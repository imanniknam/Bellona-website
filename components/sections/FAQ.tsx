import type { CSSProperties } from "react";
import type { Dict, Faq as FaqItem } from "@/content/types";
import { FaqLd } from "../JsonLd";
import { Rich } from "../Rich";
import { BookLink, Eyebrow } from "../ui";

/** Native <details> accordion: answers are in the HTML for crawlers and work without JS. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <ul className="rule-list flex flex-col border-y border-line">
      {items.map((f, i) => (
        <li key={f.q} data-reveal="fade" style={{ "--d": Math.min(i, 4) } as CSSProperties}>
          <details className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface transition-transform group-open:rotate-45 group-open:bg-orange"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="fill-none stroke-current" strokeWidth={2.4} strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="max-w-3xl pb-7 leading-relaxed text-body">{f.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ d, items, title }: { d: Dict; items?: FaqItem[]; title?: string }) {
  const list = items ?? d.faq.items;
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div data-reveal="" className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
          <Eyebrow>{d.faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="t-h2-sm">
            <Rich text={title ?? d.faq.title} />
          </h2>
          <p className="text-lg text-muted">{d.faq.side}</p>
          <div className="flex flex-col items-start gap-3">
            <BookLink d={d} className="btn btn-ink" track="faq_book" />
            <a href={`mailto:${d.common.email}`} className="font-semibold underline underline-offset-4 hover:text-orange-text" dir="ltr">
              {d.common.email}
            </a>
          </div>
        </div>
        <FaqList items={list} />
      </div>
      <FaqLd items={list} />
    </section>
  );
}
