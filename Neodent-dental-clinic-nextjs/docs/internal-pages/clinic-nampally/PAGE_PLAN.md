# PAGE_PLAN: Clinic page, Nampally (`/clinic/nampally`)

## 0. Header

| Field | Value |
|---|---|
| Page | Neodent Dental Hospital Nampally (branch page) |
| Route | `/clinic/nampally` (served by `app/clinic/[slug]/page.tsx`, the same template as `/clinic/mehdipatnam`) |
| Slug | `clinic-nampally` |
| Family | Clinic family (Part 11.4). One session at a time. |
| Model | Sonnet 5.5 in Kiro CLI |
| Dev server | Owner's `npm run dev` at `http://localhost:3000` running before every run |
| Date | 2 Nov 2026 |
| Status | Draft for owner review |
| Saved at | `docs/internal-pages/clinic-nampally/PAGE_PLAN.md` (this file was delivered as `PAGE_PLAN_clinic-nampally.md`; rename it when you save) |
| Prompt count | R0 to R7 (R5 is conditional on owner approval of an FAQ) |
| **Run order** | **Run this plan only after the Mehdipatnam plan has finished (its R8 passed).** R0 checks this and stops if not. |

**Placeholders filled in.** In Appendix A and B, `<slug>` is replaced by `clinic-nampally` and `<route>` by `/clinic/nampally`. The wording is otherwise verbatim.

**Why this plan is shorter on construction.** The Mehdipatnam plan (Plan A) polishes the shared branch template for both branches and keeps Nampally under a content guard. By the time this plan runs, the template components already follow the design language. This plan therefore (1) takes over the Nampally-specific parts (its photos, copy, dark gallery band, different quote, cross-link to Mehdipatnam), (2) proves nothing was lost on Nampally, and (3) checks that the polished template looks right with Nampally's content. If the owner chose **Plan B** in the Mehdipatnam plan (fork, Mehdipatnam only), this plan does not apply: tell me, and I will rewrite R1 to R4 as a full redesign of the original components.

---

## 1. Page facts

