## 1. Add Translation Keys
- [x] 1.1 Add new translation key `backToQuizButton` to `messages/sk.json`
- [x] 1.2 Add new translation key `backToQuizButton` to `messages/en.json`

## 2. Update Word Set Page
- [x] 2.1 Add a button/link to the header in `app/word-sets/new/page.tsx` to navigate back to `/`
- [x] 2.2 Use Next.js Link component for navigation
- [x] 2.3 Use the new translation key for the button text
- [x] 2.4 Position the button appropriately in the header (e.g., left side or as a back button)
- [x] 2.5 Apply appropriate styling (e.g., outline variant or ghost variant)

## 3. Verification
- [x] 3.1 Run `npm run build` to ensure no build errors
- [x] 3.2 Manually test that the button appears on the word set creation page
- [x] 3.3 Manually test that clicking the button navigates to `/`
- [x] 3.4 Verify the button text is properly translated in both Slovak and English
- [x] 3.5 Verify the button doesn't interfere with existing word set creation functionality

## 4. Testing
- [x] 4.1 Test keyboard accessibility (button should be tab-navigable)
- [x] 4.2 Verify visual styling is consistent with the design system
- [x] 4.3 Test the complete workflow: navigate from quiz → create word set → back to quiz
