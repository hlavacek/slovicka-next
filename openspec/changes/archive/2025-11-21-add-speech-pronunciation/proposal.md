# Proposal: Add Speech Pronunciation

## Problem

When students reveal the correct answer during a quiz, they only see the written word. For language learning, hearing the pronunciation is crucial for developing proper speaking skills and associating sounds with written words. Currently, there's no audio feedback to help students learn correct pronunciation.

## Solution

Add text-to-speech (TTS) pronunciation using the browser's Web Speech API (`window.speechSynthesis`) when the correct answer is revealed during a quiz session.

### Key Changes

1. **Automatic pronunciation**: When a user clicks "Show Answer" and the target word is revealed, the system will automatically speak the word using the browser's built-in TTS.
2. **Language-aware speech**: The TTS will use the appropriate language voice (Slovak or English) based on the target language being displayed.
3. **Non-blocking**: Speech synthesis will not block the UI or prevent users from continuing with the quiz.
4. **Graceful degradation**: If the browser doesn't support speech synthesis or voices aren't available, the quiz will continue to work normally without audio.

### Implementation Approach

- Use the Web Speech API's `SpeechSynthesisUtterance` to create and speak text
- Select appropriate voice based on target language (sk-SK for Slovak, en-US or en-GB for English)
- Trigger speech automatically when `revealed` becomes true in QuizSession component
- Add a helper utility function in `lib/` to encapsulate speech logic
- No UI changes needed initially (speech happens automatically on reveal)

### User Experience

1. User starts a quiz and sees a word in the source language
2. User clicks "Show Answer"
3. The target word appears visually **AND** is spoken aloud automatically
4. User can proceed to mark correct/incorrect as before

### Browser Compatibility

- Web Speech API is supported in modern Chrome, Edge, Safari, and Firefox
- Fallback: if unsupported, quiz continues without audio (no error shown)

## Alternatives Considered

- **Manual play button**: Adding a speaker icon to manually trigger pronunciation. This adds UI complexity and requires an extra click. We can add this later if users want control.
- **External TTS service**: Using a cloud API would require network requests and API keys. The built-in browser API is free, private, and works offline.
- **Pre-recorded audio**: Would require recording and hosting audio files for every word, which is not scalable for user-created word sets.

## Impact

- **User experience**: Significantly improved learning experience with auditory reinforcement
- **Performance**: Minimal - speech synthesis is browser-native and async
- **Accessibility**: Beneficial for auditory learners and users with reading difficulties
- **Privacy**: No data sent to external services
- **Testing**: Requires manual testing on different browsers/devices as speech synthesis behavior can vary

## Dependencies

- None - uses browser-native Web Speech API
- Related to Sequential Quiz Flow requirement

## Open Questions

- Should speech be optional (toggle on/off)? → Start without toggle, add later if requested
- Should we support different voice selections? → Use default browser voices for now
- Should we handle cases where no voice is available for the language? → Graceful fallback (no error, just no speech)
