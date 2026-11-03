import { Reveal } from "@/components/motion/Reveal";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/composite-build-up-page";
import { RelatedTreatments } from "./RelatedTreatments";
import { SectionHeader } from "./SectionHeader";
import styles from "./RelatedSection.module.css";

/* 11. Related treatments (ivory). Plan 4.8.
   Slim band: the heading on the left, the three equal cards on the right, and
   the page's general-information line directly under the cards, aligned with
   their left edge (it used to float under the heading). The reviewer line
   shows only when both REVIEWED_BY and LAST_REVIEWED are set. DOM order stays
   heading, cards, note. */
export function RelatedSection() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="cbu-related-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <Reveal className={styles.head}>
            <SectionHeader
              titleId="cbu-related-title"
              sans="Related"
              accent="treatments."
              compact
              plain
            />
          </Reveal>
          <div className={styles.cards}>
            <RelatedTreatments items={RELATED} />
          </div>
          <Reveal className={styles.note} delay={80}>
            <p>{GENERAL_INFO_NOTE}</p>
            {showReview ? (
              <p>
                Reviewed by {REVIEWED_BY} · Last reviewed {LAST_REVIEWED}
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
