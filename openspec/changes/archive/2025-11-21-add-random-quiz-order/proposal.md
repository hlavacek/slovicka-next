# Proposal: Add Random Quiz Order

## Problem
Currently, the quiz presents words in sequential order as they appear in the word set. This makes the quiz predictable and allows learners to memorize the order rather than truly learning the vocabulary. For effective learning, especially during repeated practice sessions, the ability to randomize the order of questions would provide better retention and prevent pattern memorization.

## Solution
Add a toggle/checkbox in the quiz setup interface to allow users to choose whether they want words presented in sequential order (default) or randomized order. When random order is selected, the quiz will shuffle the questions at initialization time.

### Key Changes
1. **Quiz Setup UI**: Add a checkbox/toggle to enable random order in the quiz setup screen
2. **Quiz Configuration**: Extend `QuizConfig` type to include a `randomOrder` boolean flag
3. **Quiz Initialization**: Shuffle questions when `randomOrder` is true using a Fisher-Yates shuffle algorithm
4. **Translation Keys**: Add new translation strings for the random order option

### Implementation Approach
- Add `randomOrder: boolean` to `QuizConfig` type in `lib/quiz.ts`
- Create a `shuffleArray` utility function in `lib/utils.ts` for randomization
- Modify `initializeQuiz()` to shuffle questions when `randomOrder` is true
- Update `QuizSetup.tsx` to include a checkbox for random order selection
- Pass the `randomOrder` preference to `onStart` callback
- Add translation keys `randomOrderLabel` to message files

### User Experience
1. User navigates to quiz setup page
2. User selects a word set and source language (as before)
3. User optionally checks "Random order" checkbox (unchecked by default)
4. User clicks "Start Quiz"
5. Quiz presents words in random order if checkbox was checked, or sequential order if not

### Default Behavior
- Random order will be **unchecked by default** to maintain current behavior
- Sequential order remains the default to keep the experience predictable for new users
- Advanced users can opt-in to random order for more challenging practice

## Alternatives Considered
- **Always random**: Making random order the only option would break predictability for beginners who benefit from sequential learning
- **Dropdown menu**: Using a dropdown ("Sequential" / "Random") would add UI complexity when a simple checkbox suffices
- **Session-based randomization**: Randomizing on each question advance would be confusing; randomizing at quiz start is clearer

## Impact
- **User experience**: Provides more effective learning through spaced repetition without order memorization
- **Performance**: Minimal - shuffle happens once at quiz initialization with O(n) complexity
- **Accessibility**: Checkbox is keyboard accessible and properly labeled
- **Backward compatibility**: Default behavior unchanged (sequential order)
- **Testing**: Requires verification that shuffle is truly random and doesn't break quiz flow

## Dependencies
- None - extends existing quiz functionality
- Related to Quiz Setup Interface and Sequential Quiz Flow requirements

## Open Questions
- Should random order preference be saved to localStorage for the next session? → No, keep it simple; user selects each time
- Should we show any indicator during the quiz that it's in random mode? → No, not necessary
