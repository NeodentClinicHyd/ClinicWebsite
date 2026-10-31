# OWNERSHIP: treatments-hub (`/treatments`)

Written by R0, 31 Oct 2026. Verified with `grep` for importers of every file.

## Tooling note

`scripts/page-content-snapshot.mjs`, `page-content-check.mjs` and `page-audit.mjs` named in the plan do not exist in the repo, and neither does `docs/internal-pages/_shared-requests.md`. Slug-generic equivalents (written for the About page) were copied to `.audit/treatments-hub/tools/` and are run as:

```
node .audit/treatments-hub/tools/page-content-check.mjs treatments-hub /treatments
node .audit/treatments-hub/tools/page-audit.mjs treatments-hub /treatments <run-id>
```

## OWNED (only this page uses it; may be edited or replaced)

| File | Role |
|---|---|
| `app/treatments/page.tsx` | Route file. Metadata and JSON-LD stay byte-identical. Only the component it renders changes (allowed edit). |
| `app/treatments/TreatmentsClientChrome.tsx` | Client wrapper (Navbar, `<main>`, Footer, mobile call bar). Imported only by `page.tsx`. **Not on the plan's edit list**, so it is left untouched; `page.tsx` will render a new wrapper from `components/pages/treatments-hub/` instead. |
| `components/treatments/hub/HubHero.tsx` | Old S0 header and S1 intro. Replaced by new components; left in place, unused after R2. |
| `components/treatments/hub/HubTreatments.tsx` | Old S2. |
| `components/treatments/hub/HubBeyond.tsx` | Old S3. |
| `components/treatments/hub/HubThinking.tsx` | Old S4. |
| `components/treatments/hub/HubDmls.tsx` | Old S5. |
| `components/treatments/hub/HubPlanning.tsx` | Old S6. |
| `components/treatments/hub/HubWork.tsx` | Old S7. |
| `components/treatments/hub/HubEvidence.tsx` | Old S8. |
| `components/treatments/hub/HubQuestions.tsx` | Old S9 plus the contact aside (S10). |
| `components/treatments/hub/HubVideo.tsx` | Old poster-first video. |
| `components/treatments/hub/hub.module.css` | Old page CSS Module. |

The `components/treatments/hub/*` files are outside the plan's editable paths (`components/pages/treatments-hub/` only). They are **not edited**. New code is written as copies under `components/pages/treatments-hub/`, and the page switches to them.

## SHARED READ-ONLY

| File | Role / who else uses it |
|---|---|
| `lib/treatments-hub.ts` | Hub data (treatments, doctors, DMLS, planning, cases, reels, evidence, FAQ, JSON-LD builders). Imported by `page.tsx` and all hub components. Three treatment-page data files carry comments saying their FAQ text is "verbatim from" it, so it is treated as shared. New components read from it; they do not copy the text. |
| `lib/featured-treatment-catalog.ts`, `lib/treatment-data.ts`, `components/sections/expertise-data.ts` | Treatment names, summaries, images, additional services. Home and treatment pages use them. |
| `lib/site-data.ts`, `lib/clinical-team.ts`, `lib/clinic-data.ts`, `lib/structured-data.ts` | Single sources for phone, hours, doctors, JSON-LD helpers. |
| `components/motion/Reveal.tsx`, `CountUp.tsx`, `useReveal.ts`, `motion.module.css` | Shared motion primitives. |
| `components/ui/*` (`AppButton`, `Breadcrumbs`, `EditorialHighlight`) | Shared UI. |
| `components/layout/*` (`Navbar`, `Footer`) | Global chrome. |
| `components/sections/ContactNextStep*` | Shared consultation block. **Not rendered on this page** (see DISCOVERY, Q3). |
| `app/globals.css` | Tokens (`--neodent-*`, `--media-max-h*`, `--app-font-*`). |
| `components/treatments/BeforeAfterCases.tsx`, `RealTreatmentWork.tsx`, `TreatmentThinking.tsx`, `TreatmentDoctorCard.tsx`, other `components/treatments/*.tsx` | Used by treatment pages. **Not imported by the hub.** Not fork candidates. |
| `app/treatments/<seven slugs>/*` | Treatment pages. Untouched. |

## FORK CANDIDATES

The plan expected `BeforeAfterCases` and `RealTreatmentWork` to be forked. The hub does not import them. Its own `HubWork` already holds the before/after and film markup. So nothing needs forking from `components/treatments/*`. The real forks are the hub's own components, copied into `components/pages/treatments-hub/` as new files:

| Source (read, not edited) | Planned copy |
|---|---|
| `components/treatments/hub/HubVideo.tsx` | `components/pages/treatments-hub/HubVideo.tsx` (rebuilt per R1 spec) |
| `components/treatments/hub/HubHero.tsx` | `HubHeader.tsx` (S0) and `HubIntro.tsx` (S1) |
| `components/treatments/hub/HubTreatments.tsx` | `FeaturedTreatments.tsx` |
| `components/treatments/hub/HubBeyond.tsx` | `AdditionalServices.tsx` |
| `components/treatments/hub/HubThinking.tsx` | `ThinkingBehindTreatment.tsx` |
| `components/treatments/hub/HubDmls.tsx` | `DmlsFeature.tsx` |
| `components/treatments/hub/HubPlanning.tsx` | `TreatmentProcess.tsx` |
| `components/treatments/hub/HubWork.tsx` | `RealCases.tsx` |
| `components/treatments/hub/HubEvidence.tsx` | `ExperienceEvidence.tsx` |
| `components/treatments/hub/HubQuestions.tsx` | `HubFaq.tsx` (FAQ plus the contact aside) |
| (new) | `TreatmentsHubPage.tsx` (page wrapper: Navbar, `<main>`, Footer, mobile bar, previously `TreatmentsClientChrome`) and `TreatmentsHub.module.css` |

## Other routes in the same family (Treatments)

`/treatments/dental-implants`, `/treatments/full-mouth-rehabilitation`, `/treatments/root-canal-treatment`, `/treatments/braces-and-orthodontics`, `/treatments/composite-build-up`, `/treatments/smile-design`, `/treatments/scaling-and-polishing`. They share `lib/*-page.ts`, `components/treatments/*`, `components/treatment/illustrations/*`. None import `components/treatments/hub/*`.

## Concurrency

`git status --short` at start of R0 shows changes by other sessions in `app/about/page.tsx`, `app/globals.css`, `components/Home.tsx`, `components/hero/Hero.tsx`, `components/layout/Footer*`, `components/sections/*`, `components/ui/EditorialHighlight*`, `lib/clinical-team.ts`, `lib/site-data.ts`. None are touched by this page's runs. `app/treatments/` and `lib/treatments-hub.ts` had no uncommitted changes.
