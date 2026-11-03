import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { OVERVIEW } from "@/lib/composite-build-up-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./WhatIs.module.css";

/* 2. What is a composite build-up? (tan). Plan 4.3.
   Pattern: the home LegacyStory split (text left, figure right) with Expertise
   style cards. Heading and lede across the top. Below: "What it is" and
   "Who might be offered one" stacked beside the tooth cross-section (C1, 4:3,
   capped at min(46dvh, 440px)), the two small cards stretching to the
   figure's height. Then "What an assessment checks" and the dark "Other
   names you may hear" card side by side at equal height. Words, labels and
   the caption are those of the previous section (CbuOverview). */
export function WhatIs() {
  const { what, pair, names } = OVERVIEW;

  return (
    <section className={styles.section} aria-labelledby="cbu-overview-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.head}>
            <Reveal>
              <SectionHeader
                titleId="cbu-overview-title"
                sans={OVERVIEW.sans}
                accent={OVERVIEW.accent}
                plain
              />
            </Reveal>
            <Reveal delay={90}>
              <p className={styles.lede}>
                <RichText parts={OVERVIEW.lede} />
              </p>
            </Reveal>
          </div>

          <Reveal className={styles.stack} stagger={100}>
            <article className={styles.card} aria-labelledby="cbu-what-title">
              <h3 id="cbu-what-title" className={styles.cardTitle}>
                {what.title}
              </h3>
              <p className={styles.cardText}>{what.text}</p>
            </article>
            <article className={styles.card} aria-labelledby="cbu-who-title">
              <h3 id="cbu-who-title" className={styles.cardTitle}>
                {pair.who.title}
              </h3>
              <p className={styles.cardText}>{pair.who.text}</p>
            </article>
          </Reveal>

          <Reveal variant="mask" className={styles.media}>
            <div className={styles.diagram}>
              <Slot id="C1" caption={ILLUSTRATION_NOTE} />
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.pairRow} stagger={100}>
          <article className={styles.check} aria-labelledby="cbu-check-title">
            <h3 id="cbu-check-title" className={styles.cardTitle}>
              {pair.check.title}
            </h3>
            <ul className={styles.list}>
              {pair.check.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.names} aria-labelledby="cbu-names-title">
            <h3 id="cbu-names-title" className={styles.namesTitle}>
              {names.title}
            </h3>
            <p className={styles.namesText}>{names.text}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
