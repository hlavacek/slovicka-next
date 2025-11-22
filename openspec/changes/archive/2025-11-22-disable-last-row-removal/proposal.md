# Change: Disable Last Row Removal in Word Set Form

## Why

When creating or editing a word set, users can remove all word pair rows, leaving the form in an invalid state with no entries. This creates a poor user experience as the validation error only appears after attempting to save. Preventing the removal of the last row ensures users always have at least one entry field available and reduces confusion.

## What Changes

- Disable the remove button (X icon) when there is only one word pair row in the form
- The button should appear visually disabled and be non-interactive when there's a single row
- Ensure accessibility by setting appropriate ARIA attributes on the disabled button
- Add visual feedback (e.g., reduced opacity) to indicate the disabled state

## Impact

- Affected specs: `learning`
- Affected code:
  - `components/wordsets/WordSetForm.tsx` (disable remove button logic)
- No translation changes needed
- User-facing change: improved form usability and clearer constraints
- No breaking changes
