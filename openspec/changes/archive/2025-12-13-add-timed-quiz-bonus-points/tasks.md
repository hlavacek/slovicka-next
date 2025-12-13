# Implementation Tasks

## Tasks

- [x] Update quiz types and logic in `lib/quiz.ts`
  - Add `timedMode: boolean` to `QuizConfig` type
  - Add `revealedBeforeTimeout: boolean` to `QuizQuestion` type
  - Add constant `BONUS_POINTS_PER_FAST_CORRECT_ANSWER = 2`
  - Update `initializeQuiz` to accept `timedMode` parameter and initialize config
  - Update `revealAnswer` to accept optional `beforeTimeout: boolean` parameter
  - Update `recordAnswer` points calculation to check `revealedBeforeTimeout` when timed mode enabled

- [x] Add countdown timer to QuizSession component
  - Add state for `secondsRemaining` (starts at 5)
  - Add state for `timerActive` (starts true when new question loads)
  - Use `useEffect` with `setInterval` to countdown from 5 to 0
  - Clear interval when revealed or when timer reaches 0
  - Update "Show Answer" button text to show countdown (e.g., "Show Answer (3)")
  - Track whether user revealed before timeout and pass to `onReveal`
  - Only show timer when `state.config.timedMode` is true

- [x] Update QuizSetup component settings accordion
  - Add "Timed Mode" toggle switch below random order setting
  - Initialize state `timedMode` to `true` (default enabled)
  - Add translation label for timed mode toggle
  - Include `timed` parameter in quiz URL when launching quiz

- [x] Update quiz page to read timed parameter
  - Read `timed` query parameter in `app/quiz/page.tsx`
  - Default to `true` if parameter missing
  - Pass `timedMode` to `initializeQuiz` function

- [x] Add translation keys
  - `messages/en.json`:
    - `timedModeLabel`: "Timed Mode (bonus points for fast answers)"
    - `showAnswerButtonWithTimer`: "Show Answer ({seconds})"
  - `messages/sk.json`:
    - `timedModeLabel`: "Časovaný režim (bonusové body za rýchle odpovede)"
    - `showAnswerButtonWithTimer`: "Zobraziť odpoveď ({seconds})"

- [x] Manual testing
  - Test with timed mode enabled: verify countdown works, bonus points awarded
  - Test with timed mode disabled: verify no timer shown, standard points only
  - Test revealing before timer expires: verify 2 points awarded for correct answer
  - Test revealing after timer expires: verify 1 point awarded for correct answer
  - Test incorrect answers: verify 0 points regardless of timer
  - Test timer resets for each new question
  - Test keyboard accessibility: can reveal answer with Enter/Space during countdown
  - Test that timer doesn't interfere with speech pronunciation

- [x] Verify integration
  - Confirm quiz summary displays correct total points with bonus
  - Confirm total points update correctly in localStorage
  - Confirm URL parameters work correctly for all three settings (source, random, timed)
  - Verify no console errors or warnings

## Validation

- [x] Timed mode toggle works in quiz setup
- [x] Countdown timer displays and counts down correctly
- [x] Bonus points awarded correctly for fast correct answers
- [x] Standard points awarded for slow correct answers
- [x] No points awarded for incorrect answers
- [x] Timer can be disabled via setting
- [x] All UI elements are keyboard accessible
- [x] No console errors or warnings
