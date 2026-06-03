---
description: Rescan pages and codebase after app changes and update affected tests
argument-hint: "[what changed, e.g. new pages added, auth flow updated]"
---

# Prompt 08 — Rescan

Rescan the app after changes and update tests to match.

## Steps

1. Re-run the page scanner — repeat steps from `scan-pages` prompt
2. Compare new `page-maps/summary.json` with the previous version
3. Identify:
   - New pages (need new page objects and baseline tests)
   - Removed pages (remove or skip their tests)
   - Changed pages (update locators and tests)
4. If `APP_REPO_PATH` is set, re-run the codebase scan and update `code-context/`
5. Update affected page objects in `page-objects/`
6. Update affected tests in `tests/`
7. Run `npx tsc --noEmit` and fix all errors
8. Run `npx playwright test --grep @smoke --reporter=list`

## When done

Tell me:
- Pages added / removed / changed
- Tests updated
- Tests passing / failing
