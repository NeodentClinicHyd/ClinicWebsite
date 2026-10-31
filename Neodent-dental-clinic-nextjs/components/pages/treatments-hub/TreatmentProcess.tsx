import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { PLANNING } from "@/lib/treatments-hub";
import shared from "./TreatmentsHub.module.css";
import styles from "./TreatmentProcess.module.css";

/* S6. How treatment takes shape (patterns P8 and P5) on a paper shell.
   Photo left (same radius and hairline as the other photos), a vertical
   stepper right: a connecting line with a dot per step, plain rows with
   hairline dividers. No numerals, no boxed cards, no red top lines. The
   photo is the existing treatment-room image (Q9: a better one can be
   added later as an extra). Heading in one ink colour. */
export function TreatmentProcess() {
  return (
    <section className={`${shared.paper} ${styles.section}`} aria-labelledby="planning-title">
      <div className={shared.container}>
        <header className={styles.head}>
          <Reveal as="h2" id="planning-title" className={`${shared.title} ${styles.title}`}>
            {PLANNING.title} {PLANNING.accent}
          </Reveal>
          <Reveal as="p" delay={100} className={`${shared.lede} ${styles.intro}`}>
            Every treatment begins with understanding the patient&apos;s concern, followed by
            clinical assessment and treatment planning. The approach then moves into
            appropriate treatment and follow-up according to the patient&apos;s clinical
            situation.
          </Reveal>
        </header>

        <div className={styles.grid}>
          <figure className={styles.photoWrap}>
            <Reveal variant="mask">
              <div className={styles.photo}>
                <Image
                  src={PLANNING.image}
                  alt={PLANNING.imageAlt}
                  fill
                  sizes="(max-width: 767px) 92vw, 440px"
                />
              </div>
            </Reveal>
          </figure>

          <div className={styles.stepper}>
            <Reveal as="ol" stagger={120} className={styles.steps} aria-label="Treatment process steps">
              {PLANNING.steps.map((step) => (
                <li key={step.label} className={styles.step}>
                  <h3>{step.label}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
