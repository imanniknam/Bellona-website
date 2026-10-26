import type { CSSProperties } from "react";
import type { Dict } from "@/content/types";
import { stepNum } from "@/lib/format";
import { SectionHead } from "../ui";

/** "Simple by design": the three steps to start working together. */
export function Start({ d, headingLevel = "h2" }: { d: Dict; headingLevel?: "h2" | "h3" }) {
  const { start, locale } = d;
  return (
    <section id="process" aria-labelledby={headingLevel === "h2" ? "start-title" : undefined} className="section">
      <div className="wrap flex flex-col gap-14">
        {headingLevel === "h2" && <SectionHead id="start-title" eyebrow={start.eyebrow} title={start.title} center />}
        <ol className="grid gap-4 md:grid-cols-3">
          {start.steps.map((s, i) => {
            const dark = i === start.steps.length - 1;
            return (
              <li
                key={s.title}
                data-reveal=""
                style={{ "--d": i } as CSSProperties}
                className={`card lift flex flex-col gap-5 p-8 sm:p-9 ${dark ? "bg-ink text-paper" : "border border-line"}`}
              >
                <span aria-hidden="true" className="t-num text-[72px] text-orange">
                  {stepNum(i, locale)}
                </span>
                <h3 className="text-[26px] font-bold tracking-[-0.02em] rtl:font-extrabold rtl:tracking-normal">{s.title}</h3>
                <p className={`leading-relaxed ${dark ? "text-muted-dark" : "text-muted"}`}>{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
