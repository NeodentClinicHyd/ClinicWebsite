# PAGE_PLAN: Treatments hub (`/treatments`)

Built from `NEODENT_INTERNAL_PAGES_GLOBAL_STANDARD.md` (Version 1, 30 Oct 2026), one desktop screenshot and one mobile screenshot of the live page. Save this file as `docs/internal-pages/treatments-hub/PAGE_PLAN.md`. Run `R0` first.

---

## 0. Header

| Field | Value |
|---|---|
| Page | Treatments hub (browser title in the screenshots: "Dental Treatments in Hyderabad \| Neodent Dental Hospital") |
| Route | `/treatments` |
| Slug | `treatments-hub` |
| Family (Part 11.4) | Treatments. The hub and the seven treatment pages share `components/treatments/*`, `components/treatment/illustrations/*` and `lib/featured-treatment-catalog.ts`. The hub forks whatever it needs and only reads the originals. |
| Model | Sonnet 5.5 in Kiro CLI |
| Dev server | Owner runs `npm run dev` on `http://localhost:3000`. Agents never start or stop it. If it is unreachable, stop and say so. |
| Date | 31 Oct 2026 |
| Status | Draft v1 for owner review. No section reorder is proposed. Three additions are gated behind owner approval (section 12). |
| Screenshots judged | Desktop capture about 1334 px wide, mobile capture about 375 px wide, both full-page, taken with a browser extension. The audit scripts later use the standard viewports (390x844, 768x1024, 1366x650). |

---

## 1. Page facts

- **Purpose.** The hub that sends a visitor from a concern (missing tooth, pain, chewing, alignment, smile appearance) to the right one of the seven treatment pages, and builds trust on the way (the two doctors, clinical films, real cases, ratings, FAQ).
- **Audience.** Prospective patients in Hyderabad, about 80% on mobile, many of them unsure which treatment they need. Secondary: people comparing dental hospitals, and prospective clinic clients who see this site as a Blogspage AI showcase.
- **Search intent and target queries** (only phrases already on the site or in Part 1): dental treatments in Hyderabad; Neodent Dental Hospital treatments; dental implants; full mouth rehabilitation; root canal treatment; braces and orthodontics; smile design and cosmetic dentistry; scaling and polishing; composite build-up; dental hospital in Mehdipatnam and Nampally, Hyderabad.
- **Conversion goal.** First, a click into a treatment page (seven "in detail" links). Second, "Call for Consultation" (`tel:` from `lib/site-data.ts`). Third, "Send an enquiry" (`/contact`).
- **Facts that must stay exact.** Founded 1994. Two clinics: Mehdipatnam (Mon to Sat, 4:00 PM to 8:00 PM) and Nampally (Mon to Sat, 10:30 AM to 5:00 PM), Sunday holiday. Both clinics offer all seven treatments. Doctors on this page: Dr. Mohd. Siraj Ur Rahman (Founder and Director) and Dr. Md. Miftah Ur Rahman (Assistant Director). Dr. Muti Ur Rahman does not appear and must not be added as a dental specialist.

---

## 2. Screenshot findings

Scores are out of 10. Overall: **desktop 6.5, mobile 5.8**. Target is 9 to 9.5 on both.

### Cross-page problems (apply to every section)

1. **The red italic accent phrase is on all nine headings** (h1 and eight sections). The standard allows it on the main heading and at most one section in three. Target: h1, "Featured dental treatments." and "Real cases. Visible outcomes." keep it. The other six headings render in one ink colour. The words and the heading elements do not change.
2. **Marker-underline and pink highlights (`EditorialHighlight`) are on almost every paragraph**, including body text on dark bands. Limit: at most two per section, none on dark body text.
3. **Micro-labels under 12 px, all caps**: doctor card row labels, "CLINICAL EDUCATION" captions, the red statement card labels, breadcrumb, "IN DETAIL" link labels, review labels. Raise to 12 px or more (14 px for card link labels).
4. **Corner brackets** (thin red L-shapes) frame both portrait videos: the hero video and the DMLS video. Banned.
5. **Mobile length and stacked large images.** The featured treatments section stacks six large photos, the real-cases section stacks three tall tiles and four before/after cards. Both break the "no two large images stacked on mobile" rule and make the page very long.
6. **Empty and weak cards**: the "Not sure which treatment you need?" card is about half empty on desktop; the four process step cards are about 35 to 40% empty on the right; the "Additional dental services" rows leave over half of each row empty.
7. **The dark pattern runs behind headings and body text** in "Featured dental treatments". The recipe requires it to fade to zero before the text column.
8. **Motion cannot be judged from still screenshots.** The desktop capture may have been taken before reveals fired. Treat motion as unverified; section 6 specifies it for every section.

### Section by section

**S0. Page header (dark band)** Desktop 6, mobile 5.5
- What it is: breadcrumb, h1 with red italic phrase, a supporting paragraph with three highlights, a red "Call Neodent" button, a portrait video of Dr. Md. Miftah Ur Rahman holding a bite model, with a caption.
- Wrong: corner brackets around the video; the caption overlaps the video's burned-in subtitle and is a tiny all-caps strip; the band is flat charcoal with a faint grid (no red glow, no icon pattern, so it does not match the home hero recipe); highlights on dark body text; no secondary action. On mobile the video shows native browser controls (pause, time, mute, full screen), and **no primary action is visible between the paragraph and the video**. Cannot be judged from the screenshot: whether the button is hidden on mobile or absent. R0 must check.

**S1. Intro: lede and three paragraphs (light)** Desktop 7, mobile 6
- What it is: a short red rule, a large serif statement ("Whether the concern is a missing tooth..."), then three text columns.
- Wrong: three columns of about 34 characters each are too narrow to read comfortably (target 65 to 72); highlights on every paragraph; on mobile it is a long unbroken wall of text before the first card.

**S2. Featured dental treatments (dark with icon pattern)** Desktop 6.5, mobile 5
- What it is: heading, intro paragraph, a wide "Full Mouth Rehabilitation" card, a "Not sure which treatment you need?" card, then six equal cards (photo, title, one line, "... in detail" link).
- Wrong: the "Not sure" card is mostly empty; all-caps link labels are small and "Smile Design & Cosmetic Dentistry in detail" wraps awkwardly against its arrow; card body text is small grey on cream; the pattern shows behind the heading and intro; on mobile six large photos stack in a row (about 3 phone screens), then the "Not sure" card comes last.

**S3. Additional dental services (light)** Desktop 6.5, mobile 7
- What it is: heading, intro, one white card with four labelled rows of services.
- Wrong: category labels are tiny all-caps; each row fills under half of the card width; plain run-on text with dots between items looks like a table that was never designed. Mobile is acceptable but cramped.

**S4. The thinking behind treatment (dark)** Desktop 7, mobile 6.5
- What it is: heading, two doctor cards (portrait, name, role, qualifications, specialism, experience or recognition, approach, profile link on the second), then three paragraphs in two columns.
- Wrong: row labels under 12 px; the founder's card has a gap at the bottom because only the second card has a link; the paragraph columns are uneven (one paragraph left, two right); red highlights on dark body text. Mobile stacks the two cards (long); the three paragraphs are a wall of text.

**S5. Understanding DMLS Crowns & Functional Strength (light)** Desktop 6.5, mobile 6
- What it is: a text card with heading, paragraph and three facts (clinician, qualifications, specialism), beside a portrait video of a crown model on glass.
- Wrong: corner bracket around the video; tiny all-caps caption; the text card is much shorter than the video so the row looks unbalanced; on mobile the video is narrower than the column and sits left-aligned with a blank strip beside it.

**S6. How treatment takes shape (beige)** Desktop 6.5, mobile 6.5
- What it is: heading, paragraph, a photo of a treatment room, and four step cards (Understand, Assess, Plan, Treat) each with a red line at the top whose length differs from card to card.
- Wrong: the red top lines of different lengths read as a broken progress bar and are decoration; step text uses only the left 60% of each card; the photo has square corners and a different border from other photos on the page; the room photo is dim and cluttered (cannot be replaced; see question Q9).

**S7. Real cases. Visible outcomes. (light)** Desktop 6.5, mobile 4.5
- What it is: heading, paragraph; a large clinical film with caption; a side card "See the work behind the treatment."; a row of three video tiles (clinic interior, crown cementation, treatment in practice); four before/after cards (anterior smile design, full mouth rehabilitation with implants, upper arch rehabilitation with implants, scaling and polishing). Faces are pixelated in the before/after photos (consent masking; keep).
- Wrong: before/after cards have uneven widths in a staggered 2x2 that looks accidental; tall portrait tiles are about 430 px each; captions are tiny all-caps; on mobile seven large images stack one after another and the section is roughly 8 phone screens tall.

