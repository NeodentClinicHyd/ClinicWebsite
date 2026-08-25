"use client";

// Site-wide cookie/privacy consent provider.
//
// Mounted once in app/layout.tsx so every route shares one consent
// state. Renders the compact banner until a decision exists, and the
// preferences panel whenever it's requested (from the banner or from
// the footer's "Cookie Preferences" link).
//
// SSR / HYDRATION: the server always renders with no stored decision
// (localStorage doesn't exist there), so the banner would flash on
// every load if we read storage during render. Instead we start
// "hasMounted" false and resolve the real stored value inside a
// client-only effect, matching the empty-server-render output and
// avoiding a hydration mismatch.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_OPTIONAL_CONSENT,
  readStoredConsent,
  writeStoredConsent,
  type OptionalConsent,
} from "@/lib/cookie-consent";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { CookiePreferencesPanel } from "@/components/consent/CookiePreferencesPanel";

interface CookieConsentContextValue {
  /** Null until a decision has been made (banner should show). */
  consent: OptionalConsent | null;
  /** Opens the preferences panel — used by the banner and the footer link. */
  openPreferences: () => void;
  /**
   * Enables every currently available optional category (today, just
   * `media`) and persists it as the visitor's decision. Exposed so a
   * gated embed (e.g. the About page's YouTube facade) can offer a
   * one-click "allow" inline, without duplicating the storage logic.
   */
  acceptAll: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [consent, setConsent] = useState<OptionalConsent | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const stored = readStoredConsent();
    if (stored) {
      setConsent({ media: stored.media });
    }
  }, []);

  const save = useCallback((optional: OptionalConsent) => {
    writeStoredConsent(optional);
    setConsent(optional);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    save({ media: true });
  }, [save]);

  const rejectNonEssential = useCallback(() => {
    save({ ...DEFAULT_OPTIONAL_CONSENT });
  }, [save]);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({ consent, openPreferences, acceptAll }),
    [consent, openPreferences, acceptAll],
  );

  // Nothing to show until we know whether storage held a decision.
  const showBanner = hasMounted && consent === null && !preferencesOpen;

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {showBanner && (
        <CookieConsentBanner
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onManagePreferences={openPreferences}
        />
      )}
      {hasMounted && preferencesOpen && (
        <CookiePreferencesPanel
          initialValues={consent ?? DEFAULT_OPTIONAL_CONSENT}
          onSave={save}
          onClose={closePreferences}
        />
      )}
    </CookieConsentContext.Provider>
  );
}
