/* ------------------------------------------------------------------
   /clinic hub: owner-approved additions (PAGE_PLAN Q6, approved
   31 Oct 2026): breadcrumbs and a five-question FAQ.

   The visible FAQ and the FAQPage JSON-LD both read CLINIC_FAQ, so the
   schema matches the page word for word. The visible breadcrumb and the
   BreadcrumbList JSON-LD both read CLINIC_BREADCRUMBS. Phone numbers,
   hours and the founding year come from lib/site-data.ts, the single
   source; nothing is typed twice.

   Every answer uses facts already on the site. No prices, outcomes or
   promises, and no rating data.
   ------------------------------------------------------------------ */
import {
  legacyStats,
  mehdipatnamHours,
  nampallyHours,
  nampallyPhone,
  phone,
} from "@/lib/site-data";

/** "4:00 PM – 8:00 PM" -> "4:00 PM to 8:00 PM" */
const spoken = (hours: string) => hours.replace(/\s*[-\u2013]\s*/, " to ");

export const CLINIC_BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Clinics", path: "/clinic" },
];

export const CLINIC_FAQ = [
  {
    question: "Where are Neodent's dental clinics in Hyderabad?",
    answer: `Neodent Dental Hospital has two clinics in Hyderabad: Mehdipatnam, in Humayun Nagar, and Nampally, in the Medwin Hospital Complex. Mehdipatnam is the original location, where the practice began in ${legacyStats.established}.`,
  },
  {
    question: "What are the opening hours of the Neodent clinics?",
    answer: `The Mehdipatnam clinic is open Monday to Saturday, ${spoken(mehdipatnamHours)}. The Nampally clinic is open Monday to Saturday, ${spoken(nampallyHours)}. Sunday is a holiday at both clinics.`,
  },
  {
    question: "Which treatments can I have at each clinic?",
    answer:
      "Both clinics offer all seven featured treatments: composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design and cosmetic dentistry, full mouth rehabilitation, and scaling and polishing.",
  },
  {
    question: "How do I book a consultation?",
    answer: `Call the Mehdipatnam clinic on ${phone} or the Nampally clinic on ${nampallyPhone}, or send an enquiry through the contact page. A Neodent specialist will take you through consultation, treatment planning and follow-up care.`,
  },
  {
    question: "Is the care the same at both clinics?",
    answer: `Yes. Both clinics follow the same patient-focused approach to consultation, treatment planning and follow-up care that has defined Neodent since ${legacyStats.established}.`,
  },
];

/** FAQPage JSON-LD built from the same array the page renders. */
export function clinicFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CLINIC_FAQ.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
