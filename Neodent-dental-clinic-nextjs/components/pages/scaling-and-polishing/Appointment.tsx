import { Reveal } from "@/components/motion/Reveal";
import { APPOINTMENT } from "@/lib/scaling-and-polishing-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Appointment.module.css";

/* What happens at the appointment (tan)
   Four stage cards linked by one continuous vertical red connector (a node at
   each card, no numerals; the line draws with scroll where supported) beside
   a column holding the "how long does it take?" card and the red statement.
   The column is not sticky: it stretches to the height of the stepper, the
   statement taking what is left with its text centred, so neither side is
   left empty in a full-page view. Step illustrations are 120 px tall (96 px or
   less on phones). Plain heading. */
export function Appointment() {
  return (
    <section className={styles.section} aria-labelledby="sp-appointment-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sp-appointment-title"
            sans={APPOINTMENT.sans}
            accent={APPOINTMENT.accent}
            plain
          >
            <p className="section-lede">{APPOINTMENT.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.composition}>
          <div className={styles.stepsCol}>
            <Reveal as="ol" className={styles.steps} stagger={100}>
              {APPOINTMENT.stages.map((stage) => (
                <li key={stage.slot} className={styles.step}>
                  <Slot id={stage.slot} className={styles.tile} />
                  <div className={styles.stepBody}>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            <p className={styles.figureNote}>{APPOINTMENT.mediaCaption}</p>
          </div>

          <Reveal className={styles.side} stagger={120}>
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
              <p className={styles.statementSub}>{APPOINTMENT.statementNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
