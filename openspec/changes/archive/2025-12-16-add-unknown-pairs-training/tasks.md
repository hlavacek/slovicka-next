# Implementation Tasks

## Phase 1: Data Model Extension

- [x] **Extend TestPair type with knowledgeLevel field**
  - Add optional `knowledgeLevel?: 'known' | 'unknown'` to TestPair type in `lib/wordsets.ts`
  - Update type documentation
  - Verify TypeScript compilation succeeds

- [x] **Update importTestSet to handle knowledgeLevel**
  - Preserve knowledgeLevel field when parsing imported JSON
  - Validate knowledgeLevel values ('known' | 'unknown' | undefined)
  - Normalize invalid values to undefined
  - Test importing word sets with and without knowledge levels

- [x] **Update exportTestSet to include knowledgeLevel**
  - Ensure knowledgeLevel is serialized in JSON output
  - Test exporting word sets with knowledge levels
  - Verify re-import works correctly

## Phase 2: Quiz State and Knowledge Tracking

- [x] **Add function to identify unknown pairs from quiz state**
  - Create `getUnknownPairIndices(state: QuizState): number[]` in `lib/quiz.ts`
  - Filter questions where `correct === false`
  - Map to original test pair indices
  - Unit test: various correctness patterns

- [x] **Add function to update knowledge levels**
  - Create `updateKnowledgeLevels(state: QuizState): TestSet` in `lib/quiz.ts`
  - Map quiz results to test pair indices
  - Set knowledgeLevel to 'known' for correct answers
  - Set knowledgeLevel to 'unknown' for incorrect answers
  - Preserve knowledge level for pairs not in quiz
  - Return updated TestSet

- [x] **Integrate knowledge level update into quiz completion**
  - Call `updateKnowledgeLevels()` when quiz completes
  - Update in `handleMarkAnswer()` in `app/quiz/page.tsx`
  - Save updated TestSet via `saveTestSet()`
  - Ensure atomic update with lastQuizStats

- [x] **Add filter parameter support to quiz initialization**
  - Extend `initializeQuiz()` to accept optional `filter?: 'known' | 'unknown'`
  - When filter provided, filter `testSet.entries` before creating questions
  - Filter entries where `knowledgeLevel === filter`
  - Handle empty filter result (return null or empty state)

## Phase 3: URL Parameter Handling

- [x] **Add filter parameter to quiz page URL parsing**
  - Read `filter` query parameter in `app/quiz/page.tsx`
  - Validate filter value ('known' | 'unknown' | undefined)
  - Pass filter to `initializeQuiz()`
  - Redirect to home if filtered result is empty

- [x] **Update quiz page to handle empty filtered results**
  - Check if filtered entries array is empty
  - Redirect to `/` if no pairs match filter
  - Show appropriate loading state during check

## Phase 4: Quiz Summary UI Updates

- [x] **Calculate unknown pairs count in QuizSummary**
  - Accept `quizState: QuizState` prop in addition to `result: QuizResult`
  - Calculate unknown pair count using `getUnknownPairIndices()`
  - Pass count to UI rendering logic

- [x] **Add Unknown Pairs count display**
  - Add new section in `components/quiz/QuizSummary.tsx`
  - Show "Unknown Pairs: X" when count > 0
  - Use consistent styling with existing summary sections
  - Position above action buttons

- [x] **Add Train Unknown Pairs button**
  - Render button only when unknown pairs count > 0
  - Button text: "Train Unknown Pairs (X)" with count
  - Add icon (e.g., Target, BookOpen, or Repeat)
  - Style distinctly from other action buttons

- [x] **Implement Train Unknown Pairs navigation**
  - Add `onTrainUnknown` callback prop to QuizSummary
  - In parent component (`app/quiz/page.tsx`), implement handler
  - Navigate to `/quiz?id=<id>&source=<source>&random=false&timed=<timed>&filter=unknown`
  - Use router.push with query params

## Phase 5: Internationalization

- [x] **Add English translations**
  - Add to `messages/en.json`:
    - `"unknownPairsCount": "Unknown Pairs"`
    - `"trainUnknownPairsButton": "Train Unknown Pairs ({count})"`
    - `"trainingSummaryTitle": "Training Complete"`
    - `"noUnknownPairs": "Great! You know all the pairs."`

- [x] **Add Slovak translations**
  - Add to `messages/sk.json`:
    - `"unknownPairsCount": "Neznáme páry"`
    - `"trainUnknownPairsButton": "Precvičiť neznáme páry ({count})"`
    - `"trainingSummaryTitle": "Tréning dokončený"`
    - `"noUnknownPairs": "Výborne! Poznáš všetky páry."`

- [x] **Update QuizSummary to use translations**
  - Use `useTranslations('Quiz')` hook
  - Replace hardcoded strings with translation keys
  - Use parameterized translation for count: `t('trainUnknownPairsButton', { count })`

## Phase 6: Testing and Validation

- [x] **Write unit tests for knowledge level functions**
  - Test `getUnknownPairIndices()` with various quiz states
  - Test `updateKnowledgeLevels()` with mixed results
  - Test filter logic in `initializeQuiz()`
  - Test backward compatibility with undefined knowledge levels

- [x] **Test quiz completion flow**
  - Complete quiz with all correct → verify all marked 'known'
  - Complete quiz with all incorrect → verify all marked 'unknown'
  - Complete quiz with mixed results → verify correct assignments
  - Verify localStorage persistence

- [x] **Test training quiz flow end-to-end**
  - Complete quiz with some incorrect answers
  - Verify unknown pairs count in summary
  - Click "Train Unknown Pairs" button
  - Verify navigation to correct URL with filter parameter
  - Verify only unknown pairs appear in training quiz
  - Complete training quiz
  - Verify updated knowledge levels

- [x] **Test edge cases**
  - All pairs correct (no training button)
  - All pairs incorrect (training = full quiz)
  - Empty filtered result (redirect to home)
  - Word set with undefined knowledge levels
  - Import/export with knowledge levels
  - Page reload maintains knowledge levels

- [x] **Manual testing checklist**
  - Keyboard navigation of new button
  - Screen reader announces unknown pairs count
  - Responsive layout on mobile
  - Translation keys display correctly in Slovak and English
  - Visual styling matches existing components

## Phase 7: Documentation and Cleanup

- [x] **Update code comments**
  - Document knowledgeLevel field in TestPair type
  - Document filter parameter in initializeQuiz()
  - Add JSDoc comments for new functions

- [x] **Verify OpenSpec validation**
  - Run `openspec validate add-unknown-pairs-training --strict`
  - Resolve any validation errors
  - Ensure all scenarios are testable

- [x] **Update README if needed**
  - Document training feature in user guide section (if exists)
  - Update feature list

## Dependencies and Sequencing

**Critical Path**:

1. Phase 1 must complete before Phase 2 (data model required for logic)
2. Phase 2 must complete before Phase 3 (functions needed for URL handling)
3. Phase 3 must complete before Phase 4 (URL params needed for navigation)
4. Phase 5 can run in parallel with Phase 3-4
5. Phase 6 follows all implementation phases
6. Phase 7 is final cleanup after testing

**Parallelizable**:

- Phase 5 (i18n) can start as soon as UI components are known
- Unit tests (Phase 6) can be written alongside implementation

## Validation

Each task should be verified by:

1. TypeScript compilation success
2. ESLint passes with no errors
3. Relevant unit tests pass (create if needed)
4. Manual testing in browser
5. OpenSpec validation passes

Mark each task as complete only after verification.
