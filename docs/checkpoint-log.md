# Portfolio Checkpoint Log

Production: `https://portfolio.lomnickpro.com`

Permanent brand URL: `https://lomnickpro.com`

Branch: `main`

The production SHA is authoritative only when returned by `/api/version` with a cache-busting query. Screenshot artifacts live under `artifacts/screenshots/` and are intentionally ignored by Git.

## Checkpoint 0 - Compliance And Baseline

- **Status:** Pass in production
- **Date and time:** 2026-07-15 10:13 EDT
- **Scope:** Acceptance tracking, visual-audit tracking, production build identity, reusable screenshot tooling, baseline typography/navigation/overflow auditing, and baseline screenshots. No page redesign.
- **Starting production SHA:** `92b271da4472f32a8dc3b36371a44d75a502977c`
- **Files changed:** `.gitignore`, `package.json`, `next.config.ts`, `playwright.config.ts`, `eslint.config.mjs`, `app/api/version/route.ts`, `scripts/audit-site.mjs`, `scripts/capture-screenshots.mjs`, `scripts/run-playwright.mjs`, `tests/site.spec.ts`, and three files under `docs/`.
- **Requirements addressed:** G-02, G-16, G-18-G-21, H-01-H-03, H-05-H-06, F-01, F-05, CT-07, D-01-D-02, D-05, M-03-M-04, AX-01, AX-03, AX-05-AX-09, AX-11-AX-12, P-01-P-06.
- **Tests run:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, local and production `pnpm audit:site`, production HTTP smoke checks, live PDF response checks, and manual screenshot review.
- **Results:** Lint pass; typecheck pass; clean build pass; 20/20 Playwright pass; axe pass on all primary routes; local and production audits each report 0 hard failures and 26 documented refinement warnings; all eight production routes and five PDFs return HTTP 200.
- **Screenshot locations:** `artifacts/screenshots/checkpoint-00/local/{desktop,mobile,states}` and `artifacts/screenshots/checkpoint-00/production/{desktop,mobile,states}`.
- **Local commit SHA:** `241a77da559d527dd7cb21a9e5484ce1003e9706`
- **GitHub commit SHA:** `241a77da559d527dd7cb21a9e5484ce1003e9706`
- **Vercel status:** Ready; exact implementation commit verified through `/api/version`.
- **Production SHA:** `241a77da559d527dd7cb21a9e5484ce1003e9706`
- **Routes checked:** `/`, `/about`, `/engineering`, `/engineering/classroom-lab`, `/lomnickpro`, `/community-leadership`, `/lionheart`, `/contact`, `/api/version`, and five public PDFs.
- **Remaining issues:** Checkpoints 1-7, beginning with global typography, header, and footer; controlled production contact delivery remains assigned to Checkpoint 6.
- **Rollback information:** `git revert 241a77da559d527dd7cb21a9e5484ce1003e9706` and push `main` if the Checkpoint 0 infrastructure causes a regression.
- **Tracking update:** This production-verification record is committed as a Checkpoint 0 documentation follow-up. Its SHA becomes the final Checkpoint 0 production SHA after the required second deployment verification.

## Checkpoints 1-7

Entries are appended only after their scope begins. Each entry will record the prescribed scope, files, requirements, test results, artifact paths, Git SHAs, Vercel status, live routes, remaining issues, and rollback commit.

## Controlled Refinement Wave 0 - Public Asset Integrity

- **Status:** Local quality gate in progress
- **Date:** 2026-07-16
- **Scope:** Canonical public asset registry, non-public archive, hash and reference audit, PDF validation, deployment manifest identity, baseline screenshots, and baseline scorecard. No visible page redesign.
- **Starting production SHA:** `044f74d2dd0ccd68030a12232d02ebcf1304feaf`
- **Baseline screenshots:** `artifacts/screenshots/wave-00/before/{desktop,mobile}`
- **Baseline score:** 75/100 with contact delivery, cross-browser Classroom journeys, and mobile Lionheart reading recorded as hard blockers.
- **Production requirement:** This wave passes only when local SHA, GitHub `main`, Vercel production, and the production asset-manifest hash agree.
