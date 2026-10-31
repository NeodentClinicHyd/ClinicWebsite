import { Reveal } from "@/components/motion/Reveal";
import { BEYOND } from "@/lib/treatments-hub";
import shared from "./TreatmentsHub.module.css";
import styles from "./AdditionalServices.module.css";

/* S3. Additional dental services (pattern P6) on a light shell: four
   category cards in a 2x2 grid that hug their content. Each card names
   its category and lists the services as pills. None of the services is
   a link on the site today (R0, Q6), so they are plain list items. The
   heading is one ink colour (no red accent). Wording is BEYOND's own. */
export function AdditionalServices() {
  return (
    <section className={`${shared.light} ${styles.section}`} aria-labelledby="beyond-title">
      <div className={shared.container}>
        <header className={styles.head}>
          <Reveal as="h2" id="beyond-title" className={`${shared.title} ${styles.title}`}>
            {BEYOND.title} {BEYOND.accent}
          </Reveal>
          <Reveal as="p" delay={100} className={`${shared.lede} ${styles.intro}`}>
            {BEYOND.intro}
          </Reveal>
        </header>

        <Reveal as="ul" stagger={80} className={styles.grid}>
          {BEYOND.groups.map((group, index) => (
            <li key={group.title} className={styles.card}>
              <p className={styles.label} id={`beyond-group-${index}`}>
                {group.title}
              </p>
              <ul className={styles.pills} aria-labelledby={`beyond-group-${index}`}>
                {group.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
