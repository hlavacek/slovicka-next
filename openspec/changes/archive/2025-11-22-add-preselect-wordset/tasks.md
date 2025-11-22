## 1. Implementation

- [x] 1.1 Update `QuizSummary` to accept the current word set ID as a prop
- [x] 1.2 Modify navigation in `QuizSummary` to include `?wordset=<id>` parameter
- [x] 1.3 Update `app/page.tsx` to read `wordset` search parameter using `useSearchParams`
- [x] 1.4 Pass the preselected word set ID to `QuizSetup` component
- [x] 1.5 Update `QuizSetup` to accept optional `preselectedId` prop
- [x] 1.6 Initialize `selectedSetId` state with `preselectedId` if valid
- [x] 1.7 Modify sorting logic to show preselected word set first (when no search term)
- [x] 1.8 Update `app/quiz/page.tsx` to pass word set ID to `QuizSummary`

## 2. Validation

- [x] 2.1 Verify word set ID is passed in URL when clicking "Start New Quiz"
- [x] 2.2 Verify previously used word set is pre-selected on quiz setup page
- [x] 2.3 Verify pre-selected word set appears at top of list when no search is active
- [x] 2.4 Verify normal sorting applies when search term is entered
- [x] 2.5 Verify user can manually select a different word set
- [x] 2.6 Verify navigation works correctly with invalid word set ID
- [x] 2.7 Test with direct navigation to home without wordset parameter
