import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { projectsForIndustry } from "@/content/work";
import { Rich } from "../Rich";
import { VoxelArt } from "../voxel/Voxel";
import { INDUSTRY_MODEL } from "../voxel/models";
import { ArrowIcon, Chips, Eyebrow, LLink, StickySplit } from "../ui";
import { RollText } from "../RollText";

/** Links to the case studies filed under one industry. */
function IndustryWork({ d, id }: { d: Dict; id: string }) {
  const items = projectsForIndustry(id);
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      <p className="t-eyebrow text-orange-text">{d.industries.workLabel}</p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((p) => (
          <li key={p.slug}>
            <LLink locale={d.locale} href={`/work/${p.slug}`} className="chip bg-ink text-paper transition-colors hover:bg-orange hover:text-ink">
              {p[d.locale].title}
            </LLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Home: heading held in place beside compact cards (shape, name, one line).
 * `full` (on /industries): larger cards with "what we'd build" chips, a CTA and anchors.
 */
export function Industries({ d, full = false }: { d: Dict; full?: boolean }) {
  const { industries, locale } = d;

  const shape = (ind: (typeof industries.items)[number]) => (
    <VoxelArt model={INDUSTRY_MODEL[ind.id] ?? "stack"} className={`w-auto self-start ${full ? "h-40 sm:h-48" : "h-28"}`} gap="stroke-paper" anim="rise" />
  );

  // Home: each card is one link to its sector page. /industries: the card holds its own links
  // (sector page, case studies), so it is not a link itself.
  const cards = (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.items.map((ind, i) =>
        full ? (
          <li
            key={ind.id}
            id={ind.id}
            data-reveal=""
            style={{ "--d": i % 3 } as CSSProperties}
            className="card lift group flex scroll-mt-6 flex-col gap-5 border border-line p-7"
          >
            {shape(ind)}
            <h3 className="t-h3">
              <LLink locale={locale} href={`/industries/${ind.id}`} className="hover:text-orange-text">
                {ind.title}
              </LLink>
            </h3>
            <p className="flex-grow leading-relaxed text-muted">{ind.text}</p>
            <div className="flex flex-col gap-3">
              <p className="t-eyebrow text-orange-text">{industries.buildLabel}</p>
              <Chips items={ind.build} />
            </div>
            <IndustryWork d={d} id={ind.id} />
            <LLink locale={locale} href={`/industries/${ind.id}`} className="btn btn-sm btn-ink self-start" track={`industry_${ind.id}`}>
              <RollText>{industries.cardLink}</RollText>
              <ArrowIcon size={16} />
            </LLink>
          </li>
        ) : (
          <li key={ind.id} data-reveal="" style={{ "--d": i % 3 } as CSSProperties} className="flex">
            <LLink
              locale={locale}
              href={`/industries/${ind.id}`}
              className="card lift group flex w-full flex-col gap-3 bg-paper p-5"
              track={`home_industry_${ind.id}`}
            >
              {shape(ind)}
              <h3 className="flex items-center justify-between gap-3 text-xl font-bold tracking-[-0.01em] rtl:font-extrabold rtl:tracking-normal">
                {ind.title}
                <span aria-hidden="true" className="text-muted transition-colors group-hover:text-orange-text">
                  <ArrowIcon size={16} />
                </span>
              </h3>
              <p className="flex-grow text-[15px] leading-relaxed text-muted">{ind.text}</p>
            </LLink>
          </li>
        ),
      )}
    </ul>
  );

  if (full) {
    return (
      <section id="industries" aria-labelledby="industries-title" className="pb-24">
        <div className="wrap flex flex-col gap-12">
          <h2 id="industries-title" className="sr-only">
            {industries.eyebrow}
          </h2>
          {cards}
          <p className="text-lg text-body">{industries.more}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="industries" aria-labelledby="industries-title" className="section bg-surface">
      <StickySplit
        head={
          <>
            <Eyebrow>{industries.eyebrow}</Eyebrow>
            <h2 id="industries-title" className="t-h2-sm">
              <Rich text={industries.title} />
            </h2>
            <p className="t-lead text-body">{industries.sub}</p>
            <p className="text-muted">{industries.more}</p>
            <LLink locale={locale} href="/industries" className="btn btn-sm btn-outline self-start">
              <RollText>{industries.seeAll}</RollText>
            </LLink>
          </>
        }
      >
        {cards}
      </StickySplit>
    </section>
  );
}
