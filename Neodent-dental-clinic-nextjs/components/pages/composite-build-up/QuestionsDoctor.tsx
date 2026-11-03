import { Reveal } from "@/components/motion/Reveal";
import { QUESTIONS } from "@/lib/composite-build-up-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { TreatmentDoctorCard } from "./TreatmentDoctorCard";
import styles from "./QuestionsDoctor.module.css";

/* 8. Questions to ask your dentist (dark). Plan 4.6.
   Pattern: the home ClinicalLeadership doctor card. Left: the four questions as
   content-sized dark glass cards with a red dash (not stretched, so none is
   half empty). Right: the paper doctor card, horizontal on desktop (portrait
   at most 40dvh) so both columns end close together. It does NOT describe the
   doctor as the provider: the "Your treatment" row says which clinician
   assesses and carries out the treatment is confirmed at the consultation.
   Words, labels and links are those of the previous section (CbuQuestions). */
export function QuestionsDoctor() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="cbu-questions-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="cbu-questions-title"
            sans={QUESTIONS.sans}
            accent={QUESTIONS.accent}
            tone="dark"
            plain
          />
        </Reveal>

        <div className={styles.layout}>
          <Reveal as="ul" className={styles.questions} stagger={90}>
            {QUESTIONS.list.map((question) => (
              <li className={styles.question} key={question}>
                <p>{question}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className={styles.doctor} delay={120}>
            <TreatmentDoctorCard
              doctor={doctor}
              headingId="cbu-doctor-name"
              treatmentCopy={<RichText parts={doctor.treatment} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
