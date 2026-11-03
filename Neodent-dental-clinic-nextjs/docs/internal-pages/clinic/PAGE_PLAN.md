# PAGE_PLAN.md: Clinics hub (`/clinic`)

Save as `docs/internal-pages/clinic/PAGE_PLAN.md`. Written against NEODENT_INTERNAL_PAGES_GLOBAL_STANDARD.md v1 (30 Oct 2026).

---

## 0. Header

| Item | Value |
|---|---|
| Page | Clinics hub: "Two locations. One Neodent standard." |
| Route | `/clinic` |
| Slug | `clinic` |
| Family (11.4) | Clinic family: `/clinic` and `/clinic/[slug]` share `components/clinic/*` and `components/clinic/branch/*`. **One session at a time in this family.** Do not run a `/clinic/mehdipatnam` or `/clinic/nampally` session while this plan runs. |
| Model | Sonnet 5.5 in Kiro CLI |
| Dev server | Owner's `npm run dev` on `http://localhost:3000` must be running. Agents never start or stop it. |
| Date | 31 Oct 2026 |
| Status | Draft, waiting for owner answers in section 12 (none of them blocks R0 to R5) |

---

## 1. Page facts

- **Purpose:** the hub that helps a patient choose between the Mehdipatnam and Nampally clinics, shows the real spaces, and sends them to a call, directions, the clinic page or a treatment page.
- **Audience:** Hyderabad patients, about 80% on a phone, many arriving from Google Maps or a "dentist near me" search and deciding by address, hours and phone number.
- **Search intent and target queries** (only phrases already on the page or approved in Part 1 of the standard): Neodent Dental Hospital Hyderabad, Neodent clinics Hyderabad, dental hospital in Mehdipatnam, dental hospital in Nampally, Neodent Mehdipatnam, Neodent Nampally, specialist-led dental care Hyderabad.
- **Conversion goal:** a tap on Call Mehdipatnam or Call Nampally (primary), then Get directions, then Clinic details, then Send an enquiry.
- **Measure of success:** the page reads as a calm hospital site, a phone user can reach a call button without scrolling past media, and the page is clean enough to show other clinics as a flagship pitch.

---

## 2. Screenshot findings

How I read the screenshots: both are scaled-down full-page captures, so body text, micro-labels and exact photo heights cannot be measured from them. Those items are listed as questions for R0 and for the audit script. The round **N** button that repeats down the left edge of both screenshots is the Next.js dev indicator, captured while the page was stitched. It is not part of the design. Hide it in future screenshots. The round phone icon near the footer is the global call button and is not touched.

### Desktop, section by section

| # | Section | Score | What is wrong or weak |
|---|---|---|---|
| 1 | Page header: eyebrow, h1 "Two locations. One Neodent standard.", paragraph, two call buttons, portrait photo "Mehdipatnam waiting lounge" | 7 | Strong start and the h1 follows the home pattern. Problems: the supporting paragraph carries a red marker underline on dark body text (not allowed in dark body text); the eyebrow has a leading rule line and tracked small caps (size cannot be judged); the photo caption is a small all-caps micro-label; both call buttons have the same weight, so there is no clear primary action; no clinic hours or proof inside the header. |
| 2 | "At a glance" strip: Since 1994, 2 clinics, 7 treatments at each clinic, 25,000+ patients treated | 7 | Good pattern (P2). The "At a glance" tab sits awkwardly against the strip; the number labels look very small; I cannot tell whether the numbers count up. |
| 3 | "Find your clinic. Mehdipatnam or Nampally." with two clinic cards | 7 | The red italic formula is used here again. Each card has three or more marker underlines, far over the limit of two. The Address, Phone and Hours labels look like tiny all-caps micro-labels. Three buttons plus a heavy dark "Dr. Md. Miftah Ur Rahman practises here" bar make each card action-heavy. No plain supporting line under the heading. |
| 4 | "Different surroundings. The same approach to care." with two photos and a red statement card | 6.5 | Red italic formula again. Both photos are tall portraits and may be near the 70% height limit. The captions sit in light boxes under the photos inside a dark section; the standard puts captions on a dark gradient over the photo here. The red card is heavy but its content fills it well. |
| 5 | "Spaces designed around care." with a Mehdipatnam gallery (8 photos) and a Nampally gallery (2 photos) | 6.5 | Red italic formula again. Ten photos are shown at once with no lightbox that I can see. Marker underlines on "Mehdipatnam and Nampally" and "consultation and treatment". Captions sit over the photos on a light section; the standard puts them below. The gallery is the heaviest part of the page. |
| 6 | "Featured dental treatments, at both clinics." with seven treatment cards and a "Not sure which treatment you need?" card | 6.5 | **The first line of the heading is not visible on desktop** (only "at both clinics." shows), which looks like dark text on the charcoal band. The mobile screenshot shows the full heading. Red italic formula again. Card category words (REPAIR, REPLACE, PRESERVE and so on) look like small all-caps labels. No plain supporting line. |
| 7 | Red band "Ready to visit? Call or send an enquiry." with Call Mehdipatnam, Call Nampally, Send an enquiry | 7 | Clear and useful. I cannot tell whether this is the shared `ContactNextStep` or a clinic-only band (R0 finds out). The italic accent repeats the formula. |
| 8 | Footer ("Changing smiles since 1994.", links, locations with Google ratings) | not scored | Global, read-only. |

**Page-level problems from the ban list:** the red italic phrase appears on 6 of 7 headings (the standard allows the page heading plus at most one section in three); marker underlines are far over the limit; all-caps micro-labels in several places; ten gallery photos and several tall photos.

**Overall desktop rating: 6.8 / 10.** The structure and the section order are right and the content is complete. It needs the discipline of the home page.

### Mobile, section by section

| # | Section | Score | What is wrong or weak |
|---|---|---|---|
| 1 | Header | 6.5 | Text, then two stacked call buttons, then the portrait photo, which is correct order. The photo is very tall for a phone (the cap is 38dvh). No hours or proof near the buttons. |
| 2 | At a glance strip | 6.5 | Four facts in a tall stack. A 2 by 2 grid would halve the height. |
| 3 | Clinic cards | 6 | Each card is three buttons stacked full width plus the Dr. bar, so every card is very tall. Highlights are heavy in a narrow column. |
| 4 | Different surroundings | 6.5 | Two small photos side by side, then the red card. The photos are too small to see anything. |
| 5 | Spaces gallery | 4.5 | The worst part of the page. The Mehdipatnam block is one large photo, a grid of small tiles, then another large photo. The Nampally block is **two large photos stacked**, which the standard forbids. It is also many screens long. |
| 6 | Treatments | 6.5 | Cards are readable. Eight cards in one long column is acceptable if each stays compact. |
| 7 | CTA band | 7 | Three stacked full-width buttons. Check they are 44 px tall. |
| 8 | Footer | not scored | Global. |

**Overall mobile rating: 6.0 / 10.** The gallery is the main reason it is lower than desktop.

**Cannot be judged from the screenshots (goes to R0 or the audit script):** text and label sizes; whether marker underlines are links or `EditorialHighlight`; whether numbers count up; exact photo heights against the viewport; whether the red band is `ContactNextStep`; hover and motion behaviour; exact colours and contrast of captions; whether the 25,000+ figure is approved site-wide.

---

## 3. Content map (everything here must survive)

Text read from the screenshots. R0 compares this map with the real page and records every difference in `DISCOVERY.md`. Where I could not read text clearly, I name the block and do not quote it.

