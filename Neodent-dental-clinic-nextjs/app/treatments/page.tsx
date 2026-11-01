import type { Metadata } from "next";
import { TreatmentsHubPage } from "@/components/pages/treatments-hub/TreatmentsHubPage";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { HUB_BREADCRUMBS, collectionPageJsonLd } from "@/lib/treatments-hub";
import { hubFaqJsonLd } from "@/lib/pages/treatments-hub-content";

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
   from the same HUB_FAQ array (TREATMENTS_FAQ plus two owner-approved items) the visible accordion renders.
   No ratings, no reviews. */
const jsonLd = [
  breadcrumbJsonLd(HUB_BREADCRUMBS),
  collectionPageJsonLd(description),
  hubFaqJsonLd(),
];

export default function TreatmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentsHubPage />
    </>
  );
}
