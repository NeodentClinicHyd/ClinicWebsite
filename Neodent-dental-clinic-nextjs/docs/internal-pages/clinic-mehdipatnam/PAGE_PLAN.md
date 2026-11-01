# PAGE_PLAN: Clinic page, Mehdipatnam (`/clinic/mehdipatnam`)

## 0. Header

| Field | Value |
|---|---|
| Page | Neodent Dental Hospital Mehdipatnam (branch page) |
| Route | `/clinic/mehdipatnam` (served by the dynamic route `app/clinic/[slug]/page.tsx`, which also serves `/clinic/nampally`) |
| Slug | `clinic-mehdipatnam` |
| Family | Clinic family (Part 11.4): `/clinic` and `/clinic/[slug]` share `components/clinic/*` and `components/clinic/branch/*`. One session at a time. Do not run `/clinic` or `/clinic/nampally` sessions while this plan runs. |
| Model | Sonnet 5.5 in Kiro CLI |
| Dev server | Owner's `npm run dev` at `http://localhost:3000` must be running before every run |
| Date | 2 Nov 2026 |
| Status | Draft for owner review. Two owner decisions are needed before R0 (section 12, Q1 and Q2). |
| Saved at | `docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md` |
| Prompt count | R0 to R8 (R6 is conditional on owner approval of an FAQ) |

**Placeholders filled in.** In Appendix A and B below, `<slug>` is replaced by `clinic-mehdipatnam` and `<route>` by `/clinic/mehdipatnam`. The wording is otherwise verbatim.

**Important template fact.** `/clinic/mehdipatnam` and `/clinic/nampally` come from one `page.tsx` and one set of branch components. Polishing the template polishes both branches. Section 8 and the addendum in section 13 explain how this plan handles that safely (a Nampally content guard runs after every prompt).

---

## 1. Page facts

- **Purpose.** The local landing page for the Mehdipatnam clinic: where it is, when it is open, what it looks like inside, which treatments are offered there, who the team is, what patients say, and how to call or get directions.
- **Audience.** (1) Patients near Mehdipatnam and Humayun Nagar deciding where to go, about 80% on a phone. (2) Returning patients who need the address, hours and phone. (3) Prospective clinic owners who see this site as a flagship showcase.
- **Search intent and target queries** (only phrases already on the site or approved in the standard): "Neodent Dental Hospital Mehdipatnam", "dental hospital in Mehdipatnam", "dental hospital Hyderabad", "Neodent Mehdipatnam hours", "Neodent Mehdipatnam address / directions". Treatment queries ("dental implants Mehdipatnam", "root canal treatment Mehdipatnam" and so on) are served by the seven featured treatment links with descriptive anchors.
- **Conversion goal.** A phone call (primary) or a directions tap (secondary), then the enquiry form at `/contact`.
- **Fixed facts for this page** (from the standard, Part 1): Mehdipatnam is open Monday to Saturday, 4:00 PM to 8:00 PM; Sunday is a holiday. All seven treatments are offered. Founded 1994. Spelling "Mehdipatnam". Lead with "dental hospital". The page's own copy says the clinic began in Humayun Nagar; keep that wording exactly as written.

---

## 2. Screenshot findings

**Read this first.** Both screenshots are small and downscaled. I can judge structure, order, rhythm, density and obvious problems. I cannot read body text, measure font sizes or tap targets, see motion, or confirm exact names, numbers and addresses. Those are listed as R0 or owner checks. Scores are provisional.

### Desktop (about 1440 px), top to bottom

| # | Section (as it appears) | Findings | Score |
|---|---|---|---|
| 1 | Dark page header: breadcrumb, eyebrow, `h1` "Neodent Dental Hospital *Mehdipatnam*", intro paragraph, red call button plus a second button, large reception photo with a small caption on the right | Good composition and clear hierarchy. The photo fills the right half well. No glass cards, no layer depth visible (flat dark band). Eyebrow and breadcrumb look very small; check 12 px. Cannot judge motion. | 7.5 |
| 2 | Light band "Where Neodent began, *in Humayun Nagar.*": three short paragraphs on the left, "Visit & contact" card on the right (address, phones, hours, a rating line, Call and Get directions buttons) | Useful and well placed. Reading column looks wide for the text size; target 65 to 72 characters. The card is visually quiet; the Call action competes with the Get directions action. Red-italic phrase formula starts here. | 7 |
| 3 | "Inside Mehdipatnam, *room by room.*": nine-photo masonry gallery with captions, intro line mentions selecting a photo | Strongest section on desktop; real photography, varied heights. Captions look small. Several photos look tall; check the 70% viewport cap. Cannot see whether a lightbox opens. | 7.5 |
| 4 | "Featured dental treatments *at Mehdipatnam.*": seven small cards (icon, title, one line, link) plus an "Additional dental services" panel of short items and an "Explore all treatments" link | Seven cards in a four-column grid leave one empty slot. Cards look sparse and text looks small. The additional-services panel reads as a dense wall of tiny items. Fourth use of the red-italic formula. | 6.5 |
| 5 | Dark band "The people behind *your care.*": group photo on the left, team list on the right (names with short roles) | Warm, human, and the right use of a dark band. The list is dense and low-contrast at small sizes. Backdrop is flat (no red glow or icon pattern). | 7 |
| 6 | Row of two cards: dark doctor card (Dr. Miftah Ur Rahman) and a Nampally cross-link card with a small photo; "Back to the clinic overview" link below | Good idea (doctor and sibling clinic). Cards look unequal in weight; check the 65% fill rule. The dark doctor card follows a dark band, so check the two-dark-in-a-row rule against the band above. | 6.5 |
| 7 | "A patient's experience *in their own words.*": large video with native controls on the left, quote card on the right ("It was very beneficial, and I am feeling good.") | Strong proof. Video looks very tall for the section (check 70% cap). Quote card is small next to it, so there is empty space. | 7 |
| 8 | Red consultation block "Planning a visit to Mehdipatnam? *Call, or get directions.*" with two buttons | Clear and on brand. Confirm whether this is the shared `ContactNextStep` or a local block. | 8 |
| 9 | Dark footer "Changing smiles since 1994." (global) | Global. Out of scope. | n/a |

**Overall desktop: 7 / 10 (provisional).** Solid structure, correct order, real photos. It lacks depth on dark bands, has the red-italic headline formula on every section, small type in several places, and a sparse treatments grid.

### Mobile (about 390 px), top to bottom

| # | Section | Findings | Score |
|---|---|---|---|
| 1 | Header | Stacks in a sensible order (heading, copy, buttons, photo). Cannot judge type sizes. Check photo height (target at most 38dvh). | 7 |
| 2 | Visit & contact | Card follows the intro. Check 44 px tap targets on phone numbers and buttons. | 7 |
| 3 | Gallery | Photos appear to stack one under another as a very long column. This breaks the rule "two or more large images stacked vertically are not allowed on mobile". Biggest mobile problem. | 4.5 |
| 4 | Featured treatments | Seven cards appear as a long vertical list, followed by the services list. Long and repetitive. | 5.5 |
| 5 | People | Group photo then a long list. Acceptable but long; check line contrast on dark. | 6.5 |
| 6 | Doctor card and Nampally card | Stacked, each with its own image. Check image height. | 6 |
| 7 | Patient video | Video then quote. Check height and that the controls are tappable. | 6.5 |
| 8 | Consultation block | Clear. | 8 |

**Overall mobile: 6 / 10 (provisional).** Target after the plan: 9 to 9.5 on both.

### Cross-section problems (from the ban list and standard)

