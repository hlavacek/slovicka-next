"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { RotateCcw, Home, Star, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizResult, QuizState, getUnknownPairIndices } from "@/lib/quiz";
import SuccessIndicator from "@/components/quiz/SuccessIndicator";

type QuizSummaryProps = {
  result: QuizResult;
  quizState: QuizState;
  onRepeatQuiz?: () => void;
  onTrainUnknown?: () => void;
};

export default function QuizSummary({
  result,
  quizState,
  onRepeatQuiz,
  onTrainUnknown,
}: QuizSummaryProps) {
  const t = useTranslations("Quiz");
  const router = useRouter();

  const unknownPairIndices = getUnknownPairIndices(quizState);
  const unknownCount = unknownPairIndices.length;

  function handleStartNew() {
    const url = "/";
    router.push(url);
  }

  function handleRepeatQuiz() {
    if (onRepeatQuiz) {
      onRepeatQuiz();
    }
  }

  function handleTrainUnknown() {
    if (onTrainUnknown) {
      onTrainUnknown();
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-lg border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">{t("summaryTitle")}</h2>

      <div className="mb-6 space-y-4">
        {/* Colorful animated success indicator */}
        <div className="rounded-lg border-2 border-zinc-200 overflow-hidden h-[88px]">
          <SuccessIndicator
            percentage={result.percentage}
            animate={true}
            showIcon={true}
            ariaLabel={t("scoreLabel")}
            className="w-full h-full"
          />
        </div>

        {/* Session Points Display */}
        <div className="flex items-center justify-between rounded-lg border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-amber-600 fill-amber-600" />
            <span className="text-lg font-semibold text-amber-900">
              {t("pointsEarned")}
            </span>
          </div>
          <span
            className="text-4xl font-bold text-amber-600"
            aria-label={`${t("pointsEarned")}: ${result.sessionPoints}`}
          >
            {result.sessionPoints}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-6">
          <span className="text-lg font-semibold text-green-900">
            {t("correctCount")}
          </span>
          <span className="text-4xl font-bold text-green-700">
            {result.correct}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-6">
          <span className="text-lg font-semibold text-red-900">
            {t("incorrectCount")}
          </span>
          <span className="text-4xl font-bold text-red-700">
            {result.incorrect}
          </span>
        </div>
      </div>

      {/* Train Unknown Pairs Button - only show if there are unknown pairs */}
      {unknownCount > 0 && <div className="mb-3"></div>}

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleRepeatQuiz}
          className="flex-1 min-w-[210px] h-14 text-lg font-semibold"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          {t("repeatQuizButton")}
        </Button>
        {unknownCount > 0 && (
          <Button
            onClick={handleTrainUnknown}
            className="flex-1 min-w-[210px] h-14 text-lg font-semibold bg-red-500 hover:bg-rose-400 text-white"
          >
            <Target className="mr-2 h-5 w-5" />
            {t("trainUnknownPairsButton", { count: unknownCount })}
          </Button>
        )}
        <Button
          onClick={handleStartNew}
          variant="outline"
          className="flex-1 min-w-[210px] h-14 text-lg font-semibold"
        >
          <Home className="mr-2 h-5 w-5" />
          {t("startNewQuizButton")}
        </Button>
      </div>
    </div>
  );
}
