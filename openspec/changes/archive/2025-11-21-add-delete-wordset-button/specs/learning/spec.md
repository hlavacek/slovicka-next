## MODIFIED Requirements

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
