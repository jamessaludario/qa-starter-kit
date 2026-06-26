/* ════════════════════════════════════════════════════════════════════════════
 *  LESSON 3 — Type text
 * ════════════════════════════════════════════════════════════════════════════
 *  New idea: acting like a user. `fill` types into a box; `press` sends a key
 *  such as Enter. These are "actions" — things a person would do.
 * ──────────────────────────────────────────────────────────────────────────── */
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/todomvc')
})

// ── WORKED EXAMPLE ──────────────────────────────────────────────────────────
test('Lesson 3 example: type a to-do and submit it', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?')

  // `fill` replaces whatever is in the box with this text.
  await newTodo.fill('Learn Playwright')
  // TodoMVC adds the item when you press Enter.
  await newTodo.press('Enter')

  // Proof it worked: the item now appears with our text.
  await expect(page.getByTestId('todo-title')).toHaveText('Learn Playwright')
})

// ── TRY IT YOURSELF ─────────────────────────────────────────────────────────
// Goal: add TWO different to-dos, then assert the list has exactly 2 items.
// Hint: call fill + press twice with different text.
//       Count items with: await expect(page.locator('.todo-list li')).toHaveCount(2)
test.skip('Lesson 3 exercise: add two to-dos', async ({ page }) => {
  // const newTodo = page.getByPlaceholder('What needs to be done?')
  // ... add two items ...
  // await expect(page.locator('.todo-list li')).toHaveCount(2)

  throw new Error('Remove this line and write the test above.')
})

/* ── HIDDEN SOLUTION ─────────────────────────────────────────────────────────
 *
 *   test('add two to-dos', async ({ page }) => {
 *     const newTodo = page.getByPlaceholder('What needs to be done?')
 *     await newTodo.fill('First task')
 *     await newTodo.press('Enter')
 *     await newTodo.fill('Second task')
 *     await newTodo.press('Enter')
 *     await expect(page.locator('.todo-list li')).toHaveCount(2)
 *   })
 *
 * ──────────────────────────────────────────────────────────────────────────── */
