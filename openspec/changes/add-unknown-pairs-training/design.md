# Design: Add Unknown Pairs Training

## Architecture Overview

This change introduces a focused learning loop by tracking quiz performance at the test pair level and enabling targeted practice of difficult vocabulary. The implementation touches three main areas:

1. **Data Model** - Extend TestPair with knowledge level metadata
2. **Quiz State** - Track incorrect pairs during quiz execution
3. **UI Flow** - Add training option in quiz summary

## Key Design Decisions

### 1. Knowledge Level Storage Location

**Decision**: Store `knowledgeLevel` directly in the `TestPair` type within the word set.

**Rationale**:

- Keeps learning data with the vocabulary data (single source of truth)
- Simplifies synchronization - no separate tracking system needed
- Enables future filtering by knowledge level in quiz setup
- Persists across sessions via existing localStorage mechanism

**Alternatives Considered**:

- Separate learning progress storage: Would require complex synchronization logic
- Session-only tracking: Would lose data between page reloads

**Trade-offs**:

- Pro: Simple, consistent with existing architecture
- Pro: Backward compatible with optional field
- Con: Increases TestSet data size slightly
- Con: Mixing domain data (vocabulary) with learning metadata

### 2. Knowledge Level Type

**Decision**: Use a union type `'known' | 'unknown' | undefined` for initial implementation.

**Rationale**:

- Simple binary state matches current requirements
- `undefined` provides backward compatibility with existing word sets
- Extensible to more granular levels later (e.g., 'learning', 'mastered')
- Type-safe and self-documenting

**Alternatives Considered**:

- Boolean `isKnown`: Less semantic and harder to extend
- Numeric scale (0-100): Overly complex for current needs
- Enum: More verbose, similar benefits to union type

### 3. Unknown Pairs Identification

**Decision**: Use the original test pair index to map quiz results back to word set entries.

**Rationale**:

- Quiz questions already track their original `index` in the TestPair array
- Works correctly even when random order is enabled
- No additional mapping structure needed

**Implementation**:

```typescript
// In QuizQuestion type
export type QuizQuestion = {
  index: number; // Original index in testSet.entries
  sourceWord: string;
  targetWord: string;
  answered: boolean;
  correct: boolean | null;
  revealed: boolean;
  revealedBeforeTimeout: boolean;
};

// After quiz completion
const unknownPairIndices = quizState.questions
  .filter((q) => q.correct === false)
  .map((q) => q.index);

const unknownPairs = unknownPairIndices.map(
  (i) => quizState.config.testSet.entries[i],
);
```

### 4. Knowledge Level Update Strategy

**Decision**: Update knowledge level immediately after quiz completion, marking pairs as 'known' or 'unknown' based on the most recent answer.

**Rationale**:

- Simple and deterministic
- Provides immediate feedback for training option
- Follows existing pattern of updating lastQuizStats

**Update Logic**:

```typescript
function updateKnowledgeLevels(state: QuizState): TestSet {
  const updatedEntries = state.config.testSet.entries.map((entry, index) => {
    const question = state.questions.find((q) => q.index === index);
    if (!question) return entry; // Not included in this quiz

    return {
      ...entry,
      knowledgeLevel: question.correct === true ? "known" : "unknown",
    };
  });

  return {
    ...state.config.testSet,
    entries: updatedEntries,
  };
}
```

**Alternatives Considered**:

- Multi-quiz averaging: Too complex for initial version
- Decay over time: Requires timestamps and background processing
- User manual override: Good future enhancement, not needed now

### 5. Training Quiz Configuration

**Decision**: Launch training quiz with sequential order (random=false) and same source language as original quiz.

**Rationale**:

- Sequential order provides consistent practice experience
- Same source language maintains user's learning direction
- Timed mode carries over from original quiz settings
- Keeps URL pattern consistent: `/quiz?id=<id>&source=<src>&random=false&timed=<bool>&filter=unknown`

**URL Parameter Addition**:

- Add optional `filter` parameter: `'unknown' | 'known' | undefined`
- When `filter=unknown`, initialize quiz with only unknown pairs
- Backward compatible: undefined filter includes all pairs

