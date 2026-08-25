"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play, Star } from "lucide-react";
import styles from "./PatientStories.module.css";

/* ------------------------------------------------------------------
   Homepage Section 05 — "Patient Experiences / Real Stories".

   The emotional-proof chapter: after clinic (01), legacy (02),
   treatments (03) and people (04), this section answers what the
   experience actually feels like for patients. One of NeoDent's three
   authentic patient-testimonial films is visually dominant at a time
   -- video, story number, theme label and pull quote change together
   as a single unit when the visitor switches stories via the 01/02/03
   selector -- never three equal cards, never a generic carousel.

   SOURCE-MATERIAL INTEGRITY (do not edit without re-checking the
   original recordings):
   - Pull quotes are verified, non-paraphrased patient statements
     (or, for 02, corrected to the words the PATIENT actually says --
     the source recording's "your confidence increases" line is
     spoken by the dentist, not the patient, so it is never placed in
     quotation marks or attributed to the patient here).
   - Theme labels (COMFORT & RELIEF / CONFIDENCE & CHANGE / BETTER
     THAN EXPECTED) are editorial descriptors of the recordings, not
     quotations, and are never rendered with quotation marks.
   - The full spoken transcripts are internal research material only
     and must never be displayed, linked or downloadable from the
     site.
   - The Google review excerpt is reproduced verbatim from the
     supplied review; no location, treatment or date is invented.
   ------------------------------------------------------------------ */

type Story = {
  index: string;
  theme: string;
  quote: string;
  video: string;
  place: string;
};

const stories: Story[] = [
  {
    index: "01",
    theme: "Comfort & relief",
    quote: "Not at all, not at all.",
    video: "/assets/happy-patients/Neodent dental hospital Hyderabad -Happy Patients after treatment.mp4",
    place: "Hyderabad",
  },
  {
    index: "02",
    theme: "Confidence & change",
    quote: "It was very beneficial, and I am feeling good.",
    video: "/assets/happy-patients/Neodent dental hospital Mehdipatnam - Happy Patients after treatment.mp4",
    place: "Mehdipatnam",
  },
  {
    index: "03",
    theme: "Better than expected",
    quote: "It went even better than we expected.",
    video: "/assets/happy-patients/Neodent dental hospital Nampally- Happy Patients after treatment.mp4",
    place: "Nampally",
  },
];

export function PatientStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const active = stories[activeIndex];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Play/pause the featured film based on section visibility, matching
  // ClinicalLeadership's pattern -- resource-conscious autoplay rather
  // than a permanently running background loop.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void videoRef.current?.play().catch(() => undefined);
        else videoRef.current?.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const selectStory = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;

    if (prefersReducedMotion) {
      setActiveIndex(nextIndex);
      setPlaying(true);
      return;
    }

    // Crossfade as one coordinated unit: fade the stage out, swap the
    // story once hidden, then fade back in. The frame keeps its fixed
    // aspect ratio throughout, so section height never jumps.
    setSwitching(true);
    window.setTimeout(() => {
      setActiveIndex(nextIndex);
      setPlaying(true);
      window.setTimeout(() => setSwitching(false), 20);
    }, 220);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="stories"
      aria-labelledby="stories-title"
    >
      {/* Patient-story / quotation / editorial-dossier geometry --
          deliberately distinct from Section 02's archive/arch motif,
          Section 03's clinical drafting grid and Section 04's portrait
          framing: an oversized translucent quotation glyph, two quiet
          conversation arcs and a registration hairline, nothing
          figurative (no speech bubbles, no tooth icons). */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.quoteGlyph}>&ldquo;</span>
        <span className={styles.arc + " " + styles.arcOuter} />
        <span className={styles.arc + " " + styles.arcInner} />
        <span className={styles.registration} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">05</span>
          <div className={styles.eyebrow}>Patient experiences / Real stories</div>
          <h2 id="stories-title" className={styles.title}>
            What patients say.
            <br />
            <span>In their own words.</span>
          </h2>
          <p className={styles.lede}>
            Real experiences from patients who trusted NeoDent with their care.
          </p>
        </header>

        <div className={styles.stage}>
          <div className={styles.filmColumn}>
            <figure
              className={`${styles.film} ${switching ? styles.filmSwitching : ""}`}
            >
              <div className={styles.frame}>
                <span className={styles.frameRegistration} aria-hidden="true" />
                <video
                  ref={videoRef}
                  key={active.video}
                  src={active.video}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  aria-label={`Patient testimonial film — ${active.theme}`}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
                <div className={styles.frameTop}>
                  <span>{active.index} / PATIENT FILM</span>
                  <span>{active.place}</span>
                </div>
                <button
                  type="button"
                  className={styles.control}
                  onClick={togglePlayback}
                  aria-label={playing ? "Pause patient film" : "Play patient film"}
                >
                  {playing ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>

              {/* The quote plate overlaps the frame's bottom-left corner
                  directly (no caption line breaks the seam) so video,
                  theme and quote read as one editorial object rather
                  than a caption sitting apart from the image. The
                  location/caption text lives in frameTop instead, so
                  nothing else competes with this join. */}
              <div
                className={`${styles.quotePlate} ${switching ? styles.quotePlateSwitching : ""}`}
              >
                <span className={styles.quotePlateGlyph} aria-hidden="true">
                  &ldquo;
                </span>
                <span className={styles.quotePlateIndex}>{active.index}</span>
                <p className={styles.quotePlateTheme}>{active.theme}</p>
                <p className={styles.quotePlateQuote}>{active.quote}</p>
              </div>
            </figure>
          </div>

          <div className={styles.rail}>
            <nav className={styles.selector} aria-label="Choose a patient story">
              <ol>
                {stories.map((story, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={story.index}>
                      <button
                        type="button"
                        className={`${styles.selectorItem} ${isActive ? styles.selectorItemActive : ""}`}
                        onClick={() => selectStory(index)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`Story ${story.index}: ${story.theme}`}
                      >
                        <span className={styles.selectorIndex}>{story.index}</span>
                        <span className={styles.selectorLabel}>{story.theme}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className={styles.review}>
              <p className={styles.reviewLabel}>Google / Patient review</p>
              <div className={styles.reviewStars} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} strokeWidth={1.6} />
                ))}
              </div>
              <p className={styles.reviewExcerpt}>
                &ldquo;Extremely kind, gentle and professional&hellip; he made me
                very comfortable throughout the entire visit.&rdquo;
              </p>
              <p className={styles.reviewAuthor}>— Gaddam Sanjeeva</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaRow}>
          {/* Not yet wired: a dedicated patient-stories page does not
              exist in this multipage site yet. Rendered as plain text
              (matching ExperienceIntro's "Discover Our Story" pattern)
              rather than pointing at a fake route or a self-referential
              in-page anchor, so it reads as intentional and complete
              without claiming to be interactive until that page exists. */}
          <span className={styles.cta}>
            Explore all patient stories <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}
