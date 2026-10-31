import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import {
  NOT_SURE_CARD,
  SHOW_TREATMENT_CASE_MEDIA,
  TREATMENTS,
  type HubTreatment,
} from "@/lib/treatments-hub";
import { Backdrop } from "./Backdrop";
import shared from "./TreatmentsHub.module.css";
import styles from "./FeaturedTreatments.module.css";

/* S2. Featured dental treatments (pattern P6 feature cards) on the dark
   band. Full Mouth Rehabilitation is the wide first card; the other six
   follow in a 3x2 grid (compact rows on phones). The help card stays last
   in the DOM and becomes a slim band under the grid. Card ids keep the
   anchors the rest of the site links to (/treatments#<id>). Heading
   carries the red italic accent (one of the three allowed). No highlights
   on dark body text. */

function Card({
  treatment,
  featured,
}: {
  treatment: HubTreatment;
  featured: boolean;
}) {
  const media = SHOW_TREATMENT_CASE_MEDIA ? treatment.image : undefined;
  return (
    <li
      id={treatment.anchorId}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      {media && (
        <Reveal variant="mask">
          <div className={styles.photo}>
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes={
                featured
                  ? "(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 480px"
                  : "(max-width: 767px) 88px, (max-width: 1023px) 46vw, 380px"
              }
              style={{
                objectPosition: media.position,
                ...(media.zoom
                  ? {
                      transform: `scale(${media.zoom})`,
                      transformOrigin: media.position,
                    }
                  : {}),
              }}
            />
          </div>
        </Reveal>
      )}
      <div className={styles.body}>
        <h3 className={styles.cardTitle}>{treatment.title}</h3>
        <p className={styles.summary}>{treatment.summary}</p>
        {treatment.href ? (
          <Link
            className={`${shared.action} ${styles.link}`}
            href={treatment.href}
          >
            <span>{treatment.title} in detail</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <details className={styles.more}>
            <summary className={`${shared.action} ${styles.link}`}>
              Read more<span className="sr-only"> about {treatment.title}</span>
            </summary>
            <p className={styles.summary}>{treatment.longText}</p>
          </details>
        )}
      </div>
    </li>
  );
}

export function FeaturedTreatments() {
  return (
    <section
      className={`${shared.dark} ${styles.section}`}
      id="treatment-atlas"
      aria-labelledby="treatment-atlas-title"
    >
      <Backdrop />
      <div className={shared.container}>
        <header className={styles.head}>
          <Reveal
            as="h2"
            variant="mask"
            stagger={90}
            id="treatment-atlas-title"
            className={`${shared.title} ${styles.title}`}
          >
            <span>Featured dental </span>
            <span className={shared.accent}>treatments.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className={`${shared.lede} ${styles.intro}`}
          >
            Neodent approaches different dental concerns through{" "}
            <span className={shared.strong}>
              clinical assessment and treatment planning
            </span>
            , drawing on a range of restorative, implant, orthodontic,
            prosthodontic and cosmetic treatment options. These featured
            treatments represent the primary clinical focuses at Neodent Dental
            Hospital, Mehdipatnam and Nampally.
          </Reveal>
        </header>

        <Reveal as="ul" stagger={100} className={styles.grid}>
          {TREATMENTS.map((treatment, index) => (
            <Card
              key={treatment.slug}
              treatment={treatment}
              featured={index === 0}
            />
          ))}

          <li className={styles.help}>
            <div className={styles.helpText}>
              <h3 className={styles.helpHeading}>{NOT_SURE_CARD.heading}</h3>
              <p className={styles.helpLine}>{NOT_SURE_CARD.text}</p>
            </div>
            <Link
              className={`button button-primary ${styles.helpButton}`}
              href={NOT_SURE_CARD.href}
            >
              {NOT_SURE_CARD.linkLabel}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
