"use client"

import React from "react"
import { useTranslations } from "next-intl"
import WordSetForm from "@/components/wordsets/WordSetForm"

export default function NewWordSetPage() {
  const t = useTranslations("WordSets")
  
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 py-10">
      <div className="w-full max-w-3xl px-4">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("createTitle")}</h1>
        </header>

        <main>
          <WordSetForm />
        </main>
      </div>
    </div>
  )
}
