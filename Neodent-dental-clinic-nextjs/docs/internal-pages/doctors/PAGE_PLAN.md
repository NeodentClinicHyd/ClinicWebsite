# PAGE_PLAN: Doctors (/doctors)

Save as: `docs/internal-pages/doctors/PAGE_PLAN.md`
First prompt to run: **R0** (discovery and snapshot). Nothing else touches the repo before R0.

---

## 0. Header

| Item | Value |
|---|---|
| Page | Doctors |
| Route | `/doctors` |
| Slug | `doctors` |
| Family | Doctors family: `/doctors` and `/doctors/dr-miftah-ur-rahman` share `components/doctors/*` and read `lib/clinical-team.ts` (read-only). One session at a time in this family. Do not run the `dr-miftah` plan while this one is running. |
| Model | Sonnet 5.5 in Kiro CLI |
| Dev server | The owner's, `http://localhost:3000`, must be running. Agents never start, stop or restart it. |
| Date | 1 Nov 2026 |
| Status | Draft v1 for owner approval |
| Inputs | Desktop screenshot of `/doctors` (1280 px wide) and a full-page screenshot of the home page. **No mobile screenshot was supplied**, so mobile is not judged here; R0 captures it with the audit script. |
| Placeholders | In the prompts and in section 13, `<slug>` is already replaced by `doctors` and `<route>` by `/doctors`. |

---

## 1. Page facts

**Purpose.** Introduce the whole clinical team of Neodent Dental Hospitals: the founder and the lead clinicians first, then the wider team of doctors who work together across both clinics (Mehdipatnam and Nampally), in the same format and structure the home page uses for its doctors section.

**What the owner asked for.**
1. The page lists only two doctors. It must show the full team.
2. The structure is not right. Follow the home page: same layout, same doctor cards, same section rhythm.
3. Present the doctors as one team working together in both clinics.

**Audience.** Patients in Hyderabad (80% on phones) who are about to book and want to know who will treat them; people who searched for a doctor or the dental hospital by name; referrers.

**Search intent and phrases.** Use only phrases that already appear on the page or in Part 1 of the standard: "dental hospital", "Neodent", "Hyderabad", "Mehdipatnam", "Nampally", "specialist-led dental care", "prosthodontist and implantologist", "since 1994". Nothing is invented.

**Conversion goal.** A call (primary: "Call for Consultation") or an enquiry (secondary: "Send an enquiry").

**Rules that matter on this page (from Part 1 of the standard).**
- Dr. Muti Ur Rahman holds MBBS / MD (General Medicine). He is never described as a dental specialist, in text or in schema. Group headings on this page must therefore be neutral ("The wider clinical team"), never "Dental specialists".
- All doctors handle all dental cases. No doctor is shown as handling only certain cases. Existing role lines stay as they are (content rule), but no new copy may narrow anyone to a case type.
- "Smile Designer" is not added anywhere.
- Consultations: write "a Neodent specialist".

---

## 2. Screenshot findings

### Home page (the reference), what the doctors section establishes
Read from the screenshot (small, so names and figures must be verified in R0 from the code):
- Heading "A steady hand. A human approach." with a plain supporting line.
- Two featured doctor cards side by side, each with a portrait, a role label, name, qualifications, specialisation, an experience figure ("32+" and "15+ years of experience" are visible) and a "View profile" link.
- A photo-and-text block "Dr. Miftah at work" with a link to his work and profile.
- A row titled "Our clinical team" with five portrait cards (name, qualification line, short detail). One card is a monogram placeholder instead of a portrait.
- The section is light, on ivory, with rounded paper cards and hairlines. It sits between dark bands.

### `/doctors` today, desktop (1280 px)

| Section | What it is | Problems | Score |
|---|---|---|---|
| Page header | Dark band: plain eyebrow "Our doctors" with a leading rule, h1 "The clinical team *behind Neodent.*" (red italic phrase), one supporting sentence. | No actions (call / enquiry). No media. The right half of the band is empty. No breadcrumb. Nothing that proves scale (no facts). | 5/10 |
| Two doctor cards | Two outlined text cards: Founder & Director (Dr. Mohd. Siraj Ur Rahman) and Prosthodontist & Implantologist (Dr. Md. Miftah Ur Rahman, with "View full profile"). | **No portraits.** Only two doctors. Cards are flat outlines with no experience figure. The Siraj card is about 35% empty at the bottom (breaks 4.1) and has no link while the Miftah card does, so the pair looks uneven. Role labels look near 12 px (to be measured in R0). The format does not match the home cards. | 3/10 |
| Closing line | "See both branches on the clinics page or get in touch to begin." | Small red text on charcoal: red is only allowed on charcoal at large sizes (Part 3.2), so these three links are below the contrast rule. Orphaned, with no band of its own. | 3/10 |
| Consultation block | **Missing.** The page goes straight from the closing line into the footer ("Changing smiles since 1994."). | Every page must end with the consultation block (P16). | 0/10 |
| Band rhythm | Header, body and footer are all dark. | Three dark areas in a row (limit is two, Part 3.4). No light band at all. | n/a |
| Footer, nav, call button | Global. | Not touched. (The fixed call button overlaps the "Designed & developed by" line in the screenshot; global, out of scope.) | n/a |

**Overall desktop rating: 4/10.** The wording and the h1 are good. The page is thin: it needs the full team, portraits, a light band, facts, both clinics and a consultation block.

**Mobile:** cannot be judged from the supplied screenshots. R0 captures 390 px and 360 px views and records findings in `DISCOVERY.md`. If the owner wants a review before R1, send a 390 px full-page screenshot of `/doctors` in the chat.

---

## 3. Content map (everything here must survive)

R0 verifies this against the live page and records differences.

**Header**
- Eyebrow: "Our doctors"
- h1: "The clinical team behind Neodent." (the words "behind Neodent." are the red italic phrase)
- Supporting paragraph: "Specialist-led dental care delivered across two Hyderabad locations, led by the clinicians who built the practice."

**Card 1**
- Label: "Founder & Director"
- Name: "Dr. Mohd. Siraj Ur Rahman"
- Credential line: "Dental Surgeon · Prosthodontist · Implantologist"
- Paragraph: "Founded Neodent in Hyderabad in 1994 and continues to lead its clinical direction across Mehdipatnam and Nampally."

**Card 2**
- Label: "Prosthodontist & Implantologist"
- Name: "Dr. Md. Miftah Ur Rahman"
- Credential line: "BDS, MDS, FICOI · Assistant Professor of Prosthodontics"
- Paragraph: "Leads implant, prosthodontic and full mouth rehabilitation care at both Neodent branches."
- Link: "View full profile" to `/doctors/dr-miftah-ur-rahman`

