import type { ReactNode } from "react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  IconBone,
  IconGrinding,
  IconGum,
  IconHealth,
  IconMedicine,
  IconSmoking,
  ILLUSTRATION_NOTE,
  OptionBridge,
  OptionDenture,
  OptionImplant,
} from "./ImplantIllustrations";
import { IllustrationFrame } from "./IllustrationFrame";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsOptions.module.css";

type Option = {
  id: string;
  name: string;
  caption: string;
  involves: string;
  know: string;
  art: ReactNode;
  featured?: boolean;
};

const OPTIONS: Option[] = [
  {
    id: "di-opt-implant",
    name: "Implant",
    caption: "A dental implant replacing one tooth",
    involves:
      "A post placed in the jawbone that supports a crown, bridge or denture. Involves minor surgery and months of healing.",
    know: "Stands on its own, so the teeth beside it are not used for support. Needs daily cleaning around it and regular check-ups.",
    art: <OptionImplant />,
    featured: true,
  },
  {
    id: "di-opt-bridge",
    name: "Bridge",
    caption: "A dental bridge spanning a gap",
    involves:
      "A replacement tooth held in place by crowns on the teeth either side of the gap.",
    know: "No surgery in the jaw. The teeth either side may need to be reduced to carry it.",
    art: <OptionBridge />,
  },
  {
    id: "di-opt-denture",
    name: "Denture",
    caption: "A removable denture",
    involves: "Removable replacement teeth.",
    know: "A loose denture can sometimes be made firmer with implants. Dentures wear and may need replacing.",
    art: <OptionDenture />,
  },
];

/* `icon` is the (future) artwork slot: the card renders it only when
   artwork is supplied, so every card is complete without it. */
const ATTENTION: { label: string; value: string; icon?: ReactNode }[] = [
  { label: "Gum health", value: "Gum disease or decay that has not been treated.", icon: <IconGum /> },
  { label: "Bone", value: "Not enough bone height or width. A bone graft may help.", icon: <IconBone /> },
  {
    label: "Smoking",
    value: "Stopping is strongly advised, and your dentist will advise on timing.",
    icon: <IconSmoking />,
  },
  {
    label: "Health conditions",
    value: "Health conditions such as diabetes, which can affect healing.",
    icon: <IconHealth />,
  },
  {
    label: "Grinding",
    value: "Grinding or clenching of teeth, which affects how treatment is planned.",
    icon: <IconGrinding />,
  },
  {
    label: "Medicines and radiotherapy",
    value: "Some medicines, or past radiotherapy to the jaw. Your dentist will ask.",
    icon: <IconMedicine />,
  },
];

/* Pattern: treatment-atlas dark ground. Three equal comparison cards with
   identical structure (frame, name, what it involves, worth knowing); the
   implant card is marked by a red top edge. Beneath: "what may need
   attention first" as a 3 x 2 grid of small cards. */
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
            to replace missing teeth. The right choice depends on your mouth, your
            health and{" "}
            <EditorialHighlight tone="quiet" onDark>
              what you want from the result
            </EditorialHighlight>
            .
          </p>
        </SectionHeader>

        <div className={styles.compare}>
          {OPTIONS.map((option) => (
            <article
              key={option.id}
              className={`${styles.card} ${option.featured ? styles.featured : ""}`}
              aria-labelledby={option.id}
            >
              <IllustrationFrame
                ratio="4 / 3"
                padding="sm"
                caption={option.caption}
                note={ILLUSTRATION_NOTE}
                className={styles.frame}
              >
                {option.art}
              </IllustrationFrame>
              <h3 id={option.id} className={styles.name}>
                {option.name}
              </h3>
              <div className={styles.block}>
                <p className={styles.blockLabel}>What it involves</p>
                <p className={styles.blockText}>{option.involves}</p>
              </div>
              <div className={styles.block}>
                <p className={styles.blockLabel}>Worth knowing</p>
                <p className={styles.blockText}>{option.know}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.attention} role="group" aria-labelledby="di-attention-title">
          <div className={styles.attentionHead}>
            <h3 id="di-attention-title" className={styles.attentionTitle}>
              What may need attention first
            </h3>
            <p className={styles.attentionIntro}>
              Needing treatment first does not rule an implant out. It often
              means a plan in stages.
            </p>
          </div>
          <ul className={styles.grid}>
            {ATTENTION.map(({ label, value, icon }) => (
              <li className={styles.tile} key={label}>
                {icon ? <div className={styles.tileIcon}>{icon}</div> : null}
                <h4 className={styles.tileTitle}>{label}</h4>
                <p className={styles.tileText}>{value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
