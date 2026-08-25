"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowRight, Play } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
const treatmentVideo = "/assets/treatment-video/dr-miftah-neodent-clinical-treatment-detailed.mp4";

type Treatment = {
  number: string;
  title: string;
  intent: string;
  summary: string;
  description: string;
  proof?: string;
  visual: string;
  alt: string;
  before?: string;
  beforeAlt?: string;
  video?: boolean;
};

const treatments: Treatment[] = [
  {
    number: "01",
    title: "Composite build-up",
    intent: "REPAIR",
    summary: "Restore damaged or worn teeth.",
    description: "Conservative restorative detail for small changes that can make a meaningful difference to a smile.",
    proof: "REAL CASE / COMPOSITE SMILE DESIGN",
    visual: "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design after.jpg",
    before: "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design  before.jpg",
    alt: "Composite build-up smile design after treatment",
    beforeAlt: "Smile before composite build-up treatment",
    video: true,
  },
  {
    number: "02",
    title: "Dental implants",
    intent: "REPLACE",
    summary: "Replace missing teeth with planned restorative care.",
    description: "Carefully planned restorative treatment for missing teeth, built around function and a natural-looking result.",
    visual: "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg",
    before: "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg",
    alt: "Upper arch rehabilitation with implants after surgery at Neodent Dental Hospitals",
    beforeAlt: "Upper arch rehabilitation before surgery at Neodent Dental Hospitals",
    proof: "REAL CASE / UPPER ARCH REHABILITATION",
  },
  {
    number: "03",
    title: "Root canal treatment",
    intent: "PRESERVE",
    summary: "Treat infection while preserving the tooth.",
    description: "Focused care to help preserve a natural tooth and bring comfort back to everyday life.",
    visual: "/assets/treatment/after treatment.jpg",
    before: "/assets/treatment/before treatment.jpg",
    alt: "Root canal treatment result at Neodent Dental Hospitals",
    beforeAlt: "Dental condition before treatment at Neodent Dental Hospitals",
    proof: "REAL CASE / RESTORATIVE CARE",
  },
  {
    number: "04",
    title: "Braces & orthodontics",
    intent: "ALIGN",
    summary: "Improve alignment and bite over time.",
    description: "Measured orthodontic care for a healthier bite and a smile that feels like your own.",
    visual: "/assets/treatment/Neodent dental hospital Hyderabad - after treatment.jpg",
    before: "/assets/treatment/Neodent dental hospital Hyderabad - before treatment.jpg",
    alt: "Smile result after treatment at Neodent Dental Hospitals",
    beforeAlt: "Smile before treatment at Neodent Dental Hospitals",
    proof: "REAL CASE / SMILE ALIGNMENT",
  },
  {
    number: "05",
    title: "Smile design",
    intent: "REFINE",
    summary: "Refine the appearance of your smile.",
    description: "Subtle cosmetic planning that respects your features while refining the way your smile comes together.",
    proof: "REAL CASE / ZIRCONIA CROWNS",
    visual: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -after treatment.jpg",
    before: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -before treatment.jpg",
    alt: "Anterior smile design with zirconia crowns after treatment",
    beforeAlt: "Anterior smile before zirconia crown treatment",
  },
  {
    number: "06",
    title: "Full mouth rehabilitation",
    intent: "REBUILD",
    summary: "Rebuild function across complex restorative needs.",
    description: "Comprehensive restorative care when several parts of your smile need to work together again.",
    visual: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    before: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - before surgery.jpg",
    alt: "Full mouth rehabilitation with implants after surgery",
    beforeAlt: "Full mouth condition before implant rehabilitation",
    proof: "REAL CASE / FULL MOUTH REHABILITATION",
  },
  {
    number: "07",
    title: "Scaling & polishing",
    intent: "MAINTAIN",
    summary: "Professional cleaning for a healthier-feeling mouth.",
    description: "A considered clean that supports gum health and leaves your mouth feeling fresh and cared for.",
    visual: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment after.jpg",
    before: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment before.jpg",
    alt: "Scaling and polishing result at Neodent Dental Hospitals",
    beforeAlt: "Teeth before scaling and polishing at Neodent Dental Hospitals",
    proof: "REAL CASE / GUM HEALTH",
  },
];

