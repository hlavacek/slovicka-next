"use client";

import React, { useState, useEffect, startTransition, Suspense } from "react";
import { TestSet, loadTestSets } from "@/lib/wordsets";
import QuizSetup from "@/components/quiz/QuizSetup";

function HomeContent() {
  const [wordSets, setWordSets] = useState<TestSet[]>([]);

  // Load test sets on client side to avoid hydration mismatch
  useEffect(() => {
    const sets = loadTestSets();
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

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
          <div className="text-sm text-zinc-600">Loading...</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
