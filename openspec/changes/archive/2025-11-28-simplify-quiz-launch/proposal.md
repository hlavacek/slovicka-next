# Change: Simplify Quiz Launch

## Why

The current quiz setup requires multiple steps: selecting a word set, optionally configuring settings in an accordion, and clicking a "Start Quiz" button. This creates friction for young learners who just want to practice vocabulary quickly. By launching the quiz immediately when a word set is selected, we reduce cognitive load and streamline the user experience to a single click while still allowing advanced users to customize settings before launch.

## What Changes

- Remove the "Start Quiz" button
- Make clicking a word set card immediately navigate to `/quiz` with current settings from the accordion
- Keep the settings accordion (source language and random order controls) for users who want to customize
- Settings default to: source language = Slovak (`sk`), random order = `true`
- Word set selection triggers immediate quiz launch, reading current accordion settings
- No breaking changes - all settings remain accessible

## Impact

- Affected specs: `learning`
- Affected code:
  - `components/quiz/QuizSetup.tsx` (remove start button, add immediate navigation on card click using current settings)
- User-facing change: Faster quiz launch with one-click experience while preserving settings customization
- No breaking changes (settings accordion remains functional)
- Migration: None required
