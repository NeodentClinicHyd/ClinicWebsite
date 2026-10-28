import type { Metadata } from "next";
import { RootCanalClientChrome } from "./RootCanalClientChrome";
import { SITE_URL } from "@/lib/site-data";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import {
  BREADCRUMBS,
  LAST_REVIEWED,
  META_DESCRIPTION,
  META_TITLE,
  PAGE_PATH,
  PROCEDURE_NAME,
  RCT_FAQ,
  REVIEWED_BY,
} from "@/lib/root-canal-treatment-page";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/og-image";
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";

/* ------------------------------------------------------------------
   /treatments/root-canal-treatment — hand-built page, same construction as
   /treatments/dental-implants and /treatments/full-mouth-rehabilitation (no
   [slug] route, no shared treatment template).

   og:image / twitter:image: the site's default card image comes from
   app/opengraph-image.tsx and app/twitter-image.tsx, but Next only attaches
   those files to the root route, so they are referenced explicitly here
   (the same way the built pages do).

   JSON-LD: BreadcrumbList + MedicalWebPage + FAQPage. The FAQPage is built
   from RCT_FAQ, the same array the visible accordion renders. No ratings,
   no reviews, and no reviewer unless REVIEWED_BY and LAST_REVIEWED are set.
   ------------------------------------------------------------------ */

const url = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_PATH,
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [{ url: "/opengraph-image", ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [{ url: "/twitter-image", ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT }],
  },
};

const reviewed =
  REVIEWED_BY !== "" && LAST_REVIEWED !== ""
    ? {
        reviewedBy: { "@type": "Person", name: REVIEWED_BY },
        lastReviewed: LAST_REVIEWED,
      }
    : {};

const jsonLd = [
  breadcrumbJsonLd(BREADCRUMBS),
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: featuredTreatmentTitle("root-canal-treatment"),
    url,
    description: META_DESCRIPTION,
    inLanguage: "en-IN",
    about: {
      "@type": "MedicalProcedure",
      name: PROCEDURE_NAME,
    },
    isPartOf: { "@id": websiteJsonLd["@id"] },
    publisher: { "@id": organizationJsonLd["@id"] },
    ...reviewed,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RCT_FAQ.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          /* "<" is escaped so no string in the payload can close the tag. */
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <RootCanalClientChrome />
    </>
  );
}
