import type { ReactNode } from "react";
import styles from "./SpecFigures.module.css";

/* Root canal — a molar in cross-section between two natural teeth:
   crown with its access restoration, pulp chamber, two roots in bone.
   The single red accent is the sealed canal pair. Built from the
   Section 04 ScopeIconRootCanal silhouette, redrawn at feature scale
   on the ImplantsFigure gum/bone ground. */
function RootCanalFigure() {
  return (
    <svg viewBox="0 0 200 128" fill="none" className={styles.specFigureSvg}>
      {/* registration ticks */}
      <path
        className={styles.specFigConstruct}
        d="M10 10 H15 M10 10 V15 M190 118 H185 M190 118 V113"
      />
      {/* gum band — soft mass with hairline crest */}
      <path
        className={styles.specFigMass}
        d="M14 62 Q100 56 186 62 L186 70 Q100 64 14 70 Z"
      />
      <path className={styles.specFigDetail} d="M14 62 Q100 56 186 62" />
      {/* bone texture */}
      <path
        className={styles.specFigConstruct}
        d="M26 80 L34 74 M24 96 L32 90 M38 108 L46 102 M160 78 L168 72 M162 96 L170 90 M152 108 L160 102"
      />
      {/* flanking natural teeth */}
      <path
        className={styles.specFigDetail}
        d="M44 62 C44 54 46 46 52 46 C58 46 60 54 60 62 C60 73 57 87 53 95 C51 98 49 97 48 93 C45 84 44 72 44 62 Z"
      />
      <path
        className={styles.specFigDetail}
        d="M140 62 C140 54 142 46 148 46 C154 46 156 54 156 62 C156 73 153 87 149 95 C147 98 145 97 144 93 C141 84 140 72 140 62 Z"
      />
      {/* the treated molar — crown + two roots */}
      <path
        className={styles.specFigMass}
        d="M78 60 C77 48 77 37 82 30 C85 26 90 25 93 28 C96 31 98 31 100 29 C102 27 106 25 109 26 C114 27 118 32 120 38 C123 46 122 54 122 60 C122 73 120 88 117 101 C116 107 112 108 110 103 C108 95 107 84 104 77 C102 73 98 73 96 77 C93 84 92 95 90 103 C88 108 84 107 83 101 C80 88 78 73 78 60 Z"
      />
      <path
        className={styles.specFigPrimary}
        d="M78 60 C77 48 77 37 82 30 C85 26 90 25 93 28 C96 31 98 31 100 29 C102 27 106 25 109 26 C114 27 118 32 120 38 C123 46 122 54 122 60 C122 73 120 88 117 101 C116 107 112 108 110 103 C108 95 107 84 104 77 C102 73 98 73 96 77 C93 84 92 95 90 103 C88 108 84 107 83 101 C80 88 78 73 78 60 Z"
      />
      {/* access restoration in the crown */}
      <rect
        className={styles.specFigRestored}
        x="93"
        y="31"
        width="14"
        height="9"
        rx="3"
      />
      {/* pulp chamber */}
      <path
        className={styles.specFigDetail}
        d="M89 50 C91 45 96 43 100 45 C104 43 109 45 111 50 C109 55 104 57 100 57 C96 57 91 55 89 50 Z"
      />
      {/* apex reference — construction */}
      <path
        className={styles.specFigConstruct}
        d="M76 112 H124"
        strokeDasharray="2 5"
      />
      {/* red — the sealed canals, chamber to apex */}
      <path
        className={styles.specFigAccent}
        d="M93 55 C92 70 90 86 87 101 M107 55 C108 70 110 86 113 101"
      />
    </svg>
  );
}

function ImplantsFigure() {
  return (
    <svg viewBox="0 0 200 128" fill="none" className={styles.specFigureSvg}>
      {/* registration ticks */}
      <path
        className={styles.specFigConstruct}
        d="M10 10 H15 M10 10 V15 M190 118 H185 M190 118 V113"
      />
      {/* gum band — soft mass with hairline crest */}
      <path
        className={styles.specFigMass}
        d="M14 62 Q100 56 186 62 L186 70 Q100 64 14 70 Z"
      />
      <path className={styles.specFigDetail} d="M14 62 Q100 56 186 62" />
      {/* bone texture */}
      <path
        className={styles.specFigConstruct}
        d="M28 80 L36 74 M26 96 L34 90 M40 108 L48 102 M158 78 L166 72 M160 96 L168 90 M150 108 L158 102"
      />
      {/* flanking natural teeth — root anchored in bone */}
      <path
        className={styles.specFigDetail}
        d="M46 62 C46 54 48 46 54 46 C60 46 62 54 62 62 C62 73 59 87 55 95 C53 98 51 97 50 93 C47 84 46 72 46 62 Z"
      />
      <path
        className={styles.specFigDetail}
        d="M138 62 C138 54 140 46 146 46 C152 46 154 54 154 62 C154 73 151 87 147 95 C145 98 143 97 142 93 C139 84 138 72 138 62 Z"
      />
      {/* threaded fixture crossing the gum into the bone */}
      <path
        className={styles.specFigPrimary}
        d="M90 61 L110 61 L106 110 L94 110 Z"
      />
      <path
        className={styles.specFigDetail}
        d="M89 72 H111 M90 80 H110 M91 88 H109 M92 96 H108 M93 104 H107"
      />
      {/* abutment collar */}
      <path
        className={styles.specFigPrimary}
        d="M95 56 L105 56 L107 62 L93 62 Z"
      />
      {/* crown — the restored tooth */}
      <path
        className={styles.specFigMass}
        d="M84 52 C84 36 90 26 100 26 C110 26 116 36 116 52 C116 55 113 56 110 56 L90 56 C87 56 84 55 84 52 Z"
      />
      <path
        className={styles.specFigPrimary}
        d="M84 52 C84 36 90 26 100 26 C110 26 116 36 116 52 C116 55 113 56 110 56 L90 56 C87 56 84 55 84 52 Z"
      />
      {/* red — osseointegration marks on the gum line at the fixture */}
      <path className={styles.specFigAccent} d="M84 61 H89 M111 61 H116" />
    </svg>
  );
}

