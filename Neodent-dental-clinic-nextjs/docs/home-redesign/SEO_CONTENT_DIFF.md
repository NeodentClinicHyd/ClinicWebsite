# SEO content diff: baseline 0e62178 vs current working tree

Run S0, 2026-10-30. Generated from `scripts/seo-content-audit.mjs` output (`.audit/seo/diff.json`) plus the S0 destination proposals. Read with `NEODENT_HOME_REDESIGN_REFERENCE.md` Parts 13 to 15.

- **Baseline:** commit `0e621788200af61b202380e242258634cb036a33` ("final commit", 28 Oct 2026), built with `next build` in a git worktree outside the repo and served with `next start` on :3100.
- **Current:** a snapshot copy of the working tree's app folder taken at 2026-10-30 13:55:06 +05:30, built and served the same way on :3101. The redesign is uncommitted; the snapshot includes the hero work in progress at that time.
- **Fetching:** Chromium via Playwright with `javaScriptEnabled: false` (server-rendered HTML only). Routes: `/sitemap.xml` of both builds plus `/`: 17 routes, identical on both sides.
- **Totals (all routes, text + headings + links + alt texts, JSON-LD fields excluded):** kept 3958, shortened 58, removed 54. JSON-LD fields: 989 kept, 0 removed.
- **Home page only:** kept 168, shortened 57, removed 50. Of the 107 changed rows, 18 are in the hero (`section#home`).
- **Internal pages:** no text lost except the consultation block on /about (4 rows, shared component) and the footer line on every page (1 row, counted once as site chrome).
- **Proposed destinations for the 112 changed rows:** hero pass: no restoration in the S-series 18, Visible 24, Intentional drop 46, Disclosure 13, Internal page with link 11. These are proposals only. The "Owner decision" column is empty; S1 fills it.
- The audit exits 1 because 54 rows are "removed" with no owner decision. That is expected until S1.

## How to read the ledger

- **kept**: the sentence (case and punctuation ignored) is still on the route, or a current sentence of similar size contains at least 85% of its words.
- **shortened**: the best current match of similar size has 40% to 85% of its words. The closest current text is shown.
- **removed**: no current sentence of similar size has 40% of its words.
- "Similar size" means a Dice overlap of at least 0.3. Without it, a two-word label would count as kept just because its words appear in some long paragraph. This is stricter than a plain overlap score, so it can only produce more "removed" rows, not fewer.
- Text in headings, links and alt texts is compared within the same route. A heading counts as kept if the same heading text exists anywhere on the route; the hero list in (g) compares hero headings on their own.
- Text that appears on at least 80% of routes (navigation, footer, consent) is compared once, as route `*`.
- "Old text" is verbatim from the rendered baseline page with whitespace collapsed. A "(hidden)" marker means the text was in the HTML but not shown without JavaScript (an inactive hero slide, `aria-hidden`, or CSS-hidden).
- Ids are stable hashes of route, kind, section and text. To record a decision, write it in the last cell of the row; `seo-content-audit.mjs` reads that column (or `docs/home-redesign/seo-ledger-decisions.json`).

## (a) Summary per route (baseline -> current)

Words include text that is in the HTML but hidden without JavaScript (inactive hero slides, collapsed panels). Links are counted per `<a>` element; JSON-LD types are the same on both sides for every route, so they are listed once.

| Route | Words | Headings | Internal links | Outbound links | Alt texts | JSON-LD blocks | JSON-LD types | Text changed |
|---|---|---|---|---|---|---|---|---|
| / | 1744 -> 1656 | 31 -> 32 | 36 -> 41 | 6 -> 9 | 26 -> 25 | 4 | Dentist, MedicalOrganization, PostalAddress, WebSite | yes |
| /about | 1641 -> 1715 | 24 | 37 | 5 | 15 | 4 | Dentist, MedicalOrganization, PostalAddress, WebSite | yes |
| /clinic | 629 -> 628 | 16 | 40 | 7 | 15 | 4 | Dentist, MedicalOrganization, PostalAddress, WebSite | yes |
| /clinic/mehdipatnam | 862 -> 869 | 23 -> 24 | 43 -> 44 | 8 | 11 | 5 | BreadcrumbList, Dentist, ListItem, MedicalOrganization, PostalAddress, WebPage, WebSite | yes |
| /clinic/nampally | 863 -> 870 | 23 -> 24 | 43 -> 44 | 8 | 5 | 5 | BreadcrumbList, Dentist, ListItem, MedicalOrganization, PostalAddress, WebPage, WebSite | yes |
| /contact | 434 -> 433 | 16 | 31 | 7 | 5 | 4 | Dentist, MedicalOrganization, PostalAddress, WebSite | yes |
| /doctors | 216 -> 215 | 9 | 30 | 5 | 0 | 5 | BreadcrumbList, Dentist, ListItem, MedicalOrganization, PostalAddress, WebSite | yes |
| /doctors/dr-miftah-ur-rahman | 7021 -> 7020 | 75 | 42 | 12 | 44 | 5 | BreadcrumbList, Dentist, ListItem, MedicalOrganization, Person, Physician, PostalAddress, ProfilePage, WebSite | yes |
| /privacy-policy | 852 -> 851 | 22 | 28 | 5 | 0 | 4 | Dentist, MedicalOrganization, PostalAddress, WebSite | yes |
| /treatments | 1569 -> 1568 | 37 | 38 | 7 | 18 | 5 | Answer, BreadcrumbList, CollectionPage, Dentist, FAQPage, ItemList, ListItem, MedicalOrganization, PostalAddress, Question, WebSite | yes |
| /treatments/braces-and-orthodontics | 2521 -> 2520 | 66 | 41 | 7 | 8 | 5 | Answer, BreadcrumbList, Dentist, FAQPage, ListItem, MedicalOrganization, MedicalProcedure, MedicalWebPage, PostalAddress, Question, WebSite | yes |
| /treatments/composite-build-up | 1748 -> 1747 | 55 | 42 | 7 | 6 | 5 | Answer, BreadcrumbList, Dentist, FAQPage, ListItem, MedicalOrganization, MedicalProcedure, MedicalWebPage, PostalAddress, Question, WebSite | yes |
| /treatments/dental-implants | 2174 -> 2173 | 55 | 46 | 7 | 8 | 5 | Answer, BreadcrumbList, Dentist, FAQPage, ListItem, MedicalOrganization, MedicalProcedure, MedicalWebPage, PostalAddress, Question, WebSite | yes |
| /treatments/full-mouth-rehabilitation | 1997 -> 1996 | 64 | 48 | 7 | 6 | 5 | Answer, BreadcrumbList, Dentist, FAQPage, ListItem, MedicalOrganization, MedicalProcedure, MedicalWebPage, PostalAddress, Question, WebSite | yes |
| /treatments/root-canal-treatment | 1954 -> 1953 | 62 | 44 | 7 | 7 | 5 | Answer, BreadcrumbList, Dentist, FAQPage, ListItem, MedicalOrganization, MedicalProcedure, MedicalWebPage, PostalAddress, Question, WebSite | yes |
| /treatments/scaling-and-polishing | 1957 -> 1956 | 57 | 43 | 7 | 6 | 5 | Answer, BreadcrumbList, Dentist, FAQPage, ListItem, MedicalOrganization, MedicalProcedure, MedicalWebPage, PostalAddress, Question, WebSite | yes |
| /treatments/smile-design | 2257 -> 2256 | 66 | 43 | 7 | 12 | 5 | Answer, BreadcrumbList, Dentist, FAQPage, ListItem, MedicalOrganization, MedicalProcedure, MedicalWebPage, PostalAddress, Question, WebSite | yes |

Home page links in detail: unique internal targets lost `#contact` (the old "Explore your visit" button) and gained `/about#founder`. The hero now links to `/clinic/mehdipatnam` and `/clinic/nampally` (baseline: both to `/clinic`). The consultation block no longer links to `/contact`; the page still does, from the hero. Outbound links rose from 6 to 9 because the same Google Maps and review links now appear more than once. No outbound target was lost.

## (b) Home page: words per section (baseline -> current)

Server-rendered HTML, JavaScript off. A word count is a diagnostic, not a target (Part 14.3).

| Section | Baseline | Current | Change |
|---|---|---|---|
| Navigation (`header.nav`) | 6 | 6 | +0 |
| Navigation links (`nav.nav-links`) | 6 | 6 | +0 |
| Mobile navigation (`nav#mobile-navigation`) | 9 | 9 | +0 |
| Hero (`section#home`) | 123 | 104 | -19 |
| Stat strip + Care begins (`section.exp-intro`) | 131 | 123 | -8 |
| Seam card (`section.SeamCard.card`) | 11 | 9 | -2 |
| 1994 / Legacy (`section#legacy`) | 190 | 109 | -81 |
| Treatments (`section#expertise`) | 336 | 288 | -48 |
| Doctors (`section#leadership`) | 483 | 184 | -299 |
| Patient stories (`section#stories`) | 53 | 275 | +222 |
| What to expect (`section#visit`) | 124 | 120 | -4 |
| Spaces (`section#clinics`) | 117 | 194 | +77 |
| Consultation block (`section#get-in-touch`) | 51 | 126 | +75 |
| Footer (`footer.Footer.footer`) | 73 | 72 | -1 |
| Footer: Explore (`nav.Footer.exploreCol`) | 7 | 7 | +0 |
| Footer: Treatments (`nav.Footer.treatmentsCol`) | 19 | 19 | +0 |
| Other (skip link, etc.) (`(page)`) | 5 | 5 | +0 |
| **Total** | **1744** | **1656** | **-88** |

