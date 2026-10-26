import Image from "next/image";
import { testimonials } from "@/content/proof";
import type { Dict } from "@/content/types";
import { SectionHead } from "../ui";

const bubble = ["bg-paper", "bg-ink text-paper", "bg-paper"];
const dot = ["bg-ink", "bg-orange", "bg-orange-light"];

/** Chat-bubble testimonials. Renders nothing until content/proof.ts has real quotes. */
export function Testimonials({ d }: { d: Dict }) {
  if (!testimonials.length) return null;
  return (
    <section aria-labelledby="testimonials-title" className="section bg-surface">
      <div className="wrap flex flex-col gap-12">
        <div className="flex items-end gap-4">
          <SectionHead id="testimonials-title" eyebrow={d.testimonials.eyebrow} title={d.testimonials.title} />
          <span aria-hidden="true" className="mb-4 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 animate-pulse rounded-full bg-orange motion-reduce:animate-none" style={{ animationDelay: `${i * 200}ms` }} />
            ))}
          </span>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const c = t[d.locale];
            return (
              <li key={c.name}>
                <figure className={`flex h-full flex-col gap-6 rounded-[28px] rounded-es-md p-8 ${bubble[i % 3]}`}>
                  <blockquote className="text-xl leading-normal">&ldquo;{c.quote}&rdquo;</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    {t.avatar ? (
                      <Image src={t.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                    ) : (
                      <span aria-hidden="true" className={`size-11 rounded-full ${dot[i % 3]}`} />
                    )}
                    <span className="flex flex-col">
                      <strong className="text-[15px]">{c.name}</strong>
                      <span className="text-sm opacity-75">{c.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