**Closing line**
- "See both branches on the clinics page or get in touch to begin." with two links: "clinics page" (to `/clinic`) and "get in touch" (to `/contact`).

**Not visible, but protected (R0 records them in the snapshot):** title, meta description, canonical, robots, Open Graph tags, every JSON-LD block, alt texts, any hidden text.

**Images and videos:** none are visible on the page today. R0 confirms.

**Forms:** none on the page body (the global lead-capture modal is not touched).

---

## 4. Target layout, section by section

### 4.0 Order and bands

| # | Section | Pattern | Band | Home component to open first |
|---|---|---|---|---|
| H | Page header (with breadcrumb, actions, media, glass cards) | P1 | dark | `components/hero/Hero.tsx` and its CSS (recipe in Part 3.6), compact form |
| S1 | Fact strip | P2 | light | `ExperienceIntro.tsx` (stat strip with `CountUp`) |
| S2 | Clinical leadership (the two existing cards) | P10 | light | `ClinicalLeadership.tsx`, featured cards, and `ClinicalLeadership.module.css` |
| S3 | Dr. Miftah at work | P5 | light | the home "Dr. Miftah at work" block (R0 finds the file; start from `ClinicalLeadership.tsx`) and `LegacyStory.tsx` for the split |
| S4 | The wider clinical team | P10 + P7 | dark | `ClinicalLeadership.tsx` team row |
| S5 | Both clinics, one team (with the existing closing line) | P15 | light | `SpacesDesignedAroundCare.tsx` branch cards |
| S6 | Questions (optional run R5) | P14 | light | native `details`, as in Part 5 |
| S7 | Consultation block | P16 | light | `components/sections/ContactNextStep.tsx` (import only, never edit) |

Dark bands: header and S4 only, never two in a row. The last body section before S7 is light. The footer is global.

**Moves, flagged for approval:** the existing closing line moves from the end of the card area to the bottom of S5 (same words, same two links). Nothing else moves. Order of the existing content is otherwise kept: header, then the two cards, then the closing line.

### H. Page header (P1)
See section 5.

### S1. Fact strip (P2)
- Light ivory strip directly under the header, hairline rules, four facts with `CountUp`, copied from the home `ExperienceIntro` strip: same markup pattern, same spacing.
- Facts, each taken from data that already exists on the site (do not retype numbers; import them or read the same source the home uses):
  1. Number of doctors and clinicians: computed from the team data (length of the list in `lib/clinical-team.ts`), so it never goes stale.
  2. Clinics: 2 (Mehdipatnam and Nampally).
  3. Years of specialist care since 1994: the same value the home strip uses.
  4. Patients treated: the same value the home strip uses.
- If a source value is hard-coded inside a home component and not exported, copy the same number into `lib/pages/doctors-content.ts` with a comment naming the source, and log a shared request to centralise it.
- Mobile: 2 x 2 grid. No ghost numerals. Labels 12 px or larger.
- Motion: stagger rise, `CountUp`.

### S2. Clinical leadership (P10), the two existing cards
- Heading block (addition): eyebrow "Clinical leadership", h2 and one plain supporting line, built only from facts already on the page (two clinicians guide care across Mehdipatnam and Nampally). No red italic phrase here (the header already uses it, and the formula is limited to one section in three).
- Two featured cards side by side on desktop, copied from the home featured cards: portrait on the left (`object-fit: cover`, focal point on the face, `max-height: var(--media-max-h-compact)`), text on the right: the existing label, name (h3), credential line and paragraph, then an experience figure with `CountUp` if the data holds a number for that doctor (never invented), then the link.
- Dr. Miftah's card keeps "View full profile". Dr. Siraj's card gets no link unless the home card links somewhere and R0 confirms the target exists; no profile page for him exists, so none is invented.
- Both cards the same height; text fills the card (empty-card rule 4.1). If a card would be more than 35% empty, the portrait gets taller within the cap or the text is vertically centred.
- Treatment mentions in the existing paragraph ("implant", "full mouth rehabilitation") become links to their treatment pages without changing a single word (Part 9.5). R0 finds the route slugs.
- Mobile: cards stack. Each card is horizontal and compact (portrait about 104 px wide on the left, label, name and credentials on the right, paragraph and link below), so no two large images stack. Tap targets 44 px.
- Motion: heading rise; cards stagger rise (100 ms); portrait mask reveal; hover lift on desktop.

### S3. Dr. Miftah at work (P5), addition
- Reuse the home block: one photograph (`cover`, focal point, media cap) beside text and the "See his work and profile" link, on the same light band. Use the same strings and the same image source the home uses (import them; do not retype). If R0 finds the block's content is hard-coded in a home component, copy it into `lib/pages/doctors-content.ts` verbatim and log a shared request.
- Desktop: photo left, text right. Mobile: photo first at no more than 38dvh, then text.
- This section is optional. If the owner answers "drop it" in section 12, R2 skips it.
- Motion: photo mask reveal with a slight settle (parallax of at most 24 px, desktop only); text rise.

### S4. The wider clinical team (P10 + P7), the main addition
- Dark band built with the recipe in Part 3.6 (gradient, red glow, icon-pattern mask), in the page's own CSS Module.
- Heading block: eyebrow "Clinical team", h2 (plain, for example "Doctors working together across both clinics"; the exact wording is an owner-approval item), supporting line: the team of doctors who care for patients at both the Mehdipatnam and Nampally clinics. **No grouping by specialty and no clinic tabs:** the owner says the doctors work together in both clinics, and all doctors handle all dental cases. One list.
- Cards: the members who appear in the home "Our clinical team" row (R0 confirms the list and order from `lib/clinical-team.ts`; the two featured doctors are not repeated, exactly as on the home page). Card = portrait (4:5, `cover`, face focal point, within the media cap), name (h3), qualification line, detail line, all copied from the same data and fields the home row uses. Dark glass card style from Part 3.4.
- Missing portrait: a neutral monogram card (Part 6.5), listed in the changelog. Dr. Muti Ur Rahman's card must show "MBBS / MD (General Medicine)" exactly as in the data and nothing that reads as dental specialist.
- Desktop: a grid, 4 across at 1280 px and wider, 3 across below. Mobile and tablet: swipe row (`overflow-x: auto; scroll-snap-type: x mandatory`, cards 82 to 88% wide, next card peeks, keyboard accessible, every card in the DOM), with progress dots, no "02 / 05" counter.
- Where a doctor has a profile page (today only Dr. Miftah, who is in S2), the link appears there. No new links are invented.
- Motion: heading rise; cards stagger rise 80 to 100 ms; portrait mask reveal.

