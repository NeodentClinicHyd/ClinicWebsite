import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { DMLS, DR_MIFTAH, DR_MIFTAH_HREF } from "@/lib/treatments-hub";
import { HubVideo } from "./HubVideo";
import shared from "./TreatmentsHub.module.css";
import styles from "./DmlsFeature.module.css";

/* S5. Understanding DMLS Crowns & Functional Strength (pattern P5 split)
   on a light shell. Text card left (about 7/12), the film right (about
   5/12) centred against the card, capped at --media-max-h-compact, framed
   with a hairline, radius and soft shadow (no brackets). The caption sits
   under the film. The film is tap to play, muted, loops, preload none,
   with a sound button because Dr. Miftah speaks in it. Added: the
   clinician name links to his profile (wording unchanged). One highlight
   in the paragraph. */
export function DmlsFeature() {
  return (
    <section className={`${shared.light} ${styles.section}`} aria-labelledby="dmls-title">
      <div className={`${shared.container} ${styles.grid}`}>
        <Reveal className={styles.card}>
          <h2 id="dmls-title" className={`${shared.title} ${styles.title}`}>
            {DMLS.title} {DMLS.accent}
          </h2>
          <p className={`${shared.lede} ${styles.lede}`}>
            Dr. Md. Miftah Ur Rahman explains the{" "}
            <EditorialHighlight tone="primary">
              functional characteristics of DMLS crowns
            </EditorialHighlight>
            , including their masticatory efficiency and clinical strength. Part of
            Neodent&apos;s approach to helping patients understand the materials and
            methods used in their treatment.
          </p>
          <dl className={styles.rows}>
            {DMLS.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.value === DR_MIFTAH ? (
                    <Link className={styles.nameLink} href={DR_MIFTAH_HREF}>
                      {row.value}
                    </Link>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <figure className={styles.figure}>
          <div className={styles.shadow}>
            <Reveal variant="mask" delay={120}>
              <HubVideo
                className={styles.frame}
                src={DMLS.src}
                poster={DMLS.poster}
                label={DMLS.ariaLabel}
                mode="tap"
                hasSpeech
                objectPosition="50% 35%"
              />
            </Reveal>
          </div>
          <Reveal as="figcaption" delay={300} className={styles.caption}>
            <b>Clinical Education</b>
            <span>{DMLS.caption}</span>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
