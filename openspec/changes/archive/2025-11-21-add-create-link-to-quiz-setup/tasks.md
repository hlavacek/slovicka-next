## 1. Add Translation Keys
- [x] 1.1 Add new translation key `createNewWordSetLink` to `messages/sk.json`
- [x] 1.2 Add new translation key `createNewWordSetLink` to `messages/en.json`

## 2. Update QuizSetup Component
- [x] 2.1 Add link to create word sets in the main quiz setup UI (when wordSets.length > 0)
- [x] 2.2 Position the link appropriately (e.g., below the Start button or as a secondary action)
- [x] 2.3 Use the new translation key for the link text
- [x] 2.4 Ensure the link uses Next.js Link component for navigation

## 3. Verification
- [x] 3.1 Run `npm run build` to ensure no build errors
- [x] 3.2 Manually test that the link appears when word sets exist
- [x] 3.3 Manually test that the link navigates to `/word-sets/new`
- [x] 3.4 Verify the link text is properly translated in both Slovak and English
- [x] 3.5 Verify the existing "no word sets" scenario still works correctly

## 4. Testing
- [x] 4.1 Test keyboard accessibility (link should be tab-navigable)
- [x] 4.2 Verify visual styling is consistent with the design system
