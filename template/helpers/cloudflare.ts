import { Page } from '@playwright/test'

/**
 * Wait for Cloudflare challenge to resolve (if present).
 * Cloudflare sometimes shows a "Checking your browser" interstitial.
 *
 * This helper waits up to 30 seconds for the challenge to clear.
 * If no challenge is detected it returns immediately.
 */
export async function waitForCloudflare(page: Page): Promise<void> {
  const cfSelector = 'text=Checking your browser'

  try {
    const cfChallenge = page.locator(cfSelector)
    const isVisible = await cfChallenge.isVisible({ timeout: 2000 })

    if (isVisible) {
      console.log('[cloudflare] Challenge detected — waiting for it to resolve...')
      await cfChallenge.waitFor({ state: 'hidden', timeout: 30_000 })
      console.log('[cloudflare] Challenge resolved.')
    }
  } catch {
    // No challenge present — proceed normally
  }
}
