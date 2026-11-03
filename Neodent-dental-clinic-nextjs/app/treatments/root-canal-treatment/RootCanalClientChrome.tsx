"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/pages/root-canal-treatment/PageHeader";
import { ResultsCases } from "@/components/pages/root-canal-treatment/ResultsCases";
import { Overview } from "@/components/pages/root-canal-treatment/Overview";
import { Signs } from "@/components/pages/root-canal-treatment/Signs";
import { Options } from "@/components/pages/root-canal-treatment/Options";
import { Visit } from "@/components/pages/root-canal-treatment/Visit";
import { Restoring } from "@/components/pages/root-canal-treatment/Restoring";
import { Aftercare } from "@/components/pages/root-canal-treatment/Aftercare";
import { Questions } from "@/components/pages/root-canal-treatment/Questions";
import { Faq } from "@/components/pages/root-canal-treatment/Faq";
import { ClinicLocations } from "@/components/pages/root-canal-treatment/ClinicLocations";
import { RelatedSection } from "@/components/pages/root-canal-treatment/RelatedSection";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { SHOW_RCT_CASE_MEDIA } from "@/lib/root-canal-treatment-page";
import { ctaTelPhone } from "@/lib/site-data";
import page from "@/components/pages/root-canal-treatment/RootCanal.module.css";

/* Client chrome for /treatments/root-canal-treatment, the same composition as
   FullMouthRehabilitationClientChrome: fixed Navbar, page sections, global
   Footer and the mobile call bar. `.site` is `overflow: hidden` globally,
   which would stop sticky side columns from sticking; `overflow: clip` clips
   the same way without creating a scroll container (set here only,
   globals.css is untouched).

   Section grounds, in order, never more than two dark in a row:
   header dark | results ivory | what is beige | signs ivory | alternatives dark
   patterned | visit beige | restoring ivory | aftercare dark | questions beige
   | FAQ ivory | locations dark | related beige | closing block dark | footer
   dark. The results section comes directly after the header (plan 4.2). */
export function RootCanalClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <Navbar />
      <main className={page.page}>
        <PageHeader />
        {SHOW_RCT_CASE_MEDIA ? <ResultsCases /> : null}
        <Overview />
        <Signs />
        <Options />
        <Visit />
        <Restoring />
        <Aftercare />
        <Questions />
        <Faq />
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
