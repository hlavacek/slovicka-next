# Design: Refactor WordPair to Sentence Tokens

## Context

The app currently stores vocabulary as simple word pairs. We need to evolve this to support sentences with optional icons for individual words, making the learning experience more visual and contextual for children.

## Goals

- Enable sentence-based testing instead of single-word testing
- Support optional lucide-react icon associations per word
- Maintain backward-compatible UI for now (defer icon selection to future work)
- Keep the implementation simple and focused on data structure changes

## Non-Goals

- Icon picker UI implementation (future task)
- Icon rendering in quiz display (future task)
- Migration tool for old word sets (acceptable to lose old data via storage key change)
- Multi-word icon support or complex sentence parsing

## Decisions

### Type Structure

**Decision**: Use `SentenceToken[]` arrays instead of plain strings

```typescript
export type SentenceToken = {
  text: string; // The word text
  icon?: string; // Optional lucide-react icon name (e.g., "Book", "Home")
};

export type TestPair = {
  sk: SentenceToken[];
  en: SentenceToken[];
};
```

**Rationale**:

- Allows each word in a sentence to have an optional icon
- Simple structure that's easy to serialize/deserialize
- Lucide-react icon names are just strings, no storage overhead
- Array structure naturally represents word order

**Alternatives considered**:

- Single string with embedded icon markers → Complex parsing, error-prone
- Separate icon array → Hard to maintain word-icon associations
- Rich text/HTML → Over-engineered for this use case

### Form Input Handling

**Decision**: Split/join sentences automatically on save/load

- **On save**: Split input text by spaces → `text.split(' ').map(text => ({ text }))`
- **On load/display**: Join tokens by spaces → `tokens.map(t => t.text).join(' ')`

**Rationale**:

- Keeps existing UI unchanged for now
- Icons default to `undefined` (no icon)
- Future icon picker can be added without changing core logic
- Simple implementation with clear separation of concerns

**Alternatives considered**:

- Parse sentence structure (grammar-aware) → Too complex, not needed
- Keep plain strings, add icons separately → Loses word-icon association

### Storage Migration

**Decision**: Change localStorage key to break compatibility

- Old key: `"slovicka:wordsets"`
- New key: `"slovicka:testsets"`

**Rationale**:

- Clean break prevents schema mismatch errors
- Simple to implement (one constant change)
- Acceptable data loss for early-stage project
- Users can manually export/import if needed

**Alternatives considered**:

- Schema migration on load → Complex, error-prone for minimal benefit
- Dual-key support → Technical debt for temporary benefit

### Naming Changes

**Decision**: Rename `WordPair` → `TestPair` and `WordSet` → `TestSet`

**Rationale**:

- "Word" is misleading since we now support sentences
- "Test" accurately describes the use case (testing knowledge)
- "Pair" remains accurate (two languages paired)
- Clear signal of breaking change

**Alternatives considered**:

- Keep `WordPair` name → Confusing and inaccurate
- Use `SentencePair` → Limits future evolution (phrases, clauses, etc.)
- Use `EntryPair` → Too generic, less descriptive

## Data Flow

### Save Flow

```
User Input: "I like books"
    ↓
Split by space: ["I", "like", "books"]
    ↓
Map to tokens: [
  { text: "I" },
  { text: "like" },
  { text: "books" }
]
    ↓
Store as TestPair: {
  en: [{ text: "I" }, { text: "like" }, { text: "books" }],
  sk: [{ text: "Mám" }, { text: "rád" }, { text: "knihy" }]
}
```

### Load/Display Flow

```
TestPair: {
  en: [{ text: "I" }, { text: "like" }, { text: "books" }]
}
    ↓
Extract text: ["I", "like", "books"]
    ↓
Join by space: "I like books"
    ↓
Display in input field
```

### Future Icon Flow (not implemented yet)

```
User selects icon for "books"
    ↓
Update token: { text: "books", icon: "Book" }
    ↓
Quiz renders: "I like 📚" (lucide-react Book icon)
```

## Implementation Notes

### Files to Update

1. **lib/wordsets.ts**
   - Define `SentenceToken` and `TestPair` types
   - Update `TestSet` type to use `TestPair[]`
   - Change `STORAGE_KEY` constant
   - Update `importWordSet` to parse token arrays
   - Update validation to work with token arrays

2. **lib/quiz.ts**
   - Update type imports (`WordPair` → `TestPair`, `WordSet` → `TestSet`)
   - Modify `initializeQuiz` to join tokens for display
   - Update `QuizQuestion` to store joined sentences

3. **components/wordsets/WordSetForm.tsx**
   - Update type imports
   - Convert `updateRow` to split/join logic
   - Update `onSave` to create token arrays
   - Update `loadSet` to join tokens for display

4. ****tests**/wordsets.test.ts**
   - Update test data to use token arrays
   - Add tests for split/join behavior

### Edge Cases

- **Empty strings**: Filter empty tokens after split → `text.split(' ').filter(s => s.trim())`
- **Multiple spaces**: Handle with `.filter()` or `.trim().split(/\s+/)`
- **Single-word entries**: Still work as 1-element arrays
- **Special characters**: No special handling needed, preserve as-is
- **Icon validation**: Future concern; accept any string for now

## Risks / Trade-offs

### Risk: Breaking Change

- **Impact**: All existing word sets lost unless manually migrated
- **Mitigation**: Acceptable for early-stage project; document in proposal
- **Future**: Could add import wizard to convert old JSON exports

### Risk: Sentence Tokenization Accuracy

- **Impact**: Simple space-split may not handle punctuation perfectly
- **Example**: "I like books." → `[{ text: "I" }, { text: "like" }, { text: "books." }]`
- **Mitigation**: Good enough for MVP; users can manually adjust
- **Future**: Add smarter tokenization if needed

### Trade-off: Deferred Icon UI

- **Benefit**: Keeps this change focused and testable
- **Cost**: Users can't add icons yet (but data structure supports it)
- **Timeline**: Icon picker is planned as immediate follow-up task

## Migration Plan

### For Users

1. Export existing word sets via current UI (if desired)
2. Update application
3. Re-import exported JSON (may require manual token conversion)

### For Developers

1. Update types in `lib/wordsets.ts`
2. Update persistence logic (storage key + import/export)
3. Update UI components (split/join logic)
4. Update quiz logic (token display)
5. Update tests
6. Run validation: `openspec validate refactor-wordpair-to-sentence-tokens --strict`
7. Test manually: create new test set, verify save/load, run quiz

### Rollback Plan

- Revert to previous commit
- Old storage key will restore previous data
- No database migration needed (localStorage only)

## Open Questions

- **Q**: Should we handle punctuation specially (e.g., "books." vs "books")?
  - **A**: No, keep it simple for now. Future improvement if users request it.

- **Q**: Should empty/whitespace-only tokens be filtered?
  - **A**: Yes, use `.filter(s => s.trim())` after split.

- **Q**: Should we validate icon names against lucide-react exports?
  - **A**: Not in this change. Future task can add validation/autocomplete.
