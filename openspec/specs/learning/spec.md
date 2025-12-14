# learning Specification

## Purpose

TBD - created by archiving change add-word-set-creator. Update Purpose after archive.
## Requirements
### Requirement: Word Set Creation

Users SHALL be able to create, edit, and manage vocabulary **test sets** with at least one **test pair entry**. **Each entry SHALL consist of sentence pairs (Slovak↔English) where sentences are internally stored as arrays of tokens, with each token representing a word and optionally referencing a lucide-react icon name. The UI SHALL display sentences as space-separated text and automatically convert between display format (string) and storage format (token array) on save and load.**

**The word set creation interface SHALL be composed of three focused components: WordSetEditor (manages editing form and state), WordSetSearch (manages saved sets search and display), and WordSetForm (coordinates communication between them).**

#### Scenario: User removes word pair rows with icon button

- **GIVEN** a user has multiple test pair rows in the form
- **WHEN** they view the "Remove" button for a row
- **THEN** the system displays an X or delete icon alongside or within the button
- **AND** the button remains accessible via keyboard and screen readers
- **AND** clicking the button removes the corresponding test pair row

#### Scenario: User cannot remove the last word pair row

- **GIVEN** a user has exactly one test pair row in the form
- **WHEN** they view the "Remove" button for that row
- **THEN** the system displays the button in a disabled state
- **AND** the button has reduced opacity or other visual indication that it is disabled
- **AND** the button is non-interactive and cannot be clicked
- **AND** the button has appropriate ARIA attributes indicating the disabled state
- **AND** keyboard navigation properly handles the disabled button

#### Scenario: Remove button enables after adding rows

- **GIVEN** a user has exactly one test pair row (disabled remove button)
- **WHEN** they click the "Add row" button to add a second row
- **THEN** the system enables both remove buttons
- **AND** all remove buttons become interactive and clickable

#### Scenario: User enters sentence and system tokenizes it

- **GIVEN** a user is creating or editing a test set
- **WHEN** they enter "I like books" in the English field and "Mám rád knihy" in the Slovak field
- **AND** they save the test set
- **THEN** the system splits each sentence by spaces into token arrays
- **AND** stores the English sentence as `[{ text: "I" }, { text: "like" }, { text: "books" }]`
- **AND** stores the Slovak sentence as `[{ text: "Mám" }, { text: "rád" }, { text: "knihy" }]`
- **AND** empty tokens (from multiple consecutive spaces) are filtered out
- **AND** each token's icon field is set to `undefined` by default

#### Scenario: User loads existing test set for editing

- **GIVEN** a user has a saved test set with tokenized sentences
- **WHEN** they click "Load" on that test set in the WordSetSearch component
- **THEN** the WordSetForm parent component receives the load event
- **AND** passes the test set data to the WordSetEditor component via callback
- **AND** the WordSetEditor retrieves the token arrays from the test set
- **AND** joins each token array by spaces to create display strings
- **AND** displays "I like books" in the English input field
- **AND** displays "Mám rád knihy" in the Slovak input field
- **AND** the user can edit the sentences as plain text in the WordSetEditor

#### Scenario: Single-word entries work correctly

- **GIVEN** a user enters a single word "house" in English and "dom" in Slovak
- **WHEN** they save the test set
- **THEN** the system creates single-token arrays `[{ text: "house" }]` and `[{ text: "dom" }]`
- **AND** when loaded for editing, displays "house" and "dom" correctly

#### Scenario: WordSetEditor manages editing state independently

- **GIVEN** a user is interacting with the word set creation interface
- **WHEN** they type in name or word pair fields
- **THEN** the WordSetEditor component manages all editing state (name, rows, error, editingSetId)
- **AND** state updates are contained within WordSetEditor
- **AND** the parent WordSetForm does not need to manage editing details
- **AND** validation errors are displayed within WordSetEditor

#### Scenario: WordSetSearch manages search state independently

