# Portfolio Checkpoint Log

Production: `https://portfolio.lomnickpro.com`

Permanent brand URL: `https://lomnickpro.com`

Branch: `main`

The production SHA is authoritative only when returned by `/api/version` with a cache-busting query. Screenshot artifacts live under `artifacts/screenshots/` and are intentionally ignored by Git.

## Checkpoint 0 - Compliance And Baseline

- **Status:** In progress
- **Date and time:** 2026-07-14 (America/New_York)
- **Scope:** Acceptance tracking, visual-audit tracking, production build identity, reusable screenshot tooling, baseline typography/navigation/overflow auditing, and baseline screenshots. No page redesign.
- **Starting production SHA:** `92b271da4472f32a8dc3b36371a44d75a502977c`
- **Files changed:** `.gitignore`, `package.json`, `next.config.ts`, `playwright.config.ts`, `eslint.config.mjs`, `app/api/version/route.ts`, `scripts/audit-site.mjs`, `scripts/capture-screenshots.mjs`, `scripts/run-playwright.mjs`, `tests/site.spec.ts`, and three files under `docs/`.
- **Requirements addressed:** G-02, G-16, G-18-G-21, H-01-H-03, H-05-H-06, F-01, F-05, CT-07, D-01-D-02, D-05, M-03-M-04, AX-01, AX-03, AX-05-AX-09, AX-11-AX-12, P-01-P-06.
- **Tests run:** `pnpm lint`, `pnpm typecheck`, optimized `pnpm build`, 20 Playwright tests against the optimized server, `pnpm audit:site`, and manual screenshot review.
- **Results:** Lint pass; typecheck pass; build pass; 20/20 Playwright pass; axe pass on all primary routes; 0 hard audit failures; 26 documented refinement warnings.
- **Screenshot locations:** Local baseline at `artifacts/screenshots/checkpoint-00/local/{desktop,mobile,states}`. Production capture pending deployment.
- **Local commit SHA:** Pending.
- **GitHub commit SHA:** Pending.
- **Vercel status:** Pending.
- **Production SHA:** Pending.
- **Routes checked:** `/`, `/about`, `/engineering`, `/engineering/classroom-lab`, `/lomnickpro`, `/community-leadership`, `/lionheart`, `/contact`, `/api/version`, and five public PDFs.
- **Remaining issues:** Checkpoints 1-7, including all planned visual refinements and controlled production contact delivery.
- **Rollback information:** Revert the Checkpoint 0 commit if the version route, tests, or tooling causes a production regression.

## Checkpoints 1-7

Entries are appended only after their scope begins. Each entry will record the prescribed scope, files, requirements, test results, artifact paths, Git SHAs, Vercel status, live routes, remaining issues, and rollback commit.
