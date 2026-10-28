import { Fragment } from "react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import type { Rich } from "@/lib/braces-orthodontics-page";

/** Renders copy that carries highlighted phrases (see `Rich` in the page lib).
 *  The text is stored as plain strings, so the markup adds only emphasis. */
export function RichText({ parts, onDark = false }: { parts: Rich; onDark?: boolean }) {
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <Fragment key={index}>{part}</Fragment>
        ) : (
          <EditorialHighlight key={index} tone={part.tone} onDark={onDark}>
            {part.h}
          </EditorialHighlight>
        ),
      )}
    </>
  );
}
