"use client";

import { useEffect, useRef, useState } from "react";
import { galleryItems } from "@/lib/site-data";

export function Gallery({
  onImage,
}: {
  onImage: (src: string, alt: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      const tolerance = parseFloat(getComputedStyle(el).paddingLeft || "0") + 4;
      setScrollProgress(progress);
      setAtStart(el.scrollLeft <= tolerance);
      setAtEnd(el.scrollLeft >= maxScroll - tolerance);
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`section gallery ${isVisible ? "gallery-visible" : ""}`}
      id="clinic"
      aria-labelledby="gallery-title"
      aria-describedby="gallery-intro"
    >
      <div className="gallery-decorative-bg" aria-hidden="true">
        <div className="gallery-glow gallery-glow-1"></div>
        <div className="gallery-glow gallery-glow-2"></div>
        <svg
          className="gallery-arch-accent gallery-arch-1"
          width="180"
          height="180"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 180 Q20 20 100 20 T180 180"
            stroke="rgba(90, 140, 140, 0.08)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M30 180 Q30 30 100 30 T170 180"
            stroke="rgba(90, 140, 140, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="100" cy="20" r="3" fill="rgba(90, 140, 140, 0.1)" />
        </svg>
        <svg
          className="gallery-arch-accent gallery-arch-2"
          width="180"
          height="180"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 180 Q20 20 100 20 T180 180"
            stroke="rgba(90, 140, 140, 0.08)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M30 180 Q30 30 100 30 T170 180"
            stroke="rgba(90, 140, 140, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="100" cy="20" r="3" fill="rgba(90, 140, 140, 0.1)" />
        </svg>
        <svg
          className="gallery-grid-accent"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="40" y1="0" x2="40" y2="120" stroke="rgba(90, 140, 140, 0.06)" strokeWidth="1" />
          <line x1="80" y1="0" x2="80" y2="120" stroke="rgba(90, 140, 140, 0.06)" strokeWidth="1" />
          <line x1="0" y1="40" x2="120" y2="40" stroke="rgba(90, 140, 140, 0.06)" strokeWidth="1" />
          <line x1="0" y1="80" x2="120" y2="80" stroke="rgba(90, 140, 140, 0.06)" strokeWidth="1" />
          <circle cx="40" cy="40" r="2" fill="rgba(90, 140, 140, 0.1)" />
          <circle cx="80" cy="40" r="2" fill="rgba(90, 140, 140, 0.1)" />
          <circle cx="40" cy="80" r="2" fill="rgba(90, 140, 140, 0.1)" />
          <circle cx="80" cy="80" r="2" fill="rgba(90, 140, 140, 0.1)" />
        </svg>
      </div>
      <div className="container">
        <div className="gallery-head">
          <div>
            <p className="gallery-eyebrow eyebrow">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M4 4v8M4 4h8M28 4v8M28 4h-8M4 28v-8M4 28h8M28 28v-8M28 28h-8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              The clinic
            </p>
            <h2 id="gallery-title" className="section-heading">
              Spaces designed around care.
            </h2>
          </div>
          <p id="gallery-intro" className="section-intro">
            Every corner of Neodent reflects our commitment to patient
            comfort—from the welcoming entrance to the carefully considered
            treatment rooms.
          </p>
        </div>
        <div className="gallery-carousel-container">
          <div className="gallery-carousel-wrapper">
            <div ref={carouselRef} className="gallery-carousel" role="list">
              {galleryItems.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  className="gallery-item"
                  onClick={() => onImage(item.src, item.alt)}
                  aria-label={`View full image: ${item.label}`}
                  role="listitem"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    className={loadedImages.has(index) ? "loaded" : ""}
                  />
                  <span className="gallery-caption">
                    {item.label}
                    <svg
                      className="gallery-zoom-hint"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="gallery-controls">
            <button
              className="gallery-control gallery-control-prev"
              aria-label="View previous images"
              type="button"
              onClick={handlePrevious}
              disabled={atStart}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="gallery-control gallery-control-next"
              aria-label="View next images"
              type="button"
              onClick={handleNext}
              disabled={atEnd}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="gallery-progress">
            <div
              className="gallery-progress-bar"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
