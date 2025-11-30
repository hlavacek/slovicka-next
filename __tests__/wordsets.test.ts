import {
  importTestSet,
  exportTestSet,
  validateTestSetInput,
  TestSet,
  TestPair,
} from "@/lib/wordsets";

describe("testsets utilities", () => {
  describe("validateTestSetInput", () => {
    test("returns error key for empty name", () => {
      const entries: TestPair[] = [
        { sk: [{ text: "dom" }], en: [{ text: "house" }] },
      ];
      expect(validateTestSetInput("", entries)).toBe("errorEmptyName");
      expect(validateTestSetInput("  ", entries)).toBe("errorEmptyName");
    });

    test("returns error key for empty entries array", () => {
      expect(validateTestSetInput("My Set", [])).toBe("errorEmptyEntries");
    });

    test("returns error key for entries with missing Slovak word", () => {
      const entries: TestPair[] = [
        { sk: [{ text: "" }], en: [{ text: "house" }] },
      ];
      expect(validateTestSetInput("My Set", entries)).toBe(
        "errorMissingFields",
      );
    });

    test("returns error key for entries with missing English word", () => {
      const entries: TestPair[] = [
        { sk: [{ text: "dom" }], en: [{ text: "" }] },
      ];
      expect(validateTestSetInput("My Set", entries)).toBe(
        "errorMissingFields",
      );
    });

    test("returns null for valid input", () => {
      const entries: TestPair[] = [
        { sk: [{ text: "dom" }], en: [{ text: "house" }] },
        { sk: [{ text: "auto" }], en: [{ text: "car" }] },
      ];
      expect(validateTestSetInput("My Set", entries)).toBeNull();
    });

    test("returns null for valid multi-word sentences", () => {
      const entries: TestPair[] = [
        {
          sk: [{ text: "Mám" }, { text: "rád" }, { text: "knihy" }],
          en: [{ text: "I" }, { text: "like" }, { text: "books" }],
        },
      ];
      expect(validateTestSetInput("My Set", entries)).toBeNull();
    });

    test("returns null for tokens with icons", () => {
      const entries: TestPair[] = [
        {
          sk: [{ text: "kniha", icon: "Book" }],
          en: [{ text: "book", icon: "Book" }],
        },
      ];
      expect(validateTestSetInput("My Set", entries)).toBeNull();
    });
  });

  describe("export and import", () => {
    test("round-trip preserves data with token arrays", () => {
      const original: TestSet = {
        id: "ws-123",
        name: "Animals",
        entries: [
          { sk: [{ text: "pes" }], en: [{ text: "dog" }] },
          { sk: [{ text: "mačka" }], en: [{ text: "cat" }] },
        ],
        createdAt: "2025-11-19T00:00:00.000Z",
      };

      const json = exportTestSet(original);
      const imported = importTestSet(json);

      expect(imported.id).toBe("ws-123");
      expect(imported.name).toBe("Animals");
      expect(imported.entries).toHaveLength(2);
      expect(imported.entries[0]).toEqual({
        sk: [{ text: "pes" }],
        en: [{ text: "dog" }],
      });
      expect(imported.entries[1]).toEqual({
        sk: [{ text: "mačka" }],
        en: [{ text: "cat" }],
      });
    });

    test("round-trip preserves multi-word sentences", () => {
      const original: TestSet = {
        id: "ws-456",
        name: "Sentences",
        entries: [
          {
            sk: [{ text: "Mám" }, { text: "rád" }, { text: "knihy" }],
            en: [{ text: "I" }, { text: "like" }, { text: "books" }],
          },
        ],
        createdAt: "2025-11-19T00:00:00.000Z",
      };

      const json = exportTestSet(original);
      const imported = importTestSet(json);

      expect(imported.entries[0].sk).toHaveLength(3);
      expect(imported.entries[0].sk[0].text).toBe("Mám");
      expect(imported.entries[0].sk[1].text).toBe("rád");
      expect(imported.entries[0].sk[2].text).toBe("knihy");
    });

    test("round-trip preserves icons", () => {
      const original: TestSet = {
        id: "ws-789",
        name: "With Icons",
        entries: [
          {
            sk: [{ text: "kniha", icon: "Book" }],
            en: [{ text: "book", icon: "Book" }],
          },
        ],
        createdAt: "2025-11-19T00:00:00.000Z",
      };

      const json = exportTestSet(original);
      const imported = importTestSet(json);

      expect(imported.entries[0].sk[0].icon).toBe("Book");
      expect(imported.entries[0].en[0].icon).toBe("Book");
    });

    test("import converts old string format to token arrays", () => {
      const json = JSON.stringify({
        name: "Old Format",
        entries: [
          { sk: "pes", en: "dog" },
          { sk: "mačka", en: "cat" },
        ],
      });

      const imported = importTestSet(json);
      expect(imported.entries).toHaveLength(2);
      expect(imported.entries[0]).toEqual({
        sk: [{ text: "pes" }],
        en: [{ text: "dog" }],
      });
      expect(imported.entries[1]).toEqual({
        sk: [{ text: "mačka" }],
        en: [{ text: "cat" }],
      });
    });

    test("import generates ID if missing", () => {
      const json = JSON.stringify({
        name: "Test",
        entries: [{ sk: [{ text: "a" }], en: [{ text: "b" }] }],
      });

      const imported = importTestSet(json);
      expect(imported.id).toMatch(/^ws-/);
      expect(imported.name).toBe("Test");
    });

    test("import throws on invalid JSON", () => {
      expect(() => importTestSet("not json")).toThrow();
    });

    test("import throws on missing name", () => {
      const json = JSON.stringify({ entries: [] });
      expect(() => importTestSet(json)).toThrow("Missing fields");
    });

    test("import throws on missing entries", () => {
      const json = JSON.stringify({ name: "Test" });
      expect(() => importTestSet(json)).toThrow("Missing fields");
    });
  });
});
