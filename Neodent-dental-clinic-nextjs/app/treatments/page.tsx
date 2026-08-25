import type { Metadata } from "next";
import { TreatmentsClientChrome } from "./TreatmentsClientChrome";

const title = "Dental Treatments in Hyderabad | NeoDent Dental Hospitals";
const description =
  "Explore dental treatments and clinical expertise at NeoDent Dental Hospitals in Hyderabad, including implants, full mouth rehabilitation, orthodontics, root canal treatment, smile designing, dentures and veneers.";
const ogDescription =
  "Comprehensive dental care including implants, full mouth rehabilitation, orthodontics, root canal treatment, smile designing, dentures and veneers at NeoDent Dental Hospitals, Hyderabad.";

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

export default function TreatmentsPage() {
  return <TreatmentsClientChrome />;
}
