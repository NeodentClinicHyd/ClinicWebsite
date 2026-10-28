import { curve, rng, type Pt } from "./geometry";

/* ------------------------------------------------------------------
   RctDefs: ONE hidden inline <svg> with the gradients, patterns and
   filters that only the root canal treatment scenes use (every id is
   prefixed "neo-rct-"). Mount it once per page, next to IllustrationDefs.
   Like IllustrationDefs it is 0 x 0 and absolutely positioned, never
   display:none (gradients stop resolving in several browsers).
   No new hues: every colour is taken from the existing artwork palette
   (enamel, dentin, gum family, bone, neutral greys).
   ------------------------------------------------------------------ */

/** Fine dentinal tubule texture: short, slightly bent strokes that run
 *  roughly along `angle` (radians), no grid. */
function tubules(seed: number, size: number, count: number, angle: number, spread: number) {
  const r = rng(seed);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = r() * size;
    const y = r() * size;
    const a = angle + (r() - 0.5) * spread;
    const len = 7 + r() * 11;
    const bend = (r() - 0.5) * 0.7;
    const pts: Pt[] = [];
    for (let k = 0; k < 3; k++) {
      const t = k / 2;
      const ang = a + bend * t;
      pts.push([x + Math.cos(ang) * len * t, y + Math.sin(ang) * len * t]);
    }
    const d = curve(pts);
    const w = (0.6 + r() * 0.5).toFixed(2);
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const dxs = new Set([0, Math.min(...xs) < 0 ? size : Math.max(...xs) > size ? -size : 0]);
    const dys = new Set([0, Math.min(...ys) < 0 ? size : Math.max(...ys) > size ? -size : 0]);
    for (const dx of dxs)
      for (const dy of dys)
        out.push(
          `<path d="${d}" fill="none" stroke-width="${w}"${dx || dy ? ` transform="translate(${dx} ${dy})"` : ""}/>`,
        );
  }
  return out.join("");
}

/** Crown tubules run up and out from the pulp; root tubules run out sideways. */
const TUB_CROWN = tubules(31, 96, 46, -Math.PI / 2, 0.9);
const TUB_ROOT = tubules(57, 96, 46, 0.14, 0.7);

const stops = (cols: readonly string[], offs: readonly number[]) =>
  cols.map((c, i) => <stop key={i} offset={offs[i]} stopColor={c} />);

export function RctDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* ---- dentinal tubule texture ---- */}
        <pattern id="neo-rct-tub-crown" width="96" height="96" patternUnits="userSpaceOnUse">
          <g
            stroke="#B8985F"
            strokeLinecap="round"
            opacity="0.2"
            // The strokes are generated from fixed seeds, so the markup is trusted.
            dangerouslySetInnerHTML={{ __html: TUB_CROWN }}
          />
        </pattern>
        <pattern id="neo-rct-tub-root" width="96" height="96" patternUnits="userSpaceOnUse">
          <g
            stroke="#B8985F"
            strokeLinecap="round"
            opacity="0.2"
            dangerouslySetInnerHTML={{ __html: TUB_ROOT }}
          />
        </pattern>

        {/* ---- tooth ---- */}
        <linearGradient id="neo-rct-dentine" x1="0.1" y1="0" x2="0.9" y2="1">
          {stops(["#F4E7C6", "#EBD8AC", "#E0C899"], [0, 0.5, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-enamel" x1="0.05" y1="0" x2="0.85" y2="1">
          {stops(["#FFFFFF", "#F6F1E5", "#E6DDCA"], [0, 0.45, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-cement" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F8EFD6" stopOpacity="0.75" />
          <stop offset="1" stopColor="#F8EFD6" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="neo-rct-stump" x1="0" y1="0" x2="1" y2="1">
          {stops(["#F3E5C2", "#DCC48F"], [0, 1])}
        </linearGradient>

        {/* ---- the spaces inside the tooth ---- */}
        <linearGradient id="neo-rct-pulp" x1="0.1" y1="0" x2="0.5" y2="1">
          {stops(["#FBE4DC", "#F4CBC2", "#EDB6AE"], [0, 0.55, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-bore" x1="0.1" y1="0" x2="0.9" y2="1">
          {stops(["#CDB482", "#DEC99B", "#EADCB6"], [0, 0.55, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-hollow" x1="0.1" y1="0" x2="0.6" y2="1">
          {stops(["#EADDBB", "#F1E7CE", "#E9DDC0"], [0, 0.55, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-clean" x1="0.1" y1="0" x2="0.6" y2="1">
          {stops(["#E2D3AF", "#F0E6CC", "#FAF5E6"], [0, 0.55, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-fill" x1="0" y1="0" x2="1" y2="0.2">
          {stops(["#D3CDC0", "#E9E5DB", "#C6BFB2", "#B3AC9F"], [0, 0.32, 0.7, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-paste" x1="0" y1="0" x2="0" y2="1">
          {stops(["#DDE1E2", "#C3C9CC"], [0, 1])}
        </linearGradient>

        {/* ---- fillings ---- */}
        <linearGradient id="neo-rct-temp" x1="0.05" y1="0" x2="0.9" y2="1">
          {stops(["#F7F3E8", "#E7E1D2", "#D3CCBA"], [0, 0.5, 1])}
        </linearGradient>
        <linearGradient id="neo-rct-closure" x1="0.05" y1="0" x2="0.9" y2="1">
          {stops(["#FFFCF2", "#F5EEDC", "#E7DDC4"], [0, 0.5, 1])}
        </linearGradient>

        {/* ---- dental dam ---- */}
        <linearGradient id="neo-rct-dam" x1="0" y1="0" x2="0" y2="1">
          {stops(["#D4D9DB", "#B0B7BB"], [0, 1])}
        </linearGradient>

        {/* ---- numbing zone ---- */}
        <radialGradient id="neo-rct-numb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#D71920" stopOpacity="0" />
          <stop offset="1" stopColor="#D71920" stopOpacity="0.16" />
        </radialGradient>

        {/* ---- soft filters (blur only; sharper ones live in IllustrationDefs) ---- */}
        <filter id="neo-rct-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="neo-rct-soft5" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
    </svg>
  );
}
