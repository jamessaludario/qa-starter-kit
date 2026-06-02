# Prompt 05 — Generate Regression Tests

Generate tests for edge cases, negative paths, and error states.

## Before starting

- Read `page-maps/summary.json`
- Read `code-context/summary.json`
- Read existing tests in `tests/` to avoid duplication

## What regression tests cover

- Invalid form inputs (empty required fields, bad formats, too-long strings)
- Unauthorized access attempts (accessing protected URLs directly)
- Non-existent resources (404 pages, deleted items)
- Boundary conditions (min/max values, empty lists, single items)
- Error state UI (network errors, server errors shown gracefully)
- Session expiry handling
- Back-button and browser navigation edge cases

## For each test

1. Save to `tests/regression/<feature-name>.spec.ts`
2. Tag with `@regression`
3. Use `test.fail()` for tests that document known bugs
4. Write a comment explaining what bug or edge case is being prevented

```typescript
test('form shows error when email is invalid @regression', async ({ page }) => {
  const po = new LoginPage(page)
  await gotoWithRetry(page, ROUTES.LOGIN)
  await po.emailField.fill('not-an-email')
  await po.submitButton.click()
  await expect(po.emailError).toBeVisible()
  await expect(po.emailError).toContainText('valid email')
})
```

## Rules

- Regression tests should be fast — mock network calls where appropriate
- Never use `page.waitForTimeout()` — use proper Playwright waiting
- Each test must have a clear failure message if it breaks

## When done

Tell me:
- How many regression tests were created
- Which features are covered
- Any edge cases you identified but could not test (and why)

