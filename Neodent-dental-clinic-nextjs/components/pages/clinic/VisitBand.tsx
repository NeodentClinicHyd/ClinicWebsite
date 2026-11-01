import { ArrowRight, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import { clinicLocations } from "@/lib/clinic-data";
import styles from "./VisitBand.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- S6 "Ready to visit?" band.

   Forked from components/clinic/ClinicVisit.tsx (this band is clinic-only,
   not the shared ContactNextStep, so the fork is allowed). Heading, the
   three button labels and their destinations are unchanged: both call
   numbers come from lib/clinic-data.ts and the enquiry link goes to
   /contact. The second line of the heading is set in the normal heading
   style (the red italic accent stays on the h1, S2 and S5).
   ------------------------------------------------------------------ */

const { mehdipatnam, nampally } = clinicLocations;

export function VisitBand() {
  return (
    <section className={styles.visit} id="visit" aria-labelledby="visit-title">
      <div className={styles.container}>
        <Reveal className={styles.card}>
          <h2 id="visit-title" className={styles.title}>
            Ready to visit? <span>Call or send an enquiry.</span>
          </h2>
          <Reveal stagger={80} delay={120} className={styles.actions}>
            <AppButton href={mehdipatnam.tel} variant="light">
              <Phone size={15} aria-hidden="true" /> Call Mehdipatnam
            </AppButton>
            <AppButton href={nampally.tel} variant="light">
              <Phone size={15} aria-hidden="true" /> Call Nampally
            </AppButton>
            <AppButton href="/contact" variant="ghost" className={styles.ghost}>
              Send an enquiry <ArrowRight size={15} aria-hidden="true" />
            </AppButton>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
