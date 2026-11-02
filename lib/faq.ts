import type { Answer } from "@/content/spokes";

/** Answered questions as plain {q, a} items for FAQPage structured data (unanswered ones never appear). */
export const faqOf = (answers: Answer[]) => answers.flatMap((x) => (x.a ? [{ q: x.q, a: x.a }] : []));
