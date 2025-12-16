# Proposal: Add Unknown Pairs Training

## Overview

Enable users to practice vocabulary pairs they struggled with during a quiz by tracking incorrect answers and offering a focused training session on those specific pairs.

## Problem Statement

Currently, when users complete a quiz, they receive overall statistics but have no easy way to focus on the vocabulary pairs they didn't know. Users must manually remember which pairs were difficult and restart the entire quiz, which includes pairs they already know well. This reduces learning efficiency and makes it harder to target weak areas.

## Proposed Solution

During quiz execution, track which test pairs were answered incorrectly. After the quiz completes, display the count of unknown pairs in the summary and offer a "Train Unknown Pairs" button. When clicked, this button launches a new quiz session containing only the pairs that were marked incorrect, allowing focused practice on challenging vocabulary.

To support filtering on subsequent quiz executions, store a learning status flag (`knowledgeLevel`) directly in each `TestPair` within the word set. This enables future enhancements like filtering by mastery level or adaptive quiz generation.

## Goals

1. **Track incorrect answers during quiz** - Record which test pairs were answered incorrectly in the quiz session state
2. **Display unknown pairs count** - Show the number of unknown pairs in the quiz summary
3. **Offer focused training** - Provide a "Train Unknown Pairs" button that launches a quiz with only the incorrect pairs
4. **Store learning metadata** - Add `knowledgeLevel` field to `TestPair` to track mastery status for each pair
5. **Update knowledge level after quiz** - Mark pairs as "known" or "unknown" based on quiz performance
6. **Persist learning data** - Save updated knowledge levels to localStorage with the word set

## Success Criteria

- Quiz state tracks which pairs were incorrect
- Summary displays count of unknown pairs when > 0
- "Train Unknown Pairs" button appears when unknown pairs exist
- Button launches new quiz with only unknown pairs
- Knowledge level is stored in TestPair and persists across sessions
- Knowledge level updates after each quiz based on correctness

## Out of Scope

- Filtering word sets by knowledge level in quiz setup (future enhancement)
- Multi-level mastery tracking (e.g., "learning", "mastered", "forgotten")
- Spaced repetition algorithms
- Analytics or historical tracking of learning progress over time
- Automatic re-testing of unknown pairs

## Dependencies

- Existing quiz flow and state management in [lib/quiz.ts](lib/quiz.ts)
- TestPair type in [lib/wordsets.ts](lib/wordsets.ts)
- QuizSummary component in [components/quiz/QuizSummary.tsx](components/quiz/QuizSummary.tsx)
- Quiz page routing in [app/quiz/page.tsx](app/quiz/page.tsx)

## Risks and Mitigations

| Risk                                                                    | Impact | Mitigation                                                                                                  |
| ----------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| Breaking changes to TestPair type could affect existing saved word sets | High   | Provide backward compatibility by making `knowledgeLevel` optional and handling undefined values gracefully |
| Users with many unknown pairs might feel discouraged                    | Medium | Ensure UI framing is positive and encouraging (e.g., "Practice these X pairs")                              |
| Filtering logic might become complex with randomization                 | Low    | Keep unknown pairs quiz simple: always use sequential order initially                                       |

## Timeline Estimate

- Design and spec: 1 hour
- Implementation: 2-3 hours
- Testing and validation: 1 hour
- Total: 4-5 hours

## Related Changes

- Builds on quiz points system from `add-quiz-points-system`
- Complements random order setting from `add-wordset-random-order-setting`
- Extends data structure from `refactor-wordset-form-components`
