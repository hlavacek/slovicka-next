/**
 * Speech synthesis utilities for pronouncing words during quiz sessions.
 * Uses the browser's Web Speech API for text-to-speech.
 */

/**
 * Map language codes to speech synthesis locale codes
 */
function getLocaleCode(language: "sk" | "en"): string {
  return language === "sk" ? "sk-SK" : "en-GB";
}

/**
 * Find the best available voice for the given language.
 * Prefers voices that match the locale exactly, falls back to language prefix.
 */
function findVoiceForLanguage(
  language: "sk" | "en",
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const localeCode = getLocaleCode(language);
  const languagePrefix = language;
  // First, try to find an exact locale match (e.g., "sk-SK")
  const exactMatchFemale = voices.find(
    (voice) => voice.lang === localeCode && voice.name.match(/.*female.*/i)
  );
  if (exactMatchFemale) return exactMatchFemale;

  // First, try to find an exact locale match (e.g., "sk-SK")
  const exactMatch = voices.find(
    (voice) => voice.lang === localeCode);
  if (exactMatch) return exactMatch;

  // Fall back to any voice that starts with the language code (e.g., "sk")
  const prefixMatch = voices.find((voice) =>
    voice.lang.startsWith(languagePrefix)
  );
  if (prefixMatch) return prefixMatch;

  // No suitable voice found
  return null;
}

/**
 * Speak the given word using the browser's speech synthesis API.
 * Automatically selects the appropriate voice for the language.
 * Gracefully handles cases where speech synthesis is unavailable.
 *
 * @param word - The word or text to pronounce
 * @param language - The language of the word ('sk' for Slovak, 'en' for English)
 */
export function speakWord(word: string, language: "sk" | "en"): void {
  // Check if speech synthesis is supported
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return; // Gracefully degrade - no speech on unsupported browsers
  }

  try {
    // Cancel any ongoing speech to avoid overlapping
    window.speechSynthesis.cancel();

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    const voice = findVoiceForLanguage(language, voices);

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(word);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      // No voice found, use default with locale code
      utterance.lang = getLocaleCode(language);
    }

    // Speak the word
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    // Silently fail - speech is an enhancement, not critical functionality
    console.debug("Speech synthesis failed:", error);
  }
}
