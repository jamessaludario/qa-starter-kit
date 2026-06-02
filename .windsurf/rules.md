# Windsurf Project Rules

Project type: Playwright + TypeScript QA Automation

## Context

- App being tested: see `.env` → `BASE_URL`
- Framework: `@playwright/test`
- Pattern: Page Object Model + helper utilities
- User roles: see `.env` → `APP_ROLES`

## Code rules

- All navigation via `helpers/navigation.ts` → `gotoWithRetry()`
- All locators defined in `page-objects/` — never invent new ones
- All routes defined in `constants/routes.ts` — never hardcode URLs
- Never invent locators — only use what `page-maps/` confirms exists
- TypeScript strict mode — run `npx tsc --noEmit` to verify after changes
- Use `async/await` throughout — no `.then()` chains

## When generating tests

Open the relevant file in `prompts/` and follow it exactly:

- `prompts/01-scan-pages.md` — scan pages first
- `prompts/03-generate-baseline.md` — then generate baseline tests
- `prompts/04-generate-e2e.md` — then generate e2e tests
- `prompts/06-fix-errors.md` — when tests fail

## Folder structure

```
tests/        → test specs (baseline / e2e / regression / marketing)
page-objects/ → one file per page, grouped by role
helpers/      → shared utilities
constants/    → routes and other constants
fixtures/     → Playwright fixtures
page-maps/    → generated (gitignored)
code-context/ → generated (gitignored)
auth/         → session files (gitignored)
```

## Never commit

- `auth/` — session storage files
- `page-maps/` — generated page snapshots
- `code-context/` — generated codebase analysis
- `.env` — environment variables
