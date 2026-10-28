import { AppButton } from "@/components/ui/AppButton";
import { CARE } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { Slot } from "./BrcSlot";
import styles from "./BrcCare.module.css";

/* 7. Daily care, risks and when to call (dark)
   Pattern: RctAftercare (FmrAftercare, the implants care and healing
   sections). Left: a paper card of four daily-care rows with icons (B7a-d).
   Right: the dark risks card (#191b1f, red top edge). Beneath: the page's red
   surface, the "call the clinic where you were treated" card, built exactly
   like the FMR one (heading | signs | call buttons). No emergency or
   after-hours claim and no out-of-hours number. */
export function BrcCare() {
  return (
    <section className={styles.section} aria-labelledby="brc-care-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="brc-care-title"
          sans={CARE.sans}
          accent={CARE.accent}
          tone="dark"
        />

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.care}`} aria-labelledby="brc-daily-title">
            <h3 id="brc-daily-title" className={styles.cardTitle}>
              {CARE.careTitle}
            </h3>
            <ul className={styles.careList}>
              {CARE.care.map((row) => (
                <li className={styles.careRow} key={row.slot}>
                  <Slot id={row.slot} />
                  <p className={styles.careText}>{row.text}</p>
                </li>
              ))}
            </ul>
            <p className={styles.careNote}>{CARE.careNote}</p>
            <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>
          </article>

          <article className={`${styles.card} ${styles.risks}`} aria-labelledby="brc-risks-title">
            <h3 id="brc-risks-title" className={styles.cardTitle}>
              {CARE.risksTitle}
            </h3>
            <p className={styles.risksIntro}>{CARE.risksIntro}</p>
            <ul className={styles.list}>
              {CARE.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
            <p className={styles.risksNote}>{CARE.risksNote}</p>
          </article>
        </div>

        <div className={styles.call}>
          <h3 className={styles.callTitle}>{CARE.urgentTitle}</h3>
          <ul className={styles.signs}>
            {CARE.urgent.map((item) => (
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
