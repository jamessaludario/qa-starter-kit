---
description: Generate baseline smoke tests for every page discovered in the scan
argument-hint: "[page name, or leave blank to generate for all pages]"
---

# Prompt 03 — Generate Baseline Tests

Generate baseline tests for every page discovered in the scan.

## Before starting

- Read `page-maps/summary.json`
- Read each `page-maps/<role>/<page>.json` file
- Read existing files in `page-objects/` to follow established patterns
- Read `helpers/navigation.ts` to understand `gotoWithRetry()`
- Read `constants/routes.ts` to see existing route constants

## What baseline tests cover

For each page and each role:
- Page loads without errors (status 200)
- Key elements are visible (headings, nav, main content)
- Auth guard works (unauthenticated users are redirected from protected pages)
- No console errors on load

## For each page

1. Create or update a Page Object in `page-objects/<page-name>.ts`
2. Add a route constant to `constants/routes.ts` if missing
3. Create a test file at `tests/baseline/<page-name>.spec.ts`
4. Tag all tests with `@smoke`

## Rules

- Use `gotoWithRetry()` from `helpers/navigation.ts` — never `page.goto()` directly
- Use ROUTES constants — never hardcode URLs
- Use locators from the page object — never inline selectors in tests
- Run `npx tsc --noEmit` after generating all files and fix any errors

## When done

Tell me:
- Pages covered
- Tests generated per page
- Any pages skipped and why
- TypeScript check result
