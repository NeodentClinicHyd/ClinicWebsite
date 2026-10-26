import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  IllustrationPlate,
  StageAssessment,
  StageHealing,
  StagePlacement,
  StagePreparation,
  StageRestoration,
} from "./ImplantIllustrations";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsStages.module.css";

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

/* Pattern: WhatToExpect. Header, then the five stages as rows (a drawing
   tile on a light plate, title and text), each under the home's rule with
   its growing red run so the sequence reads as one run; no numerals. The
   two cards of the LegacyStory bento (ivory paragraph card, the one red
   feature card) stack beside the rows and share their height. */
export function ImplantsStages() {
  return (
    <section className={styles.section} aria-labelledby="di-stages-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="di-stages-title"
          sans="The stages of dental implant"
          accent="treatment."
        >
          <p className="section-lede">
            These are the{" "}
            <EditorialHighlight tone="primary">usual stages</EditorialHighlight>.{" "}
            <EditorialHighlight tone="quiet">
              Your own plan may differ
            </EditorialHighlight>
            .
          </p>
        </SectionHeader>

        <div className={styles.composition}>
          <ol className={styles.steps}>
            {STEPS.map(({ title, text, Illustration }) => (
              <li key={title} className={styles.step}>
                <IllustrationPlate className={styles.tile}>
                  <Illustration />
                </IllustrationPlate>
                <div className={styles.stepBody}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.side}>
            <article className={styles.stat} aria-labelledby="di-timeline-title">
              <span className={styles.rule} aria-hidden="true" />
              <h3 id="di-timeline-title" className={styles.statTitle}>
                How long does it take?
              </h3>
              <p className="section-lede">
                There is{" "}
                <EditorialHighlight tone="primary">no standard timeline</EditorialHighlight>
                . How long treatment takes depends on{" "}
                <EditorialHighlight tone="secondary">
                  the bone available
                </EditorialHighlight>
                , whether anything needs treating first, and how you heal. A bone
                graft, if needed, adds more time. Your dentist will give you{" "}
                <EditorialHighlight tone="quiet">
                  a plan for your own case
                </EditorialHighlight>{" "}
                at your consultation.
              </p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                A process measured in months,
                <em>not a single visit.</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
