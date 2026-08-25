import Image from "next/image";
import neodentMark from "@/public/assets/neodent-mark.png";

/**
 * Brand lockup used by both the navbar and the footer.
 *
 * The full Neodent logo carries its own arced "NEODENT" wordmark and a
 * "DENTAL HOSPITAL" ribbon. At lockup sizes (~40-48px) both resolve to
 * illegible noise and compete with the adjacent type, so the navbar/footer
 * use the extracted symbol (tooth + globe + crescent + cross) and let the
 * wordmark be set in type. The full lockup stays the right asset anywhere it
 * has room to breathe -- OG images, print, share cards.
 *
 * The mark is decorative here (`alt=""`): the link's accessible name comes
 * from the wordmark text, so labelling the image too would announce the
 * brand twice.
 *
 * Both wordmark lines are capitalised in CSS, not here. Keeping real casing
 * in the DOM means the accessible name and any copied text stay "Neodent
 * Dental Hospitals" instead of shouting, since some screen readers spell out
 * all-caps strings letter by letter.
 */
export function BrandLockup({
  onClick,
  testId,
}: {
  onClick?: () => void;
  testId: string;
}) {
  return (
    <a className="brand" href="#home" onClick={onClick} data-testid={testId}>
      <span className="brand-mark">
        <Image src={neodentMark} alt="" width={40} height={40} priority />
      </span>
      <span className="brand-word">
        <span className="brand-word-name">Neodent</span>
        <span className="brand-word-sub">Dental Hospitals</span>
      </span>
    </a>
  );
}
