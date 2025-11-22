"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  startTransition,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadWordSets } from "@/lib/wordsets";
import {
  SourceLanguage,
  QuizState,
  initializeQuiz,
  revealAnswer,
  recordAnswer,
  calculateScore,
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

    // Validate required parameters
    if (!id || !source || (source !== "sk" && source !== "en")) {
      return null;
    }

    // Load word sets and find the requested one
    const wordSets = loadWordSets();
    const wordSet = wordSets.find((ws) => ws.id === id);

    if (!wordSet) {
      return null;
    }

    // Initialize quiz
    return initializeQuiz(wordSet, source, random);
  }, [searchParams]);

  const wordSetId = searchParams.get("id");

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
          wordSetId={wordSetId || undefined}
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
