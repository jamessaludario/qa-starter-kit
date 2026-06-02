# GitHub Copilot Instructions

This is a Playwright + TypeScript QA automation project.

## Project setup

- App URL: see `BASE_URL` in `.env`
- Test framework: Playwright + TypeScript
- Pattern: Page Object Model + helper utilities

## Rules

- Use `@workspace` to reference the full codebase context
- Reuse helpers from `helpers/` folder — do not recreate them
- Follow existing patterns in `page-objects/`
- Use ROUTES from `constants/routes.ts`
- Never hardcode URLs or selectors
- Always run `npx tsc --noEmit` after generating code and fix all errors

## How to use prompt files

All task prompts are in the `prompts/` folder. Use them like this:

```
@workspace Read prompts/03-generate-baseline.md and generate
baseline tests for the uncovered pages listed in code-context/summary.json
```

## Key prompts

- `prompts/00-quick-start.md` — full pipeline from scratch
- `prompts/01-scan-pages.md` — scan all app pages
- `prompts/02-scan-codebase.md` — analyze source code
- `prompts/03-generate-baseline.md` — generate baseline tests
- `prompts/04-generate-e2e.md` — generate e2e flow tests
- `prompts/05-generate-regression.md` — generate regression tests
- `prompts/06-fix-errors.md` — fix failing tests
- `prompts/07-cleanup.md` — clean up and deduplicate
- `prompts/08-rescan.md` — rescan after app changes

## Folder structure

```
tests/        → test specs
page-objects/ → Page Object Models
helpers/      → shared utilities
constants/    → routes and constants
fixtures/     → Playwright fixtures
page-maps/    → generated snapshots (gitignored)
code-context/ → codebase analysis (gitignored)
auth/         → session files (gitignored)
```
