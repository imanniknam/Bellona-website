import type { Dict } from "@/content/types";
import { ContactForm } from "../ContactForm";
import { Rich } from "../Rich";
import { BookLink, Eyebrow } from "../ui";

/** Dark "Ready when you are." block with the lead form and booking link. */
export function Contact({
  d,
  defaultNeed,
  title,
  sub,
  asH1 = false,
}: {
  d: Dict;
  defaultNeed?: string;
  title?: string;
  sub?: string;
  asH1?: boolean;
}) {
  const { contact } = d;
  const Heading = asH1 ? "h1" : "h2";
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark bg-ink pb-8 pt-24 text-paper lg:pt-32">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Eyebrow dark>{contact.eyebrow}</Eyebrow>
          <Heading id="contact-title" className="t-h1">
            <Rich text={title ?? contact.title} />
          </Heading>
          <p className="max-w-md text-lg leading-relaxed text-muted-dark">{sub ?? contact.sub}</p>
          <div className="mt-2 flex flex-col items-start gap-3">
            <p className="text-soft-dark">{contact.bookAlt}</p>
            <BookLink d={d} className="btn btn-outline" track="contact_book" />
          </div>
          <p className="text-muted-dark">
            {contact.emailAlt}{" "}
            <a href={`mailto:${d.common.email}`} dir="ltr" className="font-semibold text-paper underline underline-offset-4 hover:text-orange">
              {d.common.email}
            </a>
          </p>
        </div>
        <ContactForm
          locale={d.locale}
          copy={contact.form}
          defaultNeed={defaultNeed}
          offers={d.offers.packages.map((o) => ({ id: o.id, name: o.name, need: o.need }))}
        />
      </div>
    </section>
  );
}