**S8. Experience, evidence & what patients see (beige)** Desktop 6.5, mobile 6.5
- What it is: a ratings card (Mehdipatnam 4.3 with 260 reviews, Nampally 4.5 with 155 reviews) and a solid red statement card with three facts.
- Wrong: fact labels are about 11 px all caps; the large solid red block is heavier than anything on the home page and fights the red CTA colour; no motion hook for numbers. **Data conflict:** the footer shows 4.3 with 261 reviews and 4.6 with 157 reviews for the same clinics (Q2).

**S9. Questions about treatment (light)** Desktop 6, mobile 7.5
- What it is: six native-style disclosures, the first open.
- Wrong: on desktop the list fills the left 55% and the right side is blank for the whole section; nothing sits beside it. Cannot be judged: whether that blank area is the consultation block waiting for a reveal (see S10).

**S10. Consultation block (dark, shared `ContactNextStep`)** Desktop cannot be judged, mobile 8
- Visible on mobile only: "Ready to discuss your dental concerns?", paragraph with an "send an enquiry" link, red "Call Neodent" button, hours per clinic with Call and Directions, "Sunday holiday". It is absent in the desktop capture (the footer follows the FAQ directly). R0 must confirm it renders on desktop. This block is shared and read-only.

Global header, footer and the mobile call bar are out of scope.

---

## 3. Content map (everything here must survive)

Text blocks are named by their opening words. R0 verifies this map against the real page.

**S0 Page header**
- Breadcrumb: Home (link) > Treatments.
- h1: "Dental care for the concerns that bring you to Neodent."
- Paragraph "From dental implants and full mouth rehabilitation to orthodontic alignment, root canal treatment, crowns, dentures, veneers and smile-focused cosmetic dentistry, Neodent brings different areas of dental care together around the concerns that matter to each patient."
- Button "Call Neodent" (desktop seen; mobile not seen).
- Video: Dr. Md. Miftah Ur Rahman with a bite model (poster, source, any subtitles).
- Caption: "Dr. Md. Miftah Ur Rahman" and "BDS · MDS · FICOI (U.S.A.) · Prosthodontist & Implantologist".

**S1 Intro**
- Statement "Whether the concern is a missing tooth, damaged or worn teeth, tooth pain, difficulty chewing, changes in alignment or the appearance of a smile, the right treatment begins with understanding what is happening clinically and what the patient wants to achieve."
- Paragraph 1 "Every treatment begins with careful assessment..."
- Paragraph 2 "For more complex concerns, treatment may involve several stages..."
- Paragraph 3 "Across these treatments, Neodent's approach remains focused on clear clinical explanation..."

**S2 Featured dental treatments**
- h2 "Featured dental treatments."
- Intro "Neodent approaches different dental concerns through clinical assessment and treatment planning..."
- Seven cards, each with photo (alt text), title, one line and a link "<name> in detail": Full Mouth Rehabilitation ("Plan staged care when many teeth or the bite need attention."); Composite Build-up ("Rebuild part of a damaged tooth with tooth-coloured composite resin."); Dental Implants ("Replace a missing tooth with an implant-supported crown, bridge or denture."); Root Canal Treatment ("Treat infection or inflammation inside a tooth so it may be kept."); Braces & Orthodontics ("Gradually move teeth into position, then use retainers to help hold them."); Smile Design & Cosmetic Dentistry ("Plan cosmetic options around the changes you want to make to your smile."); Scaling & Polishing ("Remove plaque and tartar, then polish the tooth surfaces.").
- Help card: h3 "Not sure which treatment you need?", line "Explore our treatments or speak with our team to understand your options.", link "Speak with our team".

**S3 Additional dental services**
- h2 "Additional dental services."; intro "Alongside the featured treatments, Neodent provides a broader range..."
- Restorative & Prosthodontics: Crowns & Bridges, Complete Dentures, Removable Partial Dentures, Fillings & Sealants.
- Cosmetic Dentistry: Veneers, Teeth Whitening, Teeth Reshaping, Cosmetic Procedures.
- General & Preventive: Teeth Cleaning, Extractions, Paediatric Dentistry, Mouth Guards.
- Surgical: Oral Surgery, Laser Dentistry.

**S4 The thinking behind treatment**
- h2 "The thinking behind treatment."
- Card, Dr. Mohd. Siraj Ur Rahman: portrait, Founder & Director, Qualifications BDS · FCIP · MDS (Chennai), Specialism Prosthodontist & Implantologist, Experience 30+ years of clinical practice, Approach "Specialist training in prosthodontics and implantology, and 30+ years of clinical practice, inform how Neodent assesses and plans treatment for each patient."
- Card, Dr. Md. Miftah Ur Rahman: portrait, Assistant Director, Qualifications BDS · MDS · FICOI (U.S.A.), Specialism Prosthodontist & Implantologist, Recognition Gold Medallist, Approach "Specialist qualifications in prosthodontics and implantology, including FICOI (U.S.A.), underpin his approach to restorative and implant-based treatment at Neodent.", link "View Dr. Md. Miftah Ur Rahman's profile".
- Three paragraphs: "Treatment at Neodent begins with understanding the patient's concern..."; "Clinical assessment considers oral health, function and aesthetic goals together..."; "Treatment planning at Neodent is not a fixed sequence..."

**S5 DMLS**
- h2 "Understanding DMLS Crowns & Functional Strength"; paragraph "Dr. Md. Miftah Ur Rahman explains the functional characteristics of DMLS crowns..."; Clinician, Qualifications, Specialism rows.
- Video (poster, source) with caption "Clinical education" and "Dr. Md. Miftah Ur Rahman / DMLS Crowns & Masticatory Efficiency".

**S6 How treatment takes shape**
- h2 "How treatment takes shape."; paragraph "Every treatment begins with understanding the patient's concern..."; room photo (alt text).
- Steps: Understand ("Understand the patient's concern, symptoms and goals."), Assess ("Evaluate the dental condition and areas requiring attention."), Plan ("Consider suitable treatment options based on the clinical situation."), Treat ("Carry out the selected treatment and appropriate follow-up.").

**S7 Real cases**
- h2 "Real cases. Visible outcomes."; paragraph "Selected cases from Neodent showing treatment outcomes..."
- Featured film, caption "Clinical film" and "Full mouth rehabilitation using dental implants / Neodent Dental Hospital · Mehdipatnam".
- h3 "See the work behind the treatment." and two paragraphs ("These films are a record of real clinical work..."; "This clinical film captures a full mouth rehabilitation procedure...").
- Three video tiles: "Clinical treatment detail" / "Real clinical treatment by the Neodent team"; "Crown cementation" / "Cementation procedure / Dr. Md. Miftah Ur Rahman"; "Treatment in practice" / "Clinical dental procedure at Neodent".
- Four before/after pairs (Before and After labels): "Anterior smile design" / "Smile restoration following an accident, using zirconia crowns"; "Full mouth rehabilitation with implants" / "Comprehensive rehabilitation using dental implants at Mehdipatnam"; "Upper arch rehabilitation with implants" / "Upper arch restoration using implant-supported prosthetics at Nampally"; "Scaling & Polishing" / "Professional cleaning and polishing treatment".

**S8 Experience, evidence**
- h2 "Experience, evidence & what patients see."
- Ratings: "Patient reviews"; Mehdipatnam 4.3, 260 reviews; Nampally 4.5, 155 reviews; star glyphs.
- Statement "Three decades of practice, two Hyderabad locations, and a clinical approach built around considered care."
- Facts: Established 1994 / "Three decades of clinical practice in Hyderabad"; Specialist-led / "Prosthodontic and implant expertise"; Two locations / "Mehdipatnam and Nampally, Hyderabad".

**S9 Questions about treatment**
- h2 "Questions about treatment". Six questions with answers: "How do I know which dental treatment I need?"; "What is full mouth rehabilitation?"; "When are dental implants considered?"; "What is root canal treatment?"; "What is smile designing?"; "Can multiple dental treatments be planned together?"

**S10 Consultation block** (shared): "Ready to discuss your dental concerns?", paragraph, "send an enquiry" link, "Call Neodent" button, hours and Call/Directions per clinic, "Sunday holiday".

---

## 4. Target layout, section by section

Shared rules for every section: container width, section padding and card radii are copied from the home components named below (open the component and its CSS Module first). Light cards: `--neodent-surface`, 1 px hairline, soft shadow. Dark glass cards: the recipe in the standard (3.4). Heading text and heading elements never change; only styling does. Eyebrows, where used, are plain words at 12 px or more. Rhythm of the page after the redesign: dark header, light intro, **dark** featured treatments, light services, **dark** doctors, light DMLS, light process, light cases, **dark** evidence, light FAQ, dark consultation block, dark footer.

