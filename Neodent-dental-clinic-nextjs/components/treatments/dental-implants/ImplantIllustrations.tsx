import { useId, type ReactNode } from "react";
import styles from "./ImplantIllustrations.module.css";

/* ------------------------------------------------------------------
   Inline SVG illustrations for /treatments/dental-implants.

   One style across the set: flat fills, one 2px stroke, rounded joins,
   site-palette colours from the CSS module (no colour values here), and
   one red element per drawing. The stage tiles share the same base scene
   (gum, bone block, two neighbouring teeth, a gap) so they read as a
   sequence. All geometry is in the scene's own units and drawn at a fixed
   160 x 120 box; ImplantAnatomy scales that scene up.
   ------------------------------------------------------------------ */

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/* ---------- Wrappers ---------- */

/** Light plate every illustration sits on, so colours read correctly even
 *  inside dark sections. */
export function IllustrationPlate({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(styles.plate, className)}>{children}</div>;
}

/** <figure> with a visible caption and the plate. */
export function IllustrationFigure({
  children,
  caption,
  tone = "light",
  className,
  plateClassName,
}: {
  children: ReactNode;
  caption: string;
  tone?: "light" | "dark";
  className?: string;
  plateClassName?: string;
}) {
  return (
    <figure
      className={cx(styles.figure, tone === "dark" && styles.onDark, className)}
    >
      <IllustrationPlate className={plateClassName}>{children}</IllustrationPlate>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

function Svg({
  viewBox,
  title,
  desc,
  className,
  children,
}: {
  viewBox: string;
  title?: string;
  desc?: string;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();
  if (!title) {
    return (
      <svg
        className={cx(styles.svg, className)}
        viewBox={viewBox}
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
    );
  }
  return (
    <svg
      className={cx(styles.svg, className)}
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      {children}
    </svg>
  );
}

/* ---------- Shared scene (160 x 120) ---------- */

const TOOTH =
  "M24 30 C24 19 31 15 40 15 C49 15 56 19 56 30 L54 56 C53 72 48 92 40 92 C32 92 27 72 26 56 Z";
const BONE =
  "M8 66 H152 V110 Q152 114 148 114 H12 Q8 114 8 110 Z";
const GUM_CLOSED =
  "M8 66 V55 Q8 52 11 52 H149 Q152 52 152 55 V66 Z";
const GUM_LEFT = "M8 66 V55 Q8 52 11 52 H56 V66 Z";
const GUM_RIGHT = "M104 52 H149 Q152 52 152 55 V66 H104 Z";

/** Post (threaded titanium): top edge at y=66 unless moved with `top`. */
function Post({ top = 66, fill = "post" }: { top?: number; fill?: "post" | "hot" }) {
  return (
    <g transform={`translate(0 ${top - 66})`}>
      <path
        className={fill === "hot" ? styles.hot : styles.post}
        d="M70 66 H90 V96 Q90 103 80 107 Q70 103 70 96 Z"
      />
      <path className={styles.thread} d="M70 76 L90 72 M70 84 L90 80 M70 92 L90 88" />
    </g>
  );
}

function Crown({ fill = "tooth" }: { fill?: "tooth" }) {
  return (
    <path
      className={styles[fill]}
      d="M62 30 C62 19 70 15 80 15 C90 15 98 19 98 30 L97 50 Q97 52 95 52 H65 Q63 52 63 50 Z"
    />
  );
}

/** Bone, the two neighbouring teeth, and the gum. */
function Scene({ gum = "closed" }: { gum?: "closed" | "open" }) {
  return (
    <g>
      <path className={styles.bone} d={BONE} />
      <path className={styles.tooth} d={TOOTH} />
      <path className={styles.tooth} d={TOOTH} transform="translate(80 0)" />
      {gum === "closed" ? (
        <path className={styles.gum} d={GUM_CLOSED} />
      ) : (
        <>
          <path className={styles.gum} d={GUM_LEFT} />
          <path className={styles.gum} d={GUM_RIGHT} />
        </>
      )}
    </g>
  );
}

function Dot({ x, y }: { x: number; y: number }) {
  return <circle className={styles.dot} cx={x} cy={y} r="3" />;
}

/* ---------- Anatomy (large) ---------- */

export function ImplantAnatomy({ className }: { className?: string }) {
  const S = 1.55;
  const OX = 88;
  const OY = 66;
  const X = (v: number) => +(OX + v * S).toFixed(1);
  const Y = (v: number) => +(OY + v * S).toFixed(1);

  return (
    <Svg
      className={className}
      viewBox="0 0 430 270"
      title="Diagram of a dental implant showing the implant post, abutment and crown"
      desc="Side cross-section of the jaw. The gum sits on the jawbone between two natural teeth. In the gap, a threaded titanium implant post is anchored in the bone, an abutment rises through the gum, and a crown sits on top."
    >
      <g transform={`translate(${OX} ${OY}) scale(${S})`}>
        <Scene />
        <Post />
        <path className={styles.hot} d="M73 52 H87 L90 66 H70 Z" />
        <Crown />
      </g>

      {/* Crown */}
      <text className={styles.label} x={X(80)} y="26" textAnchor="middle" dominantBaseline="central">
        Crown
      </text>
      <line className={styles.leader} x1={X(80)} y1="36" x2={X(80)} y2={Y(20)} />
      <Dot x={X(80)} y={Y(20)} />

      {/* Abutment */}
      <line className={styles.leader} x1={X(74)} y1={Y(59)} x2="90" y2={Y(59)} />
      <Dot x={X(74)} y={Y(59)} />
      <text className={styles.label} x="82" y={Y(59)} textAnchor="end" dominantBaseline="central">
        Abutment
      </text>

      {/* Implant */}
      <line className={styles.leader} x1={X(88)} y1={Y(98)} x2={X(160)} y2={Y(98)} />
      <Dot x={X(88)} y={Y(98)} />
      <text className={styles.label} x={X(164)} y={Y(98)} dominantBaseline="central">
        Implant
      </text>

      {/* Jawbone (left) and gum (right) brackets */}
      <path className={styles.bracket} d={`M94 ${Y(66)} H88 V${Y(114)} H94`} fill="none" />
      <text className={cx(styles.label, styles.labelQuiet)} x="80" y={Y(90)} textAnchor="end" dominantBaseline="central">
        Jawbone
      </text>
      <path className={styles.bracket} d={`M${X(158)} ${Y(52)} H${X(162)} V${Y(66)} H${X(158)}`} fill="none" />
      <text className={cx(styles.label, styles.labelQuiet)} x={X(166)} y={Y(59)} dominantBaseline="central">
        Gum
      </text>
    </Svg>
  );
}

/* ---------- Part icons (56 x 56) ---------- */

export function PartIconImplant({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 56 56">
      <path className={styles.post} d="M21 14 H35 V40 Q35 47 28 51 Q21 47 21 40 Z" />
      <path className={styles.thread} d="M21 24 L35 21 M21 31 L35 28 M21 38 L35 35" />
      <rect className={styles.hot} x="17" y="7" width="22" height="7" rx="2" />
    </Svg>
  );
}

export function PartIconAbutment({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 56 56">
      <path className={styles.post} d="M24 34 H32 V46 Q32 50 28 52 Q24 50 24 46 Z" />
      <path className={styles.thread} d="M24 41 L32 39" />
      <path className={styles.hot} d="M22 20 H34 L35 34 H21 Z" />
      <rect className={styles.hot} x="15" y="7" width="26" height="13" rx="2" />
      <path className={styles.thin} d="M24 9 V18 M32 9 V18" />
    </Svg>
  );
}

export function PartIconCrown({ className }: { className?: string }) {
  return (
    <Svg className={className} viewBox="0 0 56 56">
      <path
        className={styles.tooth}
        d="M11 25 C11 12 19 9 28 9 C37 9 45 12 45 25 C45 33 43 38 43 42 H13 C13 38 11 33 11 25 Z"
      />
      <path className={styles.thin} d="M22 21 Q28 27 34 21" />
      <rect className={styles.hot} x="13" y="42" width="30" height="7" rx="2" />
    </Svg>
  );
}

/* ---------- Stage tiles (160 x 120) ---------- */

export function StageAssessment({ className }: { className?: string }) {
  return (
    <Svg
      className={className}
      viewBox="0 0 160 120"
      title="Diagram of assessment and planning: a scan frame over the gap between two teeth"
      desc="A gap between two teeth outlined by a red dashed scan frame with corner marks, and a short measuring mark on the jawbone beneath it."
    >
      <Scene />
      <rect className={styles.dashHot} x="60" y="22" width="40" height="80" rx="2" />
      <path
        className={styles.hotLine}
        d="M60 30 V22 H68 M92 22 H100 V30 M100 94 V102 H92 M68 102 H60 V94"
      />
      <path className={styles.hotLine} d="M80 72 V94 M75 72 H85 M75 94 H85" />
    </Svg>
  );
}

export function StagePreparation({ className }: { className?: string }) {
  const granules: [number, number][] = [
    [64, 62],
    [72, 62],
    [80, 62],
    [88, 62],
    [68, 55],
    [76, 55],
    [84, 55],
  ];
  return (
    <Svg
      className={className}
      viewBox="0 0 160 120"
      title="Diagram of preparation: bone-graft granules on the jawbone ridge in the gap"
      desc="The gap between two teeth with small bone-graft granules built up on the jawbone ridge and a small flap of gum lifted to one side."
    >
      <Scene gum="open" />
      {granules.map(([x, y]) => (
        <circle key={`${x}-${y}`} className={styles.graft} cx={x} cy={y} r="3" />
      ))}
      <path className={styles.gum} d="M104 52 C101 44 97 38 92 38 C88 38 87 42 89 46 L104 64 Z" />
    </Svg>
  );
}

export function StagePlacement({ className }: { className?: string }) {
  return (
    <Svg
      className={className}
      viewBox="0 0 160 120"
      title="Diagram of placing the implant: a threaded post being set into the jawbone"
      desc="A threaded titanium post half inserted into the jawbone in the gap between two teeth, with a red arrow pointing down at it."
    >
      <Scene />
      <Post top={44} />
      <path className={styles.hotLine} d="M80 5 V29 M73 22 L80 29 L87 22" />
    </Svg>
  );
}

export function StageHealing({ className }: { className?: string }) {
  return (
    <Svg
      className={className}
      viewBox="0 0 160 120"
      title="Diagram of healing: bone bonding around the implant post under closed gum"
      desc="The post fully set in the jawbone with the gum closed over a small healing cap, and short red arrows pointing from the bone towards the post."
    >
      <Scene />
      <Post />
      <rect className={styles.post} x="73" y="57" width="14" height="9" rx="2" />
      <path
        className={styles.hotLine}
        d="M54 78 H66 M61 73 L66 78 L61 83 M54 94 H66 M61 89 L66 94 L61 99 M106 78 H94 M99 73 L94 78 L99 83 M106 94 H94 M99 89 L94 94 L99 99"
      />
    </Svg>
  );
}

export function StageRestoration({ className }: { className?: string }) {
  return (
    <Svg
      className={className}
      viewBox="0 0 160 120"
      title="Diagram of the visible tooth: a crown on an abutment on the implant post"
      desc="A crown on an abutment on the post, level with the two neighbouring teeth."
    >
      <Scene />
      <Post />
      <path className={styles.hot} d="M73 52 H87 L90 66 H70 Z" />
      <Crown />
    </Svg>
  );
}

/* ---------- Option drawings (240 x 140) ---------- */

const FRONT_TOOTH = (c: number) =>
  `M${c - 12} 92 C${c - 14} 72 ${c - 17} 58 ${c - 17} 42 C${c - 17} 31 ${c - 10} 25 ${c} 25 C${c + 10} 25 ${c + 17} 31 ${c + 17} 42 C${c + 17} 58 ${c + 14} 72 ${c + 12} 92 Z`;
const GUM_BAND = "M10 82 H230 V114 Q230 126 218 126 H22 Q10 126 10 114 Z";
const GUM_PLATE = "M10 82 H230 V104 Q230 130 120 130 Q10 130 10 104 Z";

export function OptionImplant({ className }: { className?: string }) {
  return (
    <Svg
      className={className}
      viewBox="0 0 240 140"
      title="Diagram of a dental implant replacing one tooth, with the screw post shown below the gum"
      desc="A row of teeth in the gum with a single crown filling the gap in the middle. A dashed cutaway below the gum line shows the screw-shaped implant post that holds it."
    >
      {[40, 80, 160, 200].map((c) => (
        <path key={c} className={styles.tooth} d={FRONT_TOOTH(c)} />
      ))}
      <path className={styles.gum} d={GUM_BAND} />
      <path
        className={styles.tooth}
        d="M107 80 C104 66 103 56 103 42 C103 31 110 25 120 25 C130 25 137 31 137 42 C137 56 136 66 133 80 Z"
      />
      <rect className={styles.window} x="94" y="88" width="52" height="34" rx="3" />
      <path className={styles.hot} d="M112 91 H128 V108 Q128 116 120 120 Q112 116 112 108 Z" />
      <path className={styles.thread} d="M112 98 L128 95 M112 105 L128 102" />
    </Svg>
  );
}

export function OptionBridge({ className }: { className?: string }) {
  return (
    <Svg
      className={className}
      viewBox="0 0 240 140"
      title="Diagram of a dental bridge joining two crowned teeth across a gap"
      desc="A row of teeth in the gum. The two teeth beside the gap carry crown caps and are joined to a replacement tooth that spans the gap, drawn as one continuous outline. A red arrow marks the span."
    >
      {[40, 200].map((c) => (
        <path key={c} className={styles.tooth} d={FRONT_TOOTH(c)} />
      ))}
      <path
        className={styles.tooth}
        d="M68 92 C63 72 60 58 60 42 C60 31 68 26 80 26 C92 26 100 31 100 40 C100 31 108 26 120 26 C132 26 140 31 140 40 C140 31 148 26 160 26 C172 26 180 31 180 42 C180 58 177 72 172 92 H148 L143 80 H97 L92 92 Z"
      />
      <path className={styles.thin} d="M65 70 Q80 76 95 70 M145 70 Q160 76 175 70" />
      <path className={styles.gum} d={GUM_BAND} />
      <path
        className={styles.hotLine}
        d="M66 13 H174 M73 7 L66 13 L73 19 M167 7 L174 13 L167 19"
      />
    </Svg>
  );
}

export function OptionDenture({ className }: { className?: string }) {
  return (
    <Svg
      className={className}
      viewBox="0 0 240 140"
      title="Diagram of a removable denture, a gum-coloured plate carrying replacement teeth"
      desc="A curved gum-coloured plate carrying a row of replacement teeth, with a small curved red arrow suggesting it can be taken out."
    >
      {[40, 80, 120, 160, 200].map((c) => (
        <path key={c} className={styles.tooth} d={FRONT_TOOTH(c)} />
      ))}
      <path className={styles.gum} d={GUM_PLATE} />
      <path className={styles.hotLine} d="M92 20 C98 0 142 0 148 20 M140 14 L148 20 L151 10" />
    </Svg>
  );
}

/* ---------- Healing detail (480 x 600) ---------- */

export function HealingDetail({ className }: { className?: string }) {
  /* The drawing is built in a 320-wide space and scaled 1.5; strokes stay
     2px (non-scaling) and the labels sit outside the scaled group. */
  const threads = [96, 118, 140, 162, 184, 206, 228, 250, 272, 294];
  const arrows = [140, 215, 290];
  return (
    <Svg
      className={className}
      viewBox="0 0 480 600"
      title="How bone bonds to a dental implant during healing"
      desc="Close cross-section of a threaded implant post in the jawbone with the gum healing over it. Red arrows point from the surrounding bone towards the post."
    >
      <g transform="scale(1.5)">
        <path className={styles.bone} d="M10 78 H310 V346 Q310 352 304 352 H16 Q10 352 10 346 Z" />
        <path className={styles.gum} d="M10 78 V44 Q10 38 16 38 H304 Q310 38 310 44 V78 Z" />
        <path className={styles.post} d="M140 78 H180 V316 Q180 330 160 338 Q140 330 140 316 Z" />
        <path
          className={styles.thread}
          d={threads.map((y) => `M140 ${y} L180 ${y - 6}`).join(" ")}
        />
        <rect className={styles.post} x="146" y="48" width="28" height="30" rx="4" />
        <path
          className={styles.hotLine}
          d={arrows
            .map(
              (y) =>
                `M92 ${y} H126 M118 ${y - 7} L126 ${y} L118 ${y + 7} M228 ${y} H194 M202 ${y - 7} L194 ${y} L202 ${y + 7}`,
            )
            .join(" ")}
        />
      </g>

      {/* Labels */}
      <text className={cx(styles.label, styles.labelLarge)} x="14" y="16" dominantBaseline="central">
        Gum heals around it
      </text>
      <line className={styles.leader} x1="60" y1="32" x2="60" y2="88" />
      <Dot x={60} y={88} />
      <text className={cx(styles.label, styles.labelLarge)} x="14" y="582" dominantBaseline="central">
        Bone bonds to the implant
      </text>
      <line className={styles.leader} x1="60" y1="566" x2="60" y2="500" />
      <Dot x={60} y={500} />
    </Svg>
  );
}