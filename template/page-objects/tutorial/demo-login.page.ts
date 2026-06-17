import { Page, Locator } from '@playwright/test'
import { BasePage } from '../base/base-page'
import { ROUTES } from '../../constants/routes'

/**
 * Tutorial Page Object Model (POM) for the Login view of the Demo App.
 *
 * Page Objects encapsulate page-specific HTML selectors and actions,
 * keeping test files clean, readable, and easy to maintain.
 */
export class DemoLoginPage extends BasePage {
  // Define element locators as class properties
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly forgotPasswordLink: Locator

  constructor(page: Page) {
    // Call the parent BasePage constructor to initialize the page context
    super(page)

    // Scope selectors to the login container to avoid collisions in the SPA DOM:
    const loginContainer = page.locator('#view-login')
    
    // 1. getByLabel: Finds form inputs by their associated text labels
    this.emailInput = loginContainer.getByLabel('Email Address')
    this.passwordInput = loginContainer.getByLabel('Password')

    // 2. getByRole: Targets semantic ARIA roles inside the login container
    this.submitButton = loginContainer.getByRole('button', { name: 'Sign In' })

    // 3. getByTestId: Targets custom data-testid attributes
    this.errorMessage = loginContainer.getByTestId('login-error-msg')

    // 4. getByText: Targets links or elements by their text content
    this.forgotPasswordLink = loginContainer.getByText('Forgot?')
  }

  /**
   * Implement the required abstract goto() method from BasePage.
   */
  async goto(): Promise<void> {
    await this.gotoUrl(ROUTES.LOGIN())
  }

  /**
   * Helper action method to perform a full login sequence.
   * Encapsulating common multi-step actions makes test specs highly readable.
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
