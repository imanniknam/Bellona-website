/**
 * Shape of every piece of site copy. `content/en.ts` and `content/fa.ts` both implement `Dict`,
 * so TypeScript flags any key that is missing in one language.
 *
 * Rich strings (see components/Rich.tsx):
 *   **text**  → accent (orange, heavier weight)
 *   ==text==  → black pill highlight
 *   \n        → line break
 */

export type Locale = "en" | "fa";

export type PillarId = "web" | "product" | "ai" | "growth" | "bizdev";

export type IconName =
  | "cube"
  | "code"
  | "cycle"
  | "chart"
  | "compass"
  | "arrow"
  | "check"
  | "bolt"
  | "users"
  | "chat"
  | "link"
  | "layers"
  | "home"
  | "bank"
  | "heart"
  | "cart"
  | "briefcase"
  | "book"
  | "plug"
  | "search"
  | "rocket"
  | "shield";

export interface Faq {
  q: string;
  a: string;
}

export interface Pillar {
  id: PillarId;
  slug: string;
  /** Short label for tags, e.g. "Website". */
  short: string;
  num: string;
  stage: string;
  icon: IconName;
  title: string;
  line: string;
  chips: string[];
  page: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    /** The former slogan headline, shown under the keyword H1. */
    tagline?: string;
    sub: string;
    includedTitle: string;
    included: { title: string; text: string }[];
    deliverTitle: string;
    deliver: string[];
    connectsTitle: string;
    connects: string;
    faq: Faq[];
  };
}

export interface Industry {
  id: string;
  icon: IconName;
  title: string;
  /** Keyword H1 on the industry page (the title becomes the eyebrow). */
  h1?: string;
  text: string;
  build: string[];
}

/** Card order on the site: name → role (most prominent) → skills → field & university. */
export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  /** Listed in schema.org as a founder. */
  founder?: boolean;
  skills: string[];
  /** Field of study and university. */
  education: string;
  /** Path under /public, e.g. "/team/iman.jpg". Initials are shown until it is set. */
  photo?: string;
  linkedin?: string;
}

export interface EngagementModel {
  id: "project" | "partnership" | "team";
  name: string;
  tagline: string;
  text: string;
  price: string;
  priceNote: string;
  includes: string[];
  cta: string;
}

