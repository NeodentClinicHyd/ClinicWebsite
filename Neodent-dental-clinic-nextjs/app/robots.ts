import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-data";

/**
 * Native Next.js robots file (served at /robots.txt).
 *
 * Public crawling is allowed across the site. There are no API
 * routes, internal dashboards, or preview/test routes in this project
 * to disallow, so no `disallow` entries are fabricated. Points
 * crawlers at the generated sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
