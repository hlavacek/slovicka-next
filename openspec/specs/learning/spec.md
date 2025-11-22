# learning Specification

## Purpose

TBD - created by archiving change add-word-set-creator. Update Purpose after archive.
## Requirements
### Requirement: Word Set Creation

The system SHALL provide a user interface for creating custom vocabulary word sets containing Slovak ↔ English word pairs with navigation back to the quiz page. Interactive buttons SHALL include visual icons to enhance usability while maintaining accessibility. **The system SHALL allow users to update existing word sets by loading them into the form and saving changes, preserving the original word set ID.**

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

#### Scenario: User loads existing word set for editing

- **GIVEN** a user has saved word sets displayed in the word set form
- **WHEN** they click the "Load" button for a specific word set
- **THEN** the system populates the form with the word set's name and entries
- **AND** tracks the loaded word set's ID internally
- **AND** the form remains in editing mode for that word set

#### Scenario: User updates loaded word set

- **GIVEN** a user has loaded an existing word set into the form
- **WHEN** they modify the name or entries
- **AND** click "Save"
- **THEN** the system updates the existing word set in localStorage
- **AND** preserves the original word set ID
- **AND** updates the modified timestamp
- **AND** does NOT create a duplicate word set with a new ID

#### Scenario: User creates new word set after loading

- **GIVEN** a user has loaded an existing word set into the form
- **WHEN** they clear or reset the form (implementation-specific: could be manual clear or automatic)
- **AND** enter new word set data
- **AND** click "Save"
- **THEN** the system creates a new word set with a new ID
- **AND** does NOT modify the previously loaded word set

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

### Requirement: Import and Export

The system SHALL allow users to export word sets as JSON files and import previously exported files.

#### Scenario: User exports a word set

- **GIVEN** a user has created a word set
- **WHEN** they click export
- **THEN** the system downloads a JSON file containing the word set data

#### Scenario: User imports a word set

- **GIVEN** a user has a previously exported JSON file
- **WHEN** they upload the file via the import function
- **THEN** the system validates the file structure
- **AND** adds the word set to their saved collection
- **AND** handles duplicate IDs appropriately

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

### Requirement: Internationalization

The system SHALL use next-intl for all user-facing text to support multiple languages (Slovak, English) with Slovak as the default locale.

#### Scenario: UI text is translatable

- **GIVEN** the application is configured with next-intl
- **WHEN** a user views any page without explicitly selecting a language
- **THEN** the interface displays in Slovak by default
- **AND** all labels, buttons, placeholders, and messages use translation keys
- **AND** the interface can adapt to other supported locales when configured

#### Scenario: HTML lang attribute matches default locale

- **GIVEN** the application loads with default settings
- **WHEN** the page is rendered
- **THEN** the HTML lang attribute is set to "sk"
- **AND** screen readers and browsers correctly identify the content language

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

### Requirement: Sequential Quiz Flow

The system SHALL present words from the selected word set one at a time, either in sequential or randomized order based on user preference, allowing users to self-assess their knowledge. **The system SHALL display quiz progress using a visual progress bar component alongside a text label for accessibility.**

#### Scenario: Quiz session uses sequential order by default

- **GIVEN** a user has started a quiz without enabling random order
- **WHEN** the quiz begins
- **THEN** the system displays words in the original order from the word set
- **AND** questions advance sequentially through the list

#### Scenario: Quiz session uses random order when selected

- **GIVEN** a user has started a quiz with random order enabled
- **WHEN** the quiz begins
- **THEN** the system displays words in a randomized order
- **AND** each question appears exactly once
- **AND** the randomization is performed using Fisher-Yates shuffle algorithm
- **AND** the order differs from the original word set sequence

#### Scenario: Random order does not affect quiz functionality

- **GIVEN** a user is taking a quiz in random order
- **WHEN** they interact with the quiz (reveal, mark correct/incorrect, advance)
- **THEN** all quiz features work identically to sequential order
- **AND** progress tracking remains accurate
- **AND** the final summary shows correct results

#### Scenario: Quiz displays visual progress bar

- **GIVEN** a user is taking a quiz
- **WHEN** they view the quiz interface
- **THEN** the system displays a visual progress bar showing percentage completion
- **AND** displays text indicating current question number and total (e.g., "1 / 10")
- **AND** the progress bar visually fills proportionally to quiz completion
- **AND** the progress bar updates immediately when advancing to the next question

#### Scenario: Progress bar is accessible

- **GIVEN** a user is taking a quiz
- **WHEN** they use a screen reader or keyboard-only navigation
- **THEN** the progress information is announced or available as text
- **AND** the progress bar does not interfere with keyboard navigation
- **AND** the progress label remains readable and understandable without visual cues

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

### Requirement: Quiz Accessibility

The system SHALL ensure the quiz interface is keyboard accessible and provides clear focus indicators for navigation.

#### Scenario: Keyboard navigation in quiz

- **GIVEN** a user is taking a quiz using keyboard only
- **WHEN** they use Tab to navigate
- **THEN** all interactive elements (Show Answer, Mark Correct, Mark Incorrect, Next buttons) are reachable
- **AND** Enter or Space activates the focused button
- **AND** focus indicators are clearly visible

### Requirement: Quiz Internationalization

The system SHALL use next-intl for all quiz-related UI text to support multiple languages.

#### Scenario: Quiz UI text is translatable

- **GIVEN** the quiz interface is displayed
- **WHEN** a user views any quiz screen
- **THEN** all labels, buttons, messages, and instructions use translation keys
- **AND** the interface adapts to the selected locale (Slovak, English)

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

### Requirement: Page Metadata

The system SHALL provide meaningful, context-specific page titles and meta descriptions for all pages to improve user experience, browser tab identification, bookmarking, and SEO. Titles SHALL be internationalized to support multiple languages.

#### Scenario: User views quiz setup page in browser tab

- **GIVEN** a user navigates to the home page (`/`)
- **WHEN** they view the browser tab
- **THEN** the tab displays a meaningful title indicating it's the quiz setup page
- **AND** the title includes the application name
- **AND** the title is displayed in the user's selected language (Slovak or English)

#### Scenario: User views quiz session page in browser tab

- **GIVEN** a user is taking a quiz at `/quiz?id=<wordset-id>`
- **WHEN** they view the browser tab
- **THEN** the tab displays a meaningful title indicating an active quiz session
- **AND** the title includes the application name
- **AND** the title is displayed in the user's selected language

#### Scenario: User views word set creation page in browser tab

- **GIVEN** a user navigates to `/word-sets/new`
- **WHEN** they view the browser tab
- **THEN** the tab displays a meaningful title indicating the word set creation page
- **AND** the title includes the application name
- **AND** the title is displayed in the user's selected language

#### Scenario: User creates bookmark with meaningful title

- **GIVEN** a user is on any page in the application
- **WHEN** they create a browser bookmark
- **THEN** the bookmark uses the page-specific meaningful title
- **AND** the title clearly identifies the page's purpose
- **AND** the title distinguishes it from generic "Create Next App" defaults

#### Scenario: Search engines index pages with proper metadata

- **GIVEN** search engines crawl the application
- **WHEN** they index a page
- **THEN** the page provides a meaningful meta description
- **AND** the description accurately describes the application's purpose
- **AND** the title follows best practices for SEO (descriptive, unique per page)

