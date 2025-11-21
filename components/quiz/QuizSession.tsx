"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { QuizState } from "@/lib/quiz"
import { speakWord } from "@/lib/speech"

type QuizSessionProps = {
  state: QuizState
  onReveal: () => void
  onMarkCorrect: () => void
  onMarkIncorrect: () => void
}

export default function QuizSession({
  state,
  onReveal,
  onMarkCorrect,
  onMarkIncorrect,
}: QuizSessionProps) {
  const t = useTranslations("Quiz")
  const currentQuestion = state.questions[state.currentIndex]
  const progress = `${state.currentIndex + 1} / ${state.questions.length}`

  // Speak the target word when the answer is revealed
  React.useEffect(() => {
    if (currentQuestion.revealed) {
      // Determine target language (opposite of source language)
      const targetLanguage = state.config.sourceLanguage === "sk" ? "en" : "sk"
      speakWord(currentQuestion.targetWord, targetLanguage)
    }
  }, [currentQuestion.revealed, currentQuestion.targetWord, state.config.sourceLanguage])

  return (
    <div className="w-full max-w-2xl rounded-md border bg-white p-6 shadow-sm">
      <div className="mb-4 text-sm text-zinc-500">
        {t("progressLabel")}: {progress}
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-zinc-600">
          {state.config.sourceLanguage === "sk"
            ? t("slovakLabel")
            : t("englishLabel")}
        </h2>
        <div className="text-2xl font-semibold">{currentQuestion.sourceWord}</div>
      </div>

      {currentQuestion.revealed && (
        <div className="mb-8">
          <h2 className="mb-2 text-sm font-medium text-zinc-600">
            {state.config.sourceLanguage === "sk"
              ? t("englishLabel")
              : t("slovakLabel")}
          </h2>
          <div className="text-2xl font-semibold text-blue-600">
            {currentQuestion.targetWord}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {!currentQuestion.revealed && (
          <Button onClick={onReveal}>{t("showAnswerButton")}</Button>
        )}
        {currentQuestion.revealed && (
          <>
            <Button onClick={onMarkCorrect} variant="default">
              {t("markCorrectButton")}
            </Button>
            <Button onClick={onMarkIncorrect} variant="outline">
              {t("markIncorrectButton")}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
