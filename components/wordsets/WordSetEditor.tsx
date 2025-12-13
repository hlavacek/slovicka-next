"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BulkTextImport from "@/components/wordsets/BulkTextImport";
import {
  TestPair,
  TestSet,
  validateTestSetInput,
  saveTestSet,
  importTestSet,
} from "@/lib/wordsets";

type Row = { id: string; sk: string; en: string };

function genId() {
  return `id-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Props for WordSetEditor component
 */
type WordSetEditorProps = {
  /** Callback when a word set is successfully saved */
  editingSet?: TestSet | null;

  /** Callback to reload the list of test sets after import */
  reloadTestSets: () => void;
  /** Callback when a word set is loaded */
  onLoad: () => void;
};

/**
 * WordSetEditor component
 *
 * Manages the editing form for the current word set, including:
 * - Name input
 * - Row management (add, remove, update)
 * - Validation and error display
 * - Save functionality
 *
 * All editing-related state (name, rows, error, editingSetId) is managed internally.
 */
export default function WordSetEditor({
  editingSet,
  reloadTestSets,
  onLoad,
}: WordSetEditorProps) {
  const t = useTranslations("WordSets");
  // TODO keep the ID to distinguish between new and existing sets
  const [name, setName] = useState("");
  const [rows, setRows] = useState<Row[]>([{ id: genId(), sk: "", en: "" }]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Apply load data when it changes
  React.useEffect(() => {
    if (editingSet) {
      setName(editingSet.name);
      setRows(
        editingSet.entries.map((entry) => ({
          id: genId(),
          sk: entry.sk.map((e) => e.text).join(" "),
          en: entry.en.map((e) => e.text).join(" "),
        })),
      );
      onLoad();
    }
  }, [editingSet, onLoad]);

  function updateRow(id: string, field: "sk" | "en", value: string) {
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  }

  function addRow() {
    setRows((r) => [...r, { id: genId(), sk: "", en: "" }]);
  }

  function removeRow(id: string) {
    setRows((r) => r.filter((row) => row.id !== id));
  }

  function validate(): boolean {
    const entries: TestPair[] = rows.map((r) => ({
      sk: r.sk
        .trim()
        .split(/\s+/)
        .filter((s) => s.trim())
        .map((text) => ({ text })),
      en: r.en
        .trim()
        .split(/\s+/)
        .filter((s) => s.trim())
        .map((text) => ({ text })),
    }));
    const errorKey = validateTestSetInput(name, entries);
    if (errorKey) {
      setError(t(errorKey));
      return false;
    }
    setError(null);
    return true;
  }

  function onSave() {
    if (!validate()) return;

    // Create the test set object
    const set: TestSet = {
      id: editingSet?.id || `ws-${Date.now()}`,
      name: name.trim(),
      entries: rows.map((r) => ({
        sk: r.sk
          .trim()
          .split(/\s+/)
          .filter((s) => s.trim())
          .map((text) => ({ text })),
        en: r.en
          .trim()
          .split(/\s+/)
          .filter((s) => s.trim())
          .map((text) => ({ text })),
      })),
      createdAt: new Date().toISOString(),
    };

    // Save the test set
    saveTestSet(set);

    // Clear local state
    setName("");
    setRows([{ id: genId(), sk: "", en: "" }]);
    setError(null);

    reloadTestSets();
  }

  function openFileSelectDialog() {
    fileInputRef.current?.click();
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? "");
        const set = importTestSet(text);
        saveTestSet(set);
        reloadTestSets();
      } catch (err: unknown) {
        // Error handling could be improved by passing to WordSetEditor
        console.error("Import error:", err);
        alert((err as Error)?.message ?? String(err));
      }
    };
    reader.readAsText(f);
    // Reset input value to allow importing the same file again
    e.target.value = "";
  }

  function handleBulkUpdate(bulkRows: Array<{ sk: string; en: string }>) {
    // Replace all existing rows with bulk imported rows
    const newRows = bulkRows.map((row) => ({
      id: genId(),
      sk: row.sk,
      en: row.en,
    }));
    setRows(newRows);
  }

  return (
    <>
      <label className="mb-2 block text-sm font-medium">
        {t("setNameLabel")}
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 w-full rounded-md border px-3 py-2"
        placeholder={t("setNamePlaceholder")}
      />

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-medium">{t("entriesLabel")}</div>
          <Button variant="outline" onClick={addRow} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            {t("addRow")}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {rows.map((row) => (
            <div key={row.id} className="flex gap-2">
              <input
                className="w-1/2 rounded-md border px-2 py-2"
                placeholder={t("slovakPlaceholder")}
                value={row.sk}
                onChange={(e) => updateRow(row.id, "sk", e.target.value)}
              />
              <input
                className="w-1/2 rounded-md border px-2 py-2"
                placeholder={t("englishPlaceholder")}
                value={row.en}
                onChange={(e) => updateRow(row.id, "en", e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => removeRow(row.id)}
                size="icon-lg"
                aria-label={t("removeButton")}
                disabled={rows.length === 1}
              >
                <X className="h-10 w-10" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <BulkTextImport onUpdate={handleBulkUpdate} />

      {error && <div className="mb-4 text-sm text-red-700">{error}</div>}

      <div className="mb-4 flex gap-2">
        <Button onClick={onSave}>{t("saveButton")}</Button>
        <Button variant="outline" type="button" onClick={openFileSelectDialog}>
          {t("importButton")}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </>
  );
}
