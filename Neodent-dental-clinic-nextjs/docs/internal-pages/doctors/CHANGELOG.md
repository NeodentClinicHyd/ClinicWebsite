# CHANGELOG: Doctors (/doctors)

Newest entry last. All changes are uncommitted.

---

## R0: Discovery and snapshot (1 Nov 2026)

**Run id:** r0. **Site code changed:** none.

### Files created
- `docs/internal-pages/doctors/content-snapshot.json` (baseline, server HTML with JavaScript off)
- `docs/internal-pages/doctors/OWNERSHIP.md`
- `docs/internal-pages/doctors/DISCOVERY.md`
- `docs/internal-pages/doctors/CONTENT_QUESTIONS.md`
- `docs/internal-pages/doctors/CHANGELOG.md` (this file)
- `.audit/doctors/tools/` (6 files) and `.audit/doctors/r0/` (screenshots, `audit.json`). `.audit/` is git-ignored.

### Tooling note (plan versus repo)
`scripts/page-content-snapshot.mjs`, `scripts/page-content-check.mjs` and `scripts/page-audit.mjs`, named in the plan, **do not exist**. The earlier clinic session had the same gap and copied slug-generic versions. I copied `common`, `page-content-snapshot`, `page-content-check`, `page-audit`, `nojs-top` and `shot` from `.audit/clinic/tools/` into `.audit/doctors/tools/` (no existing script edited). Commands for later runs:
- `node .audit/doctors/tools/page-content-check.mjs doctors /doctors`
- `node .audit/doctors/tools/page-audit.mjs doctors /doctors <run-id>`

### Content snapshot
13 text units, 3 headings, 3 links, 0 images, 0 buttons, 5 JSON-LD blocks (only the `BreadcrumbList` is in `page.tsx`; the other four come from `app/layout.tsx`).

### Ownership summary
- OWNED: `app/doctors/page.tsx`, `app/doctors/doctors.module.css`.
- The page imports nothing from `components/doctors/*`, so **no forks are needed** (plan forecast was wrong on this point).
- Shared read-only: `lib/clinical-team.ts`, `lib/site-data.ts`, `lib/clinic-data.ts`, `components/ui/DoctorPortrait.tsx` (to be imported for S2 and S4), `ContactNextStep`, motion components.

### Clinicians: 7 in `lib/clinical-team.ts`
Home order: Siraj, Miftah (featured cards), then row: Muti, Asiya, Safoora, Muqeet, Hafsa. **Only Dr. Hafsa Taha has no portrait** (monogram). Only Dr. Miftah has a profile page; Dr. Siraj's data link is `/about#founder`.

### Differences between the plan and the real page
1. No fork candidates (see above).
2. The home page uses transparent cut-out portraits on a charcoal 4:5 frame (`DoctorPortrait`), not `cover` photos, for the doctor cards.
3. Home team row has 5 cards, so "4 across" leaves an orphan.
4. Dr. Muti's qualification in the data is "MBBS (OSM) · MD (Gen. Med.)", not "MBBS / MD (General Medicine)". Dr. Asiya is also an MBBS.
5. The patients figure (25,000+) is marked unverified in the home code.
6. The "Dr. Miftah at work" copy and the stat values (clinics, patients) are hard-coded in home components: shared-change requests to be logged in R1 and R2 when the values are copied.
7. A recommended header photo exists: `/assets/neodent-dental-hospital-doctors.jpeg` (3840 x 1728, five clinicians).
8. Current page: eyebrow and role labels 10.5 px; "View full profile" tap target 120 x 20; red links on charcoal; no overflow at 360 to 1366.

### Audit r0 (current page)
| Viewport | Doc height | Overflow X | Media over 70% | Tap under 44 | Text under 12 | h1 |
|---|---|---|---|---|---|---|
| 360 | 2920 | 0 | 0 | 1 ("View full profile") | 2 (eyebrow, role label, 10.5 px) | 1 |
| 390 | 2901 | 0 | 0 | 1 | 2 | 1 |
| 768 | 2073 | 0 | 0 | 1 | 2 | 1 |
| 1366x650 | 1822 | 0 | 0 | 0 | 2 | 1 |

Screenshots at 390 and 1366 show a single dark band into a dark footer, two flat outlined cards with no portraits and no consultation block.

### Owner questions
See `CONTENT_QUESTIONS.md` (Q1 to Q12). The ones that change what R1 to R4 build: Q3 (25,000+), Q8 (cut-out portraits), Q9 (5 across), Q10 (Dr. Siraj link), Q11 (header photo). Defaults are written there.

