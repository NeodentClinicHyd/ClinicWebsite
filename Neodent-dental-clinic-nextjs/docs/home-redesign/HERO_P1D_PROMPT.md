# Hero P1d: full-height hero, laptop pass, mobile polish

Date: 1 Nov 2026
Save as: `docs/home-redesign/HERO_P1D_PROMPT.md`
Run on: Opus 5.5 (one run, changes left uncommitted)
Follows: P1, P1b, P1c (all uncommitted). Hero only. The S-series is not affected.

---

## 1. Your screens (from the screen-size checker screenshots)

| Machine | Screen | Ratio | Pixel ratio | Chrome viewport (estimate) |
|---|---|---|---|---|
| Laptop | 15.7", 1366 x 768, about 100 PPI | 16:9 | 1x | about 1352 x 618 with the bookmarks bar shown (about 650 without it, 768 in full screen) |
| Desktop | 17.1", 1280 x 1024, about 96 PPI | 5:4 | 1x | about 1265 x 903 with the bookmarks bar shown |
| Phone | about 358 x 800 CSS px (717 x 1600 screenshots), 2x | tall | 2x | about 358 x 681 visible between the URL bar and the Android buttons |

The viewport figures are my estimates from the screenshots (browser bars take 120 to 150 px on the computers). The agent must measure, not trust them.

## 2. What the screenshots show

**A. The hero is not 100% of the screen height. Most important.**
- Laptop (1366 x 768, live site): the hero ends at y = 690 on a 768 px screen. Its height is about 464 px. A 618 px viewport minus the 78 px nav should give 540 px. It is about 76 px short, and the "WHY NEODENT" label of the next section shows underneath.
- Desktop (1280 x 1024, localhost): the hero ends at y = 946 on a 1024 px screen. It is about 748 px tall, where about 825 px is expected. It is about 78 px short, and the next section shows again.
- Both gaps equal the nav height (78 px). Suspect the nav height is subtracted twice (for example `100dvh - nav` inside a wrapper that already has the nav offset), or the hero height is driven by its tallest slide's content instead of being forced to the viewport.
- Why our checks missed it: the P1 and P1c fit checks compared the hero's height to `innerHeight - nav` in headless Chromium at 1366x650, 1440x900 and 390x844. They never checked that the hero's bottom edge lands on the bottom of the viewport. Both of your screens have viewport sizes we never tested (about 1352 x 618 and 1265 x 903).

**B. Laptop: slides feel cramped inside the short hero.**
- Slide 3: the Siasat plate is about 150 px wide, so the masthead and headline are not readable. The media cluster is about 345 px tall in a 464 px hero. There is an empty gap of about 95 px between the copy column and the plates.
- Slide 2: both photo cards are small and sit high, with dead space under them.
- Slide 1: the portrait is smaller than on the desktop and fades out at about 60% of the hero height. The headline is smaller than on the desktop.
- When the hero becomes 100% of the viewport (about 540 px here), the cluster can grow to the media cap (68dvh = about 420 px) instead of 345 px.

**C. Desktop 1280 x 1024: good, but not fully used.**
- It looks great (your words). Do not regress it.
- Slides 2 and 3 leave about 80 to 100 px of dead space above and below the cluster. Once the hero grows by about 78 px these gaps would grow, so the content must scale up with the hero.
- Slide 1's headline wraps to four lines at 1280 px wide. That is acceptable, but the copy column should not get narrower than it is now.

**D. Mobile.**
- Slides 2 and 3 have an empty band of about 105 CSS px between the "Send an enquiry" button and the media strip. The shared slide height is set by slide 1, which has more copy. The strip is a fixed `min(32dvh, 300px)`, so the spare room is wasted.
- Slide 1 works, but the strip is flat: the portrait sits in a narrow box and the strip does not feel like part of the page.
- On your phone the dots are visible at the bottom, so the hero roughly fits. Keep that, and use `svh` so the layout does not jump when the browser bar hides.

## 3. What 9.5 needs, honestly

- This pass can lift the layout, scaling, composition and mobile use of space. I expect 9.0 to 9.3 from code alone.
- The last 0.2 to 0.5 needs better source images, not code:
  - a clean re-cut of the Dr. Siraj portrait (the light rim around the head and the gold mark on the lapel are in the source PNG);
  - a better Mehdipatnam interior photo (wide-angle distortion);
  - a sharper scan of the Siasat cutting.
