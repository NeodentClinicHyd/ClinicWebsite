import { Fragment } from "react";
import { Emphasis } from "./Emphasis";
import type { Rich } from "@/lib/braces-orthodontics-page";

/** Renders copy that carries highlighted phrases (see `Rich` in the page lib).
 *  Fork of the page's old RichText that uses the plain Emphasis helper (no
 *  marker underline). The text is stored as plain strings, so the markup adds
 *  only emphasis. */
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
