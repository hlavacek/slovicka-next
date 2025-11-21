"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { WordSet } from "@/lib/wordsets";
import { SourceLanguage } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import Link from "next/link";

type QuizSetupProps = {
  wordSets: WordSet[];
  onStart: (wordSet: WordSet, sourceLanguage: SourceLanguage) => void;
};

export default function QuizSetup({ wordSets, onStart }: QuizSetupProps) {
  const t = useTranslations("Quiz");
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<SourceLanguage>("sk");

  const canStart = selectedSetId !== null;

  function handleStart() {
    if (!selectedSetId) return;
    const wordSet = wordSets.find((ws) => ws.id === selectedSetId);
    if (!wordSet) return;
    onStart(wordSet, sourceLanguage);
  }

  if (wordSets.length === 0) {
    return (
      <div className="w-full max-w-2xl rounded-md border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">{t("title")}</h2>
        <p className="mb-4 text-sm text-zinc-600">{t("noWordSets")}</p>
        <Link href="/word-sets/new">
          <Button>{t("createWordSetLink")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-md border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{t("title")}</h2>
      <p className="mb-4 text-sm text-zinc-600">{t("instructions")}</p>

      <div className="mb-6 gap-4 flex">
        <label className="text-sm font-medium items-center flex">
          {t("sourceLanguageLabel")}
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="language"
            value="sk"
            checked={sourceLanguage === "sk"}
            onChange={() => setSourceLanguage("sk")}
            className="h-4 w-4"
          />
          <span>{t("slovakLabel")}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="language"
            value="en"
            checked={sourceLanguage === "en"}
            onChange={() => setSourceLanguage("en")}
            className="h-4 w-4"
          />
          <span>{t("englishLabel")}</span>
        </label>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          {t("selectWordSetLabel")}
        </label>
        <div className="flex flex-col gap-2">
          {wordSets.map((ws) => (
            <label
              key={ws.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors hover:bg-zinc-50",
                selectedSetId === ws.id && "border-blue-500 bg-blue-50"
              )}
            >
              <input
                type="radio"
                name="wordset"
                value={ws.id}
                checked={selectedSetId === ws.id}
                onChange={(e) => setSelectedSetId(e.target.value)}
                className="h-4 w-4"
              />
              <div>
                <div className="font-medium">{ws.name}</div>
                <div className="text-sm text-zinc-500">
                  {ws.entries.length} {t("entriesLabel")}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex mb-6 gap-4">
        <Button onClick={handleStart} disabled={!canStart}>
          {t("startButton")}
        </Button>

        <Link href="/word-sets/new">
          <Button variant="outline">{t("createNewWordSetLink")}</Button>
        </Link>
      </div>
    </div>
  );
}
