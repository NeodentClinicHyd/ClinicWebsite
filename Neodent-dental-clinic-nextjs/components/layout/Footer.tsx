"use client";

import Link from "next/link";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { useCookieConsent } from "@/components/consent/CookieConsentContext";
import { treatments as treatmentLinks } from "@/components/sections/expertise-data";
import {
  ctaPhone,
  ctaTelPhone,
  directions,
  ESTABLISHED_YEAR,
  googleRating,
  heroLocations,
  nampallyDirections,
  nampallyGoogleRating,
  nampallyPhone,
  nampallyTelPhone,
  navItems,
  phone,
  socialLinks,
  telPhone,
} from "@/lib/site-data";
import styles from "./Footer.module.css";

/* ------------------------------------------------------------------
   Footer -- closing chapter of every page.

   Hierarchy, top to bottom:
     1. Closing brand statement ("Changing smiles since 1994.").
     2. Navigation: brand + social, Explore, Treatments, Contact.
     3. Locations: one compact summary per clinic (name, brief
        address, Google rating, phone, directions).
     4. Legal row and the developer credit.

   DATA: nothing is re-typed here that already lives elsewhere.
     - Explore routes come from `navItems` (lib/site-data.ts); the
       Doctors hub (/doctors) is the only literal route, and it has
       its own app/doctors/page.tsx.
     - The featured treatments and their destinations come from the
       homepage's `treatments` list (expertise-data.ts), so the footer
       can never drift from the section it mirrors. Dedicated
       treatment pages exist only for dental implants; every other
       entry keeps its existing /treatments anchor (each id is
       rendered on that page) or the /treatments directory.
     - Phones, directions and branch locations come from site-data.ts.
     - Google ratings are the approved snapshot figures already shown
       in "Spaces designed around care": Mehdipatnam 4.3 / 261
       (`googleRating`) and Nampally 4.6 / 157 (`nampallyGoogleRating`).
       Branch names point to their dedicated pages under /clinic/[slug].
   ------------------------------------------------------------------ */

// Icon lookup for socialLinks (lib/site-data.ts).
const socialIcons: Record<string, typeof Instagram> = {
  Instagram,
  Facebook,
};

const navHref = (label: string) =>
  navItems.find((item) => item.label === label)?.href ?? "/";

const exploreLinks = [
  { id: "home", label: "Home", href: navHref("Home") },
  { id: "about", label: "About", href: navHref("About") },
  { id: "doctors", label: "Doctors", href: "/doctors" },
  { id: "treatments", label: "Treatments", href: navHref("Treatments") },
  { id: "clinic", label: "Clinics", href: navHref("Clinic") },
  { id: "contact", label: "Contact", href: navHref("Contact") },
];

type Branch = {
  id: "mehdipatnam" | "nampally";
  name: string;
  pageHref: string;
  location: string;
  rating: { score: string; count: number };
  phoneLabel: string;
  tel: string;
  directionsHref: string;
};

const branches: Branch[] = [
  {
    id: "mehdipatnam",
    name: "Mehdipatnam",
    pageHref: "/clinic/mehdipatnam",
    location: heroLocations[0].detail,
    rating: googleRating,
    phoneLabel: phone,
    tel: telPhone,
    directionsHref: directions,
  },
  {
    id: "nampally",
    name: "Nampally",
    pageHref: "/clinic/nampally",
    location: `${heroLocations[1].detail}, Hyderabad`,
    rating: nampallyGoogleRating,
    phoneLabel: nampallyPhone,
    tel: nampallyTelPhone,
    directionsHref: nampallyDirections,
  },
];

export function Footer() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className={styles.footer} aria-labelledby="footer-title">
      <div className={styles.container}>
        {/* ---- 1. Closing brand statement ------------------------- */}
        <div className={styles.closing}>
          <p id="footer-title" className={styles.statement}>
            Changing smiles <span>since {ESTABLISHED_YEAR}.</span>
          </p>
        </div>

        {/* ---- 2. Navigation -------------------------------------- */}
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <BrandLockup testId="link-footer-brand" />
            <p className={styles.brandSentence}>
              Specialist-led dental care in Hyderabad, delivered with clarity,
              precision and a personal touch.
            </p>
            <div className={styles.socialRow}>
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Neodent on ${social.label}`}
                    className={styles.socialLink}
                    data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                  >
                    {Icon && <Icon size={17} aria-hidden="true" />}
                  </a>
                );
              })}
            </div>
          </div>

          <nav className={styles.exploreCol} aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={styles.colLabel}>
              Explore
            </h2>
            <ul className={styles.linkList}>
              {exploreLinks.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} data-testid={`link-footer-${item.id}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.treatmentsCol} aria-labelledby="footer-treatments">
            <h2 id="footer-treatments" className={styles.colLabel}>
              Treatments
            </h2>
            <ul className={styles.linkList}>
              {treatmentLinks.map((treatment) => (
                <li key={treatment.number}>
                  <Link
                    href={treatment.href}
                    data-testid={`link-footer-treatment-${treatment.number}`}
                  >
                    {treatment.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contactCol}>
            <h2 className={styles.colLabel}>Contact</h2>
            <a
              href={ctaTelPhone}
              className={styles.contactCall}
              data-testid="link-footer-call-neodent"
            >
              <span>Call Neodent</span>
              {ctaPhone}
            </a>
            <Link
              href={navHref("Contact")}
              className={styles.textAction}
              data-testid="link-footer-enquiry"
            >
              Send an enquiry <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>

          {/* ---- 3. Locations ------------------------------------- */}
          <section className={styles.locations} aria-labelledby="footer-locations">
            <h2 id="footer-locations" className={styles.colLabel}>
              Locations
            </h2>
            <ul className={styles.branchList}>
              {branches.map((branch) => (
                <li className={styles.branch} key={branch.id}>
                  <div className={styles.branchHead}>
                    <h3 className={styles.branchName}>
                      <Link
                        href={branch.pageHref}
                        data-testid={`link-footer-branch-${branch.id}`}
                      >
                        {branch.name}
                      </Link>
                    </h3>
                    <p
                      className={styles.rating}
                      data-testid={`text-footer-rating-${branch.id}`}
                    >
                      <span className={styles.srOnly}>Google rating: </span>
                      <span className={styles.ratingScore}>{branch.rating.score}</span>
                      <span className={styles.ratingStar} aria-hidden="true">
                        ★
                      </span>
                      <span className={styles.ratingCount}>
                        {branch.rating.count} Google reviews
                      </span>
                    </p>
                  </div>
                  <p className={styles.branchAddress}>{branch.location}</p>
                  <div className={styles.branchActions}>
                    <a
                      href={branch.tel}
                      className={styles.branchPhone}
                      data-testid={`link-footer-phone-${branch.id}`}
                    >
                      {branch.phoneLabel}
                    </a>
                    <a
                      href={branch.directionsHref}
                      className={styles.textAction}
                      aria-label={`Get directions to Neodent ${branch.name}`}
                      data-testid={`link-footer-directions-${branch.id}`}
                    >
                      Directions <ArrowRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ---- 4. Legal and credit -------------------------------- */}
        <div className={styles.legal}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Neodent Dental Hospital
          </p>
          <ul className={styles.legalLinks}>
            <li>
              <Link href="/privacy-policy" data-testid="link-footer-privacy">
                Privacy
              </Link>
            </li>
            <li>
              <span>Terms</span>
            </li>
            <li>
              <button
                type="button"
                className={styles.legalLinkButton}
                onClick={openPreferences}
                data-testid="button-footer-cookie-preferences"
              >
                Cookie Preferences
              </button>
            </li>
          </ul>
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
