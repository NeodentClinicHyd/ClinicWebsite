# CHANGELOG: dr-miftah (`/doctors/dr-miftah-ur-rahman`)

## R0 (1 Nov 2026): discovery, snapshot, ownership, photo inventory

**Files created (docs and tools only):** `OWNERSHIP.md`, `DISCOVERY.md`, `PHOTO_INVENTORY.md`, `ALLOWLIST_PROPOSAL.json`, `CONTENT_QUESTIONS.md`, `content-snapshot.json`, this file. Outside git: `.audit/dr-miftah/tools/*` (copied from `.audit/doctors/tools/`, plus `digest.mjs`, `photo-inventory.mjs`; `shot-el.mjs` re-pointed to the dr-miftah folder), `.audit/dr-miftah/R0/*`, `.audit/dr-miftah/photo-inventory.json`.

**Site code changed:** none.

**Content check:** not applicable (this run creates the baseline). Baseline: units=418, headings=69, links=26, images=70, buttons=66, JSON-LD=5.

**Audit R0 (baseline):** overflowX 0 at all widths; media over 70%: 7 at 1366x650; tap targets under 44: 7 (360, 390), 18 (768); text under 12 px: 25 items.

**Differences from the plan:** see `DISCOVERY.md` section 2. The main ones: the script names in the plan do not exist (equivalents under `.audit`); the real closing block is inline; "Explore treatment" is a dialog button; there is a second ceremony photo; the breadcrumb "Doctors" link points to the page itself; the old philosophy sentence occurs only in `DrMiftahProfile.tsx` (owned), nowhere in metadata or JSON-LD.

**Shared-change requests:** none yet.

