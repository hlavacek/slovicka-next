# Change: Add Timed Quiz Bonus Points

## Why

To make the quiz more challenging and engaging for children, add an optional timed mode that rewards faster responses. This creates an additional layer of difficulty for students who want to test their quick recall ability while keeping the standard mode available for those who prefer to take their time. The timer adds excitement and gamification without penalizing slower learners who can simply reveal the answer when ready.

## What Changes

- Add 5-second countdown timer to the "Show Answer" button
  - Timer displays remaining seconds in the button (e.g., "Show Answer (5)")
  - Timer counts down from 5 to 0 automatically
  - User can click to reveal answer at any time before timer reaches 0
  - When timer reaches 0, button text changes to just "Show Answer" (no countdown)
- Award bonus points for fast correct answers
  - If user reveals answer before timer expires AND marks it correct: award 2 points
  - If user reveals answer after timer expires AND marks it correct: award 1 point (standard)
  - Incorrect answers: 0 points (unchanged)
- Add optional timed mode setting in quiz setup
  - Add "Timed Mode" toggle switch in settings accordion
  - Default: enabled (true)
  - When disabled: no timer shown, all correct answers worth 1 point
  - Setting persists in quiz URL parameters (`&timed=true|false`)
- Update quiz state and logic to track timer status
  - Add `revealedBeforeTimeout` boolean to each QuizQuestion
  - Update points calculation to consider timer status
  - Add `timedMode` boolean to QuizConfig
- Add translation keys for timed mode labels in English and Slovak
- Maintain accessibility: timer is visible and announced, keyboard users can still reveal answer anytime

## Impact

- Affected specs: `learning`
- Affected code:
  - `lib/quiz.ts` (add timed mode config, timer status tracking, bonus points logic)
  - `components/quiz/QuizSession.tsx` (add countdown timer UI, track timer state)
  - `components/quiz/QuizSetup.tsx` (add timed mode toggle in settings accordion)
  - `app/quiz/page.tsx` (read timed mode from URL parameters)
  - `messages/en.json` and `messages/sk.json` (add translation keys)
- User-facing change: Children see a countdown timer and can earn bonus points for quick answers when timed mode is enabled
- No breaking changes (additive feature, defaults to enabled)
- Performance: minimal impact (setInterval for countdown)
- Accessibility: timer visible to all users, keyboard accessible
