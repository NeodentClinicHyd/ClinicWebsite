# DISCOVERY: /about

R0, 31 Oct 2026. Read from the source files, the server HTML (JavaScript off, `content-snapshot.json`) and a Playwright probe of the rendered page at 390, 1366 and 1440 wide (`.audit/about/R0/probe.json`). No site code was changed.

Baseline snapshot: 141 text units, 18 headings, 14 links, 16 images, 13 buttons, 4 JSON-LD blocks, 10,562 characters of text in `<main>`.

## 1. Sections in order

| Plan # | Heading | Component | Tone (computed) |
|---|---|---|---|
| S1 | h1 "Decades of changing smiles. A legacy that continues." | `AboutHero` | dark `#161c1e`, grid lines, red-framed photo |
| S2 | "At a glance" strip | `AboutHero` (second section) | ivory `#f8f6ef` |
| S3 | A practice shaped by experience. | `AboutPractice` | sand `#ece7dc` with grid lines |
| S4 | A career built on specialist care. | `AboutFounder` | ivory |
| S5 | Experience carried forward. | `AboutMiftah` | sand with grid lines |
| S6 | A history that can be seen. | `AboutPress` | ivory |
| S7 | Recognition earned over time. | `AboutRecognition` | sand with grid lines, red text card |
| S8 | "A legacy is built over time. The work continues." | `AboutRecognition` (closing row, a `<p>`, not a heading) | sand (same section as S7) |
| S9 | A voice for better dental care. | `AboutMedia` | dark `#242628` with seam and pattern |
| S10 | A presence in the wider community. | `AboutCommunity` | ivory |
| S11 | Neodent today. | `AboutToday` | sand with grid lines |
| S12 | h2 (screen-reader only) "Continue exploring Neodent" | `AboutExplore` | ivory |
| S14 | Book a consultation | `ContactNextStep` | dark `rgb(18,19,22)` |

Plan tones confirmed, with one detail: S9 is `#242628`, not the `#161c1e` of S1.

Heading structure: one h1; h2 per section; h3 for card titles (Neodent Dental Hospital, Dr. Mohd. Siraj Ur Rahman, Dr. Md. Miftah Ur Rahman, Mehdipatnam, Nampally), for the S9 "A public conversation about dental care." and for the active S9 film title.

## 2. Plan versus real page

Content missing from the plan: S12's screen-reader-only h2; the ten S9 film descriptions (shown one at a time in the player panel); the 16-item `ArchiveViewer` dataset (not in server HTML, opens on button press); the YouTube consent gate; the `At a glance` list `aria-label`.

Plan sections that do not exist as described:
- "View full archive" is a **button** that opens a lightbox. It is not a link to a route.
- S9 items are **buttons** (`aria-pressed`), not links. No hrefs, no `rel`.
- S8 is a paragraph in the S7 section, not a heading element.

## 3. Answers to R0 item 5

**(a)** h1 text confirmed: "Decades of changing smiles." then a block `<span>` "A legacy that continues." Eyebrow confirmed: "Established 1994 · Hyderabad". Supporting copy: "Neodent Dental Hospital was founded in Hyderabad in 1994 by Dr. Mohd. Siraj Ur Rahman, opening its first practice in Mehdipatnam. In the decades since, that single clinic has grown into Neodent Dental Hospital, now practising across Mehdipatnam and Nampally, built on specialist-led dental care that has shaped every year since." It contains "Neodent Dental Hospital", "Hyderabad" and "1994". Confirmed.

