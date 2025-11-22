## MODIFIED Requirements

### Requirement: Sequential Quiz Flow

The system SHALL present words from the selected word set one at a time, either in sequential or randomized order based on user preference, allowing users to self-assess their knowledge. **The system SHALL display quiz progress using a visual progress bar component alongside a text label for accessibility.**

#### Scenario: Quiz session uses sequential order by default

- **GIVEN** a user has started a quiz without enabling random order
- **WHEN** the quiz begins
- **THEN** the system displays words in the original order from the word set
- **AND** questions advance sequentially through the list

#### Scenario: Quiz session uses random order when selected

- **GIVEN** a user has started a quiz with random order enabled
- **WHEN** the quiz begins
- **THEN** the system displays words in a randomized order
- **AND** each question appears exactly once
- **AND** the randomization is performed using Fisher-Yates shuffle algorithm
- **AND** the order differs from the original word set sequence

#### Scenario: Random order does not affect quiz functionality

- **GIVEN** a user is taking a quiz in random order
- **WHEN** they interact with the quiz (reveal, mark correct/incorrect, advance)
- **THEN** all quiz features work identically to sequential order
- **AND** progress tracking remains accurate
- **AND** the final summary shows correct results

#### Scenario: Quiz displays visual progress bar

- **GIVEN** a user is taking a quiz
- **WHEN** they view the quiz interface
- **THEN** the system displays a visual progress bar showing percentage completion
- **AND** displays text indicating current question number and total (e.g., "1 / 10")
- **AND** the progress bar visually fills proportionally to quiz completion
- **AND** the progress bar updates immediately when advancing to the next question

#### Scenario: Progress bar is accessible

- **GIVEN** a user is taking a quiz
- **WHEN** they use a screen reader or keyboard-only navigation
- **THEN** the progress information is announced or available as text
- **AND** the progress bar does not interfere with keyboard navigation
- **AND** the progress label remains readable and understandable without visual cues
