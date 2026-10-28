import { AppButton } from "@/components/ui/AppButton";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { HealingDetail, ILLUSTRATION_NOTE } from "./ImplantIllustrations";
import { IllustrationFrame } from "./IllustrationFrame";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsHealing.module.css";

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

/* Tan ground. Left: the healing drawing (4:5) on a white card. Right: the
   paper "After surgery" card and the dark "Risks" card, stretched so their
   top and bottom edges line up with the diagram card. Beneath: the page's
   second red surface, as heading | symptoms (two columns) | call buttons. */
export function ImplantsHealing() {
  return (
    <section className={styles.section} aria-labelledby="di-healing-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="di-healing-title"
          sans="Dental implant healing, aftercare"
          accent="and risks."
        />

        <div className={styles.grid}>
          <div className={styles.diagram}>
            <IllustrationFrame
              ratio="4 / 5"
              padding="md"
              caption="How bone bonds to a dental implant during healing"
              note={ILLUSTRATION_NOTE}
            >
              <HealingDetail />
            </IllustrationFrame>
          </div>

          <div className={styles.cards}>
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
                Outcomes vary from person to person. Your dentist can explain
                what to expect in your case.
              </p>
            </article>
          </div>
        </div>

        <div className={styles.call}>
          <h3 className={styles.callTitle}>
            Call the clinic where you were treated if you notice:
          </h3>
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
        </div>
      </div>
    </section>
  );
}
