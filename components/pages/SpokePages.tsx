import { notFound } from "next/navigation";
import { guidesHub, type Spoke, spokes } from "@/content/spokes";
import type { Locale } from "@/content/types";
import { visibleSpokes, spokePath } from "@/lib/drafts";
import { digits } from "@/lib/format";
import { getDict, localePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { BreadcrumbLd, ORG_ID } from "../JsonLd";
import { Answers } from "../sections/Answers";
import { Contact } from "../sections/Contact";
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

/** /services/<pillar>/<spoke> */
export function ServiceSpokePage({ locale, parent, slug }: { locale: Locale; parent: string; slug: string }) {
  const s = findSpoke("service", slug, parent);
  if (!s) notFound();
  const d = getDict(locale);
  const pillar = d.pillars.items.find((p) => p.slug === parent);
  if (!pillar) notFound();
  const c = s[locale];
  const draft = s.status !== "published";
  return (
    <>
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
      <Contact d={d} defaultNeed={s.need} />
      <BreadcrumbLd
        d={d}
        trail={[
          { name: d.meta.services.title, path: "/services" },
          { name: pillar.title, path: `/services/${pillar.slug}` },
          { name: c.h1.replace(/\*\*/g, ""), path: spokePath(s) },
        ]}
      />
    </>
  );
}

/** /guides */
export function GuidesHubPage({ locale }: { locale: Locale }) {
  const guides = visibleSpokes("guide");
  if (!guides.length) notFound();
  const d = getDict(locale);
  const h = guidesHub[locale];
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.h1} sub={h.sub} />
      <section aria-label={h.eyebrow} className="wrap pb-24">
        <ul className="grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <LLink locale={locale} href={spokePath(g)} className="card lift group flex h-full flex-col gap-3 border border-line p-7">
                <span className="t-h3">{g[locale].h1.replace(/\*\*/g, "")}</span>
                <span className="leading-relaxed text-muted">{g[locale].metaDescription}</span>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold group-hover:text-orange-text">
                  {h.read}
                  <ArrowIcon size={16} />
                </span>
              </LLink>
            </li>
          ))}
        </ul>
      </section>
      <Contact d={d} />
      <BreadcrumbLd d={d} trail={[{ name: h.eyebrow, path: "/guides" }]} />
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
  const author = s.author ? d.team.members.find((m) => m.name === s.author || m.name.includes(s.author ?? "")) : undefined;
  const updated = s.updated ? new Date(s.updated) : null;
  const dateText = updated ? new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-GB", { dateStyle: "long" }).format(updated) : null;
  const url = `${siteUrl}${localePath(locale, spokePath(s))}`;
  return (
    <>
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
      <Answers answers={c.answers} locale={locale} draft={draft} needsLabel={h.needsAnswer} />
      <Contact d={d} defaultNeed={s.need} />
      <BreadcrumbLd
        d={d}
        trail={[
          { name: h.eyebrow, path: "/guides" },
          { name: c.h1.replace(/\*\*/g, ""), path: spokePath(s) },
        ]}
      />
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
              author: { "@type": "Person", name: author.name, jobTitle: author.role },
              publisher: { "@id": ORG_ID },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}

/** Published spokes of one pillar, for the pillar page's "go deeper" links. */
export const pillarSpokes = (pillarSlug: string) => spokes.filter((s) => s.kind === "service" && s.parent === pillarSlug && s.status === "published");
