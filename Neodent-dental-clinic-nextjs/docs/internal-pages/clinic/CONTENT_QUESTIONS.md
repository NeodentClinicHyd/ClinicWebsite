# CONTENT_QUESTIONS: Clinics hub (`/clinic`)

Raised by R0, 31 Oct 2026. Nothing below was edited. Quotes are exact.

## Copy that looks wrong or unverifiable

1. **Mehdipatnam address differs between the plan and the data.**
   Page and `lib/site-data.ts`: "10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006".
   PAGE_PLAN.md section 3 reads "10-3-148/11/1 … Telangana 500028" (taken from a small screenshot).
   Which is correct? The page uses the data value; the Google Maps directions URL also contains "10-3-14B%2F11%2F1 … 500006".
2. **"25,000+ patients treated"** (strip). Same as Q9 in the plan: confirm it is approved site-wide. Source: `legacyStats.patientsTreated`.
3. **"2 clinics" / "7 treatments at each clinic"** (strip). "7" is `treatments.length` from `expertise-data.ts`. Confirm all seven are offered at both clinics (the plan's supporting line for S5 asserts this: "Both Neodent clinics … offer all seven treatments").
4. **"the practice that began here in 1994 and continues today"** (Mehdipatnam card). Says Mehdipatnam is where the practice began. Confirm; the plan's draft FAQ repeats it.
5. **"Dr. Md. Miftah Ur Rahman practises here"** (both clinic cards). Name form in the data and on the page: "Dr. Md. Miftah Ur Rahman" (`lib/clinic-data.ts`, `sharedDoctor.name`). The founder is written "Dr. Mohd. Siraj Ur Rahman" in `site-data.ts`. "Md." and "Mohd." are both used; confirm the intended forms (Q11). Also the same line appears on **both** cards, so it states that he practises at Nampally as well as Mehdipatnam. Confirm.
6. **"Medwin Hospital Complex" as locality for Nampally** while the full address spells "Pillar #A1270, Raghav Ratna Towers". Fine as is; noted only because the Nampally street-frontage photo shows a signboard with outdated hours (Q10).
7. **Em dashes in the header and card copy** ("across two Hyderabad locations — in Mehdipatnam and Nampally", "needs — the practice that began here…"). Not wrong. Noted only because they are the longest sentences on the page. Left as is; wording is not to be changed.
8. **Hours.** Cards show "4:00 PM – 8:00 PM" and "10:30 AM – 5:00 PM" without days. The plan adds "Monday to Saturday · Sunday closed" (Q8). `lib/clinic-data.ts` has `weeklyHours` and `weeklyClosure` fields to read it from, once approved.
9. **Plan closing-card text** reads "…speak with our team **about** your options." The live text is "…speak with our team **to understand** your options." The live text is kept.
10. **Header and card alt text differs for the same photo.** Waiting lounge: header "Neodent Dental Hospital, Mehdipatnam — patient waiting lounge interior" vs gallery "Neodent Dental Hospital Mehdipatnam — the patient waiting lounge with its blue chandelier". Entrance: card "…carved entrance doorway and exterior" vs gallery "…the carved wooden entrance doorway". Street frontage: card "…street frontage and signage" vs gallery "…the street frontage and signage". Not an error, but both sets must be kept.

## Alt text

No alt text is missing or very short: all 15 images have descriptive alt (listed in DISCOVERY.md section 3).

## Media quality

11. **`Neodent dental hospital - mehdipatnam Exterior.jpg` is only 382x510 px (77 KB).** It is shown at 572 px wide in the Mehdipatnam clinic card and at 283 px in the gallery. It is upscaled and soft on a desktop. A higher-resolution original would help (owner to supply). Not edited.
12. The other three Mehdipatnam gallery photos and the treatment chamber photo are 12 MP originals (1.2 to 1.6 MB). `next/image` serves resized variants, so no action unless page weight becomes a concern.

## Plan assumptions that did not match the code (information only)

- The plan names `lib/clinic-data.ts` as the data source for this page; the page reads `lib/site-data.ts` (same values).
- The plan expects JSON-LD in `app/clinic/page.tsx`; there is none there (4 global blocks only).
- The plan says `priority` on the header image; this repo's Next 16 docs deprecate `priority` for `preload`.
- `scripts/page-content-snapshot.mjs`, `page-content-check.mjs`, `page-audit.mjs` and `docs/internal-pages/_shared-requests.md` do not exist. Slug-generic copies sit in `.audit/clinic/tools/`.


## Resolved by the owner (31 Oct 2026, after R8)

- **Item 1, Mehdipatnam address:** confirmed as "10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006". The data is right; the plan's "10-3-148/11/1 … 500028" was a misread screenshot. No change.
- **Item 2 (25,000+), item 3 (7 treatments), item 4 ("began here in 1994"), item 5 (Dr. name form and the line on both cards), item 6 (Nampally signboard photo), item 8 (hours wording):** the owner asked for these to be shown the way the home page shows them. Done: the cards show "{hours} · Sunday holiday" as the home "Spaces designed around care" section does; "25,000+ patients treated" is the home figure (`legacyStats`); doctor names use the home forms; the Nampally street-frontage photo is used as on the home page, with no note.
- **Item 11, low-resolution Mehdipatnam entrance photo:** the owner has no larger photo. Left as is.