### S0. Page header band (P1)
- **Open first:** `components/hero/Hero.tsx` and its CSS Module (layers, glass cards, line-mask reveal); do not import its classes.
- **Desktop:** dark band using the full recipe (3.6): gradient, red radial glow behind the video, icon pattern as `mask-image`, fading to zero before the text column. Left: breadcrumb row (it is the eyebrow, 12 px or more), h1, the existing paragraph, then actions: the existing red "Call Neodent" button and an added outline "Send an enquiry" link to `/contact`. Right: the video, `max-height: min(var(--media-max-h-compact), calc(100dvh - 190px))`, rounded, hairline border, soft shadow, no brackets. The caption becomes a dark glass card under the video (not over it), name in DM Serif Display, credentials in Manrope at 13 px or more. The whole composition fits 1366x650.
- **Mobile:** order is breadcrumb, h1, paragraph, actions (primary button visible without scrolling at 390x844), then the video at most 38dvh high, then the caption card. No native controls: a 44 px sound button and a 44 px play/pause button.
- **Highlights:** none in the dark paragraph; the two treatment names may be semibold ivory.
- **Empty-card check:** the caption card hugs its two lines.
- **Motion:** line-mask reveal on the h1 on load; paragraph and actions rise in a 100 ms stagger; video rises 24 px and fades with mask reveal and 1.04 to 1 settle; caption glass card fades up at 450 ms. On 768 px and wider only: glow breathing and pattern drift.
- **SEO:** keep one h1 with its wording. Treatment names in the paragraph link to their treatment pages only if R0 finds the routes in `lib/featured-treatment-catalog.ts` (wrapping existing words in links, no wording change).

### S1. Intro: lede and depth (P3)
- **Open first:** `ExperienceIntro.tsx` ("Care begins" block) and `LegacyStory.tsx`.
- **Desktop:** two columns on light paper. Left (about 5/12): the serif statement as the lede, with the short red rule above it. Right (about 7/12, reading column capped at 70 characters): paragraphs 1, 2 and 3 with generous spacing. At most two highlights in the section, on light text.
- **Mobile:** statement, paragraph 1 visible; paragraphs 2 and 3 inside one `ResponsiveDetails` (summary "More on how Neodent plans care"; open in the server HTML, closed on screens under 768 px after mount).
- **Empty-card check:** no cards.
- **Motion:** statement `mask` reveal; paragraphs `rise` with 80 ms stagger.

### S2. Featured dental treatments (P6 feature cards)
- **Open first:** `Expertise.tsx` cards and CSS; also `components/treatments/*` (read only) to see how the cards currently get their data.
- **Dark band:** recipe 3.6. The icon pattern is visible only in the margins and the lower area, and fades to zero under the heading and intro.
- **Desktop:** heading left, intro right (as now). Row 1: "Full Mouth Rehabilitation" as a wide horizontal card across all three columns (photo about 40% left, text and link vertically centred right). Rows 2 and 3: the other six cards in a 3x2 grid. Card body text 15 px, link label 14 px semibold red with arrow, text-transform allowed, wrapping handled so the arrow never drops. Photos: `cover`, radius and hairline copied from home cards, focal point set per photo. Below the grid, the help card becomes a slim full-width band (heading, one line, and the existing "Speak with our team" link styled as the primary button). If R0 finds the card is not last in the DOM, keep the DOM order and place it with CSS.
- **Mobile:** Full Mouth Rehabilitation card full width with its photo at most 30dvh; the other six as compact row cards (88 px square thumbnail on the left, title, one-line description and link on the right, whole card at least 96 px tall, link target at least 44 px); then the help band. Every photo stays in the DOM. The section is at most 2.5 phone screens tall.
- **Empty-card check:** the wide card's text block is vertically centred against the photo; the band hugs its content.
- **Motion:** heading `mask`; cards `stagger` rise at 100 ms; photos mask reveal with a slight settle; hover lift on desktop only.
- **SEO:** the seven "in detail" links keep their hrefs and exact anchor text.

### S3. Additional dental services (P6)
- **Open first:** `Expertise.tsx` card CSS.
- **Desktop:** heading and intro as now; four category cards in a 2x2 grid with `align-items: start` (cards hug their content). Each card: category name as a small heading (14 px or more, semibold), then the services as a wrapping list of pills (`ul`, 15 px). If R0 finds any service is a link, it stays a link.
- **Mobile:** four stacked compact cards; the whole section under 1.5 phone screens.
- **Motion:** heading `rise`; cards `stagger` rise at 80 ms.

### S4. The thinking behind treatment (P10 doctor cards plus P3)
- **Open first:** `ClinicalLeadership.tsx` and `ClinicalLeadership.module.css` (card radius, portrait panel, row styling).
- **Dark band:** recipe 3.6, no pattern behind text.
- **Desktop:** heading, two equal-height doctor cards side by side (portrait panel about 36% of the card, definition list with row labels at 12 px or more, normal-case or lightly tracked), profile link kept on the second card. Below, the three paragraphs in two balanced columns (CSS columns, DOM order unchanged), each column no wider than 70 characters, with no highlights on dark body text (key phrases semibold ivory only).
- **Mobile:** the two cards become a swipe row (`overflow-x: auto; scroll-snap-type: x mandatory;` cards 84% wide so the next one peeks, keyboard focusable); below, paragraph 1 visible and paragraphs 2 and 3 inside a `ResponsiveDetails` (summary "More on treatment planning").
- **Empty-card check:** the founder card may end with up to 15% free space; no more.
- **Motion:** heading `mask`; cards `stagger` rise; portraits mask reveal; paragraphs `rise`.
- **SEO:** keep doctor names and credentials exactly; no "Smile Designer"; never describe any doctor beyond what is written.

### S5. DMLS Crowns & Functional Strength (P5 split)
- **Open first:** `LegacyStory.tsx` and `SpacesDesignedAroundCare.tsx` (split with media).
- **Desktop:** light band. Text card left (about 7/12): heading, paragraph, definition list (Clinician, Qualifications, Specialism). The clinician name becomes a link to `/doctors/dr-miftah-ur-rahman` (an addition; the text is unchanged). Video right (about 5/12), centred vertically on the card, `max-height: var(--media-max-h-compact)`, rounded, hairline, soft shadow, no brackets. Caption below the video on light sections: "Clinical education" label (12 px or more, plain) and the existing line.
- **Mobile:** text first, then the video centred, at most `var(--media-max-h-compact)` high, caption below. No blank strip beside it.
- **Motion:** text card `rise`; video mask reveal with settle; optional parallax of at most 24 px on the video at 768 px and wider only.
- **Video:** tap to play, muted, loop, `preload="none"`, poster, sound button (the doctor speaks).

### S6. How treatment takes shape (P8 vertical stepper plus P5)
- **Open first:** `WhatToExpect.tsx` and its CSS (connecting line, step markers).
- **Desktop:** photo left (rounded, hairline, aspect 4/5, `max-height: var(--media-max-h)`, focal point toward the dental chair), stepper right: a vertical line with a dot per step, step title in DM Serif Display, description at 15 to 16 px up to 52 characters wide. Steps are plain rows with hairline dividers, not boxed cards. No numerals; the red progress lines of unequal length are removed.
- **Mobile:** photo at most 30dvh, then the stepper.
- **Motion:** the connecting line draws with scroll; steps rise in order; photo mask reveal.

### S7. Real cases. Visible outcomes. (P11 plus P7)
- **Open first:** `components/treatments/BeforeAfterCases.tsx`, `RealTreatmentWork.tsx` and their CSS (both shared, so **fork** them into `components/pages/treatments-hub/`), and `PatientStories.tsx` for the swipe row.
- **Desktop:** heading and paragraph. Row A: the large clinical film (landscape, `max-height: var(--media-max-h-compact)`, caption below it) in 7 columns, the side card "See the work behind the treatment." in 5 columns, vertically centred. Row B: the three video tiles in three equal columns (aspect 4/5, `cover`, capped at `var(--media-max-h-compact)`, caption below each). Row C: the four before/after cards in an equal 2x2 grid; inside each, Before and After photos side by side with 12 px pills, title and caption below. Faces stay pixelated as supplied.
- **Mobile:** film full width (landscape, so it fits), side card, tiles as a swipe row (cards 84% wide), before/after cards as a swipe row (cards 88% wide, pair side by side). Every item stays in the DOM. The section is at most 4 phone screens tall.
- **Highlights:** at most two in this section's paragraphs, on light text.
- **Motion:** heading `rise`; film mask reveal; cards `stagger` rise at 100 ms; tabs not needed.
- **SEO:** keep alt text on every image; keep captions as written. Consent wording stays in `/privacy-policy`; do not add claims.

### S8. Experience, evidence & what patients see (P2 fact strip)
- **Open first:** `ExperienceIntro.tsx` stat strip and `CountUp` usage.
- **Dark band:** recipe 3.6.
- **Desktop:** heading; ratings as a dark glass card on the left (labels 12 px or more, large rating numerals in DM Serif Display, stars kept); on the right the statement in ivory serif and below it the three facts as a strip with hairline dividers (label 12 px or more, text 15 px). No solid red block. If the statement is a heading element in the current DOM, keep the element.
- **Mobile:** ratings card, statement, facts stacked.
- **Numbers:** `CountUp` on the two review counts, and on the rating values only if `CountUp` supports decimals (R0 reports); otherwise plain reveal. No count-up on "1994".
- **Motion:** heading `rise`; ratings and statement stagger; facts rise at 100 ms steps.
- **Do not** add `aggregateRating`. Do not change any figure (Q2).

