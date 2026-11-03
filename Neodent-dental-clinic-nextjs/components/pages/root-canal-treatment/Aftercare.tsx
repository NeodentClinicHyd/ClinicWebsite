import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { AFTERCARE } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Aftercare.module.css";

/* After the treatment, risks and when to call (dark)
   Left: a paper card of four care rows with icons (one icon size). Right:
   the dark risks card (red top edge). The two cards sit side by side at
   equal height and stack on phones (decision D5). Beneath: the page's red
   surface, the "call the clinic where you were treated" band (heading |
   signs | call buttons). This heading keeps the red italic accent (large
   heading, so red on dark is allowed). */
export function Aftercare() {
  return (
    <section className={styles.section} aria-labelledby="rct-aftercare-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="rct-aftercare-title"
            sans={AFTERCARE.sans}
            accent={AFTERCARE.accent}
            tone="dark"
          />
        </Reveal>

        <Reveal className={styles.grid} stagger={110}>
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
        </Reveal>

        <Reveal className={styles.call} delay={80}>
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
        </Reveal>
      </div>
    </section>
  );
}
