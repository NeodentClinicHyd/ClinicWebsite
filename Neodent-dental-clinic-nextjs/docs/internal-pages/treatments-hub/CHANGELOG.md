# CHANGELOG: treatments-hub (`/treatments`)

## R0 — Discovery and snapshot (31 Oct 2026)

**Files created**
- `docs/internal-pages/treatments-hub/PAGE_PLAN.md` (copy of `docs/treatments-hub/PAGE_PLAN.md`; the original was saved one level up, not under `internal-pages`)
- `docs/internal-pages/treatments-hub/content-snapshot.json` (baseline)
- `docs/internal-pages/treatments-hub/OWNERSHIP.md`, `DISCOVERY.md`, `CONTENT_QUESTIONS.md`, `CHANGELOG.md`
- `.audit/treatments-hub/tools/` (`common.mjs`, `page-content-snapshot.mjs`, `page-content-check.mjs`, `page-audit.mjs`, `nojs-top.mjs`): slug-generic copies of the About page tools, because `scripts/page-*.mjs` do not exist.

**No site code changed.**

**Snapshot:** units=142, headings=31, links=17, images=18, buttons=5, embeds=6, jsonLd=5.

**Findings that differ from the plan (details in DISCOVERY.md)**
- The shared `ContactNextStep` is not on this page. The consultation content is a sticky `<aside>` inside the FAQ section. The blank right half in the desktop capture is that sticky card.
- The header "Call Neodent" button is hidden under 768 px by CSS on purpose (the fixed mobile bar carries it).
- The hub does not import `components/treatments/BeforeAfterCases` or `RealTreatmentWork`; nothing needs forking there. The old hub components are in `components/treatments/hub/*` (outside the editable paths), so new files are written under `components/pages/treatments-hub/` and `page.tsx` renders a new wrapper.
- `page.tsx` already emits a FAQPage built from `TREATMENTS_FAQ`.
- `CountUp` supports decimals.
- `docs/internal-pages/_shared-requests.md` does not exist.

**Questions for the owner:** see CONTENT_QUESTIONS.md (ratings mismatch Q2; button label Q4; sound buttons; highlight policy conflict; A2 and the JSON-LD).

**Shared-change requests:** none yet.

## R1 — Foundation and page header (31 Oct 2026)

**Files created** (`components/pages/treatments-hub/`): `TreatmentsHub.module.css` (page wrapper tokens, light/paper/dark shells, glow + icon-pattern recipe, headings, outline button, action link, swipe row), `Backdrop.tsx`, `HubVideo.tsx` + `.module.css`, `ResponsiveDetails.tsx` + `.module.css`, `HubHeader.tsx` + `.module.css`, `MobileCallBar.tsx`, `HubIntro.tsx` (interim: old intro moved unchanged; R2 rewrites it), `TreatmentsHubPage.tsx` (page wrapper: Navbar, `<main>`, Footer, mobile call bar, SVG filter for the pattern).
**Files edited:** `app/treatments/page.tsx` (renders `TreatmentsHubPage` instead of `TreatmentsClientChrome`; metadata and JSON-LD untouched, diff is 2 lines). Sections S2 to S9 still come from `components/treatments/hub/*` (read only) until their runs.

**Header (S0):** dark gradient, red glow behind the video, icon pattern as `mask-image` fading before the text column, no corner brackets, caption in a dark glass card under the video, breadcrumb at 12px, "Call Neodent" (same label/href) now visible on mobile, no native video controls (44px pause and sound buttons, at the top of the frame so burned-in subtitles stay clear), video capped by `min(var(--media-max-h-compact), calc(100dvh - 190px))` on desktop and 38dvh on phones. Fixed mobile call bar slides away while the header button is on screen.

**Deviation from the plan:** the load animation is pure CSS (`animation-fill-mode: both`) instead of a class set on mount. It needs no JavaScript, never leaves content hidden and does not delay the poster. Reduced motion shows the final state. Glow breathing and pattern drift run only at 768px and wider.

**Additions (log):** secondary "Send an enquiry" link (`/contact`); links on "dental implants", "full mouth rehabilitation", "root canal treatment", "cosmetic dentistry" in the header paragraph (to the matching `/treatments/<slug>` pages; wording unchanged). Not owner-approved yet beyond the plan's own wording (plan section 12 lists the first as "already added"; the four name links follow Q8).

**Content check:** `missing: 1, shortened: 1`, both caused by another session, not this run. `lib/treatments-hub.ts` (shared) was changed by another session to read `founder.experienceYears` from `lib/site-data.ts`, so "30+ years of clinical practice" now renders "32+ years of clinical practice" (Experience row and the Approach sentence). Everything else is present (units 142 to 146, links 17 to 22, headings 31, h1 = 1). Expect these two entries on every later run. The owner decides whether to refresh the baseline.

