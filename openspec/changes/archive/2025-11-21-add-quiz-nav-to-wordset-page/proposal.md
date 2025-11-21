# Change: Add Quiz Navigation to Word Set Page

## Why

Currently, the word set creation page (`/word-sets/new`) has no direct way to navigate back to the quiz page (`/`). Users who create or edit word sets must use browser navigation or manually type the URL to return to the quiz. This creates unnecessary friction in the common workflow of creating a word set and then immediately practicing with it. Adding a navigation button improves the user experience by making the flow seamless.

## What Changes

- Add a "Go to Quiz" or "Back to Quiz" button to the word set creation page header
- Update the Word Set Creation requirement to specify navigation back to the quiz page
- Add a new translation key for the navigation button text

## Impact

- Affected specs: `learning` (Word Set Creation requirement)
- Affected code:
  - `app/word-sets/new/page.tsx` (add navigation button to header)
  - `messages/sk.json` and `messages/en.json` (new translation key)
- No breaking changes
- Improves user workflow by providing clear navigation between word set creation and quiz practice