### S9. Questions about treatment (P14 FAQ)
- **Open first:** the home FAQ if there is one; otherwise `ContactNextStep.tsx` for disclosure styling (read only).
- **Desktop:** two columns. Left (about 4/12, sticky): the heading and an added secondary link "Send an enquiry" to `/contact`. Right (about 8/12): the six native `<details>`, first open, no numbering, hairline dividers, red chevron, question in DM Serif Display, answer 16 px, up to 70 characters wide. This fills the blank right side.
- **Mobile:** single column, same disclosures.
- **Motion:** items `stagger` rise; on open the answer fades in with a 6 px translate (opacity and transform only).
- **SEO:** FAQ answers are not reworded. `FAQPage` JSON-LD: see section 7 and question Q5.

### S10. Consultation block (P16)
- Keep the shared `ContactNextStep` where it is. R0 confirms it renders on desktop. This run does nothing else with it. Its label "Call Neodent" differs from the standard's "Call for Consultation" (Q4).

---

## 5. Page header spec (S0 in one place)

- **Eyebrow:** the existing breadcrumb row, Home > Treatments, 12 px or more, not numbered.
- **h1:** unchanged: "Dental care for the concerns that bring you to Neodent." Red italic accent on "bring you to Neodent." stays (main heading).
- **Supporting line:** the existing paragraph, unchanged. (A plain "Dental treatments at Neodent Dental Hospital in Mehdipatnam and Nampally, Hyderabad." line is proposed as addition A1, section 12.)
- **Actions:** primary red "Call Neodent" (existing label; Q4), secondary outline "Send an enquiry" to `/contact` (added). Primary visible on mobile without scrolling.
- **Media and glass card:** portrait video, caption in a dark glass card below it. No brackets.
- **Backdrop layers:** charcoal to `#0f1315` gradient; red radial glow behind the video (alpha about 0.30, centre set by custom properties); icon pattern via `mask-image` fading to zero before the text column.
- **Mobile order:** breadcrumb, h1, paragraph, actions, video (at most 38dvh), caption.
- **Header image:** the video poster is the one `priority` media element on the page.

---

## 6. Motion plan

| Section | Elements | Variant | Stagger | Notes |
|---|---|---|---|---|
| S0 | h1, paragraph, actions, video, caption card | line mask, rise, mask | 100 ms; caption at 450 ms | Keyed off a CSS class set on mount (not `Reveal`); glow breathing and pattern drift at 768 px and wider only |
| S1 | statement, paragraphs | mask, rise | 80 ms | |
| S2 | heading, intro, cards, help band | mask, rise | 100 ms | Photos mask reveal; hover lift on desktop |
| S3 | heading, category cards | rise | 80 ms | |
| S4 | heading, doctor cards, paragraphs | mask, rise | 100 ms | Portraits mask reveal |
| S5 | text card, video, caption | rise, mask | 100 ms | Optional parallax at most 24 px on the video, 768 px and wider |
| S6 | heading, photo, steps | rise, mask | steps in order | The connecting line draws with scroll (`animation-timeline: view()` inside `@supports`, observer fallback) |
| S7 | heading, film, side card, tiles, before/after cards | rise, mask | 100 ms | Swipe rows reveal as a group on mobile |
| S8 | heading, ratings, statement, facts | rise | 100 ms | `CountUp` on review counts |
| S9 | heading, items | rise | 80 ms | Answer fade and 6 px translate on open |

All reveals: 300 to 700 ms, ease-out, `transform` and `opacity` only, hidden initial state added by a JavaScript class, final state under `prefers-reduced-motion`, no continuous animation on phones.

---

## 7. SEO, AEO, GEO checklist for this page

- **Metadata untouched.** `title` ("Dental Treatments in Hyderabad | Neodent Dental Hospital"), description, canonical, robots, Open Graph and sitemap entry stay byte-identical.
- **Headings.** One h1. Sections are h2 in page order: Featured dental treatments, Additional dental services, The thinking behind treatment, Understanding DMLS Crowns & Functional Strength, How treatment takes shape, Real cases. Visible outcomes., Experience, evidence & what patients see, Questions about treatment. Card titles and doctor names are h3. "See the work behind the treatment." is an h3 under Real cases. No heading becomes a styled div.
- **Internal links that must exist:** Home (breadcrumb); the seven "in detail" links to the treatment pages; "View Dr. Md. Miftah Ur Rahman's profile"; "Speak with our team"; the `/contact` link inside the consultation block. The link count never falls. Additions: clinician name in S5 to `/doctors/dr-miftah-ur-rahman`; "Send an enquiry" in S0 and S9; clinic names in S8 to `/clinic/mehdipatnam` and `/clinic/nampally` (A3).
- **Schema.** R0 lists the JSON-LD types already in `page.tsx`. All stay byte-identical. No `aggregateRating`. `foundingDate: "1994"` stays if present. Add `FAQPage` only per Q5.
- **FAQ (AEO).** Six visible questions exist, first open. Two more are proposed for approval (A2), written only from facts in the project: which treatments Neodent offers, and when each clinic is open.
- **GEO.** Clinic names, hours, doctors and credentials match section 1. "Neodent" spelling in running text. "Mehdipatnam" spelling; routes `/clinic/mehdipatnam`, `/clinic/nampally`. The h1 has no place name; the title tag and (if approved) A1 carry Hyderabad.
- **Images.** Descriptive alt text stays; decorative layers are `aria-hidden`; `next/image` with `sizes` and `aspect-ratio`; `priority` only on the header video poster; everything else lazy.
- **Performance.** The icon pattern is a `mask-image`, never a CSS `background-image`. No layout-property animation.

---

## 8. Ownership forecast and concurrency notes

- **Expected OWNED:** `app/treatments/page.tsx` (only if no other route imports it, which R0 confirms), and any component used only by the hub.
- **Expected FORK candidates** (verify with `grep -rl`): `components/treatments/BeforeAfterCases`, `RealTreatmentWork`, and any shared card or FAQ component the hub imports. Forks go to `components/pages/treatments-hub/`; the hub switches to the copy.
- **New files:** `components/pages/treatments-hub/*` (header, intro, featured treatments, services, doctors, DMLS, process, real cases, evidence, FAQ, `HubVideo`, `ResponsiveDetails`, the page wrapper CSS Module) and `lib/pages/treatments-hub-content.ts` (only for approved additions).
- **Read-only:** `lib/featured-treatment-catalog.ts`, `lib/site-data.ts`, `lib/clinical-team.ts`, `lib/clinic-data.ts`, `components/motion/*`, `components/sections/ContactNextStep*`, `components/ui/*` (including `EditorialHighlight`), `app/globals.css`, and everything under `app/treatments/<seven slugs>/`.
- **Family:** Treatments. Safe to run next to about, clinic, doctors, contact and privacy sessions. If a treatment-page session runs at the same time, both fork what they need and neither edits `components/treatments/*`. Do not start the hub while the shared pass (Appendix F) is running.
- **Expected shared-change requests:** (1) `ContactNextStep` button label "Call Neodent" versus the standard's "Call for Consultation"; (2) rating and review-count mismatch between this page and the footer; (3) if `CountUp` lacks decimals, a decimal option.

---

## 9. Run sequence

| Run | Scope | Files (new or edited) | Depends on | Time |
|---|---|---|---|---|
| R0 | Discovery, snapshot, ownership, answers to questions | `docs/internal-pages/treatments-hub/*` only | none | 15 min |
| R1 | Foundation and S0 header, `HubVideo`, `ResponsiveDetails` | wrapper CSS, `HubHeader`, `HubVideo`, `ResponsiveDetails`, `app/treatments/page.tsx` | R0 | 25 min |
| R2 | S1 intro and S2 featured treatments | `HubIntro`, `FeaturedTreatments`, `app/treatments/page.tsx` | R1 | 25 min |
| R3 | S3 services and S4 doctors and paragraphs | `AdditionalServices`, `ThinkingBehindTreatment`, `app/treatments/page.tsx` | R1 | 25 min |
| R4 | S5 DMLS and S6 process | `DmlsFeature`, `TreatmentProcess`, `app/treatments/page.tsx` | R1 | 25 min |
| R5 | S7 real cases (forks) | `RealCases` and forked components, `app/treatments/page.tsx` | R1 | 30 min |
| R6 | S8 evidence and S9 FAQ, S10 check | `ExperienceEvidence`, `HubFaq`, `app/treatments/page.tsx` | R1 | 25 min |
| R6B | Optional additions A1 to A3, only after owner approval | `HubHeader`, `HubFaq`, `ExperienceEvidence`, `lib/pages/treatments-hub-content.ts` | R6 and owner approval | 15 min |
| R7 | Motion and polish | all files created above | R2 to R6 | 20 min |
| R8 | Final fast check and screenshots | fixes only, within owned files | R7 | 20 min |

