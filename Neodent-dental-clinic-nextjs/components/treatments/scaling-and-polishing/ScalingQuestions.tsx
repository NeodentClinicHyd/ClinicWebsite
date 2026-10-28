import { QUESTIONS } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { TreatmentDoctorCard } from "@/components/treatments/TreatmentDoctorCard";
import { RichText } from "./RichText";
import styles from "./ScalingQuestions.module.css";

/* 10. Questions to ask your dentist (dark)
   Pattern: the FMR / Smile Design questions section (ClinicalLeadership via
   the implants care section). Left: the four questions as a stack of equal
   dark cards. Right: the paper doctor card (name, designation and
   qualifications are the published profile's). It names one clinician and
   does not claim he carries out the clean: the "Your treatment" row says that
   is confirmed at the consultation. The section sits between the light cases
   section and the tan FAQ, and between tan home care and tan FAQ when the
   cases are off, so it never needs a ground variant. */
export function ScalingQuestions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="sp-questions-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sp-questions-title"
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
            headingId="sp-doctor-name"
            treatmentCopy={<RichText parts={doctor.treatment} />}
          />
        </div>
      </div>
    </section>
  );
}
