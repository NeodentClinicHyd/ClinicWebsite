/* ------------------------------------------------------------------
   BracesDefs: ONE hidden inline <svg> with the gradients and patterns that
   only the braces and orthodontics scenes use (every id is prefixed
   "neo-brc-"). Mount it once per page, next to IllustrationDefs, exactly as
   RctDefs is mounted on the root canal page. 0 x 0 and absolutely
   positioned, never display:none (gradients stop resolving in several
   browsers).
   No new hues: steel is the kit's grey metal family, acrylic is the denture
   base pink, the elastic and the fabric are warm greys.
   ------------------------------------------------------------------ */

const stops = (cols: readonly string[], offs: readonly number[]) =>
  cols.map((c, i) => <stop key={i} offset={offs[i]} stopColor={c} />);

export function BracesDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* ---- stainless steel: light from the top left ---- */}
        <linearGradient id="neo-brc-steel" x1="0" y1="0" x2="1" y2="1">
          {stops(["#F4F7F9", "#CBD3D8", "#9AA6AE", "#6A767E"], [0, 0.34, 0.72, 1])}
        </linearGradient>
        <linearGradient id="neo-brc-steel-dark" x1="0" y1="0" x2="1" y2="1">
          {stops(["#8A969E", "#66727A", "#4A565D"], [0, 0.55, 1])}
        </linearGradient>
        <linearGradient id="neo-brc-slot" x1="0" y1="0" x2="0" y2="1">
          {stops(["#2F3A40", "#4A565D", "#7A868E"], [0, 0.55, 1])}
        </linearGradient>
        <linearGradient id="neo-brc-wire-v" x1="0" y1="0" x2="0" y2="1">
          {stops(["#E7ECEF", "#9AA6AE", "#566168"], [0, 0.5, 1])}
        </linearGradient>

        {/* ---- acrylic plate: the denture base pink, polished ---- */}
        <linearGradient id="neo-brc-acrylic" x1="0.05" y1="0" x2="0.9" y2="1">
          {stops(["#F0A2A2", "#E58E8E", "#DB8080", "#CE7272"], [0, 0.35, 0.72, 1])}
        </linearGradient>
        <linearGradient id="neo-brc-acrylic-edge" x1="0.05" y1="0" x2="0.9" y2="1">
          {stops(["#D98686", "#C06C6C", "#A85858"], [0, 0.5, 1])}
        </linearGradient>
        <radialGradient id="neo-brc-polish" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* ---- elastic band: pale warm grey, slightly translucent ---- */}
        <linearGradient id="neo-brc-elastic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1EDE3" stopOpacity="0.92" />
          <stop offset="1" stopColor="#CFC8B8" stopOpacity="0.8" />
        </linearGradient>

        {/* ---- bonded bead on a fixed retainer ---- */}
        <radialGradient id="neo-brc-bead" cx="0.34" cy="0.3" r="0.8">
          {stops(["#FBF8F0", "#E3DCCB", "#BDB4A0"], [0, 0.55, 1])}
        </radialGradient>

        {/* ---- fabric strap: warm grey weave ---- */}
        <linearGradient id="neo-brc-fabric" x1="0" y1="0" x2="1" y2="1">
          {stops(["#E4DED1", "#CFC8B8", "#B9B1A0"], [0, 0.55, 1])}
        </linearGradient>
        <pattern id="neo-brc-weave" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 2.5H5" stroke="#8F8777" strokeOpacity="0.28" strokeWidth="0.7" fill="none" />
        </pattern>

        {/* ---- soft contact shadow on the ground ---- */}
        <radialGradient id="neo-brc-contact" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3D2F16" stopOpacity="0.28" />
          <stop offset="1" stopColor="#3D2F16" stopOpacity="0" />
        </radialGradient>

        {/* ---- fade of the gum into the frame, towards the back of an occlusal arch ---- */}
        <linearGradient id="neo-brc-back-fade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0.5" stopColor="#F8F6EF" stopOpacity="0" />
          <stop offset="0.84" stopColor="#F8F6EF" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

