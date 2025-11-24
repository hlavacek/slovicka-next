# Change: Add Colorful Success Tracker

## Why

The current success rate display is minimal and text-only (e.g., "85%"), which doesn't provide immediate visual feedback about learning progress. Children and learners benefit from colorful, engaging visual cues that make achievements feel rewarding and encourage continued practice. By adding color-coded backgrounds that fill based on success percentage, along with playful animations and icons, we can make the learning experience more motivating and help users quickly identify which word sets need more practice.

## What Changes

- Add colorful, threshold-based background fills to word set cards on the quiz setup page
  - Background fills proportionally to success rate percentage (0-100%)
  - Color thresholds: low success (<60%) uses warm red/orange, medium (60-80%) uses yellow/amber, high (>80%) uses green/blue
  - Kid-friendly, playful color palette with good contrast
- Display animated progress fill on word set cards with smooth transitions
- Add celebratory icons based on performance level (star ratings or achievement badges)
- Show colorful summary card on quiz completion page with the same visual treatment
- Use CSS transitions/animations for smooth progress bar fills
- Maintain accessibility with sufficient color contrast and text labels
- Keep existing "Not practiced" indicator for word sets without statistics

## Impact

- Affected specs: `learning`
- Affected code:
  - `components/quiz/QuizSetup.tsx` (add colorful progress background to word set cards)
  - `components/quiz/QuizSummary.tsx` (add colorful success indicator to summary)
  - `app/globals.css` or new component styles (define color thresholds, animations, and transitions)
  - `messages/en.json` and `messages/sk.json` (optional: add aria-labels for accessibility)
- User-facing change: Word set cards and quiz summary display engaging, colorful progress indicators
- No breaking changes (enhancement to existing success rate display)
- Performance: minimal impact (CSS-based animations)
