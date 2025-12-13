## ADDED Requirements

### Requirement: Quiz Points System

The system SHALL implement a points-based scoring system that awards points for correct answers during quiz sessions, tracks total accumulated points across all quizzes, and displays points with playful, kid-friendly visual elements to create a game-like experience that motivates continued learning.

#### Scenario: User earns points for correct answer during quiz

- **GIVEN** a user is in an active quiz session
- **WHEN** they reveal an answer and mark it as correct
- **THEN** the system awards 1 point for the correct answer
- **AND** updates the session points counter displayed on the screen
- **AND** the updated points display with a smooth animation or transition
- **AND** the points counter is prominently visible throughout the quiz

#### Scenario: User earns no points for incorrect answer

- **GIVEN** a user is in an active quiz session
- **WHEN** they reveal an answer and mark it as incorrect
- **THEN** the system awards 0 points
- **AND** the session points counter remains unchanged
- **AND** no negative points or penalties are applied

#### Scenario: Session points start at zero

- **GIVEN** a user starts a new quiz session
- **WHEN** the quiz initializes
- **THEN** the session points counter displays 0 points
- **AND** the counter is visible from the first question

#### Scenario: Session points accumulate throughout quiz

- **GIVEN** a user has answered 3 questions correctly and 2 incorrectly
- **WHEN** they view the current session points
- **THEN** the system displays 3 points (3 × 1)
- **AND** the counter updates in real-time after each answer

#### Scenario: Quiz summary displays session points earned

- **GIVEN** a user completes a quiz session with 5 points earned
- **WHEN** they view the quiz summary page
- **THEN** the system displays the session points earned (5 points)
- **AND** presents the points with playful, celebratory styling
- **AND** uses kid-friendly visual elements (e.g., stars, badges, colorful text)

#### Scenario: Total points persist across quiz sessions

- **GIVEN** a user has 100 total accumulated points from previous quizzes
- **WHEN** they complete a new quiz and earn 3 points
- **THEN** the system updates the total points to 103
- **AND** persists the total in localStorage under key "slovicka:totalPoints"
- **AND** the total points are available across browser sessions

#### Scenario: Quiz setup displays total accumulated points

- **GIVEN** a user has accumulated 250 total points
- **WHEN** they view the quiz setup page
- **THEN** the system displays the total points prominently
- **AND** includes playful icons (stars, trophies, sparkles) alongside the points
- **AND** the display is visually appealing and kid-friendly
- **AND** the points display is positioned near the top of the page or in a dedicated section

#### Scenario: Quiz summary displays updated total points

- **GIVEN** a user completes a quiz earning 4 session points
- **AND** they had 200 total points before the quiz
- **WHEN** they view the quiz summary
- **THEN** the system displays the updated total points (204)
- **AND** shows both session points and total points
- **AND** uses playful visual presentation consistent with the game-like theme

#### Scenario: New users start with zero total points

- **GIVEN** a user visits the app for the first time
- **WHEN** the quiz setup page loads
- **THEN** the system initializes total points to 0
- **AND** displays 0 total points on the quiz setup page
- **AND** stores this initial value in localStorage

#### Scenario: Points display is accessible

- **GIVEN** a user is viewing points information
- **WHEN** they use assistive technologies
- **THEN** the points counter has appropriate ARIA labels
- **AND** screen readers announce point changes
- **AND** the visual styling maintains sufficient color contrast

#### Scenario: Points values are translatable

- **GIVEN** the application supports multiple languages
- **WHEN** points are displayed in the interface
- **THEN** all labels (e.g., "Points", "Total Points", "Session Points") use translation keys
- **AND** the translations are available in both English and Slovak
- **AND** numeric point values display correctly in both languages
