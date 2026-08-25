// Cookie / privacy consent — shared types + storage helpers.
//
// WHAT COUNTS AS ESSENTIAL: core site rendering, navigation and the
// same-origin `sessionStorage` flag Home.tsx uses to avoid re-showing
// the lead-capture prompt (lib/site-data.ts LEAD_CAPTURE_SESSION_KEY).
// None of that is third-party or tracking, so it isn't offered as a
// toggle — it simply always runs.
//
// WHAT IS OPTIONAL: today that's exactly one thing — the YouTube
// embeds in the About page's media archive (components/sections/about/
// BeyondTheClinic.tsx). They already load via a thumbnail facade and
// only become a live `youtube-nocookie.com` iframe on click; consent
// gates that click. There is no analytics, tag manager, Google Maps
// embed or marketing pixel anywhere in this codebase — do not add
// categories for technologies that don't exist here.
//
// HOW CONSENT IS PERSISTED: a single JSON object in `localStorage`
// under a versioned key. Bumping CONSENT_VERSION invalidates any
// previously stored decision so returning visitors are asked again —
// do that whenever the categories on offer meaningfully change.

export const CONSENT_STORAGE_KEY = "neodent-cookie-consent-v1";
export const CONSENT_VERSION = "1";

/** Optional, consent-gated categories. Add a key here only once the
 *  corresponding technology actually exists in the codebase. */
export interface OptionalConsent {
  /** Third-party YouTube embeds (About page media archive). */
  media: boolean;
}

export interface ConsentRecord extends OptionalConsent {
  /** Always true — required functionality is never gated. */
  necessary: true;
  timestamp: string;
  version: string;
}

export const DEFAULT_OPTIONAL_CONSENT: OptionalConsent = {
  media: false,
};

function isConsentRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<ConsentRecord>;
  return (
    record.necessary === true &&
    typeof record.media === "boolean" &&
    typeof record.timestamp === "string" &&
    typeof record.version === "string"
  );
}

/** Reads the stored consent decision. Returns null if none exists,
 *  it's malformed, or it was saved under a previous consent version. */
export function readStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isConsentRecord(parsed)) return null;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    // localStorage unavailable (privacy mode, disabled storage, etc.)
    return null;
  }
}

export function writeStoredConsent(optional: OptionalConsent): ConsentRecord {
  const record: ConsentRecord = {
    necessary: true,
    ...optional,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore write failures — consent state still holds for this
    // session via in-memory React state, it just won't persist.
  }
  return record;
}
