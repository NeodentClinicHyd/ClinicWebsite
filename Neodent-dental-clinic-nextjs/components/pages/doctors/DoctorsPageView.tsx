import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { DoctorsHeader } from "./DoctorsHeader";
import { DoctorsFacts } from "./DoctorsFacts";
import { DoctorsLeadership } from "./DoctorsLeadership";
import { DoctorsAtWork } from "./DoctorsAtWork";
import { DoctorsTeam } from "./DoctorsTeam";
import { DoctorsClinics } from "./DoctorsClinics";
import styles from "./DoctorsPage.module.css";

/* ------------------------------------------------------------------
   /doctors page wrapper. Same chrome as before (Navbar, the page's
   sections, then the sitewide Footer), with the Navbar transparent over
   the dark header as on /clinic and /about. Metadata and the
   BreadcrumbList JSON-LD stay in app/doctors/page.tsx.

   Rhythm: dark header -> light fact strip -> light leadership and
   Dr. Miftah at work -> dark team -> light clinics (with the old closing
   line) -> the sitewide consultation block (charcoal, imported as it is,
   as /about and the home page do) -> footer. The last body section
   before the consultation block is light.
   ------------------------------------------------------------------ */

export function DoctorsPageView() {
  return (
    <div
      className={`site ${styles.page}`}
      /* The global .site clips with overflow: hidden, which makes it a scroll
         container and stops the scroll-driven drift on "Dr. Miftah at work"
         from following the page. "clip" keeps the same clipping without it
         (same override as the About page). */
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <Navbar overHero />
      <main>
        <DoctorsHeader />
        <DoctorsFacts />
        <DoctorsLeadership />
        <DoctorsAtWork />
        <DoctorsTeam />
        <DoctorsClinics />
        <ContactNextStep />
      </main>
      <Footer />
    </div>
  );
}
