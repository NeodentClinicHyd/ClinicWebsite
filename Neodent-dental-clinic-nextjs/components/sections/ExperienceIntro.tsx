"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Crosshair,
  HeartHandshake,
  Leaf,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import {
  ESTABLISHED_YEAR,
  googleRating,
  nampallyGoogleRating,
  tourVideo,
  tourVideoPoster,
  tourVideoSegment,
  yearsSinceEstablished,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/* ------------------------------------------------------------------
   Home Section 01: the stat strip, "Care begins the moment you walk
   in" and one tour video (home redesign reference, Part 6.2).

   Stat strip, in this order (reference Part 7):
   - years since ESTABLISHED_YEAR, calculated, never hard-coded
   - 2 clinics (Mehdipatnam and Nampally)
   - Google reviews across both clinics: googleRating.count (Mehdipatnam,
     261) + nampallyGoogleRating.count (Nampally, 157). These are
     screenshot values from the Google listings and may have changed,
     hence the note under the strip.
   - "25,000+ patients treated" is client-supplied and must be verified
     before launch (reference Part 8).
   ------------------------------------------------------------------ */
const reviewCount = googleRating.count + nampallyGoogleRating.count;

const stats: {
  key: string;
  to: number;
  suffix?: string;
  label: string;
  /** Optional second line under the label. */
  note?: string;
}[] = [
  {
    key: "years",
    to: yearsSinceEstablished(),
    label: `years of specialist care, since ${ESTABLISHED_YEAR}`,
  },
  {
    key: "clinics",
    to: 2,
    label: "clinics, Mehdipatnam and Nampally",
    // Restored from the pre-redesign strip (SEO ledger home-t1b1f4faf).
    note: "Multi-speciality clinic",
  },
  { key: "reviews", to: reviewCount, label: "Google reviews across both clinics" },
  // Client-supplied figure: must be verified before launch.
  { key: "patients", to: 25000, suffix: "+", label: "patients treated" },
];

const careQualities: { name: string; text: string; icon: LucideIcon }[] = [
  { name: "Calm", text: "An unhurried pace, a reassuring space.", icon: Leaf },
  { name: "Precise", text: "Careful diagnosis, exact and clear work.", icon: Crosshair },
  { name: "Personal", text: "Every plan shaped around you.", icon: HeartHandshake },
];

/* Tour video rules (reference Part 3.4): muted, inline, looping,
   preload="none" with a poster; plays only while at least half of it is
   on screen; never autoplays under prefers-reduced-motion or Save-Data.
   Playback is held to tourVideoSegment (see lib/site-data.ts). */
function useTourVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Set once the visitor presses pause, so scrolling back does not
  // restart a video they stopped.
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const { start, end } = tourVideoSegment;

    const keepInSegment = () => {
      if (video.currentTime < start - 0.25 || video.currentTime >= end) {
        video.currentTime = start;
      }
    };
    video.addEventListener("loadedmetadata", keepInSegment);
    video.addEventListener("timeupdate", keepInSegment);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData,
    );
    let observer: IntersectionObserver | undefined;
    if (!reduce && !saveData && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.5) {
            if (!userPaused.current) video.play().catch(() => {});
          } else if (!video.paused) {
            video.pause();
          }
        },
        { threshold: [0, 0.5] },
      );
      observer.observe(video);
    }

    return () => {
      observer?.disconnect();
      video.removeEventListener("loadedmetadata", keepInSegment);
      video.removeEventListener("timeupdate", keepInSegment);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return { videoRef, isPlaying, setIsPlaying, toggle };
}

export function ExperienceIntro() {
  const { videoRef, isPlaying, setIsPlaying, toggle } = useTourVideo();

  return (
    <section className="exp-intro" aria-labelledby="exp-intro-title">
      <div className="container">
        <div className="exp-intro-stats-wrap">
          <p className="exp-intro-stats-title" id="exp-intro-stats-title">
            Why Neodent
          </p>
          <Reveal
            as="ul"
            className="exp-intro-stats"
            stagger={70}
            aria-labelledby="exp-intro-stats-title"
          >
            {stats.map(({ key, to, suffix, label, note }) => (
              <li className="exp-intro-stat" key={key}>
                <span className="exp-intro-stat-value">
                  <CountUp to={to} suffix={suffix} />
                </span>
                <span className="exp-intro-stat-label">{label}</span>
                {note ? <span className="exp-intro-stat-note">{note}</span> : null}
              </li>
            ))}
          </Reveal>
          <p className="exp-intro-stats-note">
            Review count as shown on the Google listings; it may have changed since.
          </p>
        </div>

        <div className="exp-intro-grid">
          <div className="exp-intro-copy">
            <Reveal
              as="h2"
              id="exp-intro-title"
              className="exp-intro-title"
              variant="mask"
              stagger={90}
            >
              <span>Care begins the moment</span>
              <span className="exp-intro-title-accent">you walk in.</span>
            </Reveal>

            <Reveal className="exp-intro-body" stagger={80} delay={120}>
              <p className="exp-intro-lede section-lede">
                From the first step inside, Neodent is designed around a{" "}
                <EditorialHighlight tone="primary">calmer, more reassuring</EditorialHighlight>{" "}
                dental experience.
              </p>
              <p className="exp-intro-lede section-lede">
                You are guided through each stage with{" "}
                <EditorialHighlight tone="secondary">clear explanations</EditorialHighlight>,
                and the same specialist-led care follows you from your first visit
                through to treatment and beyond. Whether you visit Mehdipatnam or
                Nampally, the standard is the same.
              </p>
            </Reveal>

            {/* Supporting copy from the pre-redesign intro (SEO ledger
                home-te69bb48e, home-t92a38f2e, home-t586fad82). Native
                <details>: the text is in the server-rendered HTML. */}
            <details className="home-more exp-intro-more">
              <summary>Read more about your visit</summary>
              <div className="home-more-body">
                <p>
                  Clinical expertise meets thoughtful care. You&apos;re guided
                  through each stage with clear explanations, not simply moved
                  through a procedure, and that same continuity carries from
                  your first visit through to the care that follows.
                </p>
                <p>
                  Every detail is considered to make your visit feel calmer,
                  clearer and more personal — from arrival to care.
                </p>
              </div>
            </details>

            <Reveal
              as="ul"
              className="exp-intro-qualities"
              aria-label="Our care philosophy"
              delay={200}
            >
              {careQualities.map(({ name, text, icon: Icon }) => (
                <li className="exp-intro-quality" key={name}>
                  <span className="exp-intro-quality-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="exp-intro-quality-body">
                    <span className="exp-intro-quality-name">{name}</span>
                    <span className="exp-intro-quality-text">{text}</span>
                  </span>
                </li>
              ))}
            </Reveal>

            <Link href="/about" className="exp-intro-cta">
              Discover our story <span aria-hidden="true">→</span>
            </Link>
          </div>

          <Reveal className="exp-intro-visual" variant="fade" delay={160}>
            <div className="exp-intro-media media-frame" data-media>
              <video
                ref={videoRef}
                className="exp-intro-video"
                src={`${tourVideo}#t=${tourVideoSegment.start}`}
                poster={tourVideoPoster}
                aria-label="A short tour of a Neodent clinic: the waiting area, reception and treatment rooms"
                muted
                loop
                playsInline
                preload="none"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <button
                type="button"
                className="exp-intro-video-toggle"
                onClick={toggle}
                aria-label={isPlaying ? "Pause tour video" : "Play tour video"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
            {/* Plain caption for the tour (SEO ledger home-tc1833779). */}
            <p className="exp-intro-media-caption">Inside Neodent: hospital tour</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
