"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TestSet } from "@/lib/wordsets";
import { SourceLanguage, getTotalPoints } from "@/lib/quiz";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SuccessIndicator from "@/components/quiz/SuccessIndicator";
import { Star, Sparkles, Trophy, Trash2 } from "lucide-react";

type QuizSetupProps = {
  wordSets: TestSet[];
};

export default function QuizSetup({ wordSets }: QuizSetupProps) {
  const t = useTranslations("Quiz");
  const router = useRouter();
  const [sourceLanguage, setSourceLanguage] = useState<SourceLanguage>("sk");
  const [randomOrder, setRandomOrder] = useState<boolean>(true);
  const [timedMode, setTimedMode] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedWordSet, setSelectedWordSet] = useState<TestSet | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  // Load total points on mount
  React.useEffect(() => {
    setTotalPoints(getTotalPoints());
  }, []);

  function handleResetPoints() {
    if (window.confirm(t("resetPointsConfirmation"))) {
      localStorage.setItem("slovicka:totalPoints", "0");
      setTotalPoints(0);
    }
  }

  // Filter and sort word sets
  const filteredWordSets = React.useMemo(() => {
    let filtered = wordSets;

    // Filter by search term if provided
    if (searchTerm.trim()) {
      filtered = wordSets.filter((ws) =>
        ws.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort by ID when no search term
    if (!searchTerm.trim()) {
      filtered = [...filtered].sort((a, b) => a.id.localeCompare(b.id));
    }

    return filtered;
  }, [wordSets, searchTerm]);

  function handleWordSetClick(wordSetId: string) {
    const wordSet = wordSets.find((ws) => ws.id === wordSetId);
    const effectiveRandomOrder =
      wordSet?.allowRandomOrder === false ? false : randomOrder;

    const params = new URLSearchParams({
      id: wordSetId,
      source: sourceLanguage,
      random: effectiveRandomOrder.toString(),
      timed: timedMode.toString(),
    });
    router.push(`/quiz?${params.toString()}`);
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
      <h2 className="mb-2 text-lg font-semibold">{t("title")}</h2>

      {/* Total Points Display */}
      <div className="mb-4 relative flex items-center justify-center gap-3 bg-linear-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border-2 border-amber-200">
        <Trophy className="h-7 w-7 text-amber-600" />
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-amber-700">
            {t("totalPointsLabel", { totalPoints })}
          </span>
        </div>
        <Sparkles className="h-6 w-6 text-amber-500" />
        <button
          onClick={handleResetPoints}
          className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-amber-100 transition-colors group"
          aria-label={t("resetPointsButton")}
          title={t("resetPointsButton")}
        >
          <Trash2 className="h-6 w-6 text-amber-600 group-hover:text-amber-700" />
        </button>
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-sm font-medium">
          {t("selectWordSetLabel")}
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("searchWordSetsPlaceholder")}
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
        />
        <div className="flex flex-col gap-2 max-h-[245px] overflow-y-auto">
          {filteredWordSets.length === 0 ? (
            <div className="rounded-md border border-dashed p-6 text-center text-sm text-zinc-500">
              {t("noSearchResults")}
            </div>
          ) : (
            filteredWordSets.map((ws) => {
              const successPercentage = ws.lastQuizStats
                ? Math.round(
                    (ws.lastQuizStats.correct / ws.lastQuizStats.total) * 100,
                  )
                : null;

              // Determine icon based on success percentage
              const getSuccessIcon = () => {
                if (successPercentage === null) return null;
                if (successPercentage >= 80)
                  return <Trophy className="h-3.5 w-3.5 text-emerald-600" />;
                if (successPercentage >= 60)
                  return <Sparkles className="h-3.5 w-3.5 text-amber-600" />;
                return <Star className="h-3.5 w-3.5 text-rose-600" />;
              };

              return (
                <button
                  key={ws.id}
                  onClick={() => {
                    setSelectedWordSet(ws);
                    handleWordSetClick(ws.id);
                  }}
                  className="relative flex flex-col cursor-pointer rounded-lg border-2 transition-all hover:shadow-md border-zinc-200 bg-white hover:border-zinc-300 text-left w-full"
                >
                  {/* Colorful progress bar at bottom */}
                  {successPercentage !== null && (
                    <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden rounded-md z-0">
                      <SuccessIndicator
                        percentage={successPercentage}
                        animate={true}
                        showIcon={false}
                        className="h-full w-full"
                      />
                    </div>
                  )}
                  {/* Card content */}
                  <div className="flex items-center gap-3 px-4 py-3 pb-4 z-10">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-zinc-900">
                        {ws.name}
                      </div>
                      <div className="text-sm text-zinc-600">
                        {t("entriesCount", { count: ws.entries.length })}
                      </div>
                    </div>
                    <div className="flex items-center shrink-0">
                      {successPercentage !== null ? (
                        <div className="flex items-center gap-1.5">
                          {getSuccessIcon()}
                          <span className="text-sm font-semibold text-zinc-900">
                            {successPercentage}%
                          </span>
                        </div>
                      ) : (
                        <div className="text-xs text-zinc-400">
                          {t("notPracticed")}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="settings">
          <AccordionTrigger>{t("settingsTitle")}</AccordionTrigger>
          <AccordionContent>
            <div className="mb-4 gap-4 flex flex-wrap">
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
                <span>{t("englishLabel")}</span>
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
                <span>{t("slovakLabel")}</span>
              </label>
            </div>

            <div>
              <label className="flex cursor-pointer items-center gap-2">
                <Switch
                  checked={randomOrder}
                  onCheckedChange={(checked) => setRandomOrder(checked)}
                  disabled={selectedWordSet?.allowRandomOrder === false}
                />
                <span className="text-sm">{t("randomOrderLabel")}</span>
              </label>
              {selectedWordSet?.allowRandomOrder === false && (
                <p className="text-xs text-zinc-500 mt-1 ml-1">
                  {t("randomOrderDisabledHint")}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="flex cursor-pointer items-center gap-2">
                <Switch
                  checked={timedMode}
                  onCheckedChange={(checked) => setTimedMode(checked)}
                />
                <span className="text-sm">{t("timedModeLabel")}</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex mb-6 gap-4 flex-wrap">
        <Link href="/word-sets/new">
          <Button variant="outline">{t("createNewWordSetLink")}</Button>
        </Link>
      </div>
    </div>
  );
}
