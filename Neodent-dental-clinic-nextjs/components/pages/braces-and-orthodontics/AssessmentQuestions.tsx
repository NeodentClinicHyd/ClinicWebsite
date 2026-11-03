import { QUESTIONS } from "@/lib/braces-orthodontics-page";
import { Reveal } from "@/components/motion/Reveal";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { TreatmentDoctorCard } from "./TreatmentDoctorCard";
import styles from "./AssessmentQuestions.module.css";

/* 10. Questions to ask at your assessment (dark). Plan 4.7.
   Left: the six questions as dark cards in one column of equal rows, a red
   dash before each, text centred vertically (no card more than 35% empty).
   Right: the paper doctor card (forked, portrait at most 40dvh). The card
   names the doctor's published title and qualifications and says that which
   clinician assesses and treats is confirmed at the consultation. Whether
   this card belongs on the page is an open question for the owner (Q3). */
export function AssessmentQuestions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="brc-questions-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="brc-questions-title"
            sans={QUESTIONS.sans}
            accent={QUESTIONS.accent}
            tone="dark"
            plain
          />
        </Reveal>

        <div className={styles.layout}>
          <Reveal as="ul" className={styles.questions} stagger={80}>
            {QUESTIONS.list.map((question) => (
              <li className={styles.question} key={question}>
                <p>{question}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className={styles.doctor} delay={120}>
            <TreatmentDoctorCard
              doctor={doctor}
              headingId="brc-doctor-name"
              treatmentCopy={<RichText parts={doctor.treatment} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
