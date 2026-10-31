import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  CASES,
  FEATURE_FILM,
  REELS,
  SHOW_TREATMENT_CASE_MEDIA,
} from "@/lib/treatments-hub";
import { HubVideo } from "./HubVideo";
import shared from "./TreatmentsHub.module.css";
import styles from "./RealCases.module.css";

/* S7. Real cases. Visible outcomes. (patterns P11 and P7) on a light
   shell. Row A: the clinical film (portrait, as supplied, capped at
   --media-max-h-compact) beside the "See the work behind the treatment."
   card. Row B: the three film tiles. Row C: the four before/after cards
   in an equal 2x2 grid. On phones the tiles and the before/after cards
   are swipe rows (84% and 88% wide, the next card peeks, all in the DOM).
   The photos' pixelation is exactly as supplied. Two highlights in the
   section, both on light text. The red italic accent on "Visible
   outcomes." is one of the three allowed. The whole section disappears
   when SHOW_TREATMENT_CASE_MEDIA is false (consent masking decision). */
export function RealCases() {
  if (!SHOW_TREATMENT_CASE_MEDIA) return null;

  return (
    <section className={`${shared.light} ${styles.section}`} aria-labelledby="cases-title">
      <div className={shared.container}>
        <header className={styles.head}>
          <Reveal
            as="h2"
            variant="mask"
            stagger={90}
            id="cases-title"
            className={`${shared.title} ${styles.title}`}
          >
            <span>Real cases. </span>
            <span className={shared.accent}>Visible outcomes.</span>
          </Reveal>
          <Reveal as="p" delay={100} className={`${shared.lede} ${styles.intro}`}>
            Selected cases from Neodent showing{" "}
            <EditorialHighlight tone="primary">treatment outcomes</EditorialHighlight> across
            restorative, implant and smile procedures. Each case reflects the clinical work
            carried out at Neodent.
          </Reveal>
        </header>

        {/* Row A: film + side card */}
        <div className={styles.film}>
          <figure className={styles.filmFigure}>
            <div className={styles.shadow}>
              <Reveal variant="mask">
                <HubVideo
                  className={styles.filmFrame}
                  src={FEATURE_FILM.src}
                  poster={FEATURE_FILM.poster}
                  label={FEATURE_FILM.ariaLabel}
                  mode="tap"
                  objectPosition="50% 40%"
                />
              </Reveal>
            </div>
            <Reveal as="figcaption" delay={250} className={styles.caption}>
              <b>{FEATURE_FILM.metaLabel}</b>
              <span>{FEATURE_FILM.caption}</span>
            </Reveal>
          </figure>

          <Reveal delay={150} className={styles.filmCard}>
            <h3>See the work behind the treatment.</h3>
            <p>
              These films are a record of{" "}
              <EditorialHighlight tone="secondary">real clinical work</EditorialHighlight>{" "}
              carried out at Neodent Dental Hospital, Hyderabad — procedures performed by
              Dr. Md. Miftah Ur Rahman using the same methods and materials discussed during
              patient consultation.
            </p>
            <p>
              This clinical film captures a full mouth rehabilitation procedure using dental
              implants at Neodent Dental Hospital, Mehdipatnam. The footage offers a closer
              view of the clinical work involved in restoring missing teeth through an
              implant-based treatment approach.
            </p>
          </Reveal>
        </div>

        {/* Row B: three film tiles */}
        <Reveal
          as="ul"
          stagger={100}
          className={`${styles.reels} ${styles.row}`}
          tabIndex={0}
          aria-label="Clinical film tiles"
        >
          {REELS.map((reel) => (
            <li key={reel.id}>
              <figure className={styles.tile}>
                <HubVideo
                  className={styles.reelFrame}
                  src={reel.src}
                  poster={reel.poster}
                  label={`${reel.title}. ${reel.posterAlt}`}
                  mode="tap"
                  objectPosition="50% 30%"
                />
                <figcaption className={styles.tileCaption}>
                  <strong>{reel.title}</strong>
                  <em>{reel.context}</em>
                </figcaption>
              </figure>
            </li>
          ))}
        </Reveal>

        {/* Row C: before / after */}
        <Reveal
          as="ul"
          stagger={100}
          className={`${styles.cases} ${styles.row}`}
          tabIndex={0}
          aria-label="Before and after cases"
        >
          {CASES.map((item) => (
            <li key={item.id}>
              <figure className={styles.case}>
                <div className={styles.pair}>
                  <div className={styles.pairFrame}>
                    <Image
                      src={item.before}
                      alt={`${item.alt} - before treatment`}
                      fill
                      sizes="(max-width: 767px) 44vw, (max-width: 1023px) 40vw, 280px"
                      style={{ objectPosition: item.beforePosition }}
                    />
                    <span className={styles.pill}>Before</span>
                  </div>
                  <div className={styles.pairFrame}>
                    <Image
                      src={item.after}
                      alt={`${item.alt} - after treatment`}
                      fill
                      sizes="(max-width: 767px) 44vw, (max-width: 1023px) 40vw, 280px"
                      style={{ objectPosition: item.afterPosition }}
                    />
                    <span className={styles.pill}>After</span>
                  </div>
                </div>
                <figcaption className={styles.caseCaption}>
                  <strong>{item.title}</strong>
                  <em>{item.description}</em>
                </figcaption>
              </figure>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
