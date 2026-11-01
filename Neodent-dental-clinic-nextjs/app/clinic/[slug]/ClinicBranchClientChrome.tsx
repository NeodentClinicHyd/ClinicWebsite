import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BranchHero } from "@/components/clinic/branch/BranchHero";
import { BranchDetails } from "@/components/clinic/branch/BranchDetails";
import { BranchGallery } from "@/components/clinic/branch/BranchGallery";
import { BranchTreatments } from "@/components/clinic/branch/BranchTreatments";
import { BranchClinicalTeam } from "@/components/clinic/branch/BranchClinicalTeam";
import { BranchConnections } from "@/components/clinic/branch/BranchConnections";
import { BranchPatientStory } from "@/components/clinic/branch/BranchPatientStory";
import { BranchVisit } from "@/components/clinic/branch/BranchVisit";
import pageStyles from "@/components/pages/clinic-mehdipatnam/BranchPage.module.css";
import type { ClinicLocation } from "@/lib/clinic-data";

/* ------------------------------------------------------------------
   Chrome for /clinic/[slug].

   Mirrors the /clinic hub wrapper: Navbar (transparent over the dark
   header), the page's own sections, then the sitewide Footer. One layout
   serves both branches; the `clinic` prop (selected by slug in page.tsx)
   is what makes each page its own. The wrapper class carries the page's
   custom properties (dark-band glow, pattern, rhythm).

   Rhythm: dark header -> ivory (introduction + visit card) -> dark
   (photographs) -> ivory (treatments) -> dark (people) -> ivory (doctor
   and other clinic, patient story, closing red card) -> footer.
   ------------------------------------------------------------------ */

export function ClinicBranchClientChrome({
  clinic,
  other,
}: {
  clinic: ClinicLocation;
  other: ClinicLocation;
}) {
  return (
    <div className={`site ${pageStyles.page}`}>
      <Navbar overHero />
      <main>
        <BranchHero clinic={clinic} />
        <BranchDetails clinic={clinic} />
        <BranchGallery clinic={clinic} />
        <BranchTreatments clinic={clinic} />
        <BranchClinicalTeam clinic={clinic} />
        <BranchConnections clinic={clinic} other={other} />
        <BranchPatientStory clinic={clinic} />
        <BranchVisit clinic={clinic} />
      </main>
      <Footer />
    </div>
  );
}
