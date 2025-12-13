# Spec Delta: Word Set Random Order Setting

## MODIFIED Requirements

### Requirement: Word Set Data Model

**Test sets** SHALL persist in browser storage across sessions using a new storage key and support tracking of learning progress for each set. **Each test set SHALL include an optional `allowRandomOrder` boolean property that controls whether random question order can be enabled for that word set.**

#### Scenario: Test set includes random order preference (ADDED)

- **GIVEN** a user creates or edits a test set
- **WHEN** the test set is saved to localStorage
- **THEN** the system stores the `allowRandomOrder` property with the test set
- **AND** the property defaults to `true` if not specified
- **AND** the property persists across browser sessions

#### Scenario: Imported test sets handle missing allowRandomOrder (ADDED)

- **GIVEN** a user imports a test set JSON file without an `allowRandomOrder` property
- **WHEN** the import completes
- **THEN** the system treats the test set as having `allowRandomOrder: true`
- **AND** the test set functions normally
- **AND** no validation errors occur

#### Scenario: Exported test sets include allowRandomOrder (ADDED)

- **GIVEN** a user exports a test set with `allowRandomOrder` configured
- **WHEN** the export generates the JSON file
- **THEN** the JSON includes the `allowRandomOrder` property
- **AND** the value matches the test set's current configuration

### Requirement: Word Set Creation and Editing

The system SHALL provide a form interface for creating and editing vocabulary test sets, including **a setting to control whether random question order is allowed for the word set**. Each test set SHALL have a unique name and one or more word pairs. **The system SHALL provide a mechanism for importing multiple word pairs from formatted text input.**

#### Scenario: User configures random order setting (ADDED)

- **GIVEN** a user is creating or editing a test set
- **WHEN** they view the form
- **THEN** the system displays a checkbox or switch labeled "Allow random question order"
- **AND** the control is checked by default for new word sets
- **AND** the control reflects the current value when editing existing word sets
- **AND** the control is accessible via keyboard navigation

#### Scenario: Random order setting saves with word set (ADDED)

- **GIVEN** a user has configured the "Allow random question order" setting
- **WHEN** they save the word set
- **THEN** the system stores the `allowRandomOrder` property with the chosen value
- **AND** the setting persists to localStorage
- **AND** the setting is available when editing the word set later

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set to immediately launch a quiz. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** When the user clicks a word set, the system SHALL immediately navigate to the `/quiz` route with the currently selected settings. **The system SHALL organize source language and question order settings in a collapsible accordion section titled "Settings" that is collapsed by default, with default values of source language = Slovak and random order = true. The random order toggle SHALL be disabled when the selected word set has `allowRandomOrder: false`, and enabled when `allowRandomOrder: true`.** **The system SHALL display the success rate from the most recent quiz for each word set using a colorful, animated progress fill background on the word set card that indicates performance level with kid-friendly colors and icons.**

#### Scenario: Random order toggle respects word set preference (ADDED)

- **GIVEN** a user has selected a word set with `allowRandomOrder: false`
- **WHEN** they view the settings accordion
- **THEN** the random order toggle is disabled and non-interactive
- **AND** the toggle state reflects the word set's enforced order (unchecked for sequential)
- **AND** visual styling indicates the toggle is disabled
- **AND** a helper text or tooltip explains why the toggle is disabled

#### Scenario: Random order toggle is interactive when allowed (ADDED)

- **GIVEN** a user has selected a word set with `allowRandomOrder: true`
- **WHEN** they view the settings accordion
- **THEN** the random order toggle is enabled and interactive
- **AND** the user can freely toggle between random and sequential order
- **AND** no restrictions are applied

#### Scenario: Quiz launch respects word set's random order setting (ADDED)

- **GIVEN** a user clicks a word set with `allowRandomOrder: false`
- **WHEN** the quiz launches
- **THEN** the system passes `random=false` in the query parameters regardless of the toggle state
- **AND** the quiz presents questions in sequential order

#### Scenario: No word set selected defaults to interactive toggle (ADDED)

- **GIVEN** no word set is currently selected in the quiz setup
- **WHEN** the user views the settings accordion
- **THEN** the random order toggle is enabled and interactive
- **AND** the toggle uses the default state (true)
- **AND** no restrictions are applied until a word set is selected

#### Scenario: Accessibility for disabled toggle (ADDED)

- **GIVEN** a user is navigating with keyboard or screen reader
- **AND** the random order toggle is disabled due to word set restrictions
- **WHEN** they focus on the toggle
- **THEN** the screen reader announces the toggle's disabled state
- **AND** the reason for disabling is available through ARIA attributes or nearby text
- **AND** the toggle remains keyboard-accessible but non-interactive
