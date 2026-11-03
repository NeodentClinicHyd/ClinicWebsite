import Image from "next/image";
import type { ClinicalTeamMember } from "@/lib/clinical-team";
import styles from "./DoctorPortrait.module.css";

/* Shared doctor portrait: the transparent cut-out placed on the 4:5
   charcoal frame with the per-file `crop` from lib/clinical-team.ts, so
   every face sits at the same height and size on every page. A doctor
   with no portrait gets the monogram plate in the same frame.

   Same recipe as the home "A steady hand" section and the About team
   (which keep their own copies for now). Use this component for new
   pages instead of copying the CSS again. */

/** Frame width per breakpoint; the image `sizes` is scaled by the crop
    width so zoomed files are fetched at the size they render. */
export type FrameSizes = readonly (readonly [media: string | null, width: string])[];

function scaledSizes(frame: FrameSizes, scale: number) {
  return frame
    .map(([media, width]) => {
      const len = scale === 1 ? width : `calc(${width} * ${scale})`;
      return media ? `${media} ${len}` : len;
    })
    .join(", ");
}

export function DoctorPortrait({
  member,
  frame = [[null, "240px"]],
  alt,
  className,
}: {
  member: ClinicalTeamMember;
  frame?: FrameSizes;
  /** Overrides member.alt where a page keeps its own approved alt text. */
  alt?: string;
  className?: string;
}) {
  const name = member.nameLines.join(" ");
  const cls = className ? `${styles.frame} ${className}` : styles.frame;

  if (!member.image) {
    return (
      <div className={`${cls} ${styles.monogram}`} role="img" aria-label={alt ?? name}>
        <svg className={styles.tooth} viewBox="0 0 100 120" aria-hidden="true" focusable="false">
          <path d="M50 20C39 8 15 9 13 33c-2 20 10 32 13 51 3 17 5 28 11 28 7 0 7-19 13-29 6 10 6 29 13 29 6 0 8-11 11-28 3-19 15-31 13-51C85 9 61 8 50 20Z" />
        </svg>
        <span className={styles.initials} aria-hidden="true">{member.initials}</span>
      </div>
    );
  }

  const crop = member.crop ?? { file: [800, 1000] as const, width: 100, left: 0, top: 0 };
  return (
    <div className={cls}>
      <Image
        className={styles.cutout}
        src={member.image}
        alt={alt ?? member.alt}
        width={crop.file[0]}
        height={crop.file[1]}
        sizes={scaledSizes(frame, crop.width / 100)}
        style={{ width: `${crop.width}%`, left: `${crop.left}%`, top: `${crop.top}%` }}
      />
    </div>
  );
}