- The "headline with red italic phrase" appears on at least five sections. Standard allows it on the page `h1` and at most one section in three. That means two of the six body sections.
- Backdrops on the dark bands are flat. The standard's layer recipe (3.6) is missing.
- Rhythm: after the dark header, the page alternates light, light, light, dark, light, light, red. Three light bands in a row at the top. Fix with surface treatment (paper versus surface tint, hairline rules) and by varying patterns, not by reordering.
- Cannot be judged from screenshots: motion, hover states, lightbox, the video's poster and controls, the exact text of anything, tap sizes, contrast values, whether the doctor and Nampally cards have the same height on all widths. All go to R0 or the audit script.

---

## 3. Content map (everything here must survive; R0 verifies against the real page)

Text blocks are named, not rewritten. R0 records any difference in `DISCOVERY.md`.

**Page level**
- Metadata for the branch (title, description, canonical, robots, Open Graph), `generateMetadata`, and all JSON-LD blocks for the clinic (expected: a dental or local-business type with address, phone, hours, `foundingDate: "1994"`, no `aggregateRating`). Byte-identical.

**S1. Page header**
- Breadcrumb (Home, Clinics, Mehdipatnam) with links.
- Eyebrow text.
- `h1` "Neodent Dental Hospital Mehdipatnam".
- Intro paragraph (the plain supporting copy).
- Primary call button (`tel:` link) and a second button (directions).
- Header photo (reception) with alt text and caption.

**S2. "Where Neodent began, in Humayun Nagar."**
- Heading.
- Three short paragraphs (R0 confirms the count).
- "Visit & contact" card: label, address, phone numbers, hours, a rating line, Call button, Get directions button, any email line.

**S3. "Inside Mehdipatnam, room by room."**
- Heading and intro line (mentions selecting a photo).
- About nine photographs, each with alt text and a caption (waiting lounge, reception, consultation and treatment rooms, and others; R0 lists all captions and file names).
- Any lightbox or zoom behaviour and its labels.

**S4. "Featured dental treatments at Mehdipatnam."**
- Heading and intro line.
- Seven treatment cards (composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design, full mouth rehabilitation, scaling and polishing): icon, title, one-line description, link to each treatment page.
- "Additional dental services" panel: heading, intro line, the list of additional services (R0 notes whether items are links).
- "Explore all treatments" link to `/treatments`.

**S5. "The people behind your care."**
- Heading and intro line.
- Group photograph with alt text and caption.
- Team list (names, roles, qualifications as written) and the link to the doctors page.

**S6. Doctor card and Nampally card**
- Dr. Miftah Ur Rahman card: name, role, supporting lines, any portrait, link to `/doctors/dr-miftah-ur-rahman`.
- Nampally card: heading, short line, photo with alt text, link to `/clinic/nampally`.
- "Back to the clinic overview" link to `/clinic`.

**S7. "A patient's experience in their own words."**
- Heading and intro line.
- Patient video (source, poster, controls) and any caption.
- Quote "It was very beneficial, and I am feeling good." with its attribution line.

**S8. Consultation block**
- "Planning a visit to Mehdipatnam? Call, or get directions." with its buttons and labels.

**Global (out of scope):** navigation, footer, mobile call bar, lead-capture modal, cookie banner.

---

## 4. Target layout, section by section

General rules for all sections: keep order; reuse tokens; padding and container width copied from `LegacyStory.module.css` and the `ExperienceIntro` rules; CSS Modules only; card radius from `ClinicalLeadership.module.css`; one heading, one supporting line, one focal element or action per section.

**Heading treatment (page-wide decision).** Keep the red italic accent on the `h1` (place name), on S5 ("your care.") and on S7 ("in their own words."). Remove the italic-red styling from S2, S3 and S4 headings (plain ink, same words). This is a style change only; every word stays. Rationale: standard 3.3 (at most one section in three). Owner approves in Q5.

