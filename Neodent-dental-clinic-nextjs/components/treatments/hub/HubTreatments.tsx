import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  DR_MIFTAH,
  NOT_SURE_CARD,
  SHOW_TREATMENT_CASE_MEDIA,
  TREATMENTS,
  type HubTreatment,
} from "@/lib/treatments-hub";
import { HubVideo } from "./HubVideo";
import styles from "./hub.module.css";

/* "Featured dental treatments." Home Expertise pattern: patterned
   dark base, #f3f0e8 cards, red action word + arrow, ivory CTA card.
   Cards keep the ids the rest of the site already links to
   (/treatments#<id>). Photos sit behind SHOW_TREATMENT_CASE_MEDIA; with
   it off each card is its typographic version (red rule instead of a
   photo). */

function CardFoot({ treatment }: { treatment: HubTreatment }) {
  if (treatment.href) {
    return (
      <Link className={styles.action} href={treatment.href}>
        {treatment.title} in detail <ArrowRight aria-hidden="true" />
      </Link>
    );
  }
  /* TODO: set href to /treatments/<slug> when the page exists and remove
     longText from the card (slug: see treatment.slug). */
  return (
    <details className={styles.more}>
      <summary className={styles.action}>
        Read more<span className="sr-only"> about {treatment.title}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      <div className={styles.moreBody}>
        <p className={styles.moreText}>{treatment.longText}</p>
        {treatment.rows.length > 0 && (
          <dl className={styles.moreRows}>
            {treatment.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {treatment.doctorHref && (
          <Link className={styles.action} href={treatment.doctorHref}>
            Treated by {DR_MIFTAH} <ArrowRight aria-hidden="true" />
          </Link>
        )}
        {SHOW_TREATMENT_CASE_MEDIA && treatment.video && treatment.image && (
          <figure className={styles.moreVideo}>
            <HubVideo
              className={styles.moreVideoFrame}
              src={treatment.video.src}
              poster={treatment.image.src}
              label={treatment.video.caption}
            />
          </figure>
        )}
      </div>
    </details>
  );
}

export function HubTreatments() {
  return (
    <section
      className={styles.atlas}
      id="treatment-atlas"
      aria-labelledby="treatment-atlas-title"
    >
      <div className={styles.container}>
        <header className={styles.atlasHeader}>
          <h2 id="treatment-atlas-title" className={styles.atlasTitle}>
            Featured dental <span>treatments.</span>
          </h2>
          <p className={`${styles.atlasLede} section-lede section-lede--on-dark`}>
            Neodent approaches different dental concerns through{" "}
            <EditorialHighlight tone="primary">
              clinical assessment and treatment planning
            </EditorialHighlight>
            , drawing on a range of{" "}
            <EditorialHighlight tone="secondary">
              restorative, implant, orthodontic, prosthodontic and cosmetic treatment
              options
            </EditorialHighlight>
            . These featured treatments represent the primary clinical focuses at{" "}
            <EditorialHighlight tone="quiet">
              Neodent Dental Hospital, Mehdipatnam and Nampally
            </EditorialHighlight>
            .
          </p>
        </header>

        <ul className={styles.grid}>
          {TREATMENTS.map((treatment, index) => {
            const featured = index === 0;
            const media = SHOW_TREATMENT_CASE_MEDIA ? treatment.image : undefined;
            return (
              <li
                key={treatment.slug}
                id={treatment.anchorId}
                className={[
                  styles.card,
                  featured ? styles.cardFeatured : "",
                  featured && !media ? styles.cardNoMedia : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {media ? (
                  <div className={styles.cardMedia}>
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes={
                        featured
                          ? "(max-width: 767px) 92vw, (max-width: 1023px) 60vw, 380px"
                          : "(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 340px"
                      }
                      style={{
                        objectPosition: media.position,
                        ...(media.zoom
                          ? { transform: `scale(${media.zoom})`, transformOrigin: media.position }
                          : {}),
                      }}
                    />
                  </div>
                ) : (
                  <span className={`${styles.rule} ${styles.cardRule}`} aria-hidden="true" />
                )}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{treatment.title}</h3>
                  <p className={styles.cardSummary}>{treatment.summary}</p>
                  <div className={styles.cardFoot}>
                    <CardFoot treatment={treatment} />
                  </div>
                </div>
              </li>
            );
          })}

          <li className={`${styles.card} ${styles.cta}`}>
            <h3 className={styles.ctaHeading}>{NOT_SURE_CARD.heading}</h3>
            <p className={styles.ctaText}>{NOT_SURE_CARD.text}</p>
            <div className={styles.cardFoot}>
              <Link className={styles.action} href={NOT_SURE_CARD.href}>
                {NOT_SURE_CARD.linkLabel} <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
