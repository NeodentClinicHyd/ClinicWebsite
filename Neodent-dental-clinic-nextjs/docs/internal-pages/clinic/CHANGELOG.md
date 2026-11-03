# CHANGELOG: Clinics hub (`/clinic`)

## R0: Discovery and content snapshot (31 Oct 2026)

**Run id:** R0. **Code changed:** none.

**Files created**
- `docs/internal-pages/clinic/content-snapshot.json` (baseline from server HTML, JavaScript off: 71 units, 10 headings, 23 links, 15 images, 10 buttons, 4 JSON-LD blocks)
- `docs/internal-pages/clinic/OWNERSHIP.md`
- `docs/internal-pages/clinic/DISCOVERY.md`
- `docs/internal-pages/clinic/CONTENT_QUESTIONS.md`
- `docs/internal-pages/clinic/CHANGELOG.md`
- `.audit/clinic/tools/` (`common.mjs`, `page-content-snapshot.mjs`, `page-content-check.mjs`, `page-audit.mjs`, `nojs-top.mjs`, `r0-probe.mjs`, `r0-reveal-probe.mjs`). The first five are slug-generic copies of `.audit/treatments-hub/tools/`, because `scripts/page-*.mjs` named in the plan do not exist. Run as `node .audit/clinic/tools/page-content-check.mjs clinic /clinic` and `node .audit/clinic/tools/page-audit.mjs clinic /clinic <run-id>`.
- `.audit/clinic/R0/` (probe.json, header and treatment screenshots)

**Summary**
- Dev server responded 200 on `/clinic`.
- Seven sections found, matching the plan's S0 to S6. S0 and S1 share one component (`ClinicHero`).
- Six components in `components/clinic/` are imported only by this page and will be forked. Three shared files must not change: `ClinicShared.module.css`, `ChooseClinic.module.css` and `useReveal.ts` (all used by `/contact`; the first and third also by the branch pages).
- The red band is clinic-only (`ClinicVisit`), not `ContactNextStep`.
- The marker underlines are `EditorialHighlight`, not links.
- Strip numbers are static (no `CountUp`).
- The invisible S5 heading is the page's own reveal state (opacity 0 until intersected), not a colour clash. Details in DISCOVERY 5(d).
- Media over 70% vh at 1366x650: header photo 78%, both Surroundings photos 73%.
- Text under 12 px: header eyebrow (11 / 9.5), header caption (11), card dt labels (11), mobile card kicker (11), "Explore all treatments" (11).

**Content check:** not applicable to R0 (baseline created).

**Audit numbers:** not run (docs-only run).

**Questions for the owner**
1. Mehdipatnam address: data says "10-3-14B/11/1 … 500006"; the plan says "10-3-148/11/1 … 500028". Which is right?
2. Higher-resolution file for the Mehdipatnam entrance photo (382x510 today).
3. Confirm the "both cards say Dr. Md. Miftah Ur Rahman practises here" line (Nampally included).
4. Q1 to Q11 in PAGE_PLAN.md section 12 are still open. R1 to R5 use the stated defaults. R6 needs Q6.

**Shared-change requests:** none.

**Screenshots (absolute paths)**
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic\R0\1366-full.png`
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic\R0\390-full.png`
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic\R0\treatments-1366.png`
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic\R0\treatments-390.png`

**Unfinished:** nothing.


## R1: Page wrapper, forks, S0 header, S1 fact strip (31 Oct 2026)

**Files created** (all under `components/pages/clinic/`): `ClinicPageView.tsx`, `ClinicPage.module.css` (page custom properties), `ClinicBackdrop.tsx` + `.module.css` (glow and icon pattern, copied from the home hero recipe via `/about`), `ClinicHeader.tsx` + `.module.css`, `ClinicFacts.tsx` + `.module.css`.
**Files edited:** `app/clinic/page.tsx` (two lines: the import and the returned component). The `metadata` export is untouched; `git diff` shows only those two lines. The page has no JSON-LD of its own.
**Originals untouched:** everything under `components/clinic/` and `app/clinic/ClinicClientChrome.tsx` (now unused by any route).

