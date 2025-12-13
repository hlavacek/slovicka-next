# Proposal: Add Bulk Text Import to Word Set Editor

## Overview

Add a bulk text import feature to the word set editor that allows students to paste multi-sentence text blocks and automatically populate the editor with Slovak-English sentence pairs.

## Problem

Currently, creating word sets requires manually adding rows one by one and typing each sentence pair individually. This is time-consuming when a student or teacher has existing text content (from lessons, textbooks, or exercises) that they want to convert into a word set.

## Solution

Add a collapsible bulk import component below the row editor that accepts pasted text in a specific format:

- Slovak sentences (each ending with `.`, `!`, or `?`)
- Two newlines separator
- English sentences (each ending with `.`, `!`, or `?`)

When the user clicks "Update", the system parses the text, pairs sentences by index, and replaces all existing rows in the editor.

## Benefits

- **Faster workflow**: Bulk entry of multiple sentence pairs at once
- **Reuse existing content**: Easy conversion of lesson materials into practice sets
- **Flexible**: Handles mismatched sentence counts gracefully
- **User-friendly**: Clear format with helpful validation messages

## User Impact

- **Students/Teachers**: Can quickly create word sets from existing materials
- **Existing workflow**: Not disrupted - remains available alongside manual row editing
- **Learning curve**: Minimal - simple paste and click interface

## Technical Approach

1. Create new `BulkTextImport` component with:
   - Collapsible accordion section (collapsed by default)
   - Textarea for pasting text
   - Update button to process and apply
   - Validation messages

2. Add parsing logic to split text by:
   - Two-newline separator (Slovak vs English sections)
   - Sentence endings (`.`, `!`, `?`)
   - Pairing by index (1st SK → 1st EN, etc.)

3. Handle edge cases:
   - Mismatched sentence counts (leave empty)
   - Missing separator (show warning)
   - Empty input (no-op)

4. Integration:
   - Place below row editor in WordSetEditor
   - Callback to replace all rows
   - Reuse existing tokenization logic

## Risks & Mitigations

| Risk                                       | Mitigation                                                                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| Users accidentally overwrite existing work | Show clear warning that Update replaces all rows; accordion is collapsed by default |
| Parsing errors with complex punctuation    | Use simple regex for sentence endings; document expected format                     |
| Confusion about format                     | Add placeholder text with example format in textarea                                |

## Open Questions

None - all requirements clarified.

## Related Changes

None.

## Dependencies

- Existing `WordSetEditor` component
- Existing tokenization logic from `lib/wordsets.ts`
- Existing `Accordion` UI component from `components/ui/accordion.tsx`

## Success Criteria

- User can paste formatted text and generate word pairs
- Sentence pairing works correctly by index
- Mismatched counts handled gracefully
- Clear validation messages displayed
- All rows replaced when Update clicked
- Collapsible UI doesn't interfere with existing editor
