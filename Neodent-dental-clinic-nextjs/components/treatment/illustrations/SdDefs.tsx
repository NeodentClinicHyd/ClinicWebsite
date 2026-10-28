/* ------------------------------------------------------------------
   SdDefs: ONE hidden inline <svg> with the gradients that only the smile
   design scenes use (every id is prefixed "neo-sd-"). Mount it once per
   page, next to IllustrationDefs, RctDefs, CbuDefs and BracesDefs. Like
   them it is 0 x 0 and absolutely positioned, never display:none
   (gradients stop resolving in several browsers).
   No new hues: porcelain is the kit's enamel family, the fades are the
   canvas ivory.
   ------------------------------------------------------------------ */

const stops = (cols: readonly string[], offs: readonly number[]) =>
  cols.map((c, i) => <stop key={i} offset={offs[i]} stopColor={c} />);

export function SdDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* ---- a thin porcelain shell: whiter than enamel, light from the top left ---- */}
        <linearGradient id="neo-sd-veneer" x1="0" y1="0" x2="1" y2="0.6">
          {stops(["#FFFFFF", "#FBF8F0", "#EFE8D8"], [0, 0.5, 1])}
        </linearGradient>
        <linearGradient id="neo-sd-veneer-v" x1="0" y1="0" x2="0.5" y2="1">
          {stops(["#FFFFFF", "#F9F5EB", "#ECE4D2"], [0, 0.5, 1])}
        </linearGradient>

        {/* ---- fades into the frame (canvas ivory, same value as the arch fades) ---- */}
        <linearGradient id="neo-sd-fade-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8F6EF" stopOpacity="0" />
          <stop offset="1" stopColor="#F8F6EF" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="neo-sd-fade-t" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F8F6EF" stopOpacity="0" />
          <stop offset="1" stopColor="#F8F6EF" stopOpacity="1" />
        </linearGradient>

        {/* ---- natural shade zones: dentin-toned washes (no new hues) ---- */}
        <linearGradient id="neo-sd-shade-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D8BE7E" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#E3CE98" stopOpacity="0.3" />
          <stop offset="1" stopColor="#E3CE98" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="neo-sd-shade-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9A96C" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#D9BC7E" stopOpacity="0.36" />
          <stop offset="1" stopColor="#D9BC7E" stopOpacity="0.26" />
        </linearGradient>
        <linearGradient id="neo-sd-shade-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B99763" stopOpacity="0.72" />
          <stop offset="0.6" stopColor="#C9A96C" stopOpacity="0.56" />
          <stop offset="1" stopColor="#C9A96C" stopOpacity="0.42" />
        </linearGradient>
      </defs>
    </svg>
  );
}
