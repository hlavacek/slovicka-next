# Proposal: Simplify Bulk Import with Separate Text Areas

## Summary

Replace the current bulk import format (which requires a two-newline separator between Slovak and English text) with two separate text areas—one for Slovak sentences and one for English sentences. This eliminates the need for users to remember the separator format and makes the import process more intuitive.

## Why

The current bulk import requires users to paste text in a specific format with Slovak sentences, then two newlines, then English sentences. This format:

1. **Not discoverable**: Users must read instructions to understand the two-newline separator requirement
2. **Error-prone**: Easy to accidentally use one newline or three newlines instead of two
3. **Confusing warnings**: When separator is missing, users see a warning but may not understand what went wrong
4. **Requires mental mapping**: Users must visually parse where Slovak ends and English begins in a single text area

## What

Replace the single textarea with two clearly labeled text areas:

- **Slovak sentences** (top textarea)
- **English sentences** (bottom textarea)

Users paste Slovak sentences in the first area and English sentences in the second. Each textarea independently parses sentences using the existing punctuation logic (`.`, `!`, `?` separators, with final sentence allowed to omit punctuation).

### Benefits

- **Clearer UI**: Two labeled text areas make it immediately obvious where each language goes
- **No separator needed**: Users no longer need to remember or type the two-newline separator
- **Better error messages**: Can show separate warnings per textarea (e.g., "Slovak sentences: 3, English sentences: 2")
- **Simpler parsing logic**: No need to split by two newlines first
- **Maintains existing sentence parsing**: All current punctuation rules remain unchanged

## Impact Analysis

### User Impact

- **Positive**: Simpler, more intuitive interface
- **Behavior change**: Users who memorized the old format will see a different UI, but the new format is easier to understand
- **No data migration**: Existing saved word sets are unaffected

### Technical Impact

- **Component changes**: `BulkTextImport.tsx` - replace single textarea with two
- **Translation changes**: Update placeholder text and labels in `messages/*.json`
- **Parsing simplification**: Remove separator detection logic, call `splitIntoSentences` twice independently
- **Backward compatibility**: Not applicable (feature is for live editing, not stored data)

### Testing Impact

- Update existing tests for bulk import parsing
- Add tests for separate text area validation
- Verify warning messages display correctly per textarea

## Alternatives Considered

1. **Keep current format but improve instructions**: Would still be error-prone
2. **Auto-detect separator format**: Complex and could misinterpret text with blank lines
3. **Side-by-side text areas**: Could work but may be cramped on mobile; vertical layout is simpler

## Open Questions

None - this is a straightforward UI simplification.

## Implementation Notes

- Maintain all existing sentence parsing logic (`splitIntoSentences` function)
- Keep single-word punctuation removal behavior
- Keep final sentence punctuation-optional behavior
- Update translations for both Slovak and English UI
- Preserve warning for mismatched counts (now shows "Slovak: X, English: Y" more clearly)
