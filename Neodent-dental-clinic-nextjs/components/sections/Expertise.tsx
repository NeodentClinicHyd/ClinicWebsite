"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import Image from "next/image";
import { ArrowLeftRight, ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import {
  closingCta,
  defaultTreatmentVideo,
  treatmentPointsHeading,
  treatments,
  type MediaCrop,
  type Treatment,
} from "@/components/sections/expertise-data";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** Keep in sync with the .is-leaving animation in globals.css. */
const CROSSFADE_MS = 320;
/** Matches the layout breakpoint in globals.css (stacked panel below it). */
const DESKTOP = "(min-width: 1024px)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches;

/** object-position + transform-origin at the focal point, scaled by zoom. */
function cropStyle(crop?: MediaCrop): CSSProperties | undefined {
  if (!crop) return undefined;
  return {
    objectPosition: crop.focal,
    transformOrigin: crop.focal,
    transform: crop.zoom && crop.zoom !== 1 ? `scale(${crop.zoom})` : undefined,
  };
}

/** A zoomed crop shows fewer source pixels, so ask for a wider file. */
function cropSizes(crop?: MediaCrop) {
  const z = Math.max(1, crop?.zoom ?? 1);
  return `(min-width: 1024px) ${Math.round(480 * z)}px, ${Math.round(92 * z)}vw`;
}

/** Intro link to a treatment page; the anchor is the treatment's own name
    from expertise-data (rule R4), set in running-text case. */
function TreatmentLink({ slug }: { slug: string }) {
  const href = `/treatments/${slug}`;
  const treatment = treatments.find((t) => t.href === href);
  if (!treatment) return null;
  const anchor = treatment.title.replace(/ & /g, " and ").toLowerCase();
  return (
    <a href={href} className="treatment-atlas-intro-link">
      {anchor}
    </a>
  );
}

type PanelProps = {
  treatment: Treatment;
  /** False for the copy that is fading out: static, no handlers. */
  interactive: boolean;
  comparisonPosition: number;
  videoPlaying?: boolean;
  onPlay?: () => void;
  comparisonRef?: RefObject<HTMLDivElement | null>;
  onComparisonKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  onComparisonPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onComparisonPointerMove?: (event: ReactPointerEvent<HTMLDivElement>) => void;
};

function PanelContent({
  treatment,
  interactive,
  comparisonPosition,
  videoPlaying = false,
  onPlay,
  comparisonRef,
  onComparisonKeyDown,
  onComparisonPointerDown,
  onComparisonPointerMove,
}: PanelProps) {
  const hasComparison = Boolean(treatment.before) && !treatment.video;
  const poster = treatment.poster ?? treatment.visual;
  const posterCrop = treatment.poster ? treatment.posterCrop : treatment.visualCrop;

  return (
    <>
      <div className="treatment-atlas-media">
        {hasComparison ? (
          <div
            ref={interactive ? comparisonRef : undefined}
            className="treatment-atlas-comparison"
            {...(interactive
              ? {
                  role: "slider",
                  tabIndex: 0,
                  "aria-label": `Compare before and after ${treatment.title}`,
                  "aria-valuemin": 0,
                  "aria-valuemax": 100,
                  "aria-valuenow": Math.round(comparisonPosition),
                  "aria-valuetext": `${100 - Math.round(comparisonPosition)} percent after treatment visible`,
                  onKeyDown: onComparisonKeyDown,
                  onPointerDown: onComparisonPointerDown,
                  onPointerMove: onComparisonPointerMove,
                }
              : {})}
          >
            {/* Base layer: the after photo. The before photo is laid over it
                and clipped to the left of the divider, so the left half is
                always "Before" and the right half "After", matching the
                labels. */}
            <Image
              className="treatment-atlas-comparison-image"
              src={treatment.visual}
              alt={treatment.alt}
              fill
              sizes={cropSizes(treatment.visualCrop)}
              quality={75}
              draggable={false}
              style={cropStyle(treatment.visualCrop)}
            />
            <div
              className="treatment-atlas-comparison-overlay"
              style={{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }}
            >
              <Image
                className="treatment-atlas-comparison-image"
                src={treatment.before as string}
                alt={treatment.beforeAlt ?? ""}
                fill
                sizes={cropSizes(treatment.beforeCrop)}
                quality={75}
                draggable={false}
                style={cropStyle(treatment.beforeCrop)}
              />
            </div>
            <span className="treatment-atlas-comparison-label treatment-atlas-comparison-before-label">
              Before
            </span>
            <span className="treatment-atlas-comparison-label treatment-atlas-comparison-after-label">
              After
            </span>
            <span
              className="treatment-atlas-comparison-divider"
              style={{ left: `${comparisonPosition}%` }}
            >
              <span className="treatment-atlas-comparison-handle" aria-hidden="true">
                ↔
              </span>
            </span>
          </div>
        ) : treatment.video ? (
          <div className="treatment-atlas-film">
            {interactive && videoPlaying ? (
              <video
                src={treatment.videoSrc ?? defaultTreatmentVideo}
                poster={poster}
                controls
                autoPlay
                playsInline
                preload="none"
                aria-label={`${treatment.title} — Neodent clinical treatment film`}
              />
            ) : (
              <button
                type="button"
                className="treatment-atlas-film-poster"
                onClick={onPlay}
                aria-label={`Play ${treatment.title} treatment film`}
              >
                <Image
                  src={poster}
                  alt={treatment.alt}
                  fill
                  sizes={cropSizes(posterCrop)}
                  quality={75}
                  style={cropStyle(posterCrop)}
                />
                <span className="treatment-atlas-play" aria-hidden="true">
                  <Play fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        ) : (
          <div className="treatment-atlas-still">
            <Image
              src={treatment.visual}
              alt={treatment.alt}
              fill
              sizes={cropSizes(treatment.visualCrop)}
              quality={75}
              style={cropStyle(treatment.visualCrop)}
            />
          </div>
        )}
      </div>

      {hasComparison || treatment.video ? (
        <div className="treatment-atlas-meta">
          <span className="treatment-atlas-meta-hint">
            {hasComparison ? (
              <>
                <ArrowLeftRight aria-hidden="true" />
                Drag to compare
              </>
            ) : (
              "Treatment film"
            )}
          </span>
        </div>
      ) : null}

      <h3 className="treatment-atlas-panel-title">{treatment.title}</h3>
      <p className="treatment-atlas-panel-desc">{treatment.description}</p>
      {treatment.proof && <span className="treatment-atlas-tag">{treatment.proof}</span>}
      <div className="treatment-atlas-points">
        <p className="treatment-atlas-points-heading">
          <treatment.icon className="treatment-atlas-points-icon" aria-hidden="true" />
          {treatmentPointsHeading}
        </p>
        <ul>
          {treatment.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="treatment-atlas-panel-foot">
        <a href={treatment.href} className="treatment-atlas-panel-link">
          Explore treatment <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

export function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [videoPlaying, setVideoPlaying] = useState(false);
  // The previous panel, kept on screen while it fades out (crossfade).
  const [leaving, setLeaving] = useState<{ index: number; position: number } | null>(null);

  const comparisonRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const leaveTimerRef = useRef<number | undefined>(undefined);

  const active = treatments[activeIndex];

  useEffect(() => () => window.clearTimeout(leaveTimerRef.current), []);

  // Selecting a treatment resets the comparison + any playing film, and
  // crossfades from the previous panel.
  const selectIndex = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      window.clearTimeout(leaveTimerRef.current);
      if (prefersReducedMotion()) {
        setLeaving(null);
      } else {
        setLeaving({ index: activeIndex, position: comparisonPosition });
        leaveTimerRef.current = window.setTimeout(() => setLeaving(null), CROSSFADE_MS);
      }
      setActiveIndex(index);
      setComparisonPosition(50);
      setVideoPlaying(false);
    },
    [activeIndex, comparisonPosition],
  );

  // After a tap or click, bring the panel's media into view. Below 1024px
  // the panel sits under the card row, so scroll its top to just under the
  // nav whenever the media is not fully visible. On desktop the panel is
  // beside the cards, so scroll only as far as needed to show the whole
  // media frame (short laptop windows), which keeps the clicked card close.
  const revealPanel = useCallback(() => {
    const panel = panelRef.current;
    const media = panel?.querySelector(".treatment-atlas-media");
    if (!panel || !media) return;
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    const desktop = window.matchMedia(DESKTOP).matches;
    const nav = parseFloat(getComputedStyle(panel).scrollMarginTop) || 0;
    const rect = media.getBoundingClientRect();
    // Leave room for the fixed call bar on phones.
    const bottomLimit = window.innerHeight - (desktop ? 16 : 72);
    if (rect.top >= nav && rect.bottom <= bottomLimit) return;
    if (!desktop) {
      panel.scrollIntoView({ behavior, block: "start" });
      return;
    }
    const delta = rect.top < nav ? rect.top - nav : rect.bottom - bottomLimit;
    window.scrollBy({ top: delta, behavior });
  }, []);

  const handleCardClick = (index: number) => {
    selectIndex(index);
    // Wait one frame so the new panel content is laid out.
    window.requestAnimationFrame(revealPanel);
  };

  // --- Before/after compare slider ---
  const updateComparison = (clientX: number) => {
    const bounds = comparisonRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setComparisonPosition(
      Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100)),
    );
  };

  const handleComparisonKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 5;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setComparisonPosition((position) =>
        Math.min(100, Math.max(0, position + (event.key === "ArrowRight" ? step : -step))),
      );
    }
  };

  useEffect(() => {
    const stopDragging = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointerup", stopDragging);
    return () => window.removeEventListener("pointerup", stopDragging);
  }, []);

  // --- Tablist roving focus + arrow-key navigation ---
  const focusTab = useCallback(
    (index: number) => {
      selectIndex(index);
      // Bring the newly selected card into view on the mobile scroll row.
      const node = tabRefs.current[index];
      if (node) {
        node.focus();
        node.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    },
    [selectIndex],
  );

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = treatments.length;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (activeIndex + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (activeIndex - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    focusTab(next);
  };

  const leavingTreatment = leaving ? treatments[leaving.index] : null;

  return (
    // The clinical-icon texture is a CSS background on this element (see
    // .treatment-atlas in globals.css), referenced by string path so a
    // missing file cannot break the build.
    <section
      className="section treatment-atlas"
      id="expertise"
      aria-labelledby="treatment-atlas-title"
    >
      <div className="container treatment-atlas-shell">
        <header className="treatment-atlas-header">
          <h2 id="treatment-atlas-title">
            What can we <span className="serif">help you with?</span>
          </h2>
          <div className="treatment-atlas-intro">
            <p className="section-lede section-lede--on-dark">
              Whether you need a missing tooth replaced, a worn tooth restored
              or a smile rebuilt, care begins with understanding your concern
              and explaining your options clearly. Focused care for the dental
              problems that bring patients to us, from preventive care such as{" "}
              <TreatmentLink slug="scaling-and-polishing" /> to specialist work
              such as <TreatmentLink slug="dental-implants" />,{" "}
              <TreatmentLink slug="root-canal-treatment" />,{" "}
              <TreatmentLink slug="braces-and-orthodontics" />,{" "}
              <TreatmentLink slug="smile-design" />,{" "}
              <TreatmentLink slug="full-mouth-rehabilitation" /> and{" "}
              <TreatmentLink slug="composite-build-up" />. Each concern is met
              with the specialist-led expertise it calls for, and most areas
              below are shown with a real case from our clinics, so you can
              see the kind of work we do before you decide.
            </p>
            {/* Second intro paragraph from before the redesign (SEO ledger
                home-tc794eac3), in the server-rendered HTML. */}
            <details className="home-more home-more--on-dark">
              <summary>Read more about how we plan treatment</summary>
              <div className="home-more-body">
                <p>
                  The right approach is matched to what each patient needs,
                  from routine care to more complex treatment.
                </p>
              </div>
            </details>
          </div>
        </header>

        <div className="treatment-atlas-layout">
          {/* Card grid — the 7 treatment tabs plus one closing CTA card. */}
          <div className="treatment-atlas-cards">
            <Reveal className="treatment-atlas-tablist" stagger={60}>
              {/* The tablist owns only the tabs (the CTA link below may
                  not sit inside it: axe aria-required-children). It is a
                  display: contents wrapper so the tabs and the CTA stay
                  items of the same card grid; Reveal staggers through it. */}
              <div
                role="tablist"
                aria-label="Featured treatment areas"
                data-reveal-contents=""
                style={{ display: "contents" }}
              >
              {treatments.map((treatment, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={treatment.number}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`atlas-tab-${treatment.number}`}
                    aria-selected={selected}
                    aria-controls="atlas-panel"
                    tabIndex={selected ? 0 : -1}
                    className={`treatment-atlas-card ${selected ? "is-active" : ""}`}
                    onClick={() => handleCardClick(index)}
                    onKeyDown={handleTabKeyDown}
                  >
                    <span className="treatment-atlas-card-title">{treatment.title}</span>
                    <span className="treatment-atlas-card-summary">{treatment.summary}</span>
                    <span className="treatment-atlas-card-bottom">
                      <treatment.icon className="treatment-atlas-card-icon" aria-hidden="true" />
                      <span className="treatment-atlas-card-action">
                        <span className="treatment-atlas-card-intent">{treatment.intent}</span>
                        <ArrowRight className="treatment-atlas-card-arrow" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                );
              })}
              </div>

              {/* Closing CTA card — a normal link, outside the tab set. */}
              <a href={closingCta.href} className="treatment-atlas-card treatment-atlas-cta">
                <span className="treatment-atlas-cta-heading">{closingCta.heading}</span>
                <span className="treatment-atlas-cta-text">{closingCta.text}</span>
                <span className="treatment-atlas-cta-link">
                  {closingCta.linkLabel}
                  <ArrowRight aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          </div>

          {/* Detail panel — the tabpanel for the active card. */}
          <div
            ref={panelRef}
            className="treatment-atlas-panel"
            id="atlas-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`atlas-tab-${active.number}`}
            aria-live="polite"
          >
            <div className="treatment-atlas-panel-stack">
              <div key={active.number} className="treatment-atlas-panel-inner">
                <PanelContent
                  treatment={active}
                  interactive
                  comparisonPosition={comparisonPosition}
                  videoPlaying={videoPlaying}
                  onPlay={() => setVideoPlaying(true)}
                  comparisonRef={comparisonRef}
                  onComparisonKeyDown={handleComparisonKeyDown}
                  onComparisonPointerDown={(event) => {
                    draggingRef.current = true;
                    event.currentTarget.setPointerCapture(event.pointerId);
                    updateComparison(event.clientX);
                  }}
                  onComparisonPointerMove={(event) => {
                    if (draggingRef.current) updateComparison(event.clientX);
                  }}
                />
              </div>
              {leaving && leavingTreatment && (
                <div
                  key={`leaving-${leavingTreatment.number}`}
                  className="treatment-atlas-panel-inner is-leaving"
                  aria-hidden="true"
                  inert
                >
                  <PanelContent
                    treatment={leavingTreatment}
                    interactive={false}
                    comparisonPosition={leaving.position}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { treatments };
