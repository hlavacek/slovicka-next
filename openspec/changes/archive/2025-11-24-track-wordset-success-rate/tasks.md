## 1. Implementation

- [x] 1.1 Add `lastQuizStats` field to WordSet type in lib/wordsets.ts (optional field with correct/total counts)
- [x] 1.2 Create function to update word set statistics after quiz completion in lib/quiz.ts
- [x] 1.3 Add translation keys for success rate display (e.g., "successRate", "notPracticed") to messages/en.json and messages/sk.json
- [x] 1.4 Update QuizSetup component to calculate and display success rate percentage on word set cards
- [x] 1.5 Call statistics update function in app/quiz/page.tsx when quiz is completed
- [x] 1.6 Ensure success rate displays on the right side of word set card
- [x] 1.7 Handle cases where no statistics exist (show "Not practiced yet" or similar)
- [ ] 1.8 Verify statistics persist correctly in localStorage

## 2. Validation

- [ ] 2.1 Verify WordSet type accepts lastQuizStats field
- [ ] 2.2 Verify quiz completion updates word set statistics in storage
- [ ] 2.3 Verify success rate displays correctly on quiz setup page (e.g., "85%")
- [ ] 2.4 Verify "not practiced" message displays for word sets without statistics
- [ ] 2.5 Verify success rate updates after completing a quiz
- [ ] 2.6 Verify existing word sets without statistics continue to work
- [ ] 2.7 Verify success rate calculation is correct (correct/total \* 100)
- [ ] 2.8 Verify success rate position on card (right side)
- [ ] 2.9 Test with multiple word sets having different success rates
- [ ] 2.10 Verify statistics survive page refresh (localStorage persistence)
