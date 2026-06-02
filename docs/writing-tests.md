# Writing Tests

This guide covers how to write tests manually or review agent-generated tests.

## Basic test structure

```typescript
import { test, expect } from '../fixtures'
import { LoginPage } from '../page-objects/guest/login'
import { ROUTES } from '../constants/routes'
import { gotoWithRetry } from '../helpers/navigation'

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithRetry(page, ROUTES.LOGIN())
  })

  test('shows login form @smoke', async ({ page }) => {
    const po = new LoginPage(page)
    await expect(po.emailField).toBeVisible()
    await expect(po.passwordField).toBeVisible()
    await expect(po.submitButton).toBeVisible()
  })

  test('shows error on invalid email @regression', async ({ page }) => {
    const po = new LoginPage(page)
    await po.emailField.fill('not-an-email')
    await po.submitButton.click()
    await expect(po.emailError).toBeVisible()
  })
})
```

## Page Objects

Create one Page Object class per page. Put it in `page-objects/<role>/<page-name>.ts`.

```typescript
import { Page, Locator } from '@playwright/test'
import { BasePage } from '../base/base-page'
import { ROUTES } from '../../constants/routes'

export class LoginPage extends BasePage {
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly submitButton: Locator
  readonly emailError: Locator

  constructor(page: Page) {
    super(page)
    this.emailField    = page.getByLabel('Email')
    this.passwordField = page.getByLabel('Password')
    this.submitButton  = page.getByRole('button', { name: 'Sign in' })
    this.emailError    = page.getByText('Please enter a valid email')
  }

  async goto(): Promise<void> {
    await this.gotoUrl(ROUTES.LOGIN())
  }
}
```

## Selector guidelines

Prefer these in order:

1. `getByRole()` — most stable, uses ARIA roles
2. `getByLabel()` — for form inputs
3. `getByText()` — for visible text
4. `getByTestId()` — if `data-testid` attributes exist in the app
5. `locator('css=...')` — last resort only

Never use:
- Class names that look auto-generated (e.g. `css-1a2b3c`)
- nth-child or position-based selectors
- Hardcoded text that changes frequently

## Using auth fixtures

```typescript
import { test, expect } from '../fixtures'

// Uses a pre-authenticated browser session (from auth/user-state.json)
test('dashboard loads for logged-in user', async ({ userPage }) => {
  await userPage.goto('/dashboard')
  await expect(userPage).toHaveTitle(/Dashboard/)
})

// Uses admin session (from auth/admin-state.json)
test('admin can see user list', async ({ adminPage }) => {
  await adminPage.goto('/admin/users')
  // ...
})
```

## Test tags

Tag tests to run subsets:

```typescript
test('critical flow works @smoke', ...)
test('edge case handled @regression', ...)
```

Run tagged tests:
```bash
npm run test:smoke
npm run test:regression
```

## TypeScript rules

- All types must be explicit — no `any`
- Run `npx tsc --noEmit` after any changes
- Fix all TypeScript errors before committing
