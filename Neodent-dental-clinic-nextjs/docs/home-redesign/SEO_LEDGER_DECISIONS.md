# SEO ledger decisions (S1)

Decided 30 Oct 2026 from `SEO_CONTENT_DIFF.md` (run S0, baseline `0e62178`). Read by the S2 to S5 prompts. The machine-readable copy is `seo-ledger-decisions.json` (same folder); both are generated from the same list, so they agree.

**Totals (112 rows):** visible 23, disclosure 14, link 9, drop 48, hold 0, hero-pass 18. (S1 had hold 3; the owner answered them on 30 Oct 2026, see "Owner answers". S3b, 30 Oct 2026: home-tc65aff0a drop -> disclosure, home-t6bf18012 link -> drop.)

## Decision values

| Value | What the agent does |
|---|---|
| `visible` | Restore the text (or the stated part) as visible copy, in the place named in the instruction |
| `disclosure` | Restore inside a "Read more" or `<details>` whose text is in the server-rendered HTML |
| `link` | The text lives on the linked internal page; keep a visible link to it and confirm the page still has the text |
| `drop` | Intentional drop, reason given (numbering, duplicate, reworded, placeholder, unverifiable). Do nothing |
| `hold` | Waiting for an owner answer (see "Owner answers"; none left on 30 Oct 2026). Do nothing; list it in the report |
| `hero-pass` | Hero is redesigned in a separate chat. Do nothing in the S-series |

Rules that apply to every restoration: Part 14 of the reference file (R1 to R10) and every design rule in Part 3. Restored text must be designed (disclosure, two-column, cards), never a wall of text.

## S2: Stat strip, Care begins, seam card, Legacy, Treatments

