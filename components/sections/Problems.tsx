import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { Rich } from "../Rich";
import { MiniCube, VoxelArt } from "../voxel/Voxel";
import { PILLAR_MODEL } from "../voxel/models";
import { Eyebrow, StickySplit } from "../ui";
import { pillarShort } from "./Work";

/** "Sound familiar?": the live site's pain points, extended to every pillar. Heading stays put. */
export function Problems({ d }: { d: Dict }) {
  const { problems } = d;
  return (
    <section aria-labelledby="problems-title" className="section pt-0">
      <StickySplit
        head={
          <>
            <Eyebrow>{problems.eyebrow}</Eyebrow>
            <h2 id="problems-title" className="t-h2-sm">
              <Rich text={problems.title} />
            </h2>
            <p className="t-lead text-body">
              <Rich text={problems.close} />
            </p>
          </>
        }
      >
        <ul className="flex flex-col gap-4">
          {problems.cards.map((c, i) => (
            <li
              key={c.title}
              data-reveal="side"
              style={{ "--d": i } as CSSProperties}
              className="card lift group grid items-center gap-6 border border-line p-6 hover:border-ink sm:grid-cols-[auto_1fr] sm:p-7"
            >
              <VoxelArt model={PILLAR_MODEL[c.pillar]} className="h-28 w-auto" anim="pop" />
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="t-h3">{c.title}</h3>
                  <span className="chip bg-surface text-ink">{pillarShort(d, c.pillar)}</span>
                </div>
                {/* Bullets only, to keep the home page scannable; the full quotes live on the AI page. */}
                <ul className="flex flex-col gap-1.5">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-muted">
                    <MiniCube className="mt-1.5 size-3 shrink-0" />
                    {b}
                  </li>
                ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </StickySplit>
    </section>
  );
}
