import type { ReactNode } from "react";
import styles from "./ScopeIcons.module.css";

/* ------------------------------------------------------------------
   04 — FULL SCOPE (cream) — compact editorial treatment index:
   breadth to Specialisation's depth. Ruled 4-column tile grid, each
   tile = number + compact 32-grid index icon + serif name + focus
   tag/verb + View treatment arrow. Icons are a companion system to
   the Specialisation illustrations (FEATURE vs INDEX) — silhouette
   first, one red accent each, aria-hidden (the name carries the
   meaning), fully visible at rest.
   ------------------------------------------------------------------ */
function ScopeIconComposite() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M10 12 C10 9.5 12 8 14 8.2 C15 8.4 15.5 9 16 9 C16.5 9 17 8.4 18 8.2 C20 8 22 9.5 22 12 C22 15 21 16 20.7 19 C20.4 22.5 20 26 18.5 26 C17 26 17.2 21.5 16 21.5 C14.8 21.5 15 26 13.5 26 C12 26 11.6 22.5 11.3 19 C11 16 10 15 10 12 Z"
      />
      <path
        className={styles.scopeIconRedFill}
        d="M17.6 10.6 C19.2 11 20.3 12 20.6 13.4 C20.8 14.2 20.7 14.8 20.5 15.2 L17.2 14.4 C17.3 13.1 17.4 11.8 17.6 10.6 Z"
      />
    </svg>
  );
}

function ScopeIconImplant() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path className={styles.scopeIconDetail} d="M5 18 H27" />
      <path
        className={styles.scopeIconPrimary}
        d="M11.5 9 C11.5 7 13 5.8 16 5.8 C19 5.8 20.5 7 20.5 9 L20.5 12.5 L11.5 12.5 Z"
      />
      <path
        className={styles.scopeIconPrimary}
        d="M14 12.5 H18 L18.7 14.5 H13.3 Z"
      />
      <path
        className={styles.scopeIconPrimary}
        d="M13 14.5 L19 14.5 L18.2 25.5 L13.8 25.5 Z"
      />
      <path
        className={styles.scopeIconDetail}
        d="M12.9 17.5 H19.1 M13.1 20 H18.9 M13.4 22.5 H18.6"
      />
      <path className={styles.scopeIconAccent} d="M9 18 H12.2 M19.8 18 H23" />
    </svg>
  );
}

function ScopeIconRootCanal() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M10 12 C10 9.5 12 8 14 8.2 C15 8.4 15.5 9 16 9 C16.5 9 17 8.4 18 8.2 C20 8 22 9.5 22 12 C22 15 21 16 20.7 19 C20.4 22.5 20 26 18.5 26 C17 26 17.2 21.5 16 21.5 C14.8 21.5 15 26 13.5 26 C12 26 11.6 22.5 11.3 19 C11 16 10 15 10 12 Z"
      />
      <path
        className={styles.scopeIconDetail}
        d="M14.7 12 C14.3 16 14 20 13.6 23.5 M17.3 12 C17.7 16 18 20 18.4 23.5"
      />
      <circle className={styles.scopeIconRedFill} cx="16" cy="11" r="1.5" />
    </svg>
  );
}

function ScopeIconOrthodontics() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path className={styles.scopeIconDetail} d="M6.5 13 H25.5" />
      <rect
        className={styles.scopeIconPrimary}
        x="7.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="12.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="17.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="22.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <path className={styles.scopeIconPrimary} d="M5.5 17 H26.5" />
      <rect
        className={styles.scopeIconInkFill}
        x="13.2"
        y="15.4"
        width="3.2"
        height="3.2"
        rx="0.6"
      />
      <rect
        className={styles.scopeIconRedFill}
        x="17.6"
        y="15.4"
        width="3.2"
        height="3.2"
        rx="0.6"
      />
    </svg>
  );
}

function ScopeIconSmile() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M6.5 10.5 C9 22 23 22 25.5 10.5"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="8"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="11.7"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="15.4"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="19.1"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="22.8"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <path
        className={styles.scopeIconAccentDash}
        d="M9.5 20.5 C12.5 24 19.5 24 22.5 20.5"
      />
    </svg>
  );
}

function ScopeIconRehabilitation() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M9 5 C9 11 12 13.5 16 13.5 C20 13.5 23 11 23 5"
      />
      <path
        className={styles.scopeIconPrimary}
        d="M9 27 C9 21 12 18.5 16 18.5 C20 18.5 23 21 23 27"
      />
      <path
        className={styles.scopeIconDetail}
        d="M12 5 C12 9.5 13.5 11.5 16 11.5 C18.5 11.5 20 9.5 20 5 M12 27 C12 22.5 13.5 20.5 16 20.5 C18.5 20.5 20 22.5 20 27"
      />
      <path className={styles.scopeIconAccent} d="M16 14 V18 M14.2 16 H17.8" />
    </svg>
  );
}

function ScopeIconScaling() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M10 12 C10 9.5 12 8 14 8.2 C15 8.4 15.5 9 16 9 C16.5 9 17 8.4 18 8.2 C20 8 22 9.5 22 12 C22 15 21 16 20.7 19 C20.4 22.5 20 26 18.5 26 C17 26 17.2 21.5 16 21.5 C14.8 21.5 15 26 13.5 26 C12 26 11.6 22.5 11.3 19 C11 16 10 15 10 12 Z"
      />
      <path
        className={styles.scopeIconAccent}
        d="M23.5 8 L25.5 6 M25.5 11 L28 10 M22.5 4.5 L23.3 2.5"
      />
    </svg>
  );
}

export const SCOPE_ICONS: Record<string, ReactNode> = {
  "01": <ScopeIconComposite />,
  "02": <ScopeIconImplant />,
  "03": <ScopeIconRootCanal />,
  "04": <ScopeIconOrthodontics />,
  "05": <ScopeIconSmile />,
  "06": <ScopeIconRehabilitation />,
  "07": <ScopeIconScaling />,
};
