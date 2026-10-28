import { APPOINTMENT } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./ScalingSlot";
import styles from "./ScalingAppointment.module.css";

/* 5. What happens at the appointment (tan)
   Pattern: the FMR "how a plan is made" and the Smile Design plan. Four
   stage cards (scenes G4a-d, no numbers) hang on one continuous red
   connector line beside a sticky, content-sized column: the "how long does
   it take?" card and the red statement card. */
export function ScalingAppointment() {
  return (
    <section className={styles.section} aria-labelledby="sp-appointment-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sp-appointment-title"
          sans={APPOINTMENT.sans}
          accent={APPOINTMENT.accent}
        >
          <p className="section-lede">{APPOINTMENT.intro}</p>
        </SectionHeader>

        <div className={styles.composition}>
          <div className={styles.stages}>
            <ol className={styles.steps}>
              {APPOINTMENT.stages.map((stage) => (
                <li key={stage.slot} className={styles.step}>
                  <Slot id={stage.slot} className={styles.tile} />
                  <div className={styles.stepBody}>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.figNote}>{APPOINTMENT.mediaCaption}</p>
          </div>

          <div className={styles.side}>
            <article className={styles.stat} aria-labelledby="sp-timeline-title">
              <span className={styles.rule} aria-hidden="true" />
              <h3 id="sp-timeline-title" className={styles.statTitle}>
                {APPOINTMENT.timelineTitle}
              </h3>
              <p className={styles.statText}>
                <RichText parts={APPOINTMENT.timeline} />
              </p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                {APPOINTMENT.statementLead}
                <em>{APPOINTMENT.statementEm}</em>
              </p>
              <p className={styles.statementNote}>{APPOINTMENT.statementNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
