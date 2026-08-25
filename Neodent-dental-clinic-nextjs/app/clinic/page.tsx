import type { Metadata } from "next";
import { ClinicClientChrome } from "./ClinicClientChrome";

const title = "NeoDent Dental Clinics in Hyderabad | Mehdipatnam & Nampally";
const description =
  "NeoDent Dental Hospitals operates two specialist-led dental clinics in Hyderabad — in Mehdipatnam (Humayun Nagar) and Nampally (Medwin Hospital Complex). Restorative, implant, prosthodontic and preventive dental care.";
const ogDescription =
  "Two Hyderabad locations. One NeoDent standard. Specialist-led dental care across Mehdipatnam and Nampally.";

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
  return <ClinicClientChrome />;
}
