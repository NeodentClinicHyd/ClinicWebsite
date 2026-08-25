"use client";

import { useEffect, useRef } from "react";
import styles from "./CookieConsentBanner.module.css";

/* ------------------------------------------------------------------
   Compact, unobtrusive cookie banner. No backdrop/scrim — the page
   stays visible and interactive behind it, per the "no dark pattern"
   requirement: Accept all, Reject non-essential and Manage
   preferences are all equally sized, equally reachable text/buttons.

   Collision avoidance, two directions:
   1. The banner measures its own rendered height and writes it to a
      CSS variable on <html> (--cookie-banner-space) so the
      persistent floating Call button (see app/globals.css
      .floating-cta) can offset itself above the banner instead of
      being covered by it. Removed once a decision is made, so no
      other page is affected outside the banner's lifetime.
   2. Home/Treatments render a fixed full-width mobile call bar
      (global `.mobile-bar`, see app/globals.css) that the banner must
      not sit underneath. Since that element uses a plain global
      class name (not a CSS module), it's queried directly here to
      lift the banner clear of it wherever it's present. ------------------------------------------------------------------ */

interface CookieConsentBannerProps {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onManagePreferences: () => void;
}

export function CookieConsentBanner({
  onAcceptAll,
  onRejectNonEssential,
  onManagePreferences,
}: CookieConsentBannerProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const wrapper = wrapperRef.current;
    if (!card || !wrapper) return;

    const root = document.documentElement;
    const baseOffset = 20; // matches .wrapper's default `bottom`

    const reposition = () => {
      const mobileBar = document.querySelector<HTMLElement>(".mobile-bar");
      const clearance =
        mobileBar && mobileBar.offsetParent !== null
          ? mobileBar.offsetHeight
          : 0;
      wrapper.style.bottom = `${baseOffset + clearance}px`;
      root.style.setProperty(
        "--cookie-banner-space",
        `${Math.ceil(card.offsetHeight + clearance)}px`,
      );
    };

    reposition();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", reposition);
      return () => window.removeEventListener("resize", reposition);
    }
    const observer = new ResizeObserver(reposition);
    observer.observe(card);
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--cookie-banner-space");
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      role="region"
      aria-label="Cookie consent"
    >
      <div ref={cardRef} className={styles.card}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>We use cookies</p>
          <p className={styles.text}>
            NeoDent uses cookies and similar technologies to keep the website
            working, understand how visitors use our site, and support
            certain embedded content. You can choose which optional
            technologies you allow.{" "}
            <a className={styles.link} href="/privacy-policy">
              Privacy Policy
            </a>
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnManage}`}
            onClick={onManagePreferences}
            data-testid="button-manage-cookie-preferences"
          >
            Manage preferences
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={onRejectNonEssential}
            data-testid="button-reject-non-essential"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onAcceptAll}
            data-testid="button-accept-all-cookies"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
