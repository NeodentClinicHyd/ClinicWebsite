import type { Metadata } from "next";
import { AboutClientChrome } from "./AboutClientChrome";

const title = "About NeoDent Dental Hospitals | Specialist-Led Dental Care Since 1994";
const description =
  "The story of NeoDent Dental Hospitals: founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, with specialist-led dental care carried forward today across Mehdipatnam and Nampally.";
const ogDescription =
  "Founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, NeoDent Dental Hospitals brings specialist-led dental care to Mehdipatnam and Nampally.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
  },
};

export default function AboutPage() {
  return <AboutClientChrome />;
}
