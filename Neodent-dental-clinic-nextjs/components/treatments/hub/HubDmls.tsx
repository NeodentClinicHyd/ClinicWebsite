import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { DMLS } from "@/lib/treatments-hub";
import { HubVideo } from "./HubVideo";
import styles from "./hub.module.css";

/* DMLS crowns film. PatientStories: one framed film next to a card.
   The film is Dr. Miftah explaining a dental model: no patient appears,
   so it is NOT behind SHOW_TREATMENT_CASE_MEDIA. */
export function HubDmls() {
  return (
    <section className={styles.dmls} aria-labelledby="dmls-title">
      <div className={`${styles.container} ${styles.dmlsGrid}`}>
        <div className={styles.dmlsCard}>
          <h2 id="dmls-title" className={styles.title}>
            {DMLS.title} <span>{DMLS.accent}</span>
          </h2>
          <p className="section-lede">
            Dr. Md. Miftah Ur Rahman explains the{" "}
            <EditorialHighlight tone="primary">
              functional characteristics of DMLS crowns
            </EditorialHighlight>
            , including their{" "}
            <EditorialHighlight tone="secondary">masticatory efficiency</EditorialHighlight>{" "}
            and clinical strength. Part of Neodent&apos;s approach to helping patients
            understand the{" "}
            <EditorialHighlight tone="quiet">materials and methods</EditorialHighlight>{" "}
            used in their treatment.
          </p>
          <dl className={styles.dmlsRows}>
            {DMLS.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className={styles.dmlsFigure}>
          <div className={styles.dmlsFrame}>
            <HubVideo src={DMLS.src} poster={DMLS.poster} label={DMLS.ariaLabel} />
          </div>
          <figcaption className={styles.caption}>
            <b>Clinical Education</b>
            <span>{DMLS.caption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