- **Purpose.** The local landing page for the Nampally clinic: where it is (within the Medwin Hospital Complex), when it is open, what the street entrance and rooms look like, which treatments are offered there, who the team is, what patients say, and how to call or get directions.
- **Audience.** (1) Patients near Nampally deciding where to go. (2) First-time visitors who must find a clinic inside a hospital complex: the street-to-reception photos are a wayfinding aid as much as a gallery. (3) Returning patients who need address, hours and phone. (4) Prospective clinic owners viewing the site as a showcase. About 80% on phones.
- **Search intent and target queries** (only phrases already on the site or in the standard): "Neodent Dental Hospital Nampally", "dental hospital in Nampally", "Neodent Nampally hours", "Neodent dental hospital Medwin Hospital Complex" (the page's own phrase), "directions to Neodent Nampally", "dental hospital Hyderabad". Treatment queries are served by the seven treatment cards with descriptive anchors.
- **Conversion goal.** A phone call (primary), a directions tap (secondary), then the enquiry form at `/contact`.
- **Fixed facts.** Nampally is open Monday to Saturday, 10:30 AM to 5:00 PM; Sunday is a holiday. All seven treatments are offered. Founded 1994. "Medwin Hospital Complex" is how the page itself describes the location; use it only as already written. **Known data caveat:** the physical Nampally signboard is out of date (standard, Part 1); the site data is right. Any street-front photo may show the old board; see Q3.

---

## 2. Screenshot findings

**Read this first.** The screenshots are small and downscaled. I can judge structure, order, rhythm and obvious problems. I cannot read body text, measure type or tap targets, see motion, or confirm names, addresses, numbers or captions. Those go to R0 or to the audit script. Scores are provisional.

### Desktop (about 1440 px), top to bottom

| # | Section | Findings | Score |
|---|---|---|---|
| 1 | Dark page header: breadcrumb, eyebrow, `h1` "Neodent Dental Hospital *Nampally*", intro paragraph, an hours line with a small icon, red call button and a second button, street-front photograph on the right with a caption | Same composition as Mehdipatnam and just as clear. The photo is an exterior, which is useful wayfinding. Flat dark band; no glass cards; eyebrow and breadcrumb look very small. An inline hours line already exists, so the glass-card idea must reuse it rather than repeat it. | 7.5 |
| 2 | Light band "Neodent, within the *Medwin Hospital Complex.*": three short paragraphs, "Visit & contact" card (address, phones, hours, a rating line, Call and Get directions) | Good and useful; the heading carries the key wayfinding fact. Reading column looks wide. Red-italic formula starts here. | 7 |
| 3 | **Dark** band "Nampally, from the street *to the reception.*": about eight photographs in a masonry grid with captions, intro text on the right | The strongest section; bright red and white interiors pop on the dark ground and the street-to-reception sequence tells a story. Background is flat black (no layer recipe). Some photos look very tall (check 70% cap). Captions look small. Cannot see whether a lightbox opens. | 7.5 |
| 4 | Light "Featured dental treatments *at Nampally.*": seven small cards in a four-column grid with one empty slot, then an "Additional dental services" panel and an "Explore all treatments" link | Sparse cards, small text, an empty grid slot, and a dense services list. Same as Mehdipatnam. | 6.5 |
| 5 | Dark "The people behind *your care.*": group photograph on the left, dark team list on the right | Warm and human; flat backdrop; the list is dense. The photo differs from the Mehdipatnam group photo. | 7 |
| 6 | Row: dark doctor card (Dr. Miftah Ur Rahman) and a cross-link card to **Mehdipatnam** with a small photo; "Back to the clinic overview" link | Good idea. Cards look unequal in weight; check the 65% fill rule. Rhythm is fine here because the band is light. | 6.5 |
| 7 | "A patient's experience *in their own words.*": large video in a dark frame on the left, quote card on the right (the quote appears to read "It went even better than we expected."; R0 confirms the exact text) | Strong proof. Video looks tall (check the cap). Quote card is small beside it, leaving empty space. | 7 |
| 8 | Red consultation block "Ready to visit Nampally? Call, or get directions." | Clear and on brand. Confirm shared `ContactNextStep` or a local block. | 8 |
| 9 | Dark footer (global) | Out of scope | n/a |

**Overall desktop: 7 / 10 (provisional).** A better rhythm than Mehdipatnam (dark, light, dark, light, dark, light, light, red), but the same weaknesses: flat dark bands, red-italic formula on every section, a sparse treatments grid, small type.

### Mobile (about 390 px), top to bottom

| # | Section | Findings | Score |
|---|---|---|---|
| 1 | Header | Sensible stack. Check photo height (target at most 38dvh) and type sizes. | 7 |
| 2 | Medwin Hospital Complex and Visit card | Fine order. Check 44 px tap targets. | 7 |
| 3 | Gallery | The photos appear stacked as a very long column of large images on a dark ground. Breaks the mobile stacking rule; biggest problem. | 4.5 |
| 4 | Featured treatments | Seven cards as a long vertical list, then the services list. | 5.5 |
| 5 | People | Group photo then a long list. | 6.5 |
| 6 | Doctor and Mehdipatnam cards | Stacked, each with an image. Check heights. | 6 |
| 7 | Patient video | Video then quote. Check cap and tap size of controls. | 6.5 |
| 8 | Consultation block | Clear. | 8 |

**Overall mobile: 6 / 10 (provisional).** Target after the plan: 9 to 9.5 on both.

### Differences from the Mehdipatnam page worth noting

- Gallery band is **dark** here and **light** there. Both are the owner's existing choices; the template must support both tones.
- Header photo is a street exterior; Mehdipatnam's is an interior.
- Different team photograph, different patient quote, different location phrase (Medwin Hospital Complex), different hours, and the cross-link card points to Mehdipatnam.

### Cannot be judged from the screenshots

Motion, hover states, lightbox, video poster and controls, exact text, contrast values, tap sizes, whether a caption or alt text mentions old timings, how the template chooses the gallery's tone.

---

## 3. Content map (everything here must survive; R0 verifies and records differences)

**Page level:** metadata (title, description, canonical, robots, Open Graph), `generateMetadata`, all JSON-LD for the Nampally clinic (expected: a dental or local-business type with address, phone, hours, `foundingDate: "1994"`, no `aggregateRating`). Byte-identical.

**S1. Page header**
- Breadcrumb (Home, Clinics, Nampally) with links; eyebrow text.
- `h1` "Neodent Dental Hospital Nampally".
- Intro paragraph; the inline hours line with its icon.
- Primary call button (`tel:`) and second button (directions).
- Street-front photo with alt text and caption.

**S2. "Neodent, within the Medwin Hospital Complex."**
- Heading; three short paragraphs (R0 confirms the count).
- "Visit & contact" card: label, address, phone numbers, hours, a rating line, Call button, Get directions button.

**S3. "Nampally, from the street to the reception."**
- Heading and intro text.
- About eight photographs (street entrance, reception, consultation and treatment rooms, others), each with alt text and caption; R0 lists every file name and caption.
- Any lightbox or zoom behaviour.

**S4. "Featured dental treatments at Nampally."**
- Heading and intro line; seven treatment cards (composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design, full mouth rehabilitation, scaling and polishing) with icon, title, one line, link.
- "Additional dental services" panel: heading, intro, list of services.
- "Explore all treatments" link to `/treatments`.

**S5. "The people behind your care."**
- Heading and intro line; group photograph with alt text and caption; team list (names, roles as written); link to the doctors page.

**S6. Doctor card and Mehdipatnam card**
- Dr. Miftah Ur Rahman card (name, role, supporting lines, any portrait, profile link).
- Cross-link card "Neodent Dental Hospital, Mehdipatnam" with its line, small photo (alt text) and link to `/clinic/mehdipatnam`.
- "Back to the clinic overview" link to `/clinic`.

**S7. "A patient's experience in their own words."**
- Heading and intro line; patient video (source, poster, controls, caption); the quote and its attribution.

**S8. Consultation block**
- "Ready to visit Nampally? Call, or get directions." with its buttons and labels.

**Global (out of scope):** navigation, footer, mobile call bar, lead-capture modal, cookie banner.

---

## 4. Target layout, section by section

The template was polished in the Mehdipatnam work. For each section, the job here is: **open the already-built component, confirm it renders Nampally correctly, and add or adjust only what is Nampally-specific**, through data and props, not copies. General rules: keep order; tokens only; padding and container width as in the Mehdipatnam build; one heading, one supporting line, one focal element or action per section.

**Heading treatment (page-wide, same as Mehdipatnam).** Red italic stays on the `h1` (place name), S5 ("your care.") and S7 ("in their own words."). Plain ink, same words, on S2, S3 and S4. Red text on charcoal only at large sizes.

### S1. Header band: P1
- **Reference:** `components/hero/Hero.tsx`, plus the header built in the Mehdipatnam run.
- **Nampally specifics:** the exterior photo gets `object-position` aimed at the entrance and sign area; `priority` on this one image only; `max-height: var(--media-max-h)`; caption stays.
- **Glass cards:** hours card from `lib/clinic-data.ts` (Nampally, Monday to Saturday, 10:30 AM to 5:00 PM) and a location card "Medwin Hospital Complex, Nampally" using only the phrase the page already uses. The existing inline hours line is relocated into the glass card (not duplicated beside it); R0 records how the Mehdipatnam run handled the same line and R1 matches it.
- **Mobile:** breadcrumb, eyebrow, `h1`, supporting line, buttons, photo (at most 38dvh), two fact chips.
- **Backdrop and motion:** as the Mehdipatnam header (recipe 3.6; class-keyed load animation; breathing and drift at 768 px and up only).

### S2. "Neodent, within the Medwin Hospital Complex.": P3 plus Visit card
- Plain-ink heading (italic removed), reading column at 65 to 72 characters, sticky Visit card on desktop, full width on mobile, 44 px tap targets, Call first then Get directions.
- If the three paragraphs exceed about 120 words, paragraph three sits in a native `<details>` at all breakpoints. Phones are `tel:` links; address text unchanged.
- **Motion:** heading `mask`, paragraphs `rise` stagger, card `rise` +200 ms.

### S3. Gallery on a dark band: P7 with a desktop grid
- **Reference:** `ClinicalLeadership.tsx` and `PatientStories.tsx` (swipe row), `LegacyStory.tsx` (zoom); the gallery built in the Mehdipatnam run for structure.
- **Nampally specifics (the dark variant).** Keep this band dark: it is the owner's existing choice and it gives the page good rhythm. The template gallery gains a dark tone, selected by a prop or class passed from page data or slug, not by a copy. Dark variant rules: layer recipe from 3.6 behind the band (gradient, red glow, icon pattern as a luminance mask fading to zero before the heading and the photos' column edges); captions sit on a **dark gradient at the bottom of each photo** (Part 3.4), not below it; 1 px hairline border, radius and shadow as light photos; heading and intro in ivory.
- **Desktop:** three or four columns with a repeating rhythm, each photo `object-fit: cover` with its own `object-position`, `max-height: var(--media-max-h-compact)`; click opens the lightbox.
- **Mobile:** one swipe row (84 to 88% cards, next card peeks, progress dots, keyboard accessible), photo `aspect-ratio` 4/3, caption on the gradient. All photos in the DOM. Never two large photos stacked.
- **Photo order follows the owner's order** (street to reception). If a photo shows the old signboard, it stays; see Q3.
- **Motion:** photos `mask` reveal with settle, stagger 80 to 100 ms; optional parallax of at most 24 px on the single largest desktop photo.
- **Dark-run check:** S1 dark, S2 light, S3 dark, S4 light. No more than two dark in a row.

