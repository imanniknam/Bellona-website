import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { projects } from "@/content/work";
import { digits } from "@/lib/format";
import { HeroMark } from "../hero/HeroMark";
import { IsoGrid } from "../hero/IsoGrid";
import { Rich } from "../Rich";
import { MiniCube, VoxelArt } from "../voxel/Voxel";
import type { Vox } from "../voxel/models";

import { ArrowIcon, LLink } from "../ui";
import { RollText } from "../RollText";

/**
 * Small cubes around the logo, positioned relative to the logo's own box and always outside it:
 * a loose ring on the floor, larger and lower in front, smaller and higher behind (depth).
 * Mirrored automatically in RTL (inline-start).
 */
const SATELLITES: { x: string; y: string; size: string; v: Vox[] }[] = [
  { x: "-42%", y: "68%", size: "h-14", v: [[0, 0, 0, "k"], [1, 0, 0, "o"]] }, // front, start side
  { x: "-26%", y: "16%", size: "h-8", v: [[0, 0, 0, "o"]] }, // back, start side
  { x: "114%", y: "26%", size: "h-9", v: [[0, 0, 0, "o"]] }, // back, end side
  { x: "110%", y: "70%", size: "h-16", v: [[0, 0, 0, "o"], [0, 0, 1, "o"]] }, // front, end side
];

/**
 * Hero: headline on one side, the animated cube mark on the tiled floor on the other (desktop),
 * stacked on phones. Sized so the mark's intro is in view on first load.
 */
export function Hero({ d }: { d: Dict }) {
  const { hero, locale } = d;
  const shipped = projects.filter((p) => p.status === "published").length;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Desktop: one floor behind the whole hero, fading out under the text (globals.css, .hero-floor). */}
      <IsoGrid className="hero-floor absolute inset-0 hidden size-full lg:block" decor={locale === "fa" ? "left" : "right"} cubes={false} />
      <div className="mx-auto grid max-w-[1360px] items-center gap-2 px-4 pt-8 sm:px-6 lg:min-h-[min(760px,calc(100svh-104px))] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:py-4">
        <div className="hero-in relative z-10 flex flex-col items-center gap-5 text-center sm:gap-6 lg:items-start lg:gap-5 lg:text-start">
          <p className="tagline t-eyebrow inline-flex items-center gap-2.5 text-muted">
            <MiniCube className="size-3.5" />
            {hero.tagline}
          </p>
          <h1 id="hero-title" className="t-hero text-balance">
            <Rich text={hero.title} />
          </h1>
          <p className="t-lead max-w-[520px] text-[17px] text-body lg:text-lg">{hero.sub}</p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <LLink locale={locale} href="/contact?need=unsure" className="btn btn-primary" track="hero_start">
              <RollText>{hero.primary}</RollText>
              <ArrowIcon />
            </LLink>
            <LLink locale={locale} href="/work" className="btn btn-outline bg-paper" track="hero_work">
              <RollText>{hero.secondary}</RollText>
            </LLink>
          </div>
          <ul className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted lg:justify-start">
            {[{ value: digits(shipped, locale), label: hero.projectsLabel }, ...hero.stats].map((s, i) => (
              <li key={s.label} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="hidden size-1 rounded-full bg-muted-dark sm:block" />}
                <span>
                  {s.value && <strong className="text-ink">{s.value}</strong>} {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative -mx-4 h-[340px] sm:-mx-6 sm:h-[460px] lg:mx-0 lg:h-[min(640px,calc(100svh-120px))]">
          <IsoGrid className="hero-floor-mobile absolute inset-0 size-full lg:hidden" cubes={false} />
          <div className="relative flex h-full items-center justify-center">
            <div className="relative">
              <HeroMark className="h-auto w-[210px] sm:w-[290px] lg:w-[min(380px,44svh)]" />
              <div aria-hidden="true" className="pointer-events-none hidden lg:block">
                {SATELLITES.map((c, i) => (
                  <span key={i} className="iso-float absolute" style={{ insetInlineStart: c.x, top: c.y, "--i": i } as CSSProperties}>
                    <VoxelArt voxels={c.v} className={`${c.size} w-auto`} headroom={0} anim="pop" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
