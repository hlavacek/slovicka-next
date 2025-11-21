# Change: Add Create Word Set Link to Quiz Setup

## Why
Currently, the quiz setup page only shows a link to create word sets when no word sets exist. Users who have word sets but want to add more must navigate away from the quiz setup or remember the URL. Providing a persistent link to create word sets improves discoverability and makes the workflow more convenient for users who want to expand their vocabulary collection while preparing to practice.

## What Changes
- Add a "Create New Word Set" link to the quiz setup interface that appears even when word sets already exist
- Update the Quiz Setup Interface requirement to specify this link should always be visible
- Add a new translation key for the persistent create link text

## Impact
- Affected specs: `learning` (Quiz Setup Interface requirement)
- Affected code:
  - `components/quiz/QuizSetup.tsx` (add link when wordSets.length > 0)
  - `messages/sk.json` and `messages/en.json` (new translation key)
- No breaking changes
- Improves user experience by making word set creation more accessible