**S0. Page header**
- Eyebrow: "Our clinics · Hyderabad".
- h1: "Two locations. One Neodent standard." (second sentence is the red italic phrase).
- Paragraph: "Neodent Dental Hospital provides specialist-led dental care across two Hyderabad locations — in Mehdipatnam and Nampally. Each clinic serves patients seeking restorative, implant, prosthodontic, preventive and smile-focused treatment within the same Neodent clinical environment." Some phrases are underlined (links or highlights, R0 finds out which).
- Buttons: "Call Mehdipatnam", "Call Nampally".
- Image: Mehdipatnam waiting lounge, caption "Mehdipatnam waiting lounge".

**S1. At a glance strip:** label "At a glance"; "Since 1994 / in Hyderabad"; "2 / clinics" (R0 records the exact label); "7 / treatments at each clinic"; "25,000+ / patients treated".

**S2. Find your clinic**
- h2: "Find your clinic. Mehdipatnam or Nampally."
- Card 1, Mehdipatnam: photo "Entrance"; kicker "Humayun Nagar · Hyderabad"; name "Mehdipatnam"; paragraph beginning "Neodent's Mehdipatnam clinic in Humayun Nagar is the original Hyderabad location…"; labelled Address, Phone (+91 90306 48393), Hours (4:00 PM – 8:00 PM); buttons "Call", "Get directions", "Clinic details"; bar "Dr. Md. Miftah Ur Rahman practises here".
- Card 2, Nampally: photo "Street frontage"; kicker "Medwin Hospital Complex · Hyderabad"; name "Nampally"; paragraph beginning "The Nampally clinic brings the same Neodent clinical approach to central Hyderabad…"; labelled Address (Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad, Telangana 500001), Phone (+91 90305 98081), Hours (10:30 AM – 5:00 PM); same three buttons; same Dr. bar.
- Mehdipatnam address as shown: 10-3-148/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500028.
- All values come from `lib/clinic-data.ts`; the plan never hard-codes them.

**S3. Different surroundings**
- h2: "Different surroundings. The same approach to care."
- Photo "Mehdipatnam / Treatment chamber"; photo "Nampally / Reception & staircase".
- Statement card: "While the settings differ in character and location, both clinics follow the same patient-focused approach to consultation, treatment planning and follow-up care — the approach that has defined Neodent since 1994, carried forward across both Hyderabad branches."

**S4. Spaces designed around care**
- h2: "Spaces designed around care."
- Paragraph: "Across Mehdipatnam and Nampally, Neodent's clinical spaces are shaped around the practical needs of dental care — from consultation and treatment to follow-up. The surroundings differ between the two locations, but both reflect the same focus on clear, comfortable and clinically focused patient care."
- Group heading "Mehdipatnam", 8 photos: Waiting lounge, Entrance, Reception counter, Director's office, Treatment room, Treatment chamber, Patient lounge, Waiting hall.
- Group heading "Nampally", 2 photos: Reception & staircase, Street frontage.

**S5. Featured treatments**
- h2: "Featured dental treatments, at both clinics." (the first part is invisible on desktop).
- Seven linked cards, each with icon, title, description, a category word and an arrow: Composite Build-up (Repair), Dental Implants (Replace), Root Canal Treatment (Preserve), Braces & Orthodontics (Align), Smile Design & Cosmetic Dentistry (Refine), Full Mouth Rehabilitation (Rebuild), Scaling & Polishing (Maintain). Each card's description is on the page (R0 records each one).
- Eighth card: "Not sure which treatment you need?" with the text "Explore our treatments or speak with our team about your options." and a link "Explore all treatments".

**S6. Red consultation band:** "Ready to visit? Call or send an enquiry."; buttons "Call Mehdipatnam", "Call Nampally", "Send an enquiry".

**Footer, navigation, floating call button:** global, untouched.

**Images in total:** about 15 placements (header 1, clinic cards 2, surroundings 2, spaces 10). Every one stays in the DOM with its alt text.

**Metadata and JSON-LD:** `metadata` / `generateMetadata` and every JSON-LD block in `app/clinic/page.tsx` stay byte-identical. R0 lists the JSON-LD types present.

---

## 4. Target layout, section by section

Common rules for every section: one heading, one supporting line, one action or focal element. Section CSS is in CSS Modules under `components/pages/clinic/`. Vertical padding and container width are copied from `LegacyStory.module.css` and the `ExperienceIntro` rules. Palette and radii come from existing tokens only.

**Red italic accent (restyle, wording untouched):** keep the red italic phrase on the h1, on S2 and on S5 only. On S3, S4 and S6 the same words are shown in the heading's normal style. This needs owner approval (Q3); until then R1 to R5 apply it.

**Marker underlines:** if they are `EditorialHighlight`, keep at most two per section and none in dark body text; the other phrases become plain text, with every word kept. If they are links, keep them as links (the link count never falls) with one consistent thin underline style.

### S0. Page header (P1 compact)
- **Reference:** `components/hero/Hero.tsx` layers and cards, in compact form; recipe from 3.6.
- **Desktop:** two columns inside the dark band. Left: plain eyebrow, h1, supporting paragraph (unchanged), actions. Right: the Mehdipatnam photo, portrait, `object-fit: cover`, `max-height: var(--media-max-h-compact)`, caption on a dark gradient at the bottom, with two dark glass cards overlapping its lower edge showing each clinic's hours (addition, data from `lib/clinic-data.ts`, see Q5). The whole header fits 1366 x 650.
- **Actions:** "Call Mehdipatnam" red primary, "Call Nampally" outline, both with `tel:` links from clinic data. Labels unchanged (Q1).
- **Mobile order:** eyebrow, h1, supporting paragraph, actions, photo (landscape crop, at most 38dvh, focal point on the lounge seating), then the two glass cards as a compact two-up row.
- **Media:** `priority` on this one image only; `aspect-ratio` set; alt text kept.
- **Motion:** per 8.2 "Page header", keyed off a CSS class as the hero does.
- **Empty-card check:** glass cards hold two lines each; fine.

### S1. Fact strip (P2)
- **Reference:** `ExperienceIntro.tsx` stat strip with `CountUp`.
- **Desktop:** one light strip, four facts in a row, "At a glance" as a plain 12 px+ label inside the strip (not a floating tab).
- **Mobile:** 2 by 2 grid.
- **Numbers:** `CountUp` on 2, 7 and 25,000+. "Since 1994" stays static text (a year must not count).
- **Motion:** `CountUp`, stagger rise.

### S2. Find your clinic (P6 cards with P5 media)
- **Reference:** `Expertise.tsx` cards for the stagger; `ClinicalLeadership.module.css` for the light card surface, radius, hairline and shadow.
- **Heading:** "Find your clinic. Mehdipatnam or Nampally." with the accent kept. Add one plain supporting line under it (addition, built only from existing facts): "Two Neodent dental clinics in Hyderabad: Mehdipatnam in Humayun Nagar and Nampally in the Medwin Hospital Complex."
- **Desktop:** two equal cards side by side. Each: photo on top (cover, 16:10, within the compact cap, caption on a gradient), name as h3, kicker, paragraph, then Address, Phone and Hours as a real `<dl>` with 12 px+ normal-case labels, then actions.
- **Actions:** "Call" red; "Get directions" and "Clinic details" outline, side by side below it. All at least 44 px tall.
- **Dr. bar:** keep text and link; restyle as a light bordered row with a chevron, at least 44 px, no dark slab.
- **Mobile:** cards stack; photo at most 38dvh; Call full width, the two outline buttons half width each.
- **Empty-card check:** both cards carry equal content; stretch the paragraph column, not decoration.
- **Motion:** heading rise, cards stagger rise 100 ms, photo mask reveal.
- **SEO:** each card name keeps its link to `/clinic/mehdipatnam` or `/clinic/nampally` with descriptive anchor "Clinic details"; address and phone are text, not images.

