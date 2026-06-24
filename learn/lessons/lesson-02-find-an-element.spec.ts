/* ════════════════════════════════════════════════════════════════════════════
 *  LESSON 2 — Find an element (locators)
 * ════════════════════════════════════════════════════════════════════════════
 *  New idea: before you can do anything to an element, you have to describe how
 *  to find it. That description is called a LOCATOR.
 *
 *  A locator is lazy: making one doesn't search the page yet. Playwright only
 *  looks when you act on it or assert on it — and it re-checks automatically,
 *  which is what makes tests reliable.
 *
 *  Prefer locators that match what a USER sees or what stays stable:
 *      getByRole(...)         — buttons, headings, checkboxes, links
 *      getByPlaceholder(...)  — text boxes, by their grey hint text
 *      getByText(...)         — any visible text
 *      getByTestId(...)       — a data-testid a developer added for tests
 *  Avoid brittle CSS like "div > span:nth-child(3)" when you can.
 * ──────────────────────────────────────────────────────────────────────────── */
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

// ── WORKED EXAMPLE ──────────────────────────────────────────────────────────
test('Lesson 2 example: locate the new-todo text box', async ({ page }) => {
  // Find the text box by the placeholder text the user reads inside it.
  const newTodo = page.getByPlaceholder('What needs to be done?')

  // `toBeVisible` confirms the element exists and is actually on screen.
  await expect(newTodo).toBeVisible()
})

// ── TRY IT YOURSELF ─────────────────────────────────────────────────────────
// Goal: locate the text box a DIFFERENT way and confirm it's editable.
// Hint: the box is a textbox role. Try page.getByRole('textbox').
//       Assert it with toBeEditable().
test.skip('Lesson 2 exercise: find the box by its role', async ({ page }) => {
  // const box = page.getByRole('textbox')
  // await expect(box).toBeEditable()

  throw new Error('Remove this line and write the test above.')
})

/* ── HIDDEN SOLUTION ─────────────────────────────────────────────────────────
 *
 *   test('find the box by its role', async ({ page }) => {
 *     const box = page.getByRole('textbox')
 *     await expect(box).toBeEditable()
 *   })
 *
 * ──────────────────────────────────────────────────────────────────────────── */
