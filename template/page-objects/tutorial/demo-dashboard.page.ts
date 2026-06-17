import { Page, Locator } from '@playwright/test'
import { BasePage } from '../base/base-page'
import { ROUTES } from '../../constants/routes'

/**
 * Tutorial Page Object Model (POM) for the Dashboard view of the Demo App.
 *
 * Demonstrates locating lists, dynamic buttons, forms, and nested elements.
 */
export class DemoDashboardPage extends BasePage {
  readonly roleBadge: Locator
  readonly taskInput: Locator
  readonly addTaskButton: Locator
  readonly tasksList: Locator
  readonly taskItems: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    super(page)

    // Scope dashboard elements under the User tab container (#tab-dashboard) to avoid collisions:
    const dashboardContainer = page.locator('#tab-dashboard')

    this.roleBadge = dashboardContainer.getByTestId('role-badge')
    this.taskInput = dashboardContainer.getByTestId('task-input')
    this.addTaskButton = dashboardContainer.getByTestId('add-task-button')
    this.tasksList = dashboardContainer.getByTestId('tasks-list')
    
    // Locators can search within other locators.
    // This targets all list items ('li') with class '.task-item' under the tasks list container.
    this.taskItems = this.tasksList.locator('li.task-item')
    
    // Locate the logout button in the header/sidebar
    this.logoutButton = page.getByTestId('logout-button')
  }

  /**
   * Implement the required abstract goto() method from BasePage.
   */
  async goto(): Promise<void> {
    await this.gotoUrl(ROUTES.DASHBOARD())
  }

  /**
   * Helper action method to add a new task item.
   */
  async addTask(name: string): Promise<void> {
    await this.taskInput.fill(name)
    await this.addTaskButton.click()
  }

  /**
   * Helper action method to find a specific task list item by its text.
   * Uses Playwright's filter() method.
   */
  getTaskLocatorByText(text: string): Locator {
    return this.taskItems.filter({ hasText: text })
  }

  /**
   * Helper action method to click the checkbox for a task.
   */
  async toggleTaskStatus(text: string): Promise<void> {
    const item = this.getTaskLocatorByText(text)
    const checkbox = item.locator('input.task-item-checkbox')
    await checkbox.click()
  }

  /**
   * Helper action method to delete a task.
   */
  async deleteTask(text: string): Promise<void> {
    const item = this.getTaskLocatorByText(text)
    // Targets the button with test ID 'delete-task-btn' nested inside that specific item
    const deleteBtn = item.getByTestId('delete-task-btn')
    await deleteBtn.click()
  }
}
