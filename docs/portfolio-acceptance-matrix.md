# Portfolio Acceptance Matrix

This matrix is the source of truth for the incremental portfolio refinement. A row may move to **Pass in production** only after the exact checkpoint Git SHA is returned by `/api/version` on `https://portfolio.lomnickpro.com` and the listed production check has passed.

Sources use the section letters from the approved refinement brief. Automated checks are intentionally paired with manual screenshot review where visual judgment is required.

## Global

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| G-01 | Preserve the approved brown, black, cream, ivory, gold, editorial, personal, and Black-excellence identity. | A | Manual screenshot comparison | Not started | 1-7 | Pending | No redesign from scratch. |
| G-02 | Keep existing routes, case studies, public PDFs, Classroom Lab, headshot, and privacy-safe client treatment. | A | Route, image, PDF, and interaction tests | In progress | 0-7 | Pending | Baseline inventory complete. |
| G-03 | Avoid dashboard, tactical, Command Center, Five Lanes, repeated placard, rigid card-grid, and generic consulting language. | A | Text scan and manual review | Not started | 4-7 | Pending | Preserve human storytelling. |
| G-04 | Use Source Sans 3 for body and interface text with reliable fallbacks. | C | Computed-font audit | Not started | 1 | Pending | Central font token required. |
| G-05 | Use Fraunces for editorial headings, narrative headings, pull quotes, and reflective text. | C | Computed-font audit and screenshot review | Not started | 1 | Pending | Heavy display face remains limited. |
| G-06 | Centralize caption, small, body, lead, H3, H2, H1, and hero typography tokens. | C | CSS token inspection | Not started | 1 | Pending | Approximate scale from brief. |
| G-07 | Meet desktop and mobile body, interface, caption, footer, and Classroom Lab minimum sizes. | C, N | Playwright computed-size audit | Not started | 1, 3, 7 | Pending | Strict audit at Checkpoint 7. |
| G-08 | Keep normal desktop H1 at 48-64px, mobile H1 at 38-48px, and homepage hero within its approved range. | C, N | Playwright computed-size audit and screenshots | Not started | 1, 4, 7 | Pending | Avoid disproportionate headings. |
| G-09 | Keep body line-height near 1.6-1.7 and controls near 1.4-1.5. | C | Computed-style audit | Not started | 1 | Pending | Check forms and Lab controls separately. |
| G-10 | Keep core prose generally within 60-68 characters and prevent narrow single-word lines. | C | Bounding-box audit and manual review | Not started | 1-7 | Pending | Review every viewport. |
| G-11 | Use content-driven section heights and approved standard or compact spacing. | D | Empty-space audit and screenshots | Not started | 2-7 | Pending | Preserve intentional breathing room. |
| G-12 | Remove unnecessary fixed heights, 100vh ordinary sections, blank columns, spacers, and footer gaps. | D | CSS scan, geometry audit, screenshots | Not started | 2-7 | Pending | Homepage hero is reviewed separately. |
| G-13 | Keep supporting images within the intended small, medium, wide, and narrative ranges. | E | Image geometry audit and screenshots | Not started | 2, 4, 5 | Pending | Hero images may be larger. |
| G-14 | Use contain for infographics, covers, flyers, business cards, documents, and text-bearing graphics. | E | Computed object-fit audit | Not started | 2, 5, 6 | Pending | No text-bearing graphic may be cropped. |
| G-15 | Do not crop faces, heads, hands, group edges, titles, signs, or meaningful objects. | E | Manual image review at six widths | Not started | 2-7 | Pending | Custom object position where needed. |
| G-16 | Define image dimensions, load every image, and provide appropriate alt treatment. | E | Image load and alt tests | In progress | 0-7 | Pending | Baseline hard-failure audit added. |
| G-17 | Do not repeat a key photograph on one page or place similar group photos directly together. | E | Duplicate-src audit and manual review | Not started | 2, 4, 5 | Pending | Editorial sequencing check. |
| G-18 | Do not expose private email, phone, secrets, or unredacted documents. | F, G, R | Repository and rendered-output scans | In progress | 0-7 | Pending | Destination email remains server-only. |
| G-19 | Every primary route returns HTTP 200 with one H1 and no horizontal overflow. | B, I, P | Playwright route and geometry tests | In progress | 0-7 | Pending | Baseline test coverage exists. |
| G-20 | Reduced-motion preferences are honored. | I | CSS inspection and browser emulation | In progress | 0, 7 | Pending | Existing media query retained. |
| G-21 | `/api/version` returns only commit, environment, and build timestamp with no-store caching. | K | API test and production curl | In progress | 0 | Pending | Production SHA must match GitHub. |

