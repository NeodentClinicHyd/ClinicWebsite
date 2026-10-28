"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { HubHero } from "@/components/treatments/hub/HubHero";
import { HubTreatments } from "@/components/treatments/hub/HubTreatments";
import { HubBeyond } from "@/components/treatments/hub/HubBeyond";
import { HubThinking } from "@/components/treatments/hub/HubThinking";
import { HubDmls } from "@/components/treatments/hub/HubDmls";
import { HubPlanning } from "@/components/treatments/hub/HubPlanning";
import { HubWork } from "@/components/treatments/hub/HubWork";
import { HubEvidence } from "@/components/treatments/hub/HubEvidence";
import { HubQuestions } from "@/components/treatments/hub/HubQuestions";
import { ctaTelPhone } from "@/lib/site-data";

/* /treatments hub. Same chrome as the home page (fixed Navbar, global
   Footer, mobile call bar). `.site` normally clips with overflow:hidden,
   which would stop the FAQ contact card from sticking; `overflow: clip`
   clips identically without creating a scroll container. */
export function TreatmentsClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <Navbar />
      <main>
        <HubHero />
        <HubTreatments />
        <HubBeyond />
        <HubThinking />
        <HubDmls />
        <HubPlanning />
        <HubWork />
        <HubEvidence />
        <HubQuestions />
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
