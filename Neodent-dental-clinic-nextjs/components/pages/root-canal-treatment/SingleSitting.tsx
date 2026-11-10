import { Reveal } from "@/components/motion/Reveal";
import { SINGLE_SITTING } from "@/lib/root-canal-treatment-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import styles from "./SingleSitting.module.css";

/* Single-sitting speciality (dark), directly after the real cases.
   Left: eyebrow with a short red rule, the standard chapter heading (the
   red italic closing line carries "Single Sitting"), the description and the
   crown statement. Right: a paper card of three dash-marked points, the same
   card and list style as the aftercare section. Stacks on tablet and phones.
   Copy lives in SINGLE_SITTING (lib/root-canal-treatment-page.ts). */
export function SingleSitting() {
  return (
    <section className={styles.section} aria-labelledby="rct-single-sitting-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <Reveal className={styles.copy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              {SINGLE_SITTING.eyebrow}
            </p>
            <SectionHeader
              titleId="rct-single-sitting-title"
              sans={SINGLE_SITTING.sans}
              accent={SINGLE_SITTING.accent}
              tone="dark"
            />
            <p className={styles.lede}>
              <RichText parts={SINGLE_SITTING.description} onDark />
            </p>
            <p className={styles.statement}>{SINGLE_SITTING.statement}</p>
          </Reveal>

          <Reveal className={styles.side} delay={100}>
            <article className={styles.card} aria-labelledby="rct-single-sitting-points">
              <h3 id="rct-single-sitting-points" className={styles.cardTitle}>
                {SINGLE_SITTING.pointsTitle}
              </h3>
              <ul className={styles.points}>
                {SINGLE_SITTING.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className={styles.note}>{SINGLE_SITTING.note}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
