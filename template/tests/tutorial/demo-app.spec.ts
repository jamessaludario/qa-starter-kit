import { test, expect } from '../../fixtures'
import { DemoLoginPage } from '../../page-objects/tutorial/demo-login.page'
import { DemoDashboardPage } from '../../page-objects/tutorial/demo-dashboard.page'
import { ROUTES } from '../../constants/routes'
import { gotoWithRetry } from '../../helpers/navigation'

test.describe('QA Academy Sandbox - Demo Application Tests', () => {
  
  test('Landing page loads successfully', async ({ page }) => {
    // 1. Navigate to the landing page
    await gotoWithRetry(page, ROUTES.HOME())

    // 2. Assert that the header logo is visible and contains expected text
    await expect(page.locator('.logo-container')).toContainText('QA Academy')

    // 3. Assert that the hero section loads and contains key content
    const heroHeading = page.locator('.hero h1')
    await expect(heroHeading).toBeVisible()
    await expect(heroHeading).toContainText('Learn Test Automation by Doing')

    // 4. Assert that all 3 feature cards are visible
    const featureCards = page.getByTestId('feature-card')
    await expect(featureCards).toHaveCount(3)
  })

  test('Login form validates incorrect inputs', async ({ page }) => {
    const loginPage = new DemoLoginPage(page)
    
    // 1. Visit Login Page
    await loginPage.goto()

    // 2. Try to log in with invalid credentials
    await loginPage.login('wrong@example.com', 'badpassword')

    // 3. Assert that the login error notification is displayed
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('Invalid email or password')
  })

  test('Full User task management lifecycle flow', async ({ page }) => {
    const loginPage = new DemoLoginPage(page)
    const dashboardPage = new DemoDashboardPage(page)

    // 1. Navigate to Login and sign in
    await loginPage.goto()
    await loginPage.login('user@example.com', 'password123')

    // 2. Assert successful redirection to the dashboard
    await expect(page).toHaveURL(/.*dashboard/)
    
    // 3. Assert user role badge is active
    await expect(dashboardPage.roleBadge).toBeVisible()
    await expect(dashboardPage.roleBadge).toContainText('User')

    // 4. Create and manage a task item
    const testTaskName = 'Practice writing Playwright assertions'
    
    // Action: Add the task
    await dashboardPage.addTask(testTaskName)
    
    // Assertion: Verify it appears in the list
    const taskLocator = dashboardPage.getTaskLocatorByText(testTaskName)
    await expect(taskLocator).toBeVisible()

    // Action: Check/Complete the task
    await dashboardPage.toggleTaskStatus(testTaskName)
    
    // Assertion: Verify it has the completed CSS class
    await expect(taskLocator).toHaveClass(/completed/)

    // Action: Delete the task
    await dashboardPage.deleteTask(testTaskName)
    
    // Assertion: Verify it is removed from the screen
    await expect(taskLocator).not.toBeVisible()

    // 5. Sign out of the session
    await dashboardPage.logoutButton.click()
    
    // Assertion: Verify redirection back to the Home page
    await expect(page).toHaveURL(ROUTES.HOME())
  })
})