function RehabilitationFigure() {
  return (
    <svg viewBox="0 0 200 128" fill="none" className={styles.specFigureSvg}>
      {/* registration ticks */}
      <path
        className={styles.specFigConstruct}
        d="M10 10 H15 M10 10 V15 M190 118 H185 M190 118 V113"
      />
      {/* arch band — mass between the outer and inner curves */}
      <path
        className={styles.specFigMass}
        fillRule="evenodd"
        d="M52 108 C40 84 42 52 62 34 C82 17 118 17 138 34 C158 52 160 84 148 108 L128 108 C136 90 134 62 120 48 C108 37 92 37 80 48 C66 62 64 90 72 108 Z"
      />
      {/* arch curves */}
      <path
        className={styles.specFigPrimary}
        d="M52 108 C40 84 42 52 62 34 C82 17 118 17 138 34 C158 52 160 84 148 108"
      />
      <path
        className={styles.specFigDetail}
        d="M72 108 C64 90 66 62 80 48 C92 41 108 41 120 48 C134 62 132 90 124 108"
      />
      {/* tooth stations around the band */}
      <path
        className={styles.specFigDetail}
        d="M84 22 L87 45 M116 22 L113 45 M68 30 L78 52 M132 30 L122 52 M56 52 L74 62 M144 52 L126 62 M50 78 L72 76 M150 78 L128 76 M58 100 L78 88 M142 100 L122 88"
      />
      {/* restored teeth — filled stations within the span */}
      <rect
        className={styles.specFigRestored}
        x="96.5"
        y="25"
        width="7"
        height="15"
        rx="2.5"
      />
      <rect
        className={styles.specFigRestored}
        x="63"
        y="36"
        width="7"
        height="15"
        rx="2.5"
        transform="rotate(-24 66.5 43.5)"
      />
      <rect
        className={styles.specFigRestored}
        x="130"
        y="36"
        width="7"
        height="15"
        rx="2.5"
        transform="rotate(24 133.5 43.5)"
      />
      {/* red — the restoration span across the arch */}
      <path className={styles.specFigAccent} d="M72 30 C82 24 118 24 128 30" />
      {/* occlusal reference + centre registration */}
      <path
        className={styles.specFigConstruct}
        d="M60 116 H140 M100 60 V68 M96 64 H104"
        strokeDasharray="2 5"
      />
    </svg>
  );
}

function SmileFigure() {
  return (
    <svg viewBox="0 0 200 128" fill="none" className={styles.specFigureSvg}>
      {/* registration ticks */}
      <path
        className={styles.specFigConstruct}
        d="M10 10 H15 M10 10 V15 M190 118 H185 M190 118 V113"
      />
      {/* face contour — cropped at the brow */}
      <path
        className={styles.specFigPrimary}
        d="M46 14 C40 42 40 72 52 92 C62 108 80 114 100 114 C120 114 138 108 148 92 C160 72 160 42 154 14"
      />
      {/* facial midline + incisal plane — construction guides */}
      <path
        className={styles.specFigConstruct}
        d="M100 20 V110 M52 80 H148"
        strokeDasharray="2 5"
      />
      {/* lips — upper lip line + smile line */}
      <path className={styles.specFigDetail} d="M58 60 C78 48 122 48 142 60" />
      <path className={styles.specFigPrimary} d="M62 66 C80 90 120 90 138 66" />
      {/* upper anterior teeth — canines, laterals, centrals */}
      <rect
        className={styles.specFigPrimary}
        x="65"
        y="60"
        width="10"
        height="13"
        rx="3.5"
        transform="rotate(-16 70 66)"
      />
      <rect
        className={styles.specFigPrimary}
        x="78"
        y="57"
        width="10"
        height="17"
        rx="3.5"
        transform="rotate(-8 83 65)"
      />
      <rect
        className={styles.specFigPrimary}
        x="89"
        y="55"
        width="11"
        height="22"
        rx="4"
        transform="rotate(-2 94.5 66)"
      />
      <rect
        className={styles.specFigPrimary}
        x="100"
        y="55"
        width="11"
        height="22"
        rx="4"
        transform="rotate(2 105.5 66)"
      />
      <rect
        className={styles.specFigPrimary}
        x="112"
        y="57"
        width="10"
        height="17"
        rx="3.5"
        transform="rotate(8 117 65)"
      />
      <rect
        className={styles.specFigPrimary}
        x="125"
        y="60"
        width="10"
        height="13"
        rx="3.5"
        transform="rotate(16 130 66)"
      />
      {/* red — veneer markup on the centrals */}
      <rect
        className={styles.specFigAccent}
        x="88"
        y="53"
        width="12"
        height="26"
        rx="4"
      />
      <rect
        className={styles.specFigAccent}
        x="100"
        y="53"
        width="12"
        height="26"
        rx="4"
      />
    </svg>
  );
}

export type SpecFigureKey = "implants" | "rehabilitation" | "smile" | "rootCanal";

export const SPEC_FIGURES: Record<SpecFigureKey, ReactNode> =
  {
    implants: <ImplantsFigure />,
    rehabilitation: <RehabilitationFigure />,
    smile: <SmileFigure />,
    rootCanal: <RootCanalFigure />,
  };
