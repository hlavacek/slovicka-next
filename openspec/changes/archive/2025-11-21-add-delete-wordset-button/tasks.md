## 1. Add Translation Keys

- [x] 1.1 Add new translation key `deleteButton` to `messages/sk.json` in the WordSets section
- [x] 1.2 Add new translation key `deleteButton` to `messages/en.json` in the WordSets section
- [x] 1.3 Add optional confirmation message key `deleteConfirmation` to both language files

## 2. Update WordSetForm Component

- [x] 2.1 Import `deleteWordSet` function from `@/lib/wordsets`
- [x] 2.2 Create `onDelete` handler function that calls `deleteWordSet(id)` and refreshes the saved sets
- [x] 2.3 Add Delete button to the actions section for each saved word set
- [x] 2.4 Position the Delete button appropriately (e.g., after Export button)
- [x] 2.5 Use appropriate styling (e.g., destructive variant with red color)
- [x] 2.6 Optionally add `window.confirm()` for deletion confirmation

## 3. Verification

- [x] 3.1 Run `npm run build` to ensure no build errors
- [x] 3.2 Manually test that the delete button appears for each saved word set
- [x] 3.3 Manually test that clicking delete removes the word set from the list
- [x] 3.4 Verify the deleted word set is removed from localStorage
- [x] 3.5 Verify the deleted word set no longer appears in quiz setup
- [x] 3.6 Verify the button text is properly translated in both Slovak and English

## 4. Testing

- [x] 4.1 Test keyboard accessibility (button should be tab-navigable)
- [x] 4.2 Verify visual styling uses destructive/warning colors
- [x] 4.3 Test confirmation dialog (if implemented)
- [x] 4.4 Test edge case: deleting the last word set
- [x] 4.5 Test that deletion doesn't affect other word sets
