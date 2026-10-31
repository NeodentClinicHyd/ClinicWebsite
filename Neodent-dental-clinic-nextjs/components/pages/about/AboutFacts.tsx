import { legacyStats } from "@/lib/site-data";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import styles from "./AboutFacts.module.css";

/* ------------------------------------------------------------------
   About -- S2 fact strip: "At a glance" and three facts.

   Every word is moved unchanged from the previous strip. The number
   facts use CountUp, which renders the final value once in the server
   HTML ("2", "25,000+"). "Since 1994" is static: a year is never
   counted. The patients figure is derived from legacyStats so the
   number is never typed twice.
   ------------------------------------------------------------------ */

const patients = Number(legacyStats.patientsTreated.replace(/\D/g, ""));
const patientsSuffix = legacyStats.patientsTreated.replace(/[\d,\s]/g, "");

export function AboutFacts() {
  return (
    <section className={styles.strip} aria-label="Neodent at a glance">
      <div className={styles.inner}>
        <p className={styles.title} aria-hidden="true">
          At a glance
        </p>
        <Reveal
          as="ul"
          stagger={100}
          className={styles.list}
          aria-label="Neodent at a glance"
        >
          <li className={styles.cell}>
            <span className={styles.value}>Since {legacyStats.established}</span>
            <span className={styles.label}>in Hyderabad</span>
          </li>
          <li className={styles.cell}>
            <span className={styles.value}>
              <CountUp to={2} />
            </span>
            <span className={styles.label}>clinics</span>
          </li>
          <li className={styles.cell}>
            <span className={styles.value}>
              <CountUp to={patients} suffix={patientsSuffix} />
            </span>
            <span className={styles.label}>patients treated</span>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
