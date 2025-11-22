## MODIFIED Requirements

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set, choose the source language for practice, and optionally enable random question order, with persistent access to create new word sets. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** **When returning from a completed quiz, the system SHALL pre-select the previously used word set and display it at the top of the list when no search is active.** When the user starts a quiz, the system SHALL navigate to a dedicated `/quiz` route with query parameters encoding the quiz configuration.

#### Scenario: User selects word set, source language, and question order

- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/`
- **THEN** the system displays a search input for filtering word sets
- **AND** displays a scrollable list of available word sets (max 3 visible)
- **AND** provides radio buttons or select controls to choose source language (Slovak or English)
- **AND** provides a checkbox to enable random question order (unchecked by default)
- **AND** displays a "Start Quiz" button
- **AND** displays a link to create new word sets

#### Scenario: User returns from quiz with pre-selected word set

- **GIVEN** a user has completed a quiz with a specific word set
- **WHEN** they click "Start New Quiz" and navigate to `/?wordset=<id>`
- **THEN** the system pre-selects the word set matching the provided ID
- **AND** displays the pre-selected word set at the top of the list
- **AND** sorts remaining word sets by ID below the pre-selected one
- **AND** does not apply pre-selection sorting when a search term is entered

#### Scenario: Pre-selected word set is valid

- **GIVEN** a user navigates to `/?wordset=<valid-id>`
- **WHEN** the page loads
- **THEN** the system finds the matching word set
- **AND** selects it automatically
- **AND** displays it at the top of the list

#### Scenario: Pre-selected word set ID is invalid

- **GIVEN** a user navigates to `/?wordset=<invalid-id>`
- **WHEN** the page loads
- **THEN** the system ignores the invalid ID
- **AND** displays word sets in default order (sorted by ID)
- **AND** no word set is pre-selected

#### Scenario: User navigates to home without wordset parameter

- **GIVEN** a user navigates directly to `/`
- **WHEN** the page loads
- **THEN** the system displays word sets sorted by ID
- **AND** no word set is pre-selected

#### Scenario: Search overrides pre-selection sorting

- **GIVEN** a user has a pre-selected word set displayed at the top
- **WHEN** they enter a search term
- **THEN** the system filters word sets by the search term
- **AND** displays matching results without prioritizing the pre-selected word set
- **AND** maintains the pre-selection state for the radio button

#### Scenario: User manually selects different word set

- **GIVEN** a user has a pre-selected word set
- **WHEN** they manually select a different word set
- **THEN** the new selection replaces the pre-selection
- **AND** the list order remains unchanged

#### Scenario: User searches for word sets by name

- **GIVEN** a user has multiple saved word sets
- **WHEN** they type a search term into the search input
- **THEN** the system filters the word set list to show only word sets whose names contain the search term (case-insensitive)
- **AND** the filtered list updates as the user types
- **AND** displays matching word sets in a scrollable list

#### Scenario: Word set list displays maximum 3 items with scroll

- **GIVEN** a user has more than 3 word sets (filtered or unfiltered)
- **WHEN** they view the word set list
- **THEN** the system displays a maximum of 3 word sets at a time
- **AND** provides vertical scrolling to access additional word sets
- **AND** the scroll container has a fixed maximum height

#### Scenario: Empty search shows all word sets ordered by ID

- **GIVEN** a user has saved word sets
- **WHEN** the search input is empty
- **THEN** the system displays all word sets ordered by their ID
- **AND** the list remains scrollable if more than 3 word sets exist

#### Scenario: Search with no matches shows empty state

- **GIVEN** a user enters a search term
- **WHEN** no word sets match the search term
- **THEN** the system displays an empty or "no results" state
- **AND** does not allow starting a quiz without a valid selection

#### Scenario: Selected word set persists during search

- **GIVEN** a user has selected a word set
- **WHEN** they enter a search term that filters out the selected word set
- **THEN** the selection remains active internally
- **AND** the user can clear the search to see their selection again
- **OR** the system keeps the selection but shows it's not in the filtered list

#### Scenario: User starts quiz and navigates to dedicated route

- **GIVEN** a user has selected a word set, source language, and optional random order
- **WHEN** they click "Start Quiz"
- **THEN** the system navigates to `/quiz?id=<wordset-id>&source=<sk|en>&random=<true|false>`
- **AND** the quiz session begins on the `/quiz` page

#### Scenario: Random order checkbox is accessible

- **GIVEN** a user is navigating with keyboard only
- **WHEN** they tab to the random order checkbox
- **THEN** the checkbox receives focus with visible indicator
- **AND** pressing Space or Enter toggles the checkbox state

#### Scenario: Search input is keyboard accessible

- **GIVEN** a user is navigating with keyboard only
- **WHEN** they tab to the search input
- **THEN** the search input receives focus with visible indicator
- **AND** they can type to filter word sets
- **AND** can tab to navigate through filtered results

## MODIFIED Requirements

### Requirement: Quiz Results Summary

The system SHALL display a summary of quiz results after all words have been reviewed, showing performance statistics. **The summary SHALL provide a button to return to the quiz setup page with the current word set pre-selected.**

#### Scenario: Quiz completion shows summary

- **GIVEN** a user has completed reviewing all words in a quiz on `/quiz`
- **WHEN** they mark the final word as correct or incorrect
- **THEN** the system displays a summary screen on the same page
- **AND** shows the total number of words reviewed
- **AND** shows the count of words marked correct
- **AND** shows the count of words marked incorrect
- **AND** calculates and displays a percentage score
- **AND** provides a "Start New Quiz" button

#### Scenario: User returns to setup from summary with word set ID

- **GIVEN** a user is viewing the quiz summary on `/quiz` for a specific word set
- **WHEN** they click "Start New Quiz"
- **THEN** the system navigates to `/?wordset=<id>` with the current word set ID
- **AND** the quiz setup page pre-selects the same word set
- **AND** the user can modify configuration or select a different word set
