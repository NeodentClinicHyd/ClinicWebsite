"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./RealTreatmentWork.module.css";

/* ------------------------------------------------------------------
   Treatments page — Section 04 — "Real Clinical Work."

   Four internal acts:
     04.1 — Introduction
     04.2 — Featured Clinical Film  (dominant landscape plate)
     04.3 — Treatment Films         (three portrait/reel plates, 9:16)
     04.4 — Editorial Closing Note

   04.3 uses a compact editorial reel archive — three portrait plates
   side-by-side at desktop, never cropped into landscape.
   ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/* Reel archive — single source of truth */
const reelFilms = [
  {
    id: "clinical-detail",
    number: "01",
    title: "Clinical Treatment Detail",
    context: "Real clinical treatment by the NeoDent team",
    src: "/assets/treatment-video/dr-miftah-neodent-clinical-treatment-detailed.mp4",
    poster: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg",
  },
  {
    id: "crown-cementation",
    number: "02",
    title: "Crown Cementation",
    context: "Cementation procedure / Dr. Md. Miftah Ur Rahman",
    src: "/assets/treatment-video/dr-miftah-neodent-crown-cementation-procedure.mp4",
    poster: "/assets/neodent-dmls-crowns-dental-model-side-view.jpg",
  },
  {
    id: "procedure",
    number: "03",
    title: "Treatment in Practice",
    context: "Clinical dental procedure at NeoDent",
    src: "/assets/treatment-video/dr-miftah-neodent-dental-treatment-procedure.mp4",
    poster: "/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp",
  },
];