**(b)** The header has no buttons and no links. Confirmed. (The Navbar's "Talk to Neodent" is global.)

**(c)** S2 confirmed. Markup: `<p aria-hidden>` "At a glance", then `<ul aria-label="Neodent at a glance">` with three `<li>`: `<span>` value + `<span>` label. Values are "Since 1994" (built from `legacyStats.established`), "2" (literal) and "25,000+" (`legacyStats.patientsTreated`). Labels: "in Hyderabad", "clinics", "patients treated".

**(d)** The ghost "1994" is **real DOM text**: `<span class="ghost" aria-hidden="true">` in `AboutPractice.tsx`, 240 px. Grid lines: `.gridlines` in `AboutHero.module.css` (header) and `.sand::before` in `shared.module.css` (every sand band). The red offset frame is `.frame::before` and a corner tick `.frame::after` in `AboutHero.module.css`.

**(e)** `EditorialHighlight` marks per section (1440): S3 3, S4 3, S5 3, S6 3, S9 3 (on dark), S10 3, S11 3, S7 0, S1 0. Every section except S7 is over the plan's limit of two, and S9 puts marks in dark body text. S7 uses two `<strong>` runs inside the red card; S1 has one `<b>` (the photo caption name).

**(f)** Links (all internal, none with `rel` or `target`):

| Section | href | Anchor |
|---|---|---|
| S4 | `/treatments` | Neodent's clinical expertise |
| S5 | `/doctors/dr-miftah-ur-rahman` | View profile (AppButton, primary) |
| S11 | `/treatments` | our clinical expertise |
| S11 | `/clinic` | our clinics page |
| S11 | `/clinic/mehdipatnam` | Mehdipatnam |
| S11 | `tel:+919030648393` | +91 90306 48393 |
| S11 | `/clinic/nampally` | Nampally |
| S11 | `tel:+919030598081` | +91 90305 98081 |
| S12 | `/treatments` | Explore our expertise / What Neodent treats. |
| S12 | `/clinic` | Visit our clinics / Both locations in detail. |
| S12 | `/doctors/dr-miftah-ur-rahman` | Meet our clinical team / The wider Neodent clinical team. |
| S14 | the two `tel:` numbers and `/privacy-policy` | (ContactNextStep) |

Buttons: "View full archive" (aria-label "Open full archive — 16 newspaper items"), ten S9 item buttons, the player "Play: ..." facade button, "Send request" (form).
The S12 "Meet our clinical team" and the S5 "View profile" go to the same doctor page. External sites: none from links. YouTube is reached only through the S9 player.

**(g) S9.**
- Items: **ten** confirmed. All are `<button aria-pressed>` in a `<ul>`. Titles and categories (category labels as written in code, shown uppercase by CSS):
  1. Common problems in teeth and their treatment. / Dental Education
  2. Natural remedies for teeth problems. / Dental Education
  3. Doctor se Mulaqat with Dr. Mohd. Siraj Ur Rahman. / Media / Dental Care
  4. Dr. Mohd. Siraj Ur Rahman on ETV. / Media / Dental Care
  5. Aap Ki Sehat — Dr. Mohd. Siraj Ur Rahman. / Media / Dental Care
  6. Dr. Mohd. Siraj Ur Rahman, Dentist. / Media / Dental Care
  7. Early childhood dental caries: prevalence, risk factors and prevention. / Dental Education
  8. Diabetes and dental health. / Oral Health Awareness
  9. Oral cancer — an awareness lecture. / Oral Health Awareness
  10. Dr. Mohd. Siraj Ur Rahman. / Media / Dental Care
  YouTube IDs and descriptions are in `AboutMedia.tsx` (`mediaArchive`) and must not change.
- Player: a YouTube **facade**. A `<button>` with the `i.ytimg.com/vi/<id>/hqdefault.jpg` poster (`alt=""`, `unoptimized`, 16:9, 422x238 at 1440) and a play icon. On press it asks for embedded-media consent (inline gate: "Allow & play" / "Manage preferences"). With consent it mounts `youtube-nocookie.com/embed/<id>?rel=0` in an iframe with `loading="lazy"` and a `title`. Nothing loads from YouTube before the press. No autoplay. State is client-side (`useState`), the panel is re-mounted per film.
- Desktop right side: **not empty**. At 1366 and 1440 the panel is a 468 px wide, about 490 px tall `position: sticky` card in the right grid columns. It rendered blank in the plan's full-page capture because sticky elements land at the page top of a full-page screenshot. No fix needed for "empty half"; the redesign should keep the sticky behaviour.
- No-JS HTML: all ten buttons, the poster `<img>` and the panel text for film 1 are present. No iframe.
- The first film's description ("Dr. Mohd. Siraj Ur Rahman discusses common dental problems and the treatment options available for them, on Doctor Aap Ka.") is shown in the panel on desktop **and** mobile. The other nine descriptions exist only in JS state (they appear when selected), so they are not in the server HTML today.

**(h)** Media (alt in `content-snapshot.json`):
- S1 one photo; S4 one portrait (`.png`, cut-out on a charcoal panel); S5 one photo; S6 four cuttings; S7 one photo (awards cabinet); S8 one photo (ceremony); S9 the YouTube poster; S10 two photos and two cuttings; S11 two photos. Total 16 `<img>` in `<main>`. Confirmed.
- No alt missing except the S9 poster (`alt=""`, decorative; the button carries the label).
- Text drawn over the Republic Day photo is **part of the image pixels**, not DOM text. It reads "On occasion of 73rd Republic day, Dr Md Siraj Ur Rahman addressing the gathering at Govt. Dental College and Hospital Hyderabad." It names the founder, not Dr. Miftah (see CONTENT_QUESTIONS Q6b).
- No video files on the page. S1 is `preload` (the only priority image).

**(i)** S8 is the closing row of the S7 section, rendered by `AboutRecognition.tsx` (ceremony photo left, statement `<p>` right).

**(j)** See the table in section 1. Confirmed.

**(k)** Yes. Home `LegacyStory` renders a 1180 x 200 px full red card (`rgb(215,25,32)`). So a large red card exists on home, and the S7 red card follows that pattern. D1 stays unticked, so the red card remains.

**(l)** None of "Dr. Muti Ur Rahman", "Save the natural teeth till the last stage.", "Madina Gold Medal" or "Smile Designer" appears on the page.

**(m)** Computed sizes (390 / 1440): eyebrow 9.5 px / 11 px; hero caption lines 11 px; card `dt` labels 11 px; `.label` 11 px below 1024 and 12 px above; "Years of experience" 11 px; photo source lines 11 px; "View full archive" and "Phone" 11 px; S2 label 12 / 12.5 px; S9 category labels 12 px; captions (`medium`) 13 px. Under 12 px: eyebrow, hero caption, `dt`, `.label` (mobile), `.exp span`, `.source`, `.cta`.

## 4. Baseline audit (run R0, `.audit/about/R0/`)

| Viewport | Horizontal overflow | Media over 70% of viewport | Text under 12 px | Small tap targets |
|---|---|---|---|---|
| 360x740 | 0 | 0 | 7 | 1 (honeypot input in ContactNextStep, not ours) |
| 390x844 | 0 | 0 | 7 | 1 (same) |
| 768x1024 | 0 | 1 (S6 lead cutting, 75%) | 7 | 1 (same) |
| 1366x650 | 0 | 10 | 6 | 0 |

At 1366x650 the over-70% items are: S1 photo, S5 photo, all four S6 cuttings, S7 awards, both S10 cuttings, the S11 lead photo. Page height: 19,546 px at 390.
Section heights at 390 (screens of 844): S1 1.27, S2 0.26, S3 2.03, S4 2.56, S5 1.79, S6 2.44, S7+S8 1.93, S9 3.13, S10 1.56, S11 1.91, S12 0.69.

## 5. Existing JSON-LD

From `app/layout.tsx`, not `page.tsx`: MedicalOrganization, Dentist, Dentist, WebSite. Nothing page-specific.
