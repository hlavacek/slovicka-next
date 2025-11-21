## MODIFIED Requirements

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
