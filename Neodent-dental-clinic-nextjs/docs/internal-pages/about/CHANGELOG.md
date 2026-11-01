# CHANGELOG: /about redesign

## R0: Discovery and snapshot (31 Oct 2026)

**Files created**
- `docs/internal-pages/about/content-snapshot.json` (baseline, server HTML with JS off)
- `docs/internal-pages/about/OWNERSHIP.md`, `DISCOVERY.md`, `CONTENT_QUESTIONS.md`, `CHANGELOG.md`
- `.audit/about/tools/` : `common.mjs`, `page-content-snapshot.mjs`, `page-content-check.mjs`, `page-audit.mjs`, `r0-probe.mjs`
- `.audit/about/R0/` : screenshots, `audit.json`, `probe.json`

**No site code changed.**

**Summary**
- `scripts/page-content-snapshot.mjs`, `page-content-check.mjs` and `page-audit.mjs` named in the plan do not exist anywhere in the repo, and neither does `docs/internal-pages/_shared-requests.md`. Equivalents with the same arguments were written under `.audit/about/tools/` (the only place R0 may write besides docs). Run them as `node .audit/about/tools/page-content-check.mjs about /about`. The audit tool pre-stores a "reject non-essential" cookie choice so the consent banner does not cover screenshots.
- `/about` already uses About-only components in `components/sections/about/`. No shared components need forking. See OWNERSHIP.md.
- Real page differs from the plan in five ways (details in DISCOVERY.md): "View full archive" is a lightbox button, S9 items are buttons, S9 desktop panel is sticky and not empty, the Republic Day overlay text is baked into the image and names the founder, and home does have a large red card.
- A7, A2 to A6 and D1 are unticked; only A1 (closed) is ticked. R6 is skipped.

