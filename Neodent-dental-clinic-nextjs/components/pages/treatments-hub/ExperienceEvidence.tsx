import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { EVIDENCE } from "@/lib/treatments-hub";
import { googleRating, nampallyGoogleRating } from "@/lib/site-data";
import { Backdrop } from "./Backdrop";
import shared from "./TreatmentsHub.module.css";
import styles from "./ExperienceEvidence.module.css";

/* Q2 resolved: the footer and the home page read their ratings from
   lib/site-data.ts, while this page carried older hard-coded figures.
   Score and count now come from the same source; the star glyphs stay
   as the page had them. */
const LIVE_RATINGS: Record<string, { score: string; count: number }> = {
  Mehdipatnam: googleRating,
  Nampally: nampallyGoogleRating,
};
const RATINGS = EVIDENCE.ratings.map((rating) => {
  const live = LIVE_RATINGS[rating.branch];
  return live
    ? { ...rating, score: live.score, reviews: `${live.count} reviews` }
    : rating;
});

/* S8. Experience, evidence & what patients see (pattern P2 fact strip) on
   the dark band. Left: the ratings as a dark glass card. Right: the
   statement in ivory serif with the three facts below it as a strip with
   hairline dividers. No solid red block. Every figure is the old page's
   own (Q2: they differ from the footer and are not changed here). The
   review counts and the rating values count up; "1994" does not.
   No schema is added here. */

/* "260 reviews" -> 260 + " reviews", so the number can count while the
   rendered text stays identical. */
function splitReviews(text: string): { n: number; rest: string } | null {
  const match = /^(\d+)(.*)$/.exec(text);
  return match ? { n: Number(match[1]), rest: match[2] } : null;
}

export function ExperienceEvidence() {
  return (
    <section
      className={`${shared.dark} ${styles.section}`}
      aria-labelledby="experience-title"
    >
      <Backdrop />
      <div className={shared.container}>
        <Reveal
          as="h2"
          id="experience-title"
          className={`${shared.title} ${styles.title}`}
        >
          {EVIDENCE.title} {EVIDENCE.accent}
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.ratings}>
            <p className={styles.label}>{EVIDENCE.ratingsLabel}</p>
            <ul className={styles.ratingList}>
              {RATINGS.map((rating) => {
                const reviews = splitReviews(rating.reviews);
                return (
                  <li key={rating.branch} className={styles.rating}>
                    <p className={styles.branch}>
                      <Link
                        href={`/clinic/${rating.branch.toLowerCase()}`}
                        className={styles.branchLink}
                      >
                        {rating.branch}
                      </Link>
                    </p>
                    <span className={styles.score}>
                      <CountUp
                        to={Number(rating.score)}
                        decimals={1}
                        grouping={false}
                      />
                    </span>
                    <span className={styles.meta}>
                      <span
                        className={styles.stars}
                        role="img"
                        aria-label={`Rated ${rating.score} out of 5`}
                      >
                        {rating.stars}
                      </span>
                      <span className={styles.reviews}>
                        {reviews ? (
                          <>
                            <CountUp to={reviews.n} grouping={false} />
                            {reviews.rest}
                          </>
                        ) : (
                          rating.reviews
                        )}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <div className={styles.proof}>
            <Reveal as="p" delay={100} className={styles.statement}>
              {EVIDENCE.statement}
            </Reveal>
            <Reveal as="ul" stagger={100} className={styles.facts}>
              {EVIDENCE.experience.map((item) => (
                <li key={item.strong}>
                  <strong>{item.strong}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
