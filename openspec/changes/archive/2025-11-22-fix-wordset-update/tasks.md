## 1. Implementation

- [x] 1.1 Add `editingSetId` state variable to `WordSetForm` component (initial value: `null`)
- [x] 1.2 Update `loadSet` function to set `editingSetId` to the loaded word set's ID
- [x] 1.3 Modify `onSave` function to check if `editingSetId` exists:
  - [x] If `editingSetId` is set, use the existing ID and preserve creation timestamp
  - [x] If `editingSetId` is null, generate a new ID as before
- [x] 1.4 Clear `editingSetId` when form is reset after successful save
- [ ] 1.5 (Optional) Add visual indicator in form header showing "Editing: [word set name]" when `editingSetId` is set

## 2. Validation

- [ ] 2.1 Test loading an existing word set and saving without changes - verify no duplicate created
- [ ] 2.2 Test loading an existing word set, modifying it, and saving - verify original set is updated
- [ ] 2.3 Test creating a new word set from scratch - verify new ID is generated
- [ ] 2.4 Test loading a word set, resetting form, and creating new set - verify new ID is generated
- [ ] 2.5 Verify saved sets list refreshes correctly after update
- [ ] 2.6 Verify no duplicates appear in localStorage after multiple edit/save cycles
- [x] 2.7 Run `npm run build` to ensure static generation works
