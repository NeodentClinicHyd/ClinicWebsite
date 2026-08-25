import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site-data";

/**
 * Native Next.js web manifest (served at /manifest.webmanifest).
 *
 * This is a lightweight manifest for browser/OS integration (add to
 * home screen icon, theme colour in the OS task switcher) — it does
 * not turn the site into an installable PWA (no `display: standalone`
 * install prompts are being pursued here, but `standalone` is the
 * conventional value browsers expect even for this lighter use, and
 * it degrades gracefully to a normal browser tab).
 *
 * Icons reuse the real NeoDent logo artwork already shipped in
 * `app/` (android-chrome-192x192.png / android-chrome-512x512.png),
 * the same files already wired into `<head>` via Next's automatic
 * icon file convention — no new image asset is created here.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "NeoDent",
    description:
      "Specialist-led dental care in Hyderabad, at NeoDent Dental Hospitals — Mehdipatnam and Nampally.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6ef",
    theme_color: "#d71920",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
