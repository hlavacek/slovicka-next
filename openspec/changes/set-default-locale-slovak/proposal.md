# Change: Set Default UI Language to Slovak

## Why
The application is designed for Slovak school children learning English vocabulary. Currently, the user interface defaults to English (`locale = 'en'` in `i18n/request.ts`), which creates unnecessary friction for the primary user audience. Setting the default locale to Slovak aligns the interface language with the target users' native language, improving accessibility and user experience.

## What Changes
- Change the hardcoded default locale from `'en'` to `'sk'` in `i18n/request.ts`
- Update the `<html lang>` attribute in `app/layout.tsx` to reflect Slovak as the default language
- Update the Internationalization requirement in the learning spec to specify Slovak as the default locale

## Impact
- Affected specs: `learning` (Internationalization requirement)
- Affected code:
  - `i18n/request.ts` (locale constant)
  - `app/layout.tsx` (html lang attribute)
- No breaking changes
- Users will see Slovak UI text by default (existing Slovak translations in `messages/sk.json` are already complete)