export function RealTreatmentWork() {
  const [sectionRef] = useReveal<HTMLElement>(0.06);
  const [introRef, introVisible] = useReveal<HTMLDivElement>(0.1);
  const [featureRef, featureVisible] = useReveal<HTMLDivElement>(0.08);
  const [archiveRef, archiveVisible] = useReveal<HTMLDivElement>(0.08);

  /* Featured film control */
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);

  /* Reel film active state */
  const [activeReel, setActiveReel] = useState<string | null>(null);
  const reelVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  /* Pause all on section exit */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          featuredVideoRef.current?.pause();
          setFeaturedPlaying(false);
          Object.values(reelVideoRefs.current).forEach(v => v?.pause());
          setActiveReel(null);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFeatured = () => {
    const video = featuredVideoRef.current;
    if (!video) return;
    Object.values(reelVideoRefs.current).forEach(v => v?.pause());
    setActiveReel(null);
    if (video.paused) {
      void video.play().catch(() => undefined);
      setFeaturedPlaying(true);
    } else {
      video.pause();
      setFeaturedPlaying(false);
    }
  };

  const toggleReel = (id: string) => {
    featuredVideoRef.current?.pause();
    setFeaturedPlaying(false);
    Object.entries(reelVideoRefs.current).forEach(([key, v]) => {
      if (key !== id) v?.pause();
    });
    const video = reelVideoRefs.current[id];
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
      setActiveReel(id);
    } else {
      video.pause();
      setActiveReel(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="work-title"
    >
      {/* Background geometry */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.verticalRail} />
        <span className={styles.registrationDot} />
      </div>

      <div className={styles.container}>

        {/* ---- ACT 04.1 — Introduction ------------------------------- */}
        <div
          ref={introRef}
          className={`${styles.act} ${styles.actIntro} ${introVisible ? styles.actVisible : ""}`}
        >
          <header className={styles.header}>
            {/* Chapter numeral — in-flow, negative bottom margin bleeds into eyebrow */}
            <span className={styles.numeral} aria-hidden="true">04</span>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              04 / Real clinical work
            </div>
            <h2 id="work-title" className={styles.title}>
              See the work<br /><span>behind the treatment.</span>
            </h2>
          </header>
          <p className={styles.introCopy}>
            These films are a record of{" "}
            <EditorialHighlight tone="primary">
              real clinical work
            </EditorialHighlight>
            {" "}carried out at NeoDent Dental Hospitals, Hyderabad — procedures
            performed by{" "}
            <EditorialHighlight tone="secondary">
              Dr. Md. Miftah Ur Rahman
            </EditorialHighlight>
            {" "}using the same methods and materials discussed during{" "}
            <EditorialHighlight tone="quiet">
              patient consultation.
            </EditorialHighlight>
          </p>
        </div>

        {/* ---- Internal seam ---------------------------------------- */}
        <div className={styles.actSeam} aria-hidden="true" />

        {/* ---- ACT 04.2 — Featured Clinical Film --------------------- */}
        <div
          ref={featureRef}
          className={`${styles.act} ${styles.actFeature} ${featureVisible ? styles.actVisible : ""}`}
        >
          <div className={styles.actEyebrow}>04.2 / Featured clinical film</div>

          <div className={styles.featureLayout}>
            {/* Left — context text, ~40–42% */}
            <div className={styles.featureText}>
              <h3 className={styles.featureTitle}>Full Mouth Rehabilitation</h3>
              <p className={styles.featureParagraph}>
                This clinical film captures a{" "}
                <EditorialHighlight tone="primary">
                  full mouth rehabilitation procedure
                </EditorialHighlight>
                {" "}using dental implants at NeoDent Dental Hospital, Mehdipatnam. The footage
                offers a closer view of the{" "}
                <EditorialHighlight tone="secondary">
                  clinical work involved
                </EditorialHighlight>
                {" "}in restoring missing teeth through an{" "}
                <EditorialHighlight tone="quiet">
                  implant-based treatment approach.
                </EditorialHighlight>
              </p>
              <div className={styles.featureMeta}>
                <span className={styles.featureMetaLabel}>Clinical Film</span>
                <span className={styles.featureMetaSub}>Full Mouth Rehabilitation Using Dental Implants</span>
                <span className={styles.featureMetaSub}>NeoDent Dental Hospital · Mehdipatnam</span>
              </div>
            </div>

            {/* Right — open editorial landscape plate, no card wrapper */}
            <figure className={styles.featurePlate}>
              <span className={styles.featurePlateRegistration} aria-hidden="true" />
              <div className={styles.featureVideoFrame}>
                <video
                  ref={featuredVideoRef}
                  className={styles.featureVideo}
                  poster="/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg"
                  preload="metadata"
                  playsInline
                  controls={featuredPlaying}
                  aria-label="Full mouth rehabilitation using dental implants at NeoDent Dental Hospital Mehdipatnam"
                >
                  <source
                    src="/assets/treatment-video/neodent-full-mouth-rehabilitation-using-dental-implants.mp4"
                    type="video/mp4"
                  />
                </video>
                {/* Top overlay label */}
                {!featuredPlaying && (
                  <div className={styles.featureVideoLabel} aria-hidden="true">
                    <span>Full Mouth Rehabilitation</span>
                    <span>NeoDent · Mehdipatnam</span>
                  </div>
                )}
                {/* Play control — bottom-right corner */}
                {!featuredPlaying && (
                  <button
                    type="button"
                    className={styles.videoControl}
                    onClick={toggleFeatured}
                    aria-label="Play film"
                  >
                    <Play size={14} />
                  </button>
                )}
              </div>
              <figcaption className={styles.featureCaption}>
                Full Mouth Rehabilitation Using Dental Implants / NeoDent Dental Hospital · Mehdipatnam
              </figcaption>
            </figure>
          </div>
        </div>

        {/* ---- Internal seam ---------------------------------------- */}
        <div className={styles.actSeam} aria-hidden="true" />

        {/* ---- ACT 04.3 — Treatment Films (Reel Archive) ------------- */}
        <div
          ref={archiveRef}
          className={`${styles.act} ${styles.actArchive} ${archiveVisible ? styles.actVisible : ""}`}
        >
          <div className={styles.actEyebrow}>04.3 / Treatment films</div>

          {/* Three portrait reel plates — equal width, side by side */}
          <div className={styles.reelArchive}>
            {reelFilms.map((film, i) => (
              <article
                key={film.id}
                className={styles.reelItem}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Registration seam above reel */}
                <div className={styles.reelSeamTop} aria-hidden="true">
                  <span className={styles.reelSeamDot} />
                </div>

                {/* Portrait reel plate — 9:16, no card, fine 1px border */}
                <div className={styles.reelFrame}>
                  <video
                    ref={(el) => { reelVideoRefs.current[film.id] = el; }}
                    className={styles.reelVideo}
                    poster={film.poster}
                    preload="metadata"
                    playsInline
                    controls={activeReel === film.id}
                    aria-label={film.title}
                  >
                    <source src={film.src} type="video/mp4" />
                  </video>

                  {/* Reel number — top-left corner */}
                  <span className={styles.reelNumber} aria-hidden="true">
                    {film.number}
                  </span>

                  {/* Play control — bottom-right corner, shown when paused */}
                  {activeReel !== film.id && (
                    <button
                      type="button"
                      className={styles.reelPlayBtn}
                      onClick={() => toggleReel(film.id)}
                      aria-label={`Play ${film.title}`}
                    >
                      <Play size={12} />
                    </button>
                  )}
                </div>

                {/* Caption below reel */}
                <div className={styles.reelInfo}>
                  <h4 className={styles.reelTitle}>
                    <span className={styles.reelTitleNum} aria-hidden="true">{film.number} /</span>
                    {" "}{film.title}
                  </h4>
                  <p className={styles.reelContext}>{film.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
