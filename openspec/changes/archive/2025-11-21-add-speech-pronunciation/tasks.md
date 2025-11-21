## 1. Create Speech Utility
- [x] 1.1 Create `lib/speech.ts` with a `speakWord` function
- [x] 1.2 Implement language detection logic (map 'sk' to 'sk-SK', 'en' to 'en-US')
- [x] 1.3 Add voice selection logic to find appropriate voice for the language
- [x] 1.4 Handle browser compatibility check (`window.speechSynthesis` exists)
- [x] 1.5 Add error handling for cases where speech synthesis fails silently

## 2. Integrate Speech into QuizSession
- [x] 2.1 Import `speakWord` function in `components/quiz/QuizSession.tsx`
- [x] 2.2 Add `useEffect` to trigger speech when `currentQuestion.revealed` becomes true
- [x] 2.3 Determine the target language (opposite of source language)
- [x] 2.4 Call `speakWord(targetWord, targetLanguage)` on reveal
- [x] 2.5 Ensure speech doesn't trigger multiple times for the same question

## 3. Verification
- [x] 3.1 Run `npm run build` to ensure no build errors
- [x] 3.2 Test in Chrome: verify Slovak words are spoken in Slovak
- [x] 3.3 Test in Chrome: verify English words are spoken in English
- [x] 3.4 Test that speech plays automatically when answer is revealed
- [x] 3.5 Test that marking correct/incorrect and advancing to next question works normally
- [x] 3.6 Test that quiz works in browsers without speech synthesis support

## 4. Edge Case Testing
- [x] 4.1 Test with browser that has no Slovak voice available (should fallback gracefully)
- [x] 4.2 Test rapid clicking through questions (ensure no overlapping speech)
- [x] 4.3 Test on mobile devices (iOS Safari, Android Chrome)
- [x] 4.4 Verify no console errors when speech synthesis is unavailable