### S4. Featured treatments and additional services: P6 plus list panel
- As built for Mehdipatnam: four-column grid (four plus three cards, with the existing "Explore all treatments" link moved into the eighth cell), cards with whole-card tap targets and hover lift; additional-services panel as a wide light card; mobile swipe row with dots.
- **Nampally specifics:** heading "at Nampally" in plain ink; every card link keeps its href and anchor. Nothing else differs.

### S5. People: P5 with glass rows
- As built for Mehdipatnam: dark band with the recipe; the Nampally group photo with a focal point on the faces, caption on a dark gradient; team rows as dark glass; mobile photo at most 38dvh then compact rows (rows beyond about two screens in a native `<details>` labelled "More of the team").
- Dr. Muti Ur Rahman reads MBBS / MD (General Medicine) as written. Do not add "Smile Designer".
- **Dark-run check:** S4 is light before it and S6 is light after it.

### S6. Doctor card and Mehdipatnam card: P10 plus P15
- As built for Mehdipatnam: equal-height cards on a light band; the cross-link card points to `/clinic/mehdipatnam` with its small photo (at most 160 px tall on desktop); mobile swipe row of two cards, photos at most 120 px. Quote only where already present (exactly "Save the natural teeth till the last stage."). "Back to the clinic overview" stays.

### S7. Patient experience: P5 split with video
- Video in its dark frame on the left (`max-height: var(--media-max-h)`), keep native controls, poster and attributes; `preload="none"`; no autoplay; pause below 50% in view. Quote card on the right, content centred vertically (no more than 35% empty). Quote and attribution exactly as the snapshot shows. Mobile: heading, video (compact cap), quote. Heading keeps its red italic.
- **Nampally specific:** the dark video frame sits on a light band; it must not read as a third dark section in a row (S5 dark, S6 light, S7 light with a contained dark frame is fine).

### S8. Consultation block: P16
- If the shared `ContactNextStep` is used, spacing only. If local, restyle to match using this page's CSS Module; keep wording and button labels (including any number) as they are. Page ends: light, red, dark footer.

### S9 (addition, needs owner approval, Q2). Visit FAQ: P14
- Position between S7 and S8. Native `<details>`, first open, no numbering, hairline dividers, chevron, smooth open. Renders only for the Nampally slug. Data in `lib/pages/clinic-nampally-content.ts`; any `FAQPage` JSON-LD from the same array, word for word. Only if `FAQ_APPROVED.md` exists.

---

## 5. Page header spec

| Item | Spec |
|---|---|
| Breadcrumb | Home, Clinics, Nampally; real links; 12 px or more; 44 px hit area |
| Eyebrow | Existing words, plain, 12 px or more, no numbering |
| `h1` | "Neodent Dental Hospital Nampally" (R0 confirms exact text). Place name in red italic (allowed on the page `h1`). `--type-hero-primary` |
| Supporting line | The existing intro paragraph; 16 px on phones, line height about 1.6, at most 72 characters wide. R0 confirms it names dental hospital, Nampally and Hyderabad; if not, add one plain line using only approved phrases |
| Actions | Existing primary red call button (min 44 px, `tel:` from `lib/site-data.ts`) and the existing second (directions) button; labels unchanged |
| Media | Street-front photograph, `priority` (the only one), `next/image` with `sizes` and `aspect-ratio`, focal point on the entrance; hairline, radius, soft shadow; mask reveal with 1.04 to 1 settle |
| Glass cards | Two: Nampally hours (from `lib/clinic-data.ts`) and "Medwin Hospital Complex" (existing phrase). `rgba(16,21,23,0.72)`, 1 px `rgba(255,255,255,0.12)`, radius 0.35rem, `backdrop-filter: blur(8px)` inside `@supports`. Fade up at 450 and 600 ms. The inline hours line is relocated into the first card |
| Backdrop | Layers per 3.6: gradient, red radial glow (alpha about 0.30), icon pattern as a luminance `mask-image` fading before the text column. Breathing and drift only at 768 px and up |
| Mobile order | Breadcrumb, eyebrow, `h1`, supporting line, actions, photo (at most 38dvh), two fact chips |

---

## 6. Motion plan

| Section | Elements | Variant | Stagger / timing | Notes |
|---|---|---|---|---|
| S1 header | Headline, supporting line, actions, photo, 2 glass cards, backdrop | Class-keyed load animation | Lines 100 ms; photo rise 24 px with 1.04 to 1 settle; cards at 450 and 600 ms | Glow and drift only at 768 px and up |
| S2 intro | Heading, paragraphs, Visit card | `mask`, `rise`, `rise` | 100 ms; card +200 ms | |
| S3 gallery (dark) | Heading, intro, photos, gradient captions | `mask` photos | 80 to 100 ms | Optional 24 px parallax on the largest desktop photo; backdrop drift desktop only |
| S4 treatments | Heading, 7 cards plus link card, services panel | `rise` stagger | 80 to 120 ms | Hover lift desktop; press state touch |
| S5 people | Heading, photo, glass rows | `mask`, `rise` | 80 ms | |
| S6 doctor + Mehdipatnam | 2 cards | `rise` | 100 ms | Hover lift desktop |
| S7 patient | Heading, video frame, quote | `mask`, `rise` | quote +150 ms | No autoplay |
| S9 FAQ (if approved) | Heading, items | `rise`; smooth open | 60 ms | First item open |
| S8 consultation | Heading, buttons | `rise` | buttons +100 ms | |

All 300 to 700 ms, ease-out, `transform` and `opacity` only. Reduced motion: final state, no transforms, no drift. Phones: reveals yes, no continuous animation. Hidden initial states come from classes added by JavaScript.

---

## 7. SEO, AEO, GEO checklist for this page

**Facts identical everywhere:** Neodent Dental Hospital (written "Neodent" in running text), Nampally, Medwin Hospital Complex (only as the page writes it), Hyderabad, address and phones from `lib/clinic-data.ts` and `lib/site-data.ts`, hours Monday to Saturday 10:30 AM to 5:00 PM, Sunday holiday, founded 1994, all seven treatments.

