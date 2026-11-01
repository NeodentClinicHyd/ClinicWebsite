# DISCOVERY: /clinic/mehdipatnam (R0, 2 Nov 2026)

Source: server HTML snapshot (`content-snapshot.json`, JS off) and the component files. Baselines: Mehdipatnam units=109, headings=18, links=24, images=11, buttons=8, embeds=1, JSON-LD=5. Nampally guard units=108, links=24, images=10.

## 1. Rendered sections, in order

`app/clinic/[slug]/ClinicBranchClientChrome.tsx` renders `Navbar overHero`, then `<main>`, then `Footer`.

| # | Plan id | Heading | Component | Surface today |
|---|---|---|---|---|
| 1 | S1 | h1 "Neodent Dental Hospital, Mehdipatnam" | `BranchHero` | dark |
| 2 | S2 | h2 "Where Neodent began, in Humayun Nagar." + h3 "Visit & contact" | `BranchDetails` | ivory |
| 3 | S3 | h2 "Inside Mehdipatnam, room by room." | `BranchGallery` | **dark** (charcoal) |
| 4 | S4 | h2 "Featured dental treatments at Mehdipatnam." + h3 "Additional dental services" | `BranchTreatments` | ivory |
| 5 | S5 | h2 "The people behind your care." | `BranchClinicalTeam` | dark (charcoal) |
| 6 | S6 | h2 "Dr. Md. Miftah Ur Rahman", h2 "Neodent Dental Hospital, Nampally" | `BranchConnections` | ivory |
| 7 | S7 | h2 "A patient’s experience in their own words." | `BranchPatientStory` | ivory |
| 8 | S8 | h2 "Planning a visit to Mehdipatnam? Call, or get directions." | `BranchVisit` (local block) | ivory with red card |

## 2. Differences between the plan and the real page

1. **Gallery is dark, not light.** The plan assumed a light gallery with captions beneath. The real rhythm is dark hero, ivory, dark gallery, ivory, dark team, ivory, ivory, red card. No two dark bands touch. Decision for R2: keep the gallery dark (changing it to light would put S2, S3 and S4 in a row). R4's "S5 is the only dark band between S1 and the footer" is read as "never more than two dark bands in a row".
2. **Gallery has 8 photographs, not 9.** The header photo (waiting lounge) uses the same file as gallery photo 1 (`neodent dental hospital-mehdipatnam-interior.jpg`).
3. **Intro has 3 paragraphs, 101 words in total** (30 + 31 + 40). Under the 120-word line, so no `<details>` for paragraph three.
4. **S8 is a local block**, not `ContactNextStep`. It has three actions: Call, Get directions, Send an enquiry. Restyle locally.
5. **Doctor card has no quote.** The plan's quote "Save the natural teeth till the last stage." is not on this card, so it is not added.
6. **Patient video has no poster, no `muted`, no `loop`, `preload="metadata"`.** Keeping `metadata` (first frame is the only poster). See CONTENT_QUESTIONS.
7. **Patient attribution** is "Patient testimonial · Mehdipatnam" (label) plus a "Shared with permission..." note. No named attribution.
8. **Additional services** are plain text list items (not links), in four groups.
9. **The page is a client component tree** (`ClinicBranchClientChrome` is `"use client"`). Metadata and JSON-LD stay in the server `page.tsx`.
10. **Nampally** renders the same template; its gallery has 10 images and its snapshot has 108 units.

## 3. Exact content facts

