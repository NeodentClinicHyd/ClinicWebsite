# PAGE_PLAN: About (`/about`)

Save as `docs/internal-pages/about/PAGE_PLAN.md`. Written against *NeoDent Internal Pages: Global Design and Execution Standard*, Version 1 (30 Oct 2026).

---

## 0. Header

| Field | Value |
|---|---|
| Page | About |
| Route | `/about` |
| Slug | `about` |
| Placeholder key | Wherever the standard or the Agent rules (section 13) say `<slug>` read `about`; wherever they say `<route>` read `/about`. The prompts below already have these filled in. |
| Family (11.4) | None of its own. `/about` renders `ContactNextStep` through `AboutClientChrome` (both read-only). It links to a press archive page ("View full archive"); that route is read-only for this session. It can run beside any other page session. It must not run beside a session that forks the same component it forks (R0 confirms the list). |
| Model | Sonnet 5.5, in Kiro CLI |
| Dev server | The owner's server must be running at `http://localhost:3000` and `/about` must return 200. If not, the agent stops and says so. |
| Date | 31 Oct 2026 |
| Status | **Final (v2).** Draft 1 was cut off by a usage limit. It was cross-checked against the standard (structure complete, Appendix A and the preamble verbatim) and then re-read against the screenshots at full resolution. Several wrong readings were corrected (see 0.1). Ready to run once the owner ticks the boxes in section 12. |

**How the screenshots were read.** Both are full-page captures (desktop about 1440 px, mobile 375 px) and were read at full resolution, so headings, copy, captions, card contents, photo counts and section tones are verified from them. Things a still image cannot show are still marked **(R0 to confirm)**: exact text sizes, tap-target sizes, alt text, link targets, motion, schema, whether text is in the DOM or CSS, and what is inside any embedded player. Nothing is guessed into the content map: blocks are named, not rewritten.

### 0.1 What changed from Draft 1 (for the owner)

1. **Section tones were wrong.** Live page: S3, S5, S7/S8 and S11 are beige, S4, S6, S10 and S12 are ivory, only S9 is dark. Draft 1 described S4 and S6 as dark. The target rhythm (dark and light alternating) is unchanged, but the prompts now say "restyle to" instead of assuming the current tone.
2. **The "red band" is a red text card** inside a beige band (S7), not a full-width band. D1 is reworded.
3. **The page header has no action buttons today** (desktop or mobile). The standard (3.5) requires the action pair there, so it is now a standard-required addition, not "keep the live labels".
4. **The header already has an eyebrow** ("Established 1994 · Hyderabad") and its copy already carries "Neodent Dental Hospital", "Hyderabad" and "1994". Draft 1 would have replaced the eyebrow (a deletion) and added a redundant line. Fixed; A1 is no longer needed.
5. **S2 is a label plus three facts** ("At a glance", "Since 1994 in Hyderabad", "2 clinics", "25,000+ patients treated"), not a logo cell.
6. **S6 has four cuttings** (one large, three below) plus a "View full archive" link and the label "16 press items in the archive". Every cutting already has a headline caption and a publication and place line. Draft 1 missed the archive link and wrongly said publication names were missing.
7. **S8 is the closing row of the S7 band**: the statement plus the "Recognition ceremony" photo. So S7 has one photo (the awards cabinet), not two.
8. **S9 is not four cards.** It is **ten** playlist items (titles with category labels) and a video player (the desktop right half is blank in the capture, and the first mobile card shows a video poster). Draft 1 designed a four-card swipe row, which would have broken it.
9. **S10 has two photos and two cuttings**, not three photos. **S11 has two photos** (Mehdipatnam lounge, Nampally reception), plus two clinic cards with locality and phone.
10. **"Md." versus "Mohd." is not an error.** They are two different people (Dr. Mohd. Siraj Ur Rahman, founder; Dr. Md. Miftah Ur Rahman, Assistant Director). Q6 is rewritten. A real mismatch was found instead: see Q6b in section 12.
11. Decorative devices found and added to the removal list: faint grid lines on the header and beige bands, the red offset frame around the S1 photo, the "1994" watermark.
12. Numbering fixed (S13 is the optional FAQ, S14 is the consultation block everywhere). R8 now lists the files it may edit, as the standard requires.

---

## 1. Page facts

**Purpose.** The story and proof page. It tells a visitor who stands behind Neodent Dental Hospital: the practice since 1994, the founder and his specialist career, the doctor who carries the experience forward, the press and recognition that back it up, the public work for dental awareness, the community presence, and the two clinics today.

**Audience.**
- About 80% mobile patients in Hyderabad checking whether to trust the hospital before they call.
- Referrers, press and other clinics looking at the site as a showcase (the site is judged against that).

**Search intent and target queries** (only approved phrases and what the page already says):
- Neodent Dental Hospital Hyderabad, about Neodent dental hospital
- dental hospital in Hyderabad since 1994
- Dr. Mohd. Siraj Ur Rahman, Neodent founder
- dental hospital Mehdipatnam, dental hospital Nampally

**Conversion goal.** A call (primary: "Call for Consultation") or an enquiry ("Send an enquiry" to `/contact`). Secondary paths: the clinic pages, the doctors pages, the treatments pages.

**Facts that apply here (Part 1 of the standard).** Founded 1994. Mehdipatnam Mon to Sat 4:00 PM to 8:00 PM; Nampally Mon to Sat 10:30 AM to 5:00 PM; Sunday holiday. Founder name in any new text: Dr. Mohd. Siraj Ur Rahman. Consultations are with "a Neodent specialist". Dr. Muti Ur Rahman is MBBS / MD (General Medicine), never a dental specialist. The Madina Gold Medal (2023, awarded by Commissioner A. K. Khan) is approved for use. Do not add "Smile Designer". Lead with "dental hospital".

---

## 2. Screenshot findings

Scores are provisional, out of 10, from the screenshots only.

### 2.1 Cross-page findings

1. **The red-italic accent phrase is on almost every heading**: the page header, "experience", "specialist care", "carried forward", "can be seen", "over time", "The work continues", "better dental care", "wider community", "today", and the footer line. The standard allows it on the main heading and at most one section in three. This is the biggest design-language miss.
2. **Walls of text.** S3, S4, S5, S6, S9, S10 and S11 carry long two-column copy at equal weight, with no visible lede and no depth layer.
3. **Media runs on mobile.** S4 portrait, S5 treatment photo, S6 cuttings, S7 awards photo and S8 ceremony photo arrive as long vertical runs of large images (breaks "two large images never stack" and the 70% rule; R0 audit confirms numbers).
4. **Cuttings.** They already have captions (a headline label, then "The Siasat Daily" with a place). Only the large one in S6 is legible; the others are small and unevenly arranged; no visible zoom. The standard wants them whole, `contain`, tap to zoom.
5. **Ghost "1994"** sits behind the S3 heading on desktop and mobile. Banned (giant ghost numerals).
6. **Other decorative devices on the ban list or off recipe:** faint grid lines across the header and the beige bands (draft lines); a red offset frame around the S1 photo; a red full-colour text card in S7 (red is for buttons). The small uppercase labels in cards (FOUNDED, QUALIFICATIONS, LOCALITY, category labels) look near 11 px **(R0 to confirm sizes)**.
7. **Band rhythm (live).** S1 dark, S2 light strip, S3 beige, S4 ivory, S5 beige, S6 ivory, S7 and S8 beige, S9 dark (with the icon pattern), S10 ivory, S11 beige, S12 ivory, consultation dark, footer dark. Only one dark band in the body, so the page reads as flat and light. The target rhythm is in section 4.
8. **Missing or weak:** no action buttons in the page header; S12 cards are more than 35% empty; S9 desktop shows an empty right half in the capture (the player did not render; R0 finds out why and what it is).
9. **Good already:** consistent paper surfaces, serif headings, real photography and press, the two clinic cards, the consultation block, strong credentials in the S4 and S5 cards, captions on almost every image.
10. **Cannot be judged from screenshots:** on-scroll motion, hover and press states, exact text sizes, tap targets, alt text, link targets, `<details>`, JSON-LD, whether the "1994" is text or CSS, the S9 player, and whether text is identical on mobile and desktop (one possible difference: the S9 first item shows a description on mobile).

### 2.2 Section by section

