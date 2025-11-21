## 1. Add Shuffle Utility

- [x] 1.1 Add `shuffleArray<T>(array: T[]): T[]` function to `lib/utils.ts`
- [x] 1.2 Implement Fisher-Yates shuffle algorithm for proper randomization
- [x] 1.3 Ensure function returns a new array without mutating the original

## 2. Update Quiz Types and Logic

- [x] 2.1 Add `randomOrder: boolean` to `QuizConfig` type in `lib/quiz.ts`
- [x] 2.2 Update `initializeQuiz()` signature to accept `randomOrder` parameter
- [x] 2.3 Conditionally shuffle questions array when `randomOrder` is true
- [x] 2.4 Ensure shuffled questions maintain proper index, sourceWord, and targetWord mappings

## 3. Add Translation Keys

- [x] 3.1 Add `randomOrderLabel` key to `messages/sk.json` in Quiz section
- [x] 3.2 Add `randomOrderLabel` key to `messages/en.json` in Quiz section

## 4. Update Quiz Setup Component

- [x] 4.1 Add `randomOrder` state (boolean, default false) to `QuizSetup.tsx`
- [x] 4.2 Add checkbox UI element for random order selection
- [x] 4.3 Update `onStart` callback to pass `randomOrder` parameter
- [x] 4.4 Position checkbox appropriately in the form (after source language selection)
- [x] 4.5 Ensure checkbox is properly labeled and keyboard accessible

## 5. Update Quiz Initialization in App

- [x] 5.1 Update the `onStart` handler in main quiz page to accept `randomOrder` parameter
- [x] 5.2 Pass `randomOrder` to `initializeQuiz()` function call

## 6. Verification

- [x] 6.1 Run `npm run build` to ensure no build errors
- [x] 6.2 Test that unchecked checkbox produces sequential order (default behavior)
- [x] 6.3 Test that checked checkbox produces randomized order
- [x] 6.4 Verify questions are truly randomized (not just reversed or rotated)
- [x] 6.5 Verify quiz flow works normally with both settings
- [x] 6.6 Test that translations display correctly in Slovak and English

## 7. Edge Case Testing

- [x] 7.1 Test with a word set of only 1 word (should work without errors)
- [x] 7.2 Test with a large word set (50+ words) to verify shuffle performance
- [x] 7.3 Verify checkbox is keyboard accessible (can toggle with Space/Enter)
- [x] 7.4 Test multiple quiz sessions to ensure each randomization is independent
