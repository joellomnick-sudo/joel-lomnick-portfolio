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

- **Status:** Pass in production
- **Date:** 2026-07-16
- **Scope:** Canonical public asset registry, non-public archive, hash and reference audit, PDF validation, deployment manifest identity, baseline screenshots, and baseline scorecard. No visible page redesign.
- **Starting production SHA:** `044f74d2dd0ccd68030a12232d02ebcf1304feaf`
- **Baseline screenshots:** `artifacts/screenshots/wave-00/before/{desktop,mobile}`
- **Baseline score:** 75/100 with contact delivery, cross-browser Classroom journeys, and mobile Lionheart reading recorded as hard blockers.
- **Commit and production SHA:** `8bfbc13421c567aa9d78e7252447205e49a21665`
- **Asset manifest hash:** `b6708647c8ca20bbc4e9979cb0bd9d2b32539242e83b073c89085ff639f5cca2`; 24 active and 24 archived assets; five PDFs validated.
- **Tests:** Lint, typecheck, production build, 25/25 Playwright, local/production audit, and all eight production routes passed.
- **Screenshots:** `artifacts/screenshots/wave-00/{before,local,production}/{desktop,mobile}`.

## Controlled Refinement Wave 1 - Global Identity And Typography

- **Status:** Pass in production
- **Date:** 2026-07-16
- **Scope:** Public name consistency, optimized Montserrat/Open Sans/Roboto roles, responsive type scale, one action per document, compact footer, new-tab protection, and rendered image-ratio auditing.
- **Tests:** Lint pass; typecheck pass; production build pass; 27/27 Playwright pass; local visual audit reports 0 hard failures and 13 assigned refinement warnings.
- **Screenshots:** `artifacts/screenshots/wave-01/local/{desktop,mobile}`
- **Local score:** 86/100; hard blockers remain assigned to Waves 3, 4, and 6.
- **Commit and production SHA:** `70f5d915c9ef6126668f3cbc56319822a874cc6a`
- **Production verification:** GitHub `main`, Vercel `/api/version`, and the local commit matched; all eight routes passed smoke testing.
- **Production screenshots:** `artifacts/screenshots/wave-01/production/{desktop,mobile}`.

## Controlled Refinement Wave 2 - Page Proportions And Tone

- **Status:** Pass in production
- **Date:** 2026-07-16
- **Scope:** Home heading and spacing, About and Community image/text balance, Engineering teaching priority and sequence, updated Engineering 101 title, and public-language review.
- **Tests:** Lint pass; typecheck pass; asset audit pass; production build pass; 29/29 Playwright pass; local visual audit reports 0 hard failures and 13 assigned refinement warnings.
- **Visual review:** Home, About, Engineering, and Community & Leadership pass manual desktop/mobile review with preserved image geometry and no horizontal overflow.
- **Screenshots:** `artifacts/screenshots/wave-02/local/{desktop,mobile}`.
- **Local score:** 90/100; the four changed pages each score at least 92.
- **Implementation commit and verified production SHA:** `ddb0ab7670846a1d8a65c1b5a61e432246a72fdf`
- **Production verification:** GitHub `main`, Vercel `/api/version`, and the implementation commit matched; the live audit reported 0 hard failures and 13 assigned warnings across all eight routes.
- **Production screenshots:** `artifacts/screenshots/wave-02/production/{desktop,mobile}`.
- **Remaining:** Wave 3 mobile Lionheart reading and narration, Wave 4 verified contact delivery, Wave 5 Classroom onboarding, and Wave 6 saved journeys and completion paths.

## Controlled Refinement Wave 3 - Lionheart Reading Experience

- **Status:** Local quality gate passed; production verification pending
- **Date:** 2026-07-16
- **Scope:** Two responsive static preview routes, PDF.js canvas rendering, page navigation, fit width, zoom, full-screen support, keyboard paging, original-PDF fallback, browser speech synthesis, voice/speed controls, and accessible text companions.
- **Dependency:** Mozilla `pdfjs-dist` pinned to `4.10.38` for Node 20 and Next 15 deployment compatibility.
- **Tests:** Lint pass; typecheck pass; canonical asset audit pass; production build pass; 34/34 Playwright pass; local visual audit reports 0 hard failures and 13 assigned warnings.
- **PDF verification:** Both unchanged ten-page public PDFs render through PDF.js; canvas dimensions and nonblank pixels are asserted.
- **Visual review:** Desktop keeps the reader and narration companion together; mobile shows the full cover and usable controls at 390px without document overflow.
- **Screenshots:** `artifacts/screenshots/wave-03/local/{desktop,mobile,states}`.
- **Local score:** 94/100; Lionheart and both reader routes score 94, while Contact and Classroom hard gates remain open.
- **Remaining:** Wave 4 verified contact delivery, Wave 5 Classroom onboarding/blueprints, and Wave 6 persistent saved journeys and completion paths.
