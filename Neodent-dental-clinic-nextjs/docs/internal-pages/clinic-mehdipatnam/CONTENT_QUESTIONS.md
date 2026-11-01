# CONTENT_QUESTIONS: clinic-mehdipatnam

Quoted from the live page. None of this has been edited.

1. **Rating line.** "4.3 / 5 from 261 Google reviews" with the note "Google listing snapshot; rating and review count may change." Owner to confirm it is current (Q7). Stays as written; no `aggregateRating` schema.
2. **Hero lede does not use the phrase "dental hospital".** "Neodent’s original Hyderabad location is in Humayun Nagar, Mehdipatnam. The clinic offers evening appointments from Monday to Saturday." The h1 and intro paragraph 2 carry it, so no line is added.
3. **Intro paragraph 3 is self-referential.** "This page brings together the Mehdipatnam clinic’s opening hours, contact details, photographs, featured treatments and Google rating." Reads as page-description copy. Kept as written.
4. **Intro paragraph 1 says "The address and directions are provided below".** The Visit & contact card is beside it on desktop. Kept as written.
5. **Spelling.** "Mehdipatnam" is used consistently. "Masab Tank", "Asifnagar", "Gudimalkapur" appear only in intro paragraph 2 and the meta description. No address mismatch found between the page and `lib/clinic-data.ts`.
6. **Gallery lede:** "Photographs of the carved entrance, the reception counter, the waiting areas, the director’s consultation office and the treatment rooms". The Hero photo repeats gallery photo 1 (waiting lounge). Kept.
7. **Gallery captions use mixed punctuation** ("Director's office" with a straight apostrophe, elsewhere curly quotes). Kept as written.
8. **Patient video has no captions, no transcript and no poster.** Owner question Q6: do captions or a transcript exist, and is patient consent recorded? Nothing is invented. A poster would avoid a blank frame with `preload="none"`; until one exists, `preload="metadata"` stays.
9. **Doctor card paragraph:** "His profile covers his background, qualifications and experience. If you would like to know which clinician is best placed to see you for a particular treatment, mention it when you call the clinic." Kept as written.
10. **Closing card button labels** include the phone number ("Call +91 90306 48393") and the card has a third action "Send an enquiry". The standard's "Call for Consultation" is not used (Q4: keep as written).
11. **Hero second button** is "Get directions", not "Send an enquiry" (Q3: keep; "Send an enquiry" lives in the closing block).
12. **Plan mismatch:** the plan's quote card text and "Save the natural teeth till the last stage." are not on this page. Not added.
13. **Dr. Muti Ur Rahman** reads "MBBS (OSM) · MD (Gen. Med.)" in `lib/clinical-team.ts`. Kept exactly; never described as a dental specialist.
