# Proposal: Update Bulk Import to Accept Optional Sentence Separators

## Overview

Enhance the bulk text import feature to accept sentences without mandatory ending punctuation (`.`, `!`, `?`), making the import process more flexible for users who copy text from sources that don't include sentence-ending punctuation.

## Problem

The current bulk text import requires **all sentences**, including the last one, to end with punctuation marks (`.`, `!`, or `?`). This creates friction when users naturally type the last sentence without ending punctuation.

Example that currently fails to parse the last sentence:

```
Mám rád knihy. Pes beží rýchlo

I like books. Dog runs fast
```

Currently, "Pes beží rýchlo" and "Dog runs fast" would not be recognized as sentences because they lack ending punctuation, even though intermediate sentences correctly use punctuation.

## Solution

Modify the `splitIntoSentences` function in `BulkTextImport.tsx` to:

1. **Parse punctuated sentences**: Extract all sentences ending with punctuation (`.`, `!`, `?`) using the existing regex
2. **Capture remaining text**: After extracting punctuated sentences, check if there's any remaining text
3. **Add final sentence**: If remaining text exists (trimmed, non-empty), treat it as the final sentence and add it to the results
4. **Preserve existing behavior**: Maintain the current logic for removing punctuation from single words while keeping it for multi-word sentences

### Parsing Logic

The enhanced parser will:

- Use the existing regex to match all sentences ending with punctuation
- After regex matching, check if the original text has content beyond the last punctuated sentence
- If yes, extract and trim that remaining text as the final sentence
- Apply the existing single-word vs multi-word punctuation rules to all sentences
- Filter out empty entries

## Benefits

- **More natural typing**: Users don't need to add punctuation to the last sentence
- **Better user experience**: Reduces friction when quickly entering text
- **Backward compatible**: Existing fully-punctuated text continues to work unchanged
- **Maintains structure**: Intermediate sentences still require proper punctuation, preserving sentence boundaries

## User Impact

- **Students/Teachers**: Can paste vocabulary lists from more sources without reformatting
- **Existing users**: No breaking changes - all current formats continue to work
- **Learning curve**: None - users who already use punctuation see no difference

## Technical Approach

Modify `components/wordsets/BulkTextImport.tsx`:

1. Update `splitIntoSentences` function:
   - Keep existing regex-based sentence splitting for punctuated sentences
   - After regex matching, calculate where the last match ended
   - Extract any remaining text after the last punctuated sentence
   - If remaining text exists (after trimming), add it as the final sentence
   - Maintain existing single-word punctuation removal logic
   - Preserve trimming and filtering of empty strings

2. No changes needed to:
   - Overall parsing structure (two-newline separator between SK/EN)
   - Tokenization logic
   - Warning messages
   - UI components

## Risks & Mitigations

| Risk                                                                  | Mitigation                                                                                                                                                                    |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Users might accidentally omit punctuation from intermediate sentences | Intermediate sentences without punctuation will be merged with following text until next punctuation mark; this maintains existing behavior and encourages proper punctuation |
| Confusion about which sentences need punctuation                      | Only the very last sentence is optional; all others still require it, maintaining clear sentence boundaries                                                                   |

## Open Questions

None - implementation approach is straightforward and backward compatible.

## Related Changes

- Builds on: `add-bulk-text-import` (archived 2025-12-13)

## Dependencies

- Existing `BulkTextImport` component (`components/wordsets/BulkTextImport.tsx`)
- No new dependencies required

## Success Criteria

- User can paste newline-separated word lists without punctuation and generate word pairs
- Existing punctuation-based parsing continues to work unchanged
- Whitespace trimming and empty-line filtering work correctly
- Single-word punctuation removal logic still applies in both modes
- All existing tests/validation for bulk import remain passing