| ID | Section | Decision | Old text (from S0) | Instruction |
|---|---|---|---|---|
| `home-tf0589540` | Stat strip + Care begins | visible | Why Neodent (hidden) | Add a plain visible label "Why Neodent" (12 px or larger, no numbering) above the stat strip, as the section's small heading. |
| `home-t1b1f4faf` | Stat strip + Care begins | visible | Multi-speciality clinic | Restore the words "Multi-speciality clinic" verbatim as a visible supporting line or label inside the "2 clinics" cell (it was removed because it overflowed at 360 px: use overflow-wrap, no overflow allowed). |
| `home-t1b776f62` | Stat strip + Care begins | drop | 2 locations | Duplicate of "2 clinics" in the current strip; both clinics are named elsewhere. |
| `home-td1838316` | Stat strip + Care begins | drop | 25,000+ smiles changed | Same fact as "25,000+ patients treated" (owner still to verify the number). |
| `home-te1260461` | Stat strip + Care begins | drop | From the first step inside to every stage of treatment, Neodent is designed around a calmer, more reassurin... | Reworded in the current first sentence; the lost clause carries no search phrase. |
| `home-te69bb48e` | Stat strip + Care begins | disclosure | Clinical expertise meets thoughtful care. | Put in one "Read more" disclosure under the Care begins paragraphs (server-rendered HTML). |
| `home-t92a38f2e` | Stat strip + Care begins | disclosure | You're guided through each stage with clear explanations, not simply moved through a procedure, and that sa... | Same disclosure: fuller version of the visible sentence. The short sentence stays visible. |
| `home-t8d8b2eef` | Stat strip + Care begins | drop | Whether you visit Mehdipatnam or Nampally, the standard of care is the same. | Near-identical to the current sentence; both clinic names are kept. |
| `home-t586fad82` | Stat strip + Care begins | disclosure | Every detail is considered to make your visit feel calmer, clearer and more personal — from arrival to care. | Same disclosure as the Care begins rows above. |
| `home-tc1833779` | Stat strip + Care begins | visible | Neodent / Inside Hospital tour | Restore a plain caption for the tour video: "Inside Neodent: hospital tour" (no slash, 12 px or larger). |
| `home-t9cc2981a` | Seam card | drop | Neodent Standard | Replaced by "Specialist-led care. Since 1994."; the old quote was vague and unverifiable. |
| `home-t6911cacb` | Seam card | drop | We maintain peak performance | Replaced by "Specialist-led care. Since 1994."; the old quote was vague and unverifiable. |
| `home-te3cc1b8a` | 1994 / Legacy | drop | 01 / Beginning (hidden) | Numbered or roman-numeral label (Part 3.2). |
| `home-te839b04d` | 1994 / Legacy | drop | 02 / People (hidden) | Numbered or roman-numeral label (Part 3.2). |
| `home-t4ac9e0c7` | 1994 / Legacy | visible | Established in 1994, Neodent has grown through decades of clinical practice, specialist-led care and a comm... | Make this the lead sentence of the founder paragraph, wording kept: "Established in 1994, Neodent has grown through decades of clinical practice, specialist-led care and a commitment to making dentistry more reassuring, personal and precise." It supports foundingDate 1994. |
| `home-t71ca7491` | 1994 / Legacy | drop | For patients, that continuity means every visit draws on years of accumulated clinical experience. | Reworded in the current paragraph ("Every visit draws on that accumulated experience"). |
| `home-t255cd9f9` | 1994 / Legacy | visible | Founded and led by Dr. Mohd. Siraj Ur Rahman, Neodent's clinical philosophy has been shaped by 30+ years of... | Restore as running text in the founder paragraph: "Founded and led by Dr. Mohd. Siraj Ur Rahman ... 30+ years of experience in dentistry." Founder name plus years is a key entity fact. |
| `home-t92dba0cd` | 1994 / Legacy | disclosure | A dental surgeon, prosthodontist and implantologist, and Professor at Osmania Government Dental College & H... | Founder credentials (dental surgeon, prosthodontist, implantologist, Professor at Osmania Government Dental College & Hospital) in a "Read more" under the founder card, with a visible link to /about#founder. |
| `home-t1bbb9b93` | 1994 / Legacy | drop | 03 / Record (hidden) | Numbered or roman-numeral label (Part 3.2). |
| `home-tb4c932d1` | 1994 / Legacy | visible | Three decades, on record | Use "Three decades, on record" as the plain visible title (h3) of the press row. |
| `home-t38d18d9f` | 1994 / Legacy | drop | iii Recognition Recognition ceremony (hidden) | Numbered or roman-numeral label (Part 3.2). |
| `home-t0cdc1309` | 1994 / Legacy | drop | 04 / Impact (hidden) | Numbered or roman-numeral label (Part 3.2). |
| `home-taef86061` | Treatments | drop | Each concern is met with the specialist-led expertise it calls for, within one clinical environment. | Reworded or relabelled in P4; no search phrase lost. |
| `home-tc794eac3` | Treatments | disclosure | The right approach is matched to what each patient needs, from routine care to more complex treatment. | "Read more" under the treatments intro (second paragraph). |
| `home-t47342fbd` | Treatments | visible | Whether you need a missing tooth replaced, a worn tooth restored or a smile rebuilt, care begins with under... | Restore visibly in the treatments intro; it uses patient wording ("missing tooth replaced", "worn tooth restored", "smile rebuilt"). Link each named treatment in the intro to its page with its own name as the anchor (rule R4). |
| `home-tbff5c9ec` | Treatments | drop | Treatments range from preventive care such as scaling and polishing to restorative and specialist work such... | Reworded or relabelled in P4; no search phrase lost. |
| `home-t323be85f` | Treatments | drop | Treatment film | Reworded or relabelled in P4; no search phrase lost. |
| `home-td69afa06` | Treatments | drop | REAL CASE / COMPOSITE SMILE DESIGN | Reworded or relabelled in P4; no search phrase lost. |

## S3: Doctors, Patient stories

Accepted partial matches (owner, 30 Oct 2026): home-t38e01a3e and home-t176cb535 stay as `link`. The label "Portfolio / Professional moments" (home-t38e01a3e) and the words "Institutional" and "professional development" (home-t176cb535) are not on the profile page; the categories and meaning are. (home-t1abdd620 was a full match in the S3 check.)