### S5. Both clinics, one team (P15)
- Light band. Heading (plain): the doctors work at both clinics. Two compact cards, one per clinic: name, address, hours, phone, all from `lib/clinic-data.ts` and `lib/site-data.ts` (never hard-coded). Mehdipatnam: Monday to Saturday, 4:00 PM to 8:00 PM. Nampally: Monday to Saturday, 10:30 AM to 5:00 PM. Sunday is a holiday. Each card links to its clinic page (`/clinic/mehdipatnam`, `/clinic/nampally`) with a descriptive anchor.
- Directly under the cards: the existing closing line, same words, same two links ("clinics page", "get in touch"). On the light band the links use the ink-and-red treatment that passes contrast, not small red on charcoal.
- Do not import anything from `components/clinic/*` (that family is edited by a different session). Build the cards in this page's folder.
- Mobile: cards stack, tap targets 44 px.
- Motion: stagger rise.

### S6. Questions (P14), optional, run R5
- Native `details`, first open, hairline dividers, chevron, no numbering. Each answer: one direct sentence, then one or two supporting sentences, only from facts already on the site. See section 7 for the proposed questions. `FAQPage` JSON-LD only if it matches the visible text word for word and is generated from the same data array.
- Skipped entirely unless the owner approves (section 12).

### S7. Consultation block (P16)
- Import `ContactNextStep` exactly as sibling internal pages do (R0 reads how). Never edit it.

---

## 5. Page header spec

| Part | Spec |
|---|---|
| Band | Dark, layers per Part 3.6, written in this page's CSS Module (do not import hero classes). Compact: the composition fits 1366 x 650. |
| Breadcrumb (addition) | Visible "Home / Doctors" above the eyebrow, 14 px or larger, "Home" links to `/`. |
| Eyebrow | "Our doctors" (existing, plain words, 12 px or larger; the leading hairline rule may stay). |
| h1 | Unchanged: "The clinical team behind Neodent." with "behind Neodent." as the red italic phrase. Exactly one h1. |
| Supporting line | The existing sentence, unchanged. It already carries "specialist-led dental care", "Hyderabad". |
| Actions | Primary "Call for Consultation" (`tel:` from `ctaTelPhone`, text `ctaPhone` in `lib/site-data.ts`), secondary "Send an enquiry" to `/contact`. Minimum 44 px. |
| Media | One photograph on the right, within `--media-max-h-compact`, `cover`, face-safe focal point, `priority` (the only priority image on the page). Source: an existing image from `public/` (preferably a team or doctors photo; otherwise the clinic interior photo already used on the home hero). R0 lists candidates; the owner can swap. |
| Glass cards | Two dark glass cards over the media, fed by existing facts: "Two clinics: Mehdipatnam and Nampally" and "Since 1994". Fade up at 450 and 600 ms. |
| Mobile order | Breadcrumb, eyebrow, h1, supporting line, actions, media (at most 38dvh), glass cards as a two-column row below the media. |
| Motion | Class-keyed on load, not `Reveal` (see 8.1 note): headline line-mask reveal; supporting line and actions rise about 100 ms apart; media rises 24 px, fades, mask reveal, 1.04 to 1 settle. On 768 px and wider only: glow breathing and pattern drift. |

---

## 6. Motion plan

| Section | Elements | Variant | Stagger | Notes |
|---|---|---|---|---|
| H | h1, supporting line, actions, media, glass cards | class-keyed mask / rise / fade | 100 ms; glass cards at 450 and 600 ms | Glow breathing and pattern drift on 768 px and wider only |
| S1 | four facts | `rise` + `CountUp` | 80 ms | Final value under reduced motion and on the server |
| S2 | heading, two cards, portraits, experience figures | `rise`, `mask` for portraits, `CountUp` | 100 ms | Hover lift on desktop, press state on touch |
| S3 | photo, text | `mask` with settle, `rise` | 100 ms | Optional parallax at most 24 px on the photo, desktop only |
| S4 | heading, cards, portraits | `rise`, `mask` | 80 to 100 ms for the first row, then the same delay per row | Swipe row on mobile: reveal yes, no continuous animation |
| S5 | heading, two clinic cards, closing line | `rise` | 100 ms | Hover lift on cards |
| S6 | questions | `rise`; open and close fade smoothly | 60 ms | Optional |
| S7 | consultation block | its own motion | n/a | Not touched |

All motion: 300 to 700 ms, ease-out, `transform` and `opacity` only, hidden start state applied by a JavaScript-added class, final state under `prefers-reduced-motion`, no continuous animation on phones.

---

## 7. SEO, AEO, GEO checklist for this page

**Entities and facts to keep identical everywhere.** Neodent Dental Hospitals (running text "Neodent"), Hyderabad, Mehdipatnam, Nampally, founded 1994, founder "Dr. Mohd. Siraj Ur Rahman", "Dr. Md. Miftah Ur Rahman" with "BDS, MDS, FICOI" and "Assistant Professor of Prosthodontics", Dr. Muti Ur Rahman "MBBS / MD (General Medicine)". Names, credentials, hours, addresses and phones come only from `lib/clinical-team.ts`, `lib/clinic-data.ts` and `lib/site-data.ts`.

**Metadata.** `metadata` / `generateMetadata`, canonical, robots, Open Graph, sitemap entry and every existing JSON-LD block in `app/doctors/page.tsx` stay byte-identical. R1 and every later run check with `git diff -- app/doctors/page.tsx` that no metadata or JSON-LD line changed.

**Headings.** One h1 (unchanged). h2 per section, h3 per doctor name, in order. Doctor names are headings, not styled divs.

**Internal links that must exist after the redesign.**
- `/doctors/dr-miftah-ur-rahman` (anchor "View full profile", kept)
- `/clinic` (anchor "clinics page", kept) and `/contact` (anchor "get in touch", kept)
- `/clinic/mehdipatnam` and `/clinic/nampally` (new, descriptive anchors)
- treatment pages for "implant" and "full mouth rehabilitation" inside Dr. Miftah's existing paragraph (new links; R0 finds the routes; no word changed)
- `/` (breadcrumb)

**Images.** Every portrait has natural alt text, for example "Dr. Mohd. Siraj Ur Rahman, founder and director of Neodent Dental Hospitals, Hyderabad". Use the existing alt text where the data holds it. Decorative layers `aria-hidden`.

