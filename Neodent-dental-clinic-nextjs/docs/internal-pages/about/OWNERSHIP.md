# OWNERSHIP: /about

Written in R0, 31 Oct 2026. Source: grep of `app`, `components`, `lib` for every import of each file.

## Important difference from the plan

PAGE_PLAN.md expected `/about` to render shared home components (`LegacyStory`, `ClinicalLeadership`, `SeamCard`, `PatientStories`, `SpacesDesignedAroundCare`, `Expertise`, `ExperienceIntro`) that would need forking. It does not. `/about` already renders its own set of About-only components in `components/sections/about/`. Nothing else imports them. So there are **no fork candidates** for S1 to S12. The home components named in the plan are used only as read-only visual references.

## Render chain

`app/about/page.tsx` (server, holds metadata) -> `app/about/AboutClientChrome.tsx` (client) -> Navbar, ten `components/sections/about/*` sections, `ContactNextStep`, Footer.

`page.tsx` has no JSON-LD of its own. The four JSON-LD blocks on the rendered page (MedicalOrganization, Dentist, Dentist, WebSite) come from `app/layout.tsx` and are read-only.

## OWNED (only this page uses them)

| File | Role |
|---|---|
| `app/about/page.tsx` | Metadata export (byte-identical rule) and the page body. Body is currently `<AboutClientChrome />`. |
| `components/sections/about/AboutHero.tsx` + `.module.css` | S1 header and S2 "At a glance" strip. |
| `components/sections/about/AboutPractice.tsx` + `.module.css` | S3. Contains the ghost "1994" (real DOM text, `aria-hidden`). |
| `components/sections/about/AboutFounder.tsx` + `.module.css` | S4. |
| `components/sections/about/AboutMiftah.tsx` + `.module.css` | S5. |
| `components/sections/about/AboutPress.tsx` + `.module.css` | S6. Holds the "View full archive" button. |
| `components/sections/about/ArchiveViewer.tsx` + `.module.css` | 16-item press lightbox opened by the S6 button. Only AboutPress uses it. |
| `components/sections/about/AboutRecognition.tsx` + `.module.css` | S7 and S8 (S8 is its closing row). |
| `components/sections/about/AboutMedia.tsx` + `.module.css` | S9 playlist and player. |
| `components/sections/about/AboutCommunity.tsx` + `.module.css` | S10. |
| `components/sections/about/AboutToday.tsx` + `.module.css` | S11. |
| `components/sections/about/AboutExplore.tsx` + `.module.css` | S12. |
| `components/sections/about/shared.module.css`, `useReveal.ts` | Shared chapter CSS and the page's own reveal hook. Only the About sections import them. |

## SHARED READ-ONLY

| File | Role |
|---|---|
| `app/about/AboutClientChrome.tsx` | Plan marks it read-only. Composes the page today. From R1, `page.tsx` composes the page directly with new components and no longer renders it. The file stays untouched. |
| `components/layout/Navbar.tsx` (`overHero`), `Footer.tsx` | Global chrome. |
| `components/sections/ContactNextStep.tsx` | S14 consultation block. |
| `components/ui/AppButton.tsx`, `EditorialHighlight.tsx` | Used by S5, and by most sections respectively. |
| `components/consent/CookieConsentContext` | Used by S9 for the embedded-media consent gate. |
| `components/motion/Reveal.tsx`, `CountUp.tsx`, `useReveal.ts`, `motion.module.css` | Plan-approved motion primitives. |
| `lib/site-data.ts` | `legacyStats`, phones, `ctaPhone`, `ctaTelPhone`, interior images. |
| `app/globals.css` | Tokens, `--media-max-h`, `--media-max-h-compact`. |
| `app/layout.tsx` | JSON-LD, cookie banner, FloatingCta. |

## FORK CANDIDATES

None. Planned new files (from section 8 of the plan) go under `components/pages/about/`. Old files in `components/sections/about/` and `AboutClientChrome.tsx` are left in place and become unused after R5. The owner can remove them later; no run deletes them.

## Other routes sharing a family with /about

- "View full archive" does **not** open a route. It opens the in-page `ArchiveViewer` lightbox. There is no press archive page to protect.
- Links out of the page: `/treatments`, `/clinic`, `/clinic/mehdipatnam`, `/clinic/nampally`, `/doctors/dr-miftah-ur-rahman`, `/privacy-policy` (inside ContactNextStep).
- No other session is known to share a component with this page.

## Tooling note

The plan references `scripts/page-content-snapshot.mjs`, `page-content-check.mjs` and `page-audit.mjs`. They do not exist in the repo. Equivalents with the same arguments are in `.audit/about/tools/` (see CHANGELOG R0). No existing script was edited.
