import { notFound } from "next/navigation";
import { blogHub, type Block, type Post, postPath, publishedPosts } from "@/content/blog";
import type { Locale } from "@/content/types";
import { getDict, localePath } from "@/lib/i18n";
import { ogImagePath } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { Breadcrumbs } from "../Breadcrumbs";
import { FaqLd, ItemListLd, ORG_ID, personId } from "../JsonLd";

import { MiniCube } from "../voxel/Voxel";
import { Contact } from "../sections/Contact";
import { ArrowIcon, LLink, PageHero } from "../ui";

export const findPost = (slug: string) => publishedPosts().find((p) => p.slug === slug);

const plain = (s: string) => s.replace(/\*\*/g, "");
const dateOf = (locale: Locale, iso: string) => new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-GB", { dateStyle: "long" }).format(new Date(iso));
const minutesOf = (locale: Locale, n: number) => `${locale === "fa" ? n.toLocaleString("fa-IR") : n} ${blogHub[locale].minutes}`;

function authorOf(p: Post, locale: Locale) {
  const names = p.author.split("|");
  return getDict(locale).team.members.find((m) => names.includes(m.name));
}

function Meta({ p, locale }: { p: Post; locale: Locale }) {
  const h = blogHub[locale];
  const author = authorOf(p, locale);
  return (
    <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
      <span className="chip bg-surface text-ink">{h.categories[p.category]}</span>
      {author && (
        <span>
          {h.by}: <strong className="text-ink">{author.name}</strong>
        </span>
      )}
      <span>
        {h.updated}: <time dateTime={p.updated}>{dateOf(locale, p.updated)}</time>
      </span>
      <span>{minutesOf(locale, p.minutes)}</span>
    </p>
  );
}

function Blocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "p")
          return (
            <p key={i} className="text-[17px] leading-[2] text-body">
              {b.text}
            </p>
          );
        if (b.kind === "list")
          return (
            <ul key={i} className="flex flex-col gap-3">
              {b.items.map((it) => (
                <li key={it} className="flex gap-3 text-[17px] leading-[1.9] text-body">
                  <MiniCube className="mt-[0.7em] size-3 shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        if (b.kind === "steps")
          return (
            <ol key={i} className="flex flex-col gap-4">
              {b.items.map((it, n) => (
                <li key={it} className="flex gap-4 rounded-2xl bg-surface p-5">
                  <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-ink font-bold text-paper">
                    {(n + 1).toLocaleString(locale === "fa" ? "fa-IR" : "en")}
                  </span>
                  <span className="text-[17px] leading-[1.9] text-body">{it}</span>
                </li>
              ))}
            </ol>
          );
        if (b.kind === "table")
          return (
            <div key={i} className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[34rem] border-collapse text-start text-[15px]">
                <caption className="p-4 text-start text-muted">{b.caption}</caption>
                <thead className="bg-surface">
                  <tr>
                    {b.head.map((h) => (
                      <th key={h} scope="col" className="p-4 text-start font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r) => (
                    <tr key={r.join("|")} className="border-t border-line">
                      {r.map((c, k) => (
                        <td key={k} className={`p-4 align-top leading-relaxed ${k === 0 ? "font-bold" : "text-body"}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return (
          <aside key={i} className="on-dark flex flex-col gap-2 rounded-3xl bg-ink p-7 text-paper">
            <p className="t-h3">{b.title}</p>
            <p className="leading-[1.9] text-soft-dark">{b.text}</p>
          </aside>
        );
      })}
    </>
  );
}

/** /blog: the newest article is featured, the rest follow as cards. */
export function BlogHubPage({ locale }: { locale: Locale }) {
  const list = publishedPosts();
  if (!list.length) notFound();
  const d = getDict(locale);
  const h = blogHub[locale];
  const [first, ...rest] = [...list].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <>
      <Breadcrumbs d={d} trail={[{ name: h.eyebrow, path: "/blog" }]} />
      <PageHero eyebrow={h.eyebrow} title={h.h1} sub={h.sub} />
      <section aria-label={h.eyebrow} className="wrap flex flex-col gap-8 pb-24">
        <LLink locale={locale} href={postPath(first)} className="card lift group grid gap-8 border border-line bg-surface p-8 sm:p-12 md:grid-cols-[1fr_auto]">
          <span className="flex flex-col gap-5">
            <span className="chip w-fit bg-ink text-paper">{h.categories[first.category]}</span>
            <span className="t-h2-sm">{plain(first[locale].h1)}</span>
            <span className="max-w-3xl text-[17px] leading-[1.9] text-body">{first[locale].answer}</span>
            <span className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              <time dateTime={first.updated}>{dateOf(locale, first.updated)}</time>
              <span>{minutesOf(locale, first.minutes)}</span>
            </span>
            <span className="inline-flex items-center gap-2 font-semibold group-hover:text-orange-text">
              {h.read}
              <ArrowIcon size={16} />
            </span>
          </span>
          <span aria-hidden="true" className="hidden items-center md:flex">
            <span className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }, (_, i) => (
                <MiniCube key={i} className="size-10" tone={i % 4 === 0 ? "o" : i % 3 === 0 ? "k" : "g"} gap="stroke-surface" />
              ))}
            </span>
          </span>
        </LLink>
        {rest.length > 0 && (
          <ul className="grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <li key={p.slug}>
                <LLink locale={locale} href={postPath(p)} className="card lift group flex h-full flex-col gap-3 border border-line p-7">
                  <span className="chip w-fit bg-surface">{h.categories[p.category]}</span>
                  <span className="t-h3">{plain(p[locale].h1)}</span>
                  <span className="leading-relaxed text-muted">{p[locale].answer}</span>
                  <span className="mt-auto inline-flex items-center gap-2 font-semibold group-hover:text-orange-text">
                    {h.read}
                    <ArrowIcon size={16} />
                  </span>
                </LLink>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Contact d={d} />
      <ItemListLd
        name={plain(h.h1)}
        url={`${siteUrl}${localePath(locale, "/blog")}`}
        items={list.map((p) => ({ name: plain(p[locale].h1), url: `${siteUrl}${localePath(locale, postPath(p))}` }))}
      />
    </>
  );
}

/** /blog/<slug>: answer first, table of contents, sections, FAQ, related links and an Article schema. */
export function BlogPostPage({ locale, slug }: { locale: Locale; slug: string }) {
  const p = findPost(slug);
  if (!p) notFound();
  const d = getDict(locale);
  const h = blogHub[locale];
  const c = p[locale];
  const author = authorOf(p, locale);
  const url = `${siteUrl}${localePath(locale, postPath(p))}`;
  return (
    <>
      <Breadcrumbs
        d={d}
        trail={[
          { name: h.eyebrow, path: "/blog" },
          { name: plain(c.h1), path: postPath(p) },
        ]} />
      <PageHero eyebrow={h.categories[p.category]} title={c.h1}>
        <Meta p={p} locale={locale} />
      </PageHero>
      <article className="wrap grid gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="flex max-w-3xl flex-col gap-12">
          <div className="flex flex-col gap-6">
            <p data-answer="" className="t-lead rounded-3xl border border-line bg-surface p-7 text-ink">
              {c.answer}
            </p>
            <p className="text-[17px] leading-[2] text-body">{c.intro}</p>
          </div>
          {c.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="flex scroll-mt-24 flex-col gap-6">
              <h2 id={`${s.id}-h`} className="t-h2-sm">
                {s.h2}
              </h2>
              <Blocks blocks={s.blocks} locale={locale} />
            </section>
          ))}
          <section id="faq" aria-labelledby="faq-h" className="flex scroll-mt-24 flex-col gap-4">
            <h2 id="faq-h" className="t-h2-sm">
              {h.faq}
            </h2>
            <div className="flex flex-col">
              {c.faq.map((f) => (
                <details key={f.q} className="group border-t border-line py-5 last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                    <h3 className="t-h3 text-[18px]">{f.q}</h3>
                    <span aria-hidden="true" className="text-orange-text transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 leading-[1.9] text-body">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          <section aria-labelledby="related-h" className="flex flex-col gap-4">
            <h2 id="related-h" className="t-h3">
              {h.related}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {p.links.map((l) => (
                <li key={l.href}>
                  <LLink locale={locale} href={l.href} className="btn btn-sm btn-outline">
                    {l[locale]}
                  </LLink>
                </li>
              ))}
            </ul>
          </section>
          <p className="t-lead text-ink">{c.closing}</p>
        </div>
        <aside className="hidden lg:block">
          <nav aria-label={h.toc} className="sticky top-28 flex flex-col gap-3 rounded-2xl bg-surface p-6">
            <p className="t-eyebrow text-orange-text">{h.toc}</p>
            <ol className="flex flex-col gap-2 text-[15px]">
              {[...c.sections.map((s) => ({ id: s.id, t: s.h2 })), { id: "faq", t: h.faq }].map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="underline decoration-line underline-offset-4 hover:text-orange-text hover:decoration-orange">
                    {s.t}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </article>
      <Contact d={d} defaultNeed={p.category === "ai" ? "ai" : p.category} />
      <FaqLd items={c.faq} />
      {author && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${url}#article`,
              headline: plain(c.h1),
              description: c.metaDescription,
              inLanguage: locale,
              url,
              datePublished: p.published,
              dateModified: p.updated,
              author: { "@type": "Person", "@id": personId(author), name: author.name, jobTitle: author.role, url: `${siteUrl}${localePath(locale, "/about")}#${author.id}` },
              image: `${siteUrl}${ogImagePath(locale, p.en.metaTitle)}`,
              mainEntityOfPage: url,
              publisher: { "@id": ORG_ID },
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
