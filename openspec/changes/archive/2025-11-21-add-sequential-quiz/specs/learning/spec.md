## ADDED Requirements

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set and choose the source language for practice.

#### Scenario: User selects word set and source language

- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/quiz`
- **THEN** the system displays a list of available word sets
- **AND** provides radio buttons or select controls to choose source language (Slovak or English)
- **AND** displays a "Start Quiz" button

#### Scenario: No word sets available

- **GIVEN** a user has no saved word sets
- **WHEN** they navigate to `/quiz`
- **THEN** the system displays a message indicating no word sets are available
- **AND** provides a link to the word set creation page

### Requirement: Sequential Quiz Flow

The system SHALL present words from the selected word set one at a time in sequential order, allowing users to self-assess their knowledge.

#### Scenario: Quiz session displays one word at a time

- **GIVEN** a user has started a quiz with a selected word set and source language
- **WHEN** the quiz begins
- **THEN** the system displays the first word in the source language
- **AND** hides the target language translation
- **AND** displays a "Show Answer" button
- **AND** displays progress information (e.g., "Question 1 of 10")

#### Scenario: User reveals answer

- **GIVEN** a user is viewing a quiz question
- **WHEN** they click the "Show Answer" button
- **THEN** the system reveals the target language translation
- **AND** displays two buttons: "Mark Correct" and "Mark Incorrect"
- **AND** hides the "Show Answer" button

#### Scenario: User marks answer and proceeds

- **GIVEN** a user has revealed an answer
- **WHEN** they click "Mark Correct" or "Mark Incorrect"
- **THEN** the system records the result
- **AND** advances to the next word in the sequence
- **AND** updates the progress indicator
- **OR** displays the quiz summary if this was the last word

### Requirement: Quiz Results Summary

The system SHALL display a summary of quiz results after all words have been reviewed, showing performance statistics.

#### Scenario: Quiz completion shows summary

- **GIVEN** a user has completed reviewing all words in a quiz
- **WHEN** they mark the final word as correct or incorrect
- **THEN** the system displays a summary screen
- **AND** shows the total number of words reviewed
- **AND** shows the count of words marked correct
- **AND** shows the count of words marked incorrect
- **AND** calculates and displays a percentage score
- **AND** provides a "Start New Quiz" button

### Requirement: Quiz Session State

The system SHALL maintain quiz session state in memory and reset when a new quiz is started or the page is reloaded.

#### Scenario: In-progress quiz state is maintained

- **GIVEN** a user is in the middle of a quiz session
- **WHEN** they answer questions sequentially
- **THEN** the system maintains which words have been answered
- **AND** tracks correct/incorrect marks
- **AND** preserves the current position in the sequence

#### Scenario: Page reload resets quiz

- **GIVEN** a user is in the middle of a quiz session
- **WHEN** they reload the page
- **THEN** the system returns to the quiz setup screen
- **AND** does not persist the partial session

### Requirement: Quiz Accessibility

The system SHALL ensure the quiz interface is keyboard accessible and provides clear focus indicators for navigation.

#### Scenario: Keyboard navigation in quiz

- **GIVEN** a user is taking a quiz using keyboard only
- **WHEN** they use Tab to navigate
- **THEN** all interactive elements (Show Answer, Mark Correct, Mark Incorrect, Next buttons) are reachable
- **AND** Enter or Space activates the focused button
- **AND** focus indicators are clearly visible

### Requirement: Quiz Internationalization

The system SHALL use next-intl for all quiz-related UI text to support multiple languages.

#### Scenario: Quiz UI text is translatable

- **GIVEN** the quiz interface is displayed
- **WHEN** a user views any quiz screen
- **THEN** all labels, buttons, messages, and instructions use translation keys
- **AND** the interface adapts to the selected locale (Slovak, English)
