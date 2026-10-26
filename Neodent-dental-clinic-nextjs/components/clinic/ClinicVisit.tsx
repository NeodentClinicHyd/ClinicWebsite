"use client";

import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { useReveal } from "./useReveal";
import shared from "./ClinicShared.module.css";
import styles from "./ClinicVisit.module.css";

/* ------------------------------------------------------------------
   Clinic -- closing card.

   Pattern: the home red statement card ("Different generations. One
   standard of care.", LegacyStory .statement) -- the only red surface
   on the page besides the "Different surroundings" feature card. Both
   call numbers come from lib/site-data.ts; the enquiry link goes to
   /contact. There is no WhatsApp line at the clinic, so none is shown.
   ------------------------------------------------------------------ */

export function ClinicVisit() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${styles.visit}`}
      id="visit"
      aria-labelledby="visit-title"
    >
      <div className={shared.container}>
        <div className={styles.card} data-reveal>
          <h2 id="visit-title" className={styles.title}>
            Ready to visit? <em>Call or send an enquiry.</em>
          </h2>
          <div className={styles.actions}>
            <AppButton href={telPhone} variant="light">
              <Phone size={15} aria-hidden="true" /> Call Mehdipatnam
            </AppButton>
            <AppButton href={nampallyTelPhone} variant="light">
              <Phone size={15} aria-hidden="true" /> Call Nampally
            </AppButton>
            <AppButton href="/contact" variant="ghost" className={styles.ghost}>
              Send an enquiry <ArrowRight size={15} aria-hidden="true" />
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
