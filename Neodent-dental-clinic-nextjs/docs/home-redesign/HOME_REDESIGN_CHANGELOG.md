# Neodent Home Redesign: Changelog

One entry per run (template: reference file, Part 11).

## Baseline  (29 Oct 2026, before any section changes)

Command: `node scripts/home-viewport-audit.mjs` against `npm run dev` (http://localhost:3000/).
Exit code: 1 because (a) has findings. Full detail is in `.audit/home/report.json`, and section screenshots are in `.audit/home/<viewport>/`.

| Viewport | (a) media >70% vh | (b) overflow px | (c) taps <44 (inline text links) | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 | 0 | 23 (3) | 97 | 23,059 |
| 390x844 | 0 | 0 | 23 (3) | 97 | 22,967 |
| 768x1024 | 1 | 0 | 32 (3) | 99 | 20,817 |
| 1366x650 | 7 | 0 | n/a | 83 | 14,229 |
| 1536x730 | 3 | 0 | n/a | 88 | 14,458 |
| 1920x1080 | 1 | 0 | n/a | 71 | 15,021 |

(d) varies by about ±15 between runs on desktop, because the hero carousel autoplays and each slide has different micro-labels. Compare (d) between runs as a trend, not an exact number.

(a) Media taller than 70% of the viewport:
- 768x1024: leadership, Dr. Miftah portrait (`ClinicalLeadership .portraitImg`), 750 px (73%).
- 1366x650: exp-intro decorative background photo, 666 px (102%); legacy, Siasat press cutting (`LegacyStory .img_press`), 700 px (108%); leadership, three portfolio plates (`.plateImage`), 474 to 506 px (73 to 78%); leadership, profile film `video`, 467 px (72%); visit ("What to expect"), Nampally interior photo, 813 px (125%).
- 1536x730: exp-intro background, 91%; legacy press cutting, 96%; visit interior photo, 111%.
- 1920x1080: visit interior photo, 813 px (75%).
- The exp-intro background is decorative and exempt under Part 3.1 rule 7. It needs `data-media-exempt` in P2.

(c) Tap targets under 44x44 at 360/390: brand link (42 px tall), menu toggle 40x40, "Talk to Neodent" (42 px), hero arrows 34x34, hero dots 8x8 and 10x10, tour video toggle 30x30, "Discover Our Story" link (23 px), leadership film control 38x38, patient film control 36x36, Spaces fact, directions and "Explore our clinics" links (17 to 19 px), footer call link (40 px), footer location links (33 px), fixed "Call Neodent" bar button (43 px). At 768 the footer link columns drop to 36 px tall.

(d) The smallest text is the nav "Dental Hospitals" sub-line (7.5 px mobile, 8.5 px desktop), hero place meta (8.5 px mobile), "Neodent / Inside" and "Hospital tour" (9 px), SeamCard location (9 px) and the LegacyStory chapter labels and `dt` labels (11 px).

(e) Mobile page height is about 23,000 px against the 12,000 px budget. `#leadership` alone is 8,214 px at 375 px wide.

## P0 Foundation  (29 Oct 2026)
Files changed:
- `app/globals.css`: added `--media-max-h` and `--media-max-h-compact` (vh in `:root`, dvh in an `@supports (height: 1dvh)` block right after it). Added `.media-frame`, `.media-frame--compact` and `.media-frame--document`, each using `--focal`.
- `lib/site-data.ts`: added `ESTABLISHED_YEAR` and `yearsSinceEstablished()`.
- `components/motion/useReveal.ts` (new): a shared one-shot observer (`armReveal`, `useRevealScope`) with the same `data-reveal` / `data-shown` / `data-reveal-ready` contract as the three existing copies.
- `components/motion/Reveal.tsx` (new), `components/motion/CountUp.tsx` (new), `components/motion/motion.module.css` (new).
- `scripts/home-viewport-audit.mjs` (new). `.gitignore`: added `/.audit/`.
- This changelog.
Summary of changes: foundations only. No section uses them yet, so no visible change.
Audit (before -> after): same as the baseline; this run did not change any section.
Viewports checked: 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080.
Open issues or follow-ups:
- `npm run lint` already failed before this run: 18 errors and 9 warnings in files P0 did not touch (`_tmp_qa.js`, `CookieConsentContext`, `BrandLockup`, `Navbar`, `QuestionsContact`, `TreatmentAtlas`, `TreatmentThinking`, `TreatmentsHero`, `EditorialHighlight`, and others). The new files lint clean.
- The reveal observer still exists in three copies (`LegacyStory.tsx` inline, `sections/about/useReveal.ts`, `clinic/useReveal.ts`). They can switch to `useRevealScope` from `components/motion/useReveal.ts` when each section is migrated.
- `legacyStats.established` ("1994") duplicates `ESTABLISHED_YEAR`. Derive it in P3.
- Hero portrait and decorative backgrounds need `data-media-exempt` so the audit skips them.
Owner inputs still missing: all items in Part 8.


## P1 Hero  (29 Oct 2026)

Files changed:
- `components/hero/Hero.tsx` (rewritten)
- `app/globals.css`: all old hero rules removed (about 3,600 lines, including dead legacy `.hero-image` / `.hero-meta` rules inside the 900px and 560px blocks, and the "hero controls vs. mobile bar" 560px block) and replaced with one hero block (about 730 lines) where the old main hero block was. Added `.mobile-bar` transition and `[data-hidden="true"]` state inside that block.
- `lib/site-data.ts`: `heroSlideMeta` labels, `heroBranches` (one photo per branch, short descriptor, branch page link, no index numbers), `heroRecordItems` (no index or channel fields, caption plus document/photo kind).
- `components/Home.tsx`: IntersectionObserver that hides `.mobile-bar` while any hero "Call for Consultation" button is on screen.

Summary of changes:
- Layout: all three slides share one grid cell, so the hero is always as tall as its tallest slide. Desktop (>= 1024px) hero height is `100dvh - nav`; the headline is capped by viewport height (`min(token, 10.5dvh)` for slide 1, `min(token, 9dvh)` for slides 2 and 3) so it fits 650px-tall laptops. The type tokens themselves are unchanged.
- Every slide has eyebrow, headline, one supporting line and the same two actions: "Call for Consultation" (tel link) and "Send an enquiry" (/contact).
- Slide 1: tagline replaced with "Specialist dental care in Hyderabad · Since 1994" (year from `ESTABLISHED_YEAR`), placed under the headline. Removed the ghost "30+", its caption, the corner ticks, the gridlines, the rotated edge label and the phone card on the portrait (it duplicated the primary action). Added a "Since 1994" tag in the same style as the "2 Hyderabad locations" tag. Rating chip kept. The portrait now uses `next/image` with `preload`.
- Slide 2: headline "Two clinics. One standard of care.", supporting line "Visit us in Mehdipatnam or Nampally, Hyderabad." Removed "Where Neodent is.", the italic tagline, ghost "01 / 02", the 01 / 02 captions and the inset photos. Two photos at the same height (`--hero-media-h`, within `--media-max-h-compact`), each with a 52 to 56px tappable caption row linking to `/clinic/mehdipatnam` and `/clinic/nampally`. Descriptors come from data already in `site-data.ts` (Humayun Nagar address, Medwin Hospital Complex).
- Slide 3: kept "Recognised beyond the clinic." Removed ghost "03", the rotated edge label and the Press / Public media / Recognition channel cards. The Siasat cutting is shown whole (`object-fit: contain`, as a document). The broadcast frame and the awards photo share the column beside it. Captions: "The Siasat Daily, Hyderabad", "News18 Urdu", "Awards and certificates". No English translation of the Siasat headline, because Part 8 marks it as still needing the clinic's approval.
- Controls: the "01 / 03" counter and the arrows are replaced by three 44 x 44px dot buttons. The active dot is a pill that fills over `HERO_AUTOPLAY_MS`. The fill is a CSS animation and its end advances the slide, so pausing the animation pauses the timer. Autoplay pauses on mouse hover, keyboard focus, touch, the new pause/play button, and while the hero is less than 25% on screen. It never starts under `prefers-reduced-motion` (no pause button is shown then). Arrow keys move between dots, swipe changes slides on touch, and inactive slides are `inert` and `aria-hidden`.
- Motion: 600ms crossfade with a 10px translate. Headline line mask and portrait mask (with a 1.04 to 1 settle) replay each time a slide becomes active. The location tag fades in at 300ms and the "Since 1994" tag at 450ms. Supporting line and actions fade up, staggered. Under reduced motion there are no transforms and only a 200ms opacity change.
- Mobile (<= 1023px): copy and both actions first, then a media strip `min(32dvh, 300px)` tall (under the 38dvh limit) pinned to the bottom of the shared slide height, then the dots. Slide heights: 755px at 360x740, 790px at 390x844, 855px at 768x1024, the same on all three slides. The "Since 1994" tag sits bottom-left on phones so the floating call button does not cover it.
- Mobile bar: hidden while a hero primary button intersects the viewport, back once it scrolls out (checked at 360 and 390: hidden at the top, shown after scrolling, hidden again at the top).

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 23 -> 18 | 97 -> 91 | 23,059 -> 22,903 |
| 390x844 | 0 -> 0 | 0 -> 0 | 23 -> 18 | 97 -> 91 | 22,967 -> 22,785 |
| 768x1024 | 1 -> 1 | 0 -> 0 | 32 -> 26 | 99 -> 90 | 20,817 -> 20,628 |
| 1366x650 | 7 -> 7 | 0 -> 0 | n/a | 88 -> 76 | 14,229 -> 14,190 |
| 1536x730 | 3 -> 3 | 0 -> 0 | n/a | 82 -> 76 | 14,605 -> 14,456 |
| 1920x1080 | 1 -> 1 | 0 -> 0 | n/a | 82 -> 74 | 15,021 -> 15,021 |

Hero (`section#home`) only: media failures 0 -> 0 at every size; overflow 0 -> 0 (including 360px); taps under 44px 5 -> 0 (phones), 6 -> 0 (768); text under 12px 6 / 6 / 9 / 12 / 6 / 6 -> 0 at every size. The remaining (a) findings are all in other sections (ExperienceIntro, LegacyStory, ClinicalLeadership, SpacesDesignedAroundCare), the same items as the baseline. The audit still exits 1 because of them.

Hero fit (hero probe, hero height vs. `innerHeight - nav`, bottom edge of the primary button):
- 1366x650: hero 572 / 572 on every slide; primary button bottom at 487 (slide 1), 456 (slide 2), 426 (slide 3).
- 1440x900: hero 822 / 822; button bottom 729 / 598 / 597.
- 1536x730: 652 / 652. 1920x1080: 1002 / 1002.
- 390x844: button bottom 386 / 289 / 289, so headline, supporting line and primary button are all in the first screen.

Viewports checked (screenshots of all three slides): 360x740, 390x844, 768x1024, 1366x650, 1440x900, 1536x730, 1920x1080.
- 1366x650: slide 1 has the headline on two lines, the supporting line, the doctor's name and specialties, the rating chip and both buttons on the left, with the portrait in a thin red frame on the right ("2 Hyderabad locations" top-left, "Since 1994" bottom-right). Slide 2 has a three-line headline and two equal photos (338px) with aligned name and descriptor rows. Slide 3 has the whole cutting on the left and the broadcast and awards photos stacked on the right, each captioned. The dots sit bottom-left, in line with the copy.
- 390x844: on each slide the copy and the two full-width buttons fill the top half and the media strip the lower part. The whole hero (790px) fits in the first screen and the call bar is hidden. Slides 2 and 3 have shorter copy, so there is an empty band above their strip. This is deliberate: the strip and the dots stay in the same place on every slide.

Other checks: `npm run build` passes. `npm run lint` exits 1 with 18 errors and 9 warnings, all in files this run did not touch (CookieConsentContext, Navbar, BrandLockup, EditorialHighlight, Treatment* components, `_tmp_qa.js`). The four changed files lint clean. Behaviour script: autoplay advances after 7s, hover freezes the fill, arrow keys move focus and slide, swipe changes slide, no autoplay under reduced motion, 2 of 3 slides inert at any time.

Open issues or follow-ups:
- `<Reveal>` shows content that is already on screen at mount without animating it (by design, to avoid a load flash). So the hero uses `<Reveal variant="mask">` for the mask markup, but the line and portrait animations themselves are hero CSS keyed to `.hero-slide-active`. If you want Reveal to own this, a small `immediate` prop on `components/motion/Reveal.tsx` would do it. That file was outside this run's scope.
- Lighthouse mobile performance was not measured in this run. The portrait now uses `next/image` with `preload`, and the headline mask finishes by about 0.9s.
- The Siasat cutting is not tap-to-zoom yet (Part 3.1 rule 5). The lightbox lives in `Home.tsx`, and wiring it in was outside the allowed change for that file.
- At 360px the floating call button (FloatingCta, not part of the hero) sits over the bottom-right of the portrait strip.
- At 1440x900 and above, slide 1's headline wraps to four lines at the 96px token. It fits, but the copy column is taller than the portrait.
- `scripts/section01-probe.mjs` crashes on its own code (`artifact is not defined`), so its hero-vs-Section 01 type ordering check could not be run.

Owner inputs still missing: approval of the English caption for the Siasat cutting (Part 8).



## P2 Stat strip, "Care begins", seam card  (29 Oct 2026)

Files changed:
- `components/sections/ExperienceIntro.tsx` (rewritten)
- `app/globals.css`: the old `exp-intro*` block (about 1,600 lines of layered overrides) replaced with one block of about 310 lines in the same place. No other rules touched.
- `components/sections/SeamCard.tsx`, `components/sections/SeamCard.module.css`
- `lib/site-data.ts`: added `tourVideoSegment` and `tourVideoPoster` next to `tourVideo`.
- New asset: `public/assets/neodent-tour-video-poster-waiting-area.webp` (720x1280, 56 KB, the 3 s frame of the tour video).
- **Outside the allowed list:** `components/Home.tsx`. The portrait is passed to `<SeamCard image={...}>` from Home.tsx, so dropping it meant deleting that prop (and the now-unused `recognitionImage` import). Nothing else in Home.tsx changed. To restore the portrait, revert those lines.

Summary of changes:
- Stat strip: one white band with four cells, in this order: 32 (`yearsSinceEstablished()`, in red) "years of specialist care, since 1994"; 2 "clinics, Mehdipatnam and Nampally"; 418 "Google reviews across both clinics" (computed as `googleRating.count + nampallyGoogleRating.count`, 261 + 157); 25,000+ "patients treated" (the code comment says it is client-supplied and must be verified). I removed "Multi-speciality", the icons and the dark "Why Neodent" title block. The list's accessible name is now "Neodent at a glance". A 12 px note under the band reads "Review count as shown on the Google listings; it may have changed since." (Part 3.6). Numbers use `CountUp`. Layout: one row of four at 768 px and up, a 2 x 2 grid below.
- "Care begins": the Part 6.2 copy in two paragraphs, with two highlights ("calmer, more reassuring" as primary, "clear explanations" as secondary). The headline has two lines: "Care begins the moment" / "you walk in." The Calm / Precise / Personal card stays: one dark card with three columns on desktop and stacked rows on mobile. "Discover our story" stays, now 15 px with a 44 px tap area.
- Media: no system ffmpeg is installed, and Playwright's bundled ffmpeg cannot read MP4 ("Invalid data found when processing input"). I extracted the frames at 1 s steps in installed Chrome instead (seek, then canvas, into `.audit/p2/frames/`, contact sheets `sheet-000.png` and `sheet-020.png`). Findings: 0 to 2 s is the red pillar; 3 to 4 s is the wide waiting area (chairs, consultation doors, red railings); 5 to 9 s is reception; 10 to 12 s is the awards wall; 13 to 16 s are treatment rooms; 17 s is another pillar; 19 to 21 s is a promo card reading "With almost 3 decades of experience … Dm for a free consultation", which conflicts with the "Since 1994" copy. Playback now runs from 3 s to 16.5 s and loops back to 3 s; the poster is the 3 s frame. One media item, `.media-frame` with `height: var(--media-max-h)`. Desktop shows the whole 9:16 clip (249 x 442 at 1366x650). Below 1024 px it is cropped to 4:5 (`--focal: 50% 55%`). Video rules from Part 3.4: `muted playsInline loop preload="none"` with a poster; plays only at 50% or more in view and pauses off-screen; no autoplay under reduced motion or Save-Data; a manual pause sticks; 44 x 44 toggle.
- Seam card: home defaults are now "Specialist-led care." / "Since 1994." (from `ESTABLISHED_YEAR`), "— Neodent Dental Hospital", "Mehdipatnam · Nampally". The "Neodent Standard" eyebrow is gone (`label` defaults to `null` and renders only if passed) and so is the portrait. The card uses the existing text-only variant: ExperienceIntro's bottom padding changed to `var(--seam-pad-above-text)`, and the seam tokens themselves are unchanged. Foot text raised to 12 px or more (it was 9 to 11.5 px). The Dr. Miftah page's SeamCard still shows "CLINICAL PHILOSOPHY / Saving natural teeth, even when it is mobile." (checked).
- Removed: the ghost-numeral rules, the "NEODENT / ARRIVAL / 01" `::after` label, the arches, draft lines, registration mark, the headline-to-video connector line, the faint chair backdrop image (the 102% "decorative" audit finding), the "Neodent / Inside · Hospital tour" 9 px caption and the dead `.exp-intro-proof*` / `.exp-intro-values` rules.
- Motion: the section's own IntersectionObserver and its eight-step CSS cascade are gone. It now uses `<Reveal>`: strip cells staggered by 70 ms, headline as a two-line mask, paragraphs staggered, qualities card and video fade or rise. Under reduced motion every element shows its final state (checked: opacity 1, no armed reveals, video paused, numbers at their final values).

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 18 -> 16 | 91 -> 84 | 22,903 -> 22,595 |
| 390x844 | 0 -> 0 | 0 -> 0 | 18 -> 16 | 91 -> 84 | 22,785 -> 22,476 |
| 768x1024 | 1 -> 1 | 0 -> 0 | 26 -> 24 | 90 -> 84 | 20,628 -> 19,934 |
| 1366x650 | 7 -> 6 | 0 -> 0 | n/a | 76 -> 70 | 14,190 -> 13,812 |
| 1536x730 | 3 -> 2 | 0 -> 0 | n/a | 65 -> 70 | 14,456 -> 14,047 |
| 1920x1080 | 1 -> 1 | 0 -> 0 | n/a | 76 -> 70 | 15,021 -> 14,717 |

This block only (`section.exp-intro` plus the SeamCard): media failures 0/0/0/1/1/0 -> 0 at every size; overflow 0 -> 0; taps under 44 px 2 -> 0 (360, 390, 768); text under 12 px 7/7/6/6/6/6 -> 0. The audit still exits 1 because of findings in LegacyStory, ClinicalLeadership and Spaces (the same items as the baseline). The 1536 (d) rise is hero-carousel noise, as noted in the baseline.

Fit (probe `.audit/p2/probe.mjs`):
- 1366x650: heading and video start at the same y; the composition is 442 px tall against 572 px of viewport below the nav, and the whole copy column (heading, both paragraphs, card and link) is 516 px. At 1536x730: 496 / 652. At 1920x1080: 680 / 1002.
- 360 px: document overflow 0. The strip is 328 px wide, a 2 x 2 grid; the widest value, "25,000+", fits on one line. The section is 1,670 px tall at 360, and total page height at 360 dropped by 308 px.
- Video: plays in view from about 3 s; after 16.5 s it jumps back to 3.x s; pauses once scrolled away.

Viewports checked (screenshots in `.audit/p2/shots-after*/`): 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080.

Other checks: `npm run build` passes. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch; the changed files lint clean. `tsc --noEmit` is clean.

Open issues or follow-ups:
- LegacyStory still reserves top space for the old, taller portrait card (`calc(var(--seam-card-h) / 2 + 72px)` in `LegacyStory.module.css`). With the text-only card that leaves about 30 to 65 px of extra space under the card (30 at 360x740, 35 at 1366x650, 65 at 1920x1080). In P3, switch it to `var(--seam-pad-below-text)`.
- `yearsSinceEstablished()` runs when the static home page is built and again on the client. After 1 January the server HTML shows the old figure until the next deploy, and React will log a text mismatch for that one number. A yearly rebuild (or any deploy) fixes it.
- `scripts/exp-intro-qa.mjs`, `scripts/section01-probe.mjs` and `scripts/seam-card-qa.mjs` target classes that no longer exist (`.exp-intro-frame`, `.exp-intro-visible`, the portrait). They are older one-off checks; delete or update them.
- Desktop leaves a gap of about 300 px between the copy column (620 px wide) and the video at 1366, because the 9:16 clip is narrow at the height cap. If it looks too airy, a still interior photo in a wider frame is the alternative.
- The tour does not say which clinic it shows, so the video label says "a Neodent clinic".

Owner inputs still missing: verification of "25,000+ patients" and of the combined 418 review count (Part 8).


## P3 1994 / Legacy section  (29 Oct 2026)

Files changed:
- `components/sections/LegacyStory.tsx` (rewritten)
- `components/sections/LegacyStory.module.css` (rewritten)
- This changelog. No other file was touched.

Summary of changes:
- Removed: the 01 to 04 chapter labels, the ghost "1994", the i / ii / iii captions, the section's own reveal observer and its `data-reveal` CSS, and the separate white "25,000+" card.
- "Since 1994" lockup at the top of the section: a red "Since" label over a solid ink DM Serif "1994" (88 to 112 px on phones, up to 168 px on desktop), "Established in Hyderabad" beside it, then a hairline with a red start dot that draws toward "Today · Mehdipatnam · Nampally". The year comes from `ESTABLISHED_YEAR`. Part 8 lists no milestones, so the line shows only 1994 and Today. Desktop (1024 px and up) puts everything on one row. Below that, the line and "Today" sit on their own rows under the year.
- Draw line: it uses the P0 `drawLineClass` (`animation-timeline: view()` inside `@supports`). **Finding:** `.site { overflow: hidden }` in `globals.css` (line 252) makes `.site` the nearest scroll container, so the `view()` timeline never moves and the line just sits fully drawn. This affects every use of `drawLineClass` on the page. LegacyStory now checks the line's timeline source on mount. If the source is not the document scroller, or `view()` is unsupported, it sets `data-draw-linked="false"` and the line draws once (900 ms) when its `<Reveal>` enters the viewport. I tested this with an injected `.site { overflow: clip }`, and the line then followed the scroll: scaleX 0.14 / 0.40 / 0.80 / 1 with the line at 95 / 80 / 60 / 45% of the viewport height. The section itself now uses `overflow: clip` (with `hidden` as the fallback line) so that it does not break the timeline itself.
- Dr. Siraj card: unchanged content (name, role, 30+ years, three credential rows). Labels went from 11 px to 12 px. The two paragraphs became one, using only facts from the old copy: "Since 1994, Neodent has grown through decades of clinical practice under its founder, Dr. Siraj. Every visit draws on that accumulated experience, and the same specialist-led approach that shaped Neodent from the beginning still guides treatment today." Highlights went from 6 to 2 (Part 3.2).
- Press: the Siasat cutting is shown whole (`media-frame media-frame--document`, contain) at `min(var(--media-max-h), 600px)`. That is 442 px at 1366x650 (68%) and 600 px at 768 and 1920. News18 and the ceremony photo are two compact cover-cropped thumbnails stacked beside it, matching its height. Below 768 px the three items form one scroll-snap row (cards 84% wide, all 360 px tall, edge-to-edge so the next card peeks). The row is a focusable `role="region"` ("Press and recognition"), and arrow keys scroll it.
- Tap to zoom: each press item is a button ("Enlarge: …", zoom icon) that opens a native `<dialog>` inside LegacyStory. The cutting opens at its full source width (631 px) and the dialog scrolls; on phones it fills the width (304 px at 360, against 178 px in the row). Photos fit the window. Esc, the 44 px close button and a backdrop click all close it, and focus returns to the button. The unused lightbox in `Home.tsx` was not wired in, because that file is outside this run's scope.
- Siasat caption: only "The Siasat Daily · Hyderabad / Press feature, Urdu daily". The English translation in Part 8 is still marked as needing the clinic's approval, so I did not show it.
- Closing band: one red band. The stat strip already shows "25,000+ patients treated", so I dropped it here. The band's number is now `yearsSinceEstablished()` (32, counted up with `CountUp`) with "years of care" and a "1994 —— Today" draw line, beside "Different generations. One standard of care.". On tablet and desktop the number block is vertically centred beside the statement, with a divider between them. On phones they stack. The band is as tall as its content (238 px at 360, 200 px at 1366); the old fixed `min-height: 240px` is gone.
- Red card on mobile: in this build the old card was not actually cut off (at 360 its bottom was 76 px above `#expertise`). The old layout did rely on a `min-height` plus `justify-content: space-between` to push the timeline to the bottom edge. Now the timeline sits in normal flow. At 360 and 390 the band ends 72 px above the next section, and with the band centred in the viewport, `elementFromPoint` at its bottom edge and at the timeline row returns the band itself (not the mobile bar or the next section). Screenshot: `.audit/p3/band-vp-360.png`.
- Motion: `<Reveal>` on the lockup, the card, the paragraph and the band; a mask reveal on the two-line title; press items staggered by 90 ms; `CountUp` on the band number. Under reduced motion everything shows its final state and both lines are fully drawn (checked).
- Section top padding is now `var(--seam-pad-below-text)`, the P2 follow-up.

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 16 -> 16 | 84 -> 63 | 22,595 -> 21,649 |
| 390x844 | 0 -> 0 | 0 -> 0 | 16 -> 16 | 84 -> 63 | 22,476 -> 21,535 |
| 768x1024 | 1 -> 1 | 0 -> 0 | 24 -> 24 | 84 -> 63 | 19,934 -> 19,232 |
| 1366x650 | 6 -> 5 | 0 -> 0 | n/a | 59 -> 63 | 13,812 -> 13,399 |
| 1536x730 | 2 -> 1 | 0 -> 0 | n/a | 70 -> 52 | 14,047 -> 13,615 |
| 1920x1080 | 1 -> 1 | 0 -> 0 | n/a | 70 -> 63 | 14,717 -> 14,252 |

`section#legacy` only: media over 70%: 0/0/0/1/1/0 -> 0 at every size; overflow 0; taps under 44 px: 0 -> 0; text under 12 px: 21/21/21/7/7/7 -> 0. Section height: 3,053 -> 2,106 (360), 3,042 -> 2,102 (390), 1,920 -> 1,506 (1366). The 1366 (d) rise on the whole page is hero-carousel noise, as noted in the baseline. The audit still exits 1 because of findings in ClinicalLeadership, WhatToExpect and Spaces.

Press plate fit (probe): the cutting's image is 49% / 43% / 59% / 68% / 68% / 56% of viewport height at 360 / 390 / 768 / 1366 / 1536 / 1920. Image plus caption is 58 / 50 / 65 / 78 / 77 / 62%, all under the 80% rule. No card is more than 35% empty: founder card and band content fill 100% of their inner height at every size. Document overflow is 0 at every size.

Viewports checked (screenshots in `.audit/p3/`, before and after audit sets in `.audit/p3-before/` and `.audit/p3-after/`): 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080.

Other checks: `npm run build` passes. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch; LegacyStory lints clean. `tsc --noEmit` is clean. There are no console errors on load (the only warning is the existing hero LCP image notice). The probe scripts are saved in `.audit/p3/` as `*.mjs.txt` so eslint does not pick them up.

Open issues or follow-ups:
- `.site { overflow: hidden }` in `globals.css` stops every `view()` scroll-driven animation on the page. Changing it to `overflow-x: clip` (or `overflow: clip`) would turn the LegacyStory lines, and any later `drawLineClass` use, into true scroll-linked draws. It would also let `position: sticky` work inside `.site`, so check sticky elements on other pages before changing it. LegacyStory switches over on its own once this is fixed.
- The band's "32 years" repeats the stat strip's first figure. I chose it because the band needed a number and "25,000+" had to go. Alternatives: no number (statement plus the 1994 to Today line only), or put "25,000+" back here and take it out of the stat strip.
- The `Home.tsx` lightbox state is still unused. LegacyStory has its own dialog now, so that block can be removed or shared later.
- In the phone row the News18 thumbnail is cropped to the presenter and the middle of the "BIG BREAKING" banner. The full frame is one tap away.
- The `PRESS_SIZE` dimensions in LegacyStory duplicate the image files' sizes. Move them into `legacyPressItems` in `lib/site-data.ts` when that file is next in scope.

Owner inputs still missing: approval of the Siasat English caption; verification of "25,000+" (now shown only in the stat strip); optional milestones with years for the 1994 to Today line (Part 8).

P3 fix (same day): on phones the first press card snapped flush to the screen edge, so its left border was cut off (reported in Firefox; it was also visible in my 360 px Chromium screenshot). The cause was `scroll-padding-inline: calc(50vw - 50%)`: in a scroll container, `%` resolves against the scroller itself, so the snap padding was about 0. The bleed is now `(100vw - 100cqw) / 2`, with `.right` as an inline-size container below 768 px. Checked in Chromium at 360, 390 and 485 px: when snapped, each card's left edge lines up with the paragraph's left edge (16 / 16 / 28 px). The last card's right edge lines up with the paragraph's right edge, and document overflow is 0. Firefox was not tested here because Playwright's Firefox is not installed.


## P4 Treatments ("What can we help you with?")  (29 Oct 2026)

Files changed:
- `components/sections/Expertise.tsx` (rewritten)
- `components/sections/expertise-data.ts`: case tags, the Composite media type, new optional fields `visualCrop`, `beforeCrop`, `poster` and `posterCrop` (type `MediaCrop`). The `visual` and `alt` fields are unchanged, because `lib/treatments-hub.ts` reads them for the /treatments page.
- `app/globals.css`: `treatment-atlas*` rules only. The `.treatment-atlas-copy`, `-visual`, `-visual-video` and `-visual-logo` rules are removed. Added `.treatment-atlas-panel-stack`, `.is-leaving`, `.treatment-atlas-comparison-overlay` (renamed from `-comparison-after`) and the `atlas-panel-out` keyframes.
- This changelog. No other file was touched. The probe scripts are in `.audit/p4/` as `*.txt`, so eslint does not pick them up.

Summary of changes:
- Intro: the two paragraphs are now one, and it keeps the existing claims: specialist-led expertise, preventive to specialist work (the same treatment list), and real cases from our clinics. "Each area below is shown with a real case" became "most areas below are shown with a real case", because Root Canal shows a film, not a patient case. I removed the three `EditorialHighlight`s and the bold "real case", per Part 3.2 (no highlights in body paragraphs of dark sections). On desktop the heading sits in columns 1 to 6 with the paragraph in columns 7 to 12, both aligned to the bottom, so the header has no empty half. Below 1024 px they stack. Header height went from 464 to 168 px at 1366.
- Tooth-and-mirror video: removed at every size, together with its observer, the logo overlay and the 2.2 MB `section-video.mp4` request.
- Cards: no minimum height, and the grid rows no longer stretch to the panel's height. Where subgrid is supported, each card shares three rows (title, summary, footer) with the cards in its row. Titles sit at the bottom of their row, so title, summary and footer line up across a row. The footer is 12 px below the summary on every desktop card; before, the gap was 28 to 69 px. Every card shows its icon in every state; the `!selected &&` condition that hid the active card's icon is gone. The active card keeps the resting title size (it used to grow to 27 to 30 px), so selecting a card no longer changes the grid's height. The active state is now a white card with a 2 px red edge and a shadow. Mobile cards are `min(78vw, 300px)` wide (they were 220 px) and snap to the start.
- Labels (`proof`), checked against each card's actual media:
  - Composite Build-up: "REAL CASE / COMPOSITE SMILE DESIGN" became "REAL CASE / COMPOSITE BUILD-UP". **Media change:** this card used to show the generic clinical film (`dr-miftah-neodent-clinical-treatment-detailed.mp4`). I checked it frame by frame (`.audit/p4/frames/film-0.png`): it shows an X-ray review, impression material and a different patient, not this composite case. The card now shows its own before/after pair in the slider. To restore the film, add `video: true` back to entry 01.
  - Root Canal: "REAL CASE / RESTORATIVE CARE" became "TREATMENT FILM / ROOT CANAL TREATMENT". The film is Dr. Miftah explaining the treatment on a model board, and the old poster (`after treatment.jpg`) was a full-arch restoration. The poster is now the existing root canal page poster (`posters/root-canal-treatment-poster.webp`: a hand and the model board, no face).
  - Braces: "SMILE ALIGNMENT" became "ORTHODONTICS". Smile Design: "ZIRCONIA CROWNS" became "SMILE DESIGN WITH ZIRCONIA CROWNS". Scaling: "GUM HEALTH" became "SCALING AND POLISHING". Implants ("UPPER ARCH REHABILITATION") and Full Mouth ("FULL MOUTH REHABILITATION") were already correct.
- Mosaic: the triangle mosaic is baked into eight source photos (Composite, Implants, Smile Design and Full Mouth, before and after). Each photo now has a crop (`focal` used as object-position and transform-origin, plus `zoom`), worked out from a target rectangle below the nose (`.audit/p4/crops.cjs.txt`, previews in `.audit/p4/crops/`). No eyes and no mosaic show at any size (contact sheets: `.audit/p4/after/media-sheet-1366x650.png` and `-390x844.png`). `sizes` scales with the zoom so zoomed photos stay sharp. Orthodontics and Scaling were already mouth-only.
- **Slider bug found and fixed:** the old slider drew the after photo on the left, under the "Before" label, and the before photo on the right, under "After". The left side is now the before photo, and `aria-valuetext` reports the share of the after photo that is visible.
- Panel media: a 3:2 frame with `max-height: var(--media-max-h-compact)`. It is 282 px at 1366x650 (43%), 436 px at 768x1024 (43%), 216 px at 390x844 (26%) and 196 px at 360x740 (26%). It used to be a 4:3 frame capped at 340 px. A playing film is shown whole (`object-fit: contain`) so its burnt-in captions are not cut off.
- Tap to panel: after a tap or click, if the panel media is not fully visible, the page scrolls. Below 1024 px the panel's top goes to just under the nav (`scroll-margin-top: nav + 12px`), leaving room for the call bar. On desktop the page scrolls only as far as needed to show the whole media frame. Keyboard arrows on the tablist do not scroll the page; they only scroll the card row sideways, as before. Probe: with the card row at the bottom of the screen and the panel below the fold, every one of the seven taps put the panel top at 80 px at 360, 390 and 768, with the media fully in view. At 1366x650, clicking Scaling (bottom row) now brings the media into view (panel top at 71). Before, the panel top was at -520 and the media was off screen.
- Motion: the new panel fades in over 320 ms while the old copy (inert, `aria-hidden`) fades out on top of it. Sampled at 390: at 124 ms both are at 0.69, and at 375 ms only the new panel remains. Cards lift by 3 px with a shadow, only on devices with hover. The card row uses `<Reveal stagger={60}>`: children get `--reveal-i` 0 to 7 and are hidden until the row enters the viewport. Under `prefers-reduced-motion`: no reveal, no panel animation, no outgoing copy, no lift (checked).
- Text: the 11 px labels (case tag, "Drag to compare" / "Treatment film", "What it can help with", "Explore treatment", "Explore all treatments") and the 9 px Before/After labels are now 12 px. At 12 px, red on the dark panel is under 4.5:1, so the case tag is ivory with a red lead-in rule. Card focus ring changed from #252525 (invisible on the dark section) to ivory.

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 16 -> 16 | 63 -> 59 | 21,649 -> 21,081 |
| 390x844 | 0 -> 0 | 0 -> 0 | 16 -> 16 | 63 -> 59 | 21,535 -> 21,025 |
| 768x1024 | 1 -> 1 | 0 -> 0 | 24 -> 24 | 63 -> 59 | 19,232 -> 18,605 |
| 1366x650 | 5 -> 5 | 0 -> 0 | n/a | 63 -> 58 | 13,399 -> 13,062 |
| 1536x730 | 1 -> 1 | 0 -> 0 | n/a | 52 -> 58 | 13,615 -> 13,261 |
| 1920x1080 | 1 -> 1 | 0 -> 0 | n/a | 63 -> 58 | 14,252 -> 13,882 |

`section#expertise` only: media over 70%: 0 -> 0; overflow 0 -> 0; taps under 44 px 0 -> 0; text under 12 px 4/4/4/5/5/5 -> 0 at every size. Section height: 2,175 -> 1,607 (360), 2,142 -> 1,632 (390), 2,253 -> 1,626 (768), 1,711 -> 1,373 (1366), 1,734 -> 1,380 (1536), 1,750 -> 1,380 (1920). The 1536 (d) rise is hero-carousel noise, as noted in the baseline. The audit still exits 1 because of the same findings in ClinicalLeadership and WhatToExpect.

Click-through (`.audit/p4/probe.mjs.txt`, results in `.audit/p4/after/probe.json`, one panel screenshot per card per size). At 1366x650, 1536x730, 1920x1080, 768x1024, 390x844 and 360x740, all seven cards gave the matching panel title and tag, all eight card icons were visible with each card selected, and the media was in view after the tap. Media type per card: comparison for six, film for Root Canal. Other behaviour checks (`.audit/p4/behaviour.mjs.txt`): dragging the slider to 20% gives `aria-valuenow` 20 with the before photo on the left; ArrowRight moves it 5%. Arrow keys on the tablist move both selection and focus, and `aria-labelledby` follows. The Root Canal film plays with `object-fit: contain`.

Viewports checked: 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080.

Other checks: `npm run build` passes. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch; the two changed TS files lint clean. `tsc --noEmit` is clean.

Open issues or follow-ups:
- Desktop: the panel (about 865 px) is taller than the card grid (about 710 px), so the left column ends about 160 px above the panel at 1366. Before, the card rows were stretched to fill that height, which caused the gaps inside the cards. Ways to close it: a shorter panel description, or a sticky panel. A sticky panel needs `.site { overflow: hidden }` changed to `clip` (see the P3 follow-up).
- Mobile: all cards in the swipe row share one row height. Cards whose summary is one line shorter than the longest have 32 px between summary and footer instead of 12 px (360 to 768).
- The generic clinical film `defaultTreatmentVideo` is no longer used by any home card; it stays exported as the fallback. If the clinic has a composite build-up film for this case, set `video: true` and `videoSrc` on entry 01.
- The crops are tuned to the current photo files. If a photo is replaced, rerun `.audit/p4/crops.cjs.txt` (rename it to `.cjs` first).

Owner inputs still missing: none new for this section. Part 8 items are unchanged.


## P5 Doctors ("A steady hand. A human approach.")  (29 Oct 2026)

Files changed:
- `components/sections/ClinicalLeadership.tsx` (rewritten)
- `components/sections/ClinicalLeadership.module.css` (rewritten)
- `lib/clinical-team.ts`
- This changelog. `BranchClinicalTeam.tsx` was not edited; it renders the new data unchanged (checked below). The probe scripts are in `.audit/p5/` as `*.mjs.txt`.

Summary of changes:
- Layout: header (title and one supporting line), two leadership cards (Dr. Mohd. Siraj Ur Rahman, Founder and Director; Dr. Md. Miftah Ur Rahman, Assistant Director), a "Dr. Miftah at work" band, then "Our clinical team" with five specialists: Muti, Asiya, Safoora, Muqeet, Hafsa Taha (last).
- Leadership cards: 4:5 portrait (width capped at `--media-max-h-compact` × 0.8, so the frame never exceeds that height), role, name, three rows (Qualifications, Specialism, Post) and a "View profile" link. Every value already appears on the site: Dr. Siraj's rows come from `founder` in `lib/site-data.ts` and `AboutFounder`, Dr. Miftah's from the old card. Dr. Siraj links to `/about#founder` (the founder section, "A career built on specialist care."). Dr. Miftah links to `/doctors/dr-miftah-ur-rahman`.
- Dr. Miftah: the four paragraphs, the five-item fact list, the quote callout, the three portfolio photos and the profile film are gone from the home page. One paragraph remains, in the "at work" band, with the operatory photo (no patient in it) and a link to his profile. The section had one video, not two; it is removed, so the section no longer has a letterboxed video. Nothing was deleted that `/doctors/dr-miftah-ur-rahman` uses: the home section never imported the profile components.
- The duplicate Dr. Siraj card in the team row is removed. He now appears once in this section.
- Portraits: every doctor uses a transparent cut-out on the same charcoal 4:5 frame. Each file gets a `crop` (width, left, top) worked out from its alpha mask, so faces sit at about the same height and size. **Portrait match:** the two new files (`Dr.Asiya-Siraj.png`, `Dr.Safoora-Talha.png`) already have transparent backgrounds, so the background matches the existing cut-outs. They needed no background work. Their framing is tighter (head and shoulders, shoulders cut at the file edges), so they render at 100 to 105% width while Muti and Muqeet are zoomed to 178%. Muti and Muqeet are small files (about 478 px wide), so at 178% they are slightly soft on 2x screens. Larger source files would fix that.
- Dr. Miftah's leadership portrait is now his cut-out (`Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png`), so it matches Dr. Siraj's. **Flag for the owner:** the badge text on his coat in this file, and in `banner_image.jpeg`, is garbled ("DR MD NHFTALLIERAAM / DEPY.GF PNGORONCINE"), which suggests these images were edited by an AI tool. At card size it is barely readable. Consider a clean replacement.
- Seventh doctor: Dr. Hafsa Taha, BDS, Dental Surgeon, 5+ years (from the run inputs). The card has a monogram plate ("HT" in DM Serif on the same frame, with a faint tooth outline) and no "portrait not available" text. The old placeholder plate (silhouette, rule, dot, arc) is removed.
- Data (`lib/clinical-team.ts`): labels no longer have numbering ("Senior clinical leadership", "Clinical team"). New fields: `role` (only where it is known: Siraj, Miftah, Hafsa), `group` ("leadership" or "specialist"), `credentials` (leadership rows), `crop`. Dr. Hafsa is added. `homepage` and `homepageClinicalTeam` are replaced by `homepageLeadership` and `homepageSpecialists`. Dr. Siraj gained `href: "/about#founder"`, so the branch roster now shows a profile arrow for him as well as for Dr. Miftah. Dr. Miftah's `image` now points to his cut-out (only this section reads `image`).
- Mobile: the leadership cards stack, each with a compact portrait (34% wide) beside the name. Below 1024 px the specialists are a horizontal scroll-snap row. Cards are 66vw on phones (257 px at 390) and 30vw on tablets, and the next card peeks into view. The row is focusable (`tabIndex=0`, labelled by "Our clinical team", visible focus ring). ArrowRight scrolled it 273 px in the check.
- Background: I tried both tones on the live page (`.audit/p5/light2/context-1366.png` and `.audit/p5/dark1/context-1366.png`) and **kept light paper** (`--neodent-surface`). It reads more like a hospital and breaks up the dark Treatments section above. The dark portrait frames stand out more on paper. The doctors' white coats no longer glare against a dark page. The only trade-off is that this section and Patient Stories below (ivory) are now both light, with a slight tone step between them. Dark is still available: set `TONE = "dark"` in `ClinicalLeadership.tsx`.
- Motion: `<Reveal>` for the header and band. `<Reveal stagger>` for the leadership cards (90 ms) and the specialist row (70 ms). A 4 px hover lift on cards, on devices with hover only. The three custom IntersectionObservers and the video autoplay logic are gone, and the component no longer needs `useState`/`useEffect`. Under `prefers-reduced-motion` everything shows at full opacity with no transforms (checked). The credentials stay visible at all times rather than appearing on hover, because touch screens have no hover.
- Text: no text under 12 px remains in the section (it had 40 to 41 items). Body and credentials are 15 to 16 px.

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 16 -> 15 | 59 -> 18 | 21,081 -> 15,232 |
| 390x844 | 0 -> 0 | 0 -> 0 | 16 -> 15 | 59 -> 18 | 21,025 -> 15,029 |
| 768x1024 | 1 -> 0 | 0 -> 0 | 24 -> 23 | 59 -> 18 | 18,605 -> 14,204 |
| 1366x650 | 5 -> 1 | 0 -> 0 | n/a | 58 -> 18 | 13,062 -> 11,280 |
| 1536x730 | 1 -> 1 | 0 -> 0 | n/a | 58 -> 18 | 13,261 -> 11,494 |
| 1920x1080 | 1 -> 1 | 0 -> 0 | n/a | 58 -> 18 | 13,882 -> 12,109 |

The remaining (a) finding is the `#visit` Nampally interior photo (P7). The page heights also include changes from earlier runs.

`section#leadership` only (`.audit/p5/probe.mjs.txt`, results in `.audit/p5/before|after/probe.json`):

| Viewport | Height before -> after | Media >70% | Text <12px | Taps <44 |
|---|---|---|---|---|
| 360x740 | 8,134 -> 2,285 (-72%) | 0 -> 0 | 41 -> 0 | 1 -> 0 |
| 390x844 | 8,336 -> 2,340 (-72%) | 0 -> 0 | 41 -> 0 | 1 -> 0 |
| 768x1024 | 6,292 -> 1,890 (-70%) | 1 -> 0 | 41 -> 0 | 1 -> 0 |
| 1366x650 | 3,388 -> 1,607 (-53%) | 4 -> 0 | 40 -> 0 | n/a |
| 1536x730 | 3,407 -> 1,640 | 0 -> 0 | 40 -> 0 | n/a |
| 1920x1080 | 3,413 -> 1,640 | 0 -> 0 | 40 -> 0 | n/a |

The brief asked for about half the mobile height; it came out at about 28% of the old height, because the portfolio and film moved off the page. Other checks at every size: all seven names present (Hafsa 0 -> 1), "not available" text present -> absent, numbering ("01 /" to "05 /", "04 / PROFILE FILM", "NEODENT / 2026") 7 -> 0, videos 1 -> 0, horizontal overflow 0, nothing left hidden after scrolling.

`/clinic/nampally`: status 200. `#clinical-team` lists seven doctors (Siraj, Muti, Asiya, Safoora, Muqeet, Hafsa, Miftah), with profile links to `/about#founder` and `/doctors/dr-miftah-ur-rahman`. `/doctors/dr-miftah-ur-rahman` and `/about` (with `#founder`) return 200.

Viewports checked: 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080. Screenshots: `.audit/p5/after/` and `.audit/p5/light3/`.

Other checks: `npm run build` passes. `tsc --noEmit` is clean. The three files this run touched lint clean. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch.

Open issues or follow-ups:
- Garbled coat-badge text on Dr. Miftah's cut-out and `banner_image.jpeg` (see above).
- Muti and Muqeet cut-outs are about 478 px wide, so they are soft at 178% zoom on 2x screens. Larger originals would help.
- Dr. Muti's credentials are MBBS / MD (General Medicine); he is not a dental specialist. He stays in the "Our clinical team" row as the brief specified. The heading avoids calling all five "specialists" for that reason.
- If a portrait is replaced, rework its `crop` in `lib/clinical-team.ts`: measure the head's top, width and centre from the file's alpha mask, then aim for an eye line at about 30% of the frame height.
- This section and Patient Stories are now both light. If P6 changes Patient Stories' tone, revisit.

Owner inputs still missing: none for this section. Portrait for Dr. Hafsa Taha is optional (the monogram stands in). Other Part 8 items are unchanged.


## P6 Patient stories ("What patients say")  (29 Oct 2026)

Files changed:
- `components/sections/PatientStories.tsx` (rewritten)
- `components/sections/PatientStories.module.css` (rewritten)
- This changelog. Probe scripts and screenshots are in `.audit/p6/` (`probe.mjs`, `interact.mjs`, `before/`, `after/`, `six/`).

Summary of changes:
- Header: the title ("What patients say. / In their own words.") sits on the left and the Google rating summary on the right, on one row. This fills the empty area that used to sit to the right of the heading. The old lede line is gone.
- Rating summary: two clinic chips, Mehdipatnam 4.3 (261 reviews) and Nampally 4.6 (157 reviews), then "418 reviews across both clinics." and the existing note "Rating as shown on the Google listing; it may have changed since." The figures come from `googleRating` and `nampallyGoogleRating` in `lib/site-data.ts`, and the total is their sum, so nothing is hard-coded. Each chip links to that clinic's existing Google Maps URL (`directions`, `nampallyDirections`) and opens in a new tab.
- Reviews: a `reviews` array at the top of the component holds only Gaddam Sanjeeva's review, with the same verbatim text as before. No reviews were added, because the run brief still had the "[PASTE 3 TO 6 REVIEWS HERE, or write NONE]" placeholder. When there is one review it is shown as a large serif pull quote, centred in a card that fills the row, so the section looks complete. With two reviews they split the row. With three or more, the desktop row shows three at a time with scroll-snap. Previous and next arrows appear only when the row overflows. They sit on the row's side edges, so they add no height. Below 1024 px the reviews become a swipe row (86% wide cards on phones, 44vw on tablets) with the next card peeking. The row is focusable and labelled only when it scrolls. Long reviews are clamped to six lines behind a "Read more" button (44 px tall on touch sizes), and the full text stays in the DOM. Star counts come from each review's `rating`.
- Film: one film is kept (the "Not at all, not at all." recording). The other two films, the theme selector ("Comfort & relief" and the others) and their quotes are removed from the home page; the video files are untouched. The film is in a compact square card, `max-height: var(--media-max-h-compact)`, 203 to 222 px on desktop. The source is a 270 x 480 portrait with the face blurred in its upper third, so `object-position: 50% 88%` crops to the gown and chair and only the edge of the blur shows. Caption: "Not at all, not at all." with the line "A patient, after treatment", taken from the file's title. Below 1024 px the film becomes a horizontal card: a 112 to 132 px thumbnail beside the caption. The film is muted, inline and looping. It plays only while at least 50% of it is on screen, pauses off-screen, and never autoplays under reduced motion or Save-Data. The pause/play button is now 44 x 44 px (it was 36).
- Removed: the "Explore all patient stories" non-link and its 11 px label, the large bottom gap, the decorative quotation glyph, the arcs and the registration hairlines.
- Motion: the title uses a line-mask `<Reveal>`. The summary fades up with a 120 ms delay. Review cards use `<Reveal stagger={90}>`. The two scores (4.3, 4.6) and the 418 total use `<CountUp>`. The section's own IntersectionObservers are gone, apart from the film's play/pause observer. Under `prefers-reduced-motion` nothing in the section is hidden, the film does not autoplay, and the scores show their final values (checked).

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 15 -> 14 | 18 -> 17 | 15,232 -> 14,672 |
| 390x844 | 0 -> 0 | 0 -> 0 | 15 -> 14 | 18 -> 17 | 15,029 -> 14,435 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 23 -> 22 | 18 -> 17 | 14,204 -> 13,775 |
| 1366x650 | 1 -> 1 | 0 -> 0 | n/a | 18 -> 17 | 11,303 -> 10,855 |
| 1536x730 | 1 -> 1 | 0 -> 0 | n/a | 18 -> 15 | 11,516 -> 11,063 |
| 1920x1080 | 1 -> 1 | 0 -> 0 | n/a | 7 -> 17 | 12,131 -> 11,690 |

The audit still exits 1 because of the `#visit` Nampally interior photo (P7). At 1920, (d) rose from 7 to 17 because of hero carousel variance (see the Baseline note). None of the (d) findings are in `#stories`. Before this run, the section had one (c) finding (the 36 px film control) and one (d) finding (the 11 px CTA). It now has none.

`section#stories` only (`.audit/p6/probe.mjs`). The height is measured with the section top aligned to the bottom of the nav. "Room below nav" is the viewport height minus the nav.

| Viewport | Height before -> after (1 review) | 6 reviews | Room below nav | Video before -> after |
|---|---|---|---|---|
| 360x740 | 1,292 -> 732 | 805 | 672 | 408 px (55%) -> 112 px (15%) |
| 390x844 | 1,329 -> 735 | 809 | 776 | 446 px (53%) -> 112 px (13%) |
| 768x1024 | 1,116 -> 688 | 805 | 956 | 448 px (44%) -> 132 px (13%) |
| 1366x650 | 1,011 -> 563 | 571 | 572 | 445 px (68%) -> 203 px (31%) |
| 1536x730 | 1,027 -> 574 | 588 | 652 | 445 px (61%) -> 222 px (30%) |
| 1920x1080 | 1,032 -> 591 | 605 | 1,002 | 445 px (41%) -> 222 px (21%) |

At 1366x650 the whole section fits below the nav with one review (563 px) and with six (571 px). On phones it is about one screen; at 360x740 it runs 60 px past the room below the nav.

Six-review check: five temporary placeholder reviews (marked "TEST", one long, one rated 4) were added, measured and then removed. Searching the final file for "TEST" finds 0 matches, and only Gaddam Sanjeeva remains. Results (`.audit/p6/six/`): six cards, the row scrolls, no horizontal page overflow at any size, and "Read more" appears on the long review. The arrow button scrolled the row 320 px at 1366. ArrowRight on the focused row scrolled it 319 px at 1366 and 324 px at 390. The film played in view and paused once scrolled away, at 1366 and at 390.

Viewports checked: 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080, each with one review and with six.

Other checks: `npm run build` passes. `tsc --noEmit` is clean. `eslint components/sections/PatientStories.tsx` is clean. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch.

Open issues or follow-ups:
- No poster image exists for the patient film, so it uses `preload="metadata"` (first frame only, not the whole file) instead of `preload="none"` with a poster as Part 3.4 asks. A cropped poster in `public/assets/happy-patients/` would allow `preload="none"`.
- The source film is 270 x 480, so it is soft at 222 px on 2x screens. A higher-resolution export would help.
- The home page no longer shows the other two patient films or their quotes ("It was very beneficial, and I am feeling good." and "It went even better than we expected."). They could go on a patient-stories page if one is built.
- This run edited `HOME_REDESIGN_CHANGELOG.md` as the brief's "Report" step required, in addition to the two section files.

Owner inputs still missing: 3 to 6 verbatim Google reviews with reviewer names as shown (Part 8). To add them, append objects `{ author, text, rating }` to `reviews` in `PatientStories.tsx`; the layout adapts on its own.

## P6 revision: 3 patient videos + 5 Google reviews, one mixed row  (29 Oct 2026)

Owner feedback on the first P6 pass: keep all three patient videos, and show five Google reviews (Gaddam Sanjeeva plus four new ones). The owner chose layout option A: one mixed row. The four new reviews came from `docs/review.ts`, supplied by the owner. That file was deleted after use, as asked. A local copy is in `.audit/p6/review.ts.supplied` (gitignored).

Files changed:
- `components/sections/PatientStories.tsx`
- `components/sections/PatientStories.module.css`
- `docs/review.ts` (deleted; it was untracked)
- This changelog.

Summary of changes (on top of the first P6 entry above):
- Row: one horizontal scroll-snap row of 8 cards, in this order: review (Gaddam Sanjeeva), video ("Not at all, not at all."), review (Mohammed Shariq yezdani), video, Mehdipatnam ("It was very beneficial, and I am feeling good."), review (Khadijah), video, Nampally ("It went even better than we expected."), review (Mdshoaibuddin Uddin), review (Shivaji Prasad Jaiswal). Every card is the same height (`--row-h`: 290 to 320 px on desktop, 300 px below 1024 px). Desktop shows about four cards, with the fifth peeking and arrows on the row edges. Phones and tablets get a full-bleed swipe row.
- Reviews: all five are verbatim with 5 stars. `.audit/p6/verify-reviews.mjs` confirmed that each name, text and rating from `docs/review.ts` appears unchanged in the component. Spelling and punctuation are kept as supplied ("yezdani", "gone .Doctor", "calm ,polite", "quick , efficient"). No dates or clinics are shown, because none were supplied. Long reviews are clamped to 5 lines on desktop and 6 below 1024 px, behind "Read more".
- Videos: each card is 4:5, capped by `--media-max-h-compact`, with the quote and a "Patient video" / "Patient video, Mehdipatnam" / "Patient video, Nampally" label on a dark scrim. The branch comes from each file name. Crops: the Hyderabad film is zoomed 1.3x toward the bottom (`50% 95%`), so the gown and chair fill the card and the blurred face is cut to the top edge. The Mehdipatnam and Nampally films show the doctor with the patient (`50% 40%`, `50% 50%`).
- Playback: one video plays at a time, the most visible one that is at least 50% on screen. A video the visitor starts by hand keeps priority. A video the visitor pauses stays paused. Videos pause off-screen and never autoplay under reduced motion or Save-Data. Visibility is measured on the card frame, because the zoomed video's box is larger than its visible area.
- The "single review as a large pull quote" layout from the first pass is removed, because the row now always has 8 items.

Section measurements (`.audit/p6/probe.mjs`, results in `.audit/p6/final/`):

| Viewport | Section height / room below nav | Video card | Emptiest review card |
|---|---|---|---|
| 360x740 | 667 / 672 | 240 x 300 (41%) | 24% |
| 390x844 | 671 / 776 | 240 x 300 (36%) | 24% |
| 768x1024 | 643 / 956 | 240 x 300 (29%) | 24% |
| 1366x650 | 553 / 572 | 236 x 295 (45%) | 22% |
| 1536x730 | 591 / 652 | 256 x 320 (44%) | 28% |
| 1920x1080 | 608 / 1,002 | 256 x 320 (30%) | 28% |

The section fits one screen at every size checked, including 1366x650. No review card is more than 28% blank (limit 35%). There is no horizontal page overflow, no text under 12 px, and no tap target under 44 px at 768 px and below.

Interaction checks (`.audit/p6/interact2.mjs`, `interact3.mjs`):
- At 1366, the arrows scrolled the row to 884 px and then to the end, 1140 px; the next arrow then disables. Three ArrowRight presses on the focused row scrolled 316 px at 1366 and 317 px at 390.
- Play states for videos 1, 2 and 3 (1 = playing):
  - 1366: `100` at start, `010` and `001` after each arrow.
  - Manual play of the Mehdipatnam video: `010`, still `010` after scrolling, `000` after manual pause.
  - Off-screen: `000` at both sizes.
  - Reduced motion: `000`, and no element is left hidden.

Audit (`node scripts/home-viewport-audit.mjs`, first P6 pass -> this revision): (a), (b) and (c) are unchanged at every size. (d) is 17 at every size; it was 15 at 1536 and 17 elsewhere in the first pass. Page height changed by 65 px or less: 14,672 -> 14,607 at 360, 14,435 -> 14,370 at 390, 13,775 -> 13,730 at 768, 10,855 -> 10,845 at 1366, 11,063 -> 11,080 at 1536, 11,690 -> 11,707 at 1920. `#stories` has 0 findings in (a), (c) and (d). The audit still exits 1 only because of the `#visit` photo (P7).

Viewports checked: 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080.

Other checks: `npm run build` passes, `tsc --noEmit` is clean, and `npm run lint` is back to the baseline of 18 errors and 9 warnings. While `docs/review.ts` existed it added one unused-variable warning.

Open issues or follow-ups:
- No posters exist for the three films, so they use `preload="metadata"`. Posters would allow `preload="none"`.
- The source films are 270 x 480 and 324 x 576, so they are soft at 4:5 card size on 2x screens. The 1.3x zoom on the Hyderabad film makes it softer still.
- Several reviews name a doctor (Dr. Siraj ur Rahman, Dr. Miftah). They are shown as written.

Owner inputs still missing: none for this section.

## P6 revision 2: sound button on the patient videos  (29 Oct 2026)

Owner request: add a mute/unmute button next to play/pause. The owner also reported that no sound played.

Files changed: `components/sections/PatientStories.tsx`, `components/sections/PatientStories.module.css`, this changelog.

Summary of changes:
- Cause of "no sound": all three files have an audio track. Chromium decoded 42 to 45 KB of audio from each in 2.5 s (`.audit/p6/audio.mjs`). The videos were always muted, because browsers only allow autoplay when muted. There was no control to unmute them.
- Each video card now has two 44 x 44 px buttons in the top-right corner: sound (speaker icon, `aria-pressed`, "Turn on sound for …" / "Mute …") and play/pause. When sound is on, the sound button turns red.
- Behaviour:
  - Videos still start muted.
  - Turning sound on unmutes that video and starts it. That click is what lets the browser play audio.
  - Only one video has sound at a time. Turning sound on for another video mutes and pauses the first.
  - If the browser still refuses audio playback, the video falls back to muted playback.
- Under reduced motion or Save-Data, a video the visitor starts now also pauses when it leaves the screen. Before, nothing paused it, because the observer was skipped entirely in that mode.
- "Read more" is 48 px tall below 1024 px. At 44 px the audit flagged it at 390 because of sub-pixel rounding.

Checks (`.audit/p6/sound.mjs`, play state per video: P/p = playing/paused, S/m = sound/muted):
- 1366 and 390: `Pm pm pm` at start. After turning sound on for the first video: `PS pm pm`, with 33 KB of audio decoded at 1366 and 48 KB at 390. After turning sound on for the Mehdipatnam video: `pm PS pm`. After muting it: `pm Pm pm`. Off-screen: `pm pm pm`.
- Reduced motion: `pm pm pm` at start (no autoplay). Sound on and off behave the same as above. Off-screen: `pm pm pm`.
- `interact3.mjs` (manual play and pause) still passes: `100`, then `010`, `010`, `000`.
- Section height is 553 / 572 at 1366x650, and the section fits below the nav at every size checked. Whole-page audit: `#stories` has 0 findings at every viewport. The audit still exits 1 only because of the `#visit` photo (P7).
- `npm run build` passes. `tsc --noEmit` is clean. `npm run lint` is at the baseline of 18 errors and 9 warnings.


## P7 What to expect  (29 Oct 2026)

Files changed:
- `components/sections/WhatToExpect.tsx` (rewritten)
- `components/sections/WhatToExpect.module.css` (rewritten)
- This changelog. No other file was touched. The probe scripts are in `.audit/p7/` as `*.mjs.txt`.

Summary of changes:
- Stepper: the stair-stepped list is now a left-aligned vertical stepper. Every step has a dot on a vertical line, a title and one description. No numbers, no indentation: all four steps start at the same x (checked: step left edge and dot x are identical at every viewport). The step text is the old copy; each description is one sentence and wraps to two or three lines on phones. Titles are 22 to 26 px, descriptions 15 px (16 px from 768).
- Line draw with scroll: each step owns the line segment from its dot to the next. A grey track sits under a red segment, scaled with `scaleY` from `--p`. The dot is a grey ring that fills red (`scale`) once the line has reached it. Only transforms animate. **The draw is driven by a small scroll handler in the component, not by `animation-timeline: view()`**, because `.site { overflow: hidden }` in `globals.css` makes `view()` timelines static (the P3 finding), so the line would sit fully drawn. The reference line is at 62% of the viewport height. Sampled at 1366x650 with the stepper at the reference line: `--p` 1.00*, 0.60*, 0, 0 (`*` = dot reached). With JS off, with `prefers-reduced-motion`, or before hydration, the finished state shows (checked: no `data-armed`, all four steps opacity 1).
- Sequence: the `<ol>` is a `<Reveal stagger={140}>`. Sampled every 150 ms after scrolling it in: step opacities `0.94,0.72,0.02,0` then `0.99,0.95,0.75,0.09` then `1.00,0.99,0.95,0.77`, so they fade in one after another. The header, both photos (the reception photo with a 120 ms delay) and the CTA row use `<Reveal>` too; the section's own IntersectionObserver and `visible` class are gone.
- Photos: both are `next/image` with `fill` and explicit `sizes` (team: `(min-width: 1228px) 1180px, (min-width: 900px) calc(100vw - 48px), min(533px, 92vw)`; reception: `(min-width: 1228px) 570px, (min-width: 900px) calc((100vw - 84px) / 2), clamp(150px, 42vw, 240px)`). Both render through `/_next/image`. Frames use the global `media-frame` classes with `--focal`. Reception: `media-frame` (`--media-max-h`), focal `64% 38%` (railings top right, armchairs in the middle). Team: `media-frame--compact`, focal `50% 5%`. The old "never crop / never object-fit" comments are removed. Images are lazy (default); this section is far below the first screen.
- Desktop layout (from 900 px): **this differs from the old two-column composition.** My first version put the team photo above the stepper on the left and the reception photo tall on the right. The left column was 800 px against a 442 px photo, which left about 360 px blank under the reception photo at 1366x650. Now: the team photo is a full-width banner (4:1, 295 px at 1366, under the 338 px compact cap), and below it the stepper (left) sits beside the reception photo (right). At 1366x650 the stepper is about 450 px tall and the reception photo 442 px, so the pair is level.
- Mobile (under 900 px): header, then one scroll-snap row with the team photo first and the reception photo second, then the stepper at full width, then a full-width button. Card height is `clamp(150px, 42vw, 240px)`. The team card is 88% of the row wide (289 px at 360), so it crops about 14% of the group's width at 360 (all five faces stay in); the reception card is a square thumbnail that peeks about 25 px at 360. The row is a focusable `role="region"` with a visible focus ring, so the keyboard can scroll it. On desktop the row wrapper is `display: contents`.
- Lede: two sentences (was three), same meaning: "A considered dental appointment, from the first hello to the final goodbye, with every stage designed to keep you informed, comfortable and clear about what comes next. Specialist-led care is shaped around your concerns, with clear conversations and a measured approach, so your visit feels reassuring, personal and precise." Highlights went from five to two (Part 3.2).
- "Consultation": `HOME_REDESIGN_REFERENCE.md` (Part 8) lists the owner's confirmation as needed and none is recorded anywhere, so it now reads "A direct conversation with a Neodent specialist about what's on your mind."
- Button: "Plan your visit", linked to `/clinic` (the route exists: `app/clinic/page.tsx`). The old `#contact` does not exist on the home page. `id="contact"` is only in `Contact.tsx`, which `Home.tsx` does not render. The home page's contact block is `#get-in-touch`, but that is a single link to `/contact`, so `/clinic` is the better target.
- Heading: "NeoDent Dental Hospital" is now "Neodent Dental Hospital" (Part 3.6 brand casing).

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 14 -> 14 | 17 -> 17 | 14,611 -> 14,309 |
| 390x844 | 0 -> 0 | 0 -> 0 | 14 -> 14 | 17 -> 17 | 14,374 -> 14,051 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 22 -> 22 | 17 -> 17 | 13,734 -> 13,061 |
| 1366x650 | 1 -> 0 | 0 -> 0 | n/a | 17 -> 17 | 10,845 -> 10,787 |
| 1536x730 | 1 -> 0 | 0 -> 0 | n/a | 6 -> 17 | 11,080 -> 11,021 |
| 1920x1080 | 1 -> 0 | 0 -> 0 | n/a | 17 -> 17 | 11,707 -> 11,648 |

The audit now exits 0: this was the last media-height finding on the page (the Nampally interior photo, 813 px, 125% of the viewport at 1366x650). `section#visit` only: media over 70% 0/0/0/1/1/1 -> 0 at every size; overflow 0; taps under 44 px 0 -> 0; text under 12 px 0 -> 0. The 1536 (d) change is hero-carousel noise (see the Baseline note); none of it is in `#visit`.

Image heights (probe `.audit/p7/probe.mjs.txt`, results in `.audit/p7/after2/`). Cap: 70% of the viewport; tokens `--media-max-h` / `--media-max-h-compact`.

| Viewport | Team image | Reception image | Section height |
|---|---|---|---|
| 360x740 | 151 px (20%) | 149 px (20%) | 1,268 |
| 390x844 | 164 px (19%) | 162 px (19%) | 1,235 |
| 768x1024 | 240 px (23%) | 238 px (23%) | 1,191 |
| 1366x650 | 295 px (45%) | 440 px (68%) | 1,440 |
| 1536x730 | 295 px (40%) | 494 px (68%) | 1,456 |
| 1920x1080 | 295 px (27%) | 678 px (63%) | 1,535 |

Document overflow is 0 at every size, and the mobile row scrolls inside its box (452 of 328 px at 360). The section's height before this run was not recorded.

Viewports checked (screenshots in `.audit/p7/after2/`, `visit-*` full section and `mid-*` mid-scroll): 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080. I looked at 360, 768 and 1366. At 1366 the banner shows all five faces with the lower body trimmed, the stepper sits beside the reception photo with the red railings and both armchairs in view, and the red line runs through the first two dots at mid-scroll.

Other checks: `npm run build` passes. `tsc --noEmit` is clean. `eslint components/sections/WhatToExpect.tsx` is clean. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch. No dependency was added.

Open issues or follow-ups:
- The reception photo is the Nampally interior (`visitImage` in `lib/site-data.ts`), and its alt text calls it "Reception and waiting area at Neodent Dental Hospital". That is accurate, but the home page does not say which clinic it is.
- The reception thumbnail on phones is small (151 to 240 px square). The alternative is a 4:5 card at 220 px or more, at the cost of a taller row.
- The team photo is 3840 px wide but trimmed to a 4:1 band on desktop. Part 3.1 allows this; it hides the lower body, not any head.
- The scroll handler could move to `animation-timeline: view()` if `.site { overflow: hidden }` is changed to `clip` (see the P3 follow-up).
- Not tested: Firefox and Safari, and Lighthouse mobile.

Owner inputs still missing: confirmation that every consultation is with Dr. Md. Siraj Ur Rahman (Part 8). If confirmed, restore "with Dr. Md. Siraj Ur Rahman" in the "Consultation" step.


## P8 Spaces designed around care  (29 Oct 2026)

Files changed:
- `components/sections/SpacesDesignedAroundCare.tsx` (rewritten)
- `components/sections/SpacesDesignedAroundCare.module.css` (rewritten)
- This changelog. `lib/site-data.ts` was not edited: every value needed (hours, addresses, phones, directions, both Google ratings) already exists there. Probe scripts are in `.audit/p8/` (`probe.mjs`, `behaviour.mjs`); before and after audit sets are in `.audit/p8-before/` and `.audit/p8-after/`.

Summary of changes:
- Layout (900 px and up): a header row (title on the left; lede and "Explore our clinics" on the right), then two columns. Left: the branch switcher over the branch details. Right: the photographs. The photo box spans the whole left column, so it starts level with the switcher and ends level with the rating line, capped at `var(--media-max-h)`. The old layout left an empty block beside the header and above the photos, and empty space beside the small entrance photo.
- Photos: the primary photo fills the box with `object-fit: cover` and a focal point per image (Mehdipatnam lounge `50% 45%`, entrance `50% 40%`; Nampally reception `40% 62%`, frontage `50% 30%`). The second photo is an inset over the lower-left corner, 38% of the column wide, at its own ratio (4:5 for the Mehdipatnam doorway, 4:3 for the Nampally frontage). Both use `next/image` with `fill` and `sizes`, and lazy-load. The "never cropped / never object-fit'd" comment and the `height: auto` rendering are gone. Labels ("Waiting lounge", "Entrance", "Reception", "Street frontage") are 12 px pills on the photos. They used to be 9 px captions below them.
- Switcher: on desktop it is two tabs on one hairline row (branch name in DM Serif, locality underneath, red underline on the active tab). The old vertical list was about 110 px tall; the tabs take 52 px, which is what lets the panel and the photo box match at 1366x650. ARIA tabs: `aria-selected`, roving `tabIndex`, arrow keys plus Home and End; each tab controls its `tabpanel`. The sub-label "Neodent Dental Hospital · Hyderabad" (10 px, the same on both tabs) is replaced by "Humayun Nagar" and "Medwin Hospital Complex", both already used on the site.
- Crossfade: the details and the photos of both branches are always rendered, each set stacked in one grid cell, and fade on `data-active` over 420 ms. The inactive copies are `inert` and `aria-hidden`. Sampled every 120 ms after a click: the active panel and photo went 0 → 0.80 → 0.98 → 1.00 while the old ones went the other way. The section's height does not change between branches. Under reduced motion the switch is instant (0 / 1 at 30 ms). The old fade-out, swap, fade-in timers and the `prefersReducedMotion` state are gone.
- Opening chip: calculated in the browser from each branch's hours string (`mehdipatnamHours`, `nampallyHours`) in Asia/Kolkata time, with Sunday closed. It reads "Open now", "Opens at 4:00 PM" (same day, before opening), "Opens tomorrow at 4:00 PM" or "Opens Monday at 4:00 PM" (after closing on Saturday). I added the day words so that a visitor on Saturday night is not told "Opens at 4:00 PM". `nampallyHours` has data ("10:30 AM – 5:00 PM"), so Nampally shows a chip too. A branch whose hours string is empty or cannot be parsed shows no chip. The time is read through `useSyncExternalStore` (re-read every 30 s; `null` on the server), so the static HTML has no chip and there is no hydration mismatch. Checked with a fixed clock and a New York browser time zone, IST shown:

  | IST time | Mehdipatnam | Nampally |
  |---|---|---|
  | Thu 10:30 | Opens at 4:00 PM | Open now |
  | Thu 15:59 | Opens at 4:00 PM | Open now |
  | Thu 16:00 | Open now | Open now |
  | Thu 19:59 | Open now | Opens tomorrow at 10:30 AM |
  | Thu 20:00 | Opens tomorrow at 4:00 PM | Opens tomorrow at 10:30 AM |
  | Sat 20:30 | Opens Monday at 4:00 PM | Opens Monday at 10:30 AM |
  | Sun 13:30 | Opens tomorrow at 4:00 PM | Opens tomorrow at 10:30 AM |
  | Mon 00:30 | Opens at 4:00 PM | Opens at 10:30 AM |

- Details: the description, then a compact list (address, phone, hours plus the chip), then Call and Directions buttons, then one rating line: "Google 4.3 ★ 261 reviews" followed by "As shown on the Google listing; it may have changed since." Nampally now reads `nampallyGoogleRating` instead of the hard-coded "4.6" / 157. The phone number in the list is plain text, because the Call button sits right below it. The old 17 to 19 px inline links are gone.
- Mobile (below 900 px): header, then a two-button segmented control (48 px tall), then the two photos as a scroll-snap row (cards 84% wide, `min(clamp(220px, 62vw, 340px), var(--media-max-h-compact))` tall, aligned to the text column; the row is a focusable `region`), then the description, the list, and Call and Directions as two stacked full-width 48 px buttons, then the rating.
- Removed: the "Two locations. One Neodent standard." strip. It repeats the lede ("the same patient-focused approach" at both clinics). Also removed: the drafting lines (Part 3.2), the vertical seam tick and the section's own IntersectionObserver. The header and composition now use `<Reveal>`. The five `EditorialHighlight`s are gone, because Part 3.2 allows none in body paragraphs of dark sections. The copy is unchanged.

Audit (`node scripts/home-viewport-audit.mjs`, before -> after). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 14 -> 11 | 17 -> 6 | 14,309 -> 14,136 |
| 390x844 | 0 -> 0 | 0 -> 0 | 14 -> 11 | 17 -> 6 | 14,051 -> 13,864 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 22 -> 19 | 17 -> 6 | 13,061 -> 12,802 |
| 1366x650 | 0 -> 0 | 0 -> 0 | n/a | 17 -> 6 | 10,787 -> 10,463 |
| 1536x730 | 0 -> 0 | 0 -> 0 | n/a | 17 -> 6 | 11,021 -> 10,690 |
| 1920x1080 | 0 -> 0 | 0 -> 0 | n/a | 17 -> 6 | 11,648 -> 11,317 |

The audit exits 0. `section#clinics` only: media 0 -> 0; overflow 0 -> 0; taps under 44 px 3 -> 0 (360, 390, 768); text under 12 px 9 -> 0 at every size. The remaining (c) and (d) findings are in the nav, the footer and the fixed call bar.

Section measurements (`.audit/p8/probe.mjs`, results in `.audit/p8/after2/probe.json`). "Left" is the switcher top to the bottom of the details. The figures are the same for both branches.

| Viewport | Section height before -> after | Left column | Photo box | Photo box % of vh | Blank beside photos |
|---|---|---|---|---|---|
| 360x740 | 1,469 -> 1,295 | n/a (stacked) | 223 | 30% | n/a |
| 390x844 | 1,455 -> 1,267 | n/a | 242 | 29% | n/a |
| 768x1024 | 1,459 -> 1,201 | n/a | 340 | 33% | n/a |
| 1366x650 | 1,147 -> 823 | 449 | 442 | 68% | 0 above, 7 px below |
| 1536x730 | 1,162 -> 831 | 448 | 448 | 61% | 0 / 0 |
| 1920x1080 | 1,168 -> 837 | 448 | 448 | 41% | 0 / 0 |

At 1366x650 the photo box hits the `--media-max-h` cap (442 px) and the left column is 7 px taller.

Mobile behaviour (`.audit/p8/behaviour.mjs`):
- At 360 and 390, tapping each segment switches the panel: the address, the `tel:` link (`+919030648393` / `+919030598081`) and the photos all change.
- Call and Directions are 48 px tall and 328 / 358 px wide.
- Scrolled to the end, the second photo's right edge sits 16 px from the screen edge, matching the text column. Document overflow is 0.
- Keyboard: ArrowLeft on the Nampally tab selects and focuses Mehdipatnam, and the Nampally panel becomes inert.

Viewports checked (screenshots of both branches in `.audit/p8/after2/`): 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080. I looked at 1366 (both branches), 1920, 768 and 390 (both branches).

Other checks: `npm run build` passes. `tsc --noEmit` is clean. `eslint components/sections/SpacesDesignedAroundCare.tsx` is clean. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch. No console errors or warnings on load with the section in view. No dependency was added.

Open issues or follow-ups:
- **Nampally hours conflict:** the signboard in the Nampally frontage photo reads "Timings: 10AM to 7PM, Sunday holiday". The site data (`nampallyHours`, `schemaOpeningHours: "Mo-Sa 10:30-17:00"`) says 10:30 AM to 5:00 PM. The chip follows the site data. The owner should confirm which is current.
- The Mehdipatnam entrance file is 382 x 510 px. That is enough for the 190 px desktop inset but soft as an 84% wide mobile card on 2x screens. A larger original would help.
- Weekly closure (Sunday) is a constant in the component, matching `weeklyClosure` in `lib/clinic-data.ts`. I did not import that file, because it pulls the treatments catalogue into the home bundle. If closures ever differ by branch, add a field to `lib/site-data.ts`.
- The heading still uses the black headline with a red italic phrase. Part 6.10 may vary it.

Owner inputs still missing: confirmation of the Nampally hours (see above). Other Part 8 items are unchanged.



## P9 Final call-to-action, footer, mobile bar  (29 Oct 2026)

Files changed:
- `components/sections/ContactNextStep.tsx` (rewritten)
- `components/sections/ContactNextStep.module.css` (rewritten)
- `components/layout/Footer.tsx`, `components/layout/Footer.module.css`
- `app/globals.css`: the `.mobile-bar` block inside `@media (max-width: 560px)` only (button height, and `.site { padding-bottom: 62px }` replaced by a `--mobile-bar-space` custom property).
- `components/Home.tsx`: the LeadCapture scroll threshold only.
- This changelog. `app/api/enquiry/route.ts`, `lib/enquiry-schema.ts`, `components/contact/TurnstileWidget.tsx` and `components/ui/LeadCapture.tsx` were read, not changed. Probe scripts: `.audit/p9/check.mjs`, `.audit/p9/real-submit.mjs`. Audit sets: `.audit/p9-before/`, `.audit/p9-after/`.

Summary of changes:
- Consultation block (`#get-in-touch`):
  - Content: headline "Book a consultation"; one line: "Share a few details and our team will get back to you to arrange a visit. If you would rather talk now, call the clinic that suits you."; a card per clinic with name, "Mon to Sat, <hours> / Sunday holiday" (`mehdipatnamHours`, `nampallyHours`) and a call button with the branch number (`phone` / `telPhone`, `nampallyPhone` / `nampallyTelPhone`). These are the branch numbers, not the generic `ctaPhone`.
  - Layout: on desktop the intro and call cards sit on the left, vertically centred against the form card on the right. Below 960 px everything stacks.
  - Form (ivory card): name, phone (`type="tel"`, `inputMode="tel"`, `autoComplete="tel"`), clinic (two radio pills in a `fieldset` with a legend), treatment (optional, `enquiryTypeOptions`) and message (optional). All labels are visible. Every input is 48 px tall at 16 px text; the textarea is 92 px.
  - Consent line: "By sending this form you agree that Neodent may contact you about your request. Please do not include sensitive medical details. See our Privacy Policy." The link goes to `/privacy-policy`.
  - Anti-spam: the hidden `company` honeypot, and the existing `TurnstileWidget` (imported unchanged).
  - API contract: it posts to `/api/enquiry` with the Contact page form's field names (`name`, `phone`, `clinic`, `enquiryType`, `message`, `company`, plus `turnstileToken`). It validates first with the same `validateEnquiry` from `lib/enquiry-schema.ts`. Errors from the route's `errors` object are mapped back to the fields.
  - States:
    - Loading: the button reads "Sending…" with a spinner, is disabled, and the form has `aria-busy`.
    - Success (`role="status"`): "Thank you, <name>. Your request for the <clinic> clinic has been sent…" and a "Send another request" button.
    - Error (`role="alert"`): shows the route's message, then re-arms Turnstile.
    - Field errors: shown under each field, and focus moves to the first invalid field.
  - **Optional message vs. the schema:** the shared schema requires a message of at least 10 characters, and the schema and route were off limits. When the message is left blank, the form sends the fixed text "Consultation request from the home page. No message was added." That passes validation and tells the clinic no message was written. A typed message of 1 to 9 characters gets the schema's own error ("Please share a little more detail (at least 10 characters).").
  - Removed: the old "Let's make your next step feel simple." card, its three `EditorialHighlight`s and the section's own IntersectionObserver. It now uses `<Reveal>`. The block has no numbering.
- Footer:
  - "Changing smiles since decades." is now "Changing smiles since 1994." (the year comes from `ESTABLISHED_YEAR`), and the ghost "1994" (`.year`) is gone.
  - Layout unchanged. Tap and text fixes inside the footer:
    - Column labels go from 11 to 12 px.
    - "Call Neodent" is 48 px tall (was 40).
    - The branch name links are 44 px tall (were 33).
    - From 1023 px down, link rows are 44 px tall (they were 36 at 768).
    - Short links ("Home", "About", "Privacy") are at least 44 px wide.
- Mobile bar:
  - Hiding: P1 already hides it while a hero "Call for Consultation" button is on screen. Checked again at 390: hidden (opacity 0) at the top, visible at 2,000 px, visible at the bottom.
  - Size: the button is now 44 px tall (was 43), so the bar is 62 px.
  - Safe area: the bar's padding already used `env(safe-area-inset-bottom)`, and the space kept free for it now adds the safe area too.
  - **Area under the footer:** `.site` used to have `padding-bottom: 62px` below 560 px, which showed the cream body under the dark footer. `.site` now sets `--mobile-bar-space: calc(62px + env(safe-area-inset-bottom))`, and the footer adds that to its own bottom padding. At 390 the footer ends exactly at the document's end (gap 0), and with the bar hidden the point 20 px above the bottom edge is the footer. Scrolled to the very bottom of the home page, the legal row ends at y = 782, exactly where the bar starts, so the bar covers no footer content. This applies on every page that uses `.site`. Checked: `/treatments` (has a bar) ends the same way. `/contact` (no bar) now has 62 px of footer colour at the end instead of 62 px of cream.
- LeadCapture threshold (`Home.tsx`): it now opens at 70% scroll at 767 px and below, and stays at 50% on desktop. Checked at 390: closed at 45, 55 and 65%, open at 72%. At 1366: closed at 45%, open at 55%.

Form submission against `npm run dev` with the existing `.env.local`:
- Real browser run (`.audit/p9/real-submit.mjs`, nothing mocked, test data marked "QA Test (please ignore)"): the Turnstile widget showed "Verifying…" and never issued a token in 25 s. Cloudflare's challenge request returned 401. That is expected for an automated headless browser, and I made no attempt to get around it. The form therefore stopped on the client with "Please complete the verification and try again." No request reached `/api/enquiry` and **no email was sent**. The existing `/contact` form behaves the same in this browser (no token after 20 s), so the cause is the test environment, not the new block.
- Direct calls to the dev route with this form's exact payload:
  - Without a token: `403 {"ok":false,"message":"Please complete the verification and try again."}`. The route only checks Turnstile after the schema check passes, so this shows the field names and the fixed blank-message text pass the server's validation unchanged.
  - With a fake token: the same 403, so Turnstile verification ran against the real secret.
  - With an empty clinic and a 2-character message: `400` with `errors: {clinic: "Please choose a preferred clinic.", message: "Please share a little more detail (at least 10 characters)."}`.
- UI states (`.audit/p9/check.mjs`, with `/api/enquiry` and Cloudflare's script mocked in the test browser only, so nothing was sent):
  - Empty submit: three field errors, focus on "Your name".
  - "12ab" as the phone: phone error.
  - Valid submit (1.2 s delay): "Sending…", disabled, `aria-busy=true`, then the success state. Payload: `{"name":"Test Patient","phone":"+91 90000 00000","clinic":"Nampally","enquiryType":"Dental Implants","message":"Consultation request from the home page. No message was added.","company":"","turnstileToken":"stub-token"}`.
  - Mocked 502: the route's error message is shown in the alert.
  - Screenshots: `.audit/p9/after/state-success-390.png`, `state-error-390.png`.
- **To finish the end-to-end check, submit the form once by hand** in a normal browser on `http://localhost:3000/#get-in-touch`. If the production sitekey does not render on localhost, use Cloudflare's test keys from `.env.example`. With the current settings, a successful submission emails the real `CONTACT_INBOX_EMAIL`.

LeadCapture check (not changed):
- Closes on Escape: yes. On a backdrop click: yes. On the close button: yes.
- **Focus is not trapped and not moved:** after it opens, focus stays on `<body>`, and eight Tab presses all landed on the page behind it (brand link, then the nav links, then "Talk to Neodent"). Focus is not returned on close either.
- **Wrong hours:** it says "Open today, 10:00 AM - 08:00 PM" every day, including Sundays. That matches neither branch (Mehdipatnam 4:00 to 8:00 PM, Nampally 10:30 AM to 5:00 PM).
- It also only mentions Humayun Nagar. All three need a change inside `LeadCapture.tsx`.

Audit (`node scripts/home-viewport-audit.mjs`, before -> after; exits 0 both times). Whole page:

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 11 -> 6 | 6 -> 2 | 14,136 -> 15,011 |
| 390x844 | 0 -> 0 | 0 -> 0 | 11 -> 6 | 6 -> 2 | 13,864 -> 14,758 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 19 -> 4 | 6 -> 2 | 12,802 -> 13,365 |
| 1366x650 | 0 -> 0 | 0 -> 0 | n/a | 6 -> 2 | 10,463 -> 10,594 |
| 1536x730 | 0 -> 0 | 0 -> 0 | n/a | 6 -> 2 | 10,690 -> 10,855 |
| 1920x1080 | 0 -> 0 | 0 -> 0 | n/a | 6 -> 2 | 11,317 -> 11,482 |

- Remaining (c), consultation block and footer: the inline "Privacy Policy" link in the consent sentence (allowed as an inline text link), and the footer brand link (42 px, inside `BrandLockup`, outside this run's files). The rest are in the nav.
- Remaining (d): the nav "Dental Hospitals" sub-line (7.5 / 8.5 px), also in `BrandLockup`.

Section heights (before -> after):

| Viewport | `#get-in-touch` | Footer |
|---|---|---|
| 360x740 | 616 -> 1,488 | 1,804 -> 1,870 |
| 390x844 | 598 -> 1,490 | 1,480 -> 1,544 |
| 768x1024 | 514 -> 1,124 | 1,192 -> 1,145 |
| 1366x650 | 592 -> 810 | 1,037 -> 951 |
| 1920x1080 | 571 -> 827 | 1,055 -> 964 |

On phones the footer grew by the 62 px that used to be cream `.site` padding, so that part is not new page length. **Phone page length grew by about 875 px** (15,011 at 360, against the ~12,000 budget), because the block now holds the call cards and a form instead of one link. Options for P10: collapse the form behind a "Request a call back" button on phones, or drop the per-clinic cards on phones and keep two call buttons.

Viewports checked: 360x740, 390x844, 768x1024, 1366x650, 1536x730 (audit only), 1920x1080. Document overflow is 0 everywhere. Screenshots: `.audit/p9/after/cta-*.png`, `footer-*.png`, `page-bottom-390-bar-hidden.png`, `home-bottom-390.png`.

Other checks: `npm run build` passes. `tsc --noEmit` is clean. `eslint` on the three changed TS files is clean. `npm run lint` is unchanged at 18 errors and 9 warnings, all in files this run did not touch. No console errors on `/`, `/treatments` or `/contact` at 390. No dependency was added.

Open issues or follow-ups:
- LeadCapture: focus trap and focus handling, wrong hours, Humayun Nagar only (see above).
- `app/layout.tsx` sets no `viewport-fit=cover`, so on iPhones `env(safe-area-inset-bottom)` is 0 and the browser keeps the page above the home indicator itself. The bar is correct either way. If `viewport-fit=cover` is added later, the safe-area padding already in place takes effect.
- The route's notification email says "via neodentdentalhospitals.com/contact" for home-page requests too, because the route builds that text and was out of scope.
- The Turnstile widget uses its fixed light theme and fixed label id (`enquiry-verification-label`). That is fine with one form per page; a second form on the same page would duplicate the id.
- Mobile page length (see above).

Owner inputs still missing: the Nampally hours confirmation from P8 (the chip and these call cards both use 10:30 AM to 5:00 PM). Other Part 8 items are unchanged.


## P10 Whole-page QA  (30 Oct 2026)

Files changed:
- `components/hero/Hero.tsx`: each slide is a `<div role="group">` instead of `<article role="group">`. axe does not allow `role="group"` on `<article>` (Lighthouse `aria-allowed-role`). No visual change: no CSS targets `article`.
- `components/sections/Expertise.tsx`: `role="tablist"` moved from the card grid onto a `display: contents` wrapper around the seven tabs only. The closing "Explore all treatments" link now sits outside the tablist but is still in the same grid, so the layout is unchanged (Lighthouse `aria-required-children`: "Element has children which are not allowed: a").
- `components/motion/Reveal.tsx`, `components/motion/motion.module.css`: with `stagger`, a direct child marked `data-reveal-contents` is stepped through, and its own children become the moving layers. This keeps the treatment cards' staggered rise (indexes 0 to 6 for the tabs, 7 for the link). The draw-line fallback is now 560 ms + 120 ms delay (was 900 ms), inside the 300 to 700 ms rule (Part 3.5). The old 900 ms draw was also cut short when `<Reveal>` marked itself done at 720 ms, so the line snapped to full.
- `components/sections/LegacyStory.module.css`: the same draw-line timing (560 ms + 120 ms, was 900 ms + 160 ms).
- `components/sections/ContactNextStep.tsx` + `.module.css`: Cloudflare Turnstile now loads only when the form is within 600 px of the viewport, or when anything in the form gets focus. Until then a 99 px box (the measured height of the loaded widget block) holds its place. The submit path, validation and API contract are unchanged.
- `components/ui/EditorialHighlight.tsx` + `.module.css`: under reduced motion the stylesheet now shows the finished underline or marker, and the effect returns early instead of calling `setState`. Same result, and this clears the file's `react-hooks/set-state-in-effect` lint error. This component is also used on internal pages; its behaviour there is identical.
- `components/layout/Footer.module.css`: the brand link is 44 px tall (was 42). The Explore and Treatments link columns now sit side by side from 360 px; before, they did so only from 390 px. At 360 both columns are 152 px wide, no link overflows, and the footer is 1,868 → 1,543 px.
- This changelog. Probe scripts: `.audit/p10/probe.mjs`, `leftovers.mjs`, `hidden.mjs`, `check.mjs`. Lighthouse JSON: `.audit/p10/lh-*.json`. Audit output: `.audit/p10-audit-before.txt`, `.audit/p10-audit-after.txt`.

Not changed (checked, already correct):
- `lib/structured-data.ts` already has `foundingDate: "1994"` on the `MedicalOrganization` node (`#organization`). Both `Dentist` branch nodes link to it through `parentOrganization`. It is in the built home page HTML (checked: `"foundingDate":"1994"` is present in the `next start` response). I did not copy it onto the two `Dentist` nodes. 1994 is the founding year of Neodent and of the Mehdipatnam practice ("The practice began here in 1994"); no source gives a year for Nampally, so putting 1994 on that node could be wrong. Part 7 item 6 says "the `Dentist` object". If the owner confirms 1994 for both branches, add it in `locationJsonLd`.
- Leftover search, in source (case-sensitive, all home components plus `lib/site-data.ts`, `lib/clinical-team.ts`, `lib/structured-data.ts`) and in the rendered DOM at 390 and 1366 (text nodes, `::before` / `::after` content, alt text and aria-labels, rotated or vertical text, text 90 px or larger):
  - Found nothing for: numbered labels (`01 /`), slide counters, roman-numeral captions, `NEODENT /` meta strips, rotated edge labels, `writing-mode`, "since decades", "since 3 decades", "not available" or "NeoDent" in visible text.
  - Source hits are comments only (`Footer.module.css` "Sections 07/08", `site-data.ts` "Slides 01/02" and "InsideNeoDent", the name of a clinic-page component).
  - The only large numerals on the page are the solid "1994" lockup in LegacyStory (ink, full opacity, the Part 7 element) and the "32" in the red band. Neither is a ghost.

Audit (`node scripts/home-viewport-audit.mjs`, before -> after; exit code 0 both times):

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 (inline) | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 5 (1) -> 4 (1) | 2 -> 2 | 15,011 -> 14,686 |
| 390x844 | 0 -> 0 | 0 -> 0 | 5 (1) -> 4 (1) | 2 -> 2 | 14,758 -> 14,760 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 3 (1) -> 3 (1) | 2 -> 2 | 13,365 -> 13,359 |
| 1366x650 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 10,594 -> 10,594 |
| 1536x730 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 10,855 -> 10,855 |
| 1920x1080 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 11,482 -> 11,482 |

Remaining (c), all outside this run's scope or allowed:
- Navigation (out of scope): `a.brand` 146x42, `button.menu-toggle` 40x40, the mobile menu's "Talk to Neodent" 42 px tall.
- The inline "Privacy Policy" link in the consent sentence (an inline text link, which the 44 px rule exempts).

Remaining (d): the "Dental Hospitals" sub-line inside `BrandLockup` (7.5 px on phones, 8.5 px on desktop), shown in the nav and in the footer. `BrandLockup` is shared with the navigation, so I did not change it (Part 12, navigation pass).

Per-section heights (px, from `.audit/p10/probe-after.json`):

| Section | 360x740 | 390x844 | 768x1024 | 1366x650 | 1920x1080 |
|---|---|---|---|---|---|
| Hero `#home` (dark) | 755 | 790 | 855 | 572 | 1,002 |
| Stat strip + "Care begins" `exp-intro` (light) | 1,670 | 1,686 | 1,557 | 939 | 1,123 |
| 1994 `#legacy` (light) | 2,106 | 2,102 | 2,132 | 1,506 | 1,545 |
| Treatments `#expertise` (dark) | 1,607 | 1,632 | 1,626 | 1,373 | 1,380 |
| Doctors `#leadership` (light) | 2,285 | 2,340 | 1,890 | 1,629 | 1,662 |
| Patient stories `#stories` (light) | 671 | 675 | 647 | 553 | 608 |
| What to expect `#visit` (light) | 1,268 | 1,235 | 1,191 | 1,440 | 1,535 |
| Spaces `#clinics` (dark) | 1,294 | 1,266 | 1,200 | 822 | 836 |
| Consultation `#get-in-touch` (dark) | 1,487 | 1,489 | 1,123 | 809 | 826 |
| Footer (dark) | 1,543 (was 1,868) | 1,545 | 1,144 | 950 | 964 |
| **Page** | **14,686** | **14,760** | **13,359** | **10,594** | **11,482** |

The SeamCard overlaps the seam, so it adds 0 px. **Mobile page length is still about 2,700 px over the ~12,000 px budget.** I did not close the gap, because every remaining option changes a section's design. The largest candidates:
- `#get-in-touch`: collapse the form behind a "Request a call back" button on phones (about 900 px).
- `#leadership` (2,285 at 360): show the two leadership cards' credential rows behind "Read more" (about 500 px).
- `#legacy` (2,106 at 360): drop the red "32 years" band, which repeats the stat strip's first figure (about 300 px).
- `exp-intro`: one of the two "Care begins" paragraphs behind "Read more".

These need the owner's choice.

Heading hierarchy (`.audit/p10/probe-after.json`, the same at every viewport):
- Exactly one `h1`: the slide 1 headline, "Three decades of changing smiles." The slide 2 and 3 headlines are `h2`s inside inert, `aria-hidden` slides.
- Every section starts with one `h2`: Care begins, Decades of changing smiles, What can we help you with?, A steady hand, What patients say, What to expect, Spaces designed around care, Book a consultation.
- `h3` under those: the Dr. Siraj card, the treatment panel title, the leadership names, "Dr. Miftah at work", "Our clinical team", the stepper steps.
- `h4` for the five specialists under "Our clinical team".
- The footer uses `h2` column labels with `h3` branch names.
- No levels are skipped.

Dark and light alternation: hero dark | stat strip, Care begins and 1994 light | treatments dark | doctors, stories and visit light | spaces, consultation and footer dark.
- Two runs of three same-tone blocks remain.
- `#stories` and `#visit` have the same background (`#f8f6ef`), and `#stories` has only 36 px of vertical padding on phones (49 px at 1366, against 64 to 136 px elsewhere), so the two read as one block.
- At the bottom, `#clinics` (`#14161a`), `#get-in-touch` (`#121316`) and the footer (`#101214`) are three nearly identical charcoals.
- I did not change any section's tone (that would restyle a section). The cheapest fix is to put `#visit` on `--neodent-surface` (`#fffefa`) or `#get-in-touch` on the paper tone. This is the owner's call; P5 already flagged the light run.

Spacing: section padding on phones is 64 to 80 px except `#stories` (36 px, chosen in P6 to fit one screen) and the seam pair (160 px around the SeamCard, by design). On desktop it is 96 to 136 px. Apart from `#stories`, no outliers.

Reveal timing: every home section uses the shared `<Reveal>` (640 ms, `cubic-bezier(0.22, 1, 0.36, 1)`, 12 px rise). The other motion on the page:
- Hero: its own on-load and slide-change set (600 to 700 ms, plus a 900 ms portrait mask and an 1,100 ms portrait settle), from P1.
- 320 ms transitions on the WhatToExpect stepper dots and the Spaces tab underline.
- The 420 ms Spaces crossfade.
- The 700 ms EditorialHighlight sweep.
- Draw lines: now 560 ms everywhere.

After a full scroll, no `<Reveal>` content stays hidden at any viewport. Specialist cards in the 768 px swipe row reveal when the row scrolls into them, and all were visible after scrolling (`.audit/p10/hidden.mjs`).

Reduced motion (`reducedMotion: "reduce"`, all six viewports): no running animations, 0 videos playing, all EditorialHighlight decorations drawn (`background-size: 100% 2px`), all tabs at opacity 1. The only opacity-0 elements are deliberate:
- the two visually hidden clinic radio inputs (their pill labels are visible);
- the Patient Stories "previous" arrow, which is hidden while disabled at the start of the row.

Lighthouse (mobile, Lighthouse 12 via `npx`, nothing added to `package.json`; `next start` on the production build, installed Chrome headless). Before: two runs. After: three runs.

| | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed Index | Page weight |
|---|---|---|---|---|---|---|---|---|---|---|
| Before (runs 1 / 2) | 42 / 41 | 92 / 92 | 100 | 100 | 2.4 / 4.4 s | 6.7 / 10.7 s | 2,110 / 870 ms | 0.014 / 0.005 | 5.1 / 6.1 s | 1,677 / 1,777 KiB |
| After (runs 1 / 2 / 3) | 45 / 46 / 46 | 97 | 100 | 100 | 3.7 / 3.6 / 3.6 s | 5.9 / 5.8 / 5.8 s | 920 / 880 / 870 ms | 0.005 | 6.1 s | 818 / 821 / 818 KiB |

- Accessibility 92 -> 97: `aria-allowed-role` (hero) and `aria-required-children` (treatments tablist) are fixed. The remaining failure is `color-contrast` on the **navigation** brand word "NEODENT" (`header > … > span.brand-word-name`, `#d71920` on `#161c1e`, 3.32:1 at 16 px). The navigation is out of scope.
- Page weight halved: before, Turnstile's challenge (642 KB XHR + 188 KB document) loaded on every visit. It now loads only near the form.
- Before, the LCP element was the cookie banner text (6.2 s render delay). After, it is the hero portrait (load delay 0, render delay 5.3 s). The time goes on main-thread work, not network:
  - Main thread: 3.7 s. Script bootup: 1.0 s.
  - 1,237 DOM elements.
  - About 42 KB of render-blocking CSS from `globals.css` (four CSS chunks).
  - The whole home page is one client component (`"use client"` in `components/Home.tsx`), so every section hydrates.
  - The P1 portrait mask animation (900 ms from 120 ms) only starts once the page can paint.
- Performance (41 to 46) remains the weakest number. It needs structural work (see the priority list), not a QA fix.

Build and lint:
- `npm run build` passes (before and after).
- `npx tsc --noEmit` is clean.
- `eslint` on every file touched in P1 to P10 is clean.
- **`npm run lint` still exits 1** with 17 errors and 9 warnings (was 18 and 9; the EditorialHighlight error is fixed). All of them are in files this brief puts out of scope:
  - `_tmp_qa.js` (4): a gitignored scratch file at the repo root.
  - `components/layout/Navbar.tsx` and `BrandLockup.tsx` (1 each): navigation.
  - `components/consent/CookieConsentContext.tsx` (1).
  - `components/treatments/QuestionsContact.tsx`, `TreatmentAtlas.tsx`, `TreatmentThinking.tsx` and `TreatmentsHero.tsx` (10 unescaped `'`): internal treatment pages.
  - The warnings are in unused old sections (`About`, `Doctor`, `Gallery`, `TrustStrip`, `WhyNeodent`), `RealTreatmentWork`, `TreatmentAtlas` and `scripts/seam-card-qa.mjs`.

  Making lint pass means touching the navigation and internal pages. That needs the owner's go-ahead. The fixes are mechanical: `&apos;` escapes, deleting or ignoring `_tmp_qa.js`, and a `useSyncExternalStore` mount flag in the two `set-state-in-effect` files.

Viewports checked: 360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080 (audit, probe, reduced-motion probe). Screenshots: `.audit/home/<viewport>/` (after) and `.audit/p10-before/<viewport>/`. I looked at every 360 px section and at the 360 footer after the change (`.audit/p10/footer-360-after.png`).

Remaining issues, by priority:

P1, should fix before launch:
1. Mobile page length is 14,686 px at 360, against about 12,000 px. Options and their savings are listed under the section heights above; the owner needs to choose.
2. `npm run lint` fails (17 errors) in navigation, consent and internal-page files. Needs permission to touch them.
3. Lighthouse mobile performance is 45 to 46 (LCP 5.8 s, TBT about 880 ms). The biggest levers:
   - Split `components/Home.tsx` so that only interactive parts are client components; most sections could render on the server.
   - Trim or split `globals.css` (about 9,000 lines; most of it is for internal pages but loads on the home page).
   - Let the hero portrait paint before its mask animation, or drop that animation on phones.
4. LeadCapture (from P9): no focus trap, focus is not returned on close, the hours are wrong ("10:00 AM - 08:00 PM" every day) and it lists Humayun Nagar only.

P2, polish:
5. Tone runs: stories and visit share one background and read as one block; spaces, consultation and footer are three near-identical charcoals (see above).
6. Navigation (Part 12 pass): brand-word contrast 3.32:1, "Dental Hospitals" at 7.5 to 8.5 px, brand link 42 px, menu toggle 40 px, "Talk to Neodent" 42 px.
7. `.site { overflow: hidden }` in `globals.css` stops every `animation-timeline: view()` effect (P3 finding). LegacyStory and WhatToExpect use fallbacks. Changing it to `overflow-x: clip` needs a check of sticky elements on internal pages.
8. The legacy band's "32 years" repeats the stat strip's first figure (P3).
9. The treatments panel (about 865 px) is taller than the card grid (about 710 px) at 1366 (P4).
10. Hero slide 3's images (awards photo, Siasat cutting, about 110 KB) load on first visit, because the inactive slides share the viewport grid cell.

P3, content and assets (owner):
11. Nampally hours conflict: the signboard reads 10 AM to 7 PM, the site data 10:30 AM to 5:00 PM (P8).
12. Siasat English caption approval; "25,000+" and 418 review verification; consultation-with-Dr.-Siraj confirmation; optional milestones (Part 8).
13. Garbled coat-badge text on Dr. Miftah's cut-out; low-resolution Muti and Muqeet cut-outs, Mehdipatnam entrance photo and patient films; no posters for the patient films (P5, P6, P8).
14. `foundingDate` per branch, if the owner confirms the Nampally year (see above).

Owner inputs still missing: as listed in P3 above and in Part 8.


## P1b Hero background and staging  (30 Oct 2026)

Files changed:
- `components/hero/Hero.tsx`: a `.hero-backdrop` with one `.hero-bg` per slide (glow layer and pattern layer, `aria-hidden`), crossfaded with the active slide. Slide 1: portrait stage (spotlight, ground shadow, fading clip box), one "Since 1994 / Mehdipatnam · Nampally" glass card (replaces the two `.hero-tag`s), and a click-to-call glass card (`ctaTelPhone`, shows `ctaPhone`). The portrait no longer uses `<Reveal variant="mask">`. Slide 2: each photo card is now the link, with the caption on the photo; the caption rows below are gone. Slide 3: `RecordFigure` renders a bordered plate with the caption on the photo; the Siasat cutting gets a solid caption band under it.
- `app/globals.css`: hero block only (P1 lines 657 to 1367, now 657 to 1708). New: background layers, glass cards, portrait stage, plates, slide 2 offset, slide 3 document band, dots/pause row, motion. Removed: `.hero-tag*`, `.hero-branch-row`, `.hero-caption`, `.hero-record-item`, the portrait frame (red border and inner gradient), the portrait `drop-shadow` (20px blur) and the mask/settle keyframes for the portrait. A diff against the pre-P1b copy (`.audit/hero-p1b/globals.before.css`) touches nothing outside the hero block.
- `lib/site-data.ts`: Nampally `focal` "50% 30%" -> "41% 50%" (with a comment). Mehdipatnam unchanged ("50% 40%", chandelier and lounge).
- No new images, no new dependencies. The only image the new layers use is `/assets/backgrounds/neodent-treatments-icon-pattern-dark.webp` (41 KB, already used by the treatments section).
- Scripts (gitignored): `.audit/hero-p1b/shots.mjs` (screenshots + fit probe), `contrast.mjs`, `pattern-diff.mjs`, `motion.mjs`. Before copies: `Hero.before.tsx`, `globals.before.css`.

Summary of changes:
- Background, all slides: `.hero` has a vertical gradient from `--neodent-charcoal` to `#0f1315`. Each slide's backdrop has a red radial ellipse behind the media (alpha 0.30 on slide 1, 0.22 on slides 2 and 3; centre `--glow-x` / `--glow-y`: `calc(50% + min(290px, 23vw))` / 50 to 54% on desktop, 50% / 76% below 1024px), a faint red glow at the bottom-left (0.12; 0.10 on phones), and the icon pattern (420px tile at 0.08; 320px at 0.05 on phones), masked by a radial gradient centred on the media that reaches 0 before the copy column. There were no gridlines, brackets, registration marks, edge labels or ghost numerals left in the hero code (P1 had removed them); none were added.
- Slide 1: no frame. The stage is a CSS size container; the portrait is as wide as the column (or 147% of the stage height if smaller), placed so the centre of the head is 30% down the stage. The lower 20% of the stage fades out (`mask-image`), so there is no cut line. A circular red spotlight 70% of the column wide sits at shoulder height, with a dark elliptical ground shadow under it. The glass card sits on the left shoulder, clear of the face; the call card sits bottom-right over the jacket. Glass style as specified: `rgba(16,21,23,0.72)`, 1px `rgba(255,255,255,0.12)`, radius 0.35rem, `backdrop-filter: blur(8px)` inside `@supports`.
- Slide 2: two photos of the same height; the Nampally card sits 7% of the photo height lower. Each has a 1px `rgba(255,255,255,0.1)` border, a soft shadow and a bottom gradient with the name (bold), the address line and the arrow. The photo height is capped at 1.45 x the card width, so at least about 640 of the photo's 1280 source px are visible and the whole "NEODENT DENTAL HOSPITAL" sign reads at every size checked.
- Slide 3: the same plates and caption overlays. The Siasat cutting is still `contain` and whole; its caption is on a solid band below the cutting, inside the same card, so no text covers the cutting. The card is at least 136px wide so the two-line caption fits. The three plates fade up at 160, 280 and 400 ms.
- Motion (transform and opacity only): glow breathes 1 -> 0.85 (9s, ease-in-out, infinite alternate); pattern drifts to translate3d(-10px, 8px, 0) (12.8px, 18s alternate). Both run only on the active slide, only at 768px and wider, and only without reduced motion; `will-change` is set only on those two running layers. Photos on slides 2 and 3 zoom from 1 to 1.035 over `HERO_AUTOPLAY_MS + 800ms` (ease-out transition, reset after the slide has faded out); the Siasat cutting and the portrait do not zoom. The portrait rises 24px and fades in (800 ms from 120 ms); the spotlight fades in; the two glass cards fade up at 450 and 600 ms. Under reduced motion nothing animates and nothing zooms.
- Dots and pause: each dot button is 44px tall and at least 44px wide (26px of hit area before the track, 10px after), so the tracks are 36px apart and the row width is constant (70 + 44 + 44px). The pause icon sits about 12px after the last dot (it was about 55px), and its own 44 x 44 hit area does not overlap the dots. Progress fill and pause behaviour unchanged.
- Mobile: same layers, lower pattern opacity, no breathing or drift. The portrait is staged the same way and shifted right by 14% of the stage, so the "Since 1994" card can take the top-left corner without covering the face; that side of the portrait also fades out.

Audit (`node scripts/home-viewport-audit.mjs` against `next start` on :3100, before -> after; exit code 0 both times):

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 (inline) | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 4 (1) -> 4 (1) | 2 -> 2 | 14,686 -> 14,685 |
| 390x844 | 0 -> 0 | 0 -> 0 | 4 (1) -> 4 (1) | 2 -> 2 | 14,760 -> 14,760 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 3 (1) -> 3 (1) | 2 -> 2 | 13,365 -> 13,365 |
| 1366x650 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 10,594 -> 10,594 |
| 1536x730 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 10,855 -> 10,855 |
| 1920x1080 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 11,482 -> 11,482 |

No finding is in `section#home`. The 1px at 360 is the hero: 755 -> 753px, because the portrait frame's 1px top and bottom borders are gone. The remaining findings are the navigation and the consent "Privacy Policy" link, the same as after P10.

Hero fit (`shots.mjs`, hero height vs `innerHeight - nav`, all three slides):
- 1366x650: 572 / 572. Media bottom 500 / 464 / 464; primary button bottom 487 / 456 / 426.
- 1440x900: 822 / 822. Media bottom 700 / 644 / 654; button bottom 729 / 598 / 597.
- 390x844: the hero is 790px from the top of the page (nav included), inside the 844px screen; media bottom 734; button bottom 386 / 289 / 289. Headline and primary button are in the first screen on every slide.
- 360x740 (not one of the three fit sizes): the hero is 753px, 13px taller than the screen, as in P1 (755). The media ends at 697 and the dots at 747.

Contrast (`contrast.mjs`: copy text made transparent, the real background under each line screenshotted, glow frozen at its brightest frame, worst pixel reported; 15 slide x viewport combinations):
- Ivory headline lines: at least 16.1:1.
- Lede (ivory at 72%, composited per pixel): at least 8.86:1.
- Red accent phrase (`--neodent-red` on the background): 3.35 to 3.48:1. This is under 4.5:1, but the glow does not cause it: on plain charcoal this colour pair is 3.32:1 (P10), and the glow never reaches the headline. It is large text, so it passes the 3:1 large-text rule that Part 3.7 sets for red on charcoal. Reaching 4.5:1 would mean changing the colour token, which this brief does not allow.

Pattern behind the copy (`pattern-diff.mjs`: headline + lede box screenshotted with the pattern on and hidden): the largest pixel difference is 0 at every viewport and slide, so the pattern does not show behind the headline or lede. Along the top edge of the media it differs by 1 to 4 levels (0 to 255), which is how faint it is at the specified 0.08.

Screenshots (`.audit/hero-p1b/after/<viewport>-s<slide>.png`; P1 in `.audit/hero-p1b/before/`):
- 1366x650 s1: copy on the left as in P1. On the right a soft dark-red glow, brightest behind the doctor's shoulders. The portrait has no frame; the head starts just below the media top (no dead space) and the body fades out above the hands. "Since 1994 / Mehdipatnam · Nampally" on the left shoulder, the call card bottom-right over the jacket. Dots and pause in one tight row.
- 1366x650 s2: two bordered, rounded photo cards with shadows; Nampally sits lower. "NEODENT DENTAL HOSPITAL" reads in full. Name and address in white on a dark gradient at the bottom of each photo, arrow on the right. Faint glow behind the pair.
- 1366x650 s3: the whole Siasat cutting on the paper-coloured plate with "The Siasat Daily, Hyderabad" on a dark band under it (two lines). The broadcast and awards plates on the right with their captions on the photos.
- 1440x900 s1: as 1366, larger. The headline wraps to four lines (as in P1). The portrait's lower body fades into the background just above the stage bottom.
- 1440x900 s2 and s3: as 1366, taller plates; Nampally sign whole.
- 1920x1080 s1 to s3: the composition is centred in the container, with the glow behind the media column and dark background beyond it. Nampally cards are 413px tall (the width cap), so the sign is whole.
- 390x844 s1: copy and both buttons in the top half. In the strip the doctor stands right of centre on the red glow; the "Since 1994" card is in the strip's top-left corner, about 20px clear of the face.
- 390x844 s2: as P1, an empty dark band (now with the glow coming up from below) above the two offset cards; the Nampally sign is whole.
- 390x844 s3: the cutting with its caption band, broadcast and awards plates beside it.
- 360x740 s1 to s3: as 390, tighter. The site's floating call button (not part of the hero) covers the bottom-right corner of the strip: the end of the Nampally caption on s2 and of "Awards and certificates" on s3. P1 already noted this. The Nampally address wraps to three lines.
- Pattern behind the headline: not visible in any screenshot. The diff check above confirms it.

Motion check (`motion.mjs`): at 1366, running animations are heroBreathe, heroDrift and the dot fill, and `will-change` is set only on those two layers. At 390 only the dot fill runs. Under reduced motion nothing runs, there is no zoom and autoplay is off. `backdrop-filter` is on the two glass cards only (the call card is `display: none` on phones). Autoplay still advances after 7s. The P1 behaviour script (`.audit/hero-behaviour.mjs`) passes: arrow keys, focus pause, swipe, 2 of 3 slides inert, both actions on every slide, no counters, mobile bar hidden while the hero button is visible.

Lighthouse (mobile, Lighthouse 12.8.2 via `npx`, `next start`, performance only):
- P1, first baseline (five runs, at the start of the session): 63 / 47 / 58 / 47 / 62, median 58. LCP 5.1 to 5.5s, TBT 400 to 1,000ms.
- During the session the machine slowed down: on the unchanged P1 build, script evaluation went from about 1.0s to 2.5s. So later runs cannot be compared with that baseline. For a fair comparison I built P1 in a temporary copy (deleted afterwards) and ran P1 and P1b alternately, six runs each:
  - Final P1b: P1 41 / 41 / 36 / 40 / 39 / 40 (median 40, mean 39.5) vs P1b 34 / 37 / 36 / 40 / 39 / 42 (median 38, mean 38.0). A drop of 2 points (median) or 1.5 (mean), inside the 3-point limit.
  - The earlier P1b with the grain layer: P1 median 41.5 vs P1b median 38 (mean 41.2 vs 37.8), a drop of 3.4 to 3.5. That was over the limit, so I removed the grain.
- Found while measuring: with the pattern as a CSS `background-image`, Lighthouse picked the 2,000px pattern layer as the LCP element (LCP 5.4 to 6.2s). The tile is now used as a luminance `mask-image` over an ivory fill (same look), and LCP is the portrait again, as in P1. Browsers without `mask-mode` get no pattern.
- CLS 0.004 to 0.006 (P1: 0.005). Page weight 820 KiB (P1: 818).
- JSON: `.audit/hero-p1b/lh-before-*.json`, `lh-after-*.json`, `lh-ab-*.json`, `lh-ab2-*.json` (ab2 is the final pair).

Build and lint: `npm run build` passes. `npx tsc --noEmit` is clean. `eslint` on `Hero.tsx` and `site-data.ts` is clean. `npm run lint` exits 1 with 17 errors and 9 warnings, the same list as after P10 (navigation, consent, treatment pages, `_tmp_qa.js`), none in the files changed here.

Viewports checked: 360x740, 390x844, 1366x650, 1440x900, 1920x1080 (screenshots, fit, contrast, pattern); 768x1024 and 1536x730 by the audit only.

Unsure, or needs a decision:
- Portrait halo: the cut-out has a faint light rim around the top of the head, and it is in the source PNG. On the stronger red it showed as a pale outline, so I lowered the spotlight peak (0.34 -> 0.26) and moved its centre down to shoulder height. The rim is now faint but still there; only a cleaner cut-out removes it.
- A small gold mark on the jacket's left lapel (viewer's left, below the "Since 1994" card on desktop) looks like a cut-out artifact. It is in the source image, which I did not edit.
- "Head 28 to 32% down" is read as the centre of the head at 30%. The top of the head is about 8% down the media, which removes the dead space. If you meant the top of the head at 30%, the portrait would sit lower and the dead space would come back.
- The click-to-call card is hidden at 767px and below. On phones the hero's own "Call for Consultation" button is about 80px above the strip, and at 360px the site's floating call button sits where the card would go. Tablet and desktop show it.
- The pattern follows the spec (0.08 desktop, 0.05 phones) and is very faint: 1 to 4 levels of difference. If it should read as texture, it needs about 0.14 to 0.18, which is outside the brief.
- Grain: tried at 0.035 and dropped because it cost Lighthouse points (see above). I saw no banding without it in the screenshots.
- The photo zoom on slides 2 and 3 still runs on phones. E only disables drift and breathing at 767px and below; G says "no animation" for the layers. Tell me if the zoom should stop on phones too.
- The photo plates use the same 0.35rem radius as the glass cards (P1 photos had square corners), so the hero's cards match.
- On phones the dots row is pulled 16px left (26px on larger screens), so the first track sits 10px right of the copy edge. Pulling it further would push the first dot's hit area off screen.
- `<Reveal>` is still used for the headline masks only. Portrait, cards and plates animate with hero CSS keyed to `.hero-slide-active`, for the reason given in P1 (Reveal does not animate content already on screen at mount) and so that they replay on every slide change.

Owner inputs still missing: as in P10 (Part 8). Nothing new.

## S0 Content preservation check, diff report and ledger  (30 Oct 2026)

Files changed (no file under `app/`, `components/` or `lib/` was touched):
- `scripts/seo-content-audit.mjs` (new). The Part 14.3 check: Playwright with `javaScriptEnabled: false`, routes from `/sitemap.xml` of both builds plus `/` (falls back to `app/sitemap.ts`), per-route extraction, sentence comparison with the 0.85 token-overlap rule, and a JavaScript-on reload of the current home page. Needs `BASELINE_URL` and `CURRENT_URL`. Writes `.audit/seo/{baseline,current,diff,js-check}.json` and `summary.md`. Exits 1 if any "removed" row has no owner decision, and 2 if a route cannot be loaded. It reads decisions from the last column of `SEO_CONTENT_DIFF.md` or from `docs/home-redesign/seo-ledger-decisions.json`. No new dependencies.
- `docs/home-redesign/SEO_CONTENT_DIFF.md` (new). Sections (a) to (g), the JavaScript-only check and an appendix of kept home rows. A one-off generator (`.audit/seo/build-report.cjs`, gitignored) produced it from the audit JSON and the S0 destination proposals. The audit script does not overwrite the report, so owner decisions written into it are safe.
- This entry.

Summary of changes:
- Baseline: `0e621788200af61b202380e242258634cb036a33` ("final commit", 28 Oct 2026). `git diff --stat 0e62178` shows the redesign: 27 tracked files changed, 10,244 insertions, 13,126 deletions, plus the untracked `components/motion/` and new images.
- Baseline build: `git worktree add --detach E:\neodent-baseline-wt 0e62178`, `.env*` copied (not printed), `npm ci`, `next build` (27 pages), `next start -p 3100`.
- Current build: the app folder copied without `node_modules`, `.next`, `.audit` and `.git` to `E:\neodent-snapshot` at 2026-10-30 13:55:06 +05:30, then `npm ci`, `next build` (27 pages), `next start -p 3101`. At the end of the run, the working tree's `git diff 0e62178 -- app components lib` had the same hash as at snapshot time, and no file under those folders was newer than 13:55. So the snapshot equals the working tree as of this entry. The owner's dev server on :3000 was not touched.
- Routes covered (17, the same on both sides): /, /about, /clinic, /clinic/mehdipatnam, /clinic/nampally, /contact, /doctors, /doctors/dr-miftah-ur-rahman, /privacy-policy, /treatments and the seven treatment pages.
- Totals (text, headings, links and alt texts; all routes): kept 3,958, shortened 58, removed 54. Home page only: kept 168, shortened 57, removed 50, of which 18 changed rows are hero rows ("hero pass: no restoration in the S-series"). JSON-LD: 989 of 989 field/value pairs kept, all 80 blocks parse.
- The ledger has 112 rows, each with a proposed destination: Visible 24, Disclosure 13, Internal page with link 11, Intentional drop 46 (numbering labels, placeholders, rewordings, labels of removed media), hero 18. FAQ 0: the FAQ is built in S5 from facts, not from these rows. The "Owner decision" column is empty.
- Internal pages: text changed on all 16, but only through shared files. Every page has the footer line ("1994" plus "Changing smiles since decades." became "Changing smiles since 1994.", `Footer.tsx`). /about lost the old consultation block copy through `components/sections/ContactNextStep.tsx`, which is not in the R10 list. The two location pages gained Dr. Hafsa Taha and a founder-profile link (`lib/clinical-team.ts`). Nothing else was lost on internal pages.
- JavaScript check: no home section content depends on JavaScript. The only text that appears with JavaScript on is the cookie banner, the `LeadCapture` dialog, the Turnstile label, the live "Open now" chip, the reviews' "Read more" button and `CountUp` frames caught mid-animation.
- Interpretation of 14.3, stated in the report: a partial match counts only if the matched current sentence is of similar size (Dice >= 0.3). Without that, short labels such as "Multi-speciality clinic" were marked kept or shortened because their words appeared somewhere in a long paragraph. Text found on at least 80% of routes (navigation, footer, consent) is compared once, as route `*`.

Audit (before -> after): not applicable. No site code changed, so the viewport audit was not rerun; P1b's numbers stand. I did not run it against the snapshot because `home-viewport-audit.mjs` clears `.audit/home/`, which holds earlier runs' screenshots.

Viewports checked: 1366 x 900 only, for both the JavaScript-off extraction and the JavaScript-on check. The content check is not viewport-based.

Content preservation (home and internal pages): removed 54 / restored 0 / relocated 0 / dropped 0. S0 is read-only: all 112 shortened or removed rows wait for S1 decisions.
SEO audit (before -> after): routes with text changes 0 -> 17 (15 of them only the footer line) / headings lost 3 (home: "Where Neodent is." (hero) and "Let's make your next step feel simple."; /about: the same consultation heading) / links lost 1 (home `#contact` "Explore your visit"; 5 more kept their href with a new anchor) / alt texts lost 0 (7 shortened or replaced) / JSON-LD blocks changed 0 (80 -> 80, all parse, `foundingDate` 1994 present).

Open issues or follow-ups:
- Add `components/sections/ContactNextStep.tsx` to the R10 shared-file list (it is used on /about).
- `components/motion/CountUp.tsx` puts every stat number in the server HTML three times ("32 32 32", "418 418 418"): a layout ghost, an animated copy and a screen-reader copy. Review in S2 against R2.
- The consultation block on the home page and /about no longer links to `/contact` (ledger rows home-t67b229f1 and about-ta2ea9cc1).
- The `LeadCapture` dialog text exists only with JavaScript, and its hours ("10:00 AM - 08:00 PM") still conflict with site data (P10 open item 4).
- Meta descriptions over 170 characters on /, /about, /clinic, /contact, /doctors/dr-miftah-ur-rahman and /treatments, and titles over 65 characters on /about, /doctors/dr-miftah-ur-rahman and /treatments/smile-design. These predate the redesign; noted only.
- Rerun the check before S2. The hero pass is still changing the working tree, and the current side is a snapshot.
- The baseline worktree and the snapshot folder were removed at the end of the run. To rerun, recreate them as described above, or point `CURRENT_URL` at any production build of the working tree.

Owner inputs still missing: a decision on each ledger row (S1); approval of the inferred keyword list in `SEO_CONTENT_DIFF.md` (f); confirmation of the facts the ledger proposes to restore that appear on no current page (Madina Gold Medal 2023 and who awarded it, Dr. Miftah's quote, the "Smile Designer" title); consultation with Dr. Siraj (home-t83fb7040); plus the P10 items (Part 8).


## S2 Restore per ledger: stat strip, Care begins, seam card, Legacy, Treatments  (30 Oct 2026)

Files changed:
- `components/motion/CountUp.tsx`: the server HTML now holds each number once, as real text. The animated copy is an empty `aria-hidden` span that is filled only while the count runs; during the count the real number stays in place at opacity 0, so the width does not change and screen readers still read it. The old layout ghost and screen-reader copy are gone. This file is shared (R10). Its only users are on the home page: `ExperienceIntro`, `LegacyStory` and `PatientStories` (S3's file, which I did not edit; its numbers now appear once too). `motion.module.css` is unchanged; `.countUpGhost` and `.srOnly` are now unused there.
- `components/sections/ExperienceIntro.tsx`: "Why Neodent" label above the stat strip (the list is now labelled by it), "Multi-speciality clinic" line in the clinics cell, a "Read more about your visit" disclosure under the Care begins paragraphs, and the caption "Inside Neodent: hospital tour" under the tour video.
- `components/sections/LegacyStory.tsx` and `LegacyStory.module.css`: a visible supporting line "Specialist dental care in Hyderabad since 1994." under the h2; the founder paragraph now opens with the "Established in 1994…" and "Founded and led by…" sentences (from `ESTABLISHED_YEAR`, `founder.name`, `founder.experienceYears`); an "About Dr. Siraj" disclosure with his credentials and a visible link to `/about#founder` in the founder card; an h3 "Three decades, on record" above the press row. Still two highlights in the section.
- `components/sections/Expertise.tsx`: the intro now opens with the patient-wording sentence, and every treatment named in it links to its page with its own name as the anchor (seven links, names from `expertise-data.ts` via a small `TreatmentLink` helper); a "Read more about how we plan treatment" disclosure below it. `expertise-data.ts` unchanged.
- `app/globals.css`: new rules next to the sections they style: `.exp-intro-stats-title`, `.exp-intro-stat-note`, `.exp-intro-media-caption`, `.exp-intro-more`, `.treatment-atlas-intro` and its links, and a shared `.home-more` disclosure (native `<details>`, 44 px summary, 14 px bold label, chevron, `--on-dark` variant). Nothing outside these sections was touched.
- `scripts/seo-audit-run.mjs` (new): one command that does what S0 did by hand (baseline worktree for 0e62178 outside the repo, `.env*` copied without printing, build and serve on 3100; snapshot of the working tree, build and serve on 3101; run the audit; stop servers; remove snapshot and worktree; `--keep-baseline` keeps the baseline build). Work folder: `E:\neodent dental delegate\neodent-seo-audit` (outside `ClinicWebsite/`), override with `SEO_AUDIT_WORKDIR`.
- `scripts/seo-content-audit.mjs`: hero rows ("hero pass" note) never count as undecided; the console now lists rows decided visible/disclosure that are not yet kept.
- Not changed: `SeamCard.tsx` (both seam card rows are drops), `lib/site-data.ts` (no legacy data needed changing).

Summary of changes, by ledger id:
- Restored, visible: home-tf0589540 ("Why Neodent"), home-t1b1f4faf ("Multi-speciality clinic"), home-tc1833779 (tour caption, now "Inside Neodent: hospital tour"), home-t4ac9e0c7 ("Established in 1994…"), home-t255cd9f9 ("Founded and led by Dr. Mohd. Siraj Ur Rahman…"), home-tb4c932d1 ("Three decades, on record"), home-t47342fbd (patient-wording treatments sentence).
- Relocated to a disclosure (text in the server HTML): home-te69bb48e, home-t92a38f2e, home-t586fad82 (Care begins "Read more"), home-t92dba0cd (founder credentials, "About Dr. Siraj"), home-tc794eac3 (treatments "Read more").
- Dropped as decided (nothing done): home-t1b776f62, home-td1838316, home-te1260461, home-t8d8b2eef, home-t9cc2981a, home-t6911cacb, home-te3cc1b8a, home-te839b04d, home-t71ca7491, home-t1bbb9b93, home-t38d18d9f, home-t0cdc1309, home-taef86061, home-tbff5c9ec, home-t323be85f, home-td69afa06. home-tbff5c9ec moved from "shortened" to "removed" because the intro now says "dental implants" (the page name) instead of "implants"; it was already decided as a drop. home-t1bbb9b93 ("03 / Record") now shows as "shortened" only because "Record" overlaps the new press-row title.
- Additional directives: CountUp fixed (above); Legacy supporting line added; the seven treatments named and linked in the treatments intro. Hero not touched.
- Hold rows in these sections: none.

Audit, viewport (`home-viewport-audit.mjs` against the dev server on :3000, before -> after; exit 0 both times):

| Viewport | (a) media >70% | (b) overflow | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 4 -> 9 | 2 -> 2 | 14,679 -> 15,378 |
| 390x844 | 0 -> 0 | 0 -> 0 | 4 -> 6 | 2 -> 2 | 14,754 -> 15,407 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 3 -> 8 | 2 -> 2 | 13,359 -> 13,881 |
| 1366x650 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 10,588 -> 11,099 |
| 1536x730 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 10,849 -> 11,360 |
| 1920x1080 | 0 -> 0 | 0 -> 0 | n/a | 3 -> 2 | 11,476 -> 11,953 |

Every new (c) item is one of the treatment links inside the intro paragraph; the audit marks them inline (running-text links are exempt from the 44 px target, like the existing "Privacy Policy" link). The 1920 (d) drop is the cookie banner, not this run. With all disclosures open there is no horizontal overflow at 360, 390 or 768.

Content audit (`node scripts/seo-audit-run.mjs`, before -> after): all routes kept 4,947 -> 4,959, shortened 58 -> 54, removed 54 -> 46. The four S2 sections: kept 67 -> 79, shortened 15 -> 11, removed 13 -> 5 (the 5 are all decided drops). All 13 S2 restore rows are now "kept"; no row that was kept before is lost. Words (server HTML): Care begins 123 -> 180, Seam card 9 -> 9, Legacy 109 -> 195, Treatments 288 -> 349. Home internal links 41 -> 49 (seven treatment links plus `/about#founder`). No internal page changed. "Removed rows without an owner decision": 0. The 24 rows still listed as "decided visible/disclosure but not yet kept" are all S3 and S4 rows.

JavaScript-disabled check: the restored text, the five disclosures' text and the eight new links are all in the server HTML (`seo-content-audit.mjs` reads with `javaScriptEnabled: false`; also checked in the dev server HTML). No stat number is repeated in the server HTML any more. The JavaScript-only list is the same kinds as in S0 (cookie banner, LeadCapture pop-up, Turnstile label, Open-now chip) plus CountUp frames caught mid-count ("32 0 years of care"); the final numbers are in the server HTML.

Viewports checked (screenshots `.audit/home/<viewport>/` and `.audit/s2-*.png`):
- 1366x650: "WHY NEODENT" sits small and uppercase above the strip; "Multi-speciality clinic" is a bold second line in the clinics cell. "Read more about your visit" with a chevron sits under the two Care begins paragraphs, above the dark Calm / Precise / Personal card. The caption sits under the tour video. Legacy: the plain line under the headline, "About Dr. Siraj" and the underlined profile link at the bottom of the founder card, the longer founder paragraph below it, and "Three decades, on record" above the press row. Treatments: the intro column is longer (about 13 lines); the seven treatment names are underlined in ivory, then the "Read more" line.
- 768x1024, 390x844, 360x740: everything stacks in one column; the strip stays 2 x 2 with the multi-speciality line wrapping inside its cell; the founder card's disclosure and link wrap cleanly; with "About Dr. Siraj" open the paragraph sits inside the card. The treatments intro runs to about 18 lines at 360. The LeadCapture pop-up opens over the page during these screenshots, as before.

Content preservation (home and internal pages): removed 0 / restored 7 / relocated 5 / dropped 16 (as decided in S1: numbering labels, duplicates, rewordings, a vague quote and labels of removed media).
SEO audit (before -> after): routes with text changes 17 -> 17 (only `/` changed in this run) / headings lost 3 -> 3 (none in S2 sections; one h3 added) / links lost 1 -> 1 (8 links added) / alt texts lost 0 -> 0 / JSON-LD blocks changed 0 (80 blocks, all parse).

Open issues or follow-ups:
- Mobile length at 360 rose by about 700 px to 15,378 px against the 12,000 px budget (Part 15.2: SEO wins, overage reported). Most of it is the longer founder paragraph and the treatments intro, which the ledger asked to keep visible.
- The treatments intro is now about 95 words in one paragraph. If it reads as too long, the "Each concern is met…" sentence (current text, not a ledger row) could move into the disclosure; that needs your say-so.
- `motion.module.css` still has the unused `.countUpGhost` and `.srOnly` rules; S2 was not allowed to edit that file.
- `npm run build` was run on the snapshot copy (inside `seo-audit-run.mjs`), not in the working tree, so the owner's dev server and the hero work were not disturbed. It passed, including TypeScript. `eslint` on the four changed components is clean.

Owner inputs still missing: none for S2. S3 and S4 rows are next.



## S3 Restore per ledger: Doctors, Patient stories  (30 Oct 2026)

Files changed:
- `components/sections/ClinicalLeadership.tsx` and `ClinicalLeadership.module.css`:
  - A plain supporting line under the h2.
  - Dr. Miftah's card gets a "Practising at" line.
  - The baseline alt text is back on the "at work" photo.
  - One "About Dr. Miftah" disclosure (native `<details>`, the shared `.home-more` style from S2) inside the "Dr. Miftah at work" band. It ends with a link to his profile.
  - Two layout fixes, described under "Summary of changes".
- `lib/clinical-team.ts`, home-only text:
  - Dr. Siraj's `role` is now "Professor · Director, Neodent · 30+ years".
  - Dr. Miftah's `role` is now "Assistant Director, Neodent Dental Hospitals".
  - Dr. Miftah's Specialism value is now "Prosthodontist & Implantologist · Smile Designer".
  - New Experience row for Dr. Miftah: "15+ years of clinical experience".
  - New optional text field `practising`, used only by the home card.
  - `detailLines`, `href`, `image`, `crop` and the order are unchanged. The branch roster reads only `nameLines`, `detailLines` and `href`, so it is unaffected (checked below).
- `components/sections/PatientStories.tsx` and `PatientStories.module.css`: the baseline lede under the h2. `CountUp` was not edited.
- This entry. Probe scripts and screenshots are in `.audit/s3/` (gitignored).

Summary of changes, by ledger id (48 S3 rows; none are hold or undecided):
- **Restored, visible (8):**
  - home-t64b58b74: role "Assistant Director, Neodent Dental Hospitals".
  - home-ta3f6e809: "15+ years of clinical experience" (Experience row).
  - home-tf3c55924: "Prosthodontist & Implantologist · Smile Designer". "(expert in smile design)" is dropped as instructed.
  - home-te4adeac9 and home-t45e6d058: one line, "Practising at Mehdipatnam & Nampally, Hyderabad", under his name.
  - home-t60d6bbcd: the founder card's role line, "Professor · Director, Neodent · 30+ years". It replaces "Founder and Director", a P5 label that was not in the baseline. The degrees stay in the Qualifications row.
  - home-a0ae50c15: the baseline alt text is restored verbatim ("…, Prosthodontist and Implantologist, standing beside the dental chair … Neodent Dental Hospital, Hyderabad, …").
  - home-te2b25f9f: "Real experiences from patients who trusted Neodent with their care." under the Patient stories h2.
- **Relocated to the "About Dr. Miftah" disclosure (8), in the old order:**
  - home-t1df51668, home-t61216309, home-t62b46073, home-t2c0a991e, home-tfea37852, home-t305f1122 (bio paragraphs).
  - home-t294609a7: a "Recognition" row with "University Gold Medalist · Madina Gold Medal (2023), awarded by Commissioner A. K. Khan", verbatim.
  - home-t7b639691: the quote, now exactly "Save the natural teeth till the last stage." (owner wording).
  - The disclosure ends with the link "Full profile of Dr. Md. Miftah Ur Rahman". The visible paragraph above it and the visible link "See his work and profile" are unchanged.
- **Link (10): the visible links to `/doctors/dr-miftah-ur-rahman` are kept** (the card's "View profile", the band's "See his work and profile", and the new link inside the disclosure). What the profile page has (JS disabled, `.audit/s3/profile-check.mjs` and `profile-heads.mjs`):
  - Equivalent text present:
    - home-t1abdd620 and home-t79826e4a: the SB Patil teaching sentence (token overlap 0.80 and 0.83).
    - home-t2d88a0e6: "centres on restoring what can be saved and rebuilding what cannot — implants, full-mouth rehabilitation…" (0.78).
    - home-t6b81f467: "practising across both the Mehdipatnam and Nampally clinics" (0.69).
    - home-t4c3119e1: "Recognition earned over time", "Formal recognition", and the award photo.
    - home-aefa38c46 and home-aeb59c31a: both alt texts, verbatim (1.00).
  - **Partial, reported:**
    - home-t38e01a3e: the four category words appear on the page ("Clinical practice", "Recognition", "Teaching", "Academic post"), but the label "Portfolio / Professional moments" is not there.
    - home-t176cb535: the meaning is there ("an academic base — formal specialist training, published research and ongoing teaching"), but the words "Institutional" and "professional development" are not.
    - home-t6bf18012: the profile page has an "In Practice" section with three clinical films ("Clinical films", "Treatment in practice"). The old home profile film (`Dr. Miftah Neodent dental clinic Hyderabad - treatment video.mp4`) is not on that page or on any other current page. It is referenced only by the unused `components/sections/Doctor.tsx`.
- **Dropped as decided (22, nothing done):**
  - Doctors: home-ta1c97207, home-t963d296a, home-tc65aff0a, home-l25b71063, home-a127144fd, home-aafa2ad2b, home-t050887bf, home-t188d45da, home-t8eb49d17, home-t0de1f858, home-t7b58e820, home-t73922a2b, home-t9c0fb95f, home-t4942d7c0, home-t817c49d2, home-tf8cf24ad, home-t42c4bb33, home-t0e35fc7a.
  - Patient stories: home-t0c5f4b80, home-tf9a8adc0, home-tb6f69806, home-tc73c865f.
- **Additional directives:**
  - Doctors supporting line, exactly as written: "Dentists and specialists at Neodent Dental Hospital, Mehdipatnam and Nampally, Hyderabad." It is a 16 px semibold line under the h2 and is not numbered.
  - Dr. Muti is still "MBBS (OSM) · MD (Gen. Med.)". "dental specialist" appears on 0 of 17 routes.
  - No restored text says a doctor sees only certain cases. Searching `#leadership` for "only sees", "only handles", "only treats" and "refer to Dr" finds 0 matches.
  - The "may have changed since" note still sits next to the ratings.
- **CountUp, server HTML of `#stories`:** 4.3 ×1, 4.6 ×1, 418 ×1 (also 261 ×1, 157 ×1).
- **Highlights:** none added (Doctors 0, Patient stories 0).
- **Layout fixes:**
  - At ≥1024 px the two leader cards share a row height, and Dr. Miftah's card is now taller. The shorter Siraj card now centres its portrait and text instead of leaving a gap at the bottom (this gap was already visible before this run). Its content fills 67% of the card height (Part 3.3 asks for at least 65%).
  - At ≥768 px the "at work" band is top-aligned, so the photo stays next to the heading when the disclosure is open.
- **"Smile Designer" uses (owner limit: 1 to 2 on the site):**
  - On the site: **1**, the home Doctors card. It is rendered from `lib/clinical-team.ts`, which has the value on line 126 and a comment about the limit on line 124.
  - Rendered HTML of all 17 routes (production build of this tree, and the dev server): home ×1, every other route ×0.
  - Other repo hits are not site content: 5 places in `docs/home-redesign/` (ledger and reference records), and old audit JSON and logs in `.audit/`.
- **"even if they are mobile":**
  - Rendered HTML of all 17 routes: **0** on the production build of this tree, and 0 on the dev server on :3000.
  - Source (`app/`, `components/`, `lib/`, `public/`, `scripts/`): **0**.
  - Remaining hits: 3 docs files that record the owner's decision (`SEO_LEDGER_DECISIONS.md`, `seo-ledger-decisions.json`, `SEO_CONTENT_DIFF.md`), 13 old audit files in `.audit/`, and 20 stale Turbopack cache chunks in `.next/dev/` from 28 Oct. `next dev` regenerates those chunks, and the served pages do not contain the phrase.

Audit, viewport (`home-viewport-audit.mjs` against the dev server on :3000, before -> after; exit 0 both times):

| Viewport | (a) media >70% | (b) overflow | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 9 -> 8 | 2 -> 2 | 15,378 -> 15,715 |
| 390x844 | 0 -> 0 | 0 -> 0 | 6 -> 7 | 2 -> 2 | 15,401 -> 15,711 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 11 -> 8 | 3 -> 2 | 13,881 -> 14,138 |
| 1366x650 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 11,099 -> 11,359 |
| 1536x730 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 11,360 -> 11,630 |
| 1920x1080 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 11,953 -> 12,223 |

- None of the (c) or (d) findings are in `#leadership` or `#stories`, before or after. The rest are the nav, the cookie banner and the inline treatment links from S2, and their counts vary with the cookie banner.
- **Mobile page height with all disclosures collapsed (360 px): 15,715 px.** That is +337 px in this run and 3,715 px over the 12,000 px budget (Part 15.2: SEO wins, overage reported).
- `#leadership` at 360 px is 2,557 px with the disclosure closed and 3,672 px with it open. `#stories` at 360 px is 735 px with the lede.
- With the disclosure open there is no horizontal overflow at any size, and the text in both sections is at least 12 px.
- The "at work" photo is 181 px (24% of the viewport height) at 360 px and 230 px (35%) at 1366x650.

Audit, content (`seo-content-audit.mjs`, baseline 0e62178 vs a snapshot of this working tree, before -> after):
- All routes: kept 4,959 -> 4,974, shortened 54 -> 48, removed 46 -> 37. "Removed rows without an owner decision": 0. Exit 0.
- S3 visible and disclosure rows: 13 of 16 are now "kept". The other 3 differ from the old text on purpose:
  - home-tf3c55924 is shortened (0.55) because "(expert in smile design)" was dropped as instructed.
  - home-t7b639691 is shortened (0.44) because the owner's new quote wording replaces the old one.
  - home-t60d6bbcd is shortened (0.55) because the old text was one block holding the degrees and the role line. The ledger asked for the role line on the card, and the degrees already sit in the Qualifications row. Both parts are on the card verbatim, but the audit compares single blocks.
- Link rows: the alt home-aeb59c31a moved from "shortened (0.40)" to "removed (0.40)". It used to partly match the old shorter "at work" alt. It is a decided link row, and its alt is on the profile page verbatim.
- Words in the server HTML: Doctors 184 -> 410 (194 of them inside the disclosure), Patient stories 269 -> 279. Home internal links 49 -> 50.
- All 16 internal pages are identical before and after: text, headings, links, alts and JSON-LD.

JavaScript-disabled check: all of the restored text, the closed `<details>` content, the new link and the restored alt are in the server HTML of `/` (`.audit/s3/html-checks*.mjs` against the production build).

Internal pages:
- `/clinic/mehdipatnam`, `/clinic/nampally`, `/about` and `/doctors/dr-miftah-ur-rahman` return 200 and render with no console errors.
- Both branch rosters show the same seven doctors and the same lines as before this run (the S0 state, including Dr. Hafsa Taha and Dr. Siraj's profile link).

Viewports checked (`.audit/s3/shots/`):
- **1366x650:** The headline sits on the left with the plain supporting line beneath it, and the existing lede sits on the right. The two leader cards sit side by side. Dr. Miftah's card shows the role, the "Practising at" line, and rows for Qualifications, Specialism (with "· Smile Designer"), Experience and Post. The Siraj card is centred in the shared row height. In the "at work" band, "About Dr. Miftah" with a chevron sits under a hairline below "See his work and profile". When it is open, it shows four paragraphs, a ruled Recognition row, the serif quote with a red left rule, and the profile link. Patient stories: the lede sits under the two-line h2, and the rating chips and the note stay on the right.
- **768x1024:** The leader cards stack, with the portrait on the left and the label/value rows on the right. The band keeps the photo top-left and the text on the right. When open, the text runs down the right column with the photo at the top.
- **390x844 and 360x740:** Everything is in one column. Each leader card has a compact portrait beside the role and name, and the facts sit below. The "Practising at" line wraps to three short lines next to the portrait. The disclosure summary is a 44 px row. Patient stories: the lede wraps to two lines above the two rating chips.

Content preservation (home and internal pages): removed 0 / restored 8 / relocated 8 / dropped 22 (as decided in S1: numbering and roman numerals, placeholder text, replaced labels and photos, theme-selector labels, a button with no destination). In addition, 10 link rows are covered by the profile page: 7 fully and 3 partially, listed above.
SEO audit (before -> after): routes with text changes 17 -> 17 (only `/` changed in this run) / headings lost 3 -> 3 (none in S3 sections) / links lost 1 -> 1 (1 link added) / alt texts lost 0 -> 1 (home-aeb59c31a, a link row; its alt is verbatim on the profile page) / JSON-LD blocks changed 0 (home 4 blocks, all parse; internal pages unchanged).

Other checks:
- `npm run build` passes on the snapshot copy (compiled, TypeScript finished, 27/27 pages). The owner's working tree, the dev server on :3000 and the hero agent's server on :3100 were not touched.
- `tsc --noEmit` is clean. `eslint` is clean on the three changed TS/TSX files.

Method note: `scripts/seo-audit-run.mjs` hard-codes port 3100, and the hero P1c agent's server (`neodent-hero-p1c`) was using that port. So I ran the same steps by hand on ports 3210 (baseline), 3211 (before) and 3212 (after), in the script's work folder outside the repo. The script itself was not edited because it is not in this run's file list. The worktree and snapshots have been removed.

Open issues or follow-ups:
- **Dangling reference in the disclosure.** The ledger dropped home-tc65aff0a ("Alongside clinical dentistry he teaches as an Assistant Professor at SB Patil…") as a duplicate of the card's Post row. The next restored sentence, home-t2c0a991e, opens with "That academic involvement…", which now has nothing to refer back to in the paragraph. Changing home-tc65aff0a to `disclosure` would fix this with the original wording.
- home-t62b46073 says "Much of that work is reconstructive rather than routine". It is restored verbatim. It does not say he only sees these cases, but please confirm it reads correctly under the "All runs" directive 1.
- The old home profile film is on no current page (home-t6bf18012). Either add it to the profile's "In Practice" section, or treat the row as a drop.
- The profile page lacks the exact labels "Portfolio / Professional moments" and "Academic / Institutional … professional development" (home-t38e01a3e, home-t176cb535). Their meaning is covered.
- `seo-audit-run.mjs` could take the ports from environment variables, so it can run while another agent holds 3100. That needs a run that may edit `scripts/`.
- Mobile length is 15,715 px against the 12,000 px budget.

Owner inputs still missing: none for S3. The decisions above (home-tc65aff0a, the film row) are optional refinements.

## S3b Doctors follow-up: restored sentence, ledger, safe audit runner  (30 Oct 2026)

Ledger changes (owner decisions, 30 Oct 2026; `SEO_LEDGER_DECISIONS.md` and `seo-ledger-decisions.json`):
- home-tc65aff0a: drop -> disclosure. It is restored verbatim in the "About Dr. Miftah" disclosure, between home-t62b46073 and home-t2c0a991e, so "That academic involvement…" has its antecedent.
- home-t6bf18012: link -> drop. The old home profile film is on no page of the site.
- Accepted partial matches noted next to the S3 table: home-t38e01a3e and home-t176cb535 stay as `link`. (The brief named home-t1abdd620 here. The words "Institutional" and "professional development" belong to home-t176cb535, as S3 reported, and home-t1abdd620 was a full match. The note uses home-t176cb535.)
- Totals: visible 23, disclosure 14, link 9, drop 48, hold 0, hero-pass 18 (112). The JSON counts match.

Restored sentence (`components/sections/ClinicalLeadership.tsx`, "About Dr. Miftah" disclosure, at the start of the third paragraph, directly before "That academic involvement…"):
"Alongside clinical dentistry he teaches as an Assistant Professor at SB Patil Dental College & Hospital, in the Department of Prosthodontics."
Nothing else in the section changed. "Much of that work is reconstructive rather than routine…" stays as it is (accepted by the owner).

Runner change (`scripts/seo-audit-run.mjs`):
- It reads BASELINE_PORT and CURRENT_PORT from the environment (defaults 3100 and 3101). It rejects equal ports and 3000/3001.
- It checks that each port is free twice: before building, and again right before each `next start`. If a port is busy, it stops with one line naming the port and the variable to change, and exits 2.
- It only uses a server it started itself, which must serve this run's BUILD_ID.
- It stops servers and removes the snapshot and worktree on every exit path: success, failure, Ctrl+C/SIGTERM and uncaught errors.
- It prints the ports at the start and in the final exit line.

Checks run:
- Busy-port refusal: a listener held 3212, then `BASELINE_PORT=3210 CURRENT_PORT=3212 node scripts/seo-audit-run.mjs` printed "Port 3212 is in use; set CURRENT_PORT to a free port and retry." and exited 2 before building anything.
- The ledger JSON counts were checked by script.

Not run in S3b (the owner asked for a fast finish): the full audit run on 3210/3211, the JS-disabled HTML check, the viewport audit and `npm run build`. They are still needed before relying on S3b:
`$env:BASELINE_PORT='3210'; $env:CURRENT_PORT='3211'; node scripts/seo-audit-run.mjs`

Open: `E:\neodent dental delegate\neodent-seo-audit\` still holds a `baseline-wt` worktree and a `snapshot` folder dated 30 Oct 18:02, left by an earlier interrupted run. They were not removed. `git worktree remove --force` on that path and deleting `snapshot` will clear them. A normal runner run also replaces them.


## P1c Hero polish: visible pattern, stronger glow, larger media  (30 Oct 2026)

Note on how this run started: an earlier P1c session had already changed the four hero files (glow, media size, portrait scale, card positions, mobile call button, portrait constant) and stopped during Lighthouse, without a changelog entry. Its starting point was saved in `.audit/hero-p1c/before-src/` (P1b `Hero.tsx`, `site-data.ts` and `Home.tsx` match `.audit/hero-p1b/*.after.*` byte for byte). This run checked that work against the brief, rebuilt the pattern layer, fixed an LCP regression it caused, and did all the measuring. "Before" below means that saved P1b state, built in a copy outside the repo (`E:\neodent dental delegate\_p1b_snapshot`) and served on :3100. "After" means the working tree, built with `npm run build` and served on :3102.

Files changed (all uncommitted):
- `components/hero/Hero.tsx`: the portrait reads `heroPortraitImage`. Portrait `sizes` changed to `(max-width: 767px) 104vw, (max-width: 1023px) 66vw, 700px` to match the larger figure, and branch photo `sizes` changed to `400px` on desktop. A hidden inline `<svg>` with an `feColorMatrix` alpha filter (`#hero-pattern-levels`) now sits inside the `aria-hidden` backdrop, and each pattern layer has a child `span.hero-bg-tile`.
- `app/globals.css`: hero block only. The diff against `before-src/globals.css.bak` touches lines 679 to 1942, all inside the hero block, which includes the floating call button rule scoped to `body:has(#home)`.
- `lib/site-data.ts`: new `heroPortraitImage`, which points at the same file as before and is kept separate from `recognitionImage` because other sections use that. Nampally focal point `41% 50%` -> `42% 50%`. Siasat `sizes` `260px` -> `300px`.
- `components/Home.tsx`: an IntersectionObserver on `#home` sets `html[data-hero-in-view]` for the floating call button rule.
- No new images, no new dependencies. The portrait file is untouched.

What changed, by brief item:
- **A. Pattern.** P1b used the tile as a plain luminance mask. The tile's dark ground is not black (luminance about 33 of 255) and its lines peak at about 86, so raising opacity mostly lifted the whole area evenly and the icons stayed hard to see. The earlier P1c session's 0.19 still gave only 5 to 8 levels between the lines and the ground. The pattern layer now runs through an alpha filter (`alpha' = 3.5 x alpha - 0.5`). The ground goes to 0 and the lines go to about 0.7, then the layer's opacity scales them: 0.125 on desktop and 0.10 at 767px and below. The mask stays a mask (no `background-image`). The radial fall-off mid stop went from 0.5 to 0.78, because the filter steepens the fall-off. It still reaches 0 before the copy column.
- **B. Glow.** Slides 2 and 3: `rgba(215,25,32,0.33)` at the centre, holding 75% of that at half the radius and 30% at four fifths, then 0. P1b was 0.22 with a faster fall-off. Slide 1 stays at 0.30. Each slide keeps its own `--glow-x` / `--glow-y`: slide 2 is centred on the wider pair, and slide 3 sits lower (57%) with a slightly tighter radius. The bottom-left glow is unchanged (0.12, and 0.10 on phones).
- **C. Media, slides 2 and 3.** The `--hero-media-h` cap on desktop was raised, and the plates were widened to match.
- **D. Slide 1.** The portrait is 13% larger and anchored right, with the head centre 30% down the stage and the bottom fade kept. The "Since 1994" card sits at the upper left beside the head. The call card sits at the lower right below the hands.
- **E. Mobile.** No photo zoom at 767px and below. The floating call button is hidden while any part of the hero is on screen (and before the observer has run, so it does not flash on load), then shown after scrolling past. The call card stays hidden at 767px and below.
- **F. Pause button.** 44 x 44, in line with the dots.

Measurements (`.audit/hero-p1c/check.mjs`; before = `before/check.json`, after = `after/check.json`):

Pattern, pattern on vs off. "Ring" means a 56px band above, below and right of the media cluster, with the plates excluded. "Copy" means the box around the headline, supporting line and buttons. Values are the largest pixel difference, with p99 in brackets:

| Viewport | Ring before | Ring after | Copy before | Copy after |
|---|---|---|---|---|
| 360x740 | 3 (1-2) | 11-13 (7) | 0-1 | 0 |
| 390x844 | 3 (1) | 12-13 (7) | 0-1 | 0 |
| 1366x650 | 4-5 (2) | 16 (6-7) | 0 | 0 |
| 1440x900 | 4-5 (2-3) | 15-17 (6-7) | 0 | 0 |
| 1920x1080 | 4-5 (2-3) | 15-16 (6-7) | 0 | 0 |

Behind the headline, supporting line and buttons the difference is 0 on every slide at every size. P1b had a 1-level difference there on slide 1 at 360 and 390. The ground between the icons is now 0 too (ring p95 0 to 2), which is why the icons read as lines.

Media cluster height as a share of the hero, before -> after:
- 1366x650: s2 59.1% -> 64.0%, s3 59.1% -> 64.0% (338 -> 366px).
- 1440x900: s2 54.6% -> 64.0%, s3 56.9% -> 64.0% (449 / 468 -> 526px).
- 1920x1080: s2 44.1% -> 62.3%, s3 51.9% -> 64.0% (442 / 520 -> 624 / 641px).
- `--media-max-h` is not exceeded, and the viewport audit has 0 media failures.

Hero fit: 1366x650 572 / 572, 1440x900 822 / 822, 1920x1080 1002 / 1002 on all three slides. At 390x844 the hero is 790px (unchanged) with the primary button bottom at 386 / 289 / 289. At 360x740 it is 753px (unchanged, 13px taller than the screen as in P1b) with the button bottom at 382 / 306 / 284. Overflow is 0 everywhere.

Slide 1 portrait: the figure width went 603 -> 681px at 1366, 602 -> 681 at 1440, 594 -> 671 at 1920, 328 -> 371 at 360 and 358 -> 405 at 390 (+13% everywhere). The head centre is 30% down the stage at every size.

Cards vs the portrait. These are measured from renders of the portrait alone on black and on white, so only visible figure pixels count:
- P1b: at 1440 the call card covered 94% of its width over the figure, including 6,634 visible hand pixels, and the "Since 1994" card overlapped the figure by 38.5% of its width. At 1920 the call card covered 4,265 visible hand pixels.
- P1c: both cards have 0% width overlap with the visible figure and 0 visible face, hand or microphone pixels under them, at 360, 390, 1366, 1440 and 1920. The call card is hidden at 360 and 390.

Controls: the pause button is 44 x 44 at every size and starts where the last dot's hit area ends (at 360: dots end at x 158, pause at x 158 to 202), so the two do not overlap.

Floating call button (phones): P1b was visible at the top of the page, over the strip. P1c is hidden at the top, visible after scrolling past the hero, and hidden again back at the top (360 and 390). At 1366 and up it is unchanged.

Motion (`motion-after.txt`): at 1366 the glow breathing, pattern drift and dot fill run, `will-change` is only on those two layers, and the photo zoom reaches `scale(1.023)` after 8s. At 390 only the dot fill runs and the photo transform is `matrix(1, 0, 0, 1, 0, 0)`. Under reduced motion nothing runs and autoplay is off.

Contrast (`contrast-after.txt`, 15 slide x viewport combinations): ivory headline at least 16.1:1, supporting line at least 8.86:1, red accent 3.35 to 3.45:1 (large text, 3:1 rule). These are the same as P1b; the colour token is unchanged.

Viewport audit (`node scripts/home-viewport-audit.mjs`, exit 0 before and after; `audit-before-report.json`, `audit-after-report.json`):

| Viewport | (a) media >70% | (b) overflow px | (c) taps <44 | (d) text <12px | (e) page height |
|---|---|---|---|---|---|
| 360x740 | 0 -> 0 | 0 -> 0 | 9 -> 9 | 2 -> 2 | 15,721 -> 15,721 |
| 390x844 | 0 -> 0 | 0 -> 0 | 7 -> 7 | 2 -> 2 | 15,717 -> 15,717 |
| 768x1024 | 0 -> 0 | 0 -> 0 | 8 -> 8 | 2 -> 2 | 14,138 -> 14,144 |
| 1366x650 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 11,359 -> 11,365 |
| 1536x730 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 11,630 -> 11,636 |
| 1920x1080 | 0 -> 0 | 0 -> 0 | n/a | 2 -> 2 | 12,223 -> 12,223 |

No finding is in `section#home`. The 6px page-height difference is not in the hero or any section: a separate probe after scrolling the page gave identical heights for every section, hero included (`sections.mjs`), so it looks like load-time variation in the audit.

Lighthouse (mobile, Lighthouse 12.8.2, production `next start` builds, performance only, alternating P1b/P1c, `.audit/hero-p1c/lh.mjs`):
- **Final (`lh-p1b-*.json`, `lh-p1c-*.json`):** P1b 45 / 48 / 42 / 40 / 43 / 50, median 44 (mean 44.7). P1c 45 / 41 / 44 / 44 / 38 / 39, median 42.5 (mean 41.8). That is a drop of 1.5 points at the median, inside the 3-point limit. The mean drops 2.9. LCP median 5.65s -> 5.94s, TBT median 1,127 -> 1,318ms, CLS 0.005 -> 0. **The LCP element is `img.hero-founder-portrait` in all 12 runs.**
- **Regression found and fixed on the way.** With the tile mask alone on an element (first as `::before`, then as a child span), Lighthouse reported that element as the LCP element in all 12 P1c runs (`lh-run1/`, `lh-run2/`). Under throttling the tile paints at about 4 to 4.6s, and its area is about 3.4 times the portrait's. A throttled PerformanceObserver probe (`lcp-probe.mjs`) reproduced this. The probe also showed that the tile is not a candidate when the tile mask and the radial gradient share one mask list on the same element (P1b's form), with or without the filter on the parent. The final CSS uses that form, and a comment in the CSS says to keep the two masks together. Medians in those discarded rounds: 43.5 vs 42.5, then 42 vs 40.5.
- Run-to-run spread on this machine is large (P1b ranged 40 to 50 in the final round), so treat a 1 to 3 point difference as noise-sized.
- The portrait uses `next/image` with `preload` (Next 16 deprecated `priority` in favour of `preload`, per `node_modules/next/dist/docs/.../image.md`). The `<link rel="preload">` for it is in the server HTML. Lighthouse's LCP insight still lists "fetchpriority=high should be applied" as unmet. The Next 16 docs say not to combine `preload` with `fetchPriority`, so I left it.

Content preservation:
- Hero server HTML with JavaScript off, P1b vs P1c (`hero-html.json`): one `h1` on the page, the hero text is identical (707 characters), headings 3 / 3, links 9 / 9, alt texts 6 / 6, nothing lost or added, and JSON-LD blocks 4 / 4.
- `scripts/seo-content-audit.mjs`, baseline `0e62178` (:3104) vs current (:3102), all 17 routes: kept 4,975, shortened 48, removed 36, JSON-LD removed 0. The hero rows (route `/`, `section#home`, not kept) are the same 18 rows as in S0 (`diff-before-S2.json` vs `diff.json`, same kinds and statuses in the same order). These are the P1-era "hero pass" rows; P1c adds none. Removed 0 / restored 0 / relocated 0 / dropped 0 in this run.
- `docs/home-redesign/SEO_CONTENT_DIFF.md` was not rewritten (the script only reads it for decisions). Its pre-run copy is `.audit/hero-p1c/SEO_CONTENT_DIFF.before-p1c.md` and it is unchanged.

Screenshots (`.audit/hero-p1c/after/<viewport>-s<slide>.png`; P1b in `.audit/hero-p1c/before/`):
- **1366x650 s1:** The copy is on the left as before. Dr. Siraj fills the right column from just below the nav down to the jacket, then fades out above the hands (the stage is 410px tall). "Since 1994 / Mehdipatnam · Nampally" is at the head's left, at eye level, clear of the face and shoulders. The call card is bottom-right, below the faded body. Tooth, toothbrush and mirror outlines are readable at 100% around the head and to the right of it, and none show near the headline.
- **1366x650 s2:** The two photo cards are taller (366px cluster), with Nampally offset lower. "NEODENT DENTAL HOSPITAL" reads in full, and the captions are on the photos. Soft red light surrounds the pair and fades to charcoal before "One standard of care." The bottom-left glow is visible under the buttons.
- **1366x650 s3:** The whole Siasat cutting has its caption band; the News18 and awards plates sit beside it. Red light is visible around and under the plates, and icons show faintly in the band below them.
- **1440x900 s1:** Same as 1366, larger. Hands and microphone are visible above the fade, and the call card sits below the hands. The headline wraps to four lines (as in P1 and P1b).
- **1440x900 s2 and s3:** The clusters are 526px tall, with clear red light around them. On s2 the Nampally sign reads in full. On s3 the cutting stays whole and the caption fits on one line.
- **1920x1080 s1 to s3:** The composition is centred in the container. The glow sits behind the media column with charcoal beyond it. On s2 the Telugu part of the Nampally sign is cut at the card's right edge; the English "NEODENT DENTAL HOSPITAL" reads in full. On s3 the News18 plate crops the broadcast frame's sides.
- **390x844 s1 to s3:** Copy and both buttons are in the top half; the floating call button is hidden. On s1 the doctor is larger in the strip, with the "Since 1994" card at its top-left clear of the face. On s2 the Nampally sign reads in full. Icons show faintly around the strips (11 to 13 levels).
- **360x740 s1 to s3:** As 390, tighter. Nothing covers the Nampally caption or "Awards and certificates" any more (P1b: the floating call button did). The Nampally address wraps to three lines.
- **Pattern visible at 100% zoom:** yes on desktop. Teeth, toothbrushes, mirrors and implants read as thin lines around the media cluster. On phones it is fainter, as specified (0.10), but visible around the strip.
- **Glow on slides 2 and 3 clearly visible:** yes. The clusters sit in red light that fades to charcoal before the headline.

Build and lint: `npm run build` passes. `npx tsc --noEmit` is clean. `eslint components/hero/Hero.tsx components/Home.tsx lib/site-data.ts` is clean. `globals.css` is not covered by the eslint config.

Unsure, or needs a decision:
- **Pattern strength vs the brief's "0.14 to 0.16 opacity".** The brief gives both a pixel target (10 to 16 levels) and an opacity. This tile cannot meet both: at 0.14 to 0.16 without the filter the icons were barely distinguishable from their own ground, and with the filter, 0.14 gave 15 to 19 levels. I followed the pixel target: 0.125 with the filter gives 15 to 17. The p99 is 6 to 7 because the lines are thin.
- **Alpha filter cost.** The filter is an SVG `feColorMatrix` on one full-hero layer per slide (inactive slides are `visibility: hidden`). Lighthouse shows no clear cost beyond noise, but TBT medians were higher in all three rounds (by about 100 to 200ms). If later runs show a real drop, the fallback is P1b's plain mask at about 0.16. That is simpler, but the icons blur into a uniform lift.
- **Slide 1 at 1366x650:** the stage is 410px tall, so the 13% larger figure fades out above the hands. The hands and microphone show at 1440 and 1920. If they should show on short laptops too, the figure would need to be smaller there, which works against "head and shoulders fill the stage".
- **"62 to 66% of the hero height" on phones:** not applied. Part 3.1 and 6.1 cap the phone strip at 38dvh, and the hero must fit 390x844, so the clusters stay at 31 to 34% of the hero there.
- **"Hero in view" for the floating button** uses any part of `#home` on screen, so the button returns only after the hero has fully scrolled away.
- **Leftover folders outside the repo:** I ran `npm ci` and `next build` inside the leftover `E:\neodent dental delegate\neodent-seo-audit\baseline-wt` worktree (its `node_modules` was incomplete) to serve the baseline. I also left the P1b build copy at `E:\neodent dental delegate\_p1b_snapshot`. Both can be deleted, along with the worktree, using `git worktree remove --force` on that path. All servers I started (3100, 3102, 3104) are stopped.

Owner inputs still missing: as before. A cleaner re-cut of the portrait would remove the head rim and the gold lapel mark, which are both still visible. Set `heroPortraitImage` in `lib/site-data.ts`, and check the proportions note next to it if the framing differs. Approval of the Siasat English caption is also still needed.