**Audit R1** (`.audit/treatments-hub/R1/`): overflowX 0 at 360/390/768/1366; h1 = 1; no media over 70% in the header (the two ">70%" at 1366 are the old DMLS video and the old process photo, replaced in R4); header fits 1366x650 (h1 bottom 333px, button visible in the fold); primary button visible in the 390x844 fold. Remaining text under 12px and tap targets under 44px are in old sections still to be rebuilt (and the footer "Call" links, shared).
**Server note:** the dev server on :3000 is shared with another Kiro session. Audits run against it; other sessions' edits can show in results.

**Questions:** none new.
**Screenshots:** E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\treatments-hub\R1\390-fold.png, ...\R1\1366-fold.png, ...\R1\390-full.png

## R2 — Intro and featured treatments (31 Oct 2026)

**Files created:** `HubIntro.tsx` (rewritten) + `HubIntro.module.css`, `FeaturedTreatments.tsx` + `.module.css`. **Edited:** `TreatmentsHubPage.tsx` (swaps `FeaturedTreatments` in for the old S2), `TreatmentsHub.module.css` (pattern opacity 0.22).
**S1:** two columns (statement as serif lede with red rule, sticky on desktop; reading column at most 70ch). Two highlights in the section (careful assessment, oral health function and appearance), both on light text; the other old highlights were removed as wrappers only, the text is unchanged. On phones paragraphs 2 and 3 sit in `ResponsiveDetails` ("More on how Neodent plans care", open in the server HTML, closed after mount under 768px). Statement mask reveal, paragraphs rise at 80ms.
**S2:** dark band with icon pattern only in the lower area/margins (zero under the heading and intro), heading keeps the red italic accent, intro has no highlights (key phrase semibold ivory). Full Mouth Rehabilitation is a wide card (photo 40%, text vertically centred); the other six sit in a 3x2 grid; card text 15px, link 14px semibold red, arrow stays on the line. Help card is last in the DOM and renders as a slim full-width band with "Speak with our team" as the primary button. Phones: wide card with a 22dvh photo, six compact rows (84px thumbnails, whole row at least 96px), then the band. Card ids/anchors, seven "in detail" links (text and hrefs), photos and alt text unchanged. Cards stagger-rise at 100ms; hover lift on hover-capable pointers only.
**Not done in this run:** photo mask reveals (a mask wrapper breaks `next/image fill` sizing); planned for R7 with a small dedicated reveal.
**Content check:** missing 1 / shortened 1, both the known "30+ to 32+ years" change made by another session in `lib/treatments-hub.ts`. Nothing else missing (units 142 to 147).
**Audit R2:** overflowX 0 at 360/390/768/1366. S2 at 390 is 2.46 screens (limit 2.5). No S2 image over 30dvh. Remaining text-under-12px items are in old sections still to be rebuilt.
**Fix during run:** featured card photo had zero width on phones (`align-items: center` inherited); fixed with `align-items: stretch`.
**Screenshots:** E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\treatments-hub\R2\atlas-1366.png, ...\R2\atlas-390.png, ...\R2\intro-1366.png, ...\R2\intro-390.png (full-page: 390-full.png, 1366-full.png)

## R3 — Additional services and the thinking behind treatment (31 Oct 2026)

