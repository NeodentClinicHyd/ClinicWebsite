"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import {
  directions,
  googleRating,
  nampallyDirections,
  nampallyGoogleRating,
} from "@/lib/site-data";
import styles from "./PatientStories.module.css";

/* ------------------------------------------------------------------
   Home: "What patients say" (home redesign reference, Part 6.6).

   Heading and the Google rating summary on one row, then a single
   mixed row of patient-video cards and Google review cards (owner's
   choice, option A). Desktop shows about four cards at a time with
   arrows; phones get one swipe row. Only one video plays at a time.

   SOURCE-MATERIAL INTEGRITY (re-check the originals before editing):
   - Google reviews are reproduced verbatim (spelling and punctuation
     unchanged), with the reviewer's name as shown on Google. All were
     supplied by the owner. Never invent a review, a reviewer, a date
     or a branch.
   - Video captions are the patients' own words. For the Mehdipatnam
     film the line "your confidence increases" is spoken by the
     dentist, not the patient, so it is never quoted here. The full
     spoken transcripts are internal material and are never shown,
     linked or offered for download.
   - The videos and the written reviews come from different patients.
   - Ratings and counts are screenshot values from the two Google
     listings (lib/site-data.ts), hence the "may have changed" note.
   ------------------------------------------------------------------ */

type Review = {
  kind: "review";
  author: string;
  /** Verbatim review text. An ellipsis marks an excerpt. */
  text: string;
  /** Star rating shown on Google, 1 to 5. */
  rating: number;
};

type Video = {
  kind: "video";
  id: string;
  src: string;
  quote: string;
  /** Branch named in the film's file name; omitted when it names none. */
  place?: string;
  /** object-position for the 4:5 crop of the 9:16 source. */
  focal: string;
  /** Optional zoom (transform-origin = focal) for a tighter crop. */
  zoom?: number;
};

const VIDEO_DIR = "/assets/happy-patients/";

/* Reviews interleaved with videos. Gaddam Sanjeeva's review, the one
   the section already had, stays first. */
const stories: (Review | Video)[] = [
  {
    kind: "review",
    author: "Gaddam Sanjeeva",
    text: "Extremely kind, gentle and professional\u2026 he made me very comfortable throughout the entire visit.",
    rating: 5,
  },
  {
    kind: "video",
    id: "hyderabad",
    src: `${VIDEO_DIR}Neodent dental hospital Hyderabad -Happy Patients after treatment.mp4`,
    quote: "Not at all, not at all.",
    // The face is blurred in the upper third: zoom into the lower half
    // (gown and chair) so only the edge of the blur shows.
    focal: "50% 95%",
    zoom: 1.3,
  },
  {
    kind: "review",
    author: "Mohammed Shariq yezdani",
    text: "I was advised extraction of my teeth but the Doctor here saved the teeth and gave supporting crowns and changed my smile. I'm very happy.",
    rating: 5,
  },
  {
    kind: "video",
    id: "mehdipatnam",
    src: `${VIDEO_DIR}Neodent dental hospital Mehdipatnam - Happy Patients after treatment.mp4`,
    quote: "It was very beneficial, and I am feeling good.",
    place: "Mehdipatnam",
    focal: "50% 40%",
  },
  {
    kind: "review",
    author: "Khadijah",
    text: "I got my treatment done here. I had 3 sittings for RCT as well as crown. My pain is gone .Doctor here was a life saver as I had severe pain. I have gained trust in doctors here.",
    rating: 5,
  },
  {
    kind: "video",
    id: "nampally",
    src: `${VIDEO_DIR}Neodent dental hospital Nampally- Happy Patients after treatment.mp4`,
    quote: "It went even better than we expected.",
    place: "Nampally",
    focal: "50% 50%",
  },
  {
    kind: "review",
    author: "Mdshoaibuddin Uddin",
    text: "We consulted Dr. Siraj ur Rahman for my mother\u2019s dental treatment, and we are very satisfied with his care. He explained everything clearly, especially about fixing caps to her teeth, which gave us great confidence. His professional approach and kind explanation made the treatment experience very comfortable. Highly recommended!",
    rating: 5,
  },
  {
    kind: "review",
    author: "Shivaji Prasad Jaiswal",
    text: "I went to neodent dental clinic in nampally Dr miftah is so knowledgeable and he explained very well each and every procedure Dr miftah help me choosing the right treatment plan Dr miftah very calm ,polite nature dr I would definitely recommend this clinic to everyone who might be looking for a quick , efficient treatment",
    rating: 5,
  },
];

const clinics = [
  { name: "Mehdipatnam", score: Number(googleRating.score), count: googleRating.count, href: directions },
  { name: "Nampally", score: Number(nampallyGoogleRating.score), count: nampallyGoogleRating.count, href: nampallyDirections },
];
const totalReviews = googleRating.count + nampallyGoogleRating.count;

/* Video rules (reference Part 3.4): muted, inline, looping; a video
   plays only while at least half of it is on screen, and only one
   plays at a time (the most visible one); never autoplays under
   prefers-reduced-motion or Save-Data. No posters exist for these
   films, so they preload metadata only, to show a first frame. */
