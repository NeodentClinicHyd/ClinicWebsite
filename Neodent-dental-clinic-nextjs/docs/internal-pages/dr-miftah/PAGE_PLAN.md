# PAGE_PLAN: Dr. Md. Miftah Ur Rahman (`/doctors/dr-miftah-ur-rahman`)

Save this file as `docs/internal-pages/dr-miftah/PAGE_PLAN.md`. Run `R0` first.

---

## 0. Header

| Item | Value |
|---|---|
| Page | Dr. Md. Miftah Ur Rahman, individual doctor profile |
| Route | `/doctors/dr-miftah-ur-rahman` |
| Slug | `dr-miftah` |
| Family (Part 11.4) | Doctors: `/doctors` and this page share `components/doctors/*` and read `lib/clinical-team.ts` (read-only). The owner is also reworking `/doctors` (list page). Do not run a session on `/doctors` at the same time as R0 and R1 of this page. R1 forks everything this page needs, after which the two pages are independent. |
| Model | Sonnet 5.5 in Kiro CLI |
| Dev server | Owner's, `http://localhost:3000` (never started or stopped by the agent) |
| Standard | NEODENT_INTERNAL_PAGES_GLOBAL_STANDARD.md v1 (30 Oct 2026) |
| Date | 1 Nov 2026 |
| Status | Draft for owner approval. Based on the desktop screenshot only; **no mobile screenshot was supplied** (see section 2 and section 12). |

### 0.1 What the owner asked for on this page (1 Nov 2026)

1. **Philosophy statement changes.** Replace "Saving natural teeth, even when it is mobile." with the exact new statement **"Save the natural teeth till the last stage."** (already used on the home page). This is approved change **A1**.
2. **A photograph wall.** The doctor wants his photographs on his page so that they can be found on Google. Not a slider. One compact section where all ten photographs are visible together, like a wall. It must fit inside one laptop viewport height (about 650 px tall at 1366 px wide), thumbnails small but clearly visible (about the size of the Windows Explorer thumbnails the owner showed), click to zoom, and it must be neat on mobile. Photographs 1 to 10 come with captions written by the owner (section 4, SW).
3. Everything else on the page is refined to the global standard.

---

## 1. Page facts

**Purpose.** The professional profile of one of Neodent's doctors: who he is, what he has trained in, what he does, proof of his work and recognition, and where to find him.

**Audience.** (a) Patients in Hyderabad, mostly on a phone (about 80%), searching for a prosthodontist or implantologist, or checking a name they were given. (b) Referring colleagues and students. (c) Prospective clinic owners judging this site as a flagship showcase.

**Search intent and target queries** (only phrases the page already supports; nothing invented):
- "Dr Miftah Ur Rahman", "Dr Md Miftah Ur Rahman Neodent"
- "prosthodontist in Hyderabad", "implantologist in Hyderabad", "prosthodontist Mehdipatnam", "prosthodontist Nampally"
- "dental implants Hyderabad", "smile design Hyderabad", "full mouth rehabilitation Hyderabad", "root canal treatment save natural teeth Hyderabad"
- Image intent: "Dr Miftah Ur Rahman photos", "Neodent Dental Hospital Dr Miftah" (served by the photograph wall, section SW).

**Conversion goal.** A phone call (primary) or an enquiry (secondary). Primary label "Call for Consultation" (`ctaTelPhone`, `ctaPhone` from `lib/site-data.ts`). Secondary "Send an enquiry" to `/contact`. Consultations are with "a Neodent specialist", not only with him.

**Facts that must stay consistent** (Part 1): Founder name in new text "Dr. Mohd. Siraj Ur Rahman". Dr. Muti Ur Rahman is MBBS / MD (General Medicine), never described as a dental specialist. "Smile Designer" is not added anywhere new. Mehdipatnam Mon to Sat 4:00 PM to 8:00 PM. Nampally Mon to Sat 10:30 AM to 5:00 PM. Sunday is a holiday. Founded 1994. Lead with "dental hospital".

---

## 2. Screenshot findings

**Material judged:** one full-page desktop screenshot (about 754 px wide, scaled down from desktop width), the owner's photograph caption sheet, and a screenshot of the folder `public/assets/dr-miftah`. **Not judged:** mobile (no screenshot), motion, hover states, real pixel sizes, text under about 12 px (the screenshot is scaled, so R0's audit must confirm), and the content of sections that were caught mid-reveal (marked "reveal?" below).

### 2.1 Findings, top to bottom (desktop)

| Section | What it is | What is wrong (Part 4 ban list and standard) | Score |
|---|---|---|---|
| Page header | Dark band, breadcrumb, eyebrow, h1, red-italic tagline, credentials, role line, two buttons, portrait with tag, bottom strip | Ghost "DR" watermark; "NEODENT · HYD" meta strip top right; numbered tag "01 / CLINICAL PRACTICE" on the photo; bottom strip of tiny caps with a "SCROLL" cue; header actions are not the standard pair; no plain supporting line with the search phrase; photo is smaller than it could be and has no dark-band glow recipe | 6 |
| 01 Profile index | "The record, in brief." with a four-row fact table over a faded operatory photo | Ghost numeral "01", numbered eyebrow, tiny caps labels; the table sits over a busy faded photo (contrast risk); the red-italic formula | 6 |
| Philosophy seam card | Dark rounded card: "CLINICAL PHILOSOPHY / Saving natural teeth, even when it is mobile." | **Old statement (A1).** Tiny caps eyebrow with a rule; dotted outline offset behind the card is decoration | 6 |
| 02 Biography | "A steady hand. A considered approach." Four paragraphs, link "See the treatments he performs", operatory photo with a smaller treatment-room inset | Ghost "02"; four highlighted phrases (limit is two, and they use both red text and marker); long text column with no lede and depth; inset overlaps the caption area | 6.5 |
| 03 Specialisation | Dark. "Where his work goes deepest." Four columns: Saving natural teeth (root canal, radiographs pre/mid/post), Smile designing, Dental implants, Full mouth rehabilitation. Each has before/after thumbnails, text, "Explore treatment" | Ghost "03"; card numerals 01 to 04 used as decoration; a vertical hairline cuts through the card text ("Dental Implants" title is crossed); thumbnails are small but acceptable; cards are open columns, not cards | 6.5 |
| Case story, smile design | "The clinical thinking behind a confident smile." Two paragraphs, a 01 to 06 stepper, "Click to view: The smile journey", final-result photo "06 / 06" | Stepper numerals and the "06 / 06" slide counter (use progress dots); large empty area under the photo on the right | 6 |
| 04 Full scope | Light. "Clinical care across key concerns." Eight-cell grid: seven treatments and one nearly empty cell "Care shaped around individual needs" | Ghost "04"; numbered cards; the eighth cell is more than 65% empty (violates 4.1); empty right half of the heading band; tiny tags | 5.5 |
| 05 Education and training | Dark. "A foundation built formally." Five-step vertical timeline, a facts footer "05 stages · 04 institutions · FICOI (U.S.A.)", award photo with caption | Ghost "05"; numeral steps; the fifth step "Gold Medallist" is almost invisible (reveal? or a contrast bug); large dark void below the timeline | 6 |
| 06 Academic and research | Light. "Published work and teaching." Teaching block, publication cards (only entry 03 is visible), "View on PubMed". Then "Clinical teaching: Root canal treatment, explained." two films | Ghost "06"; **about 350 px of empty space** between the heading and the content (reveal? or a layout bug); only one publication is visible; the first film card is much taller than the second; films are tall portrait media (cap risk) | 4.5 |
| 07 In practice | Dark. "See the work behind the treatment." Three portrait reels with captions "DMLS crowns: masticatory efficiency", "Crown cementation", "Treatment in practice" | Ghost "07"; each reel is roughly 380 px wide by 680 px tall at desktop width, which is **well over the 70% viewport-height cap** at 1366 x 650; numbered tags 01 to 03 | 5 |
| 08 Patient voices | Light. "What patients say. In their own words." Five Google reviews, "Verbatim from Google reviews. Individual results vary." | Ghost "08"; numbered cards; first two cards clipped or overlapped (reveal?); inconsistent card sizes | 5 |
| 09 Recognition | Dark. Heading ending "earned over time." (first line not visible: reveal?). "Press archive: 13 clippings, select to enlarge". Clippings row with arrows | Ghost "09"; per-clipping red numerals; heavy vignette; the first heading line cannot be read from the screenshot | 6.5 |
| 10 Where to find him | Light. "Two doors. One standard of care." Two location cards with exterior and interior photos, addresses, phones, "Directions"; a sentence with three links | Ghost "10"; the left card has a visible empty band under its photos; clinic hours are not shown; exterior photos are tall | 6.5 |
| Consultation block | Dark. "Begin with a conversation." with two call buttons | Shared component (`ContactNextStep`), read-only | n/a |
| Footer | Global | Global, untouched | n/a |

