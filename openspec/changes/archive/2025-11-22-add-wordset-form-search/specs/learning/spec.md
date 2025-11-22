## MODIFIED Requirements

### Requirement: Word Set Creation

The system SHALL provide a user interface for creating custom vocabulary word sets containing Slovak ↔ English word pairs with navigation back to the quiz page. Interactive buttons SHALL include visual icons to enhance usability while maintaining accessibility. **The system SHALL allow users to update existing word sets by loading them into the form and saving changes, preserving the original word set ID.** **The system SHALL provide a search input to filter saved word sets by name and display a scrollable list showing a maximum of 3 saved word sets at a time.**

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

#### Scenario: User searches saved word sets by name

- **GIVEN** a user has multiple saved word sets
- **WHEN** they type a search term into the search input above the saved sets list
- **THEN** the system filters the saved word sets list to show only word sets whose names contain the search term (case-insensitive)
- **AND** the filtered list updates as the user types
- **AND** displays matching word sets in a scrollable list

#### Scenario: Saved word sets list displays maximum 3 items with scroll

- **GIVEN** a user has more than 3 saved word sets (filtered or unfiltered)
- **WHEN** they view the saved word sets list
- **THEN** the system displays a maximum of 3 word sets at a time
- **AND** provides vertical scrolling to access additional word sets
- **AND** the scroll container has a fixed maximum height

#### Scenario: Empty search shows all saved word sets ordered by ID

- **GIVEN** a user has saved word sets
- **WHEN** the search input is empty
- **THEN** the system displays all saved word sets ordered by their ID
- **AND** the list remains scrollable if more than 3 word sets exist

#### Scenario: Search with no matches shows empty state

- **GIVEN** a user enters a search term for saved word sets
- **WHEN** no word sets match the search term
- **THEN** the system displays an empty or "no results" state
- **AND** no word set actions (load, export, delete) are available

#### Scenario: Search input for saved sets is keyboard accessible

- **GIVEN** a user is navigating with keyboard only
- **WHEN** they tab to the search input for saved word sets
- **THEN** the search input receives focus with visible indicator
- **AND** they can type to filter saved word sets
- **AND** can tab to navigate through filtered results

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