| ID | Section | Decision | Old text (from S0) | Instruction |
|---|---|---|---|---|
| `home-t64b58b74` | Doctors | visible | Assistant Director, Neodent Dental Hospitals | Dr. Miftah's role line: "Assistant Director, Neodent Dental Hospitals" (matches /about and his profile page). |
| `home-ta3f6e809` | Doctors | visible | 15+ Years of clinical experience | Restore "15+ years of clinical experience" on Dr. Miftah's card (it is on his profile page). |
| `home-tf3c55924` | Doctors | visible | Prosthodontist & Implantologist · Smile Designer (expert in smile design) | Restore "Prosthodontist & Implantologist · Smile Designer" on his card. Owner (30 Oct): "Smile Designer" is not an official title but may appear in 1 to 2 places across the site; this card is one. Drop "(expert in smile design)". |
| `home-te4adeac9` | Doctors | visible | Practising at | One visible line on his card: "Practising at Mehdipatnam & Nampally, Hyderabad". |
| `home-t45e6d058` | Doctors | visible | Mehdipatnam & Nampally, Hyderabad | One visible line on his card: "Practising at Mehdipatnam & Nampally, Hyderabad". |
| `home-t294609a7` | Doctors | disclosure | University Gold Medalist · Madina Gold Medal (2023), awarded by Commissioner A. K. Khan | Owner confirmed accurate and approved (30 Oct). Restore verbatim inside the "About Dr. Miftah" disclosure. |
| `home-t7b639691` | Doctors | disclosure | “Save the natural teeth, even if they are mobile.” | Owner approved with new wording (30 Oct). Use exactly "Save the natural teeth till the last stage." inside the "About Dr. Miftah" disclosure. Do not use the old wording anywhere. |
| `home-ta1c97207` | Doctors | drop | Explore Dr. Miftah | Reworded or replaced (current text keeps the fact, or the photo and link were replaced). aafa2ad2b: a photo that exists on no current page; dropped. |
| `home-t963d296a` | Doctors | drop | Dr. Md. Miftah Ur Rahman is a Prosthodontist and Implantologist and Assistant Director at Neodent Dental Ho... | Reworded or replaced (current text keeps the fact, or the photo and link were replaced). aafa2ad2b: a photo that exists on no current page; dropped. |
| `home-t1df51668` | Doctors | disclosure | He practises across both Neodent locations in Hyderabad — Mehdipatnam and Nampally — alongside the practice... | Dr. Miftah's bio paragraphs, in their old order, in ONE "About Dr. Miftah" disclosure inside the "Dr. Miftah at work" band (server-rendered HTML), ending with the link to his profile page. |
| `home-t61216309` | Doctors | disclosure | His specialist grounding is in prosthodontics and implantology — the rehabilitation and replacement of teet... | Dr. Miftah's bio paragraphs, in their old order, in ONE "About Dr. Miftah" disclosure inside the "Dr. Miftah at work" band (server-rendered HTML), ending with the link to his profile page. |
| `home-t62b46073` | Doctors | disclosure | Much of that work is reconstructive rather than routine, which is why a consultation with him usually begin... | Dr. Miftah's bio paragraphs, in their old order, in ONE "About Dr. Miftah" disclosure inside the "Dr. Miftah at work" band (server-rendered HTML), ending with the link to his profile page. |
| `home-tc65aff0a` | Doctors | disclosure | Alongside clinical dentistry he teaches as an Assistant Professor at SB Patil Dental College & Hospital, in... | Restore verbatim in the 'About Dr. Miftah' disclosure, in its old position between home-t62b46073 and home-t2c0a991e, so that 'That academic involvement...' has its antecedent. |
| `home-t2c0a991e` | Doctors | disclosure | That academic involvement is not separate from his practice at Neodent: teaching keeps the clinical reasoni... | Dr. Miftah's bio paragraphs, in their old order, in ONE "About Dr. Miftah" disclosure inside the "Dr. Miftah at work" band (server-rendered HTML), ending with the link to his profile page. |
| `home-tfea37852` | Doctors | disclosure | He qualified BDS and MDS, holds FICOI (U.S.A.) certification and is a Gold Medallist, with 15+ years in cli... | Dr. Miftah's bio paragraphs, in their old order, in ONE "About Dr. Miftah" disclosure inside the "Dr. Miftah at work" band (server-rendered HTML), ending with the link to his profile page. |
| `home-t305f1122` | Doctors | disclosure | As Assistant Director he carries that experience into how Neodent plans and explains treatment — precision,... | Dr. Miftah's bio paragraphs, in their old order, in ONE "About Dr. Miftah" disclosure inside the "Dr. Miftah at work" band (server-rendered HTML), ending with the link to his profile page. |
| `home-t38e01a3e` | Doctors | link | Portfolio / Professional moments Clinical practice · Recognition · Teaching · Academic | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-t1abdd620` | Doctors | link | Teaching / Academic Teaching prosthodontics at SB Patil Dental College & Hospital. | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-t050887bf` | Doctors | drop | ii (hidden) | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t4c3119e1` | Doctors | link | Recognition Professional recognition. | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-t6b81f467` | Doctors | link | As Assistant Director at Neodent, his prosthodontic and implant work spans the Mehdipatnam and Nampally cli... | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-t2d88a0e6` | Doctors | link | It centres on restoring what can be saved and rebuilding what cannot — implants, full-mouth rehabilitation ... | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-t79826e4a` | Doctors | link | Alongside clinical practice, he teaches and conducts seminars as Assistant Professor in the Department of P... | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-t188d45da` | Doctors | drop | iii (hidden) | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t176cb535` | Doctors | link | Academic / Institutional Academic teaching and professional development. | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-t8eb49d17` | Doctors | drop | iv (hidden) | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t0de1f858` | Doctors | drop | 04 / PROFILE FILM NEODENT / 2026 | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t6bf18012` | Doctors | drop | Clinical film Dr. Miftah Ur Rahman / In practice. | The old home profile film is no longer on any page of the site; the profile-page check in S3 confirmed it is not covered. Not a search-value loss. |
| `home-t7b58e820` | Doctors | drop | Supporting clinical team Established expertise / one practice | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t73922a2b` | Doctors | drop | 01 / SENIOR CLINICAL LEADERSHIP | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t60d6bbcd` | Doctors | visible | BDS · FCIP · MDS (Chennai) Professor · Director, Neodent · 30+ years | Restore the founder's role and years on his card: "Professor · Director, Neodent · 30+ years". |
| `home-t9c0fb95f` | Doctors | drop | 02 / NEODENT TEAM | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t42c4bb33` | Doctors | drop | AS Portrait not available (hidden) | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t4942d7c0` | Doctors | drop | 03 / CLINICAL TEAM | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t0e35fc7a` | Doctors | drop | ST Portrait not available (hidden) | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-t817c49d2` | Doctors | drop | 04 / CLINICAL TEAM | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-tf8cf24ad` | Doctors | drop | 05 / CLINICAL TEAM | Numbering, roman numerals, replaced labels or placeholder text ("Portrait not available"). |
| `home-l25b71063` | Doctors | drop | Explore Dr. Miftah -> `/doctors/dr-miftah-ur-rahman` | Reworded or replaced (current text keeps the fact, or the photo and link were replaced). aafa2ad2b: a photo that exists on no current page; dropped. |
| `home-a127144fd` | Doctors | drop | Portrait of Dr. Md. Miftah Ur Rahman in a white coat at Neodent Dental Hospital | Reworded or replaced (current text keeps the fact, or the photo and link were replaced). aafa2ad2b: a photo that exists on no current page; dropped. |
| `home-a0ae50c15` | Doctors | visible | Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist, standing beside the dental chair in a treatmen... | Restore "Prosthodontist and Implantologist" and "Hyderabad" in the alt text of his photo (R5). |
| `home-aefa38c46` | Doctors | link | Dr. Md. Miftah Ur Rahman conducting a prosthodontics seminar for dental students at the Department of Prost... | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-aeb59c31a` | Doctors | link | Dr. Md. Miftah Ur Rahman receiving a framed certificate presented by Dr. K Mahendranadh Reddy | Portfolio and film text and photo alt texts: covered on /doctors/dr-miftah-ur-rahman. Keep the visible link to that page. Before relying on it, confirm that page still contains the equivalent text; if not, report it. |
| `home-aafa2ad2b` | Doctors | drop | Dr. Md. Miftah Ur Rahman in a clinical coat at the entrance to the Department of Prosthodontics, SB Patil D... | Reworded or replaced (current text keeps the fact, or the photo and link were replaced). aafa2ad2b: a photo that exists on no current page; dropped. |
| `home-te2b25f9f` | Patient stories | visible | Real experiences from patients who trusted Neodent with their care. | Restore the one-line lede under the h2: "Real experiences from patients who trusted Neodent with their care." |
| `home-t0c5f4b80` | Patient stories | drop | Comfort & relief | Theme-selector labels, a reworded label and a button with no destination. |
| `home-tf9a8adc0` | Patient stories | drop | Confidence & change | Theme-selector labels, a reworded label and a button with no destination. |
| `home-tb6f69806` | Patient stories | drop | Google Patient review (hidden) | Theme-selector labels, a reworded label and a button with no destination. |
| `home-tc73c865f` | Patient stories | drop | Explore all patient stories | Theme-selector labels, a reworded label and a button with no destination. |

## S4: What to expect, Spaces, Consultation block (shared with /about), Footer

| ID | Section | Decision | Old text (from S0) | Instruction |
|---|---|---|---|---|
| `home-t83fb7040` | What to expect | drop | A direct conversation with Dr. Md. Siraj Ur Rahman about what's on your mind. | Owner (30 Oct): consultations are not only with Dr. Siraj; all doctors handle all dental cases. Keep the current "a Neodent specialist" wording. |
| `home-t9458b9f2` | What to expect | drop | Explore your visit | Replaced by "Plan your visit" -> /clinic; the old #contact anchor does not exist. |
| `home-le82d6255` | What to expect | drop | Explore your visit -> `#contact` | Replaced by "Plan your visit" -> /clinic; the old #contact anchor does not exist. |
| `home-t2a27df13` | Spaces | visible | Mehdipatnam Neodent Dental Hospital · Hyderabad | Branch heading in full: "Mehdipatnam: Neodent Dental Hospital, Hyderabad" (R8). |
| `home-tf455b5fa` | Spaces | visible | Nampally Neodent Dental Hospital · Hyderabad | Branch heading in full: "Nampally: Neodent Dental Hospital, Hyderabad" (R8). |
| `home-t58425eed` | Spaces | visible | Get directions | Descriptive directions anchors for BOTH clinics: "Get directions to the Mehdipatnam clinic" / "Get directions to the Nampally clinic" (R4). Keep the rating text out of the anchor. |
| `home-tf26ed1c7` | Spaces | drop | Two locations. | Strip removed in P8; same message is in the hero and in Care begins. |
| `home-t3fcea972` | Spaces | drop | One Neodent standard. | Strip removed in P8; same message is in the hero and in Care begins. |
| `home-l629c5734` | Spaces | visible | Get directions -> `https://www.google.com/maps/search/?api=1&query=10-3-14B%...` | Descriptive directions anchors for BOTH clinics: "Get directions to the Mehdipatnam clinic" / "Get directions to the Nampally clinic" (R4). Keep the rating text out of the anchor. |
| `home-t5a860674` | Consultation block | drop | Let's make your next step feel simple. | Replaced by the plain h2 "Book a consultation". |
| `home-t2ff85726` | Consultation block | visible | Whether you have a dental concern, want to understand your treatment options, or simply want to speak with ... | Restore the lede under "Book a consultation": "Whether you have a dental concern, want to understand your treatment options, or simply want to speak with our team, we're here to help you take the next step with clarity." One edit fixes both / and /about. |
| `home-t67b229f1` | Consultation block | visible | You can also send an enquiry through our contact page. | Restore a visible link to /contact in the block: "You can also send an enquiry through our contact page." (anchor "send an enquiry through our contact page"). |
| `home-h0c50116f` | Consultation block | drop | Let's make your next step feel simple. | Replaced by the plain h2 "Book a consultation". |
| `about-t88a933ce` | Consultation block | drop | Let's make your next step feel simple. | Replaced by the plain h2 "Book a consultation". |
| `about-t29270bbc` | Consultation block | visible | Whether you have a dental concern, want to understand your treatment options, or simply want to speak with ... | Restore the lede under "Book a consultation": "Whether you have a dental concern, want to understand your treatment options, or simply want to speak with our team, we're here to help you take the next step with clarity." One edit fixes both / and /about. |
| `about-ta2ea9cc1` | Consultation block | visible | You can also send an enquiry through our contact page. | Restore a visible link to /contact in the block: "You can also send an enquiry through our contact page." (anchor "send an enquiry through our contact page"). |
| `about-h059185d5` | Consultation block | drop | Let's make your next step feel simple. | Replaced by the plain h2 "Book a consultation". |
| `chrome-t6ef8c13f` | Footer | drop | Changing smiles since decades. | Replaced by "Changing smiles since 1994." (more specific). |

