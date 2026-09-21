import type { Metadata } from "next";
import { Home } from "@/components/Home";

const title = "Neodent Dental Hospital | Specialist Dental Care in Hyderabad";
const description =
  "Specialist-led dental care in Hyderabad since 1994. Neodent Dental Hospital treats patients across two locations — Mehdipatnam and Nampally — with a focus on prosthodontics, implants and restorative dentistry.";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's title.template
  // ("%s | Neodent Dental Hospital") since this title already spells
  // out the full brand name.
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Page() {
  return <Home />;
}
