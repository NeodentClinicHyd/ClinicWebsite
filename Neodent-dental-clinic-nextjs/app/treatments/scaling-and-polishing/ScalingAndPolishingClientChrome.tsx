"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { ScalingHero } from "@/components/treatments/scaling-and-polishing/ScalingHero";
import { ScalingOverview } from "@/components/treatments/scaling-and-polishing/ScalingOverview";
import { ScalingWhen } from "@/components/treatments/scaling-and-polishing/ScalingWhen";
import { ScalingCompare } from "@/components/treatments/scaling-and-polishing/ScalingCompare";
import { ScalingAppointment } from "@/components/treatments/scaling-and-polishing/ScalingAppointment";
import { ScalingFrequency } from "@/components/treatments/scaling-and-polishing/ScalingFrequency";
import { ScalingAfter } from "@/components/treatments/scaling-and-polishing/ScalingAfter";
import { ScalingHomeCare } from "@/components/treatments/scaling-and-polishing/ScalingHomeCare";
import { ScalingCases } from "@/components/treatments/scaling-and-polishing/ScalingCases";
import { ScalingQuestions } from "@/components/treatments/scaling-and-polishing/ScalingQuestions";
import { ScalingFaq } from "@/components/treatments/scaling-and-polishing/ScalingFaq";
import { ScalingLocations } from "@/components/treatments/scaling-and-polishing/ScalingLocations";
import { ScalingRelated } from "@/components/treatments/scaling-and-polishing/ScalingRelated";
import { SHOW_SCALING_CASE_IMAGES } from "@/lib/scaling-and-polishing-page";
import { ctaTelPhone } from "@/lib/site-data";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { SpDefs } from "@/components/treatment/illustrations/SpDefs";

/* Client chrome for /treatments/scaling-and-polishing, the same composition
   as SmileDesignClientChrome: fixed Navbar, page sections, global Footer and
   the mobile call bar (the sitewide FloatingCta is mounted in
   app/layout.tsx). `.site` is `overflow: hidden` globally, which would stop
   sticky side columns from sticking; `overflow: clip` clips the same way
   without creating a scroll container (set here only, globals.css is
   untouched).

   The gradients the artwork uses are mounted once, below: the kit
   (IllustrationDefs), the front-tooth section (RctDefs) and the scaling and
   polishing set (SpDefs).

   Section grounds, in order, never repeating in adjacent sections:
   hero dark | tan | light | dark patterned | tan | light | dark | tan |
   light (cases) | dark (questions) | tan (FAQ) | dark | light.
   With SHOW_SCALING_CASE_IMAGES off, the cases section simply drops out and
   the tan home care section is followed by the dark questions section, so
   the alternation still holds:
   ... dark | tan | dark (questions) | tan | dark | light. */
export function ScalingAndPolishingClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <SpDefs />
      <Navbar />
      <main>
        <ScalingHero />
        <ScalingOverview />
        <ScalingWhen />
        <ScalingCompare />
        <ScalingAppointment />
        <ScalingFrequency />
        <ScalingAfter />
        <ScalingHomeCare />
        {SHOW_SCALING_CASE_IMAGES ? <ScalingCases /> : null}
        <ScalingQuestions />
        <ScalingFaq />
        <ScalingLocations />
        <ScalingRelated />
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
