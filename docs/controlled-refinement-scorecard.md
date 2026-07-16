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

## Wave 1 Local Grade

Wave 1 local score: **86/100**. Typography and readability now pass 10/10; deployment and asset integrity pass 5/5; responsive layout, accessibility, image integrity, and visual polish improved. The overall release remains blocked by contact delivery, mobile Lionheart reading, and cross-browser Classroom journeys.

| Page | Local score | Wave 1 result |
| --- | ---: | --- |
| Home | 90 | Public identity, font roles, image geometry, and compact footer pass. |
| About | 88 | Document actions pass; photo proportions remain assigned to Wave 2. |
| Engineering | 88 | Guide action passes; content order and teaching title remain assigned to Wave 2. |
| Classroom Design Quest | 81 | Three-font role passes; onboarding and 14px technical controls remain assigned to Wave 5. |
| LomnickPro | 92 | Link safety and case-study image geometry pass. |
| Community & Leadership | 87 | Link safety passes; narrative proportions remain assigned to Wave 2. |
| Lionheart | 76 | Document actions pass; responsive reader and narration remain assigned to Wave 3. |
| Contact | 62 | Typography and layout pass; production delivery remains a hard blocker. |

## Wave 2 Production Grade

Wave 2 production score: **90/100**. Home, About, Engineering, and Community & Leadership now meet the per-page visual threshold. The site-wide release remains blocked by mobile Lionheart reading, verified contact delivery, and cross-browser Classroom journeys.

| Category | Score | Available | Wave 2 finding |
| --- | ---: | ---: | --- |
| Functionality | 18 | 25 | All current routes, navigation, documents, and Classroom behavior pass; later-wave delivery and persistence features remain open. |
| Responsive layout | 15 | 15 | The affected pages pass desktop/mobile review without overflow, clipping, or dominant supporting images. |
| Accessibility | 13 | 15 | Axe, heading order, link safety, and accessible action names pass; reader and onboarding work remains. |
| Typography and readability | 10 | 10 | Approved font roles, minimum sizes, line lengths, and heading scale pass. |
| Image quality | 10 | 10 | Narrative images preserve aspect ratio and use content-aware maximum widths. |
| Content and tone | 10 | 10 | Public copy is warm, educational, community rooted, and free of inappropriate tactical language. |
| Visual polish | 9 | 10 | Page proportions, footer, document actions, and teaching sequence are cohesive; later feature surfaces remain. |
| Deployment and asset integrity | 5 | 5 | Canonical asset audit remains clean with the verified manifest hash. |
| **Total** | **90** | **100** | **Wave 2 pages pass locally; site-wide hard gates remain assigned to later waves.** |

| Page | Production score | Wave 2 result |
| --- | ---: | --- |
| Home | 93 | Reduced hero scale and section spacing pass desktop and mobile review. |
| About | 92 | Portrait and landscape media now support the narrative without controlling section height. |
| Engineering | 93 | Compact intro, public guide, separate Quest launch, practice, and philosophy appear in the required order. |
| Classroom Design Quest | 81 | Unchanged in this wave; onboarding and technical control sizing remain assigned to Wave 5. |
| LomnickPro | 92 | Unchanged and passing. |
| Community & Leadership | 92 | Alternating narrative widths, image scale, links, and community-centered tone pass. |
| Lionheart | 76 | Responsive reader and narration remain assigned to Wave 3. |
| Contact | 62 | Production delivery remains a hard blocker assigned to Wave 4. |

## Wave 3 Local Grade

Wave 3 local score: **94/100**. Both Lionheart preview routes now pass responsive reading, keyboard, canvas-rendering, narration, and accessible-text tests. The numeric release target is met provisionally, but Contact delivery and Classroom onboarding/persistence remain hard blockers and several pages remain below the required 90-point floor.

| Category | Score | Available | Wave 3 finding |
| --- | ---: | ---: | --- |
| Functionality | 21 | 25 | Responsive PDF reading and narration pass; verified contact delivery, server progress, and certificates remain. |
| Responsive layout | 15 | 15 | Reader controls and canvases pass desktop and 390px mobile without document overflow. |
| Accessibility | 14 | 15 | Keyboard paging, labels, canvas descriptions, no-autoplay speech, and text companions pass; Classroom onboarding remains. |
| Typography and readability | 10 | 10 | Reader controls and companion copy meet the site scale and minimums. |
| Image quality | 10 | 10 | PDF canvases preserve page geometry and pass nonblank pixel checks. |
| Content and tone | 10 | 10 | Narration and companion text remain grounded in the public memoir previews. |
| Visual polish | 9 | 10 | Desktop and mobile reader composition is cohesive with the existing Lionheart identity. |
| Deployment and asset integrity | 5 | 5 | Both existing PDFs remain canonical, unchanged, and registry-backed. |
| **Total** | **94** | **100** | **Numeric target met locally; hard-gate failures still prevent release completion.** |

| Page | Local score | Wave 3 result |
| --- | ---: | --- |
| Lionheart | 94 | One internal reading action per volume; no redundant document controls. |
| Volume 1 Preview Reader | 94 | PDF.js rendering, paging, fit width, zoom, full screen, narration, and text companion pass. |
| Volume 2 Preview Reader | 94 | PDF.js rendering, paging, fit width, zoom, full screen, narration, and text companion pass. |
| Classroom Design Quest | 81 | Still below the page threshold; focused onboarding remains assigned to Wave 5. |
| Contact | 62 | Still below the page threshold; production delivery remains assigned to Wave 4. |
