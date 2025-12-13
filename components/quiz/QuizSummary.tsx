"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizResult } from "@/lib/quiz";
import SuccessIndicator from "@/components/quiz/SuccessIndicator";

type QuizSummaryProps = {
  result: QuizResult;
  onRepeatQuiz?: () => void;
};

export default function QuizSummary({
  result,
  onRepeatQuiz,
}: QuizSummaryProps) {
  const t = useTranslations("Quiz");
  const router = useRouter();

  function handleStartNew() {
    const url = "/";
    router.push(url);
  }

  function handleRepeatQuiz() {
    if (onRepeatQuiz) {
      onRepeatQuiz();
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-lg border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">{t("summaryTitle")}</h2>

      <div className="mb-6 space-y-4">
        {/* Colorful animated success indicator */}
        <div className="rounded-lg border-2 border-zinc-200 overflow-hidden h-[104px]">
          <SuccessIndicator
            percentage={result.percentage}
            animate={true}
            showIcon={true}
            ariaLabel={t("scoreLabel")}
            className="w-full h-full"
          />
        </div>

        {/* <div className="flex items-center justify-between rounded-md border p-4">
          <span className="text-sm font-medium">{t("totalWords")}</span>
          <span className="text-2xl font-bold">{result.total}</span>
        </div> */}

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

      <div className="flex gap-3">
        <Button
          onClick={handleRepeatQuiz}
          className="flex-1 h-14 text-lg font-semibold"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          {t("repeatQuizButton")}
        </Button>
        <Button
          onClick={handleStartNew}
          variant="outline"
          className="flex-1 h-14 text-lg font-semibold"
        >
          <Home className="mr-2 h-5 w-5" />
          {t("startNewQuizButton")}
        </Button>
      </div>
    </div>
  );
}