### S1. Page header band: pattern P1
- **Reference:** `components/hero/Hero.tsx` and its CSS (layers, glass cards, media rise) in a compact form.
- **Desktop:** two columns. Left: breadcrumb, eyebrow, `h1`, supporting line, action pair. Right: the reception photo with the standard's frame (hairline, radius, soft shadow), `max-height: var(--media-max-h)`, `object-fit: cover` with a focal point on the reception desk and seating. Two small dark glass cards overlap the photo's lower edge: opening hours (from `lib/clinic-data.ts`) and location line ("Humayun Nagar, Mehdipatnam", taken from the page's own copy). Whole band fits 1366 x 650 (heading, photo, action).
- **Mobile:** breadcrumb, eyebrow, `h1`, supporting line, buttons, then the photo (at most 38dvh, `aspect-ratio` 4/3) with the two facts as a two-chip row below it. No glow breathing or drift.
- **Backdrop:** layer recipe from 3.6 (gradient, red radial glow behind the photo, icon pattern as a luminance `mask-image` over an ivory fill fading to zero before the text column).
- **Motion:** per 8.2 page header row (see section 6).
- **Empty-card check:** glass cards hold two lines each; centre vertically.
- **SEO:** `h1` unchanged; the supporting paragraph already says dental hospital, Mehdipatnam and Hyderabad (R0 confirms); if not, add one plain line using only approved phrases.

### S2. "Where Neodent began": pattern P3 (lede and depth) plus a side card
- **Reference:** `ExperienceIntro.tsx` "Care begins" for the reading column; `LegacyStory.tsx` for spacing.
- **Desktop:** reading column at 65 to 72 characters on the left; Visit & contact card on the right, sticky below the navigation (`top` offset equal to the nav height plus 24 px). Card: `--neodent-surface` fill, hairline, soft shadow. Rows with plain labels (Address, Phone, Hours, Rating line), each row at least 44 px tall where it is a link. Buttons: Call (red) first, Get directions (outline) second.
- **Mobile:** lede and reading column first, card second, full width. If the three paragraphs total more than about 120 words, paragraph three moves into a native `<details>` ("depth") at all breakpoints (full text in the server HTML). Otherwise all stay visible.
- **Media:** none.
- **Empty-card check:** the card is content-sized, not stretched.
- **Motion:** heading `mask`, paragraphs `rise` stagger, card `rise` with delay.
- **SEO:** keep every phone as a `tel:` link and the address text exactly as written; directions link unchanged.

### S3. Gallery: pattern P7 (swipe row) with a desktop grid
- **Reference:** `ClinicalLeadership.tsx` team row and `PatientStories.tsx` for the swipe row; `LegacyStory.tsx` press row for the zoom behaviour.
- **Desktop:** keep the masonry feel but tame it: a four-column grid with a repeating rhythm (two tall, two short), every photo `max-height: var(--media-max-h-compact)`, `object-fit: cover` with a per-photo `object-position`, hairline border, radius, soft shadow, caption below the photo (light section). Tap or click opens the existing lightbox (or a new client lightbox in this page's folder if none exists).
- **Mobile:** one swipe row: `overflow-x: auto; scroll-snap-type: x mandatory;` cards 84 to 88% wide so the next one peeks, each card a photo (`aspect-ratio` 4/3, at most `--media-max-h-compact`) with its caption beneath. Progress dots (no "02 / 09" counter). Keyboard accessible (focusable row, arrow keys scroll). All nine photos present in the DOM. Never two large photos stacked.
- **Empty-card check:** n/a.
- **Motion:** photos `mask` reveal with 1.04 to 1 settle, staggered 80 to 100 ms; optional parallax of at most 24 px on the single largest photo (desktop only).
- **SEO:** keep alt text as written; images use `next/image`, correct `sizes`, lazy.

### S4. Featured treatments and additional services: pattern P6 plus a list panel
- **Reference:** `Expertise.tsx` cards for the seven treatments.
- **Desktop:** a four-column grid: row one has four cards, row two three cards plus an eighth cell that holds the existing "Explore all treatments" link as a dark card (the link moves into that cell; it is not duplicated). Cards: surface fill, hairline, icon top, title, one line, "Explore" link; whole card is the tap target; hover lift. Body text 15 px or more. Cards grouped so content fills at least 65% of the height.
- **Additional dental services panel:** a wide, light card under the grid: heading and intro line on the left (about one third), the services as a wrapped list of chips or a two-column list on the right. If the items are links, each chip is at least 44 px tall.
- **Mobile:** the seven cards become one swipe row (cards 84 to 88% wide, progress dots). The additional-services panel is one column with a wrapped chip list. The "Explore all treatments" card ends the row; the same words remain.
- **Motion:** stagger rise on cards (80 to 120 ms); chips fade in as a block.
- **SEO:** each card links to its treatment page with its existing anchor text; link count never falls. Treatment names stay the plain, searchable words.

### S5. People: pattern P5 split with P10-style list rows
- **Reference:** `ClinicalLeadership.tsx` (rows and cards), `LegacyStory.tsx` split layout.
- **Dark band** with the 3.6 recipe, pattern fading out before the text column. Not more than two dark sections in a row: S1 dark, S2 to S4 light, S5 dark, S6 light.
- **Desktop:** group photo on the left (cover, focal point on the faces, hairline, radius, caption on a dark gradient at the bottom, `max-height: var(--media-max-h)`); on the right the team as dark glass rows (name, role as written, optional credential line). Heading with red italic on "your care." (large, passes 3:1). Link to the doctors page as a ghost button under the list.
- **Mobile:** heading, photo (at most 38dvh), then compact glass rows (each row at least 44 px tall, no more than three lines). If the list is longer than about two phone screens, the rows from the fifth onward go into a native `<details>` labelled "More of the team" (full text in the server HTML). R0 confirms the count.
- **Checks to hold:** Dr. Muti Ur Rahman's credential line reads MBBS / MD (General Medicine) exactly, never "dental specialist". No "Smile Designer" added.
- **Motion:** heading `mask`; photo `mask` reveal; rows `rise` stagger 80 ms.

### S6. Doctor card and Nampally card: P10 plus P15
- **Reference:** `ClinicalLeadership.tsx` doctor card; `LegacyStory.tsx` for the paper card style.
- **Desktop:** two equal-height cards side by side on a light band. Doctor card: dark glass look (as on S5, same surface values) with the quote only if it is already in the card ("Save the natural teeth till the last stage." exactly), name, role, portrait if present, "view profile" link. Nampally card: light surface, photo on one side at most 160 px tall, heading, line, link. Both cards have content filling at least 65% of their height; the shorter card is vertically centred, not stretched with decoration. "Back to the clinic overview" stays as a quiet text link under the row.
- **Mobile:** the two cards become a swipe row (86% wide each, dots). Photos inside are small (at most 120 px) so there are never two large stacked images.
- **Dark-run check:** this band must be light (or the doctor card a contained dark card on a light band). It must not form a third dark section in a row.
- **Motion:** cards `rise` with 100 ms stagger; hover lift on desktop.
- **SEO:** both links keep their anchors; add nothing new.

### S7. Patient experience: pattern P5 split with a video
- **Reference:** `PatientStories.tsx` for the quote card; `LegacyStory.tsx` for the split.
- **Desktop:** video on the left with `max-height: var(--media-max-h)` and a hairline frame (keep native controls); the quote as a surface card on the right, content-centred vertically so the empty-card rule holds. Heading red italic "in their own words." as agreed.
- **Mobile:** heading, video (`aspect-ratio` kept, at most 52dvh compact cap, or 38dvh if it is a landscape clip), then the quote card.
- **Video rules:** `playsInline`, `preload="none"` with the existing poster; do not remove the native controls (a patient speaking needs sound under the viewer's control, and the clip is not autoplayed). Pause when less than 50% in view. Never autoplay under `prefers-reduced-motion` or `saveData`. No loop on a spoken clip unless it is already set (keep existing attributes).
- **Motion:** video frame `mask` reveal; quote card `rise` 150 ms after.
- **SEO:** keep video source, poster and caption. Captions or a transcript are an owner question (Q6); do not invent them.

### S8. Consultation block: pattern P16
- **Reference:** `components/sections/ContactNextStep.tsx` (shared: import it, never edit it).
- If R0 finds this page already imports the shared component, change nothing except its position and the spacing around it. If the block is local to the branch components, restyle it to match `ContactNextStep` using only this page's CSS Module, keeping the wording and buttons exactly as they are (including any number in a button label).
- Last body section before the footer. A red block on a light band is a good end, so S7 stays light.
- **Motion:** heading `rise`, buttons rise 100 ms later.

### S9 (addition, needs owner approval, Q2). Visit FAQ: pattern P14
- Position: after S7, before S8.
- Native `<details>`, first one open, no numbering, hairline dividers, chevron, smooth open. Built from facts already on the site only. Data in `lib/pages/clinic-mehdipatnam-content.ts` so the visible list and any `FAQPage` JSON-LD come from the same array, word for word. See section 7 for the proposed questions.
- Only built if the owner creates `docs/internal-pages/clinic-mehdipatnam/FAQ_APPROVED.md`.

---

## 5. Page header spec

| Item | Spec |
|---|---|
| Breadcrumb | Keep (Home, Clinics, Mehdipatnam), real links, 12 px or more, 44 px tall hit area via padding |
| Eyebrow | Existing words, plain, 12 px or more, no numbering, no wide all-caps micro-labels |
| `h1` | "Neodent Dental Hospital Mehdipatnam" (R0 confirms the exact text). Place name in red italic (allowed on the page `h1`). Uses `--type-hero-primary` |
| Supporting line | The existing intro paragraph; plain, 16 px on phones, line height about 1.6, not more than 72 characters wide |
| Actions | Existing primary red call button (min 44 px, `tel:` from `lib/site-data.ts`, never a hard-coded number) and the existing second button for directions. Keep both labels exactly as they are. "Send an enquiry" is carried by S8 |
| Media | Reception photograph, `priority` (the only one on the page), `next/image` with `sizes`, `aspect-ratio`, focal point on the reception desk; hairline, radius, soft shadow; mask reveal with 1.04 to 1 settle |
| Glass cards | Two: opening hours (Mon to Sat, 4:00 PM to 8:00 PM, read from `lib/clinic-data.ts`) and "Humayun Nagar, Mehdipatnam". `rgba(16,21,23,0.72)`, 1 px `rgba(255,255,255,0.12)` border, radius 0.35rem, `backdrop-filter: blur(8px)` inside `@supports`. Fade up at 450 and 600 ms |
| Backdrop | Layers from 3.6: gradient `--neodent-charcoal` to `#0f1315`; red radial glow (alpha about 0.30) with custom properties for its centre; icon pattern (`/assets/backgrounds/neodent-treatments-icon-pattern-dark.webp`) as a luminance `mask-image` over an ivory fill, never a CSS `background-image`, fading out before the text column; content. Glow breathing and pattern drift only at 768 px and wider |
| Mobile order | Breadcrumb, eyebrow, `h1`, supporting line, actions, photo (at most 38dvh), two fact chips |
| Header animation | Keyed off a CSS class (not `Reveal`), because the header is on screen at mount: headline line-mask on load, supporting line and actions rise in about 100 ms steps, media rise 24 px and fade, glass cards at 450 and 600 ms |

---

## 6. Motion plan

| Section | Elements | Variant | Stagger / timing | Notes |
|---|---|---|---|---|
| S1 header | Headline, supporting line, actions, photo, 2 glass cards, backdrop | Class-keyed load animation | Lines 100 ms; photo rise 24 px with 1.04 to 1 settle; cards at 450 and 600 ms | Glow 1 to 0.85 over 9 s and drift about 10 px over 18 s only at 768 px and up |
| S2 intro | Heading, 3 paragraphs, Visit card | `mask` heading, `rise` paragraphs, `rise` card | 100 ms; card delay 200 ms | No motion on the sticky behaviour |
| S3 gallery | Heading, intro, photos | `mask` photos | 80 to 100 ms | Optional 24 px parallax on the largest desktop photo only |
| S4 treatments | Heading, 7 cards plus link card, additional services panel | `rise` stagger | 80 to 120 ms; chips fade as one block | Hover lift on cards (desktop); press state on touch |
| S5 people | Heading, photo, glass rows | `mask` heading and photo, `rise` rows | 80 ms | Backdrop drift only at 768 px and up |
| S6 doctor + Nampally | 2 cards | `rise` | 100 ms | Hover lift on desktop |
| S7 patient | Heading, video, quote | `mask` video, `rise` quote | quote +150 ms | No autoplay |
| S9 FAQ (if approved) | Heading, items | `rise`; open/close height or opacity ease | 60 ms | First item open |
| S8 consultation | Heading, buttons | `rise` | buttons +100 ms | |
| Count-ups | Only if R0 finds numbers (for example the rating line or years): `CountUp`; do not add numbers just for motion | | | Final value on the server and under reduced motion |

All durations 300 to 700 ms, ease-out, `transform` and `opacity` only. Reduced motion: final state, no transforms, no drift. Phones: reveals yes, no continuous animation. Hidden initial states come from classes added by JavaScript so the page reads with JavaScript off.

---

## 7. SEO, AEO, GEO checklist for this page

**Entities and facts to keep identical everywhere:** Neodent Dental Hospital (written "Neodent" in running text), Mehdipatnam, Humayun Nagar (only as already written on this page), Hyderabad, address and phones from `lib/clinic-data.ts` / `lib/site-data.ts`, hours Monday to Saturday 4:00 PM to 8:00 PM, Sunday holiday, founded 1994, all seven treatments offered.

**Metadata and schema:** `generateMetadata`, canonical, robots, Open Graph and all JSON-LD for this branch stay byte-identical. No `aggregateRating`. `foundingDate: "1994"` stays. Any FAQ schema only matches the visible FAQ exactly.

**Headings:** exactly one `h1`. Section headings are `h2`; card titles `h3`. No headings replaced by styled divs. The site's poetic lines keep their words; the supporting lines carry the searchable phrases.

**Internal links that must exist (R0 records the real list; the count must never fall):**
- Each of the seven treatment pages (from S4 cards) and `/treatments`.
- `/clinic/nampally` (S6), `/clinic` (back link and breadcrumb), `/` (breadcrumb), `/doctors` and `/doctors/dr-miftah-ur-rahman` (S5, S6), `/contact` (S8 or header if present).
- `tel:` links and the directions link.

**Images:** natural descriptive alt text stays as written; decorative layers `aria-hidden`; `priority` only on the header photo.

**FAQ status:** none on the page today. Proposed addition for the owner to approve (S9). Each answer opens with a one-sentence direct answer, then at most two supporting sentences, using only site facts:
1. *When is the Mehdipatnam clinic open?* Monday to Saturday, 4:00 PM to 8:00 PM; closed Sunday.
2. *Where is Neodent Dental Hospital Mehdipatnam?* The address exactly as on the page, in Mehdipatnam, Hyderabad, with the directions link.
3. *Which treatments are available at Mehdipatnam?* All seven treatments, named with links to their pages.
4. *How do I book a consultation?* Call the clinic number, or send an enquiry through the contact page. A Neodent specialist will see you.
5. *Is there another Neodent clinic?* Yes, the Nampally clinic, with its hours (Monday to Saturday, 10:30 AM to 5:00 PM) and a link.
The agent builds these only from the data files above and never adds costs, outcomes or medical claims.

**Do not do:** change the founder or doctor facts, add "Smile Designer", add reviews or ratings that are not already visible, or create captions or a transcript for the patient video.

---

## 8. Ownership forecast and concurrency notes

**The template issue.** `app/clinic/[slug]/page.tsx` renders both branches. The standard's fork rule cannot be applied to a single branch without editing that shared file. This plan therefore uses **Plan A (recommended): treat the branch template as owned by this one clinic-family session**, polish it for both branches in one pass, and protect Nampally with a content guard. Result: Nampally gets the same upgrade for free and then needs only a short review run, not a full plan. **Plan B** (fork into `components/pages/clinic-mehdipatnam/` and add a one-line switch in `page.tsx`) gives a Mehdipatnam-only change but leaves two designs to maintain; it is not recommended. Owner decides in Q1. Prompts below are written for Plan A; for Plan B, R0 changes only the ownership lists and R1 onward target the forked copies.

**Expected OWNED (Plan A, R0 verifies by grep that no other route imports them):**
- `app/clinic/[slug]/page.tsx` (imports, wrappers and props only; metadata and JSON-LD untouched)
- `components/clinic/branch/*` and their CSS Modules
- New: `components/pages/clinic-mehdipatnam/*`, `lib/pages/clinic-mehdipatnam-content.ts`, `docs/internal-pages/clinic-mehdipatnam/*`, `docs/internal-pages/clinic-nampally-guard/*`, `.audit/clinic-mehdipatnam/*`

**Expected SHARED READ-ONLY:** `components/sections/ContactNextStep*`, `components/motion/*`, `components/ui/*`, `components/layout/*`, `lib/site-data.ts`, `lib/clinic-data.ts`, `lib/clinical-team.ts`, `lib/structured-data.ts`, `lib/featured-treatment-catalog.ts`, `app/globals.css` (tokens only), and anything under `components/clinic/*` (outside `branch/`) that the `/clinic` hub also imports.

**Expected forks:** any file under `components/clinic/branch/` or elsewhere that R0 finds is also imported by `/clinic` or another route. Fork into `components/pages/clinic-mehdipatnam/` and switch the branch template to the copy.

**Do not run at the same time:** any `/clinic` or `/clinic/nampally` session. Other families (about, treatments, doctors, contact, privacy) can run in parallel, but note that `/doctors/*` pages read `lib/clinical-team.ts`, which is read-only here.

**Expected shared-change requests (append to `_shared-requests.md`):**
- A tokenised "dark glass card" class or custom properties, if the page repeats it three or more times.
- If the shared consultation block cannot show the Mehdipatnam-specific heading, a prop request for `ContactNextStep`. (R0 will tell.)
- Gallery lightbox: if one exists in `components/ui/*` but cannot be styled for this gallery, a request for a style hook.

**Guard for Nampally.** Because the template is shared, every prompt runs the content check against Nampally too: `node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally` must report zero missing. This guard exists only to prove that no content was lost on the sibling branch; its design is not reviewed in this plan.

---

## 9. Run sequence

| Run | Scope | Files (main) | Depends on | Time |
|---|---|---|---|---|
| G0 | Shared tooling, **only if not already run** | `scripts/page-*.mjs`, `docs/internal-pages/README.md` | none | 20 min |
| R0 | Discovery, snapshots (Mehdipatnam and Nampally guard), ownership | `docs/internal-pages/clinic-mehdipatnam/*`, `docs/internal-pages/clinic-nampally-guard/*` | G0, owner answers Q1 and Q2 | 15 to 20 min |
| R1 | Foundation, page header (S1), intro and Visit card (S2) | branch header and intro components, page wrapper | R0 | 25 min |
| R2 | Gallery (S3) | gallery component, lightbox | R1 | 25 min |
| R3 | Featured treatments and additional services (S4) | treatments component | R1 | 25 min |
| R4 | People (S5), doctor and Nampally cards (S6) | people and doctor components | R1 | 30 min |
| R5 | Patient experience (S7), consultation block (S8) | patient and consultation components | R1 | 25 min |
| R6 | FAQ (S9), **only if `FAQ_APPROVED.md` exists** | `lib/pages/clinic-mehdipatnam-content.ts`, FAQ component | R5 | 20 min |
| R7 | Motion and polish | all owned section files | R2 to R6 | 25 min |
| R8 | Final fast check and screenshots | owned files only, docs | R7 | 20 min |

R2 to R5 can be run in separate sessions only if their files do not overlap, but the family rule says one session at a time, so run them in order in one Kiro session.

---

## 10. Prompts

Each prompt starts with the Appendix B preamble verbatim (slug filled in). Send one at a time and wait for it to finish.

### G0 (run once, alone, before any page; skip if already done)

Use Appendix C from the standard unchanged.

### R0. Discovery and snapshot

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R0 for clinic-mehdipatnam (/clinic/mehdipatnam): discovery and content snapshot. This run changes no site code.

Do:
1. Confirm http://localhost:3000/clinic/mehdipatnam and http://localhost:3000/clinic/nampally both respond. If not, stop and say so.
2. Run node scripts/page-content-snapshot.mjs clinic-mehdipatnam /clinic/mehdipatnam. Then run node scripts/page-content-snapshot.mjs clinic-nampally-guard /clinic/nampally. The second is a regression guard only; the Nampally design is not part of this work. These two snapshots are the content baselines.
3. Find the page's files: app/clinic/[slug]/page.tsx and every component, CSS Module and data file it imports (follow imports). For each file run grep -rl on its name across app, components and lib to see who else imports it. Write docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md with OWNED, SHARED READ-ONLY and FORK CANDIDATES, one line of role per file. Apply the "Page-specific addendum (Plan A)" in PAGE_PLAN.md section 13: files imported only by app/clinic/[slug]/page.tsx and the clinic family are OWNED; any file also imported by /clinic (the hub) or another route is a FORK CANDIDATE with a planned copy path under components/pages/clinic-mehdipatnam/. If you find that the owner has not recorded a decision for Q1 in docs/internal-pages/clinic-mehdipatnam/OWNER_DECISIONS.md, stop after writing OWNERSHIP.md and say so.
4. Map the rendered sections to the plan's content map (section 3). Write docs/internal-pages/clinic-mehdipatnam/DISCOVERY.md with: the section list in order (heading, component, file); content found that the plan missed; sections in the plan that do not exist; exact h1 text; the three intro paragraphs' word count; the gallery photo count with file names, alt text, captions and whether a lightbox exists; whether the additional dental services are links; the team list (names, roles as written, count); the portrait and Nampally card images; the video attributes (controls, poster, loop, preload, muted, autoplay) and caption; whether S8 is the shared ContactNextStep or a local block; button labels; the existing JSON-LD types; the internal links and their anchors; any text under 12 px or tap target problems you can read from the CSS (do not run extra viewport sweeps).
5. List copy that looks wrong, ungrammatical or unverifiable in docs/internal-pages/clinic-mehdipatnam/CONTENT_QUESTIONS.md (quote it; do not edit it). Include the rating line, any address inconsistency between the page and lib/clinic-data.ts, and any spelling of "Mehdipatnam" that differs.
6. Create docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md with an R0 entry.

Do not: edit any file outside docs/internal-pages/clinic-mehdipatnam/, docs/internal-pages/clinic-nampally-guard/ and .audit/clinic-mehdipatnam/; start or stop servers; build; install; or use git write commands.
Report: files created, the ownership summary, differences between the plan and the real page, questions for the owner.
```

### R1. Foundation, page header (S1), intro and Visit card (S2)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R1 for clinic-mehdipatnam (/clinic/mehdipatnam): foundation, page header band (S1), and the "Where Neodent began" section with the Visit & contact card (S2).

Open first: components/hero/Hero.tsx and its CSS (layers, glass cards, media rise) for S1; components/sections/ExperienceIntro.tsx ("Care begins") and components/sections/LegacyStory.module.css (padding, container width) for S2.

Files you may edit: those listed OWNED in OWNERSHIP.md that belong to the page wrapper, header and intro; new files under components/pages/clinic-mehdipatnam/; lib/pages/clinic-mehdipatnam-content.ts; docs/internal-pages/clinic-mehdipatnam/. app/clinic/[slug]/page.tsx only for imports, wrappers and props (metadata and JSON-LD stay byte-identical). Anything else: stop and explain.

Do:
1. Apply the ownership plan from OWNERSHIP.md: make the forks it names under components/pages/clinic-mehdipatnam/ and switch the template to the copies. Add a page wrapper class that sets this page's custom properties.
2. S1 per PAGE_PLAN.md section 5 and section 4 (S1): keep every word, link and the photo and its alt text and caption. Build the backdrop layers from the Hero CSS recipe inside this page's own CSS Module (do not import hero classes). Add the two glass cards using hours from lib/clinic-data.ts and the "Humayun Nagar, Mehdipatnam" text as already written on the page. Header animation keyed off a CSS class.
3. Remove the red-italic styling from the S2 heading only (plain ink, same words). Build S2 per section 4 (S2): reading column at 65 to 72 characters, sticky Visit & contact card on desktop, full-width card on mobile, 44 px tap targets, Call first then Get directions. Use a native details for paragraph three only if the three paragraphs exceed about 120 words, at all breakpoints.
4. Keep every phone as a tel: link and the address text unchanged. No hard-coded numbers.

Acceptance (checkable):
- h1 text identical to DISCOVERY.md; one h1; breadcrumb links present.
- No media taller than 70% of the viewport at 390x844, 768x1024, 1366x650; the header photo is the only image with priority.
- No horizontal overflow at 390 and 768; no text under 12 px; header and intro tap targets at least 44 px at 768 and below.
- The S1 band fits 1366x650 with the heading, photo and primary action visible.
- Glass cards present on desktop and as a chip row on mobile; no glow or drift on phones.
- content check reports missing: 0 for both pages.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
d) node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally
e) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam r1
f) Open two or three screenshots from .audit/clinic-mehdipatnam/r1/ and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R1 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R2. Gallery (S3)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R2 for clinic-mehdipatnam (/clinic/mehdipatnam): the "Inside Mehdipatnam, room by room." gallery (S3).

Open first: components/sections/ClinicalLeadership.tsx (swipe row) and components/sections/PatientStories.tsx (swipe row with dots), components/sections/LegacyStory.tsx (press row, tap to zoom).

Files you may edit: the gallery component and CSS Module listed OWNED in OWNERSHIP.md, new files under components/pages/clinic-mehdipatnam/ (including a client lightbox if none exists), docs/internal-pages/clinic-mehdipatnam/. Anything else: stop and explain.

Do:
1. Remove the red-italic styling from this heading only (plain ink, same words). Keep the heading, intro line, every photograph, every alt text and every caption.
2. Desktop: four-column grid with a repeating rhythm; each photo uses object-fit: cover with its own object-position, max-height: var(--media-max-h-compact), hairline border, radius and soft shadow from the home cards; caption beneath on this light section. Click opens the existing lightbox, or a new client lightbox in this page's folder (focus trap, Escape to close, arrow keys, alt text and caption shown).
3. Mobile: one swipe row (overflow-x: auto; scroll-snap-type: x mandatory; cards 84 to 88% wide, next card peeks, focusable, arrow-key scroll). Each card: photo at aspect-ratio 4/3, caption below. Progress dots, no "02 / 09" counter. All photographs stay in the DOM. Never two large photos stacked.
4. next/image with correct sizes and aspect-ratio; all lazy (no priority).

Acceptance (checkable):
- Photo count in the DOM equals DISCOVERY.md; every alt text and caption unchanged.
- At 390x844 the gallery is a single horizontal row; at 768 and 1366 no photo exceeds 70% of the viewport height.
- No horizontal page overflow at 360 or 390 (only the row scrolls).
- Dots and the lightbox buttons are at least 44x44.
- content check missing: 0 for both pages.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
d) node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally
e) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam r2
f) Open two or three screenshots (gallery on mobile and desktop) and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R2 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R3. Featured treatments and additional services (S4)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R3 for clinic-mehdipatnam (/clinic/mehdipatnam): "Featured dental treatments at Mehdipatnam" cards and the "Additional dental services" panel (S4).

Open first: components/sections/Expertise.tsx and its CSS (cards, icons, hover), components/sections/ClinicalLeadership.module.css (card radius).

Files you may edit: the treatments component and CSS Module listed OWNED in OWNERSHIP.md (or its fork under components/pages/clinic-mehdipatnam/), docs/internal-pages/clinic-mehdipatnam/. Do not edit lib/featured-treatment-catalog.ts or the treatment pages. Anything else: stop and explain.

Do:
1. Remove the red-italic styling from this heading only (plain ink, same words).
2. Desktop: four-column grid; row one four cards, row two three cards plus an eighth cell that holds the existing "Explore all treatments" link as a dark card (move the link; do not duplicate it). Cards: surface fill, hairline, icon, title, one line, "Explore" link; the whole card is the tap target; subtle hover lift; body text 15 px or more; content fills at least 65% of the card height.
3. Additional dental services: a wide light panel under the grid with heading and intro on the left and the services as a wrapped chip or two-column list on the right. If the items are links, each is at least 44 px tall. Every item stays.
4. Mobile: the seven cards in one swipe row (84 to 88% wide, dots), the link card last; the services panel in one column.
5. Every card link keeps its href and anchor text.

Acceptance (checkable):
- Seven cards, seven treatment hrefs unchanged, one link to /treatments (moved, not duplicated).
- No empty grid slot at 1366 and 1440.
- Card text at least 15 px on phones; chips at least 44 px tall if links.
- No horizontal page overflow at 360 or 390.
- content check missing: 0 for both pages; link count not lower.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
d) node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally
e) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam r3
f) Open two or three screenshots and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R3 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R4. People (S5), doctor and Nampally cards (S6)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R4 for clinic-mehdipatnam (/clinic/mehdipatnam): "The people behind your care." (S5) and the Dr. Miftah and Nampally cards (S6).

Open first: components/sections/ClinicalLeadership.tsx and ClinicalLeadership.module.css (rows, cards, glass), components/hero/ CSS for the backdrop layer recipe (copy into this page's own CSS Module, do not import), components/sections/LegacyStory.tsx (split layout).

Files you may edit: the people and doctor components and CSS Modules listed OWNED in OWNERSHIP.md (or their forks under components/pages/clinic-mehdipatnam/), docs/internal-pages/clinic-mehdipatnam/. lib/clinical-team.ts is read-only. Anything else: stop and explain.

Do:
1. S5: keep the red italic on "your care." (large size only). Build the dark band with the layer recipe (gradient, red radial glow, icon pattern as luminance mask-image over an ivory fill, fading to zero before the text column). Desktop: group photo left (cover, focal point on faces, max-height: var(--media-max-h), caption on a dark gradient at the bottom), team as dark glass rows right (rgba(16,21,23,0.72), 1px rgba(255,255,255,0.12), radius 0.35rem, blur(8px) in @supports), doctors-page link as a ghost button. Mobile: photo at most 38dvh, then compact rows at least 44 px tall. If the team list is longer than about two phone screens collapsed, rows from the fifth onward go in a native details labelled "More of the team" (full text in the server HTML).
2. S6: this band must be light, so S5 is the only dark section between S1 and the footer. Two equal-height cards: Dr. Miftah (dark contained card, quote only if already present, exact text "Save the natural teeth till the last stage.") and Nampally (light card, small photo at most 160 px tall). Both fill at least 65% of their height; vertically centre the shorter content. Mobile: swipe row of two cards, photos at most 120 px so large images never stack. Keep "Back to the clinic overview" as a text link under the row.
3. Dr. Muti Ur Rahman stays MBBS / MD (General Medicine) as written. Do not add the phrase "Smile Designer". Do not change any name, role or credential.

Acceptance (checkable):
- Every team name, role and credential from DISCOVERY.md is present in the server HTML, in the same order.
- No card more than 35% empty; no media over 70% of the viewport.
- Pattern is invisible behind any heading or paragraph.
- No horizontal overflow at 360 or 390; tap targets at least 44 px at 768 and below.
- content check missing: 0 for both pages.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
d) node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally
e) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam r4
f) Open two or three screenshots and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R4 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R5. Patient experience (S7) and consultation block (S8)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R5 for clinic-mehdipatnam (/clinic/mehdipatnam): "A patient's experience in their own words." (S7) and the consultation block (S8).

Open first: components/sections/PatientStories.tsx and CSS (quote card, video), components/sections/ContactNextStep.tsx and CSS (read-only; import it, never edit it).

Files you may edit: the patient-experience and consultation components and CSS Modules listed OWNED in OWNERSHIP.md (or forks under components/pages/clinic-mehdipatnam/), docs/internal-pages/clinic-mehdipatnam/. Anything else: stop and explain.

Do:
1. S7: keep the red italic on "in their own words.". Desktop: video left with max-height: var(--media-max-h) and a hairline frame, quote card right, content centred vertically (no more than 35% empty). Mobile: heading, video (cap var(--media-max-h-compact)), then the quote card. Keep the native controls, poster and every existing attribute. Set preload="none" if not already; do not add autoplay or loop; pause when less than 50% in view; never play under prefers-reduced-motion or saveData. Keep the quote text and attribution exactly as written.
2. S8: if DISCOVERY.md says the block is the shared ContactNextStep, change nothing in it, only spacing around it. If it is a local block, restyle it in this page's CSS Module to match ContactNextStep, keeping every word, button label and link exactly as they are (labels that include a number stay as they are; record the difference from the standard's "Call for Consultation" label in CONTENT_QUESTIONS.md). S7 stays light so the page ends light, red, dark footer.
3. No new captions or transcript; if none exist, add an entry to CONTENT_QUESTIONS.md.

Acceptance (checkable):
- Video src, poster, controls unchanged; no autoplay attribute; no media over 70% of viewport.
- Quote and attribution identical to the snapshot.
- Primary action at least 44 px tall; no horizontal overflow at 360 or 390.
- content check missing: 0 for both pages.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
d) node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally
e) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam r5
f) Open two or three screenshots and describe them.

If anything conflicts with the content rules: relocate, do not delete; record it in CONTENT_QUESTIONS.md.
Report: append the R5 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R6. Visit FAQ (S9), conditional

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6 for clinic-mehdipatnam (/clinic/mehdipatnam): Visit FAQ (S9).

First check that docs/internal-pages/clinic-mehdipatnam/FAQ_APPROVED.md exists. If it does not, write "R6 skipped: FAQ not approved" in CHANGELOG.md and stop.

Open first: components/sections/ExperienceIntro.tsx (native details pattern), PAGE_PLAN.md section 7 (proposed questions).

Files you may edit: new files under components/pages/clinic-mehdipatnam/, lib/pages/clinic-mehdipatnam-content.ts, the branch template to insert the section between S7 and S8 (this page only: render it only when the branch slug is mehdipatnam), docs/internal-pages/clinic-mehdipatnam/. If the approved file lists different questions, use those. Anything else: stop and explain.

Do:
1. Put the questions and answers in lib/pages/clinic-mehdipatnam-content.ts as one typed array. Answers use only facts from lib/clinic-data.ts, lib/site-data.ts and the page's existing copy; each starts with one direct sentence, then at most two supporting sentences. No prices, outcomes or medical claims. Hours, address and phone are read from the data files, never typed.
2. Render with native details, first open, no numbering, hairline dividers, chevron, smooth open (transform and opacity only). All answers in the server HTML. Headline with a plain supporting line; no red italic.
3. If the page already has FAQ JSON-LD or the approved file asks for FAQPage schema, generate it from the same array so it matches the visible text word for word; otherwise add no schema. This is the only permitted change to page JSON-LD.
4. Add internal links inside answers (treatment pages, Nampally, contact) with descriptive anchors.

Acceptance (checkable):
- Visible FAQ equals the array word for word; first item open.
- content check for Mehdipatnam reports missing: 0 (additions are allowed); the Nampally guard reports missing: 0 and its page shows no new FAQ.
- No new text under 12 px; no horizontal overflow.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
d) node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally
e) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam r6
f) Open two screenshots and describe them.

Report: append the R6 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R7. Motion and polish

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R7 for clinic-mehdipatnam (/clinic/mehdipatnam): motion and polish across all sections.

Open first: components/motion/Reveal.tsx and CountUp.tsx (read-only), components/hero/ CSS (class-keyed header animation), PAGE_PLAN.md section 6 (motion plan).

Files you may edit: the owned section components and CSS Modules, docs/internal-pages/clinic-mehdipatnam/. Anything else: stop and explain.

Do:
1. Make sure every section has its reveal exactly as the motion plan says (variant, stagger, delay). Use Reveal for everything below the fold; use a CSS-class-keyed animation for the page header only.
2. Add hover lift on cards and buttons (desktop only, transform and opacity), press state on touch, smooth open on details.
3. Under prefers-reduced-motion: final state, no transforms, no drift. On phones: no glow breathing, drift, zoom or parallax. Hidden initial states come only from classes added by JavaScript: verify the 390-wide no-JavaScript screenshot shows the full text.
4. No layout-property animation; will-change only on the continuously running header layers; reserve media space with aspect-ratio so nothing shifts.
5. Do not add libraries. Do not change any content.

Acceptance (checkable):
- A section-by-section list in CHANGELOG.md naming the reveal used on each.
- The no-JavaScript 390 screenshot shows all headings and paragraphs.
- No transition or animation on width, height, top, left, margin or padding in the owned CSS (grep and report).
- content check missing: 0 for both pages.

Fast check (then stop; at most two fix-and-recheck cycles):
a) npx tsc --noEmit (filter to your owned paths)
b) npx eslint <files you changed>
c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam
d) node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally
e) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam r7
f) Open two or three screenshots, including the no-JavaScript one, and describe them.

Report: append the R7 entry to CHANGELOG.md; end with the absolute screenshot paths. Leave changes uncommitted.
```

### R8. Final fast check and screenshots

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R8 for clinic-mehdipatnam (/clinic/mehdipatnam): final fast check and screenshots. Fix only what the checks find, within the files you own.

Do:
1. Walk through the page top to bottom in the dev server screenshots at 1366x650 and 390x844. For each section confirm: it follows the pattern in PAGE_PLAN.md section 4; there is a visible on-scroll reveal; no card is more than 35% empty; no media is over 70% of the viewport; nothing overflows at 360; red italic appears only on the h1, "your care." and "in their own words."
2. Run the fast check from "Agent rules" item 9 with run-id final, plus node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally and node scripts/page-audit.mjs clinic-nampally-guard /clinic/nampally final (for the Nampally audit, report findings only; do not redesign it). Allow at most two fix-and-recheck cycles.
3. Save full-page desktop (1440 wide) and mobile (390 wide) screenshots as .audit/clinic-mehdipatnam/final/desktop-full.png and mobile-full.png (the audit script's full-page shots are acceptable). Print their absolute paths.
4. Write the final CHANGELOG.md entry: files changed in the whole page redesign (the owner commits by path), content check results for both pages, audit numbers, forks made, shared-change requests, open questions, and anything not done.

Do not: add new design work, build, run Lighthouse or deep tests, start servers, or use git write commands.
Report: pass or fail per check, the screenshot paths, the open items.
```

---

## 11. Acceptance and rating rubric

The owner reviews screenshots in the Claude chat after each prompt. The final rating covers desktop and mobile separately, target 9 to 9.5.

| Area | What passes |
|---|---|
| Content | Zero missing units on both Mehdipatnam and the Nampally guard; same photo count, link count, alt texts, captions; metadata and JSON-LD identical |
| Design language | Tokens only; Manrope and DM Serif Display; plain eyebrows; no ghost numerals, roman numerals, brackets, arcs, micro-labels; red italic only on `h1`, S5 and S7 |
| Surfaces | Two or fewer dark bands in a row; dark bands use the layer recipe; cards share one radius and hairline; no card more than 35% empty |
| Media | Nothing over 70% of the viewport; photos `cover` with focal points; no stacked large images on mobile; video preload none, poster, native controls kept |
| Mobile | 360 and 390 no overflow; body at least 15 px; labels at least 12 px; tap targets at least 44 px; headline and primary action first; swipe rows with dots and the next card peeking |
| Motion | Every section has a visible reveal; header animation present; reduced-motion final state; page readable with JavaScript off |
| SEO, AEO, GEO | One `h1`; link count not lower; hours, address and phone from the data files; FAQ only if approved and matching its schema |
| Page quality | Clear path to a call or directions on every screen; ends with the consultation block |

---

## 12. Open owner questions

1. **Template ownership (Q1).** The branch template serves both Mehdipatnam and Nampally. Choose **Plan A** (recommended: polish the shared template, guard Nampally) or **Plan B** (fork, Mehdipatnam only). Record your choice in `docs/internal-pages/clinic-mehdipatnam/OWNER_DECISIONS.md` before R0. R0 stops if that file is missing.
2. **FAQ (Q2).** Approve the five proposed questions in section 7 (create `FAQ_APPROVED.md`, edit the list if you like), or skip R6.
3. **Header buttons (Q3).** The standard names the secondary action "Send an enquiry". This page's header uses a directions button, and content rules forbid relabelling. Keep as is, with "Send an enquiry" living in the consultation block? Default: yes.
4. **Call button label (Q4).** If the consultation block's button includes the phone number, keep it as written even though the standard says "Call for Consultation". Default: keep.
5. **Red italic reduction (Q5).** Approve removing the red italic from the S2, S3 and S4 headings (words unchanged).
6. **Video (Q6).** Do you have captions or a transcript for the patient video, and is patient consent recorded under the privacy policy? Nothing will be invented.
7. **Rating line (Q7).** The Visit card shows a rating (it looks like a Google rating). Confirm it is current and verifiable. It stays as written; no `aggregateRating` schema.
8. **Team list (Q8).** Confirm each name and role shown is current. R0 lists them; none are edited.
9. **Nampally review (Q9).** After this plan, run a short review chat for `/clinic/nampally` using the new template, rather than a full plan.
10. **G0 (Q10).** If the shared scripts from Appendix C are not yet in the repo, run G0 first.

---

## 13. Agent rules (Appendix A, verbatim; slug and route filled in)

```
AGENT RULES (binding for every run on this page)

You are one of several coding sessions working in this repository at the same time, each on a different page. Another session may be editing other files while you work.

1. CONTENT: Never delete, shorten, summarise, reword, merge or hide any text, image, video, document, caption, alt text, link, button, form field or structured-data field. Re-place, re-layout and restyle only. Repeated content stays. Questionable copy goes into docs/internal-pages/clinic-mehdipatnam/CONTENT_QUESTIONS.md, not into an edit. Mobile and desktop carry the same content. Collapsed text is a native <details> with the full text in the server HTML. Metadata exports and JSON-LD in page.tsx stay byte-identical.
2. DESIGN: Match the home page. Fonts: Manrope (body), DM Serif Display (headings). Colours only from the existing tokens (ink #263033, charcoal #161c1e, ivory #f8f6ef, surface #fffefa, red #d71920, dark red #b5121a). Before building a section, open the home component named in the plan and its CSS and copy its pattern, spacing and radii. No numbered eyebrows, ghost numerals, roman numerals, corner brackets, registration marks, arcs, rotated edge labels, meta strips, labels under 12 px, or repeated red-italic headline formula. Eyebrows are plain words. No card with more than 35% empty space. Primary button "Call for Consultation" (tel link from lib/site-data.ts: ctaTelPhone, ctaPhone; never hard-code a number), secondary "Send an enquiry" linking to /contact.
3. MEDIA: No image or video taller than 70% of the viewport height (use max-height: var(--media-max-h) or var(--media-max-h-compact)). Photos use object-fit: cover with a focal point; documents (cuttings, certificates, radiographs) use contain, whole, tap to zoom. Two large images never stack on mobile: use one image or a swipe row with every image in the DOM. next/image with sizes and aspect-ratio; priority only on the main header image. Videos: muted playsInline loop, preload="none" with a poster, play only while in view, not under prefers-reduced-motion.
4. MOBILE: 360x740, 390x844, 768x1024. No horizontal overflow. Body 15px or more, labels 12px or more, tap targets 44x44 or more. Headline and primary action first, then media (at most 38dvh) or a swipe row (overflow-x auto, scroll-snap, cards 82 to 88% wide).
5. MOTION: Every section needs a visible on-scroll reveal. Use components/motion/Reveal.tsx (variants rise, fade, mask; delay; stagger) and CountUp.tsx, read-only. Stagger card grids, mask-reveal key photos, draw connecting lines with scroll, crossfade tabs. 300 to 700 ms, ease-out. Animate transform and opacity only. Hidden initial states must be applied by JavaScript-added classes so the page reads with JavaScript off. prefers-reduced-motion: final state, no transforms. No continuous animation on phones. No new libraries.
6. SEO / AEO / GEO: One h1 with entity words, headings in order, every internal link kept with its anchor, descriptive alt text, JSON-LD kept, schema only for visible content, no aggregateRating, no invented facts, prices, claims or outcomes. Clinic names, addresses, phones, hours and doctor facts come from lib/site-data.ts, lib/clinic-data.ts and lib/clinical-team.ts. Hours: Mehdipatnam Mon-Sat 4:00 PM to 8:00 PM; Nampally Mon-Sat 10:30 AM to 5:00 PM. Dr. Muti Ur Rahman is MBBS / MD (General Medicine), never a dental specialist. Write "a Neodent specialist" for consultations. Do not add the phrase "Smile Designer" anywhere new.
7. FILES: Edit only files listed as OWNED in docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md or new files under components/pages/clinic-mehdipatnam/, lib/pages/clinic-mehdipatnam-content.ts and docs/internal-pages/clinic-mehdipatnam/. Before editing any existing component, run grep -rl "<Name>" app components to see if anything else imports it; if so it is shared: copy it into components/pages/clinic-mehdipatnam/ and switch this page to the copy. CSS Modules only; no new global classes. Never edit app/globals.css, app/layout.tsx, components/layout/*, components/Home.tsx, components/hero/*, components/motion/*, components/sections/ContactNextStep*, components/ui/*, components/consent/*, components/analytics/*, lib/site-data.ts, lib/clinical-team.ts, lib/clinic-data.ts, lib/structured-data.ts, lib/og-image.tsx, lib/featured-treatment-catalog.ts, package.json, lockfiles, config files, existing scripts, existing files in public/, or any other page's files. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append (cat >> file <<'EOF').
8. COMMANDS: Never run npm run build, npm install, npm ci, next dev, next start, or anything that touches .next or node_modules. Never start or stop a server: the owner's dev server is at http://localhost:3000; if it is unreachable, stop and say so. Never git commit, stash, checkout, reset, restore, clean, rebase, merge, pull or push. Allowed: git status, git diff -- <your paths>. If a compile error is in a file you do not own, wait 30 seconds and retry once, then report it; never fix it.
9. VERIFY (fast check only, then stop): (a) npx tsc --noEmit, output filtered to your owned paths; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs clinic-mehdipatnam /clinic/mehdipatnam must report zero missing; (d) node scripts/page-audit.mjs clinic-mehdipatnam /clinic/mehdipatnam <run-id> (three viewports); (e) open two or three screenshots and describe them. At most two fix-and-recheck cycles. No Lighthouse, no deep or exhaustive tests, no extra viewports. Aim to finish in 20 to 30 minutes; if a step is taking much longer, stop and report.
10. REPORT: Append an entry to docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md: run id, files changed, summary, content check result (missing: N), audit numbers, questions for the owner, shared-change requests made, screenshot paths (absolute), anything unfinished. End your reply with the screenshot paths. Leave all changes uncommitted.
```

### Page-specific addendum (Plan A, binding; applies if the owner chose Plan A in Q1)

This addendum adapts rules 7 and 9 to the shared branch template. It does not relax any content, design, media, motion or command rule.

1. `/clinic/mehdipatnam` and `/clinic/nampally` are rendered by `app/clinic/[slug]/page.tsx`. Files imported **only** by that page (expected: `components/clinic/branch/*` and their CSS) are OWNED by this session, even though the Nampally branch also renders them. They may be edited in place. Anything also imported by `/clinic` (the hub) or any other route is shared: fork it under `components/pages/clinic-mehdipatnam/` and switch the template to the copy.
2. `app/clinic/[slug]/page.tsx` may be edited for imports, wrappers and props only. `generateMetadata`, `generateStaticParams` and every JSON-LD block stay byte-identical.
3. No Mehdipatnam-only values are hard-coded in an owned shared component. Hours, address, phone, photos and captions come from the data files by slug, so Nampally renders correctly with the same code. Mehdipatnam-only additions (the FAQ) render only when the slug is `mehdipatnam`.
4. After every run, `node scripts/page-content-check.mjs clinic-nampally-guard /clinic/nampally` must report zero missing. This session may write in `docs/internal-pages/clinic-nampally-guard/` and `.audit/clinic-nampally-guard/` for that purpose only.
5. Do not run any other `/clinic` family session at the same time.
6. If the owner chose Plan B, R0 must treat every file under `components/clinic/branch/*` as a fork candidate and the single permitted change to `page.tsx` is a branch on `slug === "mehdipatnam"` that renders the fork.

---

## Appendix B. Prompt preamble (verbatim, slug filled in)

Used at the top of every prompt above.

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic-mehdipatnam/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic-mehdipatnam/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic-mehdipatnam/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.
```
