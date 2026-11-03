import { Fragment } from "react";
import type { Rich } from "@/lib/composite-build-up-page";
import { Emphasis } from "./Emphasis";

/** Renders copy that carries highlighted phrases (see `Rich` in the page
 *  lib). Fork of components/treatments/composite-build-up/RichText.tsx that
 *  uses plain emphasis instead of the underline / marker highlight. The text
 *  is stored as plain strings, so the markup adds only emphasis. */
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
