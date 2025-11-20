"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { WordPair, WordSet, loadWordSets, saveWordSet, exportWordSet, importWordSet, validateWordSetInput } from "@/lib/wordsets"

type Row = WordPair & { id: string }

function genId() {
  return `id-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`
}

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function WordSetForm({ className }: { className?: string }) {
  const t = useTranslations("WordSets")
  const [name, setName] = useState("")
  const [rows, setRows] = useState<Row[]>([{ id: genId(), sk: "", en: "" }])
  const [savedSets, setSavedSets] = useState<WordSet[]>(() => loadWordSets())
  const [error, setError] = useState<string | null>(null)

  function updateRow(id: string, field: keyof WordPair, value: string) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  function addRow() {
    setRows((r) => [...r, { id: genId(), sk: "", en: "" }])
  }

  function removeRow(id: string) {
    setRows((r) => r.filter((row) => row.id !== id))
  }

  function validate(): boolean {
    const entries = rows.map((r) => ({ sk: r.sk, en: r.en }))
    const errorKey = validateWordSetInput(name, entries)
    if (errorKey) {
      setError(t(errorKey))
      return false
    }
    setError(null)
    return true
  }

  function onSave() {
    if (!validate()) return
    const set: WordSet = {
      id: `ws-${Date.now()}`,
      name: name.trim(),
      entries: rows.map((r) => ({ sk: r.sk.trim(), en: r.en.trim() })),
      createdAt: new Date().toISOString(),
    }
    saveWordSet(set)
    setSavedSets(loadWordSets())
    setName("")
    setRows([{ id: genId(), sk: "", en: "" }])
  }

  function onExport(set: WordSet) {
    const json = exportWordSet(set)
    downloadFile(`${set.name.replaceAll(" ", "-") || set.id}.json`, json)
  }

  function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const text = String(reader.result ?? "")
        const set = importWordSet(text)
        saveWordSet(set)
        setSavedSets(loadWordSets())
        setError(null)
      } catch (err: unknown) {
        const msg = (err as Error)?.message ?? String(err)
        setError(String(msg))
      }
    }
    reader.readAsText(f)
  }

  function loadSet(set: WordSet) {
    setName(set.name)
    setRows(set.entries.map((e) => ({ id: genId(), ...e })))
  }

  return (
    <div className={cn("w-full rounded-md border bg-white p-6 shadow-sm", className)}>
      <h2 className="mb-4 text-lg font-semibold">{t("formTitle")}</h2>

      <label className="mb-2 block text-sm font-medium">{t("setNameLabel")}</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 w-full rounded-md border px-3 py-2"
        placeholder={t("setNamePlaceholder")}
      />

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-medium">{t("entriesLabel")}</div>
          <Button variant="ghost" onClick={addRow} size="sm">
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
              <Button variant="outline" onClick={() => removeRow(row.id)} size="sm">
                {t("removeButton")}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="mb-4 text-sm text-red-700">{error}</div>}

      <div className="mb-4 flex gap-2">
        <Button onClick={onSave}>{t("saveButton")}</Button>
        <label className="flex items-center gap-2">
          <input type="file" accept="application/json" onChange={onImport} className="hidden" />
          <Button variant="outline" type="button">{t("importButton")}</Button>
        </label>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-sm font-medium">{t("savedSetsTitle")}</h3>
        <div className="flex flex-col gap-2">
          {savedSets.length === 0 && <div className="text-sm text-zinc-500">{t("noSavedSets")}</div>}
          {savedSets.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-2 rounded-md border px-3 py-2">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-zinc-500">{t("entriesCount", { count: s.entries.length })}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => loadSet(s)} size="sm">
                  {t("loadButton")}
                </Button>
                <Button variant="outline" onClick={() => onExport(s)} size="sm">
                  {t("exportButton")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
