## MODIFIED Requirements

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
