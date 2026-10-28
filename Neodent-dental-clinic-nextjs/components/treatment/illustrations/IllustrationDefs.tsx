import { curve, rng, type Pt } from "./geometry";

/* ------------------------------------------------------------------
   IllustrationDefs: ONE hidden inline <svg> that holds every gradient,
   pattern and filter the dental illustrations use (ids prefixed "neo-").
   Render it once per page. It must not be display:none (gradients stop
   resolving in several browsers), so it is 0 x 0 and absolutely
   positioned instead.
   ------------------------------------------------------------------ */

export const PAL = {
  enamelA: "#FFFFFF",
  enamelB: "#EFE8DA",
  enamelEdge: "#CFC4B0",
  dentinA: "#F1E2BD",
  dentinB: "#E2CC9C",
  ligament: "#C9A97A",
  gumA: "#EDA9A6",
  gumB: "#D98583",
  gumHi: "#F7CDC8",
  gumEdge: "#BE6B69",
  cortical: "#D8C29B",
  corticalEdge: "#B79F72",
  cancellous: "#EFE2C6",
  trab: "#D2BC93",
  ti: ["#5F6B73", "#A7B2B9", "#E7ECEF", "#9AA6AE", "#566168"],
  tiEdge: "#4A565D",
  dentureA: "#E58E8E",
  dentureB: "#D87B7B",
  graft: "#F3E6C8",
  graftEdge: "#CBB68A",
  membrane: "#BFC5C9",
  canvas: "#FAF5E9",
  ink: "#263033",
  red: "#D71920",
} as const;

/** Organic trabecular texture: short curved strokes and dots, no grid. */
function trabeculae(seed: number, size: number, strokes: number, dots: number) {
  const r = rng(seed);
  const paths: string[] = [];
  const circles: string[] = [];
  const wrap = (x: number) => ((x % size) + size) % size;
  for (let i = 0; i < strokes; i++) {
    const x = r() * size;
    const y = r() * size;
    const a = r() * Math.PI * 2;
    const len = 14 + r() * 26;
    const bend = (r() - 0.5) * 2.4;
    const pts: Pt[] = [];
    for (let k = 0; k < 4; k++) {
      const t = k / 3;
      const ang = a + bend * t;
      pts.push([x + Math.cos(ang) * len * t, y + Math.sin(ang) * len * t + Math.sin(t * 3 + i) * 3]);
    }
    const d = curve(pts);
    const minX = Math.min(...pts.map((p) => p[0]));
    const maxX = Math.max(...pts.map((p) => p[0]));
    const minY = Math.min(...pts.map((p) => p[1]));
    const maxY = Math.max(...pts.map((p) => p[1]));
    const w = (1.0 + r() * 1.1).toFixed(1);
    const dxs = [0, minX < 0 ? size : maxX > size ? -size : 0];
    const dys = [0, minY < 0 ? size : maxY > size ? -size : 0];
    for (const dx of new Set(dxs)) {
      for (const dy of new Set(dys)) {
        paths.push(
          dx || dy
            ? `<path d="${d}" fill="none" stroke-width="${w}" transform="translate(${dx} ${dy})"/>`
            : `<path d="${d}" fill="none" stroke-width="${w}"/>`,
        );
      }
    }
  }
  for (let i = 0; i < dots; i++) {
    const cx = wrap(r() * size);
    const cy = wrap(r() * size);
    const rad = (1.0 + r() * 1.9).toFixed(1);
    circles.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad}"/>`);
  }
  return paths.join("") + circles.join("");
}

const TRAB_A = trabeculae(11, 190, 38, 34);
const TRAB_B = trabeculae(47, 130, 20, 20);

const stops = (cols: readonly string[], offs: readonly number[]) =>
  cols.map((c, i) => <stop key={i} offset={offs[i]} stopColor={c} />);