Notes:
- Doctors lost 299 words. These were Dr. Miftah's four paragraphs, his fact list, quote and portfolio captions (P5).
- Legacy lost 81 words (chapter labels and two founder paragraphs, P3). Treatments lost 48 (P4).
- Patient stories gained 222 words: the five Google reviews are now in the server HTML. Spaces gained 77 words (branch tabs with hours and addresses). The consultation block gained 75 words: the enquiry form labels and the hours of both clinics.
- In the current HTML each stat number appears three times ("32 32 32", "418 418 418", "25,000+ 25,000+ 25,000+"). `components/motion/CountUp.tsx` renders a layout ghost, an animated copy (both `aria-hidden`) and a screen-reader copy. This adds about 6 words to Care begins and 2 to Patient stories. A crawler reading plain text sees the number three times. Worth a look in S2 (R2: no hidden text tricks); it is not keyword stuffing, but it is not clean either.

## (c) Content ledger

Every row whose status is "shortened" or "removed" (112 rows), on all routes. Kept rows are not listed here: there are 168 on the home page (listed in the appendix) and 3790 on internal pages and site chrome. All JSON-LD fields were kept. Every row is in `.audit/seo/diff.json`.

Destinations follow Part 14.1: **Visible**, **Disclosure** (same page, text in the server HTML), **FAQ**, **Internal page with link**, or **Intentional drop** (only for wrong, unverifiable, ungrammatical, duplicate or numbering text, with a reason, R1). Hero rows are marked "hero pass: no restoration in the S-series".

