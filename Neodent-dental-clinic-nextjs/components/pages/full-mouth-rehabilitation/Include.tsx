import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INCLUDE } from "@/lib/full-mouth-rehabilitation-page";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./Include.module.css";

/* What a plan can include (dark, patterned).
   Five kind-of-care cards (scene, title, one line, examples, links to the
   Neodent treatment page) plus the red closing note as the sixth cell.
   Desktop: a 3 x 2 grid where every card is a subgrid of five rows
   (illustration, title, text, examples, links), so the labels and the link
   rows line up across a row and no card has a hole at the bottom. Below
   1024 px it is one swipe row with progress dots (the red note is its
   last card), illustrations capped at min(18dvh, 150px).
   The icon pattern is a luminance mask over an ivory fill that fades to
   zero before the heading and the introduction (recipe 3.6). */
export function Include() {
  const total = INCLUDE.cards.length + 1;

  return (
    <section className={styles.section} aria-labelledby="fmr-include-title">
      {/* Alpha levels for the pattern mask (same filter the header uses). */}
      <svg className={styles.filterDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <filter id="fmr-include-levels" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5"
          />
        </filter>
      </svg>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.pattern}>
          <span className={styles.tile} />
        </span>
      </div>

      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="fmr-include-title"
            sans={INCLUDE.sans}
            accent={INCLUDE.accent}
            tone="dark"
          >
            <p className="section-lede section-lede--on-dark">
              <RichText parts={INCLUDE.intro} onDark />
            </p>
          </SectionHeader>
        </Reveal>

        <div className={styles.rowWrap}>
          <SwipeRow
            as="ul"
            count={total}
            label="Choose a kind of care"
            rowClassName={styles.grid}
            stagger={100}
            tone="dark"
          >
            {INCLUDE.cards.map((card) => (
              <li className={styles.card} key={card.slot}>
                <div className={styles.media}>
                  <Slot id={card.slot} ratio="fill" />
                </div>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
                <p className={styles.examples}>
                  <b>{INCLUDE.examplesLabel}</b> {card.examples}
                </p>
                <div className={styles.links}>
                  {card.links.length > 0 ? (
                    <ul className={styles.linkList}>
                      {card.links.map((link) => (
                        <li key={link.href}>
                          <Link className={styles.link} href={link.href}>
                            {link.label}
                            <ArrowRight size={15} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
            <li className={styles.note}>
              <p>{INCLUDE.note}</p>
            </li>
          </SwipeRow>
        </div>
      </div>
    </section>
  );
}
