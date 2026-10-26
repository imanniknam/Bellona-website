import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { stepNum } from "@/lib/format";
import { FactoryEmbed } from "../factory/FactoryEmbed";
import { Icon } from "../Icon";
import { SectionHead } from "../ui";
import { pillarShort } from "./Work";

/**
 * Lead → Revenue: the steps on the left (also the text version of the machine), the 3D machine on
 * the right, held in place while the steps scroll past. The machine stays on the physical right in
 * both languages.
 */
export function Flow({ d }: { d: Dict }) {
  const { flow } = d;
  const last = flow.nodes.length - 1;
  return (
    <section aria-labelledby="flow-title" className="section">
      <div className="wrap grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:rtl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="flex flex-col gap-10">
          <SectionHead id="flow-title" eyebrow={flow.eyebrow} title={flow.title} sub={flow.sub} size="t-h2-sm" />
          <ol className="flex flex-col">
            {flow.nodes.map((node, i) => (
              <li key={node.label} data-reveal="side" style={{ "--d": i } as CSSProperties} className="flex flex-col items-start">
                <div
                  className={`lift flex w-full items-center gap-4 rounded-2xl px-5 py-4 ${
                    i === last ? "bg-orange text-ink" : i === 0 ? "bg-ink text-paper" : "border border-line bg-paper"
                  }`}
                >
                  <span className={`font-mono text-xs ${i === last ? "text-ink" : i === 0 ? "text-muted-dark" : "text-muted"}`}>
                    {stepNum(i, d.locale)}
                  </span>
                  <p className="flex-1 text-lg font-bold leading-snug tracking-[-0.01em] rtl:font-extrabold rtl:tracking-normal">{node.label}</p>
                  <ul className="flex flex-wrap justify-end gap-1">
                    {node.pillars.map((id) => (
                      <li
                        key={id}
                        className={`chip min-h-6 px-2.5 py-0.5 text-xs ${
                          i === last ? "bg-ink text-paper" : i === 0 ? "bg-graphite text-soft-dark" : "bg-surface text-ink"
                        }`}
                      >
                        {pillarShort(d, id)}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < last && (
                  <span aria-hidden="true" className="ms-6 py-1 text-orange">
                    <Icon name="arrow" size={18} strokeWidth={2.4} className="rotate-90" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:sticky lg:top-10 lg:rtl:order-first">
          <FactoryEmbed locale={d.locale} unavailable={flow.unavailable} />
        </div>
      </div>
    </section>
  );
}
