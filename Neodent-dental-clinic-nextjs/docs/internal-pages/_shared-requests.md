
## doctors (R2, 1 Nov 2026): export the "Dr. Miftah at work" copy from lib
`components/sections/ClinicalLeadership.tsx` keeps the `AT_WORK` constant (image path, alt, dimensions) and the paragraph and link text inside the component. `/doctors` now shows the same block, so the strings were copied verbatim into `lib/pages/doctors-content.ts` (`DOCTORS_AT_WORK`). Request: move them to a shared lib export used by both pages so they cannot drift. Not urgent. No file outside the doctors folders was edited.
