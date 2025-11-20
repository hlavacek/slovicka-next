# Change: add-word-set-creator

## Why
Teachers and students need to create custom vocabulary word sets for practicing Slovak ↔ English translations. Currently there is no way to add or manage custom word pairs, limiting the app to pre-defined vocabulary only.

## What Changes
- Add a new `/word-sets/new` page with a form UI for creating custom word sets
- Add `WordSetForm` component for entering Slovak ↔ English word pairs
- Add storage utilities in `lib/wordsets.ts` for persisting sets to localStorage
- Add import/export functionality (JSON format) for sharing word sets
- Add basic validation for word pair entries

## Impact
- Affected specs: `learning` (new capability)
- Affected code: `app/word-sets/new/`, `components/wordsets/`, `lib/`
- No breaking changes - this is additive functionality