### S3. Different surroundings (dark band, P5 split)
- **Reference:** `LegacyStory.tsx` and `SpacesDesignedAroundCare.tsx`; dark recipe from 3.6.
- **Desktop:** heading, then three columns: photo, red statement card, photo. Photos `cover`, capped at `var(--media-max-h)`, captions on a dark gradient at the bottom of each photo (replacing the light caption boxes). The red card is vertically centred, with the statement text at a reading size.
- **Mobile:** heading, the statement card first, then a swipe row holding both photos (cards 85% wide, progress dots, no "1 / 2" counters), every photo in the DOM.
- **Seam card:** not used on this page.
- **Motion:** heading mask reveal, photos mask reveal with settle, statement card rise 150 ms later. Pattern drift and glow breathing on 768 px and wider only.
- **Check:** no card is more than 35% empty; no photo over 70% of the viewport.

### S4. Spaces designed around care (P9 tabs, P7 swipe, lightbox)
- **Reference:** `SpacesDesignedAroundCare.tsx` branch tabs (this is the home pattern for these exact branches); `ClinicalLeadership.tsx` swipe row; `LegacyStory.tsx` press row for tap-to-zoom.
- **Header row:** heading on the left, the existing paragraph on the right (desktop); stacked on mobile.
- **Tabs:** "Mehdipatnam" and "Nampally" as real tab buttons (`role="tablist"`, arrow keys). Each panel keeps its group heading text. Without JavaScript both panels show one after the other; JavaScript adds the class that turns on tabs. Crossfade with a 12 px translate.
- **Desktop panels:** Mehdipatnam: a four-column bento (first photo spans two columns and two rows, the others one cell) with every photo capped. Nampally: two photos side by side.
- **Mobile panels:** a swipe row per panel (cards 85% wide, snap, progress dots). Never two large photos stacked.
- **Captions:** below each photo (light section), 12 px+.
- **Lightbox:** new component in `components/pages/clinic/` using a native `<dialog>`, opens on tap or Enter, shows the photo with `contain` inside the viewport cap, with its caption, previous and next buttons, Escape to close, focus returned to the tile. All photos stay in the DOM as normal `next/image` elements whether or not the lightbox is open.
- **Motion:** heading and paragraph rise, tiles stagger rise 80 ms, key photo mask reveal.

### S5. Featured treatments (dark band, P6 cards)
- **Reference:** `Expertise.tsx` cards; dark recipe from 3.6. This is the one section that may keep a dark band before the red band.
- **Heading:** make the full heading visible (colour fix only, no wording change). Accent kept on "at both clinics." Add one supporting line (addition from existing facts): "Both Neodent clinics in Hyderabad, Mehdipatnam and Nampally, offer all seven treatments."
- **Desktop:** 4 by 2 grid. Light surface cards on the dark band. Each card is one link (title is the anchor text), icon, title, description, category word at 12 px+ normal case with the arrow. The eighth card keeps its text and link and gets an outlined style.
- **Mobile:** single column of compact cards (icon on the left); no card taller than needed.
- **Motion:** heading mask reveal, cards stagger rise 90 ms, hover lift on desktop, press state on touch.
- **SEO:** each card keeps its link to its treatment page; the last card keeps its link to `/treatments`.

### S6. Consultation block (P16)
- **If R0 shows this is `ContactNextStep`:** import it, do not edit it, leave it as it is, and only fix the spacing around it.
- **If it is a clinic-only component:** fork it into `components/pages/clinic/`, keep the text and the three buttons, restyle to the home band (red field, 44 px buttons, radius from `ContactNextStep`), and record the "Call for Consultation" question (Q2).
- **Mobile:** three full-width buttons, 44 px tall, with spacing for the fixed call bar (`env(safe-area-inset-bottom)`).
- **Motion:** rise.

### Optional additions (owner approval, see Q6): visible breadcrumbs "Home / Clinics" under the header, and a FAQ section between S5 and S6 (P14). They are built in run R6 only if approved.

---

## 5. Page header spec

| Item | Spec |
|---|---|
| Eyebrow | "Our clinics · Hyderabad", plain words, 12 px+, no leading rule line |
| h1 | "Two locations. One Neodent standard." wording unchanged. The second sentence stays the red italic accent. |
| Supporting line | The existing paragraph, unchanged. The searchable phrase ("specialist-led dental care across two Hyderabad locations — in Mehdipatnam and Nampally") is already in it, which covers the poetic h1. |
| Actions | "Call Mehdipatnam" (red), "Call Nampally" (outline), both `tel:` from clinic data |
| Media | Mehdipatnam waiting lounge photo, caption on a gradient, `priority`, compact cap |
| Glass cards | Two dark glass cards with each clinic's name and hours, fading up at 450 and 600 ms (addition from `lib/clinic-data.ts`) |
| Backdrop | Charcoal to `#0f1315` gradient, red radial glow behind the photo (alpha about 0.30), dental icon pattern as a luminance `mask-image` that fades out before the text column; copied from the hero CSS into the page's own module |
| Mobile order | eyebrow, h1, supporting line, actions, photo (at most 38dvh), glass cards |

---

## 6. Motion plan

| Section | Elements | Variant | Stagger / timing | Notes |
|---|---|---|---|---|
| S0 header | h1 lines, paragraph, actions, photo, glass cards | class-keyed: line mask, rise, photo rise 24 px + mask + 1.04 to 1 settle | about 100 ms steps; glass cards at 450 and 600 ms | Glow breathing and pattern drift on 768 px+ only |
| S1 strip | four facts | `rise`, `CountUp` on 2, 7, 25,000+ | 100 ms | "Since 1994" does not count |
| S2 clinics | heading, supporting line, two cards, photos | `rise`, `mask` on photos | 100 ms | Desktop hover lift on cards; press state on touch |
| S3 surroundings | heading, photos, statement card | `mask`, `rise` | 150 ms | Photo parallax up to 24 px on the largest photo, 768 px+ only |
| S4 spaces | heading, paragraph, tab panel, tiles | `rise`; panel crossfade with 12 px translate | 80 ms | Lightbox fades in |
| S5 treatments | heading, supporting line, 8 cards | `mask`, `rise` | 90 ms | Hover lift on desktop |
| S6 consultation | band, buttons | `rise` | 80 ms | |
| Optional FAQ | heading, rows | `rise`; smooth open | 70 ms | |

All 300 to 700 ms, ease-out, `transform` and `opacity` only, final state under `prefers-reduced-motion`, no continuous animation on phones, hidden initial states set by JavaScript-added classes.

---

## 7. SEO, AEO, GEO checklist for this page

- **Entities and facts to keep identical everywhere:** Neodent Dental Hospital; Mehdipatnam (Humayun Nagar) and Nampally (Medwin Hospital Complex); founded 1994; hours (Mehdipatnam Mon–Sat 4:00 PM to 8:00 PM; Nampally Mon–Sat 10:30 AM to 5:00 PM; Sunday closed); addresses and phones from `lib/clinic-data.ts`. Spelling "Mehdipatnam"; running text "Neodent".
- **Headings:** exactly one h1; h2 for each section; h3 for the clinic names and group names. Heading levels in order.
- **Internal links that must exist:** `/clinic/mehdipatnam` and `/clinic/nampally` (Clinic details, plus the card names if they are linked today); `/doctors/dr-miftah-ur-rahman` (the Dr. bars); the seven treatment pages from the cards; `/treatments` from the eighth card; `/contact` from "Send an enquiry"; every link in the header paragraph. The link count never falls.
- **Schema already present:** R0 lists the types. Everything stays byte-identical.
- **Alt text:** every photo keeps its alt text. R0 records them; where one is missing it is listed in `CONTENT_QUESTIONS.md`, not silently written.
- **FAQ status:** none today. A draft is proposed below for approval (Q6). If approved, the FAQ is rendered from `lib/pages/clinic-content.ts` and `FAQPage` JSON-LD is generated from the same array so it matches word for word.
- **Additions for owner approval:** (1) visible breadcrumbs plus `BreadcrumbList` JSON-LD as a separate new block; (2) the FAQ below; (3) the two plain supporting lines in S2 and S5; (4) the hours glass cards in the header; (5) "Monday to Saturday, Sunday closed" shown with the hours.
- **No `aggregateRating`.** The Google ratings shown in the footer are global and untouched.

