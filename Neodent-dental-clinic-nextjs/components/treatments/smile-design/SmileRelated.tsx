import { RelatedTreatments } from "@/components/ui/RelatedTreatments";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./SmileRelated.module.css";

/* 12. Related treatments (tan)
   Pattern: the full mouth rehabilitation related band, in a slim band on the
   tan ground. Three cards (braces and orthodontics, composite build-up, full
   mouth rehabilitation) with the existing homepage summaries, then the page's
   one general-information line, with the reviewer line only when both
   REVIEWED_BY and LAST_REVIEWED are set. */
export function SmileRelated() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="sd-related-title">
      <div className={styles.container}>
        <div className={styles.row}>
          <SectionHeader
            titleId="sd-related-title"
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
