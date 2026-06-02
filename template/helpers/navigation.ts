import { Page } from '@playwright/test'

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

/**
 * Navigate to a URL with automatic retry on network errors and Cloudflare challenges.
 * Use this instead of page.goto() everywhere in the test suite.
 *
 * @param page     Playwright Page object
 * @param url      Destination URL
 * @param options  Optional Playwright goto options
 */
export async function gotoWithRetry(
  page: Page,
  url: string,
  options?: Parameters<Page['goto']>[1]
): Promise<void> {
  let lastError: Error | undefined

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', ...options })
      return
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))

      if (attempt < MAX_RETRIES) {
        await page.waitForTimeout(RETRY_DELAY_MS * attempt)
      }
    }
  }

  throw new Error(
    `Navigation to "${url}" failed after ${MAX_RETRIES} attempts. Last error: ${lastError?.message}`
  )
}

/**
 * Navigate to a URL and wait for the page to reach networkidle.
 * Use for pages that load data asynchronously.
 */
export async function gotoAndWait(page: Page, url: string): Promise<void> {
  await gotoWithRetry(page, url)
  await page.waitForLoadState('networkidle')
}
