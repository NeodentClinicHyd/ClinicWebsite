import { RelatedTreatments } from "@/components/ui/RelatedTreatments";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/full-mouth-rehabilitation-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./FmrRelated.module.css";

/* 12. Related treatments (light)
   Pattern: ImplantsRelated, in a slim band on ivory. Three cards (dental
   implants, smile design, composite build-up) with the existing homepage
   summaries, then the page's one general-information line, with the reviewer
   line only when both REVIEWED_BY and LAST_REVIEWED are set. */
export function FmrRelated() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="fmr-related-title">
      <div className={styles.container}>
        <div className={styles.row}>
          <SectionHeader
            titleId="fmr-related-title"
            sans="Related"
            accent="treatments."
            compact
          />
          <RelatedTreatments items={RELATED} compact />
        </div>
        <div className={styles.note}>
          <p>{GENERAL_INFO_NOTE}</p>
          {showReview ? (
            <p>
              Reviewed by {REVIEWED_BY} · Last reviewed {LAST_REVIEWED}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
