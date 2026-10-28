import { QUESTIONS } from "@/lib/composite-build-up-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { TreatmentDoctorCard } from "@/components/treatments/TreatmentDoctorCard";
import { RichText } from "./RichText";
import styles from "./CbuQuestions.module.css";

/* 8. Questions to ask your dentist (dark)
   Pattern: BrcQuestions / FmrQuestions (ClinicalLeadership via the implants
   care section). Left: the four questions as dark cards in one column that
   shares the doctor card's height, a red dash before each. Right: the paper doctor card, copied from the FMR page (name,
   designation and qualifications are the published profile's). It does NOT
   describe him as the provider: the "Your treatment" row says which clinician
   assesses and carries out the treatment is confirmed at the consultation.
   Whether this card belongs on the page is a DENTIST REVIEW item. */
export function CbuQuestions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="cbu-questions-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="cbu-questions-title"
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
            headingId="cbu-doctor-name"
            treatmentCopy={<RichText parts={doctor.treatment} />}
          />
        </div>
      </div>
    </section>
  );
}