- **GIVEN** a user is viewing the saved word sets list
- **WHEN** they type in the search input
- **THEN** the WordSetSearch component manages all search state (searchTerm, filtered list)
- **AND** the filtered list updates reactively based on search input
- **AND** the parent WordSetForm does not need to manage search state
- **AND** sorting and filtering logic is contained within WordSetSearch

#### Scenario: Parent coordinates save operation

- **GIVEN** a user has completed editing a word set
- **WHEN** they click the Save button in WordSetEditor
- **THEN** the WordSetEditor validates the input locally
- **AND** calls the onSaveComplete callback prop provided by WordSetForm parent
- **AND** the parent updates savedSets state from localStorage
- **AND** the WordSetSearch component receives updated savedSets and re-renders the list
- **AND** the WordSetEditor clears its local state

#### Scenario: Parent coordinates delete operation

- **GIVEN** a user clicks Delete on a word set in the search list
- **WHEN** the delete is confirmed
- **THEN** the WordSetSearch calls the onDeleteComplete callback prop
- **AND** the parent updates savedSets state from localStorage
- **AND** the WordSetSearch receives updated savedSets and re-renders
- **AND** if the deleted set was being edited, the WordSetEditor clears its state

### Requirement: Word Set Persistence

**Test sets** SHALL persist in browser storage across sessions using a new storage key and support tracking of learning progress for each set. **The parent WordSetForm component SHALL manage the savedSets state and coordinate updates between WordSetEditor and WordSetSearch components.**

#### Scenario: Test sets use new storage key

- **GIVEN** the application has been updated with the new data structure
- **WHEN** a user creates or loads test sets
- **THEN** the system uses the storage key `"slovicka:testsets"` instead of `"slovicka:wordsets"`
- **AND** old word sets stored under the previous key are not loaded
- **AND** the application starts with an empty test set list

#### Scenario: Test set tracks most recent quiz statistics

- **GIVEN** a user completes a quiz for a test set
- **WHEN** the quiz is finished and results are calculated
- **THEN** the system stores the number of correct answers and total questions in the test set's statistics
- **AND** the statistics persist in localStorage along with the test set data
- **AND** subsequent quizzes for the same test set update the statistics

#### Scenario: Parent component loads saved sets on mount

- **GIVEN** the word set creation page is loaded
- **WHEN** the WordSetForm component mounts
- **THEN** the component calls loadTestSets() from lib/wordsets
- **AND** stores the result in savedSets state
- **AND** passes savedSets as a prop to WordSetSearch
- **AND** WordSetSearch displays the list without needing to access localStorage directly

#### Scenario: Save operation updates shared state

- **GIVEN** a user saves a word set from WordSetEditor
- **WHEN** the save completes successfully
- **THEN** the WordSetEditor calls the onSaveComplete callback
- **AND** the parent WordSetForm reloads savedSets from localStorage
- **AND** the updated savedSets are passed to WordSetSearch
- **AND** the search list reflects the newly saved or updated word set

#### Scenario: Delete operation updates shared state

- **GIVEN** a user deletes a word set from WordSetSearch
- **WHEN** the delete completes successfully
- **THEN** the WordSetSearch calls the onDeleteComplete callback
- **AND** the parent WordSetForm reloads savedSets from localStorage
- **AND** the updated savedSets are passed to WordSetSearch
- **AND** the deleted word set is no longer displayed in the search list

### Requirement: Import and Export

The system SHALL allow users to export test sets as JSON files and import previously exported files. **Exported JSON SHALL contain the token array structure with text and optional icon fields.**

#### Scenario: User exports a test set with token arrays

- **GIVEN** a user has created a test set with tokenized sentences
- **WHEN** they click export
- **THEN** the system downloads a JSON file containing the test set data
- **AND** the JSON includes token arrays in the format `{ sk: [{ text: "word", icon?: "IconName" }], en: [...] }`
- **AND** the file is properly formatted and human-readable

#### Scenario: User imports a test set with token arrays

