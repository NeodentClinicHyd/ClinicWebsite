"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  founder,
  legacyPressItems,
  legacyStats,
  type LegacyPressItem,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./LegacyStory.module.css";

/* ------------------------------------------------------------------
   Homepage legacy section — "Decades of changing smiles."

   Three beats on the site's 12-column container:
     A. the story  (left: title, dateline, founder card, body copy;
                    right: the press record, one lead + a two-up)
     B. the closing row (stat card 4 cols + statement card 8 cols)
   Chapter markers (01 Beginning / 02 People / 03 Record / 04 Impact)
   sit directly on the block each one names.

   Every fact and number shown here (founder, years, patients treated,
   founding year, press items) is read from lib/site-data.ts. Nothing
   about the doctor is hard-coded in this file.

   Motion: one 12px fade-up per block as it enters the viewport — the
   same observer technique as DrMiftahProfile's reveal scope. Reduced
   motion never arms it, so nothing is ever hidden for those users.
   ------------------------------------------------------------------ */

const ROMAN = ["i", "ii", "iii"] as const;

function useReveal(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const fold = window.innerHeight * 0.92;
    for (const el of items) {
      if (el.getBoundingClientRect().top < fold) el.dataset.shown = "instant";
    }
    root.dataset.revealReady = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.shown = "true";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    items.filter((el) => !el.dataset.shown).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

function Chapter({ n, label }: { n: string; label: string }) {
  return (
    <p className={styles.chapter} aria-hidden="true">
      <span>{n}</span> / {label}
    </p>
  );
}

function PressFigure({
  item,
  index,
  className,
  sizes,
}: {
  item: LegacyPressItem;
  index: number;
  className: string;
  sizes: string;
}) {
  return (
    <figure className={`${styles.figure} ${className}`} data-reveal>
      <div className={`${styles.frame} ${styles[`frame_${item.id}`]}`}>
        <Image
          className={`${styles.img} ${styles[`img_${item.id}`]}`}
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
        />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.source}>
          <span className={styles.numeral} aria-hidden="true">
            {ROMAN[index]}
          </span>
          {item.source}
        </span>
        <em className={styles.medium}>{item.medium}</em>
      </figcaption>
    </figure>
  );
}

export function LegacyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const [lead, tv, recognition] = legacyPressItems;
  const [surgeon, prosthodontist, implantologist] = founder.specialisms.map(
    (s) => s.toLowerCase(),
  );

  return (
    <section
      ref={sectionRef}
      /* `archive` is kept as a plain hook for scripts/seam-card-qa.mjs,
         which locates the section below the seam card by this class. */
      className={`archive ${styles.section}`}
      id="legacy"
      aria-labelledby="legacy-title"
    >
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.story}>
          {/* ---------- Left: beginning + people ---------- */}
          <div className={styles.left}>
            <div className={styles.intro} data-reveal>
              <Chapter n="01" label="Beginning" />
              <div className={styles.titleWrap}>
                <span className={styles.ghost} aria-hidden="true">
                  {legacyStats.established}
                </span>
                <h2 id="legacy-title" className={styles.title}>
                  Decades of <span>changing smiles.</span>
                </h2>
              </div>
              <p className={styles.label}>Established in Hyderabad</p>
            </div>

            <div className={styles.people} data-reveal>
              <Chapter n="02" label="People" />
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.portrait}>
                    <Image
                      className={styles.portraitImg}
                      src={founder.image}
                      alt={founder.imageAlt}
                      fill
                      sizes="112px"
                    />
                  </div>
                  <div className={styles.identity}>
                    <h3 className={styles.name}>{founder.name}</h3>
                    <p className={styles.label}>{founder.role}</p>
                  </div>
                  <p className={styles.exp}>
                    <strong>{founder.experienceYears}</strong>
                    <span>Years of experience</span>
                  </p>
                </div>

                <dl className={styles.facts}>
                  <div className={styles.fact}>
                    <dt>Qualifications</dt>
                    <dd className={styles.quals}>{founder.qualifications}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>Specialism</dt>
                    <dd>{founder.specialisms.join(" · ")}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>Academic post</dt>
                    <dd>{founder.academicPost}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className={styles.body} data-reveal>
              <p>
                Established in {legacyStats.established}, Neodent has grown
                through{" "}
                <EditorialHighlight tone="primary">
                  decades of clinical practice
                </EditorialHighlight>
                , specialist-led care and a commitment to making dentistry more
                reassuring, personal and precise. For patients, that continuity
                means every visit draws on years of{" "}
                <EditorialHighlight tone="secondary">
                  accumulated clinical experience
                </EditorialHighlight>
                . The same{" "}
                <EditorialHighlight tone="quiet">
                  specialist-led approach
                </EditorialHighlight>{" "}
                that shaped Neodent from the beginning still guides treatment
                today.
              </p>
              <p>
                Founded and led by {founder.name}, Neodent&apos;s clinical
                philosophy has been shaped by{" "}
                <EditorialHighlight tone="primary">
                  {founder.experienceYears} years of experience
                </EditorialHighlight>{" "}
                in dentistry. A {surgeon},{" "}
                <EditorialHighlight tone="secondary">
                  {prosthodontist} and {implantologist}
                </EditorialHighlight>
                , and {founder.academicTitle} at {founder.academicInstitution},{" "}
                {founder.shortName} brings together specialist{" "}
                <EditorialHighlight tone="quiet">
                  clinical practice and academic experience
                </EditorialHighlight>{" "}
                — a foundation that continues to guide the care delivered at
                Neodent.
              </p>
            </div>
          </div>

          {/* ---------- Right: the record ---------- */}
          <div className={styles.right}>
            <div className={styles.record}>
              <div className={styles.recordHead} data-reveal>
                <Chapter n="03" label="Record" />
                <p className={styles.label}>Three decades, on record</p>
              </div>

              <PressFigure
                item={lead}
                index={0}
                className={styles.lead}
                sizes="(min-width: 1024px) 574px, (min-width: 768px) 560px, calc(100vw - 32px)"
              />

              <div className={styles.pair}>
                <PressFigure
                  item={tv}
                  index={1}
                  className={styles.pairItem}
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 272px, 50vw"
                />
                <PressFigure
                  item={recognition}
                  index={2}
                  className={styles.pairItem}
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 272px, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Closing row ---------- */}
        <div className={styles.closing}>
          <div className={styles.closingChapter} data-reveal>
            <Chapter n="04" label="Impact" />
          </div>
          <div className={styles.bento}>
            <div className={`${styles.stat} ${styles.bentoCard}`} data-reveal>
              <span className={styles.rule} aria-hidden="true" />
              <p className={styles.statFigure}>
                <strong>{legacyStats.patientsTreated}</strong>
                <span className={styles.label}>Patients treated</span>
              </p>
            </div>

            <div className={`${styles.statement} ${styles.bentoCard}`} data-reveal>
              <p className={styles.statementText}>
                Different generations.
                <em>One standard of care.</em>
              </p>
              <div className={styles.timeline}>
                <span>{legacyStats.established}</span>
                <span className={styles.timelineLine} aria-hidden="true" />
                <span className={styles.timelineDot} aria-hidden="true" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
