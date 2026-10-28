"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { SmileHero } from "@/components/treatments/smile-design/SmileHero";
import { SmileOverview } from "@/components/treatments/smile-design/SmileOverview";
import { SmileWhen } from "@/components/treatments/smile-design/SmileWhen";
import { SmileOptions } from "@/components/treatments/smile-design/SmileOptions";
import { SmilePlan } from "@/components/treatments/smile-design/SmilePlan";
import { SmileReversible } from "@/components/treatments/smile-design/SmileReversible";
import { SmileAftercare } from "@/components/treatments/smile-design/SmileAftercare";
import { SmileCases } from "@/components/treatments/smile-design/SmileCases";
import { SmileQuestions } from "@/components/treatments/smile-design/SmileQuestions";
import { SmileFaq } from "@/components/treatments/smile-design/SmileFaq";
import { SmileLocations } from "@/components/treatments/smile-design/SmileLocations";
import { SmileRelated } from "@/components/treatments/smile-design/SmileRelated";
import { SHOW_SMILE_CASE_IMAGES } from "@/lib/smile-design-page";
import { ctaTelPhone } from "@/lib/site-data";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { CbuDefs } from "@/components/treatment/illustrations/CbuDefs";
import { BracesDefs } from "@/components/treatment/illustrations/BracesDefs";
import { SdDefs } from "@/components/treatment/illustrations/SdDefs";

/* Client chrome for /treatments/smile-design, the same composition as
   FullMouthRehabilitationClientChrome: fixed Navbar, page sections, global
   Footer and the mobile call bar (the sitewide FloatingCta is mounted in
   app/layout.tsx). `.site` is `overflow: hidden` globally, which would stop
   sticky side columns from sticking; `overflow: clip` clips the same way
   without creating a scroll container (set here only, globals.css is
   untouched). The gradients the artwork uses are mounted once, below: the
   kit (IllustrationDefs), the front-tooth section (RctDefs), the resin
   (CbuDefs), the brackets and wire (BracesDefs) and the smile design set
   (SdDefs).

   Section grounds, in order, never repeating in adjacent sections:
   hero dark | tan | light | dark patterned | tan | light | dark | tan (cases)
   | dark (questions) | light | dark | tan.
   With SHOW_SMILE_CASE_IMAGES off, aftercare (dark) is followed by the
   questions section in its tan variant, so the alternation still holds:
   ... dark | tan (questions) | light | dark | tan. */
export function SmileDesignClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <CbuDefs />
      <BracesDefs />
      <SdDefs />
      <Navbar />
      <main>
        <SmileHero />
        <SmileOverview />
        <SmileWhen />
        <SmileOptions />
        <SmilePlan />
        <SmileReversible />
        <SmileAftercare />
        {SHOW_SMILE_CASE_IMAGES ? <SmileCases /> : null}
        <SmileQuestions variant={SHOW_SMILE_CASE_IMAGES ? "dark" : "tan"} />
        <SmileFaq />
        <SmileLocations />
        <SmileRelated />
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
