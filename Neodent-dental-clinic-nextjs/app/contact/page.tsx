import type { Metadata } from "next";
import ContactClientChrome from "./ContactClientChrome";

const title = "Contact NeoDent Dental Hospitals | Hyderabad";
const description =
  "Begin your care journey with NeoDent Dental Hospitals. Reach either Hyderabad clinic — Mehdipatnam (Humayun Nagar) or Nampally (Medwin Hospital Complex) — by phone or in person.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ContactPage() {
  return <ContactClientChrome />;
}