## Header

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| H-01 | Desktop and mobile navigation use Home, About, Engineering, LomnickPro, Community & Leadership, Lionheart, Contact in that order. | B | Role and label tests | In progress | 0-1 | Pending | Shared `navLinks` source. |
| H-02 | Joel's name links home; no domain, portfolio, or website-address menu item exists. | B, F | DOM test | In progress | 0-1 | Pending | Domain remains in footer metadata only. |
| H-03 | Every label is visible without hover and active-page state is clear. | B, F, N | Visibility, contrast, and aria-current tests | In progress | 0-1 | Pending | Check 1280 and 1440. |
| H-04 | Header aligns to the main grid and the consultation action remains balanced. | B, F | Screenshot review | Not started | 1 | Pending | Avoid offset nav items. |
| H-05 | Mobile targets are at least 44px; Escape and route selection close the menu. | B, I | Playwright interaction tests | In progress | 0-1 | Pending | Existing focus return tested. |
| H-06 | Keyboard focus remains trapped inside an open mobile menu. | B, I | Playwright keyboard test | In progress | 0-1 | Pending | Test forward and reverse tab. |

## Footer

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F-01 | Footer includes Joel Maurice Lomnick, EIT; LomnickPro; Richmond; nav; lomnickpro.com; copyright; and approved closing statement. | F | DOM text and link test | In progress | 0-1 | Pending | No direct contact details. |
| F-02 | Footer has balanced desktop columns and a clean mobile stack without overflow. | F | Responsive screenshots and geometry test | Not started | 1, 7 | Pending | Reduce unused space. |
| F-03 | Footer links and text are at least 15-16px and readable. | F, N | Computed-size and contrast audit | Not started | 1 | Pending | Do not inflate footer height. |
| F-04 | Footer begins reasonably close to preceding content. | F, N | Geometry audit and screenshots | Not started | 2-7 | Pending | Especially Classroom Lab and Lionheart. |
| F-05 | No private email or phone appears in the footer or public markup. | F | DOM and bundle scan | In progress | 0-7 | Pending | Repeat after each build. |

## Home

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HO-01 | Keep the approved three-line hero headline at 1440px. | G, O | Span and screenshot test | Not started | 4 | Pending | Exact wording retained. |
| HO-02 | Enlarge the introductory paragraph while preserving readable line length. | G | Computed-size and screenshot review | Not started | 4 | Pending | Target at least 18px desktop. |
| HO-03 | Reduce total hero height about 10-15 percent. | G | Before/after geometry and screenshots | Not started | 4 | Pending | Headshot remains fully visible. |
| HO-04 | Preserve the uncropped professional headshot. | G, O | Natural-ratio and manual crop review | Not started | 4 | Pending | No face or head crop. |
| HO-05 | Rebalance the editorial quote and adjacent heading. | G | Desktop and mobile screenshots | Not started | 4 | Pending | Keep editorial composition. |
| HO-06 | Reduce final CTA padding about 20 percent. | G | Geometry comparison | Not started | 4 | Pending | CTA remains welcoming. |
| HO-07 | Keep View Case Studies and Book a Consultation actions working. | G | Link navigation test | Not started | 4, 7 | Pending | No repeated roles. |
| HO-08 | Command Center, Five Lanes, identity placards, and excessive blank areas remain absent. | G, O | Text scan and screenshots | Not started | 4, 7 | Pending | Regression guard. |

