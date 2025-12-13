# Proposal: Add Word Set Random Order Setting

## Overview

Add a per-wordset `allowRandomOrder` boolean property that controls whether random question order can be enabled for that specific word set. This allows creators to enforce sequential learning for certain word sets (e.g., numbered sequences, progressive difficulty) while maintaining flexibility for others.

## Motivation

Some vocabulary sets benefit from sequential presentation:

- Number sequences (one, two, three...)
- Days of the week or months
- Progressive difficulty levels
- Story-based learning sequences

Currently, all word sets use a global random order toggle. This proposal adds a per-wordset setting that:

1. Can be configured during word set creation/editing
2. Controls the availability of the random order toggle in quiz setup
3. Defaults to `true` to maintain backward compatibility

## User-Facing Changes

### Word Set Editor

- Add a checkbox/switch labeled "Allow random question order" (default: checked)
- Display near the save button or in a settings section
- Persists with the word set data

### Quiz Setup

- When a word set with `allowRandomOrder: false` is configured, the random order toggle in the settings accordion becomes:
  - Disabled (grayed out)
  - Checked/unchecked state reflects the word set's preference
  - Shows a tooltip/helper text explaining the restriction
- When `allowRandomOrder: true`, behavior remains unchanged (toggle is interactive)

## Technical Changes

### Data Model

- Add `allowRandomOrder?: boolean` to `TestSet` type (defaults to `true`)
- Update `importTestSet` to handle missing property (default `true`)
- Update validation to accept the new field

### Components

- `WordSetEditor`: Add UI control for `allowRandomOrder` setting
- `QuizSetup`: Conditionally disable random order toggle based on selected word set's `allowRandomOrder` property

### Migration

- Existing word sets without `allowRandomOrder` field are treated as `true` (backward compatible)
- No data migration required

## Scope

- **In scope**: Schema update, editor UI, quiz setup behavior
- **Out of scope**: Bulk editing of existing word sets, analytics on random order usage

## Success Criteria

1. Users can set `allowRandomOrder` when creating/editing word sets
2. Quiz setup respects the word set's `allowRandomOrder` setting
3. Existing word sets continue to work (default `true`)
4. Random order toggle is appropriately disabled/enabled in quiz setup
5. Accessibility maintained (disabled state is keyboard-accessible and screen-reader friendly)

## Alternatives Considered

1. **Global-only toggle**: Current implementation, lacks per-wordset control
2. **Three-state (always random/always sequential/user choice)**: More complex, current binary is sufficient
3. **Quiz-time warning**: Less explicit, doesn't prevent unwanted randomization

## Related Work

- Builds on existing quiz setup accordion (2025-11-24-add-quiz-settings-accordion)
- Complements word set creation/editing capabilities