**Schema (additions need owner approval, section 12).**
- Proposed A: an `ItemList` of `Person` entries for the doctors shown, only name and the visible role text, `worksFor` Neodent Dental Hospitals. Dr. Muti Ur Rahman's role text is "MBBS / MD (General Medicine)" only; no dental specialty in schema.
- Proposed B: `FAQPage`, only with R5, generated from the same array as the visible FAQ.
- No `aggregateRating`. `foundingDate: "1994"` stays wherever it is.

**AEO (optional FAQ, R5).** Proposed questions, answered only from facts already on the site; the agent drafts the answers from the data and lists the source of each fact in the changelog for the owner's review:
1. Who founded Neodent Dental Hospitals?
2. Who leads implant and prosthodontic care at Neodent?
3. Which clinics do the Neodent doctors work at, and when are they open?
4. Do I need to choose a doctor before booking?
5. What are Dr. Muti Ur Rahman's qualifications?

**GEO.** Mention Hyderabad, Mehdipatnam and Nampally naturally in the S2, S4 and S5 headings and supporting lines.

---

## 8. Ownership forecast and concurrency notes

**Expected OWNED:** `app/doctors/page.tsx` (route file; metadata and JSON-LD untouchable), any component used only by this route.

**Expected FORKED** into `components/pages/doctors/`: whatever the current page imports from `components/doctors/*` that the profile page also uses (for example the card component). R0 decides with `grep -rl`.

**SHARED READ-ONLY:** `lib/clinical-team.ts`, `lib/clinic-data.ts`, `lib/site-data.ts`, `components/motion/*`, `components/sections/ContactNextStep*`, `components/ui/*`, `components/hero/*`, and the home components used as references (open them, never edit them).

**New files:** `components/pages/doctors/*`, `lib/pages/doctors-content.ts`, `docs/internal-pages/doctors/*`.

**Same family, must not run at the same time:** `/doctors/dr-miftah-ur-rahman`. The clinic family (`/clinic`, `/clinic/[slug]`) is a different family and may run in parallel as long as this page imports nothing from `components/clinic/*`.

**Expected shared-change requests (appended to `_shared-requests.md`, never made directly):**
1. If `lib/clinical-team.ts` lacks a field the cards need (portrait path, years of experience, alt text) or the home team row keeps its data inside a component.
2. If the home stat values or the "Dr. Miftah at work" copy are hard-coded in a home component and should be centralised.

---

## 9. Run sequence

| Run | Scope | Files | Depends on | Time |
|---|---|---|---|---|
| R0 | Discovery and snapshot (no code change) | `docs/internal-pages/doctors/*`, `.audit/doctors/*` | G0 done | 15 min |
| R1 | Foundation, page header, fact strip (H, S1) | `app/doctors/page.tsx` (wrapper only), `components/pages/doctors/*`, `lib/pages/doctors-content.ts` | R0 | 25 min |
| R2 | Clinical leadership and Dr. Miftah at work (S2, S3) | same | R1 | 25 min |
| R3 | The wider clinical team (S4) | same | R2 | 30 min |
| R4 | Both clinics band, closing line, consultation block (S5, S7) | same | R3 | 25 min |
| R5 | Questions, optional (S6) | same | R4 and owner approval | 20 min |
| R6 | Motion and polish | same | R4 (or R5) | 25 min |
| R7 | Final fast check and screenshots | same, fixes only | R6 | 20 min |

---

## 10. Prompts

Run one at a time, in order, in one Kiro session. Start the next only after the previous has finished.

### R0. Discovery and snapshot

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R0 for doctors (/doctors): discovery and content snapshot. This run changes no site code.

Do:
1. Confirm http://localhost:3000/doctors responds. If not, stop and say so.
2. Run node scripts/page-content-snapshot.mjs doctors /doctors. This is the content baseline.
3. Find the page's files: app/doctors/page.tsx and every component, CSS Module and data file it imports (follow the imports). For each file, run grep -rl on its name across app, components and lib to see who else imports it. Write docs/internal-pages/doctors/OWNERSHIP.md with three lists: OWNED (only this page uses it), SHARED READ-ONLY (used elsewhere or on the never-edit list), and FORK CANDIDATES (shared components this page's redesign will need to change, with the planned copy path under components/pages/doctors/). Add one line on each file's role. Also list other routes that share a family with this page (expect /doctors/dr-miftah-ur-rahman).
4. Map the sections you find in the rendered page to the sections in PAGE_PLAN.md (section 3, content map). Write docs/internal-pages/doctors/DISCOVERY.md with: the section list in order (heading, component, file), any content in the page that the plan missed, any section in the plan that does not exist, the images and videos found (path, alt, dimensions where known), and the existing JSON-LD types. Do not fix or change anything.
5. Also record in DISCOVERY.md, as separate headed lists:
   a. Every clinician in lib/clinical-team.ts: name, role or label, qualification line, detail line, portrait path (or none), alt text, years of experience (or none), profile route (or none), and whether the home page team row shows them (yes/no/featured). State the total count and the order the home page uses.
   b. Which file and which data the home page uses for: the doctors section (A steady hand), the Dr. Miftah at work block, the Our clinical team row, and the ExperienceIntro stat values. Say whether each is imported from lib or hard-coded inside a component.
   c. How other internal pages import and use components/sections/ContactNextStep (props, wrapper).
   d. Candidate header photographs in public/ (team or doctors photos first, then the clinic interior used by the home hero): path, dimensions, suggested focal point.
   e. The treatment route slugs (from lib/featured-treatment-catalog.ts, read-only) for dental implants and full mouth rehabilitation.
   f. The measured font size of the role labels and the credential lines on the current page at 1280 and 390 wide.
6. Run node scripts/page-audit.mjs doctors /doctors r0 so the current mobile and desktop screenshots exist. Print their absolute paths.
7. List copy that looks wrong, ungrammatical or unverifiable in docs/internal-pages/doctors/CONTENT_QUESTIONS.md (quote it; do not edit it). Include: whether Dr. Miftah's line "Leads implant, prosthodontic and full mouth rehabilitation care at both Neodent branches." and Dr. Siraj's credential line conflict with the rule that no doctor is shown as handling only certain cases (record only; do not change the copy).
8. Create docs/internal-pages/doctors/CHANGELOG.md with an R0 entry.

