## MODIFIED Requirements

### Requirement: Quiz Setup Interface
The system SHALL provide a quiz setup interface where users can select a word set and choose the source language for practice, with persistent access to create new word sets.

#### Scenario: User selects word set and source language
- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/`
- **THEN** the system displays a list of available word sets
- **AND** provides radio buttons or select controls to choose source language (Slovak or English)
- **AND** displays a "Start Quiz" button
- **AND** displays a link to create new word sets

#### Scenario: No word sets available
- **GIVEN** a user has no saved word sets
- **WHEN** they navigate to `/`
- **THEN** the system displays a message indicating no word sets are available
- **AND** provides a link to the word set creation page

#### Scenario: User navigates to create word sets from quiz setup
- **GIVEN** a user is on the quiz setup page
- **WHEN** they click the create word set link
- **THEN** the system navigates to `/word-sets/new`
- **AND** the user can create a new word set
