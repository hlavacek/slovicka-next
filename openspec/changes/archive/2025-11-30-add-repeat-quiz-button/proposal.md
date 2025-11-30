# Change: Add Repeat Quiz Button

## Why

After completing a quiz, users often want to practice the same word set again to reinforce learning. Currently, they must click "Start New Quiz" which navigates to the quiz setup page, then click the same word set again (which is pre-selected). This adds unnecessary friction. A direct "Repeat Quiz" button on the summary page would allow users to immediately restart the same quiz with the same settings, streamlining the learning experience.

## What Changes

- Add a "Repeat Quiz" button to the quiz summary page that restarts the quiz with identical configuration (same word set, source language, and random order setting)
- Add translation keys for the new button label to `messages/en.json` and `messages/sk.json`
- Update QuizSummary component to accept quiz configuration props and provide a repeat action handler
- The button navigates to `/quiz` with the same query parameters as the current quiz session

## Impact

- Affected specs: `learning` (Quiz Results Summary requirement)
- Affected code:
  - `components/quiz/QuizSummary.tsx` - add repeat button and navigation logic
  - `app/quiz/page.tsx` - pass quiz config to QuizSummary component
  - `messages/en.json` and `messages/sk.json` - add translation keys
- User-facing change: faster workflow for repeated practice sessions
- No breaking changes
