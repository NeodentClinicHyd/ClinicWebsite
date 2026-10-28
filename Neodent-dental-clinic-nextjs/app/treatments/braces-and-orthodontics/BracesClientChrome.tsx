"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { BrcHero } from "@/components/treatments/braces-and-orthodontics/BrcHero";
import { BrcOverview } from "@/components/treatments/braces-and-orthodontics/BrcOverview";
import { BrcSigns } from "@/components/treatments/braces-and-orthodontics/BrcSigns";
import { BrcTypes } from "@/components/treatments/braces-and-orthodontics/BrcTypes";
import { BrcStages } from "@/components/treatments/braces-and-orthodontics/BrcStages";
import { BrcReaders } from "@/components/treatments/braces-and-orthodontics/BrcReaders";
import { BrcCare } from "@/components/treatments/braces-and-orthodontics/BrcCare";
import { BrcRetainers } from "@/components/treatments/braces-and-orthodontics/BrcRetainers";
import { BrcCases } from "@/components/treatments/braces-and-orthodontics/BrcCases";
import { BrcQuestions } from "@/components/treatments/braces-and-orthodontics/BrcQuestions";
import { BrcFaq } from "@/components/treatments/braces-and-orthodontics/BrcFaq";
import { BrcLocations } from "@/components/treatments/braces-and-orthodontics/BrcLocations";
import { BrcRelated } from "@/components/treatments/braces-and-orthodontics/BrcRelated";
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
   hero dark | tan | light | dark patterned | tan | light | dark | tan |
   [light, cases] | dark | light | dark | tan.
   With SHOW_BRACES_CASE_IMAGES off, retainers (tan) is followed by questions
   (dark), so the alternation still holds. */
export function BracesClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <BracesDefs />
      <Navbar />
      <main>
        <BrcHero />
        <BrcOverview />
        <BrcSigns />
        <BrcTypes />
        <BrcStages />
        <BrcReaders />
        <BrcCare />
        <BrcRetainers />
        {SHOW_BRACES_CASE_IMAGES ? <BrcCases /> : null}
        <BrcQuestions />
        <BrcFaq />
        <BrcLocations />
        <BrcRelated />
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

