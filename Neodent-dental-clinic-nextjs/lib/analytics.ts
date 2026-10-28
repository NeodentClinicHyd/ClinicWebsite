// Google Analytics 4 configuration.
//
// The Measurement ID is a public identifier (it is visible in every page's
// network traffic), not a secret. It can be overridden per environment with
// NEXT_PUBLIC_GA_MEASUREMENT_ID; the default is the production GA4 property.
//
// This is a GA4 Measurement ID (G-...), NOT a Google Tag Manager container.
// There is no GTM container in this project.

export const GA_MEASUREMENT_ID: string =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-YD86ZGLGBV";

/** Only production builds report, so `next dev` and local QA never
 *  pollute the live property. */
export const GA_ENABLED = process.env.NODE_ENV === "production";

/** gtag.js honours `window['ga-disable-<ID>'] = true` as an opt-out. */
export function gaDisableKey(id: string = GA_MEASUREMENT_ID): string {
  return `ga-disable-${id}`;
}
