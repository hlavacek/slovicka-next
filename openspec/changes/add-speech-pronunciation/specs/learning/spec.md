## MODIFIED Requirements

### Requirement: Sequential Quiz Flow
The system SHALL present words from the selected word set one at a time in sequential order, allowing users to self-assess their knowledge, with automatic pronunciation of the target word when revealed.

#### Scenario: User reveals answer with pronunciation
- **GIVEN** a user is viewing a quiz question
- **WHEN** they click the "Show Answer" button
- **THEN** the system reveals the target language translation
- **AND** automatically pronounces the target word using text-to-speech
- **AND** uses the appropriate language voice (Slovak for Slovak words, English for English words)
- **AND** displays two buttons: "Mark Correct" and "Mark Incorrect"
- **AND** hides the "Show Answer" button

#### Scenario: Speech synthesis gracefully degrades
- **GIVEN** a user is taking a quiz in a browser without speech synthesis support
- **WHEN** they reveal an answer
- **THEN** the system displays the target word normally
- **AND** does not produce any error messages
- **AND** the quiz continues to function without audio

#### Scenario: Speech uses correct language voice
- **GIVEN** a user is practicing from Slovak to English
- **WHEN** they reveal an answer
- **THEN** the system speaks the English word using an English voice

- **GIVEN** a user is practicing from English to Slovak
- **WHEN** they reveal an answer
- **THEN** the system speaks the Slovak word using a Slovak voice

#### Scenario: Speech does not block quiz progression
- **GIVEN** a user has revealed an answer and speech is playing
- **WHEN** they click "Mark Correct" or "Mark Incorrect"
- **THEN** the system immediately advances to the next question
- **AND** does not wait for speech to finish