- The agent may try an optional rim clean-up (task 8). The lapel mark cannot be fixed without the original photo.

---

## 4. The prompt (paste into Kiro CLI)

```
Task: Hero pass P1d for the Neodent home page. Work on the hero only (section#home). P1, P1b and P1c are done and uncommitted; build on them. Goals: (1) the hero fills exactly 100% of the visible screen height under the nav on desktop and laptop, on every screen size in the test list; (2) the content scales with that height so short laptops (about 618 px viewport) look composed, not cramped, and tall 5:4 desktops (about 903 px viewport) have no dead zones; (3) the mobile hero uses its spare space and feels more premium; (4) overall target 9.5 out of 10 "wow" within a calm, hospital-trustworthy look.

Read first (binding): docs/home-redesign/NEODENT_HOME_REDESIGN_REFERENCE.md: Part 3 (global rules), Part 6.1 with 6.1a to 6.1e, Part 7 and Part 14 (SEO / AEO / GEO; they override any instruction here that would delete, shorten or hide text). Also docs/home-redesign/HERO_P1D_PROMPT.md section 2 (the owner's diagnosis from his screenshots), the P1, P1b and P1c entries in HOME_REDESIGN_CHANGELOG.md, and AGENTS.md.

Files you may edit: components/hero/Hero.tsx; the hero block of app/globals.css (P1 to P1c hero rules only, plus the .mobile-bar and floating call button rules if the hero change needs them); the hero data in lib/site-data.ts (heroSlideMeta, heroBranches, heroRecordItems, the portrait constant); components/Home.tsx only for the call-button visibility logic; new files scripts/hero-fit-audit.mjs and, if you do task 8, one new cleaned portrait file in public/assets. Anything else: stop and explain. Never overwrite or delete the original portrait file.

The owner's real screens (estimates from screenshots; measure to confirm):
- Laptop: 1366x768 screen, Chrome viewport about 1352x618 with the bookmarks bar (about 1366x650 without, 1366x768 in full screen). 1x pixel ratio.
- Desktop: 1280x1024 screen, Chrome viewport about 1265x903 with the bookmarks bar. 1x pixel ratio.
- Phone: about 358x681 visible area (358x800 screen, 2x), Chrome.

Observed bug (find the root cause first, do not just add a magic number): on both machines the hero ends about 78 px (the nav height) above the bottom of the screen and the next section's label shows under it. Laptop: hero about 464 px tall where 618 - 78 = 540 is expected. Desktop: about 748 px where about 825 is expected.

Tasks:

1. Reproduce and root-cause. Write scripts/hero-fit-audit.mjs (Playwright, no new dependencies). For each viewport and each of the three slides, at scrollY 0 and after hero load, report: hero top and bottom, innerHeight, hero.bottom - innerHeight, whether any pixel of the next section is visible in the first screen, whether the primary "Call for Consultation" button and the dots row are fully inside the viewport, media cluster height as a percentage of the hero height, empty space above and below the tallest of (copy block, media cluster) as a percentage of the hero height (excluding the dots row), horizontal overflow. Run it BEFORE changing anything and save the output to .audit/hero-p1d/before.json. If possible also launch a headed real Chrome (channel "chrome") at those window sizes and compare; if you cannot, say so. Test viewports: 1352x618, 1366x650, 1366x768, 1265x903, 1280x1024, 1280x720, 1440x900, 1536x730, 1920x1080, 1024x768; mobile: 358x681, 360x740, 390x844, 412x915, 768x1024. Explain the cause in the changelog (suspects: the nav height subtracted twice; hero height set by the tallest slide's content with no min-height; a min() cap; the sticky or fixed nav offset applied twice on .site).

2. Make the hero exactly the visible area at 1024 px width and up: height = 100dvh - nav height, with a vh fallback line before it, a floor of about 500 px for very short windows, and a sensible cap for very tall screens (about 1100 px). At scrollY 0, hero.bottom must equal innerHeight within 1 px and no pixel of the next section may show. All three slides keep sharing one height, set explicitly (not by content). Below 1024 px: the hero fills the first screen the same way, using svh (not dvh) so it does not resize when the browser bar hides; the dots row is fully visible without scrolling at 358x681, 360x740 and 390x844. If content is taller than the available height at 358x681, tighten spacing and type first; never hide text.

3. Scale content with the real hero height. Make the hero a size container (explicit height makes container-type: size safe) or use dvh-based clamps, and define height tiers, for example hero height at most 560 px, 561 to 700, 701 to 850, and above 850. Tune each tier by looking at screenshots, not by guessing. Targets:
   - Short laptop (hero about 540 px): headline two lines on slide 1 at about 64 to 76 px; doctor line and rating chip on one row; both buttons on one row; portrait fills the whole hero height (head about 6 to 10% below the top, figure fading into the hero bottom just above the dots row); media cluster on slides 2 and 3 grows to the media cap (about 420 px) instead of about 345 px; the Siasat plate is wide enough that the masthead and the headline are readable (about 200 px or more); the gap between the copy column and the media is no more than about 56 px; the copy column and the cluster are both vertically centred in the area above the dots row.
   - Desktop 5:4 (hero about 825 px): scale headline, copy spacing and the media cluster up with the height so there is no dead band above or below. Empty space above and below the tallest element must stay at or under 14% of the hero height on every slide. Do not make slide 1's copy column narrower than it is now, and do not lose the look the owner already likes.
   - Large screens (1920x1080 and up): composition centred in the container, glow behind the media, nothing stretched.
   The media cap (--media-max-h) and the 70% rule still apply; photos keep object-fit: cover with their focal points; documents keep contain.

4. Slide-specific polish:
   - Slide 1: the portrait is the hero's star: make it as large as the height allows, anchored right, figure bottom fading into the hero edge. Keep the "Since 1994 / Mehdipatnam · Nampally" glass card at the upper left beside the head and the call card at the lower right below the hands; neither may cover face, hands or microphone (overlap with the figure at most 25%). Re-check the card positions at every tier.
   - Slide 2: two photos the same height, Nampally offset lower, the whole "NEODENT DENTAL HOSPITAL" sign readable at every tier, captions on the photos, links unchanged. Increase photo size to use the height.
   - Slide 3: Siasat cutting whole (object-fit: contain) with its caption band, the broadcast and awards plates beside it, all sized to the cap. At the short-laptop tier consider a wider media column (narrower copy column) so the cutting can be larger. Consider making the cutting tap-to-zoom with a native dialog (like LegacyStory), only if it is accessible and does not break autoplay pause; otherwise skip and say why.

5. Mobile (767 px and below). The empty band between the buttons and the media strip on slides 2 and 3 (about 105 CSS px on the owner's phone) must go. Make the media strip a flexible region that grows into the spare height, up to about 46dvh, with cover crops and focal points, so every slide looks complete. Slide 1: larger portrait, bleeding off the right edge of the strip, the "Since 1994" card at the upper left clear of the face, figure fading into the dots row, a stronger red glow behind the shoulders. Slides 2 and 3: bigger photos or plates; the Nampally sign stays whole; no card or caption covered by the floating call button (it stays hidden while the hero is in view). Headline and the primary button stay in the first screen; tap targets stay 44 px or larger; no photo zoom; no breathing or drift. Check 358x681, 360x740, 390x844, 412x915 and 768x1024.

6. "Wow" without gimmicks. Pick and implement the most effective of these, explain each choice, and use only transform and opacity:
   - clearer entrance order per slide: headline line mask, supporting line, buttons, then the media plates with 80 to 120 ms steps, replayed each time a slide becomes active;
   - a slow settle on the portrait and a gentle light bloom behind the shoulders;
   - desktop hover on slide 2 and 3 plates: lift and a slight brightness change (hover devices only);
   - a clean focus ring on every interactive hero element;
   - typographic tuning: line height, letter spacing, a stronger gap between headline, supporting line and buttons.
   Not allowed: numbering, ghost numerals, corner brackets, registration marks, edge labels, rotated text, decorative arcs, new libraries, parallax on text, anything cinematic or entertainment-like.

7. Performance. The portrait stays the LCP element with next/image and preload. Measure Lighthouse mobile on a production build (npm run build and npm run start, never next dev): median of at least five alternating runs against the current P1c build. P1d must not be more than 3 points below P1c. Keep the pattern as a mask and keep the two masks in one list (comment in the CSS explains why; do not change it).

8. Optional, only if it clearly looks better: produce a cleaned copy of the portrait with the light rim around the head reduced (erode and defringe the alpha edge by 1 to 2 px using sharp or an SVG filter generated offline) as a NEW file; keep the original. Point the portrait constant in lib/site-data.ts at the new file only if you can show a before and after and the head edge is cleaner. The lapel mark is part of the source; do not try to paint it out.

SEO / AEO / GEO (Part 14 and 6.1d, binding): do not delete, shorten or hide any hero text. One h1 on the page with "Specialist dental care in Hyderabad · Since 1994" visible directly under it; slides 2 and 3 use h2; all three slides' text stays in the server HTML (inert and aria-hidden are fine, display: none is not); keep every link, caption and descriptive alt text; decorative layers are aria-hidden; phone numbers and clinic names come from lib/site-data.ts. On short screens, restructure (put the doctor line and rating on one row) rather than hide. The call card may stay hidden at 767 px and below only. Do not add schema, aggregateRating or an English Siasat caption.

Do not: touch other sections, add dependencies, change colour tokens or the type system, add anything from the banned list in task 6, or commit.

Verify:
- scripts/hero-fit-audit.mjs before and after. After: hero.bottom - innerHeight within 1 px for every desktop and laptop viewport and every slide; no next-section pixel visible; primary button and dots fully visible; empty space above and below at most 14% of the hero height on slides 2 and 3 and at most 18% on slide 1; media cluster between 62% and 84% of the hero height on slides 2 and 3 and never above --media-max-h; mobile gap between the actions and the strip at most 56 px on every slide; zero horizontal overflow.
- node scripts/home-viewport-audit.mjs exits 0 at its six viewports.
- Run scripts/seo-content-audit.mjs and compare the hero headings, links and alt texts (section g of the report) with the P1c state: nothing lost.
- Screenshots of all three slides at 1352x618, 1366x768, 1265x903, 1280x1024, 1440x900, 1920x1080, 358x681, 390x844 and 768x1024 into .audit/hero-p1d/, with before copies next to them. Look at every one and describe what you see; list anything still weak.
- Reduced motion: no animation, autoplay off. Keyboard: arrows, pause, focus ring.
- npm run build, npx tsc --noEmit and eslint on the files you changed pass.

Report: add a P1d entry to HOME_REDESIGN_CHANGELOG.md using the template (files changed, root cause of the 78 px gap, before and after fit table per viewport, tier definitions, Lighthouse numbers, content preservation line, honest re-rating per slide at laptop, desktop and phone, open issues). Rate honestly: if a slide is below 9.5, say what limits it (code or source photo). Leave all changes uncommitted.
```

