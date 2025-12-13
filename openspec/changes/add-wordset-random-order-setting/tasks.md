# Implementation Tasks

## 1. Update Data Model and Type Definitions

- [x] 1.1 Add `allowRandomOrder?: boolean` property to `TestSet` type in `lib/wordsets.ts`
- [x] 1.2 Update `importTestSet` function to handle missing `allowRandomOrder` (default to `true`)
- [x] 1.3 Verify `exportTestSet` includes `allowRandomOrder` in JSON output
- [x] 1.4 Update `validateTestSetInput` if needed (no validation required for boolean)

## 2. Update Word Set Editor Component

- [x] 2.1 Add state for `allowRandomOrder` (default `true`) in `WordSetEditor.tsx`
- [x] 2.2 Add checkbox/switch UI control labeled "Allow random question order" in editor form
- [x] 2.3 Position control near other word set settings (after name, before entries or in a settings section)
- [x] 2.4 Update `onSave` function to include `allowRandomOrder` in the saved `TestSet` object
- [x] 2.5 Update `useEffect` that loads `editingSet` to set `allowRandomOrder` state from loaded data
- [x] 2.6 Add translation keys for the control label and helper text (if any)

## 3. Update Quiz Setup Component

- [x] 3.1 Track currently selected word set in `QuizSetup.tsx` state (needed to check `allowRandomOrder`)
- [x] 3.2 Add logic to determine if random order toggle should be disabled based on selected word set's `allowRandomOrder` property
- [x] 3.3 Add `disabled` prop to the random order `Switch` component when word set has `allowRandomOrder: false`
- [x] 3.4 Add visual indication (grayed out styling) for disabled toggle
- [x] 3.5 Add helper text or tooltip explaining why toggle is disabled (optional but recommended)
- [x] 3.6 Ensure `handleWordSetClick` respects word set's `allowRandomOrder` when building query parameters
- [x] 3.7 Add ARIA attributes for accessibility (e.g., `aria-disabled`, `aria-describedby`)
- [x] 3.8 Add translation keys for helper text explaining disabled state

## 4. Add Translations

- [x] 4.1 Add English translation for "Allow random question order" in `messages/en.json`
- [x] 4.2 Add Slovak translation for "Allow random question order" in `messages/sk.json`
- [x] 4.3 Add English helper text for disabled toggle (e.g., "This word set requires sequential order") in `messages/en.json`
- [x] 4.4 Add Slovak helper text for disabled toggle in `messages/sk.json`

## 5. Testing and Validation

- [x] 5.1 Test creating a new word set with `allowRandomOrder: true` (default)
- [x] 5.2 Test creating a new word set with `allowRandomOrder: false`
- [x] 5.3 Test editing an existing word set and changing the `allowRandomOrder` setting
- [x] 5.4 Test quiz setup with word set having `allowRandomOrder: true` (toggle should be interactive)
- [x] 5.5 Test quiz setup with word set having `allowRandomOrder: false` (toggle should be disabled)
- [x] 5.6 Test quiz launch with `allowRandomOrder: false` enforces sequential order
- [x] 5.7 Test importing old word sets without `allowRandomOrder` (should default to `true`)
- [x] 5.8 Test exporting word set includes `allowRandomOrder` property
- [x] 5.9 Test keyboard navigation and screen reader accessibility for new controls
- [x] 5.10 Verify existing word sets in localStorage continue to work (backward compatibility)

## 6. Documentation

- [x] 6.1 Update component comments/JSDoc if needed to document new prop/behavior
- [x] 6.2 Consider adding inline code comments for the `allowRandomOrder` logic

## Dependencies and Notes

- Task 3.1 must complete before 3.2-3.7 (need selected word set state)
- Task 1 should complete before tasks 2 and 3 (type definitions needed)
- All translation tasks (4.x) can be done in parallel with implementation
- Testing (5.x) should be done after all implementation tasks complete

## Estimated Complexity

- **Data Model**: Low (simple boolean property)
- **Editor UI**: Low (add one checkbox/switch)
- **Quiz Setup**: Medium (conditional disable logic, accessibility considerations)
- **Overall**: Low-Medium complexity, ~1-2 hours implementation + testing
