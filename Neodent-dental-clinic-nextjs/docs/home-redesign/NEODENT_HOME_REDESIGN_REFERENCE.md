# NeoDent Home Page Redesign: Reference and Prompt Pack

Last updated: 30 Oct 2026 (revision 4: S0 done, S1 decisions recorded in Part 13.4; next run is S2)
Scope: the home page (`/`) redesign (P0 to P10, finished). The SEO content-preservation work (S0 to S7) covers the home page AND every internal page. Navigation redesign stays out of scope. **The hero section is excluded from the S-series:** its visual redesign is handled in a separate chat (P1b and later), so S2 to S4 do not restore or restyle hero text. S0 still lists the hero's rows in the report so nothing is lost track of.
Audience for this file: you in a new chat, and the coding agent (Kiro CLI) that implements each run.

**READ THIS FIRST (precedence rule).** Parts 3, 6 and 10 were written for design and say things like "cut the copy", "reduce to one paragraph", "remove the portfolio". Those instructions caused indexable text to disappear from the home page. From revision 2 on, **Part 14 (SEO / AEO / GEO rules) overrides every instruction in Parts 3, 6 and 10 that deletes, shortens or moves text.** Design rules about media, motion, numbering, ghost numerals, empty cards and mobile still apply unchanged. Where design and SEO conflict, relocate the text (disclosure, second layer, internal page with a link); never delete it silently.

How to use this file:
1. Keep it in the repo (see "Where to store this file" below). Every prompt in Parts 10 and 16 tells the agent to read it.
2. If you open a new Claude chat, upload this file and `HOME_REDESIGN_CHANGELOG.md` and say which run you are on (next one: S0, see Part 15). Part 13 is the status summary, so you do not need to retell the history.
3. After each run, add an entry to `HOME_REDESIGN_CHANGELOG.md` (template in Part 11, extended in Part 15), kept next to this file.

Where to store this file: files inside `public/` are served on the live website (for example `https://www.neodentdentalhospitals.com/references/...`) and search engines can crawl them. This file is a critical audit of the site, so keep it out of `public/`. Put it in `docs/home-redesign/` at the repo root. The agent can read it from there just as easily. Note that the GitHub repo is public, so anything committed is visible there too. If you want the audit private, keep `docs/` untracked (add it to `.gitignore`).

---

## Part 1. Project context

- Client: NeoDent Dental Hospitals, Hyderabad. Two clinics: Mehdipatnam and Nampally. Established 1994.
- Built by: Blogspage AI. This site is the flagship showcase for pitching other dental clinics.
- Stack: Next.js 16.3.1 (App Router), React 19.2.8, TypeScript. Styling is `app/globals.css` (about 12,000 lines) plus CSS Modules per section. Tailwind is installed but barely used. `lucide-react` icons. Fonts: Manrope (body) and DM Serif Display (headings). Contact form posts to `app/api/enquiry/route.ts` (Resend, zod).
- Repo path: `Neodent-dental-clinic-nextjs/`. Read `AGENTS.md` before writing code: this Next.js version has breaking changes, so consult `node_modules/next/dist/docs/` for anything framework-specific.
- Home page composition, in order, from `components/Home.tsx`:
  Hero, ExperienceIntro (contains the "Why Neodent" stat strip), SeamCard, LegacyStory, Expertise (treatments), ClinicalLeadership (doctors), PatientStories, WhatToExpect, SpacesDesignedAroundCare, ContactNextStep, Footer. A fixed mobile call bar and a LeadCapture modal (opens at 50% scroll) also exist.
- Traffic: about 80% of visitors use mobile. Mobile quality is a first-class requirement, equal to desktop.

### Targets

| Item | Current | Target |
|---|---|---|
| Home page overall (desktop) | 6.8 / 10 | 9.8 / 10 |
| Home page overall (mobile) | about 6.5 / 10 | 9.5+ / 10 |
| Hero | 8.0 after P1b (30 Oct 2026; 7.5 before the hero passes); expected 8.9 to 9.1 after P1c | 9.8 |
| Every other home section | 5 to 7.5 | 9.5+ |
| Internal pages (later) | n/a | 9 to 9.5 |
| Mobile page length | about 16,100 px (about 19 phone screens) | about 12,000 px or less |

Be realistic: 9.0 to 9.3 comes from the fixes and the motion pass. The last half point depends on the hero, the doctors section and the polish of the photo and motion work.

---

## Part 2. Design language to KEEP

The visual strategy is not changing. Improvements happen inside it.

- Palette: ink and charcoal (`--neodent-ink #263033`, `--neodent-charcoal #161c1e`), warm paper and ivory (`--neodent-ivory #f8f6ef`, `--neodent-surface #fffefa`), NeoDent red (`--neodent-red #d71920`, dark `#b5121a`). Green is a minor accent only.
- Type: DM Serif Display for headings with a red italic accent phrase; Manrope for body and UI.
- Structure: hairline rules, rounded paper cards, dark and light section alternation, the "seam card" device that overlaps two sections, red primary buttons.
- Tokens already in `globals.css`: `--nav-height-desktop: 78px`, `--nav-height-mobile: 68px`, `--type-hero-primary`, `--type-section-title`, `--type-display-title`. Reuse them. Do not invent a parallel set.

---

## Part 3. Global rules (binding on every prompt)

### 3.1 Media must fit the viewport (the owner's rule, adopted)

The owner's concern is correct. Images taller than the visible window force visitors to scroll to see a single picture, and on a laptop (about 650 px of usable height) several current images exceed that.

Rules:
1. No image or video may render taller than 70% of the dynamic viewport height at any breakpoint. Target 60 to 68%. Use `dvh` with a `vh` fallback, because mobile browser bars change the height.
2. Implement with shared tokens, defined once in `globals.css`:
   - `--media-max-h: min(68dvh, 680px)` for primary photos and videos
   - `--media-max-h-compact: min(52dvh, 520px)` for secondary or paired photos
   - Fallback line before each `dvh` line using `vh`.
3. A section's main composition (heading, key image, primary action) should fit inside one laptop viewport (about 1366 x 650 and 1536 x 730) where the section is not text-heavy. Image plus its caption should stay within about 80% of the viewport height.
4. Cropping is allowed and expected. Use `object-fit: cover` with a deliberate `object-position` focal point for photographs. This overrides older comments in `SpacesDesignedAroundCare.tsx` and `WhatToExpect.tsx` that say photos are "never cropped" or "never object-fit'd". Those comments caused the oversized portrait images.
5. Exception: documents (newspaper cuttings, certificates, award plaques) use `object-fit: contain`, stay within the same height cap, and are tap-to-zoom (a lightbox already exists in `Home.tsx`).
6. Also cap width. At 1920 px wide no image should grow past its column or the container max width.
7. The hero portrait and decorative section backgrounds are exempt from the 70% rule, but the hero as a whole must fit within `100dvh - nav height` (see 6.1).
8. Two or more large images stacked vertically on mobile are not allowed. Use one image, or a horizontal swipe row (3.4).

### 3.2 No "AI design taste"

The page must look like a hospital site designed in Figma by a person.

Remove or do not add:
- numbered eyebrows and labels ("01 / BEGINNING", "02 / PEOPLE", "03 / RECORD", "04 / IMPACT", "01 / SENIOR CLINICAL LEADERSHIP", "04 / PROFILE FILM")
- giant ghost numerals and watermarks (hero "01 / 02", "30+", "03"; "1994" behind headings)
- roman-numeral captions (i, ii, iii)
- slide counters styled as "02 / 03" (use progress dots instead)
- meta strips like "NEODENT / 2026", "NEODENT / ARRIVAL / 01", "NEODENT / INSIDE"
- decorative corner brackets, registration dots, architectural arcs, draft lines, rotated vertical edge labels ("HYDERABAD · TELANGANA")
- tiny all-caps micro-labels below 12 px
- repeating the same "black headline plus red italic phrase" formula on every section (keep it on the major ones, vary the rest)
- marker-underline highlights on many phrases (`EditorialHighlight`): at most two per section, none in body paragraphs of dark sections

Do instead: clear grouping, one idea per block, strong hierarchy (one heading, one supporting line, one action), generous but purposeful spacing, real photography, honest labels.

It must read as a hospital: clean, calm, trustworthy. Not cinematic, not entertainment.

### 3.3 No empty-card rule

The owner's complaint: content sits in the bottom 20% of a big card, and 60 to 80% of the card is blank.

- In any card or container, content must fill at least 65% of its inner height, or be vertically centred.
- No card may have more than 35% unused area.
- Fix by one of: reducing the card height to content, centring the content, or adding purposeful content (an image, a chart, a real fact). Never by adding decoration.

### 3.4 Mobile rules (priority)

- Test at 360 x 740, 390 x 844 and 768 x 1024 for every change.
- No horizontal overflow at 360 px (a current bug: "Multi-speciality" runs off the stat card).
- Body text 15 px or larger; functional labels 12 px or larger; tap targets 44 x 44 px or larger.
- Page length budget: about 12,000 px total (about 14 screens).
- Use horizontal scroll-snap rows for galleries, team cards and reviews: `overflow-x: auto; scroll-snap-type: x mandatory;` with cards about 82 to 88% wide so the next card peeks. Rows must be keyboard accessible.
- Collapse long copy: show 2 to 3 sentences, rest behind a "Read more" disclosure. The full text stays in the DOM for SEO and screen readers.
- Videos: `muted playsInline loop`, `preload="none"` with a poster, play only while at least 50% in view, pause off-screen, never autoplay under `prefers-reduced-motion` or when `navigator.connection.saveData` is true.
- Fixed bottom call bar: hide it while the hero's primary button is visible (today they stack as two identical red call buttons), respect `env(safe-area-inset-bottom)`, and make the area under the footer the footer's colour (today a cream strip shows below the dark footer).

### 3.5 Motion rules

- Purpose: guide attention and give a premium feel. Calm and quick (300 to 700 ms, ease-out). No bouncing, no spinning, no parallax on text.
- Allowed: staggered reveal on scroll, headline line-mask reveal, image mask reveal with a slight scale settle (1.04 to 1), count-up numbers, a line that draws with scroll, crossfade between panels, subtle hover lift on cards. Optional gentle parallax (at most 24 px) on the largest photos only.
- Use one shared reveal primitive (built in P0) instead of per-section observers. Reuse `components/sections/about/useReveal.ts` and the `data-reveal` pattern in `LegacyStory` as the starting point.
- Use CSS scroll-driven animation (`animation-timeline: view()`) inside `@supports`, with an IntersectionObserver fallback.
- Respect `prefers-reduced-motion`: show the final state, no transforms. The site already has about 20 reduced-motion blocks; match them.
- No new animation libraries in P0 to P9 (no framer-motion, no GSAP). CSS plus a small hook is enough and keeps mobile fast.
- Only animate `transform` and `opacity`. Never animate layout properties.

### 3.5b Performance rules

- Use `next/image` for photographs (several current photos use raw `<img>`; for example `WhatToExpect.tsx`). Give correct `sizes`.
- Lazy-load anything below the first screen.
- Limit autoplaying videos on mobile as in 3.4.

### 3.6 Copy and brand rules

- Write the brand as "Neodent" in running text, consistently. The headings currently mix "NeoDent", "Neodent" and "NEODENT" (logo). Only the logo keeps capitals.
- Fix the ungrammatical lines: "Changing smiles since 3 decades." (hero) and "Changing smiles since decades." (footer). Use "since 1994".
- "Since 1994" is the clinic's benchmark (the doctor asked for it to be highlighted). Use it as a real element, never as a ghost watermark. Spec in Part 7.
- The clinic's age is calculated: `new Date().getFullYear() - 1994` (32 in 2026). Dr. Siraj's personal "30+ years of experience" stays as it is on his own card.
- Do not invent facts, quotes, reviews, dates or credentials. Where content is missing, use the placeholders listed in Part 8 and say so in the changelog.
- Google rating figures are screenshot values ("may have changed since"). Keep that disclosure where it exists.

### 3.7 Accessibility

- Contrast: body text 4.5:1 or better. Red on charcoal must be checked for large text only.
- Every interactive element reachable by keyboard with a visible focus style.
- Images keep meaningful `alt`. Decorative elements are `aria-hidden`.
- Carousels and swipe rows: pause control for autoplay, keyboard arrows or tab-through.

---

## Part 4. Audit summary

Method: full-page desktop screenshot (1334 px wide), screen recording of the live localhost build, full-page mobile screenshot (375 px wide, about 16,100 px tall), and a read of the source in `Neodent-dental-clinic-nextjs`.

### 4.1 Desktop scorecard

| # | Section | Score | One-line verdict |
|---|---|---|---|
| 1 | Hero (3 slides) | 7.5 | Slide 1 is strong (8.5). Slides 2 and 3 are weak (about 6). |
| 2 | "Why Neodent" stat strip | 6 | Mixed content, no motion, duplicates figures used elsewhere. |
| 3 | "Care begins the moment you walk in" | 6 | Text wall; video is mostly a red pillar. |
| 4 | Dr. Siraj dark seam card | 6.5 | Vague quote; same portrait reused. |
| 5 | "Decades of changing smiles" (1994) | 6.5 | Valuable content, busy layout, empty stat card, ghost "1994". |
| 6 | "What can we help you with?" | 7.5 | Best interaction on the page; polish needed. |
| 7 | "A steady hand" (doctors) | 5.5 | Too long, repetitive, visible placeholders. |
| 8 | "What patients say" | 5 | A blurred face is the hero; thin content. |
| 9 | "What to expect" | 5.5 | Stair-stepped steps look like a bug. |
| 10 | "Spaces designed around care" | 6 | Photos float in empty space. |
| 11 | "Let's make your next step" | 5 | Weakest conversion point: one link only. |
| 12 | Footer | 7.5 | Solid; grammar fix and "Since 1994". |

### 4.2 Cross-cutting findings

