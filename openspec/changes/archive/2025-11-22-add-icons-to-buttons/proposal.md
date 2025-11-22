# Change: Add icons to word set form buttons

## Why

The word set creation form currently uses text-only buttons for adding and removing rows (e.g., "Add row", "Remove"). Adding icons makes the interface more intuitive and visually scannable while reducing the need to read button labels. Icons provide immediate visual cues about button actions, improving the user experience especially for younger users and non-native speakers.

## What Changes

- Add icons from `lucide-react` (already installed) to the "Add row" and "Remove" buttons in the word set form
- Use Plus icon for "Add row" button
- Use X or Trash2 icon for "Remove" button
- Maintain accessibility by including proper ARIA labels and keeping text visible or using `aria-label` attributes
- Ensure keyboard navigation and screen reader compatibility remain intact
- Apply consistent icon sizing and styling with existing button variants

## Impact

- Affected specs: `learning` (Word Set Creation, Accessibility requirements)
- Affected code:
  - `components/wordsets/WordSetForm.tsx` - add icon imports and update button components
  - `messages/en.json`, `messages/sk.json` - potentially add aria-label translations if needed
