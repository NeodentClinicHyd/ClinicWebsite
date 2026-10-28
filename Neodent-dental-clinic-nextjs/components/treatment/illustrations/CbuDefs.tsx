import { rng } from "./geometry";

/* ------------------------------------------------------------------
   CbuDefs: ONE hidden inline <svg> with the gradients and patterns that
   only the composite build-up scenes use (every id is prefixed
   "neo-cbu-"). Mount it once per page, next to IllustrationDefs and
   RctDefs. Like them it is 0 x 0 and absolutely positioned, never
   display:none (gradients stop resolving in several browsers).
   No new hues: every colour is a tint of the existing enamel, dentin,
   titanium-grey and gum families.
   ------------------------------------------------------------------ */

/** Amalgam mottling: soft lighter and darker flecks plus a few fine scratches. */
function mottle(seed: number, size: number) {
  const r = rng(seed);
  const out: string[] = [];
  const wrap = (v: number, lim: number) => (v < 0 ? v + lim : v >= lim ? v - lim : v);
  for (let i = 0; i < 70; i++) {
    const cx = r() * size;
    const cy = r() * size;
    const rx = 0.9 + r() * 3.4;
    const ry = 0.5 + r() * 1.5;
    const rot = Math.round(r() * 180);
    const light = i % 2 === 0;
    const fill = light ? "#C9D0D4" : "#3C444A";
    const op = light ? 0.22 + r() * 0.2 : 0.14 + r() * 0.14;
    out.push(
      `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${fill}" fill-opacity="${op.toFixed(2)}" transform="rotate(${rot} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`,
    );
  }
  for (let i = 0; i < 6; i++) {
    const x = r() * size;
    const y = r() * size;
    const len = 6 + r() * 12;
    const a = (r() - 0.5) * 0.9;
    out.push(
      `<path d="M${x.toFixed(1)} ${y.toFixed(1)}L${wrap(x + Math.cos(a) * len, size).toFixed(1)} ${(y + Math.sin(a) * len).toFixed(1)}" stroke="#E6EBED" stroke-opacity="0.35" stroke-width="0.7" stroke-linecap="round" fill="none"/>`,
    );
  }
  return out.join("");
}

/** Glass ionomer speckle: fine pale and tan dots, evenly scattered. */
function speckle(seed: number, size: number) {
  const r = rng(seed);
  const out: string[] = [];
  for (let i = 0; i < 130; i++) {
    const cx = r() * size;
    const cy = r() * size;
    const rad = 0.4 + r() * 0.5;
    const tan = i % 3 !== 0;
    out.push(
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(2)}" fill="${tan ? "#A18C5A" : "#FFFFFF"}" fill-opacity="${tan ? 0.42 : 0.8}"/>`,
    );
  }
  return out.join("");
}

const MOTTLE = mottle(71, 56);
const SPECKLE = speckle(19, 34);

export function CbuDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* ---- resin composite: warm, even, a little more opaque than enamel ---- */}
        <linearGradient id="neo-cbu-resin" x1="0.05" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#FEF8EC" />
          <stop offset="0.5" stopColor="#F7EBD5" />
          <stop offset="1" stopColor="#EBDCBB" />
        </linearGradient>

        {/* ---- amalgam: mid-dark metallic grey, mottled, flat (not the titanium ramp) ---- */}
        <linearGradient id="neo-cbu-amalgam" x1="0.05" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#A5AEB3" />
          <stop offset="0.45" stopColor="#848E94" />
          <stop offset="1" stopColor="#626B71" />
        </linearGradient>
        <pattern id="neo-cbu-mottle" width="56" height="56" patternUnits="userSpaceOnUse">
          <g dangerouslySetInnerHTML={{ __html: MOTTLE }} />
        </pattern>
        <linearGradient id="neo-cbu-metal-shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.4" stopColor="#2B3338" stopOpacity="0" />
          <stop offset="1" stopColor="#2B3338" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="neo-cbu-metal-sheen" cx="0.28" cy="0.2" r="0.55">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* ---- glass ionomer: matte cream, fine speckle ---- */}
        <linearGradient id="neo-cbu-ionomer" x1="0.05" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#F9F1DC" />
          <stop offset="1" stopColor="#EEE1C0" />
        </linearGradient>
        <pattern id="neo-cbu-speckle" width="34" height="34" patternUnits="userSpaceOnUse">
          <g dangerouslySetInnerHTML={{ __html: SPECKLE }} />
        </pattern>

        {/* ---- the empty prepared cavity: the far wall, darker at the top left ---- */}
        <linearGradient id="neo-cbu-void" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#BDA97B" />
          <stop offset="0.5" stopColor="#D4C39A" />
          <stop offset="1" stopColor="#E7DBBA" />
        </linearGradient>

        {/* ---- softened (decayed) dentin: a darker dentin tone ---- */}
        <linearGradient id="neo-cbu-decay" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#B99A62" />
          <stop offset="0.55" stopColor="#A98D5B" />
          <stop offset="1" stopColor="#9A7F50" />
        </linearGradient>
      </defs>
    </svg>
  );
}
