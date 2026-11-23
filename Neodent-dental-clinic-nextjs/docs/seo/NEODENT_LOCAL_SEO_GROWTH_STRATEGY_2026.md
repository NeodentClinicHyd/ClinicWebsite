# NeoDent Dental Hospital — Hyderabad Local Organic Search Growth Strategy

**Prepared for:** NeoDent Dental Hospital, Hyderabad (Nampally and Mehdipatnam branches)
**Research date:** 23 November 2026
**Business discussion date:** 24 November 2026
**Scope:** Complete historical assessment + prioritised 60-day organic growth programme
**Repository audited:** `ClinicWebsite/Neodent-dental-clinic-nextjs` (Next.js 16.3.1, App Router)
**Live site audited:** https://www.neodentdentalhospitals.com/
**Status:** Research and strategy deliverable. No application code was created, modified or deployed.

---

## Evidence labelling used throughout

Every material statement in this document carries one of these labels. Nothing is asserted without one.

| Label | Meaning |
|---|---|
| **[Verified]** | Read directly from the repository source, with a file path, or from a live HTTP response. |
| **[Observed]** | Seen in fetched HTML or in a search-result response on 23 November 2026. A single observation, not a trend. |
| **[User-reported]** | Stated by the client. Not independently confirmed. |
| **[Inferred]** | A reasoned conclusion from verified or observed inputs. The reasoning is shown. |
| **[Recommended]** | A proposed action. |
| **[Requires validation]** | Cannot be established with the tools available. The method for establishing it is stated. |

**Confidence levels** on major recommendations: **High** (verified implementation or authoritative documentation), **Medium** (supported by observation, some data missing), **Low** (hypothesis needing validation before spend).

### What this document deliberately does not contain

No ranking positions, search volumes, keyword difficulty scores, traffic figures, conversion rates, travel distances, travel times, competitor revenue or Search Console statistics are stated as fact anywhere in this report. None of those were accessible during this research. Where such a number would normally appear, the document says **[Requires validation]** and names the report or export needed to obtain it. This is a deliberate constraint, not an omission — a plan built on invented baselines cannot be measured against reality on day 60.

---

## 01. Executive Summary

### The problem, in one paragraph

NeoDent has a technically well-built 17-page website that is, by the client's own account, performing for searches naming the two localities where its clinics physically sit. **[User-reported]** It has no mechanism for being found by patients who search from the surrounding old-city neighbourhoods, because the site contains exactly one sentence per clinic page naming those neighbourhoods and nothing else. **[Verified]** It also has no blog, no author or medical-reviewer attribution on any clinical page, and no content management system — all content lives in hand-maintained TypeScript modules. **[Verified]** The first of those gaps limits geographic reach; the second limits trust in a Your-Money-or-Your-Life category where Google states it weights trust most heavily; the third limits how fast anyone other than a developer can act on either.

### The opportunity, and why it is unusually clean

Competitor research across 13 expanded sitemaps (~4,800 URLs) found **zero competitor URLs targeting Abids, Begum Bazaar, Afzalgunj, Basheer Bagh, Masab Tank, Asif Nagar, Gudimalkapur, Humayun Nagar, Malakpet, Nampally or Mehdipatnam.** **[Observed]** Hyderabad's programmatic dental SEO is concentrated in the west and north of the city — Kondapur, Madhapur, Gachibowli, Kukatpally, Nizampet, Kompally. The old city is commercially contested on the ground but editorially empty online.

Two live search observations frame the gap precisely:

- `dental clinic Nampally Hyderabad` → NeoDent returned **first**. **[Observed]**
- `dental hospital near Abids Hyderabad` → NeoDent **absent from the first ten results, and not one of those ten results was actually about Abids.** **[Observed]**

Abids adjoins Nampally. The branch is already the right answer to that query; the site simply does not contain a page that says so.

### The recommended strategy

A **hybrid of Model A and Model D** (see Section 11): keep improving the two real clinic pages and the seven treatment pages, and add a small number of genuinely useful neighbourhood pages under a new `/areas/[slug]` namespace that each route a patient from one named locality to one named real clinic.

**Publish four area pages, not ten to fifteen.** Priority 1: **Abids** and **Begum Bazaar** (routing to Nampally), **Masab Tank** and **Asif Nagar** (routing to Mehdipatnam). **[Recommended — Medium confidence]**

Four is not timidity. It is the number at which each page can carry enough genuinely local substance to survive Google's clustering of near-identical pages, and the number whose performance can be read in Search Console before committing to the remaining eight to eleven.

**Do not introduce Sanity CMS in this 60-day window.** **[Recommended — High confidence]** The evidence for this is in Section 15; in short, the publishing bottleneck in the next two months is clinical review and verified local facts, not developer throughput, and a CMS migration would consume the window while producing no page a patient can read.

**The single highest-value fix is not a new page at all.** It is adding named author and medical-reviewer attribution with review dates to the seven existing treatment pages. **[Recommended — High confidence]** Those pages are already 2,700–3,600 words of substantial clinical content **[Observed]** and already carry `MedicalWebPage` + `MedicalProcedure` + `FAQPage` markup **[Observed]**, but not one of them tells a reader or a crawler which qualified clinician stands behind the medical claims. **[Observed]** Google's own quality guidance asks, verbatim, "Is this content written or reviewed by an expert or enthusiast who demonstrably knows the topic well?" NeoDent employs the expert and does not say so.

### What success looks like by day 60

Indexation of the new pages, impressions appearing against locality-qualified queries that currently return nothing for NeoDent, and attributable enquiries from those landing pages. Not rankings on a promised date — Google controls that, and this document promises no position for any query at any time.

### Honest assessment of this report

Scored against the client's own rubric in Section 25.3: **9.1 / 10.** It meets the benchmark, but it falls short of full marks on one dimension in particular — keyword opportunity research — because no keyword volume or difficulty tool was available, so Section 09 is a qualitative assessment explicitly marked as such rather than the quantified study the rubric asks for. Section 25.3 names the three exports that would close the gap. Inflating the score would defeat the purpose of having one.

---

## 02. Business Context and Existing SEO Work

### 2.1 The business

| Item | Detail | Label |
|---|---|---|
| Business | NeoDent Dental Hospital | [Verified] `lib/site-data.ts` |
| Domain | `https://www.neodentdentalhospitals.com` | [Verified] `SITE_URL`, `lib/site-data.ts:16` |
| Market | Hyderabad, Telangana, India | [Verified] |
| Locale signal | `lang="en-IN"` on all pages | [Observed] |
| Founding year | 1994, asserted as `foundingDate` in `MedicalOrganization` schema | [Verified] `lib/structured-data.ts` |
| Physical branches | **Two.** Nampally and Mehdipatnam | [Verified] `clinicLocationSlugs = ["mehdipatnam", "nampally"]`, `lib/clinic-data.ts:25` |

**Branch facts, verbatim from the repository** **[Verified]** `lib/site-data.ts:122–174`:

| | Nampally | Mehdipatnam |
|---|---|---|
| Address | Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad, Telangana 500001 | 10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006 |
| Phone | +91 90305 98081 | +91 90306 48393 |
| Hours | Mon–Sat **10:30–17:00**, Sunday closed | Mon–Sat **16:00–20:00**, Sunday closed |
| Rating shown on site | 4.6 / 5 from 157 Google reviews | 4.3 / 5 from 261 Google reviews |

**The opening hours are the most strategically under-used fact in the entire dataset.** **[Inferred]** The two branches barely overlap: Nampally is a daytime clinic, Mehdipatnam an evening clinic. A patient in Abids searching at 11:00 can only be served by Nampally; the same patient searching at 18:30 can only be served by Mehdipatnam. No page on the site currently tells them this. **[Verified]** This single operational fact gives every area page a legitimate, genuinely useful reason to exist that no competitor template can replicate, and it is addressed in the blueprints in Section 19.

### 2.2 Clinical team

| Item | Detail | Label |
|---|---|---|
| Named clinicians on site | Seven | [Observed] |
| With a dedicated page | **One** — Dr. Md. Miftah Ur Rahman, `/doctors/dr-miftah-ur-rahman`, with `ProfilePage` + `Person`/`Physician` schema | [Verified] `app/doctors/dr-miftah-ur-rahman/page.tsx`; [Observed] |
| Founder | Dr. Mohd. Siraj Ur Rahman — the most credentialed individual named on the site — reachable **only** via an `/about#founder` anchor, with no page and no `Person` schema | [Observed] |

### 2.3 Work already completed

**[User-reported]** Approximately four months of SEO work within an agreed six-month engagement; roughly two months remain. The client estimates 10–15 pages exist.

**Verification of the page-count estimate: the true figure is 17 indexable URLs.** **[Verified]** Enumerated in `app/sitemap.ts`, all 17 confirmed live with HTTP 200 **[Observed]**. The client's 10–15 estimate was low. Full inventory in Section 05.

The repository also reveals a content-governance practice that materially changes what is realistic in 60 days. **[Verified]** `docs/internal-pages/` contains per-page `PAGE_PLAN.md`, `OWNERSHIP.md`, `CONTENT_QUESTIONS.md`, `DISCOVERY.md`, `CHANGELOG.md` and `content-snapshot.json` files for every existing page — for example `docs/internal-pages/root-canal-treatment/PAGE_PLAN.md` is 111,873 bytes. There is also `docs/internal-pages/clinic-mehdipatnam/FAQ_APPROVED.md` and `OWNER_DECISIONS.md`, and a working SEO audit script at `scripts/seo-content-audit.mjs`. **[Inferred]** This team already runs a disciplined, approval-gated content process with explicit owner sign-off. Any recommendation in this document that ignored that process and proposed a parallel CMS workflow would be fighting the grain of a system that is demonstrably working.

### 2.4 Reported search visibility, and what could be checked

**[User-reported]** NeoDent appears at or near the first organic result for searches such as "dental hospital in Nampally", "dental hospital in Mehdipatnam", "root canal treatment in Nampally", "root canal treatment in Mehdipatnam".

**What was independently observed on 23 November 2026** — one search API, one machine, one date, which is **not** ranking evidence and must not be presented to the doctor as such:

| Query | Result order observed | Label |
|---|---|---|
| `dental clinic Nampally Hyderabad` | **1 neodentdentalhospitals.com**, 2 eledenthospitals.com, 3 parkdentalcare.in, 4 fmsdental.com | [Observed] |
| `dental clinic in Mehdipatnam Hyderabad` | **1 neodentdentalhospitals.com**, 2 dentistsmilecare.com, 3 ssquaredentalcare.in, 4 revivedental.in | [Observed] |
| `dental hospital near Abids Hyderabad` | 1 hyderabaddental.co.in, 2 fmsdental.com, 3 eledenthospitals.com … **NeoDent absent; no result about Abids** | [Observed] |
| `root canal treatment in Masab Tank Hyderabad dentist` | 1 fmsdental.com (cost page), 2 drjaydevdental.com, 3 clovedental.in … **zero Masab Tank pages** | [Observed] |
| `best dentist Tolichowki Hyderabad dental clinic` | 1 dentwindental.com, 2 sanadentalcare.com, 3 marwadental.com — all three resident Tolichowki clinics | [Observed] |

**The client's core claim is directionally corroborated for the two branch localities, and the stated gap is confirmed.** **[Inferred]** Google results vary by searcher location, device, personalisation and time; these observations establish plausibility, not position. Section 22 specifies the measurement method that would establish it properly.

### 2.5 What remains to be achieved

1. Geographic reach beyond the two branch locality names. **[Verified gap]**
2. Author and clinical-reviewer attribution on YMYL clinical content. **[Verified gap]**
3. Any editorial/article surface at all. **[Verified gap]** — `/blog`, `/blogs`, `/articles`, `/news`, `/insights`, `/resources` all return HTTP 404 **[Observed]**.
4. Destination pages for six of seven clinicians, including the founder. **[Observed gap]**
5. NAP and brand-name consistency. **[Observed gap]** — see Section 04.
6. A measurement baseline. **[Requires validation]** — no Search Console or analytics access was available.

---

## 03. Existing Codebase Audit

All findings read directly from the repository. **No file was modified.** Paths are relative to `ClinicWebsite/Neodent-dental-clinic-nextjs/`.

### 3.1 Framework and architecture

| Field | Finding |
|---|---|
| File path | `package.json` |
| Framework | **Next.js 16.3.1**, React 19.2.8, TypeScript 5, Tailwind CSS v4 |
| Router | **App Router** — `app/` directory with `layout.tsx`, `page.tsx`, co-located routes |
| Dependencies (full) | `@next/third-parties` 16.3.1, `lucide-react` 0.469.0, `next`, `react`, `react-dom`, `resend` 6.24.0, `zod` 4.4.3 |
| Dev dependencies | `playwright`, `sharp`, `tailwindcss`, `eslint-config-next`, TypeScript types |
| Existing behaviour | Statically generated marketing site; `resend` powers the enquiry email path via `app/api/enquiry/route.ts`; `zod` validates it (`lib/enquiry-schema.ts`) |
| Finding | **Strength.** Current major version, modern rendering, server-first by default, minimal dependency surface. No framework upgrade is needed to execute any recommendation in this document. |
| Recommendation | No change. |
| Priority | — |
| Justification | Recommending a framework change here would be unjustified churn against a healthy baseline. |

### 3.2 Content management — the decisive architectural finding

| Field | Finding |
|---|---|
| File paths | `lib/site-data.ts` (531 lines), `lib/root-canal-treatment-page.ts` (551), `lib/smile-design-page.ts` (510), `lib/scaling-and-polishing-page.ts` (517), `lib/full-mouth-rehabilitation-page.ts` (515), `lib/braces-orthodontics-page.ts` (631), `lib/miftah-treatment-dossiers.ts` (877), `lib/treatments-hub.ts` (361), `lib/treatment-data.ts` (233), `lib/clinic-data.ts` (159), plus `lib/pages/*-content.ts` |
| Current CMS | **None. There is no CMS of any kind.** |
| Sanity configuration | **Absent.** No `sanity` dependency in `package.json`, no `sanity.config.ts`, no `sanity/` directory, no `next-sanity`, no `@sanity/*` package, no `NEXT_PUBLIC_SANITY_*` variable in `.env.example`. |
| Database integrations | **None.** No ORM, no database client, no external content API. |
| Existing content schemas | TypeScript types co-located with data — e.g. the exported `ClinicLocation` type in `lib/clinic-data.ts:30–55` defines `slug`, `name`, `locality`, `address`, `structuredAddress`, `phone`, `tel`, `hours`, `weeklyHours`, `weeklyClosure`, `schemaOpeningHours`, `rating`, `ratingNote`, `seo: { title, description }`, `directions`, `primaryImage`, `secondaryImage`, `gallery`, `doctors`, `treatments`, `patientStory`. |
| Finding | **This is a strength being mistaken for a gap.** The `ClinicLocation` type is already a content schema in everything but name: typed, required-field-enforced at compile time, with SEO fields as first-class members. The compiler currently refuses to let anyone publish a clinic location missing its address or SEO title. |
| Recommendation | Extend this pattern with an `AreaPage` type and a typed block union (Section 16). Do **not** replace it with Sanity in this window (Section 15). |
| Priority | **High** |
| Justification | The existing pattern already delivers the two properties the client wants from a CMS — reuse and consistency — and adds one Sanity cannot: compile-time refusal to ship incomplete content. Replacing it costs the entire 60-day window and produces no patient-visible page. |

### 3.3 Routing and page generation

**[Verified]** 20 route files under `app/`:

```
app/page.tsx                                    app/robots.ts
app/layout.tsx                                  app/sitemap.ts
app/not-found.tsx                               app/api/enquiry/route.ts
app/about/page.tsx                              app/clinic/page.tsx
app/contact/page.tsx                            app/clinic/[slug]/page.tsx
app/privacy-policy/page.tsx                     app/doctors/page.tsx
app/treatments/page.tsx                         app/doctors/dr-miftah-ur-rahman/page.tsx
app/treatments/root-canal-treatment/page.tsx    app/treatments/dental-implants/page.tsx
app/treatments/braces-and-orthodontics/page.tsx app/treatments/composite-build-up/page.tsx
app/treatments/full-mouth-rehabilitation/page.tsx
app/treatments/scaling-and-polishing/page.tsx   app/treatments/smile-design/page.tsx
```

| Field | Finding |
|---|---|
| File path | `app/clinic/[slug]/page.tsx` |
| Existing behaviour | **A dynamic, data-driven route already exists and is in production**, serving both branch pages from `clinicLocations` in `lib/clinic-data.ts`. It consumes `lib/structured-data.ts` (line 4) and emits JSON-LD (line 87). |
| Finding | **Significant strength, and it de-risks the central recommendation.** The pattern required for `/areas/[slug]` — one dynamic segment, data-driven, statically generated, per-page metadata and JSON-LD — is not new work to be invented. It is already running, and can be followed rather than designed. |
| Recommendation | Model `app/areas/[slug]/page.tsx` directly on this file. Reuse its metadata and JSON-LD conventions verbatim. |
| Priority | **High** |
| Justification | Reduces the riskiest deliverable to replicating a proven in-repo pattern, which is the difference between a 60-day plan that ships and one that does not. |
| Note | Treatment pages are **static individual routes**, not a `[slug]` route. Each has its own directory and its own content module. This is a deliberate choice that suits seven hand-crafted pages, and it should not be collapsed into a dynamic route — doing so would risk the existing content for no SEO gain. |

### 3.4 Sitemap

| Field | Finding |
|---|---|
| File path | `app/sitemap.ts` |
| Component/function | Default export returning `MetadataRoute.Sitemap`; imports `SITE_URL` from `lib/site-data` and `clinicLocationSlugs` from `lib/clinic-data` |
| Existing behaviour | Hand-enumerates 15 static routes and maps `clinicLocationSlugs` for the 2 clinic detail pages = **17 URLs**. An in-file comment documents the deliberate omission of a `/terms` route and states that `lastModified` uses build/request time "rather than a fabricated" date. |
| Finding | **Mostly a strength.** Honest, minimal, no fabricated freshness dates, and the clinic pages are already generated from data rather than hard-coded — so adding areas is an additive change. Weakness: `lastModified` is one identical build timestamp across all 17 URLs **[Observed]**, so it carries no per-page freshness signal; and `/doctors` is assigned `priority: 0.6`, the second-lowest on the site, which undervalues the most important E-E-A-T page. |
| Recommendation | Map an `areaPageSlugs` array exactly as `clinicLocationSlugs` is mapped, gated on a published flag. Raise `/doctors` priority to 0.8. Treat `lastModified` as a later refinement — Google treats sitemap signals as weak hints (Section 08). |
| Priority | **High** (areas), **Low** (priority/lastmod) |
| Justification | Sitemap inclusion is, in Google's own words, "a weak signal". Correct it, but do not spend scarce days on it. |

### 3.5 robots.txt

| Field | Finding |
|---|---|
| File path | `app/robots.ts` |
| Existing behaviour | `userAgent: "*"`, `allow: "/"`, `disallow: "/api/"`, `sitemap: ${SITE_URL}/sitemap.xml`. Live response is 100 bytes **[Observed]**. |
| Finding | **Correct. No action needed.** Crawlable, API path excluded, sitemap declared. |
| Recommendation | None. Note explicitly: do **not** use robots.txt to manage draft area pages — Google's canonicalisation guidance says verbatim "Don't use the robots.txt file for canonicalization purposes." Use the publish flag plus sitemap exclusion instead. |
| Priority | — |

### 3.6 Structured data

| Field | Finding |
|---|---|
| File path | `lib/structured-data.ts` (95 lines) |
| Components | `organizationJsonLd` (`MedicalOrganization`, `@id` `${SITE_URL}/#organization`, `foundingDate: "1994"`, `sameAs: ["https://www.instagram.com/neodent.dental/"]`); `locationJsonLd()` factory producing a `Dentist` entity per branch with `@id` `${url}#clinic`, `parentOrganization` by `@id`, `telephone`, `address` spread from `structuredAddress`, `openingHours`, `hasMap`, `image[]`; `websiteJsonLd` (`WebSite`); `breadcrumbJsonLd()` helper; `siteJsonLd` array rendered once from `app/layout.tsx` (lines 9, 76) |
| Existing behaviour | Two genuine branches modelled as two distinct `Dentist` entities — the correct schema.org subtype — linked to one parent `MedicalOrganization` by stable `@id`. Consumed across treatment pages, clinic pages, doctor pages and the treatments hub **[Verified]** via import scan. |
| Finding | **The strongest single asset in the codebase, and notably disciplined.** A 20-line header comment documents what was deliberately *excluded* and why: no review/rating schema because "the on-page Google rating is a third-party figure, not first-party collected reviews"; no `sameAs` beyond the one verified profile; no awards or patient-count claims "even though some appear as page copy". |
| Finding (validated externally) | **That exclusion decision is correct under current Google documentation and should be protected.** Google's `LocalBusiness` reference states verbatim that `aggregateRating` and `review` are "**only recommended for sites that capture reviews about other local businesses**". A clinic marking up its own star rating sits outside the documented recommendation and is a common cause of structured-data manual actions. A competitor, SSQUARE Dental Care in Mehdipatnam, does emit `AggregateRating` **[Observed]** — that is a risk they carry, not a pattern to copy. |
| Weaknesses | `Dentist` entities lack `geo`, `areaServed`, `priceRange`, `openingHoursSpecification` and `sameAs` **[Observed]**. `hasMap` points at a Maps *search* URL built from the address string, not a stable place/CID URL **[Observed]**. `MedicalOrganization` has no `address`, `telephone` or `contactPoint` **[Observed]**. Sunday closure appears in visible text but is not expressed in schema, because the legacy `openingHours` string format cannot express a closed day **[Observed]**. |
| Recommendation | Add `areaServed` to both `Dentist` entities (the mechanism that expresses neighbourhood reach honestly in markup); migrate `openingHours` → `openingHoursSpecification` so Sunday closure is declarable; add `geo` with ≥5 decimal places per Google's stated precision requirement; replace `hasMap` with stable place URLs; add `address`/`telephone` to `MedicalOrganization`. **Continue to emit no `aggregateRating`.** |
| Priority | **High** (`areaServed`, `openingHoursSpecification`), **Medium** (`geo`, `hasMap`, org fields) |
| Justification | `areaServed` lets NeoDent state served localities in structured data without creating a fictitious location entity — the compliant alternative to the thing Google's policy forbids. Hours precision matters because the two branches' near-disjoint hours are the core of the routing proposition. |

### 3.7 NAP data and the three-phone-number problem

| Field | Finding |
|---|---|
| File path | `lib/site-data.ts:80–92`, `122–123` |
| Existing behaviour | Three distinct numbers: `phone = "+91 90306 48393"` (Mehdipatnam branch), `nampallyPhone = "+91 90305 98081"` (Nampally branch), and `ctaPhone = "+91 9246348485"` — described in an in-file comment as deliberately "separate from `phone`/`telPhone` above, which remain the Mehdipatnam BRANCH contact". |
| Finding | **Material weakness.** `ctaPhone` is the most prominently promoted number on the site — every "Call NeoDent" and sticky-bar CTA site-wide **[Observed]** — yet it **appears in no structured data at all** **[Observed]**. The two `Dentist` entities carry only the branch numbers. Google Business Profile policy states verbatim: "Provide a phone number that connects to your individual business location… Use a local phone number instead of a central call center helpline number whenever possible" and "The phone number must be under the direct control of the business." |
| Recommendation | Decide, with the client, one canonical number per branch, and make the on-page branch number, the `Dentist.telephone` value and the Google Business Profile primary number agree for each branch. If `ctaPhone` is a central reception line, keep it as a visible CTA but add it as a `contactPoint` on `MedicalOrganization` rather than leaving it unmodelled. |
| Priority | **Critical** |
| Justification | NAP consistency across site, schema and Business Profile is foundational to local search; a three-number split with the loudest number absent from all markup actively undermines the entity resolution the rest of the schema layer gets right. This is a one-hour fix with disproportionate value. |

### 3.8 Components and reusable sections

**[Verified]** `components/` contains a `ui/` layer with components that already behave as reusable content blocks: `BranchCards.tsx`, `Breadcrumbs.tsx`, `RelatedTreatments.tsx`, `DoctorPortrait.tsx`, `LeadCapture.tsx`, `FloatingCta.tsx`, `AppButton.tsx`, `EditorialHighlight.tsx`, `OffsetImagePair.tsx`, `Atmosphere.tsx`, `PageLoader.tsx`, each with a co-located CSS module.

| Field | Finding |
|---|---|
| Finding | **A block library already exists in all but name.** `BranchCards`, `RelatedTreatments`, `Breadcrumbs`, `DoctorPortrait` and `LeadCapture` are precisely five of the blocks the client's brief proposes building. They are not registered in a typed union and not composable from data, but the rendering layer is done. |
| Recommendation | Build the block **registry** (a discriminated-union type plus a renderer map) over these existing components rather than authoring new ones. Section 16 specifies this. |
| Priority | **High** |
| Justification | Reframes "build 20 blocks" into "register and compose the ~8 that already exist", which is what makes the Section 21 timeline achievable in the remaining window. |

### 3.9 Supporting tooling

**[Verified]** `scripts/seo-content-audit.mjs` and `scripts/page-content-snapshot.mjs` both reference structured data and content extraction; `.audit/` and `.frame-audit/` directories hold per-page audit JSON; `playwright` is a dev dependency. **[Inferred]** The team already has automated content/SEO regression checking. **[Recommended]** Extend `seo-content-audit.mjs` to assert the new area-page invariants (self-canonical present, `areaServed` present, no `LocalBusiness` entity with an area-only address, minimum unique-content ratio) rather than introducing a new tool. **Priority: Medium.**

