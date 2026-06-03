---
description: Fix TypeScript errors and failing Playwright tests
argument-hint: "[paste error output, or leave blank to run tsc and diagnose]"
---

# Prompt 06 — Fix Errors

Fix TypeScript compilation errors and failing Playwright tests.

## Steps

1. If no error output was provided, run: `npx tsc --noEmit`
2. Read each error carefully — fix type errors before runtime errors
3. Common issues to check:
   - Missing or incorrect imports
   - Locators used in tests but not defined in the page object
   - Routes used but not in `constants/routes.ts`
   - `async/await` missing on Playwright calls
   - Wrong argument types in helper calls

4. After fixing TypeScript errors, run: `npx playwright test --grep @smoke --reporter=list`
5. For failing tests, read the test output and fix the root cause — do not just suppress errors

## Rules

- Never use `any` — use `unknown` or the correct type
- Never disable TypeScript strict checks
- Fix the source of the error, not the symptom

## When done

Tell me:
- Errors fixed
- Tests passing / failing
- Any errors that could not be resolved and why
