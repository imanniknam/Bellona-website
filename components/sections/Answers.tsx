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
export function Answers({
  answers,
  locale,
  draft = false,
  needsLabel = "",
  tocLabel,
}: {
  answers: Answer[];
  locale: Locale;
  draft?: boolean;
  needsLabel?: string;
  /** When set, a table of contents with anchor links to every question is shown first (long guides). */
  tocLabel?: string;
}) {
  const shown = answers.filter((x) => x.a !== null || draft);
  return (
    <div className="wrap flex max-w-4xl flex-col pb-24">
      {tocLabel && shown.length > 3 && (
        <nav aria-label={tocLabel} className="mb-6 rounded-2xl bg-surface p-6">
          <p className="t-eyebrow pb-3 text-orange-text">{tocLabel}</p>
          <ol className="flex list-decimal flex-col gap-1.5 ps-6 marker:text-orange-text rtl:list-[persian]">
            {shown.map((x, i) => (
              <li key={x.q}>
                <a href={`#q-${i + 1}`} className="underline decoration-line underline-offset-4 hover:text-orange-text hover:decoration-orange">
                  {x.q}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {shown.map((x, i) => {
        const id = `q-${i + 1}`;
        return (
          <section key={x.q} aria-labelledby={id} className="flex scroll-mt-24 flex-col gap-5 border-t border-line py-10">
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
              if (dt.kind === "code")
                return (
                  <pre key={j} dir="ltr" className="overflow-x-auto rounded-2xl bg-ink p-5 text-left text-[13px] leading-relaxed text-soft-dark">
                    <code lang={dt.lang}>{dt.text}</code>
                  </pre>
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
