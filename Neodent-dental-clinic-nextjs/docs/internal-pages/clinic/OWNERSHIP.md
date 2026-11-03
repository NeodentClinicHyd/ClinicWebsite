# OWNERSHIP: Clinics hub (`/clinic`)

Written by R0 on 31 Oct 2026. Import graph followed from `app/clinic/page.tsx`. "Used by" comes from grep across `app`, `components` and `lib`.

## Route chain

`app/clinic/page.tsx` (metadata only + renders) → `app/clinic/ClinicClientChrome.tsx` (client chrome: Navbar overHero, six sections, Footer).

Note: `app/clinic/page.tsx` contains **no JSON-LD**. The four JSON-LD blocks on the page (MedicalOrganization, Dentist, Dentist, WebSite) come from the global layout / `lib/structured-data.ts`. So "JSON-LD in page.tsx stays byte-identical" is satisfied trivially; R6 (if run) would add the first page-level blocks.

## OWNED (only this page uses it)

| File | Role |
|---|---|
| `app/clinic/page.tsx` | Route file. `metadata` export (title, description, canonical, robots, OG, Twitter) + `ClinicPage()` which renders `ClinicClientChrome`. Body only may change. |
| `app/clinic/ClinicClientChrome.tsx` | Client chrome. Imports Navbar, Footer and the six section components below. Only `page.tsx` imports it. Mirrored (in a comment) by the branch and doctor chromes, but not imported by them. |
| `docs/internal-pages/clinic/*`, `.audit/clinic/*` | Docs and audit output. |
| `components/pages/clinic/*` (new) | New wrapper, forks and new sections. |
| `lib/pages/clinic-content.ts` (new, only if R6 runs) | FAQ array. |

## Page-only by import, but sitting in the shared family folder (`components/clinic/`)

