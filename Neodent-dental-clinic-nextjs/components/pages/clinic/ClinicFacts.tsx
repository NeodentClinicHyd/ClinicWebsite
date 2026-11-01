import { legacyStats } from "@/lib/site-data";
import { treatments } from "@/components/sections/expertise-data";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import styles from "./ClinicFacts.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- S1 fact strip: "At a glance" and four facts.

   Forked from the strip inside components/clinic/ClinicHero.tsx. Every
   label is moved unchanged: "in Hyderabad", "clinics", "treatments at
   each clinic", "patients treated". The numbers 2, 7 and 25,000+ use
   CountUp, which renders the final value once in the server HTML.
   "Since 1994" is static: a year is never counted. The figures come from
   the same sources as before (legacyStats, the treatments list), so they
   are never typed twice.
   ------------------------------------------------------------------ */

const patients = Number(legacyStats.patientsTreated.replace(/\D/g, ""));
const patientsSuffix = legacyStats.patientsTreated.replace(/[\d,\s]/g, "");

export function ClinicFacts() {
  return (
    <section className={styles.strip} aria-label="Neodent at a glance">
      <div className={styles.inner}>
        <div className={styles.card}>
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
                <CountUp to={treatments.length} />
              </span>
              <span className={styles.label}>treatments at each clinic</span>
            </li>
            <li className={styles.cell}>
              <span className={styles.value}>
                <CountUp to={patients} suffix={patientsSuffix} />
              </span>
              <span className={styles.label}>patients treated</span>
            </li>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
