import type { Dict } from "@/content/types";
import { Rich } from "../Rich";
import { Eyebrow, LLink } from "../ui";
import { RollText } from "../RollText";

export function Who({ d }: { d: Dict }) {
  return (
    <section aria-labelledby="who-title" className="section border-t border-line-soft">
      <div className="wrap flex flex-wrap items-end justify-between gap-12">
        <div data-reveal="" className="flex max-w-[960px] flex-[1_1_640px] flex-col gap-6">
          <Eyebrow>
            <span id="who-title">{d.who.eyebrow}</span>
          </Eyebrow>
          <p className="t-statement">
            <Rich text={d.who.text} />
          </p>
        </div>
        <LLink locale={d.locale} href="/about" className="btn btn-outline" track="who_story">
          <RollText>{d.who.cta}</RollText>
        </LLink>
      </div>
    </section>
  );
}
