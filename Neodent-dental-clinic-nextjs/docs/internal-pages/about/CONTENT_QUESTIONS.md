# CONTENT_QUESTIONS: /about

Copy that looks wrong, unverifiable or inconsistent. Nothing here has been edited.

## Open

**Q6b (plan item, answered).** The plan said the text drawn over the Republic Day photo names "Dr Md Miftah Ur Rahman". It does not. The text is baked into the image and reads "On occasion of 73rd Republic day, Dr Md Siraj Ur Rahman addressing the gathering at Govt. Dental College and Hospital Hyderabad." That agrees with the paragraph beside it (Dr. Mohd. Siraj Ur Rahman). The only oddity is that the image spells the founder "Md" rather than "Mohd." It is part of the picture, so it cannot be changed in code. Decision for the owner: keep as is, or supply a corrected image.

**Q-A. Press captions disagree between S6 and the archive lightbox.** The same file `Dr siraj neodent dental clinic Mehdipatnam news article.jpg` is captioned "Front-page dental care feature" (alt: "front-page feature on dental care at Neodent") in S6 and "Feature article" (alt: "feature article on Neodent Dental Hospital, Mehdipatnam") in the archive. The archive uses "Front-page dental care feature" for a different file (`...Nampally news.jpg`). One of the two lists has the wrong caption for that file. Both stay as written.

**Q-B. Large S6 cutting caption.** S6 shows "The Siasat Daily" / "Hyderabad". The archive calls the same file "Professional dental lecture" / "The Siasat Daily · Mehdipatnam". The plan expected one line, "The Siasat Daily, Hyderabad". Both kept.

**Q5 (ghost "1994").** It is real DOM text (`<span aria-hidden="true">1994</span>`, 240 px, in `AboutPractice.tsx`). The plan removes the ghost styling. Until you approve an allowlist entry, the redesign keeps the text in the DOM as a visually hidden `aria-hidden` span with no ghost styling. Say if you want it dropped from the DOM instead.

**Q8. Unsourced claims.** "25,000+ patients treated" (S2, from `legacyStats.patientsTreated`) and "30+ years of experience" (S4 card and the S4 highlight "30+ years of experience"). Also "more than three decades" (S3, S4, S11). Please confirm the source.

**Q-C. Hero copy is circular.** "that single clinic has grown into Neodent Dental Hospital, now practising across Mehdipatnam and Nampally." The clinic was already called Neodent. Not edited.

**Q-D. "Urdu press" claim** (S6): "covered by the Urdu press in Hyderabad, principally The Siasat Daily". The cuttings are in Urdu; no source beyond the clippings.

**Q-E. S9 hosting claims.** Film descriptions name programmes ("Doctor Aap Ka", "Doctor se Mulaqat", "Aap Ki Sehat", "ETV", "News18 Urdu" in S10). They come from the supplied video list and cannot be checked from the page.

**Q-F. S9 poster has empty alt.** Intentional (the button has an aria-label). Listed for completeness.

**Q-G. Plan items with no match on the page.** The page does not mention Dr. Muti Ur Rahman, the "Save the natural teeth till the last stage." quote, the Madina Gold Medal or "Smile Designer". A7 (Madina line) is unticked, so nothing is added.

## Checked, no issue

**Q6.** Founder is "Dr. Mohd. Siraj Ur Rahman" and Dr. Miftah is "Dr. Md. Miftah Ur Rahman" on the page. `lib/clinical-team.ts` spells the founder "Dr. Mohd. Siraj" / "Ur Rahman" and the alt "Dr. Mohd. Siraj Ur Rahman". Consistent. (Dr. Miftah's entry in that file was not found to differ; the id is `miftah`.)

## Needs the owner (from plan section 12)

Q1 to Q4 and Q9 to Q12 are answered in DISCOVERY.md. Q7 (dates on captions) and Q11 (archive route: there is none) need your answer only if you want dates.
