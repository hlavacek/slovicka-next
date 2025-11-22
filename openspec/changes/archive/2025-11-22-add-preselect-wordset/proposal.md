# Change: Add Word Set Pre-selection When Returning to Quiz Setup

## Why

When users complete a quiz and click "Start New Quiz", they often want to practice the same word set again. Currently, the quiz setup page doesn't remember which word set they just used, requiring them to scroll and find it again. Pre-selecting the previously used word set and showing it at the top of the list improves the user experience by reducing repetitive navigation.

## What Changes

- When navigating from quiz summary to home, pass the word set ID as a URL search parameter (`?wordset=<id>`)
- Read the `wordset` search parameter in the home page and pass it to `QuizSetup`
- Pre-select the word set matching the parameter
- When no search is active, display the pre-selected word set at the top of the list, followed by other word sets sorted by ID
- When a search is active, use the existing search filtering behavior (ignore pre-selection for sorting)
- Clear the pre-selection if the user manually selects a different word set

## Impact

- Affected specs: `learning`
- Affected code:
  - `components/quiz/QuizSummary.tsx` (add wordset param to navigation)
  - `components/quiz/QuizSetup.tsx` (accept preselectedId, sort accordingly)
  - `app/page.tsx` (read search param, pass to QuizSetup)
- No translation changes needed
- User-facing change: improved usability when repeating quizzes
- No breaking changes