Do not: edit any file outside docs/internal-pages/doctors/ and .audit/doctors/, start or stop servers, build, install, or use git write commands.
Report: files created, the ownership summary, the clinician count and list, differences between the plan and the real page, questions for the owner. End with the screenshot paths.
```

### R1. Foundation, page header and fact strip (H, S1)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R1 for doctors (/doctors): foundation, page header and fact strip. Sections H and S1 of PAGE_PLAN.md, section 4 and section 5.

Open first: components/hero/Hero.tsx and its CSS (copy the layer recipe for dark bands into this page's own CSS Module; do not import hero classes), components/sections/ExperienceIntro.tsx and its CSS (the stat strip with CountUp), components/motion/Reveal.tsx and CountUp.tsx (read-only).

Files you may edit or create: app/doctors/page.tsx (wrapper and imports only), anything under components/pages/doctors/, lib/pages/doctors-content.ts, docs/internal-pages/doctors/, .audit/doctors/. Anything else: stop and explain.

Do:
1. Apply OWNERSHIP.md: fork into components/pages/doctors/ any shared component you must change, and switch this page to the copy. Never edit the original.
2. Add a page wrapper class (CSS Module) that sets the page's custom properties.
3. Build the page header exactly as PAGE_PLAN.md section 5 says: dark band with the Part 3.6 layers, visible breadcrumb Home / Doctors, the existing eyebrow, the existing h1, the existing supporting sentence (move the existing JSX text as it is; do not retype it), the two actions (Call for Consultation with ctaTelPhone and ctaPhone from lib/site-data.ts, Send an enquiry to /contact), one photograph on the right chosen from the candidates in DISCOVERY.md (priority on this image only, cover, focal point on faces, max-height var(--media-max-h-compact)), and the two dark glass cards from existing facts. Mobile order as in the plan. On-load motion is keyed off a CSS class, not Reveal.
4. Build the fact strip (S1) with CountUp under the header: doctor count computed from the team data length, clinics 2, years of specialist care and patients treated read from the same source the home strip uses (if hard-coded there, copy the same values into lib/pages/doctors-content.ts with a comment naming the source and append a shared-change request).
5. Keep the existing two doctor cards and the closing line rendering below, unchanged, until later runs replace them.
6. Do not touch metadata, generateMetadata or JSON-LD in app/doctors/page.tsx. After editing, run git diff -- app/doctors/page.tsx and confirm no metadata or JSON-LD line changed.

Acceptance (checkable):
- Exactly one h1 with the unchanged text. Eyebrow and supporting sentence unchanged.
- Header media is at most 70% of the viewport height at 390x844, 768x1024 and 1366x650.
- Primary action is red, 44 px or taller, and uses the tel link from lib/site-data.ts. No hard-coded phone number.
- No horizontal overflow at 360. No text under 12 px.
- node scripts/page-content-check.mjs doctors /doctors reports missing: 0.

Verify (fast check only, run-id r1): npx tsc --noEmit filtered to your paths; npx eslint on the files you changed; node scripts/page-content-check.mjs doctors /doctors; node scripts/page-audit.mjs doctors /doctors r1. Open two or three screenshots and describe them. At most two fix-and-recheck cycles.

Do not: edit shared files, build, install, start or stop servers, run Lighthouse, or use git write commands. Record anything questionable in CONTENT_QUESTIONS.md.
Report: files changed, check results, what the screenshots show, open questions. Append the R1 entry to CHANGELOG.md. End with the screenshot paths.
```

### R2. Clinical leadership and Dr. Miftah at work (S2, S3)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R2 for doctors (/doctors): clinical leadership and Dr. Miftah at work. Sections S2 and S3 of PAGE_PLAN.md, section 4.

Open first: components/home ClinicalLeadership.tsx and ClinicalLeadership.module.css (find the exact path with grep; featured doctor cards), the home "Dr. Miftah at work" block named in DISCOVERY.md, and LegacyStory.tsx for the split pattern. Copy their markup pattern, radii, spacing and card surfaces. Read-only.

Files you may edit or create: app/doctors/page.tsx (imports and section order only), anything under components/pages/doctors/, lib/pages/doctors-content.ts, docs/internal-pages/doctors/, .audit/doctors/. Anything else: stop and explain.

Do:
1. S2: replace the old two flat cards with two featured doctor cards in the home format: portrait left with cover and a face focal point, then the existing label, name, credential line and paragraph (move the existing text as it is; do not retype it), an experience figure with CountUp only where the data has a number, and the existing "View full profile" link on Dr. Miftah's card only. Add a plain section heading block (eyebrow "Clinical leadership", h2, one supporting line using only facts already on the page); do not use the red italic phrase formula here. Both cards the same height with no card more than 35% empty.
2. Wrap the words "implant" and "full mouth rehabilitation" in Dr. Miftah's existing paragraph in links to their treatment pages (routes from DISCOVERY.md) without changing any word.
3. Mobile: cards stack and are horizontal and compact (portrait about 104 px wide), so no two large images stack.
4. S3: build the Dr. Miftah at work split from the same strings and image source the home uses. Photo left and text right on desktop; photo first at no more than 38dvh on mobile. If the owner marked this section as dropped in the plan or in the last CHANGELOG entry, skip S3 and say so.
5. Use light bands. Do not add numbered eyebrows, ghost numerals or the red italic phrase.

Acceptance (checkable):
- Both leadership cards show a portrait, the existing label, name, credential line and paragraph, word for word.
- "View full profile" still links to /doctors/dr-miftah-ur-rahman. Link count has not fallen.
- Every image is within the media cap; no two large images stack at 390 wide.
- No horizontal overflow at 360. No text under 12 px. Tap targets at least 44x44 at 768 and below.
- node scripts/page-content-check.mjs doctors /doctors reports missing: 0.

Verify (fast check only, run-id r2): npx tsc --noEmit filtered to your paths; npx eslint on the files you changed; node scripts/page-content-check.mjs doctors /doctors; node scripts/page-audit.mjs doctors /doctors r2. Open two or three screenshots and describe them. At most two fix-and-recheck cycles.

