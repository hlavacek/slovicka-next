# Project Context

## Purpose
Slovíčka-next is a small learning application to help Slovak school children (and learners) practice basic Slovak↔English vocabulary. The app emphasizes short, interactive quizzes, clear UI, accessibility for children, and fast load times so it is usable on low-end devices or slow connections.

Goals:
- Allow the user to add a new vocabulary set from the user interface
- Provide a simple, friendly quiz experience for vocabulary practice.
- Keep the UI consistent and accessible (keyboard, screen readers, color contrast).

## Tech Stack
- Next.js (App Router) — server and client components where appropriate (project is currently using Next 16)
- React 19 + TypeScript
- Tailwind CSS for styling
- ESLint + eslint-config-next for linting
- Class Variance Authority (cva) and Radix Slot for UI primitives
- Vite/Playwright or Jest for future tests (not yet present)
- Deployment: Static website on Github Pages
- next-intl for internalization (not yet present)

## Project Conventions

### Code Style
- TypeScript-first: prefer typed exports and avoid `any` unless explicitly justified.
- Use the shared `cn` utility for composing class names (`lib/utils.ts`).
- Follow Tailwind utility conventions and centralized design tokens (global CSS and `components/ui/*`).
- ESLint is the source of truth for style; fix lint errors before committing. Add a `format` script (Prettier) if desired.

### Architecture Patterns
- Keep presentational components in `components/` (shared UI under `components/ui/`).
- Place pure utilities in `lib/` (data transformations, shuffle, etc.).
- Use the App Router under `app/` for routes and server components. Use `"use client"` only for interactive components.
- Prefer small components and extract complex logic into hooks (e.g., `hooks/`) or `lib/` helpers.

### Testing Strategy
- Unit tests: Jest + React Testing Library for components and pure functions.
- Integration tests: small integration tests for data flows (e.g., quiz flow, scoring).
- E2E tests: Playwright for critical flows (start quiz, answer questions, view score).
- Coverage: aim for a project-wide baseline of ~80% and 90% for business-critical logic.
- CI: run lint, typecheck, and unit tests on PRs. Run a lightweight E2E or smoke test on main or nightly runs.

### Git Workflow
- Branching: feature branches off `main` (e.g., `feat/quiz-modes`), small focused PRs preferred.
- Commits: use short, descriptive messages. Prefer conventional commits (optional): `feat:`, `fix:`, `chore:`.
- Pull Requests: include the PR checklist from `.github/pull_request_template.md`. Require at least one review and CI passing before merge.

## Domain Context
- The core domain is simple vocabulary learning. Words are short nouns and verbs appropriate for primary-school children.
- Respect language diacritics and simple normalization when comparing answers (trim, toLowerCase, ignore leading/trailing whitespace).

## Important Constraints
- Accessibility: keyboard operable, clear focus states, and color contrast that meets WCAG AA for normal text.
- Privacy: avoid collecting personally identifiable information for children. If analytics are used, ensure they are anonymized and parental consent is respected (follow local regulations).
- Performance: keep initial client JS small — prefer server components for static content and dynamic import for non-critical code.

## External Dependencies
- Github pages for deployment — use github actions for deployment to github pages.

## Local dev & common commands
- Install dependencies and run the dev server locally:

```powershell
npm ci
npm run dev
```

- Build and preview production bundle:

```powershell
npm run build
npm start
```

Notes: The project currently does not include a `test` script or test setup; add Jest and a `test` script when introducing unit tests.

## File layout (important folders)
- `app/` — Next.js routes and pages (App Router)
- `components/` — Shared UI components; `components/ui/` holds design system primitives
- `lib/` — Utilities and pure functions
- `public/` — Static assets (images, icons)
- `openspec/` — project specs and agent prompts

## Contacts and ownership
- Primary maintainer: (add your name/email here)
- Reviewers: (list team members who should review PRs for UI, accessibility, and performance)

---

This file is intended to be a living document — update it as the project grows (new testing frameworks, CI changes, or deployment choices).
