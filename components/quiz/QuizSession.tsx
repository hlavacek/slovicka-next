"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizState } from "@/lib/quiz";
import { speakWord } from "@/lib/speech";

type QuizSessionProps = {
  state: QuizState;
  onReveal: () => void;
  onMarkCorrect: () => void;
  onMarkIncorrect: () => void;
};

export default function QuizSession({
  state,
  onReveal,
  onMarkCorrect,
  onMarkIncorrect,
}: QuizSessionProps) {
  const t = useTranslations("Quiz");
  const currentQuestion = state.questions[state.currentIndex];
  const progress = `${state.currentIndex + 1} / ${state.questions.length}`;
  const progressPercentage =
    ((state.currentIndex + 1) / state.questions.length) * 100;

  // Speak the target word when the answer is revealed
  React.useEffect(() => {
    if (currentQuestion.revealed) {
      // Determine target language (opposite of source language)
      const targetLanguage = state.config.sourceLanguage === "sk" ? "en" : "sk";
      speakWord(currentQuestion.targetWord, targetLanguage);
    }
  }, [
    currentQuestion.revealed,
    currentQuestion.targetWord,
    state.config.sourceLanguage,
  ]);

  return (
    <div
      className="w-full max-w-2xl rounded-lg border bg-white p-8 shadow-sm flex flex-col"
      style={{ minHeight: "300px" }}
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-zinc-600">
            {t("progressLabel")}
          </span>
          <span className="text-sm font-medium text-zinc-600">{progress}</span>
        </div>
        <Progress
          value={progressPercentage}
          aria-label={`${t("progressLabel")}: ${progress}`}
          className="h-3 bg-zinc-200"
        />
      </div>

      {/* Points Display */}
      {/* <div className="mb-6 flex items-center justify-center gap-2">
        <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
        <span
          className="text-3xl font-bold text-amber-600 transition-all duration-300"
          aria-label={`${t("currentPoints")}: ${state.sessionPoints}`}
        >
          {state.sessionPoints}
        </span>
        <span className="text-lg font-semibold text-zinc-600">
          {t("currentPoints")}
        </span>
      </div> */}

      <div className="mb-8 bg-zinc-50 rounded-lg p-6 border border-zinc-200">
        <div className="text-4xl font-bold text-zinc-900 text-center">
          {currentQuestion.sourceWord}
        </div>
      </div>

      <div className="mb-8" style={{ minHeight: "80px" }}>
        {currentQuestion.revealed && (
          <div className="bg-green-50 rounded-lg p-6 border border-green-200 animate-bounce-in">
            <div className="text-4xl font-bold text-green-700 text-center">
              {currentQuestion.targetWord}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-auto">
        {!currentQuestion.revealed && (
          <Button
            onClick={onReveal}
            className="flex-1 h-14 text-lg font-semibold"
          >
            <Eye className="mr-2 h-5 w-5" />
            {t("showAnswerButton")}
          </Button>
        )}
        {currentQuestion.revealed && (
          <>
            <Button
              onClick={onMarkCorrect}
              className="flex-1 h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              {t("markCorrectButton")}
            </Button>
            <Button
              onClick={onMarkIncorrect}
              className="flex-1 h-14 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white"
            >
              <XCircle className="mr-2 h-5 w-5" />
              {t("markIncorrectButton")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
