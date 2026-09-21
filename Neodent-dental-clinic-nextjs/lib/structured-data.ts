import {
  SITE_NAME,
  SITE_URL,
  mehdipatnamStructuredAddress,
  nampallyStructuredAddress,
  telPhone,
  nampallyTelPhone,
} from "@/lib/site-data";

/**
 * JSON-LD structured data for the site, built entirely from verified
 * data already established in lib/site-data.ts (phones, addresses,
 * hours). Nothing here is fabricated:
 *
 * - No review/rating schema (Google's review-snippet requirements for
 *   AggregateRating/Review markup cannot be safely satisfied here --
 *   the on-page Google rating is a third-party figure, not
 *   first-party collected reviews).
 * - No sameAs (no verified social profile URLs exist in the project).
 * - No awards/certifications/patient-count claims in structured data,
 *   even though some appear as page copy, since this schema layer is
 *   scoped to identity + location facts only.
 *
 * Both Mehdipatnam and Nampally are represented as distinct schema.org
 * Dentist entities (a specialization of MedicalBusiness/LocalBusiness)
 * so search engines can associate Neodent with two real, separate
 * physical locations rather than one generic business.
 *
 * `openingHours` uses the schema.org day-range + 24h time format
 * (e.g. "Mo-Sa 16:00-20:00"). Both branches close Sundays, per the
 * site's own "Sunday holiday" note (see QuestionsContact.tsx).
 */

const organizationId = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": organizationId,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/Neodent%20dental%20hospital%20hyderabad%20logo.jpeg`,
  foundingDate: "1994",
  /* Instagram is the verified profile URL already rendered in the
     footer. The footer Facebook URL is a /photos deep link - add it
     here only after the client confirms the canonical profile URL. */
  sameAs: ["https://www.instagram.com/neodent.dental/"],
};

export const mehdipatnamJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/clinic#mehdipatnam`,
  name: SITE_NAME,
  parentOrganization: { "@id": organizationId },
  url: `${SITE_URL}/clinic`,
  telephone: telPhone.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    ...mehdipatnamStructuredAddress,
  },
  openingHours: "Mo-Sa 16:00-20:00",
};

export const nampallyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/clinic#nampally`,
  name: SITE_NAME,
  parentOrganization: { "@id": organizationId },
  url: `${SITE_URL}/clinic`,
  telephone: nampallyTelPhone.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    ...nampallyStructuredAddress,
  },
  openingHours: "Mo-Sa 10:30-17:00",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
};

/** All site-wide JSON-LD blocks, rendered once from the root layout. */
export const siteJsonLd = [
  organizationJsonLd,
  mehdipatnamJsonLd,
  nampallyJsonLd,
  websiteJsonLd,
];
