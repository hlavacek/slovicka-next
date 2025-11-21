## 1. Create Quiz Utilities
- [x] 1.1 Create `lib/quiz.ts` with types: `QuizConfig`, `QuizState`, `QuizResult`
- [x] 1.2 Implement `initializeQuiz(wordSet, sourceLanguage)` to create initial state
- [x] 1.3 Implement `recordAnswer(state, isCorrect)` to update state with answer result
- [x] 1.4 Implement `calculateScore(results)` to compute summary statistics

## 2. Create Quiz Components
- [x] 2.1 Create `components/quiz/QuizSetup.tsx` for word set and language selection
  - [x] 2.1.1 Load available word sets using `loadWordSets()`
  - [x] 2.1.2 Display list of word sets with radio buttons or cards
  - [x] 2.1.3 Add source language selector (Slovak/English radio buttons)
  - [x] 2.1.4 Add "Start Quiz" button (disabled until selections made)
  - [x] 2.1.5 Handle empty state with link to `/word-sets/new`
- [x] 2.2 Create `components/quiz/QuizSession.tsx` for active quiz display
  - [x] 2.2.1 Display current word in source language
  - [x] 2.2.2 Show progress indicator (e.g., "Question 3 of 15")
  - [x] 2.2.3 Implement "Show Answer" button to reveal translation
  - [x] 2.2.4 Show "Mark Correct" and "Mark Incorrect" buttons after answer reveal
  - [x] 2.2.5 Handle answer marking and advance to next word
  - [x] 2.2.6 Trigger completion when last word is marked
- [x] 2.3 Create `components/quiz/QuizSummary.tsx` for results display
  - [x] 2.3.1 Display total words, correct count, incorrect count
  - [x] 2.3.2 Calculate and display percentage score
  - [x] 2.3.3 Add "Start New Quiz" button to return to setup

## 3. Create Quiz Page
- [x] 3.1 Create `app/quiz/page.tsx` as main quiz route
- [x] 3.2 Manage quiz state (setup, in-progress, completed)
- [x] 3.3 Conditionally render QuizSetup, QuizSession, or QuizSummary based on state
- [x] 3.4 Use `"use client"` directive for client-side state management
- [x] 3.5 Load word sets in useEffect to avoid hydration errors

## 4. Add Internationalization
- [x] 4.1 Add quiz translation keys to `messages/en.json`:
  - [x] 4.1.1 Setup screen: title, instructions, sourceLanguageLabel, startButton, noWordSets, createWordSetLink
  - [x] 4.1.2 Session screen: showAnswerButton, markCorrectButton, markIncorrectButton, progressLabel
  - [x] 4.1.3 Summary screen: summaryTitle, totalWords, correctCount, incorrectCount, scoreLabel, startNewQuizButton
- [x] 4.2 Add corresponding Slovak translations to `messages/sk.json`
- [x] 4.3 Use `useTranslations("Quiz")` in all quiz components

## 5. Styling and Accessibility
- [x] 5.1 Apply consistent Tailwind classes matching existing design system
- [x] 5.2 Ensure all buttons have appropriate variants (primary, outline, ghost)
- [x] 5.3 Add keyboard accessibility (Tab navigation, Enter/Space activation)
- [x] 5.4 Add clear focus states to all interactive elements
- [x] 5.5 Use semantic HTML (buttons, proper heading hierarchy)
- [x] 5.6 Add ARIA labels where needed for screen readers

## 6. Testing and Validation
- [x] 6.1 Manual test: Navigate to `/quiz` with no saved word sets
- [x] 6.2 Manual test: Create a word set, start quiz with SK→EN
- [x] 6.3 Manual test: Start quiz with EN→SK
- [x] 6.4 Manual test: Complete full quiz session and view summary
- [x] 6.5 Manual test: Keyboard-only navigation through entire flow
- [x] 6.6 Manual test: Page reload during quiz returns to setup
- [x] 6.7 Verify no hydration errors in console
- [x] 6.8 Run `npm run build` to ensure production build succeeds
- [x] 6.9 Verify no ESLint errors with `npm run lint`

## 7. Documentation
- [ ] 7.1 Add navigation link to quiz page in main layout or home page (optional, if requested)
- [ ] 7.2 Update README.md with quiz feature description (optional, if requested)