**Draft FAQ (answers use only facts already on the site; phone numbers and hours are filled from `lib/clinic-data.ts` at render time, not typed in):**

1. *Where are Neodent's dental clinics in Hyderabad?* Neodent Dental Hospital has two clinics in Hyderabad: Mehdipatnam, in Humayun Nagar, and Nampally, in the Medwin Hospital Complex. Mehdipatnam is the original location, where the practice began in 1994.
2. *What are the opening hours of the Neodent clinics?* The Mehdipatnam clinic is open Monday to Saturday, 4:00 PM to 8:00 PM. The Nampally clinic is open Monday to Saturday, 10:30 AM to 5:00 PM. Sunday is a holiday at both clinics.
3. *Which treatments can I have at each clinic?* Both clinics offer all seven treatments: composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design and cosmetic dentistry, full mouth rehabilitation, and scaling and polishing.
4. *How do I book a consultation?* Call the Mehdipatnam clinic on {Mehdipatnam phone} or the Nampally clinic on {Nampally phone}, or send an enquiry through the contact page. A Neodent specialist will take you through consultation, treatment planning and follow-up care.
5. *Is the care the same at both clinics?* Yes. Both clinics follow the same patient-focused approach to consultation, treatment planning and follow-up care that has defined Neodent since 1994.

---

## 8. Ownership forecast and concurrency notes

- **Expected OWNED:** `app/clinic/page.tsx` (body only; metadata and JSON-LD untouched), plus new files under `components/pages/clinic/`, `lib/pages/clinic-content.ts`, `docs/internal-pages/clinic/`.
- **Expected FORKS** (R0 confirms with grep): the header band and fact strip component, the clinic card component, the surroundings and spaces components, the treatments strip and the CTA band, all currently under `components/clinic/*` or `components/clinic/branch/*` and shared with `/clinic/[slug]`. Each fork goes to `components/pages/clinic/` and `app/clinic/page.tsx` switches to the copy. Originals are never touched.
- **SHARED READ-ONLY:** `lib/clinic-data.ts`, `lib/site-data.ts`, `lib/clinical-team.ts`, `components/motion/*`, `components/sections/ContactNextStep.tsx`, `components/ui/*`, `app/globals.css` tokens.
- **Same family, do not run together:** `/clinic/mehdipatnam` and `/clinic/nampally`. Treatment, about, doctors and contact sessions are safe in parallel.
- **Expected shared-change requests:** none. The media tokens already exist in `globals.css`. If a gallery or lightbox primitive is missing, build it locally.
- **Switch strategy:** in R1, `app/clinic/page.tsx` starts rendering a new wrapper in `components/pages/clinic/`. Sections not yet redone keep rendering from the original components, so the page works after every run.

---

## 9. Run sequence

| Run | Scope | Files | Depends on | Time |
|---|---|---|---|---|
| R0 | Discovery and snapshot, no code | `docs/internal-pages/clinic/*`, `.audit/clinic/*` | G0 done | 15 min |
| R1 | Page wrapper, forks, S0 header, S1 strip | `components/pages/clinic/*`, `app/clinic/page.tsx` | R0 | 30 min |
| R2 | S2 clinic cards | `components/pages/clinic/*` | R1 | 25 min |
| R3 | S3 different surroundings | `components/pages/clinic/*` | R2 | 20 min |
| R4 | S4 spaces gallery with tabs and lightbox | `components/pages/clinic/*` | R3 | 30 min |
| R5 | S5 featured treatments, S6 consultation band | `components/pages/clinic/*` | R4 | 25 min |
| R6 (optional) | Breadcrumbs, FAQ, FAQ schema, only if the owner approves Q6 | `components/pages/clinic/*`, `lib/pages/clinic-content.ts`, `app/clinic/page.tsx` (new separate JSON-LD blocks only) | R5, owner approval | 25 min |
| R7 | Motion and polish | `components/pages/clinic/*` | R5 (or R6) | 25 min |
| R8 | Final fast check and screenshots | owned files only | R7 | 20 min |

Run them one at a time in one Kiro session. If R6 is skipped, go from R5 straight to R7.

---
## 10. Prompts

Run them in order, in one Kiro session. Each starts with the Appendix B preamble. If a run comes back below standard, re-run only that prompt with the screenshot and one sentence of feedback.

### R0. Discovery and snapshot

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R0 for clinic (/clinic): discovery and content snapshot. This run changes no site code.

Do:
1. Confirm http://localhost:3000/clinic responds. If not, stop and say so.
2. Run node scripts/page-content-snapshot.mjs clinic /clinic. This is the content baseline.
3. Find the page's files: app/clinic/page.tsx and every component, CSS Module and data file it imports (follow the imports). For each file, run grep -rl on its name across app, components and lib to see who else imports it. Write docs/internal-pages/clinic/OWNERSHIP.md with three lists: OWNED (only this page uses it), SHARED READ-ONLY (used elsewhere or on the never-edit list), and FORK CANDIDATES (shared components this page's redesign will need to change, with the planned copy path under components/pages/clinic/). Add one line on each file's role. Also list other routes that share a family with this page (expect /clinic/mehdipatnam and /clinic/nampally).
4. Map the sections you find in the rendered page to the sections in PAGE_PLAN.md (section 3, content map). Write docs/internal-pages/clinic/DISCOVERY.md with: the section list in order (heading, component, file), any content in the page that the plan missed, any section in the plan that does not exist, the images and videos found (path, alt, dimensions where known), and the existing JSON-LD types. Do not fix or change anything.
5. Also answer these in DISCOVERY.md: (a) the red marker underlines in the header paragraph and in the clinic cards: are they links or EditorialHighlight? List each phrase and its href if any. (b) Is the red band "Ready to visit?" the shared ContactNextStep or a clinic-only component? (c) Do the numbers in the At a glance strip use CountUp? (d) What is the exact colour and CSS rule that hides the first part of the "Featured dental treatments, at both clinics." heading on desktop? (e) The exact text of the seven treatment card descriptions and the label of each fact in the strip. (f) The current font size of every eyebrow, label and caption under 14 px. (g) Where the "Dr. Md. Miftah Ur Rahman practises here" bars link to.
6. List copy that looks wrong, ungrammatical or unverifiable in docs/internal-pages/clinic/CONTENT_QUESTIONS.md (quote it; do not edit it). Include any alt text that is missing or very short, and the name form "Dr. Md. Miftah Ur Rahman" as used in the data.
7. Create docs/internal-pages/clinic/CHANGELOG.md with an R0 entry.

