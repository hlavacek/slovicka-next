# Implementation Tasks

## Tasks

- [x] Update `splitIntoSentences` function in `components/wordsets/BulkTextImport.tsx`
  - Keep existing regex to match all punctuated sentences
  - Calculate the end position of the last regex match
  - Extract remaining text after the last match
  - If remaining text is non-empty after trimming, add it as final sentence
  - Ensure single-word punctuation removal logic applies to all sentences including the final one

- [x] Manual testing
  - Test with fully punctuated text (ensure no regression)
  - Test with last sentence missing punctuation (verify new functionality)
  - Test with intermediate sentence missing punctuation (verify it doesn't break unexpectedly)
  - Test with single-word final sentence with/without punctuation
  - Test with multi-word final sentence without punctuation
  - Test edge cases: trailing whitespace, multiple spaces before final sentence, etc.

- [x] Update placeholder text in translation files (optional enhancement)
  - Consider updating `bulkImportPlaceholder` in `messages/en.json` and `messages/sk.json` to clarify last sentence punctuation is optional
  - Example: "Slovak sentence 1. Slovak sentence 2 (punctuation optional on last)\n\nEnglish sentence 1. English sentence 2 (punctuation optional on last)"

- [x] Verify no impact on tokenization
  - Confirm sentences parsed by newline are tokenized identically to those parsed by punctuation
  - Verify quiz functionality works with newline-imported word sets

## Validation

- [x] All existing bulk import scenarios continue to work
- [x] Final sentences without punctuation are correctly parsed
- [x] Intermediate sentences still require punctuation
- [x] No console errors or warnings
- [x] Whitespace handling around final sentence is robust
