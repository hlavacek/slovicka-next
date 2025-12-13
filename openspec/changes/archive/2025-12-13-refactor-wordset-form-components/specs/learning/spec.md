## MODIFIED Requirements

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