These six are imported **only** by `app/clinic/ClinicClientChrome.tsx`. Because they live in the family folder, the plan treats them as forks: copy into `components/pages/clinic/`, never edit the originals. After the switch they become unused by any route. They are left in place (deleting is the owner's call).

| Original | Role | Planned copy |
|---|---|---|
| `components/clinic/ClinicHero.tsx` + `ClinicHero.module.css` | S0 header (eyebrow, h1, lede, two call buttons, framed photo) **and** S1 "At a glance" strip, in one component | `ClinicHeader.tsx/.module.css` + `ClinicFacts.tsx/.module.css` |
| `components/clinic/ChooseClinic.tsx` | S2 "Find your clinic" two branch cards + Dr. rows | `ClinicCards.tsx/.module.css` (new CSS; do not reuse `ChooseClinic.module.css`, see SHARED) |
| `components/clinic/ClinicalSettings.tsx` + `.module.css` | S3 "Different surroundings" | `Surroundings.tsx/.module.css` |
| `components/clinic/InsideNeoDent.tsx` + `.module.css` | S4 "Spaces designed around care" gallery | `SpacesGallery.tsx/.module.css` |
| `components/clinic/ClinicTreatments.tsx` + `.module.css` | S5 "Featured dental treatments" | `TreatmentsStrip.tsx/.module.css` |
| `components/clinic/ClinicVisit.tsx` + `.module.css` | S6 red "Ready to visit?" band. **Clinic-only**, not `ContactNextStep` | `VisitBand.tsx/.module.css` |

## SHARED READ-ONLY

Used by other routes, or on the never-edit list.

| File | Used by | Role |
|---|---|---|
| `components/clinic/ClinicShared.module.css` | `/clinic`, `/contact` (ContactClientChrome), every `branch/*` component | Chapter system: `.section`, `.ivory/.dark/.charcoal/.atlas`, `.container`, `.title`, `.lede`, `.label`, `.facts`, `.photo`, `.shade`, `.inCaption`, reveal rules. **Do not import into new files**; copy values into page modules. |
| `components/clinic/ChooseClinic.module.css` | `/clinic` (ChooseClinic) **and `/contact`** (`app/contact/ContactClientChrome.tsx` imports it as `choose`) | Branch card styles. Editing it would change `/contact`. |
| `components/clinic/useReveal.ts` | `/clinic`, `/contact`, all `branch/*` | Local fade-up hook. New code should use `components/motion/Reveal.tsx` instead. |
| `components/clinic/ClinicGalleryViewer.tsx` + `.module.css` | `InsideNeoDent` and `branch/BranchGallery` | Existing lightbox. R4 builds its own `<dialog>` lightbox in `components/pages/clinic/`. |
| `components/clinic/branch/*` | `/clinic/[slug]` only | Branch page components. Not used by `/clinic`. Untouched. |
| `app/clinic/[slug]/*` | `/clinic/mehdipatnam`, `/clinic/nampally` | Family routes. |
| `components/layout/Navbar.tsx`, `Footer.tsx` | every page | Global. Navbar has "Clinics" menu from `lib/clinic-data.ts`. |
| `components/ui/AppButton.tsx`, `EditorialHighlight.tsx` | many pages | Buttons, highlight component. |
| `components/motion/Reveal.tsx`, `CountUp.tsx`, `useReveal.ts`, `motion.module.css` | many pages | Motion primitives. |
| `components/sections/expertise-data.ts` | home, footer, `/clinic`, branch, treatments libs | `treatments` (7 cards: title, summary, intent, icon, href) and `closingCta` (8th card). Source of every S5 string. |
| `lib/site-data.ts` | whole site | Phones, `telPhone`, `nampallyTelPhone`, hours, addresses, directions URLs, hero/gallery image paths, `clinicGalleryImages` (the 10 photos with alt, label, crop, span), `legacyStats`. **The current page reads from here, not from `lib/clinic-data.ts`.** |
| `lib/clinic-data.ts` | Navbar, branch routes, sitemap, structured data | `clinicLocations` records built from `site-data.ts`. Same values. R1 to R5 may import from either; both are read-only. |
| `lib/featured-treatment-catalog.ts`, `lib/structured-data.ts`, `app/layout.tsx`, `app/globals.css` | global | Titles, JSON-LD, tokens (`--media-max-h`, `--media-max-h-compact`, `--nav-height-*`, colour tokens). |
| `public/assets/neodent-clinic-mehdipatnam/*`, `public/assets/neodent-clinic-nampally/*` | site | Photos. |

## FORK CANDIDATES (summary)

All six originals in the "page-only by import" table above, to `components/pages/clinic/`. No shared component must be edited. `ContactNextStep` is **not** involved (S6 is clinic-only), so Q2 applies: the band is forked and restyled, labels unchanged.

## Same family (do not run together)

- `/clinic/mehdipatnam`, `/clinic/nampally` (`app/clinic/[slug]/*`, `components/clinic/branch/*`).
- `/contact` imports `ChooseClinic.module.css`, `ClinicShared.module.css` and `useReveal.ts` from `components/clinic/`. It is not in the clinic family, but it **breaks if those three files change**. They stay untouched.

## Concurrency notes

`git status --short` at R0 start showed other sessions' changes in `app/treatments/page.tsx` and `components/pages/treatments-hub/*`. None of them touch this page. The plan's tools `scripts/page-*.mjs` and `docs/internal-pages/_shared-requests.md` do not exist; equivalents live in `.audit/clinic/tools/` (copied from the treatments-hub slug-generic tools).


## Update after R6 (31 Oct 2026)

All sections are now served from `components/pages/clinic/`; the six originals under `components/clinic/` and `app/clinic/ClinicClientChrome.tsx` are unused by any route. New files since R0: `ClinicPageView`, `ClinicPage.module.css`, `ClinicBackdrop`, `ClinicHeader`, `ClinicFacts`, `ClinicBreadcrumbs`, `ClinicCards`, `Surroundings`, `SurroundingsPhotos`, `SpacesGallery`, `GalleryLightbox`, `TreatmentsStrip`, `ClinicFaq`, `VisitBand` (each with a `.module.css` where it styles itself), plus `lib/pages/clinic-content.ts`. `app/clinic/page.tsx` also renders two new JSON-LD blocks (BreadcrumbList, FAQPage). Still shared and untouched: `ClinicShared.module.css`, `ChooseClinic.module.css`, `useReveal.ts` (used by `/contact` and the branch pages), `ClinicGalleryViewer`.
