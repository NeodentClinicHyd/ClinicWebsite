import { Fragment } from "react";
import type { Rich } from "@/lib/root-canal-treatment-page";
import { Emphasis } from "./Emphasis";

/** Renders copy that carries highlighted phrases (`Rich` in the page data).
 *  The text is stored as plain strings, so the markup adds only emphasis:
 *  plain weight or colour, never a marker or underline. On a dark ground
 *  (`onDark`) the phrases are ivory bold (standing decision D4). */
export function RichText({ parts, onDark = false }: { parts: Rich; onDark?: boolean }) {
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <Fragment key={index}>{part}</Fragment>
        ) : (
          <Emphasis key={index} tone={part.tone} onDark={onDark}>
            {part.h}
          </Emphasis>
        ),
      )}
    </>
  );
}
