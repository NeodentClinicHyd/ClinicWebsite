# PHOTO_INVENTORY: `public/assets/dr-miftah/`

R0, 1 Nov 2026. Pixel sizes read in Chromium (`naturalWidth` / `naturalHeight`) from the dev server; raw data in `.audit/dr-miftah/photo-inventory.json`. Portrait = aspect (w/h) under 0.95. No file was moved, renamed or edited.

## The ten wall photographs

| N | File (`Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital - photoN.jpeg`) | Pixels | Bytes | Aspect | Shape | Plan expected | Referenced by page code |
|---|---|---|---|---|---|---|---|
| 1 | photo1.jpeg | 997 x 1280 | 130,636 | 0.779 | portrait | portrait OK | no |
| 2 | photo2.jpeg | 3024 x 4032 | 1,237,589 | 0.750 | portrait | portrait OK | no |
| 3 | photo3.jpeg | 2261 x 2714 | 388,632 | 0.833 | portrait | portrait OK | no |
| 4 | photo4.jpeg | 4032 x 3024 | 1,453,617 | 1.333 | landscape | landscape OK | no |
| 5 | photo5.jpeg | 4032 x 3024 | 1,574,606 | 1.333 | landscape | landscape OK | no |
| 6 | photo6.jpeg | 4032 x 3024 | 702,481 | 1.333 | landscape | landscape OK | no |
| 7 | photo7.jpeg | 4032 x 3024 | 1,407,581 | 1.333 | landscape | landscape OK | no |
| 8 | photo8.jpeg | 591 x 1280 | 47,304 | 0.462 | portrait (very tall) | portrait OK | no |
| 9 | photo9.jpeg | 927 x 1280 | 91,203 | 0.724 | portrait | portrait OK | no |
| 10 | photo10.jpeg | 646 x 469 | 33,264 | 1.377 | landscape | landscape OK | no |

The expected shapes in the plan are all right. Points for R7:
- **Photograph 8 is very narrow (aspect 0.46).** In a justified row, a tile of this ratio will be much narrower than the plan's "110 to 130 px" portraits (about 70 px at a 160 px row height). R7 will cap the flex-grow ratio and crop to no less than about 0.6 so the tile stays tappable (44 px minimum) and recognisable. The full image is shown in the viewer.
- **Photograph 10 is small (646 x 469).** It is fine as a tile. In the viewer it will be shown at its natural size at most (no upscaling past 100%), so it will not look soft.
- The four 4032 x 3024 files and photo 2 are 0.7 to 1.6 MB. `next/image` serves resized versions in tiles. The plain `<a href>` to the original (needed for image search and no-JavaScript) opens the full file.

## Other files in the folder

| File | Pixels | Bytes | Shape | Used by page code |
|---|---|---|---|---|
| Award presented to Dr Miftah ur Rahman by Dr K Mahendranadh Reddy.jpeg | 1170 x 1150 | 178,264 | square | yes (05) |
| banner_image.jpeg | 992 x 926 | 99,227 | near-square | yes (header) |
| Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College condicting seminar.jpeg | 1008 x 1071 | 136,274 | square | yes (06) |
| Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College.jpeg | 853 x 1280 | 118,067 | portrait | yes (JSON-LD `image`) |
| Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg | 960 x 1280 | 122,686 | portrait | no (not on owner's sheet, Q3) |
| dr-miftah-award-recognition.jpg | 1280 x 960 | 149,180 | landscape | yes (05, second plate) |
| Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png | 794 x 741 | 102,362 | near-square | no (untitled portrait) |
| Dr. Md. Miftah Ur Rahman during treatment- Neodent Dental Hospital.jpg | 704 x 1372 | 100,509 | portrait | yes (02 main photo) |
| og-dr-miftah-ur-rahman-1200x630.jpg | 1200 x 630 | 87,133 | landscape | yes (OG image) |
| pubmed-seeklogo.png | 2000 x 710 | 33,609 | landscape | yes (06) |

## `treatments/` subfolder

All 49 files are referenced by the page (via `lib/miftah-treatment-media.json`, `lib/miftah-press-archive.ts`, `lib/miftah-treatment-evidence.ts`): 13 press clippings in `treatments/media/` (widths 497 to 1080, heights 879 to 1280), 8 before/after + 6 smile-case + 3 radiograph images in `treatments/web/` (webp) with `.jpeg` originals for the same, and two film posters (`.jpg`, 1080 x 1920) with their two `.mp4` films (about 9.7 MB each).

Film posters used by section 07 live in `public/assets/treatment-video/` (outside this folder).