### Shared-change requests made
None yet. `docs/internal-pages/_shared-requests.md` does not exist; the first request will create it by shell append.

### Not done
Nothing outstanding for R0. Lighthouse and builds were not run, as the rules require.

### Screenshot paths
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\r0\390-fold.png`
- `...\.audit\doctors\r0\390-full.png`
- `...\.audit\doctors\r0\390-nojs-full.png`
- `...\.audit\doctors\r0\360-full.png`
- `...\.audit\doctors\r0\768-full.png`
- `...\.audit\doctors\r0\1366-fold.png`
- `...\.audit\doctors\r0\1366-full.png`

---

## R1: Foundation, page header and fact strip (1 Nov 2026)

**Run id:** r1.

### Files changed
- `app/doctors/page.tsx`: imports and the page function only. `metadata`, `title`, `description`, `path` and `breadcrumbJsonLd` are untouched (`git diff -U0` shows only the import lines and the function body). The BreadcrumbList `<script>` stays in this file; the page now renders it plus `<DoctorsPageView />`.
- New: `components/pages/doctors/DoctorsPageView.tsx`, `DoctorsPage.module.css` (page custom properties), `DoctorsBackdrop.tsx` + `.module.css`, `DoctorsHeader.tsx` + `.module.css`, `DoctorsFacts.tsx` + `.module.css`, `DoctorsLegacy.tsx` + `.module.css`.
- New: `lib/pages/doctors-content.ts` (breadcrumbs, header photo, glass-card facts, fact-strip values).
- New tool: `.audit/doctors/tools/nojs-settled.mjs`.
- `docs/internal-pages/doctors/DISCOVERY.md` and `CONTENT_QUESTIONS.md`: corrected one R0 note (the patients figure is exported as `legacyStats.patientsTreated`).

### What was built
- **Header (H):** dark band with glow and icon-pattern layers (own CSS Module), visible breadcrumb Home / Doctors (44 px links, 14 px text), eyebrow, h1 and supporting sentence moved unchanged, actions "Call for Consultation" (`ctaTelPhone`) and "Send an enquiry" (`/contact`), one preloaded photograph, two glass cards ("Two clinics, Mehdipatnam and Nampally" and "Since 1994, Specialist-led dental care", year from `ESTABLISHED_YEAR`). Load motion is CSS keyframes keyed to classes; glow breathing and pattern drift only at 768 px and wider, not under reduced motion.
- **Photo:** `/assets/neodent-dental-hospital-doctors.jpeg` (existing alt text), 2:1 frame, capped by `--media-max-h-compact` (38dvh below 1024). Uses Next 16 `preload` (as `/clinic` does) in place of the plan's `priority`.
- **Fact strip (S1):** 7 doctors (`clinicalTeam.length`), 2 clinics (`clinicLocationSlugs.length`), 32 years (`yearsSinceEstablished()`), 25,000+ patients (`legacyStats.patientsTreated`). `CountUp` + staggered `Reveal`. 2 x 2 on phones.
- **Old cards and closing line:** moved unchanged into `DoctorsLegacy` (transient, replaced in R2 and R4). Only styles changed: role label 10.5 to 12 px, "View full profile" target 20 to 44 px tall, top padding for the navbar removed. They still render, so band rhythm is dark / light / dark for now.
- `<Navbar overHero />` is used, as on `/clinic` and `/about`.

### Checks
| Check | Result |
|---|---|
| `npx tsc --noEmit` (filtered to doctors paths) | no errors |
| `npx eslint` on changed files | no errors |
| `page-content-check.mjs doctors /doctors` | **missing: 0, shortened: 0**, h1 count 1 ("The clinical team behind Neodent."), units 13 to 24, images 0 to 1, links 3 to 6 (added: breadcrumb Home, Call, Send an enquiry), headings 3 |
| Metadata and JSON-LD | `git diff -U0 -- app/doctors/page.tsx`: no metadata or JSON-LD line changed |

Audit r1:
| Viewport | Doc height | Overflow X | Media over 70% | Tap under 44 | Text under 12 | h1 | Errors |
|---|---|---|---|---|---|---|---|
| 360 | 3508 | 0 | 0 | 0 | 0 | 1 | 0 |
| 390 | 3468 | 0 | 0 | 0 | 0 | 1 | 0 |
| 768 | 2686 | 0 | 0 | 0 | 0 | 1 | 0 |
| 1366x650 | 2168 | 0 | 0 | 0 | 0 | 1 | 0 |

The audit lists the clipped backdrop spans as "wide elements" (as it does on `/clinic`); they cause no scroll (overflowX 0). The `priority` count shows 0 because Next 16 `preload` does not set `fetchpriority` the way the tool checks.

### What the screenshots show
- 1366x650 fold: breadcrumb, eyebrow, two-line headline with red italic second line, supporting line, red and ghost buttons on the left; the five-person photo on the right with two glass cards overlapping its lower edge; the fact strip starts at the bottom of the fold. All five faces are inside the crop.
- 390 fold: same order stacked, buttons full width, photo about 180 px tall, glass cards side by side below it, strip below.
- 390 JavaScript-off (settled, after the animation): header fully visible. The earlier "nojs-full" shot caught the CSS animation midway (faded buttons, missing cards); that is the keyframes, not hidden content.
- Below the strip the old charcoal cards and closing line, as before but with the larger role labels.

### Owner questions
No new ones. Still open: Q3 (25,000+), Q11 (header photo), Q8 to Q10 (affect R2, R3).

### Shared-change requests
None needed. (The patients value is exported through `legacyStats`; no home value had to be copied.)

### Notes and unfinished
- `app/doctors/doctors.module.css` is now unreferenced (its rules were copied into `DoctorsLegacy.module.css`). It was not deleted; the owner can remove it when the redesign is accepted.
- `page.tsx` previously ended without a trailing newline; it now ends with one.

### Screenshots
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\r1\1366-fold.png`
- `...\r1\1366-full.png`, `...\r1\768-full.png`, `...\r1\390-fold.png`, `...\r1\390-full.png`, `...\r1\360-full.png`
- `...\r1\390-nojs-full.png`, `...\r1\390-nojs-settled.png`