function useVideoGroup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  // Videos the visitor paused: scrolling back does not restart them.
  const userPaused = useRef(new Set<string>());
  // The video the visitor last started by hand wins while it is in view.
  const preferred = useRef<string | null>(null);
  const ratios = useRef(new Map<string, number>());

  const videosIn = (root: HTMLElement) =>
    [...root.querySelectorAll<HTMLVideoElement>("video[data-video-id]")];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const videos = videosIn(root);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData,
    );
    if (typeof IntersectionObserver === "undefined") return;
    // Under reduced motion or Save-Data nothing autoplays, but a video
    // the visitor started still pauses once it leaves the screen.
    const autoplay = !reduce && !saveData;

    const inView = (id: string) => (ratios.current.get(id) ?? 0) >= 0.5;
    const pick = () => {
      if (!autoplay) {
        for (const v of videos) {
          if (!v.paused && !inView(v.dataset.videoId!)) v.pause();
        }
        return;
      }
      let best: string | null = null;
      if (preferred.current && inView(preferred.current)) {
        best = preferred.current;
      } else {
        let bestRatio = 0;
        for (const v of videos) {
          const id = v.dataset.videoId!;
          const r = ratios.current.get(id) ?? 0;
          if (inView(id) && !userPaused.current.has(id) && r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
      }
      for (const v of videos) {
        if (v.dataset.videoId === best) {
          if (v.paused) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).querySelector("video")?.dataset.videoId;
          if (id) ratios.current.set(id, e.intersectionRatio);
        }
        pick();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    // Observe each card's frame, not the video: a zoomed video's box is
    // larger than what is visible, which would understate its ratio.
    videos.forEach((v) => v.parentElement && observer.observe(v.parentElement));
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => {
    const root = rootRef.current;
    if (!root) return;
    const videos = videosIn(root);
    const video = videos.find((v) => v.dataset.videoId === id);
    if (!video) return;
    if (video.paused) {
      userPaused.current.delete(id);
      preferred.current = id;
      videos.forEach((v) => v !== video && v.pause());
      video.play().catch(() => {});
    } else {
      userPaused.current.add(id);
      if (preferred.current === id) preferred.current = null;
      video.pause();
    }
  };

  /* Sound. Videos always start muted: browsers block autoplay with
     sound. The visitor's click is the gesture that allows audio, so
     unmuting also starts that video and makes it the playing one.
     Only one video has sound at a time. */
  const [soundId, setSoundId] = useState<string | null>(null);
  const toggleSound = (id: string) => {
    const root = rootRef.current;
    if (!root) return;
    const videos = videosIn(root);
    const video = videos.find((v) => v.dataset.videoId === id);
    if (!video) return;
    if (!video.muted) {
      video.muted = true;
      setSoundId(null);
      return;
    }
    videos.forEach((v) => {
      if (v !== video) {
        v.muted = true;
        v.pause();
      }
    });
    video.muted = false;
    setSoundId(id);
    userPaused.current.delete(id);
    preferred.current = id;
    video.play().catch(() => {
      // Some browsers still refuse; fall back to muted playback.
      video.muted = true;
      setSoundId(null);
      video.play().catch(() => {});
    });
  };

  return { rootRef, playingId, setPlayingId, toggle, soundId, toggleSound };
}

/* Tracks whether the row overflows and where it is scrolled, for the
   previous / next buttons. */
function useRowScroll() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scrollable: false, atStart: true, atEnd: true });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      setState({
        scrollable: max > 1,
        atStart: row.scrollLeft <= 1,
        atEnd: row.scrollLeft >= max - 1,
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(row);
    if (row.firstElementChild) resize.observe(row.firstElementChild);
    row.addEventListener("scroll", update, { passive: true });
    return () => {
      resize.disconnect();
      row.removeEventListener("scroll", update);
    };
  }, []);

  // Scrolls by about one viewport of cards, snapping to the next card.
  const step = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: dir * row.clientWidth * 0.75, behavior: reduce ? "auto" : "smooth" });
  };

  return { rowRef, ...state, step };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={0}
          aria-hidden="true"
          className={i < rating ? styles.starOn : styles.starOff}
        />
      ))}
    </span>
  );
}

/* Long reviews show six lines; the rest sits behind "Read more" and
   stays in the DOM (reference Part 3.4). */