**Files created:** `AdditionalServices.tsx` + `.module.css`, `ThinkingBehindTreatment.tsx` + `.module.css`. **Edited:** `TreatmentsHubPage.tsx` (swaps both in; `HubBeyond` and `HubThinking` imports removed).
**S3:** light shell, 2x2 grid of cards that hug their content (`align-items: start`). Each card has the category name (15px, semibold) and its services as pills (`ul`, 15px). All 14 services present; none are links on the site, so none are links here. Phones: four stacked compact cards (1.38 screens, limit 1.5). Heading in one ink colour; intro unchanged, no highlights.
**S4:** dark band, no pattern behind text (pattern only in the top-right corner). Two equal-height dark-glass doctor cards (portrait panel on a warm light plate, name, role, all rows with 12px labels, profile link on Dr. Miftah's card). Paragraphs in two balanced CSS columns (DOM order unchanged), key phrases semibold ivory, no marker highlights. Phones: cards are a swipe row (84% wide, next card peeks, scroll-snap, focusable `ul` with a label); paragraph 1 visible, paragraphs 2 and 3 in "More on treatment planning" (open in server HTML). Heading in one ink colour.
**Content check:** missing 1 / shortened 1, both the known "30+ to 32+ years" change from another session. Doctor names, roles, qualifications, specialism, recognition and alt text unchanged. No "Smile Designer", no new credential.
**Audit R3:** overflowX 0 at all widths. S3 1.38 screens, S4 1.38 screens at 390. Founder card free space at 1366 is about 12% (limit 15%). The audit's ">70%" flag on the Miftah portrait is a measurement artefact: the image is scaled 1.5x inside a 341px panel (52% of 650); the panel is what shows.
**Screenshots:** E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\treatments-hub\R3\thinking-1366.png, ...\R3\thinking-390.png, ...\R3\beyond-1366.png, ...\R3\beyond-390.png

## R4 — DMLS feature and how treatment takes shape (31 Oct 2026)

**Files created:** `DmlsFeature.tsx` + `.module.css`, `TreatmentProcess.tsx` + `.module.css`. **Edited:** `TreatmentsHubPage.tsx` (swaps both in; `HubDmls` and `HubPlanning` imports removed). The old DMLS offset red frame with its corner tick (a bracket) is gone from the page.
**S5:** light shell, text card left (7/12): heading, paragraph (one highlight), Clinician / Qualifications / Specialism rows (12px labels). Film right (5/12), vertically centred, 3:4 crop capped at `var(--media-max-h-compact)`, rounded, hairline, soft shadow, no brackets. `HubVideo` in tap mode with a sound button (Dr. Miftah speaks). "Clinical Education" label (12px) and the existing caption line sit under the film. Phones: text, then the film centred (329px wide at 390), caption below, no blank strip. **Addition:** the clinician name links to `/doctors/dr-miftah-ur-rahman` (wording unchanged). Reveal: text card rise, film mask reveal with the 1.04 settle, caption fade-up.
**S6:** paper shell. Photo left (4:5, `max-height: var(--media-max-h)`, same radius/hairline/shadow as the other photos, focal point 62% 50% toward the chair), stepper right: one dot per step, plain rows with hairline dividers, DM Serif titles, 16px descriptions up to 52 characters. The old red top lines of unequal length and the boxed cards are gone. Each step carries a connecting line segment to the next dot that draws with scroll (`animation-timeline: view()` inside `@supports`); in other browsers the steps rise in order and the segments are shown. Phones: photo 30dvh, then the stepper. Both h2 headings in one ink colour.
**Deviation:** the plan asks for an IntersectionObserver fallback for the line. A per-step segment with Reveal's in-order rise replaces it; I removed the unused observer component.
**Content check:** missing 1 / shortened 1 (known 30+ to 32+ change from another session). Four steps and descriptions unchanged; photo alt unchanged; links 17 to 23.
**Audit R4:** overflowX 0 at 360/390/768/1366. S5 1.41 screens, S6 1.38 screens at 390. No corner-bracket element remains on the page. The only ">70%" flag is the scaled Miftah portrait (artefact, see R3). Text under 12px remaining is in old sections (S7 to S9).
**Screenshots:** E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\treatments-hub\R4\dmls-1366.png, ...\R4\dmls-390.png, ...\R4\process-1366.png, ...\R4\process-390.png

## R5 — Real cases (31 Oct 2026)

**Files created:** `RealCases.tsx` + `RealCases.module.css`. **Edited:** `TreatmentsHubPage.tsx` (swaps it in; `HubWork` import removed). No forks were needed: the hub never imported `BeforeAfterCases` or `RealTreatmentWork` (R0), and the old `HubWork` markup was rebuilt rather than copied.
**S7:** light shell. Row A: the clinical film with its two caption lines ("Clinical Film" label at 12px) beside the "See the work behind the treatment." card (h3, both paragraphs), vertically centred. Row B: the three film tiles in three equal columns (4:5 cover, capped at `var(--media-max-h-compact)`, title and context below). Row C: the four before/after cards in an equal 2x2 grid; Before and After photos side by side with 12px pills, serif title and caption below. Photos keep their supplied pixelation and focal points. All eight photos, all four films, every alt text and caption unchanged.
**Phones:** film (centred), side card, tiles as a swipe row (84% wide), before/after cards as a swipe row (88% wide, pair side by side). Both rows are focusable `ul`s with labels; every card is in the DOM and the next one peeks. Section is 2.46 screens at 390 (limit 4); no two large images stack.
**Deviation from the plan:** the plan treats the clinical film as landscape in 7 columns beside a 5-column card. The file is portrait (1080x1920, see DISCOVERY addendum), so the film sits in the 5-column slot as a 3:4 cover crop and the card gets the 7-column slot. Videos: `HubVideo` tap mode (muted, loop, preload none, poster); no sound buttons because speech in these four films is unconfirmed (CONTENT_QUESTIONS 7).
**Highlights:** two in the section ("treatment outcomes" in the intro, "real clinical work" in the card), both on light text; the other old highlights were removed as wrappers only. Heading keeps the red italic accent ("Visible outcomes.").
**Content check:** missing 1 / shortened 1 (known 30+ to 32+ change from another session). Eight before/after photos plus seven card photos plus portraits plus room photo present (images 18).
**Audit R5:** overflowX 0 at 360/390/768/1366; nothing over 70% of the viewport except the scaled Miftah portrait artefact (R3); S7 2.46 screens at 390. Text under 12px now only in S8 and S9 (old).
**Screenshots:** E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\treatments-hub\R5\cases-1366.png, ...\R5\cases-390.png
