# Change: Add Search and Scrolling to Saved Word Sets List

## Why

As users accumulate saved word sets in the word set creation form, the list of saved sets can become long and difficult to navigate. Adding search functionality and a scrollable, limited-height list improves usability by helping users quickly find specific word sets to load, export, or delete.

## What Changes

- Add a search input field above the saved word sets list in the word set form
- Filter saved word sets by name based on search input (case-insensitive partial match)
- Limit the displayed saved sets list to a maximum of 3 items with vertical scrolling
- When no search term is entered, display word sets ordered by ID
- When a search term is entered, display matching word sets filtered by name
- Maintain existing load, export, and delete functionality

## Impact

- Affected specs: `learning`
- Affected code: `components/wordsets/WordSetForm.tsx`
- Affected translations: `messages/en.json`, `messages/sk.json` (add search placeholder text)
- User-facing change: improved usability for managing saved word sets
- No breaking changes