**Metadata and schema:** `generateMetadata`, canonical, robots, Open Graph and every JSON-LD block byte-identical. No `aggregateRating`. `foundingDate: "1994"` stays.

**Headings:** one `h1`; section headings `h2`; card titles `h3`.

**Internal links that must exist (R0 records the real list; the count never falls):** the seven treatment pages and `/treatments`; `/clinic/mehdipatnam` (S6); `/clinic` (back link and breadcrumb); `/` (breadcrumb); `/doctors` and `/doctors/dr-miftah-ur-rahman`; `/contact`; `tel:` and directions links.

**Images:** natural alt text stays as written; decorative layers `aria-hidden`; `priority` on the header photo only.

**FAQ status:** none today. Proposed addition (S9) for owner approval. Each answer begins with a direct one-sentence answer, then at most two supporting sentences, from site facts only:
1. *When is the Nampally clinic open?* Monday to Saturday, 10:30 AM to 5:00 PM; closed Sunday.
2. *Where is Neodent Dental Hospital Nampally?* Within the Medwin Hospital Complex (as the page writes it), address from the data file, with the directions link.
3. *Which treatments are available at Nampally?* All seven, named with links.
4. *How do I book a consultation?* Call the clinic number or send an enquiry through the contact page; a Neodent specialist will see you.
5. *Is there another Neodent clinic?* Yes, Mehdipatnam, with its hours (Monday to Saturday, 4:00 PM to 8:00 PM) and a link.

**Do not:** add old hours anywhere, add "Smile Designer", add reviews or ratings not already visible, create captions or a transcript for the video, or invent directions (floor, landmark, entrance). Wayfinding facts must come from the owner (Q5).

---

## 8. Ownership forecast and concurrency notes

**Plan A continues.** The branch template (`app/clinic/[slug]/page.tsx`, `components/clinic/branch/*` and their CSS) is owned by the clinic-family session. The Mehdipatnam session has already polished it. This session inherits the same owned set; it copies the lists from `docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md` and re-verifies them with grep.

**Expected OWNED:** `app/clinic/[slug]/page.tsx` (imports, wrappers, props only; metadata and JSON-LD untouched); `components/clinic/branch/*` and CSS; anything the Mehdipatnam session forked under `components/pages/clinic-mehdipatnam/` (it is now template code: edit it only for the dark variant and Nampally props); new `components/pages/clinic-nampally/*`, `lib/pages/clinic-nampally-content.ts`, `docs/internal-pages/clinic-nampally/*`, `.audit/clinic-nampally/*`.

**Shared read-only:** `ContactNextStep*`, `components/motion/*`, `components/ui/*`, `components/layout/*`, `lib/site-data.ts`, `lib/clinic-data.ts`, `lib/clinical-team.ts`, `lib/structured-data.ts`, `lib/featured-treatment-catalog.ts`, `app/globals.css`, and any `components/clinic/*` file the `/clinic` hub also imports.

**Do not run at the same time:** the Mehdipatnam plan, or any `/clinic` hub session.

**Reverse guard.** Because the template is shared, every prompt in this plan also runs `node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam`, which must still report zero missing, so Nampally work cannot break the page finished before it. Visual regressions on Mehdipatnam are checked from screenshots in R7.

**Baseline.** R0 must **not** take a fresh Nampally snapshot if `docs/internal-pages/clinic-nampally-guard/content-snapshot.json` exists. That file was taken before the Mehdipatnam work and is the true baseline; a new snapshot would hide any loss. R0 copies it into this page's folder.

**Expected shared-change requests:** a dark-tone token or hook for the gallery if no suitable one exists; otherwise none.

---

## 9. Run sequence

| Run | Scope | Files (main) | Depends on | Time |
|---|---|---|---|---|
| R0 | Gate check, baseline, discovery, ownership | `docs/internal-pages/clinic-nampally/*` | Mehdipatnam plan finished; owner answers | 15 min |
| R1 | Header (S1), intro and Visit card (S2) | header and intro components, data | R0 | 20 min |
| R2 | Dark gallery (S3) | gallery component (dark variant), CSS | R1 | 25 min |
| R3 | Treatments, people, doctor and Mehdipatnam cards (S4, S5, S6) | those components | R1 | 20 to 25 min |
| R4 | Patient experience, consultation block (S7, S8) | those components | R1 | 20 min |
| R5 | FAQ (S9), **only if `FAQ_APPROVED.md` exists** | `lib/pages/clinic-nampally-content.ts`, FAQ component | R4 | 15 min |
| R6 | Motion and polish check | all owned section files | R2 to R5 | 20 min |
| R7 | Final fast check and screenshots (both branches) | docs only, small fixes | R6 | 20 min |

Run in order, in one Kiro session.

---

## 10. Prompts

Each prompt starts with the Appendix B preamble verbatim (slug filled in). Send one at a time and wait for it to finish.

### R0. Gate check, baseline, discovery

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R0 for clinic-nampally (/clinic/nampally): gate check, content baseline, discovery. This run changes no site code.

Do:
1. Confirm http://localhost:3000/clinic/nampally and http://localhost:3000/clinic/mehdipatnam respond. If not, stop and say so.
2. Gate check. Read docs/internal-pages/clinic-mehdipatnam/OWNER_DECISIONS.md, OWNERSHIP.md and CHANGELOG.md. If the decision is Plan B, or the last CHANGELOG entry is not a passing final run (R8), stop and say so; this plan assumes the Mehdipatnam work is finished and the template is polished.
3. Baseline. If docs/internal-pages/clinic-nampally-guard/content-snapshot.json exists, copy it to docs/internal-pages/clinic-nampally/content-snapshot.json. Do NOT take a fresh snapshot: the page has already changed and a new snapshot would hide any loss. Only if the guard file does not exist, run node scripts/page-content-snapshot.mjs clinic-nampally /clinic/nampally.
4. Immediately run node scripts/page-content-check.mjs clinic-nampally /clinic/nampally and record the result (missing and shortened counts and details) at the top of DISCOVERY.md. Also run node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam and record that result.
5. Write docs/internal-pages/clinic-nampally/OWNERSHIP.md by copying the lists from the Mehdipatnam OWNERSHIP.md and re-verifying each file with grep -rl across app, components and lib. Note any file now imported by another route. List other routes in the clinic family.
6. Write docs/internal-pages/clinic-nampally/DISCOVERY.md: section list in order (heading, component, file); the exact h1; the word count of the three intro paragraphs; every gallery photo (file name, alt, caption) and which, if any, shows or states opening hours or the signboard; how the template decides the gallery band's tone (dark or light) and whether a prop is needed; the team list; the cross-link card and its photo; the video attributes (controls, poster, loop, preload, muted, autoplay) and caption; the exact quote text and attribution; whether the consultation block is the shared ContactNextStep or local; whether the inline header hours line was relocated into a glass card for Mehdipatnam and how; existing JSON-LD types; internal links and anchors; differences between the Nampally and Mehdipatnam renderings; content in the page that the plan missed; sections in the plan that do not exist.
7. List copy that looks wrong, ungrammatical or unverifiable in CONTENT_QUESTIONS.md (quote it; do not edit it). Include the rating line, any hours text that differs from lib/clinic-data.ts, and any use of the old signboard timings.
8. Create CHANGELOG.md with an R0 entry.

