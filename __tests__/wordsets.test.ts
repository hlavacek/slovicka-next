import { importWordSet, exportWordSet, validateWordSetInput, WordSet, WordPair } from '@/lib/wordsets'

describe('wordsets utilities', () => {
  describe('validateWordSetInput', () => {
    test('returns error key for empty name', () => {
      const entries: WordPair[] = [{ sk: 'dom', en: 'house' }]
      expect(validateWordSetInput('', entries)).toBe('errorEmptyName')
      expect(validateWordSetInput('  ', entries)).toBe('errorEmptyName')
    })

    test('returns error key for empty entries array', () => {
      expect(validateWordSetInput('My Set', [])).toBe('errorEmptyEntries')
    })

    test('returns error key for entries with missing Slovak word', () => {
      const entries: WordPair[] = [{ sk: '', en: 'house' }]
      expect(validateWordSetInput('My Set', entries)).toBe('errorMissingFields')
    })

    test('returns error key for entries with missing English word', () => {
      const entries: WordPair[] = [{ sk: 'dom', en: '' }]
      expect(validateWordSetInput('My Set', entries)).toBe('errorMissingFields')
    })

    test('returns null for valid input', () => {
      const entries: WordPair[] = [
        { sk: 'dom', en: 'house' },
        { sk: 'auto', en: 'car' },
      ]
      expect(validateWordSetInput('My Set', entries)).toBeNull()
    })
  })

  describe('export and import', () => {
    test('round-trip preserves data', () => {
      const original: WordSet = {
        id: 'ws-123',
        name: 'Animals',
        entries: [
          { sk: 'pes', en: 'dog' },
          { sk: 'mačka', en: 'cat' },
        ],
        createdAt: '2025-11-19T00:00:00.000Z',
      }

      const json = exportWordSet(original)
      const imported = importWordSet(json)

      expect(imported.id).toBe('ws-123')
      expect(imported.name).toBe('Animals')
      expect(imported.entries).toHaveLength(2)
      expect(imported.entries[0]).toEqual({ sk: 'pes', en: 'dog' })
      expect(imported.entries[1]).toEqual({ sk: 'mačka', en: 'cat' })
    })

    test('import generates ID if missing', () => {
      const json = JSON.stringify({
        name: 'Test',
        entries: [{ sk: 'a', en: 'b' }],
      })

      const imported = importWordSet(json)
      expect(imported.id).toMatch(/^ws-/)
      expect(imported.name).toBe('Test')
    })

    test('import throws on invalid JSON', () => {
      expect(() => importWordSet('not json')).toThrow()
    })

    test('import throws on missing name', () => {
      const json = JSON.stringify({ entries: [] })
      expect(() => importWordSet(json)).toThrow('Missing fields')
    })

    test('import throws on missing entries', () => {
      const json = JSON.stringify({ name: 'Test' })
      expect(() => importWordSet(json)).toThrow('Missing fields')
    })
  })
})
