## MODIFIED Requirements

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set, choose the source language for practice, and optionally enable random question order, with persistent access to create new word sets. When the user starts a quiz, the system SHALL navigate to a dedicated `/quiz` route with query parameters encoding the quiz configuration.

#### Scenario: User selects word set, source language, and question order

- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/`
- **THEN** the system displays a list of available word sets
- **AND** provides radio buttons or select controls to choose source language (Slovak or English)
- **AND** provides a checkbox to enable random question order (unchecked by default)
- **AND** displays a "Start Quiz" button
- **AND** displays a link to create new word sets

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

### Requirement: Quiz Session State

The system SHALL maintain quiz session state in memory on the `/quiz` page and reset when a new quiz is started or the page is reloaded. The quiz SHALL read configuration from query parameters (`id`, `source`, `random`) and handle missing or invalid parameters gracefully.

#### Scenario: Quiz loads from query parameters

- **GIVEN** a user navigates to `/quiz?id=<valid-wordset-id>&source=sk&random=true`
- **WHEN** the page loads
- **THEN** the system loads the word set from localStorage using the provided `id`
- **AND** initializes the quiz with the specified source language (`sk`)
- **AND** applies random order if `random=true`
- **AND** displays the first question

#### Scenario: Missing or invalid word set ID

- **GIVEN** a user navigates to `/quiz` without an `id` parameter or with an invalid `id`
- **WHEN** the page loads
- **THEN** the system detects the missing or invalid word set
- **AND** redirects the user to `/` (home/setup page)
- **OR** displays an error message with a link back to home

#### Scenario: In-progress quiz state is maintained

- **GIVEN** a user is in the middle of a quiz session on `/quiz`
- **WHEN** they answer questions sequentially
- **THEN** the system maintains which words have been answered
- **AND** tracks correct/incorrect marks
- **AND** preserves the current position in the sequence

#### Scenario: Page reload resets quiz

- **GIVEN** a user is in the middle of a quiz session on `/quiz`
- **WHEN** they reload the page
- **THEN** the system re-initializes the quiz from query parameters
- **AND** starts the quiz from the beginning
- **AND** does not persist the partial session progress

### Requirement: Quiz Results Summary

The system SHALL display a summary of quiz results after all words have been reviewed, showing performance statistics. The summary SHALL provide a button to return to the quiz setup page.

#### Scenario: Quiz completion shows summary

- **GIVEN** a user has completed reviewing all words in a quiz on `/quiz`
- **WHEN** they mark the final word as correct or incorrect
- **THEN** the system displays a summary screen on the same page
- **AND** shows the total number of words reviewed
- **AND** shows the count of words marked correct
- **AND** shows the count of words marked incorrect
- **AND** calculates and displays a percentage score
- **AND** provides a "Start New Quiz" button

#### Scenario: User returns to setup from summary

- **GIVEN** a user is viewing the quiz summary on `/quiz`
- **WHEN** they click "Start New Quiz"
- **THEN** the system navigates to `/` (home/setup page)
- **AND** the user can select a new word set and configuration

## ADDED Requirements

### Requirement: Direct Quiz Navigation

The system SHALL support direct navigation to a quiz session via URL with query parameters, enabling users to bookmark, share, or directly access quizzes for specific word sets.

#### Scenario: User navigates directly to quiz URL

- **GIVEN** a user has a valid word set ID
- **WHEN** they navigate directly to `/quiz?id=<wordset-id>&source=sk&random=false`
- **THEN** the system loads the specified word set
- **AND** initializes the quiz with the specified configuration
- **AND** begins the quiz session immediately

#### Scenario: User bookmarks quiz URL

- **GIVEN** a user is on `/quiz?id=<wordset-id>&source=en&random=true`
- **WHEN** they bookmark the page
- **AND** later return via the bookmark
- **THEN** the system loads the same word set and configuration
- **AND** starts a fresh quiz session with the bookmarked settings

#### Scenario: User shares quiz URL

- **GIVEN** a user has configured a quiz at `/quiz?id=<wordset-id>&source=sk&random=false`
- **WHEN** they share the URL with another user who has the same word set saved
- **THEN** the recipient can open the URL and start the quiz with the shared configuration