Do not: edit any file outside docs/internal-pages/clinic-nampally/ and .audit/clinic-nampally/, start or stop servers, build, install, or use git write commands.
Report: gate result, baseline source, both content-check results, ownership summary, differences from the plan, questions for the owner.
```

### R1. Header (S1), intro and Visit card (S2)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R1 for clinic-nampally (/clinic/nampally): page header band (S1), and "Neodent, within the Medwin Hospital Complex." with the Visit & contact card (S2).

Open first: components/hero/Hero.tsx and its CSS; then the header and intro components built in the Mehdipatnam work (see OWNERSHIP.md and docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md). Reuse them; add Nampally-specific parts through data and props, not copies.

Files you may edit: the header and intro components and CSS Modules listed OWNED in OWNERSHIP.md; new files under components/pages/clinic-nampally/; lib/pages/clinic-nampally-content.ts; docs/internal-pages/clinic-nampally/. app/clinic/[slug]/page.tsx only for imports, wrappers and props (metadata and JSON-LD stay byte-identical). Anything else: stop and explain.

Do:
1. Confirm the header renders Nampally correctly: h1 unchanged, breadcrumb links, intro paragraph, both buttons with their labels, photo with alt text and caption. Set the photo's object-position on the entrance and sign area, keep priority on this image only, max-height: var(--media-max-h).
2. Glass cards: hours from lib/clinic-data.ts for Nampally (Monday to Saturday, 10:30 AM to 5:00 PM) and "Medwin Hospital Complex" using only the phrase the page already writes. Match how the Mehdipatnam header handled the existing inline hours line (relocated into the glass card, not duplicated). Mobile: the two facts as a chip row under the photo.
3. S2: plain-ink heading (no red italic, same words); reading column at 65 to 72 characters; sticky Visit card on desktop; full-width card on mobile; Call first then Get directions; 44 px tap targets; tel: links from the data; address text unchanged. Use a native details for paragraph three only if the three paragraphs exceed about 120 words, at all breakpoints.
4. Nothing hard-coded to Mehdipatnam in any shared component. Mehdipatnam must render exactly as before.

Acceptance (checkable):
- One h1; text identical to DISCOVERY.md; no media over 70% of the viewport at 390x844, 768x1024, 1366x650.
- Header photo is the only image with priority; no horizontal overflow at 360 or 390; no text under 12 px; tap targets at least 44 px at 768 and below.
- The S1 band fits 1366x650 with heading, photo and primary action visible.
- content check missing: 0 for both branches.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-nampally /clinic/nampally
d) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
e) node scripts/page-audit.mjs clinic-nampally /clinic/nampally r1
f) Open two or three screenshots from .audit/clinic-nampally/r1/ and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R1 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R2. Dark gallery (S3)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R2 for clinic-nampally (/clinic/nampally): "Nampally, from the street to the reception." gallery on its dark band (S3).

Open first: the gallery component built in the Mehdipatnam work (see its CHANGELOG entry R2), components/sections/ClinicalLeadership.tsx and PatientStories.tsx (swipe row), components/hero/ CSS (layer recipe for dark bands; copy into this page's CSS, do not import).

Files you may edit: the gallery component and CSS Module listed OWNED in OWNERSHIP.md, new files under components/pages/clinic-nampally/, docs/internal-pages/clinic-nampally/. Anything else: stop and explain.

Do:
1. Add a dark tone to the template gallery, selected by a prop or class driven by page data or the branch slug (use what DISCOVERY.md found). The light Mehdipatnam gallery must render exactly as before.
2. Dark tone: band with the layer recipe (vertical gradient --neodent-charcoal to #0f1315, red radial glow, icon pattern as a luminance mask-image over an ivory fill, never a CSS background-image, fading to zero before the heading and the photo edges); ivory heading and intro; plain heading (no red italic, same words); captions on a dark gradient at the bottom of each photo; 1px hairline border, radius and soft shadow as the light photos.
3. Desktop: three or four columns with a repeating rhythm; each photo object-fit: cover with its own object-position, max-height: var(--media-max-h-compact); click opens the lightbox (same lightbox as Mehdipatnam).
4. Mobile: one swipe row (overflow-x: auto; scroll-snap-type: x mandatory; cards 84 to 88% wide; next card peeks; focusable; arrow-key scroll); photo aspect-ratio 4/3; caption on the gradient; progress dots, no "02 / 08" counter. All photos stay in the DOM, in the owner's order. Never two large photos stacked.
5. Keep every alt text and caption exactly as written, including any that mention the signboard or timings (record those in CONTENT_QUESTIONS.md).

Acceptance (checkable):
- Photo count in the DOM equals DISCOVERY.md; alt texts and captions unchanged.
- At 390x844 the gallery is one horizontal row; at 768 and 1366 no photo exceeds 70% of the viewport height.
- Caption text on gradients meets 12 px or more and is readable in the screenshot.
- No horizontal page overflow at 360 or 390; dots and lightbox buttons at least 44x44.
- Mehdipatnam gallery screenshot unchanged in tone and layout.
- content check missing: 0 for both branches.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-nampally /clinic/nampally
d) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
e) node scripts/page-audit.mjs clinic-nampally /clinic/nampally r2
f) Open two or three screenshots (gallery on mobile and desktop) and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R2 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R3. Treatments, people, doctor and Mehdipatnam cards (S4, S5, S6)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R3 for clinic-nampally (/clinic/nampally): "Featured dental treatments at Nampally" with additional services (S4), "The people behind your care." (S5), and the Dr. Miftah and Mehdipatnam cards (S6).

Open first: the treatments, people and doctor components built in the Mehdipatnam work (see its CHANGELOG entries R3 and R4), components/sections/Expertise.tsx, components/sections/ClinicalLeadership.tsx.

Files you may edit: those components and CSS Modules listed OWNED in OWNERSHIP.md, new files under components/pages/clinic-nampally/, docs/internal-pages/clinic-nampally/. lib/clinical-team.ts is read-only. Anything else: stop and explain.

Do (these sections are mostly verification; change only what Nampally needs):
1. S4: confirm seven cards, eight-cell grid with the "Explore all treatments" link in the eighth cell, additional services panel, mobile swipe row. Heading plain ink (no red italic, same words). Every card link keeps its href and anchor.
2. S5: confirm the dark band and layer recipe, the Nampally group photo with a focal point on the faces and its caption on a dark gradient, glass rows, the doctors link, mobile photo at most 38dvh and compact rows (rows beyond about two screens in a native details labelled "More of the team"). Keep red italic on "your care.". Names, roles and credentials exactly as written; Dr. Muti Ur Rahman stays MBBS / MD (General Medicine); add no "Smile Designer".
3. S6: confirm equal-height cards on a light band; the cross-link card points to /clinic/mehdipatnam with its photo (at most 160 px tall on desktop, at most 120 px in the mobile swipe row); the Dr. Miftah quote only where already present, exactly "Save the natural teeth till the last stage."; "Back to the clinic overview" link kept.
4. Fix only Nampally-specific problems (focal points, a caption that wraps badly, an image height). Anything that needs a template change must be small, additive, and must leave Mehdipatnam rendering exactly as before.

Acceptance (checkable):
- Seven treatment hrefs unchanged; one link to /treatments; no empty grid slot at 1366 and 1440.
- Every team name, role and credential from DISCOVERY.md present in the server HTML, same order.
- No card more than 35% empty; no media over 70% of the viewport; no horizontal overflow at 360 or 390; tap targets at least 44 px at 768 and below; no section pair of three dark bands in a row.
- content check missing: 0 for both branches; link count not lower.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-nampally /clinic/nampally
d) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
e) node scripts/page-audit.mjs clinic-nampally /clinic/nampally r3
f) Open two or three screenshots and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R3 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R4. Patient experience (S7) and consultation block (S8)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R4 for clinic-nampally (/clinic/nampally): "A patient's experience in their own words." (S7) and the consultation block "Ready to visit Nampally? Call, or get directions." (S8).

Open first: the patient and consultation components built in the Mehdipatnam work (see its CHANGELOG entry R5), components/sections/PatientStories.tsx, components/sections/ContactNextStep.tsx and CSS (read-only; import, never edit).

Files you may edit: those components and CSS Modules listed OWNED in OWNERSHIP.md, new files under components/pages/clinic-nampally/, docs/internal-pages/clinic-nampally/. Anything else: stop and explain.

Do:
1. S7: keep the red italic on "in their own words.". Desktop: video in its dark frame on the left with max-height: var(--media-max-h) and a hairline border; quote card on the right, content centred vertically (no more than 35% empty). Mobile: heading, video (cap var(--media-max-h-compact)), then the quote. Keep native controls, poster and every attribute; set preload="none" if not already; no autoplay; no loop unless already present; pause when under 50% in view; never play under prefers-reduced-motion or saveData. The quote and its attribution stay exactly as the snapshot shows (do not retype them).
2. S8: if the block is the shared ContactNextStep, change only the spacing around it. If it is local, restyle it to match using this page's CSS Module; keep every word and button label (including any number). Record the difference from the standard's "Call for Consultation" label in CONTENT_QUESTIONS.md.
3. The dark video frame must sit on a light band so the page does not gain a third dark section in a row. The page ends light, red, dark footer.
4. Add no captions or transcript; if none exist, add an entry to CONTENT_QUESTIONS.md.

Acceptance (checkable):
- Video src, poster and controls unchanged; no autoplay attribute; no media over 70% of the viewport.
- Quote and attribution identical to the snapshot.
- Primary action at least 44 px tall; no horizontal overflow at 360 or 390.
- content check missing: 0 for both branches.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-nampally /clinic/nampally
d) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
e) node scripts/page-audit.mjs clinic-nampally /clinic/nampally r4
f) Open two or three screenshots and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R4 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R5. Visit FAQ (S9), conditional

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R5 for clinic-nampally (/clinic/nampally): Visit FAQ (S9).

First check that docs/internal-pages/clinic-nampally/FAQ_APPROVED.md exists. If it does not, write "R5 skipped: FAQ not approved" in CHANGELOG.md and stop.

Open first: the FAQ built for Mehdipatnam if it exists (docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md, entry R6), components/sections/ExperienceIntro.tsx (native details pattern), PAGE_PLAN.md section 7 (proposed questions).

Files you may edit: new files under components/pages/clinic-nampally/, lib/pages/clinic-nampally-content.ts, the branch template to insert the section between S7 and S8 (render it only when the branch slug is nampally; reuse the Mehdipatnam FAQ component if it exists, passing this page's data), docs/internal-pages/clinic-nampally/. If the approved file lists different questions, use those. Anything else: stop and explain.

Do:
1. Put the questions and answers in lib/pages/clinic-nampally-content.ts as one typed array. Use only facts from lib/clinic-data.ts, lib/site-data.ts and the page's existing copy; each answer: one direct sentence, then at most two supporting sentences. No prices, outcomes or medical claims. Hours, address and phone are read from the data files, never typed. "Medwin Hospital Complex" only as the page writes it.
2. Render with native details, first open, no numbering, hairline dividers, chevron, smooth open (transform and opacity only), all answers in the server HTML. Plain heading, no red italic.
3. If the approved file asks for FAQPage schema or the Mehdipatnam FAQ has it, generate it from the same array so it matches the visible text word for word; otherwise add none. This is the only permitted change to page JSON-LD.
4. Add internal links inside answers (treatment pages, Mehdipatnam, contact) with descriptive anchors.

Acceptance (checkable):
- Visible FAQ equals the array word for word; first item open.
- content check for Nampally reports missing: 0 (additions are allowed); content check for Mehdipatnam reports missing: 0 and its page shows no Nampally FAQ.
- No text under 12 px; no horizontal overflow.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-nampally /clinic/nampally
d) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
e) node scripts/page-audit.mjs clinic-nampally /clinic/nampally r5
f) Open two screenshots and describe them.

Report: append the R5 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R6. Motion and polish

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6 for clinic-nampally (/clinic/nampally): motion and polish check across all sections.

Open first: components/motion/Reveal.tsx and CountUp.tsx (read-only), components/hero/ CSS (class-keyed header animation), PAGE_PLAN.md section 6 (motion plan), docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md (entry R7, the section-by-section reveal list).

Files you may edit: the owned section components and CSS Modules, docs/internal-pages/clinic-nampally/. Anything else: stop and explain.

Do:
1. Walk the page against the motion plan (section 6). Every section, including the dark gallery with its gradient captions and the FAQ if present, needs its reveal exactly as planned. Fix only gaps; do not rebuild what the Mehdipatnam run already made.
2. Confirm hover lift on cards and buttons (desktop only), press state on touch, smooth open on details.
3. Under prefers-reduced-motion: final state, no transforms, no drift. On phones: no glow breathing, drift, zoom or parallax. Hidden initial states come only from classes added by JavaScript: check that the 390-wide no-JavaScript screenshot shows every heading and paragraph.
4. No layout-property animation; will-change only on continuously running header layers; reserve media space with aspect-ratio.
5. Do not add libraries. Do not change any content.

Acceptance (checkable):
- A section-by-section list in CHANGELOG.md naming the reveal used on each.
- The no-JavaScript 390 screenshot shows all headings and paragraphs.
- No transition or animation on width, height, top, left, margin or padding in the owned CSS (grep and report).
- content check missing: 0 for both branches.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-nampally /clinic/nampally
d) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
e) node scripts/page-audit.mjs clinic-nampally /clinic/nampally r6
f) Open two or three screenshots, including the no-JavaScript one, and describe them.

Report: append the R6 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R7. Final fast check and screenshots (both branches)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R7 for clinic-nampally (/clinic/nampally): final fast check and screenshots. Fix only what the checks find, within the files you own.

Do:
1. Walk through the page top to bottom in the dev server screenshots at 1366x650 and 390x844. For each section confirm: it follows the pattern in PAGE_PLAN.md section 4; there is a visible on-scroll reveal; no card is more than 35% empty; no media is over 70% of the viewport; nothing overflows at 360; red italic appears only on the h1, "your care." and "in their own words."; the dark bands are S1, S3 and S5 with light bands between them.
2. Run the fast check from "Agent rules" item 9 with run-id final. Also run node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam and node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam nampally-final, and report whether the Mehdipatnam page looks the same as in its own final screenshots (compare against .audit/clinic-mehdipatnam/final/). Allow at most two fix-and-recheck cycles.
3. Save full-page desktop (1440 wide) and mobile (390 wide) screenshots of Nampally as .audit/clinic-nampally/final/desktop-full.png and mobile-full.png (the audit script's full-page shots are acceptable). Print their absolute paths.
4. Write the final CHANGELOG.md entry: files changed in the whole Nampally work (the owner commits by path, together with the Mehdipatnam list), content check results for both branches, audit numbers, forks made, shared-change requests, open questions, and anything not done.

Do not: add new design work, build, run Lighthouse or deep tests, start servers, or use git write commands.
Report: pass or fail per check, the screenshot paths, the open items.
```

