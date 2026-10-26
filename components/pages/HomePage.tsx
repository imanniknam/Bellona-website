import type { Locale } from "@/content/types";
import { getDict } from "@/lib/i18n";
import { ProfessionalServiceLd } from "../JsonLd";
import { Contact } from "../sections/Contact";
import { Faq } from "../sections/Faq";
import { Hero } from "../sections/Hero";
import { Offers, Promises } from "../sections/Offers";
import { Problems } from "../sections/Problems";
import { Start } from "../sections/Start";
import { System } from "../sections/System";
import { Team } from "../sections/Team";
import { Testimonials } from "../sections/Testimonials";
import { ClientMarquee, ClientStrip } from "../sections/Who";
import { Work } from "../sections/Work";

/**
 * Home: one story, in order. What we sell (hero) → proof we ship (marquee) → the pain → the core offer
 * → ways to start → work → how it goes → promises → who builds it → objections → contact.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <>
      <Hero d={d} />
      <ClientMarquee d={d} />
      <ClientStrip d={d} />
      <div className="pt-24 lg:pt-32">
        <Problems d={d} />
      </div>
      <System d={d} />
      <Offers d={d} />
      <Work d={d} />
      <Start d={d} />
      <Promises d={d} />
      <Team d={d} />
      <Testimonials d={d} />
      {/* Objection handling: price, timeline, existing site, ownership, international. */}
      <Faq d={d} items={d.faq.items.slice(0, 5)} />
      <Contact d={d} />
      <ProfessionalServiceLd d={d} />
    </>
  );
}