- **GIVEN** a user has a previously exported JSON file with token arrays
- **WHEN** they upload the file via the import function
- **THEN** the system validates the file structure
- **AND** validates that entries contain token arrays with `text` fields
- **AND** adds the test set to their saved collection
- **AND** handles duplicate IDs appropriately

#### Scenario: User imports old-format word set

- **GIVEN** a user has an old JSON file with string-based entries (e.g., `{ sk: "dom", en: "house" }`)
- **WHEN** they attempt to import the file
- **THEN** the system detects the incompatible format
- **AND** displays an error message indicating the file format is not supported
- **OR** automatically converts string entries to single-token arrays `[{ text: "dom" }]`

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

The system SHALL provide a quiz setup interface where users can select a word set to immediately launch a quiz. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** When the user clicks a word set, the system SHALL immediately navigate to the `/quiz` route with the currently selected settings. **The system SHALL organize source language, question order, and timed mode settings in a collapsible accordion section titled "Settings" that is collapsed by default, with default values of source language = Slovak, random order = true, and timed mode = true.** **The system SHALL display the success rate from the most recent quiz for each word set using a colorful, animated progress fill background on the word set card that indicates performance level with kid-friendly colors and icons.**

#### Scenario: Timed mode toggle controls bonus points

- **GIVEN** a user is on the quiz setup page
- **WHEN** they expand the settings accordion
- **THEN** the system displays a "Timed Mode" toggle switch
- **AND** the toggle is enabled by default
- **AND** a label explains that timed mode awards bonus points for fast answers
- **AND** the label is translated appropriately for the current locale

#### Scenario: Timed mode setting persists in quiz URL

- **GIVEN** a user has disabled timed mode in settings
- **WHEN** they click a word set card to launch a quiz
- **THEN** the system navigates to `/quiz?id=<wordset-id>&source=<source>&random=<random>&timed=false`
- **AND** the quiz initializes with timed mode disabled

#### Scenario: Default quiz configuration includes timed mode

- **GIVEN** a user clicks a word set card without changing settings
- **WHEN** the quiz initializes
- **THEN** the quiz uses timed mode enabled (default)
- **AND** the countdown timer will be displayed during the quiz session

### Requirement: Sequential Quiz Flow

The system SHALL present words from the selected word set one at a time, either in sequential or randomized order based on user preference, allowing users to self-assess their knowledge. **The system SHALL display quiz progress using a visual progress bar component alongside a text label for accessibility. When timed mode is enabled, the system SHALL display a 5-second countdown timer in the "Show Answer" button, award 2 bonus points for correct answers revealed before timeout, and award standard 1 point for correct answers revealed after timeout.**

#### Scenario: Countdown timer displays in Show Answer button

- **GIVEN** a user is taking a quiz with timed mode enabled
- **WHEN** a new question is displayed and the answer is not yet revealed
- **THEN** the system displays a countdown timer in the "Show Answer" button
- **AND** the button text shows "Show Answer (5)" initially
- **AND** the countdown decrements every second: (5), (4), (3), (2), (1)
- **AND** when the timer reaches 0, the button text changes to "Show Answer" without countdown

#### Scenario: User reveals answer before timer expires

- **GIVEN** a user is taking a quiz with timed mode enabled
- **AND** the countdown timer shows 3 seconds remaining
- **WHEN** the user clicks the "Show Answer" button
- **THEN** the system reveals the answer immediately
- **AND** records that the answer was revealed before timeout
- **AND** the timer stops and is cleared
- **AND** the countdown is no longer visible

#### Scenario: User reveals answer after timer expires

- **GIVEN** a user is taking a quiz with timed mode enabled
- **AND** the countdown timer has reached 0
- **WHEN** the user clicks the "Show Answer" button
- **THEN** the system reveals the answer immediately
- **AND** records that the answer was NOT revealed before timeout
- **AND** the button shows only "Show Answer" without any countdown

#### Scenario: Bonus points awarded for fast correct answer

