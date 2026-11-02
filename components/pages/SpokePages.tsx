import { notFound } from "next/navigation";
import { guidesHub, type Spoke, spokes } from "@/content/spokes";
import type { Locale } from "@/content/types";
import { publishedSpokes, visibleSpokes, spokePath } from "@/lib/drafts";
import { digits } from "@/lib/format";
import { getDict, localePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { FaqLd, ItemListLd, ORG_ID, personId, ServiceNodeLd } from "../JsonLd";
import { ogImagePath } from "@/lib/metadata";
import { Breadcrumbs } from "../Breadcrumbs";
import { Answers } from "../sections/Answers";
import { Contact } from "../sections/Contact";
import { projects as allProjects } from "@/content/work";
import { ProjectCard } from "../sections/Work";
import { ArrowIcon, LLink, PageHero } from "../ui";
import { RollText } from "../RollText";

export function findSpoke(kind: Spoke["kind"], slug: string, parent?: string): Spoke | undefined {
  return visibleSpokes(kind).find((s) => s.slug === slug && (kind === "guide" || s.parent === parent));
}

/** Draft banner: lists every open question (page-level and per answer). Only ever rendered in draft previews. */
function DraftBanner({ s, locale }: { s: Spoke; locale: Locale }) {
  const open = [...new Set([...s.needs, ...s[locale].answers.flatMap((a) => (a.a === null ? (a.needs ?? []) : []))])].sort((a, b) => a - b);
  return (
    <p role="note" className="wrap mt-6">
      <span className="block rounded-2xl bg-orange px-5 py-3 text-sm font-semibold text-ink">
        {guidesHub[locale].draftBanner} {open.map((n) => digits(n, locale)).join(locale === "fa" ? "، " : ", ")}
      </span>
    </p>
  );
}

/**
 * Related pages and case studies (SEO-GUIDELINE B8): the parent service, sibling sub-pages, guides that
 * cover the same topic (descriptive link text), and the projects that prove it.
 */
function Related({ s, locale, pillarSlug }: { s: Spoke; locale: Locale; pillarSlug?: string }) {
  const d = getDict(locale);
  const h = guidesHub[locale];
  const pages: { href: string; label: string }[] = [];
  const pillar = pillarSlug ? d.pillars.items.find((p) => p.slug === pillarSlug) : undefined;
  if (pillar) pages.push({ href: `/services/${pillar.slug}`, label: pillar.title });
  const group = (x: Spoke) => x.parent ?? x.pillar;
  for (const x of publishedSpokes("service")) if (x.slug !== s.slug && group(x) && group(x) === (s.parent ?? s.pillar)) pages.push({ href: spokePath(x), label: x[locale].h1.replace(/\*\*/g, "") });
  for (const slug of s.guides ?? []) {
    const g = publishedSpokes("guide").find((x) => x.slug === slug);
    if (g && g.slug !== s.slug) pages.push({ href: spokePath(g), label: g[locale].h1.replace(/\*\*/g, "") });
  }
  // A guide also links to the sub-pages that name it (the reverse of the lines above).
  if (s.kind === "guide") for (const x of publishedSpokes("service")) if (x.guides?.includes(s.slug)) pages.push({ href: spokePath(x), label: x[locale].h1.replace(/\*\*/g, "") });
  const work = (s.projects ?? []).flatMap((slug) => allProjects.filter((p) => p.slug === slug && p.status === "published"));
  if (!pages.length && !work.length) return null;
  return (
    <section aria-labelledby="related-title" className="wrap flex flex-col gap-10 pb-24">
      {pages.length > 0 && (
        <nav aria-labelledby="related-title" className="flex flex-col gap-4">
          <h2 id="related-title" className="t-h3">
            {h.relatedPages}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {pages.map((p) => (
              <li key={p.href}>
                <LLink locale={locale} href={p.href} className="btn btn-sm btn-outline">
                  {p.label}
                </LLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {work.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="t-h3">{h.relatedWork}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} d={d} variant="compact" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/** Answered questions as FAQ items, for the FAQPage schema (unanswered ones never appear). */
const answerFaq = (answers: Spoke["en"]["answers"]) => answers.flatMap((x) => (x.a ? [{ q: x.q, a: x.a }] : []));

/** /services/<pillar>/<spoke> */
export function ServiceSpokePage({ locale, parent, slug }: { locale: Locale; parent?: string; slug: string }) {
  const s = findSpoke("service", slug, parent);
  if (!s) notFound();
  const d = getDict(locale);
  // A sub-page belongs to its parent service; a standalone page (e.g. /services/seo) relates to s.pillar.
  const pillarSlug = parent ?? s.pillar;
  const pillar = d.pillars.items.find((p) => p.slug === pillarSlug);
  if (!pillar) notFound();
  const c = s[locale];
  const draft = s.status !== "published";
  return (
    <>
      <Breadcrumbs
        d={d}
        trail={[
          { name: d.meta.services.title, path: "/services" },
          ...(parent ? [{ name: pillar.title, path: `/services/${pillar.slug}` }] : []),
          { name: c.h1.replace(/\*\*/g, ""), path: spokePath(s) },
        ]} />
      {draft && <DraftBanner s={s} locale={locale} />}
      <PageHero eyebrow={c.eyebrow} title={c.h1} sub={c.definition}>
        <div className="flex flex-wrap gap-3 pt-2">
          <LLink locale={locale} href={`/contact?need=${s.need}`} className="btn btn-primary" track={`spoke_${s.slug}_start`}>
            <RollText>{d.common.startProject}</RollText>
            <ArrowIcon />
          </LLink>
          <LLink locale={locale} href={`/services/${pillar.slug}`} className="btn btn-outline">
            <RollText>{pillar.title}</RollText>
          </LLink>
        </div>
      </PageHero>
      <Answers answers={c.answers} locale={locale} draft={draft} needsLabel={guidesHub[locale].needsAnswer} />
      <Related s={s} locale={locale} pillarSlug={pillar.slug} />
      <Contact d={d} defaultNeed={s.need} />
      <ServiceNodeLd d={d} name={c.h1.replace(/\*\*/g, "")} serviceType={pillar.title} description={c.metaDescription} path={spokePath(s)} />
      <FaqLd items={answerFaq(c.answers)} />
    </>
  );
}

/** /guides: grouped by topic; every card has a short summary, the author and the last-updated date (SEO-GUIDELINE 5-2). */
export function GuidesHubPage({ locale }: { locale: Locale }) {
  const guides = visibleSpokes("guide");
  if (!guides.length) notFound();
  const d = getDict(locale);
  const h = guidesHub[locale];
  const dateFormat = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-GB", { dateStyle: "long" });
  const groups = (["web", "growth", "ai"] as const).map((need) => ({ need, items: guides.filter((g) => g.need === need) })).filter((g) => g.items.length);
  return (
    <>
      <Breadcrumbs d={d} trail={[{ name: h.eyebrow, path: "/guides" }]} />
      <PageHero eyebrow={h.eyebrow} title={h.h1} sub={h.sub} />
      <section aria-label={h.eyebrow} className="wrap flex flex-col gap-14 pb-24">
        <p className="t-lead max-w-3xl text-body">{h.intro}</p>
        {groups.map(({ need, items }) => (
          <div key={need} className="flex flex-col gap-6">
            <h2 className="t-h2-sm">{h.groups[need]}</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {items.map((g) => {
                const author = g.author ? d.team.members.find((m) => g.author?.split("|").includes(m.name)) : undefined;
                return (
                  <li key={g.slug}>
                    <LLink locale={locale} href={spokePath(g)} className="card lift group flex h-full flex-col gap-3 border border-line p-7">
                      <span className="t-h3">{g[locale].h1.replace(/\*\*/g, "")}</span>
                      <span className="leading-relaxed text-muted">{g[locale].definition}</span>
                      {(author || g.updated) && (
                        <span className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                          {author && (
                            <span>
                              {h.by}: {author.name}
                            </span>
                          )}
                          {g.updated && (
                            <span>
                              {h.lastUpdated}: <time dateTime={g.updated}>{dateFormat.format(new Date(g.updated))}</time>
                            </span>
                          )}
                        </span>
                      )}
                      <span className="mt-auto inline-flex items-center gap-2 font-semibold group-hover:text-orange-text">
                        {h.read}
                        <ArrowIcon size={16} />
                      </span>
                    </LLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
      <Contact d={d} />
      <ItemListLd
        name={h.h1.replace(/\*\*/g, "")}
        url={`${siteUrl}${localePath(locale, "/guides")}`}
        items={guides.map((g) => ({ name: g[locale].h1.replace(/\*\*/g, ""), url: `${siteUrl}${localePath(locale, spokePath(g))}` }))}
      />
    </>
  );
}

/** /guides/<slug>: byline, visible "last updated" and Article schema once both are set (G-05). */
export function GuidePage({ locale, slug }: { locale: Locale; slug: string }) {
  const s = findSpoke("guide", slug);
  if (!s) notFound();
  const d = getDict(locale);
  const h = guidesHub[locale];
  const c = s[locale];
  const draft = s.status !== "published";
  // `author` may list the name in each language, separated by "|".
  const names = s.author ? s.author.split("|") : [];
  const author = d.team.members.find((m) => names.includes(m.name));
  const updated = s.updated ? new Date(s.updated) : null;
  const dateText = updated ? new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-GB", { dateStyle: "long" }).format(updated) : null;
  const url = `${siteUrl}${localePath(locale, spokePath(s))}`;
  return (
    <>
      <Breadcrumbs
        d={d}
        trail={[
          { name: h.eyebrow, path: "/guides" },
          { name: c.h1.replace(/\*\*/g, ""), path: spokePath(s) },
        ]} />
      {draft && <DraftBanner s={s} locale={locale} />}
      <PageHero eyebrow={c.eyebrow} title={c.h1} sub={c.definition}>
        {(author || dateText) && (
          <p className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            {author && (
              <span>
                {h.by}: <strong className="text-ink">{author.name}</strong>, {author.role}
              </span>
            )}
            {dateText && updated && (
              <span>
                {h.lastUpdated}: <time dateTime={s.updated ?? undefined}>{dateText}</time>
              </span>
            )}
          </p>
        )}
      </PageHero>
      <Answers answers={c.answers} locale={locale} draft={draft} needsLabel={h.needsAnswer} tocLabel={h.toc} />
      <Related s={s} locale={locale} pillarSlug={s.pillar ?? (s.need === "ai" ? "ai-automation" : s.need === "growth" ? "marketing-growth" : "website-design")} />
      <Contact d={d} defaultNeed={s.need} />
      <FaqLd items={answerFaq(c.answers)} />
      {!draft && author && updated && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${url}#article`,
              headline: c.h1.replace(/\*\*/g, ""),
              description: c.metaDescription,
              inLanguage: locale,
              url,
              datePublished: s.updated,
              dateModified: s.updated,
              author: { "@type": "Person", "@id": personId(author), name: author.name, jobTitle: author.role, url: `${siteUrl}${localePath(locale, "/about")}#${author.id}` },
              image: `${siteUrl}${ogImagePath(locale, s.en.metaTitle)}`,
              mainEntityOfPage: url,
              publisher: { "@id": ORG_ID },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}

/** Published spokes of one pillar, for the pillar page's "go deeper" links. */
export const pillarSpokes = (pillarSlug: string) => spokes.filter((s) => (s.parent === pillarSlug || s.pillar === pillarSlug) && s.status === "published");
