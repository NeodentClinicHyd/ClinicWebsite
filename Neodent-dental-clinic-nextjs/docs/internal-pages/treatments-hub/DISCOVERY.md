# DISCOVERY: treatments-hub (`/treatments`)

R0, 31 Oct 2026. Nothing was fixed or changed. Baseline: `content-snapshot.json` (units=142, headings=31, links=17, images=18, buttons=5, embeds=6, jsonLd=5). Dev server `http://localhost:3000/treatments` returned 200.

## Page structure (real)

Route `app/treatments/page.tsx` renders `TreatmentsClientChrome` (a client component in `app/treatments/TreatmentsClientChrome.tsx`), which renders Navbar, `<main>` with nine Hub sections, Footer and a fixed mobile call bar. All sections live in `components/treatments/hub/`, with one CSS Module (`hub.module.css`) and data in `lib/treatments-hub.ts`.

## Sections in order

| # | Plan | Heading | Component | File |
|---|---|---|---|---|
| S0 | Page header | h1 "Dental care for the concerns that bring you to Neodent." | `HubHero` (top half) | `components/treatments/hub/HubHero.tsx` |
| S1 | Intro | none (serif statement + 3 paragraphs) | `HubHero` (bottom half, `.intro`) | same file |
| S2 | Featured | h2 "Featured dental treatments." | `HubTreatments` | `HubTreatments.tsx` |
| S3 | Additional | h2 "Additional dental services." | `HubBeyond` | `HubBeyond.tsx` |
| S4 | Thinking | h2 "The thinking behind treatment." | `HubThinking` | `HubThinking.tsx` |
| S5 | DMLS | h2 "Understanding DMLS Crowns & Functional Strength" | `HubDmls` | `HubDmls.tsx` |
| S6 | Process | h2 "How treatment takes shape." | `HubPlanning` | `HubPlanning.tsx` |
| S7 | Real cases | h2 "Real cases. Visible outcomes." | `HubWork` | `HubWork.tsx` |
| S8 | Evidence | h2 "Experience, evidence & what patients see." | `HubEvidence` | `HubEvidence.tsx` |
| S9 + S10 | FAQ + contact | h2 "Questions about treatment" and h3 "Ready to discuss your dental concerns?" | `HubQuestions` | `HubQuestions.tsx` |

## Plan versus real page

Content in the page that the plan missed or described differently:

1. **S10 is not the shared `ContactNextStep`.** It is an `<aside>` ("Ready to discuss your dental concerns?", paragraph with the `send an enquiry` link, "Call Neodent" button, two branch rows with hours, Call and Directions, "Sunday holiday") built inside `HubQuestions`, in the right column beside the FAQ. It is `position: sticky` on desktop (`hub.module.css` line ~1634). That explains the blank right half in the full-page desktop capture: the sticky card was not painted. The plan's R6 text "fills the blank right side" therefore needs a different reading (see Answers, Q3).
2. **"Call Neodent" button on the page itself** (S0 `heroActions`) is hidden below 768 px on purpose (`display: none`, comment "The fixed mobile call bar already carries this button"). The fixed bar (`.mobile-bar` in the chrome) holds a "Call Neodent" button on mobile.
3. **The seven treatment cards** all link to dedicated pages. The "Read more" `<details>` branch in `HubTreatments` is dead code today (no `href` missing); the long text is not rendered.
4. **The "Dr. Md. Miftah Ur Rahman" profile link** in S4 reads "View Dr. Md. Miftah Ur Rahman’s profile" with a typographic apostrophe.
5. **Image alt text for card photos** (e.g. "Full mouth rehabilitation with implants after surgery") differs from the plan's idea of "descriptive alt"; they are kept as is.
6. **There is no heading for S1.** The serif statement is a `<p>`.
7. **Three JSON-LD blocks in `page.tsx`** (BreadcrumbList, CollectionPage, FAQPage) are emitted in one `<script>` array; four more come from the layout.

Plan sections that do not exist: none. Every section in the plan exists.

## Images and videos

