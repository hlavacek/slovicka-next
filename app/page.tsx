"use client";

import React, { useState, useEffect, startTransition } from "react";
import { WordSet, loadWordSets } from "@/lib/wordsets";
import {
  SourceLanguage,
  QuizState,
  initializeQuiz,
  revealAnswer,
  recordAnswer,
  calculateScore,
} from "@/lib/quiz";
import QuizSetup from "@/components/quiz/QuizSetup";
import QuizSession from "@/components/quiz/QuizSession";
import QuizSummary from "@/components/quiz/QuizSummary";

type QuizPhase = "setup" | "session" | "summary";

export default function Home() {
  const [wordSets, setWordSets] = useState<WordSet[]>([]);
  const [phase, setPhase] = useState<QuizPhase>("setup");
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  // Load word sets on client side to avoid hydration mismatch
  useEffect(() => {
    const sets = loadWordSets();
    startTransition(() => {
      setWordSets(sets);
    });
  }, []);

  function handleStartQuiz(
    wordSet: WordSet,
    sourceLanguage: SourceLanguage,
    randomOrder: boolean,
  ) {
    const initialState = initializeQuiz(wordSet, sourceLanguage, randomOrder);
    setQuizState(initialState);
    setPhase("session");
  }

  function handleReveal() {
    if (!quizState) return;
    const newState = revealAnswer(quizState);
    setQuizState(newState);
  }

  function handleMarkAnswer(isCorrect: boolean) {
    if (!quizState) return;
    const newState = recordAnswer(quizState, isCorrect);
    setQuizState(newState);

    if (newState.completed) {
      setPhase("summary");
    }
  }

  function handleStartNew() {
    setQuizState(null);
    setPhase("setup");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      {phase === "setup" && (
        <QuizSetup wordSets={wordSets} onStart={handleStartQuiz} />
      )}
      {phase === "session" && quizState && (
        <QuizSession
          state={quizState}
          onReveal={handleReveal}
          onMarkCorrect={() => handleMarkAnswer(true)}
          onMarkIncorrect={() => handleMarkAnswer(false)}
        />
      )}
      {phase === "summary" && quizState && (
        <QuizSummary
          result={calculateScore(quizState)}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  );
}
