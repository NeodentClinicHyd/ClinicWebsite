# OWNERSHIP: dr-miftah (`/doctors/dr-miftah-ur-rahman`)

Written by R0, 1 Nov 2026. Checked with `grep` over `app`, `components`, `lib`, `scripts`.

## OWNED (only this route uses them)

| File | Role |
|---|---|
| `app/doctors/dr-miftah-ur-rahman/page.tsx` | Route. `metadata` and the `ProfilePage` + `BreadcrumbList` JSON-LD. Renders `DoctorProfileClientChrome`. |
| `app/doctors/dr-miftah-ur-rahman/DoctorProfileClientChrome.tsx` | Client wrapper: Navbar, `<DrMiftahProfile />`, Footer, mobile call bar. |
| `components/doctors/DrMiftahProfile.tsx` (+ `.module.css`) | The whole page body, about 2,300 lines: hero, 01 to 10, closing CTA. |
| `components/doctors/SmileDesignStory.tsx` (+ css) | Case story (six photographs, viewer). Only imported by `DrMiftahProfile`. |
| `components/doctors/TreatmentEvidenceViewer.tsx` (+ css) | Image and video viewer. Imported only inside `components/doctors/*`. |
| `components/doctors/TreatmentDetailDialog.tsx` (+ css) | "Explore treatment" dialog (the four dossiers). |
| `components/doctors/TreatmentDossier.tsx` (+ css) | Dossier body (visible in the dialog, hidden in the server HTML). |
| `components/doctors/FilmCard.tsx` (+ css) | Poster-first film card used by sections 06 and 07. |
| `components/doctors/MediaRail.tsx` (+ css) | Press archive rail (09). |
| `lib/miftah-treatment-dossiers.ts` | Dossier data (also imported by `lib/drafts/miftah-case-insights.ts`, a draft file). Read only for this redesign. |
| `lib/miftah-treatment-evidence.ts`, `lib/miftah-press-archive.ts`, `lib/miftah-treatment-media.json` | Data for films, radiographs, clippings and before/after images. Only this route imports them. Read only: the lib folder is not on the "may edit" list. |

Note: `components/doctors/*` is **not** imported by `/doctors` (the list page), by the home page or by any other route. `/doctors` was rebuilt separately under `components/pages/doctors/`.

## SHARED READ-ONLY (imported by this page, used elsewhere)

`components/ui/EditorialHighlight`, `AppButton`, `Atmosphere`, `OffsetImagePair`; `components/sections/SeamCard` (used by the home page); `components/layout/Navbar`, `Footer`; `components/motion/*`; `lib/site-data.ts`, `lib/clinic-data.ts`, `lib/clinical-team.ts`, `lib/featured-treatment-catalog.ts`, `lib/structured-data.ts`; `app/globals.css`; everything under `public/`.

## FORK CANDIDATES (shared, must change)

| Shared file | Why | Planned copy |
|---|---|---|
| `components/sections/SeamCard.tsx` + `.module.css` | The philosophy statement must be a `<blockquote>` with a `<cite>` and a styled last clause. The shared card renders a `<p>` and is used on the home page. | `components/pages/dr-miftah/PhilosophyCard.tsx` + `.module.css` |

`components/doctors/*` is owned, so no fork is strictly needed. To follow the plan's folder convention (`components/pages/dr-miftah/`), R1 moves the page body into that folder as copies, leaves the originals in place, and switches the route to the copies. The originals stay untouched as the rollback.

## Same-family routes

- `/doctors` (list page). Reads `lib/clinical-team.ts`; shares **no** file with this page (it uses `components/pages/doctors/*` and `lib/pages/doctors-content.ts`). It has uncommitted changes from another session; this session does not touch them.
- Treatment pages `/treatments/*` link to this page. No file outside `components/doctors/*` and `lib/drafts/miftah-case-insights.ts` imports the `lib/miftah-*` files (grep result), so they are safe to read from the forked copies.

## Other files this page reads

`app/doctors/dr-miftah-ur-rahman` links to `/clinic/mehdipatnam`, `/clinic/nampally`, `/about`, `/treatments/*`, `/contact`.
