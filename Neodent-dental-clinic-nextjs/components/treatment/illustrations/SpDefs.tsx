/* ------------------------------------------------------------------
   SpDefs: ONE hidden inline <svg> with the few defs that only the scaling
   and polishing scenes use (every id is prefixed "neo-sp-"). Mount it once
   per page, next to IllustrationDefs and RctDefs (the side-on tooth section
   uses the root canal kit's dentine and enamel). Like them it is 0 x 0 and
   absolutely positioned, never display:none (gradients and patterns stop
   resolving in several browsers).
   No new hues: the fade is the canvas ivory, the stipple is the ink.
   ------------------------------------------------------------------ */

export function SpDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* fade into the frame (canvas ivory, same value as the arch fades) */}
        <linearGradient id="neo-sp-fade-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8F6EF" stopOpacity="0" />
          <stop offset="1" stopColor="#F8F6EF" stopOpacity="1" />
        </linearGradient>

        {/* light stipple that sits on the plaque film */}
        <pattern id="neo-sp-stipple" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.8" r="0.8" fill="#263033" fillOpacity="0.45" />
          <circle cx="5.4" cy="4.2" r="0.7" fill="#263033" fillOpacity="0.38" />
          <circle cx="2.6" cy="6.4" r="0.6" fill="#263033" fillOpacity="0.32" />
          <circle cx="7" cy="0.9" r="0.55" fill="#263033" fillOpacity="0.3" />
        </pattern>
      </defs>
    </svg>
  );
}
