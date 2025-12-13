# learning Spec Delta

## MODIFIED Requirements

### Requirement: Quiz Setup Interface

The system SHALL provide a quiz setup interface where users can select a word set to immediately launch a quiz. **The system SHALL provide a search input to filter word sets by name and display a scrollable list showing a maximum of 3 word sets at a time.** When the user clicks a word set, the system SHALL immediately navigate to the `/quiz` route with the currently selected settings. **The system SHALL organize source language, question order, and timed mode settings in a collapsible accordion section titled "Settings" that is collapsed by default, with default values of source language = Slovak, random order = true, and timed mode = true.** **The system SHALL display the success rate from the most recent quiz for each word set using a colorful, animated progress fill background on the word set card that indicates performance level with kid-friendly colors and icons.**

#### Scenario: Timed mode toggle controls bonus points

- **GIVEN** a user is on the quiz setup page
- **WHEN** they expand the settings accordion
- **THEN** the system displays a "Timed Mode" toggle switch
- **AND** the toggle is enabled by default
- **AND** a label explains that timed mode awards bonus points for fast answers
- **AND** the label is translated appropriately for the current locale

#### Scenario: Timed mode setting persists in quiz URL

- **GIVEN** a user has disabled timed mode in settings
- **WHEN** they click a word set card to launch a quiz
- **THEN** the system navigates to `/quiz?id=<wordset-id>&source=<source>&random=<random>&timed=false`
- **AND** the quiz initializes with timed mode disabled

#### Scenario: Default quiz configuration includes timed mode

- **GIVEN** a user clicks a word set card without changing settings
- **WHEN** the quiz initializes
- **THEN** the quiz uses timed mode enabled (default)
- **AND** the countdown timer will be displayed during the quiz session

### Requirement: Sequential Quiz Flow

The system SHALL present words from the selected word set one at a time, either in sequential or randomized order based on user preference, allowing users to self-assess their knowledge. **The system SHALL display quiz progress using a visual progress bar component alongside a text label for accessibility. When timed mode is enabled, the system SHALL display a 5-second countdown timer in the "Show Answer" button, award 2 bonus points for correct answers revealed before timeout, and award standard 1 point for correct answers revealed after timeout.**

#### Scenario: Countdown timer displays in Show Answer button

- **GIVEN** a user is taking a quiz with timed mode enabled
- **WHEN** a new question is displayed and the answer is not yet revealed
- **THEN** the system displays a countdown timer in the "Show Answer" button
- **AND** the button text shows "Show Answer (5)" initially
- **AND** the countdown decrements every second: (5), (4), (3), (2), (1)
- **AND** when the timer reaches 0, the button text changes to "Show Answer" without countdown

#### Scenario: User reveals answer before timer expires

- **GIVEN** a user is taking a quiz with timed mode enabled
- **AND** the countdown timer shows 3 seconds remaining
- **WHEN** the user clicks the "Show Answer" button
- **THEN** the system reveals the answer immediately
- **AND** records that the answer was revealed before timeout
- **AND** the timer stops and is cleared
- **AND** the countdown is no longer visible

#### Scenario: User reveals answer after timer expires

- **GIVEN** a user is taking a quiz with timed mode enabled
- **AND** the countdown timer has reached 0
- **WHEN** the user clicks the "Show Answer" button
- **THEN** the system reveals the answer immediately
- **AND** records that the answer was NOT revealed before timeout
- **AND** the button shows only "Show Answer" without any countdown

#### Scenario: Bonus points awarded for fast correct answer

- **GIVEN** a user revealed an answer before the timer expired (timed mode enabled)
- **WHEN** the user marks the answer as correct
- **THEN** the system awards 2 points for this question
- **AND** updates the session points total by adding 2
- **AND** the bonus points are reflected in the final quiz results

#### Scenario: Standard points awarded for slow correct answer

- **GIVEN** a user revealed an answer after the timer expired (timed mode enabled)
- **WHEN** the user marks the answer as correct
- **THEN** the system awards 1 point for this question (standard)
- **AND** updates the session points total by adding 1
- **AND** the standard points are reflected in the final quiz results

#### Scenario: No points awarded for incorrect answer regardless of timer

- **GIVEN** a user revealed an answer (before OR after timer expired, timed mode enabled)
- **WHEN** the user marks the answer as incorrect
- **THEN** the system awards 0 points for this question
- **AND** the session points total remains unchanged
- **AND** no points are reflected for this question in final results

#### Scenario: Timer resets for each new question

