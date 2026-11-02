import { z } from "zod";
import { MODEL_IDS, NEED_IDS, OFFER_IDS } from "./lead-shared";

// Re-exported so server code keeps importing everything lead-related from one place.
export { initialLeadState, MODEL_IDS, NEED_IDS, OFFER_IDS } from "./lead-shared";
export type { LeadField, LeadState } from "./lead-shared";

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
