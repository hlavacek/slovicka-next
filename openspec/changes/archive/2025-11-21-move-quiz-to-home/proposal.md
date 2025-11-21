# Change: Move Quiz to Home

## Why

Currently, the quiz functionality is located at `/quiz` while the home page (`/`) displays default Next.js template content. This creates a poor user experience where users must manually navigate to `/quiz` to access the core application functionality. Moving the quiz to the home page will provide immediate access to the main feature and create a cleaner, more focused entry point for the application.

## What Changes

- Move quiz page content from `app/quiz/page.tsx` to `app/page.tsx`
- Remove all default Next.js template content from the home page
- Delete the `app/quiz/` directory and its contents
- Update quiz-related spec scenarios to reference `/` instead of `/quiz`
- Ensure all existing quiz functionality remains intact (setup, session, summary)

## Impact

- Affected specs: `learning` (updates route references in Quiz Setup Interface scenario)
- Affected code:
  - Modified: `app/page.tsx` (replace content with quiz functionality)
  - Deleted: `app/quiz/page.tsx`, `app/quiz/` directory
  - No changes: `components/quiz/*`, `lib/quiz.ts` (functionality remains unchanged)
