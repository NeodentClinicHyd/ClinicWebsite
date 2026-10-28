import Image from "next/image";
import Link from "next/link";
import { CASES, SHOW_BRACES_CASE_IMAGES } from "@/lib/braces-orthodontics-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./BrcCases.module.css";

/* 9. Orthodontic cases from Neodent (light)
   Rendered ONLY when SHOW_BRACES_CASE_IMAGES is true (default false).
   Pattern: RctCases / FmrCases (paper cards on ivory, the home dark card for
   the disclaimer). A paper card holds the before and after photographs side
   by side, shown whole (never cropped, never larger than their own 1600 x
   1200 pixels), each with a plain "Before" / "After" label; beneath, the
   dark disclaimer card. Alt text is neutral and makes no outcome claim. */
export function BrcCases() {
  if (!SHOW_BRACES_CASE_IMAGES) return null;

  return (
    <section className={styles.section} aria-labelledby="brc-cases-title">
      <div className={styles.container}>
        <SectionHeader titleId="brc-cases-title" sans={CASES.sans} accent={CASES.accent} />

        <div className={styles.grid}>
          <figure className={`${styles.card} ${styles.photoCard}`}>
            <div className={styles.photos}>
              {CASES.images.map((item) => (
                <div className={styles.plate} key={item.src}>
                  <div className={styles.frame}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={CASES.width}
                      height={CASES.height}
                      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, 520px"
                    />
                  </div>
                  <span className={styles.label}>{item.label}</span>
                </div>
              ))}
            </div>
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