Videos (all native `<video>`, `preload`, poster present, played via `HubVideo` poster-first or the hero autoplay):

| Where | Source (`public/`) | Poster | aria-label |
|---|---|---|---|
| S0 hero (autoplay, muted, loop, **native controls on**) | `/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4` | `/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.jpg` | "Dr. Md. Miftah Ur Rahman explains DMLS crowns and masticatory efficiency" |
| S5 DMLS | same mp4 as the hero | `/assets/neodent-dmls-crowns-dental-model-front-view.jpg` | "Dr. Md. Miftah Ur Rahman explaining DMLS crowns and masticatory efficiency" |
| S7 feature film | `/assets/treatment-video/neodent-full-mouth-rehabilitation-using-dental-implants.mp4` | `/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg` | "Full mouth rehabilitation using dental implants at Neodent Dental Hospital Mehdipatnam" |
| S7 tile 1 | `/assets/treatment-video/dr-miftah-neodent-clinical-treatment-detailed.mp4` | `/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg` | "Clinical Treatment Detail. The reception and consultation wing at Neodent Dental Hospital Nampally" |
| S7 tile 2 | `/assets/treatment-video/dr-miftah-neodent-crown-cementation-procedure.mp4` | `/assets/neodent-dmls-crowns-dental-model-side-view.jpg` | "Crown Cementation. A dental model of DMLS crowns held against a glass plate, side view" |
| S7 tile 3 | `/assets/treatment-video/dr-miftah-neodent-dental-treatment-procedure.mp4` | `/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp` | "Treatment in Practice. Clinical dental treatment in progress at Neodent Dental Hospital" |

All seven mp4 files carry an audio track (checked in the file headers). Whether the track is speech cannot be checked from code. No `<track>` captions exist; the hero subtitles (if any) are burned into the video.

Images (18 in the snapshot, all `loading="lazy"`; no `priority`; dimensions come from `fill` so no width/height attributes):
- S2: seven card photos from `/assets/treatment/*` (alts: "Full mouth rehabilitation with implants after surgery", "Composite build-up smile design after treatment", "Upper arch rehabilitation with implants after surgery at Neodent Dental Hospital" (this photo is used for Dental Implants), "Root canal treatment at Neodent Dental Hospital", "Orthodontics result after treatment at Neodent Dental Hospital Nampally", "Anterior smile design with zirconia crowns after treatment", "Scaling and polishing result at Neodent Dental Hospital").
- S4: two portraits, `/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png` (714x623) and `/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png` (794x741), with the long alts quoted in the snapshot.
- S6: `/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam treatment room 1.jpeg`, alt "Neodent Dental Hospital Mehdipatnam — a fully equipped dental treatment room".
- S7: eight before/after photos (four cases), alt "<case> - before treatment" and "- after treatment". Faces are pixelated in the source files.

## Existing JSON-LD

From the layout: MedicalOrganization, Dentist (x2), WebSite. From `page.tsx` (one script, array): BreadcrumbList, CollectionPage (ItemList of seven treatments with URLs), FAQPage (built from `TREATMENTS_FAQ`, the same array as the visible FAQ). No `aggregateRating`, no `Review`.

## Reference components

Home components named in the plan (paths; CSS Module where one exists):

| Component | TSX | CSS |
|---|---|---|
| Hero | `components/hero/Hero.tsx` | none; styles are `.hero-*` classes in `app/globals.css` |
| ExperienceIntro | `components/sections/ExperienceIntro.tsx` | none found beside it (styles in `app/globals.css`) |
| LegacyStory | `components/sections/LegacyStory.tsx` | `components/sections/LegacyStory.module.css` |
| SpacesDesignedAroundCare | `components/sections/SpacesDesignedAroundCare.tsx` | `...SpacesDesignedAroundCare.module.css` |
| Expertise | `components/sections/Expertise.tsx` | none (`.treatment-atlas-*` in `app/globals.css`) |
| ClinicalLeadership | `components/sections/ClinicalLeadership.tsx` | `...ClinicalLeadership.module.css` |
| PatientStories | `components/sections/PatientStories.tsx` | `...PatientStories.module.css` |
| WhatToExpect | `components/sections/WhatToExpect.tsx` | `...WhatToExpect.module.css` |
| SeamCard | `components/sections/SeamCard.tsx` | `...SeamCard.module.css` |
| ContactNextStep | `components/sections/ContactNextStep.tsx` | `...ContactNextStep.module.css` |
| Reveal / CountUp / useReveal | `components/motion/*.tsx|ts` | `components/motion/motion.module.css` |

