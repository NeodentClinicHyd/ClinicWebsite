import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { DOCTORS } from "@/lib/treatments-hub";
import styles from "./hub.module.css";

/* "The thinking behind treatment." ClinicalLeadership: dark chapter,
   serif title with the red italic line, light doctor cards made of
   label/value rows; the philosophy copy sits below in two balanced
   columns with three highlighted phrases. */
export function HubThinking() {
  return (
    <section className={styles.thinking} aria-labelledby="thinking-title">
      <div className={styles.container}>
        <header>
          <h2 id="thinking-title" className={styles.title}>
            The thinking <span>behind treatment.</span>
          </h2>
        </header>

        <ul className={styles.docs}>
          {DOCTORS.map((doctor) => (
            <li key={doctor.id} className={styles.doc}>
              <div
                className={`${styles.docPortrait} ${doctor.id === "miftah" ? styles.docPortraitCentre : ""}`}
              >
                <Image
                  src={doctor.image}
                  alt={doctor.alt}
                  fill
                  sizes="(max-width: 899px) 92vw, 540px"
                />
              </div>
              <h3 className={styles.docName}>{doctor.name}</h3>
              <p className={styles.docRole}>{doctor.role}</p>
              <dl className={styles.docFacts}>
                {doctor.rows.map((row) => (
                  <div key={row.label} className={styles.docFact}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              {doctor.href && (
                <Link className={`${styles.action} ${styles.docLink}`} href={doctor.href}>
                  View Dr. Md. Miftah Ur Rahman&rsquo;s profile <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.thinkingBody}>
          <p className="section-lede section-lede--on-dark">
            Treatment at Neodent begins with{" "}
            <EditorialHighlight tone="primary" onDark>
              understanding the patient&apos;s concern
            </EditorialHighlight>
            . Not every dental condition requires the same response — some patients need
            care focused on a single affected tooth, while others may benefit from a more
            comprehensive treatment plan addressing multiple areas of the mouth.
          </p>
          <p className="section-lede section-lede--on-dark">
            Clinical assessment considers{" "}
            <EditorialHighlight tone="primary" onDark>
              oral health, function and aesthetic goals together
            </EditorialHighlight>
            . Where appropriate, the team discusses suitable treatment options, explains
            what each approach involves, and helps patients understand the clinical
            considerations relevant to their condition.
          </p>
          <p className="section-lede section-lede--on-dark">
            Treatment planning at Neodent is not a fixed sequence — it is shaped by{" "}
            <EditorialHighlight tone="primary" onDark>
              each patient&apos;s specific condition
            </EditorialHighlight>
            . The clinical team outlines available options, explains what each approach
            involves, and ensures that every decision is made with the patient&apos;s
            informed understanding.
          </p>
        </div>
      </div>
    </section>
  );
}
