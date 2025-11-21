## 1. Move Quiz Functionality to Home Page

- [x] 1.1 Copy all content from `app/quiz/page.tsx` to `app/page.tsx`
- [x] 1.2 Ensure `"use client"` directive is present at the top of `app/page.tsx`
- [x] 1.3 Verify all imports are correct in the new location
- [x] 1.4 Delete `app/quiz/page.tsx`
- [x] 1.5 Remove `app/quiz/` directory (should be empty after deletion)

## 2. Testing and Validation

- [x] 2.1 Manual test: Navigate to `/` and verify quiz setup screen displays
- [x] 2.2 Manual test: Start a quiz from home page with SK→EN
- [x] 2.3 Manual test: Start a quiz from home page with EN→SK
- [x] 2.4 Manual test: Complete full quiz session from home page
- [x] 2.5 Manual test: Verify "Create word set" link works when no word sets exist
- [x] 2.6 Manual test: Keyboard navigation through quiz from home page
- [x] 2.7 Verify no hydration errors in console
- [x] 2.8 Run `npm run build` to ensure production build succeeds
- [x] 2.9 Run `npm run lint` to ensure no linting errors
- [x] 2.10 Verify `/quiz` route returns 404 (route no longer exists)

## 3. Documentation

- [x] 3.1 Update any internal documentation that references `/quiz` route (if applicable)
- [x] 3.2 Verify README.md accurately reflects home page functionality (if updated previously)
