# learning

## MODIFIED Requirements

### Requirement: Word Set Creation

Users SHALL be able to create, edit, and manage vocabulary word sets with at least one word pair entry.

#### Scenario: User removes word pair rows with icon button

- **GIVEN** a user has multiple word pair rows in the form
- **WHEN** they view the "Remove" button for a row
- **THEN** the system displays an X or delete icon alongside or within the button
- **AND** the button remains accessible via keyboard and screen readers
- **AND** clicking the button removes the corresponding word pair row

#### Scenario: User cannot remove the last word pair row

- **GIVEN** a user has exactly one word pair row in the form
- **WHEN** they view the "Remove" button for that row
- **THEN** the system displays the button in a disabled state
- **AND** the button has reduced opacity or other visual indication that it is disabled
- **AND** the button is non-interactive and cannot be clicked
- **AND** the button has appropriate ARIA attributes indicating the disabled state
- **AND** keyboard navigation properly handles the disabled button

#### Scenario: Remove button enables after adding rows

- **GIVEN** a user has exactly one word pair row (disabled remove button)
- **WHEN** they click the "Add row" button to add a second row
- **THEN** the system enables both remove buttons
- **AND** all remove buttons become interactive and clickable