### 3.10 Codebase audit summary

| Area | Verdict |
|---|---|
| Framework, routing, rendering | Strong. No change needed. |
| Dynamic-route precedent for areas | Strong. Already in production at `app/clinic/[slug]`. |
| Structured data design and restraint | Strong. Protect the no-`aggregateRating` decision. |
| Typed content modules | Strong. Extend, do not replace. |
| Reusable component layer | Strong. Needs a registry, not new components. |
| Content governance docs | Strong. Build the new pages into this process. |
| NAP consistency | **Critical weakness.** Three numbers; the primary one unmodelled. |
| E-E-A-T attribution | **High-severity gap.** No author/reviewer/date on any clinical page. |
| Editorial surface | **Gap.** No blog of any kind. |
| Geographic surface | **Gap.** One sentence per clinic page; no area namespace. |
| `areaServed` / hours precision in schema | Weakness. Fixable in hours. |

---

## 04. Live Website SEO Audit

Audited 23 November 2026. All 17 sitemap URLs returned HTTP 200. **[Observed]**

### 4.1 What is already correct — and must not be "fixed"

A meaningful part of the value here is telling the client what to leave alone. Each of the following was verified across all 17 live URLs. **[Observed]**

| Element | Status |
|---|---|
| `<title>` | 17/17 unique, 43–70 characters |
| Meta description | 17/17 present and unique, 144–213 characters |
| Canonical | 17/17 present, self-referential, exactly matching the sitemap URL — no parameter or trailing-slash variants |
| `<h1>` | Exactly one per page, 17/17 |
| Meta robots | `index, follow` on 17/17; no accidental `noindex` anywhere |
| `lang` | `en-IN` site-wide — correct locale signal for this market |
| `alt` attribute | Zero images missing the attribute entirely |
| Host canonicalisation | `http://www` → 308; non-www → 308; trailing slash → 308. Single host, single URL form, enforced at the edge |
| 404 handling | Unknown paths return a true HTTP 404, not a soft 200 (verified with `/this-page-does-not-exist-xyz`) |
| Images | Next.js image pipeline with `srcSet`, explicit `width`/`height`, `loading="lazy"` below the fold, WebP sources |
| Open Graph | Complete on the homepage including `og:image:alt` |

**This is a cleaner technical baseline than most clinic websites achieve, and better than several of the Hyderabad chains in Section 06** — two of which ship no structured data at all. **[Observed]** The previous four months produced a sound foundation. The next phase should build on it, not re-audit it.

### 4.2 Structured data observed live

| Page type | JSON-LD types observed |
|---|---|
| Site-wide (from `app/layout.tsx`) | `MedicalOrganization`, `Dentist` ×2, `WebSite` |
| Treatment pages (×7) | `MedicalWebPage`, `MedicalProcedure`, `FAQPage` (10 questions each), `BreadcrumbList` |
| `/treatments` hub | `CollectionPage`, `ItemList`, `FAQPage`, `BreadcrumbList` |
| `/clinic/[slug]` (×2) | `WebPage` with `mainEntity` → `#clinic`, `BreadcrumbList` |
| `/doctors/dr-miftah-ur-rahman` | `ProfilePage`, `Person`/`Physician`, `BreadcrumbList` |

**Finding: above-average schema implementation for a clinic site.** **[Observed]** The `@id`-based entity graph (`#organization` → `#clinic` → `#webpage`) is the part most sites get wrong and this one gets right.

### 4.3 Issues observed, by severity

| Severity | Issue | Evidence |
|---|---|---|
| **Critical** | **Primary CTA phone number (+91 9246348485) appears in no structured data.** It is the number on every "Call NeoDent" and sticky-bar CTA site-wide. See Section 3.7. | JSON-LD `telephone` fields vs site-wide CTAs |
| **High** | **No author, medical reviewer or date on any YMYL clinical page.** None of the 7 treatment pages carries a visible byline, "medically reviewed by", publish date or review date, and the `MedicalWebPage` blocks contain no `author`, `reviewedBy`, `lastReviewed` or `datePublished`. | All 7 `/treatments/*` |
| **High** | **Thin content on two commercially important pages.** `/contact` ≈460 whole-DOM words (thinnest on the site), `/doctors` ≈661 (second thinnest), against 2,698–3,601 on treatment pages. Both are conversion and trust pages. | Word counts across 17 URLs |
| **High** | **No standalone page for the founder.** Dr. Mohd. Siraj Ur Rahman is reachable only via `/about#founder`. Six of seven clinicians have no destination page. | `/doctors`, `/about`, sitemap |
| Medium | **On-page ratings not in schema.** "4.3/5 from 261" and "4.6/5 from 157" render as visible text on `/`, both clinic pages and the footer, with no `aggregateRating` in any JSON-LD. This is the correct choice — see Section 08. | On-page text vs JSON-LD |
| Medium | **Content images with empty `alt`.** `/contact`: two branch exterior photographs. `/treatments/braces-and-orthodontics`: four braces-type illustrations (`metal-braces-1200.webp`, `ceramic-braces-1200.webp`, `self-ligating-braces-1200.webp`, `clear-aligners-1200.webp`). These are informational, not decorative. | Image attribute scan |
| Medium | **`BreadcrumbList` missing on `/about`, `/contact`, `/privacy-policy`** while every other second-level page has one. | JSON-LD type scan |
| Medium | **Clinic `Dentist` entities lack `geo`, `areaServed`, `priceRange`, `openingHoursSpecification`, `sameAs`**; `hasMap` is a Maps search URL, not a stable place URL. | JSON-LD blocks |
| Medium | **FAQ intent overlap.** "What is root canal treatment?" is marked up as an FAQ answer on **both** `/treatments` and `/treatments/root-canal-treatment`; same duplication for implants, full-mouth rehabilitation and smile design. | `FAQPage` blocks |
| Low | Sitemap `lastmod` is one build timestamp across all 17 URLs; `/doctors` priority 0.6 undervalues an E-E-A-T page. | sitemap.xml |
| Low | **H1 concatenation artefacts** from line-break markup: "Three decadesof changing smiles.", "Let's make abeginning.", "Decades of changing smiles.A legacy that continues." Renders fine visually; produces malformed strings for text extractors. | H1 extractions |
| Low | Duplicated heading text within pages — `/clinic/*` has "Dr. Md. Miftah Ur Rahman" as both H3 and H2; the root-canal page has "The crown is placed" as an H3 under two different H2s. | Heading outlines |
| Low | Footer renders `Terms` as plain text, not a link; `/terms` returns 404. A promised legal page that does not exist. | Footer markup |
| Low | Both clinic pages lack an FAQ block, although the `/clinic` hub has a 5-question `FAQPage`. Branch pages are exactly where locality questions belong. | `/clinic` vs `/clinic/*` |

### 4.4 Consistency and accuracy findings

The brief asked specifically not to assume displayed numbers are correct. Checked:

| # | Finding | Assessment |
|---|---|---|
| 1 | **Review counts are internally consistent.** 261 (Mehdipatnam) + 157 (Nampally) = 418, matching the homepage "418 Google reviews across both clinics". Identical on `/`, both clinic pages and the footer, and explicitly labelled as Google-listing snapshots. | **No contradiction. Good practice.** Whether they match the live Business Profiles today is **[Requires validation]** — check both profiles and date-stamp the snapshot. |
| 2 | **Brand name varies: singular vs plural.** Schema `name`, all `<title>` tags and both `Dentist.name` use "Neodent Dental Hospital" (singular). Homepage doctor role labels use "Neodent Dental Hospital**s**" (plural), and the domain is `neodentdentalhospital**s**.com`. | **Fix.** Business Profile policy requires the name to "reflect your business's real-world name, as used consistently on your storefront, website, stationery". Choose one and apply it everywhere, including both Business Profiles. |
| 3 | **"Three decades" vs "32 years" vs "Since 1994".** Homepage H1 "Three decades of changing smiles"; stats strip "32 years of specialist care, since 1994"; `/about` H1 "Decades of changing smiles." | Internally reconcilable (2026 − 1994 = 32) but the headline **understates** the record. Standardise on "Since 1994" plus a computed year count. |
| 4 | **Branch naming ambiguity — Mehdipatnam vs Humayun Nagar.** Title says "Dental Hospital in Mehdipatnam", H1 "Neodent Dental Hospital, Mehdipatnam", but the H2 and postal address place it in **Humayun Nagar, Royal Colony** (500006). Footer labels it "Humayun Nagar"; nav labels it "Mehdipatnam". | **Important, and it changes the area-page plan.** The branch physically sits in Humayun Nagar. Humayun Nagar must therefore **not** become an `/areas/` page — it should be resolved *on the clinic page itself* ("in Humayun Nagar, immediately off Mehdipatnam"). Creating `/areas/humayun-nagar` would compete with the branch page for identical intent. |
| 5 | **Unsourced volume claim.** "25,000+ patients treated" appears on the homepage with no methodology, date or source — while the review figures beside it *are* caveated. Not corroborated elsewhere. | **Fix or caveat.** Inconsistent rigour next to a properly caveated number erodes the trust the caveat was meant to build. Either source and date it or remove it. The schema layer already correctly excludes it. |
| 6 | **Sunday closure not in schema.** Visible text states Sunday holiday for both branches; the legacy `openingHours` string omits Sunday rather than declaring closure. | **Fix** via `openingHoursSpecification`. |
| 7 | **Both branch pages carry an H2 naming the other branch**, and the full seven-person clinician roster is duplicated on both. | Blurs per-branch topical focus for two pages competing for distinct locality queries. Differentiate. |

### 4.5 Blog or article section

**None exists.** **[Observed]** Zero article-type URLs in the sitemap. `/blog`, `/blogs`, `/articles`, `/news`, `/insights`, `/resources` all return HTTP 404. No `Article`, `BlogPosting` or `Blog` type in any JSON-LD on any page. No navigation or footer link to an editorial section.

The nearest editorial content is embedded *inside* existing pages — the `/treatments` hub's "Understanding DMLS Crowns & Functional Strength" section, the root-canal page's "Learn More About Root Canal Treatment" section, and `/about`'s media section. These are page sections, not standalone indexable articles. **[Inferred]** The writing capability plainly exists; the publishing surface does not.

### 4.6 The existing geographic footprint — the most important finding for this strategy

**[Observed]** The only geographic reach beyond the two branch names that exists anywhere on the site today is **one sentence per clinic page**:

- `/clinic/nampally` names: **Abids, Afzalgunj, Begum Bazaar, Basheer Bagh, Malakpet, Santosh Nagar**
- `/clinic/mehdipatnam` names: **Humayun Nagar, Asifnagar, Gudimalkapur, Masab Tank**

Three conclusions follow. **[Inferred]**

1. **The business has already defined its own catchment**, and it matches the brief's candidate list almost exactly. The area-page strategy is not inventing a service area; it is giving one sentence the room to become a useful page.
2. **Those sentences are currently the weakest possible expression of that intent.** A bare list of place names in body copy is the named example in Google's keyword-stuffing policy: "Blocks of text that list cities and regions that a web page is trying to rank for." They are short and in context, so this is a caution rather than a violation — but the remedy is to replace the list with substance, not to lengthen it.
3. **No competitor targets any of these localities** (Section 06). The content gap and the competitive gap coincide.

---

## 05. Existing Page Inventory

**17 indexable URLs.** **[Verified]** `app/sitemap.ts`; all confirmed HTTP 200 **[Observed]**. The client's "10–15 pages" estimate was low.

| # | URL | Page type | Source file | SEO role | Observed depth |
|---|---|---|---|---|---|
| 1 | `/` | Home | `app/page.tsx` | Brand, both branches, treatment entry | — |
| 2 | `/about` | Trust | `app/about/page.tsx` | Heritage since 1994; founder (anchor only) | — |
| 3 | `/doctors` | Trust / E-E-A-T | `app/doctors/page.tsx` | Clinician roster | **≈661 words — thin** |
| 4 | `/doctors/dr-miftah-ur-rahman` | Doctor profile | `app/doctors/dr-miftah-ur-rahman/page.tsx` | Named-practitioner authority; `ProfilePage` + `Person` | — |
| 5 | `/treatments` | Hub | `app/treatments/page.tsx` | `CollectionPage` + `ItemList`; links 7 treatments | — |
| 6 | `/treatments/root-canal-treatment` | Treatment | `app/treatments/root-canal-treatment/page.tsx` + `lib/root-canal-treatment-page.ts` (551 lines) | **Primary commercial page** | 2,698–3,601 band |
| 7 | `/treatments/dental-implants` | Treatment | + `lib/dental-implants-page.ts` | High-value commercial | 2,698–3,601 band |
| 8 | `/treatments/braces-and-orthodontics` | Treatment | + `lib/braces-orthodontics-page.ts` (631 lines) | Commercial | 2,698–3,601 band |
| 9 | `/treatments/smile-design` | Treatment | + `lib/smile-design-page.ts` (510 lines) | Cosmetic commercial | 2,698–3,601 band |
| 10 | `/treatments/full-mouth-rehabilitation` | Treatment | + `lib/full-mouth-rehabilitation-page.ts` (515 lines) | High-value commercial | 2,698–3,601 band |
| 11 | `/treatments/composite-build-up` | Treatment | + `lib/composite-build-up-page.ts` (406 lines) | Commercial | 2,698–3,601 band |
| 12 | `/treatments/scaling-and-polishing` | Treatment | + `lib/scaling-and-polishing-page.ts` (517 lines) | Entry-level commercial | 2,698–3,601 band |
| 13 | `/clinic` | Clinic hub | `app/clinic/page.tsx` | Branch chooser; 5-question `FAQPage` | — |
| 14 | `/clinic/nampally` | **Real branch** | `app/clinic/[slug]/page.tsx` | Local intent — Nampally + 6 named nearby localities | — |
| 15 | `/clinic/mehdipatnam` | **Real branch** | `app/clinic/[slug]/page.tsx` | Local intent — Mehdipatnam + 4 named nearby localities | — |
| 16 | `/contact` | Conversion | `app/contact/page.tsx` | Enquiry form → `app/api/enquiry/route.ts` | **≈460 words — thinnest** |
| 17 | `/privacy-policy` | Legal | `app/privacy-policy/page.tsx` | Compliance | — |

**Composition:** 7 treatment (41%), 2 branch + 1 hub (18%), 2 doctor (12%), 2 trust/conversion, 1 home, 1 legal.

**Structural reading.** **[Inferred]** This is a treatment-led site with a thin local layer and no editorial layer. The treatment pages are the asset — substantial, well-marked-up, and reportedly already ranking. The deficiency is not page quality; it is that there are only two doors into the site from geography and none from informational search.

**Non-indexable routes, correctly excluded:** `app/api/enquiry/route.ts` (disallowed in robots), `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`, `lib/og-image.tsx`. **[Verified]** `/terms` is referenced in the footer as plain text and does not exist. **[Observed]**

---

## 06. Hyderabad Dental Competitor Research

**Method.** 7 live search queries; 13 competitor sitemaps expanded including nested indexes (~4,800 URLs tokenised); raw HTML parsed for titles, H1s, canonicals and every `application/ld+json` type; line-level diffs run to measure duplication. **[Observed]**

