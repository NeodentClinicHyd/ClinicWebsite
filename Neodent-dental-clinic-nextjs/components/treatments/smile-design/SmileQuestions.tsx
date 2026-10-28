import { QUESTIONS } from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { TreatmentDoctorCard } from "@/components/treatments/TreatmentDoctorCard";
import { RichText } from "./RichText";
import styles from "./SmileQuestions.module.css";

/* 9. Questions to ask your dentist (dark, or tan)
   Pattern: the full mouth rehabilitation questions section (ClinicalLeadership
   via the implants care section). Left: the six questions as a 2 x 3 grid of
   cards. Right: the paper doctor card (name, designation and qualifications
   are the published profile's). It names one clinician and does not claim he
   plans or carries out every case: the "Your treatment" row says that is
   confirmed at the consultation.
   `variant` picks the ground: "dark" normally; "tan" when the cases section
   is switched off, so this section never sits next to the dark aftercare
   section. One component, one class switch. */
export function SmileQuestions({ variant = "dark" }: { variant?: "dark" | "tan" }) {
  const { doctor } = QUESTIONS;
  const tan = variant === "tan";

  return (
    <section
      className={`${styles.section} ${tan ? styles.tan : ""}`}
      aria-labelledby="sd-questions-title"
    >
      <div className={styles.container}>
        <SectionHeader
          titleId="sd-questions-title"
          sans={QUESTIONS.sans}
          accent={QUESTIONS.accent}
          tone={tan ? "light" : "dark"}
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
            headingId="sd-doctor-name"
            treatmentCopy={<RichText parts={doctor.treatment} />}
          />
        </div>
      </div>
    </section>
  );
}
