---
description: Generate regression tests targeting edge cases and previously broken areas
argument-hint: "[area to focus on, e.g. auth, payments, forms]"
---

# Prompt 05 — Generate Regression Tests

Generate regression tests for edge cases, error states, and areas prone to breakage.

## Before starting

- Read `page-maps/summary.json`
- Read existing `tests/baseline/` to avoid duplicating coverage
- Read `code-context/summary.json` for known risky areas

## What regression tests cover

- Form validation (empty fields, invalid formats, boundary values)
- Error states (404, 403, network errors)
- Auth edge cases (expired sessions, wrong credentials, role escalation)
- Data edge cases (empty lists, very long strings, special characters)
- Redirect behavior

## Steps

1. Identify the 5–10 highest-risk areas from the page maps and app description
2. For each area, create `tests/regression/<area-name>.spec.ts`
3. Reuse existing page objects — create new ones only if needed
4. Tag all tests with `@regression`
5. Run `npx tsc --noEmit` and fix all errors

## Rules

- Use `gotoWithRetry()` — never `page.goto()` directly
- Use ROUTES constants — never hardcode URLs
- Each test must be independent — no shared state

## When done

Tell me:
- Areas covered
- Tests generated
- TypeScript check result
