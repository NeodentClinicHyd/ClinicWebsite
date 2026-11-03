import { Reveal } from "@/components/motion/Reveal";
import { QUESTIONS } from "@/lib/scaling-and-polishing-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { TreatmentDoctorCard } from "./TreatmentDoctorCard";
import styles from "./Questions.module.css";

/* Questions to ask your dentist (dark)
   Left: the four questions as a stack of equal dark cards with red dashes.
   Right: the paper doctor card (portrait capped at 40dvh on laptop, 34dvh on
   phone). The two sit side by side at equal height and stack on phones. The
   card names one clinician and does not claim he carries out the clean: the
   "Your treatment" row says that is confirmed at the consultation. The
   section sits between tan home care and the tan FAQ. Plain heading. */
export function Questions() {
  const { doctor } = QUESTIONS;

  return (
    <section className={styles.section} aria-labelledby="sp-questions-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sp-questions-title"
            sans={QUESTIONS.sans}
            accent={QUESTIONS.accent}
            tone="dark"
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
            headingId="sp-doctor-name"
            treatmentCopy={<RichText parts={doctor.treatment} />}
          />
        </Reveal>
      </div>
    </section>
  );
}
