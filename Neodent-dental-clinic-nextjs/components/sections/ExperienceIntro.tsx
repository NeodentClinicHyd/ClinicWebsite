"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  Crosshair,
  HeartHandshake,
  Leaf,
  MapPin,
  Pause,
  Play,
  Smile,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { tourVideo } from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import Link from "next/link";

/* "Why Neodent" card -- edit this array to change the four cells. Icons
   come from the lucide-react set already used across the site. The
   "25,000+ smiles changed" figure is client-supplied and must be
   verified before launch. */
const whyNeodentStats: {
  value: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { value: "30+", label: "years' experience", icon: Award },
  { value: "Multi-speciality", label: "clinic", icon: Stethoscope },
  { value: "2", label: "locations", icon: MapPin },
  { value: "25,000+", label: "smiles changed", icon: Smile },
];

const careQualities: {
  name: string;
  text: string;
  icon: LucideIcon;
}[] = [
  { name: "Calm", text: "An unhurried pace, a reassuring space.", icon: Leaf },
  {
    name: "Precise",
    text: "Careful diagnosis, exact and clear work.",
    icon: Crosshair,
  },
  {
    name: "Personal",
    text: "Every plan shaped around you.",
    icon: HeartHandshake,
  },
];

export function ExperienceIntro() {
  const [isVisible, setIsVisible] = useState(false);
  // Lazy initializer reads the real preference on first client render
  // instead of setting state synchronously inside an effect; the
  // effect below only subscribes to later changes.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reveal-on-scroll, matching About.tsx / WhyNeodent.tsx's existing
  // pattern rather than the scroll-linked parallax Doctor.tsx/Experience.tsx
  // use elsewhere -- this section is deliberately calmer than those.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // prefers-reduced-motion gates autoplay: when reduced motion is
  // requested the video stays paused on its first frame instead of
  // autoplaying, and a small play/pause control lets the visitor opt in.
  // Only SUBSCRIBES to later changes here -- the initial value is read
  // by the lazy useState initializer above, not set from this effect.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Real video metadata drives the frame's aspect ratio -- never an
  // assumed 9:16. The CSS default on --tour-video-ratio only prevents
  // layout shift before this fires.
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;

    const applyRatio = () => {
      if (video.videoWidth && video.videoHeight) {
        frame.style.setProperty(
          "--tour-video-ratio",
          `${video.videoWidth} / ${video.videoHeight}`,
        );
      }
    };

    if (video.readyState >= 1) applyRatio();
    video.addEventListener("loadedmetadata", applyRatio);
    return () => video.removeEventListener("loadedmetadata", applyRatio);
  }, []);

  // isPlaying mirrors the video element's own play/pause events (wired
  // up via onPlay/onPause on the <video> below) rather than being set
  // from inside these effects, so every caller of .play()/.pause() --
  // autoplay, the visibility observer, and the manual toggle -- stays
  // in sync through one source of truth instead of three.

  // Autoplay only when motion is welcome; otherwise leave it paused on
  // its first frame until the visitor presses play.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        /* Autoplay can be blocked by the browser; the visible toggle
           still lets the visitor start playback manually. */
      });
    }
  }, [prefersReducedMotion]);

  // Pause the video once it scrolls out of view (and resume once back
  // in view, unless reduced motion asked it to stay paused) to control
  // resource usage -- a second, independent observer from the reveal
  // one above, since it needs to keep firing after the reveal happens
  // once.
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!prefersReducedMotion) {
              video.play().catch(() => {
                /* See autoplay effect above. */
              });
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {
        /* See autoplay effect above. */
      });
    } else {
      video.pause();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`exp-intro ${isVisible ? "exp-intro-visible" : ""}`}
      aria-labelledby="exp-intro-title"
    >
      <div className="exp-intro-backdrop" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/Neodent dental clinic - modern dental treatment chair.png"
          alt=""
        />
      </div>
      {/* Bespoke architectural linework -- Section 02's own arch/draft/
          registration vocabulary (see .archive-atmosphere in LegacyStory)
          recomposed as a doorway/corridor motif instead of Section 02's
          archive-arch/tooth-contour story, so both sections read as the
          same designer's drafting language without literally repeating
          either one's composition. Purely decorative: aria-hidden and
          pointer-events:none throughout. */}
      <div className="exp-intro-atmosphere" aria-hidden="true">
        <span className="exp-intro-arch exp-intro-arch-door" />
        <span className="exp-intro-arch exp-intro-arch-door-inner" />
        <span className="exp-intro-draft exp-intro-draft-horizontal" />
        <span className="exp-intro-draft exp-intro-draft-vertical" />
        <span className="exp-intro-registration" />
      </div>
      <div className="container exp-intro-why-wrap">
        {/* Visible title is a plain <p> (not a heading) so it cannot
            disturb the page's heading order; the <ul> carries the
            accessible name. Icons are decorative. */}
        <div className="exp-intro-why">
          <p className="exp-intro-why-title" aria-hidden="true">
            Why Neodent
          </p>
          <ul className="exp-intro-why-list" aria-label="Why Neodent">
            {whyNeodentStats.map(({ value, label, icon: Icon }) => (
              <li className="exp-intro-why-cell" key={value}>
                <span className="exp-intro-why-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <span className="exp-intro-why-text">
                  <span className="exp-intro-why-value">{value}</span>
                  <span className="exp-intro-why-label">{label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container exp-intro-grid">
        <div className="exp-intro-copy">
          <h2 id="exp-intro-title" className="exp-intro-title">
            <span>Care begins</span>
            <span>the moment</span>
            <span className="serif">you walk in.</span>
          </h2>
          <p className="exp-intro-lede exp-intro-lede-lead section-lede">
            From the first step inside to every stage of treatment, Neodent is
            designed around a{" "}
            <EditorialHighlight tone="primary">
              calmer, more reassuring
            </EditorialHighlight>{" "}
            dental experience.
          </p>
          <p className="exp-intro-lede section-lede">
            Clinical expertise meets thoughtful care. You&apos;re guided through
            each stage with{" "}
            <EditorialHighlight tone="secondary">
              clear explanations
            </EditorialHighlight>
            , not simply moved through a procedure, and that same{" "}
            <EditorialHighlight tone="quiet">continuity</EditorialHighlight>{" "}
            carries from your first visit through to the care that follows.
          </p>
          <p className="exp-intro-lede section-lede">
            Whether you visit Mehdipatnam or Nampally, the standard of care is
            the same.
          </p>
          <p className="exp-intro-lede section-lede">
            Every detail is considered to make your visit feel{" "}
            <EditorialHighlight tone="primary">
              calmer, clearer and more personal
            </EditorialHighlight>{" "}
            — from arrival to care.
          </p>
        </div>

        <div className="exp-intro-visual">
          <div className="exp-intro-frame" ref={frameRef}>
            <video
              ref={videoRef}
              className="exp-intro-video"
              src={tourVideo}
              aria-label="A short tour of Neodent Dental Hospital"
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              type="button"
              className="exp-intro-video-toggle"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause tour video" : "Play tour video"}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>
          </div>
          {/* Same figcaption pattern Section 02's archive plates use --
              a bold red primary label (<b>) paired with a muted <span>
              -- so this caption reads as the same media-metadata
              language, not a differently-weighted pair of labels.
              Copy unchanged. */}
          <div className="exp-intro-meta">
            <b>Neodent / Inside</b>
            <span>Hospital tour</span>
          </div>
        </div>

        <div className="exp-intro-secondary">
          <ul className="exp-intro-qualities" aria-label="Our care philosophy">
            {careQualities.map(({ name, text, icon: Icon }) => (
              <li className="exp-intro-quality" key={name}>
                <span className="exp-intro-quality-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <span className="exp-intro-quality-body">
                  <span className="exp-intro-quality-name">{name}</span>
                  <span className="exp-intro-quality-text">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container exp-intro-cta-wrap">
        {/* Not yet wired: the dedicated About / Our Story page does not
            exist in this multipage site yet. Rendered as plain text
            (not an <a> or <button>) rather than pointing at a fake
            route or the in-page #about anchor, so it is visually and
            semantically complete without claiming to be interactive
            until it can be wired to that page. Positioned after the
            qualities panel in DOM/reading order (both desktop and
            mobile) so the section closes on the CTA. */}

        <Link href="/about" className="text-link exp-intro-cta">
          Discover Our Story <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
