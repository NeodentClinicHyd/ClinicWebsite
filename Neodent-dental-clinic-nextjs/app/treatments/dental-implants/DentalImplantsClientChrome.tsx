"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { ImplantsHero } from "@/components/treatments/dental-implants/ImplantsHero";
import { ImplantsOverview } from "@/components/treatments/dental-implants/ImplantsOverview";
import { ImplantsStages } from "@/components/treatments/dental-implants/ImplantsStages";
import { ImplantsOptions } from "@/components/treatments/dental-implants/ImplantsOptions";
import { ImplantsHealing } from "@/components/treatments/dental-implants/ImplantsHealing";
import { ImplantsCases } from "@/components/treatments/dental-implants/ImplantsCases";
import { ImplantsCare } from "@/components/treatments/dental-implants/ImplantsCare";
import { ImplantsQuestions } from "@/components/treatments/dental-implants/ImplantsQuestions";
import { ImplantsLocations } from "@/components/treatments/dental-implants/ImplantsLocations";
import { ImplantsRelated } from "@/components/treatments/dental-implants/ImplantsRelated";
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
        <ImplantsHero />
        <ImplantsOverview />
        <ImplantsStages />
        <ImplantsOptions />
        <ImplantsHealing />
        {SHOW_IMPLANT_CASE_IMAGES ? <ImplantsCases /> : null}
        <ImplantsCare />
        <ImplantsQuestions />
        <ImplantsLocations />
        <ImplantsRelated />
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
