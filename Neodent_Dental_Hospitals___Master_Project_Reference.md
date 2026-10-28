# Neodent Dental Hospitals — Master Project Reference

Oct 26, 2026 · @Ravi-Master · Version 2 (adds the treatment-page build system; the Dental Implants and Full Mouth Rehabilitation pages are built)

This is the single source of context for building the Neodent treatment and location pages. Paste it at the start of any new Claude chat, together with the Treatment Page Research Pack (PDF), the latest screenshots, and the Codex audit report for the page you are working on (section 13 explains each).

## 1. How to use this document

**For the person pasting it:** paste this whole document at the start of a new Claude chat, then add:

1. The **Treatment Page Research Pack** (PDF). Claude works from the section for the treatment you are building.
2. **Screenshots**: the latest home page, and the finished Dental Implants and Full Mouth Rehabilitation pages (full-page captures at about 1280 px wide). These are the quality bar.
3. The **Codex audit report** for the treatment (what assets, copy and code already exist). If you do not have it yet, ask Claude for the Codex audit prompt first (section 13, template A).
4. One line saying which page you are working on.

You should not need to re-explain the goals, the design strategy, the content rules, the diagram strategy or the workflow. They are all in this document.

**For the Claude reading it:** you have no memory of earlier chats and no access to the codebase. Treat this document as the source of truth. Ravi's workflow has three roles: **Claude writes the prompts**, **Codex** (which can read the whole codebase) audits the project read-only, and **Kiro CLI running Sonnet 5.5** implements the pages.

1. Do not invent facts about the clinic, doctors, prices, timelines or equipment. If a fact is not here or in the research pack, ask or mark it as unverified.
2. Follow section 6 (design), section 8 (compliance), and sections 14 to 16 (lessons, design strategy, illustration strategy) on every output. The owner wants zero generic AI design taste.
3. Each treatment page is hand-built with its own structure. Never propose one dynamic `[slug]` template for the seven treatments.
4. Do not write an implementation prompt for a treatment until you have the Codex audit for it. If you do not have it, write the Codex audit prompt first (section 13, template A).
5. Implementation prompts go to Sonnet 5.5 in Kiro CLI and come in **two builds**: Build 1 is the page, data, SEO and layout; Build 2 is the illustrations and icons (templates B and C). Each prompt is self-contained: exact routes, exact copy, a read-first step, boundaries, a quality loop and a final report.
6. Copy the pattern of the two built pages (section 15), do not reinvent it. Treatment pages 2 and 6 are owner-approved reference builds.
7. If this document conflicts with the research pack, the clinic's own written confirmation wins, then this document, then the research pack.
8. After each page is built, ask Ravi for the new screenshot, score it against sections 14 to 16, and give a short targeted polish prompt for anything under 9/10. Then update sections 3, 12 and 17.

## 2. Project snapshot

Neodent Dental Hospital is a Hyderabad dental clinic with two branches (Mehdipatnam and Nampally), founded in 1994 by Dr. Mohd. Siraj Ur Rahman. The website is a Next.js build by Ravi (agency BLOGSPAGE AI). The goal is seven hand-built treatment pages and two location pages, so each treatment can be found in local search (for example, root canal treatment in Nampally) and the pages reinforce each other through internal links. A second goal: the Neodent site is a flagship case study for Blogspage AI, so honest, measurable, high-quality work matters.

| Item | Status (26 Oct 2026) |
| --- | --- |
| Home page | Redesigned by hand to remove generic AI design. The latest home screenshot is the design reference. Some numbered chapter labels still show in places in a 26 Oct screenshot; do not copy them (section 6) |
| About, Clinic and Contact pages | Redesigned to match home (the About page was finished by 26 Oct and is an owner-approved reference; the Clinic and Contact prompts were issued 26 Oct). See section 17 |
| Other existing pages | `/doctors`, `/doctors/dr-miftah-ur-rahman`, `/treatments`, `/privacy-policy` |
| Treatment content | Research done for all seven treatments (Research Pack dated 24 Oct 2026) |
| Treatment pages | **2 of 7 built and owner-approved on 26 Oct 2026: Dental implants and Full mouth rehabilitation.** Five remain: composite build-up, root canal treatment, braces and orthodontics, smile design, scaling and polishing |
| Location pages | Not started |
| Inspiration | drmotiwala.com, used for structure only (see section 9) |

The order of work: build the remaining five treatment pages one at a time, each through the workflow in section 13 (Codex audit, then Build 1, then Build 2, then polish). Then the two location pages, then repoint the old hub-anchor links to the new routes.

## 3. Page map

Nine pages to build. Each file lives at `app/<route>/page.tsx`. There are no dynamic `[slug]` routes.

| # | Page | Route | File | Status |
| --- | --- | --- | --- | --- |
| 1 | Composite build-up | `/treatments/composite-build-up` | `app/treatments/composite-build-up/page.tsx` | To build |
| 2 | Dental implants | `/treatments/dental-implants` | `app/treatments/dental-implants/page.tsx` | **Built, owner-approved (26 Oct 2026)** |
| 3 | Root canal treatment | `/treatments/root-canal-treatment` | `app/treatments/root-canal-treatment/page.tsx` | To build |
| 4 | Braces and orthodontics | `/treatments/braces-and-orthodontics` | `app/treatments/braces-and-orthodontics/page.tsx` | To build |
| 5 | Smile design | `/treatments/smile-design` | `app/treatments/smile-design/page.tsx` | To build |
| 6 | Full mouth rehabilitation | `/treatments/full-mouth-rehabilitation` | `app/treatments/full-mouth-rehabilitation/page.tsx` | **Built, owner-approved (26 Oct 2026)** |
| 7 | Scaling and polishing | `/treatments/scaling-and-polishing` | `app/treatments/scaling-and-polishing/page.tsx` | To build |
| 8 | Nampally clinic | `/clinic/nampally` | `app/clinic/nampally/page.tsx` | To build |
| 9 | Mehdipatnam clinic | `/clinic/mehdipatnam` | `app/clinic/mehdipatnam/page.tsx` | To build |

The route prefix `/treatments/<slug>` is settled (it is in use). Until a target page exists, every link to it uses the hub anchor `/treatments#<id>` (for example `/treatments#full-mouth-rehabilitation` was used before that page was built). When a page is built, find every such href with a search and change **only the href** (never the copy): the home service card, related-treatment cards on the other treatment pages, in-body links, and the FMR or implants link constants in `lib/dental-implants-page.ts`. The Full Mouth Rehabilitation build prompt asked for this; verify it was done.

Until the location pages exist, "Clinic details" buttons and branch links point to `/clinic#nampally` and `/clinic#mehdipatnam`.

**Existing pages that must link into the new ones**

| Page | Route | Change needed later |
| --- | --- | --- |
| Home | `/` | The seven service cards currently link to `/treatments#anchor`. Repoint each to its new page as it is built |
| Treatments directory | `/treatments` | Link each treatment card to its page |
| Clinic | `/clinic` | Link each branch card to its location page |
| Doctor profile | `/doctors/dr-miftah-ur-rahman` | Link out to relevant treatments and both clinics |
| Footer and navbar | all pages | Add treatment and branch links where they fit the design. The footer already lists all seven treatments |
| Sitemap | `app/sitemap.ts` | Add all new routes. Implants and full mouth rehabilitation are done; seven routes remain |

Spelling is **Mehdipatnam**, not "Medipatnam", in every URL and visible text.

## 4. Business facts

The Research Pack could not verify any clinic detail from the brief. The owner then approved the values below on 25 Oct 2026, taken from the site's code. Use them exactly as written. Anything not listed is unverified: do not add it.

| Field | Value | Status |
| --- | --- | --- |
| Brand name | Neodent Dental Hospital (site title). The footer lockup and the research pack say "Neodent Dental Hospitals" | **Spelling is "Neodent" everywhere, never "NeoDent" (owner rule).** Still open: singular or plural in titles, schema and the Google Business Profile (section 12, item 2) |
| Canonical host | `https://www.neodentdentalhospitals.com` | Owner-confirmed. Redirect from non-www is not visible in the repo; check hosting |
| Founded | 1994 | Owner-approved |
| Mehdipatnam address | 10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006 | Owner-approved |
| Mehdipatnam phone | +91 90306 48393 | Owner-approved |
| Mehdipatnam hours | 4:00 PM to 8:00 PM, Sunday holiday | Owner-approved. Schema currently says Mon to Sat |
| Nampally address | Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad, Telangana 500001 | Owner-approved |
| Nampally phone | +91 90305 98081 | Owner-approved |
| Nampally hours | 10:30 AM to 5:00 PM, Sunday holiday | Owner-approved |
| General call number | +91 92463 48485 | Owner-approved, used by the floating call button |
| Email | neodentdentalhospital@gmail.com | Owner-provided. Not yet in site data. Decide where it shows publicly |
| WhatsApp | None | The clinic has no WhatsApp number. Do not add a WhatsApp button |
| Services at each branch | All seven treatments at both branches | Owner-confirmed |
| Booking | Phone call or the enquiry form on `/contact`. No date and time scheduler | In code |

**Doctors (names exactly as approved)**

| Doctor | Details | Notes |
| --- | --- | --- |
| Dr. Mohd. Siraj Ur Rahman | Founder | Owner-approved spelling. The code has five variants; use only this one on new pages |
| Dr. Md. Miftah Ur Rahman | BDS, MDS, FICOI. Prosthodontist and Implantologist. Assistant Professor of Prosthodontics. Dedicated page at `/doctors/dr-miftah-ur-rahman` | Used on the doctor page. The owner types "Miftaur" in chat. Confirm one spelling |
| Dr. Md. Muti Ur Rahman and Dr. Muqeet-ur-Rahman | Appear in the team section | Spellings and roles not confirmed. Do not name them on treatment pages |

No clinician registration number exists in the code. Do not invent one. Do not call anyone a specialist (orthodontist, endodontist and so on) on a treatment page unless the qualification is confirmed in writing.

## 5. Tech stack and code conventions

Source: read-only Codex audit of the repo, 25 Oct 2026.

