# learning Specification Delta

## ADDED Requirements

### Requirement: Unknown Pairs Tracking and Training

The system SHALL track which test pairs were answered incorrectly during a quiz, store knowledge level metadata in each test pair, and offer a focused training session on unknown pairs after quiz completion.

#### Scenario: TestPair includes knowledge level field

- **GIVEN** the codebase defines test pair structure
- **WHEN** a developer inspects the `TestPair` type
- **THEN** the type includes an optional `knowledgeLevel` field
- **AND** `knowledgeLevel` is defined as `'known' | 'unknown' | undefined`
- **AND** existing test pairs without this field continue to work (backward compatible)
- **AND** `undefined` indicates the pair has not yet been assessed

#### Scenario: Quiz state tracks original pair indices

- **GIVEN** a quiz is initialized with a test set
- **WHEN** questions are created (with or without random order)
- **THEN** each `QuizQuestion` maintains its original `index` from `testSet.entries`
- **AND** the index correctly maps back to the source test pair
- **AND** index remains constant even when questions are shuffled

#### Scenario: Knowledge levels update after quiz completion

- **GIVEN** a user completes a quiz
- **WHEN** all questions have been answered
- **THEN** the system updates the knowledge level for each test pair based on correctness
- **AND** pairs answered correctly are marked with `knowledgeLevel: 'known'`
- **AND** pairs answered incorrectly are marked with `knowledgeLevel: 'unknown'`
- **AND** pairs not included in the quiz retain their existing knowledge level
- **AND** the updated test set is saved to localStorage

#### Scenario: Quiz completion updates both stats and knowledge levels

- **GIVEN** a user completes a quiz
- **WHEN** the quiz results are processed
- **THEN** the system updates `lastQuizStats` with correct and total counts (existing behavior)
- **AND** the system updates `knowledgeLevel` for each test pair based on correctness (new behavior)
- **AND** both updates are saved atomically to localStorage
- **AND** the word set reflects both performance statistics and learning metadata

#### Scenario: Quiz summary displays unknown pairs count

- **GIVEN** a user completes a quiz with some incorrect answers
- **WHEN** the quiz summary is displayed
- **THEN** the system calculates the number of pairs marked as incorrect
- **AND** displays "Unknown Pairs: X" in the summary
- **AND** the count is displayed in a prominent, separate section
- **AND** uses translated text for the current locale
- **AND** the section is visually distinct from score statistics

#### Scenario: Unknown pairs count hidden when all correct

- **GIVEN** a user completes a quiz with all answers correct
- **WHEN** the quiz summary is displayed
- **THEN** the system does not display the "Unknown Pairs" section
- **AND** the "Train Unknown Pairs" button is not shown
- **AND** only the standard summary and action buttons appear

#### Scenario: Train Unknown Pairs button appears when unknowns exist

- **GIVEN** a user completes a quiz with 4 incorrect answers
- **WHEN** the quiz summary is displayed
- **THEN** the system displays a "Train Unknown Pairs (4)" button
- **AND** the button shows the count of unknown pairs in parentheses
- **AND** the button is positioned prominently above the existing action buttons
- **AND** the button uses encouraging, child-friendly language
- **AND** the button has appropriate styling to distinguish it from other actions

#### Scenario: Train Unknown Pairs button launches training quiz

- **GIVEN** a user is viewing the quiz summary with unknown pairs
- **WHEN** they click the "Train Unknown Pairs (4)" button
- **THEN** the system navigates to `/quiz` with the current word set ID
- **AND** includes query parameters: `source=<source>&random=false&timed=<bool>&filter=unknown`
- **AND** the source language matches the original quiz
- **AND** random order is disabled (sequential for focused practice)
- **AND** timed mode matches the original quiz setting
- **AND** filter parameter is set to 'unknown'

#### Scenario: Quiz initializes with only unknown pairs when filtered

- **GIVEN** a user navigates to `/quiz?id=<id>&source=sk&random=false&timed=true&filter=unknown`
- **WHEN** the quiz page loads and initializes
- **THEN** the system loads the word set from localStorage
- **AND** filters entries to include only pairs where `knowledgeLevel === 'unknown'`
- **AND** initializes the quiz with the filtered subset of test pairs
- **AND** displays the first unknown pair as the first question
- **AND** total question count matches the number of unknown pairs

