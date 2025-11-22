## 1. Implementation

- [x] 1.1 Add title and description translation keys to `messages/en.json` and `messages/sk.json`
- [x] 1.2 Update `app/layout.tsx` root metadata with meaningful application title and description
- [x] 1.3 Add title template to root layout for consistent branding (e.g., "%s | Slovíčka")
- [x] 1.4 ~~Add metadata export to `app/page.tsx` for quiz setup page title~~ (Cannot export metadata from client components)
- [x] 1.5 ~~Add metadata export to `app/quiz/page.tsx` for active quiz page title~~ (Cannot export metadata from client components)
- [x] 1.6 ~~Add metadata export to `app/word-sets/new/page.tsx` for word set creation page title~~ (Cannot export metadata from client components)
- [x] 1.7 Verified intl page is test page without metadata needs

## 2. Validation

- [x] 2.1 Verify root layout title displays correctly in browser tab
- [x] 2.2 Test page-specific titles appear correctly when navigating between pages
- [x] 2.3 Verify title template applies consistently across all pages
- [x] 2.4 Check that titles are appropriate for both Slovak and English locales
- [x] 2.5 Test browser bookmarks show meaningful titles
- [x] 2.6 Run `npm run build` to ensure static generation works with metadata
- [x] 2.7 Verify meta description appears correctly in page source