| Area | Finding |
| --- | --- |
| Framework | Next.js 16.3.1, App Router, React 19.2.8, TypeScript (strict) |
| Styling | `app/globals.css` plus CSS Modules per section. Tailwind 4 is installed but is not the main styling method |
| Fonts | Manrope (sans) and DM Serif Display (serif), loaded by a Google Fonts CSS import in `globals.css`, not `next/font` |
| Icons | `lucide-react` |
| Motion | CSS transitions and animations, `IntersectionObserver`, scroll events. No animation library. Some components honour `prefers-reduced-motion` |
| Images | Mix of `next/image` and native `<img>`. Prefer `next/image` on new pages |
| Forms | `components/contact/ContactEnquiryForm.tsx` posts to `/api/enquiry` with Zod validation, Cloudflare Turnstile and Resend. Env-based email config |
| Content data | TypeScript files: `lib/site-data.ts` (identity, phones, addresses, hours, nav), `components/sections/expertise-data.ts` (home service cards), `lib/treatment-data.ts`, `lib/structured-data.ts` (JSON-LD). No CMS, MDX or database |
| Repo rules | `AGENTS.md` warns that this Next.js version has breaking changes: read the installed Next docs before writing code. `CLAUDE.md` imports it |
| Layout pattern | `<div className="site">`, `Navbar`, `<main>`, `Footer`. Root layout already mounts the cookie consent and `FloatingCta` |

**Reusable components:** `Navbar`, `Footer`, `BrandLockup`, `AppButton` (variants `dark`, `light`, `ghost`, `primary`), `FloatingCta`, `EditorialHighlight`, `ContactEnquiryForm`, and selected pieces under `components/clinic/*`, `components/treatments/*`, `components/doctors/*`.

**Built since 26 Oct 2026:** a visual breadcrumb, a related-treatments strip, a doctor card, a location block, an FAQ accordion, `IllustrationFrame`, `SectionHeader` and an illustration kit. They live under `components/treatments/dental-implants/`, `components/treatments/full-mouth-rehabilitation/` and `components/treatment/illustrations/`. Copy their patterns for new pages and do not modify them in a page build (section 15).

**Known code issues (from the 25 Oct audit; status unknown since, section 12 item 16):** `npm run lint` reports 25 errors and 10 warnings (a temporary QA script, `set-state-in-effect` in two components, unescaped apostrophes in several treatment components). `tsc` passes. The footer "Terms" item is plain text, not a link. `README.md` still describes Geist and `next/font`, which is outdated. Do not mix fixes for these into a page-building prompt unless asked.

**SEO already in place:** `metadataBase`, a title template (`%s | Neodent Dental Hospital`), canonical per page, Open Graph and Twitter defaults, `robots.ts`, `sitemap.ts`, and JSON-LD for the organisation, both branches (as `Dentist`), the website, and the doctor profile with breadcrumbs. Added on the implants and full mouth rehabilitation pages (26 Oct 2026): `BreadcrumbList`, `MedicalWebPage` with a `MedicalProcedure`, and `FAQPage` generated from the visible FAQ data. Still not present: per-location page schema, analytics, Search Console verification, `hreflang`.

For the treatment-page file structure, data constants and illustration kit, see sections 15 and 16.

## 6. Design system rules

The owner's brief: internal pages must look like the home page, with a proper visual hierarchy and content grouped into cards. He wants zero "AI design taste". The home page is being redesigned by hand, so **ask for the latest home page screenshots before designing a page** and treat them as the reference over anything below. Also ask for the latest Dental Implants and Full Mouth Rehabilitation screenshots, which are the quality bar for treatment pages.

**Tokens (from `app/globals.css`)**

| Token | Value | Use |
| --- | --- | --- |
| `--neodent-red` | `#d71920` | Brand and action colour. The only strong accent |
| `--neodent-red-dark` | `#b5121a` | Hover and dark red |
| `--neodent-red-soft` | `#f8e3e2` | Soft red surface |
| `--neodent-ink` | `#263033` | Main text on light |
| `--neodent-charcoal` | `#161c1e` | Deepest dark |
| `--neodent-ivory` | `#f8f6ef` | Light section background |
| `--neodent-surface` | `#fffefa` | Card surface on light |
| `--neodent-muted` | `#657173` | Secondary text |
| `--neodent-border` | `rgba(38,48,51,0.16)` | Hairline borders |
| Treatment atlas dark | `#242628` with ivory `#f1eee7` text | The dark section pattern on home |
| `--neodent-green` family | `#16895c` and soft `#e3f1e8` | Defined but barely used. Do not make green a feature colour |

The palette for illustration artwork is scoped to the illustration kit and described in section 16. UI colours stay as above.

**Type**

- Sans: Manrope. Serif accent: DM Serif Display (regular and italic).
- Signature pattern: a sans headline with one phrase set in the serif accent, for example "Care begins the moment *you walk in.*" Keep it, but use it once per heading, not on every line.
- Sizes: section title `clamp(32px, 3.45vw, 52px)`, display chapter title `clamp(2.7rem, 4.4vw, 4.4rem)` with line-height 1.04 and letter-spacing -0.04em, eyebrow 10px with 0.2em tracking, body 15px at line-height 1.7, lede 16px (17px from 768px), body measure about 500px.
- Numbered chapter eyebrows (for example "01", "08") and large faint year or number marks sit behind some section headings. CORRECTION (26 Oct 2026): the owner removed numbered labels and decorative numerals from the final home page because they read as generic AI design. Do NOT use numbered eyebrows, step numerals or ghost numbers on internal pages. Only a meaningful figure such as the year 1994 may appear as a large mark.

**Layout and components**

- Alternate dark and ivory sections, as on home. Editorial 12-column grids that stack on mobile. Breakpoints used: 1023, 900, 767, 430.
- Group content into distinct cards, each with a clear job (a treatment stage, a risk, a doctor, a branch). Different card types for different content, as on home, not one repeated card.
- Buttons through `AppButton` only. Primary is red. Buttons have small radii. CORRECTION (26 Oct 2026): the finished home, about and implants pages use larger rounded cards (roughly 14 to 24 px, with one cut corner on some dark cards); the older 2 to 4 px figure applied to earlier components. Do not guess: measure radii, shadows and spacing from the finished CSS and copy them. Do not default to pills.
- Real clinic, doctor and case photography does the visual work. Treatment images should be real before/after or procedure photos where approved, and AI-generated only where no real asset exists.

