# CHANGELOG: clinic-mehdipatnam

## R0: discovery and snapshots (2 Nov 2026)

- **Run id:** r0. No site code changed.
- **Decisions recorded:** `OWNER_DECISIONS.md` (Plan A, FAQ approved, Q3 to Q5 defaults), `FAQ_APPROVED.md`.
- **Tooling:** `scripts/page-*.mjs` do not exist. Slug-generic copies from `.audit/clinic/tools/` are in `.audit/clinic-mehdipatnam/tools/`. Commands: `node .audit/clinic-mehdipatnam/tools/<tool>.mjs <slug> <route> [run-id]`.
- **Baselines:** `content-snapshot.json` for `clinic-mehdipatnam` (units 109, headings 18, links 24, images 11) and `clinic-nampally-guard` (units 108, links 24, images 10).
- **Files created:** `OWNER_DECISIONS.md`, `FAQ_APPROVED.md`, `OWNERSHIP.md`, `DISCOVERY.md`, `CONTENT_QUESTIONS.md`, `CHANGELOG.md`, the two snapshots.
- **Ownership:** all of `components/clinic/branch/*` and `app/clinic/[slug]/*` are owned (imported only by the branch route). `useReveal`, `ClinicShared.module.css` and `ClinicGalleryViewer` are shared with `/clinic` and `/contact`, so branch sections stop importing them and use `components/motion/Reveal` and local CSS and a forked lightbox.
- **Plan vs page:** gallery is dark and has 8 photos; S8 is a local block; the doctor card has no quote; the video has no poster; intro is 101 words (no `<details>`).
- **Content check:** missing: 0 by definition (baseline).

## R1: foundation, header S1, intro + Visit card S2 (2 Nov 2026)

- **Run id:** r1.
- **Files changed:**
  - New: `components/pages/clinic-mehdipatnam/BranchPage.module.css` (page custom properties), `BranchBackdrop.tsx` + `.module.css` (glow + icon-pattern layers, copied from the /clinic hub recipe).
  - Rewritten: `components/clinic/branch/BranchHero.tsx` + `.module.css`, `BranchDetails.tsx` + `.module.css`.
  - Edited: `app/clinic/[slug]/ClinicBranchClientChrome.tsx` (server component now, page wrapper class), `components/clinic/branch/branch-content.ts` (added `locationLine` per branch; earlier uncommitted edits left as they were).
  - `app/clinic/[slug]/page.tsx` untouched.
- **Summary:**
  - S1: dark gradient + red glow + icon pattern; breadcrumb inside the band with 44 px links; class-keyed load animation (headline, lede, actions, photo rise + 1.04 settle, glass cards at 450 and 600 ms); glass cards: opening hours (moved from the copy column, same text) and location ("Humayun Nagar, Mehdipatnam" from `branchContent.locationLine`); cards stack under the photo on phones; photo capped at 38dvh below 1024 px and at `--media-max-h` above; `preload` on the one header image; glow/drift only at 768 px and up.
  - S2: plain-ink heading (mask reveal), 68ch reading column, paragraph stagger, sticky Visit & contact card on desktop (full width on phones), Call (red) first then Get directions, phone link 44 px tall. No `<details>` (101 words).
  - Branch hero/details no longer import `useReveal` or `ClinicShared.module.css`.
