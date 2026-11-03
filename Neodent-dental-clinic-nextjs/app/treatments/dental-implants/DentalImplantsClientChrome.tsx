"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/pages/dental-implants/PageHeader";
import { ResultsCases } from "@/components/pages/dental-implants/ResultsCases";
import { WhatIsAnImplant } from "@/components/pages/dental-implants/WhatIsAnImplant";
import { StagesOfTreatment } from "@/components/pages/dental-implants/StagesOfTreatment";
import { CompareAndAttention } from "@/components/pages/dental-implants/CompareAndAttention";
import { HealingAftercare } from "@/components/pages/dental-implants/HealingAftercare";
import { CareAndDoctor } from "@/components/pages/dental-implants/CareAndDoctor";
import { FaqSection } from "@/components/pages/dental-implants/FaqSection";
import { ClinicLocations } from "@/components/pages/dental-implants/ClinicLocations";
import { RelatedSection } from "@/components/pages/dental-implants/RelatedSection";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { SHOW_IMPLANT_CASE_IMAGES } from "@/lib/dental-implants-page";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for /treatments/dental-implants, same composition as
   TreatmentsClientChrome: fixed Navbar, page sections, global Footer and
   the mobile call bar. The breadcrumb now lives inside the hero.
   `.site` is `overflow: hidden` globally, which would stop the sticky side
   columns from sticking; `overflow: clip` clips the same way but does not
   create a scroll container (set here only, globals.css is untouched). */
export function DentalImplantsClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <Navbar />
      <main>
        <PageHeader />
        {SHOW_IMPLANT_CASE_IMAGES ? <ResultsCases /> : null}
        <WhatIsAnImplant />
        <StagesOfTreatment />
        <CompareAndAttention />
        <HealingAftercare />
        <CareAndDoctor />
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
