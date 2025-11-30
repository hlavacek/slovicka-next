import { TestSet, saveTestSet } from "./wordsets";
import { shuffleArray } from "./utils";

export type SourceLanguage = "sk" | "en";

export type QuizConfig = {
  testSet: TestSet;
  sourceLanguage: SourceLanguage;
  randomOrder: boolean;
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
  testSet: TestSet,
  sourceLanguage: SourceLanguage,
  randomOrder: boolean = false,
): QuizState {
  const questions: QuizQuestion[] = testSet.entries.map((entry, index) => ({
    index,
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
  }));

  const finalQuestions = randomOrder ? shuffleArray(questions) : questions;

  return {
    config: { testSet, sourceLanguage, randomOrder },
    questions: finalQuestions,
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

export function updateWordSetStats(state: QuizState): void {
  const result = calculateScore(state);
  const updatedTestSet: TestSet = {
    ...state.config.testSet,
    lastQuizStats: {
      correct: result.correct,
      total: result.total,
    },
  };
  saveTestSet(updatedTestSet);
}