---

## 5. After the run

1. Send me the screenshots from `.audit/hero-p1d/` (all three slides, laptop 1352x618, desktop 1265x903 or 1280x1024, phone) and I will re-rate and list what is left.
2. Check it yourself on the real laptop with the bookmarks bar visible: the hero's bottom edge should sit exactly on the bottom of the window, and "WHY NEODENT" should not show.
3. Supply the original Dr. Siraj photo for a clean re-cut. It is the biggest remaining lift on slide 1.
4. Approve or reject the English caption for the Siasat cutting (Part 8 of the reference file).
5. Before launch: run Lighthouse on a production build, and clear the 17 lint errors outside the hero.

## 6. Lines to add to the reference file

Part 6.1a rating table: add a row `P1d (full-height hero, laptop tiers, mobile fill) | expected 9.0 to 9.3 | n/a | n/a`.

Part 9 decisions log:
- (Hero, 1 Nov) The hero fills exactly the visible area under the nav (100dvh - nav on desktop and laptop, svh on mobile), checked by bottom edge against the viewport, not by height alone. The P1 check missed a 78 px shortfall on the owner's two real screens.
- (Hero, 1 Nov) Test sizes now include the owner's real viewports: 1352x618 (laptop with bookmarks bar), 1265x903 (desktop), 358x681 (phone).
- (Hero, 1 Nov) The mobile media strip grows into spare height (up to about 46dvh) instead of a fixed size; empty bands are not allowed.