R2 to R6 touch different component files and share only `app/treatments/page.tsx`, so run them one after another in one session, never in parallel.

---

## 10. Prompts

Paste each prompt into Kiro, one at a time, in order. In every prompt the preamble is Appendix B with the slug filled in as `treatments-hub`.

### R0. Discovery and snapshot

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R0 for treatments-hub (/treatments): discovery and content snapshot. This run changes no site code.

Do:
1. Confirm http://localhost:3000/treatments responds. If not, stop and say so.
2. Run node scripts/page-content-snapshot.mjs treatments-hub /treatments. This is the content baseline.
3. Find the page's files: app/treatments/page.tsx and every component, CSS Module and data file it imports (follow the imports). For each file, run grep -rl on its name across app, components and lib to see who else imports it. Write docs/internal-pages/treatments-hub/OWNERSHIP.md with three lists: OWNED (only this page uses it), SHARED READ-ONLY (used elsewhere or on the never-edit list), and FORK CANDIDATES (shared components this page's redesign will need to change, with the planned copy path under components/pages/treatments-hub/). Add one line on each file's role. Also list other routes that share a family with this page.
4. Map the sections you find in the rendered page to the sections in PAGE_PLAN.md (section 3, content map). Write docs/internal-pages/treatments-hub/DISCOVERY.md with: the section list in order (heading, component, file), any content in the page that the plan missed, any section in the plan that does not exist, the images and videos found (path, alt, dimensions where known), and the existing JSON-LD types. Do not fix or change anything.
5. List copy that looks wrong, ungrammatical or unverifiable in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md (quote it; do not edit it).
6. Create docs/internal-pages/treatments-hub/CHANGELOG.md with an R0 entry.
7. Locate every home reference component named in section 4 of PAGE_PLAN.md (Hero, ExperienceIntro, LegacyStory, SpacesDesignedAroundCare, Expertise, ClinicalLeadership, PatientStories, WhatToExpect, SeamCard) and record each one's path and CSS Module path in DISCOVERY.md under "Reference components".
8. Answer from the code, in DISCOVERY.md under "Answers", the questions in section 12 of PAGE_PLAN.md that code can answer: Q1 (is the Call Neodent button hidden or missing on mobile, and why), Q3 (is ContactNextStep rendered on desktop, and is its container placed beside the FAQ), Q5 (existing JSON-LD types and any FAQPage), Q6 (are any additional services links), Q7 (video sources, posters, whether each is a native video element, subtitles burned in or captions), Q8 (the routes of the seven treatment pages from lib/featured-treatment-catalog.ts, read only). Also record the DOM order of the help card ("Not sure which treatment you need?") relative to the seven treatment cards, whether the S8 statement is a heading element, whether CountUp supports decimals, and which components render the page's highlights (EditorialHighlight) and whether those wrappers sit inside the text data or in the components.