Do not: edit shared files, build, install, start or stop servers, run Lighthouse, or use git write commands. Relocate rather than delete; record questionable copy in CONTENT_QUESTIONS.md.
Report: files changed, check results, what the screenshots show, open questions. Append the R2 entry to CHANGELOG.md. End with the screenshot paths.
```

### R3. The wider clinical team (S4)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R3 for doctors (/doctors): the wider clinical team. Section S4 of PAGE_PLAN.md, section 4. This is the section that fixes "only two doctors are listed".

Open first: the home ClinicalLeadership.tsx team row and ClinicalLeadership.module.css (the Our clinical team row), the hero CSS for the dark band recipe (Part 3.6), components/motion/Reveal.tsx (read-only). Copy the card pattern: portrait, name, qualification line, detail line.

Files you may edit or create: app/doctors/page.tsx (imports and section order only), anything under components/pages/doctors/, lib/pages/doctors-content.ts, docs/internal-pages/doctors/, .audit/doctors/. Anything else: stop and explain.

Do:
1. Build a dark band in this page's own CSS Module using the Part 3.6 recipe (gradient, red glow, icon-pattern as a luminance mask, never a CSS background-image).
2. Heading block: eyebrow "Clinical team", an h2 and one plain supporting line saying the doctors care for patients at both the Mehdipatnam and Nampally clinics. Use the wording the owner approved in the last CHANGELOG entry; if none, use "Doctors working together across both clinics" and flag it in the changelog as awaiting approval.
3. Cards: render every member of the home page team row, in the order DISCOVERY.md records (the two featured doctors from S2 are not repeated), reading from the same data and fields the home row uses. Do not retype names or credentials. If that data lives only inside a home component and not in lib/clinical-team.ts, do not edit the home component: copy the data verbatim into lib/pages/doctors-content.ts with a comment naming the source and append a shared-change request.
4. Card: dark glass surface from Part 3.4, portrait 4:5 with cover and a face focal point inside the media cap, name as h3, qualification line, detail line. Missing portrait: neutral monogram card (list each in the changelog). Dr. Muti Ur Rahman shows his qualification exactly as in the data (MBBS / MD (General Medicine)); nothing that reads as dental specialist. No grouping by specialty, no clinic tabs, no per-doctor case limits.
5. Desktop: grid, 4 across at 1280 px and wider, 3 across below. Mobile and tablet: swipe row (overflow-x auto, scroll-snap-type x mandatory, cards 82 to 88% wide so the next card peeks, keyboard accessible, every card in the DOM) with progress dots, no "02 / 05" counters.
6. Keep every link that exists in the data; add none that do not exist.

Acceptance (checkable):
- The number of cards equals the number of team-row members in DISCOVERY.md; every name and qualification matches lib/clinical-team.ts character for character.
- Every card is in the server HTML (check the JavaScript-off screenshot).
- No horizontal overflow at 360 except inside the swipe row itself. No media over 70% of the viewport. No text under 12 px. No card more than 35% empty.
- At most two dark bands in a row on the page; the header and this band are not adjacent.
- node scripts/page-content-check.mjs doctors /doctors reports missing: 0.

Verify (fast check only, run-id r3): npx tsc --noEmit filtered to your paths; npx eslint on the files you changed; node scripts/page-content-check.mjs doctors /doctors; node scripts/page-audit.mjs doctors /doctors r3. Open two or three screenshots and describe them. At most two fix-and-recheck cycles.

Do not: edit shared files, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: files changed, the list of doctors rendered with their portraits or monograms, check results, what the screenshots show, open questions. Append the R3 entry to CHANGELOG.md. End with the screenshot paths.
```

### R4. Both clinics, closing line and consultation block (S5, S7)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R4 for doctors (/doctors): both clinics band, the existing closing line, and the consultation block. Sections S5 and S7 of PAGE_PLAN.md, section 4.

