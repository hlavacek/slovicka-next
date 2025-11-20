"use client"

import React from "react"
import WordSetForm from "@/components/wordsets/WordSetForm"

export default function NewWordSetPage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 py-24">
      <div className="w-full max-w-3xl px-4">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create word set</h1>
        </header>

        <main>
          <WordSetForm />
        </main>
      </div>
    </div>
  )
}
