"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  TestSet,
  loadTestSets,
  importTestSet,
  saveTestSet,
} from "@/lib/wordsets";
import WordSetEditor from "./WordSetEditor";
import WordSetSearch from "./WordSetSearch";

function genId() {
  return `id-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * WordSetForm component
 *
 * Parent component that coordinates communication between WordSetEditor and WordSetSearch.
 * Manages shared state (savedSets, fileInputRef) and handles cross-component operations.
 */
export default function WordSetForm({ className }: { className?: string }) {
  const [savedSets, setSavedSets] = useState<TestSet[]>([]);
  const [editingSet, setEditingSet] = useState<TestSet | null>(null);

  function reloadTestSets() {
    setSavedSets(loadTestSets());
  }

  function worldSetLoaded() {
    setEditingSet(null);
  }

  // Load saved sets on client side only to avoid hydration mismatch
  React.useEffect(() => {
    reloadTestSets();
  }, []);

  return (
    <div
      className={cn(
        "w-full rounded-md border bg-white p-6 shadow-sm",
        className,
      )}
    >
      <WordSetEditor
        reloadTestSets={reloadTestSets}
        editingSet={editingSet}
        onLoad={worldSetLoaded}
      />

      <WordSetSearch
        savedSets={savedSets}
        onLoadSet={setEditingSet}
        reloadTestSets={reloadTestSets}
      />
    </div>
  );
}
