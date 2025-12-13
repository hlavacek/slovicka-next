# learning Specification Deltas

## ADDED Requirements

### Requirement: Bulk Text Import

**Users SHALL be able to import multiple sentence pairs at once by pasting formatted text into an expandable bulk import component. The system SHALL parse Slovak and English sentences separated by two newlines, pair them by index, and replace all existing rows in the word set editor.**

#### Scenario: User imports bulk text with matching sentence counts

- **GIVEN** a user is on the word set editor page
- **WHEN** they expand the bulk import section below the row editor
- **AND** they paste the following text into the textarea:

  ```
  Mám rád knihy. Pes beží rýchlo.

  I like books. The dog runs fast.
  ```

- **AND** they click the "Update" button
- **THEN** the system splits the Slovak section into 2 sentences: ["Mám rád knihy", "Pes beží rýchlo"]
- **AND** splits the English section into 2 sentences: ["I like books", "The dog runs fast"]
- **AND** pairs sentence 1 (SK) with sentence 1 (EN), sentence 2 (SK) with sentence 2 (EN)
- **AND** replaces all existing rows in the editor with 2 new rows:
  - Row 1: SK="Mám rád knihy", EN="I like books"
  - Row 2: SK="Pes beží rýchlo", EN="The dog runs fast"
- **AND** applies existing tokenization logic (split by spaces) to each sentence

#### Scenario: User imports text with mismatched sentence counts

- **GIVEN** a user pastes text with 3 Slovak sentences and 2 English sentences
- **WHEN** they click "Update"
- **THEN** the system creates 3 rows:
  - Row 1: SK="sentence 1", EN="sentence 1"
  - Row 2: SK="sentence 2", EN="sentence 2"
  - Row 3: SK="sentence 3", EN="" (empty)
- **AND** displays a warning message indicating mismatched counts
- **AND** the user can manually fill in the empty English field

#### Scenario: User imports text with more English than Slovak sentences

- **GIVEN** a user pastes text with 2 Slovak sentences and 3 English sentences
- **WHEN** they click "Update"
- **THEN** the system creates 3 rows:
  - Row 1: SK="sentence 1", EN="sentence 1"
  - Row 2: SK="sentence 2", EN="sentence 2"
  - Row 3: SK="" (empty), EN="sentence 3"
- **AND** displays a warning message indicating mismatched counts

#### Scenario: System parses multiple sentence separators

- **GIVEN** a user pastes text: "Hello! How are you? I am fine."
- **WHEN** the system parses this text
- **THEN** it splits into 3 sentences by detecting `.`, `!`, and `?` as separators
- **AND** trims whitespace from each sentence
- **AND** produces: ["Hello", "How are you", "I am fine"]

#### Scenario: User pastes text without two-newline separator

- **GIVEN** a user pastes text with Slovak and English sentences but only single newline or space between them
- **WHEN** they click "Update"
- **THEN** the system displays a warning message: "Expected format: Slovak sentences, two newlines, then English sentences"
- **AND** still attempts to import the data as a single-language block (all sentences treated as Slovak)
- **AND** leaves all English fields empty

#### Scenario: Bulk import component is collapsible and placed below row editor

- **GIVEN** a user views the word set editor
- **WHEN** the page loads
- **THEN** the bulk import section is collapsed by default using an Accordion component
- **AND** is positioned below the manual row editor section
- **AND** displays a clear title like "Bulk Import" or "Import from Text"
- **AND** clicking the accordion trigger expands the section

#### Scenario: Bulk import replaces all existing rows

- **GIVEN** a user has 5 existing word pairs in the editor
- **WHEN** they paste bulk text with 2 sentence pairs and click "Update"
- **THEN** the system removes all 5 existing rows
- **AND** creates 2 new rows from the imported text
- **AND** the total row count is 2 (not 7)

#### Scenario: Textarea provides helpful placeholder text

- **GIVEN** a user expands the bulk import section
- **WHEN** they view the empty textarea
- **THEN** the placeholder text shows the expected format:

  ```
  Slovak sentence 1. Slovak sentence 2.

  English sentence 1. English sentence 2.
  ```

- **AND** the placeholder is visible only when textarea is empty

#### Scenario: Update button is clearly labeled and positioned

- **GIVEN** a user has pasted text into the bulk import textarea
- **WHEN** they view the bulk import section
- **THEN** the "Update" button is clearly visible below the textarea
- **AND** labeled with an appropriate translation key
- **AND** clicking it triggers the parsing and row replacement

#### Scenario: Bulk import preserves sentence tokenization compatibility

- **GIVEN** a user imports sentences via bulk import
- **WHEN** the system creates rows from parsed sentences
- **THEN** each sentence is tokenized using the same logic as manual entry (split by spaces)
- **AND** produces the same token array structure `[{ text: "word1" }, { text: "word2" }]`
- **AND** is compatible with quiz functionality and export/import

#### Scenario: Empty textarea produces no changes

- **GIVEN** a user expands bulk import section
- **WHEN** they click "Update" without pasting any text
- **THEN** the system does not modify existing rows
- **AND** optionally displays a message "No text to import"

#### Scenario: Whitespace is properly trimmed

- **GIVEN** a user pastes text with extra spaces: " Hello. \n\n World. "
- **WHEN** the system parses this text
- **THEN** it trims leading and trailing whitespace from each sentence
- **AND** produces: ["Hello", "World"]
- **AND** empty sentences (from extra periods) are filtered out

## MODIFIED Requirements

None.

## REMOVED Requirements

None.