Open first: SpacesDesignedAroundCare.tsx and its CSS (branch cards), components/sections/ContactNextStep.tsx (import only, never edit) and how DISCOVERY.md says other internal pages use it. Do not import anything from components/clinic/*.

Files you may edit or create: app/doctors/page.tsx (imports and section order only), anything under components/pages/doctors/, lib/pages/doctors-content.ts, docs/internal-pages/doctors/, .audit/doctors/. Anything else: stop and explain.

Do:
1. S5: a light band with a plain heading and two compact clinic cards, one for Mehdipatnam and one for Nampally: name, address, hours and phone read from lib/clinic-data.ts and lib/site-data.ts (never hard-coded), each linking to /clinic/mehdipatnam and /clinic/nampally with a descriptive anchor. Hours must read Mehdipatnam Monday to Saturday 4:00 PM to 8:00 PM, Nampally Monday to Saturday 10:30 AM to 5:00 PM, Sunday holiday, exactly as the data says.
2. Move the existing closing line "See both branches on the clinics page or get in touch to begin." into the bottom of S5, same words, same two links (/clinic and /contact). On the light band use a link colour that passes contrast; no small red text on charcoal.
3. S7: render ContactNextStep after S5, as sibling internal pages do. The last body section before it is light.
4. Mobile: cards stack, tap targets 44 px.
5. Remove nothing; the old closing line is relocated, not deleted.

Acceptance (checkable):
- Both clinic names, addresses, hours and phones match the data files exactly.
- The closing line text and both link hrefs and anchors are unchanged.
- The page ends with the consultation block followed by the global footer.
- No horizontal overflow at 360. No text under 12 px.
- node scripts/page-content-check.mjs doctors /doctors reports missing: 0.

Verify (fast check only, run-id r4): npx tsc --noEmit filtered to your paths; npx eslint on the files you changed; node scripts/page-content-check.mjs doctors /doctors; node scripts/page-audit.mjs doctors /doctors r4. Open two or three screenshots and describe them. At most two fix-and-recheck cycles.

Do not: edit shared files, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: files changed, check results, what the screenshots show, open questions. Append the R4 entry to CHANGELOG.md. End with the screenshot paths.
```

### R5. Questions (S6), optional: run only if you approve the FAQ and the schema (section 12)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R5 for doctors (/doctors): the questions section. Section S6 of PAGE_PLAN.md, sections 4 and 7. The owner has approved this addition.

Files you may edit or create: app/doctors/page.tsx (imports and section order, and the one JSON-LD script this task adds), anything under components/pages/doctors/, lib/pages/doctors-content.ts, docs/internal-pages/doctors/, .audit/doctors/. Anything else: stop and explain.

Do:
1. In lib/pages/doctors-content.ts create one FAQ array with the five questions in PAGE_PLAN.md section 7. Write each answer from facts already on the site only (lib/clinical-team.ts, lib/clinic-data.ts, lib/site-data.ts and the existing page text): first one direct sentence, then one or two supporting sentences. For "Do I need to choose a doctor before booking?" the answer says a Neodent specialist will see the patient and uses no other claim. No medical claims, prices or outcomes. In the CHANGELOG list the source of every fact in every answer.
2. Build the section as native details elements, first open, no numbering, hairline dividers, chevron, smooth open and close, on a light band before the consultation block. The full answers are in the server HTML.
3. Add one FAQPage JSON-LD script generated from the same array, so it matches the visible text word for word. Leave every existing metadata export and JSON-LD block byte-identical (confirm with git diff -- app/doctors/page.tsx).
4. If the owner has not approved the FAQ in the last CHANGELOG entry or in this chat, stop and say so.

Acceptance (checkable):
- Five questions, first open, no numbers.
- JSON-LD text equals the visible text.
- Dr. Muti Ur Rahman is described only as MBBS / MD (General Medicine).
- node scripts/page-content-check.mjs doctors /doctors reports missing: 0 and the existing JSON-LD blocks unchanged.

Verify (fast check only, run-id r5): npx tsc --noEmit filtered to your paths; npx eslint on the files you changed; node scripts/page-content-check.mjs doctors /doctors; node scripts/page-audit.mjs doctors /doctors r5. Open two or three screenshots and describe them. At most two fix-and-recheck cycles.

Do not: edit shared files, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: files changed, the source of each fact, check results, open questions. Append the R5 entry to CHANGELOG.md. End with the screenshot paths.
```

### R6. Motion and polish

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6 for doctors (/doctors): motion and polish. Section 6 of PAGE_PLAN.md is the motion plan.

Open first: components/motion/Reveal.tsx and CountUp.tsx (read-only) and how the home sections use them.

Files you may edit or create: anything under components/pages/doctors/, lib/pages/doctors-content.ts, app/doctors/page.tsx (imports only), docs/internal-pages/doctors/, .audit/doctors/. Anything else: stop and explain.

Do:
1. Make sure every section has a visible on-scroll reveal as the motion table says (variant, stagger, CountUp). The header reveal is keyed off a CSS class.
2. Add hover lift on desktop and press states on touch for cards and buttons. Add progress-dot behaviour for the team swipe row if missing.
3. Hidden initial states come only from JavaScript-added classes: with JavaScript off the page reads in full (check the JavaScript-off screenshot).
4. prefers-reduced-motion: final state, no transforms, no drift or breathing. No continuous animation on phones.
5. Animate transform and opacity only. No layout-property animation. No new libraries.
6. Fix small polish issues you see in the r4 or r5 screenshots (spacing, alignment, focal points). No new design work and no content changes.

Acceptance (checkable):
- Each of H, S1, S2, S3, S4, S5 (and S6 if it exists) has at least one reveal.
- Under reduced motion the page is in its final state.
- No reveal hides content in the server HTML.
- node scripts/page-content-check.mjs doctors /doctors reports missing: 0.

Verify (fast check only, run-id r6): npx tsc --noEmit filtered to your paths; npx eslint on the files you changed; node scripts/page-content-check.mjs doctors /doctors; node scripts/page-audit.mjs doctors /doctors r6. Open two or three screenshots and describe them. At most two fix-and-recheck cycles.

Do not: edit shared files, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: files changed, a table of section against reveal used, check results, open questions. Append the R6 entry to CHANGELOG.md. End with the screenshot paths.
```

### R7. Final fast check and screenshots

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/doctors/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/doctors/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/doctors/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R7 for doctors (/doctors): final fast check and screenshots. Fix only what the checks find, within the files you own.

Do:
1. Walk through the page top to bottom in the dev server screenshots at 1366x650 and 390x844. For each section confirm: it follows the pattern in PAGE_PLAN.md section 4; there is a visible on-scroll reveal; no card is more than 35% empty; no media is over 70% of the viewport; nothing overflows at 360.
2. Run the fast check from "Agent rules" item 9 with run-id final. Allow at most two fix-and-recheck cycles.
3. Save full-page desktop (1440 wide) and mobile (390 wide) screenshots as .audit/doctors/final/desktop-full.png and mobile-full.png (the audit script's full-page shots are acceptable). Print their absolute paths.
4. Confirm with git diff -- app/doctors/page.tsx that no metadata export or existing JSON-LD line changed.
5. Write the final CHANGELOG.md entry: files changed in the whole page redesign (the owner uses it to commit by path), content check result, audit numbers, forks made, shared-change requests, open questions, monogram cards, additions made (breadcrumb, headings, glass cards, fact strip, S3, S5, S6), and anything not done.

Do not: add new design work, build, run Lighthouse or deep tests, start servers, or use git write commands.
Report: pass or fail per check, the screenshot paths, the open items.
```

---

## 11. Acceptance and rating rubric

The owner checks in the final desktop and mobile screenshots (send both, with this plan, to the Claude chat for the rating). Target: **9 to 9.5 on desktop and on mobile.**

1. The page shows the full team: the two lead doctors and every member of the home page's team row, each with a portrait (or a neutral monogram) and the same details the home page shows.
2. The layout reads like the home page: featured cards, then a team row or grid, light and dark bands alternating, same cards, radii and spacing.
3. The h1 and every existing sentence, link and label are still on the page, word for word (content check: missing 0).
4. The header has the breadcrumb, the two actions and one photograph; the photograph is within 70% of the viewport height.
5. The doctors are presented as one team working across Mehdipatnam and Nampally; no doctor is limited to a case type; Dr. Muti Ur Rahman appears as MBBS / MD (General Medicine).
6. No more than two dark bands in a row; the last body section before the consultation block is light; the page ends with the consultation block.
7. No small red text on a dark background; no label under 12 px; no card more than 35% empty.
8. Mobile at 360, 390 and 768: no sideways scroll except inside swipe rows, tap targets 44 px, no two large images stacked.
9. Every section reveals on scroll; reduced motion shows the final state; the JavaScript-off screenshot shows all content.
10. Metadata and existing JSON-LD are untouched (`git diff -- app/doctors/page.tsx`).

---

## 12. Open owner questions

Nothing below is guessed. Defaults in brackets are what the runs do if you do not answer.

1. **Total team and order.** R0 lists every clinician in `lib/clinical-team.ts` and the home order. Confirm that the doctors page should show the same people in the same order as the home "Our clinical team" row. [Same as home.]
2. **Both clinics.** You said all the doctors work together in both clinics. Confirm this holds for every doctor, so no card carries a clinic tag and there are no clinic tabs. [Yes, no tags.]
3. **Portraits.** The home row has one monogram placeholder. R0 lists every doctor without a portrait; send photos if you have them. [Monogram card.]
4. **S3 "Dr. Miftah at work".** Keep it on this page? [Keep.]
5. **S4 heading and supporting line.** Proposed: "Doctors working together across both clinics" and a plain line that the doctors care for patients at both Mehdipatnam and Nampally. Approve or give your wording. [Proposed wording, flagged.]
6. **Header photograph.** R0 lists candidates. Choose one, or send a team photo. [Team photo if one exists, otherwise the clinic interior from the home hero.]
7. **Role lines and the "no case-type" rule.** Dr. Miftah's line "Leads implant, prosthodontic and full mouth rehabilitation care at both Neodent branches." and Dr. Siraj's "Prosthodontist · Implantologist" credential describe specialties. Under the standard no doctor is shown as handling only certain cases. The lines stay untouched (content rule). Do you want to reword them yourself? [Unchanged, listed in CONTENT_QUESTIONS.md.]
8. **Experience figures.** If the data has no years for a doctor, the card shows no figure. Send numbers if you want them. [No figure.]
9. **Questions section and schema (R5).** Approve the five questions in section 7 and the `FAQPage` and `ItemList` schema additions? [R5 not run; no schema added.]
10. **Dr. Siraj's profile.** There is no profile page for him, so his card has no link. Is one planned? [No link.]
11. **Mobile screenshot.** Send a 390 px full-page screenshot of `/doctors` if you want a mobile review before R1.

---

## 13. Appendix: Agent rules

```
AGENT RULES (binding for every run on this page)

You are one of several coding sessions working in this repository at the same time, each on a different page. Another session may be editing other files while you work.

1. CONTENT: Never delete, shorten, summarise, reword, merge or hide any text, image, video, document, caption, alt text, link, button, form field or structured-data field. Re-place, re-layout and restyle only. Repeated content stays. Questionable copy goes into docs/internal-pages/doctors/CONTENT_QUESTIONS.md, not into an edit. Mobile and desktop carry the same content. Collapsed text is a native <details> with the full text in the server HTML. Metadata exports and JSON-LD in page.tsx stay byte-identical.
2. DESIGN: Match the home page. Fonts: Manrope (body), DM Serif Display (headings). Colours only from the existing tokens (ink #263033, charcoal #161c1e, ivory #f8f6ef, surface #fffefa, red #d71920, dark red #b5121a). Before building a section, open the home component named in the plan and its CSS and copy its pattern, spacing and radii. No numbered eyebrows, ghost numerals, roman numerals, corner brackets, registration marks, arcs, rotated edge labels, meta strips, labels under 12 px, or repeated red-italic headline formula. Eyebrows are plain words. No card with more than 35% empty space. Primary button "Call for Consultation" (tel link from lib/site-data.ts: ctaTelPhone, ctaPhone; never hard-code a number), secondary "Send an enquiry" linking to /contact.
3. MEDIA: No image or video taller than 70% of the viewport height (use max-height: var(--media-max-h) or var(--media-max-h-compact)). Photos use object-fit: cover with a focal point; documents (cuttings, certificates, radiographs) use contain, whole, tap to zoom. Two large images never stack on mobile: use one image or a swipe row with every image in the DOM. next/image with sizes and aspect-ratio; priority only on the main header image. Videos: muted playsInline loop, preload="none" with a poster, play only while in view, not under prefers-reduced-motion.
4. MOBILE: 360x740, 390x844, 768x1024. No horizontal overflow. Body 15px or more, labels 12px or more, tap targets 44x44 or more. Headline and primary action first, then media (at most 38dvh) or a swipe row (overflow-x auto, scroll-snap, cards 82 to 88% wide).
5. MOTION: Every section needs a visible on-scroll reveal. Use components/motion/Reveal.tsx (variants rise, fade, mask; delay; stagger) and CountUp.tsx, read-only. Stagger card grids, mask-reveal key photos, draw connecting lines with scroll, crossfade tabs. 300 to 700 ms, ease-out. Animate transform and opacity only. Hidden initial states must be applied by JavaScript-added classes so the page reads with JavaScript off. prefers-reduced-motion: final state, no transforms. No continuous animation on phones. No new libraries.
6. SEO / AEO / GEO: One h1 with entity words, headings in order, every internal link kept with its anchor, descriptive alt text, JSON-LD kept, schema only for visible content, no aggregateRating, no invented facts, prices, claims or outcomes. Clinic names, addresses, phones, hours and doctor facts come from lib/site-data.ts, lib/clinic-data.ts and lib/clinical-team.ts. Hours: Mehdipatnam Mon-Sat 4:00 PM to 8:00 PM; Nampally Mon-Sat 10:30 AM to 5:00 PM. Dr. Muti Ur Rahman is MBBS / MD (General Medicine), never a dental specialist. Write "a Neodent specialist" for consultations. Do not add the phrase "Smile Designer" anywhere new.
7. FILES: Edit only files listed as OWNED in docs/internal-pages/doctors/OWNERSHIP.md or new files under components/pages/doctors/, lib/pages/doctors-content.ts and docs/internal-pages/doctors/. Before editing any existing component, run grep -rl "<Name>" app components to see if anything else imports it; if so it is shared: copy it into components/pages/doctors/ and switch this page to the copy. CSS Modules only; no new global classes. Never edit app/globals.css, app/layout.tsx, components/layout/*, components/Home.tsx, components/hero/*, components/motion/*, components/sections/ContactNextStep*, components/ui/*, components/consent/*, components/analytics/*, lib/site-data.ts, lib/clinical-team.ts, lib/clinic-data.ts, lib/structured-data.ts, lib/og-image.tsx, lib/featured-treatment-catalog.ts, package.json, lockfiles, config files, existing scripts, existing files in public/, or any other page's files. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append (cat >> file <<'EOF').
8. COMMANDS: Never run npm run build, npm install, npm ci, next dev, next start, or anything that touches .next or node_modules. Never start or stop a server: the owner's dev server is at http://localhost:3000; if it is unreachable, stop and say so. Never git commit, stash, checkout, reset, restore, clean, rebase, merge, pull or push. Allowed: git status, git diff -- <your paths>. If a compile error is in a file you do not own, wait 30 seconds and retry once, then report it; never fix it.
9. VERIFY (fast check only, then stop): (a) npx tsc --noEmit, output filtered to your owned paths; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs doctors /doctors must report zero missing; (d) node scripts/page-audit.mjs doctors /doctors <run-id> (three viewports); (e) open two or three screenshots and describe them. At most two fix-and-recheck cycles. No Lighthouse, no deep or exhaustive tests, no extra viewports. Aim to finish in 20 to 30 minutes; if a step is taking much longer, stop and report.
10. REPORT: Append an entry to docs/internal-pages/doctors/CHANGELOG.md: run id, files changed, summary, content check result (missing: N), audit numbers, questions for the owner, shared-change requests made, screenshot paths (absolute), anything unfinished. End your reply with the screenshot paths. Leave all changes uncommitted.
```