## About

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A-01 | Preserve the warm narrative and Rochester, RIT, Troy/Albany, Richmond, present/future, and documents sequence. | G, O | Heading/content order test | Not started | 4 | Pending | Do not convert to timeline cards. |
| A-02 | Reduce the first Rochester image about 15-20 percent. | G | Before/after geometry and screenshot | Not started | 2, 4 | Pending | It should support the story. |
| A-03 | Standardize alternating narrative/image relationships with 380-440px images and 480-600px narrative areas. | G | Geometry audit and screenshots | Not started | 2, 4 | Pending | Responsive ranges, not fixed boxes. |
| A-04 | Keep narrative body around 18px and captions at least 15px. | G | Computed-size audit | Not started | 1, 4 | Pending | Mobile remains 17px. |
| A-05 | Add the approved warm transition before Professional Documents. | G | Text assertion and screenshot | Not started | 4 | Pending | Exact approved sentence preferred. |
| A-06 | Increase document descriptions and document-button text. | G | Computed-size audit | Not started | 4 | Pending | Clear professional-review context. |
| A-07 | Resume and cover-letter view/download links work. | G, O | PDF response and link tests | Not started | 4, 7 | Pending | Public-safe files only. |
| A-08 | Remove unnecessary vertical gaps while preserving editorial rhythm. | G | Empty-space audit and screenshots | Not started | 2, 4 | Pending | No cramped sections. |

## Engineering

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| E-01 | Engineering 101 is the first substantive feature after at most a short personal introduction. | G, O | DOM section-order test | Not started | 3 | Pending | No full generic hero above it. |
| E-02 | Use the approved Public Teaching Edition title, description, and generic-example label. | G | Text assertions | Not started | 3 | Pending | Plain-language teaching. |
| E-03 | Show a guide visual or useful learning preview instead of a generic filler card. | G | Screenshot and content review | Not started | 3 | Pending | No decorative empty card. |
| E-04 | View Guide, Download PDF, and Launch Interactive Classroom work. | G | Link and PDF tests | Not started | 3, 7 | Pending | Guide path is fixed. |
| E-05 | Classroom Lab follows the guide directly. | G, O | DOM order test | Not started | 3 | Pending | Teaching tools lead the page. |
| E-06 | Engineering experience/services follow the teaching tools. | G, O | DOM order test | Not started | 3 | Pending | Technical topics follow practice. |
| E-07 | Technical topics, coordination habits, and philosophy appear in the approved order. | G | Heading order test | Not started | 3 | Pending | Contact invitation closes. |
| E-08 | Engineering Philosophy is compact. | G, O | Geometry audit and screenshot | Not started | 3 | Pending | Avoid oversized dark section. |
| E-09 | Professional-practice body text is readable. | G | Computed-size audit | Not started | 1, 3 | Pending | Target 18px desktop. |
| E-10 | No confidential names, drawings, specifications, schedules, owners, or sensitive project information appear. | G, O | Content and asset review | Not started | 3, 7 | Pending | Public teaching examples only. |

## Classroom Lab

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CL-01 | Division 26, 27, and 28 device groups are accordions with only one open by default. | G, O | DOM and interaction test | Not started | 3 | Pending | Preserve device catalog. |
| CL-02 | Device Library has a contained scroll area when needed. | G, O | Computed max-height/overflow test | Not started | 3 | Pending | Approximately 680px maximum. |
| CL-03 | Desktop columns approximate 240-270px library, flexible 560px canvas, and 290-320px feedback. | G | Geometry audit | Not started | 3 | Pending | Widen feedback enough for prose. |
| CL-04 | Feedback moves below canvas at narrower widths and library collapses at tablet width. | G | Responsive screenshots and interaction test | Not started | 3 | Pending | No forced squeeze. |
| CL-05 | Toolbar separates Editing, Review, and Layers controls and may wrap. | G | DOM grouping and screenshot review | Not started | 3 | Pending | Use familiar icons where present. |
| CL-06 | Controls are at least 44px high with 15-16px text and device names are 16px. | G, N | Computed geometry and size test | Not started | 3 | Pending | Touch friendly. |
| CL-07 | Library, feedback, and disclaimer typography meet the approved sizes. | G, N | Computed-size test | Not started | 3 | Pending | Separate feedback types. |
| CL-08 | No large blank area remains below the canvas and footer follows the app. | G, O | Empty-space audit and screenshot | Not started | 3 | Pending | Do not enlarge canvas to fill space. |
| CL-09 | No horizontal scrolling occurs at desktop, tablet, or mobile. | G, I, O | Six-width overflow test | Not started | 3, 7 | Pending | Includes open accordions. |
| CL-10 | Mobile supports tap-to-select and tap-to-place without precise dragging. | G | Touch emulation test | Not started | 3 | Pending | Keyboard behavior also retained. |
| CL-11 | Placement, Undo, Clear, Clear Division, Reset, Check Design, Suggest Layout, and layers work. | O | Playwright functional tests | Not started | 3, 7 | Pending | Test each command. |
| CL-12 | Division 26 teaching relationships remain accurate. | G | Device catalog and feedback assertions | Not started | 3 | Pending | Includes protected sink-area devices and external panel. |
| CL-13 | Division 27 teaching relationships remain accurate. | G | Device catalog and feedback assertions | Not started | 3 | Pending | WAP/data routes to communications infrastructure. |
| CL-14 | Division 28 teaching relationships remain accurate. | G | Device catalog and feedback assertions | Not started | 3 | Pending | Fire alarm is supervised. |
| CL-15 | The Lab explains that multiple layouts may be reasonable and asks users to explain decisions. | G | Text assertion | Not started | 3 | Pending | Not a rigid single-answer exercise. |

