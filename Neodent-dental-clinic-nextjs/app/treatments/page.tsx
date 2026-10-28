import type { Metadata } from "next";
import { TreatmentsClientChrome } from "./TreatmentsClientChrome";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import {
  HUB_BREADCRUMBS,
  collectionPageJsonLd,
  faqJsonLd,
} from "@/lib/treatments-hub";

const title = "Dental Treatments in Hyderabad | Neodent Dental Hospital";
const description =
  "Explore dental treatments at Neodent Dental Hospital in Hyderabad, including composite build-up, implants, root canal treatment, orthodontics, smile design, full mouth rehabilitation and scaling and polishing.";
const ogDescription =
  "Explore featured dental treatments and additional restorative, cosmetic, preventive and surgical services at Neodent Dental Hospital in Hyderabad.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/treatments",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/treatments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
  },
};

/* JSON-LD: BreadcrumbList + CollectionPage (ItemList of the featured
   treatments; url only where a dedicated page exists) + FAQPage built
   from the same TREATMENTS_FAQ array the visible accordion renders.
   No ratings, no reviews. */
const jsonLd = [
  breadcrumbJsonLd(HUB_BREADCRUMBS),
  collectionPageJsonLd(description),
  faqJsonLd(),
];

export default function TreatmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentsClientChrome />
    </>
  );
}
