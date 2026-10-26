import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  IllustrationFigure,
  OptionBridge,
  OptionDenture,
  OptionImplant,
} from "./ImplantIllustrations";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsOptions.module.css";

const BRIDGE = {
  involves:
    "A replacement tooth held in place by crowns on the teeth either side of the gap.",
  know: "No surgery in the jaw. The teeth either side may need to be reduced to carry it.",
};
const DENTURE = {
  involves: "Removable replacement teeth.",
  know: "A loose denture can sometimes be made firmer with implants. Dentures wear and may need replacing.",
};

const ATTENTION: { label: string; value: string }[] = [
  { label: "Gum health", value: "Gum disease or decay that has not been treated." },
  { label: "Bone", value: "Not enough bone height or width. A bone graft may help." },
  {
    label: "Smoking",
    value: "Stopping is strongly advised, and your dentist will advise on timing.",
  },
  {
    label: "Health conditions",
    value: "Health conditions such as diabetes, which can affect healing.",
  },
  {
    label: "Grinding",
    value: "Grinding or clenching of teeth, which affects how treatment is planned.",
  },
  {
    label: "Medicines and radiotherapy",
    value: "Some medicines, or past radiotherapy to the jaw. Your dentist will ask.",
  },
];

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className={styles.block}>
      <p className={styles.blockLabel}>{label}</p>
      <p className={styles.blockText}>{text}</p>
    </div>
  );
}

/* Pattern: Expertise / treatment-atlas ("What can we help you with"):
   the icon-pattern dark ground, the #f3f0e8 cards with 16px radius and
   the elevated white active-card for the subject of the page. Beneath it,
   a full-width profile-style card (ClinicalLeadership label / value rows). */
export function ImplantsOptions() {
  return (
    <section className={styles.section} aria-labelledby="di-options-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="di-options-title"
          sans="Dental implants, bridges"
          accent="and dentures."
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">
            An implant is{" "}
            <EditorialHighlight tone="primary" onDark>
              one of several ways
            </EditorialHighlight>{" "}
            to replace missing teeth. The right choice{" "}
            <EditorialHighlight tone="secondary" onDark>
              depends on your mouth
            </EditorialHighlight>
            , your health and{" "}
            <EditorialHighlight tone="quiet" onDark>
              what you want from the result
            </EditorialHighlight>
            .
          </p>
        </SectionHeader>

        <div className={styles.layout}>
          <article className={`${styles.card} ${styles.featured}`} aria-labelledby="di-opt-implant">
            <IllustrationFigure
              className={styles.fig}
              plateClassName={styles.figPlate}
              caption="A dental implant replacing one tooth"
            >
              <OptionImplant className={styles.art} />
            </IllustrationFigure>
            <h3 id="di-opt-implant" className={styles.featuredTitle}>
              Implant
            </h3>
            <div className={styles.blocks}>
              <Block
                label="What it involves"
                text="A post placed in the jawbone that supports a crown, bridge or denture. Involves minor surgery and months of healing."
              />
              <Block
                label="Worth knowing"
                text="Stands on its own, so the teeth beside it are not used for support. Needs daily cleaning around it and regular check-ups."
              />
            </div>
          </article>

          <div className={styles.stack}>
            <article className={styles.card} aria-labelledby="di-opt-bridge">
              <IllustrationFigure
                className={styles.fig}
                plateClassName={styles.figPlate}
                caption="A dental bridge spanning a gap"
              >
                <OptionBridge className={styles.art} />
              </IllustrationFigure>
              <h3 id="di-opt-bridge" className={styles.cardTitle}>
                Bridge
              </h3>
              <Block label="What it involves" text={BRIDGE.involves} />
              <Block label="Worth knowing" text={BRIDGE.know} />
            </article>
            <article className={styles.card} aria-labelledby="di-opt-denture">
              <IllustrationFigure
                className={styles.fig}
                plateClassName={styles.figPlate}
                caption="A removable denture"
              >
                <OptionDenture className={styles.art} />
              </IllustrationFigure>
              <h3 id="di-opt-denture" className={styles.cardTitle}>
                Denture
              </h3>
              <Block label="What it involves" text={DENTURE.involves} />
              <Block label="Worth knowing" text={DENTURE.know} />
            </article>
          </div>
        </div>

        <article className={styles.attention} aria-labelledby="di-attention-title">
          <div className={styles.attentionHead}>
            <h3 id="di-attention-title" className={styles.attentionTitle}>
              What may need attention first
            </h3>
            <p className={styles.attentionIntro}>
              Needing treatment first does not rule an implant out. It often
              means a plan in stages.
            </p>
          </div>
          <dl className={styles.facts}>
            {ATTENTION.map((row) => (
              <div className={styles.fact} key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}
