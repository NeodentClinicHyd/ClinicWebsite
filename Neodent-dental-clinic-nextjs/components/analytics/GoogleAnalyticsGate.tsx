"use client";

// Loads Google Analytics 4 only after the visitor has allowed the
// "analytics" category in the cookie consent panel. Until then no request
// is made to googletagmanager.com / google-analytics.com and no GA cookie
// is set.
//
// Mounted once inside <CookieConsentProvider> in app/layout.tsx, so it
// covers every route. Page views: gtag.js with Enhanced Measurement
// ("Page changes based on browser history events") records App Router
// client-side navigations itself, so no manual page_view is sent here
// (sending one would double-count).

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "@/components/consent/CookieConsentContext";
import { GA_ENABLED, GA_MEASUREMENT_ID, gaDisableKey } from "@/lib/analytics";

function clearGaCookies() {
  const suffix = GA_MEASUREMENT_ID.replace(/^G-/, "");
  const names = ["_ga", `_ga_${suffix}`, "_gid", "_gat"];
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [undefined, host, parts.length > 2 ? `.${parts.slice(-2).join(".")}` : `.${host}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function GoogleAnalyticsGate() {
  const { consent } = useCookieConsent();
  const allowed = GA_ENABLED && consent?.analytics === true;

  // Honour a later withdrawal of consent within the same session: a loaded
  // gtag.js cannot be unloaded, but it can be told to stop sending.
  useEffect(() => {
    if (!GA_ENABLED) return;
    const w = window as unknown as Record<string, unknown>;
    if (allowed) {
      w[gaDisableKey()] = false;
    } else if (w[gaDisableKey()] === false) {
      w[gaDisableKey()] = true;
      clearGaCookies();
    }
  }, [allowed]);

  if (!allowed) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
