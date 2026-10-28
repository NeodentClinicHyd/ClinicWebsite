"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutPractice } from "@/components/sections/about/AboutPractice";
import { AboutFounder } from "@/components/sections/about/AboutFounder";
import { AboutMiftah } from "@/components/sections/about/AboutMiftah";
import { AboutPress } from "@/components/sections/about/AboutPress";
import { AboutRecognition } from "@/components/sections/about/AboutRecognition";
import { AboutMedia } from "@/components/sections/about/AboutMedia";
import { AboutCommunity } from "@/components/sections/about/AboutCommunity";
import { AboutToday } from "@/components/sections/about/AboutToday";
import { AboutExplore } from "@/components/sections/about/AboutExplore";

/* ------------------------------------------------------------------
   Client-side chrome for /about.

   The About page has no booking CTA of its own; the sitewide Navbar and
   Footer are reused exactly as Home.tsx wires them (neither is
   modified). The Navbar opens over the dark hero (`overHero`), the same
   transparent-then-solid behaviour the home page has. The sitewide
   FloatingCta is mounted in app/layout.tsx and is unchanged. The closing
   band is the home page's own ContactNextStep, which takes no props and
   holds no lifted state.

   Rhythm: dark hero -> ivory / sand chapters -> patterned dark media
   -> ivory / sand -> dark closing band -> footer.
   ------------------------------------------------------------------ */

export function AboutClientChrome() {
  return (
    // The global `.site { overflow: hidden }` would stop the media
    // chapter's film panel from sticking (an overflow:hidden ancestor
    // becomes its scroll container). `clip` keeps the same no-sideways-
    // scroll guarantee without creating one. Scoped to this page only.
    <div className="site" style={{ overflowX: "clip", overflowY: "visible" }}>
      <Navbar overHero />
      <main>
        <AboutHero />
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
