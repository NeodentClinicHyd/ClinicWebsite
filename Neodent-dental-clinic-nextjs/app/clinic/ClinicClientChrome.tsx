"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClinicHero } from "@/components/clinic/ClinicHero";
import { ChooseClinic } from "@/components/clinic/ChooseClinic";
import { ClinicalSettings } from "@/components/clinic/ClinicalSettings";
import { InsideNeoDent } from "@/components/clinic/InsideNeoDent";
import { ClinicTreatments } from "@/components/clinic/ClinicTreatments";
import { ClinicVisit } from "@/components/clinic/ClinicVisit";

/* ------------------------------------------------------------------
   Client chrome for /clinic.

   Mirrors the About page's chrome: Navbar (transparent over the dark
   hero via `overHero`), the page's own sections, then the sitewide
   Footer. The sitewide FloatingCta is mounted in app/layout.tsx.

   Rhythm, as on the home page: dark hero -> ivory (glance strip, clinic
   cards) -> dark (surroundings) -> ivory (gallery) -> dark (treatments)
   -> ivory (closing red card) -> footer.
   ------------------------------------------------------------------ */

export function ClinicClientChrome() {
  return (
    <div className="site">
      <Navbar overHero />
      <main>
        <ClinicHero />
        <ChooseClinic />
        <ClinicalSettings />
        <InsideNeoDent />
        <ClinicTreatments />
        <ClinicVisit />
      </main>
      <Footer />
    </div>
  );
}
