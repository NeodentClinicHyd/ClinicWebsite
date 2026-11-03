import { Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { nampallyPhone, nampallyTelPhone, phone, telPhone } from "@/lib/site-data";
import { DrMiftahBackdrop } from "./DrMiftahBackdrop";
import styles from "./ClosingCta.module.css";

/* ------------------------------------------------------------------
   Closing block (dark): the page's own "Begin with a conversation."
   block, both branch numbers. Words are the old block's; only the red
   italic on "conversation." is gone (the accent is reserved for four
   places on this page).
   ------------------------------------------------------------------ */

export function ClosingCta() {
  return (
    <section className={styles.section} aria-labelledby="miftah-cta-title">
      <DrMiftahBackdrop />
      <div className={styles.inner}>
        <Reveal as="div" className={styles.eyebrow}>
          Your next visit
        </Reveal>
        <Reveal as="h2" id="miftah-cta-title" className={styles.title} delay={80}>
          Begin with a conversation.
        </Reveal>
        <Reveal as="p" className={styles.lede} delay={160}>
          Choose your preferred location, then let&rsquo;s begin.
        </Reveal>
        <Reveal className={styles.actions} delay={240}>
          <AppButton href={telPhone} variant="primary">
            <Phone size={14} aria-hidden="true" /> Call Mehdipatnam &middot; {phone}
          </AppButton>
          <AppButton href={nampallyTelPhone} variant="ghost" className={styles.ghost}>
            <Phone size={14} aria-hidden="true" /> Call Nampally &middot; {nampallyPhone}
          </AppButton>
        </Reveal>
      </div>
    </section>
  );
}
