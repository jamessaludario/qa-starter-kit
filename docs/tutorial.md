# Learn Test Automation 101

> 👋 **Brand new and want something hands-on first?** Run `npm run tour` for an
> interactive walkthrough that builds and runs your first test with you, then come
> back here. For the concepts in plain English, see
> [learn-qa-automation.md](learn-qa-automation.md).

Welcome! This guide is designed for beginners who want to learn how web test automation works, how to build it from scratch, and how to combine it with AI coding agents.

Instead of writing tests for external live websites (which can block you, load slowly, or change unexpectedly), this kit includes a **built-in local Sandbox Demo Application** that runs on your computer.

---

## 1. Core Concepts

### What is Test Automation?
Test automation is the practice of writing scripts that automatically launch a browser, navigate to your web app, click buttons, fill in forms, and verify that the app behaves correctly. It saves hundreds of hours of manual clicking and prevents bugs from slipping into production.

### What is Playwright?
[Playwright](https://playwright.dev) is a modern, fast, and extremely stable automation framework built by Microsoft. It runs on Windows, Mac, and Linux, and supports testing on Chrome, Firefox, and Safari.

### What is the Page Object Model (POM)?
The Page Object Model is a design pattern where you represent each page of your web application as a class in code. 
- **Selectors** (how to find buttons and text fields) and **Actions** (e.g. logging in, adding tasks) live inside the **Page Object**.
- **Test Specs** (what to assert/verify) import the Page Objects and run tests against them.

*Why POM?* If you change a button's style or text in your app, you only have to update it in **one** Page Object class file, rather than modifying 50 different test files!

---

## 2. Launching the Demo Application

Let's start the sandbox application:

1. Open your terminal in the project folder.
2. Start the local server:
   ```bash
   npm run demo
   ```
3. Open your browser and go to [http://localhost:3000](http://localhost:3000).
4. Explore the app! Try signing in with the helper credentials:
   - **User Role**: `user@example.com` / `password123` (gives you access to a task manager)
   - **Admin Role**: `admin@example.com` / `password123` (gives you access to system stats and user management table)
   - Try adding tasks, saving settings, or toggling themes. This is the app we are going to write tests for!

---

## 3. Anatomy of a Page Object

Let's examine how a Page Object is structured. Open [page-objects/tutorial/demo-login.page.ts](file:///c:/Users/JamesSaludario/Documents/qa-starter-kit/template/page-objects/tutorial/demo-login.page.ts) to see the reference file.

Here is how it's built:

```typescript
import { Page, Locator } from '@playwright/test'
import { BasePage } from '../base/base-page'

export class DemoLoginPage extends BasePage {
  // 1. Declare element properties of type Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page) // Initializes the page context

    // 2. Define how to find elements (Locators)
    this.emailInput = page.getByLabel('Email Address')
    this.passwordInput = page.getByLabel('Password')
    this.submitButton = page.getByRole('button', { name: 'Sign In' })
  }

  // 3. Define reusable page action methods
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
```

### Locator Rules of Thumb
Prefer using Playwright's built-in semantic locators:
- `page.getByLabel('Label Text')` for inputs.
- `page.getByRole('button', { name: 'Submit' })` for buttons, headers, links.
- `page.getByTestId('test-id')` for specific elements where labels are missing. Add `data-testid="value"` to your app's HTML.

---

## 4. Anatomy of a Test Spec

Open the reference test suite at [tests/tutorial/demo-app.spec.ts](file:///c:/Users/JamesSaludario/Documents/qa-starter-kit/template/tests/tutorial/demo-app.spec.ts).

Here is what a test does:

```typescript
import { test, expect } from '../../fixtures'
import { DemoLoginPage } from '../../page-objects/tutorial/demo-login.page'

test('Full User login flow', async ({ page }) => {
  const loginPage = new DemoLoginPage(page)

  // 1. Arrange: Go to Login Page
  await loginPage.goto()

  // 2. Act: Log in using credentials
  await loginPage.login('user@example.com', 'password123')

  // 3. Assert: Check if we are redirected to the dashboard page
  await expect(page).toHaveURL(/.*dashboard/)
})
```

---

## 5. Running the Tests

Let's execute the tests! Open another terminal window (leaving the demo server running) and run:

### Run all tests (headless mode)
```bash
npm test
```
*Headless* means the tests run inside background browsers. It is very fast and ideal for continuous integration pipelines.

### Run in UI Interactive mode
```bash
npm run test:ui
```
This opens the **Playwright UI Runner**. You can see each test step, inspect elements, trace API requests, and watch tests execute live! This is the best tool for debugging.

### View the Test Report
If a test fails, Playwright records screenshots and logs:
```bash
npm run report
```

---

## 6. Practicing and Writing Your Own

Try adding a new test to verify settings:
1. Open [template/tests/tutorial/demo-app.spec.ts](file:///c:/Users/JamesSaludario/Documents/qa-starter-kit/template/tests/tutorial/demo-app.spec.ts).
2. Add a new test block:
   ```typescript
   test('Updates display name in settings', async ({ page }) => {
     // Log in, navigate to Settings, change name, save, and assert toast message appears.
   })
   ```
3. Run `npm test` to see it execute.

---

## 7. Transitioning to AI-Driven QA

Once you understand how to write and run tests manually:
1. **Scanning**: You can use `npm run scan` to print a scanner prompt. Paste it into your AI Agent (like Claude Code, Cursor, or Antigravity). The agent will visit your app pages, inspect elements, and record element maps in `page-maps/`.
2. **Generating**: You paste the prompts inside `prompts/03-generate-baseline.md` into your agent. The agent will read the maps and write Page Objects and Test Specs for you instantly.
3. **Debugging**: When tests break, you can paste the terminal output into your agent, and it will fix the broken selectors or tests for you.

By learning the basics manually, you can easily review, guide, and trust the AI agent's work as you build extensive test coverage for your apps!
