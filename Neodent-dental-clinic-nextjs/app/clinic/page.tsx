import type { Metadata } from "next";
import { ClinicClientChrome } from "./ClinicClientChrome";

export const metadata: Metadata = {
  title: "Our Clinics | NeoDent Dental Hospital — Mehdipatnam & Nampally, Hyderabad",
  description:
    "NeoDent Dental Hospitals operates two specialist-led dental clinics in Hyderabad — in Mehdipatnam (Humayun Nagar) and Nampally (Medwin Hospital Complex). Restorative, implant, prosthodontic and preventive dental care.",
  robots: "index, follow",
  openGraph: {
    title: "Our Clinics | NeoDent Dental Hospital — Mehdipatnam & Nampally, Hyderabad",
    description:
      "Two Hyderabad locations. One NeoDent standard. Specialist-led dental care across Mehdipatnam and Nampally.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Clinics | NeoDent Dental Hospital — Mehdipatnam & Nampally, Hyderabad",
    description:
      "Two Hyderabad locations. One NeoDent standard. Specialist-led dental care across Mehdipatnam and Nampally.",
  },
};

export default function ClinicPage() {
  return <ClinicClientChrome />;
}
