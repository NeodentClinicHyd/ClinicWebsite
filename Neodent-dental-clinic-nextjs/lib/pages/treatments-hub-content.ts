/* ------------------------------------------------------------------
   /treatments hub: owner-approved additions (R6B, A2).

   Two FAQs are appended after the six in lib/treatments-hub.ts
   (TREATMENTS_FAQ, shared and not edited). The visible FAQ and the
   FAQPage JSON-LD both read HUB_FAQ, so the schema matches the page word
   for word. The hours come from lib/site-data.ts, the single source.
   ------------------------------------------------------------------ */
import { mehdipatnamHours, nampallyHours } from "@/lib/site-data";
import { TREATMENTS_FAQ } from "@/lib/treatments-hub";

/** "4:00 PM - 8:00 PM" -> "4:00 PM to 8:00 PM" */
const spoken = (hours: string) => hours.replace(/\s*[-\u2013]\s*/, " to ");

export const EXTRA_FAQ = [
  {
    question: "Which dental treatments does Neodent offer?",
    answer:
      "Neodent offers seven featured treatments: composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design and cosmetic dentistry, full mouth rehabilitation, and scaling and polishing. Both clinics, Mehdipatnam and Nampally, offer all seven.",
  },
  {
    question: "When are the Neodent clinics open?",
    answer: `The Mehdipatnam clinic is open Monday to Saturday, ${spoken(mehdipatnamHours)}, and the Nampally clinic is open Monday to Saturday, ${spoken(nampallyHours)}. Sunday is a holiday.`,
  },
];

export const HUB_FAQ = [...TREATMENTS_FAQ, ...EXTRA_FAQ];

/** FAQPage JSON-LD built from the same array the page renders. */
export function hubFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HUB_FAQ.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
