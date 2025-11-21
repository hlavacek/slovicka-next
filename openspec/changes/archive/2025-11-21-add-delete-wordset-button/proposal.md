# Change: Add Delete Word Set Button

## Why
Currently, the word set form displays saved word sets with Load and Export buttons, but provides no way to delete unwanted word sets. Users who create word sets by mistake or no longer need certain word sets have no UI option to remove them from localStorage. While the backend `deleteWordSet` function exists in `lib/wordsets.ts`, it's not exposed in the UI. Adding a Delete button allows users to manage their word sets more effectively.

## What Changes
- Add a Delete button to each saved word set in the WordSetForm component
- Wire the button to call the existing `deleteWordSet` function from `lib/wordsets.ts`
- Update the Word Set Persistence requirement to include deletion capability
- Add a new translation key for the delete button text
- Optionally add confirmation before deletion to prevent accidental removal

## Impact
- Affected specs: `learning` (Word Set Persistence requirement)
- Affected code:
  - `components/wordsets/WordSetForm.tsx` (add delete button and handler)
  - `messages/sk.json` and `messages/en.json` (new translation key)
- No breaking changes
- Improves user control over their word set collection
