"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  startTransition,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadTestSets } from "@/lib/wordsets";
import {
  SourceLanguage,
  QuizState,
  initializeQuiz,
  revealAnswer,
  recordAnswer,
  calculateScore,
  updateWordSetStats,
  updateTotalPoints,
} from "@/lib/quiz";
import QuizSession from "@/components/quiz/QuizSession";
import QuizSummary from "@/components/quiz/QuizSummary";
import { useTranslations } from "next-intl";

type QuizPhase = "session" | "summary";

function QuizPageContent() {
  const t = useTranslations("Quiz");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phase, setPhase] = useState<QuizPhase>("session");
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  // Compute initial quiz state from search params
  const initialQuizState = useMemo(() => {
    const id = searchParams.get("id");
    const source = searchParams.get("source") as SourceLanguage | null;
    const random = searchParams.get("random") === "true";
    const timed = searchParams.get("timed") !== "false"; // Default to true

    // Validate required parameters
    if (!id || !source || (source !== "sk" && source !== "en")) {
      return null;
    }

    // Load test sets and find the requested one
    const testSets = loadTestSets();
    const testSet = testSets.find((ws) => ws.id === id);

    if (!testSet) {
      return null;
    }

    // Initialize quiz
    return initializeQuiz(testSet, source, random, timed);
  }, [searchParams]);

  // Redirect if invalid parameters, or initialize quiz state
  useEffect(() => {
    if (initialQuizState === null) {
      router.push("/");
    } else if (quizState === null) {
      startTransition(() => {
        setQuizState(initialQuizState);
      });
    }
  }, [initialQuizState, quizState, router]);

  function handleReveal(beforeTimeout: boolean = false) {
    if (!quizState) return;
    const newState = revealAnswer(quizState, beforeTimeout);
    setQuizState(newState);
  }

  function handleMarkAnswer(isCorrect: boolean) {
    if (!quizState) return;
    const newState = recordAnswer(quizState, isCorrect);
    setQuizState(newState);

    if (newState.completed) {
      updateWordSetStats(newState);
      updateTotalPoints(newState.sessionPoints);
      setPhase("summary");
    }
  }

  function handleRestartQuiz() {
    if (!quizState) return;
    // Reinitialize quiz with the same configuration
    const newState = initializeQuiz(
      quizState.config.testSet,
      quizState.config.sourceLanguage,
      quizState.config.randomOrder,
      quizState.config.timedMode,
    );
    setQuizState(newState);
    setPhase("session");
  }

  // Loading state
  if (!quizState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
        <div className="text-sm text-zinc-600">
          {t("loadingQuiz", { defaultValue: "Loading quiz..." })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      {phase === "session" && (
        <QuizSession
          state={quizState}
          onReveal={handleReveal}
          onMarkCorrect={() => handleMarkAnswer(true)}
          onMarkIncorrect={() => handleMarkAnswer(false)}
        />
      )}
      {phase === "summary" && (
        <QuizSummary
          result={calculateScore(quizState)}
          onRepeatQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
          <div className="text-sm text-zinc-600">Loading...</div>
        </div>
      }
    >
      <QuizPageContent />
    </Suspense>
  );
}
