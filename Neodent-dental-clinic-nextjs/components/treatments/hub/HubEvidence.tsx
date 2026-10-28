import { EVIDENCE } from "@/lib/treatments-hub";
import styles from "./hub.module.css";

/* Experience and patient feedback. The home's closing bento: an ivory
   stat card (here the two branch ratings, values exactly as they were
   on the previous page) beside the page's ONE red surface card carrying
   the existing statement and the three experience facts. */
export function HubEvidence() {
  return (
    <section className={styles.evidence} aria-labelledby="experience-title">
      <div className={styles.container}>
        <h2 id="experience-title" className={styles.title}>
          {EVIDENCE.title} <span>{EVIDENCE.accent}</span>
        </h2>

        <div className={styles.bento}>
          <div className={`${styles.stat} ${styles.bentoCard}`}>
            <span className={styles.rule} aria-hidden="true" />
            <p className={styles.label}>{EVIDENCE.ratingsLabel}</p>
            <ul className={styles.ratings} style={{ marginTop: 20 }}>
              {EVIDENCE.ratings.map((rating) => (
                <li key={rating.branch} className={styles.rating}>
                  <p className={`${styles.label} ${styles.ratingBranch}`}>{rating.branch}</p>
                  <span className={styles.score}>{rating.score}</span>
                  <span className={styles.ratingMeta}>
                    <span
                      className={styles.stars}
                      role="img"
                      aria-label={`Rated ${rating.score} out of 5`}
                    >
                      {rating.stars}
                    </span>
                    <span className={styles.reviews}>{rating.reviews}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.statement} ${styles.bentoCard}`}>
            <p className={styles.statementText}>{EVIDENCE.statement}</p>
            <ul className={styles.facts}>
              {EVIDENCE.experience.map((item) => (
                <li key={item.strong}>
                  <strong>{item.strong}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
