"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { CbuHero } from "@/components/treatments/composite-build-up/CbuHero";
import { CbuOverview } from "@/components/treatments/composite-build-up/CbuOverview";
import { CbuWhen } from "@/components/treatments/composite-build-up/CbuWhen";
import { CbuMaterials } from "@/components/treatments/composite-build-up/CbuMaterials";
import { CbuVisit } from "@/components/treatments/composite-build-up/CbuVisit";
import { CbuCare } from "@/components/treatments/composite-build-up/CbuCare";
import { CbuCases } from "@/components/treatments/composite-build-up/CbuCases";
import { CbuQuestions } from "@/components/treatments/composite-build-up/CbuQuestions";
import { CbuFaq } from "@/components/treatments/composite-build-up/CbuFaq";
import { CbuLocations } from "@/components/treatments/composite-build-up/CbuLocations";
import { CbuRelated } from "@/components/treatments/composite-build-up/CbuRelated";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { CbuDefs } from "@/components/treatment/illustrations/CbuDefs";
import { SHOW_COMPOSITE_CASE_IMAGES } from "@/lib/composite-build-up-page";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for /treatments/composite-build-up, the same composition as
   RootCanalClientChrome: fixed Navbar, page sections, global Footer and the
   mobile call bar. `.site` is `overflow: hidden` globally, which would stop
   sticky side columns from sticking; `overflow: clip` clips the same way
   without creating a scroll container (set here only, globals.css is
   untouched).

   Section grounds, in order, never repeating in adjacent sections:
   hero dark | tan | light | dark patterned | tan | light | [tan, cases] |
   dark | tan | dark | light.
   With SHOW_COMPOSITE_CASE_IMAGES off, care (light) is followed by
   questions (dark), so the alternation still holds. */
export function CompositeBuildUpClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <CbuDefs />
      <Navbar />
      <main>
        <CbuHero />
        <CbuOverview />
        <CbuWhen />
        <CbuMaterials />
        <CbuVisit />
        <CbuCare />
        {SHOW_COMPOSITE_CASE_IMAGES ? <CbuCases /> : null}
        <CbuQuestions />
        <CbuFaq />
        <CbuLocations />
        <CbuRelated />
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
