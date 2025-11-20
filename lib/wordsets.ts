export type WordPair = {
  sk: string
  en: string
}

export type WordSet = {
  id: string
  name: string
  entries: WordPair[]
  createdAt?: string
}

const STORAGE_KEY = "slovicka:wordsets"

function isWindowLocalStorageAvailable() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

export function loadWordSets(): WordSet[] {
  if (!isWindowLocalStorageAvailable()) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as WordSet[]
  } catch (e) {
    console.error("Failed to load word sets", e)
    return []
  }
}

export function saveWordSets(sets: WordSet[]) {
  if (!isWindowLocalStorageAvailable()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sets))
  } catch (e) {
    console.error("Failed to save word sets", e)
  }
}

export function saveWordSet(set: WordSet) {
  const all = loadWordSets()
  const idx = all.findIndex((s) => s.id === set.id)
  if (idx >= 0) {
    all[idx] = set
  } else {
    all.push(set)
  }
  saveWordSets(all)
}

export function deleteWordSet(id: string) {
  const all = loadWordSets().filter((s) => s.id !== id)
  saveWordSets(all)
}

export function exportWordSet(set: WordSet): string {
  return JSON.stringify(set, null, 2)
}

export function importWordSet(raw: string): WordSet {
  const parsed = JSON.parse(raw)
  if (typeof parsed !== "object" || parsed === null) throw new Error("Invalid word set format")
  if (!parsed.name || !Array.isArray(parsed.entries)) throw new Error("Missing fields: expected {name, entries}")
  const entries = parsed.entries.map((e: unknown) => {
    const obj = e as Record<string, unknown>
    return { sk: String(obj.sk ?? ""), en: String(obj.en ?? "") }
  })
  const set: WordSet = {
    id: (parsed.id as string) || `ws-${Date.now()}`,
    name: String(parsed.name),
    entries,
    createdAt: parsed.createdAt || new Date().toISOString(),
  }
  return set
}

/**
 * Validates word set input and returns error key if validation fails
 * @param name - The name of the word set
 * @param entries - Array of word pairs
 * @returns Error translation key or null if valid
 */
export function validateWordSetInput(name: string, entries: WordPair[]): string | null {
  if (!name || !name.trim()) return "errorEmptyName"
  if (!Array.isArray(entries) || entries.length === 0) return "errorEmptyEntries"
  for (const e of entries) {
    if (!e.sk || !String(e.sk).trim() || !e.en || !String(e.en).trim()) {
      return "errorMissingFields"
    }
  }
  return null
}
