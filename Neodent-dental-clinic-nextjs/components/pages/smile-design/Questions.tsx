import { Reveal } from "@/components/motion/Reveal";
import { QUESTIONS } from "@/lib/smile-design-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { TreatmentDoctorCard } from "./TreatmentDoctorCard";
import styles from "./Questions.module.css";

/* Questions to ask your dentist (tan, so the dark Aftercare band is not
   followed by a second dark band). Left: the six questions as a 2 x 3 grid of
   paper cards of equal height, text centred vertically. Right: the paper doctor
   card (name, designation and qualifications are the published profile's); its
   portrait is capped at 40dvh (34dvh on phones). It names one clinician and does
   not claim he plans or carries out every case: the "Your treatment" row says
   that is confirmed at the consultation. Phones: six compact rows, then the
   card. */
export function Questions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="sd-questions-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sd-questions-title"
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

          <Reveal delay={160} className={styles.doctor}>
            <TreatmentDoctorCard
              doctor={doctor}
              headingId="sd-doctor-name"
              treatmentCopy={<RichText parts={doctor.treatment} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