Existing hub CSS already copies most of these recipes (see header comment in `hub.module.css`), so it is the closest local reference.

## Answers

- **Q1 (mobile "Call Neodent").** Hidden on purpose. `.heroActions { display: none }` under 768 px in `hub.module.css`; the fixed `.mobile-bar` in `TreatmentsClientChrome` shows the button. R1 shows a button in the header at all widths (plan requirement) and keeps the fixed bar as is.
- **Q3 (consultation block on desktop).** `ContactNextStep` is **not** rendered. The consultation content is the `<aside class="contact">` inside the FAQ section, in the right column, sticky from 1024 px up (`faqGrid` is 12 columns; `faqMain` left, `contact` right). In a full-page screenshot a sticky element is painted where the viewport was when the capture ran, which explains the empty right half. On mobile the aside stacks below the FAQ, which is why it appears there.
- **Q5 (JSON-LD).** BreadcrumbList, CollectionPage, FAQPage exist in `page.tsx`; the FAQPage is generated from `TREATMENTS_FAQ`. So no FAQPage needs to be added. If A2 (two extra FAQs) is approved, adding them to `TREATMENTS_FAQ` (shared file) would change the JSON-LD; see CONTENT_QUESTIONS.
- **Q6 (additional services).** `additionalServices` in `lib/treatment-data.ts` are plain strings rendered as `<li>` text. None are links. They stay plain pills.
- **Q7 (videos).** See the table above. Native `<video>`; subtitles, if any, are burned in; no `<track>`. Sound: the hero and DMLS videos show Dr. Miftah explaining, so a sound button applies. Speech in the feature film and the three tiles is not verifiable from code, so those get no sound button until the owner confirms.
- **Q8 (routes).** All seven exist: `/treatments/full-mouth-rehabilitation`, `/composite-build-up`, `/dental-implants`, `/root-canal-treatment`, `/braces-and-orthodontics`, `/smile-design`, `/scaling-and-polishing`. Treatment names in the header paragraph can link to them. Two names in the paragraph map directly ("dental implants", "full mouth rehabilitation"). The rest of the listed names (crowns, dentures, veneers) do not have pages and stay plain text.
- **Help card DOM order.** "Not sure which treatment you need?" is the **last** `<li>` after the seven treatment `<li>`s. Desktop places it in column 3 of row 1 by CSS grid (beside the wide first card), which is why it looks first. DOM order stays.
- **S8 statement.** A `<p>` (`statementText`), not a heading.
- **CountUp decimals.** Supported (`decimals` prop). Rating values can count to "4.3" and "4.5". Review counts are strings ("260 reviews") in `lib/treatments-hub.ts`; to use CountUp on the count only, the component must split the number from the word ("260" + " reviews") while rendering the same text.
- **EditorialHighlight placement.** Wrappers sit inside the components' JSX (HubHero, HubTreatments, HubThinking, HubDmls, HubPlanning, HubWork), not inside the data text. FAQ answers, doctor rows, DMLS rows and the evidence data have none.

## Addendum (found at R1): video dimensions

Read from the mp4 track headers. All six videos used on the page are **portrait 9:16**: the four Dr. Miftah films are 608x1080, the full mouth rehabilitation film is 1080x1920. The plan calls the S7 feature film "landscape"; it is not. The old page crops it into a 16:9 frame with object-fit: cover. R5 therefore frames the feature film as a portrait object (capped at `--media-max-h-compact`) rather than a landscape one.
