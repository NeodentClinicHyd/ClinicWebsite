"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/pages/composite-build-up/PageHeader";
import { ResultsCases } from "@/components/pages/composite-build-up/ResultsCases";
import { WhatIs } from "@/components/pages/composite-build-up/WhatIs";
import { WhenSuggested } from "@/components/pages/composite-build-up/WhenSuggested";
import { Materials } from "@/components/pages/composite-build-up/Materials";
import { VisitStages } from "@/components/pages/composite-build-up/VisitStages";
import { CareAndRisks } from "@/components/pages/composite-build-up/CareAndRisks";
import { QuestionsDoctor } from "@/components/pages/composite-build-up/QuestionsDoctor";
import { FaqSection } from "@/components/pages/composite-build-up/FaqSection";
import { ClinicLocations } from "@/components/pages/composite-build-up/ClinicLocations";
import { RelatedSection } from "@/components/pages/composite-build-up/RelatedSection";
import pageStyles from "@/components/pages/composite-build-up/CompositeBuildUp.module.css";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { CbuDefs } from "@/components/treatment/illustrations/CbuDefs";
import { SHOW_COMPOSITE_CASE_IMAGES } from "@/lib/composite-build-up-page";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for /treatments/composite-build-up: fixed Navbar, page
   sections, the shared consultation block, global Footer and the mobile call
   bar. `.site` is `overflow: hidden` globally, which would stop sticky side
   columns (the FAQ card) from sticking; `overflow: clip` clips the same way
   without creating a scroll container (set here only, globals.css is
   untouched). The page wrapper class on `.site` carries the page's custom
   properties (widths, tones, image caps).

   Section order (the real results come straight after the header, doctor's
   instruction of 2 Nov 2026) and grounds:
   header dark | results ivory | what is tan | when ivory | materials dark
   patterned | visit tan | care ivory | questions dark | FAQ tan | where to find
   us dark | related ivory | consultation block dark | footer dark.
   The results render only while SHOW_COMPOSITE_CASE_IMAGES is true. */
export function CompositeBuildUpClientChrome() {
  return (
    <div className={`site ${pageStyles.page}`} style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <CbuDefs />
      <Navbar />
      <main>
        <PageHeader />
        {SHOW_COMPOSITE_CASE_IMAGES ? <ResultsCases /> : null}
        <WhatIs />
        <WhenSuggested />
        <Materials />
        <VisitStages />
        <CareAndRisks />
        <QuestionsDoctor />
        <FaqSection />
        <ClinicLocations />
        <RelatedSection />
        <ContactNextStep />
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
