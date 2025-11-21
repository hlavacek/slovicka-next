## Repository Constitution — Engineering Principles

This document captures the engineering principles and minimal rules for code quality, testing standards, user-experience consistency, and performance requirements for this repository.

### Short contract (inputs / outputs / success criteria)

- Inputs: Pull requests that change code, tests, styles, configuration, or dependencies.
- Outputs: An approved PR merged with CI green, tests passing, and relevant docs updated.
- Error modes: Lint/typecheck failures, failing tests, accessibility regressions, severe performance regressions, or security vulnerabilities.
- Success criteria: Code is readable, typed, covered by tests to an agreed threshold, accessible, consistent with UX tokens, and within performance budgets.

### High-level principles

- Clarity over cleverness: prefer readable, well-named code.
- Tests are required: new features and bugfixes must include tests.
- UX consistency: reuse shared UI components and tokens.
- Performance is measurable: use Next.js features and enforce budgets.

## Code quality rules

- Follow ESLint and TypeScript rules. Fix all lint and type errors before merging.
- Prefer explicit types; avoid `any` except with clear justification.
- Keep components small and focused; split complex logic into hooks or `lib/` utilities.
- Single responsibility per module; keep public APIs minimal and documented.
- Use immutable updates where practical.
- Surface user-friendly errors; log internals only to telemetry.
- Document intent for public functions with brief TSDoc/JSDoc.
- Dependency updates: include a short security/compatibility note in the PR.

Enforcement: CI must run lint and typecheck; a code review is required before merge.

## Testing standards

- Test types:
  - Unit tests (Jest + React Testing Library) for logic and components.
  - Integration tests for coordinating modules.
  - E2E (Playwright/Cypress) for critical user flows.
- Coverage targets:
  - Project baseline: >= 80% overall coverage. Exceptions must be documented.
  - New business-critical code: aim for ~90%.
- Test quality:
  - Deterministic and fast. Avoid fragile selectors, prefer roles or `data-testid`.
  - Mock external calls in unit tests; use fixtures or test servers for integration.
- CI: Run unit tests + coverage on every PR; fail on regressions below thresholds.

## User Experience consistency

- Centralize design tokens (colors, spacing, typography) and use `components/ui/` shared components.
- Component API conventions: `variant`, `size`, `disabled`, `className`.
- Accessibility rules:
  - Semantic HTML and keyboard operability.
  - Color contrast >= 4.5:1 for body text, 3:1 for large text.
  - Run an a11y check (axe) for changed pages/components or during releases.
- Microcopy should be consistent; validation errors must be helpful.

## Performance requirements and guidance

- Suggested targets: Lighthouse Performance >= 90 (adjustable), LCP < 2.5s, CLS < 0.1.
- Bundle budget: aim for initial critical JS < 150 KB gzipped; use dynamic imports and server components.
- Use Next.js optimizations (Image, Script, ISR, server components) and aggressive caching for static content.
- Measure in CI: run Lighthouse/Web Vitals smoke checks and block only on configurable regressions.
- Monitor Web Vitals in production and alert on regressions.

## PR checklist (add to PR template)

- [ ] Branch is up-to-date with base branch.
- [ ] Lint and TypeScript checks pass.
- [ ] Unit tests added/updated and passing; coverage not decreased below threshold.
- [ ] Integration/E2E tests updated if flows changed.
- [ ] Accessibility checks run and issues addressed.
- [ ] UX: used shared components or documented deviation.
- [ ] Performance impact assessed and large assets avoided.
- [ ] Documentation updated for public APIs.
- [ ] At least one reviewer assigned.

## CI Quality gates

- Build: must succeed.
- Lint/Typecheck: must pass (no errors).
- Tests: unit tests pass and coverage threshold met.
- Lighthouse/Web Vitals: report metrics; fail on configured regressions.

## Edge cases & risks

- Validate empty/null inputs and show helpful messages.
- Handle slow/failed external services with timeouts, retries, and graceful fallbacks.
- Large datasets: paginate or virtualize.
- Auth/permissions: enforce server-side checks and hide actions when unauthorized.
- Use error boundaries for render-time exceptions.

## Monitoring & telemetry

- Capture exceptions with context (e.g., Sentry).
- Collect Web Vitals and alert on regressions.
- Track anonymized usage metrics respecting user consent.

## Small examples / conventions

- Preferred Button props example:

  ```ts
  interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    className?: string;
  }
  ```

- Folder responsibilities:
  - `components/ui/` — shared presentational components
  - `lib/` — pure utilities and data-layer functions
  - `app/` — Next.js route components and global CSS

## Adoption

- Place this file as `.github/CONSTITUTION.md` (this file).
- Add the PR checklist to `.github/pull_request_template.md` and configure CI to run lint/typecheck/tests and a Lighthouse smoke job.

---

Document version: initial draft. Update this file as the project matures and thresholds change.
