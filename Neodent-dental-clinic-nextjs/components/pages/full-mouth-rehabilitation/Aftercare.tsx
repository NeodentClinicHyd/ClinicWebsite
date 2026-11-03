import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { AFTERCARE } from "@/lib/full-mouth-rehabilitation-page";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { nampallyTelPhone, telPhone } from "@/lib/site-data";
import { Slot } from "./Slot";
import styles from "./Aftercare.module.css";

/* Aftercare, risks and limits (dark).
   Left: a paper card of four care rows with icons (M7a-d, one 40 px icon
   family). Right: the dark risks card (red top edge). Beneath: the page's
   red surface, the "call the clinic where you were treated" band (heading,
   five signs, two call buttons). The heading keeps its red italic accent
   (one of the four planned). Everything is visible and unabridged. */
export function Aftercare() {
  return (
    <section className={styles.section} aria-labelledby="fmr-aftercare-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="fmr-aftercare-title"
            sans={AFTERCARE.sans}
            accent={AFTERCARE.accent}
            tone="dark"
          />
        </Reveal>

        <Reveal className={styles.grid} stagger={100}>
          <article className={`${styles.card} ${styles.care}`} aria-labelledby="fmr-care-title">
            <h3 id="fmr-care-title" className={styles.cardTitle}>
              {AFTERCARE.careTitle}
            </h3>
            <p className={styles.careIntro}>{AFTERCARE.careIntro}</p>
            <ul className={styles.careList}>
              {AFTERCARE.care.map((row) => (
                <li className={styles.careRow} key={row.slot}>
                  <Slot id={row.slot} />
                  <p className={styles.careText}>
                    <strong>{row.lead}</strong> {row.text}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.card} ${styles.risks}`} aria-labelledby="fmr-risks-title">
            <h3 id="fmr-risks-title" className={styles.cardTitle}>
              {AFTERCARE.risksTitle}
            </h3>
            <ul className={styles.list}>
              {AFTERCARE.risks.map((risk) => (
                <li key={risk.text}>
                  {risk.text}
                  {risk.link ? (
                    <Link className={styles.riskLink} href={risk.link.href}>
                      {risk.link.label}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal className={styles.call} delay={80}>
          <h3 className={styles.callTitle}>{AFTERCARE.urgentTitle}</h3>
          <ul className={styles.signs}>
            {AFTERCARE.urgent.map((item) => (
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
