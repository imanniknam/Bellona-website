import type { Locale } from "@/content/types";
import type { Answer } from "@/content/spokes";
import { digits } from "@/lib/format";
import { LLink } from "../ui";

/**
 * Answer-first sections (docs/seo G-04): each question is an H2, followed straight away by a short direct
 * answer (`data-answer`, ~40–60 words) that search engines and AI assistants can quote, then the detail:
 * numbered steps (<ol>), a table with a header row, or links.
 *
 * Answers without a confirmed fact (`a: null`) are left out of published pages. In draft previews they
 * show as a note naming the open question instead, never as a placeholder.
 */
export function Answers({ answers, locale, draft, needsLabel }: { answers: Answer[]; locale: Locale; draft: boolean; needsLabel: string }) {
  const shown = answers.filter((x) => x.a !== null || draft);
  return (
    <div className="wrap flex max-w-4xl flex-col pb-24">
      {shown.map((x, i) => {
        const id = `q-${i + 1}`;
        return (
          <section key={x.q} aria-labelledby={id} className="flex flex-col gap-5 border-t border-line py-10">
            <h2 id={id} className="t-h3">
              {x.q}
            </h2>
            {x.a === null ? (
              <p className="rounded-2xl border border-dashed border-orange px-5 py-4 text-muted">
                {needsLabel} {(x.needs ?? []).map((n) => digits(n, locale)).join(locale === "fa" ? "، " : ", ")}
              </p>
            ) : (
              <p data-answer="" className="t-lead text-body">
                {x.a}
              </p>
            )}
            {x.details?.map((dt, j) => {
              if (dt.kind === "p")
                return (
                  <p key={j} className="leading-relaxed text-body">
                    {dt.text}
                  </p>
                );
              if (dt.kind === "steps")
                return (
                  <ol key={j} className="flex list-decimal flex-col gap-2 ps-6 text-body marker:font-bold marker:text-orange-text rtl:list-[persian]">
                    {dt.items.map((it) => (
                      <li key={it} className="leading-relaxed">
                        {it}
                      </li>
                    ))}
                  </ol>
                );
              if (dt.kind === "table")
                return (
                  <div key={j} className="overflow-x-auto">
                    <table className="w-full border-collapse text-start text-[15px]">
                      <caption className="pb-3 text-start text-muted">{dt.caption}</caption>
                      <thead>
                        <tr>
                          {dt.head.map((h) => (
                            <th key={h} scope="col" className="border-b border-line py-2 pe-4 text-start font-bold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dt.rows.map((r) => (
                          <tr key={r.join("|")}>
                            {r.map((c, k) => (
                              <td key={k} className="border-b border-line py-2 pe-4 text-body">
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
                <ul key={j} className="flex flex-wrap gap-2">
                  {dt.items.map((l) => (
                    <li key={l.href}>
                      <LLink locale={locale} href={l.href} className="btn btn-sm btn-outline">
                        {l.label}
                      </LLink>
                    </li>
                  ))}
                </ul>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