---

## R2: Clinical leadership and Dr. Miftah at work (1 Nov 2026)

**Run id:** r2.

### Files changed
- New: `components/pages/doctors/DoctorsLeadership.tsx` + `.module.css` (S2), `DoctorsAtWork.tsx` + `.module.css` (S3).
- Edited (owned): `DoctorsLegacy.tsx` + `.module.css` (cards removed from it, closing line kept), `DoctorsPageView.tsx` (section order), `lib/pages/doctors-content.ts` (leadership copy, at-work copy).
- Tool (git-ignored): `.audit/doctors/tools/page-content-check.mjs` now reports a heading *level-only* change on its own line instead of counting it as missing.
- `docs/internal-pages/_shared-requests.md` created (shell append) with one request, see below. `CONTENT_QUESTIONS.md` gained Q13.
- `app/doctors/page.tsx` not touched in this run.

### S2 Clinical leadership
- Heading block: eyebrow "Clinical leadership", h2 "Guiding care across Mehdipatnam and Nampally", line "The founder and the Assistant Director guide care at both Neodent clinics in Hyderabad." (sources: roles in `lib/clinical-team.ts`; two clinics). **New copy, awaiting owner approval.** No red italic phrase.
- Two cards in the home format: shared `DoctorPortrait` cut-out on the 4:5 charcoal frame, experience figure with `CountUp` under it (32+ from `founder.experienceYears`, 15+ from the data), then label, name (h3), credential line, paragraph, link. Existing label, name, credential line and paragraph are moved word for word (stored in `doctors-content.ts`).
- Links: "View full profile" on Dr. Miftah (kept, `/doctors/dr-miftah-ur-rahman`). Dr. Siraj gets "View profile" to `/about#founder`, his data link, shown on the home card too; the target exists (default for Q10; remove if unwanted). "implant" and "full mouth rehabilitation" in Miftah's paragraph link to `/treatments/dental-implants` and `/treatments/full-mouth-rehabilitation`; no word changed.
- Desktop: two cards side by side, equal height, no card more than about 15% empty. Phones: cards stack, portrait 104 px wide beside label, name and credentials; paragraph, figure and link below. Hover lift on fine pointers at 768+, reduced-motion respected.
- Cards use `Reveal` (stagger 100 ms) for now; portrait mask reveal comes in R6.

### S3 Dr. Miftah at work
Home block's image, alt, paragraph and link text copied verbatim into `DOCTORS_AT_WORK`. Desktop: photo left (4:3 cover, focal `40% 45%`, within `--media-max-h-compact`), text right. Mobile: photo first, `max-height: 38dvh`, focal `40% 60%`. The home's "About Dr. Miftah" disclosure is not copied (not in the plan).

