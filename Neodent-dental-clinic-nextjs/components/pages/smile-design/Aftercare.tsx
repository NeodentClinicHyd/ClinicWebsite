import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { AFTERCARE } from "@/lib/smile-design-page";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Aftercare.module.css";

/* Aftercare, risks and limits (dark). Left: a paper card of five care rows with
   icons (SD8a-e, one size) and the closing bite line. Right: the dark risks
   card (red top edge). Beneath: the page's red surface, the "call the clinic
   where you were treated" band (heading | symptoms | call buttons; stacked on
   phones). Every word stays visible. */
export function Aftercare() {
  return (
    <section className={styles.section} aria-labelledby="sd-aftercare-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sd-aftercare-title"
            sans={AFTERCARE.sans}
            accent={AFTERCARE.accent}
            tone="dark"
          />
        </Reveal>

        <Reveal className={styles.grid} stagger={120}>
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
        </Reveal>

        <Reveal delay={100}>
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
        </Reveal>
      </div>
    </section>
  );
}
