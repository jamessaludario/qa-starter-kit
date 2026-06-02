# Prompt 04 — Generate End-to-End Tests

Generate tests for complete user flows — actions that span multiple pages.

## Before starting

- Read `code-context/summary.json` — look at `testableFeatures`
- Read `page-maps/summary.json`
- Read existing `page-objects/` to reuse what exists
- Read `helpers/` to reuse navigation and utilities

## What e2e tests cover

Complete user journeys such as:
- Sign up → verify email → onboard → reach dashboard
- Log in → complete a core task → log out
- Admin: create item → user: see item → admin: delete item
- Any multi-step form or wizard
- Purchase / checkout flows

## For each flow

1. Name the flow clearly (e.g. `user-login-and-checkout`)
2. List the steps in order
3. Create a test spec in `tests/e2e/<flow-name>.spec.ts`
4. Reuse Page Objects from `page-objects/` — create new ones only if needed
5. Use `test.step()` to label each step clearly:

```typescript
test('user completes checkout', async ({ userPage }) => {
  await test.step('add item to cart', async () => {
    // ...
  })
  await test.step('proceed to checkout', async () => {
    // ...
  })
  await test.step('confirm order', async () => {
    // ...
  })
})
```

## Rules

- Use auth fixtures from `fixtures/` — never log in manually inside a test
- Always use `gotoWithRetry()` for navigation
- Use ROUTES constants — never hardcode URLs
- Tag critical flows with `@smoke`
- Keep each test independent — no shared state between tests

## When done

Tell me:
- How many e2e flows were generated
- Which flows are tagged `@smoke`
- Any flows you could not generate due to missing page maps or auth