**Cross-page problems.** The red-italic second line is used on almost every heading (the standard allows it on the page's main heading and at most one section in three). Tiny letter-spaced caps appear everywhere. A vertical centre hairline runs through the whole page and crosses text in several cards. Several sections appear half-revealed in the full-page screenshot, which means either the reveal states are not firing for a full-page capture (probable) or content is hidden until JavaScript runs (must not be). R0 checks this with JavaScript off and with a slow scroll.

**Overall desktop rating: 6 / 10.** Typography, palette and content are strong; the page carries many items from the ban list, has two layout failures (section 06 gap, section 07 reel height) and one clipped section (08).

**Overall mobile rating: cannot be judged.** No mobile screenshot was provided. The mobile layouts below follow Part 7 of the standard. After R1 and R2, send a 390 px full-page screenshot so it can be reviewed against the real page.

---

## 3. Content map

Everything here must survive. Text is named, not rewritten. R0 compares this map with the real page and records differences in `DISCOVERY.md`. Items marked **(R0)** could not be read in the screenshot.

**Header.** Breadcrumb "Home / Doctors / Dr. Md. Miftah Ur Rahman" (links to `/` and `/doctors`). Eyebrow "Neodent Dental Hospitals / Clinical team". h1 "Dr. Md. Miftah Ur Rahman". Tagline "A specialist's hand. A patient's pace." Credentials line "BDS · MDS · FICOI (U.S.A.) · Gold Medallist". Role line "Prosthodontist & Implantologist · Assistant Director, Neodent Dental Hospital". Buttons "View Clinical Specialties" and "Read PubMed Articles" (hrefs: R0). Photo (banner image) with tag "Clinical practice" and caption "Dr. Md. Miftah Ur Rahman / Neodent Dental Hospital · Hyderabad". Meta strip "Neodent · Hyd". Bottom strip "15+ years clinical practice", "Prosthodontics · Implantology", "Nampally / Mehdipatnam", cue "Scroll".

**01 Profile index.** Eyebrow "Profile index". Heading "The record, in brief." Four rows: Practising at "Mehdipatnam · Nampally, Hyderabad"; Clinical focus "Prosthodontics & Implantology"; Academic post "Assistant Professor, Dept. of Prosthodontics, SB Patil Dental College & Hospital"; Experience "15+ years". Background photograph (operatory, faded).

**Philosophy seam card.** Eyebrow "Clinical philosophy". Statement: old text "Saving natural teeth, even when it is mobile." **replaced under A1** by "Save the natural teeth till the last stage."

**02 Biography.** Eyebrow "Biography". Heading "A steady hand. A considered approach." Four paragraphs (P1 "Dr. Md. Miftah Ur Rahman is a Prosthodontist and Implantologist at Neodent Dental Hospital…", P2 "Prosthodontics is the branch of dentistry…", P3 "Alongside clinical practice, he holds an academic post…", P4 "He holds a BDS and an MDS…"). Link "See the treatments he performs". Photograph "In the operatory" with caption "Dr. Md. Miftah Ur Rahman / In the operatory · Neodent Dental Hospital, Hyderabad". Inset photograph "Treatment room · Mehdipatnam".

**03 Specialisation.** Eyebrow "Specialisation". Heading "Where his work goes deepest." Line "Four areas where his specialist training is most directly applied." Four items: "Saving natural teeth" (sub-label "Root canal treatment"; three radiographs labelled Pre, Mid, Post; links "Explainer" and "Treatment"; one-sentence description; "Explore treatment"), "Smile designing" (before and after photos, "View images", description, "Explore treatment"), "Dental implants" (same), "Full mouth rehabilitation" (same). Each has an icon. Each "Explore treatment" links to its treatment page.

**Case story, smile design.** Eyebrow "Case story · Smile design". Heading "The clinical thinking behind a confident smile." Two paragraphs ("A smile does not come together by changing teeth in isolation…", "The six photographs document the clinical progression…"). Six-photograph viewer (all six images, **R0**: their file names and alt text). Action "Click to view: The smile journey". Photo caption "Final result".

**04 Full scope.** Eyebrow "Full scope". Heading "Clinical care across key concerns." Seven treatment cards, each with a link "View treatment": Composite Build-up (Repair), Dental Implants (Specialist focus, Replace), Root Canal Treatment (Preserve), Braces & Orthodontics (Align), Smile Design & Cosmetic Dentistry (Specialist focus, Refine), Full Mouth Rehabilitation (Specialist focus, Rebuild), Scaling & Polishing (Maintain). Eighth cell text "Care shaped around individual needs".

**05 Education and training.** Eyebrow "Education & training". Heading "A foundation built formally." Line "His specialist practice rests on formal training in prosthodontics and implantology, carried through dental school, clinical internship, fellowship and formal recognition." Five stages: Dental school "BDS" (Sri Sai College of Dental Surgery; Dr. NTR University of Health Sciences); Clinical internship "Internship" (Osmania Government Dental College, Hyderabad); Specialist training "MDS: Prosthodontics & Implantology" (Sri Sai College of Dental Surgery; Kaloji Narayana Rao University of Health Sciences); Fellowship "FICOI (U.S.A.)"; fifth stage "Gold Medallist" with its small label **(R0)**. Facts footer "05 stages · 04 institutions · FICOI: U.S.A." Photograph "Award presented to Dr. Miftah Ur Rahman by Dr. K. Mahendranadh Reddy" with label "Recognition".

**06 Academic and research.** Eyebrow "Academic & research". Heading "Published work and teaching." Line "His clinical work is carried by an academic base: formal specialist training, published research and ongoing teaching." Teaching block ("Seminar · Dept. of Prosthodontics"; "Teaching"; "Assistant Professor"; "Department of Prosthodontics, SB Patil Dental College & Hospital"; "He teaches and conducts seminars for dental students alongside his clinical practice in Hyderabad."). Publications: entries 01 and 02 **(R0)**; entry 03 "Journal of Pharmacy and Bioallied Sciences · 2024: Evaluation of Different Materials used in Prosthetic of Dental Implants: A Comparative Study", "Indexed · PubMed" link. Link "View on PubMed". Sub-block "Clinical teaching": heading "Root canal treatment, explained.", line "Two short films in which Dr. Miftah explains root canal treatment.", two films with poster, play control, label "Saving natural teeth", titles "Root canal treatment: the explainer" and "Root canal treatment: the treatment film", links "View film", footer "02 films · Root canal treatment".

**07 In practice.** Eyebrow "In practice". Heading "See the work behind the treatment." Line "Real clinical films from Dr. Miftah's work at Neodent." Three reels with labels "Dr. Md. Miftah Ur Rahman · Neodent" and titles "DMLS crowns: masticatory efficiency", "Crown cementation", "Treatment in practice", links "View film", footer "Clinical work · Neodent Hyderabad", "03 films".

**08 Patient voices.** Eyebrow "Patient voices". Heading "What patients say. In their own words." Line "Verbatim from Google reviews. Individual results vary." Five reviews, verbatim, with reviewer name, age label and "Via Google": 01 "I've got My front smile teeth placed here. Wow. Dr Miftah has done an excellent job. I'm happy with my smile." **(reviewer R0)**; 02 **(R0)** (reviewer appears to be "Khaja Pasha"); 03 "I've got implants placed here by Dr Miftah. It's been 1 month and I'm fully satisfied." (Syed Moinuddin, 1 year ago); 04 "I got my Root canal treatment done here. Very nice treatment by Dr Miftah. I highly recommend." (M Kishore, 4 months ago); 05 "Dr Miftah had made me confident by changing my smile." (Laxminarayana Chikkula, 1 year ago). Link "Read all reviews on Google".

**09 Recognition.** Eyebrow "Recognition". Heading: first line **(R0)** plus "earned over time." Labels "Press archive", "13 clippings · Select to enlarge". Thirteen newspaper clippings (Urdu daily), prev and next controls.

**10 Where to find him.** Eyebrow "Where to find him". Heading "Two doors. One standard of care." Two cards (addresses and phones below were read from a scaled screenshot; R0 verifies them against `lib/clinic-data.ts`): "Mehdipatnam: Hyderabad" with exterior and interior photos, address "10-3-148/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006", phone "+91 90306 48393", "Directions"; "Nampally: Hyderabad" with exterior and interior photos, address "Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad, Telangana 500001", phone "+91 90305 98081", "Directions". Sentence "Visit the Mehdipatnam clinic page or the Nampally clinic page, and read the wider practice story on About Neodent." with its three links.

**Consultation block and footer.** Shared. Untouched.

**Photographs available for the wall (new section SW), from the owner's sheet** (file base name "Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital - photoN" in `public/assets/dr-miftah/`; extension from R0's inventory):

| N | Owner's description (as written) | Expected shape |
|---|---|---|
| 1 | Single portrait from treatment room | portrait |
| 2 | Single portrait from Neodent Dental Hospital Nampally | portrait |
| 3 | Single portrait image | portrait |
| 4 | With Dr. Siraj Ur Rahman and Dr. Muti Ur Rahman at Mehdipatnam | landscape |
| 5 | With Dr. Siraj Ur Rahman at Mehdipatnam | landscape |
| 6 | With other doctors | landscape |
| 7 | With MLA Jaffer Hussain Meraj | landscape |
| 8 | During a treatment | portrait |
| 9 | In the Department of Prosthodontics | portrait |
| 10 | Rewarded by Dr. Praneet Manga, professor, AIMS Institute of Dental Science | landscape |

The same folder holds other files that are **not** on the owner's sheet (two photographs at the Department of Prosthodontics at SB Patil Dental College, one of them at a seminar; "Dr Miftah ur Rahman at Neodent Dental Hospital"; an untitled portrait; a treatment portrait; `banner_image`; award files; `og-dr-miftah-ur-rahman-1200x630`; a PubMed logo). The wall uses photographs 1 to 10 only. See open question Q3.

---

## 4. Target layout, section by section

