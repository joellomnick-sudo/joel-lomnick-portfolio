# Agent Guidance

## Project Overview

This is Joel Maurice Lomnick's personal portfolio site. It presents Joel as an Electrical Engineer-in-Training, creative strategist, author, mentor, and community builder through one unified professional ecosystem.

Core positioning:

- Joel Maurice Lomnick, EIT
- Electrical Engineer | Creative Strategist | Author | Mentor | Community Builder
- Engineer meets storyteller meets community architect
- Built from survival. Designed with purpose.

## Development Commands

Use the existing package manager and scripts:

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm start
```

Do not reinstall dependencies unless `node_modules` is missing or the lockfile/package manifest changed.

## Styling Rules

- Use Tailwind CSS and the existing reusable components before creating new patterns.
- Preserve the brand palette: rich black, warm ivory, deep brown, muted gold, with teal or emerald only as restrained accents.
- Keep the design premium, grounded, technical, warm, and uncluttered.
- Do not redesign the whole site unless the user explicitly asks for a redesign.
- Avoid making the site feel like only a resume, only a design agency, only a church/fraternity site, or only a book promo.

## Accessibility Expectations

- Keep semantic heading order logical.
- Use meaningful alt text for every image.
- Preserve keyboard-visible focus states.
- Keep mobile navigation keyboard-accessible.
- Maintain strong color contrast, especially for small text.
- Use labels for form fields and avoid text that exists only inside images.

## Testing and Build Expectations

- Run `pnpm typecheck` and `pnpm build` before finishing meaningful changes.
- If a dev server is running, stop it before a production build so `.next` is not shared by dev and build processes.
- Verify key routes render after changes: `/`, `/about`, `/engineering`, `/creative-services`, `/portfolio`, `/lionheart`, `/leadership`, and `/contact`.
- Do not claim lint or tests passed unless those scripts exist and were actually run.

## Content Voice

Preserve Joel's voice: clear, professional, warm, direct, resilient, culturally grounded, technically credible, and practical.

Use language that reinforces systems, service, clarity, mentorship, storytelling, and community impact without overdramatizing trauma or over-indexing on any single identity lane.
