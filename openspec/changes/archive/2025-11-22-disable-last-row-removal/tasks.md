## 1. Implementation

- [x] 1.1 Add logic to determine if remove button should be disabled (rows.length === 1)
- [x] 1.2 Set `disabled` prop on remove Button when only one row exists
- [x] 1.3 Ensure disabled button has proper ARIA attributes for accessibility
- [x] 1.4 Verify visual disabled state (opacity, cursor) is applied automatically by Button component

## 2. Validation

- [x] 2.1 Verify remove button is disabled when there is exactly one row
- [x] 2.2 Verify remove button is enabled when there are two or more rows
- [x] 2.3 Verify button cannot be clicked when disabled
- [x] 2.4 Verify disabled button has appropriate visual feedback
- [x] 2.5 Verify keyboard navigation skips disabled button or indicates it's disabled
- [x] 2.6 Test adding and removing rows to ensure button state updates correctly
