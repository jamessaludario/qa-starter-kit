---
description: Clean up and deduplicate tests, page objects, and imports
argument-hint: "[folder to clean, or leave blank for full cleanup]"
---

# Prompt 07 — Cleanup

Clean up the test suite — remove duplicates, dead code, and unused imports.

## Steps

1. Scan `tests/` for duplicate test descriptions or overlapping coverage
2. Scan `page-objects/` for unused locators or redundant methods
3. Check all imports — remove unused ones
4. Check `constants/routes.ts` for unused route constants
5. Ensure every test file has a `test.describe` block with a clear name
6. Ensure all smoke tests are tagged `@smoke` and all regression tests `@regression`
7. Run `npx tsc --noEmit` — fix any errors introduced during cleanup

## Rules

- Do not change test logic — only remove dead code and fix formatting
- Do not rename files unless there is a clear naming inconsistency
- Preserve all passing tests — do not delete tests that are currently green

## When done

Tell me:
- Files changed
- Duplicate tests removed
- Unused code removed
- TypeScript check result
