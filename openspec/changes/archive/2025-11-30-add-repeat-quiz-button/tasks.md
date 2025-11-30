## 1. Implementation

- [x] 1.1 Add translation keys to `messages/en.json` and `messages/sk.json`
  - [x] 1.1.1 Add `repeatQuizButton` key with appropriate English text
  - [x] 1.1.2 Add `repeatQuizButton` key with appropriate Slovak text
- [x] 1.2 Update QuizSummary component
  - [x] 1.2.1 Accept `wordSetId`, `sourceLanguage`, and `randomOrder` props
  - [x] 1.2.2 Import `useRouter` hook
  - [x] 1.2.3 Add `handleRepeatQuiz` function that navigates to `/quiz` with the same query parameters
  - [x] 1.2.4 Add "Repeat Quiz" button using the `Button` component
  - [x] 1.2.5 Position the button alongside "Start New Quiz" button
  - [x] 1.2.6 Ensure button uses translation key from next-intl
- [x] 1.3 Update quiz page to pass configuration to QuizSummary
  - [x] 1.3.1 Extract `sourceLanguage` and `randomOrder` from quiz state config
  - [x] 1.3.2 Pass all three props (`wordSetId`, `sourceLanguage`, `randomOrder`) to QuizSummary

## 2. Validation

- [x] 2.1 Test repeat quiz button functionality
  - [x] 2.1.1 Complete a quiz and verify repeat button appears on summary
  - [x] 2.1.2 Click repeat button and verify navigation to `/quiz` with correct query parameters
  - [x] 2.1.3 Verify the quiz restarts with the same word set, source language, and random order setting
- [x] 2.2 Test keyboard accessibility
  - [x] 2.2.1 Verify button is reachable via Tab key
  - [x] 2.2.2 Verify button activates with Enter or Space
- [x] 2.3 Test internationalization
  - [x] 2.3.1 Verify button label displays correctly in English
  - [x] 2.3.2 Verify button label displays correctly in Slovak

## 3. Documentation

- [x] 3.1 Verify all tasks completed
- [x] 3.2 Mark proposal ready for review