## LomnickPro

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LP-01 | Preserve the warm hero, Black-excellence direction, two-column desktop gallery, and closing invitation. | G | Screenshot comparison | Not started | 5 | Pending | Reduce hero height only. |
| LP-02 | Display exactly the four approved anonymous case-study titles. | G, O | Text and count test | Not started | 5 | Pending | No private client names. |
| LP-03 | All case-study infographics use contain and never crop edges or text. | G, O | Object-fit test and screenshot review | Not started | 2, 5 | Pending | Do not significantly shrink them. |
| LP-04 | Click-to-enlarge works for every case study. | G, O | Playwright interaction test | Not started | 5 | Pending | Full-resolution dialog. |
| LP-05 | Lightbox is keyboard accessible; Escape closes; focus returns to trigger. | G, I | Playwright keyboard test | Not started | 5 | Pending | Accessible dialog semantics. |
| LP-06 | Titles, 17-18px summaries, and 15-16px transcript links are readable. | G | Computed-size audit | Not started | 5 | Pending | PNG text is not the only explanation. |
| LP-07 | Accessible HTML descriptions remain for each case study. | G | DOM content test | Not started | 5 | Pending | Keep transcript links. |
| LP-08 | Align the public-trust heading and explanation as one coherent introduction. | G | Screenshot review | Not started | 5 | Pending | Avoid disconnected columns. |
| LP-09 | Reduce hero height about 15 percent. | G | Before/after geometry | Not started | 5 | Pending | Keep visual warmth. |
| LP-10 | Case-study images and transcripts remain usable on mobile. | G, P | 390px and 360px interaction test | Not started | 5, 7 | Pending | No horizontal overflow. |

## Community & Leadership

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C-01 | Preserve organization-specific narrative sections, alternating media, external links, and personal tone. | G | Content and screenshot review | Not started | 5 | Pending | No numbered achievement system. |
| C-02 | Body text is about 18px desktop; captions are 15px; external links are 16px. | G, O | Computed-size audit | Not started | 1, 5 | Pending | Opening statement is not fine print. |
| C-03 | Reduce selected NSBE, NPHC, church-media, and mentoring photographs about 10-15 percent. | G | Geometry comparison and screenshots | Not started | 2, 5 | Pending | Natural proportions retained. |
| C-04 | Keep the West African Drum and Dance portrait appropriately proportioned. | G | Manual image review | Not started | 5 | Pending | No unsafe crop. |
| C-05 | Reduce section gaps about 10-15 percent. | G, O | Empty-space audit and screenshots | Not started | 2, 5 | Pending | Preserve warmth. |
| C-06 | Avoid directly adjacent similar group photos. | G, O | Manual sequence review | Not started | 2, 5 | Pending | Every image supports its story. |
| C-07 | Preserve stories of service, mentoring, empowerment, culture, wellness, brotherhood, faith, visibility, and growth. | G | Content review | Not started | 5 | Pending | Multidimensional, not repetitive. |
| C-08 | External organization links work and are clearly identifiable. | G | Link response and accessible-name test | Not started | 5, 7 | Pending | External behavior should be intentional. |