**What changed**
- `ClinicPageView` replaces `ClinicClientChrome`: same `Navbar overHero`, `Footer`, `.site` wrapper. S2 to S6 still render from the original components.
- S0 header: eyebrow is plain 13 px sentence-case text with no rule line; h1 text and red italic second line unchanged (the h1 keeps its exact baseline text, with no added space); paragraph unchanged, with the two `EditorialHighlight` marks replaced by plain text and one heavier `<strong>` on "specialist-led dental care" (every word kept); "Call Mehdipatnam" red and "Call Nampally" outline, `tel:` from `lib/clinic-data.ts`; photo with the original alt text, `preload` (Next 16 replacement for `priority`), focal point 68% 42%, 3:4 on desktop capped at `--media-max-h-compact` (52% of the viewport at 1366x650), 4:3 at most 38dvh below 1024 px; caption "Mehdipatnam / Waiting lounge" on a bottom gradient; grid lines, red frame and corner tick removed.
- Addition (Q5 default): two dark glass cards with each clinic's name and hours from `lib/clinic-data.ts`. They overlap the photo's lower edge on desktop and sit under the photo on phones. Load animation is CSS-keyed (photo rise + settle, cards at 450 and 600 ms); glow breathing and pattern drift from 768 px up, off under reduced motion.
- S1 strip: light strip, "At a glance" label inside it, four facts in a row on desktop and a 2 by 2 grid below 768 px. Labels unchanged. `CountUp` on 2, 7 and 25,000+; "Since 1994" is static. Hairlines are borders on the cells so no cell shows a grey gap before its reveal.