Shared rules for every section: container width and vertical padding copied from `LegacyStory.module.css` and `ExperienceIntro` (home). Eyebrows are plain words, 12 px or larger, never numbered. No ghost numerals, no vertical centre hairline, no corner or edge decoration. Red-italic accent phrase only on: the header tagline, the philosophy statement, section 05's second line and section 08's second line. Every other heading keeps its words but is set in one weight and colour. Dark bands use the layer recipe of Part 3.6 (copied into this page's CSS Module). Light bands stay plain ivory.

Band rhythm after the redesign: header dark, 01 light, 02 light, 03 dark (with the case story), 04 light, 05 dark, 06 light, 07 dark, 08 light, 09 dark, **SW dark**, [FAQ light, optional], 10 light, consultation dark. Never more than two dark bands in a row (09 and SW are the only pair).

### SW. Photograph wall (new, owner request)

**Position.** After 09 Recognition and before 10 Where to find him. (09 is "recognition", SW shows the awards, colleagues and teaching moments next to it. To move it, change one line in `page.tsx`.)

**Pattern.** New (closest: P12 and P7 for the zoom behaviour; dark band recipe from Part 3.6). It is **not** a slider and **not** a carousel. All ten photographs are visible together without scrolling sideways.

**Heading block.** Eyebrow "Photographs". h2 "Dr. Miftah, in photographs." Supporting line (plain): "Ten photographs of Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital in Hyderabad: in the treatment room, with colleagues, in the Department of Prosthodontics and receiving an award. Select any photograph to enlarge it." No red-italic accent. No action button; the wall is the focal element.

**Desktop and laptop (1280 px and wider), the main requirement.**
- Two columns: heading block on the left (about 4 of 12 columns), the wall on the right (about 8 of 12 columns). The whole section including padding is **at most 100% of a 1366 x 650 viewport (target 560 px or less)**.
- The wall is a "justified" mosaic: two rows, five photographs each (photographs 1 to 5, then 6 to 10), every photograph shown whole in its own aspect ratio (cropped by no more than about 8% for alignment), row height about 150 to 175 px, gap 8 px. Tile widths follow aspect ratio, so portraits are about 110 to 130 px wide and landscapes about 210 to 245 px wide. This matches the Explorer thumbnails the owner showed: small, clearly visible, not micro.
- Maximum wall width 900 px. At 1920 px the tiles do not grow past that.
- Tiles: 1 px hairline border `rgba(255,255,255,0.14)`, radius copied from the home photo cards, soft shadow, dark gradient on hover (desktop only) with a subtle lift (2 px) and slight brightening. Behind the wall: the red radial glow of the recipe (alpha about 0.22 to 0.30) so the wall feels lit.
- 1024 to 1279 px: heading block above the wall, wall full width (about 940 px), two rows of five, row height about 170 to 185 px.

**Tablet (640 to 1023 px).** Heading above, wall full width, rows of 5 + 5 or 4 + 3 + 3, whichever keeps every row at two or more tiles and every tile at least 100 px wide. The agent picks the row height for each breakpoint and checks it in the screenshot.

**Mobile (under 640 px).**
- Heading block, then the wall in rows of **3 + 2 + 2 + 3** (photographs 1 to 3, 4 and 5, 6 and 7, 8 to 10), row height about 120 to 160 px, gap 8 px. Total wall height about 560 px (about two thirds of a 844 px screen). Smallest tile about 88 x 125 px; every tile is at least 44 x 44 px tappable.
- No horizontal scroll, no slider. All ten tiles are in the DOM and visible at once.
- If any row would hold a single tile at 360 px width, adjust the row height for that breakpoint rather than changing the grouping rule.

**Technique (agent chooses, must satisfy the checks).** One `<ul>` of ten `<li><a>` tiles, DOM order 1 to 10 (the visual order is the DOM order, so keyboard order matches). Each tile has `aspect-ratio` set from the real pixel size of the file (stored in the data file) and `flex-grow` equal to that ratio, so widths follow aspect ratio and heights per row come out equal. Row breaks are made by CSS only (per-breakpoint flex-basis tuning, or a forced break after tile 5 on desktop and after tiles 3, 5 and 7 on mobile). If flow-wrapping proves unstable, use a CSS grid with explicit column spans per breakpoint. No duplicated markup for different breakpoints (an image must appear once in the DOM).

**Tiles are real links and real images.**
- `<a href="<full-size file URL>">` wrapping a `next/image` (lazy; no `priority`), `sizes="(max-width: 640px) 34vw, 240px"`, `alt` exactly as in the table below. With JavaScript off, the link opens the full image. With JavaScript on, it opens the zoom viewer (`aria-haspopup="dialog"`).
- File names are not changed (existing public assets are never renamed).

**Zoom viewer (`ImageLightbox`).** Native `<dialog>` (or an equivalent focus-trapped modal), opened from a tile; shows the full photograph with `object-fit: contain`, the caption below it (visible, same text as the alt), previous and next buttons (44 px minimum), a close button, Esc to close, arrow keys, swipe on touch, focus returns to the tile, body scroll locked. The enlarged image carries `data-media-exempt` (it is a viewer; the 70% rule does not apply to the open viewer). Image `sizes="90vw"`; the large file loads only on open. Open and close: opacity and a 0.98 to 1 scale, 250 ms; none under reduced motion. Build once as `components/pages/dr-miftah/ImageLightbox.tsx` (R6 or R7, whichever runs first; the other reuses it) and use it for both the press archive (09) and the wall.

**Captions and alt text (final strings, written from the owner's sheet; typos corrected; nothing added).**

| N | `alt` and caption |
|---|---|
| 1 | Dr. Md. Miftah Ur Rahman, prosthodontist and implantologist, in a treatment room at Neodent Dental Hospital |
| 2 | Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital Nampally, Hyderabad |
| 3 | Portrait of Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital |
| 4 | Dr. Md. Miftah Ur Rahman with Dr. Mohd. Siraj Ur Rahman and Dr. Muti Ur Rahman at Neodent Dental Hospital Mehdipatnam |
| 5 | Dr. Md. Miftah Ur Rahman with Dr. Mohd. Siraj Ur Rahman at Neodent Dental Hospital Mehdipatnam |
| 6 | Dr. Md. Miftah Ur Rahman with other doctors |
| 7 | Dr. Md. Miftah Ur Rahman with MLA Jaffer Hussain Meraj |
| 8 | Dr. Md. Miftah Ur Rahman during a treatment at Neodent Dental Hospital |
| 9 | Dr. Md. Miftah Ur Rahman in the Department of Prosthodontics |
| 10 | Dr. Md. Miftah Ur Rahman receiving an award from Dr. Praneet Manga, Professor, AIMS Institute of Dental Sciences |

The owner's sheet writes "Dr. Siraj Ur Rahman" and "AIMS institute of Dental Science"; the standard requires "Dr. Mohd. Siraj Ur Rahman" in new text, and the institute name needs the owner's confirmation (Q4).

**Visible caption list for search engines.** Below the wall, one native `<details>` ("Photograph details", closed) containing a plain `<ul>` of the ten captions in order. The text is in the server HTML. It adds no height while closed.

**Image search help.** Descriptive alt (above), real `<a href>` to the original file, visible captions in the details list and the zoom viewer, and (optional, A2) an `ImageGallery` JSON-LD block listing the ten images with their absolute URLs and captions. The image sitemap entry is a shared request (section 8).

**Empty-card check.** No cards; tiles are images. The left heading block is vertically centred against the wall.

**Motion.** Heading rise. Tiles: mask reveal with a 1.04 to 1 settle, stagger about 70 ms in DOM order (total under 800 ms), triggered when the wall enters view. Hover lift on desktop, press state on touch. No parallax. Reduced motion: final state.

**SEO.** One h2 with the entity words (Dr. Miftah, photographs). The wall repeats the doctor's name and Neodent Dental Hospital naturally in alt text without stuffing. Internal links: none added here.

### Header (P1)

See section 5.

### 01 Profile index (P2, with a definition list)

Reference: `ExperienceIntro.tsx` stat strip and `CountUp`. Light. Left: eyebrow "Profile index", h2 "The record, in brief." (plain). Right: a semantic `<dl>` of four rows with hairline dividers (label small, value large). "Mehdipatnam" and "Nampally" in the first row become links to `/clinic/mehdipatnam` and `/clinic/nampally` (additive; text unchanged). "15+ years" uses `CountUp` for the number (server output is the final value). The faded background photograph stays as a decorative layer at low opacity, masked away from the text so the text keeps at least 4.5:1 contrast. Mobile: single column, label above value. Motion: heading rise; rows stagger 80 ms; CountUp.

### Philosophy seam card (P4)

Reference: `SeamCard.tsx` (home; open it and copy). Used once on this page; it overlaps the boundary between 01 and 02. Content: eyebrow "Clinical philosophy"; a `<blockquote>` with the single sentence **"Save the natural teeth till the last stage."** (keep the sentence contiguous in the DOM; the last clause "till the last stage." may be styled as the red italic accent) and an added `<cite>` "Dr. Md. Miftah Ur Rahman". If `lib/clinical-team.ts` already exports this exact sentence, import it from there (single source) instead of typing it again. The old sentence disappears from the page, including the metadata and JSON-LD if it occurs there (A1). The old dotted offset outline is removed. Card width at most 36 rem, padding copied from the home seam card. Motion: rise with a slight scale settle. Mobile: full width minus 16 px margins.

### 02 Biography (P3 lede and depth, with P5 split)

References: `LegacyStory.tsx` (split, photograph treatment) and the "Care begins" lede in `ExperienceIntro`. Light. Left column: eyebrow "Biography", h2 "A steady hand. A considered approach." (plain), paragraphs 1 and 2 visible, paragraphs 3 and 4 inside one native `<details>` (summary label added: "More about his practice and training"), then the link "See the treatments he performs". Highlighted phrases limited to two ("planning before treatment begins" and "more than fifteen years"); the other highlighted phrases stay as plain text. Right column: the operatory photograph (`cover`, focal point on the face and the microscope, `max-height: var(--media-max-h)`, caption below on light), with the treatment-room inset overlapping its lower right corner and its own caption below. Mobile: text first; the two photographs become a two-card swipe row (every photograph in the DOM, cards about 84% wide). Motion: heading mask; paragraphs rise 80 ms apart; the main photograph mask-reveals; the inset rises 150 ms later; optional parallax of at most 24 px on the main photograph from 1024 px up.

### 03 Specialisation (P6 with P11 thumbnails)

References: `Expertise.tsx` cards; `components/treatments/BeforeAfterCases.tsx` for the paired thumbnails. Dark band. Eyebrow "Specialisation", h2 "Where his work goes deepest." (plain, ivory), supporting line as existing. Four dark glass cards (Part 3.4) at 1280 px and wider in one row, 2 x 2 from 768 px, a swipe row (cards about 84% wide, every card in the DOM, progress dots) under 768 px. Each card: icon, title, sub-label, thumbnails (all of them: the radiograph triptych with Pre, Mid, Post labels; before and after pairs), "Explainer", "Treatment" and "View images" links where they exist, the description sentence, "Explore treatment" at the bottom, cards of equal height with content filling at least 65% of the inner height. Numerals 01 to 04 are dropped (approved list). The hairline crossing the card text is removed. Thumbnails keep their existing viewer behaviour. Motion: cards stagger 100 ms; thumbnails mask-reveal.

### Case story, smile design (P11)

Reference: `RealTreatmentWork.tsx` and `BeforeAfterCases.tsx`. Same dark band as 03 (so the band count stays one). h3 "The clinical thinking behind a confident smile." Left: the two paragraphs and the action "Click to view: The smile journey" (44 px high). Right: the final-result photograph (`cover`, focal point on the smile, `max-height: var(--media-max-h)`) with the caption "Final result" on a dark gradient at the bottom. The 01 to 06 numeral stepper becomes six progress dots (each dot a 44 px tap area with an accessible name "Photograph 1 of 6" and so on); the "06 / 06" counter is dropped (approved list). All six photographs remain in the DOM and in the viewer. Mobile: text, then one photograph at most 38dvh, dots, action. Motion: photograph mask reveal; dots fade in.

### 04 Full scope (P6)

Reference: `Expertise.tsx` cards. Light. Eyebrow "Full scope", h2 "Clinical care across key concerns." (plain). The line "Care shaped around individual needs" moves from the eighth cell to the heading band as its supporting line (this plan authorises that move; the red dot is dropped), which removes the empty cell. Seven cards in a 4 + 3 flow (the three cards of the second row grow to fill the row). Each card: icon, title, tag line (Repair, Replace and so on), the "Specialist focus" tag where present, "View treatment" link (whole card clickable through a stretched link, 44 px minimum). Under 768 px: one column of compact rows (icon, title, tags, link), each at least 64 px tall. Numerals dropped. Motion: cards stagger 80 ms.

### 05 Education and training (P8 stepper, with a photograph)

Reference: `WhatToExpect.tsx` vertical stepper. Dark. Eyebrow "Education & training", h2 "A foundation built formally." with "built formally." as the red italic accent (one of four allowed), supporting line as existing (placed under the heading, not floating to the right). Left: the five stages as a stepper with a connecting line that draws with scroll; numerals dropped; **the fifth stage "Gold Medallist" is fully visible at full contrast** (check for a reveal or contrast bug); the facts footer ("05 stages · 04 institutions · FICOI: U.S.A.") becomes a quiet fact row at 12 px or larger. Right: the award photograph (`cover`, focal on the two people, `max-height: var(--media-max-h)`), label "Recognition" and its caption below the photo on the dark gradient. Mobile: heading, stepper, then the photograph at most 38dvh. Motion: stages rise in order as the line draws; photograph mask reveal.

### 06 Academic and research (P3 and P7)

References: `ClinicalLeadership.tsx` (cards), `PatientStories.tsx` (rows). Light. Eyebrow "Academic & research", h2 "Published work and teaching." (plain), supporting line as existing. Two columns: left a teaching card ("Teaching", "Assistant Professor", department and college lines, the sentence about seminars, "Seminar · Dept. of Prosthodontics" label); right a list of the publication cards (all of them, including 01 and 02 when found), each with journal and year, title, "Indexed · PubMed" link; then "View on PubMed". **Fix the 350 px gap**: the content sits directly under the heading. Sub-block "Clinical teaching": h3 "Root canal treatment, explained.", the supporting line, two portrait films side by side, each `aspect-ratio: 9 / 16` with `max-height: var(--media-max-h-compact)`, poster, play control at least 44 px, label, title, "View film" link, footer "02 films · Root canal treatment". Films keep their present behaviour (R0 records whether they open a viewer or play in place) and obey Part 5.2: muted, `playsInline`, `preload="none"`, poster, play only while 50% in view, not under reduced motion or `saveData`. Mobile: teaching card, publications stacked, films in a swipe row. Motion: cards stagger; films mask-reveal.

### 07 In practice (P7, videos)

Reference: `RealTreatmentWork.tsx`. Dark. Eyebrow "In practice", h2 "See the work behind the treatment." (plain ivory), supporting line as existing. Two columns from 1024 px: text on the left, three reels on the right, each reel `aspect-ratio: 9 / 16` with `max-height: var(--media-max-h)` (about 440 px at 650 px viewport height; width follows), poster, play control, caption on a dark gradient at the bottom of the reel, title and "View film" link below. Under 1024 px: a swipe row of three (cards about 62% wide so the next peeks) with progress dots. At most one reel plays at a time; a sound button on any reel with speech (R0 asks which, Q6). Numbered tags 01 to 03 are dropped. Motion: reels mask-reveal, stagger 100 ms.

### 08 Patient voices (P7)

Reference: `PatientStories.tsx`. Light. Eyebrow "Patient voices", h2 "What patients say. In their own words." with "In their own words." as the red italic accent (one of four), supporting line as existing. Five review cards in one swipe row (desktop shows about three and a peek, mobile cards about 86% wide), progress dots, keyboard accessible, every review in the DOM and verbatim (including capitalisation such as "My front smile teeth"). Per card: quote, reviewer, age label, "Via Google". Numerals 01 to 05 are dropped. "Read all reviews on Google" below. No rating schema, no Review schema. Motion: cards stagger 80 ms.

### 09 Recognition (P12)

Reference: the press row of `LegacyStory.tsx`. Dark. Eyebrow "Recognition", h2 as existing (both lines; the first line is read by R0), labels "Press archive" and "13 clippings · Select to enlarge". Thirteen clippings in a swipe row: each shown whole (`contain`) at `max-height: var(--media-max-h-compact)`, tap to zoom through `ImageLightbox`, previous and next buttons (44 px), a thin progress bar instead of 13 dots, the red numerals under each clipping dropped, the heavy side vignette reduced to a soft edge fade. Mobile: cards about 80% wide. Motion: row rises; clippings stagger 60 ms for the first six.

### Optional FAQ (P14), only if A3 is approved

Light, after SW and before 10. Native `<details>`, first open, no numbering, hairline dividers, chevron. Six questions built from facts already on the page (exact text in R8). `FAQPage` JSON-LD generated from the same array (A3).

### 10 Where to find him (P5 and P9 pattern)

Reference: `SpacesDesignedAroundCare.tsx` (branch cards). Light. Eyebrow "Where to find him", h2 "Two doors. One standard of care." (plain), supporting sentence with its three links (existing sentence, moved directly under the heading). Two cards side by side from 768 px: exterior photograph (`cover`, `max-height: var(--media-max-h-compact)`), the interior inset overlapping its lower corner, caption below, address, phone (`tel:`), "Directions", and an **added** line with the clinic's opening hours from the single data source (Part 1) so GEO facts match everywhere. The empty band in the left card is removed by sizing the card to its content (empty space at most 35%). Mobile: one card per clinic, its two photographs as a two-card swipe row. Motion: cards rise; photographs mask-reveal.

### Consultation block

`ContactNextStep` is imported unchanged.

---

## 5. Page header spec (P1)

- **Backdrop layers (Part 3.6):** vertical gradient `--neodent-charcoal` to `#0f1315`; red radial glow behind the photograph (alpha about 0.30, centre set by custom properties); the dental icon pattern as a luminance `mask-image` over an ivory fill, fading to zero before the text column. Copy the recipe from the home hero CSS into this page's CSS Module. Do not import hero classes.
- **Breadcrumb:** visible, as now: "Home / Doctors / Dr. Md. Miftah Ur Rahman" (first two are links), 13 px.
- **Eyebrow:** "Neodent Dental Hospitals / Clinical team", plain words, 12 px or larger.
- **h1:** "Dr. Md. Miftah Ur Rahman", wording unchanged, line-mask reveal on load.
- **Tagline:** "A specialist's hand. A patient's pace." The second sentence keeps the red italic accent (this is the page's main heading accent).
- **Credentials and role lines:** "BDS · MDS · FICOI (U.S.A.) · Gold Medallist" and "Prosthodontist & Implantologist · Assistant Director, Neodent Dental Hospital", both kept, at 14 px or larger.
- **Plain supporting line (added):** "Prosthodontist and implantologist at Neodent Dental Hospital, practising in Mehdipatnam and Nampally, Hyderabad." (carries the search phrase; both place names link to their clinic pages).
- **Actions:** primary "Call for Consultation" (`tel:` from `ctaTelPhone`; display `ctaPhone`), secondary "Send an enquiry" to `/contact`. The two existing links "View Clinical Specialties" and "Read PubMed Articles" stay, with their hrefs and text, as a quiet row of text links under the two buttons (one primary action per viewport).
- **Media:** the banner photograph on the right with the only `priority` image on the page, `object-position` set so the face stays in frame, `max-height: var(--media-max-h)`, mask reveal with a 1.04 to 1 settle, rises 24 px. The tag becomes the plain words "Clinical practice". Caption on a dark gradient at the bottom of the photograph: "Dr. Md. Miftah Ur Rahman / Neodent Dental Hospital · Hyderabad". Glass cards: none needed.
- **Fact strip (P2):** "15+ years clinical practice" (CountUp on 15), "Prosthodontics · Implantology", "Nampally / Mehdipatnam", at 13 px or larger. The "Scroll" cue, the "Neodent · Hyd" strip and the ghost "DR" are decorative; they go only if the owner approves them in `content-allowlist.json` after R0; otherwise they stay as plain 12 px text.
- **Mobile order:** breadcrumb, eyebrow, h1, tagline, credentials, role line, supporting line, primary action (full width), secondary action, text links, photograph (at most 38dvh) with caption, fact strip as a 2 x 2 grid.
- **Motion:** per Part 8.2, keyed off a CSS class (the home hero method), not `Reveal`. Glow breathing and pattern drift on 768 px and wider only.

---

## 6. Motion plan

| Section | Elements | Variant | Stagger | Notes |
|---|---|---|---|---|
| Header | h1 | line-mask on load | n/a | class-keyed, not `Reveal` |
| Header | tagline, credentials, role, supporting line, actions | rise | 100 ms | class-keyed |
| Header | photograph | mask + rise 24 px + 1.04 to 1 | n/a | glow breathing and drift 768 px and up only |
| Header | fact strip | rise; CountUp on 15 | 80 ms | |
| 01 | heading; dl rows | rise | 80 ms | CountUp on 15 |
| Seam card | card | rise + settle | n/a | |
| 02 | heading, paragraphs; photographs | mask; rise; mask | 80 ms; inset +150 ms | optional parallax at most 24 px from 1024 px |
| 03 | heading; four cards; thumbnails | rise; rise; mask | 100 ms | |
| Case story | text; photograph; dots | rise; mask; fade | 80 ms | dots fade in |
| 04 | heading; seven cards | rise; rise | 80 ms | |
| 05 | heading; stages; photograph | rise; rise in order; mask | 100 ms | connecting line draws with scroll (`animation-timeline: view()` with observer fallback) |
| 06 | heading; teaching card; publications; films | rise; rise; rise; mask | 80 ms | |
| 07 | heading; reels | rise; mask | 100 ms | one reel plays at a time |
| 08 | heading; review cards | rise; rise | 80 ms | |
| 09 | heading; clippings | rise; rise | 60 ms (first six) | |
| SW | heading; ten tiles | rise; mask + settle | 70 ms | total under 800 ms; hover lift desktop; press state touch |
| 10 | heading; cards; photographs | rise; rise; mask | 100 ms | |
| All | cards and buttons | hover lift (desktop), press (touch) | n/a | |
| All | reduced motion | final state, no transforms | n/a | |

Duration 300 to 700 ms, ease-out, `transform` and `opacity` only. The hidden start state is added by a JavaScript-set class, never in the server HTML. No new libraries.

---

## 7. SEO, AEO and GEO checklist

**Entities and facts kept consistent.** Dr. Md. Miftah Ur Rahman; Neodent Dental Hospital (Hyderabad; Mehdipatnam; Nampally); BDS, MDS (Prosthodontics & Implantology), FICOI (U.S.A.), Gold Medallist; Assistant Professor, Department of Prosthodontics, SB Patil Dental College & Hospital; Assistant Director, Neodent Dental Hospital. Spelling "Mehdipatnam" and "Neodent" in running text. Phones and addresses only from the single data sources.

**Metadata.** `metadata` and every JSON-LD block in `page.tsx` stay byte-identical, **except** the approved changes below.

**Approved change register.**
- **A1 (approved by the owner on 1 Nov 2026).** The old statement "Saving natural teeth, even when it is mobile." is replaced everywhere on this page by "Save the natural teeth till the last stage.", including in metadata or JSON-LD if the old sentence occurs there. Text-only swap. The category labels "Saving natural teeth" on the 03 card and on the films are different content units and **do not change**.
- **A2 (optional, needs owner approval; the owner writes "A2 approved" at the top of the R7 prompt).** A new, separate `ImageGallery` JSON-LD block for the ten photographs (absolute URLs on `https://www.neodentdentalhospitals.com`, caption equal to the alt text). Existing blocks untouched. A matching image-sitemap request is logged as a shared request.
- **A3 (optional, needs owner approval; the owner runs R8 only if approved).** A visible six-question FAQ and a `FAQPage` JSON-LD block generated from the same array, word for word.
- **Additions that need no schema** (allowed by Part 6.3): the plain supporting line in the header, two clinic links in the header and the profile index, clinic hours in section 10, the `cite` on the philosophy quote, the "More about his practice and training" summary label, the "Photograph details" summary label, the new section SW.

**Headings.** One h1 (the doctor's name). h2 per section, h3 for the case story and "Root canal treatment, explained." Order never skips a level.

**Internal links that must exist and keep their anchors.** Seven treatment pages (from 03 and 04), `/clinic/mehdipatnam`, `/clinic/nampally`, `/about`, `/contact`, `/doctors` (breadcrumb), PubMed links, Google reviews link, Directions links. The link count never falls; it rises (header and profile index clinic links).

**Images.** Descriptive alt text everywhere. Decorative layers `aria-hidden`. `priority` only on the header photograph. SW tiles lazy with `sizes`.

**Schema.** Present blocks: **R0 reports them** (expected: a person or physician block and a breadcrumb block). No `aggregateRating`, no `Review` schema, `foundingDate: "1994"` unchanged wherever it occurs.

**AEO.** The page has no FAQ. A proposed one is in R8 (A3). Direct answer first, then one or two supporting sentences, facts only from this site.

**GEO.** Hyderabad, Mehdipatnam and Nampally appear naturally in the header supporting line, section 10 and the wall's supporting line. Clinic hours match `lib/site-data.ts` and `lib/clinic-data.ts`.

---

## 8. Ownership forecast and concurrency notes

**Expected OWNED (R0 verifies).** `app/doctors/dr-miftah-ur-rahman/page.tsx`, any doctor-profile components used only by this route.

**Expected FORK CANDIDATES.** Any component under `components/doctors/*` that `/doctors` also imports. R1 copies each to `components/pages/dr-miftah/` and switches this page to the copy.

**SHARED READ-ONLY.** `lib/clinical-team.ts`, `lib/site-data.ts`, `lib/clinic-data.ts`, `lib/structured-data.ts`, `components/motion/*`, `components/sections/ContactNextStep*`, `components/ui/*`, `app/globals.css`, everything under `public/`.

**New files.** `components/pages/dr-miftah/*` (including `PhotoWall.tsx`, `ImageLightbox.tsx` and their CSS Modules), `lib/pages/dr-miftah-content.ts` (the ten photographs: file name, width, height, alt and caption; the FAQ array if A3), `docs/internal-pages/dr-miftah/*`.

**Same-family pages that must not run at the same time as R0 and R1:** `/doctors`. After R1 the two are independent (this page uses its own forks).

**Expected shared-change requests (appended to `docs/internal-pages/_shared-requests.md`, applied later by Appendix F).**
1. Image-sitemap entries for the ten photographs in the sitemap file (only if A2 is approved).
2. If the old philosophy statement occurs in a shared file (for example `lib/clinical-team.ts`, `lib/og-image.tsx`), a request to update it there.
3. If clinic hours are not exported from the data sources, a request to export them.

---

## 9. Run sequence

| Run | Scope | Main files | Depends on | Time |
|---|---|---|---|---|
| R0 | Discovery, snapshot, ownership, photo inventory, allowlist proposal | `docs/internal-pages/dr-miftah/*` only | G0 done | 15 to 20 min |
| *Owner step* | Review `ALLOWLIST_PROPOSAL.json`, save the approved lines as `content-allowlist.json`; answer Q1 to Q6 | | R0 | |
| R1 | Forks, page wrapper, dark-band recipe, header (section 5) | `components/pages/dr-miftah/*`, `page.tsx` | owner step | 25 to 30 min |
| R2 | 01 Profile index, philosophy seam card (A1), 02 Biography | same | R1 | 25 min |
| R3 | 03 Specialisation, case story, 04 Full scope | same | R1 | 30 min |
| R4 | 05 Education, 06 Academic and research with the two films | same | R1 | 30 min |
| R5 | 07 In practice, 08 Patient voices | same | R1 | 25 min |
| R6 | 09 Recognition (and `ImageLightbox` if not built yet), 10 Where to find him | same | R1 | 25 min |
| R7 | **Photograph wall (SW)**, with `ImageLightbox` if not built yet; optional A2 | same, `lib/pages/dr-miftah-content.ts` | R1 | 30 min |
| R8 | **Optional** FAQ (A3) | same, `lib/pages/dr-miftah-content.ts` | R6 | 20 min |
| R9 | Motion and polish pass | same | R2 to R7 | 25 min |
| R10 | Final fast check and screenshots (Appendix E) | docs and audit only, plus fixes in owned files | R9 | 20 min |

R7 depends only on R1, so if the owner wants to see the wall first, run R7 right after R1 (the mount point in `page.tsx` is "after 09, before 10"; if 09 is not restyled yet it is still the same place). Eleven prompts is above the usual five to eight because the page has fourteen sections; each prompt stays narrow.

---

## 10. Prompts

In every prompt, `docs/internal-pages/dr-miftah/` is this page's folder. The preamble (Appendix B) is pasted verbatim with `<slug>` filled in as `dr-miftah`.

### R0. Discovery and snapshot

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R0 for dr-miftah (/doctors/dr-miftah-ur-rahman): discovery, content snapshot, ownership and photo inventory. This run changes no site code.

Do:
1. Confirm http://localhost:3000/doctors/dr-miftah-ur-rahman responds. If not, stop and say so.
2. Run node scripts/page-content-snapshot.mjs dr-miftah /doctors/dr-miftah-ur-rahman. This is the content baseline.
3. Find the page's files: app/doctors/dr-miftah-ur-rahman/page.tsx and every component, CSS Module and data file it imports (follow the imports). For each file run grep -rl on its name across app, components and lib to see who else imports it. Write docs/internal-pages/dr-miftah/OWNERSHIP.md with three lists: OWNED, SHARED READ-ONLY, FORK CANDIDATES (shared components this page's redesign must change, with the planned copy path under components/pages/dr-miftah/). One line on each file's role. Also list other routes in the same family (the /doctors list page in particular) and which of this page's files they share.
4. Map the sections of the rendered page to PAGE_PLAN.md section 3 (content map). Write docs/internal-pages/dr-miftah/DISCOVERY.md: the section list in order (heading, component, file); content the plan missed (read the items marked R0: the first line of the 09 heading, publications 01 and 02, reviews 01 and 02 with reviewer names, the label of the fifth education stage "Gold Medallist", the hrefs of the two header buttons); any plan section that does not exist; every image and video (path, alt, dimensions where known); the JSON-LD types present; how the films open (viewer or in place) and which have speech; where the existing zoom or lightbox components live (the 09 press row, the six-photograph smile journey, the before and after "View images"); where the Reveal component is used.
5. Check reveal behaviour: with JavaScript disabled, are all sections readable (look at the snapshot and the 390 px no-JS screenshot)? With a slow scroll, do the sections that looked half-hidden in the owner's screenshot (05 fifth stage, 06 gap, 08 first two cards, 09 first heading line) render fully? Record the cause of each (reveal state or real layout bug) in DISCOVERY.md. Do not fix anything.
6. Run node scripts/page-audit.mjs dr-miftah /doctors/dr-miftah-ur-rahman R0 for baseline screenshots (before the redesign). Print the screenshot paths. Record the audit numbers in DISCOVERY.md.
7. Photo inventory: write docs/internal-pages/dr-miftah/PHOTO_INVENTORY.md listing every file in public/assets/dr-miftah/ (and subfolders) with file name, extension, pixel width and height, byte size, aspect ratio, portrait or landscape (aspect under 0.95 is portrait), and whether this page's code already references it. To get pixel sizes without installing anything, load each file from http://localhost:3000/assets/dr-miftah/<url-encoded file name> in Playwright and read naturalWidth and naturalHeight (the files have spaces and full stops in their names: URL-encode them). Highlight the ten files named "Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital - photo1" to "photo10" and say whether the expected shapes in PAGE_PLAN.md section 3 (portrait: 1, 2, 3, 8, 9; landscape: 4, 5, 6, 7, 10) are right. Do not move, rename or edit any file.
8. Find every occurrence of the old philosophy statement: run grep -rn "even when it is mobile" and grep -rn "Saving natural teeth" over app, components and lib. For each hit report file, line, whether the file is OWNED or SHARED, and whether it is visible text, metadata, JSON-LD, an alt or an image-generation file. Also run grep -rn "Save the natural teeth till the last stage" and report where the new sentence already exists and its export name (expected: lib/clinical-team.ts). Write this in DISCOVERY.md under "Philosophy statement".
9. Find where clinic opening hours are exported (lib/clinic-data.ts or lib/site-data.ts): export names and shape. Write it in DISCOVERY.md under "Hours source".
10. Write docs/internal-pages/dr-miftah/ALLOWLIST_PROPOSAL.json (a proposal for the owner, not the allowlist): a list of {text, reason} for (a) the old philosophy sentence, exactly as it appears in the DOM (reason: replaced by owner under A1); (b) every numeral used as an eyebrow, card label, step label, slide counter or stepper label that the redesign will drop (list the exact DOM text, for example "01", "06 / 06", "02 / IN THE OPERATORY" and so on); (c) any decorative text that the redesign would remove (ghost "DR", "Neodent · Hyd", "Scroll"). Do not create content-allowlist.json.
11. List copy that looks wrong, ungrammatical or unverifiable in docs/internal-pages/dr-miftah/CONTENT_QUESTIONS.md (quote it; do not edit it). Things to look at: the sentence "the cases other clinics often describe as complicated", "teeth other clinics have recommended for extraction", the capitalisation in review 01, and whether the "Specialist focus" tags conflict with the rule that no doctor is shown as handling only certain cases.
12. Create docs/internal-pages/dr-miftah/CHANGELOG.md with an R0 entry.

Do not: edit any file outside docs/internal-pages/dr-miftah/ and .audit/dr-miftah/, start or stop servers, build, install, or use git write commands.
Report: files created, the ownership summary, differences between the plan and the real page, the philosophy-statement hits, the photo inventory summary, questions for the owner.
```

### R1. Forks, foundation and page header

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R1 for dr-miftah (/doctors/dr-miftah-ur-rahman): forks, page foundation and the page header (PAGE_PLAN.md section 5). Pattern P1.

Read first: PAGE_PLAN.md sections 3 (header content), 5 and 6; OWNERSHIP.md; DISCOVERY.md; docs/internal-pages/dr-miftah/content-allowlist.json (the owner's approved removals; anything not in it must stay on the page).
Open before building (home reference): components/hero/Hero.tsx and its CSS (layers, glow, pattern mask, motion classes), components/sections/ExperienceIntro.tsx (stat strip and CountUp), LegacyStory.module.css (container width and section padding).

May edit: files listed OWNED in OWNERSHIP.md; new files under components/pages/dr-miftah/ and lib/pages/dr-miftah-content.ts. Anything else: stop and explain.

Do:
1. Forks first. Copy every FORK CANDIDATE from OWNERSHIP.md into components/pages/dr-miftah/ (same file names, CSS Modules included), switch page.tsx to the copies, and run node scripts/page-content-check.mjs dr-miftah /doctors/dr-miftah-ur-rahman. It must report zero missing before any restyle. Do not touch the originals.
2. Create the page wrapper and its CSS Module with the page's custom properties, the container width and section padding copied from LegacyStory, and a dark-band recipe (gradient, red glow with custom properties, icon pattern as a mask-image, fading to zero before the text column) that later runs reuse. Do not import hero classes.
3. Rebuild the page header exactly as PAGE_PLAN.md section 5: breadcrumb; eyebrow; h1 unchanged; tagline with the red italic second sentence; credentials and role lines; the added plain supporting line with links to /clinic/mehdipatnam and /clinic/nampally; primary button "Call for Consultation" (tel from ctaTelPhone, text ctaPhone from lib/site-data.ts) and secondary "Send an enquiry" to /contact; the two existing links "View Clinical Specialties" and "Read PubMed Articles" kept as text links with their original hrefs and text; the banner photograph with priority, object-position set so the face stays in frame, max-height var(--media-max-h), caption on a dark gradient; fact strip with CountUp on 15. The tag becomes "Clinical practice" (numeral dropped, only if allowlisted). Ghost "DR", "Neodent · Hyd" and "Scroll" are removed only if they are in content-allowlist.json; otherwise keep them as plain text at 12 px or larger.
4. Header motion keyed off a CSS class (the hero method): headline line-mask, supporting items and actions rise 100 ms apart, photograph mask and rise 24 px with a 1.04 to 1 settle, glow breathing and pattern drift only from 768 px up, nothing under prefers-reduced-motion.

Acceptance (checkable):
- content check reports zero missing (or only allowlisted items)
- one h1; metadata and JSON-LD unchanged
- header at 1366 x 650: h1, tagline, credentials, both buttons and the photograph are visible without scrolling; no media over 70% of the viewport height
- at 390 x 844 the order is breadcrumb, eyebrow, h1, tagline, credentials, role line, supporting line, call button, enquiry button, text links, photograph (at most 38dvh), fact strip; no horizontal overflow at 360
- all tap targets in the header are at least 44 x 44 on mobile; no text under 12 px

Verify: run the fast check from Agent rules item 9 with run-id R1, then stop.
Do not: restyle any section below the header, add new global classes, edit shared files.
Report: files forked and created, content check result, audit numbers, screenshot paths and a two-line description of each screenshot you opened.
```

### R2. Profile index, philosophy statement (A1), biography

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R2 for dr-miftah (/doctors/dr-miftah-ur-rahman): section 01 Profile index, the philosophy seam card, and section 02 Biography. Patterns P2 (definition list), P4, P3 and P5.

Read first: PAGE_PLAN.md section 4 (01, Philosophy seam card, 02), section 6, section 7 (A1); OWNERSHIP.md; DISCOVERY.md (Philosophy statement; Hours source not needed here); content-allowlist.json.
Open before building (home reference): components/sections/SeamCard.tsx and its CSS; components/sections/ExperienceIntro.tsx ("Care begins" lede and stat strip); components/sections/LegacyStory.tsx and its CSS (split section and photograph treatment).

May edit: the components for these sections under components/pages/dr-miftah/ (and, if they are listed OWNED, their original files), page.tsx, lib/pages/dr-miftah-content.ts. Anything else: stop and explain.

Do:
1. Section 01 as in the plan: h2 "The record, in brief." with a semantic dl of the four rows; "Mehdipatnam" and "Nampally" become links to their clinic pages; CountUp on the 15 of "15+ years"; background photograph kept as a low-opacity decorative layer masked away from the text.
2. Philosophy seam card (change A1, approved by the owner): the statement is exactly "Save the natural teeth till the last stage." in one blockquote, sentence contiguous in the DOM, last clause "till the last stage." styled as the red italic accent, added cite "Dr. Md. Miftah Ur Rahman", eyebrow "Clinical philosophy". If DISCOVERY.md says lib/clinical-team.ts already exports this exact sentence, import it; otherwise keep it as a constant in lib/pages/dr-miftah-content.ts. Remove the old sentence "Saving natural teeth, even when it is mobile." from every file you own, including metadata or JSON-LD in page.tsx if it occurs there (text-only swap, nothing else in metadata changes). If it occurs in a SHARED file, do not edit that file; append a request to docs/internal-pages/_shared-requests.md with a shell append. The 03 card label "Saving natural teeth" and the film labels stay unchanged.
3. Section 02 as in the plan: h2 plain; paragraphs 1 and 2 visible; paragraphs 3 and 4 inside one native details with the summary "More about his practice and training" (full text in the server HTML); keep at most two highlighted phrases ("planning before treatment begins", "more than fifteen years"), all other highlighted phrases become plain text; the link "See the treatments he performs" kept; the operatory photograph and the treatment-room inset with their captions; on mobile the two photographs form a two-card swipe row with every photograph in the DOM.
4. Remove ghost numerals, numbered eyebrows and decorative lines in these sections, but only the numerals listed in content-allowlist.json leave the text; others stay as plain words.
5. Motion per PAGE_PLAN.md section 6 for these three blocks.

Acceptance (checkable):
- content check: the only missing sentence is the old philosophy statement (allowlisted); zero other missing
- grep -rn "even when it is mobile" over your owned files returns nothing
- the new sentence appears exactly once on the page as the quote, as the exact text "Save the natural teeth till the last stage."
- 01 and the seam card and the first screenful of 02 read cleanly at 1366 x 650; the seam card text has at least 4.5:1 contrast
- no media over 70% of the viewport; no horizontal overflow at 360; tap targets at least 44 x 44 on mobile
- at most two highlighted phrases in section 02; no card more than 35% empty

Verify: run the fast check from Agent rules item 9 with run-id R2, then stop.
Do not: touch the header or any section below 02; add the red-italic formula to these headings.
Report: files changed, where the old statement was found and replaced, content check result, audit numbers, screenshot paths with a short description of two or three screenshots.
```

### R3. Specialisation, case story, full scope

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R3 for dr-miftah (/doctors/dr-miftah-ur-rahman): section 03 Specialisation, the smile-design case story, and section 04 Full scope. Patterns P6, P11, P6.

Read first: PAGE_PLAN.md section 4 (03, Case story, 04), section 6; OWNERSHIP.md; DISCOVERY.md (viewer components); content-allowlist.json.
Open before building (home reference): components/sections/Expertise.tsx and its CSS (cards); components/treatments/BeforeAfterCases.tsx and RealTreatmentWork.tsx (paired thumbnails, viewer behaviour); components/hero/Hero.tsx dark-glass card styles.

May edit: the components for these sections under components/pages/dr-miftah/ (originals only if OWNED), page.tsx, lib/pages/dr-miftah-content.ts. Anything else: stop and explain.

Do:
1. Section 03 on the dark band recipe built in R1: four dark glass cards (Part 3.4 values) in one row from 1280 px, 2 x 2 from 768 px, a swipe row under 768 px (cards about 84% wide, progress dots, every card in the DOM). Keep every thumbnail, the Pre / Mid / Post labels, "Explainer", "Treatment", "View images", the description and "Explore treatment" with each link's href. Equal-height cards with content filling at least 65% of the inner height. Remove the hairline that crosses the card text. Numerals 01 to 04 dropped only if allowlisted.
2. Case story on the same band: h3 and both paragraphs as they are; the action "Click to view: The smile journey" kept (44 px high); the final-result photograph with the caption "Final result" on a dark gradient (cover, focal point on the smile, max-height var(--media-max-h)); the numeral stepper becomes six progress dots with accessible names "Photograph 1 of 6" and so on; the "06 / 06" counter dropped only if allowlisted. All six photographs and their viewer stay.
3. Section 04: h2 plain; "Care shaped around individual needs" moves to the heading band as its supporting line (authorised by the plan); seven cards in a 4 + 3 flow with the second row growing to fill; each card keeps its title, tag line, "Specialist focus" tag and "View treatment" link (stretched link, 44 px minimum); under 768 px one column of compact rows at least 64 px tall; numerals dropped only if allowlisted.
4. Motion per section 6 of the plan.

Acceptance (checkable):
- content check zero missing (or only allowlisted); all seven treatment hrefs still present in 04, and the four "Explore treatment" hrefs in 03
- no card more than 35% empty; no media over 70% of the viewport; no overflow at 360; tap targets at least 44 x 44 on mobile; no text under 12 px
- the dark band (03 plus the case story) is one band; 04 is light
- 03 and the case story are each readable in screenshots at 1366 x 650 and 390 x 844

Verify: run the fast check from Agent rules item 9 with run-id R3, then stop.
Do not: change the header, 01, 02 or any section below 04.
Report: files changed, content check result, audit numbers, screenshot paths with a short description of two or three screenshots.
```

### R4. Education, academic and research, clinical teaching films

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R4 for dr-miftah (/doctors/dr-miftah-ur-rahman): section 05 Education and training, section 06 Academic and research including the "Root canal treatment, explained" films. Patterns P8, P3, P7.

Read first: PAGE_PLAN.md section 4 (05, 06), section 6; OWNERSHIP.md; DISCOVERY.md (film behaviour, cause of the 06 gap and the faded fifth stage); content-allowlist.json.
Open before building (home reference): components/sections/WhatToExpect.tsx and its CSS (vertical stepper with the line that draws); components/sections/ClinicalLeadership.tsx (cards); components/sections/PatientStories.tsx (rows); components/treatments/RealTreatmentWork.tsx (video behaviour).

May edit: the components for these sections under components/pages/dr-miftah/ (originals only if OWNED), page.tsx, lib/pages/dr-miftah-content.ts. Anything else: stop and explain.

Do:
1. Section 05 on the dark band recipe: h2 "A foundation built formally." with "built formally." as the red italic accent; the supporting line directly under the heading; the five-stage stepper (line draws with scroll; numerals dropped only if allowlisted) with every school, university and label kept; make the fifth stage "Gold Medallist" fully visible at full contrast (fix the cause found in R0); the facts footer as a quiet fact row at 12 px or larger; the award photograph with its "Recognition" label and caption (cover, focal on the two people, max-height var(--media-max-h)). Mobile: heading, stepper, photograph at most 38dvh.
2. Section 06 on a light band: h2 plain; supporting line; two columns (teaching card left; every publication card right, including entries 01 and 02, with journal, year, title and "Indexed · PubMed" link; "View on PubMed" link). Remove the roughly 350 px gap so the content sits under the heading. Mobile: stacked.
3. "Clinical teaching" sub-block: h3, supporting line, the two films side by side, each aspect-ratio 9 / 16 with max-height var(--media-max-h-compact), poster, play control at least 44 px, label, title, "View film" link, footer "02 films · Root canal treatment". Keep each film's existing behaviour; where a film plays in place it is muted, playsInline, preload="none", with a poster, plays only while at least 50% in view and never under prefers-reduced-motion or saveData. Mobile: swipe row.
4. Motion per section 6 of the plan.

Acceptance (checkable):
- content check zero missing (or only allowlisted)
- no empty vertical gap larger than 96 px inside 05 or 06 at 1366 x 650
- all three publication entries (or however many R0 found) present
- no media over 70% of the viewport at 1366 x 650 and 390 x 844; no overflow at 360; tap targets at least 44 x 44 on mobile; no text under 12 px
- the fifth stage is readable at full contrast in a screenshot taken after scrolling

Verify: run the fast check from Agent rules item 9 with run-id R4, then stop.
Do not: change other sections; do not alter publication titles, journal names or years.
Report: files changed, content check result, audit numbers, screenshot paths with a short description of two or three screenshots.
```

### R5. In practice reels, patient voices

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R5 for dr-miftah (/doctors/dr-miftah-ur-rahman): section 07 In practice and section 08 Patient voices. Pattern P7 for both.

Read first: PAGE_PLAN.md section 4 (07, 08), section 6; OWNERSHIP.md; DISCOVERY.md (film behaviour, which films have speech, reviewers); content-allowlist.json.
Open before building (home reference): components/treatments/RealTreatmentWork.tsx (video behaviour and captions); components/sections/PatientStories.tsx and its CSS (swipe row, card style).

May edit: the components for these sections under components/pages/dr-miftah/ (originals only if OWNED), page.tsx, lib/pages/dr-miftah-content.ts. Anything else: stop and explain.

Do:
1. Section 07 on the dark band recipe: h2 plain ivory; from 1024 px two columns (text left, three reels right), each reel aspect-ratio 9 / 16 with max-height var(--media-max-h); under 1024 px a swipe row (cards about 62% wide, progress dots). Poster, play control (44 px), caption on a dark gradient at the bottom of the reel, title and "View film" link below, footer "Clinical work · Neodent Hyderabad" and "03 films". Videos: muted, playsInline, preload="none", poster, play only while at least 50% in view, at most one playing at a time, never under reduced motion or saveData; add a sound button only on a reel that has speech (R0 lists which; if unknown, add none and note it in CONTENT_QUESTIONS.md). Numbered tags dropped only if allowlisted.
2. Section 08 on a light band: h2 "What patients say. In their own words." with "In their own words." as the red italic accent; the supporting line under it; five review cards in one swipe row (about three visible and a peek from 1024 px; cards about 86% wide on mobile), progress dots, keyboard accessible, every review verbatim (do not fix capitalisation or grammar), reviewer name, age label and "Via Google" on each; numerals dropped only if allowlisted; "Read all reviews on Google" kept. No rating or review schema.
3. Motion per section 6 of the plan.

Acceptance (checkable):
- content check zero missing (or only allowlisted); all five review texts verbatim
- reels at 1366 x 650 are no taller than 70% of the viewport; no media over 70% at 390 x 844
- no card more than 35% empty; no overflow at 360; tap targets at least 44 x 44 on mobile; no text under 12 px
- only one video is playing in any screenshot

Verify: run the fast check from Agent rules item 9 with run-id R5, then stop.
Do not: change other sections; do not add aggregateRating or Review schema.
Report: files changed, content check result, audit numbers, screenshot paths with a short description of two or three screenshots.
```

### R6. Recognition press archive, where to find him

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6 for dr-miftah (/doctors/dr-miftah-ur-rahman): section 09 Recognition and section 10 Where to find him. Patterns P12 and P5 / P9.

Read first: PAGE_PLAN.md section 4 (09, 10, and the ImageLightbox description under SW), section 6; OWNERSHIP.md; DISCOVERY.md (existing zoom component; Hours source); content-allowlist.json.
Open before building (home reference): components/sections/LegacyStory.tsx (press row with tap to zoom) and its CSS; components/sections/SpacesDesignedAroundCare.tsx (branch cards).

May edit: the components for these sections under components/pages/dr-miftah/ (originals only if OWNED), page.tsx, lib/pages/dr-miftah-content.ts. Anything else: stop and explain.

Do:
1. If components/pages/dr-miftah/ImageLightbox.tsx does not exist yet, create it exactly as PAGE_PLAN.md describes it under SW "Zoom viewer": native dialog, object-fit contain, visible caption, previous and next buttons (44 px), close, Esc and arrow keys, swipe, focus return, scroll lock, data-media-exempt on the enlarged image, 250 ms fade and 0.98 to 1 scale, no motion under reduced motion. If it exists, reuse it unchanged.
2. Section 09 on the dark band recipe: h2 as it is (both lines); labels "Press archive" and "13 clippings · Select to enlarge"; thirteen clippings in a swipe row, each whole (contain) at max-height var(--media-max-h-compact), tap to zoom through ImageLightbox (previous and next move through all thirteen), previous and next row buttons (44 px), a thin progress bar instead of dots, per-clipping red numerals dropped only if allowlisted, side vignette softened to an edge fade. Every clipping and its alt text stays in the DOM.
3. Section 10 on a light band: h2 plain; the sentence "Visit the Mehdipatnam clinic page or the Nampally clinic page, and read the wider practice story on About Neodent." with its three links moved directly under the heading; two cards side by side from 768 px with exterior photograph, interior inset, captions, address, phone (tel:) and "Directions" exactly as now; ADD a line with each clinic's opening hours read from the data source named in DISCOVERY.md "Hours source" (never typed by hand); if no export exists, do not type the hours: append a shared request and note it in the changelog. Remove the empty band in the left card by sizing it to its content. Mobile: one card per clinic, its two photographs as a two-card swipe row.
4. Motion per section 6 of the plan.

Acceptance (checkable):
- content check zero missing (or only allowlisted); thirteen clipping images and their alt text present; both addresses, both phones and all three links present
- no media over 70% of the viewport; no card more than 35% empty; no overflow at 360; tap targets at least 44 x 44 on mobile; no text under 12 px
- zoom works with keyboard (Esc closes, arrows move) and returns focus to the clipping

Verify: run the fast check from Agent rules item 9 with run-id R6, then stop.
Do not: change other sections; do not type clinic hours or phone numbers by hand.
Report: files changed, content check result, audit numbers, screenshot paths with a short description of two or three screenshots.
```

### R7. Photograph wall (new section)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R7 for dr-miftah (/doctors/dr-miftah-ur-rahman): build the new Photograph wall section (SW) in PAGE_PLAN.md section 4, after section 09 and before section 10. This is the owner's priority request. A2 is approved only if the owner has written "A2 approved" on the next line; otherwise skip step 8.

A2 status: (owner edits this line before running)

Read first: PAGE_PLAN.md section 4 "SW. Photograph wall" in full and section 6; PHOTO_INVENTORY.md; OWNERSHIP.md.
Open before building (home reference): components/sections/LegacyStory.tsx and its CSS (photograph radius, border, shadow, caption gradient); components/hero/Hero.tsx layer recipe (dark band); the dark band recipe built in R1; components/pages/dr-miftah/ImageLightbox.tsx if it exists (reuse it unchanged).

May edit: new files components/pages/dr-miftah/PhotoWall.tsx and PhotoWall.module.css, components/pages/dr-miftah/ImageLightbox.tsx and its CSS Module (only if missing), lib/pages/dr-miftah-content.ts, page.tsx (only to mount the section). Anything else: stop and explain.

Do:
1. Add the ten photographs to lib/pages/dr-miftah-content.ts as an ordered array: file name (without extension logic hard-coded: use the real extension from PHOTO_INVENTORY.md), real pixel width and height, and the alt and caption text below, word for word. Use these strings and nothing else:
   1 "Dr. Md. Miftah Ur Rahman, prosthodontist and implantologist, in a treatment room at Neodent Dental Hospital"
   2 "Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital Nampally, Hyderabad"
   3 "Portrait of Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital"
   4 "Dr. Md. Miftah Ur Rahman with Dr. Mohd. Siraj Ur Rahman and Dr. Muti Ur Rahman at Neodent Dental Hospital Mehdipatnam"
   5 "Dr. Md. Miftah Ur Rahman with Dr. Mohd. Siraj Ur Rahman at Neodent Dental Hospital Mehdipatnam"
   6 "Dr. Md. Miftah Ur Rahman with other doctors"
   7 "Dr. Md. Miftah Ur Rahman with MLA Jaffer Hussain Meraj"
   8 "Dr. Md. Miftah Ur Rahman during a treatment at Neodent Dental Hospital"
   9 "Dr. Md. Miftah Ur Rahman in the Department of Prosthodontics"
   10 "Dr. Md. Miftah Ur Rahman receiving an award from Dr. Praneet Manga, Professor, AIMS Institute of Dental Sciences"
   File base name for photograph N is "Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital - photoN" in public/assets/dr-miftah/. Never rename or edit the files. URL-encode the names when building src and href.
2. If ImageLightbox.tsx does not exist, create it as PAGE_PLAN.md describes under SW "Zoom viewer" (native dialog, contain, visible caption, previous and next 44 px buttons, close, Esc and arrow keys, swipe, focus return, scroll lock, data-media-exempt on the enlarged image, 250 ms fade with 0.98 to 1 scale, none under reduced motion). The large image loads only when opened.
3. Build PhotoWall: dark band recipe (gradient, red glow alpha 0.22 to 0.30 behind the wall, masked icon pattern fading before the text); eyebrow "Photographs"; h2 "Dr. Miftah, in photographs."; the supporting line "Ten photographs of Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital in Hyderabad: in the treatment room, with colleagues, in the Department of Prosthodontics and receiving an award. Select any photograph to enlarge it." Then the wall: one ul of ten li, DOM order 1 to 10, each li holding an a (href = original file URL, aria-haspopup="dialog") around a next/image (lazy, no priority, sizes "(max-width: 640px) 34vw, 240px", alt as above, width and height from the data file). Tile style: 1 px hairline border rgba(255,255,255,0.14), radius and shadow copied from the home photo cards, a 44 px minimum tap area.
4. Layout, using only CSS: each tile gets aspect-ratio from its real size and flex-grow equal to that ratio so widths follow aspect ratio and a row has equal heights. Desktop 1280 px and wider: heading block left (about 4 of 12 columns), wall right (about 8 of 12), wall max-width 900 px, two rows of five (photographs 1 to 5, then 6 to 10), row height about 150 to 175 px, gap 8 px, whole section at most 560 px tall at 1366 x 650. 1024 to 1279 px: heading above, wall full width, 5 + 5, row height about 170 to 185 px. 640 to 1023 px: 5 + 5 or 4 + 3 + 3, every row at least two tiles, every tile at least 100 px wide. Under 640 px: rows of 3 + 2 + 2 + 3 (photographs 1 to 3, 4 and 5, 6 and 7, 8 to 10), row height about 120 to 160 px, about 560 px total. Tune row height per breakpoint; if flow-wrapping is unstable use a CSS grid with explicit column spans per breakpoint. No duplicated markup per breakpoint, no horizontal scroll, no slider.
5. Below the wall add one closed native details with the summary "Photograph details" holding a ul of the ten captions in order (text in the server HTML).
6. Click or tap on a tile opens ImageLightbox on that photograph with previous and next across all ten; with JavaScript off the link opens the original file.
7. Motion: heading rise; tiles mask reveal with a 1.04 to 1 settle, stagger about 70 ms in DOM order (total under 800 ms); hover lift 2 px and slight brightening on hover-capable devices only; press state on touch; nothing under reduced motion; no parallax.
8. Only if A2 is approved above: add a new, separate JSON-LD script for an ImageGallery whose associatedMedia lists ten ImageObject entries (contentUrl = absolute URL on https://www.neodentdentalhospitals.com, URL-encoded; caption and name = the alt text). Follow the way page.tsx already renders JSON-LD. Leave existing blocks untouched. Then append a shared request (shell append only) asking for the ten image URLs in the sitemap entry of this page. If A2 is not approved, do neither.
9. Mount the section in page.tsx after section 09 and before section 10.

Acceptance (checkable):
- all ten photographs are in the DOM once, each with the exact alt above, in order 1 to 10, each inside an a with the original file as href; no duplicated images
- at 1366 x 650 the whole section is at most 650 px tall and the ten tiles are visible together without any sideways scroll; row heights between 150 and 175 px; the smallest tile is at least 100 px wide at this size
- at 390 x 844 the wall shows rows 3 + 2 + 2 + 3, is about 560 px tall, has no horizontal overflow at 360, and every tile is at least 44 x 44
- no row has a single tile at any width from 360 to 1920 px (check 360, 390, 768, 1024, 1366, 1920 in screenshots)
- the lightbox opens from a tile, shows the caption, moves previous and next across all ten, closes with Esc and returns focus; the open image is the only element with data-media-exempt
- the page-audit reports no media over 70% of the viewport and no overflow
- node scripts/page-content-check.mjs reports zero missing (the new section adds content; nothing is removed)

Verify: run the fast check from Agent rules item 9 with run-id R7, then stop.
Do not: add a slider or carousel; change any other section; rename or edit any photograph; invent captions; edit shared files (sitemap goes through a shared request).
Report: files created or changed, the row groupings you used per breakpoint and the row heights, content check result, audit numbers, screenshot paths (desktop wall, mobile wall, lightbox) with a short description of each.
```

### R8. Optional FAQ (A3), only if the owner approved it

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R8 for dr-miftah (/doctors/dr-miftah-ur-rahman): add the FAQ section and its FAQPage JSON-LD (approved change A3). Run only if the owner approved A3. Pattern P14.

Read first: PAGE_PLAN.md section 4 (Optional FAQ), section 7; OWNERSHIP.md; DISCOVERY.md (Hours source; how page.tsx renders JSON-LD).
Open before building (home reference): the FAQ pattern in components/treatments/QuestionsContact.tsx (read only; copy the look into this page's own CSS Module).

May edit: new files components/pages/dr-miftah/DoctorFaq.tsx and its CSS Module, lib/pages/dr-miftah-content.ts, page.tsx (mount the section and add the JSON-LD block). Anything else: stop and explain.

Do:
1. Put this exact array in lib/pages/dr-miftah-content.ts (clinic hours may be read from the data source instead of typed, if DISCOVERY.md names one; the text below is the expected result):
   Q1 "Who is Dr. Md. Miftah Ur Rahman?" A1 "Dr. Md. Miftah Ur Rahman is a prosthodontist and implantologist and Assistant Director at Neodent Dental Hospital in Hyderabad, practising at the Mehdipatnam and Nampally clinics. He holds a BDS and an MDS in Prosthodontics & Implantology, along with a FICOI (U.S.A.) fellowship."
   Q2 "What are Dr. Miftah's qualifications?" A2 "Dr. Miftah holds a BDS from Sri Sai College of Dental Surgery, an MDS in Prosthodontics & Implantology from the same college, and a FICOI (U.S.A.) fellowship, and he is a Gold Medallist. He completed his clinical internship at Osmania Government Dental College, Hyderabad."
   Q3 "What is Dr. Miftah's approach to treatment?" A3 "Dr. Miftah's philosophy is to save the natural teeth till the last stage. Much of his day is spent planning before treatment begins, and his work centres on restoring what can be saved and rebuilding what cannot."
   Q4 "Which treatments does Dr. Miftah provide?" A4 "Dr. Miftah's page covers all seven Neodent treatments: composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design, full mouth rehabilitation, and scaling and polishing. His specialist training is most directly applied to saving natural teeth, smile designing, dental implants and full mouth rehabilitation."
   Q5 "Where are Dr. Miftah's clinics and what are their timings?" A5 "Dr. Miftah practises at both Neodent clinics in Hyderabad. Mehdipatnam is open Monday to Saturday, 4:00 PM to 8:00 PM, and Nampally is open Monday to Saturday, 10:30 AM to 5:00 PM. Sunday is a holiday. To book a consultation with a Neodent specialist, call Neodent or send an enquiry."
   Q6 "Does Dr. Miftah teach or publish research?" A6 "Yes. Dr. Miftah is an Assistant Professor in the Department of Prosthodontics at SB Patil Dental College & Hospital, where he teaches and conducts seminars for dental students, and he has published clinical research on implant and prosthetic materials."
   Do not add facts, numbers or promises. In A4 link each treatment name to its treatment page and in A5 link the clinic names to /clinic/mehdipatnam and /clinic/nampally and "send an enquiry" to /contact (links do not change the words).
2. Build DoctorFaq: light band, eyebrow "Questions", h2 "Questions about Dr. Miftah", native details, the first open, no numbering, hairline dividers, chevron, smooth opacity or height on open, motion per Part 8.2. Mount after the Photograph wall and before section 10.
3. Generate the FAQPage JSON-LD from the same array so the text matches the visible text word for word (strip link markup only), as a new separate block in the way page.tsx already renders JSON-LD.

Acceptance (checkable):
- exactly six questions visible; JSON-LD questions and answers equal the visible text
- no aggregateRating; existing JSON-LD and metadata unchanged
- content check zero missing; audit shows no overflow, no tap target under 44 px on mobile, no text under 12 px

Verify: run the fast check from Agent rules item 9 with run-id R8, then stop.
Do not: add questions or reword answers; edit shared files.
Report: files changed, content check result, audit numbers, screenshot paths with a short description.
```

### R9. Motion and polish

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R9 for dr-miftah (/doctors/dr-miftah-ur-rahman): motion and polish pass over the whole page. No new sections, no layout redesign.

Read first: PAGE_PLAN.md section 6 (motion plan); the CHANGELOG.md entries of R1 to R8.
Open before building: components/motion/Reveal.tsx and CountUp.tsx (read only).

May edit: files under components/pages/dr-miftah/ and page.tsx. Anything else: stop and explain.

Do:
1. Go through the page top to bottom against the motion plan table. Every section has at least one visible reveal; add what is missing with Reveal, CountUp or the class-keyed method. Card grids stagger 80 to 120 ms. Key photographs mask-reveal. The education stepper line draws with scroll. Tabs, viewers and the FAQ (if present) open with a small fade and translate.
2. Add hover lift (desktop, hover-capable only) and press states (touch) to cards, buttons and wall tiles. Duration 300 to 700 ms, ease-out, transform and opacity only.
3. Check prefers-reduced-motion: every section shows its final state with no transforms, no zoom, no drift. Check that with JavaScript disabled the page is fully readable (hidden start states are applied by a JavaScript-set class).
4. Audit the red-italic accent: it appears only on the header tagline, the philosophy statement, section 05's "built formally." and section 08's "In their own words." Remove it elsewhere (words and order stay).
5. Audit for banned items: ghost numerals, numbered eyebrows, roman numerals, corner marks, rotated edge labels, meta strips, labels under 12 px, the vertical centre hairline, more than two highlighted phrases in any section. Fix what remains without deleting any text that is not in content-allowlist.json.

Acceptance (checkable):
- content check zero missing (or only allowlisted)
- a list in the changelog of every section with its reveal type
- no continuous animation on phones; reduced motion verified
- audit: no overflow, no media over 70%, no tap target under 44 px on mobile, no text under 12 px

Verify: run the fast check from Agent rules item 9 with run-id R9, then stop.
Do not: add libraries, animate layout properties, change copy.
Report: files changed, the section and reveal list, content check result, audit numbers, screenshot paths.
```

### R10. Final fast check and screenshots

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/dr-miftah/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/dr-miftah/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/dr-miftah/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R10 for dr-miftah (/doctors/dr-miftah-ur-rahman): final fast check and screenshots. Fix only what the checks find, within the files you own.

Do:
1. Walk through the page top to bottom in the dev server screenshots at 1366x650 and 390x844. For each section confirm: it follows the pattern in PAGE_PLAN.md section 4; there is a visible on-scroll reveal; no card is more than 35% empty; no media is over 70% of the viewport; nothing overflows at 360. For the Photograph wall also confirm: all ten photographs visible together at 1366x650 with the section at most 650 px tall; rows 3 + 2 + 2 + 3 on a 390 px phone; the zoom viewer opens, moves and closes.
2. Confirm the philosophy statement: the page shows "Save the natural teeth till the last stage." and nowhere shows "even when it is mobile" (grep your owned files and the rendered page).
3. Run the fast check from Agent rules item 9 with run-id final. Allow at most two fix-and-recheck cycles.
4. Save full-page desktop (1440 wide) and mobile (390 wide) screenshots as .audit/dr-miftah/final/desktop-full.png and mobile-full.png (the audit script's full-page shots are acceptable). Print their absolute paths.
5. Write the final CHANGELOG.md entry: files changed in the whole page redesign (the owner uses it to commit by path), content check result, audit numbers, forks made, shared-change requests, open questions, and anything not done.

Do not: add new design work, build, run Lighthouse or deep tests, start servers, or use git write commands.
Report: pass or fail per check, the screenshot paths, the open items.
```

---

## 11. Acceptance and rating rubric

The owner reviews screenshots in the Claude chat. The chat rates each of these out of 10 for desktop (1366 and 1440) and mobile (390), target **9 to 9.5**:

1. **Content**: nothing missing (the check reports zero), every image and link present, the old philosophy sentence gone and replaced by "Save the natural teeth till the last stage."
2. **Design language**: matches the home page (type, palette, cards, photographs); no ban-list items; red italic accent only where allowed; no empty cards.
3. **Photograph wall**: all ten photographs visible together, within one laptop viewport height, small but clearly visible, neat on mobile (3 + 2 + 2 + 3), zoom works, looks lit and deliberate rather than a grid of thumbnails.
4. **Media**: nothing over 70% of the viewport; documents whole; videos obey the rules.
5. **Mobile**: order, tap targets, no overflow, no long stacks of large images, swipe rows peek.
6. **Motion**: every section reveals; calm; reduced motion respected; readable with JavaScript off.
7. **SEO, AEO, GEO**: one h1, links kept and added, alt text, metadata unchanged except A1 (and A2, A3 if approved), hours and facts from single sources.

---

## 12. Open owner questions

Nothing below is guessed in the plan.

- **Q1. Mobile screenshot.** None was supplied. Send a 390 px full-page screenshot after R1 or R2 so mobile can be rated against the real page.
- **Q2. A1 scope.** The old sentence is replaced everywhere on this page, including metadata or JSON-LD if it occurs there (R0 reports where). Confirm. If it occurs in a shared file, a shared request is logged.
- **Q3. More photographs.** The folder also holds photographs that are not on your sheet, for example two taken at the Department of Prosthodontics at SB Patil Dental College (one at a seminar). Do you want any of them on the wall? The wall data is an array, so adding two more (6 + 6 on desktop) is a small change, but they need captions from you.
- **Q4. Caption facts.** Please confirm: (a) the institute name "AIMS Institute of Dental Sciences" (your sheet says "AIMS institute of Dental Science") and what the award in photograph 10 was for; (b) photograph 2 is at the Nampally clinic; (c) who the "other doctors" in photograph 6 are, and whether they are Neodent doctors; (d) the spelling "Jaffer Hussain Meraj" and that you are happy to name the MLA on the page; (e) that the name in photographs 4 and 5 may be written "Dr. Mohd. Siraj Ur Rahman" (the standard's required spelling) instead of "Dr. Siraj Ur Rahman". Also confirm permission from the people shown to publish the photographs.
- **Q5. A2 and A3.** A2: a hidden `ImageGallery` structured-data block for the ten photographs plus image entries in the sitemap (helps Google Images). A3: a visible six-question FAQ with FAQ schema (section 4 and R8). Approve each, or skip.
- **Q6. Films.** Which of the five films have speech (so they get a sound button)? And which films open in a viewer and which play in place (R0 will report what it finds).
- **Q7. Header actions.** The header gets the standard pair "Call for Consultation" and "Send an enquiry". The existing "View Clinical Specialties" and "Read PubMed Articles" stay as smaller text links. Confirm.
- **Q8. Decorative text removals.** After R0, review `ALLOWLIST_PROPOSAL.json` (numerals, "Neodent · Hyd", "Scroll", the ghost "DR") and save the lines you approve as `content-allowlist.json`. Anything not approved stays as plain 12 px text.
- **Q9. Clinic hours.** Section 10 gets the opening hours added from the data sources. Confirm that adding them there is wanted.
- **Q10. Wall position.** The wall sits after 09 Recognition and before 10 Where to find him. Say if you prefer another place (for example right after 02 Biography).

---

## 13. Appendix: Agent rules

In this plan `<slug>` means `dr-miftah` and the route is `/doctors/dr-miftah-ur-rahman`. The rules below are pasted verbatim from the standard (Appendix A).

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