function ReviewCard({ review }: { review: Review }) {
  const textRef = useRef<HTMLQuoteElement>(null);
  const [clamped, setClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <li className={styles.card} data-story-card data-kind="review">
      <figure className={styles.cardInner}>
        <div className={styles.cardHead}>
          <span className={styles.googleMark} aria-hidden="true">
            <span>G</span>
            <span>o</span>
            <span>o</span>
            <span>g</span>
            <span>l</span>
            <span>e</span>
          </span>
          <span className={styles.cardKind}>Google review</span>
        </div>
        <Stars rating={review.rating} />
        <blockquote
          ref={textRef}
          className={styles.cardText}
          data-expanded={expanded || undefined}
        >
          &ldquo;{review.text}&rdquo;
        </blockquote>
        {(clamped || expanded) && (
          <button
            type="button"
            className={styles.readMore}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
        <figcaption className={styles.cardAuthor}>{review.author}</figcaption>
      </figure>
    </li>
  );
}

function VideoCard({
  video,
  playing,
  sound,
  onToggle,
  onToggleSound,
  onPlayState,
}: {
  video: Video;
  playing: boolean;
  sound: boolean;
  onToggle: () => void;
  onToggleSound: () => void;
  onPlayState: (playing: boolean) => void;
}) {
  const label = video.place ? `Patient video, ${video.place}` : "Patient video";
  const name = label.toLowerCase();
  return (
    <li className={`${styles.card} ${styles.videoCard}`} data-story-card data-kind="video">
      <figure className={styles.videoInner}>
        <video
          data-video-id={video.id}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            objectPosition: video.focal,
            ...(video.zoom
              ? { transform: `scale(${video.zoom})`, transformOrigin: video.focal }
              : null),
          }}
          aria-label={`${label}: a patient after treatment at Neodent`}
          onPlay={() => onPlayState(true)}
          onPause={() => onPlayState(false)}
        />
        <div className={styles.videoControls}>
          <button
            type="button"
            className={styles.videoControl}
            onClick={onToggleSound}
            aria-pressed={sound}
            aria-label={sound ? `Mute ${name}` : `Turn on sound for ${name}`}
          >
            {sound ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={styles.videoControl}
            onClick={onToggle}
            aria-label={playing ? `Pause ${name}` : `Play ${name}`}
          >
            {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          </button>
        </div>
        <figcaption className={styles.videoCaption}>
          <span className={styles.videoQuote}>&ldquo;{video.quote}&rdquo;</span>
          <span className={styles.videoMeta}>{label}</span>
        </figcaption>
      </figure>
    </li>
  );
}

export function PatientStories() {
  const { rootRef, playingId, setPlayingId, toggle, soundId, toggleSound } = useVideoGroup();
  const { rowRef, scrollable, atStart, atEnd, step } = useRowScroll();

  return (
    <section className={styles.section} id="stories" aria-labelledby="stories-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <Reveal as="h2" variant="mask" stagger={90} id="stories-title" className={styles.title}>
              <span>What patients say.</span>
              <em>In their own words.</em>
            </Reveal>
            {/* Lede restored from the baseline (ledger home-te2b25f9f). */}
            <Reveal as="p" delay={80} className={styles.lede}>
              Real experiences from patients who trusted Neodent with their care.
            </Reveal>
          </div>

          <Reveal delay={120} className={styles.summary}>
            <ul className={styles.clinics} aria-label="Google ratings by clinic">
              {clinics.map((clinic) => (
                <li key={clinic.name}>
                  <a
                    className={styles.clinic}
                    href={clinic.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Neodent ${clinic.name}: rated ${clinic.score} out of 5 from ${clinic.count} Google reviews. Open on Google Maps (opens in a new tab)`}
                  >
                    <span className={styles.score}>
                      <CountUp to={clinic.score} decimals={1} duration={1100} />
                      <Star size={18} strokeWidth={0} aria-hidden="true" className={styles.scoreStar} />
                    </span>
                    <span className={styles.clinicMeta}>
                      <span className={styles.clinicName}>
                        {clinic.name}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                      <span className={styles.clinicCount}>{clinic.count} reviews</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.total}>
              <strong>
                <CountUp to={totalReviews} duration={1300} /> reviews
              </strong>{" "}
              across both clinics.{" "}
              <span className={styles.note}>
                Rating as shown on the Google listing; it may have changed since.
              </span>
            </p>
          </Reveal>
        </div>

        <div className={styles.stories} ref={rootRef}>
          <div
            ref={rowRef}
            className={styles.row}
            data-story-row
            tabIndex={scrollable ? 0 : undefined}
            role={scrollable ? "region" : undefined}
            aria-label={scrollable ? "Patient videos and Google reviews, scroll sideways for more" : undefined}
          >
            <Reveal as="ul" stagger={80} className={styles.list}>
              {stories.map((story) =>
                story.kind === "review" ? (
                  <ReviewCard key={story.author} review={story} />
                ) : (
                  <VideoCard
                    key={story.id}
                    video={story}
                    playing={playingId === story.id}
                    sound={soundId === story.id}
                    onToggle={() => toggle(story.id)}
                    onToggleSound={() => toggleSound(story.id)}
                    onPlayState={(on) =>
                      setPlayingId((cur) => (on ? story.id : cur === story.id ? null : cur))
                    }
                  />
                ),
              )}
            </Reveal>
          </div>
          {scrollable && (
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => step(-1)}
                disabled={atStart}
                aria-label="Previous stories"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => step(1)}
                disabled={atEnd}
                aria-label="More stories"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
