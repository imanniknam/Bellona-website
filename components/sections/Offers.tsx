import type { CSSProperties } from "react";
import type { Dict, OfferPackage } from "@/content/types";
import { stepNum } from "@/lib/format";
import { Icon } from "../Icon";
import { RollText } from "../RollText";
import { ArrowIcon, Eyebrow, LLink, SectionHead } from "../ui";
import { Rich } from "../Rich";

function OfferCard({ o, d, index }: { o: OfferPackage; d: Dict; index: number }) {
  const { offers, locale } = d;
  const dark = o.id === "system";
  const free = o.id === "audit";
  const muted = dark ? "text-muted-dark" : "text-muted";
  const accent = dark ? "text-orange-on-dark" : "text-orange-text";
  return (
    <li
      data-reveal="pop"
      style={{ "--d": index } as CSSProperties}
      className={`card lift relative flex flex-col gap-6 p-7 sm:p-8 ${
        dark ? "on-dark bg-ink text-paper ring-2 ring-orange" : "border border-line bg-paper"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex min-h-8 items-center justify-between gap-3">
          <span className={`font-mono text-[13px] ${muted}`}>{stepNum(index, locale)}</span>
          {o.badge && (
            <span className={`chip font-bold ${dark || free ? "bg-orange text-ink" : "bg-surface text-ink"}`}>{o.badge}</span>
          )}
        </div>
        <h3 className="t-h3">{o.name}</h3>
        <p className={`text-[15px] ${muted}`}>{o.fit}</p>
        <p className="text-lg font-semibold leading-snug">{o.outcome}</p>
      </div>
      <dl className={`grid grid-cols-2 gap-4 border-y py-4 ${dark ? "border-line-dark" : "border-line"}`}>
        <div className="flex flex-col gap-1">
          <dt className={`text-sm ${muted}`}>{offers.timelineLabel}</dt>
          <dd className="font-bold">{o.timeline}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className={`text-sm ${muted}`}>{offers.priceLabel}</dt>
          <dd className={`font-bold ${free ? "text-orange-text" : ""}`}>{o.price}</dd>
        </div>
      </dl>
      <div className="flex flex-grow flex-col gap-3">
        <p className={`t-eyebrow ${accent}`}>{offers.includesLabel}</p>
        <ul className="flex flex-col gap-2.5">
          {o.includes.map((inc) => (
            <li key={inc} className="flex items-start gap-3 text-[15px] leading-relaxed">
              <span className={`mt-0.5 shrink-0 ${dark ? "text-orange" : "text-orange-text"}`}>
                <Icon name="check" size={18} strokeWidth={2.4} />
              </span>
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Solid button; opens the contact form with this offer selected (ContactForm reads ?offer=). */}
      <LLink
        locale={locale}
        href={`/contact?need=${o.need}&offer=${o.id}`}
        className={`btn w-full gap-2 whitespace-nowrap px-4 text-base ${dark || free ? "btn-primary" : "btn-ink"}`}
        track={`offer_${o.id}`}
      >
        <RollText>{o.cta}</RollText>
        <ArrowIcon />
      </LLink>
    </li>
  );
}

/** Productized offers (audit → launch / automate → the Growth System), plus the custom-product route. */
export function Offers({ d, headless = false }: { d: Dict; headless?: boolean }) {
  const { offers, locale } = d;
  const product = d.pillars.items.find((p) => p.id === "product");
  return (
    <section id="offers" aria-labelledby={headless ? undefined : "offers-title"} aria-label={headless ? offers.eyebrow : undefined} className="section bg-surface">
      <div className="wrap flex flex-col gap-12">
        {!headless && <SectionHead id="offers-title" eyebrow={offers.eyebrow} title={offers.title} sub={offers.sub} />}
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {offers.packages.map((o, i) => (
            <OfferCard key={o.id} o={o} d={d} index={i} />
          ))}
        </ul>
        <div
          data-reveal=""
          className="card flex flex-col items-start justify-between gap-5 border border-line bg-paper p-7 sm:flex-row sm:items-center sm:p-8"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold rtl:font-extrabold">{offers.custom.title}</h3>
            <p className="max-w-2xl text-muted">{offers.custom.text}</p>
          </div>
          <LLink locale={locale} href={`/services/${product?.slug ?? ""}`} className="btn btn-ink shrink-0" track="offer_custom">
            <RollText>{offers.custom.cta}</RollText>
            <ArrowIcon />
          </LLink>
        </div>
      </div>
    </section>
  );
}

/** Risk reversal: what we commit to in every engagement. */
export function Promises({ d }: { d: Dict }) {
  const { promises } = d.offers;
  return (
    <section aria-labelledby="promises-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div data-reveal="" className="flex flex-col gap-4">
          <Eyebrow>{promises.eyebrow}</Eyebrow>
          <h2 id="promises-title" className="t-h2-sm">
            <Rich text={promises.title} />
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {promises.items.map((p, i) => (
            <li
              key={p.title}
              data-reveal="pop"
              style={{ "--d": i } as CSSProperties}
              className={`card flex gap-4 p-6 ${i === promises.items.length - 1 && promises.items.length % 2 ? "sm:col-span-2" : ""} ${
                i === 0 ? "bg-ink text-paper" : "bg-surface"
              }`}
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full ${i === 0 ? "bg-orange text-ink" : "bg-paper text-orange-text"}`}
              >
                <Icon name={p.icon} size={22} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold rtl:font-extrabold">{p.title}</h3>
                <p className={`text-[15px] leading-relaxed ${i === 0 ? "text-muted-dark" : "text-muted"}`}>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
