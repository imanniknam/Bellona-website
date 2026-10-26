import Image from "next/image";
import Link from "next/link";
import { clientLogos } from "@/content/proof";
import type { Dict } from "@/content/types";
import { projects } from "@/content/work";
import { localePath } from "@/lib/i18n";
import { MiniCube } from "../voxel/Voxel";
import { Rich } from "../Rich";
import { Eyebrow, LLink } from "../ui";
import { RollText } from "../RollText";

/**
 * "Shipped for": a slow marquee of the clients in content/work.ts (names, linked to their case studies).
 * Once content/proof.ts has real logos, the logo strip below takes over.
 */
export function ClientMarquee({ d }: { d: Dict }) {
  const clients = projects.filter((p) => p.status === "published").map((p) => ({ slug: p.slug, name: p[d.locale].client }));
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="marquee-row flex shrink-0 items-center gap-10 pe-10 sm:gap-14 sm:pe-14">
      {clients.map((c) => (
        <li key={c.slug} className="flex items-center gap-10 whitespace-nowrap sm:gap-14">
          <Link
            href={localePath(d.locale, `/work/${c.slug}`)}
            tabIndex={hidden ? -1 : undefined}
            className="text-[22px] font-extrabold tracking-[-0.02em] text-ink/70 transition-colors hover:text-ink sm:text-[26px] rtl:tracking-normal"
          >
            {c.name}
          </Link>
          <MiniCube className="size-3 shrink-0" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={d.proofStrip.label} className="border-y border-line-soft py-7">
      <div className="flex items-center gap-6">
        <p className="t-eyebrow shrink-0 ps-4 text-muted sm:ps-6 lg:ps-10">{d.proofStrip.label}</p>
        <div className="marquee relative flex min-w-0 flex-1 overflow-hidden">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

/** Client logo strip. Renders nothing until content/proof.ts has real logos. */
export function ClientStrip({ d }: { d: Dict }) {
  if (!clientLogos.length) return null;
  return (
    <section aria-label={d.proofStrip.label} className="border-y border-line-soft py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <p className="text-[15px] text-muted">{d.proofStrip.label}</p>
        <ul className="flex flex-wrap items-center gap-8">
          {clientLogos.map((logo) => (
            <li key={logo.name}>
              <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className="h-8 w-auto opacity-80 grayscale" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

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