export function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const draggingRef = useRef(false);
  const active = treatments[activeIndex];

  const updateComparison = (clientX: number) => {
    const bounds = comparisonRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setComparisonPosition(Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100)));
    setHasInteracted(true);
  };

  const handleComparisonKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 5;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setComparisonPosition((position) => Math.min(100, Math.max(0, position + (event.key === "ArrowRight" ? step : -step))));
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    const stopDragging = () => { draggingRef.current = false; };
    window.addEventListener("pointerup", stopDragging);
    return () => window.removeEventListener("pointerup", stopDragging);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible((visible) => visible || entry.isIntersecting);
      const video = videoRef.current;
      if (!video || !active.video) return;
      if (entry.isIntersecting) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }, { threshold: [0, 0.15] });
    observer.observe(node);
    return () => observer.disconnect();
  }, [active.video]);

  return (
    <section
      ref={sectionRef}
      className={`section treatment-atlas ${isVisible ? "treatment-atlas-visible" : ""}`}
      id="expertise"
      aria-labelledby="treatment-atlas-title"
      style={{ "--atlas-stage-image": `url(${active.visual})` } as CSSProperties}
    >
      <div className="treatment-atlas-geometry" aria-hidden="true" />
      <div className="container treatment-atlas-shell">
        <div className="treatment-atlas-header atlas-reveal atlas-reveal-header">
          <div className="treatment-atlas-number" aria-hidden="true">03</div>
          <div className="treatment-atlas-copy">
            <div className="eyebrow">Dental care <span>/</span> Featured treatment atlas</div>
            <h2 id="treatment-atlas-title">What can we <span className="serif">help you with?</span></h2>
            <p>
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
          </div>
        </div>

        <div className="treatment-atlas-grid">
          <nav className="treatment-atlas-index atlas-reveal atlas-reveal-index" aria-label="Featured treatment areas">
            <div className="treatment-atlas-index-intro">
              <span className="treatment-atlas-index-label">7 areas of care</span>
              <span className="treatment-atlas-index-helper">Select a treatment to view a real case.</span>
              <span className="treatment-atlas-progress">{active.number} / 07</span>
            </div>
            {treatments.map((treatment, index) => (
              <button
                key={treatment.number}
                type="button"
                className={`treatment-atlas-item ${index === activeIndex ? "is-active" : ""}`}
                aria-pressed={index === activeIndex}
                aria-label={`${treatment.title}: ${treatment.intent}`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="treatment-atlas-item-number">{treatment.number}</span>
                <span className="treatment-atlas-item-main">
                  <strong>{treatment.title}</strong>
                  <small>{treatment.intent}</small>
                  <em>{treatment.summary}</em>
                </span>
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </nav>

          <div className="treatment-atlas-stage atlas-reveal atlas-reveal-stage" aria-live="polite">
            <div className="treatment-atlas-stage-backdrop" aria-hidden="true" />
            {active.before && !active.video ? (
              <div
                key={active.number}
                ref={comparisonRef}
                className="treatment-atlas-comparison"
                role="slider"
                tabIndex={0}
                aria-label={`Compare before and after ${active.title}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(comparisonPosition)}
                aria-valuetext={`${Math.round(comparisonPosition)} percent after treatment visible`}
                onKeyDown={handleComparisonKeyDown}
                onPointerDown={(event) => {
                  draggingRef.current = true;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  updateComparison(event.clientX);
                }}
                onPointerMove={(event) => {
                  if (draggingRef.current) updateComparison(event.clientX);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="treatment-atlas-comparison-image" src={active.before} alt={active.beforeAlt} draggable={false} />
                <div className="treatment-atlas-comparison-after" style={{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="treatment-atlas-comparison-image" src={active.visual} alt={active.alt} draggable={false} />
                </div>
                <span className="treatment-atlas-stage-label">Clinical comparison</span>
                <span className="treatment-atlas-comparison-label treatment-atlas-comparison-before-label">Before</span>
                <span className="treatment-atlas-comparison-label treatment-atlas-comparison-after-label">After</span>
                <span className="treatment-atlas-comparison-divider" style={{ left: `${comparisonPosition}%` }}>
                  <span className="treatment-atlas-comparison-handle" aria-hidden="true">↔</span>
                </span>
                {!hasInteracted && <span className="treatment-atlas-comparison-affordance">Drag to compare</span>}
              </div>
            ) : (
              <div key={active.number} className="treatment-atlas-stage-media">
                {active.video ? (
                  <video ref={videoRef} src={treatmentVideo} muted loop playsInline autoPlay preload="metadata" aria-label="Neodent clinical treatment film" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={active.visual} alt={active.alt} />
                )}
                <span className="treatment-atlas-stage-label">{active.video ? "In practice" : "Clinical visual"}</span>
                {active.video && <span className="treatment-atlas-play"><Play fill="currentColor" aria-hidden="true" /></span>}
              </div>
            )}
            <div className="treatment-atlas-stage-meta">
              <span>NEODENT / CLINICAL CARE</span>
              <span>0{activeIndex + 1} / 07</span>
            </div>
            <div className="treatment-atlas-detail">
              <div>
                <span className="treatment-atlas-kicker">{active.number} / {active.video ? "TREATMENT FILM" : "FEATURED CARE"}</span>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
              </div>
              {active.proof && <span className="treatment-atlas-proof">{active.proof}</span>}
              <a href="#contact" className="treatment-atlas-link">Explore treatment <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </div>

        <a href="#contact" className="treatment-atlas-all">Explore all treatments <ArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export { treatments };
