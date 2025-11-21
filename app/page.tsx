"use client";

import React, { useState, useEffect, startTransition } from "react";
import { WordSet, loadWordSets } from "@/lib/wordsets";
import QuizSetup from "@/components/quiz/QuizSetup";

export default function Home() {
  const [wordSets, setWordSets] = useState<WordSet[]>([]);

  // Load word sets on client side to avoid hydration mismatch
  useEffect(() => {
    const sets = loadWordSets();
    startTransition(() => {
      setWordSets(sets);
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <QuizSetup wordSets={wordSets} />
    </div>
  );
}
