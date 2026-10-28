import { AppButton } from "@/components/ui/AppButton";
import { AFTER } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import styles from "./ScalingAfter.module.css";

/* 7. After your clean, risks and when to call (dark)
   Pattern: the Smile Design / FMR aftercare (itself the implants care and
   healing sections). Left: a paper card of three care blocks (after a
   routine clean, after deeper cleaning, home care) and the closing line.
   Right: the dark risks card (#191b1f, red top edge) with its one-line
   lead set large. Beneath: the page's red surface, the "call the clinic
   where you were treated" card (heading | symptoms | call buttons). */
export function ScalingAfter() {
  return (
    <section className={styles.section} aria-labelledby="sp-after-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sp-after-title"
          sans={AFTER.sans}
          accent={AFTER.accent}
          tone="dark"
        />

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.care}`} aria-labelledby="sp-care-title">
            <p className={styles.careLabel}>{AFTER.careLabel}</p>
            <h3 id="sp-care-title" className={styles.cardTitle}>
              {AFTER.careTitle}
            </h3>
            <dl className={styles.careList}>
              {AFTER.care.map((block) => (
                <div className={styles.careBlock} key={block.label}>
                  <dt>{block.label}</dt>
                  <dd>{block.text}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.careFoot}>{AFTER.careFoot}</p>
          </article>

          <article className={`${styles.card} ${styles.risks}`} aria-labelledby="sp-risks-title">
            <h3 id="sp-risks-title" className={styles.cardTitle}>
              {AFTER.risksTitle}
            </h3>
            <p className={styles.risksLead}>{AFTER.risksLead}</p>
            <p className={styles.risksText}>{AFTER.risksText}</p>
          </article>
        </div>

        <div className={styles.call}>
          <h3 className={styles.callTitle}>{AFTER.urgentTitle}</h3>
          <ul className={styles.signs}>
            {AFTER.urgent.map((item) => (
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
