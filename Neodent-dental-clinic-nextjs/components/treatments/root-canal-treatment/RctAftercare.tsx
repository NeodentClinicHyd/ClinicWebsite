import { AppButton } from "@/components/ui/AppButton";
import { AFTERCARE } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { Slot } from "./RctSlot";
import styles from "./RctAftercare.module.css";

/* 7. After the treatment, risks and when to call (dark)
   Pattern: FmrAftercare (the implants care and healing sections). Left: a
   paper card of four care rows with icons (R6a-d). Right: the dark risks
   card (#191b1f, red top edge). Beneath: the page's red surface, the "call
   the clinic where you were treated" card, built exactly like the FMR one
   (heading | signs | call buttons). No emergency or after-hours claim. */
export function RctAftercare() {
  return (
    <section className={styles.section} aria-labelledby="rct-aftercare-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="rct-aftercare-title"
          sans={AFTERCARE.sans}
          accent={AFTERCARE.accent}
          tone="dark"
        />

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.care}`} aria-labelledby="rct-care-title">
            <h3 id="rct-care-title" className={styles.cardTitle}>
              {AFTERCARE.careTitle}
            </h3>
            <ul className={styles.careList}>
              {AFTERCARE.care.map((row) => (
                <li className={styles.careRow} key={row.slot}>
                  <Slot id={row.slot} />
                  <p className={styles.careText}>{row.text}</p>
                </li>
              ))}
            </ul>
            <p className={styles.careNote}>{AFTERCARE.careNote}</p>
            <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>
          </article>

          <article className={`${styles.card} ${styles.risks}`} aria-labelledby="rct-risks-title">
            <h3 id="rct-risks-title" className={styles.cardTitle}>
              {AFTERCARE.risksTitle}
            </h3>
            <p className={styles.risksIntro}>{AFTERCARE.risksIntro}</p>
            <ul className={styles.list}>
              {AFTERCARE.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
            <p className={styles.risksNote}>{AFTERCARE.risksNote}</p>
          </article>
        </div>

        <div className={styles.call}>
          <h3 className={styles.callTitle}>{AFTERCARE.urgentTitle}</h3>
          <ul className={styles.signs}>
            {AFTERCARE.urgent.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.callActions}>
            <AppButton href={nampallyTelPhone} variant="light">
              Call Nampally
            </AppButton>
            <AppButton href={telPhone} variant="light">
              Call Mehdipatnam
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
