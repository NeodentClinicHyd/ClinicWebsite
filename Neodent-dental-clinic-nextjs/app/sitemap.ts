import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-data";

/**
 * Native Next.js sitemap (served at /sitemap.xml).
 *
 * Only real, publicly indexable routes are listed here. There is no
 * /terms route in this project (see Footer, which only shows a plain
 * "Terms" label, not a link) and no dynamic, internal, API, preview
 * or test routes exist to enumerate.
 *
 * `lastModified` uses the build/request time rather than a fabricated
 * historical date, since the project has no per-page content
 * timestamps to draw from. `changeFrequency` is only set where it
 * reflects a real difference in how often a page's content changes
 * (the home page surfaces the most frequently touched content —
 * treatment highlights, media — everything else is comparatively
 * static informational content).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/treatments`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/clinic`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      priority: 0.3,
    },
  ];
}