- **GIVEN** a user completes a question in timed mode
- **WHEN** the next question is displayed
- **THEN** the system resets the countdown timer to 5 seconds
- **AND** starts counting down automatically
- **AND** the "Show Answer" button displays the countdown from the beginning

#### Scenario: Timed mode disabled shows no timer

- **GIVEN** a user is taking a quiz with timed mode disabled
- **WHEN** a new question is displayed
- **THEN** the system does NOT display any countdown timer
- **AND** the "Show Answer" button shows only "Show Answer" text
- **AND** all correct answers are worth 1 point (standard, no bonus)

#### Scenario: Keyboard accessibility with countdown timer

- **GIVEN** a user is taking a quiz with timed mode enabled using keyboard only
- **WHEN** they press Tab to focus the "Show Answer" button during countdown
- **THEN** the button receives focus with clear visual indicator
- **AND** pressing Enter or Space reveals the answer immediately
- **AND** the system correctly tracks whether reveal happened before timeout
- **AND** the countdown does not interfere with keyboard navigation

### Requirement: Quiz Session State

The system SHALL maintain quiz session state in memory on the `/quiz` page and reset when a new quiz is started or the page is reloaded. The quiz SHALL read configuration from query parameters (`id`, `source`, `random`, **`timed`**) and handle missing or invalid parameters gracefully.

#### Scenario: Quiz loads timed mode from query parameters

- **GIVEN** a user navigates to `/quiz?id=<valid-wordset-id>&source=sk&random=true&timed=true`
- **WHEN** the page loads
- **THEN** the system loads the word set from localStorage using the provided `id`
- **AND** initializes the quiz with the specified source language (`sk`)
- **AND** applies random order if `random=true`
- **AND** enables timed mode with countdown timer
- **AND** displays the first question with countdown active

#### Scenario: Missing timed parameter defaults to true

- **GIVEN** a user navigates to `/quiz?id=<valid-wordset-id>&source=sk&random=true` (no timed parameter)
- **WHEN** the page loads
- **THEN** the system defaults timed mode to `true`
- **AND** initializes the quiz with countdown timer enabled
- **AND** awards bonus points for fast correct answers

#### Scenario: Timed mode false disables countdown and bonus

- **GIVEN** a user navigates to `/quiz?id=<valid-wordset-id>&source=sk&random=true&timed=false`
- **WHEN** the page loads
- **THEN** the system initializes the quiz with timed mode disabled
- **AND** does not display countdown timer on any question
- **AND** awards only standard 1 point for correct answers

## ADDED Requirements

### Requirement: Timed Quiz Bonus Points

**When timed mode is enabled, the system SHALL display a 5-second countdown timer in the "Show Answer" button for each question. The system SHALL award 2 bonus points for correct answers revealed before the timer expires and 1 standard point for correct answers revealed after the timer expires. Timed mode SHALL be optional and configurable in quiz settings with a default value of enabled.**

#### Scenario: Timer state persists until answer revealed or expired

- **GIVEN** a user is viewing a question with countdown active
- **WHEN** the timer is counting down (e.g., at 3 seconds)
- **THEN** the system continues decrementing the timer every second
- **AND** the button text updates in real-time
- **AND** the timer does not reset or pause unless answer is revealed
- **AND** when timer reaches 0, it stops and remains at 0

#### Scenario: Timer does not interfere with speech pronunciation

- **GIVEN** a user reveals an answer (before or after timeout)
- **WHEN** the answer is displayed and speech pronunciation begins
- **THEN** the countdown timer stops and is cleared
- **AND** speech pronunciation works normally
- **AND** no timer-related warnings or errors appear in console

#### Scenario: Points calculation uses timer status

- **GIVEN** the quiz state tracks `revealedBeforeTimeout` for each question
- **WHEN** a user marks an answer as correct
- **THEN** the system checks if `config.timedMode` is enabled
- **AND** if timed mode enabled AND `revealedBeforeTimeout` is true: awards 2 points
- **AND** if timed mode enabled AND `revealedBeforeTimeout` is false: awards 1 point
- **AND** if timed mode disabled: always awards 1 point regardless of timer status

#### Scenario: Quiz results reflect bonus points correctly

- **GIVEN** a user completes a quiz with timed mode enabled
- **AND** earned bonus points on some questions
- **WHEN** the quiz summary is displayed
- **THEN** the session points total includes all bonus points
- **AND** the total points in localStorage are updated correctly
- **AND** the displayed points match the calculated points from the quiz logic