### Closing line
Still the old words and links ("clinics page" to `/clinic`, "get in touch" to `/contact`), now on a light strip with ink text and a red underline (the old small red on charcoal failed contrast). R4 moves it into S5.

### Checks
| Check | Result |
|---|---|
| tsc (doctors paths) | no errors |
| eslint (changed files) | no errors |
| content check | **missing: 0, shortened: 0**; h1 count 1; links 3 to 10; images 0 to 4; headings 3 to 5. Level change only: the two doctor names h2 to h3 (PAGE_PLAN section 7 asks for it). |
| Metadata and JSON-LD | not touched this run (R1 diff stands) |

Audit r2: 360, 390, 768, 1366 all overflowX 0, media over 70% 0, tap under 44 0, text under 12 0, h1 1, errors 0. Doc heights 4492, 4438, 3637, 3032.

### What the screenshots show
- 1366: light band under the strip; heading and line; two equal cards, each with a charcoal portrait frame, "32+" or "15+" in red serif under it, label, two-line name, credential line, paragraph and link; then the at-work card with the standing photo (face and study model both in frame) and text at the right; then the thin closing line and the footer.
- 390: cards compact (portrait about 104 px), figure and link in a row under the paragraph, at-work photo full width under them.
- A first screenshot showed the figures at 11 px: my `.exp span` rule also hit the spans inside `CountUp`. Fixed (`.exp > span`) and re-shot.

### Owner questions
- New S2 heading and line wording (above).
- Q10 (Dr. Siraj link) was applied as the default.

### Shared-change requests
`_shared-requests.md`: export the home "Dr. Miftah at work" strings from lib so both pages use one source.

### Not done
Parallax on the S3 photo and the portrait mask reveal are R6.

### Screenshots
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\r2\1366-full.png`, `1366-mid.png`, `1366-fold.png`
- `...\r2\390-full.png`, `390-mid.png`, `390-fold.png`, `768-full.png`, `360-full.png`, `390-nojs-full.png`

---

## R3: The wider clinical team (1 Nov 2026)

**Run id:** r3.

### Files changed
- New: `components/pages/doctors/DoctorsTeam.tsx` (server section), `DoctorsTeamTrack.tsx` (small client part: dots and scroll sync), `DoctorsTeam.module.css`.
- Edited (owned): `DoctorsPageView.tsx` (adds the section after "Dr. Miftah at work"), `lib/pages/doctors-content.ts` (`DOCTORS_TEAM_HEADING`).
- New tools (git-ignored): `.audit/doctors/tools/shot-el.mjs`, `team-interact.mjs`.
- `app/doctors/page.tsx` not touched.

### What was built
- Dark band in the page's own CSS Module (gradient, red glow, icon-pattern mask through `DoctorsBackdrop`, glow moved to the upper right for this band).
- Heading: eyebrow "Clinical team", h2 "Doctors working together across both clinics", line "The doctors of Neodent care for patients at both the Mehdipatnam and Nampally clinics." **The h2 and line are the plan's proposal and await owner approval** (plan section 12, item 5).
- Cards: `homepageSpecialists` from `lib/clinical-team.ts`, i.e. the home "Our clinical team" row in the home order. Nothing retyped. Name as h3, the data's detail lines under it, portrait via shared `DoctorPortrait` (4:5 charcoal frame, per-file crop). No links, no grouping, no clinic tabs, no per-doctor case limits.
- Layout: 5 across at 1280 px and wider, 3 across from 1024 to 1279 (second row centred), one scroll-snap swipe row below 1024 (cards 42% wide on tablet, 82% on phones, next card peeks) with 44 px progress dots and no counter. The plan said 4 across; with five members that leaves one card alone, so 5 across was used (Q9).
- The row is a focusable list (`tabindex=0`, labelled "Clinical team"), so arrow keys scroll it. Dots are buttons named after each doctor.

### Doctors rendered (order, portrait or monogram)
1. Dr. Md. Muti Ur Rahman, portrait, "MBBS (OSM) · MD (Gen. Med.)", "5+ years"
2. Dr. Asiya Siraj, portrait, "MBBS (OSM) · MRSH (LON)", "30+ years"
3. Dr. Safoora Talha, portrait, "BDS · 12+ years"
4. Dr. Muqeet Ur Rahman, portrait, "BDS (OSM) · Dental Surgeon", "4+ years"
5. Dr. Hafsa Taha, **monogram "HT"** (no portrait in the data), "BDS · Dental Surgeon", "5+ years"

Monogram cards: one (Dr. Hafsa Taha). Dr. Muti's qualification is shown exactly as the data holds it; nothing on the card or in the headings says "dental specialist".

### Checks
| Check | Result |
|---|---|
| tsc (doctors paths), eslint (changed files) | no errors |
| content check | **missing: 0, shortened: 0**; h1 count 1; headings 3 to 11; images 0 to 8; only level change: the two leader names h2 to h3 |
| Interaction (390 wide) | 5 cards in the DOM, 5 dots, `tabindex=0`; clicking dot 4 scrolls to the 4th card and sets `aria-current`; ArrowLeft scrolls the row |

Audit r3: overflowX 0 at 360, 390, 768, 1366; media over 70% 0; tap under 44 0; text under 12 0; h1 1; errors 0. Heights 5369, 5286, 4420, 3915. The tool lists the swipe-row cards as "wide elements" at 360 and 390; they scroll inside the row and the page does not overflow.
Every card is in the server HTML (the content check reads the JavaScript-off page).

### What the screenshots show
- 1440: the team band under the Dr. Miftah card, heading left, five equal glass cards in one row, Dr. Hafsa's monogram last. Card heights are equal; the shortest card (Dr. Safoora, one detail line) has about 15% free space.
- 1100: three cards, then Muqeet and Hafsa centred below.
- 390: one card fills the width, the next peeks on the right, five dots below, the first active.
- Band order is now dark header, light strip, light leadership and at work, dark team, light closing line, dark footer: the two dark bands are not adjacent.

### Owner questions
S4 heading wording (above). Q9 applied (5 across).

### Shared-change requests
None.

### Screenshots
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\r3\team-1440.png`, `team-1100.png`, `team-390.png`
- `...\r3\1366-full.png`, `1366-fold.png`, `768-full.png`, `390-full.png`, `390-fold.png`, `360-full.png`, `390-nojs-full.png`

