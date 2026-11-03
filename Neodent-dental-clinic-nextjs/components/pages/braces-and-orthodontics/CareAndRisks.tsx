import { AppButton } from "@/components/ui/AppButton";
import { CARE } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./CareAndRisks.module.css";

/* 7. Looking after your teeth with braces (dark). Plan 4.6.
   Heading keeps its red-italic accent. Left: a paper card of four daily-care
   rows with icons (one size). Right: the dark risks card (#191b1f, hairline,
   red top edge). Beneath: the page's red surface, "call the clinic where you
   were treated" (heading | signs | call buttons, 52 px tall). Both cards are
   one row of equal height. No emergency or after-hours claim. */
export function CareAndRisks() {
  return (
    <section className={styles.section} aria-labelledby="brc-care-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="brc-care-title"
            sans={CARE.sans}
            accent={CARE.accent}
            tone="dark"
          />
        </Reveal>

        <Reveal className={styles.grid} stagger={100}>
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
        </Reveal>

        <Reveal className={styles.call} delay={80}>
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
        </Reveal>
      </div>
    </section>
  );
}
