/**
 * Social proof. Both lists start empty on purpose: the client-logo strip and the
 * testimonials section only render once they contain real entries (with permission).
 * Never add an invented client or quote.
 */

export interface ClientLogo {
  name: string;
  /** SVG or PNG under /public, e.g. "/clients/acme.svg". */
  src: string;
  width: number;
  height: number;
}

export interface Testimonial {
  en: { quote: string; name: string; role: string };
  fa: { quote: string; name: string; role: string };
  /** Optional avatar under /public. */
  avatar?: string;
}

export const clientLogos: ClientLogo[] = [];

export const testimonials: Testimonial[] = [];
