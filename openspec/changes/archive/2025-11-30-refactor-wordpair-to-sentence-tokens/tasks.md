## 1. Type System Updates

- [ ] 1.1 Define `SentenceToken` type in `lib/wordsets.ts`: `{ text: string; icon?: string }`
- [ ] 1.2 Rename `WordPair` type to `TestPair` with structure `{ sk: SentenceToken[]; en: SentenceToken[] }`
- [ ] 1.3 Rename `WordSet` type to `TestSet`
- [ ] 1.4 Update `STORAGE_KEY` constant from `"slovicka:wordsets"` to `"slovicka:testsets"`

## 2. Core Library Updates

- [ ] 2.1 Update `validateWordSetInput` to validate token arrays (check each token has non-empty `text`)
- [ ] 2.2 Update `importWordSet` to handle token array parsing and validation
- [ ] 2.3 Update `exportWordSet` to properly serialize token arrays
- [ ] 2.4 Update all function signatures to use `TestSet` instead of `WordSet`

## 3. Quiz Logic Updates

- [ ] 3.1 Update `lib/quiz.ts` type imports (`WordPair` → `TestPair`, `WordSet` → `TestSet`)
- [ ] 3.2 Modify `initializeQuiz` to join token arrays into display strings: `tokens.map(t => t.text).join(' ')`
- [ ] 3.3 Update `QuizQuestion` to work with joined sentence strings
- [ ] 3.4 Verify `updateWordSetStats` works with new `TestSet` type

## 4. Form Component Updates

- [ ] 4.1 Update `WordSetForm.tsx` type imports (`WordPair` → `TestPair`, `WordSet` → `TestSet`)
- [ ] 4.2 Modify `Row` type to match new `TestPair` structure with token arrays
- [ ] 4.3 Update `updateRow` to handle sentence strings (user still edits plain text)
- [ ] 4.4 Modify `onSave` to split sentences into token arrays:
  - Split by spaces: `text.trim().split(/\s+/)`
  - Filter empty tokens
  - Map to `{ text: word }` objects (icon undefined by default)
- [ ] 4.5 Modify `loadSet` to join token arrays into display strings for input fields
- [ ] 4.6 Update internal state handling to work with token arrays

## 5. Test Updates

- [ ] 5.1 Update `__tests__/wordsets.test.ts` to use `TestPair` type
- [ ] 5.2 Convert test data to token array format: `[{ text: "word" }]`
- [ ] 5.3 Add test for sentence tokenization: verify "I like books" → `[{ text: "I" }, { text: "like" }, { text: "books" }]`
- [ ] 5.4 Add test for token joining: verify tokens → "I like books"
- [ ] 5.5 Add test for filtering empty tokens (multiple spaces)
- [ ] 5.6 Add test for single-word entries
- [ ] 5.7 Verify all existing tests pass with new structure

## 6. Type Reference Updates

- [ ] 6.1 Search codebase for `WordPair` and replace with `TestPair`: `grep -r "WordPair" --include="*.ts" --include="*.tsx"`
- [ ] 6.2 Search codebase for `WordSet` and replace with `TestSet`
- [ ] 6.3 Verify no import errors with TypeScript: `npx tsc --noEmit`

## 7. Validation and Testing

- [ ] 7.1 Run OpenSpec validation: `npx openspec validate refactor-wordpair-to-sentence-tokens --strict`
- [ ] 7.2 Manual test: Create new test set with multi-word sentence
- [ ] 7.3 Manual test: Verify sentence is split into tokens on save
- [ ] 7.4 Manual test: Load saved test set, verify sentence displays correctly
- [ ] 7.5 Manual test: Start quiz, verify sentences display correctly (joined by spaces)
- [ ] 7.6 Manual test: Complete quiz, verify statistics save correctly
- [ ] 7.7 Manual test: Export test set, verify JSON contains token arrays
- [ ] 7.8 Manual test: Import exported test set, verify it loads correctly
- [ ] 7.9 Verify old word sets are not loaded (empty list on first load)
- [ ] 7.10 Run Jest tests: `npm test`
- [ ] 7.11 Run ESLint: `npm run lint`

## 8. Documentation

- [ ] 8.1 Update any inline comments referencing "word pairs" to "test pairs" or "sentence pairs"
- [ ] 8.2 Add JSDoc comments explaining token array structure where helpful

## Notes

- **Dependencies**: Tasks should be completed in order (types → core logic → UI → tests)
- **Parallel work**: Tasks within sections 6-7 can be done in parallel after section 5 completes
- **Validation**: Each section should be validated before proceeding to the next
- **Breaking change**: Users will lose existing word sets; this is expected and documented
