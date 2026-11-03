import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { AFTER } from "@/lib/scaling-and-polishing-page";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import styles from "./AfterCare.module.css";

/* After your clean, risks and when to call (dark)
   Left: a paper card of three care blocks and the closing line. Right: the
   dark risks card (red top edge) with its lead sentence set large and its
   text in the same padded block, vertically centred, so the card has no empty
   panel (decision D5: the two cards sit side by side on desktop and stack on
   phones). Beneath: the page's red surface, the "call the clinic where you
   were treated" band (heading | symptoms | call buttons). The heading keeps
   the red italic accent (one of the sections that do). */
export function AfterCare() {
  return (
    <section className={styles.section} aria-labelledby="sp-after-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sp-after-title"
            sans={AFTER.sans}
            accent={AFTER.accent}
            tone="dark"
          />
        </Reveal>

        <Reveal className={styles.grid} stagger={100}>
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
            <div className={styles.risksBody}>
              <p className={styles.risksLead}>{AFTER.risksLead}</p>
              <p className={styles.risksText}>{AFTER.risksText}</p>
            </div>
          </article>
        </Reveal>

        <Reveal className={styles.call} delay={100}>
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
        </Reveal>
      </div>
    </section>
  );
}
