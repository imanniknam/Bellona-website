import { z } from "zod";

export const NEED_IDS = ["system", "web", "product", "ai", "growth", "bizdev", "unsure"] as const;
export const MODEL_IDS = ["project", "partnership", "team"] as const;
/** content/{en,fa}.ts offers.packages ids; an offer button opens the form with ?offer=<id>. */
export const OFFER_IDS = ["audit", "launch", "automate", "system"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().trim().max(200),
  company: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
  needs: z.array(z.enum(NEED_IDS)).min(1).max(NEED_IDS.length),
  model: z.enum(MODEL_IDS).optional(),
  offer: z.enum(OFFER_IDS).optional(),
  industry: z.string().trim().max(40).optional(),
  locale: z.enum(["en", "fa"]),
  page: z.string().trim().max(200).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

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
