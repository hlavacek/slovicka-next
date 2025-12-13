export type SentenceToken = {
  text: string;
  icon?: string;
};

export type TestPair = {
  sk: SentenceToken[];
  en: SentenceToken[];
};

export type QuizStats = {
  correct: number;
  total: number;
};

export type TestSet = {
  id: string;
  name: string;
  entries: TestPair[];
  createdAt?: string;
  lastQuizStats?: QuizStats;
  allowRandomOrder?: boolean;
};

const STORAGE_KEY = "slovicka:testsets";

function isWindowLocalStorageAvailable() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function loadTestSets(): TestSet[] {
  if (!isWindowLocalStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as TestSet[];
  } catch (e) {
    console.error("Failed to load test sets", e);
    return [];
  }
}

export function saveTestSets(sets: TestSet[]) {
  if (!isWindowLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
  } catch (e) {
    console.error("Failed to save test sets", e);
  }
}

export function saveTestSet(set: TestSet) {
  const all = loadTestSets();
  const idx = all.findIndex((s) => s.id === set.id);
  if (idx >= 0) {
    all[idx] = set;
  } else {
    all.push(set);
  }
  saveTestSets(all);
}

export function deleteTestSet(id: string) {
  const all = loadTestSets().filter((s) => s.id !== id);
  saveTestSets(all);
}

export function exportTestSet(set: TestSet): string {
  return JSON.stringify(set, null, 2);
}

export function importTestSet(raw: string): TestSet {
  const parsed = JSON.parse(raw);
  if (typeof parsed !== "object" || parsed === null)
    throw new Error("Invalid test set format");
  if (!parsed.name || !Array.isArray(parsed.entries))
    throw new Error("Missing fields: expected {name, entries}");
  const entries = parsed.entries.map((e: unknown) => {
    const obj = e as Record<string, unknown>;
    const sk = obj.sk;
    const en = obj.en;

    // Handle token arrays
    if (Array.isArray(sk) && Array.isArray(en)) {
      return {
        sk: sk.map((token: unknown) => {
          const t = token as Record<string, unknown>;
          return {
            text: String(t.text ?? ""),
            icon: t.icon ? String(t.icon) : undefined,
          };
        }),
        en: en.map((token: unknown) => {
          const t = token as Record<string, unknown>;
          return {
            text: String(t.text ?? ""),
            icon: t.icon ? String(t.icon) : undefined,
          };
        }),
      };
    }

    // Fallback: convert old string format to single-token arrays
    if (typeof sk === "string" && typeof en === "string") {
      return {
        sk: [{ text: sk }],
        en: [{ text: en }],
      };
    }

    throw new Error("Invalid entry format: expected token arrays or strings");
  });
  const set: TestSet = {
    id: (parsed.id as string) || `ws-${Date.now()}`,
    name: String(parsed.name),
    entries,
    createdAt: parsed.createdAt || new Date().toISOString(),
    allowRandomOrder: parsed.allowRandomOrder !== undefined ? Boolean(parsed.allowRandomOrder) : true,
  };
  return set;
}

/**
 * Validates test set input and returns error key if validation fails
 * @param name - The name of the test set
 * @param entries - Array of test pairs with token arrays
 * @returns Error translation key or null if valid
 */
export function validateTestSetInput(
  name: string,
  entries: TestPair[],
): string | null {
  if (!name || !name.trim()) return "errorEmptyName";
  if (!Array.isArray(entries) || entries.length === 0)
    return "errorEmptyEntries";
  for (const e of entries) {
    if (!Array.isArray(e.sk) || !Array.isArray(e.en)) {
      return "errorMissingFields";
    }
    // Check that each token array has at least one token with non-empty text
    const hasValidSk = e.sk.some(
      (token) => token.text && String(token.text).trim(),
    );
    const hasValidEn = e.en.some(
      (token) => token.text && String(token.text).trim(),
    );
    if (!hasValidSk || !hasValidEn) {
      return "errorMissingFields";
    }
  }
  return null;
}
