"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TreatmentsHero } from "@/components/treatments/TreatmentsHero";
import { TreatmentAtlas } from "@/components/treatments/TreatmentAtlas";
import { TreatmentThinking } from "@/components/treatments/TreatmentThinking";
import { RealTreatmentWork } from "@/components/treatments/RealTreatmentWork";
import { BeforeAfterCases } from "@/components/treatments/BeforeAfterCases";
import { ExperienceEvidenceLocations } from "@/components/treatments/ExperienceEvidenceLocations";
import { QuestionsContact } from "@/components/treatments/QuestionsContact";
import { EditorialSeam } from "@/components/treatments/EditorialSeam";
import { AppButton } from "@/components/ui/AppButton";
import { telPhone, whatsappConsultLink } from "@/lib/site-data";

export function TreatmentsClientChrome() {
  return (
    <div className="site">
      <Navbar />
      <main>
        {/* 01: DENTAL EXPERTISE */}
        <TreatmentsHero />
        
        {/* 02: WHAT WE TREAT */}
        <TreatmentAtlas />
        
        {/* 03: THE THINKING BEHIND TREATMENT */}
        <TreatmentThinking />
        
        {/* 04: REAL TREATMENT WORK */}
        <RealTreatmentWork />
        
        <EditorialSeam variant="standard" surface="light" />
        
        {/* 05: REAL CASES / TREATMENT RESULTS */}
        <BeforeAfterCases />
        
        {/* 06: EXPERIENCE, EVIDENCE & LOCATIONS */}
        <ExperienceEvidenceLocations />
        
        <EditorialSeam variant="standard" surface="light" />
        
        {/* 07: QUESTIONS & CONTACT */}
        <QuestionsContact />
      </main>
      <Footer />
      <div className="mobile-bar">
        <AppButton href={telPhone} variant="ghost">
          <Phone size={14} /> Call
        </AppButton>
        <AppButton href={whatsappConsultLink} variant="primary">
          WhatsApp NeoDent <ArrowRight size={14} />
        </AppButton>
      </div>
    </div>
  );
}
