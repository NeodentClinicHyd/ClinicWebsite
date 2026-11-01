# DISCOVERY: dr-miftah (`/doctors/dr-miftah-ur-rahman`)

R0, 1 Nov 2026. Baseline: `content-snapshot.json` (server HTML, JavaScript off; 418 text units, 69 headings, 26 links, 70 `img`, 5 JSON-LD blocks, 42,022 characters). Screenshots: `.audit/dr-miftah/R0/`.

Tooling note: `scripts/page-content-snapshot.mjs`, `page-content-check.mjs` and `page-audit.mjs` named in the plan **do not exist** in `scripts/`. The earlier page sessions kept equivalents under `.audit/<slug>/tools/`. This session copied `.audit/doctors/tools/*` to `.audit/dr-miftah/tools/` (no existing script edited) and uses those: `node .audit/dr-miftah/tools/page-audit.mjs dr-miftah /doctors/dr-miftah-ur-rahman <run>`. The Global Standard document is not in the repo either; the plan text, the home components and the finished `/doctors` page were the references.

## 1. Sections in order (real page)

| # | Heading | Component (all in `components/doctors/DrMiftahProfile.tsx` unless noted) |
|---|---|---|
| Hero | h1 "Dr. Md. Miftah / Ur Rahman" | `Hero` (uses shared `Atmosphere`, ghost "DR.", coordTag "NEODENT · HYD") |
| 01 | "The record, / in brief." | `ProfileIndex` |
| Seam | "Saving natural teeth, / even when it is mobile." (props `lead`, `emphasis`) | shared `SeamCard` (home component) |
| 02 | "A steady hand. / A considered approach." | `Biography` |
| 03 | "Where his work / goes deepest." (h3 cards) | `Specialisation`, then `SmileDesignStory` (`components/doctors/SmileDesignStory.tsx`, h3 "The clinical thinking behind a confident smile.") |
| 04 | "Clinical care / across key concerns." (`id="clinical-focus"`) | `FullScope` |
| 05 | "A foundation / built formally." | `Education` |
| 06 | "Published work / and teaching." (`id="published-work"`, publications `id="publications"`) | `AcademicResearch` (+ `FilmCard`) |
| 07 | "See the work / behind the treatment." | `InPractice` (+ `FilmCard`) |
| 08 | "What patients say. / In their own words." | `PatientVoices` |
| 09 | "Recognition / earned over time." | `RecognitionSection` (+ `MediaRail`) |
| 10 | "Two doors. / One standard of care." | `WhereToFindHim` (`OffsetImagePair`, `Atmosphere`) |
| End | "Begin with a conversation." | `ClosingCta`, **inside the page file**, not `ContactNextStep` |

Every h2 is `line1` + `<span class=headingAccent>line2</span>` (the red-italic second line on all twelve).

## 2. Content the plan missed, and corrections to the plan