**Avoid (the owner's "AI taste")**

- Gradient blobs, glows, glassmorphism, soft purple or teal tints, floating shapes.
- A repeated row of three identical icon-in-a-circle feature cards.
- Emoji or clip-art icons used as decoration.
- Hero text such as "Transform your smile", "Experience world-class care", "Your journey to a perfect smile".
- Centre-aligned everything, uniform spacing everywhere, and stacked badge pills for tags.
- Generic stock-photo smiles.
- New colours, new fonts, or new card radii that the home page does not already use.

If a design decision is not covered here, copy the closest pattern from the redesigned home page and say which one you copied.

## 7. Content strategy

The seven treatments were researched in the "Treatment Page Research Pack" (24 Oct 2026). The owner attaches the matching section of that pack to each page chat. This section is the summary Claude should work from; the pack has the detail, sources and wording patterns.

**Rules for every treatment page**

1. Each page gets its own structure, following the angle below, not a copied template. Headings answer a patient's question and are not stuffed with keywords.
2. Explain each clinical term once, in plain language.
3. Show alternatives, including no treatment, where relevant. Show risks in proportion, with when to contact the clinic.
4. Describe symptoms as reasons to book an assessment, never as a diagnosis.
5. Include a short "Questions to ask your dentist" block.
6. Add the line: "General information only. A website cannot determine what treatment an individual needs. Only an examination by a dentist can."
7. Show a reviewing dentist's name and a "last reviewed" date once the dentist has signed off.
8. Where sources disagree (implant success, peri-implantitis rates, composite lifespan, braces duration), write that results vary. Do not choose a number.
9. Write location content once, in a labelled "Where to find us" block, not repeated through the page.

**Rules added during the first two builds (26 Oct 2026)**

These are how the content strategy is applied on every page. They are what made the Dental Implants and Full Mouth Rehabilitation pages acceptable to the owner.

1. **Write from a copy deck.** For each page, Claude drafts a copy deck (every heading, lede, card title and one or two plain sentences per card, plus the FAQ) from the research pack and existing site copy. Sonnet may tighten wording but adds no facts. Every extra sentence it writes goes into the final report as **NEW COPY** for approval.
2. **Reuse existing site copy verbatim** where it already exists (the home service card, the `/treatments` FAQ answer, the general-information line, the implants cost and "where" FAQ wording). Do not rewrite approved copy.
3. **Hedge by pattern, not by disclaimer.** Use "may", "usually", "examples", "depends on", "confirmed at your consultation", "There is no standard timeline", "Outcomes vary from person to person", "Your own plan may differ". Section 16 lists the stock phrases already in use.
4. **Facts that are not verified become "confirmed at your consultation".** Examples: which parts of a plan are in-house or referred, which records are taken, which clinician does which stage. Never state them as fact.
5. **Leave out what the pack warns against** even when a source in the pack states it. Examples used so far: the Aster hospital page's "several months to over a year", the ACP page's "a prosthodontist is required" and "a team often works together", "aligners" (only braces were confirmed), any lifespan, any success rate.
6. **Symptoms are reasons to book an assessment, never a diagnosis.** Say so in one line near the "when might it be discussed" content.
7. **Define clinical terms once**, in plain language. For pages with several terms, use a small "Terms you may hear" card (as on the full mouth rehabilitation page) rather than defining them inside paragraphs. Use the main patient term in headings and mention the other term (for example "reconstruction") once only.
8. **Each page ends with a Dentist Review list.** Sonnet's final report must list every statement that needs clinical confirmation, so the clinic's dentist can sign off quickly. Reviewer name and last-reviewed date stay empty (and unrendered) until sign-off.
9. **Headline pattern:** a sans headline with one red serif italic phrase, answering the patient's question: "Dental implants, *planned in stages.*", "Full mouth rehabilitation, *planned step by step.*", "What is a dental implant? " with "dental implant?" in the accent. One accent phrase per heading.
10. **FAQ:** nine or ten questions, written as patients ask them, answers two to four sentences. The visible accordion and the FAQPage JSON-LD are generated from the same data. The cost question uses no-price wording; the duration question uses no-timeline wording.
11. **Related treatments:** three cards. Their descriptions come from the existing home service card summaries, not newly written text.
12. **Keywords are natural.** Patient terms from section 9 appear in headings and answers where a person would write them. No stuffing.

**Page angles and limits**

| Treatment | Page angle | Do not claim or state | The dentist must confirm |
| --- | --- | --- | --- |
| Composite build-up | Repair and rebuild: what is being rebuilt, with what material, how long it holds. Shorter and more practical than implants or rehabilitation | A lifespan in years. A visit count. "Build-up" as a separate clinical category | How Neodent defines "build-up" versus a filling or a core build-up under a crown |
| Dental implants | A staged journey: stages in order, what can delay treatment, who may need other treatment first, long-term care | A success rate. A total timeline. "Same-day" or "painless" | Who places and who restores implants. Whether CBCT is on site. Implant systems named. Recall interval |
| Root canal treatment | For a worried reader: what it is for, the alternatives, a walk-through of a visit, what to do if pain continues. Calm tone | "Painless". Emergency or same-day availability. A promise that the tooth lasts a lifetime | Which clinicians treat. Use of rubber dam or microscope. Visit count (sources say one to three). Urgent-contact wording |
| Braces and orthodontics | Commitment and timeline: active phase, retention phase, daily care, missed appointments. Written for adults, teenagers and parents | A Neodent timeline. "Aligners" or ceramic braces unless offered. "Affordable". Before-and-after photos until compliance is cleared | Which appliances are offered. Records taken at assessment. Retainer advice and replacement charges. Orthodontic specialist and where |
| Smile design | Options and expectations: a planned combination of whitening, bonding, veneers and alignment, with what is reversible and what is not | "Perfect smile", "Hollywood smile", "best smile makeover". A lifespan in years. Before-and-after photos until compliance is cleared | What Neodent means by smile design. Which parts are in-house. Any mock-up use. Lab and materials named |
| Full mouth rehabilitation | A phased plan for many problems at once: how a plan is built and the order of work. Make fewer specific claims; the sources are the weakest of the seven | Prices. A lifespan. Timeline from a hospital page. "Specialist team" or "advanced" unless verified | Which components are in-house or referred. Who is on the team. How cases are planned |
| Scaling and polishing | Short and reassuring. Separate routine scale and polish from deeper gum cleaning (scaling and root planing) | "Everyone needs a clean every six months". "Painless" or "cheap". That cleaning is risk-free | Who does cleans (dentist or hygienist). Whether Neodent does root planing or refers. The recall interval it wants to advise |

For full mouth rehabilitation, choose "rehabilitation" as the main term and mention "reconstruction" once. Cross-link to the implant, braces, composite and smile design pages instead of repeating them.

**Evidence quality (from the pack)**

- Good: composite build-up, scaling and polishing, implants (process and risks).
- Moderate: root canal (needs a dental professional-body source), braces (several leaflets are old; needs a clear-aligner source), smile design (no source defines it).
- Weak: full mouth rehabilitation (directory page, provider page, a 2016 review).

Most sources are UK or US. Few are Indian. Ask the clinic's dentist to add local guidance where it exists.

## 8. Compliance and claims

**Before-and-after photos and testimonials need a decision before launch.** A news report dated 15 Oct 2026 (Medical Dialogues) says India's National Dental Commission issued an advisory on 14 Oct 2026 cautioning registered dentists against publishing patient testimonials and before-and-after photos, misleading treatment claims and self-promotion. The Research Pack treats before-and-after galleries as not publishable until the primary advisory is checked. The owner, on the other hand, has the doctor's approval to reuse existing patient images and videos, with consent information in `/privacy-policy`.

Working rule until the clinic's dentist or a legal adviser confirms the primary advisory:

- Build each case-image block so it can be switched off in one place (a single flag or a single component), not woven through the layout.
- Do not write new testimonial or review quotes on treatment pages.
- Keep any patient imagery inside the consent wording already in the privacy policy.

**As built on the first two pages (26 Oct 2026)**

- Every treatment page has a single flag that switches the whole case-image section off: `SHOW_IMPLANT_CASE_IMAGES` in `lib/dental-implants-page.ts` and `SHOW_FMR_CASE_IMAGES` in `lib/full-mouth-rehabilitation-page.ts`, both **default true** (the owner has the doctor's approval; decision 4 in section 12 is still open). Each flag only affects its own page. If the decision goes against before-and-after images, switch each flag to false and confirm the section disappears cleanly.
- In the 26 Oct screenshots the patient faces in the case images appear pixelated, but the face status of each asset is **unverified**. Build prompts must tell Sonnet never to alter, crop to reveal or enlarge a face, and to report any asset it cannot confirm.
- **Hero images are clinic photos, never patient photos.** (The Codex audit offered patient before-and-after images as hero candidates; they were rejected because their face status is unknown and one is low resolution.)
- Case sections carry a disclaimer card ("Supplied before and after clinical photographs ... shown for patient understanding; ... Images are published in line with our privacy policy" with a link to `/privacy-policy`) and the line "Every case is different, and these images are not a prediction for your own mouth."
- Illustrations are labelled as illustrations ("Illustration, not to scale. Your own anatomy and plan will differ.") and must never imitate a patient photo or result (section 16).
- Where Codex's audit and this document disagree about what is on screen (for example the "Sunday holiday" line), trust the latest screenshot and mark the item for the owner (decision 8).

**Approved by the doctor (owner-confirmed 25 Oct 2026):** the "since 1994" and "25,000+ patients" claims, press and award items, clinician qualifications and designations, and the patient image and video reuse above. Reuse them exactly as they already appear on the site.

**Do not use, unless the clinic confirms in writing**

- "Best", "leading", "top", "number one", "near me", "affordable", "cheap", "painless", "same-day", "24/7", or any "serving \[area\]" line.
- Success rates, guaranteed timelines, lifespans in years, "permanent", "lifetime", or guarantees.
- Prices, packages, finance offers or discounts. The consultation fee (Rs. 300 to Rs. 500) is approved but the pack says no prices on treatment pages. Ask before using it.
- Google rating (4.3 from 261 reviews) as proof of treatment quality. It can stay where it is on the home page; do not use it as a claim on a clinical page.
- Equipment, technologies, specialist titles or brands (CBCT, microscope, endodontist, orthodontist, implant system names) unless confirmed.
- A service-area, travel-time or landmark claim beyond the verified address.

**Always include**

- The general-information line from section 7.
- The same name, address, phone and hours everywhere, matching the Google Business Profile exactly.
- Reviewing dentist and last-reviewed date once signed off.

## 9. SEO and internal linking blueprint

The aim is qualification, not a promised ranking: each page should be a clear, complete answer to a local search such as "root canal treatment in Nampally", and the pages should point at each other so search engines understand the structure. No search volume, ranking or competitor data has been collected. Do not claim any.

**Structure: hub and spoke.** `/treatments` is the hub for the seven treatment pages. `/clinic` is the hub for the two location pages. The doctor page connects both. drmotiwala.com uses the same idea (a `/dental-services/<slug>` page per treatment, grouped by category in the menu). Take the structure from it, not its claims: it publishes testimonials, before-and-after pages, cost pages and a "Lifetime Warranty", which section 8 says to avoid. It also has one clinic, so it has no location pages to copy.

**Required links**

| From | Must link to | Notes |
| --- | --- | --- |
| Every treatment page | `/treatments` (breadcrumb: Home > Treatments > page) | Visual breadcrumb plus `BreadcrumbList` schema |
| Every treatment page | `/clinic/nampally` and `/clinic/mehdipatnam` | A "Where to find us" block with both branches: address, phone, hours, directions, and a link to each location page |
| Every treatment page | `/doctors/dr-miftah-ur-rahman` | Describe him as a related clinician or profile unless the clinic confirms he provides that treatment (see section 12) |
| Every treatment page | Two or three related treatments | Pairs: implants with full mouth rehabilitation and smile design; root canal with composite build-up and scaling; braces with smile design; scaling with implants (gum health) |
| Every treatment page | `/contact` | One clear call and enquiry call-to-action, no WhatsApp |
| Each location page | All seven treatment pages | A list of treatments offered at that branch (all seven, owner-confirmed) |
| Each location page | The other branch, `/clinic`, the doctor page and `/contact` |  |
| Doctor page | The relevant treatment pages and both location pages | Added when the treatment pages exist |
| Home, `/treatments`, footer, `/clinic` | New pages | Repoint the seven home service cards from `/treatments#...` to the new routes |

Use plain descriptive link text ("root canal treatment", "our Nampally clinic"), not "click here" or "read more" alone.

**Per-page technical checklist**

- One `h1`, a logical `h2` and `h3` outline, headings that answer patient questions.
- Unique `<title>` and meta description of about 150 characters; self-referencing canonical on `https://www.neodentdentalhospitals.com`; Open Graph image.
- The root title template adds " | Neodent Dental Hospital". To keep the locality in the title, set an absolute title.
- Image alt text that describes the image; `next/image` for new pages; sensible video posters.
- Add every new route to `app/sitemap.ts`.
- Schema: `BreadcrumbList` on every new page. For treatment pages, a `MedicalWebPage` or `WebPage` entry is enough. Add `FAQPage` only if a matching FAQ is visible, and do not expect a rich result.
- The two branch `Dentist` entities in `lib/structured-data.ts` currently point at `/clinic`. Point each at its own location page once built.
- Link the Google Business Profile for each branch to its location page, not to the home page. Keep name, address and phone identical to the profile.

**As implemented on the first two pages (26 Oct 2026)**

- Absolute title per page, for example "Dental Implants in Nampally & Mehdipatnam | Neodent" and "Full Mouth Rehabilitation in Nampally & Mehdipatnam | Neodent". Meta description of about 150 characters, with no claims (verify the length is 155 or less).
- Canonical from a `PAGE_PATH` constant. Open Graph and Twitter images are referenced explicitly (`/opengraph-image`, `/twitter-image`) because nested routes do not inherit the root generated images.
- JSON-LD on each page: `BreadcrumbList` (the visual breadcrumb and the schema share one constant), `MedicalWebPage` with a `MedicalProcedure`, and `FAQPage` generated from the same FAQ data as the visible accordion. No ratings, no reviewer unless set.
- Both routes are in `app/sitemap.ts`.
- Branch data on "Where to find us" comes from `lib/site-data.ts`; phones, addresses and hours are never retyped.
- Breadcrumb is Home > Treatments > page name. The visible breadcrumb sits in the dark hero.

**Proposed titles** (confirm the brand form first, then set as absolute titles)

| Page | Proposed title |
| --- | --- |
| Composite build-up | Composite Build-Up in Nampally & Mehdipatnam \| Neodent |
| Dental implants | Dental Implants in Nampally & Mehdipatnam \| Neodent |
| Root canal treatment | Root Canal Treatment in Nampally & Mehdipatnam \| Neodent |
| Braces and orthodontics | Braces & Orthodontics in Nampally & Mehdipatnam \| Neodent |
| Smile design | Smile Design in Nampally & Mehdipatnam \| Neodent |
| Full mouth rehabilitation | Full Mouth Rehabilitation in Nampally & Mehdipatnam \| Neodent |
| Scaling and polishing | Scaling & Polishing in Nampally & Mehdipatnam \| Neodent |
| Nampally clinic | Neodent Dental Hospital, Nampally \| Dentist in Hyderabad |
| Mehdipatnam clinic | Neodent Dental Hospital, Mehdipatnam \| Dentist in Hyderabad |

Per the research pack, use the locality in the title and in the location block, not in every heading.

**Search terms patients use** (from the pack; use naturally, not stuffed)

| Treatment | Patient terms |
| --- | --- |
| Composite build-up | tooth filling, white filling, tooth-coloured filling, chipped tooth repair, tooth bonding |
| Dental implants | tooth implant, missing tooth replacement, implant vs bridge, loose denture fix |
| Root canal | root canal, tooth nerve treatment, tooth abscess, severe toothache, does a root canal hurt |
| Braces | braces, teeth straightening, crooked teeth, gap in teeth, overbite, braces for adults |
| Smile design | smile makeover, teeth whitening, veneers, fix chipped teeth, close gaps |
| Full mouth rehabilitation | full mouth restoration, rebuild all teeth, worn teeth treatment, many missing teeth, teeth grinding damage |
| Scaling and polishing | teeth cleaning, dental cleaning, tartar removal, scale and polish, deep cleaning, bleeding gums |

## 10. Page anatomy

These are building blocks, not a template. Each treatment page keeps the same design language but chooses and orders its blocks around its own angle (section 7). Name the home-page section each block copies in the build prompt.

**Treatment page blocks**

| Block | Purpose | Source of content |
| --- | --- | --- |
| Hero | Breadcrumb, `h1` with one serif accent phrase, the pack's short summary as the lede, call and enquiry buttons, one real image | Pack "short summary"; approved phone numbers |
| Fit-check strip | A few grouped cards: what it is, when a dentist may discuss it, what an assessment checks | Pack "what it is", "why discussed", "how suitability is assessed" |
| Angle section | The part that makes this page different (see next table) | Pack, angle notes |
| Process | A visit or stage sequence, labelled general information | Pack "typical process" |
| Aftercare and risks | Proportionate risks and when to contact the clinic | Pack "risks", "recovery" |
| Case images | Real before/after or procedure photos, behind a single on/off switch (section 8) | Asset map, section 11 |
| Doctor card | Link to the doctor profile | Section 4 |
| Questions to ask | Consultation questions | Pack |
| Where to find us | Two branch cards with address, phone, hours, directions, and a link to each location page | Section 4 |
| Related treatments | Two or three links | Section 9 |
| Footer note | General-information line, reviewer and last-reviewed date | Section 7 |

**What makes each page different**

| Treatment | Angle section |
| --- | --- |
| Composite build-up | Materials comparison (composite, amalgam, glass ionomer, inlay or onlay) with the trade-offs |
| Dental implants | A staged journey, plus a "who may need other treatment first" card and the implant, bridge and denture comparison |
| Root canal | A calm visit walk-through, a "what if you do not treat it" card, and a clear "when to call" card |
| Braces and orthodontics | An active-phase and retention-phase timeline, and short reader paths for adults, teenagers and parents |
| Smile design | An options comparison (whitening, bonding, veneers, alignment) with reversible and irreversible marked |
| Full mouth rehabilitation | A phased-plan sequence and a components list that links to the other treatment pages |
| Scaling and polishing | A two-column comparison of routine scale and polish against deeper gum cleaning, and a "how often" card that avoids a fixed interval |

**Location page blocks**

| Block | Content |
| --- | --- |
| Hero | Branch name as `h1`, the branch's real exterior photo, call button, directions button |
| Contact card | Address, phone, hours (Sunday holiday), map link. Exactly as in section 4 |
| Treatments here | All seven treatments, each linking to its page |
| Inside the clinic | Real interior photos already in the repo for that branch |
| What to expect | A short visit sequence that reuses the home page's "What to expect from a visit" content |
| Clinical team | Only clinicians the clinic confirms for that branch |
| Other branch | A link card to the other location |
| Enquiry | Link to `/contact` or the enquiry form |

Do not describe parking, accessibility, landmarks or travel time on a location page unless the clinic gives them.

**As built (26 Oct 2026)**

Section order and background rhythm of the two built pages. No two adjacent sections share a background. Use this as the starting point for the next page, then adapt the order to that treatment's angle.

*Dental implants* (staged-journey angle): hero (dark) → What is a dental implant? (tan: anatomy diagram, "three parts" card, three replacement-scope cards, a matched pair "Who might be offered" and "What happens at the first visit") → The stages of dental implant treatment (light: connector timeline of five illustrated stage cards, sticky "How long does it take?" card, red statement card) → Dental implants, bridges and dentures (dark patterned: three equal comparison cards; "What may need attention first" as a 2 by 3 icon grid) → Healing, aftercare and risks (background as built: healing diagram, After surgery card, Risks card, red urgent-contact card) → Implant cases from Neodent (light, gated) → How to look after a dental implant with the doctor card (dark) → FAQ with sticky "Questions to ask your dentist" card (light) → Where to find us (dark) → Related treatments and general-information line (tan).

*Full mouth rehabilitation* (phased-plan angle): hero (dark, clinic treatment-room photo) → What is full mouth rehabilitation? (tan: examination illustration, three cards, "Terms you may hear" card) → When might it be discussed? (light: four illustrated cards, a soft-red note strip) → What a plan can include (dark patterned: five illustrated component cards with links to the treatment pages, plus a red card saying which parts and which clinicians are confirmed at the consultation) → How a plan is made, then treated in stages (tan: three record cards, four-stage connector timeline, sticky "How long does it take?" and red "A plan built around your mouth, not a template" cards) → Choosing how to treat many teeth (light: three equal option cards, the phased plan with a red top edge) → Aftercare, risks and limits (dark: icon list, risks card, red urgent-contact card) → Full mouth rehabilitation cases from Neodent (light, gated: Mehdipatnam before and after, portrait video, disclaimer card) → Questions to ask your dentist with the doctor card (dark) → FAQ with sticky "Ready to talk it through?" card (tan) → Where to find us (dark) → Related treatments and general-information line (light).

Every section has one dominant element, grouped cards of different types, and an illustration or photo slot. Details of the patterns are in section 15.

## 11. Asset map

From the Codex audit. Filenames are inconsistent (spaces, capitals, double spaces, `.jpg` and `.jpeg`), so a build prompt must have Codex confirm the exact path with a file search before using it. Descriptions come from filenames and existing alt text, not from a look at the images.

| Treatment | Existing assets | Notes |
| --- | --- | --- |
| Composite build-up | Before and after pair named "Composite build up smile design" in `public/assets/treatment/` | One real pair. Keep any extra visuals real; AI images only if the dentist agrees |
| Dental implants | Nampally upper-arch before and after in `public/assets/treatment/`. Dr. Miftah's implant before and after in `public/assets/dr-miftah/treatments/` (315 x 316 and 535 x 413, small) | The Dr. Miftah pair is low resolution. Use the WebP copies in the `web/` subfolder |
| Root canal treatment | `public/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad-Root canal treatment.mp4`. Pre, mid and post RCT WebP images and 1080 x 1920 photos in `public/assets/dr-miftah/treatments/` | Videos are about 9.5 MB each. Use a poster image and no autoplay with sound |
| Braces and orthodontics | Nampally orthodontics before and after in `public/assets/treatment/` | JPEGs of about 660 to 690 KB each. Convert to WebP |
| Smile design | Zirconia-crown smile design before and after in `public/assets/treatment/`. Dr. Miftah's before and after plus six step images in `public/assets/dr-miftah/treatments/` | The six step images suit the process block |
| Full mouth rehabilitation | Mehdipatnam full-mouth-with-implants before and after in `public/assets/treatment/`. Dr. Miftah's before and after (after image about 870 KB; a 1600 x 1280 WebP of about 212 KB exists). A full-mouth rehabilitation video in `public/assets/treatment-video/` | Use the WebP |
| Scaling and polishing | Mehdipatnam scaling and polishing before and after in `public/assets/treatment/` | One real pair |

**Clinics, doctors and press**

| Group | Where |
| --- | --- |
| Mehdipatnam photos | `public/assets/neodent-clinic-mehdipatnam/`: exterior, interior, two treatment rooms, two waiting-area photos. Several originals are 4032 x 3024, so they need compression |
| Nampally photos | `public/assets/neodent-clinic-nampally/`: one exterior (1280 x 960) and one interior (1280 x 1707). **Thin** for a location page; ask the owner for more photos |
| Clinic tour video | `public/assets/Neodent dental clinic tour video.mp4` |
| Dr. Miftah | `public/assets/dr-miftah/`: portraits, during-treatment photo, college and seminar photos, award images, Open Graph image (1200 x 630) |
| Founder and team | `public/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png` and portraits for the other two named doctors |
| Press and recognition | `public/assets/news-articles/`, `public/assets/neodent-awards-recognition.jpg` |
| Patient videos | `public/assets/happy-patients/` (three files: Hyderabad, Mehdipatnam, Nampally). Subject to the testimonial caution in section 8 |

**Gaps and handling**

- All seven treatments have at least one real asset, but most have only one before and after pair. The owner is happy to add some AI-generated treatment images. Use them only for explanatory visuals (for example a labelled tooth-layer or stage illustration), never to imitate a patient result, and label them as illustrations.
- Do not name or describe a person in a photo beyond what the filename or alt text says.
- Optimise before use: convert large JPEGs to WebP, serve through `next/image`, and keep each hero image under about 300 KB.

**Asset notes from the first two builds (Codex audit, 26 Oct 2026)**

- Full mouth rehabilitation: Mehdipatnam before image 960 x 1280 (about 95 KB); the after image is only 527 x 704 (about 112 KB), so it is never displayed larger than about its native size. Dr. Miftah's FMR after image is 2651 x 2121 (870 KB original); use the 1600 x 1280 WebP (about 212 KB). His before image is 515 x 486. The FMR video is portrait 1080 x 1920, 6.5 seconds, 2.4 MB, with no poster file (the code supplies an after-case image as the poster). The as-built FMR page shows the Mehdipatnam pair and the video; Dr. Miftah's pair is not on the page (optional add, decision 18).
- Treatment hero photos come from clinic interiors and treatment rooms (use the 1280-wide copies, not the 4032 px originals). The implants hero uses the Mehdipatnam treatment room; the FMR hero uses a Mehdipatnam treatment room photo as well. Pick a different room per page where possible.
- Asset sizes over about 300 KB that need WebP before use: the Dr. Miftah FMR after original (870 KB), the orthodontics before and after originals (4032 x 3024, about 660 to 690 KB each), and several clinic originals.
- Face status of all patient images is unverified by code. Use `next/image` and constrain low-resolution images to their native size.

## 12. Open decisions and checks

Edit this table as items are settled. A page prompt should not assume an open item is resolved.

| # | Item | Status and why it matters | Who decides |
| --- | --- | --- | --- |
| 1 | Treatment route prefix | **Resolved.** `/treatments/<slug>` is in use (26 Oct 2026) | Done |
| 2 | Brand name | **Spelling resolved:** "Neodent" everywhere, never "NeoDent" (owner rule). **Still open:** singular "Neodent Dental Hospital" (site title, page titles) versus plural "Neodent Dental Hospitals" (footer lockup, research pack). Titles, schema and the Google Business Profile must match | Ravi and the clinic |
| 3 | Doctor name spelling and provider wording | Treatment pages use "Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist" and say which clinician treats is "confirmed at your consultation". **Still open:** the owner types "Miftaur" in chat; confirm one spelling; confirm whether he provides each treatment or is only a related profile | Clinic |
| 4 | Before-and-after images and testimonials: check the primary National Dental Commission advisory of 14 Oct 2026 | **Open.** Both built pages ship the case section ON behind one flag each (section 8). Decides whether case blocks stay on | Clinic's dentist or a legal adviser |
| 5 | Where to show the public email `neodentdentalhospital@gmail.com` | Open. Not in site data. Do not show it on pages until decided | Ravi and the clinic |
| 6 | Show or leave out clinician registration numbers | Open. None exist in the code | Clinic |
| 7 | Non-www to www redirect for `neodentdentalhospitals.com` | Open. Not visible in the repo; duplicate-host risk | Ravi (hosting settings) |
| 8 | Hours: schema says Monday to Saturday; the location cards on the treatment pages show "Sunday holiday" | Open. Confirm both branches are closed Sunday, then align schema and text (NAP consistency) | Clinic |
| 9 | Show the Rs. 300 to Rs. 500 consultation fee on new pages | Open. The research pack says no prices. It is not used on treatment pages; the contact page already carries it in existing copy | Clinic |
| 10 | Facebook link in site data ends in `/photos`, not a profile URL | Open. Wrong link in the footer | Ravi |
| 11 | More Nampally photos for the location page | Open. Only two exist | Ravi |
| 12 | Dentist sign-off per treatment page | **Open for both built pages.** The reviewer name and last-reviewed date are empty strings and unrendered. Each build ends with a Dentist Review list. Implants: who places and who restores, whether CBCT is on site, recall interval. Full mouth rehabilitation: which plan components are in-house or referred, records taken, urgent-contact wording, the "few long-term studies" sentence (the owner may prefer to drop it), the "Terms you may hear" card, aftercare wording | Clinic's dentist |
| 13 | Finish the home page redesign | **Resolved enough.** Use the latest home screenshot as the reference; ignore numbered labels that still appear in it | Ravi |
| 14 | Repoint hub-anchor links to each new route | Open per page. Verify it was done for implants and full mouth rehabilitation (home card, related cards, in-body links) | Ravi, via the build report |
| 15 | One policy for the case-media flags across pages | Open. Today each treatment page has its own flag, default on | Ravi |
| 16 | Lint and typecheck status | Unknown. The git working tree on branch `ravi-development` is not clean; the last known lint run had 25 errors. Do not mix fixes into page prompts | Ravi |
| 17 | Weak or thin research sources | Open. The pack gives no URLs for the full mouth rehabilitation sources; root canal needs a professional-body source; braces needs a clear-aligner source; smile design needs a definition and the primary advertising advisory | Ravi and the dentist |
| 18 | Add Dr. Miftah's full mouth rehabilitation before-and-after pair to the FMR page | Optional. Use the WebP copies | Ravi |
| 19 | Standalone location pages | Not built. Until they are, "Clinic details" buttons link to `/clinic#nampally` and `/clinic#mehdipatnam` | Ravi |

**Separate cleanups, not part of page prompts:** standardise the founder's name across existing code (five variants), fix lint errors, link the footer "Terms", update the README, remove the temporary QA files in the repo root, de-duplicate the full mouth rehabilitation copy that lives in several files.

## 13. The treatment-page workflow and reusable prompt templates

This replaces the earlier single-prompt template. The workflow was proven on the Dental Implants and Full Mouth Rehabilitation pages.

### 13.1 The workflow (one treatment page)

| Step | Who | What | Output |
| --- | --- | --- | --- |
| 0 | Ravi | Starts a new Claude chat with this document, the research pack PDF, the latest screenshots, and the treatment name | |
| 1 | Claude | Writes the **Codex audit prompt** (template A) for that treatment | A read-only prompt |
| 2 | Codex | Runs the audit on the real codebase. Changes nothing | An audit report: route and data status, assets with sizes, existing copy, research found, site facts, link targets, gaps |
| 3 | Ravi | Pastes the Codex report back into the Claude chat | |
| 4 | Claude | Writes **Build 1** (template B): page, data, SEO, layout, with illustration slots and placeholders. Includes the full copy deck | One self-contained prompt |
| 5 | Kiro CLI with Sonnet 5.5 | Runs Build 1. Reports files changed, NEW COPY, Dentist Review list, section scores | The page with placeholders |
| 6 | Claude | Writes **Build 2** (template C): illustrations and icons for the slots | One self-contained prompt |
| 7 | Kiro CLI with Sonnet 5.5 | Runs Build 2 and fills the slots | The finished page |
| 8 | Ravi | Sends the full-page screenshot back to Claude | |
| 9 | Claude | Scores it. Writes a short **polish prompt** (template D) for any section under 9/10 | A targeted prompt |
| 10 | Ravi and the clinic's dentist | Review the Dentist Review list. Sign off. Fill the reviewer name and last-reviewed date | Publish |
| 11 | Claude | Updates sections 3, 12 and 17 of this document | New version |

Why two builds: the first treatment page showed that layout and illustrations are different skills and fail differently. Combining them lowered illustration quality. Doing layout first lets the illustration frames be sized to the final layout.

### 13.2 Template A: the Codex audit prompt (read-only)

Fill the placeholders: `[TREATMENT]`, `[slug]`, `[patient terms]`.

```text
TASK: READ-ONLY AUDIT for building the [TREATMENT] treatment page of the Neodent Dental Hospital website (Next.js App Router, route /treatments/[slug]).

DO NOT write, edit, move, delete or commit any file. DO NOT install packages or run a build. Only read files and run read-only commands (ls, cat, rg, git status/log, image/video metadata tools). Do not invent anything: if something does not exist or you cannot tell, write "NOT FOUND" or "UNKNOWN". Do not design or suggest layouts; report facts.

WHY: /treatments/dental-implants and /treatments/full-mouth-rehabilitation are finished and are the quality bar. I will use your report to write a detailed build prompt for another AI agent. Use file paths and line numbers everywhere.

OUTPUT: one markdown report with the numbered sections below. Use tables for assets. Quote existing copy VERBATIM in code blocks with path and line numbers. End with an "Answers" list.

1. REPO AND PAGE ARCHITECTURE: git branch, git status summary, last 5 commits; Next.js and React versions, TypeScript strictness, styling approach, lint and typecheck scripts; anything in AGENTS.md or CLAUDE.md that affects writing pages. Does app/treatments/[slug]/ exist? List every file mentioning "[TREATMENT]" and its synonyms (rg, case-insensitive) with matching lines.
2. HOW THE TWO BUILT PAGES ARE BUILT: file tree of the implants page and the full mouth rehabilitation page (page.tsx, client chrome, section components, CSS modules, data files, slots file); for each component its purpose, props, and whether it is generic or treatment-specific; the Treatment type in lib/treatment-data.ts and the current entry for [TREATMENT] with fill status per field; section-by-section render order and the data keys that drive each; metadata, canonical, Open Graph, breadcrumbs, JSON-LD helpers; sitemap entry; where Where to find us, Related, doctor card, disclaimer and last-reviewed handling live; the case-media flag (name, location, default).
3. ILLUSTRATION KIT INVENTORY: everything under components/treatment/illustrations/ (geometry, parts, scenes, icons, defs, CSS variables, gradient ids), with exports, props and viewBoxes; IllustrationFrame props; which parts are reusable for [TREATMENT] and which are obviously missing (facts only).
4. ASSET INVENTORY FOR [TREATMENT]: search the whole repo (public/, app/, components/) for assets that relate to it (before and after, procedure photos, videos, doctor photos, clinic interiors). For EACH asset: path, type, width x height, size, orientation, whether a WebP copy exists, for video duration, codec, resolution, poster; whether the face is already pixelated (UNKNOWN unless clear; describe images in plain visual terms only, never identify a patient); existing alt text or caption; every place it is used. Flag anything over about 300 KB intended as hero and anything under about 800 px on the long side.
5. EXISTING [TREATMENT] CONTENT IN THE CODEBASE: quote verbatim the home service card, the /treatments card and FAQ, treatment-data entry, related-treatment blurbs, footer label, doctor dossier text, and any link text and href pointing to it.
6. RESEARCH AND SOURCE MATERIAL IN THE REPO: find the Research Pack and any other research files (path, size). Extract VERBATIM everything about [TREATMENT]: definition, who it is for, components or options, how suitability is assessed, process, aftercare, risks, alternatives, durability, FAQs, sources with URLs and quality notes. Mark each block verbatim or summary. Reproduce the Do not claim and The dentist must confirm lists from the master reference for this treatment.
7. VERIFIED SITE FACTS: from lib/site-data.ts and anywhere the site shows them: clinic names, addresses, phones, hours (and any Sunday line), directions links, the general number, doctor names and designations as published, approved claims, the wording the built pages use for "which clinician ... is confirmed at your consultation", the general-information disclaimer, breadcrumb and CTA patterns.
8. INTERNAL LINKING TARGETS: which routes exist (not 404) among /treatments, the seven treatment pages, /clinic, /clinic/nampally, /clinic/mehdipatnam, /doctors/dr-miftah-ur-rahman, /contact, /privacy-policy, with exact hrefs and existing link text.
9. GAPS AND RISKS (facts only): missing, too small or too large assets, alt text gaps, claims that cannot be filled without inventing facts, naming inconsistencies, hard-coded wording in the built pages that would need to change, typecheck and lint status if read-only (else UNKNOWN).
10. ANSWERS: a) does a page, route or data entry exist? b) which components are reusable as they are? c) which illustration parts are reusable? d) best 3 hero candidates (clinic photos, not patient photos) and best 3 gallery candidates, with reasons and compliance flags; e) the case-media flag; f) is the research in the repo and how complete; g) the five biggest gaps.
Return the report in one message; if too long, split into numbered parts.
```

### 13.3 Template B: Build 1 (page, data, SEO, layout), what the prompt must contain

Claude writes this per treatment, self-contained, using the built Full Mouth Rehabilitation Build 1 prompt as the model. Required parts, in order:

1. **Goal.** The page and route. "Match the quality of the owner-approved implants and full mouth rehabilitation pages; its own structure, not a copied template; 9.5/10 on hierarchy, grouping, polish; no AI design taste."
2. **Step 0, read first, no code yet.** `AGENTS.md` and the installed Next.js docs; the two built pages (page file, client chrome, every component and CSS module, the page data file, `IllustrationFrame`, `SectionHeader`); `lib/site-data.ts`, `lib/structured-data.ts`, `app/sitemap.ts`, `app/globals.css`; the existing copy for this treatment named by Codex. Then post a short findings list and continue without waiting.
3. **Audit facts** (from the Codex report): what exists, what not to rediscover, the git tree is not clean (never revert, never run state-changing git), implants components must not be modified (copy the pattern into the new folder), where existing copy lives (do not edit it), the exact asset paths, sizes and limits, and the face-status warning.
4. **Content rules (hard).** Standard block 13.6-A plus the "Do not claim" and "The dentist must confirm" row for this treatment from section 7.
5. **Route, data and SEO.** The file list (`app/treatments/<slug>/page.tsx`, `<Name>ClientChrome.tsx`, `components/treatments/<slug>/*`, `lib/<slug>-page.ts`, `lib/<slug>-slots.ts`), the page data constants (section 15), absolute title, description, canonical, Open Graph, JSON-LD set, sitemap entry, and the list of hrefs to repoint.
6. **Section sequence** with backgrounds (no two adjacent equal), each section's dominant element and the pattern it copies from the built pages.
7. **The copy deck.** Every heading (with the one accent phrase), lede, card titles and one or two sentences per card, the FAQ with answers, related cards, the questions to ask. Each sentence traceable to the pack or existing site copy.
8. **Slots.** A list of illustration and icon slots (ids, ratio, count) and a slots registry file. Where artwork does not exist yet, a temporary `SlotPlaceholder` marked `// TODO(illustration-pass)`, and cards that look intentional even with it.
9. **Visual rules.** Standard block 13.6-B.
10. **Files.** May create (the new folder, data file, slots file); may edit only the sitemap and named hrefs. Must not touch the built pages' components, Navbar, Footer, `globals.css` tokens, or existing copy files.
11. **Quality loop and final report.** Standard blocks 13.6-D and 13.6-E. The report must include NEW COPY and a DENTIST REVIEW list.

### 13.4 Template C: Build 2 (illustrations and icons), what the prompt must contain

Use the built Full Mouth Rehabilitation Build 2 prompt as the model. Required parts:

1. **Goal and quality bar.** The existing kit's scenes are the reference; new scenes must be indistinguishable in quality and style. 9.5/10. No clip-art, no cartoon outlines.
2. **Step 0.** Read the whole kit, `IllustrationFrame`, the slots file and the section components; post the slot list and the plan for new parts; continue.
3. **Extend the kit, additively.** Never change existing exports, ids, gradients or scenes. New ids use the `neo-` prefix. New files only (an anatomy-specific parts file, a scenes file, an icons file, a geometry file for that treatment).
4. **Slots.** Each slot described concretely: what it shows, what it must not show, ratio, size, labels.
5. **Clinical accuracy hard rules** (13.6-C) and the caption wording.
6. **Tech and accessibility** (section 16).
7. **Files, quality loop** (13.6-D, including a temporary preview route that is deleted before finishing, 300% zoom crops, mobile label sizes, scoring each scene) and **final report** (scene list with scores, NEW COPY, source sizes, confirmation that earlier pages are unchanged).
8. **Priority order** if time is short (finish the hero-of-section scenes first, say what was not done).

### 13.5 Template D: polish prompts

After the screenshot review, Claude writes a short prompt for only the sections under 9/10. Two kinds were used on the implants page:

- **Visual hierarchy and layout pass.** No redrawing of diagrams, no copy changes. Fix: half-empty cards (content-size them), mismatched card pairs, inconsistent bullets, narrow text beside empty space, oversized empty canvases, letterboxed video, adjacent equal backgrounds, low-contrast captions. It created `IllustrationFrame` and the slot system (S1 to S14).
- **Diagram and icon pass.** Replace weak artwork with the shared-kit approach in section 16.

Always include: the exact sections to change, what must not change, the quality loop, and the report.

### 13.6 Standard blocks (paste into every prompt)

**A. Content rules (hard)**

```text
- Main patient term in headings; mention any synonym ONCE on the page.
- Do not state or imply: prices or packages; lifespans or "permanent/lifetime"; success rates; a timeline from a hospital page; "painless", "same-day", "best/leading/advanced/affordable"; "specialist team"; equipment or technology names; aligners or other appliances unless confirmed; "serving [area]" lines; ratings as proof of quality; testimonials or invented quotes.
- Unverified facts (which components are in-house or referred, who is on the team, how cases are planned, which records are taken) become "confirmed at your consultation".
- Symptoms are reasons to book an assessment, never a diagnosis. Risks proportionate. Alternatives including no treatment. Each clinical term explained once, in plain language.
- Reuse existing site copy verbatim where the copy deck says so. Add nothing beyond the copy deck. Every extra sentence goes in the final report under NEW COPY.
- Spelling: "Neodent", "Mehdipatnam". No WhatsApp. No public email.
- Phones, addresses and hours come from lib/site-data.ts, never retyped.
```

**B. Visual rules**

```text
- Only existing tokens (red #d71920, ink #263033, charcoal #161c1e, ivory #f8f6ef, surface #fffefa, muted #657173). No new colours, fonts, radii or dependencies. Measure radii, shadows and spacing from the finished home, about and implants CSS; do not guess.
- Headline = sans + ONE red serif italic phrase. Body 15px+ at line-height 1.7. Markers: red dash everywhere.
- Backgrounds alternate; no two adjacent sections share one. Every section has one dominant element, grouped cards of different types, and real photography or a designed card composition.
- Cards are content-sized: no card may have large empty areas. Sets of cards that sit side by side are equal in structure and height.
- Content must be visible without a scroll-reveal script (no blank gaps, nothing hidden behind a failed reveal).
- BANNED: numbered eyebrows or step numerals, ghost numbers, spreadsheet-style tables, rows of tag pills, hairline rules under every heading or between every row, three identical icon-in-circle cards, gradient blobs, glows, glassmorphism, emoji, centre-aligned everything, text-only sections, monospace text, body text smaller than the implants page.
- Breakpoints 1023, 900, 767, 430. Mobile is designed, not just stacked.
```

**C. Clinical accuracy for illustrations**

```text
- Generic anatomy and one generic restoration. No brands, systems or materials named, no measurements, no timelines, no outcomes or success cues. No nerves, sinus, blood, needles or realistic instruments.
- Never imitate a patient photograph or a before and after result. Scenes show conditions, process or work in progress, not a finished smile.
- Each figure group shows the caption: "Illustration, not to scale. Your own anatomy and plan will differ."
```

**D. Quality loop**

```text
1. Screenshot at 1440px and 390px, side by side with the implants page and home. They must read as one site by one designer.
2. Score each section 1-10 on hierarchy, grouping, polish. Fix anything under 9. Stop only when each is honestly 9.5.
3. Confirm: one h1, valid heading outline, no horizontal scroll, no empty card halves, no layout shift, no console errors, FAQ accordion and keyboard focus work, JSON-LD parses and matches the visible FAQ, breadcrumb matches, sitemap includes the route, every internal link resolves, the case-media flag set to false removes the whole section cleanly. Run npx tsc --noEmit and lint on the changed files.
```

**E. Final report**

```text
Files created and edited (and each repointed href), the pattern each section copies, the slot list, NEW COPY list, section scores, a DENTIST REVIEW list of every statement that needs clinical confirmation, and anything unverified (face status of case media, lint and typecheck).
```

## 14. Design lessons

The first Dental Implants build (25 Oct 2026) was rejected by the owner for not matching the finished home page. Read this before designing any internal page.

- **Copy home sections, do not interpret tokens.** Build each internal section by copying the markup and CSS values of a specific finished home section (hero, intro, "What can we help you with", doctor card, "What to expect", patient story, "Spaces designed around care", closing band), then change the content.
- **Banned:** numbered eyebrows ("01 · Overview"), step numerals, ghost numbers, spreadsheet-style tables, rows of tag pills, hairline rules under every heading or between every row, repeated small uppercase labels, text-only sections, and body text smaller than the home page's.
- **Use instead:** large real photography with small captions, label and value rows inside one card (as in the doctor card), a single red feature card for emphasis, highlighted key phrases inside paragraphs, and stacked step cards without numbers.
- **Acceptance test:** home page and new page screenshots side by side at 1440 px and 390 px must read as one site designed by one designer. Every section needs a clear dominant element and real imagery or a distinct card composition.
- **Location of the finished reference:** the owner's latest home page screenshot always beats any rule written here.

**Lessons added from the About, Clinic, Contact, Implants and Full Mouth Rehabilitation work (25 and 26 Oct 2026)**

Faults that made earlier screens look amateur, and the fix applied each time. Check every new page against this list.

- **Wrong fonts sneak in.** The old Contact page used a serif and a monospace that were not Manrope or DM Serif Display. Every build prompt tells Sonnet to check which `font-family` a page uses and replace anything off-system. No monospace anywhere.
- **Decorative numbers and circles.** Ghost "01" and "04", numbered eyebrows, numbered steps, crosshair circles: all removed. Sequence is shown by a connector line, not numerals.
- **Text-only heroes.** Hero sections without imagery left half the screen empty. Heroes use a framed real clinic photo with a small caption, as on the About page.
- **Loose contact details.** Address, phone and hours as scattered lines with tiny icons became one grouped label and value block inside a branch card, with Call and Directions buttons.
- **Blank gaps and overlaps.** A 600 px blank gap and a gallery covered by the footer headline on the Clinic page came from scroll-reveal and layout bugs. Content must never depend on a reveal script to be visible.
- **Half-empty cards.** A red feature card with 50% empty space, a card with a blank top half, oversized white canvases around a tiny diagram. Rule: cards are content-sized; frames fit the artwork; no card has more than about 15% unused height.
- **Mismatched pairs.** Two side-by-side cards with different styles, heights and bullet types. Rule: a pair is a deliberate pair (same height, padding, radius, heading size) and the page uses one list marker (red dash).
- **Walls of text.** Long paragraph runs were regrouped into a lede plus cards, keeping every sentence (split, never reworded).
- **Spreadsheet tables.** A "what may need attention first" table became a grid of small icon cards; a comparison became three equal cards with the same structure.
- **Weak step lists.** Stage rows with a tiny tile and a big gap on the right became cards with a larger illustration, text with a readable measure, and one continuous red connector line.
- **Letterboxed video.** A portrait video in a landscape frame (black side bars) now sits in a 9:16 frame.
- **Low-contrast fine print.** Disclaimers and captions were raised to a readable size (13 to 14 px) and contrast.
- **Adjacent dark sections.** No two adjacent sections share a background.
- **Diagrams that looked like school clip-art** (rated 5/10 by the owner): see section 16 for the strategy that replaced them.
- **Forms.** The enquiry form was restyled (grouped fields, larger inputs, sentence-case labels, visible focus and error states) without touching the form logic, validation, API or Turnstile. Test form states by triggering validation errors; never submit a real enquiry.
- **Layout and illustration are separate tasks.** Do them in separate Sonnet runs (13.1).
- **The agent's own score is not enough.** Sonnet must score each section and fix anything under 9, but the owner's screenshot review is the real acceptance test. Give a targeted polish prompt for what is left.

## 15. Treatment page build system (as built)

Source: the read-only Codex audit of 26 Oct 2026 and the two builds. Paths are relative to the repo root (`E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs`); Codex confirms exact paths for each new page.

**Repo state.** Branch `ravi-development`. The working tree is not clean (treatment, doctor, contact and illustration files modified, several files untracked). Never revert, stash or reset. `package.json` has `dev`, `build`, `start` and `lint` but no typecheck script (use `npx tsc --noEmit`). Next.js 16.3.1, React 19.2.8, App Router, strict TypeScript, CSS Modules.

**Per-treatment files**

| Piece | Path pattern | Notes |
| --- | --- | --- |
| Route | `app/treatments/<slug>/page.tsx` | Server component: metadata and JSON-LD |
| Client chrome | `app/treatments/<slug>/<Name>ClientChrome.tsx` | Composes the sections in order, with Navbar, Footer and the floating call button |
| Sections | `components/treatments/<slug>/*.tsx` plus one CSS Module each | Treatment-specific. Implants has Hero, Overview, Stages, Options, Healing, Cases, Care, Questions, Locations, Related. Full mouth rehabilitation has its own set. No generic template exists; copy and adapt |
| Page data | `lib/<slug>-page.ts` | Single source of truth, see below |
| Slots registry | `lib/<slug>-slots.ts` (full mouth rehabilitation: `lib/full-mouth-slots.ts`) | Maps slot ids to illustration components or a temporary `SlotPlaceholder` |

**Page data constants** (in `lib/<slug>-page.ts`): `PAGE_PATH`, the breadcrumb constants (shared by the visible breadcrumb and the JSON-LD), the case-media flag (`SHOW_IMPLANT_CASE_IMAGES`, `SHOW_FMR_CASE_IMAGES`, default true), `REVIEWED_BY` and `LAST_REVIEWED` (empty strings, rendered only when non-empty), the FAQ array, the RELATED array, `GENERAL_INFO_NOTE` ("General information only. A website cannot determine what treatment an individual needs. Only an examination by a dentist can."), and the section copy.

**Shared pieces.** `IllustrationFrame` and `SectionHeader` currently live in `components/treatments/dental-implants/` and are imported by the full mouth rehabilitation page. Do not move them in a page build. `IllustrationFrame` props: `ratio` (`1 / 1`, `4 / 3`, `4 / 5`), `caption`, `note`, `padding` (`sm`, `md`, `lg`), `tone` (`light`, `dark`), `className`. Also shared: `Navbar`, `Footer`, `FloatingCta`, `AppButton`.

**Treatment data elsewhere.** `lib/treatment-data.ts` holds the `Treatment` type (`id`, `number`, `eyebrow`, `title`, `description`, optional `metadata`, `beforeAfter`, `video`, `image`, `doctorHref`). Its `description` is `null` for implants and full mouth rehabilitation: the visible summary is composed in `components/treatments/TreatmentAtlas.tsx`. Copy for the same treatment also lives in `components/sections/expertise-data.ts` (home cards), `lib/treatments-hub.ts`, `components/treatments/QuestionsContact.tsx` (a duplicate FAQ answer), `lib/featured-treatment-catalog.ts`, and the doctor dossier `lib/miftah-treatment-dossiers.ts`. This is a content-drift risk. Build prompts say: do not edit those files' copy; reuse their sentences verbatim.

**Page template (sections)**: see section 10 "As built". Common elements on every treatment page: dark hero with breadcrumb, H1 and lede, Send an enquiry and Call us buttons, "Consultations at both clinics: Nampally / Mehdipatnam", and one clinic photo with caption; a "when might it be discussed" or "who might be offered" block; a process or stages block with the connector timeline and the sticky "How long does it take?" plus red statement cards; an options comparison of three equal cards; aftercare, risks and the red urgent-contact card ("Call the clinic where you were treated if you notice:" with the symptom list and two Call buttons); a gated case section; a questions-to-ask block with the doctor card; an FAQ accordion with a sticky side card; Where to find us (two branch cards from `lib/site-data.ts` with Directions and Clinic details buttons); related treatments (three cards) with the general-information line.

**Doctor card wording.** Name "Dr. Md. Miftah Ur Rahman", designation "Prosthodontist and Implantologist", qualifications "BDS, MDS, FICOI", then a row about the treating clinician: on implants "Which clinician places and restores your implant is confirmed at your consultation"; on full mouth rehabilitation "Which clinicians plan and carry out each stage of your treatment is confirmed at your consultation." A View profile button goes to `/doctors/dr-miftah-ur-rahman`. Never describe him as the provider unless the clinic confirms.

**Urgent-contact wording** (implants, adapted for full mouth rehabilitation): "increasing swelling", "fever", "bleeding that will not stop", "a loose implant or crown" (full mouth: "a loose crown, bridge or implant"), "numbness that does not settle". Wording for other treatments needs the dentist's confirmation (root canal and braces have their own lists in the pack).

**Case images.** One flag per page. Case section pattern: a bento of before and after pairs at equal height, a portrait video in a 9:16 frame with its existing aria-label, a compact disclaimer card with a privacy-policy link. Use `next/image` with correct `sizes`. Low-resolution images are never upscaled.

**SEO per page**: section 9 "As implemented".

## 16. Illustration and icon strategy

The owner rated the first implants diagrams about 5/10: bare black outlines, a flat grey rectangle for bone, a flat grey bar for the implant, tiny tiles with huge empty canvases. He wanted colourful, semi-realistic, meaningful, impressive artwork at 9.5/10 and approved the result after two prompts (a layout pass, then a diagram pass). The same approach produced the full mouth rehabilitation artwork. Reuse it.

**Principles**

1. **A shared kit, not one-off drawings.** One set of parts, one palette, one geometry, so every scene looks like the same illustrator drew it.
2. **Semi-realistic medical illustration**, not clip-art: soft volumetric shading, light from the top left in every scene, restrained palette, tinted edge strokes (about 1 to 1.5 px) instead of black outlines, no glows or blobs.
3. **Meaningful.** Each scene explains one idea with clear labels or a simple annotation. Decoration is not a reason to draw.
4. **Frames fit the artwork.** `IllustrationFrame` has a tinted warm-ivory canvas, thin inner border, the site's card radius and a caption. No oversized empty white canvases.
5. **Consistent family.** Same scale and framing inside a group (stage scenes, comparison scenes, component tiles).
6. **Clinically safe.** Generic anatomy and one generic restoration. No brands, systems, materials, measurements, timelines, outcomes. No nerves, sinus, blood, needles, realistic instruments. Never imitate a patient photograph or a before and after result. Each figure group carries the caption "Illustration, not to scale. Your own anatomy and plan will differ."
7. **Annotation style.** Red (#D71920) leader lines about 1.5 px with a 4 px end dot, arrows with real arrowheads, labels in Manrope 600 in ink. Labels never overlap or cross leaders, and render at 12 px or larger at a 390 px viewport (use compact variants if needed).

**The kit** (`components/treatment/illustrations/`)

| File | Purpose |
| --- | --- |
| `IllustrationDefs.tsx` | One hidden inline SVG (width and height 0, positioned absolute, never `display: none`) holding every gradient, pattern and filter, ids prefixed `neo-`. Rendered once per page; scenes reference it with `url(#neo-...)` |
| `geometry.ts` | Shared constants and helpers. Cross-section scenes use a 640 x 480 viewBox with fixed levels (crown top, gumline, bone crest, bone floor), implant position, size and neighbouring tooth positions, so scenes line up |
| `parts.tsx` | Reusable parts: `Scene`, `Annot`, `NaturalTooth`, `Bone`, `Gum`, `Implant`, `ImplantSet`, `Abutment`, `AbutmentSet`, `CoverScrew`, `HealingAbutment`, `Crown`, `PreparedStump`, `CrownOnStump`, `Pontic`, `BridgeConnector`, `DentureTeeth`, `DentureBase`, `GraftGranules`, `Membrane`, `Osteotomy`, `Arrow`, `Callout`, `Label`, `DimensionLine`, `Magnifier`, `ThreadDetail` |
| `scenes.tsx` | The implants scenes (below) |
| `icons.tsx` | The icon family (below) |
| `illustrations.module.css` | CSS variables, for example `--illus-enamel-edge`, `--illus-gum-edge`, `--illus-ti-edge`, `--illus-red`, `--illus-red-tint`, `--illus-ink` |
| Added for full mouth rehabilitation | Frontal arch parts and scenes (arch geometry, `ArchFront` with per-tooth and gum states, and a scenes and an icons file), appended without changing any implants export |

**Palette for artwork only** (scoped variables, UI tokens are unchanged): enamel and porcelain from white to a warm off-white; root dentin cream to tan; gum from a light salmon to a deeper rose with a lighter highlight along the margin; cortical bone tan with a darker edge; cancellous bone pale with an irregular trabecular texture; titanium as a five-stop grey metal gradient; denture base a slightly different pink from the gum so it reads as removable; graft granules pale with a tan edge; membrane a neutral grey. Brand red is used only for annotations and highlights. No purple, no teal, no new hues.

**How the parts are drawn (the details that remove the "school clip-art" look)**

- *Bone:* a cortical band along the crest, then cancellous bone with an organic trabecular pattern (curved strokes and dots, not a grid) and a subtle depth gradient.
- *Gum:* scalloped margin hugging the teeth, small papillae between teeth, thin darker edge.
- *Natural teeth:* believable crown contours, enamel highlight, root tapering inside the bone with a thin ligament line.
- *Implant:* tapered body with a rounded apex, a collar with a slight platform, 9 to 11 helical thread bands clipped to the body, each with a highlight edge and a shadow edge, and a soft contact shadow in the bone.
- *Frontal arches:* about ten teeth per arch, midline symmetry, central incisors largest, slight perspective narrowing, gum scallops, a visible bite line, subtle shade variation. A per-tooth state prop (natural, worn, missing, largeFilling, decayed, cracked, crown, implantCrown, pontic, prepared) and a gum state prop let one geometry produce every scene.

**Scenes built**

*Dental implants* (slots S1 to S14): S1 anatomy of a single-tooth implant with the labels Crown, Abutment, Implant, Gum, Jawbone; S2 three part renders (implant post, abutment, crown); S3 replacement scope (single tooth, several teeth with a bridge, full arch); S4 to S8 the five stages (assessment with dimension lines and a radiograph-style inset, preparation with bone graft and membrane, placing, healing with a magnifier, restored tooth); S9 to S11 implant, bridge and denture at identical scale; S12 six "needs attention" icons (gum, bone, smoking, health conditions, grinding, medicines); S13 the healing diagram with the labels "Gum heals around it" and "Bone bonds to the implant" and a magnifier inset; S14 five aftercare icons.

*Full mouth rehabilitation* (slots M1 to M7): M1 an examination view of a mixed-condition arch pair with four dashed red zones labelled Missing teeth, Worn or damaged teeth, Gum health, Bite (it shows an examination, not a result); M2a to d four crops (missing teeth, worn or damaged, bite and grinding with a bite-height line, gum health); M3 five component tiles (restorative with crown, onlay and implant crown; gum health with a probe-depth dimension line; alignment with brackets, a wire and red movement arrows; bite with a clear night-guard splint; cosmetic with a veneer shade strip); M4 three record icons (history, X-ray, scans or impressions); M5a to d four stage scenes (assessment with a radiograph inset; written plan with zones tinted in sequence and a "First / Then" legend, no numbers; treatment in phases with some zones restored; review with a magnifier and a check line); M6a to c three option scenes (one tooth treated separately, a phased whole-mouth plan, review and monitor); M7 four aftercare icons (cleaning, check-up, gum health, night guard) reused from the implants icon family.

**Icon family.** 48 px (records, attention) and 40 px (aftercare) duotone icons on a 100 x 100 tile: 2 px ink stroke (#263033), round caps and joins, a soft red-tint fill (#F6D4D4) and one #D71920 detail. No emoji, no lucide look-alikes, no icon-in-circle backdrops. Icons are used only where they explain something, never as decoration.

**Technical rules.** Inline SVG React components, server components, no raster images, no external fonts (text uses `font-family: inherit`), no libraries. Each scene under about 25 KB of source. `role="img"` with a unique `<title>` and `<desc>`; icons `aria-hidden`. `vector-effect: non-scaling-stroke` for hairlines. Optional one-time entrance on scroll for annotation layers (opacity and translate, 500 ms at most, nothing loops, respects `prefers-reduced-motion`). Additive changes only: the implants page must render identically after any new build (compare screenshots).

**Process for a new treatment** (Build 2, template C): read the kit and the slot list, extend it additively, build a temporary preview route that shows every scene at 1x, 2x and mobile width, inspect crops at 300% zoom, check the real page on both light and dark backgrounds, score each scene 1 to 10 (realism, clarity, consistency, polish), redraw anything under 9, delete the preview route, run `tsc` and lint, confirm earlier pages are unchanged.

**Suggested artwork for the remaining pages** (a plan, not built):

| Treatment | Suggested scenes | Needs new parts |
| --- | --- | --- |
| Composite build-up | Tooth cross-section showing enamel, dentin and pulp with the build-up layered on; a materials comparison of composite, amalgam, glass ionomer and inlay or onlay at identical scale; a step sequence (prepare, bond, layer, light, polish) | Tooth cross-section with layers; restoration layers |
| Root canal treatment | Tooth cross-section with pulp, canals and root tip; a visit walk-through (access, clean, fill, restore); crown or filling afterwards | Tooth cross-section with pulp and canals |
| Braces and orthodontics | Frontal arch with brackets and wire, an active-phase and retention-phase timeline, fixed and removable retainers | Brackets, wire and retainers on the frontal arch |
| Smile design | Frontal teeth showing whitening, bonding, veneers and crowns on a shade scale; reversible versus irreversible marking | Veneer and shade parts on the frontal arch |
| Scaling and polishing | Gum margin cross-section with plaque and tartar, and healthy versus inflamed gum; routine clean versus deeper cleaning below the gumline | Plaque and tartar layers, probe and pocket depth |

Reuse the frontal arch and cross-section parts wherever possible.

## 17. Progress log

A dated record of what was done, so a new chat does not repeat it. All dates are 2026. "Prompt issued" means Claude wrote the prompt and Ravi ran it in Kiro CLI with Sonnet 5.5; the result was not reviewed in the chat unless stated.

| Date | Page | What was done | Result and notes |
| --- | --- | --- | --- |
| By 26 Oct | About | Redesigned to match home: dark hero with a framed photo, an "At a glance" strip, label and value doctor card, red feature card, dark section with light cards | Owner-approved; used as a design reference |
| 26 Oct | Clinic | Prompt issued for a full redesign. Found: numbered eyebrows and ghost numerals, a light hero where home and about are dark, tiny branch index, loose contact details, a collage of offset photos, a 600 px blank gap, a gallery covered by the footer headline. Plan: dark hero with photo, "At a glance" strip, two branch cards (photo, label and value block, Call and Directions), different-surroundings section with photo and red cards, a gallery grouped by branch, a "treatments at both clinics" section, and a visit call-to-action | Prompt issued; result not reviewed in chat |
| 26 Oct | Contact | Prompt issued. Found: off-system serif and monospace fonts, ghost numbers, a text-only hero, a hairline-divided directory, a text-only "before your visit" section, a flat form. Plan: framed-photo hero, two branch cards, three light step cards without numbers plus a team photo and the fee as one card, the enquiry form inside one grouped surface card with a "Prefer to call?" card. Form logic untouched | Prompt issued; result not reviewed in chat |
| 25 to 26 Oct | Dental implants | The first build (25 Oct) was rejected for not matching the finished home page (section 14). It was rebuilt; the owner then rated the diagrams about 5/10 and the layout good but uneven. Two prompts followed: a visual hierarchy and layout pass (IllustrationFrame, slots S1 to S14, content-sized cards, matched pairs, connector timeline, equal comparison cards, 9:16 video frame, section rhythm), then a diagram and icon pass (shared kit, semi-realistic scenes, icon family) | **Owner-approved**; the quality bar for all other treatment pages |
| 26 Oct | Full mouth rehabilitation | Codex audit, then Build 1 (page, data, SEO, layout) and Build 2 (frontal-arch illustrations M1 to M7 and icons). Copy written from the research pack with heavy hedging; weakest-sourced treatment, so the page leans on "confirmed at your consultation" | **Owner-approved** the design, content strategy, icons and diagrams. Dentist Review list still to be signed off (section 12, item 12). Dr. Miftah's before and after pair not shown (item 18) |
| 26 Oct | This document | Updated to version 2: workflow, templates, design, content and illustration strategy, page anatomy as built, decisions table | |

**Next:** composite build-up, root canal treatment, braces and orthodontics, smile design, scaling and polishing (in an order Ravi chooses), then `/clinic/nampally` and `/clinic/mehdipatnam`, then repoint all hub-anchor links.
