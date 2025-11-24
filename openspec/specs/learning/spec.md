# learning Specification

## Purpose

TBD - created by archiving change add-word-set-creator. Update Purpose after archive.

## Requirements

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