| ID | Route | Section | Kind | Old text (verbatim) | Status | Closest current text | Proposed destination | Reason | Owner decision |
|---|---|---|---|---|---|---|---|---|---|
| `home-t6d582550` | / | Hero | text | Changing smiles since 3 decades. | shortened (0.6) | Decades of changing smiles. | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-td704635f` | / | Hero | text | 2 Hyderabad locations·Mehdipatnam·Nampally (hidden) | shortened (0.6) | Visit us in Mehdipatnam or Nampally, Hyderabad. | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-t6be20613` | / | Hero | text | 30+ Years of changing smiles (hidden) | shortened (0.6) | Decades of changing smiles. | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-t70466bb9` | / | Hero | text | Where Neodent is. (hidden) | removed (0.66): words only inside a much longer sentence | (none) | hero pass: no restoration in the S-series | Old slide 2 headline; now "Two clinics. One standard of care." (P1). | |
| `home-tb580d8d4` | / | Hero | text | Two Hyderabad locations. (hidden) | removed (0.33) | (none) | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-tb7b765f4` | / | Hero | text | 01 (hidden) | removed (0) | (none) | hero pass: no restoration in the S-series | Slide counter; Part 3 bans numbering. | |
| `home-t3ed3c157` | / | Hero | text | 02 (hidden) | removed (0) | (none) | hero pass: no restoration in the S-series | Slide counter; Part 3 bans numbering. | |
| `home-t91106470` | / | Hero | text | In print · On air · Hyderabad 03 (hidden) | shortened (0.66) | Documented in print and on air. | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-t205d7eb5` | / | Hero | text | Practised the same way, every day. (hidden) | removed (0.5): words only inside a much longer sentence | (none) | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-t77bd8ec0` | / | Hero | text | Public media (hidden) | removed (0) | (none) | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-t1e7c0a74` | / | Hero | text | Institutional recognition (hidden) | shortened (0.5) | Recognition Recognition ceremony | hero pass: no restoration in the S-series | Hero copy changed in P1/P1b; listed in (g) for the hero pass. | |
| `home-t37e42b54` | / | Hero | text | 01 / 03 (hidden) | removed (0) | (none) | hero pass: no restoration in the S-series | Slide counter; Part 3 bans numbering. | |
| `home-h6d0c8aff` | / | Hero | h2 | Where Neodent is. | removed (0.33) | (none) | hero pass: no restoration in the S-series | Old slide 2 headline; now "Two clinics. One standard of care." (P1). | |
| `home-l465e16f9` | / | Hero | link | +91 9246348485 -> `tel:+919246348485` | shortened | anchors now: call for consultation / call today for a consultation 91 9246348485 / call neodent 91 9246348485 / call neodent / call 91 9246348485 | hero pass: no restoration in the S-series | Hero links: see (g). | |
| `home-lbc75d548` | / | Hero | link | Mehdipatnam -> `/clinic` | shortened | anchors now: plan your visit / explore our clinics / clinics | hero pass: no restoration in the S-series | Hero links: see (g). | |
| `home-l370405c7` | / | Hero | link | Nampally -> `/clinic` | shortened | anchors now: plan your visit / explore our clinics / clinics | hero pass: no restoration in the S-series | Hero links: see (g). | |
| `home-aa710b5a6` | / | Hero | alt | Neodent Dental Hospital Mehdipatnam exterior — the entrance doorway and registration counter | shortened (0.63) | Neodent Dental Hospital Mehdipatnam, the carved entrance doorway | hero pass: no restoration in the S-series | Hero photo alt: see (g). | |
| `home-a6705cae8` | / | Hero | alt | Neodent Dental Hospital Nampally interior — the reception and registration counter | shortened (0.7) | Neodent Dental Hospital Nampally, the reception and consultation wing | hero pass: no restoration in the S-series | Hero photo alt: see (g). | |
| `home-tf0589540` | / | Stat strip + Care begins | text | Why Neodent (hidden) | shortened (0.5) | Call Neodent | Visible | Plain "Why Neodent" label above the stat strip; the only "why choose us" phrasing on the page (13.3). | |
| `home-t1b1f4faf` | / | Stat strip + Care begins | text | Multi-speciality clinic | removed (1): words only inside a much longer sentence | (none) | Visible | "Multi-speciality" now survives only inside one Nampally sentence; restore as a stat label or supporting line. | |
| `home-t1b776f62` | / | Stat strip + Care begins | text | 2 locations | shortened (0.5) | Locations | Intentional drop | Duplicate: both clinics are named in Spaces, the footer and the hero. | |
| `home-td1838316` | / | Stat strip + Care begins | text | 25,000+ smiles changed | shortened (0.5) | 25,000+ 25,000+ 25,000+ patients treated | Intentional drop | Same fact, reworded to "25,000+ patients treated" (owner still to verify the number, 13.1). | |
| `home-te1260461` | / | Stat strip + Care begins | text | From the first step inside to every stage of treatment, Neodent is designed around a calmer, more reassuring dental experience. | shortened (0.75) | From the first step inside, Neodent is designed around a calmer, more reassuring dental experience. | Intentional drop | Reworded; the lost clause ("to every stage of treatment") carries no search phrase. | |
| `home-te69bb48e` | / | Stat strip + Care begins | text | Clinical expertise meets thoughtful care. | removed (0.2) | (none) | Disclosure | Brand line from the old four-paragraph intro; fits a "Read more" under Care begins. | |
| `home-t92a38f2e` | / | Stat strip + Care begins | text | You're guided through each stage with clear explanations, not simply moved through a procedure, and that same continuity carries from your first visit through to the care that follows. | shortened (0.63) | You are guided through each stage with clear explanations, and the same specialist-led care follows you from your first visit through to treatment and beyond. | Disclosure | Fuller version of the current sentence; keep the short one visible, the long one in the disclosure. | |
| `home-t8d8b2eef` | / | Stat strip + Care begins | text | Whether you visit Mehdipatnam or Nampally, the standard of care is the same. | shortened (0.84) | Whether you visit Mehdipatnam or Nampally, the standard is the same. | Intentional drop | Near-identical ("the standard is the same"); both clinic names kept. | |
| `home-t586fad82` | / | Stat strip + Care begins | text | Every detail is considered to make your visit feel calmer, clearer and more personal — from arrival to care. | removed (0.33) | (none) | Disclosure | Supporting copy from the old intro; same disclosure as above. | |
| `home-tc1833779` | / | Stat strip + Care begins | text | Neodent / Inside Hospital tour | shortened (0.5) | Neodent Dental Hospital | Visible | Caption that describes the hospital tour video; restore a plain caption ("Inside Neodent: hospital tour"). | |
| `home-t9cc2981a` | / | Seam card | text | Neodent Standard | shortened (0.5) | Call Neodent | Intentional drop | Eyebrow replaced by the plain seam card line "Specialist-led care. Since 1994." (P2). | |
| `home-t6911cacb` | / | Seam card | text | We maintain peak performance | removed (0.25) | (none) | Intentional drop | Vague, unverifiable claim; cut in P2 per Part 6.2. | |
| `home-te3cc1b8a` | / | 1994 / Legacy | text | 01 / Beginning (hidden) | removed (0.5): words only inside a much longer sentence | (none) | Intentional drop | Numbered chapter label (Part 3: no numbering); the chapter text is ledgered separately. | |
| `home-te839b04d` | / | 1994 / Legacy | text | 02 / People (hidden) | removed (0) | (none) | Intentional drop | Numbered chapter label. | |
| `home-t4ac9e0c7` | / | 1994 / Legacy | text | Established in 1994, Neodent has grown through decades of clinical practice, specialist-led care and a commitment to making dentistry more reassuring, personal and precise. | removed (0.36) | (none) | Visible | "Established in 1994" plus specialist-led care: core entity fact matching foundingDate (R6, R8). | |
| `home-t71ca7491` | / | 1994 / Legacy | text | For patients, that continuity means every visit draws on years of accumulated clinical experience. | shortened (0.5) | Every visit draws on that accumulated experience, and the same specialist-led approach that shaped Neodent from the beginning still guides treatment today. | Intentional drop | Reworded in the current Legacy paragraph ("Every visit draws on that accumulated experience"). | |
| `home-t255cd9f9` | / | 1994 / Legacy | text | Founded and led by Dr. Mohd. Siraj Ur Rahman, Neodent's clinical philosophy has been shaped by 30+ years of experience in dentistry. | removed (0.26) | (none) | Visible | Founder name plus 30+ years: key GEO fact for the home page; keep it in running text. | |
| `home-t92dba0cd` | / | 1994 / Legacy | text | A dental surgeon, prosthodontist and implantologist, and Professor at Osmania Government Dental College & Hospital, Hyderabad, Dr. Siraj brings together specialist clinical practice and academic experience — a foundation that continues to guide the care delivered at Neodent. | removed (0.29) | (none) | Disclosure | Founder credentials and the Osmania professorship; Legacy "Read more", with a link to /about#founder. | |
| `home-t1bbb9b93` | / | 1994 / Legacy | text | 03 / Record (hidden) | removed (0) | (none) | Intentional drop | Numbered chapter label. | |
| `home-tb4c932d1` | / | 1994 / Legacy | text | Three decades, on record | shortened (0.5) | Three decades of changing smiles. | Visible | Plain title for the press row ("Three decades, on record"). | |
| `home-t38d18d9f` | / | 1994 / Legacy | text | iii Recognition Recognition ceremony (hidden) | shortened (0.75) | Recognition Recognition ceremony | Intentional drop | Only the roman numeral "iii" was lost; the caption is kept. | |
| `home-t0cdc1309` | / | 1994 / Legacy | text | 04 / Impact (hidden) | removed (0) | (none) | Intentional drop | Numbered chapter label. | |
| `home-taef86061` | / | Treatments | text | Each concern is met with the specialist-led expertise it calls for, within one clinical environment. | shortened (0.75) | Each concern is met with the specialist-led expertise it calls for, and most areas below are shown with a real case from our clinics, so you can see the kind of work we do before you decide. | Intentional drop | The current sentence keeps the opening and is longer; only "within one clinical environment" is lost. | |
| `home-tc794eac3` | / | Treatments | text | The right approach is matched to what each patient needs, from routine care to more complex treatment. | removed (0.41): words only inside a much longer sentence | (none) | Disclosure | Second intro paragraph (P4 cut); treatments "Read more". | |
| `home-t47342fbd` | / | Treatments | text | Whether you need a missing tooth replaced, a worn tooth restored or a smile rebuilt, care begins with understanding your concern and explaining your options clearly. | removed (0.23) | (none) | Visible | Patient-language phrases ("missing tooth replaced", "worn tooth restored"); keep visible. | |
| `home-tbff5c9ec` | / | Treatments | text | Treatments range from preventive care such as scaling and polishing to restorative and specialist work such as implants, root canal treatment, braces and smile design. | shortened (0.84) | Focused care for the dental problems that bring patients to us, from preventive care such as scaling and polishing to specialist work such as implants, root canal treatment, braces and smile design. | Intentional drop | All treatment names kept; only the word "restorative" is lost. | |
| `home-t323be85f` | / | Treatments | text | Treatment film | shortened (0.5) | Treatment | Intentional drop | Label of the generic clinical film removed in P4. | |
| `home-td69afa06` | / | Treatments | text | REAL CASE / COMPOSITE SMILE DESIGN | shortened (0.6) | REAL CASE / COMPOSITE BUILD-UP | Intentional drop | Relabelled to "Composite Build-up" to match the treatment page name (P4 fix). | |
| `home-t64b58b74` | / | Doctors | text | Assistant Director, Neodent Dental Hospitals | shortened (0.6) | Neodent Dental Hospitals | Visible | Dr. Miftah's role; must match /about and the profile page (R8). | |
| `home-ta3f6e809` | / | Doctors | text | 15+ Years of clinical experience | shortened (0.6) | 30+ Years of experience | Visible | Years-of-practice fact (15+), also on the profile page; restore on his card. | |
| `home-tf3c55924` | / | Doctors | text | Prosthodontist & Implantologist · Smile Designer (expert in smile design) | removed (0.44): words only inside a much longer sentence | (none) | Visible | Specialty line; "Smile Designer" appears nowhere else on the current site (owner to confirm the title). | |
| `home-te4adeac9` | / | Doctors | text | Practising at | shortened (0.5) | Dr. Miftah at work | Visible | Goes with the next row: where he practises. | |
| `home-t45e6d058` | / | Doctors | text | Mehdipatnam & Nampally, Hyderabad | shortened (0.75) | Visit us in Mehdipatnam or Nampally, Hyderabad. | Visible | Doctor-to-location link in plain words (R8: Mehdipatnam, Nampally, Hyderabad). | |
| `home-t294609a7` | / | Doctors | text | University Gold Medalist · Madina Gold Medal (2023), awarded by Commissioner A. K. Khan | removed (0.23) | (none) | Disclosure | Madina Gold Medal and the awarding person are on no current page; owner to verify before restoring. | |
| `home-t7b639691` | / | Doctors | text | “Save the natural teeth, even if they are mobile.” | removed (0.22) | (none) | Disclosure | His quote; on no current page. Owner to approve the wording (it reads as clinical advice). | |
| `home-ta1c97207` | / | Doctors | text | Explore Dr. Miftah | shortened (0.66) | Dr. Miftah at work | Intentional drop | Old link label; the link now has a better anchor ("View profile of Dr. Md. Miftah Ur Rahman"). | |
| `home-t963d296a` | / | Doctors | text | Dr. Md. Miftah Ur Rahman is a Prosthodontist and Implantologist and Assistant Director at Neodent Dental Hospital. | shortened (0.7) | A Prosthodontist and Implantologist, Dr. Md. Miftah Ur Rahman restores and replaces teeth, from crowns and dentures to dental implants, and starts every case with a full assessment before a plan is put forward. | Intentional drop | Specialty kept in the current sentence; role covered by home-t64b58b74. | |
| `home-t1df51668` | / | Doctors | text | He practises across both Neodent locations in Hyderabad — Mehdipatnam and Nampally — alongside the practice's founder, Dr. Mohd. Siraj Ur Rahman, in the same specialist disciplines Neodent has been built around since 1994. | removed (0.24) | (none) | Disclosure | Bio paragraph: both clinics, works with the founder, since 1994. | |
| `home-t61216309` | / | Doctors | text | His specialist grounding is in prosthodontics and implantology — the rehabilitation and replacement of teeth, from crowns, bridges and dentures through to the surgical placement of dental implants. | shortened (0.4) | A Prosthodontist and Implantologist, Dr. Md. Miftah Ur Rahman restores and replaces teeth, from crowns and dentures to dental implants, and starts every case with a full assessment before a plan is put forward. | Disclosure | Bio paragraph; the current sentence keeps most of it ("bridges" lost). | |
| `home-t62b46073` | / | Doctors | text | Much of that work is reconstructive rather than routine, which is why a consultation with him usually begins with a full assessment before any treatment plan is put forward. | removed (0.34) | (none) | Disclosure | Bio paragraph (full assessment before a plan). | |
| `home-tc65aff0a` | / | Doctors | text | Alongside clinical dentistry he teaches as an Assistant Professor at SB Patil Dental College & Hospital, in the Department of Prosthodontics. | shortened (0.52) | Assistant Professor, Department of Prosthodontics, SB Patil Dental College & Hospital | Intentional drop | Same fact as the current role line (Assistant Professor, SB Patil, Prosthodontics). | |
| `home-t2c0a991e` | / | Doctors | text | That academic involvement is not separate from his practice at Neodent: teaching keeps the clinical reasoning current, and the two have run in parallel throughout his career. | removed (0.22) | (none) | Disclosure | Bio paragraph (teaching and practice). | |
| `home-tfea37852` | / | Doctors | text | He qualified BDS and MDS, holds FICOI (U.S.A.) certification and is a Gold Medallist, with 15+ years in clinical dentistry. | removed (0.31) | (none) | Disclosure | Credentials are on his card; "15+ years" goes with home-ta3f6e809. | |
| `home-t305f1122` | / | Doctors | text | As Assistant Director he carries that experience into how Neodent plans and explains treatment — precision, clear conversations, and care that stays personal even when the work ahead is complex. | removed (0.27) | (none) | Disclosure | Bio paragraph (how he plans and explains treatment). | |
| `home-t38e01a3e` | / | Doctors | text | Portfolio / Professional moments Clinical practice · Recognition · Teaching · Academic | removed (0.25) | (none) | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio heading; the portfolio was removed in P5 and the profile page has the photos. | |
| `home-t1abdd620` | / | Doctors | text | Teaching / Academic Teaching prosthodontics at SB Patil Dental College & Hospital. | shortened (0.63) | Assistant Professor, Department of Prosthodontics, SB Patil Dental College & Hospital | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio caption; the profile page covers his SB Patil teaching. | |
| `home-t050887bf` | / | Doctors | text | ii (hidden) | removed (0) | (none) | Intentional drop | Roman numeral. | |
| `home-t4c3119e1` | / | Doctors | text | Recognition Professional recognition. | shortened (0.66) | Recognition Recognition ceremony | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio caption; the profile page has the recognition photos. | |
| `home-t6b81f467` | / | Doctors | text | As Assistant Director at Neodent, his prosthodontic and implant work spans the Mehdipatnam and Nampally clinics. | removed (0.37) | (none) | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio caption text; covered on the profile page. | |
| `home-t2d88a0e6` | / | Doctors | text | It centres on restoring what can be saved and rebuilding what cannot — implants, full-mouth rehabilitation and the restorative work that follows — with a full assessment and a plan before treatment begins. | removed (0.34) | (none) | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio caption text (implants, full-mouth rehabilitation); covered on the profile page. | |
| `home-t79826e4a` | / | Doctors | text | Alongside clinical practice, he teaches and conducts seminars as Assistant Professor in the Department of Prosthodontics at SB Patil Dental College & Hospital — and that teaching keeps the clinical reasoning current. | removed (0.35) | (none) | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio caption text (seminars, SB Patil); the profile page has the seminar photos. | |
| `home-t188d45da` | / | Doctors | text | iii (hidden) | removed (0) | (none) | Intentional drop | Roman numeral. | |
| `home-t176cb535` | / | Doctors | text | Academic / Institutional Academic teaching and professional development. | removed (0.28) | (none) | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio caption. | |
| `home-t8eb49d17` | / | Doctors | text | iv (hidden) | removed (0) | (none) | Intentional drop | Roman numeral. | |
| `home-t0de1f858` | / | Doctors | text | 04 / PROFILE FILM NEODENT / 2026 | shortened (0.4) | © 2026 Neodent Dental Hospital | Intentional drop | Numbered label of the profile film removed in P5. | |
| `home-t6bf18012` | / | Doctors | text | Clinical film Dr. Miftah Ur Rahman / In practice. | shortened (0.5) | Dr. Md. Miftah Ur Rahman | Internal page with link (/doctors/dr-miftah-ur-rahman) | Profile film label; drop if the film is not on the profile page. | |
| `home-t7b58e820` | / | Doctors | text | Supporting clinical team Established expertise / one practice | removed (0.28) | (none) | Intentional drop | Replaced by the plain h3 "Our clinical team". | |
| `home-t73922a2b` | / | Doctors | text | 01 / SENIOR CLINICAL LEADERSHIP | removed (0.25) | (none) | Intentional drop | Numbered label. | |
| `home-t60d6bbcd` | / | Doctors | text | BDS · FCIP · MDS (Chennai) Professor · Director, Neodent · 30+ years | shortened (0.44) | BDS · FCIP · MDS (Chennai) | Visible | Founder's role and years (Professor, Director, 30+ years); the current card keeps only the degrees. | |
| `home-t9c0fb95f` | / | Doctors | text | 02 / NEODENT TEAM | removed (0.33) | (none) | Intentional drop | Numbered label. | |
| `home-t42c4bb33` | / | Doctors | text | AS Portrait not available (hidden) | removed (0.25) | (none) | Intentional drop | Placeholder text ("Portrait not available"); the portrait is now supplied. | |
| `home-t4942d7c0` | / | Doctors | text | 03 / CLINICAL TEAM | shortened (0.66) | Our clinical team | Intentional drop | Numbered label; replaced by "Our clinical team". | |
| `home-t0e35fc7a` | / | Doctors | text | ST Portrait not available (hidden) | removed (0.25) | (none) | Intentional drop | Placeholder text; the portrait is now supplied. | |
| `home-t817c49d2` | / | Doctors | text | 04 / CLINICAL TEAM | shortened (0.66) | Our clinical team | Intentional drop | Numbered label. | |
| `home-tf8cf24ad` | / | Doctors | text | 05 / CLINICAL TEAM | shortened (0.66) | Our clinical team | Intentional drop | Numbered label. | |
| `home-l25b71063` | / | Doctors | link | Explore Dr. Miftah -> `/doctors/dr-miftah-ur-rahman` | shortened | anchors now: view profile of dr md miftah ur rahman / see his work and profile | Intentional drop | Same href, better anchor ("View profile of Dr. Md. Miftah Ur Rahman"). | |
| `home-a127144fd` | / | Doctors | alt | Portrait of Dr. Md. Miftah Ur Rahman in a white coat at Neodent Dental Hospital | shortened (0.73) | Dr. Md. Miftah Ur Rahman beside the dental chair in a treatment room at Neodent Dental Hospital, holding a dental study model | Intentional drop | Photo replaced; the new alt describes the new photo. | |
| `home-a0ae50c15` | / | Doctors | alt | Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist, standing beside the dental chair in a treatment room at Neodent Dental Hospital, Hyderabad, holding a dental study model | shortened (0.81) | Dr. Md. Miftah Ur Rahman beside the dental chair in a treatment room at Neodent Dental Hospital, holding a dental study model | Visible | Same photo; the alt lost "Prosthodontist and Implantologist" and "Hyderabad" (R5). | |
| `home-aefa38c46` | / | Doctors | alt | Dr. Md. Miftah Ur Rahman conducting a prosthodontics seminar for dental students at the Department of Prosthodontics, SB Patil Dental College & Hospital | shortened (0.47) | Dr. Md. Miftah Ur Rahman beside the dental chair in a treatment room at Neodent Dental Hospital, holding a dental study model | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio photo; on the profile page with this alt. | |
| `home-aeb59c31a` | / | Doctors | alt | Dr. Md. Miftah Ur Rahman receiving a framed certificate presented by Dr. K Mahendranadh Reddy | shortened (0.4) | Dr. Md. Miftah Ur Rahman beside the dental chair in a treatment room at Neodent Dental Hospital, holding a dental study model | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio photo; on the profile page with this alt. | |
| `home-aafa2ad2b` | / | Doctors | alt | Dr. Md. Miftah Ur Rahman in a clinical coat at the entrance to the Department of Prosthodontics, SB Patil Dental College & Hospital | shortened (0.47) | Dr. Md. Miftah Ur Rahman beside the dental chair in a treatment room at Neodent Dental Hospital, holding a dental study model | Internal page with link (/doctors/dr-miftah-ur-rahman) | Portfolio photo; the profile page has no photo with this alt. Drop, or add it there later. | |
| `home-te2b25f9f` | / | Patient stories | text | Real experiences from patients who trusted Neodent with their care. | removed (0.3) | (none) | Visible | One-line lede under the h2; says what the section is (R3). | |
| `home-t0c5f4b80` | / | Patient stories | text | Comfort & relief | removed (0.66): words only inside a much longer sentence | (none) | Intentional drop | Label of the theme selector removed in P6; the quotes themselves are kept. | |
| `home-tf9a8adc0` | / | Patient stories | text | Confidence & change | removed (0.33) | (none) | Intentional drop | Label of the theme selector removed in P6. | |
| `home-tb6f69806` | / | Patient stories | text | Google Patient review (hidden) | shortened (0.66) | Google Google review | Intentional drop | Reworded to "Google review". | |
| `home-tc73c865f` | / | Patient stories | text | Explore all patient stories | shortened (0.5) | Explore all treatments | Intentional drop | Button with no destination page (there is no stories page). | |
| `home-t83fb7040` | / | What to expect | text | A direct conversation with Dr. Md. Siraj Ur Rahman about what's on your mind. | shortened (0.66) | A direct conversation with a Neodent specialist about what's on your mind. | Visible | Owner decision: restore only if consultations are with Dr. Siraj (open item 13.1). | |
| `home-t9458b9f2` | / | What to expect | text | Explore your visit | shortened (0.66) | Plan your visit | Intentional drop | Replaced by "Plan your visit". | |
| `home-le82d6255` | / | What to expect | link | Explore your visit -> `#contact` | removed | (none) | Intentional drop | In-page anchor to the old #contact id; the button now reads "Plan your visit". | |
| `home-t2a27df13` | / | Spaces | text | Mehdipatnam Neodent Dental Hospital · Hyderabad | shortened (0.6) | Neodent Dental Hospital | Visible | Branch name with place ("Neodent Dental Hospital, Mehdipatnam, Hyderabad"); GEO naming (R8). | |
| `home-tf455b5fa` | / | Spaces | text | Nampally Neodent Dental Hospital · Hyderabad | shortened (0.6) | Neodent Dental Hospital | Visible | Same, Nampally. | |
| `home-t58425eed` | / | Spaces | text | Get directions | shortened (0.5) | Directions | Visible | Restore a descriptive anchor ("Get directions to the Mehdipatnam clinic", R4); the link itself is kept. | |
| `home-tf26ed1c7` | / | Spaces | text | Two locations. | shortened (0.5) | Locations | Intentional drop | Strip removed in P8; same message in the hero ("Two clinics. One standard of care.") and in Care begins. | |
| `home-t3fcea972` | / | Spaces | text | One Neodent standard. | shortened (0.66) | One standard of care. | Intentional drop | Same strip as the row above. | |
| `home-l629c5734` | / | Spaces | link | Get directions -> `https://www.google.com/maps/search/?api=1&query=10-3-14B%...` | shortened | anchors now: 4 3 4 3 4 3 mehdipatnam 261 reviews / directions | Visible | Same link; the anchor is now "Directions" plus the rating. See home-t58425eed. | |
| `home-t5a860674` | / | Consultation block | text | Let's make your next step feel simple. | removed (0.25) | (none) | Intentional drop | Replaced by the plain h2 "Book a consultation" (R3). | |
| `home-t2ff85726` | / | Consultation block | text | Whether you have a dental concern, want to understand your treatment options, or simply want to speak with our team, we're here to help you take the next step with clarity. | removed (0.28) | (none) | Visible | Lede with "treatment options" phrasing; restore under "Book a consultation". | |
| `home-t67b229f1` | / | Consultation block | text | You can also send an enquiry through our contact page. | removed (0.3) | (none) | Visible | This block lost its /contact link ("Send an enquiry"). Restore one link to /contact (R4). | |
| `home-h0c50116f` | / | Consultation block | h2 | Let's make your next step feel simple. | removed (0) | (none) | Intentional drop | Heading replaced by "Book a consultation". | |
| `about-t88a933ce` | /about | Consultation block | text | Let's make your next step feel simple. | removed (0.12) | (none) | Intentional drop | Shared component (R10): same as home-t5a860674. | |
| `about-t29270bbc` | /about | Consultation block | text | Whether you have a dental concern, want to understand your treatment options, or simply want to speak with our team, we're here to help you take the next step with clarity. | removed (0.21) | (none) | Visible | Shared component (R10): same as home-t2ff85726. | |
| `about-ta2ea9cc1` | /about | Consultation block | text | You can also send an enquiry through our contact page. | removed (0.3) | (none) | Visible | Shared component (R10): same as home-t67b229f1. | |
| `about-h059185d5` | /about | Consultation block | h2 | Let's make your next step feel simple. | removed (0) | (none) | Intentional drop | Shared component (R10): same as home-h0c50116f. | |
| `chrome-t6ef8c13f` | * | Footer | text | Changing smiles since decades. | shortened (0.75) | Decades of changing smiles. | Intentional drop | Footer (shared, R10): replaced by "Changing smiles since 1994." (P9), which is more specific. | |