| # | Section (as read) | Desktop | Mobile |
|---|---|---|---|
| S0 | Navigation and footer | Global. Out of scope. | Global. Out of scope. |
| S1 | Page header: eyebrow "Established 1994 · Hyderabad", "Decades of changing smiles. A legacy that continues.", supporting copy, photo of Dr. Md. Miftah Ur Rahman with a caption below | **6.** Strong hierarchy and a good photo, but no action buttons, a red offset frame and grid lines as decoration, and the caption is plain text under the photo. | **5.** Photo is small and left-aligned; no actions; caption below. |
| S2 | Fact strip: "At a glance", Since 1994 in Hyderabad, 2 clinics, 25,000+ patients treated | **6.** Right pattern, calm. No count-up, small type. Light card strip on ivory. | **6.** Three facts in a row, small text **(R0 to confirm sizes)**. |
| S3 | "A practice shaped by experience." Facts card (Neodent Dental Hospital: Founded, Founder, Clinics, First practice) and four paragraphs | **5.** Ghost "1994", grid lines, three different emphasis styles (underline, pink mark, red bold), the last two paragraphs in a wall of two columns. | **5.** Long run; card pushed in the middle. |
| S4 | "A career built on specialist care." Founder card (30+ years; Qualifications; Specialism; Academic post; Oversees), portrait, five paragraphs | **6.** Good ingredients, dense; red italic repeated; portrait is a cut-out on black with one rounded corner. | **5.** Card, big portrait, then a long copy run. |
| S5 | "Experience carried forward." Treatment photo ("In practice"), Dr. Md. Miftah Ur Rahman card with "View profile", two paragraphs | **6.** Good photo and card; red italic repeated; patient's face is already pixelated (keep). | **5.** Large photo then card then copy. |
| S6 | "A history that can be seen." Two paragraphs, "View full archive", "16 press items in the archive", four cuttings with captions | **5.** One large cutting and three smaller of very different sizes; labels small. No visible zoom. | **3.** Cuttings stack at full width; worst section on mobile. |
| S7 | "Recognition earned over time." Red text card and awards photo ("Institutional recognition") | **6.** Strong content; red card is off the palette recipe; large gap inside the card. | **4.** Red card then a large photo. |
| S8 | "A legacy is built over time. The work continues." and the "Recognition ceremony" photo | **5.** A heading with a photo; no supporting text; closes the S7 band. Good candidate for the one seam card. | **5.** Heading then a large photo. |
| S9 | "A voice for better dental care." Two paragraphs, h3 "A public conversation about dental care.", ten items with category labels, a video player | **5.** Ten items in a two-column grid on the left, and an empty right half in the capture. | **6.** Featured video card then nine compact rows; works, long column. |
| S10 | "A presence in the wider community." Three paragraphs, two photos (Republic Day address, Television), two cuttings | **6.** Reasonable composition; media sizes uneven; red italic repeated. | **3.** Photos and cuttings stacked. |
| S11 | "Neodent today." Three paragraphs, two clinic cards (locality, phone), two photos (Mehdipatnam waiting lounge, Nampally reception) | **6.** Right idea; photos uneven; red italic repeated. | **5.** Cards then two photos side by side; fine but cramped. |
| S12 | Three cards: Explore our expertise, Visit our clinics, Meet our clinical team | **5.** Cards are mostly empty space (over 35%). | **5.** Same. |
| S14 | Consultation block "Book a consultation" (hours, phones, form) | Shared (`ContactNextStep`). Not rated. | Shared. Not rated. |

**Overall rating (provisional): desktop 6 / 10, mobile 5 / 10.** Target 9 to 9.5.

---

## 3. Content map

Everything listed here must survive. Counts come from the screenshots; R0 verifies this map against the real page (`DISCOVERY.md`) and records differences. Text blocks are named, never rewritten.