Do not: edit any file outside docs/internal-pages/clinic/ and .audit/clinic/, start or stop servers, build, install, or use git write commands.
Report: files created, the ownership summary, differences between the plan and the real page, the answers to 5(a) to 5(g), questions for the owner.
```

### R1. Page wrapper, forks, header band and fact strip

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R1 for clinic (/clinic): page wrapper, forks, S0 page header, S1 fact strip. Nothing else.

Read first: PAGE_PLAN.md sections 3 (S0, S1), 4 (S0, S1), 5 and 6; OWNERSHIP.md and DISCOVERY.md from R0. Open these home files and copy their patterns before writing any CSS: components/hero/Hero.tsx and its CSS (layers, glass cards, header animation keyed off a class, glow and pattern recipe), and components/sections/ExperienceIntro.tsx with its CSS (stat strip and CountUp usage).

You may edit or create only:
- app/clinic/page.tsx (body only; the metadata export and every JSON-LD block stay byte-identical; check with git diff -- app/clinic/page.tsx that those lines are unchanged)
- components/pages/clinic/ (new files: ClinicPageView.tsx, ClinicPage.module.css, ClinicHeader.tsx, ClinicHeader.module.css, ClinicFacts.tsx, ClinicFacts.module.css, and forks listed in OWNERSHIP.md)
- docs/internal-pages/clinic/ and .audit/clinic/
Anything else: stop and explain.

Do:
1. Create components/pages/clinic/ClinicPageView.tsx as the page wrapper. page.tsx renders it. For sections not redone yet (S2 to S6) it renders the original components exactly as before, so the page keeps working after this run.
2. Fork the existing header band and strip into components/pages/clinic/ (copy, then edit the copy). Never edit the originals. Switch page.tsx to the copies.
3. S0 header: apply the spec in PAGE_PLAN.md section 5. Eyebrow as plain words at 12 px or more with no leading rule line. h1 wording unchanged, second sentence in the red italic accent. Supporting paragraph unchanged; if the underlined phrases are EditorialHighlight, remove the marker underline from dark body text (every word stays); if they are links, keep every link with one thin consistent underline. Buttons "Call Mehdipatnam" (red) and "Call Nampally" (outline), tel links from lib/clinic-data.ts. Photo: Mehdipatnam waiting lounge, next/image with priority, sizes, aspect-ratio, object-fit cover with a focal point on the seating, max-height var(--media-max-h-compact), caption on a dark gradient. Two dark glass cards with each clinic's name and hours, read from lib/clinic-data.ts (never typed in). Dark band layers per standard 3.6, copied from the hero CSS into ClinicHeader.module.css. Header animation keyed off a CSS class as the hero does it; glow breathing and pattern drift only at 768 px and wider and not under prefers-reduced-motion.
4. Mobile order: eyebrow, h1, supporting paragraph, actions, photo at most 38dvh, glass cards in a compact two-up row.
5. S1 strip: plain "At a glance" label of 12 px or more inside the strip, four facts in a row on desktop and a 2 by 2 grid on mobile, CountUp on 2, 7 and 25,000+ (read the labels from the existing component; wording unchanged), "Since 1994" static. Stagger rise for the facts.
6. Everything that was in the old header and strip must still be in the DOM.

Acceptance (checkable):
- node scripts/page-content-check.mjs clinic /clinic reports missing 0 and exactly one h1.
- git diff shows no change to the metadata export or any JSON-LD in app/clinic/page.tsx.
- At 1366x650 the header's h1, paragraph and both buttons are visible without scrolling and the photo is no taller than 70% of the viewport.
- At 390x844 the h1 and the Call Mehdipatnam button are visible without scrolling past the photo, the photo is at most 38dvh, nothing overflows at 360, and every button is at least 44 px tall.
- No text under 12 px in the header or the strip.

Fast check (then stop): (a) npx tsc --noEmit with output filtered to app/clinic, components/pages/clinic and lib/pages/clinic-content.ts; (b) npx eslint on the files you changed only; (c) node scripts/page-content-check.mjs clinic /clinic must report missing 0; (d) node scripts/page-audit.mjs clinic /clinic R1; (e) open two or three of the screenshots and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any original under components/clinic/, edit shared files, build, install, start servers, or use git write commands.
Report: files created and forks made, what you changed in page.tsx, the content check result, audit numbers, description of the screenshots, open questions.
```

### R2. Clinic cards (S2)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R2 for clinic (/clinic): S2 "Find your clinic. Mehdipatnam or Nampally." Nothing else.

Read first: PAGE_PLAN.md sections 3 (S2) and 4 (S2); OWNERSHIP.md; the last CHANGELOG entry. Open these home files and copy their patterns: components/sections/Expertise.tsx (card stagger and hover) and components/sections/ClinicalLeadership.module.css (light card surface, hairline border, shadow, radius).

You may edit or create only: components/pages/clinic/ (ClinicCards.tsx, ClinicCards.module.css, plus the fork of the existing clinic card component if OWNERSHIP.md lists one), components/pages/clinic/ClinicPageView.tsx (to swap S2 for the new component), docs/internal-pages/clinic/, .audit/clinic/. Anything else: stop and explain.

Do:
1. Build the two clinic cards as specified in PAGE_PLAN.md section 4, S2. Data (name, kicker, address, phone, hours, links) comes from lib/clinic-data.ts; the paragraphs and the heading text are kept word for word from the current component.
2. Heading with the red italic accent kept. Add the one plain supporting line given in the plan under the heading (an addition; log it in the changelog).
3. Each card: photo on top (object-fit cover, 16:10, within var(--media-max-h-compact), focal point set, alt text kept, caption on a dark gradient), name as h3, kicker, paragraph, then Address, Phone and Hours as a real <dl> with normal-case labels of 12 px or more, then actions: "Call" (red, tel link), "Get directions" and "Clinic details" (outline, side by side). All at least 44 px tall.
4. Phrases that are underlined today: if they are EditorialHighlight, keep at most two per card paragraph and render the rest as plain text with every word kept; if they are links, keep all of them as links in one consistent thin underline style.
5. The "Dr. Md. Miftah Ur Rahman practises here" bar keeps its text and href; restyle it as a light bordered row with a chevron, at least 44 px tall.
6. Mobile: cards stack, photo at most 38dvh, Call full width, the two outline buttons half width each.
7. Reveal: heading rise, cards stagger rise 100 ms, photos mask reveal. Hover lift on desktop only.

Acceptance (checkable):
- Content check missing 0; the link count on the page has not fallen.
- Neither card is more than 35% empty; both cards have the same height on desktop.
- Phone, address and hours text are real text and match lib/clinic-data.ts.
- No horizontal overflow at 360; every tap target at least 44 px at 768 and below.

