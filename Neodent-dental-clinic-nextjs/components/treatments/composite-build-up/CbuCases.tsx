import Image from "next/image";
import Link from "next/link";
import { CASES, SHOW_COMPOSITE_CASE_IMAGES } from "@/lib/composite-build-up-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import styles from "./CbuCases.module.css";

/* 7. Composite build-up cases from Neodent (tan)
   Rendered ONLY when SHOW_COMPOSITE_CASE_IMAGES is true (the chrome also
   skips it, so the section before and after it still alternate in ground).
   Pattern: the implants / root canal case sections. One paper card holds the
   before / after pair at equal height (both files are 1280 x 960, shown at
   their own 4:3 ratio, never cropped and never enlarged past their size),
   beside the dark disclaimer card (root canal note card). No video exists
   for this treatment. The eye area is mosaic-pixelated in the files and the
   photographs are never cropped to reveal anything else. */
export function CbuCases() {
  if (!SHOW_COMPOSITE_CASE_IMAGES) return null;

  const { before, after } = CASES;

  return (
    <section className={styles.section} aria-labelledby="cbu-cases-title">
      <div className={styles.container}>
        <SectionHeader titleId="cbu-cases-title" sans={CASES.sans} accent={CASES.accent}>
          <p className="section-lede">
            <RichText parts={CASES.lede} />
          </p>
        </SectionHeader>

        <div className={styles.grid}>
          <figure className={`${styles.card} ${styles.pairCard}`}>
            <div className={styles.pair}>
              {[before, after].map((item) => (
                <div className={styles.plate} key={item.src}>
                  <div className={styles.frame}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={CASES.width}
                      height={CASES.height}
                      sizes="(max-width: 560px) 86vw, (max-width: 1023px) 42vw, 340px"
                    />
                  </div>
                  <span className={styles.label}>{item.label}</span>
                </div>
              ))}
            </div>
            <figcaption className={styles.caption}>{CASES.caption}</figcaption>
          </figure>

          <aside className={`${styles.card} ${styles.noteCard}`} aria-label="About these images">
            <p className={styles.evidence}>
              {CASES.evidence}
              <Link className={styles.privacyLink} href={CASES.privacyHref}>
                {CASES.privacyLinkText}
              </Link>
              .
            </p>
            <p className={styles.statement}>{CASES.statement}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
