import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { AboutHeader } from "@/components/pages/about/AboutHeader";
import { AboutFacts } from "@/components/pages/about/AboutFacts";
import { AboutPractice } from "@/components/pages/about/AboutPractice";
import { AboutFounder } from "@/components/pages/about/AboutFounder";
import { AboutExperience } from "@/components/pages/about/AboutExperience";
import { AboutTeam } from "@/components/pages/about/AboutTeam";
import { AboutPress } from "@/components/pages/about/AboutPress";
import { AboutRecognition } from "@/components/pages/about/AboutRecognition";
import { AboutSeam } from "@/components/pages/about/AboutSeam";
import { AboutVoice } from "@/components/pages/about/AboutVoice";
import { AboutCommunity } from "@/components/pages/about/AboutCommunity";
import { AboutToday } from "@/components/pages/about/AboutToday";
import { AboutCrossLinks } from "@/components/pages/about/AboutCrossLinks";
import styles from "@/components/pages/about/AboutPage.module.css";

const title = "About Neodent Dental Hospital | Specialist-Led Dental Care Since 1994";
const description =
  "The story of Neodent Dental Hospital: founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, with specialist-led dental care carried forward today across Mehdipatnam and Nampally.";
const ogDescription =
  "Founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, Neodent Dental Hospital brings specialist-led dental care to Mehdipatnam and Nampally.";

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
  return (
    // The global `.site { overflow: hidden }` would stop the S9 film panel
    // from sticking (an overflow:hidden ancestor becomes its scroll
    // container). `clip` keeps the same no-sideways-scroll guarantee
    // without creating one. Scoped to this page only.
    <div
      className={`site ${styles.page}`}
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <Navbar overHero />
      <main>
        <AboutHeader />
        <AboutFacts />
        <AboutPractice />
        <AboutFounder />
        <AboutExperience />
        <AboutTeam />
        <AboutPress />
        <AboutRecognition />
        <AboutSeam />
        <AboutVoice />
        <AboutCommunity />
        <AboutToday />
        <AboutCrossLinks />
        <ContactNextStep />
      </main>
      <Footer />
    </div>
  );
}
