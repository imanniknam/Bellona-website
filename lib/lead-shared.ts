/**
 * The parts of a lead that the browser needs: id lists and the form state. No validation library here, so the
 * contact form (a client component on almost every page) does not ship zod (SEO-GUIDELINE G).
 * The schema itself lives in lib/lead.ts and is only imported by the server action.
 */
export const NEED_IDS = ["system", "web", "product", "ai", "growth", "bizdev", "unsure"] as const;
export const MODEL_IDS = ["project", "partnership", "team"] as const;
/** content/{en,fa}.ts offers.packages ids; an offer button opens the form with ?offer=<id>. */
export const OFFER_IDS = ["audit", "launch", "automate", "system"] as const;

export type LeadField = "name" | "email" | "needs" | "message";

export interface LeadState {
  /** "stored": every external delivery route failed, but the lead is saved on our own server (LEAD_STORE_DIR). */
  status: "idle" | "success" | "stored" | "invalid" | "error";
  /** Increments on every server response so the form can re-mount with the returned values. */
  attempt: number;
  errors?: Partial<Record<LeadField, true>>;
  values?: Partial<Record<"name" | "email" | "company" | "message", string>> & { needs?: string[] };
}

export const initialLeadState: LeadState = { status: "idle", attempt: 0 };
