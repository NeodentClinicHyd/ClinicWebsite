"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Phone, Play, Star } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import {
  ESTABLISHED_YEAR,
  HERO_AUTOPLAY_MS,
  type HeroRecordItem,
  ctaPhone,
  ctaTelPhone,
  googleRating,
  heroBranches,
  heroRecordItems,
  heroPortraitImage,
  heroSlideMeta,
} from "@/lib/site-data";

/* ------------------------------------------------------------------
   Home hero: three slides, one shared layout.

   Every slide has the same parts in the same places: eyebrow, headline,
   one supporting line, the two actions, then its media. All slides sit
   in one CSS grid cell, so the hero is always as tall as the tallest
   slide and the page never jumps when a slide changes.

   Autoplay: the active dot's fill is a CSS animation that runs for
   HERO_AUTOPLAY_MS; when it ends, the next slide shows. Pausing is
   animation-play-state, so the dot and the timer can never drift.
   Autoplay pauses on mouse hover, keyboard focus, touch, the pause
   button and while the hero is off screen. It never starts under
   prefers-reduced-motion.

   Motion: the headlines and the portrait use <Reveal variant="mask">
   for the line-mask markup. Reveal shows content that is already on
   screen at mount without animating it (no flash on load), so the
   hero runs the mask animation itself in CSS, keyed to
   .hero-slide-active. That also replays it on every slide change.
   The portrait, the glass cards and the photo plates use the same
   approach (rise, fade, stagger), all in the hero block of globals.css.

   Background (P1b): one backdrop per slide, stacked behind the slides
   and crossfaded with them. Each has a red glow behind the media, a
   faint secondary glow at the bottom-left and the dental icon pattern,
   masked so it fades out before the headline. Per-slide values are CSS
   custom properties on .hero-bg-<variant>.
   ------------------------------------------------------------------ */

const SLIDE_VARIANTS = ["founder", "place", "record"] as const;
const SLIDE_COUNT = heroSlideMeta.length;
const SWIPE_MIN_PX = 48;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function HeroActions() {
  return (
    <div className="hero-actions">
      <AppButton href={ctaTelPhone} variant="primary" className="hero-primary">
        Call for Consultation <ArrowRight size={15} aria-hidden="true" />
      </AppButton>
      <Link href="/contact" className="button button-ghost hero-secondary">
        Send an enquiry
      </Link>
    </div>
  );
}

function Eyebrow() {
  return <p className="hero-eyebrow">Neodent Dental Hospital</p>;
}

type SlideProps = {
  index: number;
  active: number;
  variant: "founder" | "place" | "record";
  labelledBy: string;
  children: ReactNode;
};

function Slide({ index, active, variant, labelledBy, children }: SlideProps) {
  const isActive = index === active;
  return (
    // A <div>, not <article>: role="group" is not allowed on <article>
    // (axe aria-allowed-role), and the slide is a carousel group.
    <div
      className={`hero-slide hero-slide-${variant}${isActive ? " hero-slide-active" : ""}`}
      role="group"
      aria-roledescription="slide"
      aria-labelledby={labelledBy}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <div className="container hero-slide-inner">{children}</div>
    </div>
  );
}

/* Photos get the caption on a dark gradient over their lower edge.
   The press cutting is a document: it stays whole and readable, so its
   caption sits on a solid band below the cutting inside the same card. */
function RecordFigure({ item }: { item: HeroRecordItem }) {
  const isDocument = item.kind === "document";
  return (
    <figure
      className={`hero-plate hero-record-plate hero-record-item-${item.id}${
        isDocument ? " hero-plate-document" : ""
      }`}
    >
      <div className="hero-plate-media">
        <Image
          className={isDocument ? "hero-record-photo" : "hero-record-photo hero-zoom"}
          src={item.src}
          alt={item.alt}
          fill
          sizes={item.sizes}
          style={{
            objectFit: isDocument ? "contain" : "cover",
            objectPosition: item.focal ?? "50% 50%",
          }}
        />
      </div>
      <figcaption className="hero-plate-caption">
        <strong>{item.caption}</strong>
      </figcaption>
    </figure>
  );
}

const [recordPress, ...recordSide] = heroRecordItems;