---

## R4: Both clinics band, closing line and consultation block (1 Nov 2026)

**Run id:** r4.

### Files changed
- New: `components/pages/doctors/DoctorsClinics.tsx` + `.module.css` (S5).
- Edited (owned): `DoctorsPageView.tsx` (adds `DoctorsClinics` and the shared `ContactNextStep`, removes `DoctorsLegacy`), `lib/pages/doctors-content.ts` (`DOCTORS_CLINICS_HEADING`).
- **Now unreferenced, kept on disk (relocate, never delete):** `components/pages/doctors/DoctorsLegacy.tsx` + `.module.css` (closing line moved to S5) and `app/doctors/doctors.module.css` (old styles, copied in R1). The owner can delete both when the redesign is accepted.
- `app/doctors/page.tsx` not touched in this run.

### What was built
- **S5 (light, ivory band):** eyebrow "Both clinics", h2 "One team, two Neodent clinics", line "The doctors work together at the Mehdipatnam and Nampally clinics in Hyderabad." (new copy from existing facts; awaiting approval). Two surface-coloured cards, one per clinic, from `clinicLocations` in `lib/clinic-data.ts`: name (h3), locality, address, hours (`weeklyHours`, `hours`, `weeklyClosure`: "Monday–Saturday, 4:00 PM – 8:00 PM / Sunday holiday" and "Monday–Saturday, 10:30 AM – 5:00 PM / Sunday holiday", shown as the data stores them), phone as a `tel:` link (44 px target), and a link with a descriptive anchor: "See the Mehdipatnam clinic" to `/clinic/mehdipatnam`, "See the Nampally clinic" to `/clinic/nampally`. Nothing imported from `components/clinic/*`.
- **Closing line moved, same words and links:** "See both branches on the [clinics page](/clinic) or [get in touch](/contact) to begin." sits under the cards in ink text with a red underline (passes contrast).
- **S7:** `<ContactNextStep />` imported unchanged as the last child of `<main>`, as `/about` and the home page do. Note: that block has a charcoal background (the plan's table says light). The band before it (S5) is light, which is what the rule needs. Page ends consultation block, then footer.
- Band order: dark header, light strip, light leadership, light at work, dark team, light clinics, charcoal consultation block, dark footer. Dark runs: header alone; team alone; consultation block plus footer (two in a row, the limit).

### Checks
| Check | Result |
|---|---|
| tsc (doctors paths), eslint (changed files) | no errors |
| content check | **missing: 0, shortened: 0**; h1 count 1; links 3 to 17; headings 3 to 15; closing line text, hrefs and anchors unchanged |

Audit r4: overflowX 0 at 360, 390, 768, 1366; media over 70% 0; text under 12 0; h1 1. Doc heights 8200, 8073, 6353, 5592.
Findings that belong to the shared block, not this page, and are left alone: tap-target 24 px on `ContactNextStep`'s hidden honeypot input at 768 and below, and 7 to 8 console messages at every width (Turnstile "data:," CSP). `/about`, which uses the same block, shows the same 8 at 1366.

### What the screenshots show
- 1440: ivory band with heading, two white cards side by side with equal height (address, hours, phone, link), a hairline, and the closing line with both links; below it the dark consultation block with the form and the two clinic call cards.
- 390: cards stack; each fact is a labelled row; links are full-height tap targets.

### Owner questions
New S5 heading and line wording (above).

### Shared-change requests
None new.

### Screenshots
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\r4\clinics-1440.png`, `clinics-390.png`, `cta-1440.png`
- `...\r4\1366-full.png`, `1366-fold.png`, `768-full.png`, `390-full.png`, `390-fold.png`, `360-full.png`, `390-nojs-full.png`

---

## R6: Motion and polish (1 Nov 2026)

**Run id:** r6.

### Files changed
- Edited (owned): `DoctorsHeader.tsx` + `.module.css`, `DoctorsLeadership.tsx` + `.module.css`, `DoctorsAtWork.tsx` + `.module.css`, `DoctorsTeam.tsx` + `.module.css`, `DoctorsClinics.module.css`, `DoctorsPageView.tsx`.
- New tools (git-ignored): `.audit/doctors/tools/reduced-motion.mjs`, `drift-probe.mjs`, `overflow-chain.mjs`.
- `app/doctors/page.tsx`, `lib/*`, shared files: not touched. No content changed.

### Section against reveal
| Section | Reveal | Detail |
|---|---|---|
| H header | class-keyed CSS keyframes, no `Reveal` | Headline in two clip lines that rise (mask, 760 ms, 140 and 240 ms delay); breadcrumb, eyebrow, line and actions rise 60 to 100 ms apart; photo rises 24 px, fades and settles 1.04 to 1; glass cards rise at 450 and 600 ms. Glow breathing and pattern drift from 768 px only, none under reduced motion. |
| S1 facts | `Reveal` rise, stagger 80 ms | `CountUp` on all four numbers (final value in the server HTML). |
| S2 leadership | heading `Reveal` stagger 80; cards `Reveal` stagger 100 | **New in R6:** portraits are `Reveal variant="mask"` (settles 1.04 to 1). Hover lift on desktop, press state on touch. |
| S3 at work | photo `Reveal` mask with settle; text `Reveal` rise, delay 120 | **New in R6:** photo drifts 24 px at most as the card scrolls past (CSS scroll-driven animation, 1024 px and wider, only where supported, none under reduced motion). |
| S4 team | heading `Reveal`; cards `Reveal` stagger 80 | **New in R6:** portraits are `Reveal variant="mask"`. Dots follow scroll and are clickable (checked). Hover lift, touch press state. |
| S5 clinics | heading, cards (stagger 100) and closing line `Reveal` | Hover lift, touch press state. |
| S7 consultation | its own motion | not touched |

Rules kept: transform and opacity only; hidden start states come only from classes the shared `Reveal` adds with JavaScript (the JavaScript-off page shows everything); no new library; nothing animates continuously on phones.

### Problems found and fixed
1. The drift did not move. Cause 1: the photo frame used `overflow: hidden`, which makes it a scroll container, so the `view()` timeline watched it instead of the page. Now `overflow: clip`. Cause 2: the global `div.site` wrapper has `overflow: hidden` for the same reason; the page wrapper now overrides it with `overflow-x: clip; overflow-y: visible`, exactly as the About page does. Measured with a probe: the wrapper moves from -8.4 px to +5.1 px across the viewport.
2. A 12 px dark strip showed under the photo. Cause: a negative `margin-top` on the drift wrapper collapsed through the mask wrappers and moved their clip boxes up. Replaced by `top: -12px`; screenshot confirms the photo fills the frame.
3. The headline's clip padding added about 12 px to the h1 height; compensated with `.line + .line { margin-top: -0.2em }`. h1 bottom now sits 3 to 6 px below r4 (it counts the 0.1em clip padding).

### Checks
| Check | Result |
|---|---|
| tsc (doctors paths), eslint (changed files) | no errors |
| content check | **missing: 0, shortened: 0** |
| Reduced motion (`reduced-motion.mjs`, no scrolling) at 1366 and 390 | 0 hidden elements, 0 transformed elements, 0 running animations |
| JavaScript off | full page readable; `390-nojs-full.png` and the settled capture show the header with both actions and glass cards |
| Team row (390) | 5 cards, 5 dots, `tabindex 0`; dot click scrolls and sets `aria-current`; ArrowLeft scrolls |
| Audit r6 | overflowX 0 at 360, 390, 768, 1366; media over 70% 0; text under 12 0; h1 1. Tap under 44: 1 at 768 and below, the hidden honeypot input inside `ContactNextStep` (shared, not editable). Console: 7 to 8 Turnstile CSP messages from the same shared block (the About page shows the same). |

### Owner questions
None new.

### Shared-change requests
None. (Observed: the global `.site { overflow: hidden }` blocks any `animation-timeline: view()` on a page unless the page overrides it, as About and Doctors now do.)

### Screenshots
- `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\r6\1366-fold.png`, `1366-full.png`, `768-full.png`, `390-fold.png`, `390-full.png`, `360-full.png`
- `...\r6\390-nojs-full.png`, `390-nojs-settled.png`, `1366-reduced-full.png`, `390-reduced-full.png`
- `...\r6\atwork-1440.png`, `atwork-390.png`

---

## R7: Final fast check and screenshots (1 Nov 2026)

**Run id:** final. Only checks and documentation in this run; no code changed.

### Result per check
| Check | Result |
|---|---|
| `npx tsc --noEmit` (doctors paths) | pass, no errors |
| `npx eslint` (page.tsx, `components/pages/doctors`, `lib/pages/doctors-content.ts`) | pass, no errors |
| `page-content-check.mjs doctors /doctors` | **pass: missing 0, shortened 0.** One h1, "The clinical team behind Neodent." Units 13 to 85, links 3 to 17, images 0 to 8, headings 3 to 15. Only level change: the two doctor names h2 to h3 (PAGE_PLAN section 7). |
| `git diff -- app/doctors/page.tsx` | **pass.** Hunks: the import lines and the page function body. `metadata`, `title`, `description`, `path` and `breadcrumbJsonLd` are untouched; the BreadcrumbList `<script>` is still rendered from this file. |
| Audit final (360, 390, 768, 1366x650, 1440) | overflowX 0 everywhere; no media over 70% of the viewport; no text under 12 px; one h1; no page errors. |
| Reduced motion (r6 tool) | 0 hidden elements, 0 transformed elements, 0 running animations at 1366 and 390. |
| JavaScript off | page reads in full (`390-nojs-full.png`). |
| Tap targets under 44 px | 1 at 768 and below: the hidden honeypot input inside the shared `ContactNextStep` (not editable here). 0 on this page's own elements. |
| Console messages | 7 to 8 per load from the Turnstile widget inside `ContactNextStep`; the About page shows the same. None from this page. |

### Section walk-through (1366x650 and 390x844)
| Section | Pattern | Reveal | Empty-card / media / overflow |
|---|---|---|---|
| H header | breadcrumb, eyebrow, h1, line, two actions, photo, two glass cards | CSS keyframes, headline line-mask | photo 2:1, within the compact cap and 38dvh on phones; header plus first strip row fit 1366x650 |
| S1 fact strip | four facts | `Reveal` stagger + `CountUp` | n/a |
| S2 leadership | two featured cards | `Reveal` stagger, portrait mask | cards equal height, about 15% free space at most |
| S3 Dr. Miftah at work | photo left, text right | photo mask + drift, text rise | photo within the cap |
| S4 team | five cards, swipe row below 1024 | `Reveal` stagger, portrait mask | shortest card (Dr. Safoora) about 15% free |
| S5 clinics | two cards + closing line | `Reveal` | no empty space issue |
| S7 consultation | shared block | its own | not edited |
Band rhythm: dark, light, light, light, dark, light, charcoal consultation block, dark footer (the last two are adjacent, the allowed maximum).

### Files changed in the whole redesign (commit by path)
**Modified**
- `app/doctors/page.tsx` (imports and page function only)

**New**
- `components/pages/doctors/DoctorsPageView.tsx`
- `components/pages/doctors/DoctorsPage.module.css`
- `components/pages/doctors/DoctorsBackdrop.tsx`, `DoctorsBackdrop.module.css`
- `components/pages/doctors/DoctorsHeader.tsx`, `DoctorsHeader.module.css`
- `components/pages/doctors/DoctorsFacts.tsx`, `DoctorsFacts.module.css`
- `components/pages/doctors/DoctorsLeadership.tsx`, `DoctorsLeadership.module.css`
- `components/pages/doctors/DoctorsAtWork.tsx`, `DoctorsAtWork.module.css`
- `components/pages/doctors/DoctorsTeam.tsx`, `DoctorsTeamTrack.tsx`, `DoctorsTeam.module.css`
- `components/pages/doctors/DoctorsClinics.tsx`, `DoctorsClinics.module.css`
- `lib/pages/doctors-content.ts`
- `docs/internal-pages/doctors/` (`PAGE_PLAN.md` was yours; new: `OWNERSHIP.md`, `DISCOVERY.md`, `CONTENT_QUESTIONS.md`, `CHANGELOG.md`, `content-snapshot.json`)
- `docs/internal-pages/_shared-requests.md` (new; contains one request)

**Unreferenced, kept on disk (nothing deleted; the owner can remove when the redesign is accepted)**
- `components/pages/doctors/DoctorsLegacy.tsx` and `DoctorsLegacy.module.css` (the closing line moved into `DoctorsClinics`)
- `app/doctors/doctors.module.css` (old styles; no importer)

**Not in git** (`.audit/` is ignored): `.audit/doctors/tools/*` (copies of the clinic tools, plus `shot-el`, `team-interact`, `nojs-settled`, `reduced-motion`, `drift-probe`, `overflow-chain`), screenshots under `.audit/doctors/{r0,r1,r2,r3,r4,r6,final}/`.

No shared file was edited.

### Forks
None. The page never imported a shared component, so nothing was copied. The shared `DoctorPortrait`, `Reveal`, `CountUp`, `AppButton` and `ContactNextStep` are imported as they are.

### Shared-change requests
1. `docs/internal-pages/_shared-requests.md`: export the home "Dr. Miftah at work" image, alt and text from lib, so `/doctors` and the home page share one source.
Also noted (no action needed): the global `.site { overflow: hidden }` blocks scroll-driven animation unless a page overrides it, as About and Doctors now do.

### Additions made beyond the old page
Visible breadcrumb (Home / Doctors); header actions, photograph and two glass cards; fact strip (S1); section headings with eyebrow for S2, S4 and S5; S2 featured cards with portraits and experience figures; Dr. Siraj's "View profile" link (to `/about#founder`); links on "implant" and "full mouth rehabilitation" (words unchanged); S3 "Dr. Miftah at work"; S4 wider team (5 doctors); S5 both clinics; the consultation block.

### Monogram cards
One: **Dr. Hafsa Taha** ("HT"), because `lib/clinical-team.ts` has no portrait for her (same as the home page).

### Not done
- **R5 (questions section, FAQPage and `ItemList` schema): not run.** It needs your approval (plan section 12, item 9). No schema was added.
- No Lighthouse or deep tests, as the rules require.

### Open questions for the owner
New wording awaiting approval: S2 heading and line ("Guiding care across Mehdipatnam and Nampally" / "The founder and the Assistant Director guide care at both Neodent clinics in Hyderabad."); S4 heading and line ("Doctors working together across both clinics" / "The doctors of Neodent care for patients at both the Mehdipatnam and Nampally clinics."); S5 heading and line ("One team, two Neodent clinics" / "The doctors work together at the Mehdipatnam and Nampally clinics in Hyderabad.").
Decisions applied by default that you may reverse: Q3 (25,000+ shown, unverified in the home code), Q8 (cut-out portraits, not cover photos), Q9 (5 across), Q10 (Dr. Siraj link), Q11 (header photograph).
Other items in `CONTENT_QUESTIONS.md`: Q1 (role lines and the case-type rule), Q2 (credential wording differs from the home page), Q4 and Q5 (Dr. Muti's and Dr. Asiya's qualification strings), Q6 (branches / locations / clinics), Q7 (page metadata names only two doctors), Q12 (missing scripts), Q13 (short "implant" anchor).

### Screenshots
- Desktop full page (1440): `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\final\desktop-full.png`
- Mobile full page (390): `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\.audit\doctors\final\mobile-full.png`
- Also in the same folder: `360-full.png`, `768-full.png`, `1366-full.png`, `390-nojs-full.png`, `audit.json`
