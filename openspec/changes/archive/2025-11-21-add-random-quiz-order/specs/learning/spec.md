## MODIFIED Requirements

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set, choose the source language for practice, and optionally enable random question order, with persistent access to create new word sets.

#### Scenario: User selects word set, source language, and question order

- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/`
- **THEN** the system displays a list of available word sets
- **AND** provides radio buttons or select controls to choose source language (Slovak or English)
- **AND** provides a checkbox to enable random question order (unchecked by default)
- **AND** displays a "Start Quiz" button
- **AND** displays a link to create new word sets

#### Scenario: User enables random order

- **GIVEN** a user is on the quiz setup page
- **WHEN** they check the "Random order" checkbox
- **AND** they start the quiz
- **THEN** the system randomizes the order of questions at initialization
- **AND** presents words in the randomized sequence

#### Scenario: Random order checkbox is accessible

- **GIVEN** a user is navigating with keyboard only
- **WHEN** they tab to the random order checkbox
- **THEN** the checkbox receives focus with visible indicator
- **AND** pressing Space or Enter toggles the checkbox state

### Requirement: Sequential Quiz Flow

The system SHALL present words from the selected word set one at a time, either in sequential or randomized order based on user preference, allowing users to self-assess their knowledge.

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
