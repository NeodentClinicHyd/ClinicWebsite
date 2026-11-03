import { ProfileIndex } from "./ProfileIndex";
import { PhilosophyCard } from "./PhilosophyCard";
import { Biography } from "./Biography";
import { Specialisation } from "./Specialisation";
import { FullScope } from "./FullScope";
import { Education } from "./Education";
import { AcademicResearch } from "./AcademicResearch";
import { InPractice } from "./InPractice";
import { PatientVoices } from "./PatientVoices";
import { PressArchive } from "./PressArchive";
import { PhotoWall } from "./PhotoWall";
import { Locations } from "./Locations";
import { ClosingCta } from "./ClosingCta";

/* ------------------------------------------------------------------
   Dr. Md. Miftah Ur Rahman -- the sections of the profile below the
   header, in order (PAGE_PLAN section 4). Band rhythm: 01 light, 02
   light, 03 dark (with the case story), 04 light, 05 dark, 06 light,
   07 dark, 08 light, 09 dark, photograph wall dark, 10 light, the
   closing block dark.

   Every section is its own component with its own CSS Module. Facts
   (credentials, posts, institutions, publications, reviews, addresses)
   are reproduced verbatim from the client brief; patient review text is
   unedited.
   ------------------------------------------------------------------ */

export function DrMiftahProfile() {
  return (
    <>
      <ProfileIndex />
      <PhilosophyCard />
      <Biography />
      <Specialisation />
      <FullScope />
      <Education />
      <AcademicResearch />
      <InPractice />
      <PatientVoices />
      <PressArchive />
      <PhotoWall />
      <Locations />
      <ClosingCta />
    </>
  );
}
