import type { Dict, Faq, Locale, Pillar, TeamMember } from "@/content/types";
import type { Project } from "@/content/work";
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
// Every spelling people search the brand by (English, Persian, the domain).
// TODO(owner): "Bellona AI" was dropped from the names; add it back only if it is the current name.
const ALTERNATE_NAMES = ["Bellona Agency", "آژانس بلونا", "بلونا", "بلونا ایجنسی", "bellonaagency"];
/** Square PNG, 512x512 on a plain background: what search engines accept as an organisation logo. */
const LOGO = { "@type": "ImageObject", url: `${siteUrl}/brand/bellona-logo-512.png`, width: 512, height: 512 };
/** A team member is one entity in both languages: its @id is the card anchor on the Persian /about page. */
export const personId = (m: TeamMember) => `${siteUrl}/about#${m.id}`;
const SHARIF = { "@type": "CollegeOrUniversity", name: "Sharif University of Technology" };
const LANGUAGES = ["fa", "en"];
const KNOWS_ABOUT: Record<Locale, string[]> = {
  fa: ["طراحی سایت", "توسعه‌ی فول‌استک", "اتوماسیون هوش مصنوعی", "سئو"],
  en: ["Website design", "Full-stack development", "AI automation", "SEO"],
};

/** Only what the team section shows: name, role, skills and (if stated) Sharif University. */
const person = (m: TeamMember) => ({
  "@type": "Person",
  "@id": personId(m),
  name: m.name,
  jobTitle: m.role,
  knowsAbout: m.skills,
  ...(/Sharif|شریف/.test(m.education) ? { affiliation: SHARIF } : {}),
});

/**
 * The business entity, rendered on every page from the shared layout (SEO-GUIDELINE C1).
 * It is a plain Organization: ProfessionalService is a LocalBusiness and would need a street address.
 * TODO(owner): once there is a real address, change the type to ["Organization", "ProfessionalService"] and add
 * address, telephone and areaServed. None of them is invented here.
 */
export function OrganizationLd({ d }: { d: Dict }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: d.meta.siteName,
        alternateName: ALTERNATE_NAMES,
        url: `${siteUrl}/`,
        logo: LOGO,
        image: LOGO.url,
        email: d.common.email,
        description: d.meta.home.description,
        slogan: d.common.tagline,
        availableLanguage: LANGUAGES,
        knowsAbout: KNOWS_ABOUT[d.locale],
        contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: d.common.email, availableLanguage: LANGUAGES }],
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

/** One service, on its own page: a pillar service page or one of its sub-pages. */
export function ServiceNodeLd({ d, name, serviceType, description, path }: { d: Dict; name: string; serviceType: string; description: string; path: string }) {
  const url = `${siteUrl}${localePath(d.locale, path)}`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        serviceType,
        description,
        url,
        inLanguage: d.locale,
        provider: { "@id": ORG_ID },
      }}
    />
  );
}

export function ServiceLd({ d, p }: { d: Dict; p: Pillar }) {
  return <ServiceNodeLd d={d} name={p.title} serviceType={p.title} description={p.page.metaDescription} path={`/services/${p.slug}`} />;
}

export function FaqLd({ items }: { items: Faq[] }) {
  // One FAQPage per page: a page that lists questions in several sections passes them all in one call.
  // Placeholder answers ("[…]") and repeated questions are left out of structured data.
  const seen = new Set<string>();
  const real = items.filter((f) => {
    if (f.a.includes("[") || seen.has(f.q)) return false;
    seen.add(f.q);
    return true;
  });
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
        itemListElement: [{ name: d.common.home, path: "/" }, ...trail].map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          item: `${siteUrl}${localePath(d.locale, t.path)}`,
        })),
      }}
    />
  );
}

const TYPE_LABEL: Record<Project["type"], Record<Locale, string>> = {
  website: { fa: "طراحی سایت", en: "Website design" },
  product: { fa: "پلتفرم و محصول دیجیتال", en: "Digital product development" },
  automation: { fa: "اتوماسیون هوش مصنوعی", en: "AI automation" },
  "mobile-app": { fa: "اپلیکیشن موبایل", en: "Mobile app development" },
};

/** A case study: a CreativeWork made by the business, about the client's sector, pointing at the client's site (C5). */
export function CaseStudyLd({ d, project }: { d: Dict; project: Project }) {
  const c = project[d.locale];
  const pageUrl = `${siteUrl}${localePath(d.locale, `/work/${project.slug}`)}`;
  // Real figures from the project data go into the description (never invented ones).
  const results = c.results.length ? ` ${c.results.map((r) => `${r.value} ${r.label}`).join("; ")}.` : "";
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${pageUrl}#work`,
        name: c.title,
        description: `${c.summary}${results}`,
        inLanguage: d.locale,
        creator: { "@id": ORG_ID },
        about: c.sector,
        keywords: [TYPE_LABEL[project.type][d.locale], c.sector].join(", "),
        // Only a known delivery year (never guessed). TODO(owner): the year of projects where it is empty.
        ...(project.year ? { dateCreated: String(project.year) } : {}),
        mainEntityOfPage: pageUrl,
        url: project.url ?? pageUrl,
        ...(project.cover ? { image: `${siteUrl}${project.cover}` } : {}),
      }}
    />
  );
}

/** The about page plus its team members as Person nodes (C7). */
export function AboutPageLd({ d }: { d: Dict }) {
  const url = `${siteUrl}${localePath(d.locale, "/about")}`;
  // TODO(owner): social profile links per team member (sameAs) when they want them public.
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "AboutPage",
            "@id": `${url}#aboutpage`,
            url,
            name: d.meta.about.title,
            description: d.meta.about.description,
            inLanguage: d.locale,
            about: { "@id": ORG_ID },
            mainEntity: { "@id": ORG_ID },
          },
          ...d.team.members.map((m) => ({ ...person(m), url: `${url}#${m.id}`, worksFor: { "@id": ORG_ID } })),
        ],
      }}
    />
  );
}

export function ContactPageLd({ d }: { d: Dict }) {
  const url = `${siteUrl}${localePath(d.locale, "/contact")}`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${url}#contactpage`,
        url,
        name: d.meta.contact.title,
        description: d.meta.contact.description,
        inLanguage: d.locale,
        about: { "@id": ORG_ID },
      }}
    />
  );
}
