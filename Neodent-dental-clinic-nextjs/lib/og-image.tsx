import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site-data";

/**
 * Shared renderer for the site's default Open Graph / Twitter card
 * image. Used by both `app/opengraph-image.tsx` and
 * `app/twitter-image.tsx` so the two stay pixel-identical without
 * duplicating the JSX.
 *
 * Uses the real Neodent logo (the same artwork already shipped as
 * `officialLogo` in lib/site-data.ts / used across the site) centred
 * on a brand ivory background, rather than inventing a new graphic.
 * No claims, ratings or stats are rendered into the image — just the
 * verified brand mark, name and locations.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT = `${SITE_NAME} — Mehdipatnam & Nampally, Hyderabad`;

export async function renderDefaultOgImage() {
  const logoData = await readFile(
    join(
      process.cwd(),
      "public/assets/Neodent dental hospital hyderabad logo.jpeg",
    ),
  );
  const logoSrc = `data:image/jpeg;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f6ef",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: 28,
            fontSize: 44,
            fontWeight: 700,
            color: "#161c1e",
            letterSpacing: "-0.01em",
          }}
        >
          Neodent Dental Hospital
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 26,
            color: "#d71920",
            fontWeight: 600,
          }}
        >
          Mehdipatnam &amp; Nampally, Hyderabad
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
