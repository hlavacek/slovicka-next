# Change: Add Quiz Settings Accordion

## Why

The quiz setup page currently displays all settings (source language and random order) directly in the main layout, which takes up visual space and may distract from the primary action of selecting a word set. By collapsing these settings into an accordion section titled "Settings", the interface becomes cleaner and more focused on word set selection, while still keeping settings easily accessible for users who want to customize their quiz experience.

Additionally, setting random order as the default improves the testing and practice experience by ensuring variety without requiring users to toggle a setting.

## What Changes

- Wrap the source language selection (radio buttons) and random order toggle (switch) in an Accordion component
- Use "Settings" as the accordion title (internationalized)
- The accordion starts collapsed by default to simplify the initial UI
- Change the default value of `randomOrder` from `false` to `true` for better testing experience
- Ensure accordion is keyboard accessible and properly labeled for screen readers
- Maintain all existing functionality within the collapsed section

## Impact

- Affected specs: `learning`
- Affected code:
  - `components/quiz/QuizSetup.tsx` (add Accordion wrapper, change default randomOrder)
  - `messages/en.json` and `messages/sk.json` (add "settingsTitle" translation key)
- Translation changes: Add "settingsTitle" key
- User-facing change: cleaner UI with collapsible settings, random order enabled by default
- No breaking changes (all existing functionality preserved)