Fast check (then stop): (a) npx tsc --noEmit with output filtered to app/clinic, components/pages/clinic and lib/pages/clinic-content.ts; (b) npx eslint on the files you changed only; (c) node scripts/page-content-check.mjs clinic /clinic must report missing 0; (d) node scripts/page-audit.mjs clinic /clinic R2; (e) open two or three of the screenshots and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit anything outside the files listed, build, install, start servers, or use git write commands.
Report: files changed, how the underlined phrases were handled (highlight or link), content check result, audit numbers, screenshot description, open questions.
```

### R3. Different surroundings (S3)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R3 for clinic (/clinic): S3 "Different surroundings. The same approach to care." Nothing else.

Read first: PAGE_PLAN.md sections 3 (S3) and 4 (S3); OWNERSHIP.md; the last CHANGELOG entry. Open these home files and copy their patterns: components/sections/LegacyStory.tsx and its CSS (split layout, photo radius, hairline, shadow, section padding) and components/hero/Hero CSS for the dark-band layer recipe (gradient, red glow, icon pattern as a luminance mask-image that fades out before the text; do not import hero classes, copy the recipe into this page's own module).

You may edit or create only: components/pages/clinic/ (Surroundings.tsx, Surroundings.module.css, plus the fork of the existing component if listed in OWNERSHIP.md), components/pages/clinic/ClinicPageView.tsx, docs/internal-pages/clinic/, .audit/clinic/. Anything else: stop and explain.

Do:
1. Build the section as specified in PAGE_PLAN.md section 4, S3. Heading text and statement text are kept word for word. The heading's red italic phrase is shown in the normal heading style on this section (the accent stays only on the h1, S2 and S5).
2. Desktop: three columns: photo (Mehdipatnam, Treatment chamber), statement card, photo (Nampally, Reception & staircase). Photos object-fit cover with a focal point, max-height var(--media-max-h), next/image with sizes and aspect-ratio, lazy. Captions (including the clinic name and the caption) on a dark gradient at the bottom of each photo; remove the light caption boxes by restyling them into the gradient caption, keeping every word.
3. The statement card keeps its red fill and white text, content vertically centred, no more than 35% empty.
4. Mobile: heading, the statement card, then a swipe row with both photos (overflow-x auto, scroll-snap-type x mandatory, cards 85% wide, keyboard focusable, progress dots, no "1 / 2" counters). Both photos stay in the DOM.
5. Reveal: heading mask, photos mask with a slight settle, statement card rise 150 ms later. Pattern drift and glow breathing at 768 px and wider only, never under prefers-reduced-motion.

Acceptance (checkable):
- Content check missing 0.
- No image taller than 70% of the viewport at 1366x650 and 390x844.
- Never two large photos stacked at 390 wide.
- No horizontal overflow at 360. No text under 12 px.

Fast check (then stop): (a) npx tsc --noEmit with output filtered to app/clinic, components/pages/clinic and lib/pages/clinic-content.ts; (b) npx eslint on the files you changed only; (c) node scripts/page-content-check.mjs clinic /clinic must report missing 0; (d) node scripts/page-audit.mjs clinic /clinic R3; (e) open two or three of the screenshots and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit anything outside the files listed, build, install, start servers, or use git write commands.
Report: files changed, content check result, audit numbers, screenshot description, open questions.
```

### R4. Spaces designed around care (S4)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R4 for clinic (/clinic): S4 "Spaces designed around care." Nothing else.

Read first: PAGE_PLAN.md sections 3 (S4) and 4 (S4); OWNERSHIP.md; the last CHANGELOG entry. Open these home files and copy their patterns: components/sections/SpacesDesignedAroundCare.tsx and its CSS (branch tabs and their crossfade), components/sections/ClinicalLeadership.tsx (swipe row), components/sections/LegacyStory.tsx (press row, tap to zoom).

You may edit or create only: components/pages/clinic/ (SpacesGallery.tsx, SpacesGallery.module.css, GalleryLightbox.tsx, GalleryLightbox.module.css, plus the fork of the existing component if listed in OWNERSHIP.md), components/pages/clinic/ClinicPageView.tsx, docs/internal-pages/clinic/, .audit/clinic/. Anything else: stop and explain.

