import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { Icon } from "../Icon";
import { Rich } from "../Rich";
import { Eyebrow } from "../ui";

/** "It's Monday morning. Everything's already done." Before/after, from the live site. */
export function Monday({ d }: { d: Dict }) {
  const m = d.pages.ai.monday;
  return (
    <section aria-labelledby="monday-title" className="section">
      <div className="wrap flex flex-col gap-12">
        <div data-reveal="" className="flex flex-col gap-4">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 id="monday-title" className="t-h2-sm">
            <Rich text={m.title} />
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {[m.before, m.after].map((col, i) => {
            const after = i === 1;
            return (
              <div
                key={col.title}
                data-reveal=""
                style={{ "--d": i } as CSSProperties}
                className={`card lift flex flex-col gap-5 p-8 ${after ? "bg-ink text-paper" : "border border-line"}`}
              >
                <h3 className="t-h3">{col.title}</h3>
                <p className={after ? "text-muted-dark" : "text-muted"}>{col.intro}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item, j) => (
                    <li
                      key={item}
                      data-reveal=""
                      style={{ "--d": j * 0.6 + i } as CSSProperties}
                      className={`flex items-center gap-3 ${after ? "" : "text-body line-through decoration-line"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full ${after ? "bg-orange text-ink" : "border border-line text-muted"}`}
                      >
                        {after ? <Icon name="check" size={14} strokeWidth={3} /> : <span className="size-1.5 rounded-full bg-muted" />}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={`mt-auto pt-4 font-semibold ${after ? "text-orange-on-dark" : "text-orange-text"}`}>{col.outro}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
