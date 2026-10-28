import { QUESTIONS } from "@/lib/braces-orthodontics-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { TreatmentDoctorCard } from "@/components/treatments/TreatmentDoctorCard";
import { RichText } from "./RichText";
import styles from "./BrcQuestions.module.css";

/* 10. Questions to ask at your assessment (dark)
   Pattern: FmrQuestions (ClinicalLeadership via the implants care section).
   Left: the six questions as dark cards in two columns, a red dash before
   each. Right: the paper doctor card, copied from the FMR page (name,
   designation and qualifications are the published profile's). It does NOT
   describe him as the provider or an orthodontist: the "Your treatment" row
   says which clinician assesses and treats is confirmed at the consultation.
   Whether this card belongs on the page is a DENTIST REVIEW item. */
export function BrcQuestions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="brc-questions-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="brc-questions-title"
          sans={QUESTIONS.sans}
          accent={QUESTIONS.accent}
          tone="dark"
        />

        <div className={styles.layout}>
          <ul className={styles.questions}>
            {QUESTIONS.list.map((question) => (
              <li className={styles.question} key={question}>
                <p>{question}</p>
              </li>
            ))}
          </ul>

          <TreatmentDoctorCard
            doctor={doctor}
            headingId="brc-doctor-name"
            treatmentCopy={<RichText parts={doctor.treatment} />}
          />
        </div>
      </div>
    </section>
  );
}