---

## 11. Acceptance and rating rubric

Reviewed from screenshots in the Claude chat after each prompt. Final rating covers desktop and mobile separately, target 9 to 9.5.

| Area | What passes |
|---|---|
| Content | Zero missing units on Nampally against the pre-redesign baseline and on Mehdipatnam; same photo count, link count, alt texts, captions, quote; metadata and JSON-LD identical |
| Design language | Tokens only; Manrope and DM Serif Display; plain eyebrows; no ghost numerals, brackets, arcs, micro-labels; red italic only on `h1`, S5 and S7 |
| Surfaces and rhythm | Dark bands are S1, S3 (gallery), S5; never more than two dark in a row; dark bands use the layer recipe; gradient captions on dark photos; no card more than 35% empty |
| Media | Nothing over 70% of the viewport; photos `cover` with focal points; no stacked large images on mobile; video keeps controls, poster, `preload="none"` |
| Mobile | No overflow at 360 and 390; body at least 15 px; labels at least 12 px; tap targets at least 44 px; headline and primary action first; swipe rows with dots |
| Motion | Every section has a visible reveal; header animation; reduced-motion final state; readable with JavaScript off |
| SEO, AEO, GEO | One `h1`; link count not lower; hours, address and phone from the data files; no old signboard timings anywhere; FAQ only if approved and matching its schema |
| Consistency | Nampally and Mehdipatnam feel like one system (same card, glass, button and spacing values), differing only in content and the gallery's tone |

