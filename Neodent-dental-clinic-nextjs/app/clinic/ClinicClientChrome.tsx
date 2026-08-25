"use client";


import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OurClinics } from "@/components/clinic/OurClinics";
import { ClinicalSettings } from "@/components/clinic/ClinicalSettings";
import { InsideNeoDent } from "@/components/clinic/InsideNeoDent";

/* ------------------------------------------------------------------
   Client chrome for /clinic — the three-section editorial clinic
   profile page. Mirrors the About page's chrome pattern exactly:
   Navbar + AppointmentModal (for the sitewide Book Appointment
   button in the navbar) + the page's own section components +
   Footer. No booking CTA appears anywhere inside the clinic sections
   themselves — phone and directions only, per the page's constraints.
   ------------------------------------------------------------------ */

export function ClinicClientChrome() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <OurClinics />
        <ClinicalSettings />
        <InsideNeoDent />
      </main>
      <Footer />
    </div>
  );
}