## (d) Routes whose text changed, and the likely cause

| Route | What changed (server HTML) | Likely cause |
|---|---|---|
| / | See (b) and (c). | P0 to P10 and the hero passes (`components/Home.tsx`, `components/hero/*`, `components/sections/*`). |
| /about | Consultation block: "Let's make your next step feel simple." heading and its 3 sentences replaced by "Book a consultation", the form and both clinics' hours; gained a `/privacy-policy` link. Footer line. | `components/sections/ContactNextStep.tsx`, which /about imports through `app/about/AboutClientChrome.tsx`. This shared file is **not in the R10 list**; suggest adding it. Footer: `components/layout/Footer.tsx` (R10). |
| /clinic/mehdipatnam, /clinic/nampally | Clinical team gained "Dr. Hafsa Taha" (h3 plus "BDS · Dental Surgeon") and a "View Dr. Mohd. Siraj Ur Rahman full profile" link to `/about#founder`. Footer line. | `lib/clinical-team.ts` (R10), used by `components/clinic/branch/BranchClinicalTeam.tsx`. Footer (R10). Additions only; nothing lost. |
| /clinic, /contact, /doctors, /doctors/dr-miftah-ur-rahman, /privacy-policy, /treatments and the seven treatment pages | Only the footer: "1994" plus "Changing smiles since decades." became "Changing smiles since 1994." (one word fewer per page). | `components/layout/Footer.tsx` (R10, P9). |

