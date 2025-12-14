"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type BulkTextImportProps = {
  /** Callback when bulk text is processed and should update parent rows */
  onUpdate: (rows: Array<{ sk: string; en: string }>) => void;
};

type ParseResult = {
  slovak: string[];
  english: string[];
  warning: string | null;
};

/**
 * BulkTextImport component
 *
 * Provides a collapsible interface for bulk importing word pairs from separate text areas.
 * Users paste Slovak sentences in one textarea and English sentences in another.
 */
export default function BulkTextImport({ onUpdate }: BulkTextImportProps) {
  const t = useTranslations("WordSets");
  const [slovakText, setSlovakText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [warning, setWarning] = useState<string | null>(null);

  /**
   * Parse separate Slovak and English text into sentence arrays
   */
  function parseBulkText(slovakText: string, englishText: string): ParseResult {
    const slovakSentences = splitIntoSentences(slovakText);
    const englishSentences = splitIntoSentences(englishText);

    let warningMsg: string | null = null;
    if (slovakSentences.length !== englishSentences.length) {
      warningMsg = t("bulkImportWarningMismatch", {
        slovak: slovakSentences.length,
        english: englishSentences.length,
      });
    }

    return {
      slovak: slovakSentences,
      english: englishSentences,
      warning: warningMsg,
    };
  }

  /**
   * Split text into sentences by . ! ? separators
   * Keeps sentence endings for multi-word sentences, removes them for single words
   * Allows final sentence to omit ending punctuation
   */
  function splitIntoSentences(text: string): string[] {
    // Match sentences with their ending punctuation
    const regex = /([^.!?]+[.!?])/g;
    const matches = text.match(regex) || [];

    const sentences = matches
      .map((s) => {
        const trimmed = s.trim();
        // Check if it's a single word (no spaces after trimming and removing punctuation)
        const withoutPunctuation = trimmed.replace(/[.!?]$/, "").trim();
        const isSingleWord = !withoutPunctuation.includes(" ");

        // If single word, remove the ending punctuation
        if (isSingleWord) {
          return withoutPunctuation;
        }

        // Multi-word sentence: keep the punctuation
        return trimmed;
      })
      .filter((s) => s.length > 0);

    // Check for remaining text after the last punctuated sentence
    let lastMatchEnd = 0;
    const allMatches = Array.from(text.matchAll(regex));
    if (allMatches.length > 0) {
      const lastMatch = allMatches[allMatches.length - 1];
      lastMatchEnd = (lastMatch.index || 0) + lastMatch[0].length;
    }

    const remainingText = text.substring(lastMatchEnd).trim();
    if (remainingText.length > 0) {
      // Apply the same single-word punctuation removal logic
      const withoutPunctuation = remainingText.replace(/[.!?]$/, "").trim();
      const isSingleWord = !withoutPunctuation.includes(" ");

      if (isSingleWord) {
        sentences.push(withoutPunctuation);
      } else {
        sentences.push(remainingText);
      }
    }

    return sentences;
  }

  /**
   * Handle update button click
   */
  function handleUpdate() {
    if (!slovakText.trim() && !englishText.trim()) {
      setWarning(t("bulkImportWarningEmpty"));
      return;
    }

    const result = parseBulkText(slovakText, englishText);

    // Set warning if present
    setWarning(result.warning);

    // Create rows by pairing sentences by index
    const maxLength = Math.max(result.slovak.length, result.english.length);
    const rows: Array<{ sk: string; en: string }> = [];

    for (let i = 0; i < maxLength; i++) {
      rows.push({
        sk: result.slovak[i] || "",
        en: result.english[i] || "",
      });
    }

    // Call parent callback if we have rows
    if (rows.length > 0) {
      onUpdate(rows);
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="mb-2 rounded-lg border bg-card px-4 shadow-sm"
      defaultValue="bulk-import"
    >
      <AccordionItem value="bulk-import" className="border-none">
        <AccordionTrigger>{t("bulkImportTitle")}</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="slovak-text"
                className="mb-1 block text-sm font-medium"
              >
                {t("bulkImportSlovakLabel")}
              </label>
              <textarea
                id="slovak-text"
                value={slovakText}
                onChange={(e) => {
                  setSlovakText(e.target.value);
                  setWarning(null); // Clear warning when user types
                }}
                className="w-full rounded-md border px-3 py-2 font-mono text-sm"
                rows={4}
                placeholder={t("bulkImportSlovakPlaceholder")}
              />
            </div>

            <div>
              <label
                htmlFor="english-text"
                className="mb-1 block text-sm font-medium"
              >
                {t("bulkImportEnglishLabel")}
              </label>
              <textarea
                id="english-text"
                value={englishText}
                onChange={(e) => {
                  setEnglishText(e.target.value);
                  setWarning(null); // Clear warning when user types
                }}
                className="w-full rounded-md border px-3 py-2 font-mono text-sm"
                rows={4}
                placeholder={t("bulkImportEnglishPlaceholder")}
              />
            </div>

            {warning && (
              <div className="text-sm text-amber-700 dark:text-amber-500">
                {warning}
              </div>
            )}

            <Button onClick={handleUpdate} variant="outline">
              {t("bulkImportUpdateButton")}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