#### Scenario: Quiz handles empty filter result gracefully

- **GIVEN** a user navigates to a quiz with `filter=unknown`
- **AND** the word set has no pairs with `knowledgeLevel === 'unknown'`
- **WHEN** the quiz attempts to initialize
- **THEN** the system detects an empty filtered list
- **AND** redirects to the home page (same as invalid word set)
- **AND** does not crash or show error messages

#### Scenario: Training quiz updates knowledge levels independently

- **GIVEN** a user completes a training quiz with filtered unknown pairs
- **WHEN** the training quiz completes
- **THEN** the system updates knowledge levels for the filtered pairs only
- **AND** pairs marked correct become 'known'
- **AND** pairs marked incorrect remain 'unknown'
- **AND** pairs not included in the training quiz retain their existing levels
- **AND** the updated word set is saved to localStorage

#### Scenario: Backward compatibility with word sets lacking knowledge levels

- **GIVEN** a word set exists with test pairs that have no `knowledgeLevel` field
- **WHEN** the quiz loads that word set
- **THEN** the quiz initializes successfully
- **AND** treats undefined knowledge levels as "not yet assessed"
- **AND** after quiz completion, populates knowledge levels based on results
- **AND** subsequent quizzes can use the knowledge levels for filtering

#### Scenario: Import validates but preserves knowledge levels

- **GIVEN** a user imports a test set JSON string
- **WHEN** the JSON includes `knowledgeLevel` fields on test pairs
- **THEN** the import function preserves the knowledge level values
- **AND** validates that knowledge levels are either 'known', 'unknown', or undefined
- **AND** invalid knowledge level values are normalized to undefined
- **AND** the imported word set functions correctly with preserved metadata

#### Scenario: Export includes knowledge levels

- **GIVEN** a user exports a test set with knowledge levels
- **WHEN** the export function serializes the test set
- **THEN** the JSON output includes `knowledgeLevel` fields for all test pairs
- **AND** undefined knowledge levels are represented as `null` or omitted in JSON
- **AND** the exported JSON can be successfully re-imported

#### Scenario: Training quiz summary shows appropriate title

- **GIVEN** a user completes a training quiz (with `filter=unknown`)
- **WHEN** the quiz summary is displayed
- **THEN** the system uses "Training Complete" as the summary title
- **AND** displays the standard performance statistics
- **AND** shows updated unknown pairs count (now reduced if any were correct)
- **AND** offers another training session if unknown pairs still exist

#### Scenario: Repeat training quiz maintains filter

- **GIVEN** a user completes a training quiz and views the summary
- **WHEN** they click "Repeat Quiz" from the training summary
- **THEN** the system navigates to the quiz page with `filter=unknown` preserved
- **AND** reinitializes with the current set of unknown pairs (which may be fewer after training)
- **AND** uses the same source language and timed mode settings

#### Scenario: Multiple training iterations reduce unknown count

- **GIVEN** a user has 10 unknown pairs and completes a training quiz
- **AND** answers 4 pairs correctly and 6 incorrectly
- **WHEN** they view the summary after training
- **THEN** the system shows "Unknown Pairs: 6" (reduced from 10)
- **AND** the "Train Unknown Pairs (6)" button reflects the new count
- **AND** clicking it launches another training session with only the 6 remaining unknown pairs

#### Scenario: Knowledge levels persist across page reloads

- **GIVEN** a user completes a quiz and knowledge levels are updated
- **WHEN** they close the browser and reopen the application later
- **AND** navigate to the word set
- **THEN** the knowledge levels are loaded from localStorage
- **AND** launching a filtered quiz uses the persisted knowledge levels
- **AND** the unknown pairs count reflects the stored data

#### Scenario: All pairs become known after successful training

- **GIVEN** a user completes a training quiz
- **AND** answers all unknown pairs correctly
- **WHEN** the training summary is displayed
- **THEN** the system shows "Unknown Pairs: 0" or omits the section entirely
- **AND** the "Train Unknown Pairs" button does not appear
- **AND** displays a success message: "Great! You know all the pairs."
- **AND** the message uses translated text for the current locale

## MODIFIED Requirements

None. This change adds new functionality without modifying existing requirements.

## REMOVED Requirements

None. All existing quiz and word set functionality remains unchanged.
