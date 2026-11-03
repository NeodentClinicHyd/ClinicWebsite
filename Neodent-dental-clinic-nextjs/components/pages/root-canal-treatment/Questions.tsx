import { Reveal } from "@/components/motion/Reveal";
import { QUESTIONS } from "@/lib/root-canal-treatment-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { TreatmentDoctorCard } from "./TreatmentDoctorCard";
import styles from "./Questions.module.css";

/* Questions to ask your dentist (beige)
   Left: the five questions in one dark card with red dashes. Right: the
   paper doctor card (portrait capped at 40dvh on laptop, 34dvh on phone).
   The cards sit side by side at equal height and stack on phones. The card
   names one clinician and does not claim he treats every case: the "Your
   treatment" row says that is confirmed at the consultation. Plain heading. */
export function Questions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="rct-questions-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="rct-questions-title"
            sans={QUESTIONS.sans}
            accent={QUESTIONS.accent}
            plain
          />
        </Reveal>

        <Reveal className={styles.layout} stagger={120}>
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
        </Reveal>
      </div>
    </section>
  );
}