---

## 12. Open owner questions

1. **Run order and plan choice (Q1).** This plan assumes the Mehdipatnam plan finished under Plan A. If you chose Plan B, tell me and I will rewrite R1 to R4.
2. **FAQ (Q2).** Approve the five proposed questions (section 7) by creating `docs/internal-pages/clinic-nampally/FAQ_APPROVED.md`, or skip R5.
3. **Signboard (Q3).** The Nampally signboard is out of date. The street-front photo (header and gallery) may show the old board. Photos are never removed by the agent. Do you want to replace that photo with a new one? If so, supply it and I will add a replace-the-asset step; until then it stays.
4. **Video (Q4).** Captions or a transcript for the patient video, and where patient consent is recorded. Nothing will be invented.
5. **Wayfinding facts (Q5).** Visitors must find a clinic inside the Medwin Hospital Complex. If you want a short "how to find us" line (floor, landmark, entrance), send the facts; none are on the site today and none will be guessed.
6. **Rating line (Q6).** Confirm the Google-style rating in the Visit card is current. It stays as written; no `aggregateRating` schema.
7. **Quote text (Q7).** R0 confirms the exact patient quote from the snapshot; the plan quotes it only loosely because the screenshot is small.
8. **Dark gallery on Mehdipatnam (Q8, optional).** Nampally's dark gallery gives the page a better rhythm than Mehdipatnam's three light bands in a row. After both pages are done, we can try the dark variant on Mehdipatnam too (a one-prop change in this template). Not part of this plan.
9. **Team list (Q9).** Confirm names and roles shown are current. R0 lists them; none are edited.

---

## 13. Agent rules (Appendix A, verbatim; slug and route filled in)

