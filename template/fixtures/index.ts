import { test as base, Page } from '@playwright/test'
import * as path from 'path'
import { ENV } from '../helpers/env'

/**
 * Custom fixtures for the QA test suite.
 *
 * Usage:
 *   import { test, expect } from '../fixtures'
 *
 *   test('my test', async ({ userPage, adminPage }) => { ... })
 */

type Fixtures = {
  /** A page pre-authenticated as a regular user. */
  userPage: Page
  /** A page pre-authenticated as an admin user. */
  adminPage: Page
}

export const test = base.extend<Fixtures>({
  userPage: async ({ browser }, use) => {
    const stateFile = path.resolve(ENV.AUTH_USER_STATE())
    const context = await browser.newContext({ storageState: stateFile })
    const page = await context.newPage()
    await use(page)
    await context.close()
  },

  adminPage: async ({ browser }, use) => {
    const stateFile = path.resolve(ENV.AUTH_ADMIN_STATE())
    const context = await browser.newContext({ storageState: stateFile })
    const page = await context.newPage()
    await use(page)
    await context.close()
  },
})

export { expect } from '@playwright/test'
