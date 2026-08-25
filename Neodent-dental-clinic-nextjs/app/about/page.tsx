import type { Metadata } from "next";
import { AboutClientChrome } from "./AboutClientChrome";

export const metadata: Metadata = {
  title: "About NeoDent Dental Hospitals | Est. 1994, Hyderabad",
  description:
    "The story of NeoDent Dental Hospitals: founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, with specialist-led dental care carried forward today across Mehdipatnam and Nampally.",
  robots: "index, follow",
  openGraph: {
    title: "About NeoDent Dental Hospitals | Est. 1994, Hyderabad",
    description:
      "Founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, NeoDent Dental Hospitals brings specialist-led dental care to Mehdipatnam and Nampally.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About NeoDent Dental Hospitals | Est. 1994, Hyderabad",
    description:
      "Founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, NeoDent Dental Hospitals brings specialist-led dental care to Mehdipatnam and Nampally.",
  },
};

export default function AboutPage() {
  return <AboutClientChrome />;
}