Read from the code (all R0 items):
- Header buttons: "View Clinical Specialties" -> `#clinical-focus`; "Read PubMed Articles" -> `#publications` (in-page anchors, not external).
- 09 heading: line 1 "Recognition", line 2 "earned over time." Labels "Press archive" and "13 clippings · select to enlarge".
- Publications (3): 01 Cureus 2026 "Patient-Reported Outcome Measures (PROMs) in Metal-Ceramic and All-Ceramic Fixed Partial Dentures: A Prospective Clinical Study" (pubmed 41798508); 02 Bioinformation 2026 "Clinical evaluation of peri-implantitis relation with implant material" (42662028); 03 Journal of Pharmacy and Bioallied Sciences 2024 "Evaluation of Different Materials used in Prosthetic of Dental Implants: A Comparative Study" (39346305). Plus a PubMed logo and "Indexed on PubMed · 03 publications".
- Reviews: 01 "Victory Technical", 2 months ago; 02 "I had restricted mouth opening. Alhamdulillah Dr Miftah treated me and I'm recovering. Painless treatment." Khaja Pasha, 5 months ago; 03 Syed Moinuddin 1 year ago; 04 M Kishore 4 months ago; 05 Laxminarayana Chikkula 1 year ago. All five carry a "VIA GOOGLE" tag.
- Fifth education stage: kicker "Formal recognition", title "Gold Medallist", no lines.
- Address: the Mehdipatnam address in code is **10-3-14B/11/1** (the plan's "10-3-148/11/1" is a misread of the scaled screenshot). Code is correct; keep it.
- Items **not in the plan's content map** that must survive:
  1. Section 05 has a **second photograph** "dr-miftah-award-recognition.jpg" with caption "Professional ceremony" and a roman "ii" mark.
  2. Section 03 "Explore treatment" is a **button that opens a dialog** (`TreatmentDetailDialog`, four dossiers), not a link to a treatment page. The four dossiers (`h3`/`h4`, about 40 headings) are also rendered in a hidden `<div data-dossier-source>` in the server HTML.
  3. Section 03 root-canal card has two film buttons "Explainer" and "Treatment" that open the viewer.
  4. The 06 teaching block heading "Teaching", and the publications sub-heading "Selected Publications".
  5. The closing block text: "Your next visit", "Begin with a conversation.", "Choose your preferred location, then let's begin.", buttons "Call Mehdipatnam · +91 90306 48393" and "Call Nampally · +91 90305 98081". It is not the shared `ContactNextStep`.
  6. Branch labels "01 / MEHDIPATNAM — HYDERABAD" and "02 / NAMPALLY — HYDERABAD" and image labels "01 / MEHDIPATNAM · EXTERIOR", "02 / NAMPALLY · EXTERIOR", "Interior".
  7. The press rail renders the 13 clippings **twice** (marquee loop); the second set has empty alt and is `aria-hidden`.
  8. Hero tag reads "01 / Clinical practice"; ghost text is "DR." (with a full stop); meta items are `aria-hidden`.
- Plan says the page ends with `ContactNextStep`; it does not. Replacing the inline block with the shared component would remove copy, so R1 to R10 keep `ClosingCta` (restyled only).
- Plan says opening hours are not on the page; right: a code comment says hours were **deliberately left off** while the Google Business Profile discrepancy is resolved. See "Hours source" and Q-H in `CONTENT_QUESTIONS.md`.

## 3. Media inventory (page)

Images are listed with path and alt in `content-snapshot.json` (`images`). Summary: hero `banner_image.jpeg` (992x926, `priority`), operatory photo (704x1372), treatment-room inset (4032x3024), 3 radiographs, 6 before/after, 6 smile-case steps, award photo (1170x1150), ceremony photo (1280x960), seminar photo (1008x1071), PubMed logo, 2 RCT posters, 3 practice posters, 13 press clippings (x2 in DOM), 4 clinic photos. **Videos: none in the DOM** (poster-first). Five MP4 files: two RCT films (`treatments/*.mp4`) and three practice films (`/assets/treatment-video/*.mp4`).

How films open: every `FilmCard` is a button that opens `TreatmentEvidenceViewer` (modal, mounts and plays the MP4 on open). Nothing plays in place. Which films have speech: not determinable from code (no captions or flags). The two RCT posters show on-screen subtitles ("the fact is that the root canal...", "there is a myth that it is better to extract the tooth"), so those two have speech. The three practice films: unknown (Q6).

Zoom and lightbox components: `components/doctors/TreatmentEvidenceViewer.tsx` (images and video, used by 03 thumbnails, case story, films, press rail), `SmileDesignStory.tsx` (six-photograph viewer), `MediaRail.tsx` (press rail uses the same viewer). `Reveal` / `CountUp` from `components/motion` are **not used**; the page has its own `useRevealScope` (IntersectionObserver, `data-reveal` attributes, hidden state only under `[data-reveal-ready]`, set by JavaScript).

## 4. JSON-LD present (5 blocks)

`MedicalOrganization`, `Dentist` (x2) and `WebSite` come from the site layout. This route adds one block: `[ProfilePage (mainEntity Person/Physician), BreadcrumbList]`. No Review, AggregateRating, FAQPage. These stay byte-identical.

## 5. Reveal check

- JavaScript off: the snapshot holds all 418 text units. The hidden start state only applies under `[data-reveal-ready]`, which JavaScript sets, so nothing is hidden without JavaScript.
- With a slow scroll (screenshots `R0/s05-edu.png`, `s06.png`, `s08.png`): 05 fifth stage "Gold Medallist" renders at full contrast. 08 shows all five cards. These were **reveal artifacts** of the full-page capture, not bugs.
- 06 "gap" is partly real: after the reveal there is no 350 px hole between heading and content, but the **left column of "Clinical teaching" has about 280 px of empty space** under its two lines (the intro column stretches to the height of the tall film cards). R4 fixes that.
- 09 first heading line is "Recognition".

## 6. Baseline audit (R0, `.audit/dr-miftah/R0/audit.json`)

| Viewport | overflowX | media > 70% | tap < 44 | text < 12 px | h1 |
|---|---|---|---|---|---|
| 360 | 0 | 0 | 7 | 25 | 1 |
| 390 | 0 | 0 | 7 | 25 | 1 |
| 768 | 0 | 0 | 18 | 25 | 1 |
| 1366x650 | 0 | **7** | 0 | 25 | 1 |
| 1440 | 0 | 0 | 0 | 25 | 1 |

Over-70% items at 1366x650: hero portrait (74%), operatory photo (88%), 2 RCT posters (71%), 3 practice posters (93%). Document heights: 360 px: 19,992; 1366: 13,865.

## 7. Philosophy statement

| Hit | File | Line | Owned? | Kind |
|---|---|---|---|---|
| "Saving natural teeth," + "even when it is mobile." | `components/doctors/DrMiftahProfile.tsx` | 397-398 | OWNED | visible text (SeamCard props, split across `lead` and `emphasis`) |
| "Save the natural teeth till the last stage." | `components/sections/ClinicalLeadership.tsx` | 233 | SHARED | typed inline; **not** exported from `lib/clinical-team.ts` |

The old sentence is not in metadata, JSON-LD, alt text or any image-generation file. Nothing needs a shared-change request. The new sentence will be a constant in `lib/pages/dr-miftah-content.ts`. Other "Saving natural teeth" hits are category labels and stay: card title (line 1072), film meta (line 2017), dossier title in `lib/miftah-treatment-dossiers.ts:100`.

## 8. Hours source

`lib/site-data.ts`: `mehdipatnamHours = "4:00 PM - 8:00 PM"`, `nampallyHours = "10:30 AM - 5:00 PM"`. `lib/clinic-data.ts`: per branch `hours`, `weeklyHours: "Monday-Saturday"`, `schemaOpeningHours` ("Mo-Sa 16:00-20:00", "Mo-Sa 10:30-17:00"). So the export exists and no shared request is needed. A comment in the page says hours were deliberately left off pending a Google Business Profile discrepancy; the plan (Q9) asks for the owner's confirmation. See `CONTENT_QUESTIONS.md`.
