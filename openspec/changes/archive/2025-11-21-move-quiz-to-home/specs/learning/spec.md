## MODIFIED Requirements

### Requirement: Quiz Setup Interface
The system SHALL provide a quiz setup interface where users can select a word set and choose the source language for practice.

#### Scenario: User selects word set and source language
- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/`
- **THEN** the system displays a list of available word sets
- **AND** provides radio buttons or select controls to choose source language (Slovak or English)
- **AND** displays a "Start Quiz" button

#### Scenario: No word sets available
- **GIVEN** a user has no saved word sets
- **WHEN** they navigate to `/`
- **THEN** the system displays a message indicating no word sets are available
- **AND** provides a link to the word set creation page
