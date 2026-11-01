import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { getDoctorsFacts } from "@/lib/pages/doctors-content";
import styles from "./DoctorsFacts.module.css";

/* ------------------------------------------------------------------
   Doctors -- S1 fact strip: four facts on a light strip under the
   header, with CountUp (the final value is real text in the server
   HTML). The look is the home stat strip's (ExperienceIntro), written
   as this page's own CSS Module. Values come from lib/clinical-team.ts,
   lib/clinic-data.ts and lib/site-data.ts through doctors-content.ts,
   never typed here.
   ------------------------------------------------------------------ */

export function DoctorsFacts() {
  const facts = getDoctorsFacts();
  return (
    <section className={styles.strip} aria-label="The Neodent team at a glance">
      <div className={styles.inner}>
        <Reveal as="ul" stagger={80} className={styles.list}>
          {facts.map(({ key, to, suffix, label }) => (
            <li className={styles.cell} key={key}>
              <span className={styles.value}>
                <CountUp to={to} suffix={suffix} />
              </span>
              <span className={styles.label}>{label}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
