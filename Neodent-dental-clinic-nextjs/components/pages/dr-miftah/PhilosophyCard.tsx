import { Reveal } from "@/components/motion/Reveal";
import { MIFTAH_NAME, MIFTAH_PHILOSOPHY } from "@/lib/pages/dr-miftah-content";
import styles from "./PhilosophyCard.module.css";

/* ------------------------------------------------------------------
   PhilosophyCard -- this page's fork of the home SeamCard (pattern P4),
   text-only. It renders a zero-height wrapper in normal flow; the card
   sits on the boundary between the section above and the one below, so
   those two reserve room with the --seam-pad-*-text tokens from
   app/globals.css.

   Differences from the home card: the statement is a <blockquote> with a
   <cite>, the dotted offset outline and the pointer tilt are gone, and
   the card rises in on scroll (Reveal).

   The statement is one contiguous sentence in the DOM:
   "Save the natural teeth till the last stage." (approved change A1).
   ------------------------------------------------------------------ */

export function PhilosophyCard() {
  return (
    <div className={styles.seam}>
      <div className={styles.stage}>
        <Reveal as="section" className={styles.card} aria-label="Clinical philosophy">
          <div className={styles.surface} aria-hidden="true" />
          <div className={styles.copy}>
            <p className={styles.label}>CLINICAL PHILOSOPHY</p>
            <blockquote className={styles.statement}>
              <span className={styles.lead}>{MIFTAH_PHILOSOPHY.lead}</span>{" "}
              <span className={styles.emphasis}>{MIFTAH_PHILOSOPHY.accent}</span>
            </blockquote>
            <cite className={styles.cite}>{MIFTAH_NAME}</cite>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
