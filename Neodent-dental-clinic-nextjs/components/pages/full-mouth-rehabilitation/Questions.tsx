import { QUESTIONS } from "@/lib/full-mouth-rehabilitation-page";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { TreatmentDoctorCard } from "./TreatmentDoctorCard";
import styles from "./Questions.module.css";

/* Questions to ask your dentist (light).
   Left: the six questions as a 2 x 3 grid of equal-height paper cards, text
   centred vertically. Right: the doctor card (portrait capped at 40dvh,
   34dvh on a phone), stretched to the grid's height. The card names one
   clinician and does not claim he plans or carries out every case: the
   "Your treatment" row says that is confirmed at the consultation (owner
   question Q2: kept unchanged). On a phone: six compact rows, then the
   card. Light ground, so the dark Aftercare band is not followed by a
   second dark band. */
export function Questions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="fmr-questions-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="fmr-questions-title"
            sans={QUESTIONS.sans}
            accent={QUESTIONS.accent}
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
              headingId="fmr-doctor-name"
              treatmentCopy={<RichText parts={doctor.treatment} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
