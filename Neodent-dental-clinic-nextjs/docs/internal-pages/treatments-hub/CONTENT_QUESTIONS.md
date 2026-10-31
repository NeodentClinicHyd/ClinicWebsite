# CONTENT_QUESTIONS: treatments-hub

Quoted copy that looks wrong, ungrammatical or unverifiable. Nothing here has been edited.

## Open

1. **Ratings differ from the footer (Q2).** This page (`lib/treatments-hub.ts`): Mehdipatnam "4.3" / "260 reviews", Nampally "4.5" / "155 reviews". Footer and home (`lib/site-data.ts`): Mehdipatnam 4.3 / 261, Nampally 4.6 / 157. Which is current? Left unchanged. A fix belongs in `lib/treatments-hub.ts` (shared) or in `site-data.ts` (shared).
2. **Sentence fragment in S5.** "Part of Neodent's approach to helping patients understand the materials and methods used in their treatment." This is not a full sentence. Left as is.
3. **Possible mismatch of photo and card (S2).** The "Dental Implants" card uses the photo with alt "Upper arch rehabilitation with implants after surgery at Neodent Dental Hospital". Plausible, but confirm that is the intended photo.
4. **Typographic variants.** "Treatment planning at Neodent is not a fixed sequence — it is shaped by..." and "Not every dental condition requires the same response — some patients..." use em dashes. Left as is (content rule).
5. **Hero subtitles.** The plan says the video has burned-in subtitles. They cannot be checked from code. If the video file has no burned-in text, the caption overlap noted in the screenshots does not apply.
6. **Process photo (Q9).** The plan notes the room photo is dim and cluttered. Not replaced. No replacement supplied.
7. **Sound buttons.** Whether the S7 feature film and the three tiles have speech is unknown. Sound buttons are added only on the hero and the DMLS video (Dr. Miftah explains). Confirm if any other film has speech.
8. **Plan label "Call for Consultation" versus "Call Neodent" (Q4).** "Call Neodent" is kept everywhere on this page.
9. **Highlight policy conflict.** `.kiro/steering/neodent-design-system.md` section 17 asks for one primary, one secondary and one quiet highlight in every substantive paragraph and `onDark` on dark surfaces. The page plan asks for at most two per section and none on dark body text. The plan is page-specific and later, so these runs follow the plan. Confirm.
10. **A2 and the shared data file.** Approving A2 (two extra FAQs) would be written to `lib/pages/treatments-hub-content.ts` (owned). But the visible FAQ and the FAQPage JSON-LD both read `TREATMENTS_FAQ` in `lib/treatments-hub.ts` (shared, read-only). So adding the two items to the visible FAQ without a matching JSON-LD change would break "JSON-LD matches the visible FAQ" unless `page.tsx` builds the JSON-LD from a merged list. The merge is possible inside `page.tsx`, but it would change the JSON-LD (an owner decision, since the plan says "byte-identical").
