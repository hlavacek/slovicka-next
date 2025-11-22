"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuizResult } from "@/lib/quiz";

type QuizSummaryProps = {
  result: QuizResult;
  wordSetId?: string;
};

export default function QuizSummary({ result, wordSetId }: QuizSummaryProps) {
  const t = useTranslations("Quiz");
  const router = useRouter();

  function handleStartNew() {
    const url = wordSetId ? `/?wordset=${wordSetId}` : "/";
    router.push(url);
  }

  return (
    <div className="w-full max-w-2xl rounded-md border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">{t("summaryTitle")}</h2>

      <div className="mb-6 space-y-4">
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

        <div className="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50 p-4">
          <span className="text-sm font-medium text-blue-900">
            {t("scoreLabel")}
          </span>
          <span className="text-2xl font-bold text-blue-700">
            {result.percentage}%
          </span>
        </div>
      </div>

      <Button onClick={handleStartNew}>{t("startNewQuizButton")}</Button>
    </div>
  );
}
