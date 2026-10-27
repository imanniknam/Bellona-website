import type { Dict, Faq, Pillar, TeamMember } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; `<` is escaped so content can never close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** One id for the business, shared by both locales; every other node points to it. */
export const ORG_ID = `${siteUrl}/#organization`;
// Every spelling people search the brand by (Persian, English, the domain).
const ALTERNATE_NAMES = ["بلونا", "آژانس بلونا", "بلونا ایجنسی", "Bellona Agency", "Bellona AI", "bellonaagency"];
const SHARIF = { "@type": "CollegeOrUniversity", name: "Sharif University of Technology" };

/** Only what the team section shows: name, role, skills and (if stated) Sharif University. */
const person = (m: TeamMember) => ({
  "@type": "Person",
  name: m.name,
  jobTitle: m.role,
  knowsAbout: m.skills,
  ...(/Sharif|شریف/.test(m.education) ? { affiliation: SHARIF } : {}),
});

/**
 * The full business entity. Rendered on the home page only (docs/seo P1-08 / TA-15).
 * areaServed / address / telephone are left out until the team confirms them (QUESTIONS_FOR_TEAM #24).
 */
export function ProfessionalServiceLd({ d }: { d: Dict }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: "Bellona",
        alternateName: ALTERNATE_NAMES,
        url: `${siteUrl}${localePath(d.locale, "/")}`,
        logo: `${siteUrl}/brand/bellona-app-icon.svg`,
        image: `${siteUrl}/api/og?locale=${d.locale}`,
        email: d.common.email,
        description: d.meta.home.description,
        slogan: d.common.tagline,
        inLanguage: d.locale,
        knowsAbout: d.pillars.items.map((p) => p.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: d.meta.services.title,
          itemListElement: d.pillars.items.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: p.title,
              description: p.line,
              url: `${siteUrl}${localePath(d.locale, `/services/${p.slug}`)}`,
            },
          })),
        },
        sameAs: d.common.footer.social.map((s) => s.href),
        founder: d.team.members.filter((m) => m.founder).map(person),
        employee: d.team.members.filter((m) => !m.founder).map(person),
      }}
    />
  );
}

/** Small sitewide node: the site in this language, published by the entity above (by @id). */
export function WebSiteLd({ d }: { d: Dict }) {
  const url = `${siteUrl}${localePath(d.locale, "/")}`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: d.meta.siteName,
        alternateName: ALTERNATE_NAMES,
        inLanguage: d.locale,
        publisher: { "@id": ORG_ID },
      }}
    />
  );
}

/** One service, on its own service page only. */
export function ServiceLd({ d, p }: { d: Dict; p: Pillar }) {
  const url = `${siteUrl}${localePath(d.locale, `/services/${p.slug}`)}`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: p.title,
        serviceType: p.title,
        description: p.page.metaDescription,
        url,
        provider: { "@id": ORG_ID },
      }}
    />
  );
}

export function FaqLd({ items }: { items: Faq[] }) {
  // Placeholder answers ("[…]") are left out of structured data.
  const real = items.filter((f) => !f.a.includes("["));
  if (!real.length) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: real.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function BreadcrumbLd({ d, trail }: { d: Dict; trail: { name: string; path: string }[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: d.meta.siteName, path: "/" }, ...trail].map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          item: `${siteUrl}${localePath(d.locale, t.path)}`,
        })),
      }}
    />
  );
}
