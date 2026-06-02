# Prompt 07 — Clean Up Tests

Review and improve the test suite quality after initial generation.

## Steps

1. **Remove duplicates**
   - Find tests that cover the same assertion in multiple files
   - Keep the one in the most appropriate location
   - Delete duplicates

2. **Fix brittle selectors**
   - Search for any hardcoded CSS selectors (`css=`, `.class-name`, `#id`)
   - Replace with semantic Playwright locators:
     - `getByRole('button', { name: '...' })`
     - `getByLabel('...')`
     - `getByText('...')`
     - `getByTestId('...')`

3. **Remove hardcoded values**
   - Any hardcoded URL → move to `constants/routes.ts`
   - Any hardcoded text that might change → use a variable or constant

4. **Improve test naming**
   - Each test name should complete the sentence: "it should..."
   - Rename vague test names like "test 1" or "check page"

5. **Remove dead code**
   - Page Object properties that are never used in tests
   - Unused imports
   - Commented-out code that was never uncommented

6. **Verify TypeScript**
   - Run `npx tsc --noEmit`
   - Fix all errors and warnings

7. **Run full suite**
   - Run: `npx playwright test --reporter=list`
   - All tests must pass before cleanup is complete

## When done

Tell me:
- How many tests were removed (duplicates)
- How many selectors were improved
- Final test count
- Final pass rate

