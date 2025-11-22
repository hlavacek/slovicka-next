## 1. Implementation

- [x] 1.1 Create `app/quiz/page.tsx` with client component that reads `id`, `source`, and `random` query parameters
- [x] 1.2 Move quiz session state management logic (QuizSession, QuizSummary phases) from `app/page.tsx` to `app/quiz/page.tsx`
- [x] 1.3 Load the word set by ID from localStorage in `app/quiz/page.tsx` and handle missing/invalid ID gracefully
- [x] 1.4 Update `components/quiz/QuizSetup.tsx` to navigate to `/quiz?id=<wordset-id>&source=<sk|en>&random=<true|false>` when user starts quiz
- [x] 1.5 Simplify `app/page.tsx` to only render QuizSetup (remove quiz session phases)
- [x] 1.6 Update `components/quiz/QuizSummary.tsx` to navigate back to `/` (home/setup) when user clicks "Start New Quiz"

## 2. Validation

- [x] 2.1 Manually test starting a quiz from home page and verify navigation to `/quiz?id=...`
- [x] 2.2 Test directly navigating to `/quiz?id=<valid-id>` and verify quiz loads correctly
- [x] 2.3 Test navigating to `/quiz` without `id` parameter and verify graceful error handling
- [x] 2.4 Test navigating to `/quiz?id=<invalid-id>` and verify graceful error handling
- [x] 2.5 Test completing a quiz and returning to home page from summary
- [x] 2.6 Test random order and source language options persist correctly via query parameters
- [x] 2.7 Run `npm run build` and verify static export works without errors
