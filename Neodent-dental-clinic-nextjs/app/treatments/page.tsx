import type { Metadata } from "next";
import { TreatmentsClientChrome } from "./TreatmentsClientChrome";

export const metadata: Metadata = {
  title: "Dental Treatments & Expertise in Hyderabad | NeoDent Dental Hospitals",
  description:
    "Explore dental treatments and clinical expertise at NeoDent Dental Hospitals in Hyderabad, including implants, full mouth rehabilitation, orthodontics, root canal treatment, smile designing, dentures and veneers.",
  robots: "index, follow",
  openGraph: {
    title: "Dental Treatments & Expertise in Hyderabad | NeoDent Dental Hospitals",
    description:
      "Comprehensive dental care including implants, full mouth rehabilitation, orthodontics, root canal treatment, smile designing, dentures and veneers at NeoDent Dental Hospitals, Hyderabad.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Treatments & Expertise in Hyderabad | NeoDent Dental Hospitals",
    description:
      "Comprehensive dental care including implants, full mouth rehabilitation, orthodontics, root canal treatment, smile designing, dentures and veneers.",
  },
};

export default function TreatmentsPage() {
  return <TreatmentsClientChrome />;
}
