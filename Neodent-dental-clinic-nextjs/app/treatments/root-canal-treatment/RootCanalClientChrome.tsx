"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { RctHero } from "@/components/treatments/root-canal-treatment/RctHero";
import { RctOverview } from "@/components/treatments/root-canal-treatment/RctOverview";
import { RctSigns } from "@/components/treatments/root-canal-treatment/RctSigns";
import { RctOptions } from "@/components/treatments/root-canal-treatment/RctOptions";
import { RctVisit } from "@/components/treatments/root-canal-treatment/RctVisit";
import { RctRestoring } from "@/components/treatments/root-canal-treatment/RctRestoring";
import { RctAftercare } from "@/components/treatments/root-canal-treatment/RctAftercare";
import { RctCases } from "@/components/treatments/root-canal-treatment/RctCases";
import { RctQuestions } from "@/components/treatments/root-canal-treatment/RctQuestions";
import { RctFaq } from "@/components/treatments/root-canal-treatment/RctFaq";
import { RctLocations } from "@/components/treatments/root-canal-treatment/RctLocations";
import { RctRelated } from "@/components/treatments/root-canal-treatment/RctRelated";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { SHOW_RCT_CASE_MEDIA } from "@/lib/root-canal-treatment-page";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for /treatments/root-canal-treatment, the same composition as
   FullMouthRehabilitationClientChrome: fixed Navbar, page sections, global
   Footer and the mobile call bar. `.site` is `overflow: hidden` globally,
   which would stop sticky side columns from sticking; `overflow: clip` clips
   the same way without creating a scroll container (set here only,
   globals.css is untouched).

   Section grounds, in order, never repeating in adjacent sections:
   hero dark | tan | light | dark patterned | tan | light | dark |
   [light, cases] | tan | light | dark | tan.
   With SHOW_RCT_CASE_MEDIA off, aftercare (dark) is followed by questions
   (tan), so the alternation still holds. */
export function RootCanalClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <Navbar />
      <main>
        <RctHero />
        <RctOverview />
        <RctSigns />
        <RctOptions />
        <RctVisit />
        <RctRestoring />
        <RctAftercare />
        {SHOW_RCT_CASE_MEDIA ? <RctCases /> : null}
        <RctQuestions />
        <RctFaq />
        <RctLocations />
        <RctRelated />
      </main>
      <Footer />
      <div className="mobile-bar">
        <AppButton href={ctaTelPhone} variant="primary">
          <Phone size={14} /> Call Neodent <ArrowRight size={14} />
        </AppButton>
      </div>
    </div>
  );
}
