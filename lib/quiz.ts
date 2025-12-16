import { TestSet, saveTestSet } from "./wordsets";
import { shuffleArray } from "./utils";

export const POINTS_PER_CORRECT_ANSWER = 1;
export const BONUS_POINTS_PER_FAST_CORRECT_ANSWER = 2;

export type SourceLanguage = "sk" | "en";

export type QuizConfig = {
  testSet: TestSet;
  sourceLanguage: SourceLanguage;
  randomOrder: boolean;
  timedMode: boolean;
};

export type QuizQuestion = {
  index: number;
  sourceWord: string;
  targetWord: string;
  answered: boolean;
  correct: boolean | null;
  revealed: boolean;
  revealedBeforeTimeout: boolean;
};

export type QuizState = {
  config: QuizConfig;
  questions: QuizQuestion[];
  currentIndex: number;
  completed: boolean;
  sessionPoints: number;
};

export type QuizResult = {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
  sessionPoints: number;
};

export function initializeQuiz(
  testSet: TestSet,
  sourceLanguage: SourceLanguage,
  randomOrder: boolean = false,
  timedMode: boolean = true,
  filter?: "known" | "unknown",
): QuizState {
  // Filter entries based on knowledge level if filter is provided
  let filteredEntries = testSet.entries;
  if (filter) {
    filteredEntries = testSet.entries.filter(
      (entry) => entry.knowledgeLevel === filter,
    );
  }

  const questions: QuizQuestion[] = filteredEntries.map((entry) => {
    // Find the original index in testSet.entries
    const originalIndex = testSet.entries.indexOf(entry);

    return {
      index: originalIndex,
      sourceWord:
        sourceLanguage === "sk"
          ? entry.sk.map((t) => t.text).join(" ")
          : entry.en.map((t) => t.text).join(" "),
      targetWord:
        sourceLanguage === "sk"
          ? entry.en.map((t) => t.text).join(" ")
          : entry.sk.map((t) => t.text).join(" "),
      answered: false,
      correct: null,
      revealed: false,
      revealedBeforeTimeout: false,
    };
  });

  const finalQuestions = randomOrder ? shuffleArray(questions) : questions;

  return {
    config: { testSet, sourceLanguage, randomOrder, timedMode },
    questions: finalQuestions,
    currentIndex: 0,
    completed: false,
    sessionPoints: 0,
  };
}

export function revealAnswer(
  state: QuizState,
  beforeTimeout: boolean = false,
): QuizState {
  const newQuestions = [...state.questions];
  newQuestions[state.currentIndex] = {
    ...newQuestions[state.currentIndex],
    revealed: true,
    revealedBeforeTimeout: beforeTimeout,
  };

  return {
    ...state,
    questions: newQuestions,
  };
}

export function recordAnswer(state: QuizState, isCorrect: boolean): QuizState {
  const newQuestions = [...state.questions];
  const currentQuestion = newQuestions[state.currentIndex];

  newQuestions[state.currentIndex] = {
    ...currentQuestion,
    answered: true,
    correct: isCorrect,
  };

  const isLastQuestion = state.currentIndex === state.questions.length - 1;
  const nextIndex = isLastQuestion
    ? state.currentIndex
    : state.currentIndex + 1;

  // Calculate points: bonus if timed mode enabled and revealed before timeout
  let pointsToAdd = 0;
  if (isCorrect) {
    if (state.config.timedMode && currentQuestion.revealedBeforeTimeout) {
      pointsToAdd = BONUS_POINTS_PER_FAST_CORRECT_ANSWER;
    } else {
      pointsToAdd = POINTS_PER_CORRECT_ANSWER;
    }
  }

  return {
    ...state,
    questions: newQuestions,
    currentIndex: nextIndex,
    completed: isLastQuestion,
    sessionPoints: state.sessionPoints + pointsToAdd,
  };
}

export function calculateScore(state: QuizState): QuizResult {
  const total = state.questions.length;
  const correct = state.questions.filter((q) => q.correct === true).length;
  const incorrect = state.questions.filter((q) => q.correct === false).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    correct,
    incorrect,
    percentage,
    sessionPoints: state.sessionPoints,
  };
}

export function updateWordSetStats(state: QuizState): void {
  const result = calculateScore(state);
  const updatedTestSet = updateKnowledgeLevels(state);
  const finalTestSet: TestSet = {
    ...updatedTestSet,
    lastQuizStats: {
      correct: result.correct,
      total: result.total,
    },
  };
  saveTestSet(finalTestSet);
}

export function getTotalPoints(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem("slovicka:totalPoints");
  return stored ? parseInt(stored, 10) : 0;
}

export function updateTotalPoints(sessionPoints: number): void {
  if (typeof window === "undefined") return;
  const currentTotal = getTotalPoints();
  const newTotal = currentTotal + sessionPoints;
  localStorage.setItem("slovicka:totalPoints", newTotal.toString());
}

/**
 * Get indices of test pairs that were answered incorrectly in the quiz
 */
export function getUnknownPairIndices(state: QuizState): number[] {
  return state.questions.filter((q) => q.correct === false).map((q) => q.index);
}

/**
 * Update knowledge levels for test pairs based on quiz results
 * Returns a new TestSet with updated knowledge levels
 */
export function updateKnowledgeLevels(state: QuizState): TestSet {
  const updatedEntries = state.config.testSet.entries.map((entry, index) => {
    const question = state.questions.find((q) => q.index === index);

    // If this pair was not included in the quiz, preserve its existing knowledge level
    if (!question) {
      return entry;
    }

    // Update knowledge level based on correctness
    const knowledgeLevel: "known" | "unknown" =
      question.correct === true ? "known" : "unknown";
    return {
      ...entry,
      knowledgeLevel,
    };
  });

  return {
    ...state.config.testSet,
    entries: updatedEntries,
  };
}