| # | Heading(s) | Text blocks | Images / media | Links, buttons, forms |
|---|---|---|---|---|
| S1 | h1 "Decades of changing smiles. A legacy that continues." (assumed h1, R0 confirms); eyebrow "Established 1994 · Hyderabad" | Supporting copy under the h1 (one paragraph) | Photo of Dr. Md. Miftah Ur Rahman at a microscope, with caption lines: name, "Prosthodontist & Implantologist", "Assistant Director · Neodent" | None today. Action pair is added (section 5). |
| S2 | Label "At a glance" | Three facts: "Since 1994 / in Hyderabad", "2 / clinics", "25,000+ / patients treated" | None | None |
| S3 | "A practice shaped by experience." | Four paragraphs; facts card: title "Neodent Dental Hospital", sub-label "Specialist-led dental care", rows Founded (1994), Founder (Dr. Mohd. Siraj Ur Rahman), Clinics (Mehdipatnam and Nampally), First practice (Mehdipatnam, Hyderabad); ghost "1994" (R0: text or CSS) | None | Inline links in the copy, if any (R0 lists) |
| S4 | "A career built on specialist care." | Founder card: "Dr. Mohd. Siraj Ur Rahman", "Founder · Director · Neodent", "30+ years of experience", rows Qualifications (BDS · MDS (Chennai) · FCIP), Specialism, Academic post, Oversees; five paragraphs | Founder portrait with caption "Dr. Mohd. Siraj Ur Rahman / Founder · Director · Neodent" | Link "Neodent's clinical expertise" in the copy |
| S5 | "Experience carried forward." | Doctor card: "Dr. Md. Miftah Ur Rahman", "Assistant Director · Neodent", Specialism, Academic post (Assistant Professor, SB Patil Dental College & Hospital), Practising at; two paragraphs | Treatment photo, caption "Dr. Mohd. Siraj Ur Rahman & Dr. Md. Miftah Ur Rahman / In practice" (patient's face pixelated; do not alter) | Red button "View profile" (target R0) |
| S6 | "A history that can be seen." | Two paragraphs; "16 press items in the archive"; captions on each cutting | Four Siasat Daily cuttings with captions: one large (publication line "The Siasat Daily, Hyderabad"), "Front-page dental care feature" (Mehdipatnam), "Dental implant awareness camp" (Nampally), "Orthodontic treatment feature" (Nampally) | "View full archive" link (target R0); links in the copy, if any |
| S7 | "Recognition earned over time." | One paragraph in the red card (certificates, mementos and professional recognitions); caption on the photo | Awards cabinet photo, caption "Institutional recognition / Neodent Dental Hospital" | None visible |
| S8 | "A legacy is built over time. The work continues." (heading only) | Photo caption | Ceremony photo, caption "Recognition ceremony / Dr. Md. Miftah Ur Rahman" | None visible |
| S9 | "A voice for better dental care."; h3 "A public conversation about dental care." | Two intro paragraphs; **ten** items, each a title plus a category label (Dental education, Media / dental care, Oral health awareness); the first item also has a description on mobile ("... discusses common dental problems ...", R0 to record the exact text) | A video player (R0: what, which provider, poster, in server HTML or not) | Ten item links or buttons (R0 lists href, `rel`, external or not) |
| S10 | "A presence in the wider community." | Three paragraphs; captions | Two photos ("Republic Day address", "Television"; the first has caption text drawn over the image) and two cuttings ("Dental awareness feature", "Clinical team coverage") | Links in the copy, if any |
| S11 | "Neodent today." | Three paragraphs; two clinic cards (name, locality, phone) | Two photos: "Mehdipatnam / Waiting lounge", "Nampally / Reception" | Links in the copy ("our clinical expertise", "our clinics page" and others), clinic card links, phone `tel:` links |
| S12 | Three-item row | "Explore our expertise / What Neodent treats.", "Visit our clinics / Both locations in detail.", "Meet our clinical team / The wider Neodent clinical team." | None | Three links (targets R0) |
| S13 | (Optional, owner approval, A6) FAQ | New | None | None |
| S14 | "Book a consultation" | Intro line; clinic hours and phones | None | Lead form: read-only, via `AboutClientChrome` |
| S0 | Footer "Changing smiles since 1994." | Global | Global | Global |

Metadata, canonical, Open Graph, sitemap entry and every JSON-LD block in `app/about/page.tsx` are content units too: **byte-identical** unless section 7 names an approved addition.

---
## 4. Target layout, section by section

**Band rhythm (restyle only, section order unchanged):** dark S1 + S2 → light S3 → dark S4 → light S5 → dark S6 → light S7 → seam card S8 (straddling S7 and S9) → dark S9 → light S10 → dark S11 → light S12 (and the optional FAQ, light) → consultation (dark) → footer (dark). Never more than two dark bands in a row. Every dark band uses the layer recipe in 3.6, copied into the page's own CSS Module. "Light" means plain paper (ivory or surface), with no grid lines.

**Red-italic rule.** Keep it on the S1 `h1`. Allow it on S4, S7 and S10 only (one section in three), on the exact words that carry it today. S3, S5, S6, S8, S9, S11, S12 and the FAQ headings become plain ink or ivory. The words never change.

**Eyebrows (addition A3).** Plain words, 12 px or more, never numbered: S3 "Our practice", S4 "Our founder", S5 "Our doctors", S6 "In the press", S7 "Recognition", S9 "Dental awareness", S10 "In the community", S11 "Our clinics". The S1 eyebrow already exists ("Established 1994 · Hyderabad") and stays exactly as it is.

**Inline emphasis.** The live copy uses three emphasis styles (underline, pink mark, red bold). The words never change. In the restyle, at most two emphasis marks per section, none in dark body text; the rest becomes plain text with the same words.

**Lede and depth.** In every text-heavy section the first one or two paragraphs stay visible and the rest go into one native `<details>` whose full text is in the server HTML. Summary label: "Read more" (UI text, not content). No paragraph is shortened or reworded.

**Copying text.** Text is moved by import or copy from the existing source, never retyped.

**Decorative devices removed in the new components** (the old files are not edited): faint grid lines, the ghost "1994" styling, the red offset frame around the S1 photo, the red text card. Content inside them stays.

### S1 Page header (P1) · S2 Fact strip (P2)
- **Copy:** `components/hero/Hero.tsx` and its CSS (layers, glass cards, class-keyed load animation); `ExperienceIntro.tsx` stat strip with `CountUp`.
- **Desktop:** two columns on the dark band. Left: breadcrumb (A2), the existing eyebrow, `h1` (unchanged), the existing supporting copy, the action pair (added, see section 5). Right: the photo of Dr. Md. Miftah Ur Rahman with the existing caption lines in a dark glass card at the bottom of the photo. S2 sits directly under as a dark strip with a hairline top, one row: the "At a glance" label cell, then three equal fact cells. `CountUp` on "2" and "25,000+"; "Since 1994" is static text (the year is never counted).
- **Mobile:** breadcrumb, eyebrow, `h1`, supporting copy, primary action, secondary action, then the photo at most 38dvh, then the caption card, then the strip (label on its own row, then the three facts in one row if they fit at 360, otherwise two and one). Headline and primary action are inside the first 844 px.
- **Media:** `priority` on this photo only; `object-fit: cover` with a focal point on the face; `max-height: var(--media-max-h)` on desktop; `aspect-ratio` set.
- **Empty-card check:** the caption card hugs its text; the strip cells fill their height.
- **Motion:** per 8.2 page header row; strip cells rise with 100 ms stagger; `CountUp` on the numeric facts.
- **SEO:** `h1` unchanged. The supporting copy already carries "Neodent Dental Hospital", "Hyderabad" and "1994" (R0 confirms), so A1 is not needed. Alt text kept.

### S3 A practice shaped by experience (P3 lede and depth)
- **Copy:** `ExperienceIntro.tsx` "Care begins", `LegacyStory.tsx`. Band: light paper.
- **Desktop:** heading and the first two paragraphs left, in one reading column (65 to 72 characters). The "Neodent Dental Hospital" facts card right, as a light card (surface fill, hairline, soft shadow, radius from `ClinicalLeadership.module.css`) with its rows as a `<dl>` and the sub-label kept. The other two paragraphs go in a `<details>` under the column.
- **Mobile:** heading, first paragraph, facts card, second paragraph, `<details>` with the rest. Section no taller than about two and a half screens collapsed.
- **Remove:** the ghost "1994" styling. If it is real text in the DOM it stays in the DOM until the owner approves an allowlist entry (Q5).
- **Empty-card check:** the facts card fills at least 65% of its height; otherwise shrink it to its content.
- **Motion:** heading `rise`, paragraphs `rise`, card `fade`, rows stagger 80 ms.
- **SEO:** keep every link and anchor in the copy. At most two emphasis marks in the section.

### S4 A career built on specialist care (P5 split, dark)
- **Copy:** `LegacyStory.tsx` split, hero glass-card recipe. Band: dark (live page is ivory; this is a restyle).
- **Desktop:** portrait left (founder photo, `cover`, focal point on the face, capped at `--media-max-h`, caption on a dark gradient at the bottom; the portrait is a cut-out on a black matte, so check that its edges sit cleanly on the dark band). Right: heading, first paragraph, the founder card as dark glass (`rgba(16,21,23,0.72)`, 1 px `rgba(255,255,255,0.12)`, radius 0.35rem) with the rows as a `<dl>`; "30+" years of experience keeps its place in the card and uses `CountUp` if it can render the "+" exactly (otherwise static text). The other paragraphs go in a `<details>` below, two columns on desktop. No highlights in dark body text.
- **Mobile:** heading, first paragraph, portrait at most 38dvh with caption, founder card, `<details>` for the rest.
- **Empty-card check:** label and rows fill the card; no tall dark card with three short rows.
- **Motion:** portrait mask reveal with a 1.04 to 1 settle (optional parallax of at most 24 px, desktop only), card rises, heading `rise`.
- **SEO:** founder name in the form already on the page. Credentials exactly as written (BDS · MDS (Chennai) · FCIP). The link "Neodent's clinical expertise" keeps its target. No "Smile Designer".

### S5 Experience carried forward (P5 mirrored + P10 card, light)
- **Copy:** `LegacyStory.tsx` mirrored, `ClinicalLeadership.tsx` doctor card. Band: light.
- **Desktop:** treatment photo left (`cover`, focal point on the hands and patient, capped), caption below the photo (light band). Right: heading, first paragraph, the doctor card in the `ClinicalLeadership` card style with the red "View profile" button kept under the card. The second paragraph goes in a `<details>` only if it measures long enough to need it; otherwise it stays visible.
- **Mobile:** heading, first paragraph, photo at most 38dvh, doctor card, button, rest.
- **Photo:** the patient's face is already pixelated. Do not crop, filter or replace it in a way that reveals or alters that; patient photo consent wording lives in `/privacy-policy`.
- **Names:** "Dr. Mohd. Siraj Ur Rahman" and "Dr. Md. Miftah Ur Rahman" are two different people; keep each spelling exactly as written.
- **Motion:** photo mask reveal, card rise, heading `rise`.
- **SEO:** the doctor link keeps its anchor and target. The quote "Save the natural teeth till the last stage." stays exact wherever it exists.

### S6 A history that can be seen (P12 document and press, dark)
- **Copy:** `LegacyStory.tsx` press row; hero slide 3 plates. Band: dark (live page is ivory; restyle).
- **Desktop:** heading, first paragraph (rest in a `<details>` if long), "View full archive" and "16 press items in the archive" kept together under the text. All four cuttings on paper-coloured plates, `object-fit: contain`, whole, same height cap, hairline border, soft shadow: the large one beside the text, the other three in an even row under it. Tap or click opens the lightbox (new `DocumentViewer`, below). The existing two-line caption of each cutting (headline, then publication and place) sits on the plate.
- **Mobile:** one swipe row (`overflow-x: auto; scroll-snap-type: x mandatory`), cards 82 to 88% wide so the next one peeks, progress dots (no "02 / 03" counters), keyboard accessible. All four cuttings in the DOM, never stacked. The archive link sits right under the row.
- **`DocumentViewer`:** a small client component in `components/pages/about/` (focus trap, Escape to close, next and previous, caption and alt shown, no new library). Written once in R3, reused in S10.
- **Empty-card check:** plates sized to the cutting's aspect ratio, not a fixed tall box.
- **Motion:** heading `rise`, plates `stagger` rise at 80 ms, lightbox crossfade.
- **SEO:** every cutting keeps its `alt` (never shorter). If an alt is missing, list it in `CONTENT_QUESTIONS.md`; do not invent a publication name or date.

### S7 Recognition earned over time (P5 split, light)
- **Copy:** `LegacyStory.tsx`, `SpacesDesignedAroundCare.tsx`. Band: light.
- **Desktop:** the text card on the left (the paragraph is short, so it stays visible; the card becomes a light surface card with hairline and soft shadow if D1 is ticked), the awards photo right (`cover`, focal point on the shelf of trophies, capped) with its caption below it.
- **Mobile:** heading and paragraph, then the awards photo at most 38dvh with caption.
- **D1:** if the owner leaves D1 unticked, keep the red card as the live page has it and apply every other rule inside it.
- **Motion:** photo mask reveal, heading `rise`.
- **SEO:** the wording of the paragraph and captions stays exactly as written. If the owner ticks A7 and supplies the wording, that line is added (see section 12).

### S8 A legacy is built over time (P4 seam card)
- **Copy:** `SeamCard.tsx`. Used once on the page.
- **Layout:** one card overlapping the boundary between S7 (light) and S9 (dark). It holds the statement (as a heading element, as today) and the "Recognition ceremony" photo with its caption in the card's side column (`cover`, at most 38dvh on mobile). The card has no invented supporting text.
- **Motion:** card rises once.
- **SEO:** the statement stays inside a heading element. The photo caption and alt stay.

### S9 A voice for better dental care (video playlist, dark; adapts P7 and P9)
- **Copy:** `PatientStories.tsx`, `ClinicalLeadership.tsx`, hero dark glass cards. Band: dark with the 3.6 layers (the live band already shows the icon pattern; copy the recipe instead of the live CSS).
- **Why not a swipe row:** the section is a selectable playlist of ten items beside a player. Ten items in a swipe row would hide most of them. Compact rows are kept.
- **Desktop:** left: heading, the two intro paragraphs, the h3, then the ten items as compact dark-glass rows in a single column or a two-column grid, equal height, with the category label and the arrow. Right: the player in a dark glass frame, `max-height: var(--media-max-h-compact)`, sticky while the list scrolls, filling the half that is empty today. The selected item shows the active state it shows today.
- **Mobile:** intro, the featured player card (poster, category label, title, description), then the other nine items as compact rows (each at least 44 px tall). No decorative extras.
- **Mechanism:** keep how the player and the items work today (R0 records: embed or file, provider, whether the items are links or buttons that swap the player, whether the markup is in the server HTML). Restyle the container only. Never autoplay. If it is an iframe, add `loading="lazy"` and a `title` only if missing.
- **Empty-card check:** rows are sized to their content and are at least 65% filled; every item present in the DOM.
- **Motion:** heading `rise`, rows `stagger` 60 to 80 ms, active-state crossfade, hover lift on desktop, press state on touch.
- **SEO:** external links keep `href`, anchor text and `rel`. The h3 text stays exact.

### S10 A presence in the wider community (P5 + P7 + P12, light)
- **Copy:** `LegacyStory.tsx`, `SpacesDesignedAroundCare.tsx`, `PatientStories.tsx`. Band: light.
- **Desktop:** left: heading, first paragraphs, `<details>` for the rest. Right: the two photos side by side as a capped mosaic (Republic Day address as the lead, Television smaller; `cover`, focal points). Below: the two cuttings on plates through `DocumentViewer` (`contain`, whole).
- **Mobile:** text, then one swipe row for the two photos, then one swipe row for the two cuttings. Every item in the DOM; never stacked. The text drawn over the Republic Day photo is kept (R0 reports whether it is DOM text or part of the image).
- **Motion:** photos mask reveal with 100 ms stagger, cuttings rise.
- **SEO:** alt text and captions kept.

### S11 Neodent today (P5 + P15 clinic cards, dark)
- **Copy:** `SpacesDesignedAroundCare.tsx` (branch cards), `ClinicalLeadership.tsx` card style. Band: dark (live page is beige; restyle).
- **Desktop:** left: heading, the three paragraphs with their links, then the two clinic cards (Mehdipatnam, Nampally) as dark glass cards with locality, phone `tel:` link and the existing arrow link. Right: the two photos ("Waiting lounge", "Reception") as a capped pair with captions (`cover`, focal points).
- **Mobile:** heading, copy, the two clinic cards stacked (compact; allowed), then the two photos as one swipe row (each at most 38dvh).
- **Opening hours (A4):** only if ticked, read from `lib/clinic-data.ts`. The consultation block right below already shows the hours, so A4 is optional.
- **Motion:** photos mask reveal, cards `stagger` 100 ms.
- **SEO:** each clinic link keeps its anchor and goes to `/clinic/mehdipatnam` or `/clinic/nampally`. Names, phones and addresses only from the single sources.

### S12 Cross-link band (P15, light)
- **Copy:** `Expertise.tsx` cards, compact.
- **Layout:** the three existing items as compact cards in one row (stacked on mobile), each sized to its content (today they are more than 35% empty), descriptive anchors unchanged. A5 adds links to the treatments hub, the doctors page and the contact page, if ticked.
- **Motion:** cards `stagger` 80 ms.
- **Last body section before the consultation block must be light.**

### S13 FAQ (P14, optional, addition A6)
- Native `<details>`, first open, no numbering, hairline dividers, chevron, smooth open. Four questions built only from facts already on the site (founder and year; clinics and hours; the seven treatments; recognition). Each answer: one direct sentence, then one or two supporting sentences. `FAQPage` JSON-LD generated from the same array in `lib/pages/about-content.ts`, matching the visible text word for word. Light band, placed after S12.

### S14 Consultation block (P16)
- `ContactNextStep` through `AboutClientChrome`. Import only. Confirm the band before it is light.

---

## 5. Page header spec

- **Breadcrumb (A2):** "Home / About", visible, `Home` links to `/`. 12 px or more. Only if ticked.
- **Eyebrow:** the existing "Established 1994 · Hyderabad", unchanged. Do not add or swap an eyebrow.
- **h1:** unchanged: "Decades of changing smiles. A legacy that continues." (R0 confirms the exact text; the red-italic accent stays here.)
- **Supporting copy:** the existing paragraph stays in full. It already carries "Neodent Dental Hospital", "Hyderabad" and "1994". No extra line is needed (A1 is closed).
- **Actions (standard-required addition, no box to tick):** the live header has no action buttons. The standard (3.5) puts the action pair in every page header. Primary red "Call for Consultation" linking to `ctaTelPhone` (display `ctaPhone`); secondary outline "Send an enquiry" to `/contact`. Log them in the changelog as additions. The global "Talk to Neodent" button in the navigation is not touched.
- **Media and card:** the existing photo of Dr. Md. Miftah Ur Rahman; its caption lines (name, "Prosthodontist & Implantologist", "Assistant Director · Neodent") in a dark glass card at the bottom of the photo, fading up at 450 ms. No second card. The red offset frame is not carried over.
- **Backdrop layers (3.6):** charcoal to `#0f1315` gradient; red radial glow (alpha about 0.30) with custom properties for its centre; dental icon pattern as `mask-image` over an ivory fill, faded to zero before the text column; content. No grid lines. Glow breathing and pattern drift only at 768 px and wider, off under reduced motion.
- **Mobile order:** breadcrumb, eyebrow, h1, supporting copy, primary, secondary, photo (at most 38dvh), glass card, then S2.

---

## 6. Motion plan

| Section | Elements | Variant | Stagger | Notes |
|---|---|---|---|---|
| S1 | h1 lines, supporting copy, actions, photo, glass card | Class-keyed load animation (as the hero) | 100 ms; card at 450 ms | Not `Reveal` (already on screen). Photo rises 24 px, mask, 1.04 to 1. Glow and drift at 768 px and up only. |
| S2 | Cells, numbers | `rise`, `CountUp` | 100 ms | "Since 1994" is static. |
| S3 | Heading, paragraphs, card | `rise`, `fade` | 80 ms | `<details>` opens smoothly. |
| S4 | Portrait, card, heading, "30+" | `mask`, `rise`, `CountUp` | 100 ms | Optional 24 px parallax on the portrait, desktop only. |
| S5 | Photo, card, heading | `mask`, `rise` | 100 ms | |
| S6 | Heading, plates | `rise` | 80 ms | Lightbox crossfade. |
| S7 | Text card, photo, heading | `mask`, `rise` | 100 ms | |
| S8 | Seam card | `rise` | none | Once. |
| S9 | Heading, rows, player | `rise`, crossfade on selection | 60 to 80 ms | Hover lift on desktop; no autoplay. |
| S10 | Photos, plates | `mask`, `rise` | 100 ms | |
| S11 | Photos, clinic cards | `mask`, `rise` | 100 ms | |
| S12 | Cards | `rise` | 80 ms | |
| S13 | Items | open fade | n/a | Only if A6 ticked. |

All 300 to 700 ms, ease-out, `transform` and `opacity` only. Hidden initial states come from a class that JavaScript adds. Reduced motion: final state. Phones: reveals yes, continuous animation no.

---

## 7. SEO, AEO, GEO checklist for this page

- **Untouched:** `metadata` and `generateMetadata`, title, description, canonical, robots, Open Graph, sitemap entry, every existing JSON-LD block (types R0 reports). Check with `git diff -- app/about/page.tsx`: only body JSX differs.
- **Headings:** one `h1`; section headings `h2`; card and sub-headings `h3` (the S9 "A public conversation about dental care." is an `h3`); levels in order. No headings replaced by styled divs.
- **Entities and facts kept identical to the single sources:** Neodent Dental Hospital, Hyderabad, Mehdipatnam, Nampally, founded 1994, hours as in Part 1, founder and doctor names as written (Mohd. for the founder, Md. for Dr. Miftah), Dr. Muti Ur Rahman never a dental specialist, "a Neodent specialist" for consultations, no new "Smile Designer".
- **Internal links that must exist** (R0 lists the live set; none may be lost or have its anchor changed): `/clinic/mehdipatnam`, `/clinic/nampally`, "our clinics page", "View profile" (doctors page), "Neodent's clinical expertise" and "our clinical expertise" (treatments), "View full archive" (press archive), the three S12 targets, `/contact`. Additions in A5 never replace.
- **Images:** every alt kept; new alts descriptive and natural; decorative layers `aria-hidden`; `next/image` with `sizes` and `aspect-ratio`; `priority` on the S1 photo only.
- **Schema:** `foundingDate: "1994"` stays. No `aggregateRating`. `FAQPage` only with A6 and only matching the visible FAQ.
- **AEO:** the optional FAQ (A6) is the only new question-and-answer content. Direct one-sentence answers, no invented medical claims or outcomes.
- **GEO:** Hyderabad, Mehdipatnam and Nampally appear naturally in the eyebrow, supporting copy and clinic cards.
- **Existing claims** ("25,000+ patients treated", "30+ years of experience") stay as written. They are not added to schema. They are listed in `CONTENT_QUESTIONS.md` for the owner to confirm the source.
- **No content loss** is the first SEO rule: `page-content-check.mjs` reports zero missing after every run.

---

## 8. Ownership forecast and concurrency notes

- **Expected OWNED:** `app/about/page.tsx` (body JSX only), the About-only section components and CSS Modules (R0 lists), any About-only data file.
- **Expected NEW:** `components/pages/about/` (`AboutPage.module.css`, `AboutHeader`, `AboutFacts`, `AboutPractice`, `AboutFounder`, `AboutExperience`, `AboutPress`, `DocumentViewer`, `AboutRecognition`, `AboutSeam`, `AboutVoice`, `AboutCommunity`, `AboutToday`, `AboutCrossLinks`, optional `AboutFaq`, each with its own CSS Module), `lib/pages/about-content.ts` (only if A6 is ticked or content needs to move), `docs/internal-pages/about/`.
- **Read-only:** `AboutClientChrome`, `ContactNextStep`, all of `components/ui/*` (including `EditorialHighlight`), `components/motion/*`, `components/hero/*`, `components/layout/*`, `lib/site-data.ts`, `lib/clinic-data.ts`, `lib/clinical-team.ts`, `lib/structured-data.ts`, `app/globals.css`, the press archive route that "View full archive" opens.
- **Forks expected:** any shared component the live page renders for S3 to S12 (R0 lists them as FORK CANDIDATES), including the S9 player and playlist if shared. Nothing is edited in place if anything else imports it.
- **Concurrency:** safe beside every other page session. Do not run a second session that forks the same shared component.
- **Likely shared-change requests:** (1) a reusable `DocumentViewer` for other pages (the home press row, the doctors page and the press archive may want it later); (2) `AboutClientChrome` if R0 shows it is shared with another route.

---

## 9. Run sequence

| Run | Scope | Files | Depends on | Time |
|---|---|---|---|---|
| R0 | Discovery and snapshot (no site code) | `docs/internal-pages/about/*` | none | 10 to 15 min |
| R1 | Page wrapper, forks, S1 header (with action pair), S2 fact strip | `app/about/page.tsx`, `components/pages/about/AboutPage.module.css`, `AboutHeader.*`, `AboutFacts.*` | R0 | 25 to 30 min |
| R2 | S3 practice, S4 founder | `AboutPractice.*`, `AboutFounder.*` | R1 | 25 to 30 min |
| R3 | S5 experience, S6 press (four cuttings, archive link), `DocumentViewer` | `AboutExperience.*`, `AboutPress.*`, `DocumentViewer.*` | R2 | 25 to 30 min |
| R4 | S7 recognition, S8 seam card, S9 voice (player and ten items) | `AboutRecognition.*`, `AboutSeam.*`, `AboutVoice.*` | R3 | 25 to 30 min |
| R5 | S10 community, S11 today, S12 cross-links | `AboutCommunity.*`, `AboutToday.*`, `AboutCrossLinks.*` | R4 | 25 to 30 min |
| R6 | S13 FAQ (only if A6 ticked; otherwise skip) | `AboutFaq.*`, `lib/pages/about-content.ts` | R5 | 20 min |
| R7 | Motion and polish | the files above | R5 (and R6 if run) | 25 to 30 min |
| R8 | Final fast check and screenshots | fixes only, in the files above | R7 | 15 to 20 min |

Run one prompt at a time, in one Kiro session, and start the next only after the previous finished. If R4 runs long because of the S9 player, stop at the report and let the owner decide; do not widen the prompt.

---
## 10. Prompts

Paste each block into Kiro CLI exactly as written, one at a time, in order. Each starts with the Appendix B preamble (slug filled in as `about`). Additions A2 to A7 and decision D1 are in section 12: a prompt includes an addition only if its box there is ticked `[x]`. (A1 is closed and the header action pair is required by the standard, so neither has a box.) Tick the boxes and save this file into the repo before running R1, because the agent reads section 12 from the repo copy.

### R0: Discovery and snapshot

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R0 for about (/about): discovery and content snapshot. This run changes no site code.

Do:
1. Confirm http://localhost:3000/about responds. If not, stop and say so.
2. Run node scripts/page-content-snapshot.mjs about /about. This is the content baseline.
3. Find the page's files: app/about/page.tsx and every component, CSS Module and data file it imports (follow the imports, including AboutClientChrome). For each file, run grep -rl on its name across app, components and lib to see who else imports it. Write docs/internal-pages/about/OWNERSHIP.md with three lists: OWNED (only this page uses it), SHARED READ-ONLY (used elsewhere or on the never-edit list), and FORK CANDIDATES (shared components this page's redesign will need to change, with the planned copy path under components/pages/about/). Add one line on each file's role. Also list other routes that share a family with this page, including the route that "View full archive" opens.
4. Map the sections you find in the rendered page to the sections S1 to S14 in PAGE_PLAN.md (section 3, content map). Write docs/internal-pages/about/DISCOVERY.md with: the section list in order (heading, component, file), any content in the page that the plan missed, any section in the plan that does not exist, the images and videos found (path, alt, dimensions where known), and the existing JSON-LD types. Do not fix or change anything.
5. In DISCOVERY.md also record short answers to the following. The plan was written from screenshots and states an expectation for most of them; say "confirmed" or give the real answer.
 (a) The exact h1 text, the exact eyebrow (expected "Established 1994 · Hyderabad") and the exact supporting copy under the h1; whether that copy contains "Neodent Dental Hospital", "Hyderabad" and "1994" (expected yes).
 (b) Whether the page header has any buttons or action links (expected none) and every link in the header area.
 (c) The S2 strip: the exact label and facts (expected "At a glance"; "Since 1994 in Hyderabad"; "2 clinics"; "25,000+ patients treated"), and how each is marked up.
 (d) Whether the faint "1994" behind the S3 heading is text in the DOM or CSS; which files draw the faint grid lines on the header and beige bands; which file draws the red offset frame around the S1 photo.
 (e) The number of EditorialHighlight uses per section, and any other inline emphasis (red bold text, pink marks).
 (f) Every link on the page with href, anchor text and rel, and which go to external sites. Include "View profile" (S5), "Neodent's clinical expertise" (S4), "our clinical expertise" and "our clinics page" (S11), "View full archive" (S6), the clinic cards, the phone links and the three S12 cards.
 (g) S9: the exact number of items (expected ten); for each item the title, category label, href, rel, and whether it is a link or a button that swaps the player; what the player is (embed or file, provider, poster, size); what the right half of the section holds on desktop at 1366 and 1440 wide (the screenshot shows it empty); whether the player and every item exist in the no-JavaScript HTML; whether the first item's description ("... discusses common dental problems ...") appears on desktop as well as on mobile.
 (h) The media per section with alt text (expected S1 one photo; S4 one portrait; S5 one photo; S6 four cuttings; S7 one photo; S8 one photo; S10 two photos and two cuttings; S11 two photos); which images have no alt; whether the text drawn over the Republic Day photo is DOM text or part of the image.
 (i) Whether S8 ("A legacy is built over time. The work continues." with the ceremony photo) is its own section or the closing row of the S7 band, and which file renders it.
 (j) The background tone of each section (expected: S1 dark; S2 light strip; S3 beige; S4 ivory; S5 beige; S6 ivory; S7 and S8 beige with a red text card; S9 dark with the icon pattern; S10 ivory; S11 beige; S12 ivory; consultation dark).
 (k) Whether the home page (components/Home.tsx and its sections) contains any full red band or large red card.
 (l) Whether the page mentions Dr. Muti Ur Rahman, the quote "Save the natural teeth till the last stage.", the Madina Gold Medal or the words "Smile Designer", and how.
 (m) The computed font size of the small uppercase labels in the cards (Founded, Qualifications, Locality, the S9 category labels) and of the captions; list any under 12 px.
