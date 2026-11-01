# Owner decisions: clinic-mehdipatnam

Recorded 2 Nov 2026 (owner reply in chat).

| # | Decision |
|---|---|
| Q1 | **Plan A.** The branch template (`app/clinic/[slug]/page.tsx` and `components/clinic/branch/*`) is polished in one pass for both branches. Nampally is protected by the content guard (`clinic-nampally-guard`) after every run. |
| Q2 | **FAQ approved.** The five questions in PAGE_PLAN.md section 7 are approved. See `FAQ_APPROVED.md`. R6 runs. |
| Q3 | Default accepted: keep the header directions button label as is; "Send an enquiry" lives in the consultation block. |
| Q4 | Default accepted: keep the call button label as written (including any number). |
| Q5 | Default accepted: remove red italic from S2, S3, S4 headings (words unchanged). |
| Other clinic-family sessions | Owner confirmed none is running. The existing uncommitted changes in `components/clinic/branch/branch-content.ts`, `lib/clinic-data.ts`, `lib/site-data.ts` and `components/pages/clinic/*` are the starting point and must not be reverted. |
| Tooling | `scripts/page-*.mjs` do not exist. Slug-generic copies from `.audit/clinic/tools/` live in `.audit/clinic-mehdipatnam/tools/`. Use `node .audit/clinic-mehdipatnam/tools/<tool>.mjs ...` wherever the plan says `node scripts/<tool>.mjs ...`. |