- **GIVEN** a user revealed an answer before the timer expired (timed mode enabled)
- **WHEN** the user marks the answer as correct
- **THEN** the system awards 2 points for this question
- **AND** updates the session points total by adding 2
- **AND** the bonus points are reflected in the final quiz results

#### Scenario: Standard points awarded for slow correct answer

- **GIVEN** a user revealed an answer after the timer expired (timed mode enabled)
- **WHEN** the user marks the answer as correct
- **THEN** the system awards 1 point for this question (standard)
- **AND** updates the session points total by adding 1
- **AND** the standard points are reflected in the final quiz results

#### Scenario: No points awarded for incorrect answer regardless of timer

- **GIVEN** a user revealed an answer (before OR after timer expired, timed mode enabled)
- **WHEN** the user marks the answer as incorrect
- **THEN** the system awards 0 points for this question
- **AND** the session points total remains unchanged
- **AND** no points are reflected for this question in final results

#### Scenario: Timer resets for each new question

- **GIVEN** a user completes a question in timed mode
- **WHEN** the next question is displayed
- **THEN** the system resets the countdown timer to 5 seconds
- **AND** starts counting down automatically
- **AND** the "Show Answer" button displays the countdown from the beginning

#### Scenario: Timed mode disabled shows no timer

- **GIVEN** a user is taking a quiz with timed mode disabled
- **WHEN** a new question is displayed
- **THEN** the system does NOT display any countdown timer
- **AND** the "Show Answer" button shows only "Show Answer" text
- **AND** all correct answers are worth 1 point (standard, no bonus)

#### Scenario: Keyboard accessibility with countdown timer

- **GIVEN** a user is taking a quiz with timed mode enabled using keyboard only
- **WHEN** they press Tab to focus the "Show Answer" button during countdown
- **THEN** the button receives focus with clear visual indicator
- **AND** pressing Enter or Space reveals the answer immediately
- **AND** the system correctly tracks whether reveal happened before timeout
- **AND** the countdown does not interfere with keyboard navigation

### Requirement: Quiz Results Summary

The system SHALL display a summary of quiz results after all words have been reviewed, showing performance statistics. **The summary SHALL provide a button to return to the quiz setup page with the current word set pre-selected.** **The summary SHALL provide a button to immediately repeat the same quiz with identical configuration (same word set, source language, and random order setting).** **The system SHALL update the word set's success statistics based on the current quiz results before navigation.** **The summary SHALL display a colorful, animated visual indicator showing the quiz performance with kid-friendly colors, smooth transitions, and celebratory icons.**

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

#### Scenario: User repeats the same quiz from summary page

- **GIVEN** a user has completed a quiz and is viewing the summary page
- **WHEN** they click the "Repeat Quiz" button
- **THEN** the system navigates to `/quiz` with the same query parameters (word set ID, source language, random order)
- **AND** the quiz reinitializes with identical configuration
- **AND** the quiz starts from the beginning with the same settings
- **AND** if random order was enabled, a new randomization is performed

#### Scenario: Repeat and start new buttons are both available

- **GIVEN** a user has completed a quiz and is viewing the summary page
- **WHEN** they view the available actions
- **THEN** the system displays both a "Repeat Quiz" button and a "Start New Quiz" button
- **AND** both buttons are clearly labeled with translated text
- **AND** both buttons are keyboard accessible
- **AND** the buttons are visually distinct in their purpose

**Note**: Translation keys required:

- `messages/en.json`: Add `"repeatQuizButton": "Repeat Quiz"`
- `messages/sk.json`: Add `"repeatQuizButton": "Zopakovať kvíz"`

### Requirement: Quiz Session State

The system SHALL maintain quiz session state in memory on the `/quiz` page and reset when a new quiz is started or the page is reloaded. The quiz SHALL read configuration from query parameters (`id`, `source`, `random`, **`timed`**) and handle missing or invalid parameters gracefully.

#### Scenario: Quiz loads timed mode from query parameters