1. Numbering and ghost numerals are still present (list in 3.2). The `label` strings live in `lib/clinical-team.ts`, which is also used by `components/clinic/branch/BranchClinicalTeam.tsx`.
2. Two doctor cards show "PORTRAIT NOT AVAILABLE".
3. Ungrammatical lines ("since 3 decades", "since decades").
4. Brand casing is inconsistent (NeoDent, Neodent, NEODENT).
5. Duplicated content:
   - Dr. Siraj's portrait appears four times (hero slide 1, seam card, legacy card, team grid).
   - Dr. Miftah's credentials appear three times in the doctors section.
   - "30+ years" appears six or more times.
   - "25,000+" appears in the stat strip and again in the 1994 section.
6. Text walls: "Care begins", the Dr. Miftah section (four paragraphs), the 1994 section, the treatments intro.
7. The patient-story video is a heavily blurred face. The treatment film uses a triangle mosaic over the patient's eyes that looks like a glitch.
8. "What to expect" steps are indented progressively to the right, leaving blank space on the left.
9. The "Spaces" right column has about 350 px of blank space above the photos.
10. The final call-to-action offers a single "Send an enquiry" link. No click-to-call, no form.
11. Several videos autoplay on one page (hero, intro, treatment film, Dr. Miftah film, patient story).
12. Six of twelve sections are dark. For a hospital, test the doctors section on the light paper background.
13. `foundingDate` is not in the structured data (`lib/structured-data.ts`, type `Dentist`).
14. Some images are taller than a laptop viewport (violates 3.1).

### 4.3 Mobile findings (375 px capture)

- Hero slide 1 works well on mobile (portrait, headline, rating, CTA all in the first screen). Slide 3 puts about half the first screen into images before the headline appears. Slide heights differ, so the layout jumps between slides.
- The hero "Call for Consultation" button and the fixed "Call Neodent" bar stack as two identical red buttons.
- Stat strip: "Multi-speciality" overflows the card's right edge. (Confirmed at 2x zoom.)
- The red "Different generations. One standard of care." card is cut off at the bottom by the next section; its "1994 to Today" line is not visible. (Confirmed at 2x zoom.)
- The "25,000+" card has a large blank upper half.
- Dr. Miftah portfolio: three to four large photos stacked vertically, about two screens of scrolling.
- Dr. Miftah profile film: the video is letterboxed inside a 4:5 frame, leaving a black band under it.
- Team grid: two columns, with the fifth doctor alone on the last row; placeholder cards visible.
- Patient story: blurred video fills almost a full screen.
- "What to expect": stair-step indentation wastes width on a narrow screen.
- A cream strip shows under the dark footer (space reserved for the fixed bar).
- Text below 12 px in several micro-labels.

---

## Part 5. Execution strategy: section by section

Decision: do NOT change the whole page in one go. Reasons:
- One huge prompt gives the agent too many decisions; mistakes get buried and you cannot tell which change caused which regression.
- Section by section gives a reviewable diff per run, an easy revert, and a clean changelog.
- Mobile and laptop checks are meaningful per section.

Order of work (11 runs):

| Run | Scope | Model |
|---|---|---|
| P0 | Foundation: media tokens, audit script, shared reveal and count-up, brand constants | Opus 5.5 |
| P1 | Hero | Opus 5.5 |
| P2 | Stat strip, "Care begins", seam card | Sonnet 5.5 |
| P3 | 1994 / Legacy section | Opus 5.5 |
| P4 | Treatments | Sonnet 5.5 |
| P5 | Doctors (7 doctors) | Opus 5.5 |
| P6 | Patient stories | Opus 5.5 |
| P7 | What to expect | Sonnet 5.5 |
| P8 | Spaces | Sonnet 5.5 |
| P9 | Final call-to-action, footer, mobile bar | Opus 5.5 |
| P10 | Whole-page QA and polish | Opus 5.5 |

Model advice (my judgment, not a benchmark): the sections that need design judgment (hero, 1994, doctors, patient stories, the conversion block, the foundation) are where earlier passes left you dissatisfied, so use Opus 5.5 there. Sonnet 5.5 is fine for the more mechanical sections (copy trims, layout fixes with a clear spec). If cost does not matter, use Opus 5.5 for all of them.

Working method for every run:
1. Start `npm run dev`. Run `node scripts/home-viewport-audit.mjs` (created in P0) before and after.
2. The agent leaves the changes uncommitted so you can review the diff, then you commit with a message like `home: hero redesign`.
3. Add an entry to `HOME_REDESIGN_CHANGELOG.md`.
4. Look at the result yourself on a phone-sized window and a laptop-sized window before starting the next run.

---

## Part 6. Section specifications

Each spec lists files, decisions, mobile behaviour, motion and acceptance criteria. Targets: hero 9.8, others 9.5+.

### 6.1 Hero

Files: `components/hero/Hero.tsx`, hero rules in `app/globals.css` (around lines 666 to 2200: `.hero`, `.hero-slide`, `.hero-founder*`), data in `lib/site-data.ts` (`heroSlideMeta`, `heroBranches`, `heroRecordItems`, `HERO_AUTOPLAY_MS = 7000`).

