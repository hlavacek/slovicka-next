# Change: Add Quiz Points System

## Why

To make the quiz more game-like and engaging for children, we need a points system that provides immediate feedback and rewards for correct answers. Currently, the quiz only tracks correct/incorrect responses without any point accumulation. A points-based system with visual feedback will motivate children to practice more and create a sense of achievement. Additionally, displaying total accumulated points across all quizzes on the quiz setup page with playful icons will encourage continued learning and provide a sense of progress over time.

## What Changes

- Add real-time points counter during quiz session that updates after each answer
  - Award 1 point for each correct answer
  - No points awarded for incorrect answers (0 points)
  - Display current session points prominently in the QuizSession component
  - Show points with playful, kid-friendly styling
- Track total accumulated points across all quizzes
  - Persist total points in localStorage
  - Update total points after each quiz completion
  - Display total points on quiz setup page with celebratory icons (stars, trophies, sparkles)
- Add points information to quiz summary
  - Display session points earned
  - Display updated total points
  - Use playful visual presentation consistent with the game-like theme
- Add translation keys for all points-related labels in English and Slovak
- Maintain simplicity: straightforward points for correct answers, no complex multipliers or penalties

## Impact

- Affected specs: `learning`
- Affected code:
  - `lib/quiz.ts` (add points calculation logic, persist total points)
  - `components/quiz/QuizSession.tsx` (display current session points counter)
  - `components/quiz/QuizSetup.tsx` (display total accumulated points with icons)
  - `components/quiz/QuizSummary.tsx` (show session points and updated total)
  - `messages/en.json` and `messages/sk.json` (add translation keys)
- User-facing change: Children see points accumulating as they answer questions, creating a more game-like and motivating experience
- No breaking changes (additive feature)
- Performance: minimal impact (localStorage operations)
