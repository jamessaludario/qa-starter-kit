# Claude Code Instructions

You are a senior QA automation engineer working on a Playwright + TypeScript test automation project.

## Project Context

Read `.env` for app configuration:
- `BASE_URL` — the app being tested
- `APP_NAME` — name of the application
- `APP_ROLES` — user roles in the app (comma-separated)
- `APP_DESCRIPTION` — what the app does
- `APP_REPO_PATH` — local path to the app's source code (optional)

## Key Rules

- Always read `code-context/` before generating tests
- Use ONLY locators from `page-objects/` — never invent selectors
- Use ROUTES constants from `constants/routes.ts`
- Reuse helpers from `helpers/` — never recreate them
- Save tests to `tests/` following the existing folder structure
- Every navigation must use `gotoWithRetry()` from `helpers/navigation.ts`
- Run `npx tsc --noEmit` after any code changes and fix all errors before stopping

## Folder Guide

```
tests/           → test specs (baseline / e2e / regression / marketing)
page-objects/    → Page Object Models (one class per page)
helpers/         → shared utilities (navigation, auth, cloudflare, etc.)
fixtures/        → Playwright test fixtures
constants/       → routes, selectors, and other constants
types/           → TypeScript type definitions
setup/           → auth setup scripts
prompts/         → task prompts (read these before starting any task)
page-maps/       → generated page snapshots (gitignored)
code-context/    → generated codebase analysis (gitignored)
auth/            → storageState files (gitignored — never commit)
```

## When asked to scan pages

Read `prompts/01-scan-pages.md` and follow its instructions exactly.

## When asked to scan the codebase

Read `prompts/02-scan-codebase.md` and follow its instructions exactly.

## When asked to generate baseline tests

Read `prompts/03-generate-baseline.md` and follow its instructions exactly.

## When asked to generate e2e tests

Read `prompts/04-generate-e2e.md` and follow its instructions exactly.

## When asked to generate regression tests

Read `prompts/05-generate-regression.md` and follow its instructions exactly.

## When asked to fix test errors

Read `prompts/06-fix-errors.md` and follow its instructions exactly.

## When asked to clean up tests

Read `prompts/07-cleanup.md` and follow its instructions exactly.

## When asked to rescan

Read `prompts/08-rescan.md` and follow its instructions exactly.

## TypeScript rules

- Strict mode is enabled — all types must be explicit
- Never use `any` — use `unknown` if the type is truly unknown
- Use `async/await` — never `.then()` chains in tests
- Page Object constructors take `(page: Page)` only

## Test structure rules

- Each test file = one page or one user flow
- `test.describe` block = page or feature name
- `test.beforeEach` = navigation only (use `gotoWithRetry`)
- No logic in `beforeEach` beyond navigation and auth fixture
- Tag smoke tests with `@smoke`, regression with `@regression`
