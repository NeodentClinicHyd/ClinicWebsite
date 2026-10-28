import Image from "next/image";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { PLANNING } from "@/lib/treatments-hub";
import styles from "./hub.module.css";

/* "How treatment takes shape." WhatToExpect: tall real photograph on the
   left, the four existing steps on the right as stacked cards (title and
   text only, no numerals); the red run on each card grows from 1/4 to 4/4
   like the home's journey rule. */
export function HubPlanning() {
  return (
    <section className={styles.planning} aria-labelledby="planning-title">
      <div className={styles.container}>
        <header className={styles.planningHead}>
          <h2 id="planning-title" className={styles.title}>
            {PLANNING.title} <span>{PLANNING.accent}</span>
          </h2>
          <p className="section-lede">
            Every treatment begins with{" "}
            <EditorialHighlight tone="primary">
              understanding the patient&apos;s concern
            </EditorialHighlight>
            , followed by clinical assessment and{" "}
            <EditorialHighlight tone="secondary">treatment planning</EditorialHighlight>.
            The approach then moves into appropriate treatment and{" "}
            <EditorialHighlight tone="quiet">
              follow-up according to the patient&apos;s clinical situation
            </EditorialHighlight>
            .
          </p>
        </header>

        <div className={styles.planningGrid}>
          <figure className={styles.planningPhoto}>
            <Image
              src={PLANNING.image}
              alt={PLANNING.imageAlt}
              fill
              sizes="(max-width: 900px) 92vw, 440px"
            />
          </figure>
          <ol className={styles.steps} aria-label="Treatment process steps">
            {PLANNING.steps.map((step) => (
              <li key={step.label} className={styles.step}>
                <h3>{step.label}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
