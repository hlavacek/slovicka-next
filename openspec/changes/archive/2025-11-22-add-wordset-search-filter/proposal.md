# Change: Add Word Set Search and Filter to Quiz Setup

## Why

As users create more word sets, the current quiz setup displays all word sets in a single list that can become overwhelming. A search box with filtering and a scrollable, limited-height list improves usability by helping users quickly find specific word sets by name, especially when managing many vocabulary sets.

## What Changes

- Add a search input field above the word set list in the quiz setup interface
- Filter word sets by name based on search input (case-insensitive partial match)
- Limit the displayed word set list to a maximum of 3 items with vertical scrolling
- When no search term is entered, display word sets ordered by ID
- When a search term is entered, display matching word sets filtered by name
- Maintain existing selection and quiz configuration behavior

## Impact

- Affected specs: `learning`
- Affected code: `components/quiz/QuizSetup.tsx`
- Affected translations: `messages/en.json`, `messages/sk.json` (add search placeholder text)
- User-facing change: improved usability for word set selection
- No breaking changes
