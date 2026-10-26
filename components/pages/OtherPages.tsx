import Image from "next/image";
import { notFound } from "next/navigation";
import { type CSSProperties, Fragment, type ReactNode } from "react";
import type { Locale } from "@/content/types";
import { gridProjects, pageProjects, projects, projectsForIndustry } from "@/content/work";
import { digits, stepNum } from "@/lib/format";
import { getDict } from "@/lib/i18n";
import { BreadcrumbLd } from "../JsonLd";
import { Rich } from "../Rich";
import { Contact } from "../sections/Contact";
import { Faq } from "../sections/Faq";
import { Industries } from "../sections/Industries";
import { Journey } from "../sections/Journey";
import { Offers, Promises } from "../sections/Offers";
import { Start } from "../sections/Start";
import { Team } from "../sections/Team";
import { Compare, Why } from "../sections/Why";
import { ProjectCard } from "../sections/Work";
import { ArrowIcon, Chips, Eyebrow, LLink, PageHero } from "../ui";
import { WorkFilter } from "../WorkFilter";
import { RollText } from "../RollText";
import { VoxelArt } from "../voxel/Voxel";
import { INDUSTRY_MODEL } from "../voxel/models";

export function PartnerPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.pages.partner;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.h1} sub={p.sub} />
      <section aria-label={p.eyebrow} className="wrap grid gap-4 pb-8 lg:grid-cols-2">
        <div className="card flex flex-col gap-5 border border-line p-8 sm:p-10">
          <h2 className="t-h2-sm">
            <Rich text={p.problem.title} accent="accent-ink" />
          </h2>
          <p className="t-lead text-body">{p.problem.text}</p>
        </div>
        <div className="on-dark card flex flex-col gap-5 bg-ink p-8 text-paper sm:p-10">
          <h2 className="t-h2-sm">
            <Rich text={p.fix.title} />
          </h2>
          <p className="t-lead text-soft-dark">{p.fix.text}</p>
        </div>
      </section>
      <Journey d={d} full />
      <section aria-label={d.why.compare.caption} className="section">
        <div className="wrap flex flex-col gap-10">
          <h2 className="t-h2-sm">
            <Rich text={d.why.title} accent="accent-ink" />
          </h2>
          <Compare d={d} />
        </div>
      </section>
      <Faq d={d} />
      <Contact d={d} />
      <BreadcrumbLd d={d} trail={[{ name: d.meta.partner.title, path: "/partner" }]} />
    </>
  );
}

export function OffersPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.pages.offers;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.h1} sub={p.sub} />
      <Offers d={d} headless />
      <Promises d={d} />
      <Start d={d} />
      <Faq d={d} />
      <Contact d={d} />
      <BreadcrumbLd d={d} trail={[{ name: d.meta.offers.title, path: "/offers" }]} />
    </>
  );
}

export function IndustriesPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.pages.industries;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.h1} sub={p.sub} />
      <Industries d={d} full />
      <Contact d={d} />
      <BreadcrumbLd d={d} trail={[{ name: d.meta.industries.title, path: "/industries" }]} />
    </>
  );
}

