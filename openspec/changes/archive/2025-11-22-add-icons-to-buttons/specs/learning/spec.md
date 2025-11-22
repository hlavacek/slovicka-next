## MODIFIED Requirements

### Requirement: Word Set Creation

The system SHALL provide a user interface for creating custom vocabulary word sets containing Slovak ↔ English word pairs with navigation back to the quiz page. Interactive buttons SHALL include visual icons to enhance usability while maintaining accessibility.

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

#### Scenario: User adds word pair rows with icon button

- **GIVEN** a user is creating a word set
- **WHEN** they view the "Add row" button
- **THEN** the system displays a Plus icon alongside or within the button
- **AND** the button remains accessible via keyboard and screen readers
- **AND** clicking the button adds a new empty row for word pair entry

#### Scenario: User removes word pair rows with icon button

- **GIVEN** a user has multiple word pair rows in the form
- **WHEN** they view the "Remove" button for a row
- **THEN** the system displays an X or delete icon alongside or within the button
- **AND** the button remains accessible via keyboard and screen readers
- **AND** clicking the button removes the corresponding word pair row

### Requirement: Accessibility

The system SHALL ensure the word set creation form is keyboard accessible and follows WCAG guidelines. All interactive elements with icons SHALL provide appropriate text alternatives for assistive technologies.

#### Scenario: Keyboard-only navigation

- **GIVEN** a user navigates with keyboard only
- **WHEN** they use Tab/Shift+Tab to navigate form fields
- **THEN** all interactive elements are reachable
- **AND** form labels and ARIA attributes are properly associated

#### Scenario: Icon buttons are screen reader accessible

- **GIVEN** a user is using a screen reader
- **WHEN** they navigate to buttons with icons (Add row, Remove)
- **THEN** the screen reader announces the button's purpose clearly
- **AND** icon-only buttons have appropriate `aria-label` or visible text
- **AND** the button's action is understandable without visual context
