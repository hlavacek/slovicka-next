# Tasks: Simplify Bulk Import with Separate Text Areas

## Implementation Tasks

- [x] **Update BulkTextImport component structure**
  - Replace single `bulkText` state with separate `slovakText` and `englishText` states
  - Replace single textarea with two labeled text areas (Slovak at top, English at bottom)
  - Update onChange handlers for each textarea to manage separate state
  - Remove separator detection logic from `parseBulkText` function

- [x] **Simplify parsing logic**
  - Update `parseBulkText` to accept two separate text parameters instead of checking for separator
  - Call `splitIntoSentences(slovakText)` and `splitIntoSentences(englishText)` independently
  - Remove `hasSeparator` check and related warning logic
  - Keep existing sentence parsing logic unchanged (punctuation rules, final sentence handling)

- [x] **Update translation keys**
  - Add `bulkImportSlovakLabel` translation key for Slovak textarea label
  - Add `bulkImportEnglishLabel` translation key for English textarea label
  - Update `bulkImportPlaceholder` to be split into two separate keys for each textarea
  - Remove `bulkImportWarningNoSeparator` translation key (no longer needed)
  - Keep `bulkImportWarningMismatch` and update format if needed
  - Translate all new keys to both Slovak and English

- [x] **Update warning messages**
  - Simplify warning display logic (only show mismatch warning and empty warning)
  - Ensure mismatch warning clearly shows Slovak count and English count
  - Clear warnings when either textarea is edited

- [x] **Verify existing functionality preserved**
  - Test all sentence parsing scenarios (punctuation, single words, final sentence without punctuation)
  - Test word pair pairing by index
  - Test "Update from Text" button behavior
  - Test accordion expand/collapse behavior
  - Test clearing state after successful update

- [x] **Update spec with requirement changes**
  - Modify "Bulk Text Import" requirement in `learning` spec
  - Remove two-newline separator requirement
  - Add separate textarea requirement
  - Update relevant scenarios to reflect new UI
  - Mark deprecated scenarios as REMOVED if needed

## Validation Tasks

- [x] **Run OpenSpec validation**
  - Run `openspec validate simplify-bulk-import-textareas --strict`
  - Resolve any validation errors

- [x] **Test in browser**
  - Test pasting Slovak and English text in separate areas
  - Test mismatched sentence counts
  - Test empty text areas
  - Test single-word and multi-word sentences
  - Test sentences with and without punctuation
  - Test keyboard navigation between text areas

- [x] **Verify no regressions**
  - Verify word set form still saves correctly after bulk import
  - Verify existing word sets load and display correctly
  - Verify no console errors or warnings
  - Verify translations display correctly in both languages

## Dependencies

- None - this is a self-contained UI change

## Notes

- This change improves UX without affecting stored data format
- All existing sentence parsing logic is reused
- Translation keys need careful attention for both Slovak and English
