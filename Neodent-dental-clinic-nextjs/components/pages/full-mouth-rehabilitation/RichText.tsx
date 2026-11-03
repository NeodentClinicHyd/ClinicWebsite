import { Fragment } from "react";
import { Emphasis } from "./Emphasis";
import type { Rich } from "@/lib/full-mouth-rehabilitation-page";

/** Renders copy that carries highlighted phrases (see `Rich` in the page lib).
 *  The text is stored as plain strings, so the markup adds only emphasis:
 *  colour or weight, never an underline or a marker. */
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
