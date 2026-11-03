/* ------------------------------------------------------------------
   Content for the Dr. Md. Miftah Ur Rahman profile
   (/doctors/dr-miftah-ur-rahman). Page-only data; nothing here is
   shared with another route.
   ------------------------------------------------------------------ */

export const MIFTAH_NAME = "Dr. Md. Miftah Ur Rahman";

/* Philosophy statement (approved change A1, 1 Nov 2026). Also used
   on the home page, typed inline in components/sections/ClinicalLeadership.tsx. */
export const MIFTAH_PHILOSOPHY = {
  lead: "Save the natural teeth",
  accent: "till the last stage.",
} as const;

export const MIFTAH_BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Doctors", path: "/doctors" },
  { name: MIFTAH_NAME, path: "/doctors/dr-miftah-ur-rahman" },
] as const;

/* Header photograph: the client-supplied banner at Neodent Dental
   Hospital (near-square, subject on the right half). */
export const MIFTAH_HEADER_PHOTO = {
  src: "/assets/dr-miftah/banner_image.jpeg",
  width: 992,
  height: 926,
  alt: "Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital, Hyderabad",
  focal: "78% 36%",
} as const;

/* ------------------------------------------------------------------
   Photograph wall (PAGE_PLAN section 4, SW). The ten photographs of the
   owner's sheet, in order. `file` is the real file name in
   public/assets/dr-miftah/ (never renamed); width and height are the
   real pixel sizes (PHOTO_INVENTORY.md); `alt` is also the visible
   caption. Captions are the plan's final strings.
   ------------------------------------------------------------------ */

const PHOTO_DIR = "/assets/dr-miftah/";

function photoFile(n: number) {
  return `Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital - photo${n}.jpeg`;
}

export const MIFTAH_PHOTOS = [
  {
    n: 1,
    width: 997,
    height: 1280,
    alt: "Dr. Md. Miftah Ur Rahman, prosthodontist and implantologist, in a treatment room at Neodent Dental Hospital",
  },
  {
    n: 2,
    width: 3024,
    height: 4032,
    alt: "Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital Nampally, Hyderabad",
  },
  {
    n: 3,
    width: 2261,
    height: 2714,
    alt: "Portrait of Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital",
  },
  {
    n: 4,
    width: 4032,
    height: 3024,
    alt: "Dr. Md. Miftah Ur Rahman with Dr. Mohd. Siraj Ur Rahman and Dr. Muti Ur Rahman at Neodent Dental Hospital Mehdipatnam",
  },
  {
    n: 5,
    width: 4032,
    height: 3024,
    alt: "Dr. Md. Miftah Ur Rahman with Dr. Mohd. Siraj Ur Rahman at Neodent Dental Hospital Mehdipatnam",
  },
  {
    n: 6,
    width: 4032,
    height: 3024,
    alt: "Dr. Md. Miftah Ur Rahman with other doctors",
  },
  {
    n: 7,
    width: 4032,
    height: 3024,
    alt: "Dr. Md. Miftah Ur Rahman with MLA Jaffer Hussain Meraj",
  },
  {
    n: 8,
    width: 591,
    height: 1280,
    alt: "Dr. Md. Miftah Ur Rahman during a treatment at Neodent Dental Hospital",
  },
  {
    n: 9,
    width: 927,
    height: 1280,
    alt: "Dr. Md. Miftah Ur Rahman in the Department of Prosthodontics",
  },
  {
    n: 10,
    width: 646,
    height: 469,
    alt: "Dr. Md. Miftah Ur Rahman receiving an award from Dr. Praneet Manga, Professor, AIMS Institute of Dental Sciences",
  },
].map((photo) => ({
  ...photo,
  /* URL-encoded path of the original file (spaces and full stops in the name). */
  src: PHOTO_DIR + encodeURIComponent(photoFile(photo.n)),
}));