- h1: `Neodent Dental Hospital, Mehdipatnam` (a sr-only comma sits between "Hospital" and the place name; the place name is the red accent span).
- Eyebrow: `Humayun Nagar · Mehdipatnam · Hyderabad` (`clinic.locality`).
- Lede: "Neodent’s original Hyderabad location is in Humayun Nagar, Mehdipatnam. The clinic offers evening appointments from Monday to Saturday." Contains Mehdipatnam and Hyderabad. It does not say "dental hospital"; the h1 and the intro paragraph 2 do.
- Hours line in hero: `Monday–Saturday · 4:00 PM – 8:00 PM · Sunday holiday` (from `clinic.weeklyHours`, `clinic.hours`, `clinic.weeklyClosure`).
- Hero caption: `Mehdipatnam` / `Waiting lounge`.
- Hero photo: `/assets/neodent-clinic-mehdipatnam/neodent dental hospital-mehdipatnam-interior.jpg` (960 x 1280 portrait), alt "Patient waiting lounge at Neodent Dental Hospital, Mehdipatnam". Loaded with `preload` (priority).
- Intro paragraphs: 3 (see snapshot). Heading `Where Neodent began, in Humayun Nagar.` with the second line in the red-italic span.
- Visit & contact card: h3 "Visit & contact" (+ sr-only " — Neodent Mehdipatnam"); rows Address, Phone, Hours, Google rating ("4.3 / 5 from 261 Google reviews" + note "Google listing snapshot; rating and review count may change."). No email row. Buttons: `Call` (sr "Neodent Mehdipatnam") and `Get directions` (new tab).
- Primary phone: `+91 90306 48393`, `tel:+919030648393`, from `clinic.tel` / `clinic.phone`.
- Button labels: hero `Call +91 90306 48393`, `Get directions`; card `Call`, `Get directions`; closing block `Call +91 90306 48393`, `Get directions`, `Send an enquiry`.

### Gallery (8 photographs, `clinic.gallery`; lightbox = `ClinicGalleryViewer`, opens on button press, `aria-haspopup="dialog"`)

| # | Label (caption) | Alt text | File |
|---|---|---|---|
| 1 | Waiting lounge | Neodent Dental Hospital Mehdipatnam — the patient waiting lounge with its blue chandelier | `neodent dental hospital-mehdipatnam-interior.jpg` (960x1280) |
| 2 | Entrance | ... the carved wooden entrance doorway | `Neodent dental hospital - mehdipatnam Exterior.jpg` (382x510) |
| 3 | Reception counter | ... the front-desk reception counter | `Neodent dental hospital mehdipatnam exterior of clinic.jpeg` (4032x3024) |
| 4 | Director's office | ... the director's consultation office | `... interior of clinic.jpeg` (3024x4032) |
| 5 | Treatment room | ... a fully equipped dental treatment room | `... treatment room 1.jpeg` (4032x3024) |
| 6 | Treatment chamber | ... a second dental treatment chamber | `... treatment room 2.jpeg` (3024x4032) |
| 7 | Patient lounge | ... a quiet patient lounge between chambers | `... waiting area.jpeg` (1280x1707) |
| 8 | Waiting hall | ... the main waiting hall outside the consultation chambers | `... waiting area wide area.jpeg` (4032x3024) |

Gallery intro: "Photographs of the carved entrance, ... Select any photograph to view it in full."

### Treatments (S4)

Seven cards in order, each a link with title, one-line summary and intent word: Composite Build-up (REPAIR), Dental Implants (REPLACE), Root Canal Treatment (PRESERVE), Braces & Orthodontics (ALIGN), Smile Design & Cosmetic Dentistry (REFINE), Full Mouth Rehabilitation (REBUILD), Scaling & Polishing (MAINTAIN). Hrefs: `/treatments/composite-build-up`, `/dental-implants`, `/root-canal-treatment`, `/braces-and-orthodontics`, `/smile-design`, `/full-mouth-rehabilitation`, `/scaling-and-polishing`. Additional dental services: four groups (Restorative & Prosthodontics: 4 items; Cosmetic Dentistry: 4; General & Preventive: 4; Surgical: 2), 14 items, plain text. "Explore all treatments" -> `/treatments`.

### Team (S5), 7 members, order from `lib/clinical-team.ts`

