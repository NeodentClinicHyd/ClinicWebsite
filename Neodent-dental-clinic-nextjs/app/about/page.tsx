import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { AboutHeader } from "@/components/pages/about/AboutHeader";
import { AboutFacts } from "@/components/pages/about/AboutFacts";
import { AboutPractice } from "@/components/sections/about/AboutPractice";
import { AboutFounder } from "@/components/sections/about/AboutFounder";
import { AboutMiftah } from "@/components/sections/about/AboutMiftah";
import { AboutPress } from "@/components/sections/about/AboutPress";
import { AboutRecognition } from "@/components/sections/about/AboutRecognition";
import { AboutMedia } from "@/components/sections/about/AboutMedia";
import { AboutCommunity } from "@/components/sections/about/AboutCommunity";
import { AboutToday } from "@/components/sections/about/AboutToday";
import { AboutExplore } from "@/components/sections/about/AboutExplore";
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
        <AboutMiftah />
        <AboutPress />
        <AboutRecognition />
        <AboutMedia />
        <AboutCommunity />
        <AboutToday />
        <AboutExplore />
        <ContactNextStep />
      </main>
      <Footer />
    </div>
  );
}