6. List copy that looks wrong, ungrammatical or unverifiable in docs/internal-pages/about/CONTENT_QUESTIONS.md (quote it; do not edit it). Include: (1) the text drawn over the Republic Day photo in S10 names "Dr Md Miftah Ur Rahman" as the speaker, while the paragraph beside it says Dr. Mohd. Siraj Ur Rahman addressed the gathering; (2) check "Mohd." (founder) and "Md." (Dr. Miftah) against lib/clinical-team.ts and record only if the single source spells either name differently; they are two different people, so the two spellings are not themselves an error; (3) "25,000+ patients treated" and "30+ years of experience": existing claims with no visible source, listed for the owner to confirm.
7. Create docs/internal-pages/about/CHANGELOG.md with an R0 entry.

Do not: edit any file outside docs/internal-pages/about/ and .audit/about/, start or stop servers, build, install, or use git write commands.
Report: files created, the ownership summary, differences between the plan and the real page, questions for the owner.
```

### R1: Page wrapper, forks, header band (S1) and fact strip (S2)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R1 for about (/about): page wrapper, S1 page header and S2 fact strip.

Read first: docs/internal-pages/about/OWNERSHIP.md and DISCOVERY.md; PAGE_PLAN.md sections 3, 4 (S1, S2), 5 and 6; components/hero/Hero.tsx and its CSS (layers, glass cards, class-keyed load animation); the stat strip in components/sections/ExperienceIntro.tsx and its CSS; components/motion/Reveal.tsx and CountUp.tsx (read-only); the design tokens in app/globals.css (read-only).

You may edit only: app/about/page.tsx (body JSX only; the metadata export and every JSON-LD block stay byte-identical, check with git diff -- app/about/page.tsx); new files in components/pages/about/ (AboutPage.module.css, AboutHeader.tsx, AboutHeader.module.css, AboutFacts.tsx, AboutFacts.module.css, and forks listed as FORK CANDIDATES in OWNERSHIP.md that S1 and S2 need); docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. Make the forks S1 and S2 need under components/pages/about/ and switch the page to the copies. Leave originals untouched. Sections S3 to S12 keep rendering as they do today, unchanged, until their own runs.
2. Create the page wrapper class in AboutPage.module.css. Set the page's custom properties (glow centre, section padding copied from LegacyStory.module.css) on it.
3. Build S1 as in PAGE_PLAN.md section 5: breadcrumb only if A2 is ticked; the existing eyebrow text kept exactly as it is today (do not add or swap an eyebrow); the unchanged h1; the existing supporting copy in full (do not add the A1 line, it is closed); ADD the primary "Call for Consultation" (tel link from ctaTelPhone in lib/site-data.ts; display ctaPhone) and the secondary "Send an enquiry" to /contact (the live header has no buttons; this is a standard-required addition, record it in the changelog as an addition); the existing photo of Dr. Md. Miftah Ur Rahman and its existing caption lines in a dark glass card at the bottom of the photo. Do not carry over the red offset frame around the photo or any grid lines.
4. Dark-band layers exactly as 3.6: gradient, red glow with custom properties, the dental icon pattern as mask-image over an ivory fill (never a CSS background-image), content. Glow breathing and pattern drift only inside @media (min-width: 768px) and only without prefers-reduced-motion.
5. Build S2 as a dark strip with a hairline top: the "At a glance" label cell, then "Since 1994 / in Hyderabad", "2 / clinics" and "25,000+ / patients treated", every word kept. "2" and "25,000+" use CountUp only if the server HTML and the final value read exactly "2" and "25,000+" (otherwise keep them static and say so in the report); "Since 1994" is static text. On mobile the label sits on its own row and the three facts stay in one row if they fit at 360 wide, otherwise two and one.
6. S1 load animation keyed off a CSS class as the hero does (not Reveal). S2 cells use Reveal rise with 100 ms stagger.

Acceptance (all checkable):
- The content check reports missing: 0 and exactly one h1 with unchanged text; the eyebrow text is unchanged.
- git diff -- app/about/page.tsx shows no change to metadata or JSON-LD.
- grep shows the pattern image only in a mask-image rule.
- The page's own CSS has no font-size under 12px and no label under 12px.
- At 390x844: h1 and the primary action are both inside the first 844 px; the S1 photo is at most 38dvh; no horizontal overflow at 360.
- At 1366x650: the S1 photo is at most 68dvh; the S1 photo has priority and no other image on the page gains priority.
- The no-JavaScript 390 screenshot shows S1 and S2 text fully visible.

Fast check (then stop): (a) npx tsc --noEmit, output filtered to app/about, components/pages/about and lib/pages/about-content.ts; (b) npx eslint on the files you changed, nothing else; (c) node scripts/page-content-check.mjs about /about, which must report zero missing; (d) node scripts/page-audit.mjs about /about R1; (e) open two or three of the screenshots it saves and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any file outside the list above (anything else: stop and explain), edit shared files, delete, shorten or reword any content, build, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append.
Report: files changed, content check result (missing: N), audit numbers, what the screenshots show, questions for the owner, shared-change requests, anything unfinished. Append the same to docs/internal-pages/about/CHANGELOG.md. End with the absolute screenshot paths. Leave changes uncommitted.
```

