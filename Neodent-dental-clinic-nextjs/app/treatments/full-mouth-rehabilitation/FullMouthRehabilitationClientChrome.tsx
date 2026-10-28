"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { FmrHero } from "@/components/treatments/full-mouth-rehabilitation/FmrHero";
import { FmrOverview } from "@/components/treatments/full-mouth-rehabilitation/FmrOverview";
import { FmrWhen } from "@/components/treatments/full-mouth-rehabilitation/FmrWhen";
import { FmrInclude } from "@/components/treatments/full-mouth-rehabilitation/FmrInclude";
import { FmrPlan } from "@/components/treatments/full-mouth-rehabilitation/FmrPlan";
import { FmrChoices } from "@/components/treatments/full-mouth-rehabilitation/FmrChoices";
import { FmrAftercare } from "@/components/treatments/full-mouth-rehabilitation/FmrAftercare";
import { FmrCases } from "@/components/treatments/full-mouth-rehabilitation/FmrCases";
import { FmrQuestions } from "@/components/treatments/full-mouth-rehabilitation/FmrQuestions";
import { FmrFaq } from "@/components/treatments/full-mouth-rehabilitation/FmrFaq";
import { FmrLocations } from "@/components/treatments/full-mouth-rehabilitation/FmrLocations";
import { FmrRelated } from "@/components/treatments/full-mouth-rehabilitation/FmrRelated";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { SHOW_FMR_CASE_IMAGES } from "@/lib/full-mouth-rehabilitation-page";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for /treatments/full-mouth-rehabilitation, the same
   composition as DentalImplantsClientChrome: fixed Navbar, page sections,
   global Footer and the mobile call bar. `.site` is `overflow: hidden`
   globally, which would stop sticky side columns from sticking;
   `overflow: clip` clips the same way without creating a scroll container
   (set here only, globals.css is untouched).

   Section grounds, in order, never repeating in adjacent sections:
   hero dark | tan | light | dark patterned | tan | light | dark | light |
   dark | tan | dark | light. */
export function FullMouthRehabilitationClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <Navbar />
      <main>
        <FmrHero />
        <FmrOverview />
        <FmrWhen />
        <FmrInclude />
        <FmrPlan />
        <FmrChoices />
        <FmrAftercare />
        {SHOW_FMR_CASE_IMAGES ? <FmrCases /> : null}
        <FmrQuestions />
        <FmrFaq />
        <FmrLocations />
        <FmrRelated />
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
