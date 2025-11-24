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
        <div className="flex flex-col gap-2 max-h-[230px] overflow-y-auto">
          {filteredWordSets.length === 0 ? (
            <div className="rounded-md border border-dashed p-6 text-center text-sm text-zinc-500">
              {t("noSearchResults")}
            </div>
          ) : (
            filteredWordSets.map((ws) => (
              <label
                key={ws.id}
                className={cn(
                  "flex cursor-pointer flex-wrap items-center gap-3 rounded-md border p-3 transition-colors hover:bg-zinc-50",
                  selectedSetId === ws.id && "border-zinc-900 bg-zinc-100",
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
                <div className="flex-1">
                  <div className="font-medium">{ws.name}</div>
                  <div className="text-sm text-zinc-500">
                    {t("entriesCount", { count: ws.entries.length })}
                  </div>
                </div>
              </label>
            ))
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
