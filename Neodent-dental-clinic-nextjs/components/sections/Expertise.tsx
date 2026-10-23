"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ArrowLeftRight, ArrowRight, Play } from "lucide-react";
import neodentMark from "@/public/assets/neodent-mark.png";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  closingCta,
  defaultTreatmentVideo,
  treatmentPointsHeading,
  treatments,
} from "@/components/sections/expertise-data";

export function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const comparisonRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const draggingRef = useRef(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  // Intro clip: stays paused for prefers-reduced-motion users (first frame
  // shown), and otherwise plays only while it is on screen.
  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const active = treatments[activeIndex];

  // Selecting a treatment resets the comparison + any playing film.
  const selectIndex = useCallback((index: number) => {
    setActiveIndex(index);
    setComparisonPosition(50);
    setVideoPlaying(false);
  }, []);

  // --- Before/after compare slider (kept from the previous viewer) ---
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
        Math.min(
          100,
          Math.max(0, position + (event.key === "ArrowRight" ? step : -step)),
        ),
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
        const reduced =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        node.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
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

  const hasComparison = Boolean(active.before) && !active.video;

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
          <div className="treatment-atlas-copy">
            <h2 id="treatment-atlas-title">
              What can we <span className="serif">help you with?</span>
            </h2>
            <p className="section-lede section-lede--on-dark">
              Focused care for the dental problems that bring patients to us.
              Each concern is met with the{" "}
              <EditorialHighlight tone="primary">
                specialist-led expertise
              </EditorialHighlight>{" "}
              it calls for, within{" "}
              <EditorialHighlight tone="secondary">
                one clinical environment
              </EditorialHighlight>
              . The right approach is matched to what each patient needs,
              from routine care to{" "}
              <EditorialHighlight tone="quiet">
                more complex treatment
              </EditorialHighlight>
              .
            </p>
            <p className="section-lede section-lede--on-dark">
              Whether you need a missing tooth replaced, a worn tooth
              restored or a smile rebuilt, care begins with understanding
              your concern and explaining your options clearly. Treatments
              range from preventive care such as scaling and polishing to
              restorative and specialist work such as implants, root canal
              treatment, braces and smile design. Each area below is shown
              with a <strong className="treatment-atlas-emphasis">real case</strong> from our clinics, so you can
              see the kind of work we do before you decide.
            </p>
          </div>
          {/* Silent looping clip beside the intro copy (cols 8-12, in line
              with the detail panel below). Stacks under the copy < 1024px. */}
          <div className="treatment-atlas-visual">
            <video
              ref={introVideoRef}
              className="treatment-atlas-visual-video"
              src="/assets/section-video.mp4"
              aria-label="Silent looping video of a dental tooth model and instruments"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              width={1280}
              height={720}
            >
              A looping video of a dental tooth model and instruments.
            </video>
            {/* Brand mark over the clip's baked-in corner sparkle. Decorative. */}
            <span className="treatment-atlas-visual-logo" aria-hidden="true">
              <Image src={neodentMark} alt="" width={40} height={40} />
            </span>
          </div>
        </header>

        <div className="treatment-atlas-layout">
          {/* Card grid — the 7 treatment tabs plus one closing CTA card. */}
          <div className="treatment-atlas-cards">
            <div
              className="treatment-atlas-tablist"
              role="tablist"
              aria-label="Featured treatment areas"
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
                    onClick={() => selectIndex(index)}
                    onKeyDown={handleTabKeyDown}
                  >
                    <span className="treatment-atlas-card-title">
                      {treatment.title}
                    </span>
                    <span className="treatment-atlas-card-summary">
                      {treatment.summary}
                    </span>
                    <span className="treatment-atlas-card-bottom">
                      {!selected && (
                        <treatment.icon
                          className="treatment-atlas-card-icon"
                          aria-hidden="true"
                        />
                      )}
                      <span className="treatment-atlas-card-action">
                        <span className="treatment-atlas-card-intent">
                          {treatment.intent}
                        </span>
                        <ArrowRight
                          className="treatment-atlas-card-arrow"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </button>
                );
              })}

              {/* Closing CTA card — a normal link, outside the tablist. */}
              <a
                href={closingCta.href}
                className="treatment-atlas-card treatment-atlas-cta"
              >
                <span className="treatment-atlas-cta-heading">
                  {closingCta.heading}
                </span>
                <span className="treatment-atlas-cta-text">
                  {closingCta.text}
                </span>
                <span className="treatment-atlas-cta-link">
                  {closingCta.linkLabel}
                  <ArrowRight aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>

          {/* Detail panel — the tabpanel for the active card. */}
          <div
            className="treatment-atlas-panel"
            id="atlas-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`atlas-tab-${active.number}`}
            aria-live="polite"
          >
            <div key={active.number} className="treatment-atlas-panel-inner">
              <div className="treatment-atlas-media">
                {hasComparison ? (
                  <div
                    ref={comparisonRef}
                    className="treatment-atlas-comparison"
                    role="slider"
                    tabIndex={0}
                    aria-label={`Compare before and after ${active.title}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(comparisonPosition)}
                    aria-valuetext={`${Math.round(
                      comparisonPosition,
                    )} percent after treatment visible`}
                    onKeyDown={handleComparisonKeyDown}
                    onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
                      draggingRef.current = true;
                      event.currentTarget.setPointerCapture(event.pointerId);
                      updateComparison(event.clientX);
                    }}
                    onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => {
                      if (draggingRef.current) updateComparison(event.clientX);
                    }}
                  >
                    <Image
                      className="treatment-atlas-comparison-image"
                      src={active.before as string}
                      alt={active.beforeAlt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 480px, 92vw"
                      quality={75}
                      draggable={false}
                    />
                    <div
                      className="treatment-atlas-comparison-after"
                      style={{
                        clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)`,
                      }}
                    >
                      <Image
                        className="treatment-atlas-comparison-image"
                        src={active.visual}
                        alt={active.alt}
                        fill
                        sizes="(min-width: 1024px) 480px, 92vw"
                        quality={75}
                        draggable={false}
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
                      <span
                        className="treatment-atlas-comparison-handle"
                        aria-hidden="true"
                      >
                        ↔
                      </span>
                    </span>
                  </div>
                ) : active.video ? (
                  <div className="treatment-atlas-film">
                    {videoPlaying ? (
                      <video
                        ref={videoRef}
                        src={active.videoSrc ?? defaultTreatmentVideo}
                        poster={active.visual}
                        controls
                        autoPlay
                        playsInline
                        preload="none"
                        aria-label={`${active.title} — Neodent clinical treatment film`}
                      />
                    ) : (
                      <button
                        type="button"
                        className="treatment-atlas-film-poster"
                        onClick={() => setVideoPlaying(true)}
                        aria-label={`Play ${active.title} treatment film`}
                      >
                        <Image
                          src={active.visual}
                          alt={active.alt}
                          fill
                          sizes="(min-width: 1024px) 480px, 92vw"
                          quality={75}
                        />
                        <span
                          className="treatment-atlas-play"
                          aria-hidden="true"
                        >
                          <Play fill="currentColor" />
                        </span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="treatment-atlas-still">
                    <Image
                      src={active.visual}
                      alt={active.alt}
                      fill
                      sizes="(min-width: 1024px) 480px, 92vw"
                      quality={75}
                    />
                  </div>
                )}
              </div>

              {hasComparison || active.video ? (
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

              <h3 className="treatment-atlas-panel-title">{active.title}</h3>
              <p className="treatment-atlas-panel-desc">{active.description}</p>
              {active.proof && (
                <span className="treatment-atlas-tag">{active.proof}</span>
              )}
              <div className="treatment-atlas-points">
                <p className="treatment-atlas-points-heading">
                  <active.icon
                    className="treatment-atlas-points-icon"
                    aria-hidden="true"
                  />
                  {treatmentPointsHeading}
                </p>
                <ul>
                  {active.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="treatment-atlas-panel-foot">
                <a href={active.href} className="treatment-atlas-panel-link">
                  Explore treatment <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { treatments };
