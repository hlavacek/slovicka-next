## ADDED Requirements

### Requirement: Word Set Creation

The system SHALL provide a user interface for creating custom vocabulary word sets containing Slovak ↔ English word pairs.

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

### Requirement: Word Set Persistence

The system SHALL persist created word sets in browser localStorage for offline access and cross-session availability.

#### Scenario: Word sets persist across sessions

- **GIVEN** a user has created and saved word sets
- **WHEN** they close and reopen the browser
- **THEN** previously saved word sets remain available

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

The system SHALL use next-intl for all user-facing text to support multiple languages (Slovak, English).

#### Scenario: UI text is translatable

- **GIVEN** the application is configured with next-intl
- **WHEN** a user views the word set creation page
- **THEN** all labels, buttons, placeholders, and messages use translation keys
- **AND** the interface adapts to the selected locale
