# learning

## MODIFIED Requirements

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set, choose the source language for practice, and optionally enable random question order, with persistent access to create new word sets. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** When the user starts a quiz, the system SHALL navigate to a dedicated `/quiz` route with query parameters encoding the quiz configuration. **The system SHALL organize source language and question order settings in a collapsible accordion section titled "Settings" that is collapsed by default.**

#### Scenario: User selects word set, source language, and question order

- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/`
- **THEN** the system displays a search input for filtering word sets
- **AND** displays a scrollable list of available word sets (max 3 visible)
- **AND** displays a collapsible "Settings" accordion section (collapsed by default)
- **AND** when expanded, the accordion shows radio buttons or select controls to choose source language (Slovak or English)
- **AND** when expanded, the accordion shows a switch to enable random question order (enabled by default)
- **AND** displays a "Start Quiz" button
- **AND** displays a link to create new word sets

#### Scenario: Settings accordion is collapsed by default

- **GIVEN** a user navigates to the quiz setup page
- **WHEN** the page loads
- **THEN** the system displays a "Settings" accordion header
- **AND** the settings content (source language and random order) is hidden by default
- **AND** a chevron icon indicates the collapsed state

#### Scenario: User expands settings accordion

- **GIVEN** a user is on the quiz setup page
- **WHEN** they click the "Settings" accordion header
- **THEN** the system expands the accordion to reveal source language and random order controls
- **AND** the chevron icon rotates to indicate the expanded state
- **AND** all settings controls are fully functional

#### Scenario: User collapses settings accordion

- **GIVEN** the settings accordion is expanded
- **WHEN** the user clicks the "Settings" accordion header again
- **THEN** the system collapses the accordion to hide the settings
- **AND** the chevron icon rotates back to the collapsed state
- **AND** the user's settings selections are preserved

#### Scenario: Settings accordion is keyboard accessible

- **GIVEN** a user is navigating with keyboard only
- **WHEN** they tab to the "Settings" accordion header
- **THEN** the system displays focus indication
- **AND** pressing Space or Enter toggles the accordion open/closed
- **AND** when expanded, users can tab through the settings controls

#### Scenario: Random order is enabled by default

- **GIVEN** a user navigates to the quiz setup page
- **WHEN** they view or expand the settings
- **THEN** the random order switch is in the "on" position by default
- **AND** quiz sessions will use random order unless the user toggles it off
