"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/pages/braces-and-orthodontics/PageHeader";
import { ResultsCases } from "@/components/pages/braces-and-orthodontics/ResultsCases";
import pageStyles from "@/components/pages/braces-and-orthodontics/BracesPage.module.css";
import { WhatAreBraces } from "@/components/pages/braces-and-orthodontics/WhatAreBraces";
import { WhenRight } from "@/components/pages/braces-and-orthodontics/WhenRight";
import { TypesOfBraces } from "@/components/pages/braces-and-orthodontics/TypesOfBraces";
import { InvisalignProvider } from "@/components/pages/braces-and-orthodontics/InvisalignProvider";
import { Stages } from "@/components/pages/braces-and-orthodontics/Stages";
import { WhoIsItFor } from "@/components/pages/braces-and-orthodontics/WhoIsItFor";
import { CareAndRisks } from "@/components/pages/braces-and-orthodontics/CareAndRisks";
import { Retainers } from "@/components/pages/braces-and-orthodontics/Retainers";
import { AssessmentQuestions } from "@/components/pages/braces-and-orthodontics/AssessmentQuestions";
import { FaqSection } from "@/components/pages/braces-and-orthodontics/FaqSection";
import { ClinicLocations } from "@/components/pages/braces-and-orthodontics/ClinicLocations";
import { RelatedSection } from "@/components/pages/braces-and-orthodontics/RelatedSection";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { BracesDefs } from "@/components/treatment/illustrations/BracesDefs";
import { SHOW_BRACES_CASE_IMAGES } from "@/lib/braces-orthodontics-page";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for /treatments/braces-and-orthodontics, the same
   composition as RootCanalClientChrome: fixed Navbar, page sections, global
   Footer and the mobile call bar. `.site` is `overflow: hidden` globally,
   which would stop sticky side columns from sticking; `overflow: clip` clips
   the same way without creating a scroll container (set here only,
   globals.css is untouched).

   Section grounds, in order, never repeating in adjacent sections:
   header dark | results light | tan | light | dark patterned | ivory
   (Invisalign provider) | tan | light | dark | tan | dark | light | dark |
   tan | closing block dark. The results
   section sits directly after the header (standard T.1); the shared
   ContactNextStep block ends the page directly before the footer. */
export function BracesClientChrome() {
  return (
    <div className={`site ${pageStyles.page}`} style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <BracesDefs />
      <Navbar />
      <main>
        <PageHeader />
        {SHOW_BRACES_CASE_IMAGES ? <ResultsCases /> : null}
        <WhatAreBraces />
        <WhenRight />
        <TypesOfBraces />
        <InvisalignProvider />
        <Stages />
        <WhoIsItFor />
        <CareAndRisks />
        <Retainers />
        <AssessmentQuestions />
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

