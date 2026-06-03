---
description: Generate end-to-end flow tests covering critical user journeys
argument-hint: "[flow to test, e.g. login, checkout, signup]"
---

# Prompt 04 — Generate E2E Tests

Generate end-to-end tests for critical user flows.

## Before starting

- Read `page-maps/summary.json`
- Read `code-context/summary.json` (if it exists)
- Read existing `page-objects/` to reuse locators
- Read `helpers/` to reuse auth and navigation helpers

## What e2e tests cover

Multi-step user journeys such as:
- Sign up → verify email → land on dashboard
- Log in → perform core action → log out
- Complete a form flow end to end
- Role-based access (admin vs regular user)

## Steps

1. Identify the 3–5 most critical user journeys from the page maps and app description
2. For each journey, create `tests/e2e/<flow-name>.spec.ts`
3. Reuse page objects — create new ones only if needed
4. Use auth fixtures from `fixtures/` for authenticated flows
5. Tag all tests with `@e2e`
6. Run `npx tsc --noEmit` and fix all errors

## Rules

- Use `gotoWithRetry()` — never `page.goto()` directly
- Use ROUTES constants — never hardcode URLs
- Keep each test independent — no shared state between tests
- One flow per test file

## When done

Tell me:
- Flows covered
- Tests generated
- TypeScript check result
