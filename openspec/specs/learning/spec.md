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

The system SHALL provide a quiz setup interface where users can select a word set to immediately launch a quiz. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** When the user clicks a word set, the system SHALL immediately navigate to the `/quiz` route with the currently selected settings. **The system SHALL organize source language and question order settings in a collapsible accordion section titled "Settings" that is collapsed by default, with default values of source language = Slovak and random order = true.** **The system SHALL display the success rate from the most recent quiz for each word set using a colorful, animated progress fill background on the word set card that indicates performance level with kid-friendly colors and icons.**

#### Scenario: User launches quiz by clicking word set

- **GIVEN** a user has at least one saved word set
- **WHEN** they navigate to `/`
- **THEN** the system displays a search input for filtering word sets
- **AND** displays a scrollable list of available word sets (max 3 visible)
- **AND** each word set is displayed as a clickable card
- **AND** displays a collapsible "Settings" accordion section (collapsed by default)
- **AND** no "Start Quiz" button is visible
- **AND** clicking a word set card immediately navigates to `/quiz?id=<wordset-id>&source=<current-source>&random=<current-random>`

#### Scenario: Settings accordion controls quiz launch parameters

- **GIVEN** a user is on the quiz setup page
- **WHEN** they expand the settings accordion and change source language to English
- **AND** they click a word set card
- **THEN** the quiz launches with source=en reflecting the accordion setting

#### Scenario: Word set cards are keyboard accessible

- **GIVEN** a user is navigating with keyboard only
- **WHEN** they tab to word set cards
- **THEN** the system displays clear focus indicators
- **AND** pressing Enter or Space on a focused card launches the quiz
- **AND** the cards behave as interactive buttons

#### Scenario: Word set cards provide clear visual feedback

- **GIVEN** a user views the quiz setup page
- **WHEN** they hover over a word set card
- **THEN** the system provides visual feedback (e.g., shadow, border change)
- **AND** the cursor changes to pointer to indicate clickability

#### Scenario: Default quiz configuration is applied

- **GIVEN** a user clicks a word set card without opening settings
- **WHEN** the quiz initializes
- **THEN** the quiz uses Slovak as the source language (practice English → Slovak translation)
- **AND** the quiz uses random question order
- **AND** these defaults were applied from the accordion's initial state

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
- **AND** allows the user to launch a quiz with those word sets
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

**Users SHALL be able to import multiple sentence pairs at once by pasting formatted text into an expandable bulk import component. The system SHALL parse Slovak and English sentences separated by two newlines, pair them by index, and replace all existing rows in the word set editor. The system SHALL allow the final sentence in each section (Slovak and English) to omit ending punctuation, while intermediate sentences continue to require proper punctuation (`.`, `!`, `?`) as separators.**

#### Scenario: Final sentence without punctuation is parsed correctly

- **GIVEN** a user pastes text where the last sentence lacks ending punctuation:

  ```
  Mám rád knihy. Pes beží rýchlo

  I like books. Dog runs fast
  ```

- **WHEN** the system parses this text
- **THEN** it parses the first sentences using punctuation: ["Mám rád knihy", "I like books"]
- **AND** captures the remaining text as final sentences: ["Pes beží rýchlo", "Dog runs fast"]
- **AND** produces Slovak: ["Mám rád knihy", "Pes beží rýchlo"]
- **AND** produces English: ["I like books", "Dog runs fast"]
- **AND** pairs them by index to create 2 word pair rows

#### Scenario: All sentences fully punctuated continues to work

- **GIVEN** a user pastes text with all sentences properly punctuated:

  ```
  Mám rád knihy. Pes beží rýchlo.

  I like books. Dog runs fast.
  ```

- **WHEN** the system parses this text
- **THEN** it uses the existing punctuation-based parsing for all sentences
- **AND** produces Slovak: ["Mám rád knihy", "Pes beží rýchlo"]
- **AND** produces English: ["I like books", "Dog runs fast"]
- **AND** no remaining text is captured (backward compatible)

#### Scenario: Single final sentence without punctuation

- **GIVEN** a user pastes text with only one sentence per section, without punctuation:

  ```
  Mám rád knihy

  I like books
  ```

- **WHEN** the system parses this text
- **THEN** regex finds no punctuated sentences
- **AND** all text is treated as the final sentence
- **AND** produces Slovak: ["Mám rád knihy"]
- **AND** produces English: ["I like books"]
- **AND** pairs them to create 1 word pair row

#### Scenario: Single-word final sentence without punctuation

- **GIVEN** a user pastes text ending with single words:

  ```
  Mám rád knihy. dom

  I like books. house
  ```

- **WHEN** the system parses this text
- **THEN** it parses punctuated sentences: ["Mám rád knihy", "I like books"]
- **AND** captures final words: ["dom", "house"]
- **AND** applies single-word punctuation removal logic (no punctuation to remove)
- **AND** produces Slovak: ["Mám rád knihy", "dom"]
- **AND** produces English: ["I like books", "house"]

#### Scenario: Whitespace around final sentence is trimmed

- **GIVEN** a user pastes text with extra whitespace:

  ```
  Mám rád knihy.   Pes beží rýchlo

  I like books.   Dog runs fast
  ```

- **WHEN** the system parses this text
- **THEN** it trims whitespace from the final sentence
- **AND** produces Slovak: ["Mám rád knihy", "Pes beží rýchlo"]
- **AND** produces English: ["I like books", "Dog runs fast"]

#### Scenario: Intermediate sentences still require punctuation

- **GIVEN** a user pastes text with intermediate sentence missing punctuation:

  ```
  Mám rád knihy Pes beží rýchlo.

  I like books Dog runs fast.
  ```

- **WHEN** the system parses this text
- **THEN** the unpunctuated text is not recognized as a separate sentence
- **AND** "Mám rád knihy Pes beží rýchlo." is treated as one sentence
- **AND** produces Slovak: ["Mám rád knihy Pes beží rýchlo"]
- **AND** produces English: ["I like books Dog runs fast"]
- **NOTE**: This maintains existing behavior and encourages proper punctuation

#### Scenario: Empty remaining text after punctuation is ignored

- **GIVEN** a user pastes text with trailing whitespace after final punctuation:
  ```
  Mám rád knihy. Pes beží rýchlo.   \n  \n
  I like books. Dog runs fast.   \n  \n
  ```
- **WHEN** the system parses this text
- **THEN** it trims and checks remaining text
- **AND** finds it empty after trimming
- **AND** does not add an additional empty sentence
- **AND** produces Slovak: ["Mám rád knihy", "Pes beží rýchlo"]
- **AND** produces English: ["I like books", "Dog runs fast"]

#### Scenario: Existing bulk import scenarios remain unchanged

- **GIVEN** all existing bulk import scenarios from the current spec (with proper punctuation)
- **WHEN** they are tested after this change
- **THEN** all existing scenarios continue to pass without modification
- **AND** no behavioral regression occurs for fully-punctuated text

