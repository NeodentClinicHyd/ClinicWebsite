"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";
import { SwipeDots } from "./SwipeDots";
import styles from "./PatientVoices.module.css";

/* ------------------------------------------------------------------
   08 Patient voices (pattern P7). Light band. Five verbatim Google
   reviews in one swipe row (about three visible and a peek from
   1024 px, 86% cards on a phone) with progress dots. The row is a
   keyboard-focusable region. No Review or AggregateRating structured
   data anywhere on this page. Review text is unedited.
   ------------------------------------------------------------------ */

const REVIEWS = [
  {
    index: "01",
    quote:
      "I've got My front smile teeth placed here. Wow. Dr Miftah has done an excellent job. I'm happy with my smile.",
    author: "Victory Technical",
    meta: "2 months ago",
  },
  {
    index: "02",
    quote:
      "I had restricted mouth opening. Alhamdulillah Dr Miftah treated me and I'm recovering. Painless treatment.",
    author: "Khaja Pasha",
    meta: "5 months ago",
  },
  {
    index: "03",
    quote:
      "I've got implants placed here by Dr Miftah. It's been 1 month and I'm fully satisfied.",
    author: "Syed Moinuddin",
    meta: "1 year ago",
  },
  {
    index: "04",
    quote:
      "I got my Root canal treatment done here. Very nice treatment by Dr Miftah. I highly recommend.",
    author: "M Kishore",
    meta: "4 months ago",
  },
  {
    index: "05",
    quote: "Dr Miftah had made me confident by changing my smile.",
    author: "Laxminarayana Chikkula",
    meta: "1 year ago",
  },
];

const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJn1I062KXyzsRImvgKIkDcJQ";

export function PatientVoices() {
  const wrapRef = useRef<HTMLDivElement>(null);
  return (
    <section className={styles.section} aria-labelledby="miftah-voices-title">
      <div className={styles.container}>
        <SectionHead
          eyebrow="08 / PATIENT VOICES"
          id="miftah-voices-title"
          title="What patients say."
          accent="In their own words."
          lede="Verbatim from Google reviews. Individual results vary."
        />
        <div ref={wrapRef} className={styles.wrap}>
          <Reveal
            className={styles.row}
            stagger={80}
            data-swipe
            role="region"
            aria-label="Patient reviews from Google"
            tabIndex={0}
          >
            {REVIEWS.map((review) => (
              <figure className={styles.card} key={review.index}>
                <span className={styles.index} aria-hidden="true">
                  {review.index}
                </span>
                <blockquote className={styles.quote}>
                  <p>&ldquo;{review.quote}&rdquo;</p>
                </blockquote>
                <figcaption className={styles.meta}>
                  <span className={styles.author}>&mdash; {review.author}</span>
                  <span className={styles.when}>{review.meta}</span>
                  <span className={styles.via}>VIA GOOGLE</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
          <SwipeDots listRef={wrapRef} count={REVIEWS.length} noun="Review" className={styles.dots} />
        </div>
        <Reveal className={styles.cta}>
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            READ ALL REVIEWS ON GOOGLE <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
