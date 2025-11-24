# Change: Track Word Set Success Rate

## Why

Users need visibility into their learning progress for each word set to understand which vocabulary they have mastered and which sets need more practice. By tracking the most recent quiz results (specifically, how many words were answered correctly in the last quiz session) and displaying this success rate on the quiz setup screen, learners can make informed decisions about which word sets to practice next.

## What Changes

- Extend the `WordSet` type to include optional `lastQuizStats` field tracking most recent quiz performance
- Store quiz statistics (correct answers count and total questions) after each quiz completion
- Display success rate as a percentage on the right side of each word set card in the quiz setup list
- Calculate and show success rate only when statistics are available (e.g., "85%" or "Not practiced yet")
- Update statistics storage after every quiz answer is recorded (on quiz completion)
- Ensure backward compatibility for existing word sets without statistics

## Impact

- Affected specs: `learning`
- Affected code:
  - `lib/wordsets.ts` (add `lastQuizStats` field to WordSet type, update save logic)
  - `lib/quiz.ts` (add function to update word set statistics after quiz)
  - `components/quiz/QuizSetup.tsx` (display success rate on word set cards)
  - `app/quiz/page.tsx` (call statistics update on quiz completion)
  - `messages/en.json` and `messages/sk.json` (add translation keys for success rate display)
- Translation changes: Add keys for success rate labels
- User-facing change: word set cards show recent practice performance
- No breaking changes (existing word sets remain functional, stats added gradually)