/** A productized offer (home + /offers). `need` pre-fills the contact form. */
export interface OfferPackage {
  id: "audit" | "launch" | "automate" | "system";
  need: PillarId | "unsure" | "system";
  name: string;
  /** Short label on the card, e.g. "Free" or "Core offer". */
  badge?: string;
  /** Who it is for, one line. */
  fit: string;
  outcome: string;
  includes: string[];
  timeline: string;
  price: string;
  cta: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface Dict {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** <title>/description overrides by locale-less path, e.g. "/services". */
  seo: Record<string, { title?: string; description?: string }>;
  meta: {
    siteName: string;
    home: PageMeta;
    services: PageMeta;
    partner: PageMeta;
    offers: PageMeta;
    industries: PageMeta;
    work: PageMeta;
    about: PageMeta;
    contact: PageMeta;
    privacy: PageMeta;
    terms: PageMeta;
    notFound: PageMeta;
  };
  common: {
    skip: string;
    wordmark: string;
    agency: string;
    tagline: string;
    homeLabel: string;
    menuOpen: string;
    menuClose: string;
    menuTitle: string;
    primaryNav: string;
    nav: { key: "work" | "offers" | "services" | "partner" | "industries" | "about" | "contact"; label: string; href: string }[];
    langSwitch: { label: string; hrefLang: Locale; ariaLabel: string };
    bookCall: string;
    bookInitial: string;
    startProject: string;
    learnMore: string;
    backHome: string;
    opensNewTab: string;
    footer: {
      nav: string;
      rights: string;
      legal: { privacy: string; terms: string };
      emailLabel: string;
      /** Social profiles shown in the footer and menu (and listed as schema.org sameAs). */
      social: { label: string; href: string }[];
    };
    email: string;
  };
  hero: {
    tagline: string;
    title: string;
    sub: string;
    primary: string;
    secondary: string;
    /** First stat; its value is the live count of published projects (content/work.ts). */
    projectsLabel: string;
    stats: { value: string; label: string }[];
  };
  /** The core offer: one system in three layers. */
  system: {
    eyebrow: string;
    title: string;
    sub: string;
    layers: { pillar: PillarId; stage: string; title: string; text: string; proof: string }[];
    standalone: string;
  };
  /** Productized offers + risk reversal. */
  offers: {
    eyebrow: string;
    title: string;
    sub: string;
    timelineLabel: string;
    priceLabel: string;
    includesLabel: string;
    packages: OfferPackage[];
    custom: { title: string; text: string; cta: string };
    promises: { eyebrow: string; title: string; items: { icon: IconName; title: string; text: string }[] };
  };
  who: { eyebrow: string; text: string; cta: string };
  /** Home "sound familiar?" section: the live site's three pain points plus one per new pillar. */
  problems: {
    eyebrow: string;
    title: string;
    cards: { pillar: PillarId; title: string; quote: string; bullets: string[] }[];
    close: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    sub: string;
    cardCta: string;
    items: Pillar[];
  };
  stats: { value: string; label: string }[];
  journey: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: { title: string; line: string; deliverables: string[] }[];
    cta: string;
    startAnywhere: string;
    deliverablesLabel: string;
  };
  work: {
    eyebrow: string;
    title: string;
    sub: string;
    all: string;
    filterLabel: string;
    filterAll: string;
    byIndustry: string;
    placeholderImage: string;
    /** Alt text for a project cover; {title} is replaced with the project name. */
    coverAlt: string;
    placeholderNote: string;
    view: string;
    caseStudy: {
      client: string;
      sector: string;
      year: string;
      services: string;
      challenge: string;
      built: string;
      results: string;
      stack: string;
      quote: string;
      next: string;
      back: string;
      previewNotice: string;
      visit: string;
      gallery: string;
      partner: string;
    };
  };
  flow: {
    eyebrow: string;
    title: string;
    sub: string;
    /** Shown if the 3D machine cannot start (no WebGL). */
    unavailable: string;
    nodes: { label: string; pillars: PillarId[] }[];
  };
  start: {
    eyebrow: string;
    title: string;
    steps: { title: string; text: string }[];
  };
  industries: {
    eyebrow: string;
    title: string;
    sub: string;
    items: Industry[];
    cardCta: string;
    buildLabel: string;
    workLabel: string;
    /** Industry pages (/industries/[id]). */
    cardLink: string;
    workTitle: string;
    noWork: string;
    others: string;
    more: string;
    seeAll: string;
  };
  why: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
    compare: {
      caption: string;
      topic: string;
      traditional: string;
      bellona: string;
      rows: { topic: string; traditional: string; bellona: string }[];
    };
  };
  engage: {
    eyebrow: string;
    title: string;
    sub: string;
    includesLabel: string;
    items: EngagementModel[];
    note: string;
    noteCta: string;
  };
  team: {
    eyebrow: string;
    title: string;
    sub: string;
    members: TeamMember[];
    skillsLabel: string;
    educationLabel: string;
  };
  testimonials: { eyebrow: string; title: string };
  faq: { eyebrow: string; title: string; side: string; items: Faq[] };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    bookAlt: string;
    emailAlt: string;
    form: {
      label: string;
      needLegend: string;
      needs: { id: PillarId | "unsure" | "system"; label: string }[];
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      company: string;
      companyPh: string;
      message: string;
      messagePh: string;
      submit: string;
      sending: string;
      /** Shown above the form when an offer button opened it, e.g. "Selected offer". */
      offerLabel: string;
      success: string;
      /** Saved on our server because every delivery route was down; the reply may be slower. */
      stored: string;
      error: string;
      errors: { name: string; email: string; needs: string; message: string };
      privacy: string;
      privacyLink: string;
      honeypot: string;
    };
  };
  pages: {
    services: { eyebrow: string; h1: string; sub: string; includedLabel: string };
    offers: { eyebrow: string; h1: string; sub: string };
    pillar: { included: string; deliver: string; connects: string; faq: string; otherPillars: string; ctaTitle: string; ctaSub: string; work: string; workAll: string };
    ai: {
      problem: {
        title: string;
        cards: { title: string; quote: string; bullets: string[] }[];
        close: string;
      };
      capabilities: { title: string; sub: string };
      monday: {
        eyebrow: string;
        title: string;
        before: { title: string; intro: string; items: string[]; outro: string };
        after: { title: string; intro: string; items: string[]; outro: string };
      };
      process: { title: string; sub: string; steps: { title: string; text: string }[] };
    };
    partner: {
      eyebrow: string;
      h1: string;
      sub: string;
      problem: { title: string; text: string };
      fix: { title: string; text: string };
    };
    industries: { eyebrow: string; h1: string; sub: string };
    work: { eyebrow: string; h1: string; sub: string; emptyNote: string };
    about: {
      eyebrow: string;
      h1: string;
      storyTitle: string;
      story: string[];
      howTitle: string;
    };
    contact: { eyebrow: string; h1: string; sub: string; nextTitle: string };
    legal: { eyebrow: string; body: string };
    notFound: { title: string; text: string; cta: string };
  };
}