1. Dr. Mohd. Siraj Ur Rahman: BDS · FCIP · MDS (Chennai) / Professor · Director, Neodent · 32+ years. Link `/about#founder`.
2. Dr. Md. Muti Ur Rahman: MBBS (OSM) · MD (Gen. Med.) / 5+ years.
3. Dr. Asiya Siraj: MBBS (OSM) · MRSH (LON) / 30+ years.
4. Dr. Safoora Talha: BDS · 12+ years.
5. Dr. Muqeet Ur Rahman: BDS (OSM) · Dental Surgeon / 4+ years.
6. Dr. Hafsa Taha: BDS · Dental Surgeon / 5+ years.
7. Dr. Md. Miftah Ur Rahman: Prosthodontist & Implantologist / BDS · MDS · FICOI (U.S.A.). Link `/doctors/dr-miftah-ur-rahman`.

Label "Clinical team", ghost link "Meet our doctors" -> `/doctors`. Photo: `/assets/neodent-dental-hospital-doctors.jpeg` (3840x1728 landscape), alt "Neodent clinicians and team members gathered inside the hospital", caption "The Neodent clinical team". Roster rows are 7, below the "fifth row onward" collapse threshold only if it exceeds two phone screens (R4 measures).

### S6 cards

- Doctor card: label "Clinician · Mehdipatnam", h2 "Dr. Md. Miftah Ur Rahman", role "Assistant Director · Prosthodontist & Implantologist", paragraph about profile, link "View his profile" -> `/doctors/dr-miftah-ur-rahman`. No portrait.
- Other-clinic card: label "Our other clinic", h2 "Neodent Dental Hospital, Nampally", "Nampally · Hyderabad", "Open Monday–Saturday, 10:30 AM – 5:00 PM.", link "Visit the Nampally clinic page" -> `/clinic/nampally`. Thumb: Nampally exterior (1280x960), alt "Street frontage of Neodent Dental Hospital, Nampally".
- Link "Back to the clinic overview" -> `/clinic`.

### S7 video

`<video controls playsInline preload="metadata" aria-label=...>` with source `/assets/happy-patients/Neodent dental hospital Mehdipatnam - Happy Patients after treatment.mp4`. No poster, no autoplay, no loop, no muted. No captions track or transcript. Quote: "It was very beneficial, and I am feeling good." Note: "Shared with permission. Individual experiences vary; your dentist can explain what to expect for your care."

## 4. JSON-LD (server HTML)

Five blocks: `MedicalOrganization`, `Dentist` (Mehdipatnam `#clinic`), `Dentist` (Nampally `#clinic`), `WebSite`, and the page array (`BreadcrumbList` + `WebPage`). Four come from the layout and `lib/structured-data.ts`; the page array is in `page.tsx`. No `FAQPage` today. Only the FAQ (R6) may add one if the FAQ is added, and the owner approved no schema, so none is added.

## 5. Internal links (24 in `<main>`)

`/`, `/clinic`, `/about#founder`, `/doctors`, `/doctors/dr-miftah-ur-rahman` (twice), `/clinic/nampally`, `/contact`, `/treatments`, seven `/treatments/*` pages, `tel:+919030648393` (four), directions (three, same Google Maps URL). The count must not fall.

## 6. Size and tap-target findings from the CSS (no sweeps run)

Text under 12 px: `BranchTreatments.module.css:160` (11px), `BranchHero.module.css:138, 279` (11px), `BranchClinicalTeam.module.css:41, 56 (10px), 115` (11px), `BranchConnections.module.css:49` (11px), `BranchPatientStory.module.css:48` (10px), and ClinicShared (shared, read-only). Tap-target risk: `BranchHero` breadcrumb `min-height: 24px`, `BranchDetails` `min-height: 32px`. Cards have `min-height: 210px` (treatments) and `300px` (closing card). Hero `min-height: clamp(560px, 78svh, 740px)` is taller than a 1366x650 fit.

## 7. Section rhythm and heading-style findings

Red-italic spans appear on: h1 place name, S2, S3, S4, S5, S7, S8 (`<em>`). Plan target: keep h1, S5, S7; plain ink on S2, S3, S4. S8 is the closing red card (white text, italic second line); keep as is in R5 and report.