Do:
1. Build the section as specified in PAGE_PLAN.md section 4, S4. Keep the heading and the paragraph word for word. The heading is shown in the normal heading style (no red italic accent here). Keep at most two highlighted phrases in the paragraph (or keep them as links if they are links); no other word changes.
2. Tabs "Mehdipatnam" and "Nampally": real buttons with role tablist, tab and tabpanel, aria-selected, arrow-key support. Both panels are in the server HTML. Without JavaScript both panels show one after the other; the class that turns tabs on is added by JavaScript. Crossfade with a 12 px translate. Each panel keeps its group heading text.
3. Mehdipatnam panel (8 photos in this order: Waiting lounge, Entrance, Reception counter, Director's office, Treatment room, Treatment chamber, Patient lounge, Waiting hall): desktop bento, four columns, the first photo spans two columns and two rows. Nampally panel (Reception & staircase, Street frontage): two photos side by side on desktop.
4. Mobile: one swipe row per panel (cards 85% wide, snap, keyboard focusable, progress dots). Never two large photos stacked. All photos stay in the DOM.
5. All photos: next/image, sizes, aspect-ratio, object-fit cover with a focal point, max-height var(--media-max-h), lazy, original alt text kept. Captions below each photo (light section), 12 px or more, every caption word kept.
6. Lightbox: GalleryLightbox.tsx using a native <dialog>. Opens on tap or Enter on a photo, shows the photo with object-fit contain within var(--media-max-h) plus its caption, has previous, next and close buttons of at least 44 px, Escape closes, focus returns to the tile, arrow keys move between photos of the same panel. No new library.
7. Reveal: heading and paragraph rise, tiles stagger rise 80 ms, the largest photo mask reveal. No hover-only behaviour; no zoom on phones.

Acceptance (checkable):
- Content check missing 0, all 10 photos present with their alt text.
- At 390x844 the section is no taller than about two and a half phone screens per panel.
- No horizontal overflow at 360; tap targets at least 44 px.
- With JavaScript disabled, the 390-wide screenshot shows both panels readable.

Fast check (then stop): (a) npx tsc --noEmit with output filtered to app/clinic, components/pages/clinic and lib/pages/clinic-content.ts; (b) npx eslint on the files you changed only; (c) node scripts/page-content-check.mjs clinic /clinic must report missing 0; (d) node scripts/page-audit.mjs clinic /clinic R4; (e) open two or three of the screenshots and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit anything outside the files listed, build, install, start servers, or use git write commands.
Report: files changed, content check result, audit numbers, screenshot description, open questions.
```

### R5. Featured treatments and consultation band (S5, S6)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R5 for clinic (/clinic): S5 "Featured dental treatments, at both clinics." and S6 "Ready to visit? Call or send an enquiry." Nothing else.

Read first: PAGE_PLAN.md sections 3 (S5, S6) and 4 (S5, S6); OWNERSHIP.md; DISCOVERY.md answers 5(b) and 5(d); the last CHANGELOG entry. Open these home files and copy their patterns: components/sections/Expertise.tsx and its CSS (cards, stagger, hover lift), the dark-band recipe in the hero CSS, and components/sections/ContactNextStep.tsx (read only).

You may edit or create only: components/pages/clinic/ (TreatmentsStrip.tsx, TreatmentsStrip.module.css, and, only if the band is clinic-only, VisitBand.tsx and VisitBand.module.css), components/pages/clinic/ClinicPageView.tsx, docs/internal-pages/clinic/, .audit/clinic/. Anything else: stop and explain.

Do:
1. S5 heading: make the whole heading visible on desktop and mobile. This is a colour fix only; no wording change. Keep the red italic accent on "at both clinics." and add the one plain supporting line given in the plan (an addition; log it).
2. Cards: eight cards, 4 by 2 on desktop, light surface cards on the dark band. Each card is one link; the title is the anchor text. Icon, title, description, category word (Repair, Replace, Preserve, Align, Refine, Rebuild, Maintain) at 12 px or more in normal case with the arrow. Every description is kept word for word. The eighth card ("Not sure which treatment you need?") keeps its text and its link to /treatments in an outlined style.
3. Mobile: one column of compact cards with the icon on the left; no card taller than its content needs.
4. S6: if the band is the shared ContactNextStep, import it unchanged and fix only the spacing around it in the wrapper. If it is clinic-only, fork it, keep the text and the three buttons (labels unchanged), restyle to the home band, 44 px buttons, full width and spaced above the fixed call bar on mobile.
5. Reveal: S5 heading mask, cards stagger rise 90 ms, hover lift on desktop only, press state on touch; S6 rise.

Acceptance (checkable):
- Content check missing 0; all seven treatment links and the /treatments link present.
- Heading fully visible at 1366 and 390 wide.
- No card more than 35% empty; no horizontal overflow at 360; tap targets at least 44 px.
- No more than two dark sections in a row.

Fast check (then stop): (a) npx tsc --noEmit with output filtered to app/clinic, components/pages/clinic and lib/pages/clinic-content.ts; (b) npx eslint on the files you changed only; (c) node scripts/page-content-check.mjs clinic /clinic must report missing 0; (d) node scripts/page-audit.mjs clinic /clinic R5; (e) open two or three of the screenshots and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit anything outside the files listed, build, install, start servers, or use git write commands.
Report: files changed, what caused the invisible heading, content check result, audit numbers, screenshot description, open questions.
```

### R6 (optional, run only if the owner has approved Q6). Breadcrumbs and FAQ

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6 for clinic (/clinic): visible breadcrumbs and a FAQ section. Only the parts the owner approved in PAGE_PLAN.md question Q6. Nothing else.

Read first: PAGE_PLAN.md sections 4 (optional additions), 7 (draft FAQ), 12 (Q6); OWNERSHIP.md; the last CHANGELOG entry. Open components/sections/ContactNextStep.tsx (read only) and look for any existing FAQ component in components/ (read only) for the native details pattern.

You may edit or create only: components/pages/clinic/ (ClinicBreadcrumbs.tsx, ClinicFaq.tsx and their CSS Modules), lib/pages/clinic-content.ts (the FAQ array), components/pages/clinic/ClinicPageView.tsx, app/clinic/page.tsx (only to add NEW separate JSON-LD script blocks; the existing metadata and JSON-LD stay byte-identical), docs/internal-pages/clinic/, .audit/clinic/. Anything else: stop and explain.

Do:
1. Breadcrumbs "Home / Clinics" under the header, with a link to "/" and the current page as text. Add BreadcrumbList JSON-LD as a new block that matches exactly.
2. FAQ between S5 and S6 on a light band (pattern P14): native <details>, first open, no numbering, hairline dividers, chevron, smooth open. Questions and answers are the five in PAGE_PLAN.md section 7, kept word for word, except that phone numbers and hours are filled from lib/clinic-data.ts at render time. Each answer begins with the direct sentence. The FAQ array lives in lib/pages/clinic-content.ts and the FAQPage JSON-LD block is generated from the same array so it matches the visible text word for word.
3. No invented facts, prices or promises. Do not add the phrase "Smile Designer".

Acceptance (checkable):
- Content check missing 0 (the checker allows additions); the FAQ text is in the server HTML with JavaScript disabled.
- The new JSON-LD blocks parse and match the visible text.
- Exactly one h1; headings in order.

Fast check (then stop): (a) npx tsc --noEmit with output filtered to app/clinic, components/pages/clinic and lib/pages/clinic-content.ts; (b) npx eslint on the files you changed only; (c) node scripts/page-content-check.mjs clinic /clinic must report missing 0; (d) node scripts/page-audit.mjs clinic /clinic R6; (e) open two or three of the screenshots and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit anything outside the files listed, build, install, start servers, or use git write commands.
Report: files changed, the JSON-LD added, content check result, audit numbers, screenshot description, open questions.
```

### R7. Motion and polish

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R7 for clinic (/clinic): motion and polish. Nothing else.

Read first: PAGE_PLAN.md section 6 (motion plan); OWNERSHIP.md; the last CHANGELOG entry; components/motion/Reveal.tsx and CountUp.tsx (read only).

You may edit only the files this page owns under components/pages/clinic/ and docs/internal-pages/clinic/ and .audit/clinic/. Anything else: stop and explain.

Do:
1. Walk the page top to bottom and confirm every section has a visible on-scroll reveal as listed in section 6. Add what is missing using Reveal, CountUp or CSS classes keyed by JavaScript. Hidden initial states are set only by a class that JavaScript adds, so the page reads with JavaScript disabled.
2. Add hover lift on cards and buttons at 768 px and wider only, and a press state on touch. Add the tab crossfade, the lightbox fade and the FAQ open transition (if R6 ran).
3. Reduced motion: under prefers-reduced-motion every section shows its final state, no transforms, no drift, no zoom. Phones: reveals yes, continuous animation (breathing, drift) no.
4. Animate only transform and opacity, 300 to 700 ms, ease-out. No layout-property animation, no new library, will-change only on continuously animated layers.
5. Check the heading accent rule: red italic phrase on the h1, S2 and S5 only (unless the owner decided otherwise in Q3).
6. Check there are no numbered eyebrows, ghost numerals, corner brackets, text under 12 px or marker underlines over the limit anywhere on the page. Fix by restyling; never by removing words.

Acceptance (checkable):
- Content check missing 0.
- Audit reports no media over 70%, no overflow, no tap target under 44 px, no text under 12 px.
- The 390-wide screenshot with JavaScript disabled shows every section readable.

Fast check (then stop): (a) npx tsc --noEmit with output filtered to app/clinic, components/pages/clinic and lib/pages/clinic-content.ts; (b) npx eslint on the files you changed only; (c) node scripts/page-content-check.mjs clinic /clinic must report missing 0; (d) node scripts/page-audit.mjs clinic /clinic R7; (e) open two or three of the screenshots and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: add new design work, edit anything outside the files listed, build, install, start servers, or use git write commands.
Report: what motion was added per section, content check result, audit numbers, screenshot description, open questions.
```

### R8. Final fast check and screenshots

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R8 for clinic (/clinic): final fast check and screenshots. Fix only what the checks find, within the files you own.

Do:
1. Walk through the page top to bottom in the dev server screenshots at 1366x650 and 390x844. For each section confirm: it follows the pattern in PAGE_PLAN.md section 4; there is a visible on-scroll reveal; no card is more than 35% empty; no media is over 70% of the viewport; nothing overflows at 360.
2. Run the fast check from "Agent rules" item 9 with run-id final. Allow at most two fix-and-recheck cycles.
3. Save full-page desktop (1440 wide) and mobile (390 wide) screenshots as .audit/clinic/final/desktop-full.png and mobile-full.png (the audit script's full-page shots are acceptable). Print their absolute paths.
4. Write the final CHANGELOG.md entry: files changed in the whole page redesign (the owner uses it to commit by path), content check result, audit numbers, forks made, shared-change requests, open questions, and anything not done.

Do not: add new design work, build, run Lighthouse or deep tests, start servers, or use git write commands.
Report: pass or fail per check, the screenshot paths, the open items.
```

---

## 11. Acceptance and rating rubric

**The owner checks in the final screenshots:**
1. Desktop 1366x650: header, h1, paragraph and both call buttons visible without scrolling; no photo more than 70% of the viewport.
2. Mobile 390: h1 and Call Mehdipatnam reached before the photo; the gallery is a swipe row; no two large photos stacked.
3. Red italic accent only on the h1, "Find your clinic" and "at both clinics."
4. No marker underline in dark body text; no more than two highlights per section.
5. Every treatment link, clinic link, phone number and address is still there (content check shows missing 0).
6. Visible motion on every section; reduced motion shows the final state.
7. Hours and phones in glass cards and clinic cards match the data file.

**Rating the Claude chat will give** (desktop and mobile each, out of 10): content intact (gate, pass or fail), design language match, hierarchy and rhythm, media discipline, mobile usability, motion, SEO and accessibility basics. Target 9 to 9.5. Come back with this Page Plan plus the final `desktop-full.png` and `mobile-full.png`.

---

## 12. Open owner questions

Nothing below is guessed. R0 to R5 can run before any of these are answered; the plan states its default.

- **Q1. Header buttons.** The standard names "Call for Consultation" and "Send an enquiry" as the pair, but this hub has one call button per clinic. Default: keep "Call Mehdipatnam" (red) and "Call Nampally" (outline), labels unchanged. Do you want a "Send an enquiry" link added to the header too?
- **Q2. Red band.** If it turns out to be a clinic-only band rather than `ContactNextStep`, do you want it kept as it is (default) or replaced by `ContactNextStep` with "Call for Consultation"? Replacing would remove the "Call Mehdipatnam / Call Nampally" buttons, which the content rules do not allow without your approval.
- **Q3. Red italic accent.** Default: kept on the h1, "Find your clinic." and "at both clinics." and removed (styling only) from "Different surroundings", "Spaces designed around care" and "Call or send an enquiry". Approve or choose different sections.
- **Q4. Gallery format.** Default: Mehdipatnam and Nampally tabs, with a lightbox. The alternative is both groups visible one after the other, each as a swipe row on mobile.
- **Q5. Hours glass cards in the header.** An addition built from existing data. Approve, or leave the header as text, photo and buttons only.
- **Q6. Breadcrumbs and FAQ.** Approve or edit the five draft FAQs in section 7 and the `BreadcrumbList` and `FAQPage` JSON-LD. If you do not approve, skip R6.
- **Q7. Supporting lines.** The plain supporting lines under "Find your clinic" and "Featured dental treatments" are additions from existing facts. Approve or edit the wording.
- **Q8. Hours wording.** The cards show times only. Do you want "Monday to Saturday · Sunday closed" shown with the hours (facts from the standard, Part 1)?
- **Q9. 25,000+ patients.** Please confirm this figure is approved for site-wide use before it counts up on screen.
- **Q10. Nampally photos.** The street frontage photo shows a signboard that, per the standard, has outdated hours. The page text is correct. Do you want a note, or keep the photo as it is?
- **Q11. Doctor name.** The bars read "Dr. Md. Miftah Ur Rahman". Confirm this is the form you want everywhere (R0 records how it appears in the data).

**Where to save this file and what to run first:** save it as `docs/internal-pages/clinic/PAGE_PLAN.md`, make sure G0 has been run once and the dev server is up, then paste prompt **R0** into Kiro.

---

## 13. Appendix: Agent rules

```
AGENT RULES (binding for every run on this page)

You are one of several coding sessions working in this repository at the same time, each on a different page. Another session may be editing other files while you work.

1. CONTENT: Never delete, shorten, summarise, reword, merge or hide any text, image, video, document, caption, alt text, link, button, form field or structured-data field. Re-place, re-layout and restyle only. Repeated content stays. Questionable copy goes into docs/internal-pages/clinic/CONTENT_QUESTIONS.md, not into an edit. Mobile and desktop carry the same content. Collapsed text is a native <details> with the full text in the server HTML. Metadata exports and JSON-LD in page.tsx stay byte-identical.
2. DESIGN: Match the home page. Fonts: Manrope (body), DM Serif Display (headings). Colours only from the existing tokens (ink #263033, charcoal #161c1e, ivory #f8f6ef, surface #fffefa, red #d71920, dark red #b5121a). Before building a section, open the home component named in the plan and its CSS and copy its pattern, spacing and radii. No numbered eyebrows, ghost numerals, roman numerals, corner brackets, registration marks, arcs, rotated edge labels, meta strips, labels under 12 px, or repeated red-italic headline formula. Eyebrows are plain words. No card with more than 35% empty space. Primary button "Call for Consultation" (tel link from lib/site-data.ts: ctaTelPhone, ctaPhone; never hard-code a number), secondary "Send an enquiry" linking to /contact.
3. MEDIA: No image or video taller than 70% of the viewport height (use max-height: var(--media-max-h) or var(--media-max-h-compact)). Photos use object-fit: cover with a focal point; documents (cuttings, certificates, radiographs) use contain, whole, tap to zoom. Two large images never stack on mobile: use one image or a swipe row with every image in the DOM. next/image with sizes and aspect-ratio; priority only on the main header image. Videos: muted playsInline loop, preload="none" with a poster, play only while in view, not under prefers-reduced-motion.
4. MOBILE: 360x740, 390x844, 768x1024. No horizontal overflow. Body 15px or more, labels 12px or more, tap targets 44x44 or more. Headline and primary action first, then media (at most 38dvh) or a swipe row (overflow-x auto, scroll-snap, cards 82 to 88% wide).
5. MOTION: Every section needs a visible on-scroll reveal. Use components/motion/Reveal.tsx (variants rise, fade, mask; delay; stagger) and CountUp.tsx, read-only. Stagger card grids, mask-reveal key photos, draw connecting lines with scroll, crossfade tabs. 300 to 700 ms, ease-out. Animate transform and opacity only. Hidden initial states must be applied by JavaScript-added classes so the page reads with JavaScript off. prefers-reduced-motion: final state, no transforms. No continuous animation on phones. No new libraries.
6. SEO / AEO / GEO: One h1 with entity words, headings in order, every internal link kept with its anchor, descriptive alt text, JSON-LD kept, schema only for visible content, no aggregateRating, no invented facts, prices, claims or outcomes. Clinic names, addresses, phones, hours and doctor facts come from lib/site-data.ts, lib/clinic-data.ts and lib/clinical-team.ts. Hours: Mehdipatnam Mon-Sat 4:00 PM to 8:00 PM; Nampally Mon-Sat 10:30 AM to 5:00 PM. Dr. Muti Ur Rahman is MBBS / MD (General Medicine), never a dental specialist. Write "a Neodent specialist" for consultations. Do not add the phrase "Smile Designer" anywhere new.
7. FILES: Edit only files listed as OWNED in docs/internal-pages/clinic/OWNERSHIP.md or new files under components/pages/clinic/, lib/pages/clinic-content.ts and docs/internal-pages/clinic/. Before editing any existing component, run grep -rl "<Name>" app components to see if anything else imports it; if so it is shared: copy it into components/pages/clinic/ and switch this page to the copy. CSS Modules only; no new global classes. Never edit app/globals.css, app/layout.tsx, components/layout/*, components/Home.tsx, components/hero/*, components/motion/*, components/sections/ContactNextStep*, components/ui/*, components/consent/*, components/analytics/*, lib/site-data.ts, lib/clinical-team.ts, lib/clinic-data.ts, lib/structured-data.ts, lib/og-image.tsx, lib/featured-treatment-catalog.ts, package.json, lockfiles, config files, existing scripts, existing files in public/, or any other page's files. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append (cat >> file <<'EOF').
8. COMMANDS: Never run npm run build, npm install, npm ci, next dev, next start, or anything that touches .next or node_modules. Never start or stop a server: the owner's dev server is at http://localhost:3000; if it is unreachable, stop and say so. Never git commit, stash, checkout, reset, restore, clean, rebase, merge, pull or push. Allowed: git status, git diff -- <your paths>. If a compile error is in a file you do not own, wait 30 seconds and retry once, then report it; never fix it.
9. VERIFY (fast check only, then stop): (a) npx tsc --noEmit, output filtered to your owned paths; (b) npx eslint on the files you changed; (c) node scripts/page-content-check.mjs clinic /clinic must report zero missing; (d) node scripts/page-audit.mjs clinic /clinic <run-id> (three viewports); (e) open two or three screenshots and describe them. At most two fix-and-recheck cycles. No Lighthouse, no deep or exhaustive tests, no extra viewports. Aim to finish in 20 to 30 minutes; if a step is taking much longer, stop and report.
10. REPORT: Append an entry to docs/internal-pages/clinic/CHANGELOG.md: run id, files changed, summary, content check result (missing: N), audit numbers, questions for the owner, shared-change requests made, screenshot paths (absolute), anything unfinished. End your reply with the screenshot paths. Leave all changes uncommitted.
```


---

## 14. Appendix: Prompt preamble (already pasted at the top of every prompt above)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/clinic/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/clinic/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/clinic/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.
```
