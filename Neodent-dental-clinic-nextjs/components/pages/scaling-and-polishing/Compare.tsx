import { Reveal } from "@/components/motion/Reveal";
import { COMPARE } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./Compare.module.css";

/* Scale and polish, or deeper gum cleaning? (dark band)
   Two equal cards with identical structure: scene, name, then four label and
   value rows. On wide screens each card is horizontal (scene on the left,
   capped at min(22dvh, 190px) tall; name and rows on the right) and the two
   cards share rows (subgrid) so names and every row line up. From 768 px down
   to 1023 px the two cards sit side by side with the scene above; on phones
   they are a swipe row with progress dots (scene at most min(18dvh, 150px)).
   Beneath: the caption, the framing line and the red statement.
   Backdrop: the home hero recipe (charcoal ground, red glow, icon pattern as
   a luminance mask) from 768 px up; no continuous animation. This heading
   keeps the red italic accent (one of the sections that do). */
export function Compare() {
  const { labels } = COMPARE;
  const rows = [
    ["purpose", labels.purpose],
    ["who", labels.who],
    ["visits", labels.visits],
    ["aftercare", labels.aftercare],
  ] as const;

  return (
    <section className={styles.section} aria-labelledby="sp-compare-title">
      {/* Alpha levels for the pattern mask (same filter the home hero uses). */}
      <svg className={styles.filterDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <filter id="sp-pattern-levels-b" colorInterpolationFilters="sRGB">
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
            titleId="sp-compare-title"
            sans={COMPARE.sans}
            accent={COMPARE.accent}
            tone="dark"
          >
            <p className="section-lede section-lede--on-dark">{COMPARE.intro}</p>
          </SectionHeader>
        </Reveal>

        <SwipeRow
          count={COMPARE.cards.length}
          label="Choose a treatment"
          rowClassName={styles.compare}
          stagger={100}
          tone="dark"
        >
          {COMPARE.cards.map((card) => (
            <article
              key={card.slot}
              className={styles.card}
              aria-labelledby={`sp-compare-${card.slot}`}
            >
              <Slot id={card.slot} className={styles.frame} />
              <h3 id={`sp-compare-${card.slot}`} className={styles.name}>
                {card.name}
              </h3>
              {rows.map(([key, label]) => (
                <div className={styles.block} key={key}>
                  <p className={styles.blockLabel}>{label}</p>
                  <p className={styles.blockText}>{card[key]}</p>
                </div>
              ))}
            </article>
          ))}
        </SwipeRow>

        <p className={styles.figNote}>{COMPARE.mediaCaption}</p>

        <Reveal as="p" className={styles.line} delay={60}>
          {COMPARE.line}
        </Reveal>

        <Reveal as="aside" className={styles.decide} aria-label="Who decides" delay={80}>
          <p className={styles.statement}>{COMPARE.statement}</p>
          <p className={styles.statementNote}>{COMPARE.statementNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
