import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HubHeader } from "./HubHeader";
import { HubIntro } from "./HubIntro";
import { FeaturedTreatments } from "./FeaturedTreatments";
import { AdditionalServices } from "./AdditionalServices";
import { ThinkingBehindTreatment } from "./ThinkingBehindTreatment";
import { DmlsFeature } from "./DmlsFeature";
import { TreatmentProcess } from "./TreatmentProcess";
import { RealCases } from "./RealCases";
import { ExperienceEvidence } from "./ExperienceEvidence";
import { HubFaq } from "./HubFaq";
import { MobileCallBar } from "./MobileCallBar";
import styles from "./TreatmentsHub.module.css";

/* /treatments hub page. Same chrome as before (fixed Navbar, global
   Footer, mobile call bar). `.site` normally clips with overflow:hidden,
   which would stop a sticky element from sticking; `overflow: clip`
   clips identically without creating a scroll container.

   Sections not yet rebuilt still come from components/treatments/hub
   (read only); each run swaps one in. */
export function TreatmentsHubPage() {
  return (
    <div className={`site ${styles.page}`} style={{ overflow: "clip" }}>
      {/* Alpha-level filter for the icon pattern (same values as the home hero). */}
      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <filter id="hub-pattern-levels" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5" />
        </filter>
      </svg>
      <Navbar />
      <main>
        <HubHeader />
        <HubIntro />
        <FeaturedTreatments />
        <AdditionalServices />
        <ThinkingBehindTreatment />
        <DmlsFeature />
        <TreatmentProcess />
        <RealCases />
        <ExperienceEvidence />
        <HubFaq />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
