import { OPTIONS } from "@/lib/root-canal-treatment-page";
import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { LinkedText } from "./LinkedText";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./Options.module.css";

/* Root canal treatment and the alternatives (dark band)
   Three equal cards with identical structure (scene, name, text); on wide
   screens they share rows (subgrid) so frames, names and text line up. The
   scenes are capped at min(22dvh, 190px) (min(18dvh, 150px) on phones).
   Below 1024 px the cards are a swipe row with progress dots; every card
   stays in the DOM. Beneath: the red "what if you do not treat it?" band.
   Backdrop: the home hero recipe (charcoal ground, red glow, icon pattern
   as a luminance mask) from 768 px up; no continuous animation. This
   heading keeps the red italic accent (one of the sections that do). */
export function Options() {
  return (
    <section className={styles.section} aria-labelledby="rct-options-title">
      {/* Alpha levels for the pattern mask (same filter the home hero uses). */}
      <svg className={styles.filterDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <filter id="rct-pattern-levels-b" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5"
          />
        </filter>
      </svg>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.pattern}>
          <span className={styles.tile} />
        </span>
      </div>

      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="rct-options-title"
            sans={OPTIONS.sans}
            accent={OPTIONS.accent}
            tone="dark"
          >
            <p className="section-lede section-lede--on-dark">
              <RichText parts={OPTIONS.intro} onDark />
            </p>
          </SectionHeader>
        </Reveal>

        <SwipeRow
          count={OPTIONS.cards.length}
          label="Choose an option"
          rowClassName={styles.compare}
          stagger={100}
          tone="dark"
        >
          {OPTIONS.cards.map((card) => (
            <article
              key={card.slot}
              className={`${styles.card} ${card.featured ? styles.featured : ""}`}
              aria-labelledby={`rct-option-${card.slot}`}
            >
              <Slot id={card.slot} fill className={styles.frame} />
              <h3 id={`rct-option-${card.slot}`} className={styles.name}>
                {card.name}
              </h3>
              <p className={styles.text}>
                <LinkedText text={card.text} links={card.links} linkClassName={styles.link} />
              </p>
            </article>
          ))}
        </SwipeRow>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal className={styles.wait} delay={80}>
          <h3 className={styles.waitTitle}>{OPTIONS.waitTitle}</h3>
          <p className={styles.waitText}>{OPTIONS.waitText}</p>
        </Reveal>
      </div>
    </section>
  );
}