Decisions:
- The hero must fit within `100dvh - nav height` on 1366 x 650, 1440 x 900 and 390 x 844. Headline, supporting line and primary action are all visible without scrolling.
- Keep three slides; every slide gets the same two actions: primary "Call for Consultation", secondary "Send an enquiry". Today only slide 1 has a button.
- Slide 1 (founder): keep the headline "Three decades of changing smiles." Replace the tagline "Changing smiles since 3 decades." with "Specialist dental care in Hyderabad · Since 1994". Remove the ghost "30+". Add a small "Since 1994" badge on the portrait frame (styled like the existing "2 Hyderabad locations" tag). Keep the rating chip.
- Slide 2 (locations): headline "Two clinics. One standard of care." (remove the separate "Where Neodent is." and its italic tagline). Remove ghost "01 / 02" and the "01" / "02" captions. The two photos get the same height (within the media cap) and aligned captions. The branch list becomes two tappable rows with a short descriptor.
- Slide 3 (recognition): keep "Recognised beyond the clinic." Add an English caption to the Siasat plate (see Part 8: needs the clinic's approval). Remove the ghost "03", the rotated edge label and the `i / ii / iii` styling.
- Autoplay: pause on hover, focus and touch; stop for `prefers-reduced-motion`; replace the "02 / 03" counter with progress dots that fill over the 7 seconds; crossfade with a slight translate.
- Mobile: headline and action come first, images are a compact strip below, at most 38dvh. All slides share one height so the page does not jump. Hide the fixed call bar while the hero's primary button is visible.
- Motion: headline line-mask reveal on load, portrait mask reveal, badge fade-in after 400 ms.

Acceptance: fits the viewport at all six test sizes; no numbering or ghost numerals; every slide has both actions; no layout jump between slides on mobile; Lighthouse performance on mobile does not drop.

#### 6.1a Hero status and rating history (updated 30 Oct 2026)

This sub-section and 6.1b to 6.1e record what the later hero passes (P1b, P1c) decided. Where they differ from the P1-era decisions above, they win. The hero is still outside the S-series: S2 to S4 do not restore or restyle hero text (see the scope line at the top of this file), but the SEO rules in 6.1d bind every hero run.

| Stage | Hero overall | Slide 1 | Slides 2 and 3 |
|---|---|---|---|
| Original production hero | 6.7 | n/a | n/a |
| P1 (structure, copy, controls) | 7.2 | n/a | n/a |
| P1b (background, staging, glass cards) | 8.0 | 8.3 | 7.8 each |
| Expected after P1c | about 8.9 to 9.1 | 9.0 to 9.3 | 8.8 to 9.0 |

The ratings are my judgement from screenshots and the changelog, not a benchmark. Re-rate from fresh screenshots after P1c.

What limits the score beyond about 9.3 is the source photography, not the code:
- The Dr. Siraj cut-out has a faint light rim around the top of the head and a small gold mark on the left lapel. Both are in the source PNG. P1b lowered the spotlight to hide the rim; only a cleaner cut-out removes it.
- The Mehdipatnam interior photo is a distorted wide-angle shot.
- The Siasat cutting is a low-resolution scan, shown whole as a document.
A re-cut portrait (from the original photo) lifts slide 1 the most; a better interior photo lifts slide 2. The 9.8 target is realistic only with those inputs.

What each pass delivered:
- P1: structure and copy. One shared height so slides do not jump; both actions on every slide; "Since 1994" tagline; progress dots with pause; no ghost numerals, numbering, edge labels or counters; mobile call bar hidden while the hero's primary button is visible; `next/image` portrait.
- P1b: depth. Charcoal gradient base, a red glow per slide, the masked dental icon pattern, an unframed portrait stage (spotlight, ground shadow, bottom fade), glass cards, captions on the photos, an offset photo pair on slide 2, a solid caption band under the Siasat cutting, 44 px dot buttons, glow breathing and pattern drift (768 px and wider only). Audit exits 0; hero fit confirmed at 1366x650, 1440x900 and 390x844; Lighthouse on a production build, six alternating runs: P1 median 40, P1b median 38 (inside the 3-point limit).
- P1b findings that drive P1c: the pattern was too faint (1 to 4 levels of difference at 0.08, so the hero still read as plain black); the red accent phrase measures 3.35 to 3.48:1 (passes the 3:1 large-text rule; the colour token stays); the glow on slides 2 and 3 is weak (0.22); the media on slides 2 and 3 is small against the hero; the photo zoom still runs on phones; the call card hides on phones and the floating call button covers the strip's bottom-right corner at 360 px; the pause button area needs to be at least 44 x 44 px.

#### 6.1b Hero design system (P1b, extended by P1c)

- Layers, back to front: charcoal gradient (`--neodent-charcoal` to `#0f1315`); red radial glow behind the media (`--glow-x`, `--glow-y`); the icon pattern as a luminance `mask-image` over an ivory fill (never as a CSS `background-image`: Lighthouse then picked the 2,000 px layer as the LCP element); the content. The pattern mask reaches 0 before the copy column, so the pattern is never visible behind the headline or supporting line.
- Pattern strength: visible texture, about 0.14 to 0.16 effective opacity on desktop and 0.10 to 0.12 on phones (a pixel difference of about 10 to 16 levels along the media edge). Zero difference behind the headline.
- Glow: about `rgba(215,25,32,0.30)` on slide 1 and 0.30 to 0.34 on slides 2 and 3, centred behind the media, never reaching the headline.
- Slide 1: unframed portrait stage with a bottom fade and a ground shadow, scaled so the head is large and anchored right, one glass card "Since 1994 / Mehdipatnam · Nampally" at the upper left beside the head, one click-to-call glass card at the lower right below the hands. No card covers the face, hands or microphone; overlap with the figure is at most 25%.
- Slides 2 and 3: media clusters about 62 to 66% of the hero height (within `--media-max-h`), captions on the photos, the Siasat cutting whole (`contain`) with a solid caption band, Nampally card offset lower than Mehdipatnam on slide 2.
- Glass card style: `background: rgba(16,21,23,0.72)`, `border: 1px solid rgba(255,255,255,0.12)`, radius 0.35rem, `backdrop-filter: blur(8px)` inside `@supports`.
- Motion (transform and opacity only): glow breathes 1 to 0.85 over 9 s and the pattern drifts about 10 px over 18 s, on the active slide only, at 768 px and wider only; photo zoom 1 to 1.035 on slides 2 and 3 on desktop only (none at 767 px and below); everything is off under `prefers-reduced-motion`. `will-change` only on the two running layers.
- Mobile (767 px and below): copy and both actions first, media strip below (at most 38dvh), no breathing, drift or zoom, call card hidden (the primary "Call for Consultation" button carries the number), the floating call button hidden while the hero is in view.
- Contrast floors: ivory headline at least 16:1, supporting line at least 8.8:1, red accent at least 3:1 (large text).

#### 6.1c P1c decisions (the prompt is in Part 10)

A pattern visible; B stronger glow on slides 2 and 3; C bigger media on slides 2 and 3; D slide 1 portrait larger with the two glass cards repositioned; E mobile fixes (no photo zoom, floating call button hidden while the hero is in view, call card hidden); F pause button at least 44 x 44 px; G performance (portrait is the LCP element and keeps `priority`; Lighthouse on a production build, median of at least five alternating runs, no more than 3 points lower than P1b).

#### 6.1d Hero SEO, AEO and GEO constraints (binding; these follow Part 14 and override any design instruction above)

- One `h1` on the whole page. Slide 1's `h1` is "Three decades of changing smiles." and the visible supporting line "Specialist dental care in Hyderabad · Since 1994" stays directly under it (R3); keep that line inside the `h1` as a styled span, or immediately after it as a visible paragraph. Slides 2 and 3 use `h2`.
- All three slides' text is in the server-rendered HTML. `inert` and `aria-hidden` on inactive slides are fine. `display: none` on slide text, or rendering only the active slide, is not (R2).
- Keep: the slide 2 supporting line "Visit us in Mehdipatnam or Nampally, Hyderabad."; the links to `/clinic/mehdipatnam` and `/clinic/nampally` with their descriptive captions; the "Send an enquiry" link to `/contact`; the `tel:` link on the primary button; the rating chip. Enlarging or restyling media must not remove a caption, link or alt text (R4, R5).
- Alt text stays descriptive and natural for the portrait, both clinic photos and the three slide 3 images (Siasat cutting, broadcast frame, awards photo). Decorative layers (glow, pattern, spotlight, ground shadow) are `aria-hidden`.
- Hiding the duplicate call card at 767 px and below is allowed because the same number is in the primary button's `tel:` link and in the footer. Do not hide any text that exists nowhere else.
- GEO (R8): the phone number and clinic names in the hero come from `lib/site-data.ts` (`ctaPhone`, `ctaTelPhone`, `heroBranches`). Never hard-code them in `Hero.tsx`. Hours are not shown in the hero. Do not add `aggregateRating` or review markup from the rating chip.
- The Siasat English caption needs the clinic's approval (Part 8). Without it, show no translation and do not invent one.
- The 18 hero rows in `SEO_CONTENT_DIFF.md` and `SEO_LEDGER_DECISIONS.md` are marked "hero pass". After each hero run, rerun `scripts/seo-content-audit.mjs` and check section (g) of `SEO_CONTENT_DIFF.md` (hero headings, supporting lines, links and alt texts, baseline against current) against the rules above. List any removed hero text in the changelog with its destination or the reason it was dropped.
- Definition of done for a hero run is Part 14 R9 plus the hero fit check: viewport audit exits 0, no media over 70% of the viewport, no overflow at 360 px, hero inside `100dvh - nav` at 1366x650, 1440x900 and 390x844.

#### 6.1e Hero next steps

1. Run P1c (Part 10) on Opus 5.5. One run, changes left uncommitted.
2. Send screenshots of all three slides at 1366x650, 1440x900, 1920x1080 and 390x844 (from `.audit/hero-p1c/`) for a re-rating against 9.5.
3. Optional but worth it: supply the original Dr. Siraj photo (not the existing cut-out) for a clean re-cut without the rim and the gold lapel mark. This is the single biggest remaining lift on slide 1.
4. Approve or reject the English caption for the Siasat cutting (Part 8).
5. After the hero pass, rerun the SEO content audit and review section (g) of `SEO_CONTENT_DIFF.md`.
6. Before launch: clear the 17 `npm run lint` errors (navigation, consent and internal-page files, none in the hero) and confirm Lighthouse on `npm run build && npm run start`, never on `next dev`.

### 6.2 "Why Neodent" stat strip + "Care begins" + seam card

Files: `components/sections/ExperienceIntro.tsx` (styles in `globals.css`, classes `exp-intro-*`; stats array `whyNeodentStats`), `components/sections/SeamCard.tsx` + `SeamCard.module.css`, `lib/site-data.ts` (`tourVideo`, `recognitionImage`).

Decisions:
- Stat strip: four true numbers, in this order: "32 years" (calculated; label "of specialist care, since 1994"), "2 clinics", "418 Google reviews" (261 + 157, label "across both clinics"), "25,000+ patients treated" (client-supplied; keep the existing "must be verified" note in code). Replace the word "Multi-speciality". Count-up on view. On mobile a 2 x 2 grid with no overflow at 360 px. Drop the "Why Neodent" label bar if it wastes height; the strip should be one compact band.
- "Care begins the moment you walk in": cut the copy by about 40 to 50% to two short paragraphs. Proposed text (needs no new claims):
  "From the first step inside, Neodent is designed around a calmer, more reassuring dental experience. You are guided through each stage with clear explanations, and the same specialist-led care follows you from your first visit through to treatment and beyond. Whether you visit Mehdipatnam or Nampally, the standard is the same."
  Keep at most two highlighted phrases. Keep the Calm / Precise / Personal card.
- Media: the current desktop clip is mostly a red pillar. Use a segment of the tour video that shows the wide interior (extract frames with `ffmpeg` at 1 s steps, pick the segment, start playback from that offset), or a still photograph of the interior. One media item, within `--media-max-h`.
- Seam card: remove the vague quote "We maintain peak performance". Make it a "Since 1994" statement band ("Specialist-led care. Since 1994.", attributed "Neodent Dental Hospital"). Default: drop the portrait here, since Dr. Siraj appears in the hero and in the next section. Keep the seam-overlap device.
- Remove all ghost numerals and the rotated "NEODENT / ARRIVAL / 01" label.

Acceptance: no overflow at 360 px; the stat strip fits one row on desktop and a 2 x 2 grid on mobile; the intro copy fits a laptop viewport with its media; no highlight clutter.

### 6.3 1994 / Legacy ("Decades of changing smiles")

Files: `components/sections/LegacyStory.tsx` + `LegacyStory.module.css`.

Decisions:
- Remove the chapter labels (01 to 04) and the ghost "1994".
- Open with a real "Since 1994" lockup: "1994" set in solid DM Serif (not faint), next to "Established in Hyderabad", with a rule that draws toward "Today" as you scroll. If the owner supplies real milestones (Part 8), place them on the line; otherwise just 1994 and Today with the two clinics.
- Dr. Siraj card: keep (name, role, 30+ years, three credential rows). Reduce the two text paragraphs to one.
- Press: the Siasat cutting uses `object-fit: contain`, tap-to-zoom, within the media cap, with an English caption (Part 8). News18 and the ceremony photo stay as two compact thumbnails. On mobile, press items become a swipe row of three.
- Closing band ("Impact"): merge the empty white "25,000+" card and the red "Different generations. One standard of care." card into one band. Number vertically centred, statement beside it. Fix the mobile clipping of the red card (its timeline row is currently hidden and the card ends abruptly). Remove the repeated "25,000+" if it already appears in the stat strip; keep one of the two.
- Motion: the draw-on line, count-up on the number, staggered press items.

Acceptance: "1994" is the visual centrepiece of the section; no card is more than 35% empty; the red card is complete on mobile; the press plate is readable (zoomable) and fits the viewport.

### 6.4 Treatments ("What can we help you with?")

Files: `components/sections/Expertise.tsx`, `components/sections/expertise-data.ts`, styles in `globals.css` (`treatment-atlas*`).

Decisions:
- Tighten the two intro paragraphs to one paragraph. Remove the floating tooth-and-mirror video (or on desktop reduce it to a compact decorative element that does not leave a blank zone; on mobile hide it).
- Cards: remove the empty gap between description and footer (card height fits content); keep the "REPAIR / REPLACE / PRESERVE / ALIGN / REFINE / REBUILD / MAINTAIN" action word; make sure every card shows its icon in every state (the active Composite card currently shows none).
- The detail panel must match the selected card: today "Composite Build-up" shows "REAL CASE / COMPOSITE SMILE DESIGN". Fix the label source in `expertise-data.ts`.
- Patient media: replace the triangle mosaic over the eyes with a mouth-only crop (use `object-position`/crop on the existing media so no eyes are visible). The before/after slider stays.
- Mobile: after tapping a card, scroll the detail panel into view (or open it directly under the grid); the panel's media within `--media-max-h-compact`.
- Motion: panel crossfade on selection; card hover lift; staggered card reveal.

Acceptance: no clipped or missing icons; labels match the selected treatment; no mosaic; the grid has no empty gaps; the panel is reachable in one tap on mobile.

### 6.5 Doctors ("A steady hand. A human approach.")

Files: `components/sections/ClinicalLeadership.tsx` + `.module.css`, `components/doctors/DrMiftahProfile*` (only if reused), `lib/clinical-team.ts`, `components/clinic/branch/BranchClinicalTeam.tsx` (shares the data; do not break it).

Decisions (7 doctors in total):
- Layout: a leadership pair on top (Dr. Mohd. Siraj Ur Rahman, Founder and Director; Dr. Md. Miftah Ur Rahman, Assistant Director), then a row of five specialists: Dr. Md. Muti Ur Rahman, Dr. Asiya Siraj, Dr. Safoora Talha, Dr. Muqeet Ur Rahman, and the new seventh doctor.
- Leadership cards: portrait (4:5, within `--media-max-h-compact`), name, role, three credential rows (qualifications, specialism, post), and a "View profile" link (Dr. Miftah to `/doctors/dr-miftah-ur-rahman`; for Dr. Siraj link to the most relevant existing page such as `/about`, locate the founder anchor).
- Cut the Dr. Miftah text wall (four paragraphs) to one short paragraph. Move the six-image portfolio and the two videos off the home page; keep one compact "Dr. Miftah at work" band (one photo or the profile film) that links to his profile page. The portrait of Dr. Siraj appears here once (remove the duplicate in the team row).
- Team row cards: uniform portrait frame (4:5), same head position, same backdrop, name, credentials, years.
- Portraits: the two doctors with placeholders (Dr. Asiya Siraj and Dr. Safoora Talha) get their new portraits (supplied by the owner). The seventh doctor has no portrait: a monogram plate (initials in DM Serif on the same dark frame, subtle tooth mark), no "portrait not available" text, placed last in the row. If a supplied portrait does not match the existing cutout style (background, crop), do not hack it: use it in a neutral uniform frame and report it in the changelog so the background can be removed as a separate step.
- Data: remove numbering from `label` strings in `lib/clinical-team.ts`; add a `role` field if needed; add the seventh doctor entry from the details supplied (Part 8). Check `BranchClinicalTeam.tsx` still renders.
- Mobile: leadership cards stacked; the five specialists as a horizontal scroll-snap row (cards about 62 to 70vw). Dr. Miftah's profile film must not be letterboxed (fix the aspect ratio or use `object-fit: cover`).
- Section background: test the doctors section on the light paper background (it is a hospital). Keep dark only if the owner prefers.
- Motion: staggered card rise, hover reveals the credentials line.

Acceptance: seven doctors present, no placeholder text, no numbering, section length reduced by about half on mobile, portraits consistent.

### 6.6 Patient stories ("What patients say")

Files: `components/sections/PatientStories.tsx` + `PatientStories.module.css`.

Decisions:
- Replace the blurred face as the hero. Lead with a rating summary: "4.3 (261) at Mehdipatnam and 4.6 (157) at Nampally" or "418 reviews across both clinics", with the existing "may have changed" note, and a link out to the Google listings.
- Reviews: build a swipeable review list from real Google reviews (the owner supplies 3 to 6 verbatim, Part 8). The existing review (Gaddam Sanjeeva) is the first item. Do not invent reviews. The component must still look complete with only one review (summary band plus link).
- Video: if it stays, it sits in a compact card (square or 4:5, within `--media-max-h-compact`), tightly cropped so the blur is not the main visual, with the existing quote "Not at all, not at all." as a caption. Pause off-screen.
- Remove the empty area to the right of the heading and the large gap at the bottom.
- Mobile: review cards as a scroll-snap row; the video does not take a full screen.
- Motion: staggered review cards, count-up on the rating.

Acceptance: the section has no blurred-face hero; fits one laptop viewport; works with 1 review and with 6.

### 6.7 What to expect

Files: `components/sections/WhatToExpect.tsx` + `WhatToExpect.module.css`.

Decisions:
- Replace the stair-stepped list with a clean left-aligned vertical stepper: a vertical line with a dot per stage, a title and one line of description each. The sequence is shown by the line and dots, not by numbers.
- Photos: the tall reception photo is capped at `--media-max-h` and cropped with a deliberate focal point (red railings and chairs). The team photo sits above or beside it within the compact cap. Switch both to `next/image`.
- Mobile: team photo first (human first), reception second, in a swipe row or one image only; stepper full width.
- Copy: shorten the lede to two sentences. The "Consultation" line says "with Dr. Md. Siraj Ur Rahman": the owner confirms it is accurate for every visit; otherwise use "with a Neodent specialist".
- Button: "Explore your visit" currently points at `#contact`, which may not exist on the home page. Change the label to "Plan your visit" and link it to `/clinic`, or to the contact block (verify the anchor exists).
- Motion: the stepper line draws as you scroll; steps fade in in sequence.

Acceptance: no indentation drift; stepper reads clearly on 360 px; images within the cap.

### 6.8 Spaces designed around care

Files: `components/sections/SpacesDesignedAroundCare.tsx` + `.module.css`, branch data in `lib/site-data.ts` (`mehdipatnam*`, `nampally*`).

Decisions:
- Desktop: the right column holds one primary image that fills the column height (within `--media-max-h`) with the second photo as a smaller inset, so no blank block remains above the photos.
- Add an "Open now" or "Opens at 4:00 PM" chip, calculated from each branch's hours (Mehdipatnam: 4:00 to 8:00 PM, Sunday holiday). Show it for Nampally only if `nampallyHours` has data.
- Keep the branch switcher; the whole panel crossfades on change.
- Mobile: branch switcher as a two-button segmented control at the top; the two photos as a swipe row; address, phone and hours as a compact list; Call and Directions as two full-width buttons.
- Remove the "Two locations. One Neodent standard." footer strip if it repeats the heading.

Acceptance: no empty zone beside the photos; both branches work on mobile; call and directions are one tap.

### 6.9 Final call-to-action, footer, mobile bar

Files: `components/sections/ContactNextStep.tsx` + `.module.css`, `components/layout/Footer.tsx` + `Footer.module.css`, `.mobile-bar` rules in `globals.css`, `components/Home.tsx`, `components/ui/LeadCapture.tsx`, `app/api/enquiry/route.ts` (read only; reuse its schema).

Decisions:
- Replace the single "Send an enquiry" link with a short consultation block: headline ("Book a consultation"), one line of reassurance, click-to-call buttons for both clinics (Mehdipatnam and Nampally with their numbers), opening hours, and a compact form (name, phone, clinic, optional treatment, optional message) posting to the existing `/api/enquiry` route. Reuse its validation. Include a consent line linking to `/privacy-policy`, a success state and an error state.
- Footer: replace "Changing smiles since decades." with "Changing smiles since 1994."; remove the ghost "1994"; keep the layout.
- Mobile bar: hidden while the hero's primary button is visible; safe-area padding; the area under the footer takes the footer colour.
- LeadCapture modal (opens at 50% scroll): confirm it closes with Escape, backdrop and the close button, and traps focus. On mobile it should not appear before about 70% scroll. Do not redesign it in this run.

Acceptance: a visitor can call either clinic or submit the form without leaving the block; form works end to end against the existing route; the footer has no ghost numeral.

### 6.10 Page-wide polish (after P1 to P9)

- Rhythm: check dark/light alternation, the spacing scale, and that every section starts with a clear heading.
- Typography: vary the red italic accent; check line lengths (about 60 to 75 characters).
- Motion: one consistent timing curve and distance.
- Page length: total mobile height at or under about 12,000 px.
- Run the audit script at all six viewports; zero media-height failures; zero overflow.

---

## Part 7. "Since 1994" spec

The doctor wants 1994 highlighted because it is the clinic's authority and benchmark.

Where it appears:
1. Hero slide 1: tagline "Specialist dental care in Hyderabad · Since 1994" and a "Since 1994 / Mehdipatnam · Nampally" glass card beside the head (P1b replaced the badge on the portrait frame; P1c places the card at the upper left of the portrait, clear of the face).
2. Stat strip: first stat is "32 years" (calculated), label "of specialist care, since 1994".
3. Seam card: "Specialist-led care. Since 1994."
4. 1994 section: solid "1994" lockup with a rule that draws toward "Today".
5. Footer: "Changing smiles since 1994."
6. Structured data: add `foundingDate: "1994"` to the `Dentist` object in `lib/structured-data.ts`.
7. Later (navigation pass): "Dental Hospitals · Since 1994" in the logo lockup (`components/layout/BrandLockup.tsx`).

Never as a faint watermark.

---

## Part 8. Inputs the owner needs to supply

| Item | Needed for | If missing |
|---|---|---|
| Two portraits (Dr. Asiya Siraj, Dr. Safoora Talha) | P5 | Placeholder cards stay |
| Seventh doctor: name, credentials, years of experience, role | P5 | The card is left out; do not invent |
| 3 to 6 real Google reviews, verbatim (reviewer name as shown) | P6 | The section shows one review plus the rating summary |
| Nampally opening hours (if not already in `nampallyHours`) | P8 | No "Open now" chip for Nampally |
| Confirm "consultation with Dr. Md. Siraj Ur Rahman" is true for every visit | P7 | Use "with a Neodent specialist" |
| Approve an English caption for the Siasat cutting | P1, P3 | No caption shown |
| Verify "25,000+" patients and the combined 418 review count | P2, P3 | Keep as is with the existing note |
| Optional: 3 or 4 real clinic milestones with years | P3 | Timeline is 1994 to Today only |

Proposed English caption for the Siasat Daily cutting (my reading of the Urdu headline; the clinic must confirm): "Dental implants: a modern revolution in making permanent teeth. Camp at Neodent Dental Hospital, lecture by Dr. Mohd. Siraj Ur Rahman." The cutting is dated "Fri. 25 Nov"; the year is not visible, so do not state one.

---

## Part 9. Decisions log

| Decision | Reason |
|---|---|
| Section-by-section execution, with a foundation run first | Reviewable diffs, easy revert, per-section mobile checks |
| Media capped at about 70% of `dvh` | Owner's rule; keeps a whole image visible on a 650 px laptop viewport and on phones |
| Cropping allowed for photos; `contain` plus zoom for documents | Old "never crop" policy produced oversized images |
| No new animation libraries | Mobile performance; CSS plus a small hook covers the need |
| Remove numbering, ghost numerals and blueprint decoration | Owner's "no AI design taste" rule |
| Doctors: 2 leadership cards plus 5 specialists | Seven doctors, no orphaned grid cell, removes the duplicate Dr. Siraj card |
| Horizontal swipe rows on mobile | Cuts page length without removing content |
| "32 years" calculated from 1994 | Accurate, never goes stale |
| Keep the audit and prompts outside `public/` | Files in `public/` are served on the live site |
| (Rev 2) SEO / AEO / GEO outrank copy trims; text is relocated, never silently deleted | Owner: SEO is as critical as the design; the design passes cut copy that carried keywords and entity facts |
| (Rev 2) Two-layer content: a short designed surface plus a full-depth layer (disclosure, FAQ, linked page) in server-rendered HTML | Keeps the clean look and the search coverage |
| (Rev 2) Content preservation check (JS disabled, old commit vs current) is part of "done" for every run, home and internal pages | Makes losses visible per run instead of discovered afterwards |
| (Rev 2) Mobile length budget is measured with disclosures collapsed | Lets depth text exist without growing the page |
| (Hero, 30 Oct) Pattern raised to about 0.14 to 0.16 effective opacity (0.10 to 0.12 on phones), kept as a mask, zero difference behind the headline | P1b's 0.08 differed from plain black by only 1 to 4 levels; the owner wants the old banner's textured look. A CSS `background-image` pattern became the LCP element, so the mask stays |
| (Hero, 30 Oct) The red accent token stays | The red phrase measures 3.35 to 3.48:1 on the glow background, which passes the 3:1 large-text rule; changing the token would affect the whole site |
| (Hero, 30 Oct) Slide 1 portrait stays unframed, with glass cards beside the head and below the hands | Frames looked boxed in; cards must never cover the face, hands or microphone |
| (Hero, 30 Oct) Media on slides 2 and 3 grows to about 62 to 66% of the hero height, within `--media-max-h` | The hero looked empty; the owner's rule still caps every image at about 70% of the viewport |
| (Hero, 30 Oct) No photo zoom, no floating call button over the hero, and no call card at 767 px and below | 80% of traffic is mobile; the primary button already carries the number |
| (Hero, 30 Oct) Hero SEO rules in Part 6.1d bind every hero run; the hero stays outside the S-series, and its 18 "hero pass" ledger rows are checked in section (g) of `SEO_CONTENT_DIFF.md` after each hero run | Design polish must not remove indexable hero text; one h1 with entity words (R3) |
| (Hero, 30 Oct) Lighthouse is measured on a production build, median of at least five alternating runs, hero change no more than 3 points below the previous pass | Dev-server numbers are meaningless and the machine's speed drifts during a session |
| (Hero, 30 Oct) A score above about 9.3 needs a re-cut portrait and a better interior photo, not more code | The remaining flaws (light rim, gold lapel mark, wide-angle distortion) are in the source images |

---

## Part 10. Prompt pack

Paste one prompt per run, in order. Each prompt tells the agent to read this file, so the file must be in the repo. Replace the bracketed fields in P5 before running it.

### P0. Foundation

```
Task: Prepare shared foundations for the Neodent home page redesign. Do not change any visible section design in this run.

Read first (binding): HOME_REDESIGN_REFERENCE.md (find it by filename in the repo, likely in docs/home-redesign/). Read Parts 2, 3 and 5. Also read AGENTS.md in the project root; this Next.js version has breaking changes, so consult node_modules/next/dist/docs/ before writing framework-specific code.

Build:
1. Media tokens in app/globals.css (near the existing :root tokens): --media-max-h: min(68dvh, 680px) and --media-max-h-compact: min(52dvh, 520px), each preceded by a vh fallback line. Add two small utility classes, .media-frame and .media-frame--compact, that apply the token as max-height with overflow hidden, object-fit: cover children and a CSS variable for object-position (--focal, default 50% 50%). Add .media-frame--document that uses object-fit: contain. Do not apply them to any section yet.
2. Motion primitives, no new dependencies:
   - components/motion/Reveal.tsx: a client component wrapping children, using IntersectionObserver (one-shot) with props: as, delay, stagger (applies incremental delay to direct children via CSS custom property), variant ("rise" | "fade" | "mask"). Respect prefers-reduced-motion (render final state, no transform).
   - components/motion/CountUp.tsx: counts from 0 to a target number when in view, formats with Indian digit grouping where appropriate, shows the final value with no animation under reduced motion and during SSR (no hydration mismatch).
   - A small stylesheet for the variants, imported once. Only animate transform and opacity. Use @supports (animation-timeline: view()) for any scroll-linked effect, with the observer as fallback.
   Look at components/sections/about/useReveal.ts and the data-reveal pattern in components/sections/LegacyStory.tsx and extend or reuse them rather than duplicating. Do not migrate existing sections in this run.
3. Brand and date constants in lib/site-data.ts: ESTABLISHED_YEAR = 1994 and a helper yearsSinceEstablished() returning new Date().getFullYear() - ESTABLISHED_YEAR. Do not change existing text yet.
4. scripts/home-viewport-audit.mjs using the Playwright already in devDependencies. For each viewport (360x740, 390x844, 768x1024, 1366x650, 1536x730, 1920x1080) load BASE_URL (default http://localhost:3000/), scroll the page gradually so reveals fire, then report: (a) every img, video and [data-media] element rendering taller than 70% of the viewport height, excluding elements marked data-media-exempt; (b) horizontal overflow (documentElement.scrollWidth > innerWidth) and the elements that extend past the right edge; (c) on viewports 768 wide or less, links and buttons smaller than 44x44 CSS px; (d) visible text smaller than 12 px; (e) total page height. Save one screenshot per section (use each section's id or class) to .audit/home/<viewport>/ and add .audit/ to .gitignore. Print a summary table and exit with code 1 if (a) or (b) has findings.
5. Run the audit once and save the output as the baseline in HOME_REDESIGN_CHANGELOG.md (create it next to the reference file) under "Baseline".

Do not: edit any section component, change copy, or add dependencies.
Verify: npm run build passes, npm run lint passes, the audit script runs against npm run dev.
Report: files created or changed, the baseline summary, anything in the reference file you found inaccurate.
Leave all changes uncommitted.
```

### P1. Hero

```
Task: Redesign the Hero of the Neodent home page. Work on the hero only.

Read first (binding): HOME_REDESIGN_REFERENCE.md. Read Part 3 (global rules) and Part 6.1 (Hero) and Part 7 (Since 1994). Also read AGENTS.md.

Files you may edit: components/hero/Hero.tsx, the hero rules in app/globals.css (.hero, .hero-slide, .hero-founder*, .hero-record*, and related hero classes), the hero data in lib/site-data.ts (heroSlideMeta, heroBranches, heroRecordItems), and components/Home.tsx only for the mobile call bar visibility. Anything else: stop and explain.

Do:
- Make the hero fit within 100dvh minus the nav height on 1366x650, 1440x900 and 390x844, with headline, supporting line and primary button visible without scrolling.
- Every slide shows the same two actions: primary "Call for Consultation" and secondary "Send an enquiry".
- Slide 1: keep the headline "Three decades of changing smiles." Replace the tagline with "Specialist dental care in Hyderabad · Since 1994". Remove the ghost "30+". Add a "Since 1994" badge on the portrait frame, styled like the existing "2 Hyderabad locations" tag.
- Slide 2: headline "Two clinics. One standard of care." Remove the old headline, the italic tagline, the ghost "01 / 02" and the 01 / 02 captions. Both photos the same height within var(--media-max-h-compact), with aligned captions. Branch rows stay tappable.
- Slide 3: keep "Recognised beyond the clinic." Remove the ghost "03", the rotated edge label and any i / ii / iii styling. If an approved English caption for the Siasat cutting exists in the reference file, use it; otherwise leave it out.
- Replace the "01 / 03" style counters with progress dots that fill over HERO_AUTOPLAY_MS. Pause autoplay on hover, focus and touch, and stop it under prefers-reduced-motion. Crossfade with a slight translate.
- Mobile: headline and primary action first, images as a compact strip of at most 38dvh below. All slides share one height so the page does not jump. Hide the fixed .mobile-bar while the hero primary button is visible (IntersectionObserver), restore it after.
- Motion: use the Reveal primitive from P0 for the headline line-mask reveal and the portrait mask reveal; badge fades in after about 400 ms.

Do not: change other sections, add dependencies, add numbering or ghost numerals, or change the colour or type system.

Verify: run node scripts/home-viewport-audit.mjs before and after; hero has no media-height failures and no overflow at 360 px; npm run build and npm run lint pass; check all three slides at 390x844 and 1366x650 and describe what you see.
Report: add an entry to HOME_REDESIGN_CHANGELOG.md (files changed, before/after audit numbers, open issues). Leave changes uncommitted.
```

Status: P1 has been run. Its visual details were then superseded by P1b and P1c below; its structure, copy and controls still stand. Its "Do" list says nothing about SEO, so the hero rules in Part 6.1d apply on top.

### P1b. Hero background and staging (run 30 Oct 2026; record only, do not run again)

Spec as implemented is in Part 6.1b. Result: the audit exits 0; the hero fits at 1366x650, 1440x900 and 390x844; Lighthouse (production build, six alternating runs) P1 median 40 vs P1b median 38. Open items it reported, which P1c resolves: pattern too faint (1 to 4 levels at 0.08), weak glow on slides 2 and 3, small media on slides 2 and 3, photo zoom still running on phones, floating call button covering the strip at 360 px, pause button area, portrait scale and card placement. Not resolved by code: portrait cut-out rim and gold lapel mark (need a re-cut), red headline at 3.35 to 3.48:1 (passes the 3:1 large-text rule; token unchanged).

### P1c. Hero polish: visible pattern, stronger glow, larger media

```
Task: Hero polish pass P1c for the Neodent home page. Work on the hero only (section#home). P1 and P1b are done and uncommitted; build on them. This pass makes the background pattern visible, strengthens the red glow on slides 2 and 3, enlarges the media on slides 2 and 3, rebalances the slide 1 portrait and cards, and fixes the mobile and performance details.

Read first (binding): docs/home-redesign/NEODENT_HOME_REDESIGN_REFERENCE.md: Part 3 (global rules), Part 6.1 including 6.1a to 6.1e, Part 7, and Part 14 (SEO / AEO / GEO rules; they override any instruction here that would delete, shorten or move text). Also read the "P1b Hero background and staging" entry in HOME_REDESIGN_CHANGELOG.md and AGENTS.md.

Files you may edit: components/hero/Hero.tsx; the hero block of app/globals.css (the P1/P1b hero block only); the hero data in lib/site-data.ts (heroSlideMeta, heroBranches, heroRecordItems, plus one new constant for the portrait path); components/Home.tsx only for the call-button logic in E. Anything else: stop and explain. Do not edit or replace the portrait image file.

A. Make the pattern visible. P1b measured the icon pattern at 1 to 4 levels (0 to 255) of difference from the plain background, so the hero still reads as black. Raise it to a visible texture: about 10 to 16 levels of pixel difference along the media edge and around the media cluster, which is roughly 0.14 to 0.16 effective opacity on desktop and 0.10 to 0.12 on phones. Keep the luminance mask-image approach (do not go back to a CSS background-image; it made the pattern the LCP element). Behind the headline and the supporting line the difference must stay 0 (keep the radial mask that reaches 0 before the copy column). Rerun the pattern check and report the numbers for the media edge and for the headline box.

B. Strengthen the glow on slides 2 and 3. Start around rgba(215,25,32,0.30 to 0.34) (slide 1 stays about 0.30). Keep it centred behind the media with --glow-x and --glow-y and make sure it never reaches the headline. Rerun the contrast check: ivory headline at least 16:1, supporting line at least 8.8:1, red accent at least 3:1 as large text. Do not change the red colour token.

C. Enlarge the media on slides 2 and 3 to about 62 to 66% of the hero height at 1366x650, 1440x900 and 1920x1080, always within var(--media-max-h). Slide 2: two photos of the same height, the Nampally card still offset lower, the whole "NEODENT DENTAL HOSPITAL" sign readable, captions on the photos, links to /clinic/mehdipatnam and /clinic/nampally unchanged. Slide 3: the Siasat cutting stays whole (object-fit: contain) with its solid caption band; the broadcast and awards plates beside it. Photos use object-fit: cover with the focal point; documents use contain. No card may be more than 35% empty. Do not remove any caption, link or alt text.

D. Slide 1 portrait. Scale the portrait up 12 to 15% and anchor it to the right of its column, with the centre of the head about 30% down the stage. Place the "Since 1994 / Mehdipatnam · Nampally" glass card at the upper left beside the head and the click-to-call glass card at the lower right, below the hands. No card may cover the face, the hands or the microphone, and a card may overlap the figure by at most 25%. Move the portrait path into one constant in lib/site-data.ts so a re-cut file can be dropped in later without touching Hero.tsx. Keep next/image with priority on the portrait.

E. Mobile (767px and below). No photo zoom at all. Hide the site's floating call button while the hero is in view and restore it when the hero is out of view (an IntersectionObserver; the existing .mobile-bar logic is the model). Keep the call card hidden at this width (the primary "Call for Consultation" button carries the number). Keep the glow breathing and pattern drift off. Check 360x740, 390x844 and 768x1024: no overflow, no card or caption covered by another control, headline and primary action in the first screen.

F. Pause button. The tap area is at least 44 x 44 CSS px and does not overlap the dot buttons.

G. Performance. The portrait remains the LCP element. Measure Lighthouse mobile on a production build (npm run build and npm run start, never next dev): median of at least five runs, alternating P1b and P1c builds. P1c must not be more than 3 points below P1b. If it is, remove the cost (for example the pattern layer's size) before finishing, and say what you did.

SEO / AEO / GEO (Part 14, binding): do not delete, shorten or hide any hero text. One h1 on the page with the supporting line "Specialist dental care in Hyderabad · Since 1994" kept visibly directly under it; slides 2 and 3 use h2; all three slides' text stays in the server HTML (inert and aria-hidden are fine, display: none is not); keep every link, caption and descriptive alt text; decorative layers are aria-hidden; the phone number and clinic names come from lib/site-data.ts. Do not add schema, aggregateRating or an English Siasat caption.

Do not: touch other sections, add dependencies, add numbering, ghost numerals, corner brackets, registration marks or edge labels, change the colour tokens or the type system, or commit.

Verify: run node scripts/home-viewport-audit.mjs before and after (exit 0, no media over 70% of the viewport, no overflow at 360). Run scripts/seo-content-audit.mjs and compare the hero headings, links and alt texts (section g of the report) against the baseline; nothing may be lost. Screenshots of all three slides at 1366x650, 1440x900, 1920x1080, 390x844 and 360x740 into .audit/hero-p1c/ (and before copies next to them), then describe what you see on each slide. Confirm the hero fits inside 100dvh minus the nav at 1366x650, 1440x900 and 390x844. Run npm run build, npx tsc --noEmit and eslint on the files you changed.
Report: add a P1c entry to HOME_REDESIGN_CHANGELOG.md (files changed, before and after audit numbers, pattern, contrast and Lighthouse numbers, content preservation line, open issues). Leave all changes uncommitted.
```

### P2. Stat strip, "Care begins", seam card

```
Task: Redesign the "Why Neodent" stat strip, the "Care begins the moment you walk in" block, and the Dr. Siraj seam card.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.2, Part 7. Also AGENTS.md.

Files you may edit: components/sections/ExperienceIntro.tsx and its exp-intro-* rules in app/globals.css, components/sections/SeamCard.tsx and SeamCard.module.css, lib/site-data.ts (only for the tour video offset or poster if needed). Nothing else.

Do:
- Stat strip: four numbers in this order: years since 1994 using yearsSinceEstablished() with label "of specialist care, since 1994"; "2" clinics; "418" Google reviews ("across both clinics", 261 + 157); "25,000+" patients treated (keep the existing note that this figure is client-supplied and must be verified). Remove the word "Multi-speciality". Use CountUp. One compact row on desktop; 2 x 2 grid on mobile with no overflow at 360 px.
- "Care begins": use the shortened two-paragraph copy from Part 6.2, with at most two highlighted phrases. Keep the Calm / Precise / Personal card.
- Media: the current desktop clip is mostly a red pillar. Extract frames from the tour video with ffmpeg at 1 s steps into a scratch folder, choose the segment with the clearest wide interior, and start playback from that offset; or use a still interior photo. One media item only, using the media-frame class and var(--media-max-h). Video rules from Part 3.4.
- Seam card: replace the "We maintain peak performance" quote with the statement "Specialist-led care. Since 1994." attributed to "Neodent Dental Hospital". Drop the portrait (Dr. Siraj appears in the hero and the next section). Keep the seam-overlap behaviour and its padding variables.
- Remove ghost numerals, the rotated "NEODENT / ARRIVAL / 01" label, decorative arcs and registration marks in this block.
- Migrate this block's reveal to the Reveal primitive.

Do not: change other sections, add dependencies, or invent facts.

Verify: audit before and after; no overflow at 360 px; the intro composition (heading plus media) fits 1366x650; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P3. 1994 / Legacy section

```
Task: Redesign the "Decades of changing smiles" (1994) section.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.3, Part 7, Part 8. Also AGENTS.md.

Files you may edit: components/sections/LegacyStory.tsx and LegacyStory.module.css. Nothing else.

Do:
- Remove the chapter labels (01 to 04), the ghost "1994" and the roman-numeral captions.
- Add a real "Since 1994" lockup at the top: a solid DM Serif "1994" beside "Established in Hyderabad", and a hairline that draws toward "Today" as the user scrolls (CSS scroll-driven animation inside @supports with an observer fallback). If real milestones were supplied in the reference file, place them on the line; otherwise show only 1994 and Today.
- Keep the Dr. Siraj card (name, role, 30+ years, three credential rows). Reduce the two paragraphs to one.
- Press: the Siasat cutting uses the document frame (object-fit: contain), tap-to-zoom, within var(--media-max-h), with the approved English caption if one exists in the reference file. News18 and the ceremony photo become two compact thumbnails. On mobile the three press items become a scroll-snap row.
- Closing band: merge the "25,000+" card and the red "Different generations. One standard of care." card into one band, with the number vertically centred. Fix the mobile bug where the red card is cut off by the next section and its "1994 to Today" line is hidden. If "25,000+" is already shown in the stat strip, keep only one of the two.
- No card may be more than 35% empty.
- Use Reveal and CountUp from P0.

Do not: change other sections, add dependencies, or invent milestones or dates.

Verify: audit before and after; the red card is complete at 360 and 390 px; the press plate fits the viewport and zooms; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P4. Treatments

```
Task: Polish the "What can we help you with?" treatments section.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.4. Also AGENTS.md.

Files you may edit: components/sections/Expertise.tsx, components/sections/expertise-data.ts, the treatment-atlas* rules in app/globals.css. Nothing else.

Do:
- Reduce the two intro paragraphs to one. Remove the floating tooth-and-mirror video on mobile; on desktop remove it or make it compact so no blank zone is left.
- Cards: card height fits content (no gap between description and footer); every card shows its icon in every state (the active Composite card currently shows none).
- Fix the detail panel label so it matches the selected card (Composite Build-up currently shows "REAL CASE / COMPOSITE SMILE DESIGN"). Check every treatment's label in expertise-data.ts.
- Replace the triangle mosaic over the patient's eyes with a mouth-only crop using object-position on the existing media (no eyes visible). The before/after slider stays.
- Mobile: after tapping a card, scroll the detail panel into view; panel media within var(--media-max-h-compact).
- Motion: crossfade the panel on selection; card hover lift; staggered card reveal (Reveal primitive).

Do not: change copy claims, add treatments, change other sections, or add dependencies.

Verify: audit before and after; click through all seven cards on desktop and mobile and confirm labels, icons and media; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P5. Doctors (fill the brackets first)

```
Task: Rebuild the "A steady hand. A human approach." doctors section for seven doctors.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.5, Part 8. Also AGENTS.md.

Inputs (owner fills these before running):
- Portrait for Dr. Asiya Siraj: [PATH IN public/assets]
- Portrait for Dr. Safoora Talha: [PATH IN public/assets]
- Seventh doctor: name [NAME]; credentials [CREDENTIALS]; years of experience [YEARS]; role [ROLE]; no portrait (use a monogram)

Files you may edit: components/sections/ClinicalLeadership.tsx and ClinicalLeadership.module.css, lib/clinical-team.ts. You must also check that components/clinic/branch/BranchClinicalTeam.tsx still renders correctly (it uses the same data); edit it only if needed to keep it working. Nothing else.

Do:
- Layout: two leadership cards (Dr. Mohd. Siraj Ur Rahman, Founder and Director; Dr. Md. Miftah Ur Rahman, Assistant Director), then a row of five specialists (Muti, Asiya, Safoora, Muqeet, and the seventh doctor).
- Leadership card: portrait (4:5, var(--media-max-h-compact)), name, role, three credential rows, "View profile" link (Dr. Miftah to /doctors/dr-miftah-ur-rahman; for Dr. Siraj find the most relevant existing page, for example the founder section of /about).
- Cut Dr. Miftah's four paragraphs to one short paragraph. Remove the six-image portfolio and the two videos from the home page; keep one compact "Dr. Miftah at work" band linking to his profile. Do not delete the components that /doctors/dr-miftah-ur-rahman still uses.
- Remove the duplicate Dr. Siraj card from the team row.
- Team row cards: uniform 4:5 frame, same head position and backdrop. Use the two new portraits. If a portrait's background does not match the existing cutouts, do not hack it: use it in a neutral uniform frame and report it.
- Seventh doctor: monogram plate (initials in DM Serif on the same dark frame, subtle tooth mark), no "portrait not available" text, placed last.
- In lib/clinical-team.ts remove numbering from the label strings (for example "01 / SENIOR CLINICAL LEADERSHIP"), add a role field if useful, add the seventh doctor. Do not invent credentials; if any bracketed field above is still unfilled, leave that doctor out and say so.
- Mobile: leadership cards stacked; specialists in a scroll-snap row (cards about 62 to 70vw). Remove the letterboxed black band under any video; use the video's own aspect ratio or object-fit: cover.
- Try the section on the light paper background and report which looks better; keep dark if it clearly looks better.
- Use Reveal for a staggered card rise.

Do not: invent doctor details, change other sections, or add dependencies.

Verify: audit before and after; seven doctors visible, no placeholder text, no numbering; mobile section height about half of before; BranchClinicalTeam still renders on /clinic/nampally; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P6. Patient stories

```
Task: Redesign the "What patients say" section.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.6, Part 8. Also AGENTS.md.

Reviews supplied by the owner (verbatim, with reviewer names as shown on Google): [PASTE 3 TO 6 REVIEWS HERE, or write NONE]

Files you may edit: components/sections/PatientStories.tsx and PatientStories.module.css. Nothing else.

Do:
- Lead with a rating summary: Mehdipatnam 4.3 (261 reviews) and Nampally 4.6 (157 reviews), plus "418 reviews across both clinics", with the existing "rating as shown on the Google listing; it may have changed since" note, and links to the Google listings that already exist in the project.
- Build a swipeable review list (scroll-snap on mobile, a three-up row on desktop). The existing review (Gaddam Sanjeeva) is included. Add only the reviews pasted above; never invent a review or reviewer. The section must still look complete with a single review.
- The patient video, if kept: compact card (square or 4:5, var(--media-max-h-compact)), cropped tightly so the blur is not the main visual, caption "Not at all, not at all.", paused when off-screen.
- Remove the empty area to the right of the heading and the large gap at the bottom.
- Reveal staggered cards; CountUp on the rating.

Do not: change other sections, add dependencies, or remove the existing review.

Verify: audit before and after; the section fits one 1366x650 viewport on desktop; works with one review and with six; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P7. What to expect

```
Task: Redesign the "What to expect from a visit" section.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.7. Also AGENTS.md.

Files you may edit: components/sections/WhatToExpect.tsx and WhatToExpect.module.css. Nothing else.

Do:
- Replace the stair-stepped list with a clean left-aligned vertical stepper: a line with a dot per stage, title and one-line description each. No numbers.
- Photos: the tall reception photo uses the media-frame class with var(--media-max-h) and a deliberate object-position (red railings and chairs). The team photo sits within var(--media-max-h-compact). Switch both from raw img to next/image with correct sizes. Remove the older "never crop" assumptions in the comments.
- Mobile: team photo first, reception second (one image or a scroll-snap row, never two big stacked images); stepper full width and readable at 360 px.
- Shorten the lede to two sentences, keeping the meaning.
- The "Consultation" step: if the reference file has no owner confirmation, change "with Dr. Md. Siraj Ur Rahman" to "with a Neodent specialist".
- The button: label "Plan your visit"; link to /clinic (or to a contact anchor that actually exists on the home page; verify).
- Motion: the stepper line draws with scroll; steps fade in in sequence (Reveal).

Do not: change other sections, add dependencies, or add step numbers.

Verify: audit before and after; no indentation drift; images within the cap on all six viewports; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P8. Spaces designed around care

```
Task: Redesign the "Spaces designed around care" section.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.8. Also AGENTS.md.

Files you may edit: components/sections/SpacesDesignedAroundCare.tsx and SpacesDesignedAroundCare.module.css; branch data in lib/site-data.ts only if a missing field is needed. Nothing else.

Do:
- Desktop: the right column has one primary image filling the column height within var(--media-max-h) (object-fit: cover with a focal point per image) and the second photo as a smaller inset. No blank block above the photos. Remove the old "never cropped / no object-fit" comment and behaviour.
- Add an "Open now" or "Opens at 4:00 PM" chip, calculated from each branch's hours using the Asia/Kolkata time zone (Mehdipatnam 4:00 to 8:00 PM, Sunday holiday). Show it for Nampally only if nampallyHours contains data.
- Keep the branch switcher; crossfade the whole panel on change.
- Mobile: two-button segmented control at the top; the two photos as a scroll-snap row; address, phone and hours as a compact list; Call and Directions as two full-width buttons (44 px or taller).
- Remove the "Two locations. One Neodent standard." strip if it repeats the heading.

Do not: change other sections, add dependencies, or invent hours or addresses.

Verify: audit before and after; no empty zone beside the photos at 1366x650 and 1920x1080; both branches work on mobile; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P9. Final call-to-action, footer, mobile bar

```
Task: Rebuild the final call-to-action block, fix the footer and the fixed mobile bar.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Part 3, Part 6.9, Part 7. Also AGENTS.md. Read app/api/enquiry/route.ts first and reuse its validation; do not change it.

Files you may edit: components/sections/ContactNextStep.tsx and ContactNextStep.module.css, components/layout/Footer.tsx and Footer.module.css, the .mobile-bar rules in app/globals.css, components/Home.tsx (mobile bar only). Nothing else; in particular do not redesign components/ui/LeadCapture.tsx.

Do:
- Replace the single "Send an enquiry" link with a consultation block: headline "Book a consultation", one reassuring line, click-to-call buttons for both clinics (Mehdipatnam and Nampally with their numbers from lib/site-data.ts), opening hours, and a compact form (name, phone, clinic, optional treatment, optional message) posting to the existing /api/enquiry route with the same field names and validation. Include a consent line linking to /privacy-policy, a loading state, a success state and an error state. Labels visible, inputs 44 px or taller, correct inputmode for the phone field.
- Footer: replace "Changing smiles since decades." with "Changing smiles since 1994."; remove the ghost "1994".
- Mobile bar: hidden while the hero's primary button is visible (if P1 did not already do this, do it now); respect env(safe-area-inset-bottom); the page area beneath the footer must be the footer's colour, not cream.
- Check LeadCapture only for: closes on Escape, backdrop and the close button; focus is trapped; on mobile it does not open before about 70% scroll. Change only the scroll threshold in components/Home.tsx if needed, and report anything else.

Do not: change the API route, add dependencies, or add numbering.

Verify: submit the form against npm run dev (with the existing environment settings) and report the result; audit before and after; build and lint pass.
Report: HOME_REDESIGN_CHANGELOG.md entry. Leave changes uncommitted.
```

### P10. Whole-page QA and polish

```
Task: Whole-page QA of the Neodent home page after P1 to P9. Fix what is wrong; do not redesign sections.

Read first (binding): HOME_REDESIGN_REFERENCE.md, Parts 3 and 6.10, and HOME_REDESIGN_CHANGELOG.md. Also AGENTS.md.

Do:
- Run node scripts/home-viewport-audit.mjs at all six viewports. Fix every media-height failure, every overflow and every tap target under 44 px.
- Check the mobile page height (target about 12,000 px or less) and report per-section heights.
- Search the home page components for leftovers: numbered labels, ghost numerals, roman-numeral captions, rotated edge labels, "since decades", "since 3 decades", "NeoDent" in running text, "portrait not available". Fix them.
- Check spacing rhythm, dark and light alternation, heading hierarchy (one h1, sensible h2/h3 order), consistent reveal timing, and that reduced-motion shows final states everywhere.
- Check Lighthouse (mobile) for performance, accessibility and SEO, and report the numbers before and after if a baseline exists.
- Confirm structured data includes foundingDate "1994" in lib/structured-data.ts (add it if missing).
- List remaining issues by priority.

Do not: restyle sections, add dependencies, or touch internal pages or the navigation.

Verify: build and lint pass; audit exits with code 0.
Report: HOME_REDESIGN_CHANGELOG.md entry with the final audit table. Leave changes uncommitted.
```

---

## Part 11. Changelog template

Keep this in `HOME_REDESIGN_CHANGELOG.md` next to this file. The agent appends one entry per run.

```
## <Run id and section>  (<date>)
Files changed:
Summary of changes:
Audit (before -> after): media-height failures / overflow / tap targets / page height
Viewports checked:
Open issues or follow-ups:
Owner inputs still missing:
```

---

## Part 12. Later (out of scope for now)

- Navigation menu: logo lockup with "Since 1994", mobile menu review.
- Internal pages: apply the same media rule, numbering removal and motion system (target 9 to 9.5). Design work only; the SEO content check on internal pages is already in scope (Part 14, S0 and S7).
- Photography: background removal for new doctor portraits if needed, consistent portrait lighting.

---

## Part 13. Status after P10 (30 Oct 2026) and the SEO problem

### 13.1 What has been done (from `HOME_REDESIGN_CHANGELOG.md`)

P0 to P10 have all run. Summary of the state of the home page:

| Area | State |
|---|---|
| Foundation | Media tokens (`--media-max-h`, `--media-max-h-compact`), `.media-frame*` classes, `components/motion/Reveal.tsx` and `CountUp.tsx`, `ESTABLISHED_YEAR` and `yearsSinceEstablished()`, `scripts/home-viewport-audit.mjs` |
| Hero | Three slides, both actions on each, "Since 1994" tag, progress dots, no ghost numerals, fits `100dvh - nav`. P1b (30 Oct): backgrounds, glow, pattern, staged portrait, glass cards, caption overlays; rated 8.0. P1c is the next hero run (Part 10; plan in 6.1a to 6.1e), expected 8.9 to 9.1 |
| Stat strip, Care begins, seam card | Four-number strip (32 / 2 / 418 / 25,000+), copy cut to two paragraphs, seam card reads "Specialist-led care. Since 1994." |
| 1994 / Legacy | Solid "1994" lockup, one founder paragraph, press row with tap-to-zoom, one red "32 years" band |
| Treatments | One intro paragraph, tooth-and-mirror video removed, labels fixed, eyes cropped out, slider bug fixed |
| Doctors | Two leadership cards plus five-person team row (seven doctors, Dr. Hafsa Taha added with monogram), Dr. Miftah text and portfolio removed, light background |
| Patient stories | Rating summary, one mixed row of 5 Google reviews and 3 patient videos (with sound button) |
| What to expect | Vertical stepper, `next/image`, "Plan your visit" |
| Spaces | Branch tabs, "Open now" chip from branch hours, inset photo |
| Consultation block, footer, mobile bar | Call cards and a form posting to `/api/enquiry`, footer "since 1994", mobile bar fixed |
| Whole-page QA | Viewport audit exits 0 (no media over 70% of the viewport, no horizontal overflow). Lighthouse mobile: performance 45 to 46, accessibility 97, best practices 100, SEO 100 |

Open items from P10, by priority (details in the changelog):
1. Mobile page length is about 14,700 px at 360 px wide against the 12,000 px budget (Part 15 changes how this is measured).
2. `npm run lint` fails with 17 errors in navigation, consent and internal-page files that the redesign did not touch. Needs permission to edit those files.
3. Lighthouse mobile performance 45 to 46 (the whole home page is one client component; `globals.css` is large). Structural work, separate from this file.
4. `LeadCapture`: no focus trap, wrong hours text ("10:00 AM - 08:00 PM" every day), mentions only Humayun Nagar.
5. Tone runs: stories and visit share one background; spaces, consultation and footer are three near-identical charcoals.
6. Owner items: Nampally hours conflict (signboard says 10 AM to 7 PM; site data says 10:30 AM to 5:00 PM; **resolved 30 Oct 2026: the site data is correct**, see 13.4), Siasat English caption approval, "25,000+" and 418 verification, consultation-with-Dr.-Siraj confirmation (**resolved 30 Oct 2026: not only Dr. Siraj; all doctors handle all cases**), coat-badge text on Dr. Miftah's cut-out is garbled, some low-resolution portraits.

### 13.2 The problem found after P10

The design runs shortened or removed a lot of indexable text on the home page. SEO, AEO (answer-engine optimisation: being quoted in AI and featured answers) and GEO (generative-engine optimisation and local entity consistency) are mandatory for this site, as important as the design. The first version of this file did not protect text, and some prompts told the agent to cut it.

Known removals and cuts, taken from the changelog. This list is NOT exhaustive; the git diff against the pre-redesign commit (S0) is the source of truth:

| Run | Section | Text or content removed or cut |
|---|---|---|
| P1 | Hero | "Where Neodent is." headline and italic tagline; "Changing smiles since 3 decades"; Press / Public media / Recognition channel cards; phone card on the portrait |
| P2 | Care begins, stat strip, seam card | Four paragraphs cut to two; "Why Neodent" title block and "Multi-speciality" stat; "We maintain peak performance" quote; "Neodent Standard" eyebrow; tour-video caption |
| P3 | Legacy | Chapter labels and their text (Beginning, People, Record, Impact); two founder paragraphs cut to one; separate "25,000+" card |
| P4 | Treatments | Two intro paragraphs cut to one; three highlighted phrases; generic clinical film on the Composite card; case labels reworded |
| P5 | Doctors | Dr. Miftah's four paragraphs, five-item fact list and quote callout; portfolio photos and profile film; duplicate Dr. Siraj card; "portrait not available" cards |
| P6 | Patient stories | Lede line; theme selector ("Comfort and relief" and others) and their quotes (the three videos were later restored); "Explore all patient stories" |
| P7 | What to expect | Lede cut from three sentences to two; "Consultation" line no longer names Dr. Siraj |
| P8 | Spaces | Five highlighted phrases; "Two locations. One Neodent standard." strip |
| P9 | Final block | "Let's make your next step feel simple." card copy |

Note on the old and new screenshots (`old.pdf`, `new.pdf`): they are images with no text layer, so they cannot prove what text was lost. Use git.

### 13.3 Honest view on SEO impact

- Word count is not a ranking factor by itself. What matters is whether each page still covers the topics, places, services and doctors people search for, with clear headings, internal links and consistent business facts.
- A local clinic's home page mostly competes on the brand name and head terms (for example "dentist in Mehdipatnam"). Treatment queries are mainly served by the seven treatment pages and the two location pages, so the home page's job is to cover the entities and link to those pages.
- Even so, the removed copy may have carried secondary keywords, doctor facts and "why choose us" phrasing, so the check in Part 14.3 decides, not guesswork. Restoring everything as visible text is not required: relocating it (disclosure, FAQ, linked page) is enough if it stays in the server-rendered HTML.
- Nobody can promise rankings. The goal is no unexplained loss and a stronger answer-engine and local-entity position.

### 13.4 Repo facts and what happened on the first S0 attempt (30 Oct 2026)

- The repo root is `ClinicWebsite/`; the Next.js app is in its subfolder `Neodent-dental-clinic-nextjs/`. Development is on Windows (paths such as `E:\...`). Branch: `ravi-development`.
- This file lives at `docs/home-redesign/NEODENT_HOME_REDESIGN_REFERENCE.md`. Prompts must refer to it by that exact name.
- **No redesign work has been committed.** P0 to P10 and the hero passes are uncommitted changes on top of commit `0e62178` ("final commit", 28 Oct 2026, the newest commit). The first S0 run found no commit whose message starts with `home:`, so it stopped at step 1 as designed and changed nothing. That was the prompt's wrong assumption (that each design run is committed), not a fault in the repo.
- **Decision (owner-confirmed): the baseline for every content check is commit `0e62178`.** The "current" side is the uncommitted working tree.
- The hero redesign is being worked on separately and the working tree changes while it runs. S0 therefore builds the "current" side from a snapshot copy of the working tree, not in place.
- Hero rows still appear in the S0 ledger, flagged "hero pass". When the hero pass is done, check it against rules R3 to R5 (plain-words `h1` and supporting line, links, alt text).
- **Hero status (30 Oct 2026):** P1 and P1b are done (hero rated 8.0 after P1b: slide 1 8.3, slides 2 and 3 7.8). P1c (visible pattern, stronger glow, larger media on slides 2 and 3, slide 1 portrait and cards, mobile and performance fixes) is the next hero run; it is in Part 10, with the plan in Parts 6.1a to 6.1e. The hero stays outside S2 to S4. After the hero pass, rerun the SEO content audit and check section (g) of `SEO_CONTENT_DIFF.md` against Part 6.1d.
- **S0 result (30 Oct 2026):** 17 routes, 54 removed / 58 shortened / 3,958 kept; home page 50 / 57 / 168 (18 of them hero). All 989 JSON-LD fields kept, 80 blocks parse, `foundingDate` 1994 present, robots.txt, sitemap, canonicals, titles and descriptions identical on both builds. Biggest losses: Doctors -299 words, Legacy -81, Treatments -48. Internal pages lost nothing except the consultation block on `/about` (shared component) and the footer line. Also found: `CountUp` writes each stat number three times into the server HTML; the consultation block lost its `/contact` link; the LeadCapture pop-up still has wrong hours.
- **S1 result (30 Oct 2026):** all 112 rows decided: visible 23, disclosure 11, link 10, drop 47, hold 3, hero-pass 18. Files: `docs/home-redesign/SEO_LEDGER_DECISIONS.md` (per-run tables, directives, owner questions, approved keywords, draft FAQ) and `seo-ledger-decisions.json`. Next run: S2.
- **Owner answers (30 Oct 2026), recorded in `SEO_LEDGER_DECISIONS.md` ("Owner answers") and `seo-ledger-decisions.json`:** the 3 held rows are decided, so the totals are now visible 23, disclosure 13, link 10, drop 48, hold 0, hero-pass 18. (1) Madina Gold Medal (2023), awarded by Commissioner A. K. Khan: approved, disclosure. (2) Dr. Miftah's quote approved with new wording, "Save the natural teeth till the last stage.", disclosure. (3) Consultations are not only with Dr. Siraj: all doctors handle all dental cases, so "a Neodent specialist" stays, and no doctor is portrayed as handling only certain cases. (4) "Smile Designer" is not an official title; it may appear in 1 to 2 places site-wide (the home Doctors card is one). Dr. Miftah is also an expert in single-sitting root canal treatment, to be explained on the treatment pages later. (5) Hours: Nampally 10:30 AM – 5:00 PM, Mehdipatnam 4:00 PM – 8:00 PM (Monday to Saturday, Sunday holiday), which is the current site data; the Nampally signboard is out of date. (6) Lead with "dental hospital".

---

## Part 14. SEO / AEO / GEO rules (binding on every run from now on)

These override Parts 3, 6 and 10 wherever they conflict.

### 14.1 Principle: two layers

Layer 1 is the designed surface: short, scannable, Figma-clean. Layer 2 is the depth: the fuller copy, kept in the page. Layer 2 lives in one of these places, in this order of preference:
1. Visible, if it is a short paragraph that reads well.
2. A disclosure on the same page ("Read more", `<details>`, an accordion, a tab or panel) whose text is in the server-rendered HTML.
3. An FAQ block (Part 14.2, R7).
4. An internal page that already covers it, with a visible link using a meaningful anchor.

### 14.2 Rules

- **R1. No silent deletion.** Every removed or shortened block of indexable text (headings, paragraphs, list items, captions, link anchors, image alt text, JSON-LD fields) needs a line in the content ledger (S0) and a destination: visible, disclosure, FAQ, internal page with link, or intentional drop. Intentional drops are only for wrong, unverifiable, ungrammatical or duplicate text, and each needs a reason.
- **R2. The text must be in the initial HTML.** No text fetched after load, no text created only in `useEffect`. Verify with JavaScript disabled (Part 14.3). Collapsed supporting copy is acceptable (search engines index it), but keep the main paragraph of each topic visible, because some practitioners believe collapsed text carries less weight; that is unproven either way. Never use `display: none` tricks for text no user can open. No hidden text.
- **R3. Headings carry meaning.** The `h1` and each section `h2` must say in plain words what the section is about (service, place, doctor). A poetic headline ("A steady hand. A human approach.") is fine if a visible plain supporting line or `h3` carries the phrase people search for ("Dentists and specialists in Mehdipatnam and Nampally, Hyderabad"). Eyebrows must be plain words, 12 px or larger, never numbered. No keyword stuffing.
- **R4. Internal links keep their anchors.** Every mention of a treatment links to its treatment page and every mention of a clinic links to its location page, with descriptive anchor text. The home page link count (internal and outbound) must not fall below the baseline without a ledger reason.
- **R5. Image alt text stays meaningful.** Descriptive, natural, no stuffing. Decorative elements are `aria-hidden`. Alt text removed with an image goes in the ledger.
- **R6. Structured data stays.** Keep every JSON-LD block. `foundingDate: "1994"` stays on the organisation node. Add schema only for content that is visible on the page. Every JSON-LD block must still parse.
- **R7. AEO: a visible FAQ block on the home page** (run S5): 6 to 8 questions, each answered directly in the first sentence, then one or two sentences of support (about 40 to 70 words), written only from facts already on the site. No invented medical claims, no prices, no outcome promises; the clinic reviews them. Treatment-specific questions belong on the treatment pages (check that those pages have them). `FAQPage` JSON-LD may be added only if it matches the visible text word for word. Google now shows FAQ rich results only for a narrow set of authoritative sites, so do not expect a rich result; the value is for users and for answer engines that extract direct answers.
- **R8. GEO: entity consistency.**
  - Clinic names, addresses, phone numbers and opening hours must be identical in visible text, JSON-LD, footer, contact page and (by owner check) the Google Business Profile.
  - Doctor names, credentials, roles and years must match everywhere; `lib/clinical-team.ts` and `lib/site-data.ts` are the single sources. Dr. Muti Ur Rahman's credentials are MBBS / MD (General Medicine): never describe him as a dental specialist in text or schema.
  - Nampally hours conflict resolved by the owner (30 Oct 2026): Nampally 10:30 AM – 5:00 PM, Mehdipatnam 4:00 PM – 8:00 PM, as in the site data. Apply in S6 to any text that disagrees.
  - Mention Hyderabad, Mehdipatnam and Nampally naturally in headings and supporting lines, not repeatedly in every sentence.
  - Brand spelling: "Neodent" in running text; the schema `name` stays exactly as the Google Business Profile name.
- **R9. Definition of done for every run (S-series and any later design run).** The content preservation check (14.3) runs on the home page and all internal pages; the changelog entry lists removed, restored, relocated and dropped items with reasons; zero unexplained losses; the viewport audit still exits 0.
- **R10. Shared-file caution.** These files affect internal pages, so any change to them needs an internal-page check: `components/ui/EditorialHighlight.tsx` (changed in P10), `components/layout/Footer.tsx` and `Footer.module.css`, the `.mobile-bar` and `.site` rules in `app/globals.css`, `lib/clinical-team.ts` (used by `BranchClinicalTeam.tsx`), `lib/site-data.ts`, `lib/structured-data.ts`, `components/motion/*` (including `CountUp.tsx`), and `components/sections/ContactNextStep.tsx` (also rendered on `/about` through `app/about/AboutClientChrome.tsx`; added after the S0 report).

### 14.3 The content preservation check (the tool built in S0)

`scripts/seo-content-audit.mjs`, no new dependencies (Playwright is already installed).

- **Baseline:** commit `0e62178` (owner-confirmed, see 13.4), the last commit before any redesign work. Check it out with `git worktree add` in a folder outside `ClinicWebsite/`, install and build the app subfolder there, and serve it on another port. Do not modify the repo's working tree for this. If a later commit ever contains the redesign, the baseline stays `0e62178` unless the owner says otherwise.
- **Current:** a snapshot copy of the working tree's app folder (excluding `node_modules`, `.next`, `.audit` and `.git`) placed outside the repo, installed and built there with `next build` and `next start` (production HTML, not the dev server). The snapshot keeps the owner's running dev server and any parallel hero work untouched.
- **Fetching:** Playwright with `javaScriptEnabled: false`, so the script sees exactly what a crawler sees before rendering. Routes come from `app/sitemap.ts` (or `/sitemap.xml`) plus `/`.
- **Per route it extracts:** title, meta description, canonical, robots meta, Open Graph tags, all headings (level and text), all visible text including collapsed `<details>` content, internal and outbound links (href and anchor text), image alt text, every JSON-LD block (parsed, with types and fields), and for the home page the word count per section.
- **Comparison:**
  - Sentence-level match (normalise case and punctuation; token overlap of 0.85 or more counts as "kept"); a sentence with no match is "removed" and one with a partial match is "shortened".
  - Headings, links, alt texts and JSON-LD fields that exist in the baseline but not now.
  - Changed titles, descriptions and canonicals.
  - Routes whose text differs at all, so internal-page regressions from shared files show up.
- **Output:** JSON in `.audit/seo/` and a readable report `docs/home-redesign/SEO_CONTENT_DIFF.md` with a summary table per route and a ledger (id, route, section, old text, status, proposed destination, owner decision column left empty).
- Word count is a diagnostic, not a target.

---

## Part 15. Revised workflow (replaces Part 5 for the next runs)

### 15.1 Order of work

| Run | Scope | Who / model |
|---|---|---|
| S0 | Build the content check, run it, write the diff report and ledger. No site code changes. | Opus 5.5 |
| S1 | Decision session: you and Claude (in chat) assign a destination to every ledger row and approve the keyword and FAQ lists | Claude chat, no agent |
| S2 | Restore per ledger: stat strip / Care begins / seam card, Legacy, Treatments (hero excluded, separate chat) | Opus 5.5 |
| S3 | Restore per ledger: Doctors, Patient stories | Opus 5.5 |
| S4 | Restore per ledger: What to expect, Spaces, Consultation block, Footer | Sonnet 5.5 is fine |
| S5 | AEO: home FAQ block plus matching schema | Opus 5.5 |
| S6 | GEO: consistency pass (names, addresses, phones, hours, doctors, schema) | Opus 5.5 |
| S7 | Whole-site final check: home and internal pages, design and SEO | Opus 5.5 |
| H1 | Hero: run P1c (Part 10), then re-check the hero rows in section (g) of `SEO_CONTENT_DIFF.md` against Part 6.1d. Separate from the S-series | Opus 5.5 |

Model advice (my judgment): S0, S2, S3, S5, S6 and S7 involve judgment about what to keep and where it goes, so use Opus 5.5. S4 is mostly mechanical placement from decided rows. If cost does not matter, use Opus 5.5 for all.

### 15.2 Working method for every run

1. Start `npm run dev`. Run `node scripts/home-viewport-audit.mjs` and `node scripts/seo-content-audit.mjs` before and after.
2. The agent leaves changes uncommitted; you review the diff. Committing is optional for the checks (the baseline is fixed at `0e62178`), but a commit after each reviewed run is a good safety net, for example `seo: restore doctors copy`. Before S0 it also helps to commit the current state on a branch so the working tree stops changing under the audit (see the S0 note in Part 16).
3. The changelog entry uses the template in Part 11 plus one extra line: `Content preservation: removed / restored / relocated / dropped (with reasons)`.
4. Restored text is designed, not dumped: use disclosures, two-column layouts, tabs or the FAQ pattern, and keep every design rule from Part 3 (no numbering, no ghost numerals, no empty cards, media cap, 12 px minimum text, mobile rules).
5. Mobile length budget: about 12,000 px with disclosures collapsed (measured at 360 px wide). An open disclosure may be longer; the collapsed state is what is audited. If SEO and the budget conflict, SEO wins and the overage is reported.

### 15.3 New owner inputs (add to Part 8)

| Item | Needed for | If missing |
|---|---|---|
| Decision on each ledger row (S1) | S2 to S4 | Agent restores nothing without a decision and reports it |
| Approval of the target keyword list the agent proposes in S0 | S1, S5 | Use only phrases already in the baseline text |
| Review of the draft FAQ answers | S5 | Do not publish the FAQ block |
| Final Nampally opening hours | S6 | **Answered 30 Oct 2026:** Nampally 10:30 AM – 5:00 PM, Mehdipatnam 4:00 PM – 8:00 PM (the site data). The 10 AM to 7 PM signboard is out of date |
| Confirmation that Neodent's Google Business Profile names, addresses, phones and hours match the site | S6 | Flag as unverified |

### 15.4 Changelog template addition

```
Content preservation (home and internal pages): removed N / restored N / relocated N / dropped N (reasons)
SEO audit (before -> after): routes with text changes / headings lost / links lost / alt texts lost / JSON-LD blocks changed
```

---

## Part 16. Prompt pack, SEO / AEO / GEO series

Paste one prompt per run, in order. Every prompt begins with the same read-first line.

### S0. Content check, diff report and ledger (read-only for site code)

```
Task: Build the content preservation check and produce the diff report and content ledger for the Neodent site. Do NOT change any file under app/, components/ or lib/ in this run. You may create files under scripts/, docs/home-redesign/ and .audit/ only.

Read first (binding): docs/home-redesign/NEODENT_HOME_REDESIGN_REFERENCE.md, Parts 13, 14 and 15 (especially 13.4), plus HOME_REDESIGN_CHANGELOG.md in the same folder, and AGENTS.md. Repo layout: the repo root is ClinicWebsite/ and the Next.js app is its subfolder Neodent-dental-clinic-nextjs/. Scripts go in the app's scripts/ folder (next to home-viewport-audit.mjs); reports go in docs/home-redesign/.

Scope note: the hero section (section#home) is being redesigned separately. Include it in the audit and the ledger, but mark every hero row "hero pass: no restoration in the S-series". Do not touch or comment on its design.

Do:
1. Baseline commit: the owner has confirmed it is 0e62178 ("final commit", 28 Oct 2026, branch ravi-development), the last commit before any redesign work. The redesign (P0 to P10 and the hero passes) is uncommitted on top of it. Do not search for a "home:" commit and do not ask again. Verify that git rev-parse 0e62178 resolves and that git diff --stat 0e62178 shows the redesign in the working tree; print both. Only if the hash does not resolve, stop and ask.
2. Baseline build: create a git worktree for 0e62178 in a folder outside ClinicWebsite/ (for example a sibling folder such as E:\neodent-baseline-wt), install dependencies in its Neodent-dental-clinic-nextjs/ subfolder and build it. Copy the app's .env* files into the worktree app folder (do not print, log or commit their contents). Serve it with next start on port 3100.
   Current build: copy the working tree's Neodent-dental-clinic-nextjs/ folder (excluding node_modules, .next, .audit and .git) to a snapshot folder outside the repo, install and build it there, and serve it on port 3101. Record the snapshot time. Do not run next build, install packages or edit files in the owner's working tree, and do not use ports 3000 or 3001, because the owner's dev server and other agents may be using the working tree. Remove the worktree and the snapshot folder when you are finished.
3. Write scripts/seo-content-audit.mjs exactly as specified in Part 14.3 (Playwright with javaScriptEnabled false, routes from app/sitemap.ts or /sitemap.xml plus /, per-route extraction, sentence-level comparison with 0.85 token overlap, JSON output in .audit/seo/). It must take BASELINE_URL and CURRENT_URL as environment variables and exit with code 1 if any ledger row has status "removed" with no recorded decision. No new dependencies.
4. Run it. Write docs/home-redesign/SEO_CONTENT_DIFF.md with: (a) a summary table per route (words, headings, internal links, outbound links, alt texts, JSON-LD types, baseline vs current); (b) for the home page, per-section word counts baseline vs current; (c) the full content ledger: id, route, section, old text (verbatim), status (kept / shortened / removed), proposed destination from Part 14.1 with a one-line reason, and an empty "Owner decision" column; (d) a list of routes whose text changed at all, with the likely cause (shared file, see rule R10); (e) check results for robots.txt, sitemap, canonicals, titles, meta descriptions and JSON-LD validity (every block parses); (f) a proposed target-keyword list inferred only from the baseline text and the treatment and location page titles, clearly marked "inferred, owner to approve"; (g) a separate short list of the hero's headings, supporting lines, links and image alt texts, baseline vs current, so the owner can check them after the hero pass.
5. Also check the server-rendered HTML of the current home page for text that is only created after load: compare the JS-disabled text with the JS-enabled text and list anything that appears only with JavaScript.
6. Add the changelog entry (template in Part 11 plus the Part 15.4 lines).

Do not: edit site code, add dependencies, commit, or restore any text yet.
Verify: the script runs end to end against both builds; report the baseline commit hash, the routes covered, and the totals (removed / shortened / kept) so the owner can see the scale.
Leave all changes uncommitted.
```

### S1. Decision session (a chat step, not an agent run)

Upload this file, the changelog and `SEO_CONTENT_DIFF.md` to a new Claude chat and send:

```
I am on S1 of the Neodent SEO series. Using Part 14 of the reference file, go through every row of the content ledger in SEO_CONTENT_DIFF.md and give each one a destination: visible, disclosure, FAQ, internal page with link, or intentional drop (with the reason). Group rows by home section so each S2, S3 or S4 run gets a clean list. Rules: nothing is dropped unless it is wrong, unverifiable, ungrammatical or a duplicate; keep the main paragraph of each topic visible; do not invent facts. Then (1) tidy the proposed keyword list, (2) draft 6 to 8 home-page FAQ questions with answers that use only facts in the ledger, the changelog and the site data, and (3) return the decided ledger as a table I can paste into docs/home-redesign/SEO_LEDGER_DECISIONS.md.
```

Save the result as `docs/home-redesign/SEO_LEDGER_DECISIONS.md` in the repo. The S2 to S4 prompts read it.

### S2, S3, S4. Restore per ledger (one prompt, three runs)

Replace [RUN], [SECTIONS] and [FILES] from this table, then paste:

| Run | [SECTIONS] | [FILES] you may edit |
|---|---|---|
| S2 | Stat strip, Care begins and seam card; Legacy; Treatments (hero excluded) | `components/sections/ExperienceIntro.tsx`, `SeamCard.tsx`, `LegacyStory.tsx` (and their CSS), `Expertise.tsx`, `expertise-data.ts`, the matching rules in `app/globals.css`, `lib/site-data.ts` (legacy data only), `components/motion/CountUp.tsx`, `scripts/seo-audit-run.mjs` (new), `scripts/seo-content-audit.mjs` |
| S3 | Doctors; Patient stories | `components/sections/ClinicalLeadership.tsx`, `PatientStories.tsx` (and CSS), `lib/clinical-team.ts` (text fields only; check `BranchClinicalTeam.tsx` still renders) |
| S4 | What to expect; Spaces; Consultation block; Footer | `components/sections/WhatToExpect.tsx`, `SpacesDesignedAroundCare.tsx`, `ContactNextStep.tsx`, `components/layout/Footer.tsx` (and CSS), `lib/site-data.ts` (branch text only) |

```
Task: [RUN]: restore search-relevant text for these home page sections: [SECTIONS]. Use the decided ledger; change nothing the ledger did not decide.

Read first (binding): NEODENT_HOME_REDESIGN_REFERENCE.md Parts 3, 14 and 15; docs/home-redesign/SEO_LEDGER_DECISIONS.md and SEO_CONTENT_DIFF.md; HOME_REDESIGN_CHANGELOG.md; AGENTS.md.

Files you may edit: [FILES]. Anything else: stop and explain.

Do:
- Decisions are in docs/home-redesign/SEO_LEDGER_DECISIONS.md (table per run, plus "Additional directives" for your run) and seo-ledger-decisions.json. For every ledger row of these sections, apply its decision: visible; disclosure (a button with aria-expanded or a native <details>, with all text in the server-rendered HTML); link (keep a visible link to the internal page and confirm that page still has the text). Skip rows marked drop, hold or hero-pass, and list the hold rows in the report. If a row has no decision, leave it and list it. Rows are matched by id first, then by exact old text (ids change when the old text changes). Also carry out the "Additional directives" for your run.
- Content audit tooling: if scripts/seo-audit-run.mjs does not exist yet (the first run of S2 creates it), write it. It must do what S0 did by hand: create the baseline worktree for 0e62178 outside ClinicWebsite/, copy .env* files without printing them, build and serve it on port 3100, snapshot-copy the working tree app folder, build and serve it on 3101, run scripts/seo-content-audit.mjs, then stop the servers and remove the worktree and snapshot. Later runs reuse it. In the same run, change scripts/seo-content-audit.mjs so that rows carrying the hero note are never counted as undecided.
- Keep the main paragraph of each topic visible; put supporting detail in the disclosure. Never use display:none for text a user cannot open.
- Headings: apply rule R3. Add a plain, visible supporting line or h3 that says what and where (for example the service and "Mehdipatnam and Nampally, Hyderabad") when the headline is brand-poetic. Do not number anything and do not add ghost text.
- Links: restore treatment and location links with their keyword anchors (rule R4). Restore alt text that was lost (rule R5).
- Keep every design rule: media cap, no empty cards, 12 px minimum text, 44 px tap targets, reveal and motion rules, no highlight clutter (at most two per section). The restored text must look designed, not like a wall: use two-column or card layouts, 60 to 75 character line lengths, and disclosures.
- Do not invent facts. If restored text contains claims the owner has not confirmed (see Part 8), keep the existing disclosure notes.

Do not: add dependencies, touch other sections, edit shared files listed in rule R10 beyond the files above, or commit.

Verify: run both audits before and after. The content audit must show every decided row of these sections as kept or relocated; the viewport audit must still exit 0; the home page JS-disabled HTML must contain the restored text; check 360x740, 390x844, 768x1024 and 1366x650 and describe what you see; build passes.
Report: HOME_REDESIGN_CHANGELOG.md entry with the Part 15.4 lines, listing each restored, relocated and dropped row by ledger id. Leave changes uncommitted.
```

### S5. AEO: home FAQ block

```
Task: Add a designed FAQ block to the home page with matching FAQ schema.

Read first (binding): NEODENT_HOME_REDESIGN_REFERENCE.md Parts 3, 14 (especially R7) and 15; docs/home-redesign/SEO_LEDGER_DECISIONS.md (the approved FAQ questions and answers); HOME_REDESIGN_CHANGELOG.md; AGENTS.md.

Inputs: the approved FAQ list from SEO_LEDGER_DECISIONS.md. If it is missing or not marked approved, stop and ask.

Files you may edit: create components/sections/HomeFaq.tsx and HomeFaq.module.css; components/Home.tsx (insert the section between SpacesDesignedAroundCare and ContactNextStep only); lib/structured-data.ts (add FAQPage output for the home page only). Nothing else.

Do:
- Build an accordion with 6 to 8 items. All answers are in the server-rendered HTML; the first item may be open. Use buttons with aria-expanded and aria-controls (or native <details>), keyboard accessible, 44 px tap targets, visible focus.
- Answers: use the approved text word for word. Do not add or change facts. No prices, no outcome promises, no medical claims beyond what the site already says.
- Layout: heading and one plain supporting line on the left, the accordion on the right at 1024 px and up; stacked below. Match the site's tone: hairline rules, paper background, no numbering, no decorative marks. Use the Reveal primitive.
- Link inside answers to the relevant treatment, location or doctor page with descriptive anchors where it reads naturally.
- Schema: output FAQPage JSON-LD for the home page only, generated from the same data array as the visible text so the two can never differ. It must parse.
- Heading: one h2 that says in plain words what the block is (for example "Common questions about visiting Neodent").

Do not: add dependencies, add FAQ items that are not approved, add schema for text that is not visible, or edit other sections.

Verify: both audits; JS-disabled HTML contains every question and answer and the JSON-LD matches them exactly; viewport audit exits 0; heading order stays valid; check 360, 390, 768 and 1366 px; build passes. Remind the owner to run Google's Rich Results Test and the Schema.org validator on the live page after deployment (they cannot be run from here).
Report: changelog entry with the Part 15.4 lines. Leave changes uncommitted.
```

### S6. GEO: entity consistency pass

```
Task: Make the clinic and doctor information consistent everywhere on the site (names, addresses, phones, opening hours, doctors, schema).

Read first (binding): NEODENT_HOME_REDESIGN_REFERENCE.md Parts 14 (especially R8) and 15; HOME_REDESIGN_CHANGELOG.md; AGENTS.md.

Files you may edit: lib/site-data.ts, lib/clinical-team.ts, lib/structured-data.ts, lib/clinic-data.ts, and text-only changes in components that print clinic or doctor facts (list each one you touch). No layout or style changes.

Do:
1. Write scripts/entity-consistency-audit.mjs (JS-disabled fetch of every sitemap route, no new dependencies) that extracts every occurrence of: clinic names, street addresses, phone numbers (normalised), opening hours, doctor names with credentials, role and years, and "since" / years-of-experience statements, from visible text and from JSON-LD. Print a table grouped by entity showing each distinct variant and the routes where it appears.
2. Fix every variant that is wrong or inconsistent, using lib/site-data.ts and lib/clinical-team.ts as single sources. Where the same fact is typed by hand in several places, switch to the shared constant.
3. Hours: the owner confirmed on 30 Oct 2026 that the site data is correct: Nampally 10:30 AM – 5:00 PM, Mehdipatnam 4:00 PM – 8:00 PM, Monday to Saturday, Sunday holiday. The 10 AM to 7 PM signboard in a site photo is out of date. Apply these values everywhere (text, schema openingHours, the Open-now chip's source, the call cards, the LeadCapture text), always from the shared constants.
4. LeadCapture says "Open today, 10:00 AM - 08:00 PM" every day and mentions only Humayun Nagar. Make its text come from the shared hours and branch data. Do not redesign it or change its behaviour in this run.
5. Dr. Md. Muti Ur Rahman is MBBS / MD (General Medicine): confirm no text or schema calls him a dental specialist.
6. Structured data: confirm the organisation node has foundingDate "1994" and that Dentist or MedicalOrganization nodes for each branch have the correct address, geo, telephone, openingHours, parentOrganization and sameAs links (only ones that already exist). Do not add 1994 to a branch node unless the owner confirmed that branch opened in 1994.
7. Print the consistency table before and after.

Do not: change design, invent facts, add reviews or ratings to schema beyond what is visibly on the page, or add dependencies.

Verify: both audits; every entity has one variant; JSON-LD parses on every route; build passes.
Report: changelog entry with the Part 15.4 lines and the before/after consistency table; list owner decisions still needed (Google Business Profile match cannot be checked from here). Leave changes uncommitted.
```

### S7. Whole-site final check (home and internal pages)

```
Task: Final check of design and SEO across the home page and all internal pages after S0 to S6. Fix what is wrong; do not redesign.

Read first (binding): NEODENT_HOME_REDESIGN_REFERENCE.md Parts 3, 14 and 15; HOME_REDESIGN_CHANGELOG.md; docs/home-redesign/SEO_LEDGER_DECISIONS.md; AGENTS.md.

Do:
1. Run scripts/seo-content-audit.mjs for the whole sitemap. Every ledger row must be kept, relocated or dropped with a reason. Every internal route must show either no text change, or a change explained in the changelog. Investigate and fix any unexplained loss.
2. Regression check on internal pages caused by shared files (rule R10): take screenshots of every sitemap route at 390x844 and 1366x650 from the baseline build and the current build, list the routes that look different, and fix unintended differences (for example footer height, the mobile bar spacing under the footer, doctor rosters, highlight styling). Describe each difference you accept.
3. Run scripts/home-viewport-audit.mjs at all six viewports; it must exit 0. Report the mobile page height with disclosures collapsed.
4. Lighthouse (mobile) on the home page and three internal pages (one treatment, one location, one doctor page): report performance, accessibility, best practices and SEO, before and after if a baseline exists.
5. Heading hierarchy on every route: one h1, no skipped levels; headings follow rule R3.
6. Check robots.txt, sitemap.xml (all routes present, no dead URLs), canonical tags, titles and meta descriptions against the baseline; JSON-LD on every route parses and matches visible text.
7. Run scripts/entity-consistency-audit.mjs; one variant per entity.
8. List remaining issues by priority. Include items needing owner action: Google Rich Results Test and Schema validator on the live URLs, Google Business Profile match, Search Console inspection of the home page after deployment.

Do not: restyle sections, add dependencies, or change copy that the ledger did not decide.

Verify: build passes; both audits and the entity audit exit 0.
Report: changelog entry with the final audit tables. Leave changes uncommitted.
```

---

## Part 17. Quick start for a new chat

1. Upload `NEODENT_HOME_REDESIGN_REFERENCE.md` and `HOME_REDESIGN_CHANGELOG.md` (and, once it exists, `SEO_CONTENT_DIFF.md` and `SEO_LEDGER_DECISIONS.md`).
2. Say which run you are on: "next is S0" (or S1, S2, and so on).
3. Ask Claude to read Part 13 for status and Part 14 for the rules. The history of the earlier chats is not needed.
4. Paste the prompt for that run from Part 16 (or Part 10 for any design rerun) into Kiro CLI.
5. After the run, review the diff, commit (`seo:` prefix for this series, `home:` for design runs), and add the changelog entry.