**Content check:** baseline created, so missing: 0 by definition.
**Audit numbers (baseline):** no horizontal overflow; media over 70% of viewport: 0 at 360 and 390, 1 at 768, 10 at 1366x650; text under 12 px: 6 to 7 items at every width; h1 count 1.
**Questions for the owner:** see CONTENT_QUESTIONS.md (Q6b answer, caption mismatch between S6 and archive, ghost "1994", claims to source).
**Shared-change requests:** none.
**Screenshots:** `.audit/about/R0/390-fold.png`, `390-full.png`, `390-nojs-full.png`, `768-full.png`, `1366-fold.png`, `1366-full.png`, `360-full.png` (under `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\`).
**Unfinished:** none.

## R1: Page wrapper, S1 header, S2 fact strip (31 Oct 2026)

**Files changed / created**
- pp/about/page.tsx: imports and the component body only (metadata export untouched, verified with git diff). The page now composes Navbar, sections and Footer directly instead of rendering AboutClientChrome (left untouched, now unused). S3 to S12 still render the old About components.
- New: components/pages/about/AboutPage.module.css, AboutBackdrop.tsx + .module.css, AboutHeader.tsx + .module.css, AboutFacts.tsx + .module.css.
- Tooling only: .audit/about/tools/ (un.mjs hard-timeout wrapper, shot-section.mjs, 
ojs-top.mjs).

**Summary**
- S1: dark gradient + red glow + icon pattern (mask-image over ivory fill, SVG alpha filter #about-pattern-levels defined once in AboutBackdrop) with no grid lines. Red offset frame removed. Eyebrow, h1 and supporting copy unchanged; eyebrow now 12 px (was 9.5 to 11 px). Photo in a rounded plate with a dark glass caption card (bottom of photo from 768 px, below it on phones). Glow breathing and pattern drift only at 768 px and wider, off under reduced motion.
- ADDED (standard 3.5, not in the old page): primary "Call for Consultation" (ctaTelPhone) and secondary "Send an enquiry" (/contact).
- S2: dark strip with hairline top; label cell + three equal cells that fill their height; CountUp on "2" and "25,000+" (value derived from legacyStats, final value in server HTML); "Since 1994" static; Reveal stagger 100 ms.
- S1 photo uses preload (Next 16's priority); it is the only preloaded image.

**Content check:** missing: 0, shortened: 0. Link count +2 (the two added actions).
**Audit (R1):** no horizontal overflow at 360/390/768/1366. S1 and S2 no longer appear in any list (remaining over-70% media and under-12 px text are in S3 to S12, handled in R2 to R5). h1 count 1. No-JS 390 screenshot shows S1 and S2 fully.
**Shared-change requests:** none. **Questions:** none new.
**Screenshots:** .audit\about\R1\ (390-fold.png, 1366-fold.png, strip-1366.png, strip-390.png, 390-nojs-top.png, 390-full.png, 1366-full.png).

## R2: S3 practice, S4 founder (31 Oct 2026)

**Files:** new components/pages/about/AboutShared.module.css (shared section system for R2 to R5: light/dark tones, title, lede, label, card, facts, native details, figure), AboutPractice.tsx + .module.css, AboutFounder.tsx + .module.css. pp/about/page.tsx imports changed to the new S3/S4 (body order unchanged). Old files in components/sections/about/ untouched.

**S3 (light):** ghost "1994" no longer drawn; kept in the DOM as visually hidden ria-hidden text (CONTENT_QUESTIONS Q5). Grid lines gone. Heading plain ink (no red accent). Paragraphs 1 and 2 visible in one reading column; facts card (light, hairline, soft shadow, rows as <dl>, 80 ms stagger); paragraphs 3 and 4 in a native <details> "Read more" (full text in server HTML). Highlight marks cut from 3 to 2; the third phrase is the same words as plain text. Mobile order: heading, paragraph 1, card, paragraph 2, details.
**S4 (dark, with AboutBackdrop):** red italic accent kept on "specialist care." Portrait on a dark panel, cut-out shown whole (contain, resting on the panel edge), caption in its own strip, panel height at most --media-max-h (38dvh on phones), mask reveal. Founder card as dark glass with <dl> rows; "30+" uses CountUp (server HTML reads "30+"). First paragraph visible, other four in a <details> (two columns on desktop). No highlight marks in dark body text (same words, plain). Link "Neodent's clinical expertise" kept (/treatments).

**Content check:** missing: 0, shortened: 0.
**Audit (R2):** no horizontal overflow. S3 is 1.40 screens and S4 1.55 screens at 390x844 (limit about 2.5). Media over 70% and text under 12 px now come only from S5 to S12 (old components, handled in R3 to R5). Fixed during the run: .exp span selector hit the CountUp spans (30+ rendered tiny); heading moved above both S4 columns to remove a gap under the portrait.
**Shared-change requests:** none. **Questions:** Q5 still open.
**Screenshots:** .audit\about\R2\ (s3-1366.png, s3-390.png, s4-1366.png, s4-390.png, 390-full.png, 1366-full.png, 390-nojs-full.png).

## R3: S5 experience, S6 press, DocumentViewer (31 Oct 2026)

**Files (all new in components/pages/about/):** AboutExperience.tsx + .module.css, AboutPress.tsx + .module.css, DocumentViewer.tsx + .module.css, SwipeRow.tsx + .module.css (reusable scroll-snap row with dots, reused in R5). pp/about/page.tsx now imports the new S5/S6. Old AboutMiftah/AboutPress and ArchiveViewer left in place; the new S6 imports ArchiveViewer and ARCHIVE_IMAGES from components/sections/about/ArchiveViewer unchanged.

**S5 (light):** photo left (sticky while the right column scrolls), shown at its own 4:3 proportion, no crop or filter, so the pixelated face is untouched; caption below. Right: plain heading, both paragraphs (both visible, together short), doctor card, red "View profile" (same label, href /doctors/dr-miftah-ur-rahman) under the card. Highlight marks 3 to 2. Mobile order: heading, paragraph 1, photo (at most 38dvh), card + button, paragraph 2.
**S6 (dark):** heading, both paragraphs, "View full archive" (same aria-label, still opens the 16-item ArchiveViewer) with "16 press items in the archive". Four cuttings on paper plates (contain, whole, hairline, soft shadow), each with its original two-line caption and alt, opening DocumentViewer. Mobile: one swipe row (scroll-snap, next plate peeks, progress dots, focusable track).
**Deviation from plan (owner may want to veto):** the plan put the large cutting beside the text and the other three in a row. Here all four are in one even row at one height, so none passes the 70% rule at 1366x650 and widths follow each cutting's proportion. The large cutting is smaller than the plan intended; it still opens full size in the viewer.
**DocumentViewer:** portal dialog, focus trap, Escape, arrows and buttons, swipe, caption and alt shown, scroll lock, focus returns to the cutting, crossfade off under reduced motion. Tested with Playwright: open, next, Tab x6 stays inside, Escape closes, focus returns, body scroll restored.

**Content check:** missing: 0, shortened: 0. Alts unchanged; archive button label and count unchanged.
**Audit (R3):** no overflow at 360/390/768/1366. Media over 70% at 1366x650 down from 10 to 4 (S7 awards, two S10 cuttings, S11 lead photo: later runs); at 768 from 1 to 0. Text under 12 px: 2 elements left (S11 and old shared labels, later runs). S5 is 1.75 screens and S6 1.42 screens at 390x844.
**Shared-change requests:** none. **Questions:** none new (Q-A, Q-B about caption mismatches still open).
**Screenshots:** .audit\about\R3\ (s5-1366.png, s5-390.png, s6-1366.png, s6-390.png, viewer-1366.png, 390-full.png, 1366-full.png).

## R4: S7 recognition, S8 seam card, S9 voice (31 Oct 2026)

**Files (new in components/pages/about/):** AboutRecognition.tsx + .module.css (S7 only), AboutSeam.tsx + .module.css (S8), AboutVoice.tsx + .module.css (S9). pp/about/page.tsx order is now AboutRecognition, AboutSeam, AboutVoice. Old AboutRecognition (which held S7 and S8) and AboutMedia are unused, not deleted.

**S7 (light):** D1 unticked, so the red card stays. Restyled inside it: no tall minimum height or empty gap (text sits together), consistent radius, soft shadow. Heading keeps its italic "over time." (words already carried it). Both bold runs kept. Awards photo cover with focal point on the trophy shelf, capped at --media-max-h, caption below ("Institutional recognition / Neodent Dental Hospital"). A7 unticked: no Madina Gold Medal line added.
**S8 (seam card, used once):** a two-tone band (ivory above, the S9 dark below) with one card across the line. The statement is now an h2 (was a <p>; same words, no red italic) and the ceremony photo with its caption and alt sits in the card's side column. Nothing added.
**S9 (dark):** same mechanism as before (ten <button aria-pressed> items, YouTube thumbnail facade, consent gate, youtube-nocookie iframe only after the visitor presses play and media consent exists, no autoplay), all film data copied verbatim. Plain heading and intro (no highlight marks on dark text). Ten compact dark-glass rows with category label and arrow (at least 84 px tall, hover lift on desktop, press state, active state). Player in a dark glass frame, sticky on desktop, 16:9 capped at --media-max-h-compact; crossfade when the selected film changes. Below 1024 px: intro, player, then the list. Not a swipe row.
**Band sequence now:** dark header+strip, light S3, dark S4, light S5, dark S6, light S7, seam, dark S9, light S10 (old), light S11 (old, still beige until R5), light S12, dark consultation, dark footer. No more than two dark bands in a row.

**Content check:** missing: 0, shortened: 0 (headings 18 to 19: the S8 statement is now a heading).
**Audit (R4):** no overflow at any width; media over 70% at 1366x650 is 3 (S10 cuttings, S11 lead photo: R5); none at 360/390/768. S9 is 2.54 screens at 390 (limit about 2.5). Playwright interaction test: 10 items, select swaps film and poster, facade click shows the consent gate and no iframe loads, panel is sticky.
**Shared-change requests:** none. **Questions:** none new.
**Screenshots:** .audit\about\R4\ (s7-1366/390, s8-1366/390, s9-1366/390, 390-full.png, 1366-full.png).

## R5: S10 community, S11 today, S12 cross-links (31 Oct 2026)

**Files (new in components/pages/about/):** AboutCommunity.tsx + .module.css, AboutToday.tsx + .module.css, AboutCrossLinks.tsx + .module.css. pp/about/page.tsx now uses only new components for S1 to S12 (plus Navbar, ContactNextStep, Footer). The whole of components/sections/about/* and pp/about/AboutClientChrome.tsx are now unused; nothing was deleted.

**S10 (light):** red italic accent kept on "wider community." (words already carried it). Paragraphs one and two visible, the third in a native <details>. Two highlight marks (was three). Photos: Republic Day address (larger) and Television (smaller), bottom-aligned, each at its own 16:9 so the text baked into the Republic Day picture is never cropped. Two cuttings on paper plates (contain, whole, tap to zoom through the same DocumentViewer from R3). Mobile: text, a swipe row of the two photos, a separate swipe row of the two cuttings, dots on both.
**S11 (dark, was beige):** plain heading; three paragraphs with both inline links (/treatments, /clinic); two dark glass clinic cards (name link to /clinic/mehdipatnam and /clinic/nampally, locality, 	el: phone links, all read from lib/site-data.ts; the whole card is the link, the phone is its own link); photos "Waiting lounge" and "Reception" as a capped pair (one swipe row on mobile). Highlight marks removed (dark body text, same words plain). A4 (opening hours) unticked, so none added.
**S12 (light):** three cards, now title and line on the left with the arrow on the right so none is mostly empty; screen-reader heading and the three links, labels and targets unchanged (A5 unticked: no extra links). Last body section before the consultation block and light.
**Band sequence:** dark S1+S2, light S3, dark S4, light S5, dark S6, light S7, seam, dark S9, light S10, dark S11, light S12, dark consultation, dark footer. No more than two dark bands in a row.

**Content check:** missing: 0, shortened: 0. Link count unchanged apart from the two header actions added in R1; both clinic links and both phone links keep their anchors and numbers.
**Audit (R5):** media over 70%: 0 at 360, 390, 768 and 1366x650 (baseline was 10 at 1366). Text under 12 px: 0 (baseline 6 to 7). No horizontal overflow. The only tap target under 44 px is the honeypot input inside ContactNextStep (read-only, not ours). Section heights at 390x844: S10 1.64, S11 1.82, S12 0.47 screens.
**Shared-change requests:** none. **Questions:** none new.
**Screenshots:** .audit\about\R5\ (s10-1366/390, s11-1366/390, s12-1366/390, 390-full.png, 1366-full.png, 390-nojs-full.png).

## R7: Motion and polish (31 Oct 2026)

**Files changed:** AboutShared.module.css, AboutPress.module.css, AboutCommunity.module.css, AboutVoice.module.css, AboutToday.module.css, AboutCrossLinks.module.css, SwipeRow.module.css (each gained a prefers-reduced-motion: reduce block that removes transitions and hover/press transforms). No other code changes: the walk of the plan's motion table found nothing missing.

**Checks run (tool: .audit/about/tools/motion-check.mjs, plus greps):**
- Every section has a visible reveal: S1 CSS load animation (rise, photo rise with 1.04 to 1 settle, caption at 450 ms); S2 Reveal stagger 100 ms + CountUp; S3 to S12 and the seam use Reveal (rise, fade, mask) with the stagger values in the plan; S4 "30+" uses CountUp. 38 Reveal roots on the page; all 38 reach their shown state after scrolling.
- Phones (390 wide): 0 continuous animations. Desktop: 10, all of them the backdrop glow breathing and pattern drift (768 px and wider only).
- Reduced motion: 0 hidden or armed reveals, 0 running animations, hover and press transforms off.
- No reveal hidden state in the server HTML: 0 inline opacity:0, 0 isibility:hidden, 0 data-reveal-ready/data-shown; the three <details> and their full text are in the server HTML. The page reads fully with JavaScript off (R1 and R2 no-JS screenshots).
- will-change appears only in AboutBackdrop.module.css on the glow and pattern layers, inside min-width: 768px and prefers-reduced-motion: no-preference.
- Red italic accent: S1 h1 (kept), S4 "specialist care.", S7 "over time." (inside the red card), S10 "wider community." Nothing else. EditorialHighlight marks: S3 2, S5 2, S10 2, none in any dark band.
- No numbered eyebrows, ghost numerals (the S3 "1994" is visually hidden only), corner brackets, arcs, rotated labels or text under 12 px in the new CSS.
- No layout properties in any keyframes. Hover and press transitions animate 	ransform plus order-color / ackground-color / color (paint-only, not layout).

**Content check:** missing: 0, shortened: 0.
**Audit (R7):** media over 70%: 0 at all four widths; text under 12 px: 0; no horizontal overflow; h1 count 1. Tap targets under 44 px at 768 and below: 1, the consult-company input inside ContactNextStep (read-only shared block; not ours).
**Shared-change requests:** none. **Questions:** none new.

## R8: Final fast check and screenshots (31 Oct 2026) , WHOLE REDESIGN SUMMARY

**Fast check (run id inal):** 	sc clean in owned paths; eslint clean; content check **missing: 0, shortened: 0**; git diff of pp/about/page.tsx shows no change to the metadata export (title, description, canonical, robots, Open Graph, Twitter are byte-identical; only imports and the component body changed).
**Audit numbers (360 / 390 / 768 / 1366x650 / 1440):** horizontal overflow 0 at every width; media over 70% of the viewport 0 at every width (baseline R0: 0 / 0 / 1 / 10); text under 12 px 0 (baseline 6 to 7); one h1; S1 photo preloaded and no other image. Tap targets under 44 px at 768 and below: 1, the consult-company input inside ContactNextStep (read-only shared block, not changed). Section heights at 390x844 (screens): S3 1.40, S4 1.55, S5 1.75, S6 1.42, S7 1.08, S8 0.55, S9 2.54, S10 1.64, S11 1.82, S12 0.47. Page height at 390: 16,260 px (baseline 19,546); at 1366: 11,003 px (baseline 13,330).

**Files changed (commit by path):**
- pp/about/page.tsx (imports and body JSX only)
- New, all in components/pages/about/: AboutPage.module.css, AboutBackdrop.tsx + .module.css, AboutShared.module.css, AboutHeader.tsx + .module.css, AboutFacts.tsx + .module.css, AboutPractice.tsx + .module.css, AboutFounder.tsx + .module.css, AboutExperience.tsx + .module.css, AboutPress.tsx + .module.css, DocumentViewer.tsx + .module.css, SwipeRow.tsx + .module.css, AboutRecognition.tsx + .module.css, AboutSeam.tsx + .module.css, AboutVoice.tsx + .module.css, AboutCommunity.tsx + .module.css, AboutToday.tsx + .module.css, AboutCrossLinks.tsx + .module.css
- Docs: docs/internal-pages/about/ (CHANGELOG.md, CONTENT_QUESTIONS.md, DISCOVERY.md, OWNERSHIP.md, content-snapshot.json; PAGE_PLAN.md is yours)
- Tooling and evidence, not site code: .audit/about/ (tools in .audit/about/tools/, screenshots per run)

**Additions:** the page-header action pair (primary "Call for Consultation" to ctaTelPhone, secondary "Send an enquiry" to /contact), required by the standard; the live header had none. No A-items were ticked, so no breadcrumb, eyebrows, opening hours, extra cross-links, FAQ or Madina line were added.
**Forks:** none. All S1 to S12 components were About-only, so new files were created beside them and the old ones were left alone.
**Now unused, not deleted (owner may remove):** pp/about/AboutClientChrome.tsx and everything in components/sections/about/ except ArchiveViewer.tsx and its CSS, which S6 still imports.
**Shared-change requests:** none (docs/internal-pages/_shared-requests.md does not exist and nothing needed it).

**Deviations from the plan, for the owner:**
1. The plan's scripts page-content-snapshot.mjs, page-content-check.mjs and page-audit.mjs do not exist; equivalents live in .audit/about/tools/. If you have the originals, re-run them.
2. S6: all four cuttings are in one even row at one height instead of "the large one beside the text, three below" (keeps all four under the 70% rule and whole). Each still opens at full size in DocumentViewer.
3. S5: the photo is sticky on desktop while the longer text column scrolls.
4. S8: the closing statement is now an h2 (was a paragraph) inside the one seam card; same words.
5. S1 eyebrow is 12 px (was 9.5 to 11 px); the red photo frame and grid lines are gone.
6. The ghost "1994" in S3 is no longer drawn but stays in the DOM as visually hidden text (Q5).
7. "View full archive" is an in-page lightbox button in the live page (not a link to a route as the plan assumed); it is unchanged.

**Open questions for the owner (see CONTENT_QUESTIONS.md):** Q6b (the Republic Day image's baked-in text says "Dr Md Siraj Ur Rahman", the founder, spelled "Md"); Q-A and Q-B (the same cutting has different captions in S6 and in the archive lightbox); Q5 (drop the hidden "1994" from the DOM?); Q8 (sources for "25,000+ patients treated", "30+ years of experience", "more than three decades"); Q7 (dates on captions, if wanted).
**Not done:** R6 (FAQ), because A6 was not ticked.
**Screenshots:** E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\about\final\desktop-full.png (1440 x 11,302) and E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\about\final\mobile-full.png (390 x 16,260).

## Owner decisions applied (31 Oct 2026, after R8)

- **Q5 resolved:** the hidden "1994" text in S3 is removed from the page (AboutPractice.tsx). The visible "Since 1994" in the S2 strip, the "Founded 1994" row in the S3 card, the eyebrow and the copy cover it. shared.vh is still used by the S12 screen-reader heading.
- **Q8 resolved:** "25,000+ patients treated" is confirmed by the doctor and stays as written.
- **"30+" changed to "32+" years of experience** (founded 1994): S4 card figure (CountUp to={32} suffix="+", server HTML reads "32+") and the S4 paragraph "With 32+ years of experience in dentistry...". The content baseline content-snapshot.json was edited in those three places so the content check compares against the approved wording. "More than three decades" elsewhere on the page is still correct.
- Not changed (read-only/shared, outside this page): any "30+" in other pages or shared data files. Check the home page and lib/clinical-team.ts if they should read 32+ too.

## Follow-up polish after the 768 px and 360 px screenshot pass (31 Oct 2026)

- **S6 at 768 to 1023 px:** the four cuttings were tiny side by side with cramped captions. SwipeRow gained a wide option (swipe layout up to 1023 px) and S6 uses it, so tablets get the same swipe row with dots as phones. Desktop (1024 px and up) is unchanged.
- **S5 on desktop:** the photo is now centred against the longer text column (and still sticks while reading), instead of leaving a gap under it.
- Visual pass done at 768 and 360 px over the whole page: no other defects found (no overflow, text and cards fit, swipe rows work, seam card and dark/light rhythm hold).
- Re-ran the final check: content check missing: 0, shortened: 0; tsc and eslint clean; overflow 0, media over 70% 0, text under 12 px 0 at every width. Screenshots refreshed: .audit\about\final\desktop-full.png and mobile-full.png.
- Not done: touch-device swipe test on real hardware, video playback after consent, screen-reader pass.

## Added at owner request: clinical team section (1 Nov 2026)

**Request:** list the doctors on /about, like the home page, after "Experience carried forward." (S5). This is outside the original plan.
**Files (new):** components/pages/about/AboutTeam.tsx + .module.css; pp/about/page.tsx renders it right after AboutExperience.
**What it shows:** heading "The Neodent clinical team.", the home page's own supporting line and lede, the two leadership cards (Dr. Mohd. Siraj Ur Rahman with 32+ years; Dr. Md. Miftah Ur Rahman with 15+ years and a "View profile" link to /doctors/dr-miftah-ur-rahman), then the five other doctors in the home page's portrait style (monogram plate for Dr. Hafsa Taha, who has no photo). Below 1024 px the five-doctor row is a swipe row with dots.
**Source of truth:** names, roles, credentials, years, portraits and crops are read from lib/clinical-team.ts (read-only), never retyped, so the About page and the home page stay in step. Dr. Siraj's data link points to this page, so only Dr. Miftah's profile link is shown.
**Checks:** tsc, eslint clean; content check missing: 0, shortened: 0 (additions only: links +3 vs baseline, images 16 to 22). Audit: no overflow, media over 70% 0, text under 12 px 0 at 360/390/768/1366/1440; motion check: no hidden state, reduced motion clean, phone has 0 continuous animations.
**Note for the owner:** lib/clinical-team.ts lists Dr. Asiya Siraj as "30+ years". That is her own figure, not the founder's, so I did not change it; confirm it is correct. Dr. Muti Ur Rahman is shown with MBBS / MD (Gen. Med.) exactly as in the data file.
**Screenshots:** .audit\about\R10\ (team-1366.png, team-768.png, team-390.png); final full-page captures refreshed in .audit\about\final\.