### R2: S3 practice and S4 founder

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R2 for about (/about): S3 "A practice shaped by experience." and S4 "A career built on specialist care."

Read first: OWNERSHIP.md, DISCOVERY.md, the last CHANGELOG.md entry; PAGE_PLAN.md sections 3 and 4 (S3, S4); components/sections/ExperienceIntro.tsx ("Care begins") and components/sections/LegacyStory.tsx with their CSS Modules; components/sections/ClinicalLeadership.module.css (card radius, border, shadow); the hero CSS for the dark glass card.

You may edit only: app/about/page.tsx (body JSX only; metadata and JSON-LD byte-identical); new files components/pages/about/AboutPractice.tsx, AboutPractice.module.css, AboutFounder.tsx, AboutFounder.module.css, any fork these two sections need; AboutPage.module.css; docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. S3 (P3, light): heading and the first two paragraphs as one reading column of 65 to 72 characters; the "Neodent Dental Hospital" facts card as a light card with its rows as a <dl>; every remaining paragraph in one native <details> ("Read more") with the full text in the server HTML. Drop the "1994" watermark styling; if it is real DOM text, keep it in the DOM and note it in CONTENT_QUESTIONS.md for an allowlist decision (never edit content-allowlist.json yourself).
2. S4 (P5 split, dark band with the 3.6 layers copied into AboutFounder.module.css): founder portrait (cover, focal point on the face, max-height var(--media-max-h), caption on a dark gradient), the details card as dark glass (rgba(16,21,23,0.72), 1px solid rgba(255,255,255,0.12), radius 0.35rem, backdrop-filter blur(8px) inside @supports) with rows as a <dl>, the first paragraph visible, the remaining paragraphs in a native <details>.
3. Plain eyebrows "Our practice" and "Our founder" only if A3 is ticked.
4. Red-italic accent phrase: none on S3; kept on S4 (same words as today). At most two EditorialHighlight marks per section and none in dark body text. The words never change.
5. Reveal: headings rise, paragraphs rise, S3 card fade with 80 ms row stagger, S4 portrait mask with a slight settle, S4 card rise; the "30+" in the founder card uses CountUp only if the server HTML and final value read exactly "30+", otherwise it stays static text. Optional parallax of at most 24 px on the S4 portrait at 768px and wider only.

