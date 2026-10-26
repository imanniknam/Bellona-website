import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { stepNum } from "@/lib/format";
import { ArrowIcon, LLink, SectionHead } from "../ui";
import { RollText } from "../RollText";

/**
 * Strategy → Design → Build → Automate → Grow → Support.
 * Horizontal track on desktop, vertical on mobile. `full` adds the deliverables (used on /partner).
 */
export function Journey({ d, full = false, headless = false }: { d: Dict; full?: boolean; headless?: boolean }) {
  const { journey, locale } = d;
  const last = journey.steps.length - 1;
  return (
    <section id="journey" aria-labelledby="journey-title" className="section">
      <div className="wrap flex flex-col gap-14">
        {headless ? (
          <h2 id="journey-title" className="sr-only">
            {journey.eyebrow}
          </h2>
        ) : (
          <SectionHead id="journey-title" eyebrow={journey.eyebrow} title={journey.title} sub={journey.sub} />
        )}
        <ol className="grid lg:grid-cols-6">
          {journey.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal="fade"
              style={{ "--d": i } as CSSProperties}
              className="group relative flex gap-5 pb-10 lg:flex-col lg:gap-6 lg:pb-0 lg:pe-5"
            >
              {i < last && (
                <>
                  <span aria-hidden="true" className="absolute bottom-0 start-7 top-14 w-px bg-line lg:hidden" />
                  <span aria-hidden="true" className="absolute end-0 start-14 top-7 hidden h-px bg-line lg:block" />
                </>
              )}
              <span
                className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[8deg] ${
                  i === last ? "bg-ink text-paper" : i === 0 ? "bg-orange text-ink" : "border border-line bg-paper text-ink"
                }`}
              >
                {stepNum(i, locale)}
              </span>
              <div className="flex flex-col gap-2 pt-2 lg:pt-0">
                <h3 className="fa-display text-2xl font-bold tracking-[-0.02em]">{step.title}</h3>
                <p className="leading-relaxed text-muted">{step.line}</p>
                {full && (
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="t-eyebrow text-orange-text">{journey.deliverablesLabel}</p>
                    <ul className="flex flex-col gap-1.5 text-[15px] text-body">
                      {step.deliverables.map((x) => (
                        <li key={x} className="flex items-center gap-2">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-surface p-6 sm:p-8">
          <p className="max-w-2xl text-lg text-body">{journey.startAnywhere}</p>
          {!full && (
            <LLink locale={locale} href="/partner" className="btn btn-ink" track="journey_partner">
              <RollText>{journey.cta}</RollText>
              <ArrowIcon />
            </LLink>
          )}
        </div>
      </div>
    </section>
  );
}
