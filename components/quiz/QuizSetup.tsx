"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WordSet } from "@/lib/wordsets";
import { SourceLanguage } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SuccessIndicator from "@/components/quiz/SuccessIndicator";
import { Star, Sparkles, Trophy } from "lucide-react";

type QuizSetupProps = {
  wordSets: WordSet[];
  preselectedId?: string;
};

export default function QuizSetup({ wordSets, preselectedId }: QuizSetupProps) {
  const t = useTranslations("Quiz");
  const router = useRouter();
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<SourceLanguage>("sk");
  const [randomOrder, setRandomOrder] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Initialize selection with preselectedId if valid
  React.useEffect(() => {
    if (preselectedId && wordSets.some((ws) => ws.id === preselectedId)) {
      setSelectedSetId(preselectedId);
    }
  }, [preselectedId, wordSets]);

  // Filter and sort word sets
  const filteredWordSets = React.useMemo(() => {
    let filtered = wordSets;

    // Filter by search term if provided
    if (searchTerm.trim()) {
      filtered = wordSets.filter((ws) =>
        ws.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort by ID when no search term, but show preselected first
    if (!searchTerm.trim()) {
      filtered = [...filtered].sort((a, b) => {
        // If preselectedId exists and matches one of the items, put it first
        if (preselectedId) {
          if (a.id === preselectedId) return -1;
          if (b.id === preselectedId) return 1;
        }
        return a.id.localeCompare(b.id);
      });
    }

    return filtered;
  }, [wordSets, searchTerm, preselectedId]);

  const canStart = selectedSetId !== null;

  function handleStart() {
    if (!selectedSetId) return;
    const params = new URLSearchParams({
      id: selectedSetId,
      source: sourceLanguage,
      random: randomOrder.toString(),
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
                <label
                  key={ws.id}
                  className={cn(
                    "relative flex flex-col cursor-pointer rounded-lg border-2 transition-all hover:shadow-md",
                    selectedSetId === ws.id
                      ? "border-zinc-900 bg-zinc-50"
                      : "border-zinc-200 bg-white hover:border-zinc-300",
                  )}
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
                    <input
                      type="radio"
                      name="wordset"
                      value={ws.id}
                      checked={selectedSetId === ws.id}
                      onChange={(e) => setSelectedSetId(e.target.value)}
                      className="h-4 w-4 shrink-0 accent-zinc-900"
                    />
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
                </label>
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
                />
                <span className="text-sm">{t("randomOrderLabel")}</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex mb-6 gap-4 flex-wrap">
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