- **GIVEN** a user navigates to `/quiz?id=<valid-wordset-id>&source=sk&random=true&timed=true`
- **WHEN** the page loads
- **THEN** the system loads the word set from localStorage using the provided `id`
- **AND** initializes the quiz with the specified source language (`sk`)
- **AND** applies random order if `random=true`
- **AND** enables timed mode with countdown timer
- **AND** displays the first question with countdown active

#### Scenario: Missing timed parameter defaults to true

- **GIVEN** a user navigates to `/quiz?id=<valid-wordset-id>&source=sk&random=true` (no timed parameter)
- **WHEN** the page loads
- **THEN** the system defaults timed mode to `true`
- **AND** initializes the quiz with countdown timer enabled
- **AND** awards bonus points for fast correct answers

#### Scenario: Timed mode false disables countdown and bonus

- **GIVEN** a user navigates to `/quiz?id=<valid-wordset-id>&source=sk&random=true&timed=false`
- **WHEN** the page loads
- **THEN** the system initializes the quiz with timed mode disabled
- **AND** does not display countdown timer on any question
- **AND** awards only standard 1 point for correct answers

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

### Requirement: Sentence Token Data Structure

The system SHALL define a `SentenceToken` type representing individual words within sentences, with support for optional icon associations.

#### Scenario: SentenceToken type definition

- **GIVEN** the codebase defines data types
- **WHEN** a developer inspects the `SentenceToken` type
- **THEN** the type is defined as `{ text: string; icon?: string }`
- **AND** the `text` field is required and contains the word text
- **AND** the `icon` field is optional and contains a lucide-react icon name (e.g., "Book", "Home")

#### Scenario: TestPair uses token arrays

- **GIVEN** the codebase defines test pair structure
- **WHEN** a developer inspects the `TestPair` type
- **THEN** the type is defined as `{ sk: SentenceToken[]; en: SentenceToken[] }`
- **AND** each language field is an array of `SentenceToken` objects
- **AND** the type was previously named `WordPair` and has been renamed to `TestPair`

### Requirement: Quiz Token Display

The quiz system SHALL convert token arrays to display strings when presenting questions and answers to users. **Icon rendering is not implemented in this change; icons are preserved in data but not visually displayed.**

#### Scenario: Quiz displays sentence from token array

- **GIVEN** a quiz question is initialized with a test pair containing token arrays
- **WHEN** the quiz renders the question
- **THEN** the system joins the token array by spaces to create the display string
- **AND** displays the sentence as plain text (e.g., "I like books")
- **AND** icon fields are preserved in the data but not rendered visually
- **AND** the quiz functions identically to the previous word-based implementation

#### Scenario: Quiz handles single-token entries

- **GIVEN** a quiz question contains a single-token array `[{ text: "house" }]`
- **WHEN** the quiz displays the question
- **THEN** the system displays "house" correctly without extra spaces
- **AND** the quiz behaves identically to multi-token entries

### Requirement: Bulk Text Import

**Users SHALL be able to import multiple sentence pairs at once by pasting Slovak text in one textarea and English text in a separate textarea. The system SHALL independently parse sentences from each textarea using punctuation separators (`.`, `!`, `?`), pair them by index, and replace all existing rows in the word set editor. The system SHALL allow the final sentence in each textarea to omit ending punctuation, while intermediate sentences continue to require proper punctuation as separators.**

#### Scenario: User pastes text in separate Slovak and English text areas

- **GIVEN** a user opens the bulk import accordion
- **WHEN** they view the interface
- **THEN** the system displays two clearly labeled text areas
- **AND** the first text area is labeled for Slovak sentences
- **AND** the second text area is labeled for English sentences
- **AND** each text area has an appropriate placeholder showing example sentences
- **AND** the text areas are stacked vertically with Slovak on top

#### Scenario: User imports sentences with separate text areas

