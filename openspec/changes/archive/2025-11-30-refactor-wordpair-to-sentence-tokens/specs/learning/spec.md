## MODIFIED Requirements

### Requirement: Word Set Creation

Users SHALL be able to create, edit, and manage vocabulary **test sets** with at least one **test pair entry**. **Each entry SHALL consist of sentence pairs (Slovak↔English) where sentences are internally stored as arrays of tokens, with each token representing a word and optionally referencing a lucide-react icon name. The UI SHALL display sentences as space-separated text and automatically convert between display format (string) and storage format (token array) on save and load.**

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
- **WHEN** they click "Load" on that test set
- **THEN** the system retrieves the token arrays from storage
- **AND** joins each token array by spaces to create display strings
- **AND** displays "I like books" in the English input field
- **AND** displays "Mám rád knihy" in the Slovak input field
- **AND** the user can edit the sentences as plain text

#### Scenario: Single-word entries work correctly

- **GIVEN** a user enters a single word "house" in English and "dom" in Slovak
- **WHEN** they save the test set
- **THEN** the system creates single-token arrays `[{ text: "house" }]` and `[{ text: "dom" }]`
- **AND** when loaded for editing, displays "house" and "dom" correctly

### Requirement: Word Set Persistence

**Test sets** SHALL persist in browser storage across sessions using a new storage key and support tracking of learning progress for each set.

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

## ADDED Requirements

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

## REMOVED Requirements

None. All requirements are preserved with modifications to support the new data structure.