Acceptance (all checkable):
- Content check: missing 0, shortened 0.
- Every paragraph, row, caption and alt that existed in S3 and S4 is present in the server HTML (the no-JavaScript screenshot and the snapshot agree).
- Each <details> is a native element with full text inside it.
- S3 and S4 each measure at most about two and a half screens at 390x844 with disclosures collapsed.
- No card has more than 35% empty space (open the section screenshots and check the two cards).
- The portrait is at most 38dvh at 390 wide and at most var(--media-max-h) at 1366x650.
- No horizontal overflow at 360; no tap target under 44x44 at 768 and below (excluding inline links).

Fast check (then stop): (a) npx tsc --noEmit, output filtered to app/about, components/pages/about and lib/pages/about-content.ts; (b) npx eslint on the files you changed, nothing else; (c) node scripts/page-content-check.mjs about /about, which must report zero missing; (d) node scripts/page-audit.mjs about /about R2; (e) open two or three of the screenshots it saves and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any file outside the list above (anything else: stop and explain), edit shared files, delete, shorten or reword any content, build, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append.
Report: files changed, content check result (missing: N), audit numbers, what the screenshots show, questions for the owner, shared-change requests, anything unfinished. Append the same to docs/internal-pages/about/CHANGELOG.md. End with the absolute screenshot paths. Leave changes uncommitted.
```

### R3: S5 experience, S6 press and DocumentViewer

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R3 for about (/about): S5 "Experience carried forward.", S6 "A history that can be seen." and the DocumentViewer lightbox.

Read first: OWNERSHIP.md, DISCOVERY.md, the last CHANGELOG.md entry; PAGE_PLAN.md sections 3 and 4 (S5, S6); components/sections/LegacyStory.tsx and its CSS Module (split layout and press row); components/sections/ClinicalLeadership.tsx and its CSS (doctor card, swipe row); the hero slide 3 plates in components/hero/* (read-only).

You may edit only: app/about/page.tsx (body JSX only); new files components/pages/about/AboutExperience.tsx, AboutExperience.module.css, AboutPress.tsx, AboutPress.module.css, DocumentViewer.tsx, DocumentViewer.module.css, any fork these sections need; AboutPage.module.css; docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. S5 (P5 mirrored, light): treatment photo (cover, focal point on the hands and patient, max-height var(--media-max-h)) with its caption below the photo; do not crop, filter or replace the photo in a way that reveals or alters the pixelated patient face. Heading, first paragraph, the doctor card in the ClinicalLeadership card style (Dr. Md. Miftah Ur Rahman, Assistant Director · Neodent, Specialism, Academic post, Practising at), the existing red "View profile" button kept under the card with its label and href. Keep the second paragraph visible unless it is long enough to need a native <details>. Keep every spelling of both doctors' names exactly as written ("Mohd." for the founder, "Md." for Dr. Miftah: two different people).
2. S6 (P12, dark band with the 3.6 layers): heading, the two paragraphs (the remainder in a <details> if long), and "View full archive" with "16 press items in the archive" kept together under the text, with the archive link's existing href. All four cuttings on paper-coloured plates, object-fit: contain, whole, same height cap, hairline border and soft shadow, each with its existing two-line caption (headline, then publication and place) on the plate's bottom gradient. Desktop: the large cutting beside the text and the other three in an even row under it (a single scroll row if the layout needs it). Mobile: a swipe row with overflow-x: auto, scroll-snap-type: x mandatory, cards 82 to 88% wide, progress dots, keyboard accessible, all four cuttings in the DOM, never stacked; the archive link right under the row.
3. DocumentViewer: a small client component (no new library) that opens a cutting full size on tap or click: focus trap, Escape closes, previous and next, alt and caption shown, body scroll locked while open, final state under prefers-reduced-motion. It receives the items from the section; it never removes an item. It will be reused in S10.
4. Eyebrows "Our doctors" and "In the press" only if A3 is ticked. No red italic on S5 or S6.
5. Reveal: S5 photo mask, card rise; S6 heading rise, plates stagger 80 ms; lightbox crossfade with a small translate.

Acceptance (all checkable):
- Content check: missing 0, shortened 0; all four cuttings are present in the DOM with an alt at least as long as before; "View full archive" and "16 press items in the archive" are present with the same href.
- At 390x844 no two large images are stacked; the S6 row scrolls horizontally and the next plate peeks.
- Each cutting opens in DocumentViewer, closes with Escape, and focus returns to the cutting.
- No image or plate is taller than 70% of the viewport at 390x844, 768x1024 or 1366x650.
- The S5 button keeps its href and label.
- No horizontal overflow at 360.

Fast check (then stop): (a) npx tsc --noEmit, output filtered to app/about, components/pages/about and lib/pages/about-content.ts; (b) npx eslint on the files you changed, nothing else; (c) node scripts/page-content-check.mjs about /about, which must report zero missing; (d) node scripts/page-audit.mjs about /about R3; (e) open two or three of the screenshots it saves and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any file outside the list above (anything else: stop and explain), edit shared files, delete, shorten or reword any content, build, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append.
Report: files changed, content check result (missing: N), audit numbers, what the screenshots show, questions for the owner, shared-change requests, anything unfinished. Append the same to docs/internal-pages/about/CHANGELOG.md. End with the absolute screenshot paths. Leave changes uncommitted.
```

### R4: S7 recognition, S8 seam card and S9 voice

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R4 for about (/about): S7 "Recognition earned over time.", S8 "A legacy is built over time. The work continues." (the one seam card) and S9 "A voice for better dental care.".

Read first: OWNERSHIP.md, DISCOVERY.md (especially the answers about S8, the home-page red band, and S9: the player, the ten items and the server HTML), the last CHANGELOG.md entry; PAGE_PLAN.md sections 3 and 4 (S7, S8, S9); components/sections/SeamCard.tsx and its CSS; components/sections/SpacesDesignedAroundCare.tsx; components/sections/PatientStories.tsx and ClinicalLeadership.tsx; the hero CSS for dark glass cards.

You may edit only: app/about/page.tsx (body JSX only); new files components/pages/about/AboutRecognition.tsx, AboutSeam.tsx, AboutVoice.tsx and their CSS Modules, any fork these sections need (including the S9 player or playlist components if they are shared); AboutPage.module.css; docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. S7 (P5, light): if D1 is ticked in PAGE_PLAN.md section 12, restyle the red text card as a light surface card (hairline border, soft shadow, same radius as the home cards); if D1 is not ticked, keep the red card as it is today and apply every other rule inside it. Heading, the paragraph (short, so it stays visible), the awards photo (cover, focal point on the trophy shelf, max-height var(--media-max-h)) with its caption "Institutional recognition / Neodent Dental Hospital". Mobile: text, then the photo at most 38dvh. Keep every word, name and date exactly as written. Add a Madina Gold Medal line only if A7 is ticked and the owner wrote the wording under A7 in section 12 (use exactly that wording, nothing more; if it is empty, skip it and say so in the report). Red-italic accent is allowed on this heading only if the words already carry it.
2. S8 (P4): one seam card overlapping the boundary between the S7 band (light) and S9 (dark), holding the statement as a heading element and the "Recognition ceremony" photo with its caption "Recognition ceremony / Dr. Md. Miftah Ur Rahman" in the card's side column (cover, focal point, at most 38dvh on mobile). Build it from SeamCard's pattern (copy it; do not import SeamCard). Do not add supporting text. No red italic on this heading. Used once on the page; never elsewhere. If DISCOVERY.md shows a different structure for S8, follow DISCOVERY.md and record the difference.
3. S9 (dark band with the 3.6 layers; a selectable playlist beside a player): heading (no red italic), the two intro paragraphs, the h3 "A public conversation about dental care.", and all ten items as compact dark glass rows with their category labels and arrows (equal height, hover lift on desktop, press state on touch, each at least 44 px tall). Desktop: items on the left; the player on the right in a dark glass frame, max-height var(--media-max-h-compact), sticky while the list scrolls. Mobile: the featured player card first (poster, category label, title, description), then the other nine rows. Keep the player and the item behaviour exactly as DISCOVERY.md records them; restyle the container only. Never autoplay. If the player is an iframe, add loading="lazy" and a title only if missing. Every item keeps its href, anchor text and rel. Do not turn the list into a swipe row.
4. Eyebrows "Recognition" and "Dental awareness" only if A3 is ticked.
5. Reveal: S7 photo mask and heading rise, S8 card rise once, S9 heading rise and rows stagger 60 to 80 ms, a crossfade when the selected item changes.

