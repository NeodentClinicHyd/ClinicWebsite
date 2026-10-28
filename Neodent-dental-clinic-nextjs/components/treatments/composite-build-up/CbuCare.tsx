import { AppButton } from "@/components/ui/AppButton";
import { CARE } from "@/lib/composite-build-up-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { Slot } from "./CbuSlot";
import styles from "./CbuCare.module.css";

/* 6. Looking after the tooth, and how long it lasts (light)
   Pattern: ImplantsHealing / RctAftercare, turned over for an ivory ground.
   Dominant element: the wide "How long does it last?" feature card with the
   check-up scene (C5). Beneath: the paper "After the visit" icon list (I1-I4)
   beside the dark risks card, then the page's red surface, the "call the
   clinic where you were treated" card, built like the root canal one
   (heading | signs | call buttons). No emergency or after-hours claim. */
export function CbuCare() {
  const { lasts } = CARE;

  return (
    <section className={styles.section} aria-labelledby="cbu-care-title">
      <div className={styles.container}>
        <SectionHeader titleId="cbu-care-title" sans={CARE.sans} accent={CARE.accent}>
          <p className="section-lede">{CARE.intro}</p>
        </SectionHeader>

        <article className={styles.lasts} aria-labelledby="cbu-lasts-title">
          <div className={styles.lastsBody}>
            <h3 id="cbu-lasts-title" className={styles.lastsTitle}>
              {lasts.title}
            </h3>
            <p className={styles.lastsText}>{lasts.text}</p>
          </div>
          <Slot id={lasts.slot} className={styles.lastsMedia} caption={ILLUSTRATION_NOTE} />
        </article>

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.after}`} aria-labelledby="cbu-after-title">
            <h3 id="cbu-after-title" className={styles.cardTitle}>
              {CARE.afterTitle}
            </h3>
            <ul className={styles.afterList}>
              {CARE.after.map((row) => (
                <li className={styles.afterRow} key={row.slot}>
                  <Slot id={row.slot} />
                  <p className={styles.afterText}>{row.text}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.card} ${styles.risks}`} aria-labelledby="cbu-risks-title">
            <h3 id="cbu-risks-title" className={styles.cardTitle}>
              {CARE.risksTitle}
            </h3>
            <ul className={styles.riskList}>
              {CARE.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
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
