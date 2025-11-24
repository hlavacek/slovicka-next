# learning

## MODIFIED Requirements

### Requirement: Word Set Persistence

Word sets SHALL persist in browser storage across sessions and support tracking of learning progress for each set.

#### Scenario: Word set tracks most recent quiz statistics

- **GIVEN** a user completes a quiz for a word set
- **WHEN** the quiz is finished and results are calculated
- **THEN** the system stores the number of correct answers and total questions in the word set's statistics
- **AND** the statistics persist in localStorage along with the word set data
- **AND** subsequent quizzes for the same word set update the statistics

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set, choose the source language for practice, and optionally enable random question order, with persistent access to create new word sets. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** When the user starts a quiz, the system SHALL navigate to a dedicated `/quiz` route with query parameters encoding the quiz configuration. **The system SHALL organize source language and question order settings in a collapsible accordion section titled "Settings" that is collapsed by default.** **The system SHALL display the success rate from the most recent quiz for each word set on the right side of the word set card.**

#### Scenario: User views success rate on word set cards

- **GIVEN** a user has word sets with varying practice history
- **WHEN** they view the quiz setup page
- **THEN** the system displays each word set card
- **AND** for word sets that have been practiced, shows the success rate as a percentage on the right side (e.g., "85%")
- **AND** for word sets that have not been practiced, shows a "not practiced" indicator
- **AND** the success rate reflects the most recent quiz results (correct answers / total questions)

#### Scenario: Success rate updates after quiz completion

- **GIVEN** a user completes a quiz for a word set
- **WHEN** they navigate back to the quiz setup page
- **THEN** the system displays the updated success rate for that word set
- **AND** the success rate reflects the performance from the just-completed quiz
- **AND** previous success rates for the same word set are replaced

#### Scenario: Word sets without statistics display correctly

- **GIVEN** a user has word sets created before statistics tracking was implemented
- **WHEN** they view the quiz setup page
- **THEN** the system displays those word sets normally
- **AND** shows a "not practiced" or similar indicator instead of a percentage
- **AND** allows the user to start a quiz with those word sets
- **AND** statistics are added after the first quiz completion

### Requirement: Quiz Results Summary

The system SHALL display a summary of quiz results after all words have been reviewed, showing performance statistics. **The summary SHALL provide a button to return to the quiz setup page with the current word set pre-selected.** **The system SHALL update the word set's success statistics based on the current quiz results before navigation.**

#### Scenario: Quiz completion updates word set statistics

- **GIVEN** a user completes a quiz
- **WHEN** the quiz results are displayed
- **THEN** the system calculates the number of correct and total answers
- **AND** updates the word set's lastQuizStats field with this data
- **AND** persists the updated word set to localStorage
- **AND** the statistics are available for display on the quiz setup page
