# DISCOVERY: Doctors (/doctors)

R0, 1 Nov 2026. Nothing was fixed or changed. Content baseline: `content-snapshot.json` (server HTML, JavaScript off: 13 text units, 3 headings, 3 links, 0 images, 0 buttons, 5 JSON-LD blocks, 643 characters). Screenshots: `.audit/doctors/r0/`.

## 1. Sections found on the live page, in order

Everything sits in one `<section>` (`section.section`, 1,355 px tall at 390 wide) inside `<main>`. There is no component split; all markup is in `app/doctors/page.tsx`.

| # | Part | Heading / text | Where |
|---|---|---|---|
| 1 | Header (inside the section) | eyebrow "Our doctors", h1 "The clinical team *behind Neodent.*", paragraph "Specialist-led dental care delivered across two Hyderabad locations, led by the clinicians who built the practice." | `page.tsx` lines 76 to 84 |
| 2 | Card 1 | "Founder & Director", h2 "Dr. Mohd. Siraj Ur Rahman", "Dental Surgeon · Prosthodontist · Implantologist", "Founded Neodent in Hyderabad in 1994 and continues to lead its clinical direction across Mehdipatnam and Nampally." No link. | `page.tsx` |
| 3 | Card 2 | "Prosthodontist & Implantologist", h2 "Dr. Md. Miftah Ur Rahman", "BDS, MDS, FICOI · Assistant Professor of Prosthodontics", "Leads implant, prosthodontic and full mouth rehabilitation care at both Neodent branches.", link "View full profile" to `/doctors/dr-miftah-ur-rahman`. | `page.tsx` |
| 4 | Closing line | "See both branches on the [clinics page](/clinic) or [get in touch](/contact) to begin." | `page.tsx` |

Then the global `Footer` ("Changing smiles since 1994."). There is no consultation block.

### Plan versus real page

| Point | Plan says | Real page |
|---|---|---|
| Content map (section 3) | Eyebrow, h1, paragraph, 2 cards, closing line | **Matches word for word.** Nothing missing, nothing extra in visible text. |
| Doctor names | "h3 per doctor name" (target) | Currently h2. Becomes h3 once an h2 section heading exists (R2). Not a defect today. |
| Images and videos | None | **Confirmed: none.** |
| Forms | None in body | Confirmed. |
| Imports / fork forecast | Page imports from `components/doctors/*` | **It imports nothing from there.** Only `Navbar`, `Footer`, `lucide-react`, `next/link`, `lib/site-data` (SITE_NAME, SITE_URL) and `doctors.module.css`. No fork needed. |
| Breadcrumb | "No breadcrumb" | No *visible* breadcrumb, but a `BreadcrumbList` JSON-LD block exists (Home, Doctors). |
| Title / description | "Neodent Dental Hospitals" in the plan's entity list | Metadata uses `SITE_NAME` = "Neodent Dental Hospital" (singular). Metadata stays byte-identical, so no change. Recorded in CONTENT_QUESTIONS. |
| Metadata description | n/a | Names only Dr. Siraj and Dr. Miftah, which will be narrower than the page after the redesign. Untouchable under the rules. Recorded. |
| `Navbar` | n/a | The page uses `<Navbar />` (no `overHero`). The About page uses `<Navbar overHero />`. R1 should check how the clinic and About headers handle the fixed navbar before choosing. |

### Metadata and JSON-LD (protected)

Metadata exported in `page.tsx`: title (absolute) "Our Doctors | Neodent Dental Hospital"; description (above); canonical `/doctors` (resolved to `https://www.neodentdentalhospitals.com/doctors`); robots index, follow; Open Graph (title, description, url, siteName, locale `en_IN`, type website); Twitter `summary_large_image`.

JSON-LD seen in the server HTML (5 blocks):

| Type | Source |
|---|---|
| `BreadcrumbList` (`/doctors/#breadcrumb`, Home then Doctors) | **`app/doctors/page.tsx`** (the only block this page owns) |
| `MedicalOrganization` (`#organization`, foundingDate 1994) | `app/layout.tsx` via `siteJsonLd` |
| `Dentist` Mehdipatnam (`/clinic/mehdipatnam#clinic`) | `app/layout.tsx` via `siteJsonLd` |
| `Dentist` Nampally (`/clinic/nampally#clinic`) | `app/layout.tsx` via `siteJsonLd` |
| `WebSite` (`#website`) | `app/layout.tsx` via `siteJsonLd` |

No `Person`, `FAQPage` or `aggregateRating` anywhere on this route.

## 2. Images and videos

None on the page today. Alt texts, hidden text: none.

## 3. Measured text sizes on the current page

From `doctors.module.css` (no media queries, so the same at 1280 and 390) and confirmed by the audit at 360, 390, 768 and 1366:

| Element | Size | Note |
|---|---|---|
| Eyebrow "Our doctors" | **10.5 px** | Under 12 px |
| Role label ("Founder & Director", "Prosthodontist & Implantologist") | **10.5 px**, red on charcoal | Under 12 px, and small red on dark |
| Credential line (`cardMeta`) | 13 px, 60% ivory | Dim |
| Card paragraph | 14.5 px | |
| "View full profile" | 13.5 px, 120 x 20 px target | Under 44 px tap target at 768 and below |
| Closing line | 13.5 px; links in red on charcoal | Fails the contrast rule |

Audit r0: no horizontal overflow at 360, 390, 768, 1366; no media; one h1; no console errors.

## 4. Clinicians in `lib/clinical-team.ts`

**Total: 7.** Array order: Siraj, Muti, Asiya, Safoora, Muqeet, Hafsa, Miftah.
**Order the home page uses:** leadership first (Siraj, Miftah), then the "Our clinical team" row. In the row, `homepageSpecialists` keeps the array order but sorts the member with no image last: **Muti, Asiya, Safoora, Muqeet, Hafsa**.
The group names `leadership` and `specialist` are internal data keys. They must not appear as visible headings (rule: neutral heading only).

| # | Name (`nameLines` joined) | Label / role | Detail lines (as on the home page) | Credentials block (leadership only) | Years | Portrait | Alt | Profile route | Home shows |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Dr. Mohd. Siraj Ur Rahman | label "Senior clinical leadership"; role "Founder · Director, Neodent Dental Hospitals" | "BDS · FCIP · MDS (Chennai)" / "Professor · Director, Neodent · 32 years" | Qualifications: `founder.qualifications`; Specialism "Prosthodontist & Implantologist"; Post: `founder.academicPost` | `founder.experienceYears` = `${yearsSinceEstablished()}+` = **32+** (computed) | `/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png`, 714x623 cut-out, crop w155 l-34 t14 | "Dr. Mohd. Siraj Ur Rahman" | `href: "/about#founder"` (anchor exists in `AboutFounder`) | **featured** (card 1) |
| 2 | Dr. Md. Miftah Ur Rahman | label "Senior clinical leadership"; role "Assistant Director, Neodent Dental Hospitals" | "Prosthodontist & Implantologist" / "BDS · MDS · FICOI (U.S.A.)" | Qualifications "BDS · MDS · FICOI (U.S.A.) · Gold Medalist"; Specialism "Prosthodontist & Implantologist"; Post "Assistant Professor, Department of Prosthodontics, SB Patil Dental College & Hospital" | **15+** | `/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png`, 794x741, crop w210 l-106 t-27 | "Dr. Md. Miftah Ur Rahman" | `/doctors/dr-miftah-ur-rahman` | **featured** (card 2) |
| 3 | Dr. Md. Muti Ur Rahman | label "Clinical team" | "MBBS (OSM) · MD (Gen. Med.)" / "5+ years" | none | 5+ (inside the detail line only) | `/assets/Dr. Md. Muti Ur Rahman - Neodent  dental clinic.png`, 478x522, crop w178 l-41 t-15 (note the double space in the file name) | "Dr. Md. Muti Ur Rahman" | none | **yes**, row position 1 |
| 4 | Dr. Asiya Siraj | "Clinical team" | "MBBS (OSM) · MRSH (LON)" / "30+ years" | none | 30+ | `/assets/Dr.Asiya-Siraj.png`, 416x556, crop w100 l0 t0; initials AS | "Dr. Asiya Siraj" | none | **yes**, position 2 |
| 5 | Dr. Safoora Talha | "Clinical team" | "BDS · 12+ years" | none | 12+ | `/assets/Dr.Safoora-Talha.png`, 401x550, crop w105 l-5 t-1; initials ST | "Dr. Safoora Talha" | none | **yes**, position 3 |
| 6 | Dr. Muqeet Ur Rahman | "Clinical team" | "BDS (OSM) · Dental Surgeon" / "4+ years" | none | 4+ | `/assets/Dr.Muqeet-ur-Rahman.png`, 476x524, crop w178 l-32 t-5 | "Dr. Muqeet Ur Rahman" | none | **yes**, position 4 |
| 7 | Dr. Hafsa Taha | label "Clinical team"; role "Dental Surgeon" (not shown on the home row) | "BDS · Dental Surgeon" / "5+ years" | none | 5+ | **none** (`image: null`), initials HT | "Dr. Hafsa Taha" | none | **yes**, position 5 (monogram, last) |

**Only one clinician has no portrait: Dr. Hafsa Taha** (monogram card, as on the home page).
Only Dr. Miftah has a profile page. Dr. Siraj's `href` is `/about#founder`; the home card shows it as "View profile".

