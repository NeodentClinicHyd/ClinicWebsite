import type { Metadata } from "next";
import { DoctorsPageView } from "@/components/pages/doctors/DoctorsPageView";
import { SITE_NAME, SITE_URL } from "@/lib/site-data";

/* ------------------------------------------------------------------
   Doctors hub (/doctors) - the route referenced by the Dr. Miftah
   page's visible breadcrumb and its BreadcrumbList schema. Lists the
   clinical team using only facts already established elsewhere on
   the site (names, roles, credentials). Server component - no
   interactivity required.
   ------------------------------------------------------------------ */

const title = `Our Doctors | ${SITE_NAME}`;
const description =
  "Meet the clinical team at Neodent Dental Hospital, Hyderabad - founded by Dr. Mohd. Siraj Ur Rahman, with prosthodontist and implantologist Dr. Md. Miftah Ur Rahman.";
const path = "/doctors";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: path,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: path,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}${path}/#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Doctors",
      item: `${SITE_URL}${path}`,
    },
  ],
};

export default function DoctorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DoctorsPageView />
    </>
  );
}