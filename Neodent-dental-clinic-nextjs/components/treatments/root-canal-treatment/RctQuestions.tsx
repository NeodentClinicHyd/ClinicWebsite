import { QUESTIONS } from "@/lib/root-canal-treatment-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { TreatmentDoctorCard } from "@/components/treatments/TreatmentDoctorCard";
import { RichText } from "./RichText";
import styles from "./RctQuestions.module.css";

/* 9. Questions to ask your dentist (tan)
   Pattern: FmrQuestions (ClinicalLeadership via the implants care section),
   turned over for a tan ground. Left: the five questions in one dark card
   (the home dark card shape) with red dashes. Right: the paper doctor card,
   copied from the FMR page (name, designation and qualifications are the
   published profile's). It names one clinician and does not claim he treats
   every case: the "Your treatment" row says that is confirmed at the
   consultation. */
export function RctQuestions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="rct-questions-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="rct-questions-title"
          sans={QUESTIONS.sans}
          accent={QUESTIONS.accent}
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
            headingId="rct-doctor-name"
            treatmentCopy={<RichText parts={doctor.treatment} />}
          />
        </div>
      </div>
    </section>
  );
}
