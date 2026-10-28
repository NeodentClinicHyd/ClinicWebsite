import { BEYOND } from "@/lib/treatments-hub";
import styles from "./hub.module.css";

/* "Additional dental services." One wide label/value card in the
   LegacyStory / ClinicalLeadership doctor-card style: label left, the
   existing services as running text separated by the small dot. */
export function HubBeyond() {
  return (
    <section className={styles.beyond} aria-labelledby="beyond-title">
      <div className={styles.container}>
        <header className={styles.beyondHead}>
          <h2 id="beyond-title" className={styles.title}>
            {BEYOND.title} <span>{BEYOND.accent}</span>
          </h2>
          <p className={`${styles.beyondIntro} section-lede`}>{BEYOND.intro}</p>
        </header>
        <div className={styles.beyondCard}>
          <dl className={styles.beyondRows}>
            {BEYOND.groups.map((group) => (
              <div key={group.title} className={styles.beyondRow}>
                <dt>{group.title}</dt>
                <dd>
                  <ul>
                    {group.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