Notes that affect the plan:
1. **Row size is 5, not a multiple of 4.** The plan asks for "4 across at 1280 px and wider". Four across leaves one orphan card on a second row. Options for R3: 5 across (cards of about 200 px in a 1180 px container), or 3 + 2 centred. R3 will use 5 across at 1280+ and 3 across below unless the owner prefers otherwise (CONTENT_QUESTIONS).
2. **Dr. Muti's qualification in the data is "MBBS (OSM) · MD (Gen. Med.)"**, not "MBBS / MD (General Medicine)" as the plan and standard quote. The plan says to show it "exactly as in the data", so R3 renders the data string. Recorded.
3. **Dr. Asiya's qualification is also not a dental degree** ("MBBS (OSM) · MRSH (LON)"). The neutral heading rule therefore covers her too. No heading, label or schema may call the wider team "dental specialists".
4. The team data carries years of experience for all seven, so the "never invent" rule is met: R2 can show 32+ and 15+ with `CountUp` on the two featured cards.

## 5. Where the home page gets its content

| Home part | File | Data source | Imported from lib or hard-coded? |
|---|---|---|---|
| "A steady hand. A human approach." (heading, subtitle, lede) | `components/sections/ClinicalLeadership.tsx` | Headline, subtitle ("Dentists and specialists at Neodent Dental Hospital, Mehdipatnam and Nampally, Hyderabad.") and lede ("Seven doctors across our Mehdipatnam and Nampally clinics, led by the specialists who plan and oversee your treatment.") are **hard-coded in the component** | Hard-coded text; the people come from lib |
| Two featured cards | same | `homepageLeadership` from `lib/clinical-team.ts` | **lib** |
| "Dr. Miftah at work" | same, constant `AT_WORK` and inline JSX | Image `/assets/dr-miftah/Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg` (960x1280), a long alt text, the paragraph "A Prosthodontist and Implantologist, Dr. Md. Miftah Ur Rahman restores and replaces teeth, from crowns and dentures to dental implants, and starts every case with a full assessment before a plan is put forward.", link text "See his work and profile", and a `<details>` "About Dr. Miftah" with four paragraphs, a recognition line and a quote | **Hard-coded in the component, not exported.** R2 copies the image path, alt, paragraph and link text into `lib/pages/doctors-content.ts` verbatim and logs a shared request. The `<details>` second layer is not required by the plan for S3; R2 does not copy it. |
| "Our clinical team" row (heading + 5 cards) | same | `homepageSpecialists` from lib; heading "Our clinical team" hard-coded | **lib** (people), hard-coded (heading) |
| `ExperienceIntro` stat strip | `components/sections/ExperienceIntro.tsx` | Array `stats` kept **inside the file, not exported**: years `yearsSinceEstablished()` (lib, calculated, 32 in 2026); clinics `2`; Google reviews `googleRating.count + nampallyGoogleRating.count` (261 + 157 = 418); patients `25000` with suffix `+` | Years: lib (import `ESTABLISHED_YEAR`, `yearsSinceEstablished`). Clinics `2` and patients `25000`: typed inside the component, **but** `lib/site-data.ts` also exports `legacyStats = { established: "1994", patientsTreated: "25,000+" }` (the clinic page's strip reads it). *Correction made in R1:* so the patients value can be imported, not copied. Labels are hard-coded (copied in `lib/pages/doctors-content.ts`). |

The plan's S1 fact 4 ("patients treated, same value the home uses") is **25,000+, which the home code itself marks "client-supplied, must be verified before launch"**. It is a risk to repeat on a second page; see CONTENT_QUESTIONS Q3. R1 follows the plan and reads `legacyStats.patientsTreated`, so confirming or changing the figure is a single edit in `lib/site-data.ts`. This is flagged for the owner, not decided silently.

Reference page for the same patterns, built by another session: `components/pages/about/AboutTeam.tsx` (leader cards, swipe row, same seven doctors from the same data). Read-only; useful for how the cut-out portraits are laid out on a light band.

### Portrait style on the home page (affects R2 and R3)

The home cards do **not** use `object-fit: cover` photographs. Each doctor is a transparent PNG cut-out placed on a 4:5 charcoal frame (`aspect-ratio: 4 / 5`, radial-gradient background) with a per-file `crop` so all faces sit at the same height. The shared `components/ui/DoctorPortrait.tsx` implements this, including the monogram plate. To copy "the same doctor cards" faithfully, R2 and R3 use `DoctorPortrait`. The plan's "cover with focal point" wording applies to photographs (header, S3), not to these cut-outs. Recorded in CONTENT_QUESTIONS (Q8) so the owner can object.

## 6. `ContactNextStep` usage on other pages

- Import: `import { ContactNextStep } from "@/components/sections/ContactNextStep";`
- **No props.** Renders its own light section (`id="get-in-touch"`, headline "Book a consultation", a call card per clinic, an enquiry form posting to `/api/enquiry` with Turnstile). It is a `"use client"` component.
- `app/about/page.tsx` renders `<ContactNextStep />` as the **last child of `<main>`**, directly before `<Footer />`. `components/Home.tsx` does the same. No wrapper element or class.
- The form needs `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to submit; not our concern.

## 7. Candidate header photographs

No file named "team" exists, but the first one below is a real team photo already used elsewhere on the site.

| # | Path | Size | Content | Suggested focal point | Notes |
|---|---|---|---|---|---|
| **1 (recommended)** | `/assets/neodent-dental-hospital-doctors.jpeg` | 3840 x 1728 (2.22:1), 439 KB | Five clinicians standing together at the consultation chamber, signage with their names behind them | `50% 35%`. Faces run across the full width, so **use a wide frame (about 2:1) and avoid tall crops**; a 4:3 or taller cover crop would cut people off. At 390 px wide a 2.2:1 frame is only about 175 px tall, so mobile loses nothing. | Already used by `components/clinic/branch/BranchClinicalTeam.tsx` (alt "Neodent clinicians and team members gathered inside the hospital") and `WhatToExpect.tsx`. Reuse that alt text. This is the "present them as one team" picture the owner asked for. It is large (3840 px); `next/image` with `sizes` handles it. |
| 2 | `/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp` | n/a, 111 KB | Two lead doctors during treatment | not checked | Shows only two people; used in `lib/treatments-hub.ts`. Weaker for "whole team". |
| 3 | `/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg` | 1280 x 1707, 95 KB | Nampally reception and staircase | `50% 45%` | Portrait orientation; heavily used (home backdrop, treatments). Only if no team photo is wanted. |
| 4 | Mehdipatnam interior / exterior (see `lib/site-data.ts` `mehdipatnamInteriorImage`) | 960 x 1280 | Waiting lounge, entrance | `50% 40%` (the home hero uses this focal point) | The home hero's clinic photos (`heroBranches`). Portrait orientation. |

Avoid `/assets/dr-miftah/Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg` in the header: S3 uses it, so two large images would repeat.

## 8. Treatment route slugs (for the links inside Dr. Miftah's paragraph)

From `lib/clinic-data.ts` (`treatmentRouteById`, keyed by `lib/featured-treatment-catalog.ts` ids) and confirmed by the folders in `app/treatments/`:

| Words in the paragraph | Route |
|---|---|
| "implant" | `/treatments/dental-implants` |
| "full mouth rehabilitation" | `/treatments/full-mouth-rehabilitation` |

Both routes exist. The paragraph reads "Leads **implant**, prosthodontic and **full mouth rehabilitation** care at both Neodent branches." Only those words become links; no word is changed. ("implant" alone is a short anchor; the route text is the descriptive target. Flagged as a mild anchor-text question.)

## 9. Other facts R1 to R4 need

- Phone for the primary action: `ctaTelPhone` = `tel:+919246348485`, text `ctaPhone` = "+91 9246348485" (`lib/site-data.ts`). The clinics have their own numbers (`phone`, `nampallyPhone`).
- Hours strings in lib: `mehdipatnamHours` = "4:00 PM - 8:00 PM", `nampallyHours` = "10:30 AM - 5:00 PM"; `weeklyHours` "Monday–Saturday", `weeklyClosure` "Sunday holiday" (en dash in the data; render as stored).
- Clinic cards for S5: `clinicLocations.mehdipatnam` and `.nampally` in `lib/clinic-data.ts` give `name`, `address`, `phone`, `tel`, `hours`, `weeklyHours`, `weeklyClosure`, `locality`.
- Shared helper for portraits: `DoctorPortrait` takes `member`, `frame` (sizes), optional `alt`, `className`.
- No `docs/internal-pages/_shared-requests.md` exists yet; the plan says to append with a shell append (that creates it). Earlier sessions noted the same.
- Dependencies named in the plan that do not exist in the repo: `scripts/page-content-snapshot.mjs`, `scripts/page-content-check.mjs`, `scripts/page-audit.mjs`. Equivalent generic copies from `.audit/clinic/tools/` were placed in `.audit/doctors/tools/` (see CHANGELOG).
- "Part 1 / 3.x / 6.5" of the "standard" that the plan quotes is not a file in the repo. The closest written source for the dark-band recipe is the hero CSS block in `app/globals.css` and the sibling headers in `components/pages/{about,clinic,treatments-hub}/*Header*`. R1 reads those.
