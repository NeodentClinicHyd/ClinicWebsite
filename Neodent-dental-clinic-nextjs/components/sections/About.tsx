"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { philosophyImage } from "@/lib/site-data";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
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

  return (
    <section
      ref={sectionRef}
      className={`about ${isVisible ? "about-visible" : ""}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-decorative-bg">
        <div className="about-glow about-glow-1"></div>
        <div className="about-glow about-glow-2"></div>
      </div>
      <div className="container about-grid">
        <figure className="about-image">
          <div className="about-image-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={philosophyImage}
              alt="Close dental treatment moment showing attentive clinical care at Neodent"
              loading="lazy"
            />
          </div>
          <figcaption className="image-tag">
            Care that begins with attention.
          </figcaption>
        </figure>
        <div className="about-copy">
          <div className="eyebrow">Our philosophy</div>
          <h2 id="about-title" className="section-heading">
            Dental care designed around <span className="serif">people,</span>{" "}
            not just procedures.
          </h2>
          <p className="about-quote serif">
            <span className="quote-mark">&quot;</span>A good visit begins before
            treatment starts.
          </p>
          <p className="section-intro">
            At Neodent, we believe a dental visit should feel clear, comfortable
            and considered. Our approach is to make quality care feel
            approachable, with attention to the person sitting in the chair.
          </p>
          <a
            className="text-link"
            href="#experience"
            data-testid="link-about-experience"
          >
            See the patient experience <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
