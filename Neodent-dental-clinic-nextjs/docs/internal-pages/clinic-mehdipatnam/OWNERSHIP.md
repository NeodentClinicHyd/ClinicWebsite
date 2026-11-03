# OWNERSHIP: clinic-mehdipatnam (Plan A)

Verified by grep on 2 Nov 2026. Plan A: the branch template is owned by this session and polished for both branches. Nampally is protected by `clinic-nampally-guard`.

## OWNED (imported only by `app/clinic/[slug]/*`)

| File | Role |
|---|---|
| `app/clinic/[slug]/page.tsx` | Route, `generateMetadata`, `generateStaticParams`, JSON-LD. Imports, wrappers and props only. Metadata and JSON-LD byte-identical. |
| `app/clinic/[slug]/ClinicBranchClientChrome.tsx` | Client chrome: Navbar, sections in order, Footer. Imported only by `page.tsx`. |
| `components/clinic/branch/BranchHero.tsx` + `.module.css` | S1 header |
| `components/clinic/branch/BranchDetails.tsx` + `.module.css` | S2 intro + Visit & contact card |
| `components/clinic/branch/BranchGallery.tsx` + `.module.css` | S3 gallery |
| `components/clinic/branch/BranchTreatments.tsx` + `.module.css` | S4 featured treatments + additional services |
| `components/clinic/branch/BranchClinicalTeam.tsx` + `.module.css` | S5 people |
| `components/clinic/branch/BranchConnections.tsx` + `.module.css` | S6 doctor card + other-clinic card + back link |
| `components/clinic/branch/BranchPatientStory.tsx` + `.module.css` | S7 patient video + quote |
| `components/clinic/branch/BranchVisit.tsx` + `.module.css` | S8 closing red card (local block, not `ContactNextStep`) |
| `components/clinic/branch/branch-content.ts` | Branch prose and photo geometry. Has pre-existing uncommitted edits. Do not revert. |

## NEW files this plan may create

`components/pages/clinic-mehdipatnam/*`, `lib/pages/clinic-mehdipatnam-content.ts`, `docs/internal-pages/clinic-mehdipatnam/*`, `docs/internal-pages/clinic-nampally-guard/*`, `.audit/clinic-mehdipatnam/*`, `.audit/clinic-nampally-guard/*`.

## SHARED READ-ONLY

| File | Why |
|---|---|
| `components/clinic/useReveal.ts` | Also used by `/clinic` hub components and `/contact` |
| `components/clinic/ClinicShared.module.css` | Same (`/clinic` hub, `/contact`) |
| `components/clinic/ClinicGalleryViewer.tsx` + `.module.css` | Used by `components/clinic/InsideNeoDent.tsx` |
| `components/sections/expertise-data.ts` | Home cards data (treatment summaries, icons, `allTreatmentsHref`) |
| `lib/treatment-data.ts` (`additionalServices`) | Treatment data |
| `lib/clinic-data.ts`, `lib/site-data.ts`, `lib/clinical-team.ts`, `lib/structured-data.ts`, `lib/pages/clinic-content.ts` (`NAMPALLY_SPACES_IMAGES`) | Data and schema |
| `components/ui/AppButton`, `components/layout/*`, `components/motion/*` | UI and layout |
| `app/globals.css` | Tokens only |

## FORK CANDIDATES (shared with another route; copy, do not edit)

| Source | Planned copy | Reason |
|---|---|---|
| `components/clinic/ClinicShared.module.css` | not needed: branch CSS Modules will carry their own section, container, title and lede classes | Used by `/clinic` hub and `/contact` |
| `components/clinic/useReveal.ts` | not needed: use `components/motion/Reveal.tsx` (read-only import) instead | Used by `/clinic` hub and `/contact` |
| `components/clinic/ClinicGalleryViewer.*` | `components/pages/clinic-mehdipatnam/BranchLightbox.tsx` (+ CSS), adapted from `components/pages/clinic/GalleryLightbox.tsx` | Used by `InsideNeoDent` |

## Sibling references already built for the same family (read-only patterns to copy from)

`components/pages/clinic/*` (ClinicHeader, ClinicBackdrop, ClinicBreadcrumbs, GalleryLightbox, SpacesGallery, TreatmentsStrip, VisitBand, ClinicFaq), `components/pages/doctors/*`, `components/pages/dr-miftah/SwipeDots.tsx`.