export function IllustrationDefs() {
  const ti = PAL.ti;
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* ---- surfaces ---- */}
        <radialGradient id="neo-canvas" cx="0.5" cy="0.42" r="0.78">
          <stop offset="0" stopColor="#FCF9F0" />
          <stop offset="1" stopColor="#F2EAD8" />
        </radialGradient>
        <linearGradient id="neo-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7F1E4" />
          <stop offset="1" stopColor="#E9DFCB" />
        </linearGradient>

        {/* ---- enamel / porcelain: light from top-left ---- */}
        <linearGradient id="neo-enamel" x1="0.05" y1="0" x2="0.85" y2="1">
          {stops([PAL.enamelA, "#F8F4EB", PAL.enamelB], [0, 0.45, 1])}
        </linearGradient>
        <linearGradient id="neo-porcelain" x1="0.05" y1="0" x2="0.85" y2="1">
          {stops([PAL.enamelA, "#F7F2E7", "#ECE4D3"], [0, 0.45, 1])}
        </linearGradient>
        <linearGradient id="neo-shade-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.45" stopColor="#8F7A57" stopOpacity="0" />
          <stop offset="1" stopColor="#8F7A57" stopOpacity="0.24" />
        </linearGradient>
        <linearGradient id="neo-shade-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor="#8F7A57" stopOpacity="0" />
          <stop offset="1" stopColor="#8F7A57" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="neo-hi" cx="0.3" cy="0.22" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* ---- dentin / root ---- */}
        <linearGradient id="neo-dentin" x1="0" y1="0" x2="1" y2="1">
          {stops([PAL.dentinA, PAL.dentinB], [0, 1])}
        </linearGradient>
        <linearGradient id="neo-root" x1="0" y1="0" x2="1" y2="0.3">
          {stops([PAL.dentinA, "#EBD7AC", PAL.dentinB], [0, 0.5, 1])}
        </linearGradient>

        {/* ---- gum ---- */}
        <linearGradient id="neo-gum" x1="0.1" y1="0" x2="0.3" y2="1">
          {stops([PAL.gumA, PAL.gumB], [0, 1])}
        </linearGradient>
        <linearGradient id="neo-gum-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PAL.gumHi} stopOpacity="0.95" />
          <stop offset="1" stopColor={PAL.gumHi} stopOpacity="0" />
        </linearGradient>

        {/* ---- bone ---- */}
        <linearGradient id="neo-cortical" x1="0" y1="0" x2="0" y2="1">
          {stops([PAL.cortical, "#CDB68B"], [0, 1])}
        </linearGradient>
        <linearGradient id="neo-bone-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B8985E" stopOpacity="0" />
          <stop offset="1" stopColor="#B8985E" stopOpacity="0.3" />
        </linearGradient>
        <pattern id="neo-trab" width="190" height="190" patternUnits="userSpaceOnUse">
          <g
            fill={PAL.trab}
            stroke={PAL.trab}
            strokeLinecap="round"
            opacity="0.4"
            // The strokes are fixed in the file, so the markup is trusted.
            dangerouslySetInnerHTML={{ __html: TRAB_A }}
          />
        </pattern>
        <pattern id="neo-trab2" width="130" height="130" patternUnits="userSpaceOnUse" patternTransform="rotate(23)">
          <g
            fill={PAL.trab}
            stroke={PAL.trab}
            strokeLinecap="round"
            opacity="0.4"
            dangerouslySetInnerHTML={{ __html: TRAB_B }}
          />
        </pattern>

        {/* ---- titanium: five-stop horizontal, highlight left of centre ---- */}
        <linearGradient id="neo-ti" x1="0" y1="0" x2="1" y2="0">
          {stops(ti, [0, 0.24, 0.44, 0.74, 1])}
        </linearGradient>
        <linearGradient id="neo-ti-v" x1="0" y1="0" x2="0" y2="1">
          {stops(ti, [0, 0.24, 0.44, 0.74, 1])}
        </linearGradient>

        {/* ---- other materials ---- */}
        <linearGradient id="neo-osteo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8F7347" stopOpacity="0.5" />
          <stop offset="0.35" stopColor="#E3D2AA" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#E3D2AA" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8F7347" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="neo-denture" x1="0.1" y1="0" x2="0.3" y2="1">
          {stops([PAL.dentureA, PAL.dentureB], [0, 1])}
        </linearGradient>
        <radialGradient id="neo-graft" cx="0.35" cy="0.3" r="0.8">
          {stops(["#FBF2DD", PAL.graft], [0, 1])}
        </radialGradient>
        <linearGradient id="neo-membrane" x1="0" y1="0" x2="0" y2="1">
          {stops(["#CED3D6", "#B3BABE"], [0, 1])}
        </linearGradient>
        <linearGradient id="neo-film" x1="0" y1="0" x2="1" y2="1">
          {stops(["#232C30", "#10171A"], [0, 1])}
        </linearGradient>
        <radialGradient id="neo-glass" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.04" />
        </radialGradient>

        {/* ---- filters ---- */}
        <filter id="neo-blur3" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="neo-blur6" x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="neo-blur1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>

        {/* ---- appended for the frontal arch scenes (neo-arch-*) ----
            Vertical gradients run neck -> edge for the upper arch (u) and
            edge -> neck for the lower arch (l), because the lower arch is
            drawn upside down. */}
        <linearGradient id="neo-cervical-u" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D8BE7E" stopOpacity="0.42" />
          <stop offset="0.45" stopColor="#E3CE98" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neo-cervical-l" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#D8BE7E" stopOpacity="0.42" />
          <stop offset="0.45" stopColor="#E3CE98" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neo-incisal-u" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#B9CBD3" stopOpacity="0" />
          <stop offset="1" stopColor="#B9CBD3" stopOpacity="0.36" />
        </linearGradient>
        <linearGradient id="neo-incisal-l" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0.6" stopColor="#B9CBD3" stopOpacity="0" />
          <stop offset="1" stopColor="#B9CBD3" stopOpacity="0.36" />
        </linearGradient>
        <linearGradient id="neo-arch-wear" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E6CE9A" />
          <stop offset="0.5" stopColor="#D9BC7E" />
          <stop offset="1" stopColor="#C9A96C" />
        </linearGradient>
        <linearGradient id="neo-arch-splint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7F1F6" stopOpacity="0.62" />
          <stop offset="1" stopColor="#B8CEDA" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="neo-arch-ceramic" x1="0.05" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F3F7F8" />
          <stop offset="1" stopColor="#DCE5E9" />
        </linearGradient>
        <linearGradient id="neo-arch-stump" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3E5C2" />
          <stop offset="1" stopColor="#DCC48F" />
        </linearGradient>
        <linearGradient id="neo-gum-fade-u" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8F6EF" stopOpacity="0.97" />
          <stop offset="0.3" stopColor="#F8F6EF" stopOpacity="0.55" />
          <stop offset="0.58" stopColor="#F8F6EF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neo-gum-fade-l" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F8F6EF" stopOpacity="0.97" />
          <stop offset="0.3" stopColor="#F8F6EF" stopOpacity="0.55" />
          <stop offset="0.58" stopColor="#F8F6EF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neo-edge-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F8F6EF" stopOpacity="1" />
          <stop offset="1" stopColor="#F8F6EF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neo-edge-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F8F6EF" stopOpacity="0" />
          <stop offset="1" stopColor="#F8F6EF" stopOpacity="1" />
        </linearGradient>
        <filter id="neo-mute" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0.12" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.62" intercept="0.3" />
            <feFuncG type="linear" slope="0.62" intercept="0.3" />
            <feFuncB type="linear" slope="0.62" intercept="0.3" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
