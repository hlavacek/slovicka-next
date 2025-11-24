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

Word sets SHALL persist in browser storage across sessions and support tracking of learning progress for each set.

#### Scenario: Word set tracks most recent quiz statistics

- **GIVEN** a user completes a quiz for a word set
- **WHEN** the quiz is finished and results are calculated
- **THEN** the system stores the number of correct answers and total questions in the word set's statistics
- **AND** the statistics persist in localStorage along with the word set data
- **AND** subsequent quizzes for the same word set update the statistics

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

The system SHALL provide a quiz setup interface where users can select a word set, choose the source language for practice, and optionally enable random question order, with persistent access to create new word sets. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** When the user starts a quiz, the system SHALL navigate to a dedicated `/quiz` route with query parameters encoding the quiz configuration. **The system SHALL organize source language and question order settings in a collapsible accordion section titled "Settings" that is collapsed by default.** **The system SHALL display the success rate from the most recent quiz for each word set using a colorful, animated progress fill background on the word set card that indicates performance level with kid-friendly colors and icons.**

#### Scenario: User views success rate on word set cards

- **GIVEN** a user has word sets with varying practice history
- **WHEN** they view the quiz setup page
- **THEN** the system displays each word set card
- **AND** for word sets that have been practiced, shows the success rate as a percentage with a colorful background fill
- **AND** the background fill is proportional to the success percentage (0-100% width)
- **AND** the fill color is determined by performance thresholds: low (<60%) uses warm red/orange tones, medium (60-80%) uses yellow/amber tones, high (>80%) uses green/blue tones
- **AND** the colors are kid-friendly, playful, and maintain sufficient contrast for accessibility
- **AND** the fill animates smoothly when the component first renders
- **AND** an icon appropriate to the performance level is displayed (e.g., star ratings or achievement badges)
- **AND** for word sets that have not been practiced, shows a "not practiced" indicator without colorful background
- **AND** the success rate reflects the most recent quiz results (correct answers / total questions)

#### Scenario: Success rate updates after quiz completion

- **GIVEN** a user completes a quiz for a word set
- **WHEN** they navigate back to the quiz setup page
- **THEN** the system displays the updated success rate for that word set
- **AND** the colorful background fill animates to the new percentage
- **AND** the fill color updates based on the new performance threshold
- **AND** the icon updates to reflect the new performance level
- **AND** the success rate reflects the performance from the just-completed quiz
- **AND** previous success rates for the same word set are replaced

#### Scenario: Word sets without statistics display correctly

- **GIVEN** a user has word sets created before statistics tracking was implemented
- **WHEN** they view the quiz setup page
- **THEN** the system displays those word sets normally
- **AND** shows a "not practiced" or similar indicator instead of a colorful background
- **AND** allows the user to start a quiz with those word sets
- **AND** statistics are added after the first quiz completion

#### Scenario: Colorful backgrounds are accessible

- **GIVEN** a user is viewing word set cards with colorful success indicators
- **WHEN** they assess the visual design
- **THEN** the color combinations meet WCAG AA contrast requirements for text readability
- **AND** the percentage text remains clearly visible against all background colors
- **AND** the success information is available through text (percentage) as well as color
- **AND** screen readers can access the success rate information through proper ARIA attributes

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

The system SHALL display a summary of quiz results after all words have been reviewed, showing performance statistics. **The summary SHALL provide a button to return to the quiz setup page with the current word set pre-selected.** **The system SHALL update the word set's success statistics based on the current quiz results before navigation.** **The summary SHALL display a colorful, animated visual indicator showing the quiz performance with kid-friendly colors, smooth transitions, and celebratory icons.**

#### Scenario: Quiz completion displays colorful summary

- **GIVEN** a user completes a quiz
- **WHEN** the quiz results are displayed
- **THEN** the system shows the total words, correct count, and incorrect count
- **AND** displays the success percentage with a colorful visual indicator
- **AND** the visual indicator uses a progress fill background matching the performance threshold colors
- **AND** the fill animates smoothly from 0% to the final percentage when the summary appears
- **AND** the color is determined by performance: low (<60%) uses warm red/orange, medium (60-80%) uses yellow/amber, high (>80%) uses green/blue
- **AND** a celebratory icon or badge appears based on performance level
- **AND** the colors are playful and attractive for children
- **AND** all text remains clearly readable against the colored backgrounds

#### Scenario: Quiz completion updates word set statistics

- **GIVEN** a user completes a quiz
- **WHEN** the quiz results are displayed
- **THEN** the system calculates the number of correct and total answers
- **AND** updates the word set's lastQuizStats field with this data
- **AND** persists the updated word set to localStorage
- **AND** the statistics are available for display on the quiz setup page with the new colorful visual treatment

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
