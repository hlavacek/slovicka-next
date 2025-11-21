# learning Specification

## Purpose

TBD - created by archiving change add-word-set-creator. Update Purpose after archive.
## Requirements
### Requirement: Word Set Creation

The system SHALL provide a user interface for creating custom vocabulary word sets containing Slovak ↔ English word pairs with navigation back to the quiz page.

#### Scenario: User creates a new word set

- **GIVEN** a user navigates to the word set creation page
- **WHEN** they enter a name and at least one Slovak ↔ English word pair
- **AND** they submit the form
- **THEN** the system saves the word set to browser local storage
- **AND** displays a success confirmation

#### Scenario: Validation prevents invalid submissions

- **GIVEN** a user is creating a word set
- **WHEN** they attempt to submit with an empty name or missing translations
- **THEN** the system displays inline validation errors
- **AND** prevents submission until all fields are valid

#### Scenario: User navigates back to quiz from word set page

- **GIVEN** a user is on the word set creation page
- **WHEN** they view the page
- **THEN** the system displays a button to navigate to the quiz page
- **AND** clicking the button navigates to `/`

### Requirement: Word Set Persistence

The system SHALL persist created word sets in browser localStorage for offline access and cross-session availability, with the ability to delete unwanted word sets.

#### Scenario: Word sets persist across sessions

- **GIVEN** a user has created and saved word sets
- **WHEN** they close and reopen the browser
- **THEN** previously saved word sets remain available

#### Scenario: User deletes a word set

- **GIVEN** a user has saved word sets displayed in the word set form
- **WHEN** they click the delete button for a specific word set
- **THEN** the system removes the word set from localStorage
- **AND** removes the word set from the displayed list
- **AND** the word set no longer appears in the quiz setup page

#### Scenario: User confirms deletion

- **GIVEN** a user clicks the delete button for a word set
- **WHEN** a confirmation prompt appears
- **AND** the user confirms the deletion
- **THEN** the word set is permanently removed

### Requirement: Import and Export

The system SHALL allow users to export word sets as JSON files and import previously exported files.

#### Scenario: User exports a word set

- **GIVEN** a user has created a word set
- **WHEN** they click export
- **THEN** the system downloads a JSON file containing the word set data

#### Scenario: User imports a word set

- **GIVEN** a user has a previously exported JSON file
- **WHEN** they upload the file via the import function
- **THEN** the system validates the file structure
- **AND** adds the word set to their saved collection
- **AND** handles duplicate IDs appropriately

### Requirement: Accessibility

The system SHALL ensure the word set creation form is keyboard accessible and follows WCAG guidelines.

#### Scenario: Keyboard-only navigation

- **GIVEN** a user navigates with keyboard only
- **WHEN** they use Tab/Shift+Tab to navigate form fields
- **THEN** all interactive elements are reachable
- **AND** form labels and ARIA attributes are properly associated

### Requirement: Internationalization

The system SHALL use next-intl for all user-facing text to support multiple languages (Slovak, English) with Slovak as the default locale.

#### Scenario: UI text is translatable

- **GIVEN** the application is configured with next-intl
- **WHEN** a user views any page without explicitly selecting a language
- **THEN** the interface displays in Slovak by default
- **AND** all labels, buttons, placeholders, and messages use translation keys
- **AND** the interface can adapt to other supported locales when configured

#### Scenario: HTML lang attribute matches default locale

- **GIVEN** the application loads with default settings
- **WHEN** the page is rendered
- **THEN** the HTML lang attribute is set to "sk"
- **AND** screen readers and browsers correctly identify the content language

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