/** One sector: a short description, what we'd build, its case studies and the other sectors. */
export function IndustryPage({ locale, id }: { locale: Locale; id: string }) {
  const d = getDict(locale);
  const { industries } = d;
  const ind = industries.items.find((x) => x.id === id);
  if (!ind) notFound();
  const work = projectsForIndustry(id);
  const others = industries.items.filter((x) => x.id !== id);
  return (
    <>
      <PageHero eyebrow={`${industries.eyebrow} · ${ind.title}`} title={ind.h1 ?? ind.title} sub={ind.text}>
        <div className="flex flex-wrap gap-3 pt-2">
          <LLink locale={locale} href={`/contact?industry=${id}`} className="btn btn-primary" track={`industry_page_${id}`}>
            <RollText>{industries.cardCta}</RollText>
            <ArrowIcon />
          </LLink>
          <LLink locale={locale} href="/industries" className="btn btn-outline">
            <RollText>{industries.seeAll}</RollText>
          </LLink>
        </div>
      </PageHero>

      <section aria-labelledby="build-title" className="wrap pb-16">
        <div className="card grid items-center gap-10 bg-surface p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-5">
            <h2 id="build-title" className="t-eyebrow text-orange-text">
              {industries.buildLabel}
            </h2>
            <ul className="flex flex-col gap-3">
              {ind.build.map((b, i) => (
                <li key={b} className="flex items-baseline gap-4 text-xl font-bold rtl:font-extrabold">
                  <span className="font-mono text-sm text-orange-text">{stepNum(i, locale)}</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <VoxelArt model={INDUSTRY_MODEL[id] ?? "stack"} className="h-40 w-auto justify-self-center sm:h-52" gap="stroke-surface" anim="rise" />
        </div>
      </section>

      <section aria-labelledby="industry-work" className="section bg-surface">
        <div className="wrap flex flex-col gap-10">
          <h2 id="industry-work" className="t-h2-sm">
            {industries.workTitle}
          </h2>
          {work.length > 0 ? (
            <ul className="grid gap-x-5 gap-y-10 lg:grid-cols-2">
              {work.map((proj, i) => (
                <li key={proj.slug} data-reveal="clip" style={{ "--d": i % 2 } as CSSProperties}>
                  <ProjectCard project={proj} d={d} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="t-lead max-w-3xl text-body">{industries.noWork}</p>
          )}
        </div>
      </section>

      <nav aria-labelledby="other-industries" className="wrap flex flex-col gap-6 py-16">
        <h2 id="other-industries" className="t-eyebrow text-orange-text">
          {industries.others}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.id}>
              <LLink locale={locale} href={`/industries/${o.id}`} className="btn btn-sm btn-outline">
                <RollText>{o.title}</RollText>
              </LLink>
            </li>
          ))}
        </ul>
      </nav>

      <Contact d={d} />
      <BreadcrumbLd
        d={d}
        trail={[
          { name: d.meta.industries.title, path: "/industries" },
          { name: ind.title, path: `/industries/${id}` },
        ]}
      />
    </>
  );
}

export function WorkPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.pages.work;
  const items = gridProjects();
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.h1} sub={p.sub} />
      <section aria-label={d.meta.work.title} className="wrap flex flex-col gap-10 pb-24">
        <nav aria-labelledby="by-industry" className="flex flex-wrap items-center gap-2">
          <h2 id="by-industry" className="t-eyebrow me-2 text-orange-text">
            {d.work.byIndustry}
          </h2>
          {d.industries.items
            .map((ind) => ({ ind, n: projectsForIndustry(ind.id).length }))
            .filter((x) => x.n > 0)
            .map(({ ind, n }) => (
              <LLink
                key={ind.id}
                locale={locale}
                href={`/industries/${ind.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-5 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
              >
                {ind.title}
                <span className="font-mono text-xs opacity-60">{digits(n, locale)}</span>
              </LLink>
            ))}
        </nav>
        <WorkFilter
          label={d.work.filterLabel}
          allLabel={d.work.filterAll}
          options={d.pillars.items.map((x) => ({ id: x.id, label: x.short }))}
        >
          {items.map((proj) => (
            <li key={proj.slug} data-pillars={proj.pillars.join(" ")}>
              <ProjectCard project={proj} d={d} headingLevel="h2" />
            </li>
          ))}
        </WorkFilter>
        <p className="text-lg text-muted">{p.emptyNote}</p>
      </section>
      <Contact d={d} />
      <BreadcrumbLd d={d} trail={[{ name: d.meta.work.title, path: "/work" }]} />
    </>
  );
}

export function CaseStudyPage({ locale, slug }: { locale: Locale; slug: string }) {
  const d = getDict(locale);
  const project = pageProjects().find((p) => p.slug === slug);
  if (!project) notFound();
  const c = project[locale];
  const cs = d.work.caseStudy;
  const published = projects.filter((p) => p.status === "published");
  const idx = published.findIndex((p) => p.slug === slug);
  const next = idx >= 0 && published.length > 1 ? published[(idx + 1) % published.length] : null;
  const industryLinks = (project.industries ?? []).flatMap((id) => {
    const ind = d.industries.items.find((x) => x.id === id);
    return ind ? [{ href: `/industries/${id}`, label: ind.title }] : [];
  });
  const serviceLinks = project.pillars.flatMap((id) => {
    const p = d.pillars.items.find((x) => x.id === id);
    return p ? [{ href: `/services/${p.slug}`, label: p.short }] : [];
  });

  return (
    <>
      {project.status === "preview" && (
        <p role="note" className="wrap mt-6">
          <span className="block rounded-2xl bg-surface px-5 py-3 text-sm font-semibold text-muted">{cs.previewNotice}</span>
        </p>
      )}
      <PageHero eyebrow={c.sector} title={c.title} sub={c.summary}>
        <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
          {(
            [
              [cs.client, c.client],
              [cs.sector, c.sector],
              ...(industryLinks.length ? [[d.industries.eyebrow, <Links key="i" items={industryLinks} locale={locale} />]] : []),
              ...(project.year ? [[cs.year, project.year]] : []),
              [cs.services, <Links key="s" items={serviceLinks} locale={locale} />],
              ...(c.partner ? [[cs.partner, c.partner]] : []),
            ] as [string, ReactNode][]
          ).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1">
              <dt className="t-eyebrow text-orange-text">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink self-start"
            data-track="cta"
            data-track-label={`work_visit_${project.slug}`}
          >
            <RollText>{cs.visit}</RollText>
            <ArrowIcon />
            <span className="sr-only"> {d.common.opensNewTab}</span>
          </a>
        )}
      </PageHero>
      <div className="wrap">
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[28px] bg-ink sm:rounded-[40px]">
          {project.cover ? (
            <Image src={project.cover} alt={c.title} fill priority sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover object-top" />
          ) : project.model ? (
            <VoxelArt model={project.model} className="h-1/2 w-auto" gap="stroke-ink" swap={{ k: "w" }} anim="rise" label={c.title} />
          ) : (
            <span className="font-mono text-[13px] text-muted-dark">{d.work.placeholderImage}</span>
          )}
        </div>
      </div>
      <section className="section">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="t-h2-sm">{cs.challenge}</h2>
          <p className="t-lead text-body">{c.challenge}</p>
          <h2 className="t-h2-sm">{cs.built}</h2>
          <ul className="rule-list flex flex-col border-y border-line">
            {c.built.map((b, i) => (
              <li key={`${b}-${i}`} className="flex gap-6 py-5 text-lg">
                <span className="font-mono text-sm text-orange-text">{stepNum(i, locale)}</span>
                {b}
              </li>
            ))}
          </ul>
          {c.results.length > 0 && (
            <>
              <h2 className="t-h2-sm">{cs.results}</h2>
              <dl className="grid gap-6 sm:grid-cols-2">
                {c.results.map((r, i) => (
                  <div key={`${r.label}-${i}`} className="flex flex-col-reverse gap-2 rounded-[28px] bg-surface p-7">
                    <dt className="text-muted">{r.label}</dt>
                    <dd className="t-num text-6xl text-orange">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          {project.stack && (
            <>
              <h2 className="t-h2-sm">{cs.stack}</h2>
              <Chips items={project.stack} />
            </>
          )}
        </div>
      </section>
      {project.gallery && project.gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="section bg-surface">
          <div className="wrap flex flex-col gap-10">
            <h2 id="gallery-title" className="t-h2-sm">
              {cs.gallery}
            </h2>
            <ul className="grid gap-5 lg:grid-cols-[2fr_1fr]">
              <li className="flex flex-col gap-5">
                {project.gallery
                  .filter((g) => g.kind === "desktop")
                  .map((g, i) => (
                    <div key={g.src} data-reveal="" style={{ "--d": i } as CSSProperties} className="overflow-hidden rounded-[24px] bg-paper">
                      <Image src={g.src} alt={`${c.title} ${i + 2}`} width={g.width} height={g.height} sizes="(min-width: 1024px) 800px, 100vw" className="h-auto w-full" />
                    </div>
                  ))}
              </li>
              <li className="flex flex-col gap-5 lg:sticky lg:top-8 lg:self-start">
                {project.gallery
                  .filter((g) => g.kind === "mobile")
                  .map((g) => (
                    <div key={g.src} data-reveal="" className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[36px] border-8 border-ink bg-ink">
                      <Image src={g.src} alt={`${c.title} mobile`} width={g.width} height={g.height} sizes="360px" className="h-auto w-full" />
                    </div>
                  ))}
              </li>
            </ul>
          </div>
        </section>
      )}
      {c.quote && (
        <section aria-label={cs.quote} className="section bg-surface">
          <figure className="wrap flex max-w-4xl flex-col gap-6">
            <blockquote className="t-statement">&ldquo;{c.quote.text}&rdquo;</blockquote>
            <figcaption className="text-muted">
              <strong className="text-ink">{c.quote.name}</strong> · {c.quote.role}
            </figcaption>
          </figure>
        </section>
      )}
      <nav aria-label={cs.back} className="wrap flex flex-wrap justify-between gap-4 py-16">
        <LLink locale={locale} href="/work" className="btn btn-outline">
          <RollText>{cs.back}</RollText>
        </LLink>
        {next && (
          <LLink locale={locale} href={`/work/${next.slug}`} className="btn btn-ink">
            <RollText>
              {cs.next}: {next[locale].title}
            </RollText>
            <ArrowIcon />
          </LLink>
        )}
      </nav>
      <Contact d={d} />
      <BreadcrumbLd
        d={d}
        trail={[
          { name: d.meta.work.title, path: "/work" },
          { name: c.title, path: `/work/${project.slug}` },
        ]}
      />
    </>
  );
}

/** Comma-separated inline links (case-study details). */
function Links({ items, locale }: { items: { href: string; label: string }[]; locale: Locale }) {
  return items.map((it, i) => (
    <Fragment key={it.href}>
      {i > 0 && (locale === "fa" ? "، " : ", ")}
      <LLink locale={locale} href={it.href} className="underline decoration-line underline-offset-4 hover:text-orange-text hover:decoration-orange">
        {it.label}
      </LLink>
    </Fragment>
  ));
}

export function AboutPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.pages.about;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.h1}>
        <p className="t-statement max-w-4xl pt-6">
          <Rich text={d.who.text} />
        </p>
      </PageHero>
      <section aria-labelledby="story-title" className="section pt-8">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-4">
            <Eyebrow>{p.storyTitle}</Eyebrow>
            <h2 id="story-title" className="sr-only">
              {p.storyTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {p.story.map((para) => (
              <p key={para} className="t-lead text-body">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>
      <Team d={d} />
      <Why d={d} withCompare={false} />
      <Contact d={d} />
      <BreadcrumbLd d={d} trail={[{ name: d.meta.about.title, path: "/about" }]} />
    </>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.pages.contact;
  return (
    <>
      <Contact d={d} asH1 title={p.h1} sub={p.sub} />
      <section aria-labelledby="next-title" className="pt-24 lg:pt-32">
        <div className="wrap">
          <h2 id="next-title" className="t-h2-sm">
            {p.nextTitle}
          </h2>
        </div>
        <Start d={d} headingLevel="h3" />
      </section>
      <BreadcrumbLd d={d} trail={[{ name: d.meta.contact.title, path: "/contact" }]} />
    </>
  );
}

export function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const d = getDict(locale);
  return (
    <>
      <PageHero eyebrow={d.pages.legal.eyebrow} title={d.meta[kind].title} />
      <section className="wrap pb-32">
        <p className="t-lead max-w-3xl text-body">{d.pages.legal.body}</p>
        <p className="mt-6 text-muted">
          <a href={`mailto:${d.common.email}`} dir="ltr" className="font-semibold underline underline-offset-4">
            {d.common.email}
          </a>
        </p>
      </section>
    </>
  );
}
