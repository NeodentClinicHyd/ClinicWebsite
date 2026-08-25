"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import {
  address,
  directions,
  entranceImage,
  heroLocations,
  phone,
  telPhone,
} from "@/lib/site-data";

export function Contact({ onBook }: { onBook: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      setParallaxY((scrollProgress - 0.5) * 26);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section contact ${isVisible ? "contact-visible" : ""}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-ambient" aria-hidden="true" />
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow">Find your way to us</div>
          <h2 id="contact-title" className="section-heading">
            Visit Neodent <span className="serif">Dental Hospitals.</span>
          </h2>
          <div className="contact-location-summary">
            <span className="contact-location-kicker">Two locations in Hyderabad</span>
            <div className="contact-location-list">
              {heroLocations.map((location) => (
                <a href="#clinic" key={location.number}>
                  <span>{location.number}</span>
                  <strong>{location.name}</strong>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <dl className="contact-details">
            <div className="detail detail-1">
              <div className="detail-icon" aria-hidden="true">
                <MapPin size={18} strokeWidth={2} />
              </div>
              <div className="detail-body">
                <dt>Humayun Nagar</dt>
                <dd>{address}</dd>
              </div>
            </div>
            <div className="detail detail-2">
              <div className="detail-icon" aria-hidden="true">
                <Phone size={18} strokeWidth={2} />
              </div>
              <div className="detail-body">
                <dt>Phone</dt>
                <dd>
                  <a href={telPhone} data-testid="link-contact-phone">
                    {phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="detail detail-3">
              <div className="detail-icon" aria-hidden="true">
                <Clock3 size={18} strokeWidth={2} />
              </div>
              <div className="detail-body">
                <dt>Hours</dt>
                <dd>04:00 PM – 09:00 PM</dd>
              </div>
            </div>
          </dl>
          <div className="contact-actions">
            <AppButton href={telPhone}>
              <Phone size={14} /> Call now
            </AppButton>
            <AppButton href={directions} variant="ghost">
              <MapPin size={14} /> Directions
            </AppButton>
          </div>
        </div>
        <div className="map-card" aria-label="Neodent Dental Hospitals location">
          <div
            className="map-card-frame"
            style={{ "--parallax-y": `${parallaxY}px` } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entranceImage}
              alt="Neodent Dental Hospitals entrance on Humayun Nagar Road"
              loading="lazy"
            />
            <div className="location-panel">
              <div className="map-label">Find us in Humayun Nagar</div>
              <div className="map-address">{address}</div>
              <AppButton href={directions} variant="light">
                Open directions <ArrowRight size={14} />
              </AppButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 45 }}>
        <AppButton onClick={onBook}>
          Prefer to book first? <ArrowRight size={14} />
        </AppButton>
      </div>
    </section>
  );
}
