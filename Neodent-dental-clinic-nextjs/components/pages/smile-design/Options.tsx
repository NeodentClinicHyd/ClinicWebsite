import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE, OPTIONS } from "@/lib/smile-design-page";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./Options.module.css";

/* Whitening, bonding, veneers and straightening, compared (dark, patterned).
   Five cards with identical parts: scene, name, "What it does", "Worth
   knowing". Desktop: a 6-column grid; the top three span two columns and share
   rows by subgrid, so the scenes, names and both text blocks line up exactly;
   the bottom two span three columns and lay the same parts out beside the
   scene. Every scene sits in a frame whose height is capped at
   min(22dvh, 190px). Below 1024 px the five cards are one swipe row (cards
   62 percent, then 84 percent wide) with progress dots, every card in the
   DOM. A red-edged strip closes the section with the one question to ask. No
   option is marked as carried out at Neodent: that is confirmed at the
   consultation. */
export function Options() {
  return (
    <section className={styles.section} aria-labelledby="sd-options-title">
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.pattern}>
          <span className={styles.tile} />
        </span>
      </div>
      <svg className={styles.filterDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <filter id="sd-options-pattern-levels" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5" />
        </filter>
      </svg>

      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sd-options-title"
            sans={OPTIONS.sans}
            accent={OPTIONS.accent}
            tone="dark"
          >
            <p className="section-lede section-lede--on-dark">{OPTIONS.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.rowWrap}>
          <SwipeRow
            count={OPTIONS.cards.length}
            label="Choose an option"
            rowClassName={styles.grid}
            stagger={100}
            tone="dark"
          >
            {OPTIONS.cards.map((card, index) => (
              <article
                key={card.slot}
                className={`${styles.card} ${index < 3 ? styles.top : styles.bottom}`}
                aria-labelledby={`sd-option-${card.slot}`}
              >
                <div className={styles.frame}>
                  <Slot id={card.slot} ratio="fill" />
                </div>
                <div className={styles.head}>
                  <h3 id={`sd-option-${card.slot}`} className={styles.name}>
                    {card.name}
                  </h3>
                  {card.link ? (
                    <Link className={styles.link} href={card.link.href}>
                      {card.link.label}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
                <div className={styles.block}>
                  <p className={styles.blockLabel}>{OPTIONS.doesLabel}</p>
                  <p className={styles.blockText}>{card.does}</p>
                </div>
                <div className={`${styles.block} ${styles.know}`}>
                  <p className={styles.blockLabel}>{OPTIONS.knowLabel}</p>
                  <p className={styles.blockText}>{card.know}</p>
                </div>
              </article>
            ))}
          </SwipeRow>
        </div>

        <p className={styles.figNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal>
          <p className={styles.closing}>{OPTIONS.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
