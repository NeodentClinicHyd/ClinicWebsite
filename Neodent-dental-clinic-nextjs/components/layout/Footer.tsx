"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BrandLockup } from "@/components/layout/BrandLockup";
import {
  directions,
  nampallyDirections,
  nampallyTelPhone,
  navItems,
  telPhone,
} from "@/lib/site-data";
import styles from "./Footer.module.css";

/* ------------------------------------------------------------------
   Footer — "Final Editorial Frame".

   The homepage's ninth and closing chapter. Inherits Section 02's
   canonical .archive-* grammar (numeral bleeding into eyebrow, red
   hairline, serif + red-italic emphasis, mono metadata) exactly as
   Sections 04/07/08 already do, on a genuinely distinct charcoal
   value (see Footer.module.css) so it reads as its own final room.

   Reuses the existing BrandLockup component for brand identity
   (Column 01) rather than a second logo/wordmark system, and reuses
   the same tel:/directions data Section 08 (ContactNextStep) already
   established -- no invented numbers or routes. The Explore column
   filters Doctor out of the shared `navItems` list (the Doctor page
   has been intentionally dropped) without touching site-data.ts
   itself. All new styling lives in Footer.module.css; globals.css is
   untouched and its old `.footer*` rules are simply left unused. ------------------------------------------------------------------ */

// The Doctor page has been intentionally dropped from the site --
// filtered out here rather than removed from the shared navItems
// list, so nothing else that reads navItems is affected.
const exploreLinks = navItems.filter((item) => item.label !== "Doctor");

const careLinks = [
  { label: "Treatments", href: "#expertise" },
  { label: "Patient Stories", href: "#stories" },
  { label: "What to Expect", href: "#visit" },
  { label: "Our Clinics", href: "#clinics" },
];

type Branch = {
  index: "01" | "02";
  name: string;
  meta: string;
  phoneLabel: string;
  tel: string;
  directionsHref: string;
};

const branches: Branch[] = [
  {
    index: "01",
    name: "Mehdipatnam",
    meta: "Mehdipatnam · Hyderabad",
    phoneLabel: "090306 48393",
    tel: telPhone,
    directionsHref: directions,
  },
  {
    index: "02",
    name: "Nampally",
    meta: "Nampally · Hyderabad",
    phoneLabel: "090305 98081",
    tel: nampallyTelPhone,
    directionsHref: nampallyDirections,
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`${styles.footer} ${visible ? styles.visible : ""}`}
      aria-labelledby="footer-title"
    >
      {/* Chapter-start seam -- matches the mechanic used at the top of
          Sections 04/07 (a thin hairline + centred registration tick). */}
      <span className={styles.seam} aria-hidden="true" />

      {/* Closing-frame geometry -- a single quiet registration line +
          dot, far more restrained than earlier chapters since this is
          the final room, not a new motif. Purely decorative. */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.axisLine} />
        <span className={styles.registrationLine} />
        <span className={styles.registrationDot} />
      </div>

      <span className={styles.ghostWordmark} aria-hidden="true">
        NEODENT
      </span>

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">
            1994
          </span>
          <div className={styles.eyebrow}>NeoDent Dental Hospitals</div>
        </header>

        <p id="footer-title" className={styles.statement}>
          Changing smiles <span>since decades.</span>
        </p>

        <div className={styles.grid}>
          <div className={`${styles.col} ${styles.brandCol}`}>
            <BrandLockup testId="link-footer-brand" />
            <p className={styles.brandSentence}>
              Specialist-led dental care in Hyderabad, delivered with clarity,
              precision and a personal touch.
            </p>
            <div className={styles.brandLocations}>
              <span>Mehdipatnam · Hyderabad</span>
              <span>Nampally · Hyderabad</span>
            </div>
          </div>

          <div className={`${styles.col} ${styles.exploreCol}`}>
            <p className={styles.colLabel}>Explore</p>
            <nav aria-label="Footer navigation">
              <ul className={styles.linkList}>
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      data-testid={`link-footer-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={`${styles.col} ${styles.careCol}`}>
            <p className={styles.colLabel}>Care</p>
            <nav aria-label="Footer care navigation">
              <ul className={styles.linkList}>
                {careLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      data-testid={`link-footer-care-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={`${styles.col} ${styles.contactCol}`}>
            <p className={styles.colLabel}>Contact</p>
            <div className={styles.branchGrid}>
              {branches.map((branch) => (
                <article className={styles.branch} key={branch.index}>
                  <p className={styles.branchIndex}>
                    {branch.index} / {branch.name.toUpperCase()}
                  </p>
                  <p className={styles.branchMeta}>{branch.meta.toUpperCase()}</p>
                  <a
                    href={branch.tel}
                    className={styles.branchPhone}
                    data-testid={`link-footer-phone-${branch.index}`}
                  >
                    {branch.phoneLabel}
                  </a>
                  <div className={styles.branchActions}>
                    <a
                      href={branch.tel}
                      className={styles.actionPrimary}
                      data-testid={`link-footer-call-${branch.name.toLowerCase()}`}
                    >
                      Call {branch.name} <ArrowRight size={12} aria-hidden="true" />
                    </a>
                    <a
                      href={branch.directionsHref}
                      className={styles.actionSecondary}
                      data-testid={`link-footer-directions-${branch.name.toLowerCase()}`}
                    >
                      Get directions <ArrowRight size={11} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.legal}>
          <div className={styles.legalRow}>
            <span>© {new Date().getFullYear()} NeoDent Dental Hospitals</span>
            <span className={styles.legalLinks}>
              <span>Privacy</span>
              <span aria-hidden="true">·</span>
              <span>Terms</span>
            </span>
          </div>
          <p className={styles.legalMeta}>Mehdipatnam · Nampally · Hyderabad</p>
          <p className={styles.credit}>
            Designed &amp; developed by{" "}
            <a
              href="https://www.blogspage.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-credit-blogspage"
            >
              Blogspage AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
