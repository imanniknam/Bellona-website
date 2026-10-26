import type { Dict } from "@/content/types";
import { stepNum } from "@/lib/format";
import type { CSSProperties } from "react";
import { VoxelArt } from "../voxel/Voxel";
import { Rich } from "../Rich";
import { Eyebrow } from "../ui";

export function Why({ d, withCompare = true }: { d: Dict; withCompare?: boolean }) {
  const { why, locale } = d;
  return (
    <section aria-labelledby="why-title" className="section pt-0">
      <div className="wrap flex flex-col gap-20">
        <div className="flex flex-wrap gap-14">
          <div data-reveal="" className="group flex flex-[1_1_360px] flex-col gap-5 lg:sticky lg:top-10 lg:self-start">
            <Eyebrow>{why.eyebrow}</Eyebrow>
            <h2 id="why-title" className="t-h2-sm">
              <Rich text={why.title} accent="accent-ink" />
            </h2>
            <VoxelArt model="stack" className="mt-6 hidden h-80 w-auto self-start sm:block" />
          </div>
          <ol className="rule-list flex flex-[1_1_560px] flex-col border-y border-line">
            {why.items.map((item, i) => (
              <li key={item.title} data-reveal="" style={{ "--d": i } as CSSProperties} className="flex gap-7 py-7">
                <span className="pt-1.5 font-mono text-[15px] text-orange-text">{stepNum(i, locale)}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-2xl font-bold tracking-[-0.02em] rtl:font-extrabold rtl:tracking-normal">{item.title}</h3>
                  <p className="leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {withCompare && <Compare d={d} />}
      </div>
    </section>
  );
}

/** Traditional team vs Bellona. A real grid with ARIA table roles so it reflows on phones. */
export function Compare({ d }: { d: Dict }) {
  const { compare } = d.why;
  return (
    <div role="table" aria-label={compare.caption} data-reveal="" className="overflow-hidden rounded-[28px] border border-line">
      <div role="rowgroup">
        <div role="row" className="grid grid-cols-2 bg-surface md:grid-cols-[1fr_1.2fr_1.2fr]">
          <span role="columnheader" className="hidden px-6 py-5 text-sm font-semibold text-muted md:block">
            {compare.topic}
          </span>
          <span role="columnheader" className="px-5 py-5 text-sm font-semibold text-muted sm:px-6">
            {compare.traditional}
          </span>
          <span role="columnheader" className="bg-ink px-5 py-5 text-sm font-semibold text-paper sm:px-6">
            {compare.bellona}
          </span>
        </div>
      </div>
      <div role="rowgroup">
        {compare.rows.map((row) => (
          <div role="row" key={row.topic} className="grid grid-cols-2 border-t border-line md:grid-cols-[1fr_1.2fr_1.2fr]">
            <span
              role="rowheader"
              className="col-span-2 px-5 pt-5 font-mono text-xs uppercase tracking-[0.14em] text-orange-text sm:px-6 md:col-span-1 md:py-5 md:text-[13px] rtl:font-fa rtl:text-sm rtl:font-bold rtl:normal-case rtl:tracking-normal"
            >
              {row.topic}
            </span>
            <span role="cell" className="px-5 pb-5 pt-2 text-muted sm:px-6 md:py-5">
              {row.traditional}
            </span>
            <span role="cell" className="px-5 pb-5 pt-2 font-semibold sm:px-6 md:py-5">
              {row.bellona}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
