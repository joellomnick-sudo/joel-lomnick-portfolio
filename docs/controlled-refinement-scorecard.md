# Controlled Refinement Scorecard

Production baseline: `https://portfolio.lomnickpro.com`

Baseline production SHA: `044f74d2dd0ccd68030a12232d02ebcf1304feaf`

Baseline captured: 2026-07-16 before Wave 0 source changes

## Baseline Grade

| Category | Score | Available | Baseline finding |
| --- | ---: | ---: | --- |
| Functionality | 17 | 25 | Navigation, PDFs, and the Classroom core work; contact delivery, cross-browser journeys, certificates, and mobile Lionheart reading remain hard blockers. |
| Responsive layout | 13 | 15 | Primary layouts are stable without known horizontal overflow; several photo/text proportions and Classroom first-run controls need refinement. |
| Accessibility | 12 | 15 | Automated route checks are clean; PDF reading, narration, focused Classroom disclosure, and some control semantics remain incomplete. |
| Typography and readability | 6 | 10 | Readable overall, but the requested three-font system, weight discipline, and unified responsive scale are not yet implemented. |
| Image quality | 8 | 10 | Aspect ratios are generally preserved; several narrative photographs overpower adjacent copy and need rendered-ratio regression coverage. |
| Content and tone | 8 | 10 | Warm and grounded overall; a focused public-copy audit is still required. |
| Visual polish | 8 | 10 | Strong palette and editorial direction; footer height, document actions, and some spacing remain inconsistent. |
| Deployment and asset integrity | 3 | 5 | Production identity is verified, but the baseline had scattered paths and superseded files in `public`. |
| **Total** | **75** | **100** | **Below the 94-point release target; critical functionality cannot be averaged away.** |

## Baseline Page Scores

| Page | Score | Highest-priority gap |
| --- | ---: | --- |
| Home | 86 | Hero and section proportions |
| About | 84 | Portrait scale and document-action duplication |
| Engineering | 84 | Teaching feature priority and document actions |
| Classroom Design Quest | 78 | First-run cognitive load and cross-browser progress |
| LomnickPro | 90 | Link and rendered-image regression coverage |
| Community & Leadership | 84 | Photo-to-copy balance and external-link validation |
| Lionheart | 72 | Mobile preview routes and accessible narration |
| Contact | 60 | Production message delivery is not proven |

## Hard Gates

- Internal navigation: passing at baseline.
- Current PDF links: passing at baseline.
- Production route availability: passing at baseline.
- Contact delivery: failing until an accepted message and inbox receipt are verified.
- Classroom cross-browser save/resume: failing; browser-local persistence is not sufficient.
- Lionheart mobile document reader: failing; desktop iframe behavior is not a mobile solution.
- Critical accessibility failures: no known automated critical violations, with incomplete reader and onboarding behavior tracked above.

Scores are updated after each production wave. A page cannot pass below 90, the site cannot pass below 94, and a hard-gate failure remains a failure regardless of the numeric average.