**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\R0\` (`1366-fold.png`, `390-fold.png`, `1440-full.png`, `390-full.png`, `390-nojs-full.png`, `s05-edu.png`, `s06.png`, `s08.png`).

**Questions for the owner:** `CONTENT_QUESTIONS.md`.

## R1 (1 Nov 2026): forks, foundation, header

**Files created:** `components/pages/dr-miftah/` with `DrMiftahPage.module.css` (page custom properties, dark-band recipe values), `DrMiftahBackdrop.tsx` + css (glow and masked icon pattern, copied from the `/doctors` recipe, own filter id), `DrMiftahHeader.tsx` + css, `DrMiftahPageView.tsx` (chrome), `lib/pages/dr-miftah-content.ts` (name, breadcrumbs, philosophy constant, header photo).
**Forks (copies of the owned `components/doctors/*`, import paths switched to the copy):** `DrMiftahProfile`, `FilmCard`, `MediaRail`, `SmileDesignStory`, `TreatmentDetailDialog`, `TreatmentDossier`, `TreatmentEvidenceViewer` (each `.tsx` + `.module.css`). The originals in `components/doctors/` are untouched and now unused by the route. Hero code and the `PORTRAIT` constant were removed from the copy of `DrMiftahProfile.tsx`.
**Files edited:** `app/doctors/dr-miftah-ur-rahman/DoctorProfileClientChrome.tsx` (now renders `DrMiftahPageView`). `page.tsx` untouched (metadata and JSON-LD byte-identical).
**Header:** per plan section 5. Breadcrumb Doctors now links `/doctors`. Added supporting line with `/clinic/mehdipatnam` and `/clinic/nampally` links, "Call for Consultation" (`ctaTelPhone`), "Send an enquiry" (`/contact`). The two old buttons are now quiet text links with the same text and `#clinical-focus` / `#publications`. Photo is the one preloaded image, 5:4, focal 78% 36%, `max-height: var(--media-max-h)`, tag "01 / Clinical practice" and caption on a gradient. Fact strip with `CountUp` on 15. Ghost "DR.", "NEODENT · HYD" and "Scroll" are kept as quiet 12-13 px text (not allowlisted): "DR." as a small mark before the first fact, the other two on the right of the strip. Load animation is class-keyed CSS.
**Content check:** missing 0, shortened 0 (excepted: the old breadcrumb link `/doctors/dr-miftah-ur-rahman` "Doctors", replaced by `/doctors` as the plan requires). Units 418 -> 428, links 26 -> 30.
**tsc / eslint:** no errors or warnings on owned paths.
**Audit R1:** overflowX 0 at 360/390/768/1366; header has no media over 70%, no tap target under 44, no text under 12 px. Remaining items are in sections not yet restyled (R2 to R6).
**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\R1\1366-fold.png`, `390-fold.png`, `390-full.png`, `390-nojs-full.png`, `768-full.png`, `1366-full.png`, `360-full.png`. 1366-fold: h1, tagline, credentials, both buttons, text links and the photo all above the fold; fact strip starts at the fold. 390-fold: order is breadcrumb, eyebrow, h1, tagline, credentials, role, supporting line, call, enquiry, text links, then the photo.

## R2 (1 Nov 2026): profile index, philosophy statement (A1), biography

**Files created:** `components/pages/dr-miftah/ProfileIndex.tsx` + css, `PhilosophyCard.tsx` + css (fork of the home `SeamCard`, text-only, `<blockquote>` + `<cite>`, no dotted offset outline, no tilt, `Reveal` rise), `Biography.tsx` + css.
**Files edited:** `DrMiftahProfile.tsx` (copy): old `ProfileIndex`, `Biography`, the `SeamCard` import and usage, three unused constants removed; the three new components mounted. Original shared `SeamCard` untouched.
**A1:** the old sentence is gone from every owned file (`grep "even when it is mobile"` over owned paths: no hits). The page now shows "Save the natural teeth till the last stage." once, as the blockquote (last clause "till the last stage." in the red italic accent), with `<cite>` "Dr. Md. Miftah Ur Rahman". Constant is in `lib/pages/dr-miftah-content.ts` (`MIFTAH_PHILOSOPHY`); `lib/clinical-team.ts` does not export it. Not in metadata or JSON-LD, so `page.tsx` is unchanged.
**01:** semantic `<dl>`, "Mehdipatnam" and "Nampally" link to the clinic pages, `CountUp` on 15, decorative photo at 7% opacity faded top and bottom. Ghost numerals removed (the numbers remain in the eyebrow text "01 / PROFILE INDEX", which stays because it is not allowlisted).
**02:** paragraphs 3 and 4 inside one `<details>` ("More about his practice and training"), two highlights left ("planning before treatment begins", "more than fifteen years"), other highlights are plain text. Photographs: operatory (cover, focal 50% 30%, 4:5, `max-height: var(--media-max-h)`) with the treatment-room inset overlapping its lower right corner; under 1024 px a two-card swipe row.
**Content check:** missing 0. Excepted: old philosophy sentence (A1) and the old breadcrumb link. (The checker was changed to compare headings without whitespace, because the old h2 lines were joined without a space in the DOM; words are identical.)
**tsc / eslint:** clean.
**Audit R2:** overflowX 0 at all widths. The 01, seam card and 02 blocks have no media over 70%, no tap target under 44 and no text under 12 px (remaining items belong to later sections).
**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\R2\index-1366.png` (heading left, four-row list right over the faded photo, card starting below), `seam-1366.png` (card: label, two-line statement with red italic last clause, cite), `bio-1366.png` (copy left, operatory photo with the inset overlapping its corner), `bio-390.png` (text, then the swipe row with the second card peeking).

## R3 (1 Nov 2026): specialisation, case story, full scope

**Files created:** `Specialisation.tsx` + css (dark band, four glass cards, hosts the case story), `FullScope.tsx` + css, `SectionHead.tsx` + css (shared eyebrow/h2/supporting line for sections 03 to 10), `SwipeDots.tsx` + css (progress dots for swipe rows), `SpecFigures.tsx` + css and `ScopeIcons.tsx` + css (the existing SVG illustrations and icons moved out of the big file, with their rules extracted from the old module).
**Files edited:** `DrMiftahProfile.tsx` (copy: old `Specialisation`, evidence helpers, `FullScope`, icons, `SCOPE_ROWS` removed; imports trimmed; new sections mounted), `SmileDesignStory.tsx` (the decorative 01-06 numeral line is now six real buttons, each 44 px, named "Photograph n of 6", opening that photograph in the viewer; the step numbers stay as 12 px text under each dot), `SmileDesignStory.module.css` (override block appended at the end: 12 px labels, no red italic on the title, dots, 44 px cue).
**03:** four dark glass cards (one row from 1280 px, 2 x 2 from 768 px, swipe row at 84% with progress dots under 768 px). Kept: every thumbnail, Pre/Mid/Post, "Explainer", "Treatment", "View images", the description sentence, "Explore treatment" (still a dialog button), the hidden dossier block. The hairline crossing the cards is gone (the old module's `.section::before/::after` no longer applies). Card numerals "01" to "04" stay as 13 px text (not allowlisted).
**Case story:** same band, mechanics unchanged (collapsed shows the final result, "Click to view / The smile journey" unfolds the six). "06 / 06" counter kept as "FINAL RESULT · 06 / 06" at 12 px (not allowlisted).
**04:** light band; "Care shaped around individual needs" is now the supporting line (plan-authorised), 7 cards 4 + 3 with the second row growing, whole card is the link (link text unchanged: number, title, tags, "View treatment"), phone: one column of compact rows (about 100 px tall each).
**Content check:** missing 0 (excepted: A1 sentence, breadcrumb link). **tsc / eslint:** clean. **Audit R3:** overflowX 0; 03, case story and 04 have no media over 70%, no tap under 44 and no text under 12 px in my CSS; remaining audit items are in sections 05 to 10 and the viewer/dialog files (R9 sweep).
**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\R3\spec-1366.png` (03 cards in one row with the case story below), `scope-1366.png` (04, 4 + 3 grid), `spec-390.png` (03 swipe row with dots, then case story), `scope-390.png` (04 compact rows).

## R4 (1 Nov 2026): education, academic and research, clinical teaching films

**Files created:** `Education.tsx` + css, `AcademicResearch.tsx` + css.
**Files edited:** `DrMiftahProfile.tsx` (copy): old `Education`, `AcademicResearch`, their constants and imports removed; new sections mounted.
**05 (dark):** h2 "A foundation" + red italic "built formally." (accent 1 of 4), supporting line directly under the heading, five-stage stepper with a connecting line that draws with scroll (`animation-timeline: view()` where supported, drawn in full elsewhere), every school/university/label kept. Stage 05 "Gold Medallist" is a normal step in full contrast (the earlier faint look was a reveal state in the full-page capture; no bug in the code). Facts row "05 Stages / 04 Institutions / FICOI — U.S.A." as a visible 13 px row. Both photographs kept (certificate with "Recognition" label and caption; the second "ii / Professional ceremony" plate, which the plan did not list). Under 1024 px: stepper first, then the two photographs as a two-card swipe row with dots (each at most 38dvh).
**06 (light):** teaching card with the seminar photograph, all three publications (01 Cureus 2026, 02 Bioinformation 2026, 03 JPBS 2024) with exact link text, PubMed logo and count, "VIEW ON PUBMED". The 350 px gap and the tall empty column under "Clinical teaching" are gone: the heading block, the film intro and the films share one row, nothing stretches. Films: poster-first cards, 9:16 with the width derived from `--media-max-h-compact` (190 px wide, 338 px tall at 650 px), each opens the shared evidence viewer (nothing plays in place, so no autoplay rules apply). Phone: swipe row with dots.
**Process note:** a UTF-8 BOM added by PowerShell `Set-Content` made the first CSS rule of `Education.module.css` fail (section showed on a light background). Stripped; all files are written without BOM now.
**Content check:** missing 0. **tsc / eslint:** clean.
**Audit R4:** overflowX 0; media over 70% at 1366x650: 3 (the three In practice reels, section 07, fixed in R5); sections 05 and 06 have none. Tap < 44 and text < 12: none in 05/06.
**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\R4\edu-1366.png` (dark band, stepper left, two photos right, all five stages readable), `academic-1366.png` (teaching card + three publications, films row below), `edu-390.png`, `academic-390.png`.

## R5 (1 Nov 2026): in practice reels, patient voices

**Files created:** `InPractice.tsx` + css, `PatientVoices.tsx` + css. **Edited:** `DrMiftahProfile.tsx` (copy: old sections, `REVIEWS`, `GOOGLE_PROFILE_URL` and unused imports removed; new sections mounted).
**07 (dark):** heading block left (sticky from 1024 px), three reels right, each a 9:16 poster whose width is derived from `--media-max-h` (about 248 x 442 px at 650 px height, 68% of the viewport). Under 1024 px a swipe row (cards 62% wide) with progress dots. Kept: "Clinical films", "01 — 03", the "Dr. Md. Miftah Ur Rahman · Neodent" labels, titles, "View film", "Clinical work · Neodent Hyderabad", "03 films". The posters are buttons that open the shared viewer, which loads and plays the MP4 on open; nothing plays in place, so "one film at a time" holds by construction. No sound button was added (which films have speech is unknown, Q-E). Numbers on the posters (01 to 03) stay (not allowlisted).
**08 (light):** h2 "What patients say." + red italic "In their own words." (accent 2 of 4), supporting line under it, five review cards in one swipe row (about 3.25 visible on desktop, 86% on a phone), focusable region ("Patient reviews from Google"), progress dots, verbatim text (including "I've got My front smile teeth placed here."), reviewer, age, "VIA GOOGLE", "READ ALL REVIEWS ON GOOGLE". Card numbers 01 to 05 stay as small red serif numerals. No rating or review schema.
**Content check:** missing 0. **tsc / eslint:** clean.
**Audit R5:** overflowX 0; media over 70% at 1366x650: 0 (was 7 at R0); 390 and 360 none. Remaining tap/text items are in sections 09, 10 and the shared viewer files.
**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\R5\practice-1366.png` (heading left, three reels right at about 400 px high), `voices-1366.png` (three cards and a peek, dots), `practice-390.png` (reel row with dots), `voices-390.png`.

## R6 (1 Nov 2026): recognition press archive, where to find him, zoom viewer

**Files created:** `ImageLightbox.tsx` + css (native `<dialog>` zoom viewer, built here for reuse by the photograph wall in R7), `PressArchive.tsx` + css (09), `Locations.tsx` + css (10), `ClosingCta.tsx` + css (the page's own closing block, restyled).
**Files edited:** `DrMiftahProfile.tsx` is now a plain composition of the twelve section components (the old 2,000-line body is gone). **Files removed from the forked folder:** `DrMiftahProfile.module.css` (72 KB, including the page-wide vertical hairline and ghost-numeral rules), `MediaRail.tsx` + css (the originals stay in `components/doctors/`, unused).
**ImageLightbox:** `showModal()` dialog, image `contain` with `data-media-exempt`, visible caption, previous/next (44 px), close, Esc, arrow keys, swipe, 250 ms fade + 0.98 to 1 scale (none under reduced motion), focus back to the opener, page scroll locked. Tested in Chromium: opens from clipping 01 with "Press archive · 1 of 13", caption "The Siasat Daily, Hyderabad", ArrowRight goes to 2 of 13 and ArrowLeft back, Esc closes, focus returns to the clipping button, one `data-media-exempt` image on the page.
**09 (dark):** heading "Recognition earned over time." (plain), "Press archive" and "13 clippings · select to enlarge" kept, 13 clippings in a swipe row shown whole at `min(--media-max-h-compact, 400px)` tall (38dvh on phones), 44 px previous/next buttons, a thin progress bar instead of dots, soft 28 px edge fade instead of the heavy vignette. The endless marquee is gone: no continuous animation, and each clipping is in the DOM once (the old DOM held each three times, two as aria-hidden clones). The per-clipping numerals 01 to 13 stay as small labels (not allowlisted). Button names are unchanged ("Open press clipping 01 of 13 — The Siasat Daily, Hyderabad").
**10 (light):** sentence with its three links directly under the heading; two cards side by side from 768 px with the exterior photograph, the interior inset on its lower corner, labels, address (unchanged), phone, "Directions"; ADDED "Opening hours" line from `clinicLocations.*` in `lib/clinic-data.ts` ("Monday–Saturday, 4:00 PM – 8:00 PM. Sunday holiday." and "Monday–Saturday, 10:30 AM – 5:00 PM. Sunday holiday."), nothing typed by hand. Phone: one card per clinic, its two photographs as a swipe row. **Open question Q-B:** the old code comment said hours were left off on purpose pending a Google Business Profile discrepancy; the plan asks for them, so they are shown. Remove the `<p className={styles.hours}>` block in `Locations.tsx` if you want them off.
**Closing block:** same words; the red italic on "conversation." is removed (the accent is limited to four places).
**Content check:** missing 0 (excepted: A1 sentence; breadcrumb link; the 12 duplicate press-image copies, now 1 each). All 13 clippings, both addresses, both phones and the three links are present.
**tsc / eslint:** clean. **Audit R6:** overflowX 0 at all widths; media over 70%: 0 at 1366x650; tap targets under 44: 0 at all widths; text under 12 px: 2 items left, both in the shared `FilmCard` CSS (R9).
**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\R6\press-1366.png` (heading, meta, row of clippings, progress bar and buttons), `loc-1366.png` (two branch cards), `loc-390.png` (card per clinic, photo swipe row), `press-390.png`; `.audit\dr-miftah\lightbox\press-open.png` (viewer open on clipping 1 of 13 with caption and arrows).

## R7 (1 Nov 2026): photograph wall (new section SW)

**A2 status:** not approved (the prompt's A2 line was empty), so step 8 was skipped: **no `ImageGallery` JSON-LD block was added and no sitemap request was made.** To add them later: say "A2 approved" and run step 8.
**Files created:** `PhotoWall.tsx` + css. **Edited:** `lib/pages/dr-miftah-content.ts` (`MIFTAH_PHOTOS`: ten entries with real pixel sizes, the plan's alt/caption strings word for word, URL-encoded paths of the unchanged files), `DrMiftahProfile.tsx` (mounted after `PressArchive`, before `Locations`). `ImageLightbox` (from R6) reused unchanged.
**Wall:** dark band with a red glow behind the wall; eyebrow "Photographs", h2 "Dr. Miftah, in photographs.", the supporting line from the plan. One `<ul>` of ten `<li><a href=original file><img></a></li>`, DOM order 1 to 10, each `alt` exactly as in the plan, `next/image` lazy (no priority) with `sizes="(max-width: 640px) 34vw, 240px"`, `aria-haspopup="dialog"`. Click opens the lightbox on that photograph (tested: "Photographs · 4 of 10", caption, ArrowRight/ArrowLeft, Esc closes, focus returns to the tile, one `data-media-exempt` image). Closed `<details>` "Photograph details" holds the ten captions (in the server HTML).
**Technique:** every tile has `aspect-ratio` from its real size; its width is its share of its row; shares for three groupings are computed in TypeScript and written as custom properties; CSS picks the set per breakpoint, so each row has equal heights with no duplicated markup and no slider. Photograph 8 (591 x 1280, very narrow) is shown with a display ratio of 0.5 (crop under 8% of its width) so its tile stays tappable.
**Measured (Chromium, `.audit/dr-miftah/tools/wall-check.mjs`):**
- 1366 x 650 and 1920 x 1080: rows 5 + 5, row heights 172 px and 165 px, section 521 px tall (plan: at most 560), smallest tile 82 x 165 (photograph 8; the plan hoped for 100 px, not possible at its natural ratio without a heavier crop). No horizontal overflow.
- 1024: 5 + 5, heights 180 / 172, heading above.
- 768: 4 + 3 + 3, heights 192 / 180 / 276, smallest tile 138 px wide.
- 390 x 844: 3 + 2 + 2 + 3, heights 145 / 131 / 131 / 131 (wall about 560 px), no overflow; 360: 3 + 2 + 2 + 3, heights 132 / 120 / 120 / 120, smallest tile 60 x 120. No row has a single tile at 360, 390, 768, 1024, 1366 or 1920. Each image appears once in the DOM.
**Content check:** missing 0. **tsc / eslint:** clean.
**Audit R7:** overflowX 0, media over 70%: 0 at 1366x650 and on phones.
**Screenshots:** `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\wall\wall-1366.png` (heading left, two rows of five right, "Photograph details" below), `wall-390.png` (3 + 2 + 2 + 3), `wall-768.png`, `.audit\dr-miftah\lightbox\wall-open.png` (viewer on photograph 4 with its caption).

## R8 (1 Nov 2026): optional FAQ

**Not run.** A3 (visible FAQ and `FAQPage` JSON-LD) was not approved. No FAQ, no schema change.

## R9 (1 Nov 2026): motion and polish

**Files edited:** `FilmCard`, `SmileDesignStory`, `TreatmentDetailDialog`, `TreatmentDossier` CSS modules (every `font-size` under 12 px raised to 12 px: 16 declarations; `.audit/dr-miftah/tools/sweep-fonts.mjs`), touch press states (`:active`, transform only, off under reduced motion) added to `Specialisation`, `PressArchive` and `FilmCard`.
**Section and reveal list** (shared `Reveal` from `components/motion` unless noted; 640 ms ease-out, `transform` and `opacity` only; hidden start state is set by JavaScript after mount, so nothing is hidden in the server HTML):
- Header: class-keyed CSS keyframes (line-mask rise on the h1, tagline/credentials/role at 260 ms, supporting line 360 ms, actions 460 ms, fact strip 560 ms; photograph mask-rise 24 px with a 1.04 to 1 settle). Glow breathing and pattern drift from 768 px up only.
- 01: eyebrow and h2 rise (80 ms), `dl` rows stagger 80 ms, `CountUp` on 15.
- Philosophy card: rise.
- 02: eyebrow/h2 rise, paragraph block stagger 80 ms, photographs stagger 150 ms.
- 03: heading rise, four cards stagger 100 ms with hover lift and press state; case story keeps its own unfold choreography (CSS transforms).
- 04: heading rise, seven cards stagger 80 ms, hover lift/press.
- 05: heading rise, five stages stagger 100 ms, connecting line drawn with scroll (`animation-timeline: view()`), photographs stagger 150 ms.
- 06: heading rise, teaching card, publications (stagger 80 ms), films (stagger 100 ms).
- 07: heading rise, reels stagger 100 ms.
- 08: heading rise, review cards stagger 80 ms.
- 09: heading rise, clippings stagger 60 ms, progress bar follows scroll.
- Photograph wall: heading rise, ten tiles stagger 70 ms (700 ms total), tiles settle 1.04 to 1, hover lift 2 px (hover-capable devices), press state on touch.
- 10: heading rise, cards stagger 100 ms. Closing block: eyebrow, h2, line, buttons rise at 0/80/160/240 ms.
- Viewers: `ImageLightbox` 250 ms fade and 0.98 to 1 scale. The older evidence viewer and treatment dialog keep their own open transitions.
**Checks (`.audit/dr-miftah/tools/motion-check.mjs`):** JavaScript off: no hidden or semi-transparent text in `<main>` after load; reduced motion: nothing hidden or transformed after a full scroll, 0 infinite animations; 390 px touch: 0 running infinite animations; desktop: every section's reveals reached `data-shown`.
**Red italic accent:** only the header tagline ("A patient's pace."), the philosophy statement ("till the last stage."), section 05 ("built formally.") and section 08 ("In their own words."). The closing block's "conversation." lost its accent in R6, the case-story title accent in R3.
**Banned items:** ghost numerals, the page-wide vertical hairline, corner marks and the old Atmosphere layer are gone with the old module; no rotated labels; two highlighted phrases at most (section 02 has two). Numerals used as eyebrows or labels ("01 / PROFILE INDEX", "01" to "04" on cards, the stepper numbers and so on), "DR.", "NEODENT · HYD" and "Scroll" remain as plain text of 12 px or larger because `content-allowlist.json` was not saved.
**Content check:** missing 0. **eslint:** clean.
**Audit R9:** overflowX 0 at 360/390/768/1366; media over 70%: 0; tap targets under 44 px: 0; text under 12 px: 0 (was 25).
**Screenshots:** `.audit\dr-miftah\R9\` (`1366-fold.png`, `390-fold.png`, `390-full.png`, `390-nojs-full.png`, `768-full.png`, `1366-full.png`, `360-full.png`).

## R10 (1 Nov 2026): final check and screenshots

**Result: pass on every check below.**

**Files changed in the whole redesign (commit by path):**
- `app/doctors/dr-miftah-ur-rahman/DoctorProfileClientChrome.tsx` (modified; now renders the new page view). `page.tsx` (metadata and JSON-LD) is untouched.
- `components/pages/dr-miftah/` (new, 53 files): page: `DrMiftahPageView`, `DrMiftahPage.module.css`, `DrMiftahBackdrop`, `DrMiftahHeader`, `DrMiftahProfile`; sections: `ProfileIndex`, `PhilosophyCard`, `Biography`, `Specialisation`, `FullScope`, `Education`, `AcademicResearch`, `InPractice`, `PatientVoices`, `PressArchive`, `PhotoWall`, `Locations`, `ClosingCta`; helpers: `SectionHead`, `SwipeDots`, `ImageLightbox`, `SpecFigures`, `ScopeIcons`; forks of the old components (restyled or kept as is): `SmileDesignStory`, `FilmCard`, `TreatmentEvidenceViewer`, `TreatmentDetailDialog`, `TreatmentDossier`. Each has its `.module.css`.
- `lib/pages/dr-miftah-content.ts` (new: name, breadcrumbs, philosophy constant, header photo, ten wall photographs).
- `docs/internal-pages/dr-miftah/`: `PAGE_PLAN.md` (yours), `OWNERSHIP.md`, `DISCOVERY.md`, `PHOTO_INVENTORY.md`, `ALLOWLIST_PROPOSAL.json`, `CONTENT_QUESTIONS.md`, `CHANGELOG.md`, `content-snapshot.json`, `check-exceptions.json`.
- Not in git (`.audit/` is ignored): `.audit/dr-miftah/tools/*` and the screenshots.
- The old `components/doctors/*` files and `lib/miftah-*` data files are unchanged (the route no longer imports `components/doctors/*`; they can be removed in a later cleanup commit). No shared file was edited. `app/doctors/page.tsx`, `components/pages/doctors/`, `lib/pages/doctors-content.ts` and the About/Doctors docs belong to other sessions and were not touched.

**Checks:**
- Walk-through at 1366x650 and 390x844 (sections screenshotted one by one in R2 to R7, whole page in 6 parts at 1440): every section follows its plan pattern and has an on-scroll reveal; no card more than 35% empty; no media over 70% of the viewport; no overflow at 360.
- Photograph wall: ten photographs visible together at 1366x650 (5 + 5, section 521 px tall), 3 + 2 + 2 + 3 at 390 (about 560 px), viewer opens, moves with arrows, closes with Esc and returns focus.
- Philosophy: "Save the natural teeth till the last stage." is the only statement on the page; `grep "even when it is mobile"` over every owned file: 0 hits; not in the rendered text.
- `tsc --noEmit` (filtered to miftah paths): no errors. `eslint` on all owned paths: clean.
- Content check: **missing 0, shortened 0** (excepted by plan: the old philosophy sentence under A1; the breadcrumb "Doctors" link now `/doctors`; 12 duplicated press-image copies). Units 418 -> about 430, links 26 -> 32, headings 69 -> 69, JSON-LD identical (5 blocks).
- Audit `final`: overflowX 0 at 360, 390, 768, 1366, 1440; media over 70%: 0; tap targets under 44 px: 0; text under 12 px: 0; one h1. (R0 baseline: 7 media over 70%, up to 18 small tap targets, 25 small texts.)
- Motion: JavaScript off readable, reduced motion final state, no infinite animation on phones (motion-check).

**Forks made:** `SeamCard` -> `PhilosophyCard`; the seven `components/doctors/*` files copied to `components/pages/dr-miftah/` and then restyled or split; `ImageLightbox` is new. **Shared-change requests:** none. **Not done:** A2 (ImageGallery JSON-LD and image sitemap; not approved), R8 FAQ (A3 not approved), removal of decorative numerals / "DR." / "NEODENT · HYD" / "Scroll" (needs `content-allowlist.json`; they are plain 12 px or larger text now).

**Open questions for the owner** (details in `CONTENT_QUESTIONS.md`): save `content-allowlist.json` so the numbered eyebrows, card numerals and the three decorative strings can go (one short follow-up run); confirm the opening hours in section 10 (the old code said hours were off on purpose); approve A2 and/or A3; confirm photo captions Q4 (AIMS institute spelling, who is in photograph 6, MLA name, permission to publish) and whether more photographs (Q3) should join the wall; which practice films have speech (sound button); the "other clinics" wording in the biography; whether `/doctors` should link to this page from its cards (not changed here).

**Screenshots:**
- Desktop full page (1440): `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\final\desktop-full.png`
- Mobile full page (390): `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\dr-miftah\final\mobile-full.png`
- Also in `.audit\dr-miftah\final\`: `desktop-part1.png` to `desktop-part6.png`, `360-full.png`, `768-full.png`, `1366-full.png`, `1366-fold.png`, `390-fold.png`, `390-nojs-full.png`; wall: `.audit\dr-miftah\wall\`; viewer: `.audit\dr-miftah\lightbox\`.
