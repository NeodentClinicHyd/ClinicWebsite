import Link from "next/link";
import type { TextLink } from "@/lib/composite-build-up-page";

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Renders text exactly as stored, turning only the words listed in `links`
 *  into links. The stored string is what the JSON-LD uses. */
export function LinkedText({
  text,
  links = [],
  linkClassName,
}: {
  text: string;
  links?: TextLink[];
  linkClassName?: string;
}) {
  if (links.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${links.map((l) => escape(l.text)).join("|")})`);
  return (
    <>
      {text.split(pattern).map((part, index) => {
        const link = links.find((l) => l.text === part);
        return link ? (
          <Link className={linkClassName} href={link.href} key={index}>
            {part}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}
