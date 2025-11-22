# Change: Add meaningful page titles

## Why

The application currently uses the default "Create Next App" title in the root layout, which appears in browser tabs and bookmarks. This generic title provides no context about the application's purpose or the current page. Meaningful, descriptive page titles improve user experience by helping users identify browser tabs, create better bookmarks, and improve SEO. For a learning application targeting children and students, clear page titles are especially important.

## What Changes

- Update root layout metadata to use application-specific title and description
- Add page-specific metadata to each route for better context:
  - Home page (`/`): Quiz setup page title
  - Quiz page (`/quiz`): Active quiz session title
  - Word sets creation (`/word-sets/new`): Word set creation page title
- Use internationalized strings for titles to support Slovak and English
- Add title template in root layout for consistent branding across pages
- Update meta description to accurately describe the application

## Impact

- Affected specs: `learning` (potentially new requirement for page metadata)
- Affected code:
  - `app/layout.tsx` - update root metadata with meaningful title and description
  - `app/page.tsx` - add page-specific metadata for quiz setup
  - `app/quiz/page.tsx` - add page-specific metadata for quiz session
  - `app/word-sets/new/page.tsx` - add page-specific metadata for word set creation
  - `messages/en.json`, `messages/sk.json` - add title and meta description translations