Do not: edit any file outside docs/internal-pages/treatments-hub/ and .audit/treatments-hub/, start or stop servers, build, install, or use git write commands.
Report: files created, the ownership summary, differences between the plan and the real page, questions for the owner.
```

### R1. Page header and foundation

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R1 for treatments-hub (/treatments): foundation and page header (section S0 of PAGE_PLAN.md). One concern only: the header band and the two helpers that later runs reuse.

Read first: PAGE_PLAN.md sections 3 (S0), 4 (S0), 5 and 6; OWNERSHIP.md and DISCOVERY.md (header component, video source and poster, button href). Then open components/hero/Hero.tsx and its CSS Module and copy the layer recipe (gradient, red radial glow with custom properties, icon pattern as a luminance mask-image over an ivory fill that fades to zero before the text column, glass cards, line-mask reveal and how the hero keys its load animation off a CSS class). Open components/motion/Reveal.tsx (read only) and the media tokens in app/globals.css (read only).

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do:
1. Create components/pages/treatments-hub/TreatmentsHub.module.css: a page wrapper class that sets the page's custom properties (section padding and container width copied from LegacyStory.module.css), plus a light section shell and a dark section shell using the dark band recipe, reusable by later runs.
2. Create HubVideo.tsx (client component): props src, poster, label, mode ("autoplay" or "tap"), hasSpeech. Muted, playsInline, loop, preload="none" with the poster, no controls attribute. In "autoplay" mode play only while at least 50% is in view and pause when off screen; never autoplay under prefers-reduced-motion or saveData (show the poster with a visible play button). In "tap" mode play and pause on tap. Add a play/pause button and, when hasSpeech is true, a sound button, each at least 44x44 px with aria-labels. If R0 found that a video is not a native video element (for example an embed), keep it as it is and apply only the frame, caption and size cap.
3. Create ResponsiveDetails.tsx (client component): renders a native details element with the open attribute in the server HTML, takes a summary string and children, and after mount closes itself on screens under 768 px unless the visitor has already toggled it. The full text is always in the server HTML.
4. Create HubHeader.tsx and its CSS Module: the S0 layout from PAGE_PLAN.md section 4 and 5. Keep the breadcrumb, the h1 wording, the paragraph, the "Call Neodent" button (same label and href as now), the video (same source and poster) and both caption lines. Remove the corner brackets. Caption goes into a dark glass card under the video. Add an outline "Send an enquiry" link to /contact (addition: list it in the changelog). No highlights on the dark paragraph. All labels 12 px or more.
5. In app/treatments/page.tsx replace the old header with HubHeader inside the new page wrapper. Leave everything else as it is.

Acceptance (checkable):
- h1 text is unchanged and there is exactly one h1.
- At 390x844 the "Call Neodent" button is fully visible without scrolling.
- The video is at most 38dvh high at 390 wide and at most calc(100dvh - 190px) high at 1366x650; the header fits 1366x650.
- No element in the header has a font size under 12 px.
- The pattern is applied with mask-image and does not appear behind the h1 or paragraph.
- Under prefers-reduced-motion the header shows its final state with no transforms.

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R1; (e) open two or three screenshots from .audit/treatments-hub/R1/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R1 entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R2. Intro and featured treatments

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R2 for treatments-hub (/treatments): sections S1 (intro) and S2 (featured dental treatments).

Read first: PAGE_PLAN.md sections 3 (S1, S2), 4 (S1, S2) and 6; OWNERSHIP.md and DISCOVERY.md. Then open the home components ExperienceIntro.tsx (the "Care begins" block) and LegacyStory.tsx with their CSS Modules, and Expertise.tsx with its CSS Module (card radius, shadow, spacing). Open TreatmentsHub.module.css and ResponsiveDetails.tsx from R1 and reuse them.

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do:
1. Create HubIntro.tsx and CSS: pattern P3. Desktop: two columns, the serif statement on the left as the lede with the short red rule above it, the three paragraphs on the right in a reading column no wider than 70 characters. Mobile: statement and paragraph 1 visible, paragraphs 2 and 3 inside ResponsiveDetails with the summary "More on how Neodent plans care". At most two highlights in the section, on light text only.
2. Create FeaturedTreatments.tsx and CSS: pattern P6 on the dark band shell. Keep the heading words, the intro paragraph, all seven cards (photo and its alt text, title, one line, "<name> in detail" link with the exact anchor text and href) and the help card (heading, line, "Speak with our team" link with its href).
   - Desktop: heading left, intro right. Full Mouth Rehabilitation as a wide horizontal card across three columns (photo about 40%, text and link vertically centred). The other six cards in a 3x2 grid. Card body text 15 px, link label 14 px semibold red with an arrow that never wraps onto its own line. The help card becomes a slim full-width band under the grid with the "Speak with our team" link styled as the primary red button.
   - Mobile: Full Mouth Rehabilitation card full width with its photo at most 30dvh; the other six as compact row cards (88 px square thumbnail, title, line and link; at least 96 px tall; link target at least 44 px); then the help band. All photos stay in the DOM.
   - The icon pattern shows only at the edges and lower area and fades to zero under the heading and intro. Use the red italic accent on the h2 "Featured dental treatments." only; keep the words and the h2 element.
3. Use Reveal for the headings (mask), the card grid (stagger rise, 100 ms), and the photos (mask reveal). Hover lift on desktop only.
4. Replace the old S1 and S2 components in app/treatments/page.tsx with the new ones.

Acceptance (checkable):
- Seven cards with seven photos, seven "in detail" links with unchanged anchor text and href, plus the help link.
- At 390 wide, no image taller than 30dvh in S2, and S2 is at most 2.5 x 844 px tall.
- No card has more than 35% unused inner height at 1366 or 390 wide.
- Highlights: at most two in S1 and none inside the dark S2 body text.
- No horizontal overflow at 360, 390 and 768.

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R2; (e) open two or three screenshots from .audit/treatments-hub/R2/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R2 entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R3. Additional services and the thinking behind treatment

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R3 for treatments-hub (/treatments): sections S3 (additional dental services) and S4 (the thinking behind treatment).

Read first: PAGE_PLAN.md sections 3 (S3, S4), 4 (S3, S4) and 6; OWNERSHIP.md and DISCOVERY.md. Then open the home components ClinicalLeadership.tsx and ClinicalLeadership.module.css (doctor card radius, portrait panel, definition rows, team swipe row), and Expertise.tsx card CSS. Reuse TreatmentsHub.module.css and ResponsiveDetails.tsx.

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do:
1. Create AdditionalServices.tsx and CSS: pattern P6 on a light shell. Keep the heading words, the intro and all four categories with all 14 services. Desktop: four category cards in a 2x2 grid with align-items: start; each card has the category name as a small semibold heading (14 px or more) and its services as a wrapping list of pills (ul, 15 px). If R0 recorded that any service is a link, it stays a link. Mobile: four stacked compact cards, the section under 1.5 x 844 px tall.
2. Create ThinkingBehindTreatment.tsx and CSS: patterns P10 and P3 on the dark band shell. Keep both doctor cards in full (portrait and alt text, name, role, every row and its text, the profile link on Dr. Md. Miftah Ur Rahman's card) and the three paragraphs. Desktop: two equal-height cards, then the three paragraphs in two balanced CSS columns (DOM order unchanged), each column at most 70 characters wide. Key phrases may be semibold ivory; no marker highlights on dark text. Mobile: the two cards as a swipe row (overflow-x auto, scroll-snap-type x mandatory, cards 84% wide, keyboard focusable, both in the DOM); then paragraph 1 visible and paragraphs 2 and 3 in ResponsiveDetails with the summary "More on treatment planning".
3. Heading accent: these two h2 headings render in one ink colour (no red italic); keep the words and the h2 elements.
4. Use Reveal: headings (rise or mask), category cards and doctor cards (stagger rise, 80 to 100 ms), portraits (mask reveal), paragraphs (rise).
5. Replace the old S3 and S4 components in app/treatments/page.tsx.

Acceptance (checkable):
- 14 services present; both doctor cards complete; profile link present with unchanged text and href.
- Row labels and captions are 12 px or more.
- Doctor names, roles and credentials are character-for-character the same as in content-snapshot.json.
- At 390 wide, the doctor cards form a horizontally scrolling row and the next card peeks.
- The founder's card has at most 15% unused inner height at 1366 wide.
- No "Smile Designer", no new credential or claim anywhere.

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R3; (e) open two or three screenshots from .audit/treatments-hub/R3/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R3 entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R4. DMLS feature and how treatment takes shape

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R4 for treatments-hub (/treatments): sections S5 (DMLS crowns and functional strength) and S6 (how treatment takes shape).

Read first: PAGE_PLAN.md sections 3 (S5, S6), 4 (S5, S6) and 6; OWNERSHIP.md and DISCOVERY.md (video source, poster and photo alt text). Then open the home components LegacyStory.tsx and SpacesDesignedAroundCare.tsx (split with media), and WhatToExpect.tsx with its CSS Module (connecting line and step markers). Reuse HubVideo.tsx and TreatmentsHub.module.css.

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do:
1. Create DmlsFeature.tsx and CSS: pattern P5 on a light shell. Keep the heading "Understanding DMLS Crowns & Functional Strength", the paragraph, the Clinician, Qualifications and Specialism rows, the video, and both caption lines. Desktop: text card left (about 7/12), video right (about 5/12), vertically centred, capped at var(--media-max-h-compact), rounded with a hairline border and soft shadow, no corner brackets, caption below the video with the "Clinical education" label at 12 px or more. Wrap the clinician name in a link to /doctors/dr-miftah-ur-rahman (addition; the text does not change; list it in the changelog). Use HubVideo in "tap" mode with hasSpeech true. Mobile: text, then the video centred and at most var(--media-max-h-compact) high, caption below, with no blank strip beside the video. One highlight at most in the paragraph.
2. Create TreatmentProcess.tsx and CSS: patterns P8 and P5 on a light shell. Keep the heading, the paragraph, the photo with its alt text, and the four steps with their text. Desktop: photo left (radius and hairline like the other photos, aspect 4/5, max-height var(--media-max-h), object-fit cover with a focal point toward the dental chair), vertical stepper right: a connecting line with a dot per step, step titles in DM Serif Display, descriptions 15 to 16 px up to 52 characters wide, plain rows with hairline dividers (no boxed cards, no numerals, no red top lines of unequal length). Mobile: photo at most 30dvh, then the stepper.
3. Heading accent: both h2 headings render in one ink colour; keep the words and elements.
4. Use Reveal and the motion plan: DMLS text card rise, video mask reveal with settle (parallax at most 24 px on the video only at 768 px and wider); process photo mask reveal, steps rise in order, and the connecting line draws with scroll (animation-timeline: view() inside @supports, with an IntersectionObserver class as fallback).
5. Replace the old S5 and S6 components in app/treatments/page.tsx.

Acceptance (checkable):
- The DMLS video is at most var(--media-max-h-compact) high at every audited viewport and is not left-aligned in a wider empty column at 390 wide.
- No corner-bracket element remains on the page.
- The four steps and their descriptions are present with unchanged text.
- No element in S5 or S6 has a font size under 12 px.
- The connecting line has a visible draw (or its final state under prefers-reduced-motion).

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R4; (e) open two or three screenshots from .audit/treatments-hub/R4/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R4 entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R5. Real cases

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R5 for treatments-hub (/treatments): section S7 (real cases, visible outcomes). This is the largest media section; do only this section.

Read first: PAGE_PLAN.md sections 3 (S7), 4 (S7) and 6; OWNERSHIP.md and DISCOVERY.md (list of videos and photos with sources, posters and alt text; which components are shared). Then open components/treatments/BeforeAfterCases.tsx and RealTreatmentWork.tsx with their CSS (shared: do not edit them; copy what you need into components/pages/treatments-hub/ and switch this page to the copies), and the home component PatientStories.tsx (swipe row). Reuse HubVideo.tsx and TreatmentsHub.module.css.

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do:
1. Create RealCases.tsx and CSS (plus forked copies of any shared component you need), pattern P11 with P7 on a light shell. Keep every item: heading, paragraph, the large clinical film with its caption lines, the h3 "See the work behind the treatment." and both paragraphs, the three video tiles with titles and captions, and the four before/after cards with BEFORE and AFTER labels, titles and captions. Keep the photos' pixelation exactly as supplied.
2. Desktop: the film (landscape, max-height var(--media-max-h-compact), caption below it) in 7 columns beside the side card in 5 columns, vertically centred; then the three video tiles in three equal columns (aspect 4/5, object-fit cover with a focal point, max-height var(--media-max-h-compact), caption below each); then the four before/after cards in an equal 2x2 grid, each with the Before and After photos side by side, 12 px pills, then title and caption below.
3. Mobile: film full width, side card, the three tiles as a swipe row (cards 84% wide), the four before/after cards as a swipe row (cards 88% wide, pair side by side). Every item stays in the DOM. The section is at most 4 x 844 px tall at 390 wide. No two large images stack vertically.
4. Videos: HubVideo in "tap" mode (muted, loop, preload none, poster); a sound button on the film only if R0 recorded that the film has speech. Keep the existing play behaviour if it already works; do not replace a non-native player.
5. Heading accent: the h2 "Real cases. Visible outcomes." keeps the red italic accent (one of two sections allowed). At most two highlights in the paragraphs, on light text.
6. Use Reveal: heading rise, film mask reveal with settle, cards stagger rise at 100 ms.
7. Replace the old S7 component in app/treatments/page.tsx.

Acceptance (checkable):
- Eight before/after photos, four video tiles or films, all present with alt text unchanged (content check passes).
- At 390x844 no media is taller than 70% of the viewport and the audit reports no stacked large images.
- Before/after cards have equal width at 1366 wide.
- Captions and pills are 12 px or more.
- No horizontal overflow at 360 (the swipe rows scroll inside their own container).

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R5; (e) open two or three screenshots from .audit/treatments-hub/R5/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R5 entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R6. Experience, evidence and FAQ

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6 for treatments-hub (/treatments): sections S8 (experience and evidence) and S9 (questions), and a check of S10.

Read first: PAGE_PLAN.md sections 3 (S8, S9, S10), 4 (S8, S9, S10) and 6; OWNERSHIP.md and DISCOVERY.md (how the FAQ data is stored, any FAQPage JSON-LD, whether CountUp supports decimals). Then open the home components ExperienceIntro.tsx (stat strip and CountUp use), and the dark band recipe in TreatmentsHub.module.css from R1. For disclosure styling, read (do not edit) components/sections/ContactNextStep.tsx and its CSS.

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do:
1. Create ExperienceEvidence.tsx and CSS: pattern P2 on the dark band shell. Keep the heading, "Patient reviews", both clinics with their ratings, stars and review counts exactly as written (do not change any figure), the statement and the three facts with their labels and text. Desktop: ratings as a dark glass card on the left, the statement in ivory DM Serif Display on the right with the three facts below it as a strip with hairline dividers; no solid red block. Mobile: ratings card, statement, facts, stacked. Labels 12 px or more. Use CountUp on the two review counts, and on the rating values only if CountUp supports decimals; no count-up on 1994. The h2 renders in one ink colour. Do not add any schema or aggregateRating.
2. Create HubFaq.tsx and CSS: pattern P14 on a light shell. Keep all six questions and answers with their text; native details elements, first open, no numbering, hairline dividers, red chevron. Desktop: two columns, the left (about 4/12, sticky) holds the h2 and an added secondary link "Send an enquiry" to /contact (addition; list it in the changelog); the right (about 8/12) holds the six items, answers 16 px and at most 70 characters wide. Mobile: one column. On open, the answer fades in with a 6 px translate (opacity and transform only). Read the FAQ from the same data array the page already uses.
3. S10: do not edit ContactNextStep. In DISCOVERY terms, confirm it is rendered on desktop. If it is rendered but invisible in a desktop full-page screenshot, say so in the report and add a line to docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md. If it is not rendered on desktop, report it and append a shared-change request to docs/internal-pages/_shared-requests.md using only a shell append.
4. Use Reveal: headings rise, ratings and statement stagger, facts rise at 100 ms steps, FAQ items stagger at 80 ms.
5. Replace the old S8 and S9 components in app/treatments/page.tsx.

Acceptance (checkable):
- Ratings, review counts and all six questions and answers are character-for-character the same as in content-snapshot.json.
- The FAQ first item is open in the server HTML, the others are closed, and all six answers are in the server HTML.
- At 1366 wide the FAQ section no longer has a blank right half.
- Fact labels and ratings labels are 12 px or more.
- No JSON-LD changed.

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R6; (e) open two or three screenshots from .audit/treatments-hub/R6/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R6 entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R6B. Optional additions (run only after owner approval)

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6B for treatments-hub (/treatments): optional additions A1 to A3. Run this only after the owner has approved them in section 12 of PAGE_PLAN.md (the owner will tell you which of A1, A2 and A3 are approved; do only those). Additions never replace anything.

Read first: PAGE_PLAN.md sections 7 and 12; OWNERSHIP.md; DISCOVERY.md (JSON-LD types, FAQ data array). All wording below comes from facts already in the project (Part 1 of the standard); do not invent anything else.

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do, for each approved item:
- A1 (header supporting line): in HubHeader add one plain line under the existing paragraph: "Dental treatments at Neodent Dental Hospital in Mehdipatnam and Nampally, Hyderabad."
- A2 (two extra FAQs): put these in lib/pages/treatments-hub-content.ts and append them after the six existing items in HubFaq. Q: "Which dental treatments does Neodent offer?" A: "Neodent offers seven featured treatments: composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design and cosmetic dentistry, full mouth rehabilitation, and scaling and polishing. Both clinics, Mehdipatnam and Nampally, offer all seven." Q: "When are the Neodent clinics open?" A: "The Mehdipatnam clinic is open Monday to Saturday, 4:00 PM to 8:00 PM, and the Nampally clinic is open Monday to Saturday, 10:30 AM to 5:00 PM. Sunday is a holiday." Take the hours from lib/clinic-data.ts or lib/site-data.ts (read only) so they stay identical to the single source; if they differ from the text above, use the single source and report the difference.
- FAQPage JSON-LD (only if A2 is approved and R0 found no existing FAQPage block): add one FAQPage block to page.tsx generated from the same data array as the visible FAQ, so every question and answer matches word for word. If a FAQPage block already exists, leave it unchanged and report.
- A3 (clinic links): in ExperienceEvidence wrap the two clinic names in the ratings card in links to /clinic/mehdipatnam and /clinic/nampally. The visible text does not change.

Acceptance (checkable):
- Content check reports missing 0 and the existing JSON-LD blocks are byte-identical.
- Each addition is listed in the changelog as an addition with the owner's approval noted.
- FAQ JSON-LD (if added) matches the visible FAQ word for word.

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R6B; (e) open two or three screenshots from .audit/treatments-hub/R6B/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R6B entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R7. Motion and polish

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R7 for treatments-hub (/treatments): motion and polish. No new design work.

Read first: PAGE_PLAN.md section 6 (motion plan) and section 11 (rubric); OWNERSHIP.md; the last CHANGELOG entries; components/motion/Reveal.tsx and CountUp.tsx (read only).

Files you may edit: new files under components/pages/treatments-hub/ (components and CSS Modules), lib/pages/treatments-hub-content.ts, app/treatments/page.tsx (swap section components only; the metadata export and every JSON-LD block stay byte-identical), and docs/internal-pages/treatments-hub/. Anything else: stop and explain.

Do:
1. Walk every component in components/pages/treatments-hub/ against the section 6 table. For each section list where its reveal is applied. Add any missing reveal. Check that every hidden initial state is applied by a JavaScript-added class (the page must read with JavaScript disabled) and that nothing animates a layout property.
2. Add hover lift to cards and buttons inside @media (hover: hover) and (pointer: fine) only, and a press state (small scale down) for touch. Add visible :focus-visible rings in the red token on links, buttons, summaries and swipe rows.
3. In every CSS Module add or confirm @media (prefers-reduced-motion: reduce) so reveals show their final state, with no transforms, no zoom, no drift, no parallax. Confirm glow breathing, pattern drift and parallax exist only inside @media (min-width: 768px).
4. Confirm the heading accent rule: the red italic accent appears on the h1, "Featured dental treatments." and "Real cases. Visible outcomes." only. Confirm highlights: at most two per section, none on dark body text.
5. Confirm there is no label under 12 px and no numbered eyebrow, ghost numeral, bracket, arc or rotated label anywhere in the new components (search the CSS and TSX).
6. Fix only what these checks find.

Acceptance (checkable):
- A table in the changelog: section, reveal element, variant, file. Every section S0 to S9 has at least one visible reveal.
- grep for "font-size" values under 12 px in the new CSS returns nothing (rem equivalents included).
- The 390-wide screenshot with JavaScript disabled shows all text.

Verify (fast check only, then stop): (a) npx tsc --noEmit with output filtered to components/pages/treatments-hub and app/treatments/page.tsx; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs treatments-hub /treatments must report missing 0; (d) node scripts/page-audit.mjs treatments-hub /treatments R7; (e) open two or three screenshots from .audit/treatments-hub/R7/ (one at 390 wide, one at 1366 wide) and describe what is on screen and anything that looks wrong. At most two fix-and-recheck cycles.
Content conflicts: if a layout need conflicts with a content rule, relocate the content, never delete it, and record the case in docs/internal-pages/treatments-hub/CONTENT_QUESTIONS.md.
Do not: edit any other file, build, install, start or stop servers, run Lighthouse, or use git write commands.
Report: append the R7 entry to docs/internal-pages/treatments-hub/CHANGELOG.md (files changed, content check result, audit numbers, additions made, questions). End your reply with the absolute paths of the screenshots.
```