## Hero (separate chat): Hero

| ID | Section | Decision | Old text (from S0) | Instruction |
|---|---|---|---|---|
| `home-t6d582550` | Hero | hero-pass | Changing smiles since 3 decades. | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-td704635f` | Hero | hero-pass | 2 Hyderabad locations·Mehdipatnam·Nampally (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t6be20613` | Hero | hero-pass | 30+ Years of changing smiles (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t70466bb9` | Hero | hero-pass | Where Neodent is. (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-tb580d8d4` | Hero | hero-pass | Two Hyderabad locations. (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-tb7b765f4` | Hero | hero-pass | 01 (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t3ed3c157` | Hero | hero-pass | 02 (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t91106470` | Hero | hero-pass | In print · On air · Hyderabad 03 (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t205d7eb5` | Hero | hero-pass | Practised the same way, every day. (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t77bd8ec0` | Hero | hero-pass | Public media (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t1e7c0a74` | Hero | hero-pass | Institutional recognition (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-t37e42b54` | Hero | hero-pass | 01 / 03 (hidden) | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-h6d0c8aff` | Hero | hero-pass | Where Neodent is. | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-l465e16f9` | Hero | hero-pass | +91 9246348485 -> `tel:+919246348485` | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-lbc75d548` | Hero | hero-pass | Mehdipatnam -> `/clinic` | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-l370405c7` | Hero | hero-pass | Nampally -> `/clinic` | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-aa710b5a6` | Hero | hero-pass | Neodent Dental Hospital Mehdipatnam exterior — the entrance doorway and registration counter | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |
| `home-a6705cae8` | Hero | hero-pass | Neodent Dental Hospital Nampally interior — the reception and registration counter | Hero is redesigned in a separate chat. Not restored in the S-series. Check section (g) of the diff after the hero pass. |

## Additional directives (not ledger rows, from the S0 findings and rules R3 to R5)

**All runs (owner answer, 30 Oct 2026)**
1. Do not portray any doctor as handling only certain kinds of cases. Dr. Siraj, Dr. Miftah and the other dentists all handle all dental cases. Specialty titles (prosthodontist, implantologist) may be stated as qualifications, but never as "only sees", "refer to Dr. X for", or a split of cases between doctors. Dr. Muti Ur Rahman's MBBS / MD (General Medicine) rule (R8) still applies.

**S2**
1. `components/motion/CountUp.tsx` puts each stat number into the server HTML three times ("418 418 418"). Render the final number once as real text in the server HTML and keep any animated copy `aria-hidden` and empty in the HTML. This file is shared (rule R10); check every page that uses it (home only, plus any other use found by search).
2. Headings (R3). Where the headline is brand-poetic, add a plain visible supporting line, using only words already on the site:
   - Legacy: "Specialist dental care in Hyderabad since 1994."
   - Treatments: name the seven treatments in the intro, each linked to its page with its own name as the anchor.
3. Do not restore anything in the hero.

**S3**
1. Doctors heading (R3): add the visible supporting line "Dentists and specialists at Neodent Dental Hospital, Mehdipatnam and Nampally, Hyderabad." under the h2.
2. Dr. Muti Ur Rahman stays "MBBS / MD (General Medicine)"; never write "dental specialist" for him (R8).
3. Patient stories: keep the "may have changed" note next to the ratings.

**S4**
1. `components/sections/ContactNextStep.tsx` is shared with `/about` (through `AboutClientChrome.tsx`). It is added to the R10 list. After the change, check `/about` renders the block correctly and still has its own surrounding content.
2. Spaces heading (R3): add the visible supporting line "Neodent Dental Hospital in Mehdipatnam and Nampally, Hyderabad."
3. Footer: nothing to restore. "Changing smiles since 1994." stays.

## Owner answers (30 Oct 2026; these were the owner questions, all answered)

1. **Madina Gold Medal (2023), "awarded by Commissioner A. K. Khan"** (`home-t294609a7`): accurate and approved. Row changed to `disclosure` (inside the "About Dr. Miftah" disclosure, verbatim).
2. **Dr. Miftah's quote** (`home-t7b639691`): approved with new wording. Use exactly **"Save the natural teeth till the last stage."** Row changed to `disclosure`. The old wording ("even if they are mobile") must not appear anywhere on the site.
3. **Consultation with Dr. Md. Siraj Ur Rahman** (`home-t83fb7040`): no, not every consultation is with him. Dr. Siraj, Dr. Miftah and the other doctors all handle all dental cases. Row changed to `drop`; the current "a Neodent specialist" wording stays. See directive "All runs" 1 below.
4. **"Smile Designer" for Dr. Miftah** (part of `home-tf3c55924`): not an official title, but it may be used in 1 to 2 places across the whole website. The home Doctors card is one of them; the row now restores "Prosthodontist & Implantologist · Smile Designer". Any second use must be counted against this limit and listed in that run's changelog entry.
   - Owner-confirmed fact for later treatment-page work (not an S2 to S4 task): Dr. Miftah is also an expert in **single-sitting (single-visit) root canal treatment**. This is to be explained on the treatment pages (root canal page), not on the home page in the S-series.
5. **Opening hours:** confirmed as the current site data. **Nampally: 10:30 AM – 5:00 PM. Mehdipatnam: 4:00 PM – 8:00 PM.** (Monday to Saturday; Sunday holiday, as in the site data.) These already match `lib/site-data.ts` (`nampallyHours`, `mehdipatnamHours`) and `lib/clinic-data.ts` (`schemaOpeningHours` "Mo-Sa 10:30-17:00" and "Mo-Sa 16:00-20:00"). The "10 AM to 7 PM" signboard in the Nampally photo is out of date. Any other text that disagrees (for example the LeadCapture pop-up's "10:00 AM - 08:00 PM") is wrong and is fixed from these constants (S6, or S4 if it touches the same file). FAQ item 7 is no longer on hold.
6. **"Dental hospital" or "dental clinic":** confirmed: lead with **"dental hospital"**. "Clinic" stays where it already is in page copy (for example "our Mehdipatnam and Nampally clinics").

To change a row later, edit its value in `seo-ledger-decisions.json` (the first word before the colon) and in the table above.

## Target keywords (S1 edit of the S0 list)

Approved as the working list for S2 to S5, in this order of use. Use them naturally in headings and supporting lines; never repeat a phrase just to repeat it. Owner confirmed on 30 Oct 2026 that the site leads with "dental hospital" (not "dental clinic").

| Group | Phrase | Where |
|---|---|---|
| Brand | Neodent Dental Hospital (Hyderabad) | everywhere, as written on the Google Business Profile |
| Local head | dental hospital in Mehdipatnam, Hyderabad; dental hospital in Nampally, Hyderabad | Spaces, FAQ, location pages |
| Local head | dentist in Mehdipatnam; dentist in Nampally | Doctors supporting line, location pages (both words already in the baseline) |
| Head | specialist dental care in Hyderabad | hero (done), Legacy supporting line |
| Head | multi-speciality (clinic / dental care) | stat strip label |
| Treatments | dental implants, root canal treatment, braces and orthodontics, smile design, full mouth rehabilitation, composite build-up, scaling and polishing | treatments intro (each linked to its page) |
| Patient wording | missing tooth replaced, worn tooth restored, smile rebuilt, crowns, bridges and dentures | treatments intro, Dr. Miftah disclosure |
| Doctors | Dr. Mohd. Siraj Ur Rahman (prosthodontist, implantologist, Professor at Osmania Government Dental College & Hospital); Dr. Md. Miftah Ur Rahman (prosthodontist, implantologist) | Legacy, Doctors |
| Trust | since 1994; 30+ years of experience; Google reviews | Legacy, stat strip, ratings |

Not approved without owner say-so: "teeth cleaning" (not in the baseline; it is the everyday name for scaling and polishing, so it is accurate, but it is the owner's call; recommended yes, only in the scaling description or FAQ, never as a heading). Dr. Muti Ur Rahman is in no dental keyword (R8).

## Draft FAQ for the home page (input to S5)

Rules: first sentence answers the question; 40 to 70 words; only facts already on the site; no prices, outcome promises or medical advice. Treatment-specific questions stay on the treatment pages (they already have FAQ schema). Items 1 to 7 are publishable once the owner reads them (item 7 was released on 30 Oct 2026 when the owner confirmed the hours). Facts marked [data] must be filled from `lib/site-data.ts`, not typed again.

1. **Where is Neodent Dental Hospital located in Hyderabad?**
   Neodent Dental Hospital has two clinics in Hyderabad: one in Mehdipatnam (Humayun Nagar) and one in Nampally (Medwin Hospital Complex). Both follow the same specialist-led standard of care. Full addresses, directions and phone numbers for each clinic are shown in the "Spaces designed around care" section of this page.

2. **How long has Neodent been caring for patients?**
   Neodent Dental Hospital was established in Hyderabad in 1994, so it has been caring for patients for more than three decades. It was founded and is led by Dr. Mohd. Siraj Ur Rahman, who has 30+ years of experience in dentistry, and today the clinical team has seven doctors.

3. **Which dental treatments does Neodent offer?**
   Neodent offers dental implants, root canal treatment, braces and orthodontics, smile design, full mouth rehabilitation, composite build-up, and scaling and polishing. Care ranges from preventive treatment to specialist work, and each treatment has its own page explaining what to expect. [Link each treatment name to its page.]

4. **Who are the doctors at Neodent?**
   Neodent is led by founder and director Dr. Mohd. Siraj Ur Rahman (BDS, FCIP, MDS), a prosthodontist and implantologist and Professor at Osmania Government Dental College & Hospital, and by Assistant Director Dr. Md. Miftah Ur Rahman, also a prosthodontist and implantologist. The full team is shown in the doctors section. [Links to /about#founder and the Miftah profile.]

5. **What happens at a first visit?**
   You are guided through four stages: arrival and check-in, a consultation to talk through your concern, treatment, and follow-up. Clear explanations come at each stage, and the same specialist-led care continues from your first visit through to treatment and beyond, at both clinics. [Link to /clinic.]

6. **How can I book an appointment?**
   Call either clinic using the numbers on this page, or fill in the short form in the "Book a consultation" section and our team will get back to you to arrange a visit. You can also send an enquiry through the contact page. [Link to /contact.]

7. **What are the clinic timings?**
   Mehdipatnam is open [data: `mehdipatnamHours`, 4:00 PM – 8:00 PM] and Nampally is open [data: `nampallyHours`, 10:30 AM – 5:00 PM], Monday to Saturday. Both clinics are closed on Sundays. Hours shown here match the Google Business Profile. Use the same [data] constants as the chips and the schema; do not retype them. (Owner confirmed the hours on 30 Oct 2026; the Google Business Profile match is still to be checked by the owner in S6.)

Not included on purpose: price questions, "is it painful", success-rate questions (no site facts to answer them safely), and the Google rating (changes over time; it already has its own section with a disclosure).

## What this file replaces

Nothing in the S0 report changes. After saving `seo-ledger-decisions.json`, the audit's "removed rows without an owner decision" count drops from 54 to 0 and the script exits 0 for that check.
