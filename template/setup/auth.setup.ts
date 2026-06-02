import { test as setup, expect } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'
import { ENV } from '../helpers/env'
import { gotoWithRetry } from '../helpers/navigation'

/**
 * Auth setup — run this before tests to create saved auth sessions.
 *
 * This script opens a browser, lets you log in manually,
 * then saves the session to auth/.
 *
 * Run: npx playwright test setup/auth.setup.ts --headed
 */

const USER_STATE_FILE  = path.resolve(ENV.AUTH_USER_STATE())
const ADMIN_STATE_FILE = path.resolve(ENV.AUTH_ADMIN_STATE())

// Ensure auth/ directory exists
const authDir = path.dirname(USER_STATE_FILE)
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true })
}

setup('authenticate as user', async ({ page }) => {
  await gotoWithRetry(page, ENV.BASE_URL())

  // ── Manual login ──────────────────────────────────────────────────────────
  // TODO: Replace with your actual login steps, or use playwright-cli to record.
  // Example:
  //   await page.getByLabel('Email').fill(ENV.USER_EMAIL())
  //   await page.getByLabel('Password').fill(process.env.USER_PASSWORD ?? '')
  //   await page.getByRole('button', { name: 'Sign in' }).click()
  //   await expect(page).toHaveURL(/dashboard/)
  // ─────────────────────────────────────────────────────────────────────────

  console.log('\n⚠️  Manual login required.')
  console.log('   Log in as a regular user in the browser window.')
  console.log('   Press Enter in this terminal when done.\n')

  await page.pause()

  await page.context().storageState({ path: USER_STATE_FILE })
  console.log(`✅ User auth saved: ${USER_STATE_FILE}`)
})

setup('authenticate as admin', async ({ page }) => {
  const adminUrl = ENV.ADMIN_BASE_URL() || ENV.BASE_URL()
  await gotoWithRetry(page, adminUrl)

  console.log('\n⚠️  Manual login required.')
  console.log('   Log in as an admin in the browser window.')
  console.log('   Press Enter in this terminal when done.\n')

  await page.pause()

  await page.context().storageState({ path: ADMIN_STATE_FILE })
  console.log(`✅ Admin auth saved: ${ADMIN_STATE_FILE}`)
})
