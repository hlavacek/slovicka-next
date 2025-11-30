"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuizResult, SourceLanguage } from "@/lib/quiz";
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
    <div className="w-full max-w-2xl rounded-md border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">{t("summaryTitle")}</h2>

      <div className="mb-6 space-y-4">
        {/* Colorful animated success indicator */}
        <div className="rounded-lg border-2 border-zinc-200 overflow-hidden">
          <SuccessIndicator
            percentage={result.percentage}
            animate={true}
            showIcon={true}
            ariaLabel={t("scoreLabel")}
          />
        </div>

        <div className="flex items-center justify-between rounded-md border p-4">
          <span className="text-sm font-medium">{t("totalWords")}</span>
          <span className="text-2xl font-bold">{result.total}</span>
        </div>

        <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-4">
          <span className="text-sm font-medium text-green-900">
            {t("correctCount")}
          </span>
          <span className="text-2xl font-bold text-green-700">
            {result.correct}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 p-4">
          <span className="text-sm font-medium text-red-900">
            {t("incorrectCount")}
          </span>
          <span className="text-2xl font-bold text-red-700">
            {result.incorrect}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleRepeatQuiz}>{t("repeatQuizButton")}</Button>
        <Button onClick={handleStartNew} variant="outline">
          {t("startNewQuizButton")}
        </Button>
      </div>
    </div>
  );
}