`components/ui/EditorialHighlight.tsx`, `lib/site-data.ts` and `app/globals.css` (all R10) also changed. No text change on internal pages traces to them: every internal-page text difference is explained by the rows above. Meta tags are identical on every route, except the home page's `og:image` / `twitter:image` cache-busting hash, which changes with every build.

## (e) Technical checks

- **robots.txt:** HTTP 200 on both builds, byte-identical (yes). `User-Agent: *`, `Allow: /`, `Disallow: /api/`, `Sitemap: https://www.neodentdentalhospitals.com/sitemap.xml`. No route is blocked.
- **Sitemap:** `/sitemap.xml` HTTP 200, 17 URLs on both builds, identical paths (yes), host `www.neodentdentalhospitals.com`. Every listed route returned 200 on both builds. `lastModified` is the build time, so it differs between builds by design.
- **Canonicals:** present on all 17 routes on both builds, absolute, on `https://www.neodentdentalhospitals.com`, and each matches its own route. Unchanged.
- **Robots meta:** `index, follow` on all 17 routes on both builds.
- **Titles:** one `<title>` per route, all unique, unchanged between builds. Over 65 characters (may be truncated in results; not an error): /about (69), /doctors/dr-miftah-ur-rahman (68), /treatments/smile-design (69).
- **Meta descriptions:** present on all routes, all unique, unchanged. Over 170 characters (Google may cut them): / (209), /about (183), /clinic (216), /contact (176), /doctors/dr-miftah-ur-rahman (181), /treatments (209). These predate the redesign.
- **JSON-LD validity:** 80 blocks on the current build (80 on the baseline). Every block parses with `JSON.parse` on both builds. Block counts and `@type` sets are the same per route. All 989 baseline field/value pairs are present in the current build, and none were added. `MedicalOrganization.foundingDate = 1994` is present (R6).
- **One `h1` per route:** yes, on every route on both builds.
- **Images without an `alt` attribute:** none on either build.
- Not checked here: whether JSON-LD values match the visible text (that is S6), and schema validation against schema.org or Google's Rich Results rules (parsing only).

## JavaScript-only text on the current home page (R2)

Method: the current home page loaded twice, once with JavaScript off and once with it on (1366 x 900, scrolled to the bottom, then 8 s of idle time). The server HTML has 1656 words; the rendered page has 1747. Sentences that appear only after JavaScript runs:

| Where | Text only present with JavaScript | Assessment |
|---|---|---|
| Patient stories | 4.3 0.0 4.3 Mehdipatnam 261 reviews | `CountUp` caught mid-animation (the animated copy reads 0). The final number is in the server HTML. Fine; varies between runs. |
| Patient stories | 4.6 0.0 4.6 Nampally 157 reviews | `CountUp` caught mid-animation (the animated copy reads 0). The final number is in the server HTML. Fine; varies between runs. |
| Patient stories | Read more | Review expand button, shown only when a review overflows. The full review text is in the server HTML. Fine. |
| Spaces | 4:00 PM – 8:00 PM · Sunday holiday Opens at 4:00 PM | Live "Open now" / "Opens at" chip computed from the clock. The hours themselves are in the server HTML. Fine. |
| Spaces | 10:30 AM – 5:00 PM · Sunday holiday Open now | Live "Open now" / "Opens at" chip computed from the clock. The hours themselves are in the server HTML. Fine. |
| Consultation block | Verification | Turnstile captcha label in the enquiry form. Not content; fine. |
| div.lead-panel | Before you go | `LeadCapture` dialog (opens after load). Its h2 and text are not in the server HTML. Fine for a pop-up, but its hours text ("10:00 AM - 08:00 PM") and Humayun-Nagar-only wording conflict with site data (open item 13.1, item 4). |
| div.lead-panel | Let's make it easy to visit. | `LeadCapture` dialog (opens after load). Its h2 and text are not in the server HTML. Fine for a pop-up, but its hours text ("10:00 AM - 08:00 PM") and Humayun-Nagar-only wording conflict with site data (open item 13.1, item 4). |
| div.lead-panel | Call the clinic, or find your way to Humayun Nagar — whichever feels right. | `LeadCapture` dialog (opens after load). Its h2 and text are not in the server HTML. Fine for a pop-up, but its hours text ("10:00 AM - 08:00 PM") and Humayun-Nagar-only wording conflict with site data (open item 13.1, item 4). |
| div.lead-panel | Open today, 10:00 AM – 08:00 PM | `LeadCapture` dialog (opens after load). Its h2 and text are not in the server HTML. Fine for a pop-up, but its hours text ("10:00 AM - 08:00 PM") and Humayun-Nagar-only wording conflict with site data (open item 13.1, item 4). |
| div.lead-panel | Get directions to the clinic | `LeadCapture` dialog (opens after load). Its h2 and text are not in the server HTML. Fine for a pop-up, but its hours text ("10:00 AM - 08:00 PM") and Humayun-Nagar-only wording conflict with site data (open item 13.1, item 4). |
| Other (skip link, etc.) | We use cookies | Cookie consent banner, injected on load. Not content; fine. |
| Other (skip link, etc.) | Neodent uses cookies and similar technologies to keep the website working, understand how visitors use our site, and support certain embedded content. | Cookie consent banner, injected on load. Not content; fine. |
| Other (skip link, etc.) | You can choose which optional technologies you allow. | Cookie consent banner, injected on load. Not content; fine. |
| Other (skip link, etc.) | Manage preferences | Cookie consent banner, injected on load. Not content; fine. |
| Other (skip link, etc.) | Reject non-essential | Cookie consent banner, injected on load. Not content; fine. |
| Other (skip link, etc.) | Accept all | Cookie consent banner, injected on load. Not content; fine. |

