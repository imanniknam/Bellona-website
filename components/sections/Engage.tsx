import type { Dict } from "@/content/types";
import { Icon } from "../Icon";
import { BookLink, LLink, SectionHead } from "../ui";

/** Engagement models: Project · Monthly growth partnership · Dedicated / fractional team. */
export function Engage({ d }: { d: Dict }) {
  const { engage, locale } = d;
  return (
    <section id="engagement" aria-labelledby="engage-title" className="section bg-surface">
      <div className="wrap flex flex-col gap-12">
        <SectionHead id="engage-title" eyebrow={engage.eyebrow} title={engage.title} sub={engage.sub} />
        <ul className="grid gap-4 lg:grid-cols-3">
          {engage.items.map((m) => {
            const dark = m.id === "partnership";
            return (
              <li
                key={m.id}
                className={`card flex flex-col gap-6 p-8 ${dark ? "on-dark bg-ink text-paper" : "bg-paper"}`}
              >
                <div className="flex flex-col gap-3">
                  <h3 className="t-h3">{m.name}</h3>
                  <p className={`text-lg font-semibold ${dark ? "text-orange-on-dark" : "text-orange-text"}`}>{m.tagline}</p>
                  <p className={dark ? "text-muted-dark" : "text-muted"}>{m.text}</p>
                </div>
                <p className="flex flex-wrap items-baseline gap-2 border-y border-current/15 py-5">
                  <span className="t-num text-5xl">{m.price}</span>
                  <span className={`text-sm ${dark ? "text-muted-dark" : "text-muted"}`}>{m.priceNote}</span>
                </p>
                <div className="flex flex-grow flex-col gap-3">
                  <p className={`t-eyebrow ${dark ? "text-orange-on-dark" : "text-orange-text"}`}>{engage.includesLabel}</p>
                  <ul className="flex flex-col gap-2.5">
                    {m.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3">
                        <span className={`mt-0.5 ${dark ? "text-orange" : "text-orange-text"}`}>
                          <Icon name="check" size={18} strokeWidth={2.4} />
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <LLink
                  locale={locale}
                  href={`/contact?model=${m.id}`}
                  className={`btn ${dark ? "btn-primary" : "btn-outline"}`}
                  track={`engage_${m.id}`}
                >
                  {m.cta}
                </LLink>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <p className="text-lg text-body">{engage.note}</p>
          <BookLink d={d} className="btn btn-sm btn-ink" track="engage_book">
            {engage.noteCta}
          </BookLink>
        </div>
      </div>
    </section>
  );
}
