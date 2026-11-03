"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/pages/scaling-and-polishing/PageHeader";
import { ResultsCases } from "@/components/pages/scaling-and-polishing/ResultsCases";
import { Overview } from "@/components/pages/scaling-and-polishing/Overview";
import { WhenSection } from "@/components/pages/scaling-and-polishing/WhenSection";
import { Compare } from "@/components/pages/scaling-and-polishing/Compare";
import { Appointment } from "@/components/pages/scaling-and-polishing/Appointment";
import { Frequency } from "@/components/pages/scaling-and-polishing/Frequency";
import { AfterCare } from "@/components/pages/scaling-and-polishing/AfterCare";
import { HomeCare } from "@/components/pages/scaling-and-polishing/HomeCare";
import { Questions } from "@/components/pages/scaling-and-polishing/Questions";
import { Faq } from "@/components/pages/scaling-and-polishing/Faq";
import { ClinicLocations } from "@/components/pages/scaling-and-polishing/ClinicLocations";
import { RelatedSection } from "@/components/pages/scaling-and-polishing/RelatedSection";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { SHOW_SCALING_CASE_IMAGES } from "@/lib/scaling-and-polishing-page";
import { ctaTelPhone } from "@/lib/site-data";
import page from "@/components/pages/scaling-and-polishing/ScalingAndPolishing.module.css";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { SpDefs } from "@/components/treatment/illustrations/SpDefs";

/* Client chrome for /treatments/scaling-and-polishing, the same composition
   as RootCanalClientChrome: fixed Navbar, page sections, the shared closing
   consultation block, global Footer and the mobile call bar (the sitewide
   FloatingCta is mounted in app/layout.tsx). `.site` is `overflow: hidden`
   globally; `overflow: clip` clips the same way without creating a scroll
   container (set here only, globals.css is untouched).

   The gradients the artwork uses are mounted once, below: the kit
   (IllustrationDefs), the front-tooth section (RctDefs) and the scaling and
   polishing set (SpDefs).

   Section grounds, in order, never more than two dark in a row:
   header dark | results ivory | what is tan | when ivory | compare dark
   patterned | appointment tan | frequency ivory | after dark | home care tan
   | questions dark | FAQ tan | locations dark | related ivory | closing block
   dark | footer dark. The real results come directly after the header
   (plan 4.2); with SHOW_SCALING_CASE_IMAGES off the results section drops
   out and the header is followed by the tan "what is" section. */
export function ScalingAndPolishingClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <SpDefs />
      <Navbar />
      <main className={page.page}>
        <PageHeader />
        {SHOW_SCALING_CASE_IMAGES ? <ResultsCases /> : null}
        <Overview />
        <WhenSection />
        <Compare />
        <Appointment />
        <Frequency />
        <AfterCare />
        <HomeCare />
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