### 6. UI Integration

**Decision**: Add "Train Unknown Pairs" button in QuizSummary component, displayed conditionally when unknown pairs exist.

**Layout**:

```
┌─────────────────────────────────────┐
│  Quiz Summary                       │
│  ┌───────────────────────────────┐  │
│  │  Success Rate: 60%            │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  Unknown Pairs: 4             │  │ <- New section
│  └───────────────────────────────┘  │
│  [Train Unknown Pairs (4)]         │ <- New button
│  [Repeat Quiz]    [Start New]      │
└─────────────────────────────────────┘
```

**Rationale**:

- Prominent placement encourages focused practice
- Shows count to set expectations
- Positioned above existing action buttons
- Uses encouraging language ("Train" not "Failed")

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Quiz Execution                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  User marks each question as correct/incorrect              │
│  QuizState.questions[].correct = true/false                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Quiz Completion                           │
│  1. Calculate score                                          │
│  2. Update knowledge levels based on correctness            │
│  3. Save updated TestSet to localStorage                    │
│  4. Show summary with unknown pairs count                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               User clicks "Train Unknown Pairs"              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Navigate to: /quiz?id=<id>&source=<src>&random=false      │
│              &timed=<bool>&filter=unknown                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Quiz initializes with only unknown pairs                   │
│  (entries where knowledgeLevel === 'unknown')               │
└─────────────────────────────────────────────────────────────┘
```

## Backward Compatibility

### Existing Word Sets

- Existing TestPair objects without `knowledgeLevel` field continue to work
- `knowledgeLevel: undefined` treated as "not yet assessed"
- First quiz completion will populate knowledge levels

### Import/Export

- Import function handles missing `knowledgeLevel` gracefully
- Export includes `knowledgeLevel` for new word sets
- Old exports (without field) import successfully

### Migration Strategy

No explicit migration needed:

1. Type change is additive (optional field)
2. All access uses safe property access with fallback
3. Knowledge levels populate organically as quizzes are completed

## Testing Considerations

### Unit Tests

- TestPair type extension
- Knowledge level update logic
- Filtering by knowledge level
- URL parameter parsing with filter

### Integration Tests

- Complete quiz → verify knowledge levels saved
- Launch training quiz → verify only unknown pairs included
- Mixed known/unknown pairs → verify correct filtering

### Edge Cases

- All pairs correct (no unknown pairs) → no training button
- All pairs incorrect (all unknown) → training = full quiz
- Word set with undefined knowledge levels → works normally
- Empty word set → handled by existing validation

## Performance Impact

Minimal performance impact:

- **Storage**: +1 field per TestPair (~10-20 bytes per pair)
- **Computation**: Single pass through questions array on completion
- **Rendering**: One additional conditional button in summary

For a typical word set of 20 pairs: ~200-400 bytes additional storage.

## Internationalization

New translation keys required:

**English (en.json)**:

```json
{
  "unknownPairsCount": "Unknown Pairs",
  "trainUnknownPairsButton": "Train Unknown Pairs ({count})",
  "trainingSummaryTitle": "Training Complete",
  "noUnknownPairs": "Great! You know all the pairs."
}
```

**Slovak (sk.json)**:

```json
{
  "unknownPairsCount": "Neznáme páry",
  "trainUnknownPairsButton": "Precvičiť neznáme páry ({count})",
  "trainingSummaryTitle": "Tréning dokončený",
  "noUnknownPairs": "Výborne! Poznáš všetky páry."
}
```

## Future Enhancements

This design enables future improvements:

1. **Multi-level mastery** - Extend union type to include 'learning', 'mastered', 'forgotten'
2. **Quiz setup filtering** - Add filter in QuizSetup to practice known/unknown pairs
3. **Spaced repetition** - Add timestamps and calculate optimal review intervals
4. **Progress visualization** - Show knowledge level distribution in word set cards
5. **Adaptive quizzing** - Dynamically adjust quiz difficulty based on knowledge levels
6. **Export/import learning data** - Share progress across devices

## Security and Privacy

No new security or privacy concerns:

- Learning data stored locally in browser (same as existing word sets)
- No external data transmission
- No PII involved
