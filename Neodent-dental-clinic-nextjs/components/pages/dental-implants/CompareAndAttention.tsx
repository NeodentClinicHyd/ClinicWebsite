import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
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
} from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Emphasis } from "./Emphasis";
import { IllustrationFrame } from "./IllustrationFrame";
import { SectionHeader } from "./SectionHeader";
import { SwipeRow } from "./SwipeRow";
import styles from "./CompareAndAttention.module.css";

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
    involves: "A replacement tooth held in place by crowns on the teeth either side of the gap.",
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

const ATTENTION: { label: string; value: string; icon: ReactNode }[] = [
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

/* One dark band (plan 4.5): "Dental implants, bridges and dentures." with the
   three comparison cards, then "What may need attention first" with six icon
   cards. Ground and pattern follow the home hero recipe: charcoal-grey
   ground, the icon tile as a luminance mask that fades out toward the left
   and bottom, so it never sits behind the card text (768 px and wider).
   Compare cards share rows by subgrid on desktop (illustration, name,
   "What it involves", "Worth knowing" line up across the three cards) and
   are a swipe row with dots below 1024 px. The attention cards are a 3 x 2
   grid, then compact rows on phones. */
export function CompareAndAttention() {
  return (
    <section className={styles.section} aria-labelledby="di-options-title">
      <svg className={styles.filterDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <filter id="di-pattern-levels-b" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5"
          />
        </filter>
      </svg>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.pattern}>
          <span className={styles.tile} />
        </span>
      </div>

      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="di-options-title"
            sans="Dental implants, bridges"
            accent="and dentures."
            tone="dark"
          >
            <p className="section-lede section-lede--on-dark">
              An implant is <Emphasis tone="primary" onDark>one of several ways</Emphasis> to
              replace missing teeth. The right choice depends on your mouth, your health and{" "}
              <Emphasis tone="quiet" onDark>what you want from the result</Emphasis>.
            </p>
          </SectionHeader>
        </Reveal>

        <SwipeRow
          count={OPTIONS.length}
          label="Choose a way to replace teeth"
          rowClassName={styles.compare}
          stagger={90}
          tone="dark"
        >
          {OPTIONS.map((option) => (
            <article
              key={option.id}
              className={`${styles.card} ${option.featured ? styles.featured : ""}`}
              aria-labelledby={option.id}
            >
              <figure className={styles.figure}>
                <div className={styles.art}>
                  <IllustrationFrame ratio="fill" padding="sm">
                    {option.art}
                  </IllustrationFrame>
                </div>
                <figcaption className={styles.caption}>
                  {option.caption}
                  <span className={styles.note}>{ILLUSTRATION_NOTE}</span>
                </figcaption>
              </figure>
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
        </SwipeRow>

        <div className={styles.attention} role="group" aria-labelledby="di-attention-title">
          <Reveal className={styles.attentionHead}>
            <h3 id="di-attention-title" className={styles.attentionTitle}>
              What may need attention first
            </h3>
            <p className={styles.attentionIntro}>
              Needing treatment first does not rule an implant out. It often means a plan in
              stages.
            </p>
          </Reveal>
          <Reveal as="ul" className={styles.grid} stagger={80}>
            {ATTENTION.map(({ label, value, icon }) => (
              <li className={styles.tileCard} key={label}>
                <div className={styles.tileIcon}>{icon}</div>
                <div className={styles.tileBody}>
                  <h4 className={styles.tileTitle}>{label}</h4>
                  <p className={styles.tileText}>{value}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
