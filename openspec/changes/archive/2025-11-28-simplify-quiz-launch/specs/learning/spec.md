# learning

## MODIFIED Requirements

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
