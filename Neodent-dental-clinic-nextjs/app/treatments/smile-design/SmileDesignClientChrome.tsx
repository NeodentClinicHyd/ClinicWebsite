"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/pages/smile-design/PageHeader";
import pageStyles from "@/components/pages/smile-design/SmilePage.module.css";
import { Overview } from "@/components/pages/smile-design/Overview";
import { When } from "@/components/pages/smile-design/When";
import { Options } from "@/components/pages/smile-design/Options";
import { Plan } from "@/components/pages/smile-design/Plan";
import { Undone } from "@/components/pages/smile-design/Undone";
import { Aftercare } from "@/components/pages/smile-design/Aftercare";
import { ResultsCases } from "@/components/pages/smile-design/ResultsCases";
import { Questions } from "@/components/pages/smile-design/Questions";
import { Faq } from "@/components/pages/smile-design/Faq";
import { Locations } from "@/components/pages/smile-design/Locations";
import { Related } from "@/components/pages/smile-design/Related";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { SHOW_SMILE_CASE_IMAGES } from "@/lib/smile-design-page";
import { ctaTelPhone } from "@/lib/site-data";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { RctDefs } from "@/components/treatment/illustrations/RctDefs";
import { CbuDefs } from "@/components/treatment/illustrations/CbuDefs";
import { BracesDefs } from "@/components/treatment/illustrations/BracesDefs";
import { SdDefs } from "@/components/treatment/illustrations/SdDefs";

/* Client chrome for /treatments/smile-design, the same composition as
   FullMouthRehabilitationClientChrome: fixed Navbar, page sections, global
   Footer and the mobile call bar (the sitewide FloatingCta is mounted in
   app/layout.tsx). `.site` is `overflow: hidden` globally, which would stop
   sticky side columns from sticking; `overflow: clip` clips the same way
   without creating a scroll container (set here only, globals.css is
   untouched). The gradients the artwork uses are mounted once, below: the
   kit (IllustrationDefs), the front-tooth section (RctDefs), the resin
   (CbuDefs), the brackets and wire (BracesDefs) and the smile design set
   (SdDefs).

   Section grounds, in order: header dark | results ivory (directly under the
   header, plan T.1) | tan | ivory | dark patterned | tan | ivory | dark |
   questions tan | FAQ ivory | locations dark | related tan | closing block
   (shared ContactNextStep, dark) | footer dark. The closing block is the page's
   last element before the footer (standing decision D8). */
export function SmileDesignClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <RctDefs />
      <CbuDefs />
      <BracesDefs />
      <SdDefs />
      <Navbar />
      <main className={pageStyles.page}>
        <PageHeader />
        {SHOW_SMILE_CASE_IMAGES ? <ResultsCases /> : null}
        <Overview />
        <When />
        <Options />
        <Plan />
        <Undone />
        <Aftercare />
        <Questions />
        <Faq />
        <Locations />
        <Related />
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
