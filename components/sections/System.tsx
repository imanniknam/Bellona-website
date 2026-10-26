import Link from "next/link";
import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { stepNum } from "@/lib/format";
import { VoxelArt } from "../voxel/Voxel";
import { PILLAR_MODEL } from "../voxel/models";
import { ArrowIcon, SectionHead } from "../ui";
import { Stats } from "./Pillars";

/**
 * The core offer: one system in three layers (Build → Automate → Grow), each feeding the next.
 * The single services are listed underneath as standalone entry points.
 */
export function System({ d }: { d: Dict }) {
  const { system, locale } = d;
  return (
    <section id="system" aria-labelledby="system-title" className="on-dark section rounded-t-[40px] bg-ink text-paper">
      <div className="wrap flex flex-col gap-14">
        <SectionHead id="system-title" eyebrow={system.eyebrow} title={system.title} sub={system.sub} dark />
        <ol className="grid gap-4 lg:grid-cols-3">
          {system.layers.map((l, i) => {
            const featured = l.pillar === "ai";
            const pillar = d.pillars.items.find((p) => p.id === l.pillar);
            return (
              <li key={l.pillar} data-reveal="pop" style={{ "--d": i } as CSSProperties} className="relative flex">
                <Link
                  href={localePath(locale, `/services/${pillar?.slug ?? ""}`)}
                  className={`card lift group flex w-full flex-col gap-5 p-7 sm:p-8 ${
                    featured ? "bg-orange text-ink" : "border border-line-dark bg-ink-2 text-paper hover:border-orange"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <VoxelArt
                      model={PILLAR_MODEL[l.pillar]}
                      className="h-28 w-auto sm:h-32"
                      gap={featured ? "stroke-orange" : "stroke-ink-2"}
                      swap={featured ? { o: "w" } : { k: "w" }}
                    />
                    <span className={`font-mono text-[13px] ${featured ? "text-ink" : "text-muted-dark"}`}>
                      {stepNum(i, locale)} · {l.stage}
                    </span>
                  </div>
                  <h3 className="t-h3">{l.title}</h3>
                  <p className={`flex-grow text-base leading-relaxed ${featured ? "text-graphite" : "text-muted-dark"}`}>{l.text}</p>
                  <p
                    className={`flex items-center gap-2 border-t pt-4 text-[15px] font-semibold ${
                      featured ? "border-ink/20 text-ink" : "border-line-dark text-orange-on-dark"
                    }`}
                  >
                    <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${featured ? "bg-ink" : "bg-orange"}`} />
                    {l.proof}
                  </p>
                </Link>
                {/* Connector to the next layer (desktop only). */}
                {i < system.layers.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -end-4 top-1/2 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink lg:flex"
                  >
                    <ArrowIcon />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <div className="flex flex-col gap-4">
          <p className="text-muted-dark">{system.standalone}</p>
          <ul className="flex flex-wrap gap-2">
            {d.pillars.items.map((p) => (
              <li key={p.id}>
                <Link
                  href={localePath(locale, `/services/${p.slug}`)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-dark px-4 text-[15px] font-semibold transition-colors hover:border-orange hover:text-orange-on-dark"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Stats d={d} />
      </div>
    </section>
  );
}
