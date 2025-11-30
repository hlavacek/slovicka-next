## MODIFIED Requirements

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