Headings only with JavaScript: h2 "Let's make it easy to visit." (div.lead-panel). Links only with JavaScript: "4.3 0.0 4.3 Mehdipatnam 261 reviews" -> `https://www.google.com/maps/search/?api=1&query...`; "4.6 0.0 4.6 Nampally 157 reviews" -> `https://www.google.com/maps/search/?api=1&query...`; "Call the Clinic" -> `tel:+919246348485`; "Get directions to the clinic" -> `https://www.google.com/maps/search/?api=1&query...` (both in the LeadCapture dialog). Alt texts only with JavaScript: none. JSON-LD blocks: 4 in the server HTML, 4 after JavaScript.

**Result:** no section content of the home page depends on JavaScript. Everything only visible with JavaScript is consent, a pop-up, a captcha, a live open/closed chip or a button.

## (f) Proposed target keywords (inferred, owner to approve)

**Inferred, owner to approve.** Built only from the baseline text (counts are occurrences in the baseline server HTML: home / all 17 routes) and the treatment and location page titles. No search-volume data was used, so the order is a judgment, not a measurement. Per Part 15.3: if the owner does not approve, S1 and S5 use only phrases already in the baseline text.

| Group | Phrase | Source in the baseline | Main page (proposal) |
|---|---|---|---|
| Brand | Neodent Dental Hospital | home title; 11 / 101 uses of "dental hospital" | / |
| Brand | Neodent Hyderabad, Neodent Mehdipatnam, Neodent Nampally | brand + place in text, footer, location titles | /, location pages |
| Head, local | dental hospital in Mehdipatnam, Hyderabad | /clinic/mehdipatnam title; "Mehdipatnam" 12 / 156 | /clinic/mehdipatnam (home links to it) |
| Head, local | dental hospital in Nampally, Hyderabad | /clinic/nampally title; "Nampally" 12 / 162 | /clinic/nampally |
| Head, local | dentist in Mehdipatnam; dentist in Nampally | "dentist" 7 / 191, with both places | location pages, home |
| Head | specialist dental care in Hyderabad | home title; "specialist" 10 / 56, "specialist-led" 6 / 32 | / |
| Head | multi-speciality dental clinic Hyderabad | "Multi-speciality clinic" (baseline stat strip, home-t1b1f4faf); "multi-speciality" 1 / 1 | / |
| Landmark | dental hospital in Medwin Hospital Complex, Nampally; dental clinic Humayun Nagar, Mehdipatnam | "Medwin" 2 / 35, "Humayun Nagar" 3 / 39 | location pages |
| Treatment | dental implants in Nampally and Mehdipatnam | treatment page title; "dental implant" 3 / 81 | /treatments/dental-implants |
| Treatment | root canal treatment in Nampally and Mehdipatnam | page title; 3 / 80 | /treatments/root-canal-treatment |
| Treatment | braces and orthodontics in Hyderabad | page title; "braces" 3 / 84 | /treatments/braces-and-orthodontics |
| Treatment | smile design and cosmetic dentistry | page title; "smile design" 6 / 76 | /treatments/smile-design |
| Treatment | full mouth rehabilitation | page title; 2 / 69 | /treatments/full-mouth-rehabilitation |
| Treatment | composite build-up | page title; 6 / 72 | /treatments/composite-build-up |
| Treatment | scaling and polishing (teeth cleaning) | page title; 3 / 55. "Teeth cleaning" is not in the baseline: owner to approve before use. | /treatments/scaling-and-polishing |
| Need, patient words | missing tooth replacement; worn tooth restored; crowns, bridges and dentures | baseline treatments intro (home-t47342fbd), Dr. Miftah's bio | /, implants and full-mouth pages |
| Doctor | Dr. Mohd. Siraj Ur Rahman, prosthodontist and implantologist, Hyderabad | hero, Legacy, Doctors; "prosthodont" 12 / 67, "implantolog" 6 / 41 | /about#founder, / |
| Doctor | Dr. Md. Miftah Ur Rahman, prosthodontist and implantologist | Doctors section, profile page title | /doctors/dr-miftah-ur-rahman |
| Trust | since 1994; three decades; 30+ years | "1994" 6 / 37, "30+ years" 6 / 14 | /, /about |
| Trust | Professor, Osmania Government Dental College; SB Patil Dental College | founder and Dr. Miftah credentials | /about, profile page |
| Trust | Google reviews (4.3, 261 reviews) | "Google reviews" 3 / 38 | / (owner to keep the numbers current) |

Notes: "dental clinic" appears only twice in the baseline; the site calls itself a "dental hospital". Choosing which term leads is an owner decision (R8: the brand name stays as on the Google Business Profile). Dr. Muti Ur Rahman is MBBS / MD (General Medicine) and is deliberately not in any dental keyword (R8).

## (g) Hero only (`section#home`): baseline vs current

For checking after the hero pass (R3 to R5). Order is document order. "(hidden)" = in the server HTML but on an inactive slide or otherwise not shown without JavaScript. No action in the S-series.

**Headings**

| Baseline | Current |
|---|---|
| h1: Three decades of changing smiles. | h1: Three decades of changing smiles. |
| h2: Where Neodent is. (hidden) | h2: Two clinics. One standard of care. (hidden) |
| h3: Mehdipatnam (hidden) | h2: Recognised beyond the clinic. (hidden) |
| h3: Nampally (hidden) |  |
| h2: Recognised beyond the clinic. (hidden) |  |

**Supporting lines (non-heading text)**

| Baseline | Current |
|---|---|
| Mehdipatnam · Nampally · Hyderabad (hidden) | Neodent Dental Hospital |
| Neodent Dental Hospital | Three decades of changing smiles. |
| Changing smiles since 3 decades. | Specialist dental care in Hyderabad · Since 1994 |
| Dr. Mohd. Siraj Ur Rahman | Dr. Mohd. Siraj Ur Rahman Dental Surgeon · Prosthodontist · Implantologist |
| Dental Surgeon · Prosthodontist · Implantologist | 4.3 · 261 Google reviews |
| 4.3 · 261 Google reviews | Call for Consultation |
| 2 Hyderabad locations·Mehdipatnam·Nampally (hidden) | Send an enquiry |
| Call for Consultation | Since 1994 Mehdipatnam · Nampally |
| 30+ Years of changing smiles (hidden) | Call today for a consultation +91 9246348485 |
| Call today for a consultation | Two clinics. (hidden) |
| +91 9246348485 | One standard of care. (hidden) |
| Hyderabad · Telangana (hidden) | Visit us in Mehdipatnam or Nampally, Hyderabad. (hidden) |
| Where Neodent is. (hidden) | Mehdipatnam Humayun Nagar, Hyderabad (hidden) |
| Two Hyderabad locations. (hidden) | Nampally Medwin Hospital Complex, Hyderabad (hidden) |
| One standard of care. (hidden) | Recognised beyond the clinic. (hidden) |
| Mehdipatnam (hidden) | Documented in print and on air. (hidden) |
| Nampally (hidden) | The Siasat Daily, Hyderabad (hidden) |
| 01 (hidden) | News18 Urdu (hidden) |
| Dental hospital · Hyderabad (hidden) | Awards and certificates (hidden) |
| 02 (hidden) |  |
| Medwin Hospital Complex · Hyderabad (hidden) |  |
| In print · On air · Hyderabad 03 (hidden) |  |
| Recognised beyond the clinic. (hidden) |  |
| Documented in print and on air. (hidden) |  |
| Practised the same way, every day. (hidden) |  |
| Press (hidden) |  |
| Public media (hidden) |  |
| Recognition (hidden) |  |
| The Siasat Daily · Hyderabad (hidden) |  |
| News18 Urdu (hidden) |  |
| Institutional recognition (hidden) |  |
| 01 / 03 (hidden) |  |

**Links (anchor -> href)**

| Baseline | Current |
|---|---|
| Call for Consultation -> tel:+919246348485 | Call for Consultation -> tel:+919246348485 |
| +91 9246348485 -> tel:+919246348485 | Send an enquiry -> /contact |
| Mehdipatnam -> /clinic (hidden) | Call today for a consultation +91 9246348485 -> tel:+919246348485 |
| Nampally -> /clinic (hidden) | Call for Consultation -> tel:+919246348485 (hidden) |
|  | Send an enquiry -> /contact (hidden) |
|  | Mehdipatnam Humayun Nagar, Hyderabad -> /clinic/mehdipatnam (hidden) |
|  | Nampally Medwin Hospital Complex, Hyderabad -> /clinic/nampally (hidden) |
|  | Call for Consultation -> tel:+919246348485 (hidden) |
|  | Send an enquiry -> /contact (hidden) |

**Image alt texts**