- **Content check:** Mehdipatnam `missing: 0`, `shortened: 0` (units 110, links 24, images 11). Nampally guard `missing: 0` (units 109).
- **Audit r1:** hero 1366x650 fits (h1 bottom 369, actions visible); no overflow at 360/390/768; no media over 70% in S1; remaining flags are in sections not yet rebuilt (gallery images 78% at 1366, team/connections small text and tap targets, patient caption 10 px). Backdrop layers are reported as "wide" but are clipped by the band.
- **Questions:** none new. Nampally location card reads "Medwin Hospital Complex, Nampally" (from its own intro copy).
- **Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic-mehdipatnam\r1\1366-fold.png`, `...\r1\390-fold.png`, `...\r1\s2-1366.png`, `...\r1\s2-390.png`.

## R2: gallery S3 (2 Nov 2026)

- **Run id:** r2.
- **Files changed:** new `components/pages/clinic-mehdipatnam/BranchLightbox.tsx` + `.module.css` (native `<dialog>` lightbox forked from the /clinic hub's GalleryLightbox), `SwipeDots.tsx` + `.module.css` (copy of the Dr. Miftah dots; active dot stretched with `transform`, not width). Rewritten: `components/clinic/branch/BranchGallery.tsx` + `.module.css`.
- **Summary:** kept the dark band (the real gallery is dark; changing it would put S2, S3 and S4 in a light row). Heading now plain ivory (no red italic), mask reveal. Desktop: four-column masonry flow, tall photos 3:4, short photos 4:3, `object-fit: cover`, capped at `--media-max-h-compact`, hairline, caption beneath. Below 1024 px: one snap-scrolling row (86% cards, 46% from 640 px), 8 progress dots (44 px), no counter, focusable row (arrow keys scroll). Click or Enter opens the lightbox (Escape, arrows, focus returns to the photograph). Photos use `next/image` `fill` with `sizes`, lazy. The branch gallery no longer imports `ClinicGalleryViewer`, `useReveal` or `ClinicShared`.
- **Content check:** Mehdipatnam `missing: 0` (8 gallery buttons with their aria-labels, 8 captions, 11 images with alts unchanged). Nampally guard `missing: 0`.
- **Audit r2:** gallery no longer flagged for media over 70% at 1366 (was 5 images at 78%); mobile gallery 668 px tall (was 3913 px); no overflow at 360/390/768. "Wide elements" reported at 360/390 are the swipe-row cards, which scroll inside the row.
- **Notes:** the mask reveal clips outside the photo frame, so the focus ring is drawn inside the frame and the frame has no outer shadow on the dark band. Masonry columns end unevenly (normal for masonry).
- **Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic-mehdipatnam\r2\gallery-1366.png`, `...\r2\gallery-390.png`.

## R3: featured treatments S4 (2 Nov 2026)

- **Run id:** r3.
- **Files changed:** rewritten `components/clinic/branch/BranchTreatments.tsx` + `.module.css`. Uses the R2 `SwipeDots` copy.
- **Summary:** heading plain ink (mask reveal). Desktop: 4-column grid, seven cards (surface fill, hairline, 16 px radius, red 42 px icon moved to the top with CSS `order`, title 19 px, summary 15 px, action word, whole card is the link, hover lift on fine pointers) plus the existing "Explore all treatments" link moved into an eighth dark card (whole card clickable through a stretched link; the link appears once). Below 1024 px: one snap-scrolling row (84% cards, 44% from 640 px), 8 dots, link card last. Additional services: wide light panel under the grid, heading and intro on the left, four groups as chip lists on the right (one column on phones). All 14 items kept as plain text (they are not links). Staggered `rise` on the cards, `rise` on the panel.
- **Content check:** Mehdipatnam `missing: 0` (seven card links keep their exact href and text, one `/treatments` link). Nampally guard `missing: 0`.
- **Audit r3:** no empty grid slot at 1366 (4 + 4 cells); no overflow at 360/390/768; the treatments section is 1436 px tall at 390 (was 2323 px). No flags remain in S4 (the 11 px "Surgical" label is now 15 px).
- **Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic-mehdipatnam\r3\treat-1366.png`, `...\r3\treat-390.png`.

## R4: people S5 + doctor and other-clinic cards S6 (2 Nov 2026), CODE WRITTEN, NOT VERIFIED

- **Status:** paused before the fast check. The Neodent dev server is no longer on http://localhost:3000. That port is now served by a different project (`E:\Local Clients\Next.js\arogyadiet`, node PID 16444), which redirects every route to `/login`. The agent rules forbid starting or stopping servers, so no content check, audit or screenshots were run for R4.
- **Files rewritten (unverified):** `components/clinic/branch/BranchClinicalTeam.tsx` + `.module.css` (dark band, 16:9 group photo left, seven dark glass rows right, 44 px profile links, ghost "Meet our doctors" button, red italic kept on "your care."), `BranchConnections.tsx` + `.module.css` (light band; dark contained doctor card and light other-clinic card with a photo of at most 150 px, equal height; swipe row with dots below 1024 px, photo 120 px; back link kept).
- **tsc (filtered to owned paths):** no errors. ESLint on both files: no output (clean).
- **Still to do for R4:** run the content check for both slugs, `page-audit.mjs ... r4`, and look at the screenshots once the Neodent dev server is back on port 3000.