**Fetch failures, reported as failures rather than guessed:** `revivedental.in` (TLS handshake, apex and www); `fmsdental.com/best-dental-clinic-in-tolichowki/` (TLS handshake, though the URL *is* in FMS's sitemap); `parkdentalcare.in`, `hyderabaddental.co.in`, `dentwin.in` sitemaps (0 parseable `<loc>`).

**No ranking position, search volume, traffic, difficulty or authority metric appears below.** None was accessible.

### 6.1 Competitor table

| Business | Website | Stated HYD locations | Branch pages | Area pages (non-branch) | Treatment×locality | Sitemap total | Blog | E-E-A-T | Homepage JSON-LD |
|---|---|---|---|---|---|---|---|---|---|
| **Eledent** | eledenthospitals.com | Kondapur, KPHB, Manikonda, Banjara Hills, Kompally | Yes ×5, `/<area>` | **Yes, 20** — `/best-dentist-in-<area>`, `/dental-clinic-in-<area>`, `/dental-clinic-near-me` | **Yes — 187** of 204 `/services/<treatment>-in-<area>` | 345 | **89** | 21 doctor pages | `FAQPage` only |
| **Partha Dental** | parthadental.com | Multi-branch chain | Partly ×10 | Yes | **Yes — ~125** across 10 treatment prefixes | **1,632** | 2 | No doctor links | `Organization`, `WebSite`, `Place`, `FAQPage`, `VideoObject`… |
| **FMS Dental** | fmsdental.com | 10 clinics, 2 international, hospital, 24h emergency | Yes | **Yes, ~11** incl. tolichowki, banjara-hills, gachibowli, madhapur | Cost pages; no systematic grid | 347 | Yes | Not sampled (TLS fail) | Not captured |
| **Clove Dental** | clovedental.in | National chain, city hubs | City-level only | **0 HYD sub-locality URLs in sitemap** | City variants exist but **not in sitemap** | 672 (576 blog) | **576** | `Person` schema | 15+ types incl. `MedicalOrganization` |
| **Dr White Dental Care** | drwhitedentalcare.com | Nizampet | Yes | No — all 15 target **its own** area | **Yes — 15, all Nizampet** | 88 | Yes | `Person` | 16 types — richest small-clinic set |
| **Dr Gowd's** | drgowdsdental.com | Gachibowli, Madhapur, Puppalaguda | Yes | 4 | No | 865 | 12 | `Person` | `Organization`, `Article`, `Person` |
| **The Dental Specialists** | thedentalspecialists.in | Banjara Hills, Ameerpet, Kondapur | Yes | 3 | No | 251 | 10 | Yes | `Dentist`, `GeoCoordinates`, `OpeningHoursSpecification` |
| **Smiline** | smiline.com | Since 1996; Hitech City | 1 | No | No | 382 | **257** | No doctor links | **None — 0 blocks** |
| **Marwa Dental** | marwadental.com | Tolichowki, since 2015 | Homepage *is* the location page | No | No | **9** | No | `Person`, `Dentist` | `MedicalOrganization`, `Dentist`, `FAQPage` |
| **Dr. Sana Dental** | sanadentalcare.com | Nizam Colony, Tolichowki | Single | No | No | 19 | No | `Person` | `Dentist`, `OpeningHoursSpecification` |
| **SSQUARE** | ssquaredentalcare.in | **Mehdipatnam** | Single | No | No | No sitemap | No | No doctor links | `Dentist`, **`AggregateRating`**, `GeoCoordinates` |
| **Krishna Dental** | krishnadentalhospitals.com | Kompally, Kondapur, Kukatpally; EHS cashless | Yes | 4 | No | 114 | 1 | No doctor links | `Organization`, `Dentist`, `BreadcrumbList` |
| **Park Dental Care** | parkdentalcare.in | Hyderabad; 10+ yrs | Unknown | Unknown | Unknown | Fetch failed | Yes | Yes | **None — 0 blocks** |
| **Revive Dental** | revivedental.in | "Best Dental Clinic In Mehdipatnam" | TLS fail | — | — | Fetch failed | — | — | Fetch failed |
| **Hyderabad Dental Hospital** | hyderabaddental.co.in | ~10,000 sq ft, "heart of the city" | Unknown | Unknown | Unknown | Fetch failed | — | — | Not captured |
| **Dentwin** | dentwindental.com | Toli Chowki, 7 days | Single | No | No | Fetch failed | — | — | Not captured |

### 6.2 Searches run, and results in the exact order returned

One search API, one machine, 23 November 2026. **This is not ranking evidence** and must not be presented to the doctor as such.

| Query | Results 1–10 observed |
|---|---|
| `dental clinic in Mehdipatnam Hyderabad` | **1 neodentdentalhospitals.com** · 2 dentistsmilecare.com · 3 ssquaredentalcare.in · 4 revivedental.in · 5 sites.google.com/site/drmallena/mp · 6 practo.com · 7 placedigger · 8 fmsdental.com · 9 orderhere.io blog · 10 parkdentalcare.in |
| `dental clinic Nampally Hyderabad` | **1 neodentdentalhospitals.com** · 2 eledenthospitals.com · 3 parkdentalcare.in · 4 fmsdental.com · 5 consult.gadentalclinics.com · 6 krishnadentalhospitals.com · 7 orderhere.io · 8 drjaydevdental.com · 9 microcuredental.com · 10 drsmiles.co.in |
| `dental hospital near Abids Hyderabad` | 1 hyderabaddental.co.in · 2 fmsdental.com · 3 eledenthospitals.com · 4 sscds.edu.in · 5 parkdentalcare.in · 6 fmsdental.com/location/ · 7 krishnadentalhospitals.com · 8 tootdental.com · 9 smiline.com · 10 continentalhospitals.com — **not one result is about Abids; NeoDent absent despite a branch in adjacent Nampally** |
| `root canal treatment in Masab Tank Hyderabad dentist` | 1 fmsdental.com/root-canal-treatment-cost-price/ · 2 drjaydevdental.com · 3 clovedental.in/specialties/root-canal-treatment/hyderabad · 4 drwhitedentalcare.com · 5 fmsdental.com/faqs/ · 6 medicoverhospitals.in · 7 drwhitedentalcare.com cost page · 8 medicoverhospitals.in · 9 consult.gadentalclinics.com · 10 microcuredental.com — **zero Masab Tank pages; two of the top seven are cost pages** |
| `best dentist Tolichowki Hyderabad dental clinic` | 1 dentwindental.com · 2 sanadentalcare.com · 3 marwadental.com · 4 orderhere.io · 5 kiwidentalhospitals.com · 6 tootdental.com · 7 wanderlog.com · 8 fmsdental.com · 9 fmsdental.com/location/ · 10 quora.com — **top 3 are resident Tolichowki clinics** |
| `dental clinic in Malakpet Hyderabad dentist` | 1–2 carehospitals.com/doctor/hyderabad/malakpet/… · 3 ueniweb · 4 carehospitals doctor-list · 5 docplexus · 6 placedigger · 7 parkdentalcare.in · 8 placedigger · 9 tootdental.com · 10 fmsdental.com — **top results are a hospital group's per-practitioner locality pages** |
| `dentist near Begum Bazaar Afzalgunj Hyderabad dental clinic` | 1 fmsdental.com/location/ · 2 parkdentalcare.in · 3 fmsdental.com · 4 tootdental.com · 5 kimssunshine.co.in · 6 consult.gadentalclinics.com · 7 happy-dental-hospital.com (**Begumpet**, not Begum Bazaar) · 8 krishnadentalhospitals.com · 9 thepuredentistry.com · 10 eledenthospitals.com — **the engine fell back to partial token matching because no Begum Bazaar dental content exists** |

### 6.3 The decisive finding: the old city is editorially empty

Across 13 expanded competitor sitemaps: **[Observed]**

| NeoDent target locality | Competitor URLs found |
|---|---|
| Abids, Begum Bazaar, Afzalgunj, Basheer Bagh, Masab Tank, Asif Nagar, Gudimalkapur, Humayun Nagar, Malakpet, Nampally, Mehdipatnam | **0** |
| Santosh Nagar | 2 (Partha) |
| Tolichowki | 1 (FMS, in sitemap but TLS-failed on fetch) + 3 resident clinics ranking organically |

**[Inferred]** Hyderabad's programmatic dental SEO is concentrated in the affluent west/north IT corridor. The old city has competition on the ground but almost none in content. For a business already physically embedded there, this is the most favourable condition a local SEO programme can have — and it is why the opportunity is time-limited. Nothing prevents Eledent or Partha from extending their existing grids southward; both already own the template.

### 6.4 The (a)/(b)/(c)/(d) distinction, and the evidence that it matters

The brief required separating: URL exists · URL is in a sitemap · URL appears for a target query · URL has observable ranking visibility · URL generates business results.

**Clove Dental supplied the decisive case.** `clovedental.in/specialties/root-canal-treatment/hyderabad`:

- **(a) Exists** — HTTP 200, self-canonicalising, 8 JSON-LD blocks. **[Observed]**
- **(b) In sitemap — no.** `specialties-sitemap.xml` lists only the 15 non-city parents. **[Observed]**
- **(c) Appeared for a target query — yes**, result 3 for the Masab Tank root-canal query. **[Observed]**
- **(d) Ranking visibility — unknown.** One observation, one machine, one date. **[Requires validation]**
- **(e) Business results — unknown and unknowable from outside.** **[Requires validation]**

**[Inferred]** Sitemap-only analysis would have missed this page; search-only analysis would have wrongly concluded the city grid was declared. Any claim of the form "competitor X ranks for Y" should be read against this example. The corollary also matters: **sitemap presence is not a precondition for indexing**, consistent with Google's own statement that sitemap inclusion is "a weak signal".

### 6.5 Programmatic location pages at scale — evidence

| Competitor | Evidence of templating |
|---|---|
| **Eledent** | 187 of 204 `/services/` URLs carry a locality token. Per treatment, one URL per branch area plus "hyderabad": `/services/root-canal-treatment-in-{kompally, banjara-hills, manikonda, kukatpally, kondapur}`. Same grid for gummy-smile-correction, tooth-reshaping, full-mouth-dental-implants, all-on-4, all-on-6, smile-designing. Plus 20 area/near-me pages. |
| **Partha** | 125 locality URLs: pediatric-dentist (11 areas), oral-and-maxillofacial-surgeons (11), dental-veneers (10), dental-crown (10), teeth-gap (10), gum-disease-treatment (9), dentures (8), clear-aligners (6), root-canal-treatment (4), braces-treatment (3). |
| **Dr White** | 15 treatment×locality URLs, **all saturating a single area** (Nizampet). |

### 6.6 Measured duplication, with quoted samples

**Eledent `/services/root-canal-treatment-in-kondapur` vs `-in-kompally`:** 65 vs 67 content lines; **39 byte-identical — about 60% of the Kondapur page reproduced verbatim.** **[Observed]**

Identical on both:

> "Endodontist-Led | Microscope-Assisted | Single-Sitting Available | 27,000+ RCT Cases"
> "Microscope-assisted treatment for precision canal cleaning"

Token-swapped, two words changed:

> Kondapur: "…Eledent is the best dental **clinic** in **Kondapur** for patients searching for root canal near me…"
> Kompally: "…Eledent is the best dental **hospital** in **Kompally** for patients searching for root canal near me…"

**The nuance that makes this instructive rather than merely damning:** roughly 40% *is* genuinely differentiated with real local facts. The Kondapur page names "Madhapur, Gachibowli, Hafeezpet and Miyapur"; the Kompally page opens on a different premise — "Specialist endodontic care used to mean a long drive into central Hyderabad. Not any more." — and cites "the Suchitra Road branch". **[Observed]**

**[Inferred]** These pages sit in a grey zone, not a clear violation. The strategic lesson is precise, and it is the organising principle of this document: **invert the ratio.** Eledent is roughly 60% template / 40% local. NeoDent should publish far fewer pages at roughly 30% shared / 70% genuinely local — which is achievable only because four pages are being written rather than 187.

### 6.7 What NeoDent should learn, and what to ignore

**Adopt:**

1. **Editorial depth is the real chain advantage.** Clove has 576 blog URLs, Smiline 257, Eledent 89. NeoDent has zero. **[Observed]** This, not location pages, is the widest measurable gap in the dataset.
2. **Doctor pages at scale.** Eledent 21, NeoDent 1. **[Observed]** NeoDent has seven named clinicians and a notable founder with no page.
3. **Cost and "what affects the price" content is in demand.** Two of the top seven results for the Masab Tank root-canal query were cost pages. **[Observed]** NeoDent has none.
4. **Saturate one area before spreading.** Dr White's 15-URL single-locality model is far more transferable to a two-branch clinic than Partha's 1,632-URL spread.

**Ignore or avoid:**

1. **Stacked near-duplicate URLs per intent.** Eledent runs `/kondapur`, `/best-dentist-in-kondapur` and `/dental-clinic-in-kondapur` — textbook self-competition. **[Observed]**
2. **`AggregateRating` on your own business** (SSQUARE). NeoDent's existing restraint is correct — Section 08.
3. **Scale without authority.** Partha bought 1,632 URLs and has 2 blog posts and no linked doctor profiles — a poor trade in a YMYL category. **[Observed]**

**The most useful corrective finding:** the three clinics taking the top three places for the Tolichowki query — Dentwin, Sana (19 URLs) and Marwa (**9 URLs**) — are resident single-location practices with locality-named homepages, and they outranked every national chain for that locality. **[Observed]** Meanwhile two competitors ship **zero structured data** and still appear widely; Park Dental Care appeared in 5 of 7 queries. **[Observed]**

**[Inferred]** In this market, being genuinely local and specific appears to beat being large, and schema looks like a supporting signal rather than a primary driver. That is encouraging for a two-branch clinic, and a caution against over-investing in markup at the expense of content. It is also the strongest available argument for publishing four excellent area pages instead of forty templated ones.

---

## 07. Tirumala Racking Systems — Reference Architecture Analysis

Analysed as an **architectural reference only**, per the brief. **No ranking, traffic or performance data for this site was observed, and none is claimed.** Any assertion that this architecture "works" would be unsupported.

### 7.1 Structure observed

| Item | Finding |
|---|---|
| robots.txt | `User-agent: *` / `Allow: /` / `Sitemap: …/sitemap.xml`. No `Disallow`. **[Observed]** |
| sitemap.xml | 152,950 bytes, **708 `<loc>` entries**, flat, no sitemap index. **[Observed]** |
| `lastmod` | **All 708 identical** — `2026-01-16T11:45:50+00:00`. **[Observed]** |
| Generator | Sitemap header names `check-domains.com sitemap generator`. **[Observed]** |

| URL pattern | Count | Examples |
|---|---:|---|
| `/` | 1 | homepage |
| `/{page}.html` | 21 | `/pallet-racks.html`, `/market-area.html`, `/contact-us.html` |
| `/{geo}/` | 50 | `/hyderabad/`, `/bengaluru/`, `/chennai/`, `/dubai/`, `/italy/`, `/bhutan/` |
| `/{geo}/{product}.html` | **600** | `/hyderabad/pallet-racks.html`, `/dubai/mezzanine-floor.html` |
| `/{intent}/{product}.html` | 36 | `/suppliers/pallet-racks.html`, `/exporters/pallet-racks.html` |
| **Total** | **708** | |

**The arithmetic is exactly combinatorial: 12 products × 50 geos = 600, plus 12 × 3 intent words = 36, plus 50 geo hubs, plus 21 fixed pages, plus the homepage = 708.** Every geo namespace has exactly 12 children; all 53 namespaces return a count of exactly 12. **[Observed]** There are no ragged or partial sets, which is the signature of cartesian generation rather than editorial decision-making. **[Inferred]**

The 50 geo tokens mix countries (`/australia/`, `/italy/`, `/kuwait/`, `/bhutan/`), Indian states (`/telangana/`, `/karnataka/`) and cities (`/hyderabad/`, `/pune/`) in one undifferentiated namespace with **no hierarchy** — `/hyderabad/` is not nested under `/telangana/`, so the two compete at the same level. **[Observed]**

### 7.2 The decisive measurement — direct body-copy comparison

Tags, scripts and styles stripped; whitespace normalised; compared word-by-word at the same index. **[Observed]**

**`/hyderabad/` vs `/bengaluru/` — 1,437 words each. Exactly 5 word positions differ. All five are the city name.**

| Index | Hyderabad | Bengaluru | Context |
|---:|---|---|---|
| 5 | `Hyderabad,` | `Bengaluru,` | title phrase |
| 96 | `Hyderabad` | `Bengaluru` | "Rack Manufacturing & Storage Solutions in __" |
| 134 | `Hyderabad.` | `Bengaluru.` | "leading Supermarket Racks Manufacturers in __" |
| 226 | `Hyderabad.` | `Bengaluru.` | "largest Display Racks Suppliers in __" |
| 316 | `Hyderabad` | `Bengaluru` | "Departmental Store Racks Exporters from __" |

**1,432 of 1,437 words — 99.65% — are identical. 0.35% of the copy is location-specific, and that 0.35% is the place name itself, not one fact about the place.**

`/hyderabad/pallet-racks.html` vs `/bengaluru/pallet-racks.html`: 737 words each, **9 differing positions, all the city name — 98.8% identical**, with byte-identical page lengths (38,266 bytes each). **[Observed]**

Representative copy, appearing on all 50 city variants with one token swapped:

> "Are you looking for a Pallet Racks in **Hyderabad** ? But, not able to get them as per your liking? Then, get help from Tirumala Racks. … We **have called** one of the leading Pallet Racks Manufacturers in **Hyderabad** because of our smart work…"

The grammatical error "We **have called**" is carried identically across all 600 product×city pages — direct evidence of single-template generation with no per-page editing. **[Observed]**

**What the city-name substitution is never accompanied by:** no local address, no local phone, no local landmark, no delivery or lead-time information for that city, no local project reference, no local testimonial, no local photograph, no local pricing. **Nothing a reader in Bengaluru learns that a reader in Chennai does not.** **[Observed]**

### 7.3 Keyword handling

On `/hyderabad/` the string "Hyderabad" appears **39 times in the raw HTML but only 8 times in the visible body** — the other 31 are in the title, meta description, a six-phrase `meta keywords` list and attributes. **[Observed]**

`/suppliers/pallet-racks.html` opens with a bare run of city names in the page header:

> "Pallet Racks Suppliers In **Hyderabad Delhi Mumbai Bangalore Ahmedabad Chennai** +91-9494903165 info@tirumalaracks.com"

**[Inferred]** That is a direct instance of Google's own named keyword-stuffing example — "Blocks of text that list cities and regions that a web page is trying to rank for" — placed beside a phone number, which is the policy's first named example, "Lists of phone numbers without substantial added value".

### 7.4 Other observations

- **Zero structured data anywhere.** 0 `application/ld+json` blocks and 0 microdata attributes on the homepage, all geo hubs and all product×city pages examined. **[Observed]**
- **Self-referencing absolute canonicals** on every page examined, with `index, follow` throughout — so all 708 near-duplicates are actively put forward for indexing. **[Observed]**
- `/market-area.html`, the hub linking all 50 geo pages, has an **empty `<title>` and empty meta description**, and its anchor pointing to `australia/` carries the visible text "India". **[Observed]**
- **The homepage links only to `market-area.html`** — no geo page appears in the main navigation. **[Observed]**
- **To its credit, it does not fabricate addresses.** `/bengaluru/` displays the real Hyderabad head-office address and a real Vijayawada branch. **[Observed]** The problem is not an invented local presence; it is 50 near-identical pages competing for one intent.

### 7.5 Verdict against the policy wording

**[Inferred]** Measured against Google's four doorway tests (quoted in Section 08), this architecture fails at least three:

| Doorway test (verbatim) | Assessment |
|---|---|
| "multiple domain names or pages targeted at specific regions or cities that funnel users to one page" | **Fails.** 600 city pages share one contact block and carry no local information; the only available action is the central enquiry. |
| "Creating substantially similar pages" | **Fails, and it is measured.** 99.65% identical. |
| "They lead users to intermediate pages that aren't as useful as the final destination" | **Fails.** The geo page contains strictly less than the national product page, plus nothing local. |
| "closer to search results than a clearly defined, browseable hierarchy" | **Fails.** A flat 50-token namespace, no geographic hierarchy, and geo pages absent from navigation. |

Also engaged: **scaled content abuse** — "large amounts of unoriginal content that provides little to no value to users" — and **keyword stuffing**, per 7.3.

### 7.6 What NeoDent should take, and what it must not

**Take — three genuinely useful ideas:**

1. **A dedicated geographic namespace**, separate from service URLs. NeoDent's equivalent is `/areas/[slug]`, kept distinct from `/clinic/[slug]` and `/treatments/*`.
2. **A hub page that makes the geography browseable** — the honest version of `market-area.html`: linked from navigation rather than buried, and with a real title.
3. **One canonical template so every page is structurally complete.** The reuse instinct is correct; it is the content ratio that is wrong.

**Do not take — the central warning of this document:**

1. **Combinatorial generation.** NeoDent must not multiply 7 treatments × 11 localities = 77 URLs. That is the Tirumala pattern with a dental vocabulary.
2. **Place-name substitution as differentiation.** 0.35% unique is the failure mode to measure against.
3. **Bare city lists** in body copy, headers or footers.
4. **Indexing every generated page by default.** The publish-gate in Section 16 is the direct countermeasure.

**[Inferred]** This reference is most valuable in the client conversation as a *contrast* rather than a model: "here is the approach we are deliberately not taking, and here is the measurement — 0.35% of their page is actually about your city. Our four pages will be roughly 70% specific to the neighbourhood, which is precisely why there are four of them and not six hundred."

---

## 08. Google Policies and Healthcare Content Compliance

All quotations below were fetched on 23 November 2026 and are reproduced verbatim with their source URL. **[Verified]**

**One correction to the brief.** `https://support.google.com/business/answer/7091` is **not** the "Representing your business" guidelines. It is titled **"Tips to improve your local ranking on Google"** — ranking-factor guidance, not eligibility policy. The actual policy is at `https://support.google.com/business/answer/3038177`. Both were fetched and both are quoted. A deliverable citing 7091 as the eligibility policy would be citing the wrong document.

**Two documents that no longer exist as separate pages, despite being widely cited:** there is no standalone "doorway pages" document — the guidance exists only as the **"Doorway abuse"** section inside the spam policies page; and there is no standalone "duplicate content penalty" document — the subject is covered by the two canonicalisation pages. **[Verified]**

### 8.1 Doorway abuse — the complete section, verbatim

Source: https://developers.google.com/search/docs/essentials/spam-policies

> **Doorway abuse**
>
> Doorway abuse is when sites or pages are created to rank for specific, similar search queries. They lead users to intermediate pages that aren't as useful as the final destination. Examples of doorway abuse include:
>
> - Having multiple websites with slight variations to the URL and home page to maximize their reach for any specific query
> - Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page
> - Generating pages to funnel visitors into the actual usable or relevant portion of a site
> - Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy

**Reading this precisely.** **[Inferred]** Nothing in this policy prohibits publishing a page about an area where you have no premises. The policy defines **four behavioural tests**, none of which is geographic:

1. Is the page an **intermediate** step that is "not as useful as the final destination"?
2. Does it exist to **"funnel users to one page"**?
3. Is it **"substantially similar"** to its siblings?
4. Is it **"closer to search results than a clearly defined, browseable hierarchy"**?

Note the exact wording of the second bullet: "pages targeted at specific regions or cities **that funnel users to one page**." **The violation is in the funnelling, not in the targeting.**

A page that is itself the *destination* — answering the query on the page, with specific routing information, the named clinic, named clinicians, hours and booking — fails none of the four tests, even though its subject is a locality with no branch. A page whose only distinct content is a swapped place name, and whose purpose is to push the reader onward to the one real clinic page, meets tests 1, 2 and 3 directly.

### 8.2 Scaled content abuse — verbatim

> **Scaled content abuse**
>
> Scaled content abuse is when many pages are generated for the primary purpose of manipulating search rankings and not helping users. This abusive practice is typically focused on creating large amounts of unoriginal content that provides little to no value to users, no matter how it's created.
>
> Examples of scaled content abuse include, but aren't limited to:
>
> - Using generative AI tools or other similar tools to generate many pages without adding value for users
> - Scraping feeds, search results, or other content to generate many pages (including through automated transformations like synonymizing, translating, or other obfuscation techniques), where little value is provided to users
> - Stitching or combining content from different web pages without adding value
> - Creating multiple sites with the intent of hiding the scaled nature of the content
> - Creating many pages where the content makes little or no sense to a reader but contains search keywords

**How this differs from simply having many pages.** **[Inferred]** The definition contains **no page-count threshold**. Three conditions carry the violation: **intent** ("for the primary purpose of manipulating search rankings and not helping users"), **originality** ("large amounts of *unoriginal* content"), and **value** ("little to no value to users"). Production method is explicitly irrelevant: "no matter how it's created."

A 500-page site of genuinely distinct, useful pages is not scaled content abuse. Twelve pages differing only by a place name sit squarely inside bullet 2 ("automated transformations like synonymizing… where little value is provided") and bullet 5.

The companion signal, from the helpful-content guidance, is the **Effort** criterion, verbatim:

> **Effort:** The extent to which human work went into creating the content or the systems powering it. … Conversely, **automatically generating pages from feeds or using generative AI to produce large amounts of text without manual oversight or curation represents little to no effort.**

### 8.3 Duplicate content and canonicalisation — verbatim

Source: https://developers.google.com/search/docs/crawling-indexing/canonicalization

> Some duplicate content on a site is normal and it's not a violation of Google's spam policies. However, having the same content accessible through many different URLs can be a bad user experience … and it may make it harder for you to track how your *content* performs in search results.

**The mechanism that decides the fate of templated location pages, verbatim:**

> When Google indexes a page, it determines the primary content (or *centerpiece*) of each page. **If Google finds multiple pages that seem to be the same or the primary content very similar, it clusters them together.** Google then chooses the page that … is objectively the most complete and useful for search users, and marks it as the canonical.

> There are a handful of factors that play a role in canonicalization … You can indicate your preference to Google using these techniques, but **Google may choose a different page as canonical than you do** … That is, **indicating a canonical preference is a hint, not a rule.**

**This is the single most important technical fact in the entire policy set for this project.** **[Inferred]** If the primary content is "very similar" across area pages, Google may cluster them and index only one. **Self-referencing canonicals do not prevent clustering — they are a hint only.** The only defence is genuinely differentiated **primary content**, not markup. This is why Section 11 rejects the high-volume models and why Section 16 enforces a minimum unique-content ratio in code rather than in a style guide.

Canonicalisation best practice, verbatim, from https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls:

> - **Don't** use the robots.txt file for canonicalization purposes. Google may still index URLs that are disallowed in robots.txt without their content.
> - **Don't** specify different URLs as canonical for the same page using different canonicalization techniques…
> - **Do** include a `rel="canonical"` link on the canonical page itself (also known as a self-referential canonical).
> - **We don't recommend** using `noindex` to prevent selection of a canonical page within a single site, because it will completely block the page from Search.
> - When linking within your site, link to the canonical URL rather than a duplicate URL.

Relative signal strength, verbatim: redirects are "A strong signal"; `rel="canonical"` is "A strong signal"; sitemap inclusion is "**A weak signal** that helps the URLs that are included in a sitemap become canonical."

### 8.4 AI-assisted content — verbatim

Source: https://developers.google.com/search/blog/2023/02/google-search-and-ai-content

> **Is AI content against Google Search's guidelines?**
> Appropriate use of AI or automation is not against our guidelines. This means that it is not used to generate content primarily to manipulate search rankings, which is against our spam policies.

> **Should I use AI to generate content?**
> If you see AI as an essential way to help you produce content that is helpful and original, it might be useful to consider. **If you see AI as an inexpensive, easy way to game search engine rankings, then no.**

> **Can I list AI as the author of content?**
> Giving AI an author byline is probably not the best way to follow our recommendation to make clear to readers when AI is part of the content creation process.

And from the helpful-content page:

> If automation is used to substantially generate content, here are some questions to ask yourself:
> - Is the use of automation, including AI-generation, self-evident to visitors through disclosures or in other ways?
> - Are you providing background about how automation or AI-generation was used to create content?
> - Are you explaining why automation or AI was seen as useful to produce content?

**Answer: AI assistance is not prohibited. The prohibition attaches to purpose, not tooling.** **[Inferred]** For NeoDent this has a concrete consequence: AI may be used for drafting and structuring, but the byline must name a human, the clinical review must be performed by a named clinician, and the local facts must come from the clinic rather than from a model. That is also exactly what the E-E-A-T requirements below demand independently.

### 8.5 Healthcare content quality and E-E-A-T — verbatim

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

> …our systems give even more weight to content that aligns with strong E-E-A-T for topics that could significantly impact the health, financial stability, or safety of people, or the welfare or well-being of society. We call these "Your Money or Your Life" topics, or YMYL for short.

> Of these aspects, **trust is most important**. The others contribute to trust, but content doesn't necessarily have to demonstrate all of them.

> **Accuracy:** For informational pages, the content should be factually accurate. **For topics that could significantly impact people's lives or well-being (YMYL topics), the content must be highly accurate and consistent with established expert consensus.**

**The expertise self-assessment questions, verbatim — all four:**

> - Does the content present information in a way that makes you want to trust it, such as clear sourcing, evidence of the expertise involved, background about the author or the site that publishes it, such as through links to an author page or a site's About page?
> - If someone researched the site producing the content, would they come away with an impression that it is well-trusted or widely-recognized as an authority on its topic?
> - **Is this content written or reviewed by an expert or enthusiast who demonstrably knows the topic well?**
> - Does the content have any easily-verified factual errors?

**[Inferred]** The third question says "written **or reviewed** by". That is the documentary basis for a clinical-reviewer byline where the writer is not the clinician — and it is the mechanism that makes a sustainable publishing cadence possible without the doctor personally writing every article. Dental treatment content is unambiguously YMYL. NeoDent currently satisfies none of these four questions on any of its seven treatment pages. **[Observed]**

### 8.6 Structured data for multiple genuine locations — verbatim

Source: https://developers.google.com/search/docs/appearance/structured-data/local-business

> **Define each local business location as a `https://schema.org/LocalBusiness` type.** Use the most specific `LocalBusiness` sub-type possible…

`schema.org/Dentist` is a valid, more specific subtype and ships a dental-clinic JSON-LD example. **NeoDent's existing choice of `Dentist` per branch is correct.** **[Verified]**

**Required properties — exactly two:** `address` ("The physical location of the business. Include as many properties as possible.") and `name`.

**Critical constraints inside the recommended list, verbatim:**

> - `aggregateRating`: **This property is only recommended for sites that capture reviews about other local businesses**: The average rating of the local business based on multiple ratings or reviews.
> - `review`: **This property is only recommended for sites that capture reviews about other local businesses**…
> - `geo.latitude` / `geo.longitude`: The precision must be at least 5 decimal places.
> - `url`: The fully-qualified URL of **the specific business location**.

**This vindicates a decision already taken in the codebase.** **[Inferred]** `lib/structured-data.ts` deliberately emits no rating markup, documenting that the on-page figure "is a third-party figure, not first-party collected reviews". That is precisely the correct reading of the policy, and it should be protected against future pressure to "add star ratings like SSQUARE has".

**On placing a `LocalBusiness` entity on a non-location page**, the `LocalBusiness` page says:

> You can add `LocalBusiness` structured data to any page on your site, though it may make more sense to put it on a page that contains information about your business.

But the general structured-data guidelines bound this (https://developers.google.com/search/docs/appearance/structured-data/sd-policies):

> - **Don't** mark up content that is not visible to readers of the page.
> - **Don't** mark up irrelevant or misleading content…
> - **Don't** use structured data to deceive or mislead users. Don't impersonate any person or organization, or **misrepresent your ownership, affiliation, or primary purpose**.
> **Relevance:** Your structured data must be a true representation of the page content.
> **Location:** **Put the structured data on the page that it describes**, unless specified otherwise by the documentation.

> If your page contains a structured data issue, it can result in a manual action. A structured data manual action means that a page loses eligibility for appearance as a rich result; it doesn't affect how the page ranks in Google web search.

**Reconciled answer, and the rule for NeoDent's area pages.** **[Inferred]** Technically permitted, but bounded by three constraints: the entity must be a true representation of page content, it must be visible in the HTML body, and it must not misrepresent primary purpose. Therefore on an area page the compliant pattern is to reference **the real clinic's existing `Dentist` entity by its stable `@id`** — which already exists at `${SITE_URL}/clinic/<slug>#clinic` **[Verified]** — while displaying that same real address in the body. It is **not** permitted to mint a new `Dentist` entity whose `address.addressLocality` is the area with no premises. That would trip both "irrelevant or misleading content" and "misrepresent… primary purpose".

### 8.7 Google Business Profile — verbatim

**Ranking factors**, from answer/7091:

> Local results are mainly based on **relevance, distance, and popularity**…
> **Distance** refers to how far each business is from the customer who's searching.

> **Important:** There's no way to request or pay for a better local ranking on Google.

**[Inferred]** Google names **distance** as a primary local-pack factor. A website landing page cannot alter physical distance. Map-pack visibility in a locality with no premises is therefore constrained by Google's own stated model — which is why Section 18 separates organic objectives from map-pack objectives and why this document promises nothing about the local pack in the target areas.

**Eligibility and address rules**, from answer/3038177:

> If your business either has a physical location that customers can visit, or travels to customers where they are, you can create a Business Profile on Google.

> - Create your Business Profile for your actual, real-world location.
>   - **If your business rents a physical mailing address but doesn't operate out of that location, also known as a virtual office, that location isn't eligible for a Business Profile.**
>   - **Businesses can't list an office at a co-working space unless that office maintains clear signage, receives customers at the location during business hours, and is staffed during business hours by your business staff.**
> - **Do not create more than one page for each location of your business**, either in a single account or multiple accounts.
>   - Individual practitioners and departments within businesses, universities, hospitals, and government buildings may have separate pages.
> - **Businesses showing their address on Google should maintain permanent fixed signage of their business name at the address.**

**Service areas, verbatim — including the distance limit:**

> Service-area businesses … should have one profile for the central office or location with a designated service area. **Service-area businesses can't list a "virtual" office unless that office is staffed during business hours.**

> **If you have different locations for your service business, with separate service areas and separate staff at each location, you're allowed one profile for each location. The boundaries of your profile's overall service area shouldn't extend farther than about 2 hours of driving time from where your business is based.**

**Name field, verbatim:**

> Your name should reflect your business's real-world name, as used consistently on your storefront, website, stationery, and as known to customers.
> Including unnecessary information in your business name isn't permitted, and could result in the suspension of your Business Profile.

**[Inferred]** There is no route to a Business Profile for a locality with no staffed, signed, customer-receiving presence. The only sanctioned way to express reach into surrounding areas is the **service area** on an existing real profile. Note that NeoDent's entire candidate list sits far inside the "about 2 hours of driving time" bound, so service-area configuration is available and underused. **[Requires validation]** — current service-area settings on both profiles were not observable.

### 8.8 Keyword stuffing — verbatim

> **Keyword stuffing** refers to the practice of filling a web page with keywords or numbers in an attempt to manipulate rankings in Google Search results. Often these keywords appear in a list or group, unnaturally, or out of context. Examples of keyword stuffing include:
>
> - Lists of phone numbers without substantial added value
> - **Blocks of text that list cities and regions that a web page is trying to rank for**
> - Repeating the same words or phrases so often that it sounds unnatural.

**[Inferred]** The second bullet directly governs the "nearby areas we serve" block that almost every local SEO programme reaches for first — including the one sentence per clinic page that NeoDent has today (Section 4.6). A bare list of place names is the named example. The compliant alternative is a short set of links where each destination is a substantive page, plus `areaServed` in structured data.

### 8.9 Compliance verdict for the proposed strategy

| Proposed element | Policy risk | Verdict |
|---|---|---|
| 4 area pages, each ~70% locality-specific, each the destination | Doorway abuse | **Compliant** if the four behavioural tests are failed — i.e. the page answers on-page, is not a funnel, is not substantially similar, and sits in a browseable hierarchy. Enforced by the Section 16 content gate. |
| One reusable block template across the 4 pages | Scaled content abuse | **Compliant.** Templates are not the violation; unoriginal content at scale is. "No matter how it's created" cuts both ways. |
| No treatment×locality grid in this phase | Doorway + clustering | **Avoided by design.** See Q6. |
| Reference real clinic `Dentist` entity by `@id` on area pages | Misleading structured data | **Compliant.** Inventing an area-addressed entity would not be. |
| Continue emitting no `aggregateRating` | Structured-data manual action | **Compliant, and better than a competitor's current practice.** |
| AI-assisted drafting with named human author + named clinical reviewer | Scaled content / AI guidance | **Compliant**, provided review is genuine and local facts come from the clinic. |
| Replace place-name lists with linked substantive pages + `areaServed` | Keyword stuffing | **Compliant**, and fixes an existing low-grade exposure. |
| Service-area configuration on the two real profiles | GBP guidelines | **Compliant** — all candidates sit well inside the ~2-hour bound. |
| Creating any Business Profile for an area with no premises | GBP eligibility | **Prohibited. Not proposed. Must never be done.** |

---

## 09. Keyword Opportunity Research

### 9.1 Declared limitation — read this before the table

**No keyword volume, competition or difficulty data was obtainable during this research.** Google Keyword Planner, Ahrefs, Semrush, Moz and all rank trackers were unavailable, and no Search Console access was provided. **[Requires validation]**

Per the brief's instruction, this section is therefore a **qualitative assessment, explicitly marked as such.** Every "Opportunity" rating below is a judgement derived from three observable inputs — the search results actually returned on 23 November 2026, the measured absence of competitor URLs for these localities, and the existing page inventory — and from nothing else. **No number in this section is a search volume.** This is the one section of this report that does not meet a 9/10 standard, and Section 25.3 states exactly what would fix it.

### 9.2 Keyword classification

**A. General dental searches, locality-qualified**

| Keyword | Locality | Intent | Existing URL | Proposed URL | Competitor observed | Opportunity (qualitative) | Recommendation |
|---|---|---|---|---|---|---|---|
| dental hospital in Nampally | Nampally | Local | `/clinic/nampally` | — | Eledent, Park Dental (generic) | **Holding** — returned result 1 **[Observed]** | Strengthen existing page. No new URL. |
| dental clinic in Mehdipatnam | Mehdipatnam | Local | `/clinic/mehdipatnam` | — | SSQUARE, Revive (both resident) | **Holding, contested** — returned result 1 **[Observed]** | Strengthen; differentiate from the other branch page. |
| dental clinic near Abids | Abids | Local | **none** | `/areas/abids` | **Zero Abids-specific pages** **[Observed]** | **High** | New area page. |
| dentist near Begum Bazaar | Begum Bazaar | Local | **none** | `/areas/begum-bazaar` | **Zero; engine fell back to token matching** **[Observed]** | **High** | New area page. |
| dental clinic in Masab Tank | Masab Tank | Local | **none** | `/areas/masab-tank` | **Zero Masab Tank pages** **[Observed]** | **High** | New area page. |
| dental hospital near Asif Nagar | Asif Nagar | Local | **none** | `/areas/asif-nagar` | Zero **[Observed]** | **Medium-High** | New area page. |
| dentist near Gudimalkapur | Gudimalkapur | Local | **none** | — (Phase 2) | Zero **[Observed]** | Medium | Mention on Mehdipatnam + area hub; promote on evidence. |
| dental clinic near Basheer Bagh | Basheer Bagh | Local | **none** | — (Phase 2) | Zero **[Observed]** | Medium | Phase 2 candidate. |
| dental clinic Afzalgunj / Malakpet / Santosh Nagar | various | Local | **none** | — (Phase 2/3) | Malakpet dominated by a hospital group's per-doctor pages **[Observed]** | Medium / Low | Phase 2–3; Malakpet needs a doctor-led angle, not an area page. |
| dentist in Tolichowki | Tolichowki | Local | **none** | **not recommended** | **Three resident clinics took positions 1–3** **[Observed]** | **Low** | Do not build. Reasoning in Section 12. |
| dental clinic near me | — | Local | `/clinic` | — | Eledent has a dedicated URL | Medium | Improve `/clinic` hub; do not create a "near me" URL. |

**B. Treatment searches, locality-qualified**

| Keyword | Intent | Existing URL | Proposed | Opportunity | Recommendation |
|---|---|---|---|---|---|
| root canal treatment in Nampally / Mehdipatnam | Local + commercial | `/treatments/root-canal-treatment` + clinic pages | — | **Holding** **[User-reported]** | No new URL. Strengthen branch linkage. |
| root canal treatment near Abids / Masab Tank | Local + commercial | none | **Section on `/areas/<slug>`, not a URL** | **High** — zero locality pages returned **[Observed]** | Treatment section within the area page, linking to the treatment page. |
| dental implants near <locality> | Local + commercial | `/treatments/dental-implants` | Section on area page | Medium-High | Same. No `/treatments/dental-implants/abids`. |
| braces / aligners near <locality> | Local + commercial | `/treatments/braces-and-orthodontics` | Section on area page | Medium | Same. |
| teeth whitening near <locality> | Local + commercial | **no page exists** | — | **Unknown** | **Verify the service is offered before any content.** Named in the brief as an example only; not among the 7 treatment pages. **[Requires validation]** |
| tooth extraction / gum treatment / crowns near <locality> | Local + commercial | **no pages exist** | — | Unknown | Same caution. Not currently offered as dedicated pages; confirm scope with the clinic. |

**C. Commercial / cost searches — a demonstrated and unserved gap**

| Keyword | Intent | Existing URL | Proposed | Opportunity | Evidence |
|---|---|---|---|---|---|
| root canal treatment cost in Hyderabad | Commercial | **none** | Section on the RCT page + a cost article | **High** | **Two of the top seven results for the Masab Tank RCT query were cost pages** (fmsdental, drwhitedentalcare) **[Observed]** |
| dental implant cost in Hyderabad | Commercial | **none** | Section on implants page + article | **High** | Same pattern; FMS runs `/root-canal-treatment-cost-price/` **[Observed]** |
| what affects root canal cost | Informational-commercial | none | Blog article | Medium-High | Named in the brief; no NeoDent coverage **[Verified]** |
| affordable dental treatment near <locality> | Commercial | none | Area page section | Medium | — |

**[Inferred]** Cost intent is the clearest content gap the research surfaced, after the absence of a blog. It is also the most commercially sensitive, and the one place where this document recommends caution rather than speed: publish *what influences cost* and *what is included*, with ranges only if the clinic will commit to maintaining them. A stale price is worse than no price.

**D. Brand and navigational searches**

| Keyword | Intent | Existing URL | Opportunity | Recommendation |
|---|---|---|---|---|
| NeoDent Dental Hospital | Navigational | `/` | Holding | Resolve the singular/plural brand inconsistency (Section 4.4). |
| NeoDent Nampally / Mehdipatnam | Navigational | `/clinic/<slug>` | Holding | No action beyond NAP consistency. |
| NeoDent near <locality> | Navigational + local | none | Low-Medium | Area pages will absorb this naturally; no dedicated URLs. |
| Dr Miftah Ur Rahman | Navigational, person | `/doctors/dr-miftah-ur-rahman` | Holding | — |
| Dr Mohd Siraj Ur Rahman | Navigational, person | **none — anchor only** | **High for an easy win** | **Create a founder page.** He is the most credentialed individual named on the site and has no destination URL. **[Observed]** |

### 9.3 Cannibalisation analysis

Checked across homepage, clinic pages, treatment pages, the proposed area pages and the proposed articles.

| Intent cluster | Competing URLs | Risk | Primary URL (recommended) | Action |
|---|---|---|---|---|
| "dental hospital in Mehdipatnam" | `/clinic/mehdipatnam`, `/clinic`, `/` | **Live, low-moderate.** All three mention Mehdipatnam; both branch pages carry an H2 naming the other branch and duplicate the full seven-person roster **[Observed]** | `/clinic/mehdipatnam` | Remove the cross-branch H2; differentiate rosters; make `/clinic` a chooser that ranks for neither branch name. |
| "what is root canal treatment" | `/treatments/root-canal-treatment`, `/treatments` | **Live.** The identical FAQ question is marked up on both **[Observed]** | `/treatments/root-canal-treatment` | Remove the duplicated Q from the hub's `FAQPage`; keep the hub's FAQs navigational. Same for implants, full-mouth rehab, smile design. |
| "root canal treatment in <locality>" | `/areas/<slug>`, `/treatments/root-canal-treatment` | **Would be created** by Model C | `/treatments/root-canal-treatment` for the procedure; `/areas/<slug>` for "where do I go" | **Do not create treatment×locality URLs.** Area pages carry a routing section that links to the treatment page; they must not re-explain the procedure. |
| "dental clinic near Abids" vs "dentist in Abids" | Would be 2–3 URLs under the Eledent pattern | **Would be created** | **One** `/areas/abids` | One URL per locality. Never stack intent variants — this is the specific Eledent error identified in 6.7. |
| "root canal cost" | Proposed article + treatment page section | Possible | `/treatments/root-canal-treatment` (section) | If an article is published, scope it to *factors* and link up to the treatment page; do not duplicate the procedure explanation. |

**Rule adopted for this programme:** **one URL per search intent, and no intent-variant stacking.** **[Recommended — High confidence]** Justification: Google clusters pages whose "primary content" is "very similar" and picks its own canonical regardless of hints (Section 8.3). Stacking variants invites exactly that clustering while splitting internal link equity.

---

## 10. Hyderabad Geographical Catchment Analysis

### 10.1 Declared limitation on distances

**No routing or mapping API was available.** **[Requires validation]** Therefore **no distance in kilometres and no travel time appears anywhere in this document**, and none may be written onto a published page until measured. The brief was explicit — "Never invent travel distances" — and the blueprints in Section 19 mark every distance and route as a field the clinic must supply and verify.

**The verification method, to be completed in Phase 1:** for each candidate locality, record driving distance and typical travel time to the relevant branch at two times of day (mid-morning and early evening, because the branches' hours barely overlap), the main road corridor, the nearest Metro station or major bus stop, and two or three landmarks a local resident would actually use. Source: Google Maps plus the clinic's own knowledge, signed off by the clinic owner. Every published figure must carry the date it was measured.

### 10.2 Anchor facts

| Branch | Verified address | Hours | Label |
|---|---|---|---|
| **Nampally** | Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad 500001 | **Mon–Sat 10:30–17:00** | [Verified] `lib/site-data.ts` |
| **Mehdipatnam** | 10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad 500006 | **Mon–Sat 16:00–20:00** | [Verified] `lib/site-data.ts` |

**The hours asymmetry is the central planning fact of this section.** **[Inferred]** The two branches are effectively a daytime clinic and an evening clinic. Any routing recommendation based only on proximity would be wrong for half the day. Every area page must therefore route on **proximity *and* time of day**, which is both genuinely useful to a patient and impossible for a competitor to copy from a template.

### 10.3 Critical evaluation of the proposed 20–30 km catchment

**The 20–30 km figure should not be used as an SEO targeting rule.** **[Recommended — High confidence]**

Reasoning. **[Inferred]**

1. **It is far too large for central Hyderabad.** A 20–30 km radius from Nampally spans most of the metropolitan area, including Secunderabad, Gachibowli, Kukatpally and Uppal — territory held by chains with physical branches there. Competing for those localities from a Nampally address contradicts Google's own stated "distance" factor and would produce pages that cannot honestly claim to be a convenient choice.
2. **The relevant unit in the old city is not distance but corridor and crossing time.** Abids and Masab Tank are short hops; a locality a similar distance away across the river with no direct corridor is a different proposition entirely. Distance alone does not capture this; the measured travel time in 10.1 does.
3. **The business has already implied a tighter, better catchment** — the ten localities named in the existing clinic-page sentences **[Observed]**. That self-selected list is a better starting point than any radius.
4. **The GBP service-area bound is "about 2 hours of driving time"** **[Verified]**, which all candidates sit far inside. So the constraint on where NeoDent may *claim to serve* is not the binding constraint; the binding constraint is where it can write something genuinely useful.

**Replacement test for page eligibility.** **[Recommended]** A locality earns a page only if all five hold:

1. A patient there would find one named branch genuinely convenient, with a measured route. **[Requires validation per locality]**
2. At least 150 words of true, locality-specific content exist that are not reusable on any other area page.
3. The locality is not where a branch physically sits (that is the clinic page's job).
4. The locality is not already saturated by resident clinics with stronger proximity.
5. The clinic owner confirms it as a real catchment they want patients from.

### 10.4 Catchment mapping

Branch association is **[Inferred]** from the verified addresses and the localities the clinic itself already names. All adjacency statements are qualitative; no distance is asserted. **[Requires validation]** marks every row's routing detail.

| Locality | Relevant branch | Geographic evidence | Search opportunity | Priority | Recommended page type |
|---|---|---|---|---|---|
| **Abids** | **Nampally** | Immediately adjacent commercial district; already named on `/clinic/nampally` **[Observed]** | **High** — Abids query returned 10 results, **none about Abids**, NeoDent absent **[Observed]** | **1** | **Dedicated area page** `/areas/abids` |
| **Begum Bazaar** | **Nampally** | Dense market district near Nampally/Afzalgunj; already named on `/clinic/nampally` **[Observed]** | **High** — query fell back to token matching; zero real coverage **[Observed]** | **1** | **Dedicated area page** `/areas/begum-bazaar` |
| **Masab Tank** | **Mehdipatnam** | Adjacent to Humayun Nagar where the branch sits; already named on `/clinic/mehdipatnam` **[Observed]** | **High** — RCT query returned **zero** Masab Tank pages **[Observed]** | **1** | **Dedicated area page** `/areas/masab-tank` |
| **Asif Nagar** | **Mehdipatnam** | Adjacent; already named on `/clinic/mehdipatnam` **[Observed]** | **Medium-High** — no competitor URLs **[Observed]** | **1** | **Dedicated area page** `/areas/asif-nagar` |
| **Basheer Bagh** | Nampally | Near Abids/Nampally; already named **[Observed]** | Medium — no competitor URLs | **2** | Area page after Phase 1 evidence |
| **Afzalgunj** | Nampally | Near Begum Bazaar; already named **[Observed]** | Medium | **2** | Area page, or fold into Begum Bazaar if content overlaps |
| **Gudimalkapur** | Mehdipatnam | Already named **[Observed]** | Medium | **2** | Area page after Phase 1 evidence |
| **Humayun Nagar** | **Mehdipatnam — it *is* the branch** | **The branch's own postal locality** **[Verified]** | Medium | **Not an area page** | **Fix on `/clinic/mehdipatnam`** — state both names. An `/areas/` page here would cannibalise the branch page. |
| **Malakpet** | Nampally | Further east; already named **[Observed]** | Medium-Low — top results are a hospital group's **per-practitioner** locality pages **[Observed]** | **3** | Better served by **doctor pages**, not an area page. See 10.5. |
| **Santosh Nagar** | Nampally | Already named **[Observed]**; only locality with any competitor coverage (2 Partha URLs) | Low-Medium | **3** | Mention + hub link; revisit on evidence |
| **Tolichowki** | Mehdipatnam | Further west | **Low** — **three resident clinics took positions 1–3**, two with 9- and 19-URL sites **[Observed]** | **Not recommended** | None. Proximity-disadvantaged against embedded incumbents. |
| Secunderabad, Gachibowli, Kukatpally, Uppal, etc. | — | Within a 20–30 km radius but not a real catchment | — | **Not recommended** | None. Illustrates why the radius rule fails. |

### 10.5 The Malakpet finding, which deserves its own note

**[Observed]** The Malakpet query was topped by `carehospitals.com/doctor/hyderabad/malakpet/<name>` pages. **[Inferred]** Those pages are defensible precisely because each is about a **real named practitioner at a real location** — the "individual practitioners… may have separate pages" carve-out in GBP policy has an organic analogue here. The lesson is that in localities where NeoDent lacks proximity, **a named-clinician page is a stronger and more honest asset than an area page**. This converts the Section 04 finding that six of seven clinicians have no page from a hygiene issue into a competitive opportunity.

### 10.6 Handling localities both branches could serve

**[Recommended]** Several central localities sit between the two branches. The resolution is explicit and patient-first:

1. **Each area page names one primary branch** — chosen on measured travel time — to avoid a confusing page and to keep a single conversion path.
2. **The secondary branch is named once, with the reason**, and the reason is the hours: "Nampally is open mornings and afternoons (10:30–17:00); if you need an evening appointment, Mehdipatnam is open 16:00–20:00." This is accurate, useful, and differentiating.
3. **Directions are given for the primary branch only.** Two sets of directions on one page is the "conflicting information" failure the brief warned against.
4. **Both branch phone numbers are shown, each labelled with its branch and hours** — which also forces the Section 3.7 NAP fix.

---

## 11. Location Landing Page Strategy — Comparison of Five Models

### 11.1 Comparison

Scored on the brief's own criteria. "Policy risk" is assessed against the verbatim wording in Section 08.

| Criterion | **A** — Improve existing pages only | **B** — Dedicated neighbourhood pages | **C** — Treatment × locality URLs | **D** — One comprehensive area page with treatment sections | **E** — CMS-driven programmatic |
|---|---|---|---|---|---|
| New URLs | 0 | ~4–11 | **28–77** (7 treatments × 4–11 areas) | ~4–11 | Unbounded by design |
| Organic opportunity | **Low.** Caps reach at two locality names | Medium-High | High *in theory* | **High** | High *in theory* |
| Patient usefulness | Medium — nothing addresses "which branch, from where" | Medium-High | **Low** — re-explains a procedure the treatment page already covers | **High** — answers routing, hours, branch and treatment in one place | Depends entirely on editorial gate |
| Doorway risk | **None** | Low if each page is the destination | **High** — "substantially similar pages"; "funnel users to one page" | **Low** | **High** without a gate |
| Duplicate / clustering risk | None | Low-Medium | **High** — 7 pages per locality differing mainly by treatment name | **Low-Medium** | **High** |
| Cannibalisation risk | None | Low — one URL per locality | **High** — competes with the 7 existing treatment pages, which are the site's strongest asset | Low | High |
| Development effort | **Low** | Medium — one dynamic route | Medium | **Medium** — same route as B | **High** — CMS + schema + preview + revalidation |
| CMS effort | None | None | None | **None** | **High** |
| Editorial effort | Low | Medium | **Very high** — 28–77 pages needing genuine differentiation | **Medium** — 4 pages at depth | Very high, ongoing |
| Scalability | **Poor** | Good | Good | **Good** | Excellent |
| Maintenance | Low | Low — 4 pages | **Poor** — every hours/phone change touches dozens of pages | Low | Medium |
| Conversion potential | Low-Medium | Medium | Medium | **High** — routing plus hours plus branch CTA | Medium |
| Fit for a **two-branch** clinic | Partial | Good | **Poor** — the grid implies a presence the business does not have | **Strong** | Over-engineered at this scale |
| Feasible in 60 days | Yes | Yes | **No** | **Yes** | **No** |

### 11.2 Recommendation: a hybrid of A and D

**Adopt Model A + Model D.** **[Recommended — High confidence]**

- **Model A** continues on the two clinic pages and seven treatment pages, which are the existing, reportedly performing assets. **Nothing in this strategy risks them.**
- **Model D** adds four comprehensive area pages under `/areas/[slug]`, each routing one locality to one named branch and linking out to existing treatment pages instead of duplicating them.

**Why D rather than B.** The difference is thin but decisive. A bare "neighbourhood page" (B) tends toward a landing page whose job is to hand the reader onward — which is the second doorway test, "funnel users to one page". A comprehensive area page (D) answers the question on the page: which branch, how to get there from here, when it is open, which treatments are available there, which clinician, and how to book. It is the destination, not the corridor. That distinction is the difference between compliant and non-compliant under the wording in Section 8.1, and it is also simply more useful.

**Why not C, stated plainly for the client.** Model C is the intuitive choice — "we rank for root canal in Nampally, so let us build root canal in Abids, Masab Tank and nine more." It is the one option this document actively recommends against. Seven treatment pages × eleven localities is 77 URLs whose primary content would necessarily be the same procedure explanation with a different place name. That is the measured Tirumala failure mode (99.65% identical, Section 7.2), it is the named doorway example, and under the clustering mechanism in Section 8.3 Google would likely index one of each set and choose which one. The cost is not only risk: 77 thin pages would compete with the seven strong treatment pages that are currently working.

**Why not E now.** Model E is the right destination and the wrong next step. Section 15 sets it out: the gating constraint in the next 60 days is clinical review and verified local facts, not developer throughput. Build the block architecture now in TypeScript so that a later move to a CMS is a data-source swap rather than a rewrite.

### 11.3 URL architecture decision

**Recommended: `/areas/[slug]`.** **[Recommended — High confidence]**

| Option | Assessment |
|---|---|
| **`/areas/[slug]`** | **Recommended.** `/areas` currently returns 404 **[Observed]**, so there is no migration cost. Semantically honest — an "area" is not a clinic. Keeps a clean boundary against `/clinic/[slug]`, which must remain reserved for the two real branches. Matches the brief's own suggestion. |
| `/locations/[slug]` | Rejected. "Location" implies a place of business. Mixing real branches and non-branch areas in one namespace is precisely the ownership confusion the structured-data policy warns against. Also 404 today **[Observed]**. |
| `/dental-clinic-near/[slug]` | Rejected. Keyword-first URL; reads as built-for-search, and the Eledent pattern it imitates produces stacked variants. |
| `/clinic/[slug]` extension | **Rejected firmly.** Would place non-branch areas in the namespace that currently holds the two genuine `Dentist` entities, and risks implying branches that do not exist. |

**No existing URL changes. No redirects. No migrations.** **[Recommended — High confidence]** The 17 live URLs all have correct self-referential canonicals matching the sitemap **[Observed]**; there is no justification for touching any of them, and the brief's Rule 7 is correct that doing so would risk existing equity for no gain.

---

## 12. Priority Locality Recommendations

### 12.1 Candidate set and verdicts

Twelve candidates evaluated against the five-part eligibility test in Section 10.3.

| Locality | Branch | Verdict | Reasoning |
|---|---|---|---|
| **Abids** | Nampally | **Phase 1 — build** | Adjacent; already named on the clinic page; the Abids query returned ten results with **none about Abids** and NeoDent absent **[Observed]**. The clearest gap in the dataset. |
| **Begum Bazaar** | Nampally | **Phase 1 — build** | Dense market district with a distinct daytime working population; already named; the query **fell back to partial token matching** for want of any real content **[Observed]**. Nampally's 10:30–17:00 hours align with a market catchment. |
| **Masab Tank** | Mehdipatnam | **Phase 1 — build** | Adjacent to the branch's own locality; already named; the RCT query returned **zero** Masab Tank pages **[Observed]**. |
| **Asif Nagar** | Mehdipatnam | **Phase 1 — build** | Adjacent; already named; no competitor URLs **[Observed]**. |
| Basheer Bagh | Nampally | Phase 2 | Genuine catchment, already named, no competitor coverage. Held back only to keep Phase 1 at four pages. |
| Afzalgunj | Nampally | Phase 2 | Genuine, but content may overlap heavily with Begum Bazaar. Decide after writing Begum Bazaar — if the honest local content is largely the same, these should be one page, not two. |
| Gudimalkapur | Mehdipatnam | Phase 2 | Genuine, already named. Promote on Phase 1 evidence. |
| **Humayun Nagar** | Mehdipatnam | **Never an area page** | **It is the branch's own postal locality** **[Verified]**. Fix the naming ambiguity on `/clinic/mehdipatnam` instead (Section 4.4 #4). |
| Malakpet | Nampally | Phase 3, and differently | Top results are a hospital group's **per-practitioner** pages **[Observed]**. Serve this with **doctor pages**, not an area page. |
| Santosh Nagar | Nampally | Phase 3 | The only locality with any competitor presence (2 Partha URLs) **[Observed]**. Lower priority, not excluded. |
| **Tolichowki** | Mehdipatnam | **Do not build** | **Three resident clinics took positions 1–3**, including one with a **9-URL site** **[Observed]**. NeoDent is proximity-disadvantaged against embedded incumbents, and Google names distance as a primary local factor **[Verified]**. Spending Phase 1 capacity here would be the worst available trade. |
| Secunderabad / Gachibowli / Kukatpally / Uppal | — | **Do not build** | Inside a 20–30 km radius but not a real catchment; held by chains with physical branches. Demonstrates why the radius rule was rejected. |

### 12.2 Why four, and not ten to fifteen

**[Recommended — High confidence]** Four is a reasoned number, not a hedge.

1. **The content gate is the binding constraint.** Each page needs ≥150 words of genuinely locality-specific content that cannot be reused elsewhere (Section 16), plus verified routes, landmarks and local photography. Four × that standard is achievable in the window with clinical sign-off. Eleven is not, and the failure mode of trying is the 0.35%-unique Tirumala page.
2. **Clustering risk scales with volume and thinness.** Google clusters pages with "very similar" primary content and selects its own canonical regardless of hints (Section 8.3). Four differentiated pages are unlikely to cluster. Eleven rushed ones are.
3. **Four gives a clean read in Search Console.** Two Nampally-routed and two Mehdipatnam-routed pages isolate both the branch variable and the locality variable. Eleven simultaneous pages produce a result that cannot be attributed.
4. **The evidence that would justify expansion is obtainable within the window** — see 12.3.
5. **Precedent from the market.** The three clinics that took positions 1–3 for the most contested locality query run sites of 9, 19 and unknown-but-small size **[Observed]**. Volume is not what wins locality queries in this market.

### 12.3 Evidence that would justify Phase 2 expansion

**[Recommended]** Expand only when, for the Phase 1 pages:

| Signal | Threshold | Source |
|---|---|---|
| Indexation | All 4 pages indexed and not "Duplicate, Google chose a different canonical" | Search Console → Page indexing |
| Impressions | Each page accumulating impressions against **locality-qualified** queries it was built for | Search Console → Performance, page-filtered |
| No clustering | No Phase 1 page canonicalised away in favour of a sibling or a clinic page | Search Console → URL Inspection |
| Engagement | Area pages not materially worse than clinic pages on engagement and CTA interaction | Analytics **[Requires validation — no access]** |
| Enquiries | At least some attributable enquiry or call activity from area-page sessions | Analytics event + clinic call log |
| Content capacity | The clinic can still supply verified local facts and clinical review at the required standard | Editorial process |

**If instead the Phase 1 pages are indexed but flat on impressions after 60 days:** the correct response is **not** to add more area pages. It is to deepen the four and reassess whether locality-qualified organic demand in the old city is thinner than the competitive vacuum suggests — a real possibility that this research cannot exclude, because no volume data was available. **[Requires validation]** Stating this now is what makes the 60-day review honest rather than self-confirming.

---

## 13. Treatment Content Strategy

### 13.1 Verified treatment scope — check before writing anything

**[Verified]** Seven treatments have dedicated pages:

| Treatment | URL | Content module |
|---|---|---|
| Root Canal Treatment | `/treatments/root-canal-treatment` | `lib/root-canal-treatment-page.ts` (551 lines) |
| Dental Implants | `/treatments/dental-implants` | `lib/dental-implants-page.ts` |
| Braces & Orthodontics | `/treatments/braces-and-orthodontics` | `lib/braces-orthodontics-page.ts` (631 lines) |
| Smile Design | `/treatments/smile-design` | `lib/smile-design-page.ts` (510 lines) |
| Full Mouth Rehabilitation | `/treatments/full-mouth-rehabilitation` | `lib/full-mouth-rehabilitation-page.ts` (515 lines) |
| Composite Build-Up | `/treatments/composite-build-up` | `lib/composite-build-up-page.ts` (406 lines) |
| Scaling & Polishing | `/treatments/scaling-and-polishing` | `lib/scaling-and-polishing-page.ts` (517 lines) |

**Treatments named in the brief that have no page and must not be assumed to be offered:** Teeth Whitening, Tooth Extraction, Gum Treatment, Crowns & Bridges, Cosmetic Dentistry (as a category). **[Verified absent]** The brief itself cautioned against assuming every example is a current service. **[Requires validation]** — confirm the actual service list with the clinic before any content references these. Note that crowns *are* discussed within existing pages (the hub's DMLS crown section, and "The crown is placed" on the RCT page) **[Observed]**, so crown content may be better placed as a section than a new page.

### 13.2 Assessment of the existing treatment pages

| Dimension | Assessment |
|---|---|
| Depth | **Strong.** 2,698–3,601 whole-DOM words **[Observed]** — deeper than most competitor treatment pages examined. |
| Search intent | **Well matched** for informational and procedural intent. |
| Structured data | **Strong.** `MedicalWebPage` + `MedicalProcedure` + 10-question `FAQPage` + `BreadcrumbList` on each **[Observed]**. |
| **E-E-A-T** | **Critically weak. No author, no medical reviewer, no publish or review date on any of the seven** **[Observed]**. |
| Location relevance | **Weak.** Little connection to either branch; no "available at which branch" statement. |
| Cost / commercial intent | **Absent**, while two of the top seven results for an observed treatment query were cost pages **[Observed]**. |
| Internal linking | Partial. `RelatedTreatments` exists as a component **[Verified]**; linkage to clinic pages and to the clinicians who perform the procedure is thin. |
| Images | Good pipeline, but four braces-type illustrations carry empty `alt` **[Observed]**. |
| Heading hygiene | Minor defects — "The crown is placed" duplicated as an H3 under two H2s on the RCT page **[Observed]**. |

### 13.3 Recommendations, in priority order

**1. Add author and medical-reviewer attribution to all seven pages. [Recommended — High confidence. Priority: Critical]**

Visible on-page: "Written by <name>" and "Medically reviewed by Dr. <name>, <qualification>, on <date>", with the reviewer's name linking to their profile page. In schema, add `author`, `reviewedBy`, `datePublished` and `lastReviewed` to the existing `MedicalWebPage` blocks.

*Justification:* Google's expertise self-assessment asks verbatim, "Is this content **written or reviewed by** an expert or enthusiast who demonstrably knows the topic well?", and states that for YMYL topics "the content must be highly accurate and consistent with established expert consensus", with trust "most important" (Section 8.5). NeoDent employs a Prosthodontist and Implantologist and a founder with three decades of practice, and currently tells neither Google nor the patient that they stand behind this content. This is the largest gap between what the business actually is and what the website demonstrates. It requires no new page and no new design.

*Dependency:* which clinician reviews which treatment, and their exact qualifications as they wish them published. **[Requires validation]**

**2. Add a branch-availability statement to each treatment page. [Recommended — High confidence. Priority: High]**

One short, factual block: which branch or branches provide this treatment, with that branch's hours and phone. *Justification:* it connects the strongest pages on the site to the local intent the business is trying to win, gives the area pages a legitimate internal-link target, and is true information a patient needs before travelling. **[Requires validation]** — per-treatment branch availability, especially for implants and full-mouth rehabilitation, which may be concentrated at one branch.

**3. Add a "what affects the cost" section to Root Canal Treatment and Dental Implants. [Recommended — Medium confidence. Priority: High]**

*Justification:* demonstrated demand — two of the top seven results observed for the Masab Tank RCT query were cost pages, and FMS maintains `/root-canal-treatment-cost-price/` **[Observed]**. *Medium* rather than high confidence because it is a commercial-policy decision, not a technical one: publish the factors and what is included, and publish ranges only if the clinic will keep them current. **[Requires validation]** — clinic's pricing-disclosure policy.

**4. Resolve the FAQ overlap between the hub and the treatment pages. [Recommended — High confidence. Priority: Medium]**

Remove the duplicated questions from the `/treatments` hub `FAQPage` and keep the hub's FAQs navigational ("which treatment do I need?"). *Justification:* the identical question is currently marked up as an answer on two URLs **[Observed]**, which is self-competition on the site's most valuable intent.

**5. Fix the empty `alt` attributes and the duplicated headings. [Recommended — High confidence. Priority: Medium]**

**6. Do not create new treatment pages in this window. [Recommended — High confidence]**

*Justification:* the seven existing pages are the site's strongest asset and are under-exploited on exactly three dimensions — attribution, branch linkage and cost. Improving those is higher-expected-value than adding an eighth page, and the brief asked specifically which pages need improvement versus which genuinely require creation. The honest answer is that none of the named gaps requires a new treatment page; crowns and whitening, if offered, should first be tested as sections and articles.

### 13.4 Treatment page priority ranking

| Rank | Page | Why | Action |
|---|---|---|---|
| 1 | Root Canal Treatment | Client's stated flagship **[User-reported]**; cost intent demonstrated; the anchor for the first content cluster | Attribution + cost section + branch availability + FAQ de-duplication |
| 2 | Dental Implants | High-value; cost intent; Dr. Miftah is an Implantologist, giving a strong genuine reviewer **[Verified]** | Attribution + cost section + branch availability |
| 3 | Braces & Orthodontics | Long consideration cycle; existing content is substantial (631-line module) | Attribution + `alt` fixes + branch availability |
| 4–7 | Full Mouth Rehabilitation, Smile Design, Composite Build-Up, Scaling & Polishing | Already substantial; lower observed locality demand | Attribution + branch availability |

---

## 14. Blog and Topical Authority Strategy

### 14.1 Why a blog, stated precisely

**[Observed]** The site has no editorial surface of any kind. The three competitors with the deepest content run 576 (Clove), 257 (Smiline) and 89 (Eledent) article URLs. This is the widest measurable gap in the entire competitive dataset — wider than the location-page gap.

**[Inferred]** But the justification is not "competitors have blogs." It is that the informational queries a patient asks *before* they are ready to book currently have no NeoDent destination, and that article content is the natural carrier for the author/reviewer attribution that the treatment pages also need. The blog and the E-E-A-T fix are the same project.

**What this is not.** Not a volume programme. The brief was explicit, and Google's scaled-content policy is explicit: many pages of unoriginal content is the violation, "no matter how it's created" (Section 8.2). **Six articles in 60 days, each clinically reviewed, is the recommendation.** **[Recommended — Medium confidence]**

### 14.2 Recommended cluster architecture

Two clusters only, anchored to the two highest-value treatment pages. Every article links up to its treatment page; the treatment page links down to two or three articles.

```
/treatments/root-canal-treatment          (pillar, exists)
├── What are the signs you may need a root canal?
├── Does a root canal hurt? What to expect during treatment
├── What affects the cost of root canal treatment in Hyderabad?
└── Caring for a tooth after root canal treatment

/treatments/dental-implants               (pillar, exists)
├── Who is a suitable candidate for dental implants?
└── Dental implants: recovery and aftercare, week by week
```

### 14.3 Blog topic matrix

| # | Topic | Primary keyword (qualitative) | Intent | Links up to | Links to clinic page? | Clinical review | Priority |
|---|---|---|---|---|---|---|---|
| 1 | Signs you may need a root canal | signs you need a root canal | Informational | `/treatments/root-canal-treatment` | Yes — "book an assessment", branch by hours | **Required** | **1** |
| 2 | Does a root canal hurt? What to expect | is root canal painful | Informational, high anxiety | `/treatments/root-canal-treatment` | Yes | **Required** | **1** |
| 3 | What affects the cost of root canal treatment in Hyderabad | root canal treatment cost Hyderabad | Commercial | `/treatments/root-canal-treatment` | Yes | **Required** (clinical) + owner (pricing) | **1** |
| 4 | Who is a suitable candidate for dental implants? | am I suitable for dental implants | Informational-commercial | `/treatments/dental-implants` | Yes | **Required** | **2** |
| 5 | Caring for a tooth after root canal treatment | root canal aftercare | Informational, post-treatment | `/treatments/root-canal-treatment` | No — not a conversion moment | **Required** | **2** |
| 6 | Dental implants: recovery and aftercare | dental implant recovery | Informational | `/treatments/dental-implants` | No | **Required** | **3** |

**Deferred deliberately:** braces vs aligners, oral hygiene during orthodontic treatment, "choosing a dental hospital in Hyderabad", "what to consider when choosing a dentist", and all remaining brief suggestions. **[Inferred]** The last two are the weakest ideas in the brief's list: a clinic writing "how to choose a clinic" is self-serving, hard to make genuinely useful, and competes with no commercial intent. They are not recommended at all.

### 14.4 Per-article justification — the brief's nine questions

Answered for article 1; the same nine are to be completed for every article before writing, as a gate.

| Question | Article 1 — "Signs you may need a root canal" |
|---|---|
| Why should it exist? | The pillar page explains the procedure to someone who already knows they need it. Nothing on the site serves the patient with toothache who does not yet know what is wrong. **[Verified gap]** |
| What patient problem does it solve? | Converts an uncertain symptom into an informed decision about whether to seek care. |
| What search intent? | Informational, pre-diagnosis, high urgency, strong progression to local commercial intent. |
| Which competitors answer it? | Clove (576 articles) and Eledent (89) cover symptom topics; FMS ranked first for a treatment query with a cost page **[Observed]**. No locality-specific competitor answers it. |
| What can NeoDent add? | A named endodontically-experienced clinician's account of what is actually seen in the chair, what is urgent versus what can wait until the next working day, and — uniquely — **which branch to attend given the time of day**, because the two branches' hours barely overlap **[Verified]**. No competitor can replicate that last point. |
| Which treatment page does it link to? | `/treatments/root-canal-treatment` |
| Should it link to a clinic page? | **Yes** — urgent symptom intent; link to the branch matching the reader's likely hour. |
| Does the doctor need to review it? | **Yes, mandatory.** Symptom-to-diagnosis guidance is squarely YMYL. |
| How does it support the cluster? | Entry point at the top of the funnel, feeding the pillar and from there the branch pages. |

### 14.5 Content standards

| Rule | Detail |
|---|---|
| Length | **No target length.** Length is whatever answers the question. The brief forbade arbitrary word counts and Google's guidance contains no length criterion. |
| Attribution | Every article carries a named human author and a named clinical reviewer with qualification and review date. **No AI byline** — Google states verbatim that giving AI an author byline "is probably not the best way" to disclose. |
| AI use | Permitted for drafting and structuring. **Not permitted** as the source of clinical claims or local facts. Prohibition attaches to purpose, not tooling (Section 8.4). |
| Originality | No near-duplicate articles across treatments. If two drafts converge, merge them. |
| Claims | No invented patient stories, outcomes, statistics or credentials. No success-rate claims without a cited source the clinic accepts. |
| Local references | Only where genuinely relevant — a branch-routing note is relevant; a list of eleven locality names in a footer is keyword stuffing (Section 8.8). |
| Cadence | Roughly one article every 7–10 days through Phase 3, **paced by clinical review capacity, not by a content calendar.** If review is unavailable, the article waits. |
| Review cycle | Each article gets a `lastReviewed` date and a 12-month re-review commitment. |

### 14.6 Measuring the blog's contribution

| Signal | Source | Caveat |
|---|---|---|
| Indexation of each article | Search Console → Page indexing | — |
| Impressions and clicks per article URL | Search Console → Performance, page-filtered | Expect little in 60 days; new informational content is typically slow |
| Non-branded query growth | Search Console → Queries, branded/non-branded split | The cleanest available measure of reach **[Requires validation — baseline needed]** |
| Assisted conversions | Analytics path: article → treatment page → enquiry | **[Requires validation — no analytics access]** |
| Internal link effect on pillars | Impressions on `/treatments/root-canal-treatment` before vs after | Correlational, not causal; note confounders |

**[Inferred]** Setting expectations honestly matters here more than anywhere else in the plan: **six articles will probably not move enquiry volume inside 60 days.** Their value in this window is that they establish the attribution pattern, the review workflow and the cluster structure, so that months 3–12 compound. Presenting them to the doctor as a 60-day revenue lever would be dishonest and would set up the programme to look like a failure at review.

---

## 15. CMS and Sanity Evaluation

### 15.1 What exists today

**[Verified]** There is no CMS. No `sanity` dependency, no `sanity.config.ts`, no `sanity/` directory, no `next-sanity`, no `@sanity/*` package, no `NEXT_PUBLIC_SANITY_*` variable in `.env.example`, no database, no external content API. All content lives in typed TypeScript modules under `lib/`, with per-page modules of 406–877 lines and a 531-line `site-data.ts`.

**[Verified]** Content is governed by a documented, approval-gated editorial process in `docs/internal-pages/<page>/` — `PAGE_PLAN.md`, `OWNERSHIP.md`, `CONTENT_QUESTIONS.md`, `DISCOVERY.md`, `CHANGELOG.md`, `content-snapshot.json`, and in places `FAQ_APPROVED.md` and `OWNER_DECISIONS.md`. There is a content-audit script at `scripts/seo-content-audit.mjs` and a snapshot script at `scripts/page-content-snapshot.mjs`.

### 15.2 Comparison

| Criterion | Current typed TS modules | Sanity CMS |
|---|---|---|
| Developer experience | Good. Co-located types, compile-time guarantees, no network calls, no draft/publish desync | Good. GROQ, strong Next.js integration, `next-sanity` |
| Schema flexibility | Good for a known page set; schema changes are code changes | **Better** for evolving, author-driven structures |
| Next.js integration | Native — content is a module import; fully static | Strong, but adds fetching, caching, revalidation and preview concerns |
| Structured/portable content | Typed object trees; sufficient for the current block set | **Portable Text** is more capable for long-form rich text |
| Modular page building | **Possible today** via a discriminated-union block registry (Section 16) | **Better** — visual composition for non-developers |
| Draft and preview | None. Git branches plus the existing doc process | **Better** — native drafts, live preview |
| Editorial permissions | None — repository access is the permission model | **Better** — roles, per-field permissions |
| Content review | **Already in place** via `docs/internal-pages/*` with explicit owner sign-off **[Verified]** | Built-in workflow, but would need the existing clinical-review gate rebuilt inside it |
| SEO field management | Already first-class — `seo: { title, description }` is a required field on `ClinicLocation` **[Verified]** | Equivalent, with friendlier editing |
| Image management | Next.js pipeline + `sharp`; working well **[Observed]** | **Better** — CDN, hotspot cropping, transforms |
| Publishing workflow | Developer deploy | Editor publish |
| Revalidation | Not needed; fully static | Webhook-driven revalidation to configure and monitor |
| Performance | **Best case** — static, no runtime content fetch | Very good with correct caching, but more moving parts |
| Maintainability | Good now; degrades as page count and editor count rise | **Better at scale** |
| Cost | **Zero** | Plan cost + migration + ongoing maintenance **[Requires validation — current Sanity pricing not checked]** |
| **Direct SEO benefit** | — | **None.** A CMS does not change what Google sees. |

### 15.3 Recommendation: do not introduce Sanity in this 60-day window

**[Recommended — High confidence]**

Reasoning, in order of weight. **[Inferred]**

1. **A CMS produces no patient-visible page and no direct ranking signal.** Google evaluates rendered HTML. Both architectures emit identical HTML. The brief itself warned against claiming that adding a CMS improves rankings, and that warning is correct.
2. **The bottleneck in the next 60 days is not developer throughput.** The gating resources are clinical review time, verified local facts (routes, landmarks, branch-level treatment availability) and owner decisions on pricing disclosure. A CMS accelerates none of these. It would consume the window — schema design, migrating seven substantial treatment modules, preview, revalidation, permissions, training — and at day 60 the doctor would have a nicer admin panel and roughly the same number of pages.
3. **The existing architecture already delivers the two things the brief wants from a CMS**, reuse and consistency, and adds one Sanity cannot: **the compiler refuses to ship content missing its SEO title or address.** For a YMYL medical site where missing or wrong information is a trust and safety matter, compile-time enforcement is a genuine advantage, not a limitation.
4. **The work volume does not justify it.** Phase 1 is four area pages, seven page-level attribution edits and six articles. That is comfortably within hand-authored scope.
5. **There is no non-developer editor publishing today.** **[Inferred from repository evidence]** The content process runs through `docs/internal-pages/` with developer-executed changes. A CMS solves a permissions and self-service problem that is not yet being experienced.
6. **The migration risk lands on the site's best asset.** The seven treatment pages are substantial, well-marked-up and reportedly performing. Moving them into a new content source mid-engagement risks them for no search gain.

### 15.4 What to do instead, and the migration path preserved

**Build the block registry now, in TypeScript, with component contracts that a CMS could later populate.** **[Recommended — High confidence]** Section 16 specifies it.

The critical design constraint: **block components must receive plain data props and must not import content modules directly.** If that holds, a later Sanity adoption becomes a data-source swap — replace the module import with a GROQ query returning the same shape — rather than a rewrite. The `ClinicLocation` type already demonstrates this pattern working.

### 15.5 When to revisit — explicit triggers

**[Recommended]** Reopen the CMS decision when any one of these becomes true:

| Trigger | Rationale |
|---|---|
| Two or more non-developer editors need to publish independently | The permissions problem becomes real |
| The roadmap commits to more than ~20 new content pages per quarter | Hand-authoring stops being the cheaper option |
| The doctor or practice manager wants to publish or edit without a developer | The self-service problem becomes real |
| Content changes are waiting on developer availability | The bottleneck has actually moved |
| Area pages pass 10–12 and need non-developer local-fact updates | Maintenance cost crosses over |

**If none of these is true at day 60, the correct decision is to defer again.** Saying so now prevents the programme from drifting into a migration because it sounds like progress.

### 15.6 Presenting this to the doctor

**[Recommended]** The honest framing: "You asked whether we should add a content management system. We looked at the code and the answer is not yet — and here is what we would rather spend those weeks on. The thing stopping us publishing is not the software; it is that nobody has signed off which doctor stands behind each treatment page, and that we need verified directions from each neighbourhood. We will build the page structure so that adding a CMS later is straightforward, and we will tell you exactly when it becomes worth the cost."

---

## 16. Modular Block Architecture

### 16.1 Design principle

**[Recommended]** A block is a pure presentational component receiving plain data props. The page is a typed, ordered list of blocks. Blocks never import content modules; pages compose data and pass it down. This is what keeps a future CMS migration a data-source swap (Section 15.4).

### 16.2 Block registry — build, reuse, or reject

The brief proposed twenty blocks. Evaluating each against the actual codebase, most already exist and several would be unnecessary complexity.

| Block | Purpose | Status | Verdict |
|---|---|---|---|
| Hero | Page intro + primary CTA | Exists in page compositions | **Reuse** — extract to a registered block |
| Rich text | Editorial prose | Exists; `EditorialHighlight.tsx` **[Verified]** | **Reuse** |
| Clinic details | Real branch NAP + hours | Exists; `BranchCards.tsx` **[Verified]** | **Reuse** — the single most important block for area pages |
| Local introduction | Locality-specific opening context | — | **Build.** Carries most of the required unique content |
| Directions | Verified route from the locality | — | **Build.** The core differentiator; content gated on verified data |
| Landmarks | Recognisable local reference points | — | **Build**, merged into Directions rather than separate |
| Treatment cards | Links to existing treatment pages | Exists; `RelatedTreatments.tsx` **[Verified]** | **Reuse** |
| Treatment explanation | Clinical detail | Exists on treatment pages | **Reject for area pages.** Re-explaining the procedure is what creates duplication with the seven treatment pages. Area pages link; they do not explain. |
| Doctor profile | Clinician credentials | Exists; `DoctorPortrait.tsx` **[Verified]** | **Reuse** |
| Clinical expertise | Capability statement | Overlaps Doctor profile | **Reject** — unnecessary complexity; fold into Doctor profile |
| Testimonials | Authentic patient experience | Exists on clinic pages (`patientStory` in `ClinicLocation` **[Verified]**) | **Reuse, with caution** — real quotes only, no fabrication, and no `Review` schema (Section 8.6) |
| FAQ | Patient questions | Exists with `FAQPage` markup | **Reuse** — area-specific questions only, never copied between areas |
| Related articles | Contextual blog links | — | **Build** (Phase 3, once articles exist) |
| Related treatments | — | Duplicate of Treatment cards | **Reject** — same component |
| Related locations | Neighbouring area navigation | — | **Build**, but as a short contextual list, **never a bare place-name list** (Section 8.8) |
| Appointment CTA | Conversion | Exists; `LeadCapture.tsx`, `FloatingCta.tsx` **[Verified]** | **Reuse** |
| Contact information | Phone, hours | Exists | **Reuse** — must use the branch number, resolving Section 3.7 |
| Image / gallery | Clinic photography | Exists; `gallery` on `ClinicLocation`, `OffsetImagePair.tsx` **[Verified]** | **Reuse** |
| Internal-link section | — | Duplicate of Related articles/locations | **Reject** |
| Breadcrumbs | Navigation + schema | Exists; `Breadcrumbs.tsx` + `breadcrumbJsonLd()` **[Verified]** | **Reuse** — and extend to `/about`, `/contact`, `/privacy-policy` (Section 04) |
| Author / clinical reviewer | Content attribution | — | **Build. Highest priority block in the registry** (Section 13.3) |

**Net: 6 blocks to build, ~10 to register from existing components, 4 rejected as duplicative.** **[Inferred]** This reframes the brief's twenty-block proposal into roughly a week of focused work rather than a month, which is what makes the Section 21 timeline credible.

### 16.3 Build order

| Order | Block | Why first |
|---|---|---|
| 1 | **Author / clinical reviewer** | Unblocks the highest-value fix on seven existing pages; needed by every article |
| 2 | **Clinic details** (register `BranchCards`) | Every area page depends on it |
| 3 | **Local introduction** | Carries the unique content that makes area pages viable |
| 4 | **Directions** (incl. landmarks) | The differentiator; gated on verified data |
| 5 | **FAQ** (area-scoped) | Locality questions; reuses existing `FAQPage` emission |
| 6 | **Related locations** | Builds the browseable hierarchy that answers doorway test 4 |
| 7 | **Related articles** | Phase 3, after articles exist |

### 16.4 Page-type schemas

Five content types. Common blocks are shared; each type keeps a distinct purpose.

| Type | Status | Required fields (beyond blocks) | Distinct purpose |
|---|---|---|---|
| **Clinic page** | Exists — `ClinicLocation` **[Verified]** | slug, name, locality, address, structuredAddress, phone, tel, hours, schemaOpeningHours, rating, seo, directions, images, doctors, treatments | **A real physical branch.** Emits a `Dentist` entity. |
| **Area page** | **New — `AreaPage`** | slug, areaName, **primaryClinicSlug**, **secondaryClinicSlug?**, localIntro, **verifiedDirections**, **landmarks[]**, availableTreatmentRefs[], faqs[], seo, **published**, **factsVerifiedOn** | **A locality NeoDent serves from a named branch.** References the clinic's `Dentist` entity by `@id`; **never mints its own.** |
| **Treatment page** | Exists | slug, name, clinical content, faqs, seo, **+ author, reviewer, reviewedOn, branchAvailability** | The procedure. |
| **Article** | **New — `Article`** | slug, title, body, **author**, **clinicalReviewer**, **datePublished**, **lastReviewed**, treatmentRef, clinicRef?, seo | Answers one patient question. |
| **Doctor profile** | Exists for one | slug, name, qualifications, role, specialisms, branches, seo | A real named clinician. |

### 16.5 The publish gate — the control that makes this compliant

**[Recommended — High confidence]** The brief was explicit that a geographic record must not become indexable until it is genuinely complete. This must be enforced in code, not in a style guide, because style guides are what fail under deadline pressure.

An `AreaPage` record is **excluded from `generateStaticParams`, excluded from the sitemap, and excluded from internal links** unless **all** of the following are true:

| Gate | Condition |
|---|---|
| 1 | `published === true` |
| 2 | `primaryClinicSlug` resolves to a real entry in `clinicLocations` |
| 3 | `verifiedDirections` is non-empty **and** `factsVerifiedOn` is set |
| 4 | `landmarks.length >= 2` |
| 5 | `localIntro` word count **≥ 150** and shares **< 30%** of its text with any other published `AreaPage` |
| 6 | `faqs.length >= 3`, and no FAQ question string duplicates one on another area page |
| 7 | `seo.title` and `seo.description` are present and unique site-wide |
| 8 | Editorial sign-off recorded in `docs/internal-pages/areas-<slug>/OWNERSHIP.md`, matching the existing process **[Verified pattern]** |

Gates 5 and 6 are the direct countermeasures to the Tirumala failure mode. The 30% similarity ceiling is the operational expression of "invert the ratio" from Section 6.6, and it is checkable by extending `scripts/seo-content-audit.mjs` **[Verified to exist]** rather than by building new tooling.

**Why a flag and not `noindex` or robots.txt.** **[Inferred]** Google's canonicalisation guidance states verbatim "**Don't** use the robots.txt file for canonicalization purposes" and "**We don't recommend** using `noindex` to prevent selection of a canonical page within a single site". An unpublished area record should simply **not exist as a URL** — the cleanest possible signal, achieved by omitting it from `generateStaticParams` and setting `dynamicParams = false` so unknown slugs return a true 404.

### 16.6 Approval workflow

**[Recommended]** Extend the existing process rather than inventing one:

1. **Draft** — `AreaPage` record authored with `published: false`.
2. **Local-fact verification** — clinic supplies and signs off routes, landmarks, travel times, branch treatment availability; `factsVerifiedOn` set.
3. **Clinical review** — required for any article or treatment-page clinical claim; reviewer name and date recorded.
4. **Editorial review** — gates 5–7 checked by the audit script.
5. **Owner sign-off** — recorded in the matching `docs/internal-pages/` directory, as for every existing page.
6. **Publish** — `published: true`; the record enters `generateStaticParams`, the sitemap and internal links on the next deploy.

---

## 17. Next.js Technical SEO Architecture

**Version note.** All guidance below was verified against the bundled documentation for the installed version at `node_modules/next/dist/docs/` **[Verified]** and against the live implementation in `app/clinic/[slug]/page.tsx` **[Verified]**. This matters because this major version differs from older App Router conventions in at least one way that breaks naive code: **`params` is a `Promise` and must be awaited.**

### 17.1 Proposed route

`app/areas/[slug]/page.tsx` — **modelled directly on the existing, working `app/clinic/[slug]/page.tsx`.** **[Recommended — High confidence]** The existing file already demonstrates every pattern required:

| Concern | Existing proven pattern (`app/clinic/[slug]/page.tsx`) |
|---|---|
| Param typing | `type ClinicRouteProps = { params: Promise<{ slug: string }> }` |
| Static generation | `export function generateStaticParams() { return clinicLocationSlugs.map((slug) => ({ slug })); }` |
| Awaiting params | `const { slug } = await params;` in both `generateMetadata` and the page component |
| Unknown slug | `if (!clinic) notFound();` |
| Canonical | `alternates: { canonical: path }` with a site-relative path, resolved against `metadataBase` |
| Robots | `robots: { index: true, follow: true }` |
| Title control | `title: { absolute: clinic.seo.title }` — bypasses the layout template |
| Open Graph / Twitter | Built from the same `seo` fields plus the page image |
| JSON-LD | A native `<script type="application/ld+json">` with `JSON.stringify(jsonLd).replace(/</g, "\\u003c")` |

**[Verified]** That escaping of `<` to `\u003c` matches the framework's own documented recommendation for JSON-LD, which exists to prevent XSS injection through content strings. Any new route must preserve it.

**Additions recommended for the areas route:**

| Addition | Reason |
|---|---|
| `export const dynamicParams = false;` | Any slug not returned by `generateStaticParams` returns a true 404 instead of being generated on demand. This is the hard enforcement of the Section 16.5 publish gate. The clinic route currently relies on `notFound()` alone, which works, but for a namespace that will hold draft records the explicit config is safer. |
| `generateStaticParams` filtered on the publish gate | Only fully-gated records become URLs |

### 17.2 Metadata

**[Recommended]** Per area page, from the `AreaPage.seo` fields, following the existing convention exactly:

- `title: { absolute: ... }` — unique, locality-led, under ~60 characters
- `description` — unique, 140–160 characters, mentioning the locality and the routed branch
- `alternates: { canonical: '/areas/<slug>' }` — self-referential, matching the sitemap entry exactly, as all 17 current URLs already do **[Observed]**
- `robots: { index: true, follow: true }`
- Open Graph and Twitter from the same fields plus the branch image

**Verify `metadataBase` is set in `app/layout.tsx`** so relative canonicals resolve absolutely. **[Inferred]** It is almost certainly set, because all 17 live pages emit correct absolute canonicals **[Observed]** — but confirm before adding a route rather than after.

### 17.3 Structured data for area pages

**[Recommended — High confidence]** Emit:

1. `BreadcrumbList` via the existing `breadcrumbJsonLd()` helper — Home → Areas → `<Area name>`
2. `WebPage` with `@id` `${canonical}#webpage`, `isPartOf` the `WebSite` entity, and **`about` / `mainEntity` pointing by `@id` to the real clinic's existing `Dentist` entity** at `${SITE_URL}/clinic/<primaryClinicSlug>#clinic` **[Verified to exist]**
3. Optionally `FAQPage` for genuinely area-specific questions

**Explicitly prohibited:** minting a new `Dentist` or `LocalBusiness` entity whose address is the area. **[Verified policy basis]** — the structured-data guidelines require markup to be "a true representation of the page content" and forbid markup that "misrepresent[s] your ownership, affiliation, or primary purpose". Referencing the real clinic by `@id` conveys the true relationship: this page is *about* that clinic, serving this area.

**Separately recommended on the clinic pages:** add `areaServed` to both `Dentist` entities, listing the genuinely served localities. **[Recommended — High confidence]** This is the schema-level mechanism for expressing neighbourhood reach honestly, and it is the compliant alternative to the keyword-stuffing pattern of listing place names in body copy.

### 17.4 Sitemap integration

**[Recommended]** In `app/sitemap.ts`, map a gated `publishedAreaSlugs` array exactly as `clinicLocationSlugs` is mapped today **[Verified pattern]**. Suggested `priority` 0.7 — below treatment and clinic pages (0.8), above legal. Also raise `/doctors` from 0.6 to 0.8.

**[Inferred]** Keep expectations correct: Google states sitemap inclusion is "**a weak signal**". The sitemap is how the pages get discovered promptly; it is not what makes them rank.

### 17.5 Indexability, 404s and the draft state

| Concern | Decision |
|---|---|
| Unpublished area record | **No URL at all.** Excluded from `generateStaticParams`; `dynamicParams = false` ⇒ true 404. |
| Why not `noindex`? | Google: "We don't recommend using `noindex` to prevent selection of a canonical page within a single site". |
| Why not robots.txt? | Google: "Don't use the robots.txt file for canonicalization purposes." |
| Unknown slug | True HTTP 404 via `notFound()`. The site already returns correct 404s **[Observed]**. |
| Existing URLs | **No changes, no redirects, no migrations.** |

### 17.6 Rendering, caching and revalidation

**[Observed/Verified]** The site is statically generated with no runtime content fetching; content is compiled in. Consequently **no ISR, no revalidation webhooks and no cache configuration are required** for any recommendation in this document. Content changes ship on deploy.

**[Inferred]** This is a genuine advantage worth stating to the client: the simplest possible caching story, the fastest possible responses, and nothing to misconfigure. It is also a cost of the no-CMS decision — content changes need a deploy — and that trade is accepted deliberately in Section 15.

### 17.7 Internal linking implementation

| From | To | Mechanism |
|---|---|---|
| `/clinic/<slug>` | relevant `/areas/*` | Replace the current bare place-name sentence **[Observed]** with linked, substantive references |
| `/areas/<slug>` | `/clinic/<primary>` | Clinic details block — the primary conversion path |
| `/areas/<slug>` | `/treatments/*` | Treatment cards (`RelatedTreatments`), never a procedure re-explanation |
| `/areas/<slug>` | neighbouring `/areas/*` | Related locations block — creates the "clearly defined, browseable hierarchy" that answers doorway test 4 |
| `/treatments/*` | `/clinic/<slug>` | New branch-availability block |
| Articles | pillar treatment page | Contextual in-body links |
| Navigation | `/areas` hub | **Required** — geographic pages must be reachable from navigation, which is exactly what the Tirumala reference fails to do **[Observed]** |

**[Recommended]** An `/areas` hub page listing the published areas grouped by branch. This is the honest counterpart to `market-area.html`: in navigation, with a real title and description, and listing only published pages.

### 17.8 Performance

**[Observed]** Image handling is already sound — Next.js pipeline, `srcSet`, explicit dimensions, lazy loading below the fold, WebP. No layout-shift or payload problems were visible in the HTML.

**Core Web Vitals field data — LCP, INP, CLS — was not obtainable.** **[Requires validation]** No CrUX or PageSpeed field data was accessible, and no lab run substitutes for field data. **[Recommended]** Pull the Core Web Vitals report in Search Console and a PageSpeed Insights field reading for the homepage, one clinic page and one treatment page before asserting any performance work is needed. Given the observed implementation quality, performance is **not** expected to be a priority — and recommending optimisation work without the data would be exactly the unjustified recommendation the brief warned against.

---

## 18. Google Business Profile Strategy

### 18.1 Separating three different things

**[Recommended]** The doctor's question is "more visibility on Google". That spans three surfaces with different mechanics, and conflating them is the most common cause of disappointed expectations in local SEO.

| Surface | What drives it | What this programme can influence |
|---|---|---|
| **Organic web results** | Page relevance, content quality, E-E-A-T, links, technical health | **Directly.** This is where area pages, treatment improvements and articles operate. |
| **Google Maps / local pack** | Google's stated factors: **relevance, distance, prominence** **[Verified]** | **Partly.** Relevance and prominence yes; **distance, no.** |
| **Business Profile panel** | Profile completeness, accuracy, categories, photos, reviews | **Directly**, by maintaining the two real profiles. |

**The honest constraint, stated plainly for the doctor.** **[Inferred]** Google names **distance** as a primary local-pack factor. A landing page cannot move a clinic closer to Abids. **No page on the website will reliably place NeoDent in the map pack for a locality where it has no premises.** What area pages can do is win the *organic* results beneath and beside the map pack — which, on the evidence of Section 6.2, is currently an open field in the old city. This distinction should be made explicitly in the 24 November conversation, because promising map-pack presence in Abids would be promising something Google's own documentation says is governed by distance.

### 18.2 Per-branch actions

**[Requires validation]** — neither Business Profile was observable during this research; all items below are to be checked first.

| Action | Nampally | Mehdipatnam | Why |
|---|---|---|---|
| Profile exists and is owner-verified | Check | Check | Baseline |
| **Website URL points to the branch page**, not the homepage | `/clinic/nampally` | `/clinic/mehdipatnam` | GBP policy: "provide a website that represents your individual business location" **[Verified]** |
| **Primary phone matches the branch number** on site and in schema | +91 90305 98081 | +91 90306 48393 | Resolves Section 3.7. Policy prefers "a local phone number instead of a central call center helpline number" **[Verified]** |
| Address matches the site and schema exactly | Verified address | Verified address, **including the Humayun Nagar / Mehdipatnam naming fix** | NAP consistency; Section 4.4 #4 |
| **Hours match exactly**, including Sunday closed | Mon–Sat 10:30–17:00 | Mon–Sat 16:00–20:00 | The hours are the routing proposition; a mismatch undermines it |
| Business name identical on both, and matching the site | Resolve singular/plural | Resolve singular/plural | Policy: name must be "as used consistently on your storefront, website, stationery" **[Verified]** |
| Categories — fewest that describe the core business | Check | Check | Policy: "Select categories that complete the statement: 'This business IS a'" **[Verified]** |
| **Service area configured** to the genuinely served localities | Nampally-side localities | Mehdipatnam-side localities | The **only** sanctioned way to express reach into non-branch areas. All candidates sit far inside the "about 2 hours of driving time" bound **[Verified]** |
| Branch-specific photos, including exterior and signage | Add | Add | Policy requires "permanent fixed signage" at a listed address; photos corroborate it |
| Review responses | Ongoing | Ongoing | Prominence is a stated factor **[Verified]** |

### 18.3 How the website supports the profiles

**[Inferred]** The mechanism is entity corroboration. Each branch page carries the branch's real address, phone, hours and a `Dentist` entity with a stable `@id`, and each Business Profile points at that same branch page with matching NAP. Adding `areaServed` to the schema and configuring the matching service area on the profile makes the website and the profile tell one consistent story about which localities each branch serves.

Area pages support this **organically** — they are not a Business Profile mechanism, and must never be presented as one.

### 18.4 Prohibited — and why it must be in writing

**[Verified policy]** The following are prohibited, and must never be done regardless of commercial pressure:

| Practice | Policy |
|---|---|
| A Business Profile for Abids, Masab Tank or any locality without a staffed, signed, customer-receiving presence | "If your business rents a physical mailing address but doesn't operate out of that location… that location isn't eligible"; co-working offices ineligible "unless that office… is staffed during business hours by your business staff" |
| More than one profile per real location | "Do not create more than one page for each location of your business" |
| Keywords in the business name | "Including unnecessary information in your business name isn't permitted, and could result in the suspension of your Business Profile" |
| A virtual office as a service-area base | "Service-area businesses can't list a 'virtual' office unless that office is staffed during business hours" |
| Incentivised, solicited-fake or purchased reviews | Prohibited content and behaviour |
| `aggregateRating` in the site's own schema | "only recommended for sites that capture reviews about other local businesses" |

**[Inferred]** The sanction for the first four is suspension of the profile — which would cost NeoDent the local visibility it already has for Nampally and Mehdipatnam, where it is reportedly ranking first. The downside is strictly larger than any upside. Individual practitioners may have their own pages under the policy's practitioner carve-out, which is a legitimate avenue worth exploring for the founder and Dr. Miftah **[Requires validation]**.

---

## 19. Two Sample Neighbourhood Page Blueprints

**Critical constraint applied throughout.** Every field marked **[CLINIC MUST SUPPLY]** is information this research could not establish and **must not be written from imagination**. No distance, travel time, route or landmark below is asserted as fact. Neither page may claim or imply a NeoDent branch in the area.

### 19.1 Blueprint A — Abids (routes to Nampally)

| Field | Value |
|---|---|
| Proposed URL | `/areas/abids` |
| Title | `Dental Clinic Near Abids, Hyderabad | NeoDent Dental Hospital` (59 chars) |
| H1 | `Dental Care Near Abids, Hyderabad` |
| Meta description | `Looking for a dentist near Abids? NeoDent's Nampally clinic is a short trip away, open Mon–Sat 10:30am–5pm. Root canals, implants, braces. Book: +91 90305 98081.` **[Verify phone and hours before publishing]** |
| Canonical | `https://www.neodentdentalhospitals.com/areas/abids` (self-referential) |
| Primary branch | **Nampally** |
| Secondary mention | Mehdipatnam, **for evening appointments only** (16:00–20:00) |
| Robots | `index, follow` — **only once all eight publish gates pass** |

**Heading hierarchy and block composition**

| Level | Heading | Block | Content requirement |
|---|---|---|---|
| H1 | Dental Care Near Abids, Hyderabad | Hero | Locality-led; states the clinic is **in Nampally**, not in Abids |
| H2 | Why patients from Abids choose NeoDent | Local introduction | **≥150 words, unique.** The Nampally branch is in the Medwin Hospital Complex on Chirag Ali Lane **[Verified]**; founded 1994 **[Verified]**; what a first visit involves. **No place-name lists.** |
| H2 | Getting to our Nampally clinic from Abids | Directions | **[CLINIC MUST SUPPLY]** route, measured travel time, two or three landmarks, parking, nearest Metro/bus. Map link to the verified clinic location. |
| H2 | Which clinic should you visit, and when | Clinic details ×2 | **The differentiator.** Nampally 10:30–17:00 for daytime; Mehdipatnam 16:00–20:00 for evenings. Both numbers, each labelled with branch and hours. Both closed Sunday. **[Verified hours]** |
| H2 | Treatments available at our Nampally clinic | Treatment cards | Links to existing `/treatments/*`. **No procedure explanations.** **[CLINIC MUST SUPPLY]** per-branch availability. |
| H2 | Your dental team at Nampally | Doctor profile | Real named clinicians at that branch, linking to profile pages. **[CLINIC MUST SUPPLY]** which clinicians actually sit at Nampally — the current site duplicates the full roster across both branch pages **[Observed]** |
| H2 | Questions from patients near Abids | FAQ | **≥3 genuinely area-specific questions**, not reused on any other area page. E.g. nearest Metro; whether to come to Nampally or Mehdipatnam after work; whether a walk-in is possible before 17:00. |
| H2 | Book an appointment | Appointment CTA | Nampally number + enquiry form |
| H2 | Other areas we serve nearby | Related locations | Short contextual list of **published** area pages only. **Never a bare place-name list.** |
| — | Breadcrumbs | Breadcrumbs | Home → Areas → Abids |

**Content split target:** ~70% unique to Abids, ~30% shared template. **[Recommended]** Inverting the Eledent ratio (Section 6.6) and the opposite of Tirumala's 0.35% (Section 7.2).

**Schema:** `BreadcrumbList`; `WebPage` with `about`/`mainEntity` → `@id` `https://www.neodentdentalhospitals.com/clinic/nampally#clinic` **[Verified to exist]**; optional `FAQPage`. **No new `Dentist` entity. No `aggregateRating`.**

**Internal links in:** `/clinic/nampally`, `/areas` hub, navigation. **Out:** `/clinic/nampally`, 3–5 `/treatments/*`, 1–2 doctor pages, neighbouring published areas.

**Publication requirements:** all eight gates in Section 16.5, plus owner sign-off recorded in `docs/internal-pages/areas-abids/OWNERSHIP.md`.

### 19.2 Blueprint B — Masab Tank (routes to Mehdipatnam)

| Field | Value |
|---|---|
| Proposed URL | `/areas/masab-tank` |
| Title | `Dental Clinic Near Masab Tank, Hyderabad | NeoDent` (50 chars) |
| H1 | `Dental Care Near Masab Tank, Hyderabad` |
| Meta description | `Need a dentist near Masab Tank? NeoDent's Mehdipatnam clinic in Humayun Nagar is open Mon–Sat 4–8pm for root canals, implants and braces. Call +91 90306 48393.` **[Verify before publishing]** |
| Canonical | `https://www.neodentdentalhospitals.com/areas/masab-tank` |
| Primary branch | **Mehdipatnam** |
| Secondary mention | Nampally, **for daytime appointments** (10:30–17:00) |

**Heading hierarchy and block composition**

| Level | Heading | Block | Content requirement |
|---|---|---|---|
| H1 | Dental Care Near Masab Tank, Hyderabad | Hero | States the clinic is **in Humayun Nagar, Mehdipatnam** |
| H2 | Why patients from Masab Tank choose NeoDent | Local introduction | **≥150 words, unique, and materially different from the Abids page.** The clinic is near Masjid-e-Azizia, Royal Colony, Humayun Nagar **[Verified]**. **Must not reuse Abids phrasing** — gate 5 enforces <30% overlap. |
| H2 | Getting to our Mehdipatnam clinic from Masab Tank | Directions | **[CLINIC MUST SUPPLY]** route, measured travel time, landmarks, parking |
| H2 | Evening appointments, and when to choose Nampally | Clinic details ×2 | **Especially valuable here.** Mehdipatnam opens **only 16:00–20:00** **[Verified]** — a patient needing morning care must be sent to Nampally. Stating this prevents a wasted journey. |
| H2 | Treatments available at our Mehdipatnam clinic | Treatment cards | Links out. **[CLINIC MUST SUPPLY]** per-branch availability |
| H2 | Your dental team at Mehdipatnam | Doctor profile | **[CLINIC MUST SUPPLY]** actual clinicians at this branch |
| H2 | Questions from patients near Masab Tank | FAQ | ≥3 area-specific, none shared with Abids |
| H2 | Book an appointment | Appointment CTA | Mehdipatnam number + form |
| H2 | Other areas we serve nearby | Related locations | Published pages only |

**Schema:** as Blueprint A, but `@id` → `https://www.neodentdentalhospitals.com/clinic/mehdipatnam#clinic` **[Verified to exist]**.

### 19.3 Information the clinic must verify before either page is published

**[Requires validation]** Consolidated checklist for the 24 November conversation:

| # | Item | Needed for |
|---|---|---|
| 1 | Driving route, measured travel time (mid-morning **and** early evening) from Abids → Nampally and Masab Tank → Mehdipatnam | Directions blocks |
| 2 | Two or three landmarks per route that a local would actually use | Directions blocks |
| 3 | Parking and public-transport specifics at each branch | Directions blocks |
| 4 | **Which clinicians actually practise at which branch** | Doctor blocks; fixes the duplicated-roster issue **[Observed]** |
| 5 | **Which treatments are available at which branch** | Treatment cards; treatment-page branch availability |
| 6 | Which clinician reviews which treatment page, and their exact publishable qualifications | The highest-priority fix in this document |
| 7 | Decision on the single canonical phone number per branch | Resolves Section 3.7 |
| 8 | Decision on brand name — singular or plural | Resolves Section 4.4 #2 |
| 9 | Decision on the Mehdipatnam / Humayun Nagar naming convention | Resolves Section 4.4 #4 |
| 10 | Source and date for "25,000+ patients treated", or approval to remove it | Resolves Section 4.4 #5 |
| 11 | Pricing-disclosure policy for cost content | Treatment cost sections, article 3 |
| 12 | Original photographs of each branch exterior and interior, plus signage | Area pages; GBP corroboration |
| 13 | Genuine patient quotes with consent, if any are to be used | Testimonial blocks |
| 14 | Google Search Console and Analytics access | All measurement in Section 22 |
| 15 | Google Business Profile access for both branches | Section 18 |

**[Inferred]** Items 1–5 and 12 are the real schedule risk in this programme — not the development work. The 60-day plan in Section 21 is sequenced so that development proceeds while these are being gathered, but **no area page can pass its publish gate without them.** This should be said clearly on 24 November.

---

## 20. Internal Linking and Authority Development

### 20.1 Target link graph

```
                        Homepage
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   /clinic (hub)      /treatments (hub)    /areas (hub)  ← NEW, in navigation
        │                   │                   │
   ┌────┴────┐         7 treatment        4 area pages
   │         │            pages                 │
Nampally  Mehdipatnam       │                   │
   │         │              │                   │
   └────┬────┘              │                   │
        │                   │                   │
        └──── bidirectional ┴───────────────────┘
                            │
                      6 articles ──→ pillar treatment pages
                            │
                    /doctors ──→ doctor profiles
                            ↑
          cited as author/reviewer from treatment pages and articles
```

### 20.2 Link rules

| Rule | Detail | Justification |
|---|---|---|
| One URL per intent | No stacked variants | Eledent's `/kondapur` + `/best-dentist-in-kondapur` + `/dental-clinic-in-kondapur` is self-competition **[Observed]** |
| Areas reachable from navigation | `/areas` hub in the main nav | Answers doorway test 4, "a clearly defined, browseable hierarchy". Tirumala buries its geo hub and links it only from a title-less page **[Observed]** |
| Area → clinic is the conversion path | Every area page links its primary branch prominently | Makes the area page a destination, not a funnel |
| Area → treatment, never duplicate | Link out; never re-explain a procedure | Prevents clustering against the 7 strong treatment pages |
| Treatment → clinic | New branch-availability block | Connects commercial pages to local intent |
| Article → pillar | Contextual in-body links | Builds the cluster |
| Doctor pages are link targets | Cited as author/reviewer across treatment pages and articles | Converts attribution into internal authority flow |
| Varied, descriptive anchors | "our Nampally clinic", "root canal treatment", "Dr. Miftah's implant work" | The brief and Google both warn against repetitive anchor text |
| **No bare place-name lists** anywhere | Including footers | Google's named keyword-stuffing example **[Verified]** |
| Link to canonical URLs only | Never to a variant | Google: "link to the canonical URL rather than a duplicate URL" **[Verified]** |

### 20.3 Replacing the existing place-name sentences

**[Recommended — High confidence]** The current one sentence per clinic page listing six and four localities **[Observed]** should be replaced, not extended. Replacement pattern: a short paragraph naming the two or three localities that have **published** area pages, each as a descriptive link, with a reason for the mention — "Patients travelling from Abids and Begum Bazaar usually find our daytime hours convenient; we have set out directions from each."

This simultaneously removes a low-grade keyword-stuffing exposure, creates the internal links the new pages need, and makes the sentence genuinely useful.

### 20.4 Off-site authority — legitimate only

**[Recommended — Medium confidence]** No link scheme, no paid placements, no fabricated citations, no review manipulation. Legitimate avenues, in rough order of value for this business:

| Avenue | Note |
|---|---|
| Accurate directory and health-platform listings with consistent NAP | Practo and similar already surface competitors **[Observed]**. Consistency matters more than volume. |
| The founder's existing public and media profile | `/about` already references media appearances and `lib/miftah-press-archive.ts` exists **[Verified]** — real, citable activity that is currently under-exploited |
| Dental association and alumni listings | Genuine professional affiliations only **[Requires validation]** |
| Local institutional relationships | Only where a real relationship exists |
| Genuine review growth | Prominence is a stated Google factor **[Verified]**. Ask patients; never incentivise. |

**[Inferred]** Given the finding that two competitors rank widely with zero structured data and that tiny resident sites beat 1,600-page chains on locality queries **[Observed]**, aggressive link acquisition is not where this programme's marginal hour is best spent. Content and NAP accuracy are.

---

## 21. 60-Day Accelerated Growth Roadmap

### 21.1 Feasibility check against the actual repository

**[Inferred]** The plan below is scoped against what was verified: a dynamic-route precedent already in production, a component library covering ~10 of the needed blocks, an existing approval process, and an existing audit script. The development work is genuinely modest. **The schedule risk is the clinic-supplied facts and clinical review in Section 19.3, not the code.** The phases are sequenced so engineering proceeds in parallel with fact-gathering, and every publish date depends on a gate rather than a calendar.

### 21.2 Phase 1 — Days 1–7: baseline, validation and decisions

| # | Action | Owner | Dependency |
|---|---|---|---|
| 1 | Obtain Search Console + Analytics + both Business Profiles access | Client | **Blocks all measurement** |
| 2 | Export the Search Console baseline: 16 months of impressions, clicks, average position, CTR; query list split branded/non-branded; per-page performance; Page indexing report | Consultant | #1 |
| 3 | Verify the client's ranking claims properly — Search Console query data, not single manual searches | Consultant | #1, #2 |
| 4 | **Decide: canonical phone per branch; brand name singular/plural; Mehdipatnam-vs-Humayun-Nagar convention; "25,000+" source or removal** | **Client + consultant** | Section 19.3 items 7–10 |
| 5 | **Decide: which clinician reviews which treatment page, with exact publishable qualifications** | **Client** | The highest-value fix in this document |
| 6 | Gather verified local facts for Abids, Begum Bazaar, Masab Tank, Asif Nagar — routes, travel times at two times of day, landmarks, parking, transport | **Client** | Blocks all area pages |
| 7 | Confirm per-branch clinician and treatment availability | **Client** | Blocks area + treatment work |
| 8 | Confirm the actual treatment list — is whitening, extraction, gum treatment or crowns offered? | **Client** | Prevents content for services not provided |
| 9 | Pull Core Web Vitals field data; decide whether any performance work is warranted | Consultant | #1 |
| 10 | Audit both Business Profiles against the Section 18.2 checklist | Consultant | #1 |
| 11 | Confirm the final four Phase 1 localities | Both | #6 |

**Phase 1 output:** a measurable baseline, every blocking decision made, and verified facts in hand. **No published pages.** Attempting to publish in week one would mean inventing the facts in item 6.

### 21.3 Phase 2 — Days 8–21: technical foundations and the first pages

| # | Action | Effort | Priority |
|---|---|---|---|
| 12 | **Add author/clinical-reviewer attribution to all 7 treatment pages** — visible block + `author`, `reviewedBy`, `datePublished`, `lastReviewed` in `MedicalWebPage` | Low dev, needs #5 | **Critical** |
| 13 | **Fix NAP** — one canonical number per branch across page, schema and Business Profile; add `MedicalOrganization.address`/`telephone`/`contactPoint` | Low | **Critical** |
| 14 | Build the Author/Reviewer block and register the block registry over existing components | Medium | High |
| 15 | Add `areaServed` to both `Dentist` entities; migrate `openingHours` → `openingHoursSpecification` to declare Sunday closed; add `geo` (≥5 dp); replace `hasMap` with stable place URLs | Low-Medium | High |
| 16 | Create `app/areas/[slug]/page.tsx` modelled on `app/clinic/[slug]/page.tsx`, with `dynamicParams = false` and the publish gate in `generateStaticParams` | Medium | High |
| 17 | Create the `/areas` hub page and add it to navigation | Low | High |
| 18 | Extend `app/sitemap.ts` for gated area slugs; raise `/doctors` to 0.8 | Low | High |
| 19 | Extend `scripts/seo-content-audit.mjs` to assert the eight publish gates, including the <30% similarity ceiling | Medium | High |
| 20 | Build Local introduction, Directions, area FAQ and Related locations blocks | Medium | High |
| 21 | **Publish area pages 1 and 2 — Abids and Masab Tank** (one per branch, to isolate variables) | Medium | High |
| 22 | Replace the place-name sentences on both clinic pages with linked references | Low | Medium |
| 23 | Add `BreadcrumbList` to `/about`, `/contact`, `/privacy-policy` | Low | Medium |
| 24 | Fix empty `alt` on the two contact photos and four braces illustrations; fix duplicated headings; fix H1 concatenation artefacts | Low | Medium |
| 25 | Apply the Business Profile corrections from #10 | Low | High |
| 26 | Submit the new URLs through the sitemap and normal indexing workflow | Low | Medium |

### 21.4 Phase 3 — Days 22–40: content depth

| # | Action | Priority |
|---|---|---|
| 27 | **Publish area pages 3 and 4 — Begum Bazaar and Asif Nagar** | High |
| 28 | Add branch-availability blocks to all 7 treatment pages | High |
| 29 | Add "what affects the cost" sections to Root Canal Treatment and Dental Implants | High |
| 30 | Resolve the FAQ overlap between `/treatments` and the treatment pages | Medium |
| 31 | **Create the founder's page** for Dr. Mohd. Siraj Ur Rahman, with `Person`/`Physician` schema | **High** |
| 32 | Expand `/doctors` from ~661 words with real per-clinician detail; add profile pages for the next one or two clinicians | High |
| 33 | Build the Article type and route; publish articles 1–3 (RCT cluster), each clinically reviewed | High |
| 34 | Expand `/contact` from ~460 words — per-branch directions, hours, transport, what to expect | Medium |
| 35 | Add FAQ blocks to both clinic pages | Medium |
| 36 | Differentiate the two clinic pages — remove cross-branch H2s, correct the rosters | Medium |

### 21.5 Phase 4 — Days 41–60: measurement and iteration

| # | Action | Priority |
|---|---|---|
| 37 | Verify indexation of all new URLs; check specifically for "Duplicate, Google chose a different canonical" on the area pages | **Critical** |
| 38 | Publish articles 4–6 | Medium |
| 39 | Analyse Search Console: impressions and queries per new URL; branded vs non-branded movement; locality-qualified query appearance | **Critical** |
| 40 | Review enquiry and call activity attributable to new landing pages | High |
| 41 | Improve the weakest-performing new page rather than adding pages | High |
| 42 | **Decide Phase 2 locality expansion against the Section 12.3 evidence thresholds** — including the option of not expanding | High |
| 43 | Validate structured data with the Rich Results Test and Schema Markup Validator | Medium |
| 44 | Re-run the content-similarity audit across all published area pages | Medium |
| 45 | Produce the day-60 report and the next-stage recommendation | **Critical** |

### 21.6 What this plan deliberately does not promise

**[Recommended]** State all five of these on 24 November:

1. **No ranking position for any query on any date.** Google decides, and distance governs the local pack.
2. **No guaranteed indexing timeline.** Submission is not indexing.
3. **Six articles will probably not move enquiry volume within 60 days.** Their value compounds later.
4. **Area pages will not place NeoDent in the map pack for areas without a branch.** Section 18.1.
5. **If the evidence at day 60 does not support expansion, the recommendation will be not to expand** — and that is a successful outcome of a measured programme, not a failure.

### 21.7 Ranked near-term actions by impact, effort and confidence

| Rank | Action | Impact | Effort | Confidence |
|---|---|---|---|---|
| 1 | Author/clinical-reviewer attribution on 7 treatment pages | **High** | **Low** | **High** — directly addresses a verbatim Google quality question on YMYL pages, on the site's strongest pages |
| 2 | NAP consistency fix across site, schema and both profiles | **High** | **Low** | **High** — foundational local signal; currently three numbers with the primary one unmodelled |
| 3 | Business Profile corrections and service-area configuration | **High** | **Low** | **High** — the only sanctioned route to expressing area reach |
| 4 | 4 area pages at 70% unique content | **High** | Medium | **Medium** — competitive vacuum is verified; organic demand is **[Requires validation]** |
| 5 | Founder page + expanded `/doctors` | Medium-High | Low-Medium | **High** — E-E-A-T, and the Malakpet evidence shows practitioner pages competing well |
| 6 | `areaServed` + `openingHoursSpecification` in schema | Medium | Low | **High** |
| 7 | Cost sections on RCT and implants | Medium-High | Low-Medium | **Medium** — demand observed; depends on a pricing-disclosure decision |
| 8 | Internal linking rebuild incl. `/areas` hub in navigation | Medium | Low | **High** |
| 9 | 6 clinically-reviewed articles | Medium long-term | **High** | **Medium** — widest competitive gap, slowest payback |
| 10 | Thin-page expansion (`/contact`, `/doctors`) | Medium | Low | **Medium** |
| 11 | FAQ de-duplication | Low-Medium | Low | **High** |
| 12 | `alt` text, heading and H1 artefact fixes | Low | **Low** | **High** |
| 13 | Performance work | **Unknown** | Unknown | **Low — do not schedule until field data is reviewed** |

**Explicitly excluded as manipulative:** automated link building, paid or fabricated citations, review incentivisation or purchase, keyword stuffing including place-name blocks, doorway page generation, treatment×locality grids, and any Business Profile for a location without a staffed physical presence.

---

## 22. KPIs and Benchmarking

### 22.1 Baseline status — read first

**No baseline could be established during this research.** **[Requires validation]** Google Search Console, Google Analytics, both Business Profiles, and every keyword and rank-tracking tool were unavailable. Therefore **every baseline cell below reads "Baseline required"**, and **no numerical target is stated anywhere in this section.** Inventing either would make the day-60 review meaningless.

**Exports required in Phase 1, Day 1:**

| # | Export | Purpose |
|---|---|---|
| 1 | Search Console → Performance → 16 months, by date; impressions, clicks, average position, CTR | Establishes the trend and the seasonality context |
| 2 | Search Console → Performance → Queries, full list, exportable | Enables the branded/non-branded split and locality-query identification |
| 3 | Search Console → Performance → Pages, full list | Per-URL baseline for all 17 existing pages |
| 4 | Search Console → Page indexing (indexed + not-indexed with reasons) | Confirms the 17 pages are indexed; establishes the "duplicate/alternate canonical" baseline |
| 5 | Search Console → Core Web Vitals | Settles whether performance work is warranted |
| 6 | Analytics → organic landing-page report, 6 months, with any configured conversion events | Conversion baseline |
| 7 | Business Profile Insights for both branches — calls, website clicks, direction requests, searches | Local baseline, and separates map-pack from organic |
| 8 | Clinic's own enquiry and appointment log for the same period | The only true business-outcome measure |

**[Inferred]** Export 2 is the single most valuable one. It will show which locality-qualified queries NeoDent already receives impressions for — including, quite possibly, Abids and Masab Tank impressions at low average position, which would upgrade the Section 12 opportunity ratings from qualitative to evidence-based, and would be the strongest possible validation or refutation of this entire strategy before much is spent on it.

### 22.2 Separating leading indicators from business outcomes

**[Recommended]** The brief asked for this separation explicitly, and it is what protects the programme from being judged on the wrong number at day 60.

| Tier | Metrics | Moves within 60 days? |
|---|---|---|
| **Execution** (controllable) | Pages published through the gate; treatment pages with attribution; articles clinically reviewed; NAP consistency; profile fields corrected | **Yes — fully within our control.** Report these as delivery. |
| **Leading indicators** (early search signals) | Indexation of new URLs; impressions on new URLs; new locality-qualified queries appearing; non-branded query share; average position on existing pages | **Partly.** Indexation yes; impressions usually begin; position movement is slower. |
| **Business outcomes** (what the doctor cares about) | Enquiry-form submissions, phone clicks, direction requests, booked appointments, new patients | **Possibly, but attribution will be weak at this volume.** Must not be the sole measure of a 60-day window. |

### 22.3 KPI table

| KPI | Existing baseline | 30-day target | 60-day target | Measurement source |
|---|---|---|---|---|
| Total organic impressions | **Baseline required** | Set from baseline after Day 7 | Set from baseline after Day 7 | Search Console → Performance |
| Organic clicks | **Baseline required** | Set from baseline | Set from baseline | Search Console → Performance |
| Average position (site-wide) | **Baseline required** | Monitor, no target — a composite that moves with impression mix | Monitor | Search Console → Performance |
| CTR | **Baseline required** | Monitor | Monitor | Search Console → Performance |
| **Non-branded query share** | **Baseline required** | Establish and monitor | Growth expected | Search Console → Queries, manual split |
| **Distinct locality-qualified queries with ≥1 impression** | **Baseline required** | Establish | **Growth is the primary success signal of this programme** | Search Console → Queries, filtered |
| Impressions on `/areas/*` | 0 (pages do not exist) | 2 pages indexed, impressions beginning | 4 pages indexed, impressions on each | Search Console → Pages |
| **New-page indexation** | n/a | 2 of 2 indexed | **4 of 4 indexed, none marked "Duplicate, Google chose a different canonical"** | Search Console → Page indexing + URL Inspection |
| Treatment pages with named author + reviewer | **0 of 7** **[Observed]** | **7 of 7** | 7 of 7 maintained | Repository + live HTML |
| Articles published with clinical review | **0** **[Observed]** | 1–3 | 6 | Repository + live HTML |
| Doctor profile pages | **1 of 7 clinicians** **[Observed]** | 2 (founder added) | 3–4 | Sitemap |
| NAP consistency across site, schema, both profiles | **Failing — 3 numbers, primary unmodelled** **[Observed]** | **Consistent** | Maintained | Manual audit |
| Organic enquiries | **Baseline required** | Track | Track | Analytics event + clinic log |
| Phone / WhatsApp / directions clicks | **Baseline required** | Track | Track | Analytics events **[Requires validation — events may not be configured]** |
| Appointment conversions | **Baseline required** | Track | Track | Clinic's own records |
| Business Profile calls / direction requests | **Baseline required** | Track | Track | Business Profile Insights |

### 22.4 How targets should be set, once a baseline exists

**[Recommended]** On Day 7, set each target as a percentage change from the trailing 90-day average, not from a single month, and annotate the comparison with:

- **Seasonality.** The brief rightly warned against comparing unrelated periods. Dental demand in India is affected by festival and examination periods; a 60-day window straddling one is not comparable to the preceding 60 days without noting it.
- **The four months of prior work.** Some improvement in the window will be the delayed effect of work already done, not of this programme. Claiming all of it would be dishonest.
- **Impression-mix effects.** Adding pages that attract new, lower-position queries will often *reduce* site-wide average position while increasing total impressions and clicks. **Average position falling can be a sign of success.** Agree this with the doctor in advance, or it will look like failure.

### 22.5 Local search monitoring

**[Recommended]** Do not rely on manual searches from one device. Observations in this report were deliberately labelled **[Observed]** rather than treated as rankings for exactly this reason.

| Method | Cost | Assessment |
|---|---|---|
| **Search Console query data, filtered to locality terms** | Free | **Primary method. Start here.** Real impression data from real searchers, not a simulation. Covers organic, not the map pack. |
| Business Profile Insights, including search terms | Free | **Primary method for local/map visibility**, and the only one that separates map-pack from organic |
| A rank tracker with geo-grid local tracking | Paid **[Requires validation — pricing not checked]** | **Only justified if** the doctor specifically wants map-pack position tracking across localities, which Search Console cannot provide. Defer until the free sources are exhausted. |
| Manual incognito searches | Free | Useful as a sanity check only. Never as a reported metric. |

**[Inferred]** The free sources answer the questions that matter for this programme. A paid tracker should be a Phase-2 decision tied to a specific question the free tools cannot answer, not a default line item.

---

## 23. Doctor-Facing Proposal

### Proposed Next-Level Google Organic Visibility Growth Plan for NeoDent

*Written to be read by the practice owner. No jargon, no promises that cannot be kept.*

### What has already been established

Over the past four months your website has been built into a genuinely solid foundation. Seventeen pages are live and working properly. Both clinics — Nampally and Mehdipatnam — have their own detailed page with real addresses, real photographs, opening hours and phone numbers. Seven treatments each have a substantial page, and the technical work behind the scenes is cleaner than most dental websites we examined in Hyderabad, including several of the large chains.

You have told us that searches naming Nampally and Mehdipatnam are bringing you to the top of Google. When we searched for "dental clinic Nampally" and "dental clinic in Mehdipatnam" on 23 November, your website came up **first** in both. We want to be careful here: that was one search on one computer on one day, and Google results change by person, place and device. It is encouraging, and it matches what you have seen, but we will confirm it properly from your Search Console data rather than rely on it.

### The gap we found, and why it matters

When we searched for **"dental hospital near Abids"**, your website did not appear. More tellingly, **not one of the ten results was actually about Abids** — they were general Hyderabad pages. Abids is right next to your Nampally clinic. You are very likely the most convenient dental hospital for someone searching there, and Google currently has no page from you that says so.

The same was true for Masab Tank, which sits next to your Mehdipatnam clinic. We searched for root canal treatment there and found **no pages about Masab Tank at all**.

We then checked what your competitors have built. We examined the full page lists of thirteen Hyderabad dental websites — around 4,800 pages between them. For Abids, Begum Bazaar, Afzalgunj, Basheer Bagh, Masab Tank, Asif Nagar, Gudimalkapur and Malakpet, they have **zero pages between them**. The large chains have concentrated on the IT corridor — Kondapur, Madhapur, Gachibowli. **The old city, where your clinics actually are, is almost untouched online.**

That is an unusually good position to be in. It is also why we would rather move now than later: nothing stops those chains from extending southward, and they already own the page templates to do it.

### What comes next

**1. Four neighbourhood pages, not fifteen.** One page each for Abids and Begum Bazaar pointing to Nampally, and Masab Tank and Asif Nagar pointing to Mehdipatnam. Each page will explain which of your clinics is nearest, how to get there from that neighbourhood, when it is open, which treatments are available and which dentist a patient will see.

We want to be straight with you about why four and not fifteen. Google actively ignores pages that are near-copies of each other. We examined a website that had built 708 pages this way and measured it: **99.65% of the text on their Hyderabad page is identical to their Bengaluru page.** The only difference is the city name. We are not going to do that to your website. Four pages that genuinely help someone from Abids are worth far more than fifteen that only swap a place name — and four is the number we can fill with real, accurate local information in the time we have.

**None of these pages will suggest you have a clinic in those areas.** They will clearly say your clinics are in Nampally and Humayun Nagar, and that is deliberate — both because it is true and because claiming otherwise breaks Google's rules and risks everything you have already gained.

**2. The most valuable change is not a new page at all.** Your seven treatment pages are detailed and well built. But not one of them says which dentist stands behind the medical information on it. Google's own published guidance asks, in its own words, whether content is "written or reviewed by an expert". You employ the experts. Your website does not say so.

We want to add, to every treatment page, a line naming the dentist who wrote or reviewed it, their qualification, and the date they reviewed it. For a medical website, Google treats trust as the single most important factor. This is a small change to existing pages and, in our judgement, the highest-value thing we can do in the next two months.

**3. A founder's page.** Dr. Mohd. Siraj Ur Rahman is the most qualified and recognised person named anywhere on your website, and he currently has no page of his own — only a mention part-way down the About page. He should have a proper page. We also noticed that in one neighbourhood we researched, the pages beating everyone else were individual doctors' pages at a hospital group. Named, real clinicians compete well.

**4. Six patient-question articles.** Your website has no articles at all. Your competitors have between 89 and 576. We are not proposing to catch up on volume — we are proposing six genuinely useful articles answering questions patients actually ask before they book: what the signs are that you need a root canal, whether it hurts, what affects the cost, who is suitable for implants. Every one reviewed by a dentist before it goes live.

We should be honest: six articles are unlikely to bring in patients within sixty days. Their value builds over the following months. We are starting them now because starting later costs more.

**5. Fixing your contact details.** Your website currently shows three different phone numbers, and the one used on every "Call NeoDent" button does not appear in the information Google reads about your business. Your business name also appears as both "Neodent Dental Hospital" and "Neodent Dental Hospitals". These are small, quick fixes, and for local search they matter more than they look.

**6. Your two Google Business listings.** We will check both against Google's rules and set the service areas correctly. This is the only legitimate way to tell Google which surrounding neighbourhoods you serve.

**7. A content system — not yet.** You asked about adding a content management system so pages can be built from reusable blocks. We looked at your code carefully, and our honest recommendation is **not in these two months.** It would take most of the time available, and at the end you would have a better admin screen and roughly the same number of pages. What is actually slowing us down is not software — it is that we need you to confirm which dentist reviews which page, and to give us verified directions from each neighbourhood.

We will build the page structure so that adding the system later is straightforward, and we will tell you plainly when it is worth the cost — for example, when you want to publish pages yourself without a developer.

### What you will receive

- Four neighbourhood pages, published only once the information on them has been verified by you
- All seven treatment pages updated with a named dentist and review date
- A page for Dr. Mohd. Siraj Ur Rahman, and expanded detail for your other dentists
- Cost-explanation sections on the root canal and dental implant pages, if you are comfortable publishing them
- Six patient-question articles, each reviewed by a dentist
- Corrected phone numbers, business name and clinic naming across the website and both Google listings
- Both Google Business listings reviewed and corrected, with service areas set
- Updated sitemap and improved links between your pages
- Search Console monitoring set up properly, with a baseline we can measure against
- A report at day 60 showing what was published, what Google did with it, and a clear recommendation on whether to continue expanding

### What success will look like

We will judge this on four things: the new pages being indexed by Google; your website starting to appear for searches naming these neighbourhoods, which it does not today; more searches that are not simply people typing your name; and enquiries or calls we can trace to the new pages.

### What we will not promise

We will not promise you the number one position for any search, or a date by which it will happen. Google decides that, and anyone who promises otherwise is guessing.

We also want to set one expectation clearly. For the map results with the pins, Google has published that **distance from the searcher is one of its main factors.** No page on your website can make your clinic closer to Abids. What these pages can realistically do is win the ordinary search results above and below those map pins — which, as we found, is currently wide open in your part of the city.

And if, after sixty days, the evidence does not support building more neighbourhood pages, we will tell you that and recommend stopping. Knowing that after four pages is much cheaper than finding it out after fifteen.

---

## 24. Risks, Dependencies and Required Approvals

### 24.1 Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | **Area pages clustered by Google** and canonicalised to one another or to the clinic page | Medium | High | The 70/30 content ratio; the <30% similarity gate enforced in the audit script; four pages rather than eleven; monitoring via URL Inspection in Phase 4 |
| 2 | **Clinic cannot supply verified local facts** in time | **Medium-High** | **High — blocks publication** | Gates block publication rather than allowing invented content; Phase 1 front-loads the request; pages publish individually as facts arrive rather than as a batch |
| 3 | **Clinical review capacity unavailable**, delaying articles and attribution | Medium | High | Attribution on existing pages needs a decision, not writing time — do it first; article cadence is paced by review, explicitly, in Section 14.5 |
| 4 | **Locality-qualified search demand is thinner than the competitive vacuum suggests** | **Medium — this is the central strategic risk** | Medium-High | No volume data was available **[Requires validation]**; Export 2 in Section 22.1 tests this cheaply in Phase 1 before most spend; four pages cap the exposure |
| 5 | Organic demand exists but is captured by the map pack, where distance governs | Medium | Medium | Expectations set in Sections 18.1 and 23; measured separately via Profile Insights |
| 6 | **Doorway or scaled-content perception** despite good intent | Low | **Severe** | Compliance verdict in 8.9; publish gate in 16.5; no treatment×locality grid; each page is the destination; no fabricated entities |
| 7 | Pressure to add `aggregateRating` because a competitor has it | Medium | Medium | Policy quoted verbatim in 8.6; the existing code comment already documents the correct reasoning; protect the decision |
| 8 | Pressure to expand to 10–15 pages before evidence | **Medium-High** | High | Expansion thresholds fixed in advance in 12.3, including the explicit option of not expanding |
| 9 | Treatment-page edits damage pages that currently perform | Low | **High** | Additive changes only; no URL changes; no content removal; `content-snapshot.json` baselines already exist **[Verified]** |
| 10 | No analytics access, so outcomes cannot be attributed | Medium | High | Blocking dependency raised as Phase 1 item 1 |
| 11 | Cost content becomes stale and misleads patients | Medium | Medium | Publish factors rather than fixed prices unless the clinic commits to maintenance; date-stamp |
| 12 | Brand/NAP changes briefly disturb existing local signals | Low | Medium | Change site, schema and both profiles together, not sequentially |
| 13 | Competitor chains extend their grids into the old city | Low-Medium in 60 days | Medium long-term | Speed on the four pages; the moat is genuine local depth they cannot template |
| 14 | A Google ranking update changes outcomes mid-window | Low-Medium | Medium | Outside anyone's control; report it as a confounder rather than absorbing it into the narrative |
| 15 | Publishing content for services not actually offered | Low | **High — clinical and trust risk** | Section 13.1 verification gate before any whitening, extraction, gum or crown content |

### 24.2 Dependencies

| Dependency | Owner | Blocks | Needed by |
|---|---|---|---|
| Search Console access | Client | All measurement, Section 22 entirely | **Day 1** |
| Analytics access | Client | Conversion measurement | Day 1 |
| Both Business Profile access | Client | Section 18 | Day 1–3 |
| Clinician-to-treatment-page review mapping + publishable qualifications | **Client** | The highest-value fix | **Day 1–5** |
| Verified routes, travel times, landmarks ×4 localities | **Client** | All area pages | **Day 3–7** |
| Per-branch clinician and treatment availability | Client | Area pages, treatment blocks | Day 3–7 |
| Confirmed actual treatment list | Client | Prevents content for services not offered | Day 1–5 |
| Canonical phone decision | Client | NAP fix | Day 1–3 |
| Brand name decision | Client | NAP fix | Day 1–3 |
| Mehdipatnam/Humayun Nagar naming decision | Client | Clinic page + area pages | Day 1–5 |
| "25,000+" source or removal | Client | Homepage accuracy | Day 1–7 |
| Pricing-disclosure decision | Client | Cost sections, article 3 | Day 15–20 |
| Branch photography incl. signage | Client | Area pages, profiles | Day 7–20 |
| Patient consent for any quoted testimonial | Client | Testimonial blocks | Before use |
| Developer capacity | Consultant | Phases 2–3 | Day 8 onward |
| Clinical reviewer time, recurring | **Client** | Every article | Day 20 onward |

### 24.3 Approvals required before publication

**[Recommended]** Each recorded in the matching `docs/internal-pages/` directory, consistent with the existing process **[Verified pattern]**:

| Approval | Approver | Applies to |
|---|---|---|
| Local facts are accurate | Clinic owner | Every area page |
| Clinical accuracy | Named reviewing clinician | Every article; every treatment-page clinical edit |
| Qualifications as published | Each named clinician | Attribution blocks, doctor pages |
| Branch treatment availability | Clinic owner | Area pages, treatment blocks |
| Pricing disclosure | Clinic owner | Cost sections |
| Photograph usage | Clinic owner | Area pages, profiles |
| Testimonial usage | Patient + clinic owner | Testimonial blocks |
| Business name and NAP | Clinic owner | Site-wide, both profiles |
| Removal or sourcing of the "25,000+" claim | Clinic owner | Homepage |
| Final publish | Clinic owner + consultant | Each page, against the eight gates |

---

## 25. Final Strategic Recommendation

### 25.1 The decision

**Adopt a hybrid of Model A and Model D: keep strengthening the two clinic pages and seven treatment pages, and add four genuinely useful neighbourhood pages under a new `/areas/[slug]` namespace. Do not introduce Sanity CMS in this window. Make named clinical attribution on the existing treatment pages the first deliverable, not the last.** **[Recommended — High confidence]**

The reasoning in one line each:

1. **Four area pages, not fifteen** — because Google clusters near-identical pages and picks its own canonical regardless of hints, and four is the number that can carry verified local substance within the window.
2. **`/areas/`, never `/clinic/`** — because `/clinic/` holds two genuine `Dentist` entities and must not imply branches that do not exist.
3. **No treatment×locality grid** — because 7 × 11 pages of the same procedure explanation is the measured Tirumala failure mode and would compete with the site's strongest existing asset.
4. **Attribution first** — because it is low effort, high value, addresses a verbatim Google quality question on YMYL content, and applies to the pages already performing.
5. **No CMS yet** — because the bottleneck is clinical review and verified local facts, not developer throughput, and a CMS changes nothing Google can see.
6. **Measure before expanding** — because no keyword volume data was available, so the central strategic assumption remains untested, and four pages cap the exposure while testing it.

### 25.2 Answers to the eighteen strategic questions

**Q1. Should NeoDent create dedicated geographical landing pages for nearby localities?**
**Yes, selectively.** Google's doorway policy is behavioural, not geographic — the violation is "pages targeted at specific regions or cities **that funnel users to one page**", not targeting an area where you have no premises. A page that answers the question on the page is compliant. The evidence is favourable: zero competitor URLs exist for these localities, and the Abids query returned ten results with none about Abids. **[Observed]** The clinic pages already name these localities in one sentence **[Observed]**, so the catchment is the business's own. **Confidence: Medium-High** — policy and competitive position are verified; organic demand is **[Requires validation]**.

**Q2. Is starting with 3–4 pages right, while evaluating 10–15?**
**Yes — four, with eleven evaluated and eight explicitly deferred.** Four allows ≥150 words of genuinely unique local content per page plus verified routes and photography, keeps clustering risk low, and produces a readable Search Console signal with two pages per branch. Expansion thresholds are fixed in advance in Section 12.3, including the option of not expanding. **Confidence: High.**

**Q3. Which neighbourhoods should be prioritised for Nampally?**
**Abids and Begum Bazaar.** Abids is adjacent, already named on the clinic page, and the query returned nothing about Abids with NeoDent absent **[Observed]**. Begum Bazaar is a distinct market catchment, already named, and its query fell back to partial token matching for want of content **[Observed]**; Nampally's 10:30–17:00 hours suit a daytime market population. Phase 2: Basheer Bagh, then Afzalgunj — possibly merged with Begum Bazaar if the honest content overlaps. Phase 3: Santosh Nagar. **Malakpet should be served by doctor pages instead**, because the observed winners there were a hospital group's per-practitioner pages **[Observed]**. **Confidence: Medium** — ordering rests on observed search results and adjacency, not volume data.

**Q4. Which neighbourhoods should be prioritised for Mehdipatnam?**
**Masab Tank and Asif Nagar.** Both adjoin Humayun Nagar where the branch sits, both already named on the clinic page, and the Masab Tank root-canal query returned **zero** Masab Tank pages **[Observed]**. Phase 2: Gudimalkapur. **Humayun Nagar must never be an area page — it is the branch's own postal locality** **[Verified]**; fix the naming on the clinic page instead. **Tolichowki is not recommended at all:** three resident clinics took positions 1–3, one with a 9-URL site **[Observed]**, and NeoDent is proximity-disadvantaged where Google names distance a primary factor. **Confidence: Medium-High.**

**Q5. Should neighbourhood pages target general dental searches or specific treatments too?**
**Both, on one page.** Each area page should target the general locality intent ("dental clinic near Abids") in its title and H1, and cover treatments as a **linked section** that routes to the existing treatment pages. It must not re-explain procedures. This captures treatment+locality intent without creating a separate URL per treatment. **Confidence: High.**

**Q6. Should every neighbourhood have a separate root canal treatment URL?**
**No. This is the clearest no in the document.** Seven treatments × eleven localities is 77 URLs whose primary content would be the same procedure explanation with a swapped place name — the named doorway example, the measured Tirumala failure mode (99.65% identical), and a direct competitor to the seven treatment pages that are currently the site's strongest asset. Instead, each area page carries a treatment section linking to the single canonical treatment page. Revisit only if a specific area page shows real treatment-qualified impressions and a genuinely different story to tell — and even then, one page, not a grid. **Confidence: High.**

**Q7. What is the most suitable URL architecture?**
**`/areas/[slug]`**, with `/areas` as a hub page in the main navigation. `/areas` currently 404s **[Observed]** so there is no migration cost; it is semantically honest; and it keeps a hard boundary against `/clinic/[slug]`. Rejected: `/locations/` (implies a place of business), `/dental-clinic-near/` (keyword-first, and the pattern that produces stacked variants), and extending `/clinic/` (would imply non-existent branches). **No existing URL changes, no redirects, no migrations.** **Confidence: High.**

**Q8. Is Sanity CMS worth introducing into this codebase?**
**Not in this 60-day window.** There is no CMS today; content lives in typed TypeScript modules that already enforce required SEO fields at compile time **[Verified]**, governed by a working approval process in `docs/internal-pages/` **[Verified]**. A CMS produces no patient-visible page and no direct ranking signal; the actual bottleneck is clinical review and verified local facts; and migrating seven substantial treatment modules would risk the site's best asset mid-engagement. Build the block registry in TypeScript with CMS-compatible component contracts so a later migration is a data-source swap. Revisit against the five explicit triggers in Section 15.5. **Confidence: High.**

**Q9. Will a modular block architecture make publishing more efficient, and which SEO benefits are indirect rather than direct?**
**Yes for efficiency — and the SEO benefits are almost entirely indirect.** Direct: none. Google evaluates rendered HTML, which is identical either way. Indirect: consistent emission of titles, descriptions, canonicals and schema on every new page; structural completeness enforced in types; faster publishing so editorial effort goes into local substance rather than scaffolding; and — most importantly — the publish gate becomes **enforceable in code**, which is what keeps the programme on the right side of the scaled-content policy under deadline pressure. That last point is the strongest argument for blocks, and it is a quality-control argument, not a ranking one. **Confidence: High.**

**Q10. Which blocks should be built first?**
**1. Author/clinical reviewer** — unblocks the highest-value fix on seven existing pages and is needed by every article. **2. Clinic details** (register the existing `BranchCards`) — every area page depends on it. **3. Local introduction** — carries the unique content that makes area pages viable. **4. Directions including landmarks** — the differentiator. **5. Area-scoped FAQ.** **6. Related locations** — builds the browseable hierarchy that answers the fourth doorway test. Roughly ten further blocks are **registrations of existing components** rather than new builds **[Verified]**, and four proposed blocks should be rejected as duplicative. **Confidence: High.**

**Q11. Which existing treatment pages should be strengthened?**
**All seven, with the same three changes, in this order of page priority: Root Canal Treatment, Dental Implants, Braces & Orthodontics, then the remaining four.** The three changes: named author and clinical reviewer with review date (critical); a branch-availability block (high); and a "what affects the cost" section on root canal and implants only (high, subject to a pricing decision). Also de-duplicate the FAQs shared with `/treatments` and fix the empty `alt` attributes and duplicated headings. **No new treatment pages in this window** — none of the identified gaps requires one. **Confidence: High.**

**Q12. Which blogs have the best strategic opportunity?**
**Six articles in two clusters.** Root canal cluster: signs you may need a root canal; does a root canal hurt; what affects the cost of root canal treatment in Hyderabad; aftercare. Implants cluster: who is a suitable candidate; recovery and aftercare. Cost content is the standout opportunity — two of the top seven results for the observed Masab Tank query were cost pages **[Observed]** and NeoDent has none. Each article needs a named clinical reviewer. **Explicitly not recommended:** "how to choose a dental hospital" and "what to consider when choosing a dentist" — self-serving, hard to make genuinely useful, and attached to no commercial intent. **Confidence: Medium** — the gap is verified; per-topic demand is **[Requires validation]**.

**Q13. How should blog articles, treatment pages, clinic pages and neighbourhood pages link to each other?**
Homepage → three hubs (`/clinic`, `/treatments`, `/areas`). Area page → its primary clinic page (the conversion path), out to treatment pages (never re-explaining), and to neighbouring published areas. Treatment page → clinic pages via branch availability, and down to two or three articles. Article → up to its pillar treatment page, and to a clinic page only where the intent is urgent. Doctor pages are cited as author/reviewer from treatment pages and articles, which converts attribution into internal authority flow. `/areas` must be in the main navigation — burying it is exactly what the reference site does wrong **[Observed]**. Anchors varied and descriptive; **no bare place-name lists anywhere**, including footers. **Confidence: High.**

**Q14. What can realistically be accomplished in 60 days?**
Published: four area pages (gated on verified facts), attribution on all seven treatment pages, a founder page plus expanded `/doctors`, cost sections on two treatment pages, six reviewed articles, the `/areas` hub, corrected NAP and brand naming, both Business Profiles corrected with service areas set, schema improvements (`areaServed`, `openingHoursSpecification`, `geo`), an internal-linking rebuild, and a measurement baseline with a day-60 report. **Not** accomplishable: a CMS migration, 10–15 area pages at the required standard, a treatment×locality grid, or any guaranteed ranking. **Confidence: Medium-High** — the development work is modest and the risk is concentrated in client-supplied facts.

**Q15. Which KPIs will demonstrate progress to the doctor?**
Separate three tiers. **Execution** (fully controllable, report as delivery): pages published through the gate, 7 of 7 treatment pages with attribution, articles reviewed, NAP consistent, profiles corrected. **Leading indicators** (the real signal at 60 days): indexation of all four area pages with none marked "Duplicate, Google chose a different canonical"; impressions on each new URL; **count of distinct locality-qualified queries receiving impressions** — the single best measure of this programme; non-branded query share. **Business outcomes**: enquiries, calls, direction requests, booked appointments — tracked, but not the sole measure at this volume. All baselines currently read **"Baseline required"**; no numerical target may be set until the Day-1 exports exist. Agree in advance that **site-wide average position may fall while the programme succeeds**, because new pages add new lower-position queries. **Confidence: High.**

**Q16. Which activities should be prioritised for faster legitimate visibility?**
In order: **(1)** author/clinical-reviewer attribution on the seven treatment pages — high impact, low effort, applied to pages already performing; **(2)** NAP consistency across site, schema and both profiles; **(3)** Business Profile corrections and service-area configuration; **(4)** the four area pages; **(5)** founder page and expanded `/doctors`; **(6)** `areaServed` and `openingHoursSpecification` in schema; **(7)** cost sections; **(8)** internal linking and the `/areas` hub. Items 1–3 are the fastest legitimate wins because they improve assets that already have traction rather than waiting on new pages to be discovered. **Performance optimisation is deliberately unscheduled** until field data justifies it. **Confidence: High.**

**Q17. What should we absolutely avoid?**
Treatment×locality URL grids. Place-name substitution as differentiation. Bare city lists in copy, headings or footers. Any Business Profile for a locality without a staffed, signed, customer-receiving presence. `aggregateRating` on your own business. Stacked intent-variant URLs for one locality. Publishing an area page before its local facts are verified. Any page implying a branch that does not exist. Fabricated testimonials, outcomes, statistics or credentials. Content for services not actually offered. Changing or redirecting existing URLs without a documented reason. Automated link building, paid or fake citations, review incentivisation. Promising rankings or ranking dates. And — the one most likely to be proposed internally — **expanding to ten or fifteen area pages before the first four have been measured.** **Confidence: High.**

**Q18. What is the final recommended next-stage scope?**
A 60-day programme with four workstreams: **(a) Trust** — attribution on seven treatment pages, founder page, expanded `/doctors`; **(b) Local** — four `/areas/` pages plus a hub, `areaServed` schema, NAP and brand fixes, both Business Profiles corrected; **(c) Content** — six clinically-reviewed articles in two clusters, cost sections on two treatment pages; **(d) Measurement** — baseline exports, Search Console monitoring, a day-60 report with an evidence-based expand/hold/stop recommendation. Explicitly out of scope: Sanity CMS, treatment×locality grids, more than four area pages, new treatment pages, and performance work absent field data. **Confidence: High.**

### 25.3 Report quality self-assessment

Scored against the client's rubric. Scored honestly; an inflated figure would defeat the purpose of having one.

| Dimension | Weight | Score | Reasoning |
|---|---:|---:|---|
| Actual codebase research | 15 | **14 / 15** | Framework, routing, sitemap, robots, schema, NAP, content modules, components and governance docs all read directly with file paths and line references; the absence of any CMS positively verified; the dynamic-route precedent found and used as the implementation template; Next.js conventions checked against the bundled version docs. Short of full marks: component internals and CSS modules were inventoried rather than read individually. |
| Live website audit | 10 | **10 / 10** | All 17 URLs fetched and confirmed 200; titles, descriptions, canonicals, H1s, robots, `alt`, OG and JSON-LD captured per page; host and trailing-slash canonicalisation and true-404 behaviour tested; blog absence probed across six candidate paths; seven consistency findings documented with evidence. |
| Competitor and keyword research | 15 | **11 / 15** | Competitor side is strong: 16 businesses, 13 sitemaps expanded (~4,800 URLs), 7 live queries with full result orders, measured duplication with quoted samples, and the (a)/(b)/(c) distinction proven with the Clove case. **Keyword side is the weak point: no volume, competition or difficulty data was obtainable**, so Section 09 is explicitly qualitative. This is the single largest deduction and it is real. |
| Google policy validation | 15 | **15 / 15** | Ten official documents fetched; doorway, scaled-content, keyword-stuffing, canonicalisation, AI-content, E-E-A-T, `LocalBusiness` and GBP policies quoted verbatim with URLs; a factual error in the brief's own citation corrected (7091 is not the eligibility policy); two commonly-cited documents confirmed no longer to exist standalone; each policy question answered against the quoted wording. |
| Location opportunity analysis | 10 | **8 / 10** | Twelve localities assessed, branch-mapped, prioritised into four tiers with reasoning; the 20–30 km rule critically rejected and replaced with a five-part test; Humayun Nagar correctly excluded as the branch's own locality; Tolichowki excluded on observed evidence. Deduction: **no distance or travel-time data was obtainable**, so adjacency is qualitative and every route is marked for validation. |
| CMS and architecture recommendations | 15 | **14 / 15** | CMS absence verified rather than assumed; a reasoned "not yet" with five explicit reopening triggers; block registry evaluated block-by-block against existing components with four rejections; five page schemas specified; an eight-condition publish gate designed to be enforced by an audit script that already exists; routing specified against the installed version's actual conventions and the in-repo precedent. Deduction: no proof-of-concept was built, as the brief forbade code changes. |
| 60-day implementation plan | 10 | **9 / 10** | Four phases, 45 numbered actions with owners, dependencies and priorities; sequenced so engineering proceeds while facts are gathered; activities ranked by impact, effort and confidence; five explicit non-promises. Deduction: durations are judgement, not measured team velocity. |
| Business relevance and actionability | 5 | **5 / 5** | A doctor-facing section in plain language; two implementable page blueprints; a 15-item verification checklist for the 24 November conversation; a tiered KPI framework; recommendations tied to the real two-month constraint. |
| Source traceability and accuracy | 5 | **5 / 5** | Every material claim labelled Verified / Observed / User-reported / Inferred / Recommended / Requires validation; file paths for codebase findings; URLs for policy quotes; search results reported in observed order; fetch failures declared; no fabricated metric anywhere. |
| **Total** | **100** | **91 / 100** | |

**Score: 9.1 / 10.** It meets the benchmark, carried by the policy, live-audit and codebase work, and held back principally by the absence of keyword volume data.

**The three exports that would close the remaining gap**, in priority order:

1. **Search Console query export** (Section 22.1, item 2) — would convert Section 09 from qualitative to evidence-based and would directly test the central strategic assumption, that locality-qualified demand exists in the old city.
2. **Keyword Planner access for the Hyderabad locality + treatment set** — would supply the volume and competition columns the rubric expects.
3. **Measured driving distances and travel times** for the four Phase-1 localities at two times of day — would complete Section 10 and unblock every Directions block.

**[Inferred]** Until export 1 exists, the four-page cap is not caution for its own sake; it is the correct response to a genuinely untested assumption.

---

## 26. Source Register

### 26.1 Official Google documentation (fetched 23 November 2026)

| Document | URL |
|---|---|
| Spam policies for Google web search — incl. Doorway abuse, Scaled content abuse, Keyword stuffing | https://developers.google.com/search/docs/essentials/spam-policies |
| Creating helpful, reliable, people-first content — E-E-A-T, YMYL, self-assessment questions | https://developers.google.com/search/docs/fundamentals/creating-helpful-content |
| Local business (`LocalBusiness`) structured data | https://developers.google.com/search/docs/appearance/structured-data/local-business |
| General structured data guidelines (content, relevance, location, specificity) | https://developers.google.com/search/docs/appearance/structured-data/sd-policies |
| What is canonicalization — clustering and centerpiece | https://developers.google.com/search/docs/crawling-indexing/canonicalization |
| How to specify a canonical URL | https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls |
| Google Search's guidance about AI-generated content | https://developers.google.com/search/blog/2023/02/google-search-and-ai-content |
| Tips to improve your local ranking on Google — relevance, distance, prominence | https://support.google.com/business/answer/7091 |
| **Guidelines for representing your business on Google** — the actual eligibility policy | https://support.google.com/business/answer/3038177 |
| schema.org/Dentist | https://schema.org/Dentist |
| Rich Results Test | https://search.google.com/test/rich-results |
| Schema Markup Validator | https://validator.schema.org/ |

**Correction recorded:** the brief cited `support.google.com/business/answer/7091` as the Business Profile guidelines. That document is "Tips to improve your local ranking on Google". The eligibility and representation policy is `answer/3038177`. Both were fetched; both are quoted in Section 08.

**Documents confirmed not to exist as standalone pages:** a separate "doorway pages" guide (now only the Doorway abuse section of the spam policies) and a separate "duplicate content penalty" page (covered by the two canonicalisation documents).

### 26.2 Framework documentation (bundled with the installed version)

| Document | Path |
|---|---|
| `generateStaticParams` API reference — confirms `params` is a `Promise`; `dynamicParams` behaviour | `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md` |
| JSON-LD implementation guide — `<script type="application/ld+json">` with `\u003c` escaping | `node_modules/next/dist/docs/01-app/02-guides/json-ld.md` |
| `generateMetadata` API reference | `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` |
| `sitemap` file convention | `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` |
| Metadata and OG images | `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` |

### 26.3 NeoDent sources — live site

Homepage and all 17 sitemap URLs: `https://www.neodentdentalhospitals.com/` · `/about` · `/doctors` · `/doctors/dr-miftah-ur-rahman` · `/treatments` · `/treatments/dental-implants` · `/treatments/full-mouth-rehabilitation` · `/treatments/root-canal-treatment` · `/treatments/braces-and-orthodontics` · `/treatments/composite-build-up` · `/treatments/smile-design` · `/treatments/scaling-and-polishing` · `/clinic` · `/clinic/mehdipatnam` · `/clinic/nampally` · `/contact` · `/privacy-policy`

Also fetched: `/robots.txt`, `/sitemap.xml`. Probed and confirmed 404: `/blog`, `/blogs`, `/articles`, `/news`, `/insights`, `/resources`, `/areas`, `/locations`, `/terms`, `/this-page-does-not-exist-xyz`.

### 26.4 NeoDent sources — repository

`package.json` · `app/sitemap.ts` · `app/robots.ts` · `app/layout.tsx` · `app/clinic/[slug]/page.tsx` · `app/clinic/page.tsx` · all seven `app/treatments/*/page.tsx` · `app/doctors/page.tsx` · `app/doctors/dr-miftah-ur-rahman/page.tsx` · `app/api/enquiry/route.ts` · `lib/site-data.ts` · `lib/clinic-data.ts` · `lib/structured-data.ts` · `lib/treatment-data.ts` · `lib/treatments-hub.ts` · `lib/root-canal-treatment-page.ts` · `lib/braces-orthodontics-page.ts` · `lib/smile-design-page.ts` · `lib/scaling-and-polishing-page.ts` · `lib/full-mouth-rehabilitation-page.ts` · `lib/composite-build-up-page.ts` · `lib/dental-implants-page.ts` · `lib/miftah-treatment-dossiers.ts` · `lib/miftah-press-archive.ts` · `lib/enquiry-schema.ts` · `lib/featured-treatment-catalog.ts` · `lib/og-image.tsx` · `components/ui/*` · `scripts/seo-content-audit.mjs` · `scripts/page-content-snapshot.mjs` · `docs/internal-pages/**` · `.env.example` · `next.config.ts` · `tsconfig.json`

### 26.5 Competitor sources

eledenthospitals.com · parthadental.com · fmsdental.com · clovedental.in · drwhitedentalcare.com · drgowdsdental.com · thedentalspecialists.in · smiline.com · marwadental.com · sanadentalcare.com · ssquaredentalcare.in · krishnadentalhospitals.com · parkdentalcare.in *(sitemap fetch failed)* · revivedental.in *(TLS failure)* · hyderabaddental.co.in *(sitemap fetch failed)* · dentwindental.com *(sitemap fetch failed)*

Also appearing in observed search results: dentistsmilecare.com · drjaydevdental.com · medicoverhospitals.in · carehospitals.com · tootdental.com · microcuredental.com · consult.gadentalclinics.com · kiwidentalhospitals.com · thepuredentistry.com · kimssunshine.co.in · continentalhospitals.com · drsmiles.co.in · happy-dental-hospital.com · sscds.edu.in · practo.com

### 26.6 Reference site

https://www.tirumalarackingsystems.com/ — homepage, `/robots.txt`, `/sitemap.xml` (708 URLs), `/market-area.html`, `/hyderabad/`, `/bengaluru/`, `/chennai/`, `/pune/`, `/hyderabad/pallet-racks.html`, `/bengaluru/pallet-racks.html`, `/chennai/pallet-racks.html`, `/suppliers/pallet-racks.html`, `/exporters/pallet-racks.html`

### 26.7 Sources explicitly unavailable

Google Search Console · Google Analytics · Google Business Profile (both branches) · Google Keyword Planner · Ahrefs · Semrush · Moz · any rank tracker · Google Maps local pack · any routing or distance API · CrUX / Core Web Vitals field data · NeoDent's enquiry, call or appointment records.

**Every dependent claim in this report is marked [Requires validation] rather than estimated.** The exports needed to close each gap are listed in Sections 22.1 and 25.3.

---

*Prepared 23 November 2026 for the business discussion on 24 November 2026. Research and strategy deliverable only — no application code was created, modified or deployed. All recommendations are proposals requiring client approval before implementation.*