| Baseline | Current |
|---|---|
| Dr. Mohd. Siraj Ur Rahman, BDS, FCIP, MDS, Director of Neodent Dental Hospital, Hyderabad | Dr. Mohd. Siraj Ur Rahman, BDS, FCIP, MDS, Director of Neodent Dental Hospital, Hyderabad |
| Neodent Dental Hospital Mehdipatnam interior — the patient waiting lounge | Neodent Dental Hospital Mehdipatnam interior, the patient waiting lounge |
| Neodent Dental Hospital Mehdipatnam exterior — the entrance doorway and registration counter | Neodent Dental Hospital Nampally exterior, the street frontage and signage |
| Neodent Dental Hospital Nampally exterior — the street frontage and signage | The Siasat Daily, Hyderabad: newspaper coverage of a Neodent Dental Hospital dental implant camp and lecture. |
| Neodent Dental Hospital Nampally interior — the reception and registration counter | News18 Urdu television: a dental health segment on the programme Hello Parwaz featuring Neodent Dental Hospital. |
| The Siasat Daily, Hyderabad — newspaper coverage of a Neodent Dental Hospital dental implant camp and lecture. | Awards, mementos and certificates received by Neodent Dental Hospital, on display at the hospital. |
| News18 Urdu television — a dental health segment on the programme Hello Parwaz featuring Neodent Dental Hospital. |  |
| Awards, mementos and certificates received by Neodent Dental Hospital, on display at the hospital. |  |

Hero observations for the hero pass:
- The `h1` is the same ("Three decades of changing smiles."). The current hero adds a plain supporting line, "Specialist dental care in Hyderabad · Since 1994", which is what R3 asks for.
- Slide 2 lost its two h3 clinic headings ("Mehdipatnam", "Nampally") and the "Where Neodent is." h2. Gained: the links now go to the two location pages with anchors that include the area (R4 improvement).
- Slide 3 lost the Press / Public media / Recognition channel labels and the "Practised the same way, every day." line.
- Photos: baseline had four clinic photos (two per clinic); the current hero has two (Mehdipatnam interior, Nampally exterior). The alt texts of the two dropped photos are gone from the hero. The Mehdipatnam exterior photo still appears in Spaces with a new alt.
- The phone number is still a `tel:` link; its anchor now includes "Call today for a consultation".

## Appendix: kept rows on the home page

<details><summary>168 rows (click to open)</summary>