- **GIVEN** a user has bulk text to import
- **WHEN** they paste Slovak sentences in the Slovak text area:
  ```
  Mám rád knihy. Pes beží rýchlo
  ```
- **AND** paste English sentences in the English text area:
  ```
  I like books. Dog runs fast
  ```
- **AND** click "Update from Text"
- **THEN** the system independently parses Slovak text: ["Mám rád knihy", "Pes beží rýchlo"]
- **AND** independently parses English text: ["I like books", "Dog runs fast"]
- **AND** pairs them by index to create 2 word pair rows
- **AND** no separator between Slovak and English is required

#### Scenario: User clears warnings when editing either textarea

- **GIVEN** a warning is displayed (e.g., mismatch count)
- **WHEN** the user types in either the Slovak or English text area
- **THEN** the system clears the warning
- **AND** the warning reappears if needed when "Update from Text" is clicked again

#### Scenario: Mismatched sentence counts show clear warning

- **GIVEN** a user pastes 3 Slovak sentences and 2 English sentences
- **WHEN** they click "Update from Text"
- **THEN** the system displays a warning: "Slovak sentences: 3, English sentences: 2 don't match"
- **AND** still creates 3 word pair rows (pairing by index, leaving third English field empty)
- **AND** the warning uses translated text for the current locale

#### Scenario: Empty text areas show appropriate warning

- **GIVEN** a user has not entered any text in either text area
- **WHEN** they click "Update from Text"
- **THEN** the system displays a warning: "No text to import"
- **AND** does not modify existing word pair rows
- **AND** does not clear existing rows

#### Scenario: All existing sentence parsing scenarios remain unchanged

- **GIVEN** any existing scenario that tests sentence parsing logic (punctuation, single words, final sentence without punctuation, whitespace trimming)
- **WHEN** text is provided in separate text areas instead of combined with separator
- **THEN** all parsing behaviors work identically
- **AND** `splitIntoSentences` function logic is unchanged
- **AND** single-word punctuation removal works the same
- **AND** final sentence without punctuation works the same
- **AND** intermediate sentences still require punctuation

### Requirement: Timed Quiz Bonus Points

**When timed mode is enabled, the system SHALL display a 5-second countdown timer in the "Show Answer" button for each question. The system SHALL award 2 bonus points for correct answers revealed before the timer expires and 1 standard point for correct answers revealed after the timer expires. Timed mode SHALL be optional and configurable in quiz settings with a default value of enabled.**

#### Scenario: Timer state persists until answer revealed or expired

- **GIVEN** a user is viewing a question with countdown active
- **WHEN** the timer is counting down (e.g., at 3 seconds)
- **THEN** the system continues decrementing the timer every second
- **AND** the button text updates in real-time
- **AND** the timer does not reset or pause unless answer is revealed
- **AND** when timer reaches 0, it stops and remains at 0

#### Scenario: Timer does not interfere with speech pronunciation

- **GIVEN** a user reveals an answer (before or after timeout)
- **WHEN** the answer is displayed and speech pronunciation begins
- **THEN** the countdown timer stops and is cleared
- **AND** speech pronunciation works normally
- **AND** no timer-related warnings or errors appear in console

#### Scenario: Points calculation uses timer status

- **GIVEN** the quiz state tracks `revealedBeforeTimeout` for each question
- **WHEN** a user marks an answer as correct
- **THEN** the system checks if `config.timedMode` is enabled
- **AND** if timed mode enabled AND `revealedBeforeTimeout` is true: awards 2 points
- **AND** if timed mode enabled AND `revealedBeforeTimeout` is false: awards 1 point
- **AND** if timed mode disabled: always awards 1 point regardless of timer status

#### Scenario: Quiz results reflect bonus points correctly

- **GIVEN** a user completes a quiz with timed mode enabled
- **AND** earned bonus points on some questions
- **WHEN** the quiz summary is displayed
- **THEN** the session points total includes all bonus points
- **AND** the total points in localStorage are updated correctly
- **AND** the displayed points match the calculated points from the quiz logic

