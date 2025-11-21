import { WordSet } from "./wordsets";

export type SourceLanguage = "sk" | "en";

export type QuizConfig = {
  wordSet: WordSet;
  sourceLanguage: SourceLanguage;
};

export type QuizQuestion = {
  index: number;
  sourceWord: string;
  targetWord: string;
  answered: boolean;
  correct: boolean | null;
  revealed: boolean;
};

export type QuizState = {
  config: QuizConfig;
  questions: QuizQuestion[];
  currentIndex: number;
  completed: boolean;
};

export type QuizResult = {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
};

export function initializeQuiz(
  wordSet: WordSet,
  sourceLanguage: SourceLanguage,
): QuizState {
  const questions: QuizQuestion[] = wordSet.entries.map((entry, index) => ({
    index,
    sourceWord: sourceLanguage === "sk" ? entry.sk : entry.en,
    targetWord: sourceLanguage === "sk" ? entry.en : entry.sk,
    answered: false,
    correct: null,
    revealed: false,
  }));

  return {
    config: { wordSet, sourceLanguage },
    questions,
    currentIndex: 0,
    completed: false,
  };
}

export function revealAnswer(state: QuizState): QuizState {
  const newQuestions = [...state.questions];
  newQuestions[state.currentIndex] = {
    ...newQuestions[state.currentIndex],
    revealed: true,
  };

  return {
    ...state,
    questions: newQuestions,
  };
}

export function recordAnswer(state: QuizState, isCorrect: boolean): QuizState {
  const newQuestions = [...state.questions];
  newQuestions[state.currentIndex] = {
    ...newQuestions[state.currentIndex],
    answered: true,
    correct: isCorrect,
  };

  const isLastQuestion = state.currentIndex === state.questions.length - 1;
  const nextIndex = isLastQuestion
    ? state.currentIndex
    : state.currentIndex + 1;

  return {
    ...state,
    questions: newQuestions,
    currentIndex: nextIndex,
    completed: isLastQuestion,
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
  };
}
