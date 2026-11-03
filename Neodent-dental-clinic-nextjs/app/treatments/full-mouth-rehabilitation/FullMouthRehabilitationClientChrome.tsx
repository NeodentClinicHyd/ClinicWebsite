"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/pages/full-mouth-rehabilitation/PageHeader";
import { ResultsCases } from "@/components/pages/full-mouth-rehabilitation/ResultsCases";
import pageStyles from "@/components/pages/full-mouth-rehabilitation/FullMouthPage.module.css";
import { Overview } from "@/components/pages/full-mouth-rehabilitation/Overview";
import { When } from "@/components/pages/full-mouth-rehabilitation/When";
import { Include } from "@/components/pages/full-mouth-rehabilitation/Include";
import { Plan } from "@/components/pages/full-mouth-rehabilitation/Plan";
import { Choices } from "@/components/pages/full-mouth-rehabilitation/Choices";
import { Aftercare } from "@/components/pages/full-mouth-rehabilitation/Aftercare";
import { Questions } from "@/components/pages/full-mouth-rehabilitation/Questions";
import { Faq } from "@/components/pages/full-mouth-rehabilitation/Faq";
import { Locations } from "@/components/pages/full-mouth-rehabilitation/Locations";
import { Related } from "@/components/pages/full-mouth-rehabilitation/Related";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";
import { SHOW_FMR_CASE_IMAGES } from "@/lib/full-mouth-rehabilitation-page";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for /treatments/full-mouth-rehabilitation, the same
   composition as DentalImplantsClientChrome: fixed Navbar, page sections,
   global Footer and the mobile call bar. `.site` is `overflow: hidden`
   globally, which would stop sticky side columns from sticking;
   `overflow: clip` clips the same way without creating a scroll container
   (set here only, globals.css is untouched).

   Section grounds, in order: header dark | results ivory (directly under the
   header, plan T.1) | tan | ivory | dark patterned | tan | ivory | dark |
   ivory | tan | dark | tan | closing block (shared ContactNextStep, dark)
   | footer dark. The closing block is the page's last element before the
   footer (standing decision D8). */
export function FullMouthRehabilitationClientChrome() {
  return (
    <div className="site" style={{ overflow: "clip" }}>
      <IllustrationDefs />
      <Navbar />
      <main className={pageStyles.page}>
        <PageHeader />
        {SHOW_FMR_CASE_IMAGES ? <ResultsCases /> : null}
        <Overview />
        <When />
        <Include />
        <Plan />
        <Choices />
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
