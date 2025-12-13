# Implementation Tasks

## 1. Add translation keys for bulk import UI

- [x] Add English translations to `messages/en.json`:
  - `bulkImportTitle` (e.g., "Bulk Import from Text")
  - `bulkImportPlaceholder` (example format with Slovak and English sentences)
  - `bulkImportUpdateButton` (e.g., "Update from Text")
  - `bulkImportWarningMismatch` (e.g., "Warning: Sentence counts don't match")
  - `bulkImportWarningNoSeparator` (e.g., "Expected format: Slovak sentences, two newlines, then English sentences")
  - `bulkImportWarningEmpty` (e.g., "No text to import")
- [x] Add Slovak translations to `messages/sk.json` for the same keys

## 2. Create BulkTextImport component

- [x] Create new file `components/wordsets/BulkTextImport.tsx`
- [x] Import necessary dependencies:
  - `useTranslations` from next-intl
  - Accordion components from `@/components/ui/accordion`
  - Button from `@/components/ui/button`
- [x] Define component props:
  - `onUpdate: (rows: Array<{ sk: string; en: string }>) => void` - callback to update parent rows
- [x] Implement state management:
  - `bulkText: string` - textarea content
  - `warning: string | null` - validation warning message
- [x] Implement textarea with:
  - Multi-line input (rows=6 or similar)
  - Placeholder with translation key
  - Full width styling consistent with existing inputs
- [x] Implement Update button with click handler
- [x] Wrap in Accordion component (collapsed by default)

## 3. Implement bulk text parsing logic

- [x] Create parsing function `parseBulkText(text: string)` in BulkTextImport component:
  - Check for two consecutive newlines (`\n\n`)
  - Split text into Slovak and English sections
  - Split each section by sentence separators (`.`, `!`, `?`)
  - Trim whitespace from each sentence
  - Filter out empty sentences
  - Return object with: `{ slovak: string[], english: string[], warning: string | null }`
- [x] Handle missing separator case:
  - Set warning message
  - Treat entire text as Slovak section
  - Return empty English array
- [x] Handle mismatched counts:
  - Set warning message indicating count difference
  - Return both arrays (caller will handle pairing)

## 4. Implement row pairing and update logic

- [x] In BulkTextImport's update handler:
  - Call `parseBulkText(bulkText)`
  - Create rows array by pairing sentences:
    - Loop through max(slovak.length, english.length)
    - Create row with SK sentence at index i (or empty string)
    - Create row with EN sentence at index i (or empty string)
  - Call `onUpdate(rows)` callback with paired rows
  - Set warning state if present
- [x] Handle empty text case:
  - Show warning or no-op
  - Don't call onUpdate callback

## 5. Integrate BulkTextImport into WordSetEditor

- [x] Import BulkTextImport component in WordSetEditor
- [x] Add BulkTextImport below the row editor section (after the entries grid, before error/save buttons)
- [x] Implement `handleBulkUpdate` callback:
  - Accept rows array from BulkTextImport
  - Map to internal Row type with generated IDs
  - Replace `rows` state with new rows using `setRows()`
- [x] Pass callback as `onUpdate` prop to BulkTextImport

## 6. Style and accessibility

- [x] Ensure textarea has proper focus styles (consistent with existing inputs)
- [x] Verify Accordion keyboard navigation works correctly
- [x] Add appropriate ARIA labels if needed
- [x] Test color contrast for warning messages
- [x] Ensure Update button is keyboard accessible

## 7. Testing

- [x] Manual test: Import matching sentence counts
- [x] Manual test: Import with more Slovak than English sentences
- [x] Manual test: Import with more English than Slovak sentences
- [x] Manual test: Various punctuation (`.`, `!`, `?`)
- [x] Manual test: Missing two-newline separator
- [x] Manual test: Empty textarea
- [x] Manual test: Extra whitespace handling
- [x] Manual test: Replacing existing rows
- [x] Manual test: Keyboard navigation through accordion
- [x] Verify tokenization compatibility (sentences split by spaces correctly)
- [x] Test with Slovak diacritics (č, š, ž, etc.)

## 8. Documentation and validation

- [x] Update component JSDoc if needed
- [x] Run `openspec validate add-bulk-text-import --strict`
- [x] Fix any validation errors
- [x] Verify all tasks are complete
- [x] Mark all tasks with `[x]` in this file

## Dependencies

- Task 1 must complete before Task 2 (translations needed for UI)
- Task 2 and 3 can be done in parallel
- Task 4 depends on Task 3 (needs parsing function)
- Task 5 depends on Tasks 2 and 4 (needs component and logic)
- Task 6 can be done alongside Task 5
- Task 7 depends on Task 5 (needs integrated feature)
- Task 8 is final validation step
