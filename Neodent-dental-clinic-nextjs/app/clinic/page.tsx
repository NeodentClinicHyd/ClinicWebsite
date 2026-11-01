import type { Metadata } from "next";
import { ClinicPageView } from "@/components/pages/clinic/ClinicPageView";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import {
  CLINIC_BREADCRUMBS,
  clinicFaqJsonLd,
} from "@/lib/pages/clinic-content";

const title = "Neodent Dental Clinics in Hyderabad | Mehdipatnam & Nampally";
const description =
  "Neodent Dental Hospital operates two specialist-led dental clinics in Hyderabad — in Mehdipatnam (Humayun Nagar) and Nampally (Medwin Hospital Complex). Restorative, implant, prosthodontic and preventive dental care.";
const ogDescription =
  "Two Hyderabad locations. One Neodent standard. Specialist-led dental care across Mehdipatnam and Nampally.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/clinic",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/clinic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
  },
};

export default function ClinicPage() {
  /* New page-level JSON-LD (Q6, approved): BreadcrumbList and FAQPage,
     each built from the arrays the page renders, so the schema matches
     the visible text word for word. No ratings, no reviews. */
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(CLINIC_BREADCRUMBS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicFaqJsonLd()) }}
      />
      <ClinicPageView />
    </>
  );
}
