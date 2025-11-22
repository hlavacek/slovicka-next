# Change: Add Progress Bar to Quiz Session

## Why

The current quiz interface displays progress as text (`"1 / 10"`), which is functional but not visually engaging. A visual progress bar provides immediate, intuitive feedback about quiz progress and enhances the user experience, especially for children who benefit from visual cues.

## What Changes

- Replace text-based progress indicator (`"1 / 10"`) with the existing `Progress` component from `components/ui/progress.tsx`
- Calculate and display percentage-based progress (e.g., question 3 of 10 = 30%)
- Maintain accessibility by keeping the text label alongside the visual progress bar
- Ensure the progress bar is responsive and matches the application's design system

## Impact

- Affected specs: `learning`
- Affected code: `components/quiz/QuizSession.tsx`
- User-facing change: visual improvement to quiz interface
- No breaking changes
