import { Reveal } from "@/components/motion/Reveal";
import {
  StageAssessment,
  StageHealing,
  StagePlacement,
  StagePreparation,
  StageRestoration,
} from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Emphasis } from "./Emphasis";
import { IllustrationFrame } from "./IllustrationFrame";
import { SectionHeader } from "./SectionHeader";
import styles from "./StagesOfTreatment.module.css";

const STEPS = [
  {
    title: "Assessment and planning",
    text: "An examination, X-rays, sometimes 3D imaging, and moulds or digital scans to plan the treatment.",
    Illustration: StageAssessment,
  },
  {
    title: "Preparation, if needed",
    text: "Treating gum disease, a bone graft where there is not enough bone, and advice on stopping smoking.",
    Illustration: StagePreparation,
  },
  {
    title: "Placing the implant",
    text: "The post is placed in the jawbone as a minor surgical procedure, with local anaesthetic.",
    Illustration: StagePlacement,
  },
  {
    title: "Healing",
    text: "The bone bonds to the implant. This is called osseointegration and takes months. In some plans a second small procedure uncovers the implant afterwards.",
    Illustration: StageHealing,
  },
  {
    title: "The visible tooth",
    text: "Impressions or scans are taken, and the crown, bridge or denture is made and attached. Regular check-ups then continue.",
    Illustration: StageRestoration,
  },
];

/* "The stages of dental implant treatment." (plan 4.4). Vertical stepper:
   five cards with 120 px illustrations (96 px on phones), no numerals, one
   red connector that draws as each step scrolls into view (CSS scroll
   timeline where supported, fully drawn otherwise). The right column holds
   the existing "How long does it take?" card and the red statement band at
   every width: sticky on desktop, after the last step on phones. The
   sticky wrapper is never transformed by the reveal (only its children). */
export function StagesOfTreatment() {
  return (
    <section className={styles.section} aria-labelledby="di-stages-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="di-stages-title"
            sans="The stages of dental implant"
            accent="treatment."
            plain
          >
            <p className="section-lede">
              These are the <Emphasis tone="primary">usual stages</Emphasis>.{" "}
              <Emphasis tone="quiet">Your own plan may differ</Emphasis>.
            </p>
          </SectionHeader>
        </Reveal>

        <div className={styles.composition}>
          <Reveal as="ol" className={styles.steps} stagger={100}>
            {STEPS.map(({ title, text, Illustration }) => (
              <li key={title} className={styles.step}>
                <IllustrationFrame ratio="4 / 3" padding="sm" className={styles.tile}>
                  <Illustration />
                </IllustrationFrame>
                <div className={styles.stepBody}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal className={styles.side} stagger={140}>
            <article className={styles.stat} aria-labelledby="di-timeline-title">
              <span className={styles.rule} aria-hidden="true" />
              <h3 id="di-timeline-title" className={styles.statTitle}>
                How long does it take?
              </h3>
              <p className={styles.statText}>
                There is <Emphasis tone="primary">no standard timeline</Emphasis>. How long
                treatment takes depends on the bone available, whether anything needs treating
                first, and how you heal. A bone graft, if needed, adds more time. Your dentist
                will give you <Emphasis tone="quiet">a plan for your own case</Emphasis> at your
                consultation.
              </p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                A process measured in months,
                <em>not a single visit.</em>
              </p>
              <p className={styles.statementSub}>Your own plan may differ.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