| Section | Kind | Text | ID |
|---|---|---|---|
| Other (skip link, etc.) | text | Call Neodent | home-t488ff8e6 |
| Other (skip link, etc.) | link | Call Neodent -> tel:+919246348485 | home-l0918f606 |
| Hero | text | Mehdipatnam · Nampally · Hyderabad | home-t8ede3ed6 |
| Hero | text | Neodent Dental Hospital | home-t17910529 |
| Hero | text | Three decades of changing smiles. | home-td8dc4fb6 |
| Hero | text | Dr. Mohd. Siraj Ur Rahman | home-ta05212b4 |
| Hero | text | Dental Surgeon · Prosthodontist · Implantologist | home-t8f6427c4 |
| Hero | text | 4.3 · 261 Google reviews | home-t5f7c328f |
| Hero | text | Call for Consultation | home-t04f77377 |
| Hero | text | Call today for a consultation | home-tca3bf4de |
| Hero | text | +91 9246348485 | home-t8f2edb44 |
| Hero | text | Hyderabad · Telangana | home-tefc61a9e |
| Hero | text | One standard of care. | home-t1171cc00 |
| Hero | text | Dental hospital · Hyderabad | home-t3dbd31a8 |
| Hero | text | Medwin Hospital Complex · Hyderabad | home-t40f29bb6 |
| Hero | text | Recognised beyond the clinic. | home-t943fc765 |
| Hero | text | Documented in print and on air. | home-tba0b3e8e |
| Hero | text | Press | home-t70a4bbf5 |
| Hero | text | Recognition | home-t71569e8f |
| Hero | text | The Siasat Daily · Hyderabad | home-t7647b010 |
| Hero | text | News18 Urdu | home-tae6db916 |
| Hero | h1 | Three decades of changing smiles. | home-h0e888922 |
| Hero | h2 | Recognised beyond the clinic. | home-hdfd5a76b |
| Hero | link | Call for Consultation -> tel:+919246348485 | home-lcf3456a9 |
| Hero | alt | Dr. Mohd. Siraj Ur Rahman, BDS, FCIP, MDS, Director of Neodent Dental Hospital, Hyderabad | home-ab72eccc9 |
| Hero | alt | Neodent Dental Hospital Mehdipatnam interior — the patient waiting lounge | home-a7ce7261d |
| Hero | alt | Neodent Dental Hospital Nampally exterior — the street frontage and signage | home-addaf0f92 |
| Hero | alt | The Siasat Daily, Hyderabad — newspaper coverage of a Neodent Dental Hospital dental implant camp and lecture. | home-a5590bc57 |
| Hero | alt | News18 Urdu television — a dental health segment on the programme Hello Parwaz featuring Neodent Dental Hospital. | home-a874957d5 |
| Hero | alt | Awards, mementos and certificates received by Neodent Dental Hospital, on display at the hospital. | home-a371cd7e0 |
| Stat strip + Care begins | text | 30+ years' experience | home-t03a67788 |
| Stat strip + Care begins | text | Care begins the moment you walk in. | home-t361e8125 |
| Stat strip + Care begins | text | Calm An unhurried pace, a reassuring space. | home-tc72433b1 |
| Stat strip + Care begins | text | Precise Careful diagnosis, exact and clear work. | home-t54664c2d |
| Stat strip + Care begins | text | Personal Every plan shaped around you. | home-t20ce4269 |
| Stat strip + Care begins | text | Discover Our Story → | home-t809fe7a2 |
| Stat strip + Care begins | h2 | Care begins the moment you walk in. | home-hebbbf6d3 |
| Stat strip + Care begins | link | Discover Our Story → -> /about | home-l2d377f07 |
| Seam card | text | — Neodent Dental Hospital | home-tff816e00 |
| Seam card | text | Mehdipatnam · Nampally | home-t3524521b |
| Seam card | alt | Dr. Mohd. Siraj Ur Rahman, Director of Neodent Dental Hospital, Hyderabad | home-aab267b73 |
| 1994 / Legacy | text | Decades of changing smiles. | home-t6159ec55 |
| 1994 / Legacy | text | Established in Hyderabad | home-t3a877fcd |
| 1994 / Legacy | text | Dr. Mohd. Siraj Ur Rahman | home-tbad04346 |
| 1994 / Legacy | text | Founder · Director | home-t435d5e68 |
| 1994 / Legacy | text | 30+ Years of experience | home-t5afcee15 |
| 1994 / Legacy | text | Qualifications | home-tcf2bc0e7 |
| 1994 / Legacy | text | BDS · FCIP · MDS (Chennai) | home-t0f0ae524 |
| 1994 / Legacy | text | Specialism | home-t654b341a |
| 1994 / Legacy | text | Dental Surgeon · Prosthodontist · Implantologist | home-t07db6050 |
| 1994 / Legacy | text | Academic post | home-t38b3d371 |
| 1994 / Legacy | text | Professor, Osmania Government Dental College & Hospital, Hyderabad | home-t9126b077 |
| 1994 / Legacy | text | The same specialist-led approach that shaped Neodent from the beginning still guides treatment today. | home-te0611850 |
| 1994 / Legacy | text | i The Siasat Daily · Hyderabad Press feature, Urdu daily | home-t6cdabe2b |
| 1994 / Legacy | text | ii News18 Urdu On-air interview segment | home-t5da266be |
| 1994 / Legacy | text | 25,000+ Patients treated | home-tcecf83e8 |
| 1994 / Legacy | text | Different generations. | home-teddaabad |
| 1994 / Legacy | text | One standard of care. | home-t1d607102 |
| 1994 / Legacy | text | 1994 Today | home-tebf739a2 |
| 1994 / Legacy | h2 | Decades of changing smiles. | home-h0bc3f347 |
| 1994 / Legacy | h3 | Dr. Mohd. Siraj Ur Rahman | home-h0bc26938 |
| 1994 / Legacy | alt | Dr. Mohd. Siraj Ur Rahman, founder and director of Neodent Dental Hospital | home-acfccf53d |
| 1994 / Legacy | alt | Neodent feature in The Siasat Daily, Hyderabad | home-a104bc6c3 |
| 1994 / Legacy | alt | Neodent doctor during a News18 Urdu television interview | home-ac618ef0a |
| 1994 / Legacy | alt | Neodent recognition archive | home-a5918ed8f |
| Treatments | text | What can we help you with? | home-tb5cf023a |
| Treatments | text | Focused care for the dental problems that bring patients to us. | home-t15cfdaaf |
| Treatments | text | Each area below is shown with a real case from our clinics, so you can see the kind of work we do before you decide. | home-t8a4248f3 |
| Treatments | text | Composite Build-up Rebuild part of a damaged tooth with tooth-coloured composite resin. | home-t1d30e82d |
| Treatments | text | REPAIR | home-tfee0708f |
| Treatments | text | Dental Implants Replace a missing tooth with an implant-supported crown, bridge or denture. | home-t76a9ec8f |
| Treatments | text | REPLACE | home-t4e3d441e |
| Treatments | text | Root Canal Treatment Treat infection or inflammation inside a tooth so it may be kept. | home-t69ce86f2 |
| Treatments | text | PRESERVE | home-tda37372b |
| Treatments | text | Braces & Orthodontics Gradually move teeth into position, then use retainers to help hold them. | home-t1f9f893d |
| Treatments | text | ALIGN | home-t5a99e653 |
| Treatments | text | Smile Design & Cosmetic Dentistry Plan cosmetic options around the changes you want to make to your smile. | home-t9a16ba87 |
| Treatments | text | REFINE | home-t082851c2 |
| Treatments | text | Full Mouth Rehabilitation Plan staged care when many teeth or the bite need attention. | home-t27b2e19f |
| Treatments | text | REBUILD | home-t9c14ad38 |
| Treatments | text | Scaling & Polishing Remove plaque and tartar, then polish the tooth surfaces. | home-t8c241de0 |
| Treatments | text | MAINTAIN | home-td29391e5 |
| Treatments | text | Not sure which treatment you need? | home-t46a500bc |
| Treatments | text | Explore our treatments or speak with our team to understand your options. | home-tc0e99392 |
| Treatments | text | Explore all treatments | home-t1b72e895 |
| Treatments | text | A composite build-up rebuilds part of a damaged tooth with tooth-coloured resin bonded directly to it. | home-t0ab41cf5 |
| Treatments | text | A dentist may discuss it for a chip, worn area or decay, after checking how much healthy tooth remains and where the damage is. | home-tbc975ac3 |
| Treatments | text | A filling, inlay, onlay or crown may be more suitable in some cases. | home-t220661ad |
| Treatments | text | What it can help with | home-t45f2fa64 |
| Treatments | text | Chipped, worn or uneven edges | home-t844ca634 |
| Treatments | text | Small gaps or misshapen teeth | home-ta9aed613 |
| Treatments | text | Whether a build-up or another restoration is suitable | home-t843361fd |
| Treatments | text | Explore treatment | home-tbc9932a3 |
| Treatments | h2 | What can we help you with? | home-h290d05fb |
| Treatments | link | Not sure which treatment you need? Explore our treatments or speak with our team to understand your options. Explore all treatments -> /treatments | home-l65265162 |
| Treatments | link | Explore treatment -> /treatments/composite-build-up | home-l62c0a1be |
| Treatments | alt | Composite build-up smile design after treatment | home-a441aec72 |
| Doctors | text | A steady hand. | home-tf8e1319e |
| Doctors | text | A human approach. | home-t64c3ed73 |
| Doctors | text | Qualifications | home-t0a796de2 |
| Doctors | text | BDS · MDS · FICOI (U.S.A.) | home-td8740a05 |
| Doctors | text | Specialism | home-tf3fb0225 |
| Doctors | text | Academic post | home-tdc28153e |
| Doctors | text | Assistant Professor, Department of Prosthodontics, SB Patil Dental College & Hospital | home-t94e8b16c |
| Doctors | text | Recognition | home-t8a1d462f |
| Doctors | text | i | home-ted70748f |
| Doctors | text | Dr. Mohd. Siraj Ur Rahman | home-t81e959db |
| Doctors | text | Dr. Md. Muti Ur Rahman | home-t2d298f23 |
| Doctors | text | MBBS (OSM) · MD (Gen. | home-t27293763 |
| Doctors | text | Med.) 5+ years | home-tfdd00014 |
| Doctors | text | Dr. Asiya Siraj | home-t3b7bec29 |
| Doctors | text | MBBS (OSM) · MRSH (LON) 30+ years | home-tbac81b94 |
| Doctors | text | Dr. Safoora Talha | home-t1ca6f46e |
| Doctors | text | BDS · 12+ years | home-t61f29ded |
| Doctors | text | Dr. Muqeet Ur Rahman | home-te86ff5c6 |
| Doctors | text | BDS (OSM) · Dental Surgeon 4+ years | home-t36633c8a |
| Doctors | h2 | A steady hand. A human approach. | home-hb242dc5e |
| Doctors | h3 | Dr. Mohd. Siraj Ur Rahman | home-h9747ea97 |
| Doctors | h3 | Dr. Md. Muti Ur Rahman | home-h2ac685e6 |
| Doctors | h3 | Dr. Asiya Siraj | home-he54a7c12 |
| Doctors | h3 | Dr. Safoora Talha | home-h81ce75c3 |
| Doctors | h3 | Dr. Muqeet Ur Rahman | home-hb40259b3 |
| Doctors | alt | Dr. Mohd. Siraj Ur Rahman | home-abe49ca6b |
| Doctors | alt | Dr. Md. Muti Ur Rahman | home-af3ada6ca |
| Doctors | alt | Dr. Muqeet Ur Rahman | home-aef9a60e9 |
| Patient stories | text | What patients say. | home-t69525caa |
| Patient stories | text | In their own words. | home-t263406fa |
| Patient stories | text | “Not at all, not at all.” | home-tccc81e9d |
| Patient stories | text | Better than expected | home-t62643f6f |
| Patient stories | text | “Extremely kind, gentle and professional… he made me very comfortable throughout the entire visit.” | home-t82e9f940 |
| Patient stories | text | Gaddam Sanjeeva | home-td9c957cc |
| Patient stories | h2 | What patients say. In their own words. | home-h169ec770 |
| What to expect | text | What to expect from a visit to NeoDent Dental Hospital | home-tbda9dda4 |
| What to expect | text | A considered dental appointment from the first hello to the final goodbye. | home-tff723d19 |
| What to expect | text | Every stage is designed to keep you informed, comfortable and clear about what comes next. | home-t83c31fea |
| What to expect | text | Specialist-led care is shaped around your concerns, with clear conversations and a measured approach to treatment, so your experience feels reassuring, personal and precise. | home-t25d034a3 |
| What to expect | text | Arrival & check-in | home-t05861eb0 |
| What to expect | text | You're welcomed at reception and any paperwork is handled before you're shown through. | home-tbdcad9d2 |
| What to expect | text | Consultation | home-t1aafd5b7 |
| What to expect | text | Treatment | home-t7a3a3203 |
| What to expect | text | Your procedure is carried out in the treatment room, at a measured, unhurried pace. | home-tff8305bd |
| What to expect | text | Follow-up | home-tdea36ca7 |
| What to expect | text | Clear guidance on next steps and aftercare before you leave, so nothing feels uncertain. | home-tdbee6fcf |
| What to expect | h2 | What to expect from a visit to NeoDent Dental Hospital | home-haf04050f |
| What to expect | h3 | Arrival & check-in | home-h5fbd3593 |
| What to expect | h3 | Consultation | home-h73fa40eb |
| What to expect | h3 | Treatment | home-h19fd5a83 |
| What to expect | h3 | Follow-up | home-h3281d9f7 |
| What to expect | alt | Reception and waiting area at Neodent Dental Hospital, with a red-framed reception counter, red armchairs and consultation chamber doors | home-a4e32d8bc |
| What to expect | alt | Five people in clinical attire standing together in front of red-framed consultation chamber doors at Neodent Dental Hospitals | home-a01b567c2 |
| Spaces | text | Spaces designed around care. | home-tdd67639d |
| Spaces | text | Across Mehdipatnam and Nampally, Neodent brings the same patient-focused approach into spaces designed for focused, comfortable dental care. | home-t7a1b1d6a |
| Spaces | text | Neodent's original Hyderabad location, in Humayun Nagar. | home-t6efd9331 |
| Spaces | text | The practice began here in 1994 and continues to offer specialist-led dental care across restorative, prosthodontic, implant and preventive needs. | home-t99ee6c3b |
| Spaces | text | Address | home-tdea20a44 |
| Spaces | text | 10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006 | home-td64fb444 |
| Spaces | text | Phone | home-taa8db8ef |
| Spaces | text | Hours | home-t775f1993 |
| Spaces | text | 4:00 PM – 8:00 PM · Sunday holiday | home-t4ef2b212 |
| Spaces | text | Google Google rating: 4.3 ★ 261 reviews | home-t577985a6 |
| Spaces | text | Rating as shown on the Google listing; it may have changed since. | home-tba7d8e1d |
| Spaces | text | Waiting lounge | home-t17bd5bda |
| Spaces | text | Entrance | home-td3b8ab93 |
| Spaces | text | Explore our clinics | home-t1cc72a7e |
| Spaces | h2 | Spaces designed around care. | home-hfc65140b |
| Spaces | link | Explore our clinics -> /clinic | home-l8afc097a |
| Spaces | alt | Neodent Dental Hospital Mehdipatnam — the patient waiting lounge | home-ae0420b12 |
| Spaces | alt | Neodent Dental Hospital Mehdipatnam — the carved entrance doorway | home-a1a987464 |

</details>

## Method limits

- Sentences are split at `.`, `!`, `?` followed by a capital ("Dr.", "Md." and initials are not split). Card labels without punctuation become one "sentence" per block element, so a label row can mix two short labels (for example "iii Recognition Recognition ceremony").
- Matching is per route, against the whole route. A sentence that moved to a different section on the same page counts as kept. A sentence that moved to another page shows up as removed or shortened here; the destinations above take that into account where I checked it.
- The current side is a snapshot of an uncommitted working tree that is still changing (the hero pass). Rerun before S2: `BASELINE_URL=... CURRENT_URL=... node scripts/seo-content-audit.mjs`.
