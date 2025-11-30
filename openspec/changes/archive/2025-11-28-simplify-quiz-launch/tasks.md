## 1. Implementation

- [x] 1.1 Remove selectedSetId state variable (no longer needed for intermediate selection)
- [x] 1.2 Remove "Start Quiz" button from the button wrapper
- [x] 1.3 Update word set card onClick handler to navigate immediately using current sourceLanguage and randomOrder state
- [x] 1.4 Remove canStart validation logic
- [x] 1.5 Remove handleStart function
- [x] 1.6 Remove unused translation key "startButton" from messages/en.json and messages/sk.json
- [x] 1.7 Update word set card styling to remove selected state (border-zinc-900 bg-zinc-50)
- [x] 1.8 Convert word set card from label+radio to button or clickable div
- [x] 1.9 Remove radio input from word set cards
- [x] 1.10 Keep settings accordion (source language and random order) functional
- [x] 1.11 Ensure "Create New Word Set" link remains accessible

## 2. Validation

- [x] 2.1 Verify clicking a word set card immediately navigates to quiz
- [x] 2.2 Verify quiz launches with current accordion settings (source language and random order)
- [x] 2.3 Verify settings accordion is still displayed and functional
- [x] 2.4 Verify changing source language in accordion affects next quiz launch
- [x] 2.5 Verify changing random order in accordion affects next quiz launch
- [x] 2.6 Verify no "Start Quiz" button is displayed
- [x] 2.7 Verify word set cards are clearly clickable (hover states, cursor pointer)
- [x] 2.8 Verify keyboard navigation allows selecting word sets with Enter/Space
- [x] 2.9 Verify screen readers announce word set cards as clickable/actionable
- [x] 2.10 Verify "Create New Word Set" link is still accessible and functional
- [x] 2.11 Verify search functionality continues to work correctly
- [x] 2.12 Verify success rate indicators remain visible on word set cards
