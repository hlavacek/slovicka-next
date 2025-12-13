"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { deleteTestSet, exportTestSet } from "@/lib/wordsets";
import { TestSet } from "@/lib/wordsets";

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Props for WordSetSearch component
 */
type WordSetSearchProps = {
  /** Array of saved word sets to display and filter */
  savedSets: TestSet[];
  /** Callback when user clicks Load button on a word set */
  onLoadSet: (set: TestSet) => void;
  /** Callback to reload the test sets from storage */
  reloadTestSets: () => void;
};

/**
 * WordSetSearch component
 *
 * Manages the search input and filtered list display of saved word sets.
 * Handles all search-related state (searchTerm, filtered list) independently.
 */
export default function WordSetSearch({
  savedSets,
  onLoadSet,
  reloadTestSets,
}: WordSetSearchProps) {
  const t = useTranslations("WordSets");
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleExport(set: TestSet) {
    const json = exportTestSet(set);
    downloadFile(`${set.name.replaceAll(" ", "-") || set.id}.json`, json);
  }

  function handleDelete(set: TestSet) {
    const confirmed = window.confirm(t("deleteConfirmation"));
    if (!confirmed) return;
    deleteTestSet(set.id);
    reloadTestSets();
  }
  // Filter and sort saved word sets
  const filteredSavedSets = useMemo(() => {
    let filtered = savedSets;

    // Filter by search term if provided
    if (searchTerm.trim()) {
      filtered = savedSets.filter((ws) =>
        ws.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort by ID when no search term
    if (!searchTerm.trim()) {
      filtered = [...filtered].sort((a, b) => a.id.localeCompare(b.id));
    }

    return filtered;
  }, [savedSets, searchTerm]);

  return (
    <div className="mt-2">
      <h3 className="mb-2 text-sm font-medium">{t("savedSetsTitle")}</h3>
      {savedSets.length > 0 && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("searchSavedSetsPlaceholder")}
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
        />
      )}
      <div className="flex flex-col gap-2 max-h-[210px] overflow-y-auto">
        {savedSets.length === 0 && (
          <div className="text-sm text-zinc-500">{t("noSavedSets")}</div>
        )}
        {savedSets.length > 0 && filteredSavedSets.length === 0 && (
          <div className="rounded-md border border-dashed p-6 text-center text-sm text-zinc-500">
            {t("noSavedSetsResults")}
          </div>
        )}
        {filteredSavedSets.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2"
          >
            <div className="flex-1">
              <div className="font-medium whitespace-nowrap">{s.name}</div>
              <div className="text-sm text-zinc-500 whitespace-nowrap">
                {t("entriesCount", { count: s.entries.length })}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={() => onLoadSet(s)} size="sm">
                {t("loadButton")}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport(s)}
                size="sm"
              >
                {t("exportButton")}
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(s)}
                size="sm"
              >
                {t("deleteButton")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