## Lionheart

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| L-01 | Preserve literary identity, dark hero, Volume 1 cover, story section, memory quote, and statuses. | G | Content and screenshot review | Not started | 6 | Pending | Volume 1 completed; Volume 2 in progress. |
| L-02 | Remove duplicate Volume 1 and Volume 2 descriptions. | G, O | DOM text-count test | Not started | 6 | Pending | One coherent area per volume. |
| L-03 | Each volume area contains title, status, short description, Read Preview, and Download. | G, O | DOM structure test | Not started | 6 | Pending | Only two primary actions. |
| L-04 | Remove redundant Open PDF and Preview Here actions. | G | Text and action-count test | Not started | 6 | Pending | Clear action hierarchy. |
| L-05 | Preview descriptions are 17-18px and the cover remains fully visible. | G, O | Computed-size and object-fit audit | Not started | 6 | Pending | No title crop. |
| L-06 | Do not automatically load both PDFs. | G | Network request test | Not started | 6 | Pending | Load on explicit request only. |
| L-07 | Mobile shows cover, description, Read Preview, and Download instead of a tiny embedded PDF. | G | Mobile screenshot and DOM test | Not started | 6 | Pending | Preview may open as a document. |
| L-08 | Reduce lower-page height and keep both preview PDF links at HTTP 200. | G, O | Geometry and PDF tests | Not started | 6, 7 | Pending | Footer follows content. |

## Contact

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT-01 | Preserve the dark hero, "Bring the rough version.", privacy approach, and contact form. | G | Content and screenshot review | Not started | 6 | Pending | No public direct contact. |
| CT-02 | Center the introduction and form beneath the hero with no unused side column. | G, O | Geometry audit and screenshots | Not started | 6 | Pending | Form width about 760-800px. |
| CT-03 | Use the approved smaller invitation, supporting copy, and privacy statement. | G | Text assertion | Not started | 6 | Pending | Avoid competing large H2. |
| CT-04 | Labels, controls, help text, button text, and body copy meet approved sizes. | G | Computed-size audit | Not started | 1, 6 | Pending | Controls at least 44px. |
| CT-05 | Required indicators, labels, focus states, errors, and field spacing are accessible. | G, I | Axe and Playwright validation tests | Not started | 6, 7 | Pending | Errors announced. |
| CT-06 | Server-side schema validation and input sanitization are applied. | G | API malformed-input tests and code review | Not started | 6 | Pending | Do not log full message. |
| CT-07 | Honeypot and minimum-completion-time protections reject automated submissions. | G | API tests | In progress | 0, 6 | Pending | Existing baseline honeypot test. |
| CT-08 | Turnstile is enforced when configured. | G | Mocked verification tests and env review | Not started | 6 | Pending | Optional configuration. |
| CT-09 | Reasonable rate limiting is applied. | G | Repeated-request API test | Not started | 6 | Pending | Account for serverless runtime. |
| CT-10 | Destination email stays server-side and visitor email becomes Reply-To. | G | Code review, bundle scan, controlled delivery | Not started | 6 | Pending | Requires production delivery evidence. |
| CT-11 | Approved success and failure messages are shown without sensitive detail. | G | Mocked response UI tests | Not started | 6 | Pending | Exact approved wording. |
| CT-12 | Controlled production submission succeeds and destination receipt is confirmed. | G, W | Live submission and inbox confirmation | Not started | 6-7 | Pending | User confirmation may be required. |

## Documents

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D-01 | Engineering 101, both Lionheart previews, public resume, and public cover letter return HTTP 200. | H | PDF response test | In progress | 0-7 | Pending | Five required documents. |
| D-02 | Each document begins with a PDF header and uses the expected public filename. | H | Binary-header test | In progress | 0-7 | Pending | No broken paths. |
| D-03 | View and download links work on desktop and mobile. | H | Link and mobile-opening test | Not started | 3, 4, 6, 7 | Pending | Browser PDF viewer may vary. |
| D-04 | No private original or unredacted file is in a public directory. | H, R | Repository and PDF text audit | Not started | 0, 7 | Pending | Public-safe copies only. |
| D-05 | Public professional documents contain no public email or phone and retain noindex headers. | H | PDF text extraction and header test | In progress | 0, 7 | Pending | Redaction verification required. |

