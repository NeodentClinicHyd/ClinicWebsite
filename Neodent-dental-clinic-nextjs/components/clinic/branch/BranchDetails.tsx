import { MapPin, Phone, Star } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import type { ClinicLocation } from "@/lib/clinic-data";
import { branchContent } from "./branch-content";
import styles from "./BranchDetails.module.css";

/* ------------------------------------------------------------------
   Branch page -- S2 local introduction + Visit & contact card.

   Left: this branch's own prose in a reading column (about 68
   characters wide). Right: the label / value facts in one card that
   stays in view below the navigation on desktop (address, phone, hours,
   Google rating with its snapshot note), with the call and directions
   buttons. Every fact is read straight from the shared clinic data.

   The heading is set in plain ink (the red italic is kept only on the
   page h1, "your care." and "in their own words.").
   ------------------------------------------------------------------ */

export function BranchDetails({ clinic }: { clinic: ClinicLocation }) {
  const content = branchContent[clinic.slug];

  return (
    <section
      className={styles.section}
      id="visit-details"
      aria-labelledby="details-title"
    >
      <div className={styles.layout}>
        <div className={styles.prose}>
          <Reveal as="h2" variant="mask" stagger={90} id="details-title" className={styles.title}>
            <span>{content.introTitle[0]} </span>
            <span>{content.introTitle[1]}</span>
          </Reveal>
          <Reveal className={styles.paragraphs} stagger={100} delay={120}>
            {content.intro.map((paragraph) => (
              <p key={paragraph} className={styles.lede}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal
          as="aside"
          className={styles.card}
          aria-labelledby="contact-card-title"
          delay={200}
        >
          <h3 id="contact-card-title" className={styles.cardTitle}>
            Visit &amp; contact
            <span className={styles.srOnly}> — Neodent {clinic.name}</span>
          </h3>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>Address</dt>
              <dd>
                <address className={styles.address}>{clinic.address}</address>
              </dd>
            </div>
            <div className={styles.fact}>
              <dt>Phone</dt>
              <dd className={styles.strong}>
                <a
                  href={clinic.tel}
                  className={styles.phone}
                  aria-label={`Call Neodent ${clinic.name} on ${clinic.phone}`}
                >
                  {clinic.phone}
                </a>
              </dd>
            </div>
            <div className={styles.fact}>
              <dt>Hours</dt>
              <dd>
                {clinic.weeklyHours}
                <br />
                {clinic.hours} · {clinic.weeklyClosure}
              </dd>
            </div>
            <div className={styles.fact}>
              <dt>Google rating</dt>
              <dd>
                <span className={styles.rating}>
                  <Star size={15} aria-hidden="true" className={styles.star} />
                  <span>
                    <strong>{clinic.rating.score}</strong> / 5 from{" "}
                    {clinic.rating.count} Google reviews
                  </span>
                </span>
                <span className={styles.note}>{clinic.ratingNote}</span>
              </dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <AppButton href={clinic.tel} variant="primary">
              <Phone size={15} aria-hidden="true" /> Call
              <span className={styles.srOnly}> Neodent {clinic.name}</span>
            </AppButton>
            <a
              href={clinic.directions}
              target="_blank"
              rel="noopener noreferrer"
              className={`button button-ghost ${styles.directions}`}
            >
              <MapPin size={15} aria-hidden="true" /> Get directions
              <span className={styles.srOnly}>
                {" "}
                to Neodent {clinic.name} (opens in a new tab)
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
