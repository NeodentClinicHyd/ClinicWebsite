import { RelatedTreatments } from "@/components/ui/RelatedTreatments";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./ScalingRelated.module.css";

/* 13. Related treatments (light)
   Pattern: the Smile Design related band, in a slim band on the ivory
   ground. Three cards (dental implants, full mouth rehabilitation, smile
   design) with the existing homepage summaries, then the page's one
   general-information line, with the reviewer line only when both
   REVIEWED_BY and LAST_REVIEWED are set. */
export function ScalingRelated() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="sp-related-title">
      <div className={styles.container}>
        <div className={styles.row}>
          <SectionHeader
            titleId="sp-related-title"
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
