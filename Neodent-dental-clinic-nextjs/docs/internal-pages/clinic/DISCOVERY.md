# DISCOVERY: Clinics hub (`/clinic`)

R0, 31 Oct 2026. Source: the live page at `http://localhost:3000/clinic` (200 OK), the component files, and a Playwright probe (`.audit/clinic/tools/r0-probe.mjs`, output in `.audit/clinic/R0/probe.json`, screenshots `.audit/clinic/R0/*.png`). The content baseline is `docs/internal-pages/clinic/content-snapshot.json` (71 text units, 10 headings, 23 links, 15 images, 10 buttons, 0 embeds, 4 JSON-LD blocks, 3,501 characters, taken from the server HTML with JavaScript off).

Nothing was fixed or changed in this run.

## 1. Sections in order (real page)

Page chrome: `app/clinic/ClinicClientChrome.tsx` = `Navbar overHero` → `<main>` → `Footer`. The floating call button is global (layout).

| # | Heading | Component | File | Surface | Plan section |
|---|---|---|---|---|---|
| 1 | h1 "Two locations. **One Neodent standard.**" | `ClinicHero` (first `<section>`) | `components/clinic/ClinicHero.tsx` | charcoal, 740 px tall at 1366x650 | S0 |
| 2 | (none; label "At a glance", `aria-label="Neodent at a glance"`) | `ClinicHero` (second `<section>`, strip) | same file | ivory | S1 |
| 3 | h2 "Find your clinic. **Mehdipatnam or Nampally.**" (`#our-clinics`) | `ChooseClinic` | `components/clinic/ChooseClinic.tsx` | ivory + faint grid | S2 |
| 4 | h2 "Different surroundings. **The same approach to care.**" (`#clinical-settings`) | `ClinicalSettings` | `components/clinic/ClinicalSettings.tsx` | charcoal | S3 |
| 5 | h2 "Spaces designed **around care.**" (`#inside-neodent`) | `InsideNeoDent` | `components/clinic/InsideNeoDent.tsx` | ivory | S4 |
| 6 | h2 "Featured dental treatments, **at both clinics.**" (`#clinic-treatments`) | `ClinicTreatments` | `components/clinic/ClinicTreatments.tsx` | dark atlas (#242628 + icon pattern) | S5 |
| 7 | h2 "Ready to visit? **Call or send an enquiry.**" (`#visit`) | `ClinicVisit` | `components/clinic/ClinicVisit.tsx` | ivory band holding a red card | S6 |

Surface rhythm: dark, ivory, ivory, dark, ivory, dark, ivory. No more than one dark section in a row.

Heights (1366x650 / 390x844): page 7,064 px / 10,613 px. Header 740 / 1,135. Strip 200 / 262. Clinic cards 1,321 / 2,371. Surroundings 964 / 963. Spaces 1,616 / 2,191. Treatments 837 / 1,688. Visit 437 / 458. No horizontal overflow at either width.

## 2. Differences between the plan and the real page

| # | Plan says | Real page |
|---|---|---|
| 1 | Data comes from `lib/clinic-data.ts`. | The page imports from `lib/site-data.ts` (phones, hours, addresses, directions, images, `clinicGalleryImages`, `legacyStats`) and `components/sections/expertise-data.ts`. `lib/clinic-data.ts` is built from `site-data.ts`, so values match. It is not used by this page today. |
| 2 | Mehdipatnam address "10-3-148/11/1 … 500028". | Rendered and stored as **"10-3-14B/11/1**, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana **500006**". Plan text was read from a small screenshot. Data wins; see CONTENT_QUESTIONS. |
| 3 | S5 eighth card text "…speak with our team **about** your options." | Real text: "Explore our treatments or speak with our team **to understand** your options." (`closingCta` in `expertise-data.ts`). Real text stays. |
| 4 | S0 hours glass cards, plain supporting lines in S2 and S5, breadcrumbs, FAQ. | None exist today. They are additions (Q5, Q7, Q6). |
| 5 | "At a glance" is a tab sitting awkwardly on the strip. | It is a charcoal title block (serif 20 to 24 px with a short red bar) at the left end of the strip. Its `<p>` is `aria-hidden`; the `<ul>` carries `aria-label="Neodent at a glance"`. |
| 6 | Header uses `priority`. | Next 16 (this repo) deprecates `priority` for `preload`. The current hero image uses `preload`. R1 must use `preload`, not `priority` (see `node_modules/next/dist/docs/01-app/03-api-reference/.../image.md`, "preload" and "priority"). |
| 7 | JSON-LD lives in `app/clinic/page.tsx`. | `page.tsx` has none. The 4 blocks (MedicalOrganization, Dentist, Dentist, WebSite) are global. |
| 8 | Strip numbers may count up (unknown). | They do not. Values are static strings (see 5c). |
| 9 | The red band might be `ContactNextStep`. | It is a clinic-only component (`ClinicVisit`). |
| 10 | The first line of the S5 heading is invisible on desktop (a colour clash). | Not a colour issue. See 5d. |
| 11 | Glass cards, tabs, lightbox, swipe rows, `Reveal`, `CountUp`. | None used today. The page uses a local `useReveal` hook (fade-up 12 px, 400 ms) and a shared lightbox `ClinicGalleryViewer`. |
| 12 | Content map lists "Entrance" photo caption for Mehdipatnam card. | Correct. The card alt is "…carved entrance doorway and exterior" (different from the gallery alt for the same file). |

Content the plan did not list:
- The Phone row in each clinic card is a `tel:` link of the number itself (underlined in red) in addition to the "Call" button. Both go to the same `tel:` URL.
- Each "Call" button and "Get directions" button carries visually hidden text ("Neodent Mehdipatnam", "to Neodent Mehdipatnam (opens in a new tab)"). These are real text in the DOM; they count as content.
- Section ids `#our-clinics`, `#mehdipatnam`, `#nampally`, `#clinical-settings`, `#inside-neodent`, `#clinic-treatments`, `#visit` exist. The Footer now links to `/clinic/[slug]`, not these anchors, but keep the ids.
- Each Dr. row is `<a href="/doctors/dr-miftah-ur-rahman">` (plain anchor, not `next/link`).

Plan sections that do not exist: none missing from the page itself. Additions (glass cards, breadcrumbs, FAQ) are new.

## 3. Images (15 placements; all in the server HTML)

Alt text is the exact current text. "Src dims" are the source files (not the resized variants the browser fetches).

| # | Placement | File (under `public/assets/`) | Src dims | Alt | Rendered at 1366x650 | at 390x844 |
|---|---|---|---|---|---|---|
| 1 | Header | `neodent-clinic-mehdipatnam/neodent dental hospital-mehdipatnam-interior.jpg` | 960x1280 | Neodent Dental Hospital, Mehdipatnam — patient waiting lounge interior | 382x510 = **78% vh** | 306x408 = **48% vh** |
| 2 | Card Mehdipatnam | `…/Neodent dental hospital - mehdipatnam Exterior.jpg` | **382x510** (low) | Neodent Dental Hospital Mehdipatnam — carved entrance doorway and exterior | 572x358 = 55% | 356x200 = 24% |
| 3 | Card Nampally | `neodent-clinic-nampally/Neodent dental hospital - nampally Exterior.jpg` | 1280x960 | Neodent Dental Hospital Nampally — street frontage and signage | 572x358 = 55% | 356x200 |
| 4 | Surroundings left | `…mehdipatnam treatment room 2.jpeg` | 3024x4032 | Neodent Dental Hospital Mehdipatnam — a second dental treatment chamber | 354x472 = **73% vh** | 153x204 = 24% |
| 5 | Surroundings right | `…nampally Interior.jpg` | 1280x1707 | Neodent Dental Hospital Nampally — the double-height reception and consultation wing | 354x472 = **73% vh** | 153x204 |
| 6 | Gallery 1 Waiting lounge (feature) | `…mehdipatnam-interior.jpg` | 960x1280 | …the patient waiting lounge with its blue chandelier | 582x412 = 63% | 358x269 |
| 7 | Gallery 2 Entrance | `…mehdipatnam Exterior.jpg` | 382x510 | …the carved wooden entrance doorway | 283x198 | 174x174 |
| 8 | Gallery 3 Reception counter | `…mehdipatnam exterior of clinic.jpeg` | 4032x3024 | …the front-desk reception counter | 283x198 | 174x174 |
| 9 | Gallery 4 Director's office | `…mehdipatnam interior of clinic.jpeg` | 3024x4032 | …the director's consultation office | 283x198 | 174x174 |
| 10 | Gallery 5 Treatment room | `…mehdipatnam treatment room 1.jpeg` | 4032x3024 | …a fully equipped dental treatment room | 283x198 | 174x174 |
| 11 | Gallery 6 Treatment chamber | `…mehdipatnam treatment room 2.jpeg` | 3024x4032 | …a second dental treatment chamber | 283x198 | 174x174 |
| 12 | Gallery 7 Patient lounge | `…mehdipatnam waiting area.jpeg` | 1280x1707 | …a quiet patient lounge between chambers | 283x198 | 174x174 |
| 13 | Gallery 8 Waiting hall (wide) | `…mehdipatnam waiting area wide area.jpeg` | 4032x3024 | …the main waiting hall outside the consultation chambers | 582x198 | 358x269 |
| 14 | Gallery Nampally Reception & staircase | `…nampally Interior.jpg` | 1280x1707 | …the double-height reception and consultation wing | 682x412 | 358x269 |
| 15 | Gallery Nampally Street frontage | `…nampally Exterior.jpg` | 1280x960 | …the street frontage and signage | 482x412 | 358x224 |

(Gallery alts all begin "Neodent Dental Hospital Mehdipatnam — " or "…Nampally — ".)

Media-limit findings against the 70% rule: header photo 78% at 1366x650; both Surroundings photos 73%. At 390 wide the header photo is 48% vh, over the 38dvh cap. The Mehdipatnam gallery on mobile is one 358x269 photo, then a 2-column grid of six small tiles, then another 358x269 photo. The Nampally block is two wide photos stacked (358x269 and 358x224), which the plan forbids.

Several files are used twice on the page (waiting lounge in the header and the gallery; entrance, treatment chamber, street frontage and Nampally reception in a card or the Surroundings section and the gallery). Videos: none. Embeds: none.

JSON-LD types (global, 4 blocks): `MedicalOrganization`, `Dentist`, `Dentist`, `WebSite`. No `FAQPage`, `BreadcrumbList` or `aggregateRating` on this route.

Metadata (kept byte-identical): title "Neodent Dental Clinics in Hyderabad | Mehdipatnam & Nampally"; canonical `https://www.neodentdentalhospitals.com/clinic`; robots `index, follow`; OG and Twitter set in `page.tsx`.

## 4. Links in `<main>` (23, all must survive)

`tel:+919030648393` ×4 (Call Mehdipatnam header, phone number, "Call Neodent Mehdipatnam", band); `tel:+919030598081` ×4 (same for Nampally); two Google Maps directions URLs (`target=_blank`); `/clinic/mehdipatnam`, `/clinic/nampally` ("Clinic details", text only: the clinic names themselves are **not** linked); `/doctors/dr-miftah-ur-rahman` ×2; seven treatment hrefs (`/treatments/composite-build-up`, `/dental-implants`, `/root-canal-treatment`, `/braces-and-orthodontics`, `/smile-design`, `/full-mouth-rehabilitation`, `/scaling-and-polishing`); `/treatments`; `/contact`. The plan says the card names link to the clinic page "if they are linked today": they are not, so do not add that as a requirement.

## 5. Answers

### (a) Red marker underlines: links or `EditorialHighlight`?

They are all **`EditorialHighlight`** (`<mark>` / `<strong>`), none is a link.

| Where | Phrase | Tone | href |
|---|---|---|---|
| Header paragraph | "specialist-led dental care" | secondary, `onDark` | none |
| Header paragraph | "Mehdipatnam and Nampally" | quiet, `onDark` | none |
| Mehdipatnam card paragraph | "Mehdipatnam clinic" | primary (`<strong>`) | none |
| Mehdipatnam card paragraph | "specialist-led dental care" | secondary | none |
| Nampally card paragraph | "Nampally clinic" | primary | none |
| Nampally card paragraph | "consultation, treatment planning, treatment and follow-up" | secondary | none |
| Spaces paragraph | "Mehdipatnam and Nampally" | secondary | none |
| Spaces paragraph | "consultation and treatment" | primary | none |

The third underlined thing in each clinic card is the phone number: a real `tel:` link with a red underline (`.phone` in `ChooseClinic.module.css`). That is a link, not a highlight. So each card has two highlights plus one underlined link, which matches the "three or more underlines" in the plan.

The red `<em>` phrases in the S3 statement card ("patient-focused approach", "defined Neodent since 1994") are italic, not underlined.

Because they are `EditorialHighlight`, the plan rule applies: at most two per section, none as an underline in dark body text. The header's two highlights are on a dark band, so they become plain text there (words kept).

### (b) Is "Ready to visit?" the shared `ContactNextStep`?

**No.** It is clinic-only: `components/clinic/ClinicVisit.tsx` + `ClinicVisit.module.css`. It renders a red card with `AppButton`s (`variant="light"` ×2 for the calls, `variant="ghost"` for "Send an enquiry"). Fork it (R5) and keep the three labels unchanged. Q2 default applies.

### (c) Do the At a glance numbers use `CountUp`?

**No.** `ClinicHero.tsx` defines `glance` as static strings: `Since ${legacyStats.established}` ("Since 1994"), `"2"`, `String(treatments.length)` ("7"), `legacyStats.patientsTreated` ("25,000+"). `CountUp` is not imported anywhere under `components/clinic/`.

### (d) What hides the first part of "Featured dental treatments, at both clinics." on desktop?

It is **not a colour or CSS-rule clash**. The h2 computes to `rgb(241, 238, 231)` (#f1eee7) on `rgb(36, 38, 40)`, about 13:1 contrast, and at 1366 and 390 wide it renders fully (see `.audit/clinic/R0/treatments-1366.png` and `treatments-390.png`).

The h2 carries `data-reveal`. The rule that can hide it is in `components/clinic/ClinicShared.module.css`:

```css
.section[data-reveal-ready] [data-reveal]:not([data-shown]) {
  opacity: 0;
  transform: translateY(12px);
}
```

`useReveal` arms the section (`data-reveal-ready`) once JavaScript runs, and marks the heading `data-shown` only when an IntersectionObserver sees it (or 6 s after mount). Measured on the live page at 1366x650 without scrolling: opacity `0`, transform `translateY(12px)`, `data-reveal-ready="true"`, no `data-shown`; after the 6 s safety net: opacity `1`. In a stitched full-page capture the heading is still in its pre-reveal state, so it is invisible or half-faded depending on timing. The red second line probably looked visible in the owner's screenshot because it was caught partway through the 400 ms transition. This also means every reveal block on this page is hidden in a stitched capture, not only this heading. The audit script must scroll through the page before capturing. No colour fix is needed. R5's real task is to keep the heading in a reveal that cannot leave it hidden.

### (e) Exact text

Strip (value / label): "Since 1994" / "in Hyderabad"; "2" / "clinics"; "7" / "treatments at each clinic"; "25,000+" / "patients treated". (Label of the strip itself: "At a glance".)

Seven treatment cards (title, summary, category word as rendered; icon in brackets), from `expertise-data.ts`:

1. **Composite Build-up**: "Rebuild part of a damaged tooth with tooth-coloured composite resin." REPAIR (Layers). `/treatments/composite-build-up`
2. **Dental Implants**: "Replace a missing tooth with an implant-supported crown, bridge or denture." REPLACE (Anchor). `/treatments/dental-implants`
3. **Root Canal Treatment**: "Treat infection or inflammation inside a tooth so it may be kept." PRESERVE (Microscope). `/treatments/root-canal-treatment`
4. **Braces & Orthodontics**: "Gradually move teeth into position, then use retainers to help hold them." ALIGN (AlignHorizontalDistributeCenter). `/treatments/braces-and-orthodontics`
5. **Smile Design & Cosmetic Dentistry**: "Plan cosmetic options around the changes you want to make to your smile." REFINE (Smile). `/treatments/smile-design`
6. **Full Mouth Rehabilitation**: "Plan staged care when many teeth or the bite need attention." REBUILD (Crown). `/treatments/full-mouth-rehabilitation`
7. **Scaling & Polishing**: "Remove plaque and tartar, then polish the tooth surfaces." MAINTAIN (Sparkles). `/treatments/scaling-and-polishing`

The category words are stored in upper case in the data (`intent: "REPAIR"` …), and CSS also upper-cases them. Making them "normal case" (plan section 4, S5) needs a text transform in the component, e.g. a capitalise-first-letter helper, because the data is read-only. Titles come from `featuredTreatmentTitle()`; "Composite Build-up" uses a non-breaking hyphen (U+2011) per the data comment.

Eighth card (`closingCta`): heading "Not sure which treatment you need?"; text "Explore our treatments or speak with our team to understand your options."; link "Explore all treatments" → `/treatments`.

### (f) Font sizes under 14 px (computed, desktop 1366 / mobile 390)

| Element | Desktop | Mobile |
|---|---|---|
| Header eyebrow "Our clinics · Hyderabad" (uppercase, 0.18em) | **11 px** | **9.5 px** |
| Header photo caption "Mehdipatnam" / "Waiting lounge" (uppercase, 0.14em) | **11 px** | **11 px** |
| Strip labels ("in Hyderabad", "clinics", …) | 12.5 px | 12 px |
| Clinic card photo captions ("Entrance", "Street frontage") | 12.5 px | 12.5 px |
| Clinic card kicker ("Humayun Nagar · Hyderabad", uppercase) | 12 px | **11 px** |
| Clinic card `dt` labels Address / Phone / Hours (uppercase) | **11 px** | **11 px** |
| Surroundings photo line ("Treatment chamber", "Reception & staircase") | 14 px (not listed) | 13 px |
| Gallery captions (8 Mehdipatnam + Street frontage) | 12.5 px | 12.5 px |
| Gallery captions for the large tiles (Waiting lounge, Reception & staircase, Street frontage in the pair) | 13.5 px | 13.5 px |
| Treatment card category words (REPAIR …) | 12 px | 12 px |
| Eighth card link "Explore all treatments" (uppercase, 0.14em) | **11 px** | **11 px** |

Under 12 px (fail the 12 px floor): the header eyebrow (11 / 9.5), the header photo caption (11), card `dt` labels (11), the mobile card kicker (11), and the eighth-card link (11). Everything else is 12 px or more, so the all-caps treatment is the bigger issue than size alone.

### (g) Where do the "Dr. Md. Miftah Ur Rahman practises here" rows link?

Both rows (Mehdipatnam and Nampally) link to **`/doctors/dr-miftah-ur-rahman`** (plain `<a>`, same destination, charcoal bar with a red arrow, 56 px high). The text is identical in both.

## 6. Other observations for the next runs

- **Reveal today:** one local `useReveal` (fade-up 12 px, 400 ms). In stitched captures everything below the fold sits at opacity 0. The audit script must scroll through the page first, or R1 to R7 will measure hidden blocks.
- **Mobile header** is 1,135 px tall: copy, two stacked buttons, a 48%vh photo, then the strip. The plan target is 38dvh.
- **Surroundings** photos are 3:4 portraits inside light cards (the plan wants a gradient caption on the photo).
- **Header `<h1>`** contains two lines in one element: "Two locations." and a block `<span>` "One Neodent standard." (rendered as "Two locations.One Neodent standard." in the snapshot because there is no space between them). The content check normalises whitespace, so keep the same element structure or add a real space.
- **Navbar** uses `overHero` (transparent over the dark header). Keep this for the new wrapper.
- The existing lightbox is `ClinicGalleryViewer` (shared with branch pages); R4's own `<dialog>` lightbox does not touch it.
- Plan tools missing: see CHANGELOG.
