"use client";

import { useEffect, useRef, useState } from "react";
import {
  legacyAwardImage,
  legacyInterviewImage,
  legacyPressImage,
  recognitionImage,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";

/* ------------------------------------------------------------------
   Homepage Section 02 — "The NeoDent Archive".

   An art-directed editorial composition, not a text+image block:
   an oversized "1994" numeral bleeds behind the intro copy, a
   founder portrait is paired with its own oversized "35+" figure,
   three real archive artifacts (press / television / recognition)
   fan out across a single shared visual field, and the section
   closes on a right-aligned typographic climax rather than a CTA.

   Scoped entirely to `.archive-*` classes — no shared tokens or
   rules are redefined, and Section 01 (.exp-intro) is untouched.
   ------------------------------------------------------------------ */

export function LegacyStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.12 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`archive ${isVisible ? "archive-visible" : ""}`}
      id="legacy"
      aria-labelledby="archive-title"
    >
      <div className="container archive-grid">
        <div className="archive-atmosphere" aria-hidden="true">
          <span className="archive-arch archive-arch-main" />
          <span className="archive-arch archive-arch-inner" />
          <span className="archive-tooth-contour" />
          <span className="archive-draft archive-draft-horizontal" />
          <span className="archive-draft archive-draft-vertical" />
          <span className="archive-registration archive-registration-top" />
          <span className="archive-registration archive-registration-bottom" />
        </div>
        <div className="archive-route" aria-hidden="true">
          <span>01 / BEGINNING</span>
          <span>02 / PEOPLE</span>
          <span>03 / RECORD</span>
          <span>04 / IMPACT</span>
        </div>
        <p className="archive-year" aria-hidden="true">
          1994
        </p>

        <div className="archive-intro">
          <p className="archive-eyebrow">The NeoDent Legacy</p>
          <h2 id="archive-title" className="archive-title">
            Decades of <span>changing smiles.</span>
          </h2>
          <p className="archive-micro">Established in Hyderabad</p>
          <p className="archive-founder-line">
            Founded by Dr. Mohd. Siraj Ur Rahman.
          </p>

          <figure className="archive-founder">
            <img
              src={recognitionImage}
              alt="Dr. Mohd. Siraj Ur Rahman, founder and director of NeoDent Dental Hospitals"
              loading="lazy"
            />
            <figcaption>
              <b>Dr. Mohd. Siraj Ur Rahman</b>
              <span>Founder · Director</span>
            </figcaption>
            <p className="archive-founder-figure">
              <strong>35+</strong>
              <span>Years</span>
            </p>
          </figure>

          <p className="archive-narrative">
            Established in 1994, NeoDent has grown through{" "}
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
            that shaped NeoDent from the beginning still guides treatment
            today.
          </p>
          <p className="archive-narrative">
            Founded and led by Dr. Mohd. Siraj Ur Rahman, NeoDent&apos;s
            clinical philosophy has been shaped by more than{" "}
            <EditorialHighlight tone="primary">
              35 years of experience
            </EditorialHighlight>{" "}
            in dentistry. A dental surgeon,{" "}
            <EditorialHighlight tone="secondary">
              prosthodontist and implantologist
            </EditorialHighlight>
            , and Professor at Osmania Government Dental College & Hospital,
            Hyderabad, Dr. Siraj brings together specialist{" "}
            <EditorialHighlight tone="quiet">
              clinical practice and academic experience
            </EditorialHighlight>{" "}
            — a foundation that continues to guide the care delivered at
            NeoDent.
          </p>
        </div>

        <div className="archive-plates">
          <p className="archive-plates-label" aria-hidden="true">
            Three decades, on record
          </p>

          <figure className="archive-plate archive-plate-press">
            <span className="archive-plate-index" aria-hidden="true">
              i
            </span>
            <img
              src={legacyPressImage}
              alt="NeoDent feature in The Siasat Daily, Hyderabad"
              loading="lazy"
            />
            <figcaption>
              <span className="archive-plate-meta">
                <b>The Siasat Daily</b>
                <span>Hyderabad</span>
              </span>
              <span className="archive-plate-context">
                Press feature, Urdu daily
              </span>
            </figcaption>
          </figure>

          <figure className="archive-plate archive-plate-tv">
            <span className="archive-plate-index" aria-hidden="true">
              ii
            </span>
            <img
              src={legacyInterviewImage}
              alt="NeoDent doctor during a News18 Urdu television interview"
              loading="lazy"
            />
            <figcaption>
              <span className="archive-plate-meta">
                <b>Television</b>
                <span>News18 Urdu</span>
              </span>
              <span className="archive-plate-context">
                On-air interview segment
              </span>
            </figcaption>
          </figure>

          <figure className="archive-plate archive-plate-award">
            <span className="archive-plate-index" aria-hidden="true">
              iii
            </span>
            <img
              src={legacyAwardImage}
              alt="NeoDent recognition archive"
              loading="lazy"
            />
            <figcaption>
              <span className="archive-plate-meta">
                <b>Recognition</b>
              </span>
              <span className="archive-plate-context">
                Recognition ceremony
              </span>
            </figcaption>
          </figure>
        </div>

        <p className="archive-impact archive-figure archive-figure-patients">
          <strong>5,000+</strong>
          <span>Patients treated</span>
        </p>

        <p className="archive-today" aria-hidden="true">
          <span className="archive-today-tick" />
          Today
        </p>

        <div className="archive-climax">
          <p>Different generations.</p>
          <p className="archive-climax-emphasis">One standard of care.</p>
        </div>

        <p className="archive-transition">
          <span className="archive-transition-line" aria-hidden="true" />
          The experience continues
        </p>
      </div>
    </section>
  );
}
