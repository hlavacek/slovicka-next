# learning Spec Changes

## MODIFIED Requirements

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

## REMOVED Requirements

### Scenario: REMOVED - Two-newline separator detection

_(This scenario is no longer applicable as the separator is not needed with separate text areas)_

- **GIVEN** the old bulk import format required two newlines between Slovak and English
- **WHEN** the new separate textarea UI is implemented
- **THEN** separator detection logic is removed
- **AND** no warning about missing separator is shown
- **AND** users cannot accidentally forget the separator because it's not needed

### Scenario: REMOVED - No separator warning

_(The `bulkImportWarningNoSeparator` translation key and related logic are removed)_

- **GIVEN** the system previously warned users when separator was missing
- **WHEN** the new UI is active
- **THEN** this warning no longer exists
- **AND** the translation key is removed from message files
