import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { CARE } from "@/lib/composite-build-up-page";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./CareAndRisks.module.css";

/* 6. Looking after the tooth, and how long it lasts (ivory). Plan 4.5.
   Pattern: the home Expertise cards. Dominant element: the wide "How long
   does it last?" card with the check-up scene (C5), capped at
   min(46dvh, 440px), caption inside the card. Beneath: the paper "After the
   visit" icon list (I1-I4, one 40 px size) beside the dark "Risks to know
   about" card at equal height (decision D5: side by side on desktop, stacked
   on phones), then the page's red "call the clinic where you were treated"
   band (heading | signs | call buttons). No emergency or after-hours claim.
   Words, labels and the caption are those of the previous section (CbuCare). */
export function CareAndRisks() {
  const { lasts } = CARE;

  return (
    <section className={styles.section} aria-labelledby="cbu-care-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="cbu-care-title" sans={CARE.sans} accent={CARE.accent} plain>
            <p className="section-lede">{CARE.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal>
          <article className={styles.lasts} aria-labelledby="cbu-lasts-title">
            <div className={styles.lastsBody}>
              <h3 id="cbu-lasts-title" className={styles.lastsTitle}>
                {lasts.title}
              </h3>
              <p className={styles.lastsText}>{lasts.text}</p>
            </div>
            <Reveal variant="mask" className={styles.lastsMedia}>
              <div className={styles.diagram}>
                <Slot id={lasts.slot} caption={ILLUSTRATION_NOTE} />
              </div>
            </Reveal>
          </article>
        </Reveal>

        <Reveal className={styles.grid} stagger={100}>
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
