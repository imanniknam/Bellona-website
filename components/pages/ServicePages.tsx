import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Dict, Locale, Pillar, PillarId } from "@/content/types";
import { projectsForPillar } from "@/content/work";
import { stepNum } from "@/lib/format";
import { getDict } from "@/lib/i18n";
import { BreadcrumbLd } from "../JsonLd";
import { Rich } from "../Rich";
import { Contact } from "../sections/Contact";
import { FaqList } from "../sections/Faq";
import { FaqLd, ServiceLd } from "../JsonLd";
import { Flow } from "../sections/Flow";
import { Monday } from "../sections/Monday";
import { PillarCard, Stats } from "../sections/Pillars";
import { ProjectCard } from "../sections/Work";
import { pillarSpokes } from "./SpokePages";
import { guidesHub } from "@/content/spokes";
import { ArrowIcon, Chips, Eyebrow, LLink, PageHero } from "../ui";
import { RollText } from "../RollText";

export function ServicesPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const s = d.pages.services;
  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.h1} sub={s.sub} />
      <section aria-label={d.meta.services.title} className="wrap pb-24">
        <ul className="flex flex-col gap-4">
          {d.pillars.items.map((p) => (
            <li key={p.id}>
              <LLink
                locale={locale}
                href={`/services/${p.slug}`}
                className={`card group grid gap-6 p-7 transition-colors sm:p-10 lg:grid-cols-[auto_1fr_1fr_auto] lg:items-center ${
                  p.id === "ai" ? "bg-orange" : "bg-surface hover:bg-ink hover:text-paper"
                }`}
              >
                <span className="font-mono text-sm">
                  {p.num} · {p.stage}
                </span>
                <span className="flex flex-col gap-2">
                  <span className="t-h3">{p.title}</span>
                  <span className={`leading-relaxed ${p.id === "ai" ? "text-graphite" : "text-muted group-hover:text-muted-dark"}`}>
                    {p.line}
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5">
                  {p.chips.map((c) => (
                    <span key={c} className={`chip ${p.id === "ai" ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                      {c}
                    </span>
                  ))}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-12 items-center justify-center rounded-full ${p.id === "ai" ? "bg-ink text-paper" : "bg-ink text-paper group-hover:bg-orange group-hover:text-ink"}`}
                >
                  <ArrowIcon />
                </span>
              </LLink>
            </li>
          ))}
        </ul>
      </section>
      <Flow d={d} />
      <Contact d={d} />
      <BreadcrumbLd d={d} trail={[{ name: d.meta.services.title, path: "/services" }]} />
    </>
  );
}

export function getPillar(d: Dict, slug: string): Pillar | undefined {
  return d.pillars.items.find((p) => p.slug === slug);
}

export function PillarPage({ locale, slug }: { locale: Locale; slug: string }) {
  const d = getDict(locale);
  const p = getPillar(d, slug);
  if (!p) notFound();
  const labels = d.pages.pillar;
  const others = d.pillars.items.filter((x) => x.id !== p.id);
  const isAi = p.id === "ai";

  return (
    <>
      <PageHero eyebrow={`${p.num} · ${p.stage} · ${p.title}`} title={p.page.h1} tagline={p.page.tagline} sub={p.page.sub}>
        <div className="flex flex-wrap gap-3 pt-2">
          <LLink locale={locale} href={`/contact?need=${p.id}`} className="btn btn-primary" track={`pillar_${p.id}_start`}>
            <RollText>{d.common.startProject}</RollText>
            <ArrowIcon />
          </LLink>
          <Chips items={p.chips} />
        </div>
      </PageHero>

      {isAi && <AiProblem d={d} />}

      <section aria-labelledby="included-title" className={isAi ? "section bg-surface" : "section pt-8"}>
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="flex flex-col gap-4 lg:sticky lg:top-10 lg:self-start">
            <Eyebrow>{labels.included}</Eyebrow>
            <h2 id="included-title" className="t-h2-sm">
              <Rich text={p.page.includedTitle} />
            </h2>
            {isAi && <p className="max-w-2xl text-lg text-muted">{d.pages.ai.capabilities.sub}</p>}
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {p.page.included.map((item, i) => (
              <li key={item.title} data-reveal="" style={{ "--d": i % 2 } as CSSProperties} className={`card lift flex flex-col gap-3 p-7 ${isAi ? "bg-paper" : "border border-line"}`}>
                <span className="font-mono text-sm text-orange-text">{stepNum(i, locale)}</span>
                <h3 className="text-xl font-bold tracking-[-0.01em] rtl:font-extrabold rtl:tracking-normal">{item.title}</h3>
                <p className="leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PillarWork d={d} id={p.id} />

      {/* Spoke pages under this service, once published (docs/seo hub → spoke links). */}
      {pillarSpokes(p.slug).length > 0 && (
        <nav aria-labelledby="pillar-deeper" className="wrap flex flex-col gap-6 pb-16">
          <h2 id="pillar-deeper" className="t-h2-sm">
            {guidesHub[locale].deeper}
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {pillarSpokes(p.slug).map((s) => (
              <li key={s.slug}>
                <LLink locale={locale} href={`/services/${p.slug}/${s.slug}`} className="card lift group flex h-full flex-col gap-2 border border-line p-6">
                  <span className="text-xl font-bold rtl:font-extrabold">{s[locale].h1.replace(/\*\*/g, "")}</span>
                  <span className="leading-relaxed text-muted">{s[locale].metaDescription}</span>
                </LLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {isAi && <Monday d={d} />}

      <section aria-labelledby="deliver-title" className="on-dark section rounded-t-[40px] bg-ink text-paper">
        <div className="wrap flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Eyebrow dark>{labels.deliver}</Eyebrow>
            <h2 id="deliver-title" className="t-h2-sm">
              {isAi ? <Rich text={d.pages.ai.process.title} /> : p.page.deliverTitle}
            </h2>
            {isAi && <p className="text-lg text-muted-dark">{d.pages.ai.process.sub}</p>}
          </div>
          {isAi ? (
            <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {d.pages.ai.process.steps.map((s, i) => (
                <li key={s.title} className="card flex flex-col gap-4 border border-line-dark bg-ink-2 p-6">
                  <span className="t-num text-5xl text-orange">{stepNum(i, locale)}</span>
                  <h3 className="text-xl font-bold rtl:font-extrabold">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-dark">{s.text}</p>
                </li>
              ))}
            </ol>
          ) : (
            <ol className="flex flex-wrap items-center gap-3">
              {p.page.deliver.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className={`flex min-h-12 items-center gap-3 rounded-full px-5 text-lg font-semibold ${i === 0 ? "bg-orange text-ink" : "border border-line-dark"}`}>
                    <span className="font-mono text-sm opacity-70">{stepNum(i, locale)}</span>
                    {s}
                  </span>
                  {i < p.page.deliver.length - 1 && (
                    <span aria-hidden="true" className="text-orange">
                      <ArrowIcon size={16} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          )}
          <div className="grid gap-6 border-t border-line-dark pt-10 lg:grid-cols-[1fr_2fr]">
            <p className="t-eyebrow text-orange-on-dark">{labels.connects}</p>
            <p className="t-lead text-soft-dark">{p.page.connects}</p>
          </div>
          {isAi && <Stats d={d} />}
        </div>
      </section>

      {isAi && <Flow d={d} />}

      {/* Only questions with real answers are listed; a pillar with none shows no FAQ block. */}
      {p.page.faq.length > 0 && (
      <section aria-labelledby="pillar-faq" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-4">
            <Eyebrow>{labels.faq}</Eyebrow>
            <h2 id="pillar-faq" className="t-h2-sm">
              {p.title}
            </h2>
          </div>
          <FaqList items={p.page.faq} />
        </div>
        <FaqLd items={p.page.faq} />
      </section>
      )}

      <section aria-labelledby="other-pillars" className="section bg-surface">
        <div className="wrap flex flex-col gap-10">
          <h2 id="other-pillars" className="t-h2-sm">
            {labels.otherPillars}
          </h2>
          <ul className="on-dark grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.id} className="flex">
                <PillarCard p={o} d={d} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact d={d} defaultNeed={p.id} title={labels.ctaTitle} sub={labels.ctaSub} />
      <ServiceLd d={d} p={p} />
      <BreadcrumbLd
        d={d}
        trail={[
          { name: d.meta.services.title, path: "/services" },
          { name: p.title, path: `/services/${p.slug}` },
        ]}
      />
    </>
  );
}

/** This service's projects (strongest first, at most six) with a link to the filtered /work list. */
function PillarWork({ d, id }: { d: Dict; id: PillarId }) {
  const items = projectsForPillar(id).slice(0, 6);
  if (items.length === 0) return null;
  const labels = d.pages.pillar;
  return (
    <section aria-labelledby="pillar-work" className="section pt-8">
      <div className="wrap flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="pillar-work" className="t-h2-sm">
            {labels.work}
          </h2>
          <LLink locale={d.locale} href={`/work?service=${id}`} className="btn btn-sm btn-outline" track={`pillar_${id}_work`}>
            <RollText>{labels.workAll}</RollText>
            <ArrowIcon />
          </LLink>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((proj, i) => (
            <li key={proj.slug} data-reveal="clip" style={{ "--d": i % 3 } as CSSProperties}>
              <ProjectCard project={proj} d={d} variant="compact" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AiProblem({ d }: { d: Dict }) {
  const pr = d.pages.ai.problem;
  return (
    <section aria-labelledby="ai-problem" className="section pt-8">
      <div className="wrap flex flex-col gap-12">
        <h2 id="ai-problem" className="t-h2-sm max-w-4xl">
          <Rich text={pr.title} />
        </h2>
        <ul className="grid gap-4 lg:grid-cols-3">
          {pr.cards.map((c) => (
            <li key={c.title} className="card flex flex-col gap-5 border border-line p-7">
              <h3 className="t-h3">{c.title}</h3>
              <blockquote className="leading-relaxed text-body">&ldquo;{c.quote}&rdquo;</blockquote>
              <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-5">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-muted">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="t-statement max-w-4xl">
          <Rich text={pr.close} />
        </p>
      </div>
    </section>
  );
}