## Mobile And Responsive

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M-01 | Test all primary routes at 1440, 1280, 1024, 768, 390, and 360px. | P | Responsive Playwright matrix | Not started | 7 | Pending | Changed routes also checked per checkpoint. |
| M-02 | Mobile images stack with their related text and do not consume several consecutive screens. | E, P | Mobile full-page screenshots | Not started | 2, 4, 5 | Pending | Preserve narrative order. |
| M-03 | Headings, paragraphs, buttons, form fields, and footers do not clip or overflow. | C, P | Geometry audit and screenshots | In progress | 0-7 | Pending | Hard overflow guard added. |
| M-04 | Mobile navigation is readable, operable, and at least 44px per target. | B, P | Playwright interaction and geometry tests | In progress | 0-1 | Pending | Test 390 and 360. |
| M-05 | Classroom, lightbox, Lionheart actions, and form remain usable by touch. | G, P | Mobile interaction tests | Not started | 3, 5, 6, 7 | Pending | No precision drag requirement. |

## Accessibility

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AX-01 | Every page has exactly one H1 and logical heading order. | I | DOM and heading-order audit | In progress | 0-7 | Pending | One-H1 guard exists. |
| AX-02 | Skip-to-content link works and visible focus indicators remain. | I | Keyboard test and screenshot | Not started | 1, 7 | Pending | Check dark and light surfaces. |
| AX-03 | Mobile menu exposes dialog semantics, traps focus, closes with Escape, and returns focus. | I | Playwright keyboard test | In progress | 0-1 | Pending | Route selection also closes it. |
| AX-04 | Contact form has labels, required semantics, announced errors, and usable focus. | I | Axe and validation tests | Not started | 6-7 | Pending | No placeholder-only labels. |
| AX-05 | Classroom Lab is keyboard operable. | I | Playwright keyboard test | In progress | 0, 3, 7 | Pending | Pointer and keyboard placement. |
| AX-06 | Case-study lightbox has dialog semantics, Escape close, and focus return. | I | Playwright test | In progress | 0, 5, 7 | Pending | Every trigger. |
| AX-07 | Meaningful images have useful alt text and decorative images are marked appropriately. | I | Alt audit and manual review | In progress | 0-7 | Pending | Hard guard catches missing attributes. |
| AX-08 | Text and controls meet WCAG AA contrast. | I | Axe and manual contrast review | In progress | 0-7 | Pending | Especially gold/brown small text. |
| AX-09 | No link or information is available only on hover or only by color. | I | Visibility and manual interaction test | In progress | 0-7 | Pending | Active state also uses aria-current. |
| AX-10 | Touch targets meet minimum size. | I | Geometry audit | Not started | 1, 3, 6, 7 | Pending | Header, Lab, and form. |
| AX-11 | Reduced-motion behavior is available. | I | Emulation and CSS test | In progress | 0, 7 | Pending | Screenshots disable motion. |
| AX-12 | Automated axe checks report no serious or critical WCAG A/AA violations. | I | Axe Playwright suite | In progress | 0-7 | Pending | Manual review still required. |

## Production Functionality

| ID | Requirement | Source | Automated or manual test | Status | Checkpoint | Production verification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P-01 | Each checkpoint passes lint, typecheck, Playwright, build, and targeted route checks before push. | M | Command log | In progress | 0-7 | Pending | No broken checkpoint pushes. |
| P-02 | Every checkpoint has its own commit with the prescribed message and no amendment or squash. | L, R | Git history review | In progress | 0-7 | Pending | Main branch only. |
| P-03 | Local, GitHub main, and `/api/version` SHAs match before the next checkpoint. | K, R, S | Git and production API checks | In progress | 0-7 | Pending | Cache-busting query required. |
| P-04 | Fresh local and production screenshots are captured and reviewed for changed routes. | Q, S | Artifact inventory and manual review | In progress | 0-7 | Pending | Artifacts remain gitignored. |
| P-05 | Production smoke tests pass for each changed route after Vercel is ready. | S | Production Playwright suite | Not started | 0-7 | Pending | Use exact production SHA. |
| P-06 | Checkpoint log and visual audit report are updated after each verified deployment. | J, S, U, V | Documentation review | In progress | 0-7 | Pending | Include score reasons below 5. |
| P-07 | Any production regression is reverted in a dedicated revert commit and documented. | T | Git and log review | Not started | 0-7 | Pending | No mixed emergency fixes. |
