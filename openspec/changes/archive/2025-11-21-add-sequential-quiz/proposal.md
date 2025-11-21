# Change: Add Sequential Quiz Mode

## Why
Currently, users can create and manage word sets but have no way to practice or test their knowledge. A sequential quiz mode will provide an interactive learning experience where users can self-assess their vocabulary knowledge by reviewing words one at a time and marking their own performance.

## What Changes
- Add `/quiz` route with quiz page
- Implement word set selection interface
- Add source language selection (Slovak or English)
- Create sequential quiz flow showing one word at a time
- Implement self-assessment mechanism (reveal answer, mark correct/incorrect)
- Display progress tracking and final summary
- Add quiz-related translation keys to `messages/en.json` and `messages/sk.json`

## Impact
- Affected specs: `learning` (adds quiz capability)
- Affected code:
  - New page: `app/quiz/page.tsx`
  - New components: `components/quiz/QuizSetup.tsx`, `components/quiz/QuizSession.tsx`
  - New lib: `lib/quiz.ts` (quiz state management utilities)
  - Updated: `messages/en.json`, `messages/sk.json`
  - Existing: `lib/wordsets.ts` (read-only usage)
