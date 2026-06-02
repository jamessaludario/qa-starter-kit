import { Page } from '@playwright/test'
import { gotoWithRetry } from '../../helpers/navigation'

/**
 * BasePage — all Page Objects extend this class.
 * Provides common navigation and shared utilities.
 */
export abstract class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Navigate to this page's URL with automatic retry on network errors.
   * Subclasses must implement this method.
   */
  abstract goto(): Promise<void>

  /**
   * Navigate to a URL with retry logic.
   * Prefer this over page.goto() directly.
   */
  async gotoUrl(url: string): Promise<void> {
    await gotoWithRetry(this.page, url)
  }

  /**
   * Wait for the page to reach a stable "loaded" state.
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle')
  }
}