```
AGENT RULES (binding for every run on this page)

You are one of several coding sessions working in this repository at the same time, each on a different page. Another session may be editing other files while you work.

1. CONTENT: Never delete, shorten, summarise, reword, merge or hide any text, image, video, document, caption, alt text, link, button, form field or structured-data field. Re-place, re-layout and restyle only. Repeated content stays. Questionable copy goes into docs/internal-pages/clinic-nampally/CONTENT_QUESTIONS.md, not into an edit. Mobile and desktop carry the same content. Collapsed text is a native <details> with the full text in the server HTML. Metadata exports and JSON-LD in page.tsx stay byte-identical.
2. DESIGN: Match the home page. Fonts: Manrope (body), DM Serif Display (headings). Colours only from the existing tokens (ink #263033, charcoal #161c1e, ivory #f8f6ef, surface #fffefa, red #d71920, dark red #b5121a). Before building a section, open the home component named in the plan and its CSS and copy its pattern, spacing and radii. No numbered eyebrows, ghost numerals, roman numerals, corner brackets, registration marks, arcs, rotated edge labels, meta strips, labels under 12 px, or repeated red-italic headline formula. Eyebrows are plain words. No card with more than 35% empty space. Primary button "Call for Consultation" (tel link from lib/site-data.ts: ctaTelPhone, ctaPhone; never hard-code a number), secondary "Send an enquiry" linking to /contact.
3. MEDIA: No image or video taller than 70% of the viewport height (use max-height: var(--media-max-h) or var(--media-max-h-compact)). Photos use object-fit: cover with a focal point; documents (cuttings, certificates, radiographs) use contain, whole, tap to zoom. Two large images never stack on mobile: use one image or a swipe row with every image in the DOM. next/image with sizes and aspect-ratio; priority only on the main header image. Videos: muted playsInline loop, preload="none" with a poster, play only while in view, not under prefers-reduced-motion.
4. MOBILE: 360x740, 390x844, 768x1024. No horizontal overflow. Body 15px or more, labels 12px or more, tap targets 44x44 or more. Headline and primary action first, then media (at most 38dvh) or a swipe row (overflow-x auto, scroll-snap, cards 82 to 88% wide).
5. MOTION: Every section needs a visible on-scroll reveal. Use components/motion/Reveal.tsx (variants rise, fade, mask; delay; stagger) and CountUp.tsx, read-only. Stagger card grids, mask-reveal key photos, draw connecting lines with scroll, crossfade tabs. 300 to 700 ms, ease-out. Animate transform and opacity only. Hidden initial states must be applied by JavaScript-added classes so the page reads with JavaScript off. prefers-reduced-motion: final state, no transforms. No continuous animation on phones. No new libraries.
6. SEO / AEO / GEO: One h1 with entity words, headings in order, every internal link kept with its anchor, descriptive alt text, JSON-LD kept, schema only for visible content, no aggregateRating, no invented facts, prices, claims or outcomes. Clinic names, addresses, phones, hours and doctor facts come from lib/site-data.ts, lib/clinic-data.ts and lib/clinical-team.ts. Hours: Mehdipatnam Mon-Sat 4:00 PM to 8:00 PM; Nampally Mon-Sat 10:30 AM to 5:00 PM. Dr. Muti Ur Rahman is MBBS / MD (General Medicine), never a dental specialist. Write "a Neodent specialist" for consultations. Do not add the phrase "Smile Designer" anywhere new.
7. FILES: Edit only files listed as OWNED in docs/internal-pages/clinic-nampally/OWNERSHIP.md or new files under components/pages/clinic-nampally/, lib/pages/clinic-nampally-content.ts and docs/internal-pages/clinic-nampally/. Before editing any existing component, run grep -rl "<Name>" app components to see if anything else imports it; if so it is shared: copy it into components/pages/clinic-nampally/ and switch this page to the copy. CSS Modules only; no new global classes. Never edit app/globals.css, app/layout.tsx, components/layout/*, components/Home.tsx, components/hero/*, components/motion/*, components/sections/ContactNextStep*, components/ui/*, components/consent/*, components/analytics/*, lib/site-data.ts, lib/clinical-team.ts, lib/clinic-data.ts, lib/structured-data.ts, lib/og-image.tsx, lib/featured-treatment-catalog.ts, package.json, lockfiles, config files, existing scripts, existing files in public/, or any other page's files. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append (cat >> file <<'EOF').
8. COMMANDS: Never run npm run build, npm install, npm ci, next dev, next start, or anything that touches .next or node_modules. Never start or stop a server: the owner's dev server is at http://localhost:3000; if it is unreachable, stop and say so. Never git commit, stash, checkout, reset, restore, clean, rebase, merge, pull or push. Allowed: git status, git diff -- <your paths>. If a compile error is in a file you do not own, wait 30 seconds and retry once, then report it; never fix it.
9. VERIFY (fast check only, then stop): (a) npx tsc --noEmit, output filtered to your owned paths; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs clinic-nampally /clinic/nampally must report zero missing; (d) node scripts/page-audit.mjs clinic-nampally /clinic/nampally <run-id> (three viewports); (e) open two or three screenshots and describe them. At most two fix-and-recheck cycles. No Lighthouse, no deep or exhaustive tests, no extra viewports. Aim to finish in 20 to 30 minutes; if a step is taking much longer, stop and report.
10. REPORT: Append an entry to docs/internal-pages/clinic-nampally/CHANGELOG.md: run id, files changed, summary, content check result (missing: N), audit numbers, questions for the owner, shared-change requests made, screenshot paths (absolute), anything unfinished. End your reply with the screenshot paths. Leave all changes uncommitted.
```

### Page-specific addendum (Plan A continued, binding)

This addendum adapts rules 7 and 9 to the shared branch template. It does not relax any content, design, media, motion or command rule.

1. `/clinic/nampally` and `/clinic/mehdipatnam` are rendered by `app/clinic/[slug]/page.tsx`. Files imported only by that page and the clinic family (the branch template and any fork the Mehdipatnam session made under `components/pages/clinic-mehdipatnam/`) are OWNED by this session and may be edited in place. Anything also imported by `/clinic` (the hub) or any other route is shared: fork it under `components/pages/clinic-nampally/` and switch the template to the copy.
2. `app/clinic/[slug]/page.tsx` may be edited for imports, wrappers and props only. `generateMetadata`, `generateStaticParams` and every JSON-LD block stay byte-identical.
3. Nampally-specific values (hours, address, phone, photos, captions, quote, tone of the gallery band) come from data or props keyed by slug. Nothing is hard-coded in a shared component. Mehdipatnam must keep rendering exactly as it did when its own final run passed.
4. After every run, `node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam` must report zero missing. This session may read `docs/internal-pages/clinic-mehdipatnam/` and `docs/internal-pages/clinic-nampally-guard/`, and may write `.audit/clinic-mehdipatnam/nampally-final/` for the regression audit in R7. It writes nothing else outside its own folders.
5. The content baseline for Nampally is the snapshot taken before the Mehdipatnam work (`docs/internal-pages/clinic-nampally-guard/content-snapshot.json`), copied in R0. Never replace it with a newer snapshot.
6. Do not run any other `/clinic` family session at the same time.

---

## Appendix B. Prompt preamble (verbatim, slug filled in)

Used at the top of every prompt above.

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-nampally/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-nampally/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-nampally/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.
```
