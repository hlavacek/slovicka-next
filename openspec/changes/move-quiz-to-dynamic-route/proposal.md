# Change: Move quiz session to dedicated /quiz route with query parameters

## Why

Currently, the quiz session (QuizSession and QuizSummary) runs on the home page (`/`), making it impossible to directly navigate to a quiz for a specific word set. This limits usability—users cannot bookmark, share, or directly access a specific quiz. Moving the quiz to a dedicated route with query parameters (e.g., `/quiz?id=<wordset-id>`) enables direct navigation while maintaining compatibility with Next.js static export (which does not support dynamic route segments like `/quiz/[id]`).

## What Changes

- Create a new page at `/quiz` that accepts a `?id=<wordset-id>` query parameter
- Move QuizSession and QuizSummary components from the home page to the new `/quiz` page
- Update home page (`/`) to only show QuizSetup; when a user starts a quiz, navigate to `/quiz?id=<wordset-id>&source=<sk|en>&random=<true|false>`
- Update navigation links and buttons throughout the app to use the new `/quiz` route when appropriate
- Handle missing or invalid `id` query parameter gracefully (e.g., redirect to `/` or show an error message)

## Impact

- Affected specs: `learning` (Quiz Setup Interface, Sequential Quiz Flow, Quiz Session State, Quiz Results Summary)
- Affected code:
  - `app/page.tsx` - remove quiz session logic, keep only QuizSetup
  - `app/quiz/page.tsx` - new file containing quiz session logic (QuizSession and QuizSummary)
  - `components/quiz/QuizSetup.tsx` - update to navigate to `/quiz?id=...` on start
  - Potentially `components/quiz/QuizSummary.tsx` - update navigation back to home or setup
