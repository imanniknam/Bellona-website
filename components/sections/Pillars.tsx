import Link from "next/link";
import type { CSSProperties } from "react";
import type { Dict, Pillar } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { CountUp } from "../CountUp";
import { VoxelArt } from "../voxel/Voxel";
import { PILLAR_MODEL } from "../voxel/models";
import { ArrowIcon, SectionHead } from "../ui";

// Row 1: three cards (2/6 each), row 2: two wider cards (3/6 each).
const spans = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

export function PillarCard({ p, d, className = "" }: { p: Pillar; d: Dict; className?: string }) {
  const featured = p.id === "ai";
  return (
    <Link
      href={localePath(d.locale, `/services/${p.slug}`)}
      className={`card lift group flex min-h-[340px] flex-col gap-5 p-7 sm:p-8 ${
        featured ? "bg-orange text-ink" : "border border-line-dark bg-ink-2 text-paper hover:border-orange"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <VoxelArt
          model={PILLAR_MODEL[p.id]}
          className="h-32 w-auto sm:h-40"
          gap={featured ? "stroke-orange" : "stroke-ink-2"}
          swap={featured ? { o: "w" } : { k: "w" }}
        />
        <span className={`font-mono text-[13px] ${featured ? "text-ink" : "text-muted-dark"}`}>
          {p.num} · {p.stage}
        </span>
      </div>
      <h3 className="t-h3">{p.title}</h3>
      <p className={`flex-grow text-base leading-relaxed ${featured ? "text-graphite" : "text-muted-dark"}`}>{p.line}</p>
      <div className="flex items-end justify-between gap-4">
        <p className={`text-[15px] font-semibold ${featured ? "text-ink" : "text-orange-on-dark"}`}>{p.chips.join(" · ")}</p>
        <span
          aria-hidden="true"
          className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors ${
            featured ? "bg-ink text-paper" : "bg-graphite text-paper group-hover:bg-orange group-hover:text-ink"
          }`}
        >
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export function Pillars({ d, stats = true }: { d: Dict; stats?: boolean }) {
  return (
    <section id="services" aria-labelledby="pillars-title" className="on-dark section rounded-t-[40px] bg-ink text-paper">
      <div className="wrap flex flex-col gap-14">
        <SectionHead id="pillars-title" eyebrow={d.pillars.eyebrow} title={d.pillars.title} sub={d.pillars.sub} dark />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {d.pillars.items.map((p, i) => (
            <li key={p.id} data-reveal="pop" style={{ "--d": i } as CSSProperties} className={`${spans[i]} ${i === 4 ? "md:col-span-2" : ""} flex`}>
              <PillarCard p={p} d={d} className="w-full" />
            </li>
          ))}
        </ul>
        {stats && <Stats d={d} />}
      </div>
    </section>
  );
}

export function Stats({ d, light = false }: { d: Dict; light?: boolean }) {
  return (
    <dl className={`grid grid-cols-2 border-t lg:grid-cols-4 ${light ? "border-line" : "border-line-dark"}`}>
      {d.stats.map((s, i) => (
        <div key={s.label} className="flex flex-col-reverse gap-2 px-2 pt-9">
          <dt className={`text-[15px] ${light ? "text-muted" : "text-muted-dark"}`}>{s.label}</dt>
          <dd className={`t-num text-[clamp(48px,6vw,64px)] ${i === 0 ? "text-orange" : light ? "text-ink" : "text-paper"}`}>
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
