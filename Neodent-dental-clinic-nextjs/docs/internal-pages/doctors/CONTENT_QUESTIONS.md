# CONTENT_QUESTIONS: Doctors (/doctors)

Raised by R0, 1 Nov 2026. Copy is quoted, never edited. Each item says what the runs do until the owner answers.

## Copy and facts

**Q1. Case-type rule versus two role lines (plan section 12, Q7).**
- Dr. Miftah's card: "Leads implant, prosthodontic and full mouth rehabilitation care at both Neodent branches." and label "Prosthodontist & Implantologist".
- Dr. Siraj's card: "Dental Surgeon · Prosthodontist · Implantologist".

Read strictly, the first line ties Dr. Miftah to three care areas and the labels name specialties, which the rule "no doctor is shown as handling only certain cases" discourages. The lines also describe real qualifications, and the content rule forbids rewording. **Recorded only; both stay word for word.** No new copy on the page narrows anyone to a case type.

**Q2. Dr. Siraj's credential line differs between pages.**
- `/doctors`: "Dental Surgeon · Prosthodontist · Implantologist".
- Home and `lib/clinical-team.ts`: "BDS · FCIP · MDS (Chennai)", specialism "Prosthodontist & Implantologist", role "Founder · Director, Neodent Dental Hospitals".

Likewise Dr. Miftah: `/doctors` "BDS, MDS, FICOI" (commas) versus the data "BDS · MDS · FICOI (U.S.A.)". And the page label "Founder & Director" versus the data role "Founder · Director, Neodent Dental Hospitals". Not an error, but a visitor sees two forms. **Kept as they are on /doctors;** new cards (S4) use the data fields. Do you want /doctors aligned with the home wording?

**Q3. "25,000+ patients treated" (fact strip, S1).** The home code comments this figure as "client-supplied and must be verified before launch". Repeating it on a second page doubles the exposure. **Default in R1: follow the plan** and show the same value the home strip shows (25,000+), read from `legacyStats.patientsTreated` in `lib/site-data.ts`, so it is changed in one place once verified. Alternative: replace fact 4 with "Google reviews across both clinics" (261 + 157 = 418, computed from `lib/site-data.ts`). Reply "swap" to use the alternative.

**Q4. Dr. Muti Ur Rahman's qualification string.** The standard and the plan say "MBBS / MD (General Medicine)". The data says "MBBS (OSM) · MD (Gen. Med.)". The plan says "exactly as in the data", so S4 shows the data string. If you want the longer wording, `lib/clinical-team.ts` would need a shared-change request.

**Q5. Dr. Asiya Siraj is also not a dental degree holder** ("MBBS (OSM) · MRSH (LON)", 30+ years). Same treatment as Dr. Muti: neutral heading ("Clinical team"), her data string, nothing implying a dental specialty. Confirm this is right.

**Q6. "branches", "locations", "clinics".** The page uses "two Hyderabad locations" (supporting line), "both Neodent branches" (Dr. Miftah's card) and "See both branches" (closing line). The site's other pages mostly say "clinics". Kept unchanged; new headings use "clinics".

**Q7. Page metadata is narrower than the page will be.** Description: "...founded by Dr. Mohd. Siraj Ur Rahman, with prosthodontist and implantologist Dr. Md. Miftah Ur Rahman." It names two doctors; the page will show seven. Titles use "Neodent Dental Hospital" (singular, from `SITE_NAME`) while the plan writes "Neodent Dental Hospitals". Metadata is protected and **unchanged**. Tell me if you want a separate metadata edit later.

## Design decisions the plan leaves open

**Q8. Portrait style.** The home page does not use cover-cropped photos for doctors. It uses transparent cut-outs on a charcoal 4:5 frame (shared `DoctorPortrait`). For "same cards as the home page" R2 and R3 use that component. Photographs (header, S3) use `cover` with a focal point. Object if you want real photos instead; they do not exist for all seven.

**Q9. Team row of five.** The home row has five cards; the plan says "4 across at 1280 and wider". Four leaves one card alone. **Default: 5 across at 1280+, 3 across below 1280, swipe row on tablet and phone.**

**Q10. Dr. Siraj's link.** His data entry has `href: "/about#founder"` and the home card shows "View profile" to it. The target exists (`id="founder"` in the About founder section). The plan allows a link when the home card links and the target exists. **Default: R2 adds "View profile" to `/about#founder` on his card,** so the two featured cards match. Say "no link" if you prefer the plan's original text.

**Q11. Header photograph.** Recommended: `/assets/neodent-dental-hospital-doctors.jpeg` (five clinicians together, already used on the clinic pages). Two of the five wear masks, and I cannot say which clinic it was taken at. The existing alt text "Neodent clinicians and team members gathered inside the hospital" is reused so no person is named from the picture. Confirm the photo may be the lead image.

**Q12. Plan items I cannot satisfy exactly.**
- The "standard" (Parts 1 to 3.6, P1 to P16) is not in the repo. I used the plan's own descriptions, the home components and the sibling pages as the source.
- `scripts/page-*.mjs` and `docs/internal-pages/_shared-requests.md` do not exist. See CHANGELOG, R0.

## Not asked, but checked

- "Smile Designer" does not appear on this page.
- Nothing on the page claims an outcome, price or rating.

**Q13. Anchor text of the two treatment links (R2).** Inside Dr. Miftah's paragraph only the existing words became links: "implant" to `/treatments/dental-implants` and "full mouth rehabilitation" to `/treatments/full-mouth-rehabilitation`. "implant" alone is a short anchor. No word was added to lengthen it, per the content rule. Say if you want a reworded sentence later.
