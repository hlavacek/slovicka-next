# learning Spec Delta

## MODIFIED Requirements

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
