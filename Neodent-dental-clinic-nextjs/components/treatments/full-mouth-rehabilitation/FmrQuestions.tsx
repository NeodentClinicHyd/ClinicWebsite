import { QUESTIONS } from "@/lib/full-mouth-rehabilitation-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { TreatmentDoctorCard } from "@/components/treatments/TreatmentDoctorCard";
import { RichText } from "./RichText";
import styles from "./FmrQuestions.module.css";

/* 9. Questions to ask your dentist (dark)
   Pattern: ClinicalLeadership via the implants care section. Left: the six
   questions as a 2 x 3 grid of dark cards. Right: the paper doctor card,
   copied from the implants page (name, designation and qualifications are the
   published profile's). It names one clinician and does not claim he plans
   or carries out every case: the "Your treatment" row says that is confirmed
   at the consultation. */
export function FmrQuestions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="fmr-questions-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="fmr-questions-title"
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
            headingId="fmr-doctor-name"
            treatmentCopy={<RichText parts={doctor.treatment} />}
          />
        </div>
      </div>
    </section>
  );
}
