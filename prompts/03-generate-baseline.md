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

1. Create or update a Page Object in `page-objects/<role>/<page-name>.ts`:
```typescript
import { Page, Locator } from '@playwright/test'

export class DashboardPage {
  readonly page: Page
  readonly heading: Locator
  readonly navMenu: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Dashboard' })
    this.navMenu = page.getByRole('navigation')
  }
}
```

2. Create a test spec in `tests/baseline/<role>/<page-name>.spec.ts`:
```typescript
import { test, expect } from '../../fixtures'
import { DashboardPage } from '../../page-objects/user/dashboard'
import { ROUTES } from '../../constants/routes'

test.describe('Dashboard — baseline @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.DASHBOARD)
  })

  test('page loads without errors', async ({ page }) => {
    await expect(page).toHaveTitle(/Dashboard/)
  })

  test('heading is visible', async ({ page }) => {
    const po = new DashboardPage(page)
    await expect(po.heading).toBeVisible()
  })
})
```

## Rules

- Tag the first test in each file with `@smoke`
- Use `gotoWithRetry()` instead of `page.goto()` directly
- Add the route to `constants/routes.ts` if it is not there yet
- Run `npx tsc --noEmit` when done and fix all errors

## When done

Tell me:
- How many Page Objects created/updated
- How many test files created
- How many tests total

