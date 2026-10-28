import Image from "next/image";
import Link from "next/link";
import { CASES, SHOW_SCALING_CASE_IMAGES } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import styles from "./ScalingCases.module.css";

/* 9. Scaling and polishing cases from Neodent (light)
   Rendered ONLY when SHOW_SCALING_CASE_IMAGES is true (the chrome also skips
   it; the sections either side differ in ground, so nothing needs a variant).
   Pattern: the Smile Design / implants case sections, kept compact because
   the only real pair is tiny. One paper card holds the before / after pair at
   equal height beside the dark disclaimer card.
   The two photographs are 437 x 239 and 445 x 238 pixels. They are served
   unoptimised (no resizing, so no upscaling), shown whole inside equal
   frames that never grow past 437px, and never cropped. Both are close views
   of the mouth with the lower face partly visible; whether the people have
   consented to publication could not be confirmed, so nothing is cropped,
   enlarged or otherwise altered here. */
export function ScalingCases() {
  if (!SHOW_SCALING_CASE_IMAGES) return null;

  const { pair } = CASES;

  return (
    <section className={styles.section} aria-labelledby="sp-cases-title">
      <div className={styles.container}>
        <SectionHeader titleId="sp-cases-title" sans={CASES.sans} accent={CASES.accent}>
          <p className="section-lede">
            <RichText parts={CASES.intro} />
          </p>
        </SectionHeader>

        <div className={styles.grid}>
          <figure className={`${styles.card} ${styles.pairCard}`}>
            <div className={styles.pair}>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={pair.before}
                    alt={pair.beforeAlt}
                    width={pair.beforeWidth}
                    height={pair.beforeHeight}
                    sizes="(max-width: 767px) 92vw, 437px"
                    unoptimized
                  />
                </div>
                <span className={styles.label}>{pair.beforeLabel}</span>
              </div>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={pair.after}
                    alt={pair.afterAlt}
                    width={pair.afterWidth}
                    height={pair.afterHeight}
                    sizes="(max-width: 767px) 92vw, 437px"
                    unoptimized
                  />
                </div>
                <span className={styles.label}>{pair.afterLabel}</span>
              </div>
            </div>
            <figcaption className={styles.caption}>{pair.caption}</figcaption>
          </figure>

          <aside className={styles.noteCard} aria-label="About these images">
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
