# OWNERSHIP: Doctors (/doctors)

Written by R0, 1 Nov 2026. Method: followed the imports of `app/doctors/page.tsx`, then searched `app`, `components` and `lib` for every importer of each file.

## Result in one line

`/doctors` is a self-contained page. It imports **no component** from `components/doctors/*` or anywhere else except the global `Navbar` and `Footer`. So nothing needs to be forked, and the plan's forecast ("FORKED into `components/pages/doctors/`") does not apply. The new sections are all new files.

## OWNED (only this page uses it)

| File | Role |
|---|---|
| `app/doctors/page.tsx` | Route file. Holds `metadata` and the `BreadcrumbList` JSON-LD (both byte-identical, never touched), and the page markup. R1 onward reduce the markup to a thin wrapper that renders the new components. |
| `app/doctors/doctors.module.css` | Styles of the old header and the two flat cards. Only `page.tsx` imports it (checked with grep). It stays in place until the last run of the old markup is removed; it is not deleted (relocate, never delete). |

## NEW files this redesign may create

| Path | Role |
|---|---|
| `components/pages/doctors/*` | All new sections and their CSS Modules. |
| `lib/pages/doctors-content.ts` | Copy and values that are hard-coded inside home components (see DISCOVERY.md 5b) and the existing page copy moved as it is. |
| `docs/internal-pages/doctors/*` | This folder. |
| `.audit/doctors/*` | Screenshots and the tool copies in `.audit/doctors/tools/` (see CHANGELOG, R0). |

## SHARED READ-ONLY (import or open, never edit)

| File | Used by | Why this page needs it |
|---|---|---|
| `lib/clinical-team.ts` | Home `ClinicalLeadership`, About `AboutTeam`, treatments-hub `ThinkingBehindTreatment`, `components/clinic/branch/BranchClinicalTeam`, `components/ui/DoctorPortrait` | Source of all seven clinicians (name, qualifications, years, portrait, crop, href). |
| `lib/site-data.ts` | Everywhere | `ctaPhone`, `ctaTelPhone`, `SITE_NAME`, `SITE_URL`, `ESTABLISHED_YEAR`, `yearsSinceEstablished()`, hours, clinic phones, addresses. |
| `lib/clinic-data.ts` | Clinic pages, others | Names, addresses, hours, phones, `weeklyClosure` for the two clinic cards; also holds the treatment id-to-route map. |
| `lib/featured-treatment-catalog.ts` | Treatments | Treatment ids (routes confirmed through `lib/clinic-data.ts`). |
| `components/ui/DoctorPortrait.tsx` (+ its CSS) | Treatments hub | Shared portrait recipe (transparent cut-out on a 4:5 charcoal frame, per-file crop, monogram plate). Import it for S2 and S4 instead of copying the CSS again. Its own header comment recommends this for new pages. |
| `components/ui/*`, `components/motion/Reveal.tsx`, `CountUp.tsx` | Site-wide | Motion and UI primitives. |
| `components/sections/ContactNextStep.tsx` (+ CSS) | Home, About | S7. Takes no props, is a client component, renders its own `<section id="get-in-touch">`. |
| `components/layout/Navbar`, `Footer` | Site-wide | Already rendered by the page. |
| `components/hero/Hero.tsx`, `app/globals.css` (hero block) | Home | Reference for the dark band recipe. Open only. |
| `components/sections/ClinicalLeadership.tsx` + `.module.css` | Home | Reference for S2, S3 and S4. Open only. |
| `components/sections/ExperienceIntro.tsx` | Home | Reference for the stat strip (it uses global `exp-intro-*` classes, so S1 needs its own CSS Module copy of the look). |
| `components/pages/about/*`, `components/pages/clinic/*`, `components/pages/treatments-hub/*` | Other sessions | Open as examples of how sibling pages solved the same patterns (header, fact strip, swipe row). **Do not import and do not edit.** |

## FORK CANDIDATES

None. Reasons: no shared component is currently used by this page. Where a pattern is needed (swipe row, header band, stat strip), the plan already says to build it inside `components/pages/doctors/`. The shared `DoctorPortrait` is used as it is, so no copy is planned.

## Family

| Route | Relationship |
|---|---|
| `/doctors/dr-miftah-ur-rahman` | Same family by the plan. In code it shares nothing with `/doctors` (its components are `components/doctors/*`, which `/doctors` does not import). Do not run its plan while this one runs. This page links to it. |
| `/clinic`, `/clinic/[slug]` | Different family. `components/clinic/branch/BranchClinicalTeam.tsx` also reads `lib/clinical-team.ts`, which is read-only here, so no conflict. Nothing is imported from `components/clinic/*`. |
| `/about` | `components/pages/about/AboutTeam.tsx` already lists the same seven doctors from the same data. Reference only. |

## Working-tree check (R0)

`git status --short` at the start showed only `?? docs/internal-pages/doctors/` (this folder). No other session had uncommitted changes in the files this page uses.
