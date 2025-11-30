# Change: Refactor WordPair to Sentence Tokens with Optional Icons

## Why

The current `WordPair` type represents simple Slovak↔English word translations (e.g., `{ sk: "dom", en: "house" }`). To make the app more visual and engaging for children, we need to support testing whole sentences where individual words can optionally have icon representations from the lucide-react icon set.

This change enables future features where children can learn vocabulary in context (sentences) with visual aids (icons), making the learning experience more interactive and accessible for young learners.

## What Changes

- Rename `WordPair` type to `TestPair` to better reflect that we're testing sentence pairs, not just single words
- Create new `SentenceToken` type representing a word with an optional lucide-react icon name: `{ text: string; icon?: string }`
- Change `TestPair` structure from `{ sk: string; en: string }` to `{ sk: SentenceToken[]; en: SentenceToken[] }`
- Update localStorage key from `"slovicka:wordsets"` to `"slovicka:testsets"` to avoid loading old incompatible data
- Modify `WordSetForm.tsx` to:
  - Split input sentences by spaces into `SentenceToken[]` arrays when saving
  - Join `SentenceToken[]` arrays back into display strings (space-separated) when loading/displaying
  - Keep the same two-input UI for now (no icon selection yet)
- Update all type references throughout the codebase (`WordPair` → `TestPair`)
- Update quiz logic to work with sentence token arrays (join tokens for display)
- Update validation, import/export, and persistence logic to handle the new structure
- **BREAKING**: Old word sets will not be loaded due to storage key change and incompatible schema

## Impact

- Affected specs: `learning`
- Affected code:
  - `lib/wordsets.ts` - Core type definitions and persistence
  - `lib/quiz.ts` - Quiz initialization and question handling
  - `components/wordsets/WordSetForm.tsx` - Form input handling
  - `__tests__/wordsets.test.ts` - Test data structures
  - Any other files importing `WordPair` or `WordSet` types

## Migration Notes

- Users with existing word sets will need to re-create them (or manually migrate JSON exports)
- Future task: Add icon picker UI to `WordSetForm.tsx`
- Future task: Render lucide-react icons in quiz display when `icon` field is present