Acceptance (all checkable):
- Content check: missing 0, shortened 0; all ten S9 items present with the same hrefs; the player is still present.
- The page has exactly one seam card (grep for the seam class in the page's CSS Modules).
- No band sequence puts more than two dark bands in a row (state the sequence in the report).
- No two large images stack at 390 wide; no media over 70% of the viewport; the S9 player at most var(--media-max-h-compact) on desktop.
- S9 rows are each at least 65% filled; every row present in the DOM; the section is at most about two and a half screens tall at 390 wide.
- No horizontal overflow at 360; tap targets at least 44x44 at 768 and below.

Fast check (then stop): (a) npx tsc --noEmit, output filtered to app/about, components/pages/about and lib/pages/about-content.ts; (b) npx eslint on the files you changed, nothing else; (c) node scripts/page-content-check.mjs about /about, which must report zero missing; (d) node scripts/page-audit.mjs about /about R4; (e) open two or three of the screenshots it saves and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any file outside the list above (anything else: stop and explain), edit shared files, delete, shorten or reword any content, build, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append.
Report: files changed, content check result (missing: N), audit numbers, what the screenshots show, questions for the owner, shared-change requests, anything unfinished. Append the same to docs/internal-pages/about/CHANGELOG.md. End with the absolute screenshot paths. Leave changes uncommitted.
```

### R5: S10 community, S11 today and S12 cross-links

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R5 for about (/about): S10 "A presence in the wider community.", S11 "Neodent today." and S12 the three-item cross-link row.

Read first: OWNERSHIP.md, DISCOVERY.md, the last CHANGELOG.md entry; PAGE_PLAN.md sections 3 and 4 (S10, S11, S12); components/sections/LegacyStory.tsx; components/sections/SpacesDesignedAroundCare.tsx (branch cards); components/sections/Expertise.tsx (cards); components/sections/PatientStories.tsx (swipe row); lib/clinic-data.ts (read-only); the DocumentViewer from R3.

You may edit only: app/about/page.tsx (body JSX only); new files components/pages/about/AboutCommunity.tsx, AboutToday.tsx, AboutCrossLinks.tsx and their CSS Modules, any fork these sections need; AboutPage.module.css; docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. S10 (P5 + P7 + P12, light): heading and the first paragraphs, the rest in a native <details>; the two photos (Republic Day address, Television) as a capped pair on desktop (the first as the lead; cover with focal points) and one swipe row on mobile; the two press cuttings on plates (contain, whole) through DocumentViewer, as their own swipe row on mobile. Every photo, cutting, caption and alt stays in the DOM, including the text drawn over the Republic Day photo (keep it exactly as DISCOVERY.md records it).
2. S11 (P5 + P15, dark band with the 3.6 layers): heading, the three paragraphs with all their links, the two clinic cards as dark glass cards (name, locality, phone tel link, and the existing arrow link to /clinic/mehdipatnam and /clinic/nampally with the existing anchors), and the two photos ("Waiting lounge" and "Reception" with their captions; cover, focal points, max-height var(--media-max-h)). On desktop the photos sit on the right as a capped pair; on mobile the cards stack and the photos become one swipe row, each at most 38dvh. Only if A4 is ticked, add each clinic's opening hours read from lib/clinic-data.ts (never typed in).
3. S12 (P15, light): the three existing items ("Explore our expertise", "Visit our clinics", "Meet our clinical team", each with its one-line description) as compact cards in one row (stacked on mobile), each sized to its content (no card more than 35% empty), with unchanged anchors and targets. Only if A5 is ticked, add links to the treatments hub, the doctors page and /contact with descriptive anchors. This must be the last body section before the consultation block, and light (if the FAQ in R6 is approved it comes after S12).
4. Eyebrows "In the community" and "Our clinics" only if A3 is ticked. Red-italic accent on the S10 heading only if the words already carry it; none on S11 or S12.
5. Reveal: S10 photos mask with 100 ms stagger, cuttings rise; S11 photos mask, clinic cards stagger 100 ms; S12 cards stagger 80 ms.

Acceptance (all checkable):
- Content check: missing 0, shortened 0; link count has not fallen.
- Both clinic links resolve to the right routes and keep their anchors; both phone links keep their numbers.
- At 390x844 no two large images stack; S10 uses two separate swipe rows; S11 photos are one swipe row; every item is in the DOM.
- Opening hours, if shown, match Part 1 of the standard exactly (Mehdipatnam 4:00 PM to 8:00 PM, Nampally 10:30 AM to 5:00 PM, Monday to Saturday).
- The band directly before the consultation block is light.
- No horizontal overflow at 360; no media over 70% of the viewport.

Fast check (then stop): (a) npx tsc --noEmit, output filtered to app/about, components/pages/about and lib/pages/about-content.ts; (b) npx eslint on the files you changed, nothing else; (c) node scripts/page-content-check.mjs about /about, which must report zero missing; (d) node scripts/page-audit.mjs about /about R5; (e) open two or three of the screenshots it saves and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any file outside the list above (anything else: stop and explain), edit shared files, delete, shorten or reword any content, build, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append.
Report: files changed, content check result (missing: N), audit numbers, what the screenshots show, questions for the owner, shared-change requests, anything unfinished. Append the same to docs/internal-pages/about/CHANGELOG.md. End with the absolute screenshot paths. Leave changes uncommitted.
```

### R6: FAQ (run only if A6 is ticked)

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R6 for about (/about): S13 visible FAQ and FAQPage JSON-LD. Run only if A6 is ticked in PAGE_PLAN.md section 12; if it is not, stop and say so.

Read first: OWNERSHIP.md, DISCOVERY.md, the last CHANGELOG.md entry; PAGE_PLAN.md sections 4 (S13) and 7; the whole text of the live /about page (docs/internal-pages/about/content-snapshot.json); lib/site-data.ts, lib/clinic-data.ts and lib/clinical-team.ts (read-only); the native <details> pattern used by FAQ sections elsewhere in the repo (grep for "<details" in components, read-only).

You may edit only: app/about/page.tsx (add the FAQ component and its JSON-LD script after the existing content; existing metadata and JSON-LD stay byte-identical); new files components/pages/about/AboutFaq.tsx, AboutFaq.module.css, lib/pages/about-content.ts; docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. Write lib/pages/about-content.ts with an array of exactly four question and answer pairs, on: who founded Neodent Dental Hospital and when; where the clinics are and when they are open; which treatments Neodent offers (the seven, with links to their pages); what recognition is mentioned on this page. Each answer: one direct sentence, then one or two supporting sentences. Use only facts already on the site or in the single-source data files. No prices, no medical claims, no outcome promises, no invented dates, names or numbers. If a fact is not on the site, leave that question out and say so in the report.
2. Build the FAQ as native <details>, the first open, no numbering, hairline dividers, a chevron, smooth open (opacity or height), light band, placed after S12 and before the consultation block.
3. Generate the FAQPage JSON-LD from the same array so the text matches the visible text word for word. Do not add aggregateRating.
4. Add the 80 ms stagger reveal to the items.

Acceptance (all checkable):
- Content check: missing 0; the existing JSON-LD blocks are equal; one new FAQPage block exists.
- The JSON-LD questions and answers equal the visible text exactly (compare programmatically and say how).
- Every treatment named links to its treatment page.
- Every fact in the answers can be traced to a line in the snapshot or a single-source file (list the source for each answer in the report).

Fast check (then stop): (a) npx tsc --noEmit, output filtered to app/about, components/pages/about and lib/pages/about-content.ts; (b) npx eslint on the files you changed, nothing else; (c) node scripts/page-content-check.mjs about /about, which must report zero missing; (d) node scripts/page-audit.mjs about /about R6; (e) open two or three of the screenshots it saves and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any file outside the list above (anything else: stop and explain), edit shared files, delete, shorten or reword any content, build, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append.
Report: files changed, content check result (missing: N), audit numbers, what the screenshots show, questions for the owner, shared-change requests, anything unfinished. Append the same to docs/internal-pages/about/CHANGELOG.md. End with the absolute screenshot paths. Leave changes uncommitted.
```

### R7: Motion and polish

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R7 for about (/about): motion and polish across the whole page. No new sections, no layout changes beyond what the checks below find.

Read first: OWNERSHIP.md, the whole CHANGELOG.md; PAGE_PLAN.md sections 6 and 11; components/motion/Reveal.tsx and CountUp.tsx (read-only); the hero CSS for hover, press and reduced-motion rules.

You may edit only: app/about/page.tsx (body JSX only), files under components/pages/about/, lib/pages/about-content.ts, docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. Walk the section table in PAGE_PLAN.md section 6. Every section has at least one visible reveal using Reveal or CountUp with the variant and stagger listed. Fix any that is missing.
2. Add the desktop hover lift to cards and buttons and the press state on touch; add the smooth open on every <details> and FAQ item (opacity or height, transform and opacity only where possible).
3. Reduced motion: every transform, drift, zoom and parallax is off and every element is in its final state. Phones: no glow breathing, drift, zoom or parallax.
4. will-change appears only on layers that animate continuously (glow, pattern drift) and only at 768px and wider.
5. Check that the red-italic accent appears only on the S1 h1 and at most S4, S7 and S10; that no section has more than two EditorialHighlight marks and none sit in dark body text; and that the page CSS contains no numbered eyebrows, ghost numerals, corner brackets, arcs, rotated labels or text under 12px (grep and list the results).
6. Confirm the page reads fully with JavaScript disabled: the no-JavaScript screenshot shows every section's text and no empty gaps.

Acceptance (all checkable):
- Content check: missing 0, shortened 0.
- Grep shows no layout properties in any keyframes or transitions the page adds (only transform and opacity).
- Grep shows no reveal hidden state in server HTML (the hidden class is added by JavaScript).
- Audit: zero media over 70%, zero horizontal overflow, zero tap targets under 44x44 at 768 and below, zero text under 12px.

Fast check (then stop): (a) npx tsc --noEmit, output filtered to app/about, components/pages/about and lib/pages/about-content.ts; (b) npx eslint on the files you changed, nothing else; (c) node scripts/page-content-check.mjs about /about, which must report zero missing; (d) node scripts/page-audit.mjs about /about R7; (e) open two or three of the screenshots it saves and describe what is on screen and what looks wrong. At most two fix-and-recheck cycles. No Lighthouse, no build, no extra viewports.

Do not: edit any file outside the list above (anything else: stop and explain), edit shared files, delete, shorten or reword any content, build, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md. If you need a shared change, work around it locally and append a request to docs/internal-pages/_shared-requests.md using only a shell append.
Report: files changed, content check result (missing: N), audit numbers, what the screenshots show, questions for the owner, shared-change requests, anything unfinished. Append the same to docs/internal-pages/about/CHANGELOG.md. End with the absolute screenshot paths. Leave changes uncommitted.
```

### R8: Final fast check and screenshots

```
You are one of several coding sessions working in this repo at the same time, each on a different page. Read docs/internal-pages/about/PAGE_PLAN.md, especially the section "Agent rules", and docs/internal-pages/about/OWNERSHIP.md (once R0 has made it) and the last entry of docs/internal-pages/about/CHANGELOG.md. Also read AGENTS.md. The rules in "Agent rules" are binding. The ones that matter most: never delete or shorten any content; edit only files you own; never edit shared files, build, install, start servers or run git write commands; use the fast check only and stop. Run git status --short first and keep away from files other sessions have changed.

Task R8 for about (/about): final fast check and screenshots. Fix only what the checks find, within the files you own.

You may edit only: app/about/page.tsx (body JSX only; metadata and JSON-LD byte-identical), files under components/pages/about/, lib/pages/about-content.ts, docs/internal-pages/about/. Anything else: stop and explain.

Do:
1. Walk through the page top to bottom in the dev server screenshots at 1366x650 and 390x844. For each section confirm: it follows the pattern in PAGE_PLAN.md section 4; there is a visible on-scroll reveal; no card is more than 35% empty; no media is over 70% of the viewport; nothing overflows at 360.
2. Run the fast check from "Agent rules" item 9 with run-id final. Allow at most two fix-and-recheck cycles.
3. Save full-page desktop (1440 wide) and mobile (390 wide) screenshots as .audit/about/final/desktop-full.png and mobile-full.png (the audit script's full-page shots are acceptable). Print their absolute paths.
4. Write the final CHANGELOG.md entry: files changed in the whole page redesign (the owner uses it to commit by path), the additions made (the header action pair and any ticked A items), content check result, audit numbers, forks made, shared-change requests, open questions, and anything not done.

Do not: add new design work, edit any file outside the list above, delete, shorten or reword any content, build, run Lighthouse or deep tests, install, start or stop servers, or use git write commands. If a layout need conflicts with the content rules, relocate the content, never delete it, and record it in docs/internal-pages/about/CONTENT_QUESTIONS.md.
Report: pass or fail per check, the screenshot paths, the open items. Leave changes uncommitted.
```

---

## 11. Acceptance and rating rubric

**The owner checks in the screenshots** (desktop 1440 and mobile 390), then sends them to the Claude chat with this plan for a rating:

| Area | Pass looks like |
|---|---|
| Content | `page-content-check` missing 0, shortened 0; every photo, cutting, caption, link and button still there; metadata and JSON-LD byte-identical |
| Design language | Only existing tokens; Manrope and DM Serif Display; red italic only on the h1 and at most S4, S7, S10; no numerals, ghost text, brackets, arcs, micro-labels |
| Hierarchy | Each section has one heading, one supporting line, one focal element; lede visible, depth in `<details>`; the dark and light rhythm alternates with never more than two dark bands in a row |
| Media | No image over 70% of the viewport; cuttings whole and zoomable; no two large images stacked on mobile; one seam card |
| Mobile | No overflow at 360; body 15 px or more; labels 12 px or more; tap targets 44 px or more; headline and primary action in the first screen; sections at most about two and a half screens collapsed |
| Motion | A visible reveal in every section; calm, 300 to 700 ms; page readable with JavaScript off; reduced motion respected |
| SEO, AEO, GEO | One h1; heading order; links and anchors kept; alts kept; entities and facts match the single sources; FAQ and its schema match word for word if A6 ran |
| Page-specific | The page header has the action pair; the four S6 cuttings and two S10 cuttings zoom; the S9 player and all ten items work as before; S8 is the only seam card; the patient photo in S5 is unchanged |
| Fast checks | `tsc`, `eslint`, content check and audit all clean |

**Rating.** Out of 10, desktop and mobile separately, with notes per section. Target 9 to 9.5. A rating below 9 produces targeted improvement prompts for the named sections only (one concern per prompt).

---

## 12. Open owner questions

Tick `[x]` to approve before running the prompt that uses it. Agents include an addition or apply a decision only if its box is ticked.

**Decisions and additions**
- [ ] **D1** (used by R4) Restyle the red text card in S7 ("Recognition earned over time.") as a light surface card. Recommended: a large red card is not in the design language (red is for buttons). Leave unticked to keep the red card as it is.
- [x] **A1** Closed. The live header copy already carries "Neodent Dental Hospital", "Hyderabad" and "1994", so no extra line is added.
- [ ] **A2** (used by R1) Add a visible breadcrumb "Home / About".
- [ ] **A3** (used by R2 to R5) Add plain eyebrows to the sections (list in section 4). The existing S1 eyebrow stays as it is.
- [ ] **A4** (used by R5) Show each clinic's opening hours on the S11 clinic cards, read from `lib/clinic-data.ts`. Low value: the consultation block directly below already shows them.
- [ ] **A5** (used by R5) Add cross-links in S12 to the treatments hub, the doctors page and the contact page.
- [ ] **A6** (used by R6) Add a four-question FAQ (founder and year; clinics and hours; the seven treatments; recognition) with matching `FAQPage` JSON-LD, written only from facts already on the site.
- [ ] **A7** (used by R4) Add one line about the Madina Gold Medal (2023, awarded by Commissioner A. K. Khan) to S7. The standard approves the medal but does not say who received it, so you supply the exact wording. If the box is ticked and the wording below is empty, the agent skips A7 and says so.
  - Wording: ______________________________

**Standard-required, no box:** the primary "Call for Consultation" and secondary "Send an enquiry" actions in the page header (the live header has none).

**Questions R0 will answer, or the owner must** (R0 also confirms the expectations marked "expected")
- **Q1** Exact h1, eyebrow and supporting copy. (R0; expected: "Established 1994 · Hyderabad" and the copy already carries the three entity words.)
- **Q2** Is S8 its own section or the closing row of the S7 band? (R0; expected: closing row, heading plus ceremony photo.)
- **Q3** Does the home page use a full red band or large red card anywhere? If yes, D1 can stay unticked. (R0)
- **Q4** Real tone of each section. (R0; expected tones are listed in R0 item 5(j).)
- **Q5** Is the faint "1994" text in the DOM or a CSS watermark? If it is text, approve an allowlist entry (agents never add one themselves).
- **Q6** Spelling check: the founder is "Dr. Mohd. Siraj Ur Rahman" and the Assistant Director is "Dr. Md. Miftah Ur Rahman". They are two different people, so the two spellings are not an error. R0 only reports it if `lib/clinical-team.ts` spells either name differently.
- **Q6b** The text drawn over the Republic Day photo in S10 says "Dr Md Miftah Ur Rahman" addressed the gathering, but the paragraph beside it says Dr. Mohd. Siraj Ur Rahman did. Which is right? (Nothing is edited meanwhile; both stay.)
- **Q7** Publication names and places are already in the cutting captions. Do you want dates added to the captions? If yes, supply them; nothing is guessed.
- **Q8** Can you confirm the sources for "25,000+ patients treated" and "30+ years of experience"? (They stay as written.)
- **Q9** Does the page mention Dr. Muti Ur Rahman, the quote "Save the natural teeth till the last stage." or the Madina Gold Medal? If so they must read as in Part 1. (R0)
- **Q10** What is the S9 player (provider, poster, server HTML) and why is the right half empty in the desktop capture? Do any of the ten items link to external sites? (R0)
- **Q11** Where does "View full archive" go, and does that route need the same redesign later? (R0 reports the route; it is not part of this plan.)
- **Q12** Which images have no alt text? (R0 lists them; an alt is only ever added as a neutral description of what the photo shows, never a name, date or claim.)

---

## 13. Agent rules (Appendix A)

Wherever the rules below say `<slug>` read `about`, and wherever they say `<route>` read `/about`. The text is pasted verbatim from Appendix A of the standard.

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