### R8. Final fast check and screenshots

```text
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/treatments-hub/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/treatments-hub/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/treatments-hub/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R8 for treatments-hub (/treatments): final fast check and screenshots. Fix only what the checks find, within the files you own.

Do:
1. Walk through the page top to bottom in the dev server screenshots at 1366x650 and 390x844. For each section confirm: it follows the pattern in PAGE_PLAN.md section 4; there is a visible on-scroll reveal; no card is more than 35% empty; no media is over 70% of the viewport; nothing overflows at 360.
2. Run the fast check from "Agent rules" item 9 with run-id final. Allow at most two fix-and-recheck cycles.
3. Save full-page desktop (1440 wide) and mobile (390 wide) screenshots as .audit/treatments-hub/final/desktop-full.png and mobile-full.png (the audit script's full-page shots are acceptable). Print their absolute paths.
4. Write the final CHANGELOG.md entry: files changed in the whole page redesign (the owner uses it to commit by path), content check result, audit numbers, forks made, shared-change requests, open questions, and anything not done.

Do not: add new design work, build, run Lighthouse or deep tests, start servers, or use git write commands.
Report: pass or fail per check, the screenshot paths, the open items.
```


---

## 11. Acceptance and rating rubric

The owner checks these in the final desktop and mobile screenshots. The Claude chat rates each out of 10 and writes improvement prompts below 9.

**Content (pass or fail).** Content check reports missing 0 and shortened 0; one h1; title, description, canonical, robots and JSON-LD unchanged; every internal link, image and video present; additions are listed in the changelog.

**Design.**
- Header matches the home hero recipe: glow, pattern fading before the text, no brackets, caption glass card clear of the subtitles.
- Red italic accent on three headings only; highlights at most two per section; no tiny all-caps micro-labels; no numbered or ghost decoration.
- Rhythm alternates light and dark with no more than two dark bands in a row.
- No card more than 35% empty. FAQ no longer has a blank right half.
- Photos share one radius, hairline and shadow.

