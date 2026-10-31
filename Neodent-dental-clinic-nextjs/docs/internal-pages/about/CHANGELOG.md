# CHANGELOG: /about redesign

## R0: Discovery and snapshot (31 Oct 2026)

**Files created**
- `docs/internal-pages/about/content-snapshot.json` (baseline, server HTML with JS off)
- `docs/internal-pages/about/OWNERSHIP.md`, `DISCOVERY.md`, `CONTENT_QUESTIONS.md`, `CHANGELOG.md`
- `.audit/about/tools/` : `common.mjs`, `page-content-snapshot.mjs`, `page-content-check.mjs`, `page-audit.mjs`, `r0-probe.mjs`
- `.audit/about/R0/` : screenshots, `audit.json`, `probe.json`

**No site code changed.**

**Summary**
- `scripts/page-content-snapshot.mjs`, `page-content-check.mjs` and `page-audit.mjs` named in the plan do not exist anywhere in the repo, and neither does `docs/internal-pages/_shared-requests.md`. Equivalents with the same arguments were written under `.audit/about/tools/` (the only place R0 may write besides docs). Run them as `node .audit/about/tools/page-content-check.mjs about /about`. The audit tool pre-stores a "reject non-essential" cookie choice so the consent banner does not cover screenshots.
- `/about` already uses About-only components in `components/sections/about/`. No shared components need forking. See OWNERSHIP.md.
- Real page differs from the plan in five ways (details in DISCOVERY.md): "View full archive" is a lightbox button, S9 items are buttons, S9 desktop panel is sticky and not empty, the Republic Day overlay text is baked into the image and names the founder, and home does have a large red card.
- A7, A2 to A6 and D1 are unticked; only A1 (closed) is ticked. R6 is skipped.

**Content check:** baseline created, so missing: 0 by definition.
**Audit numbers (baseline):** no horizontal overflow; media over 70% of viewport: 0 at 360 and 390, 1 at 768, 10 at 1366x650; text under 12 px: 6 to 7 items at every width; h1 count 1.
**Questions for the owner:** see CONTENT_QUESTIONS.md (Q6b answer, caption mismatch between S6 and archive, ghost "1994", claims to source).
**Shared-change requests:** none.
**Screenshots:** `.audit/about/R0/390-fold.png`, `390-full.png`, `390-nojs-full.png`, `768-full.png`, `1366-fold.png`, `1366-full.png`, `360-full.png` (under `E:\neodent dental delegate\ClinicWebsite\Neodent-dental-clinic-nextjs\`).
**Unfinished:** none.