**Content check:** `missing: 0`, `shortened: 0`, h1 count 1, link delta 0 (units 71 to 73: the two hours cards).
**tsc / eslint:** no output for the owned paths.
**Audit R1:** header and strip clean. 360/390/768: overflowX 0, no media over 70%; 1366: two media over 70% (Surroundings photos 73%, R3). Remaining tap and text findings are all in sections not yet redone: phone links 32 px high (S2), 11 px card labels and "Explore all treatments" (S2, S5). "Wide elements" are the clipped backdrop layers.
**Header numbers:** 1366x650: h1, paragraph and both buttons visible, header ends at y=566, photo 52% of the viewport. 390x844: h1 bottom at 194 px, Call Mehdipatnam visible at the fold, photo 38dvh, buttons 50 px tall.
**Screenshots:** `.audit/clinic/R1/1366-fold.png`, `390-fold.png`, `strip-1366.png`, `strip-390.png`, `header-390.png`, `1366-full.png`, `390-full.png`, `390-nojs-full.png` (absolute prefix `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\`).
**Shared-change requests:** none. **Open questions:** Q5 (glass cards) built under its default. **Unfinished:** nothing in R1 scope.


## R2: Clinic cards, S2 (31 Oct 2026)

**Files created:** `components/pages/clinic/ClinicCards.tsx`, `ClinicCards.module.css`. **Edited:** `ClinicPageView.tsx` (S2 now renders `ClinicCards`; the original `ChooseClinic` is no longer imported). Originals and the shared `ChooseClinic.module.css` (used by `/contact`) are untouched.

**What changed**
- Heading text and the red italic accent unchanged ("Find your clinic. Mehdipatnam or Nampally."), mask reveal. Addition (Q7 default): one supporting line under it, "Two Neodent dental clinics in Hyderabad: Mehdipatnam in Humayun Nagar and Nampally in the Medwin Hospital Complex."
- Two equal cards (same height on desktop): 16:10 photo (540x338, 52% of the 650 px viewport; at most 38dvh on phones) with the caption on a bottom gradient and a mask reveal; name as h3; kicker; paragraph; Address / Phone / Hours as a real `<dl>` with 13 px normal-case labels; then actions. Phone, address, hours, `tel:` and directions come from `lib/clinic-data.ts`; kickers, paragraphs, alt texts and captions are the original strings.
- Underlined phrases are `EditorialHighlight` (not links); both per card paragraph are kept (primary + secondary, within the limit of two). The phone number stays a `tel:` link, now 44 px tall.
- Actions: "Call" red full row, "Get directions" and "Clinic details" outline side by side below it, all 50 px. Hidden screen-reader text in the buttons kept. Dr. rows keep text and `/doctors/dr-miftah-ur-rahman`, restyled as a light bordered row with a chevron (52 px).
- Ids `#our-clinics`, `#mehdipatnam`, `#nampally` kept. Cards stagger 100 ms; desktop hover lift moves the card itself, off for touch and reduced motion.

**Content check:** `missing: 0`, `shortened: 0`, link delta 0 (units 74: header cards plus the supporting line).
**tsc / eslint:** clean. **Audit R2:** 360/390/768: overflow 0, tap targets under 44 px: 0 (was 2), media over 70%: 0. 1366: media over 70% still the two Surroundings photos (R3). Text under 12 px left: "Explore all treatments" (R5).
**Screenshots:** `.audit/clinic/R2/head-1366.png`, `head-390.png`, `cards-1366.png`, `cards-390.png`, `1366-full.png`, `390-full.png`, `390-nojs-full.png`. (The `cards-*` element crops show the fixed Navbar over the card and, at 390, a card caught mid-reveal; `head-*` are the true viewport views.)
**Open questions:** Q7 supporting line wording. The Mehdipatnam entrance photo is a 382x510 source and looks soft at card width (see CONTENT_QUESTIONS 11).


## R3: Different surroundings, S3 (31 Oct 2026)

**Files created:** `components/pages/clinic/Surroundings.tsx`, `Surroundings.module.css`, `SurroundingsPhotos.tsx` (small client wrapper for the mobile swipe row and its dots). **Edited:** `ClinicPageView.tsx` (S3 now renders `Surroundings`; original `ClinicalSettings` no longer imported). Originals untouched.

**What changed**
- Heading wording unchanged; its second sentence is now in the normal heading style (no red italic), as per the Q3 default. Statement text unchanged, with its two italic phrases.
- Dark band (charcoal gradient + `ClinicBackdrop`, glow and pattern moved behind the right-hand photo, clear of the heading). Desktop: photo, red statement card (vertically centred, about 25% empty), photo. Photos are cover-cropped, 3:4, capped at `--media-max-h` (442 px, 68% of the 650 px viewport). Captions (clinic name + caption, both kept) are now on a gradient at the bottom of each photo; the light caption boxes are gone. Alt text, crops and captions still come from `clinicGalleryImages`.
- Tablet: two photos side by side, then the card. Phones: the card first, then one swipe row with both photos (85% wide, snap, focusable, two progress dots, no "1 / 2" counter). Both photos stay in the DOM.
- Reveal: heading mask, photos mask with settle, card rise 150 ms after. Glow breathing and pattern drift from 768 px up, off under reduced motion (from `ClinicBackdrop`).

**Content check:** `missing: 0`, `shortened: 0`, link delta 0.
**tsc / eslint:** clean. **Audit R3:** media over 70% of the viewport: 0 at all four widths (was 2 at 1366); overflow 0; tap targets under 44 px: 0. The "wide elements" listed at 360/390 are the photos inside the scroll row (clipped by the row) and the backdrop layers. Text under 12 px left: "Explore all treatments" (R5).
**Screenshots:** `.audit/clinic/R3/section-1366.png`, `section-390.png`, `sur-1366.png`, `sur-390.png`, `1366-full.png`, `390-full.png`, `390-nojs-full.png`.
**Open questions:** none new.


## R4: Spaces designed around care, S4 (31 Oct 2026)

**Files created:** `components/pages/clinic/SpacesGallery.tsx` + `.module.css`, `GalleryLightbox.tsx` + `.module.css`. **Edited:** `ClinicPageView.tsx` (S4 now renders `SpacesGallery`; original `InsideNeoDent` no longer imported). The shared `ClinicGalleryViewer` (used by the branch pages) is untouched.

**What changed**
- Heading and paragraph unchanged; heading in the normal style (no red italic). The paragraph keeps its two `EditorialHighlight` phrases (within the limit of two).
- Tabs "Mehdipatnam" and "Nampally": `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, roving tabindex, Arrow, Home and End keys. Both panels are in the server HTML. JavaScript adds the `enhanced` class (via `useSyncExternalStore`, no hydration mismatch) that shows the tabs and hides the inactive panel; the panel that becomes active fades in with a 12 px rise (420 ms). Each panel keeps its group heading (h3). Verified with Playwright: with JavaScript off both panels are visible and the tabs are hidden.
- Desktop: Mehdipatnam is a four-column bento in the order Waiting lounge (spans 2 columns and 2 rows), Entrance, Reception counter, Director's office, Treatment room, Treatment chamber, Patient lounge, Waiting hall (spans 2 columns), so three rows fill with no gap. Nampally: two photos side by side over two rows. Largest tile 582x387 (about 60% of the 650 px viewport).
- Phones: one snap-scrolling row per panel (cards 85% wide, keyboard focusable) with progress dots. The section is 848 px tall at 390 wide (about one screen) per active panel.
- Captions are below the photos, 13 px, every word kept; all ten photos keep their original alt text and stay in the DOM as `next/image` (lazy, `sizes` set, crops from the data).
- Lightbox: native `<dialog>` opened with `showModal()` on tap or Enter. Shows the photo whole (`object-fit: contain`) within the media cap with branch and caption; previous, next and close buttons are 48 px; Escape closes; arrow keys move within the same panel; focus returns to the tile. Checked in Playwright: opens, ArrowRight shows "Mehdipatnam | Director's office", Escape closes, focus returns to the "Reception counter" tile, no console errors. Fades in (opacity only), none under reduced motion. No new library.
- Reveal: heading mask, paragraph rise, tiles stagger rise 80 ms, key photo mask reveal.

**Crossfade note:** the incoming panel fades in; the outgoing panel is removed at once (stacked panels would leave a large empty area under the shorter Nampally panel).
**Content check:** `missing: 0`, `shortened: 0`, link delta 0, 15 images. **tsc / eslint:** clean.
**Audit R4:** overflow 0 at all widths, no media over 70%, no tap target under 44 px; only text under 12 px left: "Explore all treatments" (R5).
**Screenshots:** `.audit/clinic/R4/section-main-1366.png`, `section-390.png`, `tab-pair-1366.png`, `lightbox-1366.png`, `390-nojs-full.png`, `1366-full.png`, `390-full.png`.
**Open questions:** Q4 default (tabs + lightbox) applied.


## R5: Featured treatments (S5) and consultation band (S6) (31 Oct 2026)

**Files created:** `components/pages/clinic/TreatmentsStrip.tsx` + `.module.css`, `VisitBand.tsx` + `.module.css`. **Edited:** `ClinicPageView.tsx` (every section now comes from `components/pages/clinic/`; no original under `components/clinic/` is imported by the page any more). Originals untouched. S6 is clinic-only, not `ContactNextStep`, so it was forked (Q2 default: labels kept).

**What the invisible heading was:** not a colour clash. The old heading was ivory on charcoal (about 13:1). It carried `data-reveal`, which the old local `useReveal` hid (opacity 0, 12 px down) until an observer saw it or 6 s passed, so stitched captures caught it unrevealed (details in DISCOVERY 5(d)). The new heading uses the shared `Reveal` mask, which renders the final state without JavaScript, under reduced motion and for content already on screen.

**What changed**
- S5: heading unchanged with the red italic on "at both clinics." (one of the three allowed places); addition (Q7 default): "Both Neodent clinics in Hyderabad, Mehdipatnam and Nampally, offer all seven treatments." No highlights on the dark band.
- Eight cards, 4 by 2 on desktop, 2 columns on tablet, one compact column on phones with the icon on the left. Each card is one link with the title as the first text; icon, title, summary (word for word) and category word. The category words stay `REPAIR` etc. in the DOM and CSS shows them as "Repair", "Replace" (14 px, bold, no all-caps). The eighth card keeps its text and its `/treatments` link in an outlined style. Hover lift (fine pointers only), press state on touch, arrow nudge.
- S6: red card on ivory, wording and the three buttons unchanged; desktop heading left and buttons stacked right; phones: three full-width 50 px buttons, bottom padding `96px + env(safe-area-inset-bottom)` to clear the floating call button. The heading's second line is set in the normal heading style (no italic), per the Q3 default.
- Reveal: S5 heading mask, cards stagger 90 ms; S6 card rise, buttons stagger 80 ms.

**Content check:** `missing: 0`, `shortened: 0`, link delta 0; all seven treatment links and `/treatments` present; heading fully visible at 1366 and 390 in the viewport screenshots.
**tsc / eslint:** clean. **Audit R5:** overflow 0, tap targets under 44 px: 0, text under 12 px: 0, media over 70%: 0, at 360, 390, 768 and 1366. Only two dark bands plus the footer, none adjacent except treatments, then the ivory band, then the footer.
**Screenshots:** `.audit/clinic/R5/treat-1366.png`, `treat-390.png`, `visit-1366.png`, `visit-390.png`, `1366-full.png`, `390-full.png`, `390-nojs-full.png`.
**Open questions:** Q2 (kept as is), Q3, Q7.


## R7: Motion and polish (31 Oct 2026)

**Files edited** (all under `components/pages/clinic/`): `ClinicHeader.module.css`, `ClinicCards.module.css`, `VisitBand.module.css` (button hover lift and press state). No other file changed. New check script: `.audit/clinic/tools/r7-check.mjs`.

**Reveal per section (walked top to bottom):** header: CSS-keyed load animation (eyebrow, h1, paragraph, actions rise; photo rise + settle; caption and the two hours cards at 300, 450 and 600 ms). Strip: stagger rise 100 ms + `CountUp` on 2, 7 and 25,000+. Clinic cards: heading mask, supporting line, cards stagger 100 ms, photo mask. Surroundings: heading mask, photos mask, card rise +150 ms. Spaces: heading mask, paragraph rise, tiles stagger 80 ms, key photo mask, tab-panel fade (12 px rise), lightbox fade. Treatments: heading mask, supporting line, cards stagger 90 ms. Visit band: card rise, buttons stagger 80 ms. Every section has a reveal; none needed adding.

**Added in this run:** button hover lift (2 px, fine pointers, 768 px and wider) and press state (scale 0.98) on the header, clinic-card and visit-band buttons, transform only; the global `.button` colour transitions are kept in the same `transition` list.

**Checks run (Playwright, `r7-check.mjs`)**
- After scrolling the full page at 1366: no element is left faded or hidden.
- Reduced motion: no animations running, no reveal state armed (`data-reveal-ready` count 0), nothing faded except the decorative pattern layer (opacity 0.125 by design) and the hover-only zoom icons. Screenshots `.audit/clinic/R7/reduced-fold.png`, `reduced-full.png`.
- Phone (390, touch): 0 infinite animations. Glow breathing and pattern drift run from 768 px only.
- Red italic phrases in headings: exactly "One Neodent standard." (h1), "Mehdipatnam or Nampally." (S2) and "at both clinics." (S5). No other italic heading text.
- Marker underlines (`<mark>`) per section: header 0, clinic cards 2, spaces 1, all others 0; none in dark body text.
- Text under 12 px: 0. Uppercase labels: 0 (the category words are lower-cased by CSS, the strip label is serif). No numbered eyebrows, ghost numerals, corner brackets, registration marks or arcs anywhere on the page.
- `will-change` appears only on the two animated backdrop layers.

**Content check:** `missing: 0`, `shortened: 0`, link delta 0. **tsc / eslint:** clean.
**Audit R7:** at 360, 390, 768 and 1366: overflow 0, media over 70%: 0, tap targets under 44 px: 0, text under 12 px: 0, one h1.
**No-JavaScript, 390 wide:** `.audit/clinic/R7/390-nojs-full.png` shows every section readable (both gallery panels one after the other, no hidden tabs).
**Open questions:** none new.


## R8: Final check and screenshots (31 Oct 2026)

**Run id:** `final`. No design changes in this run; no fixes were needed.

### Results
| Check | Result |
|---|---|
| `page-content-check.mjs clinic /clinic` | `missing: 0`, `shortened: 0`, h1 count 1, link delta 0 (units 71 to 77, images 15, links 23, headings 10) |
| `tsc --noEmit` (owned paths) | no errors |
| `eslint components/pages/clinic app/clinic/page.tsx` | no errors |
| Audit, 360 / 390 / 768 / 1366 / 1440 | overflowX 0, media over 70%: 0, tap targets under 44 px: 0, text under 12 px: 0, one h1, no console errors |
| Header at 1366x650 | h1, paragraph and both call buttons visible; header ends at y=566; photo 52% of the viewport |
| Header at 390x844 | h1 and "Call Mehdipatnam" above the photo; photo at most 38dvh |
| `/contact`, `/clinic/mehdipatnam`, `/clinic/nampally` | all 200 (shared files they use were not touched) |
| Red italic accent | h1, "Mehdipatnam or Nampally." and "at both clinics." only |
| Reduced motion, phone, no JavaScript | final state, 0 infinite animations on phones, every section readable (R7) |

### Screenshots
- Desktop 1440 wide, full page: `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic\final\desktop-full.png`
- Mobile 390 wide, full page: `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\clinic\final\mobile-full.png`
- Also in `.audit/clinic/final/`: `1366-fold.png`, `1366-full.png`, `390-fold.png`, `768-full.png`, `360-full.png`, `390-nojs-full.png`, `audit.json`.

### Files changed in the whole redesign (commit by path)
Edited:
- `app/clinic/page.tsx` (two lines: import and returned component; `metadata` untouched)

Created, `components/pages/clinic/`:
- `ClinicPageView.tsx`, `ClinicPage.module.css`
- `ClinicBackdrop.tsx`, `ClinicBackdrop.module.css`
- `ClinicHeader.tsx`, `ClinicHeader.module.css`
- `ClinicFacts.tsx`, `ClinicFacts.module.css`
- `ClinicCards.tsx`, `ClinicCards.module.css`
- `Surroundings.tsx`, `Surroundings.module.css`, `SurroundingsPhotos.tsx`
- `SpacesGallery.tsx`, `SpacesGallery.module.css`, `GalleryLightbox.tsx`, `GalleryLightbox.module.css`
- `TreatmentsStrip.tsx`, `TreatmentsStrip.module.css`
- `VisitBand.tsx`, `VisitBand.module.css`

Created, docs: `docs/internal-pages/clinic/` (`PAGE_PLAN.md` was supplied by the owner; `OWNERSHIP.md`, `DISCOVERY.md`, `CONTENT_QUESTIONS.md`, `CHANGELOG.md`, `content-snapshot.json`).
Not committed (git-ignored): `.audit/clinic/` (tools and screenshots).

### Forks made
`ClinicHero` (to `ClinicHeader` + `ClinicFacts`), `ChooseClinic` (to `ClinicCards`), `ClinicalSettings` (to `Surroundings`), `InsideNeoDent` (to `SpacesGallery` + `GalleryLightbox`), `ClinicTreatments` (to `TreatmentsStrip`), `ClinicVisit` (to `VisitBand`). The originals under `components/clinic/` and `app/clinic/ClinicClientChrome.tsx` are now unused by any route and were left in place. Owner decides whether to delete `ClinicHero*`, `ChooseClinic.tsx`, `ClinicalSettings*`, `InsideNeoDent*`, `ClinicTreatments*`, `ClinicVisit*` and `ClinicClientChrome.tsx`. Do not delete `ClinicShared.module.css`, `ChooseClinic.module.css`, `useReveal.ts` or `ClinicGalleryViewer*`: `/contact` and the branch pages still import them.

### Shared-change requests
None.

### Not done
- **R6 (breadcrumbs, FAQ, `BreadcrumbList` and `FAQPage` JSON-LD) was not run.** It needs the owner's approval of Q6 (the five draft FAQs and the schema), which has not been given.
- The plan's `scripts/page-content-snapshot.mjs`, `page-content-check.mjs`, `page-audit.mjs` and `docs/internal-pages/_shared-requests.md` do not exist. Equivalents are in `.audit/clinic/tools/`.

### Open questions for the owner
1. Q6: approve (or edit) the FAQ and breadcrumbs so R6 can run.
2. Mehdipatnam address: data says "10-3-14B/11/1 … 500006", plan says "10-3-148/11/1 … 500028".
3. Higher-resolution Mehdipatnam entrance photo (source is 382x510 px, soft in the clinic card).
4. Q1 to Q5, Q7 to Q11 were built or left under their stated defaults: header buttons unchanged (Q1), clinic-only band kept with its labels (Q2), accent only on h1 / S2 / S5 (Q3), tabs + lightbox (Q4), hours glass cards in the header (Q5), two supporting lines (Q7). Q8 (Monday to Saturday wording), Q9 (25,000+), Q10 (Nampally signboard photo) and Q11 (doctor name form) are unchanged and still need an answer.


## R6 (run after the owner's answers, 31 Oct 2026): breadcrumbs, FAQ, schema, and the Q8 to Q11 answers

**Owner answers applied**
- **Q6 approved:** breadcrumbs, five-question FAQ, `BreadcrumbList` and `FAQPage` JSON-LD built.
- **Mehdipatnam address:** the owner confirmed "10-3-14B/11/1, near Masjid-e-Azizia Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006". That is what the data already holds (it has a comma after "Masjid-e-Azizia"), so nothing changed. The plan's "10-3-148/11/1 … 500028" was a misread screenshot.
- **No larger Mehdipatnam photos exist:** the 382x510 entrance photo stays as it is.
- **Q8 to Q11 "mention it the way the home page does":** done as follows.
  - **Q8 hours wording:** the home "Spaces designed around care" section shows `{hours} · Sunday holiday`, so the clinic cards now read "4:00 PM – 8:00 PM · Sunday holiday" (values from `lib/clinic-data.ts`: `hours`, `weeklyClosure`). The header hours cards show the hours plus a second line "Sunday holiday". No "Monday to Saturday" is added to the cards, because the home section does not show it there; the FAQ answer states it.
  - **Q9 25,000+:** the home page shows "25,000+ patients treated" with `CountUp` (`ExperienceIntro`); this page uses the same wording and the same `legacyStats` source. Kept.
  - **Q10 Nampally street-frontage photo:** the home page uses the same photo with no note. Kept, no note.
  - **Q11 doctor name:** the home page uses "Dr. Md. Miftah Ur Rahman" and "Dr. Mohd. Siraj Ur Rahman". The Dr. rows here use the same forms. Kept.

**Files created:** `lib/pages/clinic-content.ts` (`CLINIC_FAQ`, `CLINIC_BREADCRUMBS`, `clinicFaqJsonLd()`), `components/pages/clinic/ClinicBreadcrumbs.tsx` + `.module.css`, `ClinicFaq.tsx` + `.module.css`.
**Files edited:** `app/clinic/page.tsx` (two new, separate JSON-LD `<script>` blocks and their imports; `metadata` and all other lines unchanged), `ClinicPageView.tsx` (breadcrumbs under the header, FAQ between S5 and S6), `ClinicCards.tsx` (hours + "Sunday holiday"), `ClinicHeader.tsx` + `.module.css` (second line in the hours cards), `ClinicFacts.module.css` (top padding reduced to make room for the breadcrumb).

**What was built**
- Breadcrumb "Home / Clinics" on the ivory ground under the header: 14 px text, the "Home" link has a 44 px hit area, "Clinics" is `aria-current="page"`. `BreadcrumbList` JSON-LD is built from the same array (Home to `https://www.neodentdentalhospitals.com`, Clinics to `.../clinic`).
- FAQ on a paper-tone light band: heading "Questions about our clinics", native `<details>` (first open, one open at a time via `name`), serif questions as h3, hairline dividers, red chevron, answer fades in on open (380 ms, none under reduced motion), no numbering. The five questions and answers are the draft from PAGE_PLAN section 7, word for word; phones, hours and the founding year are filled from `lib/site-data.ts`. No invented facts, no prices, no "Smile Designer".
- `FAQPage` JSON-LD is generated from `CLINIC_FAQ`, the same array the page renders.

**Verification**
- Server HTML with JavaScript off: six JSON-LD blocks parse (MedicalOrganization, Dentist, Dentist, WebSite, BreadcrumbList, FAQPage); all five FAQ questions and answers appear in the page text word for word (`MATCH` x5, `.audit/clinic/tools/r6-schema.mjs`); the four original blocks are unchanged; no `aggregateRating`.
- Heading order: one h1, h2 per section, h3 for clinic names, gallery groups and FAQ questions.
- Content check: `missing: 0`, `shortened: 0`, link delta +1 (the breadcrumb "Home"). I changed the check tool so that added JSON-LD blocks are allowed while every baseline block must still be present unchanged.
- tsc and eslint (including `lib/pages/clinic-content.ts`): clean.
- Audit, final run at 360 / 390 / 768 / 1366 / 1440: overflow 0, media over 70%: 0, tap targets under 44 px: 0 (the first run flagged the 39 px "Home" link; fixed with padding and a negative margin), text under 12 px: 0.
- R7 motion check re-run: nothing stays hidden after scrolling, reduced motion shows the final state, 0 infinite animations on phones, red italic only on the three allowed phrases, no marker underlines in the FAQ, no uppercase labels.
- Screenshots: `.audit/clinic/R6/faq-1366.png`, `faq-390.png`, `header-1366.png`, `crumb-1366.png`; final full-page shots refreshed at `.audit/clinic/final/desktop-full.png` and `mobile-full.png`.

**Files changed in the whole redesign, updated list:** everything in the R8 list plus `lib/pages/clinic-content.ts`, `components/pages/clinic/ClinicBreadcrumbs.tsx`, `ClinicBreadcrumbs.module.css`, `ClinicFaq.tsx`, `ClinicFaq.module.css`. `lib/pages/` is a folder shared by name with the treatments-hub session; this file is new and only mine.
**Shared-change requests:** none. **Open questions:** none.


## Owner decision (1 Nov 2026)

"Keep all": the defaults built without an explicit answer are confirmed as final. Q1 (header buttons "Call Mehdipatnam" red and "Call Nampally" outline, no extra enquiry link), Q2 (clinic-only red band with its three buttons), Q3 (red italic only on the h1, "Mehdipatnam or Nampally." and "at both clinics."), Q4 (Mehdipatnam and Nampally tabs with a lightbox), Q5 (hours glass cards in the header) and Q7 (the two plain supporting lines). Q6 was approved earlier and Q8 to Q11 follow the home page. No open owner questions remain. Still pending on the owner's side: the rating review with the final screenshots, and committing by path.


## Refinement pass after the owner's screenshot review (1 Nov 2026)

Provisional self-rating before this pass: desktop 8.8, mobile 8.6. Files edited: `ClinicHeader.module.css`, `ClinicCards.module.css`, `ClinicBreadcrumbs.module.css`, `ClinicFaq.module.css` (CSS only; no wording, markup, links or data changed).

- **Header photo:** now capped at `--media-max-h` (the primary-media token) instead of the compact one, and sized to the viewport (`100dvh - 250px`). At 1366x650 it is 400 px (62% of the viewport, was 52%) and the header ends at y=630, so it still fits; at 1280x720 and 1440x800 it is 65% and 63%.
- **Mobile clinic cards:** photo 16:9, tighter body padding, gap and fact rows. The clinic-cards section is 2,203 px at 390 wide (2.6 screens, was 2.9).
- **Breadcrumb:** even gap around the slash (the "/" had no space before "Clinics").
- **FAQ heading:** side column widened from 4 to 5 grid columns, so "Questions about our clinics" sits on two lines at 1366 instead of three.
- **Scrolled captures:** `.audit/clinic/final-scrolled/1440-full.png` and `390-full.png` are the captures to use for rating: they scroll through the page first. A full-page capture without scrolling leaves below-fold reveal blocks unrevealed (FAQ heading, red band buttons, a treatment card were faded in the owner's captures).

Checks after the pass: content check `missing: 0`, `shortened: 0`; tsc and eslint clean; audit at 360 / 390 / 768 / 1366 / 1440: overflow 0, media over 70%: 0, tap targets under 44 px: 0, text under 12 px: 0; motion checks unchanged. Not changed: the soft Mehdipatnam entrance photo (no larger file exists).
