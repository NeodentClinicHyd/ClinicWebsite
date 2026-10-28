import Image from "next/image";
import Link from "next/link";
import { CASES, SHOW_SMILE_CASE_IMAGES } from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./SmileCases.module.css";

/* 8. Smile design cases from Neodent (tan)
   Rendered ONLY when SHOW_SMILE_CASE_IMAGES is true (the chrome also skips
   it, so the sections before and after it still alternate in ground). All
   patient imagery on the page lives here.
   Pattern: the composite build-up / implants case sections. Row 1: one paper
   card holds the before / after pair at equal height (960 x 1280 portraits,
   shown whole at their own 3:4 ratio, never cropped), beside a paper card
   with the six clinical photographs of one case, each at its own 5:4 ratio,
   never cropped and never enlarged past its native size (the smallest is 465
   px wide). Row 2: the dark disclaimer band with the privacy-policy link.
   A mosaic over the eyes is baked into the pair; the six photographs are
   cropped to the lower face in the files. Nothing is cropped or enlarged
   here to reveal more. */
export function SmileCases() {
  if (!SHOW_SMILE_CASE_IMAGES) return null;

  const { pair, steps } = CASES;

  return (
    <section className={styles.section} aria-labelledby="sd-cases-title">
      <div className={styles.container}>
        <SectionHeader titleId="sd-cases-title" sans={CASES.sans} accent={CASES.accent}>
          <p className="section-lede">{CASES.intro}</p>
        </SectionHeader>

        <div className={styles.grid}>
          <figure className={`${styles.card} ${styles.pairCard}`}>
            <div className={styles.pair}>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={pair.before}
                    alt={pair.beforeAlt}
                    width={pair.width}
                    height={pair.height}
                    sizes="(max-width: 767px) 44vw, (max-width: 1023px) 30vw, 220px"
                  />
                </div>
                <span className={styles.label}>{pair.beforeLabel}</span>
              </div>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={pair.after}
                    alt={pair.afterAlt}
                    width={pair.width}
                    height={pair.height}
                    sizes="(max-width: 767px) 44vw, (max-width: 1023px) 30vw, 220px"
                  />
                </div>
                <span className={styles.label}>{pair.afterLabel}</span>
              </div>
            </div>
            <figcaption className={styles.caption}>{pair.caption}</figcaption>
          </figure>

          <figure className={`${styles.card} ${styles.stripCard}`}>
            <ol className={styles.strip}>
              {steps.map((step) => (
                <li className={styles.tile} key={step.src}>
                  <div className={styles.tileFrame}>
                    <Image
                      src={step.src}
                      alt={step.alt}
                      width={step.width}
                      height={step.height}
                      sizes="(max-width: 767px) 44vw, (max-width: 1023px) 30vw, 200px"
                    />
                  </div>
                </li>
              ))}
            </ol>
            <figcaption className={styles.stripCaption}>{CASES.stepsCaption}</figcaption>
          </figure>

          <aside className={`${styles.card} ${styles.noteCard}`} aria-label="About these images">
            <p className={styles.evidence}>{CASES.evidence}</p>
            <p className={styles.privacy}>
              {CASES.privacyLead}
              <Link className={styles.privacyLink} href={CASES.privacyHref}>
                {CASES.privacyLinkText}
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
