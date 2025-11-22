# Fix word set update behavior

## Why

Currently, when a user loads an existing word set into the form using the "Load" button, the form populates with the word set's data but does not track the original word set's ID. When the user modifies the loaded word set and clicks "Save", the system creates a new word set with a new ID instead of updating the existing one. This results in duplicate word sets accumulating in localStorage, confusing users who expect their edits to update the loaded word set.

The root cause is that the `loadSet` function only copies the name and entries into the form state but discards the word set's ID. The `onSave` function always generates a new ID (`ws-${Date.now()}`), treating every save as a new word set creation.

## What Changes

- Track the currently loaded word set ID in component state (`editingSetId`)
- When `loadSet` is called, store the word set's ID alongside the name and entries
- Modify `onSave` to check if `editingSetId` exists:
  - If editing an existing set, preserve the original ID and update `createdAt` to current timestamp
  - If creating a new set, generate a new ID as before
- Clear `editingSetId` when the form is reset (after save or manual clear action)
- Update the word set form UI to indicate when editing vs. creating a new set (optional visual feedback)

## Impact

- **Affected specs**: `learning` (Word Set Creation requirement - modify scenario for updating existing sets)
- **Affected code**:
  - `components/wordsets/WordSetForm.tsx` - add `editingSetId` state, update `loadSet` and `onSave` logic
- **User experience**: Users can now edit existing word sets without creating duplicates; form behavior becomes more intuitive
- **Data migration**: None required - existing word sets remain valid
- **Breaking changes**: None - this is a bug fix that improves existing functionality
