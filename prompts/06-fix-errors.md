# Prompt 06 — Fix Test Errors

Fix failing tests systematically. Do not guess — diagnose first.

## Steps

1. Run: `npx playwright test --reporter=list`
2. Collect the full error output
3. For each failing test:

   **a. Diagnose the error type:**
   - `Timeout waiting for locator` → selector is wrong or element doesn't exist
   - `Element not found` → page changed, locator needs updating
   - `Expected X to equal Y` → assertion is wrong or test data changed
   - `Navigation failed` → route changed or auth guard added
   - `TypeScript error` → run `npx tsc --noEmit` first

   **b. Fix the root cause:**
   - For wrong selectors: re-scan the page (`prompts/01-scan-pages.md`) and update Page Object
   - For changed routes: update `constants/routes.ts`
   - For auth issues: check `auth/` folder, re-run `setup/auth.setup.ts` if needed
   - For TypeScript errors: fix types before fixing tests

   **c. Verify the fix:**
   - Re-run only that test file: `npx playwright test tests/path/to/file.spec.ts`
   - Confirm it passes before moving to the next failure

4. After all fixes: run the full suite again
5. Run `npx tsc --noEmit` — ensure zero TypeScript errors

## Rules

- Fix one test at a time — confirm it passes before moving on
- Update the Page Object if the selector changed — do not patch the test directly
- If a test is fundamentally broken and needs a rewrite, rewrite it cleanly
- Never use `test.skip()` to hide a failing test — fix it or delete it
- If a test exposes a real bug in the app, add a comment and tag it `@known-bug`

## When done

Tell me:
- How many tests were failing before
- How many are now passing
- Any tests that could not be fixed and why

