import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import {
  HealingDetail,
  ILLUSTRATION_NOTE,
} from "@/components/treatments/dental-implants/ImplantIllustrations";
import { IllustrationFrame } from "./IllustrationFrame";
import { SectionHeader } from "./SectionHeader";
import styles from "./HealingAftercare.module.css";

const AFTER_SURGERY = [
  "Some discomfort and swelling for several days is usual. Your dentist will advise on pain relief.",
  "A review soon after surgery checks how healing is going.",
  "Choose soft foods while the area heals.",
  "Avoid smoking. It can affect healing.",
  "Clean the area as you have been shown.",
];

const RISKS = [
  "An implant may not bond with the bone and may need to be removed.",
  "Infection can occur, particularly if aftercare instructions are not followed.",
  "Nerve injury is rare, but it is a recognised risk.",
  "Gum inflammation, or loss of bone, around an implant can develop over time. This is called peri-implant disease.",
  "Crowns, bridges and dentures wear and may need replacing.",
];

const WARNING_SIGNS = [
  "increasing swelling",
  "fever",
  "bleeding that will not stop",
  "a loose implant or crown",
  "numbness that does not settle",
];

/* "Dental implant healing, aftercare and risks." (plan 4.6). Beige ground.
   Desktop: the healing diagram card (diagram capped at min(46dvh, 440px),
   centred, caption below) and the "After surgery" and "Risks to know about"
   cards sit in one row of equal height, so no card has a long empty tail
   whatever the screen height. Below 1024 px: diagram, then the two cards.
   The red "Call the clinic" band follows: heading, two-column list, call
   buttons. Heading is plain (no accent). */
export function HealingAftercare() {
  return (
    <section className={styles.section} aria-labelledby="di-healing-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="di-healing-title"
            sans="Dental implant healing, aftercare"
            accent="and risks."
            plain
          />
        </Reveal>

        <div className={styles.grid}>
          <Reveal variant="mask" className={styles.diagram}>
            <div className={styles.diagramCard}>
              <div className={styles.diagramBox}>
                <IllustrationFrame
                  ratio="4 / 5"
                  padding="md"
                  caption="How bone bonds to a dental implant during healing"
                  note={ILLUSTRATION_NOTE}
                >
                  <HealingDetail />
                </IllustrationFrame>
              </div>
            </div>
          </Reveal>

          <Reveal className={styles.cards} stagger={110} delay={60}>
            <article className={`${styles.card} ${styles.after}`} aria-labelledby="di-after-title">
              <h3 id="di-after-title" className={styles.cardTitle}>
                After surgery
              </h3>
              <ul className={styles.list}>
                {AFTER_SURGERY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={styles.foot}>Follow your own dentist&apos;s instructions.</p>
            </article>

            <article className={`${styles.card} ${styles.risks}`} aria-labelledby="di-risks-title">
              <h3 id="di-risks-title" className={styles.cardTitle}>
                Risks to know about
              </h3>
              <ul className={styles.list}>
                {RISKS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={styles.foot}>
                Outcomes vary from person to person. Your dentist can explain what to expect in
                your case.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal className={styles.call}>
          <h3 className={styles.callTitle}>Call the clinic where you were treated if you notice:</h3>
          <ul className={styles.signs}>
            {WARNING_SIGNS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.callActions}>
            <AppButton href={nampallyTelPhone} variant="light">
              Call Nampally
            </AppButton>
            <AppButton href={telPhone} variant="light">
              Call Mehdipatnam
            </AppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
