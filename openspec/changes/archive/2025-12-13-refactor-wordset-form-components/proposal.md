# Change: Refactor WordSetForm into Multiple Components

## Why

The `WordSetForm.tsx` component has grown large (260+ lines) and handles multiple responsibilities: search/filter logic, word set editing (including row management, validation, save/export/import), and saved word sets display. This violates the single responsibility principle and makes the component difficult to test and maintain. The component's state management is also tightly coupled, making it harder to understand which state is needed for which feature.

## What Changes

Refactor `WordSetForm.tsx` into three focused components following the established pattern seen in quiz components (`QuizSetup`, `QuizSession`, `QuizSummary`):

- **WordSetSearch** - Manages search input and filtered word set list display with all search-related state (searchTerm, filteredSavedSets)
- **WordSetEditor** - Manages the editing form for current word set with all editing-related state (name, rows, error, editingSetId)
- **WordSetForm** (parent) - Coordinates communication between search and editor, maintaining only necessary shared state (savedSets, fileInputRef)

Key structural changes:

- Extract search UI and logic into `WordSetSearch.tsx`
- Extract editing UI and logic (name, rows, validation, save) into `WordSetEditor.tsx`
- Keep parent `WordSetForm.tsx` as coordinator with minimal state
- Pass callback props for communication (onLoadSet, onSaveComplete, onDeleteComplete)
- Maintain existing functionality without behavioral changes

## Impact

- Affected specs: `learning` (MODIFIED "Word Set Creation" and "Word Set Persistence" requirements)
- Affected code:
  - `components/wordsets/WordSetForm.tsx` - Refactored into parent component
  - `components/wordsets/WordSetSearch.tsx` - New component
  - `components/wordsets/WordSetEditor.tsx` - New component
  - `app/word-sets/new/page.tsx` - May need to re-export WordSetForm if imports change
- No breaking changes to public API or data structures
- No changes to translation keys or user-facing behavior
