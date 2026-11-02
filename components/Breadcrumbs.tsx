import type { Dict } from "@/content/types";
import { BreadcrumbLd } from "./JsonLd";
import { LLink } from "./ui";

/**
 * Visible breadcrumb plus its BreadcrumbList JSON-LD, built from the same trail so they always agree
 * (SEO-GUIDELINE B7/C). The first crumb is the home page; the last one is the current page, not a link.
 */
export function Breadcrumbs({ d, trail }: { d: Dict; trail: { name: string; path: string }[] }) {
  const crumbs = [{ name: d.common.home, path: "/" }, ...trail];
  return (
    <>
      <nav aria-label={d.common.breadcrumb} className="wrap pt-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <LLink locale={d.locale} href={c.path} className="underline decoration-line underline-offset-4 hover:text-orange-text hover:decoration-orange">
                      {c.name}
                    </LLink>
                    <span aria-hidden="true">{d.locale === "fa" ? "‹" : "›"}</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <BreadcrumbLd d={d} trail={trail} />
    </>
  );
}
