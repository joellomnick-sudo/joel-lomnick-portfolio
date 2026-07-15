# Portfolio Visual Audit Report

This report combines computed browser measurements with manual full-page screenshot review. Automated success is not treated as visual approval.

## Audit Method

- Desktop checkpoint captures: 1440 x 1200, full page.
- Mobile checkpoint captures: 390 x 844, full page.
- Final responsive matrix: 1440, 1280, 1024, 768, 390, and 360px.
- Fonts and images are awaited, lazy images are triggered, motion is disabled, the page returns to the top, and layout stability is checked before capture.
- `pnpm audit:site` records typography, H1 count, navigation visibility, horizontal overflow, image loading and fit, duplicate images, missing alt attributes, and sections that need manual empty-space review.
- Screenshots are stored outside Git under `artifacts/screenshots/checkpoint-XX/{local,production}/`.

## Checkpoint 0 Baseline

### Code-level observations before screenshots

1. The approved overall identity, route set, navigation labels, public documents, case studies, headshot, Classroom Lab, and personal storytelling are present.
2. Global CSS currently uses Inter/system sans and Georgia rather than the requested Source Sans 3 and Fraunces pairing.
3. Desktop primary navigation is approximately 15px, below the requested 16px target.
4. The global H1 token can become substantially larger than the requested normal-page maximum; the homepage hero also needs its approved separate limit.
5. Ordinary editorial sections can reach about 120px of vertical padding per side, and the homepage hero uses a full-viewport minimum height. Both require screenshot-led refinement, not blanket removal.
6. About and Community image relationships need explicit maximum dimensions so supporting images do not control section height.
7. Engineering currently places general practice material before Engineering 101 and the Classroom Lab, contrary to the final required order.
8. The Classroom Lab exposes the full device list at once, which is expected to create excess page height before the footer.
9. Lionheart currently repeats volume information between preview controls and lower content.
10. Contact currently uses a two-column content area that leaves permanent unused space.

### Baseline artifact review

- **Automated result:** 16 route/viewport combinations audited, 0 hard failures, and 26 planned-refinement warnings.
- **Typography:** Body copy meets the 18px desktop and 17px mobile baselines. Desktop navigation computes to 15.04px on every route. Normal desktop H1s compute to 77.76px and the Home hero to 75.2px, above their requested limits. Captions compute to 14.4px and need a modest increase on About and Community.
- **Navigation and footer:** All seven labels are visible, active states are clear, the mobile panel opens and closes correctly, and neither surface exposes direct contact details. Footer copy is readable but can use more balanced spacing after the global type update.
- **Home:** The three-line headline and uncropped headshot are correct. The hero is substantially taller than its content requires, the introductory copy can be slightly larger, and the final invitation has more vertical padding than needed.
- **About:** The narrative order is strong. The Rochester image dominates its section, later photo/text proportions vary, captions are small, and the Professional Documents section needs the approved transition and larger descriptions.
- **Engineering:** The page is visually sound but uses the wrong content order. General engineering material precedes the public guide, the guide has a generic filler panel, and the philosophy band is taller than necessary.
- **Classroom Lab:** Core controls and suggested layout work. The complete uncollapsed library determines desktop height and leaves a large empty area beneath the canvas and feedback. At 390px the plan is visually clipped inside its narrow column and needs a deliberately responsive presentation.
- **LomnickPro:** All four uncropped infographics and accessible transcripts are present. The introductory heading/copy alignment is loose, body summaries are small, and the hero can be shorter without reducing case-study graphics.
- **Community & Leadership:** Story order and alternating layout are effective. Several portraits are oversized relative to their copy, captions and links are small, and the page can lose some vertical gap without becoming cramped.
- **Lionheart:** The cover remains fully visible and the literary mood is strong. Each volume is described twice, three competing actions appear per preview, and selecting a preview creates a very tall embedded-document area.
- **Contact:** Labels and controls are clear. The permanent left introduction column leaves unused space beside the form, the second heading competes with the hero, and the section is taller than its content requires.
- **Mobile:** No document-level horizontal overflow or broken images were found. The mobile Lab canvas is the one clear usability concern; other pages stack coherently, though supporting images and long footers will benefit from the planned scale and spacing refinements.
- **Special states:** Mobile navigation, case-study lightbox, Classroom suggested layout, mocked contact response, and Lionheart preview were captured. The contact capture wait was corrected after the baseline image revealed it had stopped on the sending state.

### Baseline satisfaction scores

These scores describe the unchanged production design before refinement. Scores below 4 are documented exceptions for Checkpoint 0 because this checkpoint changes compliance infrastructure only and introduces no visual regression.

| Category | Score | Reason when below 5 |
| --- | ---: | --- |
| Readability | 4 | Core prose is readable, but navigation, captions, and some interface text need the requested enlargement. |
| Warmth and personality | 5 | The approved editorial voice and multidimensional personal identity are strong. |
| Visual balance | 3 | Several sections have excess height, oversized supporting media, or unequal-column dead space. |
| Image proportions | 3 | About and Community supporting images need manual rebalancing; text-bearing graphics must remain contained. |
| Section flow | 3 | Engineering order, Classroom Lab height, Lionheart duplication, and Contact layout remain planned work. |
| Accessibility | 4 | Existing axe, keyboard, focus, alt, and overflow guards are good; stricter size and interaction coverage remains. |
| Mobile usability | 4 | Baseline mobile routes work without known overflow; full six-width audit remains. |
| Alignment with Joel's instructions | 4 | The approved identity is present; the explicit refinement list remains to be completed incrementally. |

## Checkpoint Reviews

Each verified checkpoint will add its local findings, production comparison, changed-page score table, resolved issues, and any documented deferrals here.
