# NeoDent Frontend Design System

Canonical visual reference for NeoDent Dental Hospitals.

## 1. POSITIONING
Premium editorial healthcare: refined, warm, human, contemporary, clinically credible, reassuring, precise.

## 2. CANONICAL REFERENCE
Section 02 — “Decades of changing smiles.” — is the PRIMARY visual reference for subsequent homepage sections.
Use it as the source of truth for visual grammar, not as a literal layout.

## 3. COLOR
Primary brand red: emphasis, chapter numerals, active states, fine rules, CTAs.
Light surface: warm ivory / soft cream.
Dark surface: deep charcoal / near-black.
Text: warm ivory/white on dark; dark charcoal/navy-black on light; muted gray-blue for secondary copy.
Do not introduce random accent colors.

## 4. TYPOGRAPHY
Chapter number: oversized serif/editorial, low-opacity watermark, never competing with content.
Eyebrow: uppercase, small, tracked, muted, often with a small red rule/divider.
Section heading: strong editorial hierarchy, controlled size, sans + serif contrast where established, red serif emphasis for selected phrases.
Body copy: readable, restrained, calm, consistent line-height, moderate measure.
Metadata: compact uppercase, tracked, muted, red for active/important labels.
Do not invent a new heading scale for each section.

## 5. CHAPTER SYSTEM
Every major section uses 01, 02, 03, 04, 05...
The large translucent chapter number is part of the site's structural language.

## 6. EYEBROW SYSTEM
Use a consistent small-uppercase, tracked, quiet treatment with a thin divider/rule and restrained red accent.

## 7. EDITORIAL GEOMETRY
Shared vocabulary:
- thin hairlines
- registration marks
- crosshair dots
- drafting lines
- subtle circles/arcs
- alignment guides
- offset frames
- technical micro-labels

Use the vocabulary differently by section:
Section 02 = archive/documentary
Section 03 = treatment/clinical drafting
Section 04 = leadership/portrait framing

Do not add geometry without compositional purpose.

## 8. SECTION TRANSITIONS
Every major section must feel like a new chapter.
Avoid accidental-looking dead zones.
Use chapter number, top rule, changed motif, controlled breathing space and/or a subtle surface shift.

## 9. CONTENT DENSITY
Balance visuals with useful substantive text.
Do not over-minimize.
Use verified NeoDent facts when available.
Never invent credentials, numbers, outcomes, technology, services or claims.

## 10. IMAGE / VIDEO
Prefer authentic NeoDent media.
Treat media as editorial objects, not generic cards.
Use deliberate cropping, fine framing, offset plates, concise captions and restrained controls.
Avoid social-media/reel-looking presentation for clinical films.

## 11. LAYOUT
Do not default every section to text-left/image-right.
Use asymmetric editorial compositions, overlapping plates, timelines, comparison compositions, anchored media, staggered content, full-width statements and controlled grids.
Variety must still feel like one brand.

## 12. UI / INTERACTION
Interactions should be obvious, smooth, quiet and accessible.
Hover should normally transform the active item itself rather than shifting neighboring layout.
Avoid sudden jumps.

## 13. RESPONSIVE
Desktop: cinematic editorial relationships.
Tablet: preserve hierarchy while simplifying spatial relationships.
Mobile: intentional re-composition; do not merely stack desktop blocks; maintain chapter/typography hierarchy; sticky CTA must not obscure content.

## 14. ACCESSIBILITY
Maintain readable contrast, focus states, keyboard interaction where relevant, meaningful alt text/video labels, and reduced-motion support.

## 15. DESIGN PRECEDENCE
When choices conflict:
1. Existing approved Section 02 system
2. Existing approved Section 01/03 behavior
3. Current task requirements
4. New creative interpretation

Never casually invent a new global visual language.

## 16. AVOID
Generic AI website, SaaS dashboard aesthetics, excessive glassmorphism, excessive rounded cards, random gradients, emoji-heavy UI, oversized generic icons, stock-photo collage aesthetics, overly clinical blue-white templates, repetitive two-column sections, giant text without supporting meaning.

## 17. TEXT HIGHLIGHT SYSTEM
Every substantive body paragraph (`archive-narrative`, section `.lede`/`.description`, and equivalents) must highlight a small number of key phrases using the shared `EditorialHighlight` component (`components/ui/EditorialHighlight.tsx`), not plain bold/color spans.

Rules:
- Use the existing component/CSS module. Do not create a new highlight mechanism per section.
- Three tones only, applied by significance, not randomly:
  - `primary` — `<strong>`, NeoDent red, no background. The single most important phrase in the paragraph. Use at most once per paragraph.
  - `secondary` — `<mark>`, semibold, thin tapered red underline. For a notable supporting phrase (e.g. a named entity, a specific clinical term).
  - `quiet` — `<mark>`, semibold, subtle translucent red sweep, no visible line. For a softer supporting phrase.
- Typical paragraph pattern: one `primary` + one `secondary` + one `quiet`, distributed naturally through the sentence flow — not three highlights bunched together, not one giant highlighted clause.
- Pass `onDark` when the paragraph sits on a dark/charcoal surface (matches the pattern already used in `ClinicalLeadership`, `ContactNextStep`, `SpacesDesignedAroundCare`).
- Highlighted phrases must be short (2-6 words), meaningful on their own, and never the entire sentence.
- Never highlight generic filler words (e.g. "the", "and", "a considered"). Highlight what a reader should remember: the clinic name, the key service, the reassurance/outcome phrase.
- The underlying text must always render in full as real text — the component only adds a decorative/semantic wrapper, never hides or truncates copy.
- When adding a new paragraph to an existing section, follow the highlight distribution already established by sibling paragraphs in that same section for consistency.
