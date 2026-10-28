import Image from "next/image";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  CASES,
  FEATURE_FILM,
  REELS,
  SHOW_TREATMENT_CASE_MEDIA,
} from "@/lib/treatments-hub";
import { HubVideo } from "./HubVideo";
import styles from "./hub.module.css";

/* "Real cases. Visible outcomes." + "See the work behind the treatment."
   merged. PatientStories film + LegacyStory press figures (white mat,
   small caption). Every film and photograph here shows patients, so the
   whole section disappears when SHOW_TREATMENT_CASE_MEDIA is false. */
export function HubWork() {
  if (!SHOW_TREATMENT_CASE_MEDIA) return null;

  return (
    <section className={styles.work} aria-labelledby="cases-title">
      <div className={styles.container}>
        <header className={styles.workHead}>
          <h2 id="cases-title" className={styles.title}>
            Real cases. <span>Visible outcomes.</span>
          </h2>
          <p className="section-lede">
            Selected cases from Neodent showing{" "}
            <EditorialHighlight tone="primary">treatment outcomes</EditorialHighlight>{" "}
            across{" "}
            <EditorialHighlight tone="secondary">
              restorative, implant and smile procedures
            </EditorialHighlight>
            . Each case reflects the{" "}
            <EditorialHighlight tone="quiet">
              clinical work carried out at Neodent
            </EditorialHighlight>
            .
          </p>
        </header>

        <div className={styles.film}>
          <figure className={styles.filmFigure}>
            <HubVideo
              src={FEATURE_FILM.src}
              poster={FEATURE_FILM.poster}
              label={FEATURE_FILM.ariaLabel}
            />
            <figcaption className={styles.caption}>
              <b>{FEATURE_FILM.metaLabel}</b>
              <span>{FEATURE_FILM.caption}</span>
            </figcaption>
          </figure>
          <div className={styles.filmCard}>
            <h3>See the work behind the treatment.</h3>
            <p>
              These films are a record of{" "}
              <EditorialHighlight tone="primary">real clinical work</EditorialHighlight>{" "}
              carried out at Neodent Dental Hospital, Hyderabad — procedures performed
              by{" "}
              <EditorialHighlight tone="secondary">Dr. Md. Miftah Ur Rahman</EditorialHighlight>{" "}
              using the same methods and materials discussed during{" "}
              <EditorialHighlight tone="quiet">patient consultation.</EditorialHighlight>
            </p>
            <p>
              This clinical film captures a{" "}
              <EditorialHighlight tone="primary">
                full mouth rehabilitation procedure
              </EditorialHighlight>{" "}
              using dental implants at Neodent Dental Hospital, Mehdipatnam. The footage
              offers a closer view of the{" "}
              <EditorialHighlight tone="secondary">clinical work involved</EditorialHighlight>{" "}
              in restoring missing teeth through an{" "}
              <EditorialHighlight tone="quiet">
                implant-based treatment approach.
              </EditorialHighlight>
            </p>
          </div>
        </div>

        <ul className={styles.reels}>
          {REELS.map((reel) => (
            <li key={reel.id}>
              <figure className={styles.mat}>
                <HubVideo
                  className={`${styles.reelFrame}`}
                  src={reel.src}
                  poster={reel.poster}
                  label={`${reel.title}. ${reel.posterAlt}`}
                />
                <figcaption className={styles.matCaption}>
                  <strong>{reel.title}</strong>
                  <em>{reel.context}</em>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <ul className={styles.cases}>
          {CASES.map((item) => (
            <li key={item.id} className={styles.case}>
              <figure className={styles.mat}>
                <div className={styles.pair}>
                  <div className={styles.pairFrame}>
                    <Image
                      src={item.before}
                      alt={`${item.alt} - before treatment`}
                      fill
                      sizes="(max-width: 767px) 46vw, (max-width: 1023px) 30vw, 300px"
                      style={{ objectPosition: item.beforePosition }}
                    />
                    <span className={styles.tag}>Before</span>
                  </div>
                  <div className={styles.pairFrame}>
                    <Image
                      src={item.after}
                      alt={`${item.alt} - after treatment`}
                      fill
                      sizes="(max-width: 767px) 46vw, (max-width: 1023px) 30vw, 300px"
                      style={{ objectPosition: item.afterPosition }}
                    />
                    <span className={styles.tag}>After</span>
                  </div>
                </div>
                <figcaption className={styles.matCaption}>
                  <strong>{item.title}</strong>
                  <em>{item.description}</em>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
