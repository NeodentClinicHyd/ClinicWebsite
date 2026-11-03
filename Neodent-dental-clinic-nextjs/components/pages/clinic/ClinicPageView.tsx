import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClinicHeader } from "./ClinicHeader";
import { ClinicBreadcrumbs } from "./ClinicBreadcrumbs";
import { ClinicFacts } from "./ClinicFacts";
import { ClinicCards } from "./ClinicCards";
import { Surroundings } from "./Surroundings";
import { SpacesGallery } from "./SpacesGallery";
import { TreatmentsStrip } from "./TreatmentsStrip";
import { ClinicFaq } from "./ClinicFaq";
import { VisitBand } from "./VisitBand";
import styles from "./ClinicPage.module.css";

/* ------------------------------------------------------------------
   /clinic page wrapper. Replaces app/clinic/ClinicClientChrome.tsx
   (same chrome: Navbar transparent over the dark header, the page's
   sections, then the sitewide Footer; the floating call button is
   mounted in app/layout.tsx). Every section now comes from this folder.

   Rhythm: dark header -> light strip and clinic cards -> dark
   surroundings -> light spaces -> dark treatments -> light FAQ -> red band on
   ivory -> footer.
   ------------------------------------------------------------------ */

export function ClinicPageView() {
  return (
    <div className={`site ${styles.page}`}>
      <Navbar overHero />
      <main>
        <ClinicHeader />
        <ClinicBreadcrumbs />
        <ClinicFacts />
        <ClinicCards />
        <Surroundings />
        <SpacesGallery />
        <TreatmentsStrip />
        <ClinicFaq />
        <VisitBand />
      </main>
      <Footer />
    </div>
  );
}