**Mobile (390 and 360).**
- Primary action visible in the first screen. No horizontal overflow.
- No two large images stacked; featured treatments, doctor cards, tiles and before/after use compact rows or swipe rows with the next card peeking.
- No section taller than about 2.5 phone screens with disclosures collapsed (real cases about 4).
- Body text 15 px or more; tap targets 44 px or more.

**Media.** No image or video above 70% of the viewport height; videos muted, looping, poster, tap or in-view play, sound button where the doctor speaks.

**Motion.** Every section has a visible reveal; numbers count; the process line draws; reduced motion shows final states.

**SEO, AEO, GEO.** Headings in order; descriptive alt text; FAQ visible and first open; clinic and doctor facts identical to the single sources; no aggregateRating; no invented claim.

**Target:** 9 to 9.5 desktop and mobile.

---

## 12. Open owner questions and approvals

Nothing below is guessed. R0 answers the questions it can from code (Q1, Q3, Q5, Q6, Q7, Q8) and records them in `DISCOVERY.md` under "Answers".

**Questions**
- **Q1. Mobile primary action.** The mobile capture shows no "Call Neodent" button between the paragraph and the video. Is it hidden on mobile, or missing? (R0 checks. If hidden, R1 shows it.)
- **Q2. Ratings do not match the footer.** This page: Mehdipatnam 4.3 with 260 reviews, Nampally 4.5 with 155 reviews. Footer: Mehdipatnam 4.3 with 261 reviews, Nampally 4.6 with 157 reviews. Which is current? Nothing is changed in this plan. If one is wrong, tell me and it goes to the shared pass or an allowlist entry.
- **Q3. Consultation block on desktop.** The desktop capture shows no "Ready to discuss your dental concerns?" block before the footer, and the FAQ leaves its right half blank. Is the block missing on desktop, or did the capture miss a reveal? (R0 and R6 check.)
- **Q4. Button label.** The standard names the primary label "Call for Consultation", but this page and the shared consultation block say "Call Neodent", and the content rules forbid rewording labels. I kept "Call Neodent". Do you want it renamed to "Call for Consultation" on this page (needs an allowlist entry from you) and in `ContactNextStep` (a shared change)?
- **Q5. FAQ schema.** Does `page.tsx` already have a `FAQPage` block? If none, do you want one added (part of A2)?
- **Q6. Additional services.** Are any of the 14 additional services links to pages? If not, they stay plain pills.
- **Q7. Videos.** What are the real sources and posters, and do the clinical film and the DMLS video have speech? That decides the sound buttons.
- **Q8. Treatment names in running text.** Should treatment names in the header paragraph link to their pages? Only if the routes are in the catalog; R0 reports them.
- **Q9. Process photo.** The room photo in "How treatment takes shape" is dim and cluttered. I cannot remove it. If you have a better photo of the same treatment room, supply it and I will add it as an extra rather than a replacement.

**Additions for your approval (run R6B only after you say yes)**
- **A1.** Plain supporting line under the header paragraph: "Dental treatments at Neodent Dental Hospital in Mehdipatnam and Nampally, Hyderabad."
- **A2.** Two extra FAQs (which treatments Neodent offers; when the clinics are open), text in R6B, from facts already in the project, with a matching `FAQPage` block if none exists.
- **A3.** Clinic names in the ratings card link to `/clinic/mehdipatnam` and `/clinic/nampally`.

**Already added in the runs (log only; say if you want any removed).** A secondary "Send an enquiry" link in the header and beside the FAQ heading; a link on the clinician name in the DMLS section; the summary labels "More on how Neodent plans care" and "More on treatment planning".

---

## 13. Appendix: Agent rules

```
AGENT RULES (binding for every run on this page)

You are one of several coding sessions working in this repository at the same time, each on a different page. Another session may be editing other files while you work.

1. CONTENT: Never delete, shorten, summarise, reword, merge or hide any text, image, video, document, caption, alt text, link, button, form field or structured-data field. Re-place, re-layout and restyle only. Repeated content stays. Questionable copy goes into docs/internal-pages/<slug>/CONTENT_QUESTIONS.md, not into an edit. Mobile and desktop carry the same content. Collapsed text is a native <details> with the full text in the server HTML. Metadata exports and JSON-LD in page.tsx stay byte-identical.
2. DESIGN: Match the home page. Fonts: Manrope (body), DM Serif Display (headings). Colours only from the existing tokens (ink #263033, charcoal #161c1e, ivory #f8f6ef, surface #fffefa, red #d71920, dark red #b5121a). Before building a section, open the home component named in the plan and its CSS and copy its pattern, spacing and radii. No numbered eyebrows, ghost numerals, roman numerals, corner brackets, registration marks, arcs, rotated edge labels, meta strips, labels under 12 px, or repeated red-italic headline formula. Eyebrows are plain words. No card with more than 35% empty space. Primary button "Call for Consultation" (tel link from lib/site-data.ts: ctaTelPhone, ctaPhone; never hard-code a number), secondary "Send an enquiry" linking to /contact.
3. MEDIA: No image or video taller than 70% of the viewport height (use max-height: var(--media-max-h) or var(--media-max-h-compact)). Photos use object-fit: cover with a focal point; documents (cuttings, certificates, radiographs) use contain, whole, tap to zoom. Two large images never stack on mobile: use one image or a swipe row with every image in the DOM. next/image with sizes and aspect-ratio; priority only on the main header image. Videos: muted playsInline loop, preload="none" with a poster, play only while in view, not under prefers-reduced-motion.
4. MOBILE: 360x740, 390x844, 768x1024. No horizontal overflow. Body 15px or more, labels 12px or more, tap targets 44x44 or more. Headline and primary action first, then media (at most 38dvh) or a swipe row (overflow-x auto, scroll-snap, cards 82 to 88% wide).
5. MOTION: Every section needs a visible on-scroll reveal. Use components/motion/Reveal.tsx (variants rise, fade, mask; delay; stagger) and CountUp.tsx, read-only. Stagger card grids, mask-reveal key photos, draw connecting lines with scroll, crossfade tabs. 300 to 700 ms, ease-out. Animate transform and opacity only. Hidden initial states must be applied by JavaScript-added classes so the page reads with JavaScript off. prefers-reduced-motion: final state, no transforms. No continuous animation on phones. No new libraries.
6. SEO / AEO / GEO: One h1 with entity words, headings in order, every internal link kept with its anchor, descriptive alt text, JSON-LD kept, schema only for visible content, no aggregateRating, no invented facts, prices, claims or outcomes. Clinic names, addresses, phones, hours and doctor facts come from lib/site-data.ts, lib/clinic-data.ts and lib/clinical-team.ts. Hours: Mehdipatnam Mon-Sat 4:00 PM to 8:00 PM; Nampally Mon-Sat 10:30 AM to 5:00 PM. Dr. Muti Ur Rahman is MBBS / MD (General Medicine), never a dental specialist. Write "a Neodent specialist" for consultations. Do not add the phrase "Smile Designer" anywhere new.
7. FILES: Edit only files listed as OWNED in docs/internal-pages/<slug>/OWNERSHIP.md or new files under components/pages/<slug>/, lib/pages/<slug>-content.ts and docs/internal-pages/<slug>/. Before editing any existing component, run grep -rl "<Name>" app components to see if anything else imports it; if so it is shared: copy it into components/pages/<slug>/ and switch this page to the copy. CSS Modules only; no new global classes. Never edit app/globals.css, app/layout.tsx, components/layout/*, components/Home.tsx, components/hero/*, components/motion/*, components/sections/ContactNextStep*, components/ui/*, components/consent/*, components/analytics/*, lib/site-data.ts, lib/clinical-team.ts, lib/clinic-data.ts, lib/structured-data.ts, lib/og-image.tsx, lib/featured-treatment-catalog.ts, package.json, lockfiles, config files, existing scripts, existing files in public/, or any other page's files. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append (cat >> file <<'EOF').
8. COMMANDS: Never run npm run build, npm install, npm ci, next dev, next start, or anything that touches .next or node_modules. Never start or stop a server: the owner's dev server is at http://localhost:3000; if it is unreachable, stop and say so. Never git commit, stash, checkout, reset, restore, clean, rebase, merge, pull or push. Allowed: git status, git diff -- <your paths>. If a compile error is in a file you do not own, wait 30 seconds and retry once, then report it; never fix it.
9. VERIFY (fast check only, then stop): (a) npx tsc --noEmit, output filtered to your owned paths; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs <slug> <route> must report zero missing; (d) node scripts/page-audit.mjs <slug> <route> <run-id> (three viewports); (e) open two or three screenshots and describe them. At most two fix-and-recheck cycles. No Lighthouse, no deep or exhaustive tests, no extra viewports. Aim to finish in 20 to 30 minutes; if a step is taking much longer, stop and report.
10. REPORT: Append an entry to docs/internal-pages/<slug>/CHANGELOG.md: run id, files changed, summary, content check result (missing: N), audit numbers, questions for the owner, shared-change requests made, screenshot paths (absolute), anything unfinished. End your reply with the screenshot paths. Leave all changes uncommitted.
```