export function Hero() {
  const [active, setActive] = useState(0);
  /* Bumped on every change so the active dot's fill restarts even when
     the same index is chosen again. */
  const [cycle, setCycle] = useState(0);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDE_COUNT) % SLIDE_COUNT);
    setCycle((c) => c + 1);
  }, []);
  const goRelative = (delta: number) => goTo(active + delta);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION);
    const sync = () => setCanAutoplay(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = hovered || focused || touching || userPaused || !inView;

  const onFocus = (e: FocusEvent<HTMLElement>) => {
    // Keyboard focus only: a mouse click on a dot should not leave the
    // slideshow paused once the pointer has moved away.
    if (e.target.matches(":focus-visible")) setFocused(true);
  };
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setTouching(true);
  };
  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    setTouching(false);
    const start = touchStart.current;
    touchStart.current = null;
    const t = e.changedTouches[0];
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goRelative(dx < 0 ? 1 : -1);
    }
  };

  const onDotsKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const buttons = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
    const from = Math.max(0, buttons.indexOf(e.target as HTMLButtonElement));
    const next = (from + (e.key === "ArrowRight" ? 1 : -1) + SLIDE_COUNT) % SLIDE_COUNT;
    goTo(next);
    buttons[next]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="home"
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      data-autoplay={canAutoplay ? "true" : "false"}
      data-paused={paused ? "true" : "false"}
      style={{ "--hero-autoplay": `${HERO_AUTOPLAY_MS}ms` } as CSSProperties}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={onFocus}
      onKeyUp={() => setFocused(true)}
      onBlur={onBlur}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => setTouching(false)}
    >
      <div className="hero-backdrop" aria-hidden="true">
        {/* Alpha levels for the icon pattern (P1c): the tile's dark ground
            (alpha about 0.13 through the luminance mask) maps to 0 and its
            lines (up to about 0.34) to about 0.7, so the icons read as
            lines instead of a uniform lift. Used by .hero-bg-pattern. */}
        <svg className="hero-pattern-filter" width="0" height="0" focusable="false">
          <filter id="hero-pattern-levels" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5"
            />
          </filter>
        </svg>
        {SLIDE_VARIANTS.map((variant, index) => (
          <div
            key={variant}
            className={`hero-bg hero-bg-${variant}${index === active ? " hero-bg-active" : ""}`}
          >
            <span className="hero-bg-glow" />
            <span className="hero-bg-pattern">
              <span className="hero-bg-tile" />
            </span>
          </div>
        ))}
      </div>

      <div className="hero-slides">
        {/* Slide 1: the founder and the clinic's 1994 benchmark. */}
        <Slide index={0} active={active} variant="founder" labelledBy="hero-title">
          <div className="hero-copy">
            <Eyebrow />
            <Reveal
              as="h1"
              id="hero-title"
              variant="mask"
              stagger={90}
              className="hero-title hero-title-primary"
            >
              <span>Three decades</span>
              <span className="serif">of changing smiles.</span>
            </Reveal>
            <p className="hero-sub">
              Specialist dental care in Hyderabad{"\u00A0"}· Since{"\u00A0"}
              {ESTABLISHED_YEAR}
            </p>
            <div className="hero-founder-meta">
              <p className="hero-founder-name">
                <strong>Dr. Mohd. Siraj Ur Rahman</strong>
                <span>Dental Surgeon · Prosthodontist · Implantologist</span>
              </p>
              <p className="hero-rating" data-testid="text-hero-rating">
                <span className="hero-rating-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="hero-rating-score">{googleRating.score}</span>
                <span className="hero-rating-divider" aria-hidden="true">
                  ·
                </span>
                <span>{googleRating.count} Google reviews</span>
              </p>
            </div>
            <HeroActions />
          </div>

          <div className="hero-media hero-founder-media">
            {/* The portrait stands on a stage: a soft red spotlight and a
                ground shadow behind it, no frame. The clip box fades the
                lower part of the cut-out into the background. */}
            <div className="hero-founder-stage">
              <span className="hero-founder-spotlight" aria-hidden="true" />
              <span className="hero-founder-ground" aria-hidden="true" />
              <div className="hero-founder-clip">
                <div className="hero-founder-figure">
                  <Image
                    className="hero-founder-portrait"
                    src={heroPortraitImage}
                    alt="Dr. Mohd. Siraj Ur Rahman, BDS, FCIP, MDS, Director of Neodent Dental Hospital, Hyderabad"
                    fill
                    preload
                    sizes="(max-width: 767px) 104vw, (max-width: 1023px) 66vw, 700px"
                    data-media-exempt=""
                  />
                </div>
              </div>
              <p className="hero-glass hero-glass-since">
                <strong>Since {ESTABLISHED_YEAR}</strong>
                <span>
                  Mehdipatnam <i aria-hidden="true">·</i> Nampally
                </span>
              </p>
              <a
                href={ctaTelPhone}
                className="hero-glass hero-glass-call"
                data-testid="link-hero-call-card"
              >
                <span className="hero-glass-call-icon" aria-hidden="true">
                  <Phone size={15} />
                </span>
                <span className="hero-glass-call-text">
                  <span>Call today for a consultation</span>
                  <strong>{ctaPhone}</strong>
                </span>
              </a>
            </div>
          </div>
        </Slide>

        {/* Slide 2: the two clinics. Each photo card is a link to the
            branch page, with the caption on the photo. */}
        <Slide index={1} active={active} variant="place" labelledBy="hero-place-title">
          <div className="hero-copy">
            <Eyebrow />
            <Reveal
              as="h2"
              id="hero-place-title"
              variant="mask"
              stagger={90}
              className="hero-title hero-title-secondary"
            >
              <span>Two clinics.</span>
              <span className="serif">One standard of care.</span>
            </Reveal>
            <p className="hero-sub">Visit us in Mehdipatnam or Nampally, Hyderabad.</p>
            <HeroActions />
          </div>

          <ul className="hero-media hero-branches" aria-label="Our clinics">
            {heroBranches.map((branch) => (
              <li key={branch.id} className={`hero-branch-item hero-branch-${branch.id}`}>
                <Link href={branch.href} className="hero-plate hero-branch">
                  <span className="hero-plate-media">
                    <Image
                      className="hero-zoom"
                      src={branch.photo.src}
                      alt={branch.photo.alt}
                      fill
                      sizes="(max-width: 1023px) 46vw, 400px"
                      style={{ objectFit: "cover", objectPosition: branch.photo.focal }}
                    />
                  </span>
                  <span className="hero-plate-caption">
                    <span className="hero-plate-text">
                      <strong>{branch.name}</strong>
                      <small>{branch.descriptor}</small>
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Slide>

        {/* Slide 3: public record. Captions name the outlet, never a
            person (see heroRecordItems). The cutting is shown whole. */}
        <Slide index={2} active={active} variant="record" labelledBy="hero-record-title">
          <div className="hero-copy">
            <Eyebrow />
            <Reveal
              as="h2"
              id="hero-record-title"
              variant="mask"
              stagger={90}
              className="hero-title hero-title-secondary"
            >
              <span>Recognised beyond</span>
              <span>
                the <span className="serif">clinic.</span>
              </span>
            </Reveal>
            <p className="hero-sub">Documented in print and on air.</p>
            <HeroActions />
          </div>

          <div className="hero-media hero-record">
            {recordPress ? <RecordFigure item={recordPress} /> : null}
            <div className="hero-record-side">
              {recordSide.map((item) => (
                <RecordFigure key={item.id} item={item} />
              ))}
            </div>
          </div>
        </Slide>
      </div>

      <div className="hero-controls">
        <div className="container hero-controls-inner">
          <div
            className="hero-dots"
            role="group"
            aria-label="Choose a slide"
            onKeyDown={onDotsKeyDown}
          >
            {heroSlideMeta.map((slide, index) => {
              const isActive = index === active;
              return (
                <button
                  key={slide.id}
                  type="button"
                  className="hero-dot"
                  onClick={() => goTo(index)}
                  aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}: ${slide.label}`}
                  aria-current={isActive ? "true" : undefined}
                  data-testid={`button-hero-dot-${slide.id}`}
                >
                  <span className="hero-dot-track" aria-hidden="true">
                    {isActive ? (
                      <span
                        key={cycle}
                        className="hero-dot-fill"
                        onAnimationEnd={
                          canAutoplay ? () => goTo(active + 1) : undefined
                        }
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
          {canAutoplay ? (
            <button
              type="button"
              className="hero-pause"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              data-testid="button-hero-pause"
            >
              {userPaused ? (
                <Play size={14} aria-hidden="true" />
              ) : (
                <Pause size={14} aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
