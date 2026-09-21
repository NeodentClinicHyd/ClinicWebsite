"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DrMiftahProfile } from "@/components/doctors/DrMiftahProfile";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone } from "@/lib/site-data";

/* Client chrome for the doctor profile page, mirroring
   TreatmentsClientChrome / ClinicClientChrome: fixed Navbar, the
   page's own sections, global Footer and the mobile call bar. */
export function DoctorProfileClientChrome() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <DrMiftahProfile />
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
