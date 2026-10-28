import { AppButton } from "@/components/ui/AppButton";
import { AFTERCARE } from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { Slot } from "./SmileSlot";
import styles from "./SmileAftercare.module.css";

/* 7. Aftercare, risks and limits (dark)
   Pattern: the full mouth rehabilitation aftercare (itself the implants care
   and healing sections). Left: a paper card of five care rows with icons
   (SD8a-e) and the closing bite line. Right: the dark risks card (#191b1f,
   red top edge). Beneath: the page's red surface, the "call the clinic where
   you were treated" card (heading | symptoms | call buttons). */
export function SmileAftercare() {
  return (
    <section className={styles.section} aria-labelledby="sd-aftercare-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sd-aftercare-title"
          sans={AFTERCARE.sans}
          accent={AFTERCARE.accent}
          tone="dark"
        />

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.care}`} aria-labelledby="sd-care-title">
            <p className={styles.careLabel}>{AFTERCARE.careLabel}</p>
            <h3 id="sd-care-title" className={styles.cardTitle}>
              {AFTERCARE.careTitle}
            </h3>
            <ul className={styles.careList}>
              {AFTERCARE.care.map((row) => (
                <li className={styles.careRow} key={row.slot}>
                  <Slot id={row.slot} />
                  <p className={styles.careText}>
                    <strong>{row.lead}</strong>
                    {row.text ? ` ${row.text}` : null}
                  </p>
                </li>
              ))}
            </ul>
            <p className={styles.careFoot}>{AFTERCARE.careFoot}</p>
          </article>

          <article className={`${styles.card} ${styles.risks}`} aria-labelledby="sd-risks-title">
            <h3 id="sd-risks-title" className={styles.cardTitle}>
              {AFTERCARE.risksTitle}
            </h3>
            <ul className={styles.list}>
              {AFTERCARE.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
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
